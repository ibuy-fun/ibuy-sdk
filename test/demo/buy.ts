import { PublicKey } from '@solana/web3.js'
import { connection, ibuy, mintBuySell, owner, prepareTransaction } from '../config'
import { getBuyTokenAmountFromSolAmount } from '../../src/index'
import { BN } from 'bn.js'
async function createToken() {
  //fill the mint address
  const mint = new PublicKey(mintBuySell)
  //fetching globale state first
  const global = await ibuy.fetchGlobal()

  const user = owner.publicKey

  console.log('prepare create token and buy instructions...')
  const { bondingCurve, associatedUserAccountInfo } = await ibuy.fetchBuyState(mint, user)
  const solInputAmount = new BN(0.1 * 10 ** 9) // 0.1 SOL
  const tokenReceived = getBuyTokenAmountFromSolAmount({ global, bondingCurve: bondingCurve, amount: solInputAmount })
  const instructions = await ibuy.buyInstructions({
    associatedUserAccountInfo,
    mint,
    user,
    solAmount: solInputAmount,
    amount: tokenReceived,
    slippage: 1,
    feeRecipients: global.feeRecipients,
    creator: bondingCurve.creator,
  })
  //check config to understand this
  const latestBlockhash = await connection.getLatestBlockhash()
  const { signature, send, confirm } = prepareTransaction({ instructions, latestBlockhash })
  console.log('mint address', mint.toString())
  console.log('sol amount', (Number(solInputAmount) / 1e9).toFixed(9))
  console.log('token received', (Number(tokenReceived) / 1e6).toFixed(6))
  console.log('sending tx...')
  await send() //sending the tx
  await confirm() // confirming to make sure it success or not
  console.log('create and buy token signature:', signature)
  return
}
createToken().catch((e) => {
  console.error(e)
  process.exit(1)
})
// 3547107.418041
