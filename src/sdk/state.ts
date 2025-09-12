import BN from 'bn.js'
import { PublicKey } from '@solana/web3.js'

export interface Global {
  // unused
  initialized: boolean
  authority: PublicKey
  feeRecipients: PublicKey[]
  initialVirtualTokenReserves: BN
  initialVirtualSolReserves: BN
  initialRealTokenReserves: BN
  tokenTotalSupply: BN
  feeBasisPoints: BN
  withdrawAuthority: PublicKey
  // Unused
  enableMigrate: boolean
  poolMigrationFee: BN
  creatorFeeBasisPoints: BN
}

export interface BondingCurve {
  virtualTokenReserves: BN
  virtualSolReserves: BN
  realTokenReserves: BN
  realSolReserves: BN
  tokenTotalSupply: BN
  complete: boolean
  creator: PublicKey
}

export interface Fees {
  lpFeeBps: BN
  protocolFeeBps: BN
  creatorFeeBps: BN
}
export interface FeeTier {
  marketCapLamportsThreshold: BN
  fees: Fees
}
