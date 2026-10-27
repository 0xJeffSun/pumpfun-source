# Legacy shared fee selector

Original entry `0x13458`, length 2,264 bytes. Its three direct call sites are `0x379a0`, `0x3b0d0`, and `0x49dd0` (ordinary buy, exact-quote buy, and sell). It remains unmatched as a whole function in the current checkpoint.

The ordinary-buy caller supplies:

| Machine argument | Observed producer / interpretation |
| --- | --- |
| r1 | result storage |
| r2 | pool account from handler field +0x120 |
| r3 | global-config account from +0x130 |
| r4 | address of inline fee-config account (handler base address) |
| stack +0 | address of fee-program field +0x1b0 |
| stack +8 | config-program account info from +0x190 |
| stack +16 | base-mint interface account from +0x138 |
| stack +24 | base-reserve value |
| stack +32 | quote-reserve value |
| stack +40 | quote amount for applied-fee calculation |

The exact original Rust wrapper types and whether some arguments were promoted from references are not established. The order and direct use above are machine-code observations, with reserve roles resolved through the called arithmetic helper.

The selector clones CPI accounts, derives the canonical creator from `pool.base_mint` and the `pool-authority` seed, and calls the 744-byte helper at `0x6b780` to calculate market cap. That helper checks base reserves for zero, substitutes `1_000_000_000_000_000` supply in mayhem mode, then computes `(supply * quote_reserves) / base_reserves` as u128. It calls the captured fee program with the pool quote mint, and accepts exactly the expected three-u64 return payload.

At `0x13c30`, the selector reads the creator-configurable flag from global-account offset `0x3b4`. Only when the flag is nonzero does it inspect pool-account offset `0x100`, and only when that override is also nonzero does it replace the returned creator basis points. This is the guard missing from the prior legacy and multi-hop reconstruction. The 64-case signed differential suite in this directory proves its effects and the corrected candidate's parity.

The selector then calls `0x14700` (544 bytes) with the pool, quote amount, and three selected basis-point values. That helper calculates LP and protocol amounts through `0x13190` (712 bytes), checks the pool's coin creator against the zero key before calculating the creator amount, and returns six u64 fields: LP/protocol/creator basis points and LP/protocol/creator fee amounts. The returned `Result` stores its success tag at byte 0 and these six fields at byte offsets 8 through 48. These field names are semantic labels, not recovered source identifiers.

A faithful structural extraction must preserve this complete selector/result boundary instead of extracting only the fee-program CPI. In particular, it must retain the global override gate, canonical/mayhem market-cap inputs, strict return decoding, and zero-creator applied-fee behavior. The exact-buy amount operand and the sell return consumption are now resolved below. The Rust wrapper/reference spellings are still an inference.

## Exact-quote caller and mandatory initial fee calculation

The exact-quote caller invokes `0x74900` at `0x3af10`. That helper saves the gross amount, obtains the Token-2022 transfer fee, checks the subtraction, and returns `gross - transfer_fee`. The caller stores that successful result in stack slot `-0x670` at `0x3af40`, checks it for zero, and later copies the slot to stack argument `+40` at `0x3b068` before calling the legacy selector at `0x3b0d0`.

The selector therefore calculates initial fees on the post-transfer-fee **available** amount. The exact handler subsequently calls the fee-rounding helper three more times on its inverse-price estimate. Skipping the initial computation changes observable error order: excessive initial fees can raise Truncation before a later token transfer would fail for insufficient funds.

`probe_exact_fee_order.py` records 12 signed cases, with four mismatches in the previously guarded candidate for 10,001/20,000 basis points at gross u64::MAX. `probe_exact_fee_transfer_operand.py` records four additional cases that distinguish gross and available operands. At 20,000 bps and gross u64::MAX, a transfer-fee cap of `u64::MAX//2` leaves available 2^63 and the original truncates; increasing the cap by one leaves 2^63-1 and the original reaches the later token error. The proposed `exact-fee-precomputation.patch` uses the latter available amount and retains normal-buy reuse of the initial values.

## Sell result consumption and checked-operation order

The sell call at `0x49dd0` supplies the requested trade's computed gross quote amount as stack argument `+40`. On success, its six return fields are copied at instructions 37952–37960; whitelist comparison follows at 37961–37979. This proves that the fee calculations are complete before whitelist exemption. The comparison reads global-account `+0x248`, corresponding to the serialized `whitelist_pda` field at offset 353 in the probe fixtures.

The original then executes these stages in order:

1. Check gross quote minus LP fee (instructions 38000–38007).
2. Compute real quote reserves through the shared pool helper (38012–38019).
3. Require real quote reserves to cover gross quote minus LP fee (38021–38026).
4. Subtract the creator fee (38075–38090), then the protocol fee (38091–38098).
5. Continue with minimum-output and Token-2022 transfer-fee checks, transfers, and remaining-account validation.

The previous candidate checked accrued reserves before calculating fee amounts, and deducted all three fees before validating real reserves. The preserved `legacy-fee-collisions-before.json` has 72 signed original/candidate pairs across buy, exact buy, and sell; eight sell collisions distinguish original Truncation (6024) from candidate Overflow (6023). The 60-pair `sell-reserve-collisions-before.json` additionally shows that zero real reserves plus excessive protocol or creator bps produces original InsufficientRealQuoteReserves (6063), while the old candidate underflows first (6023). The six whitelist-related differences in the broader matrix are explained by the separately recovered waiver. Buy and exact-buy show no additional precedence change in this bounded matrix.

`legacy-sell-fee-sequence.patch` restores this complete order and the original source-bearing Overflow diagnostic for real-reserve subtraction. It supersedes the smaller, unbuilt `legacy-sell-fee-order.patch`. Both are isolated source proposals until a rebuilt candidate is validated.

## Structural source variant

`shared-fee-selector-v2.patch` is a separate optional overlay on the complete sequence variant. It introduces `curve/fees.rs`, matching the original fee calculator's embedded source path at `0x133b0` (pointer `0x11c551`). Its selector takes pool, global config, fee config, fee program, config program, base mint, base reserve, quote reserve, and quote amount in observed ABI order. It returns a six-u64 `AppliedFees` value and keeps the zero-coin-creator decision in the amount-calculation helper. The original unbuilt `shared-fee-selector.patch` omitted the event's supply local and is superseded by v2.

This variant uses ordinary Rust functions without inlining or layout directives. A successful source build, signed differential replay, symbol-boundary comparison, and unchanged-normalization measurement are required before considering promotion. Exact source identifiers and reference types are not proven by the original machine code; the proposed names are semantic labels.

## Consolidated signed acceptance matrix

`run_fee_order_suite.py` runs 209 cases (418 original/candidate executions): initial exact fee arithmetic, Token-2022 amount selection, saturated denominator, absent coin creator, whitelist fees and remaining-account consumption, and the two collision matrices. The gzip receipts under `fee-order-results/before` preserve the guarded pre-fix candidate `2f5dfd...` and its 87 recorded field/log mismatches. `verify_fee_order_receipts.py` independently checks producer/receipt/candidate hashes, verifies every signature, asserts exact original/candidate serialized-message and prestate equality, recomputes all recorded field deltas, and optionally requires zero mismatches. It excludes only compute-unit log lines and original/candidate source coordinates, preserving error wording and compared values.

The composite candidate `ae8ac382db78f9542a3366f7281e15cbc5a19107849797ae805291114c48ef77` passes all 209 cases and the additional 64 creator-gate cases: 273 cases, 546 signed executions, zero captured field/log differences. Receipts are retained under `fee-order-results/after-ae8ac382`, and the independent verifier passes with both `--candidate` and `--require-parity`. This validates the targeted semantics, not exhaustive equivalence or whole-file byte identity. Its cashback/pool-v2 helper boundaries remain 8,624/1,320 bytes, with the pool helper still differing at 40 instruction offsets; see `order-recovery-helper-comparison.json`.
