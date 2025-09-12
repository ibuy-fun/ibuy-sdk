import { connection, ibuy, mintToken, owner, prepareTransaction } from '../config'
async function createToken() {
  //generate the mint address if you don't have
  const mint = mintToken.publicKey
  //fill whatever wallet you want
  const creator = owner.publicKey

  const user = owner.publicKey
  console.log('prepare create token instructions...')
  //creating an instruction to create a token
  const instructions = await ibuy.createInstruction({
    mint,
    name: 'name',
    symbol: 'symbol',
    uri: 'uri',
    creator,
    user,
  })
  //check config to understand this
  const latestBlockhash = await connection.getLatestBlockhash()
  const { signature, send, confirm } = prepareTransaction({ instructions, latestBlockhash, signer: mintToken })
  console.log('mint address', mint.toString())
  console.log('sending tx...')
  await send() //sending the tx
  await confirm() // confirming to make sure it success or not
  console.log('create token signature:', signature)
  return
}
createToken().catch((e) => {
  console.error(e)
  process.exit(1)
})
