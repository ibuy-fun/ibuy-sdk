import { PublicKey, PublicKeyInitData } from '@solana/web3.js'
import { IBUY_PROGRAM_ID } from './constants'

export function globalPda(): PublicKey {
  const [globalPda] = PublicKey.findProgramAddressSync([Buffer.from('global')], IBUY_PROGRAM_ID)
  return globalPda
}

export function bondingCurvePda(mint: PublicKeyInitData): PublicKey {
  const [bondingCurvePda] = PublicKey.findProgramAddressSync(
    [Buffer.from('bonding-curve'), new PublicKey(mint).toBuffer()],
    IBUY_PROGRAM_ID,
  )
  return bondingCurvePda
}

export function creatorVaultPda(creator: PublicKey) {
  const [creatorVault] = PublicKey.findProgramAddressSync(
    [Buffer.from('creator-vault'), creator.toBuffer()],
    IBUY_PROGRAM_ID,
  )
  return creatorVault
}
