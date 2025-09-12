import { connection, ibuy, owner, prepareTransaction } from '../config'
import { BN } from 'bn.js'
async function claimFee() {
  //fetching globale state first
  const creator = owner.publicKey
  // Getting total accumulated creator fees
  const creatorBalance = await ibuy.getCreatorVaultBalance(creator)
  console.log('creator balance', (Number(creatorBalance) / 1e9).toString())
  // Collecting creator fees instructions
  if (Number(creatorBalance) > 0) {
    const instructions = await ibuy.claimCoinCreatorFeeInstructions(creator)
    //check config to understand this
    const latestBlockhash = await connection.getLatestBlockhash()
    const { signature, send, confirm } = prepareTransaction({ instructions, latestBlockhash })
    console.log('sending tx...')
    await send() //sending the tx
    await confirm() // confirming to make sure it success or not
    console.log('claim fees signature:', signature)
  }
  return
}
claimFee().catch((e) => {
  console.error(e)
  process.exit(1)
})
