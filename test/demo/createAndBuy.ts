import { connection, ibuy, mintToken, owner, prepareTransaction } from '../config'
import { getBuyTokenAmountFromSolAmount } from '../../src/index'
import { BN } from 'bn.js'
async function createAndBuy() {
  //generate the mint address if you don't have
  const mint = mintToken.publicKey
  //fill whatever wallet you want
  const creator = owner.publicKey

  const user = owner.publicKey
  //fetching globale state first
  const global = await ibuy.fetchGlobal()

  console.log('prepare create token and buy instructions...')
  // or creating and buying instructions in the same tx
  const solInputAmount = new BN(0.1 * 10 ** 9) // 0.1 SOL
  const tokenReceived = getBuyTokenAmountFromSolAmount({ global, bondingCurve: null, amount: solInputAmount })
  //creating an instruction to create and buy a token
  const instructions = await ibuy.createAndBuyInstructions({
    mint: mint,
    name: 'name',
    symbol: 'symbol',
    uri: 'uri',
    creator,
    user,
    solAmount: solInputAmount,
    amount: tokenReceived,
    feeRecipients: global.feeRecipients,
  })
  //check config to understand this
  const latestBlockhash = await connection.getLatestBlockhash()
  const { signature, send, confirm } = prepareTransaction({ instructions, latestBlockhash, signer: mintToken })
  console.log('mint address', mint.toString())
  console.log('sol amount', (Number(solInputAmount) / 1e9).toFixed(9))
  console.log('token received', (Number(tokenReceived) / 1e6).toFixed(6))
  console.log('sending tx...')
  await send() //sending the tx
  await confirm() // confirming to make sure it success or not
  console.log('create and buy token signature:', signature)
  return
}
createAndBuy().catch((e) => {
  console.error(e)
  process.exit(1)
})
