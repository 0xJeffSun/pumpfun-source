# PumpSwap v2-trade transfer-fee diagnostics above the SPL-valid bps maximum

## Problem

The companion packet `research/amm-transfer-fee-bps-overflow-20261028`
(PR #450) showed that a Token-2022 quote mint whose fee entry carries
basis points above the SPL-valid maximum (10000) reaches the fee
arithmetic in the liquidity deposit/withdraw paths, because the decoder
(`crates/native-transfer-fee`) reads bps as a raw `u16` and never caps it.
That packet did not cover the v2 trade instructions, which call the same
helpers from different handlers (`programs/pump-amm/src/instructions/swap/trade_v2.rs`).

## Cases

Six fresh-VM triples (original / #424 control / #427 candidate), 18 signed
executions, built on the repository's own trade-v2 differential harness
(`scripts/pump_amm_trade_v2_differential.py`) and its `trade_transferfee`
mint override: the quote-mint TLV fee entry carries the case's bps and a
`u64::MAX` maximum fee in both the older and the newer schedule. The clock
is slot 100, epoch 0, as in the #427 matrix. `producer.py` reproduces
every receipt from the repository files.

| Case | Instruction | bps | Amount | Original | Control | Candidate |
| --- | --- | ---: | ---: | ---: | ---: | ---: |
| sell_v2-bps-65535-amount-10000000000 | sell_v2 | 65535 | 10,000,000,000 | **57** | 28 | **57** |
| sell_v2-bps-10001-amount-10000000000 | sell_v2 | 10001 | 10,000,000,000 | **57** | 28 | **57** |
| sell_v2-bps-65535-amount-1-agreement | sell_v2 | 65535 | 1 | 6004 | 6004 | 6004 |
| buy_v2-bps-65535-amount-10000000000 | buy_v2 | 65535 | 10,000,000,000 | **67** | 35 | **67** |
| buy_v2-bps-10001-amount-10000000000 | buy_v2 | 10001 | 10,000,000,000 | **67** | 35 | **67** |
| buy_v2-bps-65535-amount-1 | buy_v2 | 65535 | 1 | **67** | 35 | **67** |

Lines are `programs/pump-amm/src/utils/transfer_fee.rs` `AnchorError`
sites, error 6023 (`Overflow`) throughout, except the amount-1 sell case,
which errors 6004 identically on all images. `verify.py` rechecks every
receipt independently: signature validity, the patched TLV bps/max in the
before snapshot, the diagnostic line per image, and rollback except the
payer's 5000-lamport fee on failures.

## Result

- **The v2 trade paths agree with the liquidity paths.** A sell_v2 with a
  bps-10001 (or 65535) quote mint reports line 57 on the original and the
  #427 candidate (control: 28), via `amount_after_fee`; a buy_v2 reports
  line 67 (control: 35), via `amount_before_fee`. The #427 fix therefore
  covers the trade instructions too; no source change is needed or claimed
  here.
- The buy path triggers at every amount (even amount 1), because the
  gross-up itself is unsolvable once bps exceeds 10000. The sell path
  triggers once the fee exceeds the received amount; the amount-1 sell
  fails earlier (6004) identically on all images, showing the malformed
  bps does not change that boundary.

## Limits

- No source change, no build, no whole-program identity claim. The images
  are the merged #424 and #427 artifacts; only the new runtime cases are
  added.
- Line 49 (`calculate_fee` overflow) is still untriggered: reaching it
  needs a fee input above ~2.81 x 10^18 with bps 65535, which no pool in
  these fixtures can supply. The live direct `calculate_fee` call sites
  are the multi-hop sell hops; a deep-pool fixture may reach it.
- No live transaction was submitted. All executions are offline LiteSVM
  replays with normally signed transactions.
