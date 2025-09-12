# iBuy SDK

iBuy SDK–style TypeScript SDK for the ibuy Anchor program

## SDK Demo

[SDK Demo](https://github.com/ibuy-fun/ibuy-sdk/tree/main/test)

## Usage Guide

### Initialization

```Typescript
const connection = new Connection(
    "https://api.devnet.solana.com",
    "confirmed",
);
const ibuy = new IBuySdk(connection)
```

### Coin creation

```Typescript
const mint = PublicKey.unique();
const creator = PublicKey.unique();
const user = PublicKey.unique();

const instruction = await ibuy.createInstruction({
    mint,
    name: "name",
    symbol: "symbol",
    uri: "uri",
    creator,
    user,
});

// or creating and buying instructions in the same tx

const global = await ibuy.fetchGlobal();
const solAmount = new BN(0.1 * 1e9); // 0.1 SOL

const instructions = await sdk.createAndBuyInstructions({
    mint,
    name: "name",
    symbol: "symbol",
    uri: "uri",
    creator,
    user,
    solAmount,
    amount: getBuyTokenAmountFromSolAmount({ global, bondingCurve: null, amount: solInputAmount }),
    feeRecipients: global.feeRecipients,
});
```

### Buying coins

```Typescript
const mint = PublicKey.unique();
const user = PublicKey.unique();

const global = await ibuy.fetchGlobal();
const { bondingCurve, associatedUserAccountInfo } = await ibuy.fetchBuyState(mint, user)
const solAmount = new BN(0.1 * 1e9); // 0.1 SOL

const instructions = await ibuy.buyInstructions({
    associatedUserAccountInfo,
    mint,
    user,
    solAmount,
    amount: getBuyTokenAmountFromSolAmount({ global, bondingCurve: bondingCurve, amount: solAmount }),
    slippage: 1,
    feeRecipients: global.feeRecipients,
    creator: bondingCurve.creator,
});
```

### Selling coins

```Typescript
const mint = PublicKey.unique();
const user = PublicKey.unique();

const global = await ibuy.fetchGlobal();
const { bondingCurve, associatedUserAccountInfo } = await ibuy.fetchSellState(mint, user)
const amount = new BN(100_000 * 1e9); // 100k Coin

const instructions = await ibuy.sellInstructions({
    mint,
    user,
    amount,
    solAmount: getSellSolAmountFromTokenAmount(global, bondingCurve, amount),
    slippage: 1,
    feeRecipients: global.feeRecipients,
    creator: bondingCurve.creator,
});
```

### Creator fees

```Typescript
const creator = PublicKey.unique();

// Getting total accumulated creator fees for iBuy
console.log((await ibuy.getCreatorVaultBalance(creator)).toString());

// Collecting creator fees instructions
const instructions = await ibuy.claimCoinCreatorFeeInstructions(creator);
```
