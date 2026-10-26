# SDK integration test — @pump-fun SDK vs the reconstructed programs on localnet

_2026-10-25. End-to-end proof that the official `@pump-fun/pump-sdk` drives the reconstructed
Pump programs: the original goal ("locally test our new sdk integration") achieved on the
behavioral reconstruction, independent of whole-binary byte-identicality._

## Result: 6/6 steps passed
Against a `solana-test-validator` loaded with the four reconstructed candidates + five captured
dependencies + the three global configs (via `../localnet-sdk-testing/start_localnet.py`) plus the
two trade-lifecycle singletons (below), with `@pump-fun/pump-sdk@4.3.1` / `pump-swap-sdk@2.2.0`,
`@solana/web3.js@1.98.0`, `@coral-xyz/anchor@0.31.1`:

| Step | Result |
|---|---|
| airdrop user | ✅ |
| `PumpSdk.decodeGlobal` of the seeded config | ✅ initialized, feeBps 95, createV2Enabled |
| `createV2Instruction` → send | ✅ confirmed on-chain; coin + bonding curve created |
| `decodeBondingCurve` of the new curve | ✅ vTok 1.073e15 / vSol 3.0e10 / realTok 7.931e14, complete=false |
| `buyV2Instructions` → send | ✅ confirmed; pump_fees `GetFeesWithQuoteMint` CPI, Token-2022 `TransferChecked`, `TradeEvent` emitted |
| `sellV2Instructions` → send | ✅ confirmed; full round-trip |

So the SDK's instruction builders, account/PDA derivations, discriminators and state decoders all
agree with the reconstructed `pump` + `pump_fees` programs through a complete create → buy → sell
bonding-curve lifecycle. The buy exercises the real pump→pump_fees fee CPI and a Token-2022 quote
transfer; the SDK decodes the seeded `Global` and the program-written `BondingCurve` exactly.

## Reproduce
```sh
# 1. start the validator (fresh ledger) with the 4 candidates + 5 deps + 3 global configs
python3 ../localnet-sdk-testing/start_localnet.py work/sdk-ledger &   # or build the command and add the two seeds below

# 2. build + add the two trade-lifecycle singletons the minimal seed omits, then (re)start with:
python3 build_trade_lifecycle_seeds.py work/trade-seeds
#   --account Hq2wp8uJ9jCPsYgNHex8RtqdvMPfVGoYwjvF1ATiwn2Y work/trade-seeds/seed_gva.json
#   --account 8Wf5TiAheLUqBrKXeYg2JtAFFMWtKdG2BSFgqUcPVwTt  work/trade-seeds/seed_feeconfig.json

# 3. run the SDK flow
npm install @pump-fun/pump-sdk@4.3.1 @pump-fun/pump-swap-sdk@2.2.0 @solana/web3.js@1.98.0 @coral-xyz/anchor@0.31.1 @solana/spl-token@0.4.13 bn.js
node run_sdk_test.mjs   # expects RPC at http://127.0.0.1:8899
```

## Honesty / scope
- This is a bounded behavioral demonstration, not a byte-identity or full-ABI claim. It covers
  create_v2 + buy_v2 + sell_v2 on a SOL-quote, non-Mayhem, Token-2022 coin.
- Two lifecycle singletons are reconstructed fixtures: `global_volume_accumulator` is a fresh
  zeroed account with validator-clock-aligned day window (no mainnet balance history), and
  `fee_config` is the captured mainnet account. They stand in for admin-initialized state the
  minimal seed omits; they do not reproduce mainnet volume/fee history.
- Small test buys credit per-coin vaults sub-rent amounts, so the harness pre-funds the exact
  account the runtime flags (`InsufficientFundsForRent`) — a localnet fixture detail; mainnet
  vaults are already rent-funded.
- Not covered here: Mayhem create/trade, v3 transfer-fee quote routes, nested/multi-hop, the
  incentive admin/claim flows, and PumpSwap AMM pool flows — each needs its own lifecycle setup.
