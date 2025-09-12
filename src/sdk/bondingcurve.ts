import BN from 'bn.js'
import { PublicKey } from '@solana/web3.js'
import { Global, BondingCurve } from './state'
import { getFee } from './fee'
export function newBondingCurve(global: Global): BondingCurve {
  return {
    virtualTokenReserves: global.initialVirtualTokenReserves,
    virtualSolReserves: global.initialVirtualSolReserves,
    realTokenReserves: global.initialRealTokenReserves,
    realSolReserves: new BN(0),
    tokenTotalSupply: global.tokenTotalSupply,
    complete: false,
    creator: PublicKey.default,
  }
}
//return sol
export function getBuySolAmountFromTokenAmountQuote({
  minAmount,
  virtualTokenReserves,
  virtualSolReserves,
}: {
  minAmount: BN
  virtualTokenReserves: BN
  virtualSolReserves: BN
}): BN {
  return minAmount.mul(virtualSolReserves).div(virtualTokenReserves.sub(minAmount)).add(new BN(1))
}
//return token amount
export function getBuyTokenAmountFromSolAmountQuote({
  inputAmount,
  virtualTokenReserves,
  virtualSolReserves,
}: {
  inputAmount: BN
  virtualTokenReserves: BN
  virtualSolReserves: BN
}): BN {
  return inputAmount.mul(virtualTokenReserves).div(virtualSolReserves.add(inputAmount))
}
//return sol
export function getSellSolAmountFromTokenAmountQuote({
  inputAmount,
  virtualTokenReserves,
  virtualSolReserves,
}: {
  inputAmount: BN
  virtualTokenReserves: BN
  virtualSolReserves: BN
}): BN {
  return inputAmount.mul(virtualSolReserves).div(virtualTokenReserves.add(inputAmount))
}

export function getBuyTokenAmountFromSolAmount({
  global,
  bondingCurve,
  amount,
}: {
  global: Global
  bondingCurve: BondingCurve | null
  amount: BN
}): BN {
  if (amount.eq(new BN(0))) {
    return new BN(0)
  }
  if (bondingCurve === null) {
    bondingCurve = newBondingCurve(global)
  }

  // migrated bonding curve
  if (bondingCurve.virtualTokenReserves.eq(new BN(0))) {
    return new BN(0)
  }

  const totalFeeBasisPoints = global.feeBasisPoints.add(global.creatorFeeBasisPoints)
  const inputAmount = amount.muln(10_000).div(totalFeeBasisPoints.addn(10_000))
  const tokensReceived = getBuyTokenAmountFromSolAmountQuote({
    inputAmount,
    virtualTokenReserves: bondingCurve.virtualTokenReserves,
    virtualSolReserves: bondingCurve.virtualSolReserves,
  })

  return BN.min(tokensReceived, bondingCurve.realTokenReserves)
}

export function getBuySolAmountFromTokenAmount({
  global,
  bondingCurve,
  amount,
}: {
  global: Global
  bondingCurve: BondingCurve | null
  amount: BN
}): BN {
  if (amount.eq(new BN(0))) {
    return new BN(0)
  }
  let isNewBondingCurve = false
  if (bondingCurve === null) {
    bondingCurve = newBondingCurve(global)
    isNewBondingCurve = true
  }

  // migrated bonding curve
  if (bondingCurve.virtualTokenReserves.eq(new BN(0))) {
    return new BN(0)
  }

  const minAmount = BN.min(amount, bondingCurve.realTokenReserves)

  const solCost = getBuySolAmountFromTokenAmountQuote({
    minAmount,
    virtualTokenReserves: bondingCurve.virtualTokenReserves,
    virtualSolReserves: bondingCurve.virtualSolReserves,
  })

  return solCost.add(
    getFee({
      global,
      bondingCurve,
      amount: solCost,
      isNewBondingCurve,
    }),
  )
}

export function getSellSolAmountFromTokenAmount({
  global,
  bondingCurve,
  amount,
}: {
  global: Global
  bondingCurve: BondingCurve
  amount: BN
}): BN {
  if (amount.eq(new BN(0))) {
    return new BN(0)
  }

  // migrated bonding curve
  if (bondingCurve.virtualTokenReserves.eq(new BN(0))) {
    return new BN(0)
  }

  const solCost = getSellSolAmountFromTokenAmountQuote({
    inputAmount: amount,
    virtualTokenReserves: bondingCurve.virtualTokenReserves,
    virtualSolReserves: bondingCurve.virtualSolReserves,
  })

  return solCost.sub(
    getFee({
      global,
      bondingCurve,
      amount: solCost,
      isNewBondingCurve: false,
    }),
  )
}
export function getStaticRandomFeeRecipient(): PublicKey {
  const randomIndex = Math.floor(Math.random() * CURRENT_FEE_RECIPIENTS.length)
  return new PublicKey(CURRENT_FEE_RECIPIENTS[randomIndex])
}

const CURRENT_FEE_RECIPIENTS = [
  'NG3GjD8dh8Wbfc7JZuvz3FeZueHSh3YSzPLEp6Ygfee',
  '5BuTXUhaypqei2YJZA98GBp8pBsfUTwZjPJUXcUNfee',
  '12NCQpbK2qz9TDfrGxCAzvMpFCuzMFZVLuWjy6qMLfee',
  'ARZFvmvU3GquhNohMXPsviAYKrzZEL543v1JBcMxfee',
  'DMzQqJBLf6LMSrNNXqZKDNYGpYdQyjdphBiQGwPgfee',
  'eBGPq5AaPr6niCDnNFGJ7hZCyVLwnKPwhdfCQZHAfee',
  'Fkeiqm4KasE2Q2tZsG5qEkbzSRbNRAwcRCy8TTQDfee',
  'hEhmwG3XXZRBQknzZ8vYtL5HhWD9VkYeJKmwAH9Nfee',
]
