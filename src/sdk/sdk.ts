import { Program } from '@coral-xyz/anchor'
import { AccountInfo, Connection, PublicKey, PublicKeyInitData, TransactionInstruction } from '@solana/web3.js'
import BN from 'bn.js'
import IbuyIDL from '../idl/ibuy.json'
import type { Ibuy } from '../idl/ibuy'
import { bondingCurvePda, creatorVaultPda, globalPda } from './pdas.js'
import { Global, BondingCurve } from './state'
import { createAssociatedTokenAccountIdempotentInstruction, getAssociatedTokenAddressSync } from '@solana/spl-token'
import { getStaticRandomFeeRecipient } from './bondingcurve'
export function getIbuyProgram(connection: Connection): Program<Ibuy> {
  return new Program(IbuyIDL as Ibuy, { connection })
}

function getFeeRecipient(feeRecipients: PublicKey[]): PublicKey {
  return feeRecipients[Math.floor(Math.random() * feeRecipients.length)]
}

export class IBuySdk {
  private readonly connection: Connection
  private readonly ibuyProgram: Program<Ibuy>
  private readonly offlineIbuyProgram: Program<Ibuy>

  constructor(connection: Connection) {
    this.connection = connection
    this.ibuyProgram = getIbuyProgram(connection)
    this.offlineIbuyProgram = getIbuyProgram(null as any as Connection)
  }

  programId(): PublicKey {
    return this.offlineIbuyProgram.programId
  }

  decodeGlobal(accountInfo: AccountInfo<Buffer>): Global {
    return this.offlineIbuyProgram.coder.accounts.decode<Global>('global', accountInfo.data)
  }
  decodeBondingCurve(accountInfo: AccountInfo<Buffer>): BondingCurve {
    return this.offlineIbuyProgram.coder.accounts.decode<BondingCurve>('bondingCurve', accountInfo.data)
  }
  async createInstruction({
    mint,
    name,
    symbol,
    uri,
    creator,
    user,
  }: {
    mint: PublicKey
    name: string
    symbol: string
    uri: string
    creator: PublicKey
    user: PublicKey
  }): Promise<TransactionInstruction[]> {
    return [
      await this.offlineIbuyProgram.methods
        .create(name, symbol, uri, creator)
        .accountsPartial({
          mint: mint,
          user: user,
        })
        .instruction(),
    ]
  }

  async getBuyInstructionRaw({
    user,
    mint,
    creator,
    amount,
    solAmount,
    feeRecipient = getStaticRandomFeeRecipient(),
  }: {
    user: PublicKey
    mint: PublicKey
    creator: PublicKey
    amount: BN
    solAmount: BN
    feeRecipient: PublicKey
  }): Promise<TransactionInstruction> {
    return await this.getBuyInstructionInternal({
      user,
      associatedUser: getAssociatedTokenAddressSync(mint, user, true),
      mint,
      creator,
      feeRecipient,
      amount,
      solAmount,
    })
  }

  async createAndBuyInstructions({
    mint,
    name,
    symbol,
    uri,
    creator,
    user,
    amount,
    solAmount,
    feeRecipients,
  }: {
    mint: PublicKey
    name: string
    symbol: string
    uri: string
    creator: PublicKey
    user: PublicKey
    amount: BN
    solAmount: BN
    feeRecipients: PublicKey[]
  }): Promise<TransactionInstruction[]> {
    const associatedUser = getAssociatedTokenAddressSync(mint, user, true)
    return [
      ...(await this.createInstruction({ mint, name, symbol, uri, creator, user })),
      createAssociatedTokenAccountIdempotentInstruction(user, associatedUser, user, mint),
      await this.buyInstruction({
        mint,
        creator,
        user,
        associatedUser,
        feeRecipients,
        amount,
        solAmount,
        slippage: 1,
      }),
    ]
  }
  async buyInstructions({
    associatedUserAccountInfo,
    mint,
    user,
    amount,
    solAmount,
    slippage,
    feeRecipients,
    creator,
  }: {
    associatedUserAccountInfo: AccountInfo<Buffer> | null
    mint: PublicKey
    user: PublicKey
    amount: BN
    solAmount: BN
    slippage: number
    feeRecipients: PublicKey[]
    creator: PublicKey
  }): Promise<TransactionInstruction[]> {
    const instructions: TransactionInstruction[] = []

    const associatedUser = getAssociatedTokenAddressSync(mint, user, true)

    if (!associatedUserAccountInfo) {
      instructions.push(createAssociatedTokenAccountIdempotentInstruction(user, associatedUser, user, mint))
    }

    instructions.push(
      await this.buyInstruction({
        mint,
        creator,
        user,
        associatedUser,
        amount,
        solAmount,
        slippage,
        feeRecipients,
      }),
    )

    return instructions
  }
  private async buyInstruction({
    mint,
    creator,
    user,
    associatedUser,
    amount,
    solAmount,
    slippage,
    feeRecipients,
  }: {
    mint: PublicKey
    creator: PublicKey
    user: PublicKey
    associatedUser: PublicKey
    amount: BN
    solAmount: BN
    slippage: number
    feeRecipients: PublicKey[]
  }) {
    return await this.getBuyInstructionInternal({
      user,
      associatedUser,
      mint,
      creator,
      feeRecipient: getFeeRecipient(feeRecipients),
      amount,
      solAmount: solAmount.add(solAmount.mul(new BN(Math.floor(slippage * 10))).div(new BN(1000))),
    })
  }
  private async getBuyInstructionInternal({
    user,
    associatedUser,
    mint,
    creator,
    feeRecipient,
    amount,
    solAmount,
  }: {
    user: PublicKey
    associatedUser: PublicKey
    mint: PublicKey
    creator: PublicKey
    feeRecipient: PublicKey
    amount: BN
    solAmount: BN
  }): Promise<TransactionInstruction> {
    return await this.offlineIbuyProgram.methods
      .buy(amount, solAmount)
      .accountsPartial({
        feeRecipient,
        mint,
        associatedUser,
        user,
        creatorVault: creatorVaultPda(creator),
      })
      .instruction()
  }
  async sellInstructions({
    mint,
    user,
    amount,
    solAmount,
    slippage,
    creator,
    feeRecipients,
  }: {
    mint: PublicKey
    user: PublicKey
    amount: BN
    solAmount: BN
    slippage: number
    creator: PublicKey
    feeRecipients: PublicKey[]
  }): Promise<TransactionInstruction[]> {
    const instructions: TransactionInstruction[] = []

    instructions.push(
      await this.getSellInstructionInternal({
        user,
        mint,
        creator,
        feeRecipient: getFeeRecipient(feeRecipients),
        amount,
        solAmount: solAmount.sub(solAmount.mul(new BN(Math.floor(slippage * 10))).div(new BN(1000))),
      }),
    )

    return instructions
  }
  private async getSellInstructionInternal({
    user,
    mint,
    creator,
    feeRecipient,
    amount,
    solAmount,
  }: {
    user: PublicKey
    mint: PublicKey
    creator: PublicKey
    feeRecipient: PublicKey
    amount: BN
    solAmount: BN
  }): Promise<TransactionInstruction> {
    return await this.offlineIbuyProgram.methods
      .sell(amount, solAmount)
      .accountsPartial({
        feeRecipient,
        mint,
        associatedUser: getAssociatedTokenAddressSync(mint, user, true),
        user,
        creatorVault: creatorVaultPda(creator),
      })
      .instruction()
  }

  async claimCoinCreatorFeeInstructions(tokenCreator: PublicKey): Promise<TransactionInstruction[]> {
    return [
      await this.offlineIbuyProgram.methods
        .claimFee()
        .accountsPartial({
          creator: tokenCreator,
        })
        .instruction(),
    ]
  }

  async fetchGlobal(): Promise<Global> {
    return await this.ibuyProgram.account.global.fetch(globalPda())
  }

  async fetchBondingCurve(mint: PublicKeyInitData): Promise<BondingCurve> {
    return await this.ibuyProgram.account.bondingCurve.fetch(bondingCurvePda(mint))
  }

  async fetchBuyState(mint: PublicKey, user: PublicKey) {
    const [bondingCurveAccountInfo, associatedUserAccountInfo] = await this.connection.getMultipleAccountsInfo([
      bondingCurvePda(mint),
      getAssociatedTokenAddressSync(mint, user, true),
    ])

    if (!bondingCurveAccountInfo) {
      throw new Error(`Bonding curve account not found for mint: ${mint.toBase58()}`)
    }

    const bondingCurve = this.decodeBondingCurve(bondingCurveAccountInfo)
    return { bondingCurveAccountInfo, bondingCurve, associatedUserAccountInfo }
  }

  async fetchSellState(mint: PublicKey, user: PublicKey) {
    const [bondingCurveAccountInfo, associatedUserAccountInfo] = await this.connection.getMultipleAccountsInfo([
      bondingCurvePda(mint),
      getAssociatedTokenAddressSync(mint, user, true),
    ])

    if (!bondingCurveAccountInfo) {
      throw new Error(`Bonding curve account not found for mint: ${mint.toBase58()}`)
    }

    if (!associatedUserAccountInfo) {
      throw new Error(`Associated token account not found for mint: ${mint.toBase58()} and user: ${user.toBase58()}`)
    }

    const bondingCurve = this.decodeBondingCurve(bondingCurveAccountInfo)
    return { bondingCurveAccountInfo, bondingCurve, associatedUserAccountInfo }
  }

  async getCreatorVaultBalance(creator: PublicKey): Promise<BN> {
    const creatorVault = creatorVaultPda(creator)
    const accountInfo = await this.connection.getAccountInfo(creatorVault)

    if (accountInfo === null) {
      return new BN(0)
    }

    const rentExemptionLamports = await this.connection.getMinimumBalanceForRentExemption(accountInfo.data.length)

    if (accountInfo.lamports < rentExemptionLamports) {
      return new BN(0)
    }

    return new BN(accountInfo.lamports - rentExemptionLamports)
  }
}
