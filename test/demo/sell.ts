import { PublicKey } from '@solana/web3.js'
import { connection, ibuy, mintBuySell, owner, prepareTransaction } from '../config'
import { BN } from 'bn.js'
import { getSellSolAmountFromTokenAmount } from '../../src/index'
import { AccountLayout } from '@solana/spl-token'
async function sell() {
  //fill the mint address
  const mint = new PublicKey(mintBuySell)
  //fetching globale state first
  const global = await ibuy.fetchGlobal()
  const user = owner.publicKey
  console.log('prepare create token and buy instructions...')
  const { bondingCurve, associatedUserAccountInfo } = await ibuy.fetchSellState(mint, user)

  //you can use this to get current token amount
  const tokenAccount = AccountLayout.decode(associatedUserAccountInfo.data)
  const tokenInputAmount = new BN(tokenAccount.amount)

  // const tokenInputAmount = new BN(100_000 * 1e6) // selll 100k token
  const solReceived = getSellSolAmountFromTokenAmount({ global, bondingCurve: bondingCurve, amount: tokenInputAmount })
  const instructions = await ibuy.sellInstructions({
    mint,
    user,
    amount: tokenInputAmount,
    solAmount: solReceived,
    slippage: 1,
    feeRecipients: global.feeRecipients,
    creator: bondingCurve.creator,
  })
  //check config to understand this
  const latestBlockhash = await connection.getLatestBlockhash()
  const { signature, send, confirm } = prepareTransaction({ instructions, latestBlockhash })
  console.log('mint address', mint.toString())
  console.log('token amount', (Number(tokenInputAmount) / 1e6).toFixed(6))
  console.log('est sol received', (Number(solReceived) / 1e9).toFixed(9))
  console.log('sending tx...')
  await send() //sending the tx
  await confirm() // confirming to make sure it success or not
  console.log('create and buy token signature:', signature)
  return
}
sell().catch((e) => {
  console.error(e)
  process.exit(1)
})
