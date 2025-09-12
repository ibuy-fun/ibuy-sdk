import BN from 'bn.js'
import { PublicKey } from '@solana/web3.js'
import { Global, BondingCurve } from './state'

export interface CalculatedFeesBps {
  protocolFeeBps: BN
  creatorFeeBps: BN
}

export function getFee({
  global,
  bondingCurve,
  amount,
  isNewBondingCurve,
}: {
  global: Global
  bondingCurve: BondingCurve
  amount: BN
  isNewBondingCurve: boolean
}) {
  const { protocolFeeBps, creatorFeeBps } = computeFeesBps({
    global,
  })

  return fee(amount, protocolFeeBps).add(
    isNewBondingCurve || !PublicKey.default.equals(bondingCurve.creator) ? fee(amount, creatorFeeBps) : new BN(0),
  )
}

export function getFeeOffline({
  amount,
  protocolFeeBps,
  creatorFeeBps,
}: {
  amount: BN
  protocolFeeBps: BN
  creatorFeeBps: BN
}) {
  return fee(amount, protocolFeeBps).add(fee(amount, creatorFeeBps))
}

export function computeFeesBps({ global }: { global: Global }): CalculatedFeesBps {
  return {
    protocolFeeBps: global.feeBasisPoints,
    creatorFeeBps: global.creatorFeeBasisPoints,
  }
}

function fee(amount: BN, feeBasisPoints: BN): BN {
  return ceilDiv(amount.mul(feeBasisPoints), new BN(10_000))
}

function ceilDiv(a: BN, b: BN): BN {
  return a.add(b.subn(1)).div(b)
}
