# Liquidity structure and can-boost recovery

A new signed boundary probe found six genuine false failures in the guarded
AMM candidate `2f5dfd02…`. With virtual quote reserves near `i128::MAX` and small
accrued protocol fees, the original successfully deposits/withdraws while the
candidate returns Overflow and rolls back. The original's can-boost predicate
swallows a failed effective-virtual calculation and returns false; the merged
candidate handler propagated the error eagerly.

`baseline.json` retains all 18 cases and `baseline-transactions.json.gz` retains
36 signed executions. `verify_probe.py` checks actual signatures, identical
instruction messages, recorded logs and all final-state differences. These
cases demonstrate an observable behavioral gap; this is not only a compiler
layout difference.

`original-functions.json` records the original function boundaries, hashes and
actual calls:

| Original start | Bytes | Recovered role |
| --- | ---: | --- |
| `0x2fb38` | 7,128 | Deposit business handler |
| `0x32750` | 7,200 | Withdrawal business handler |
| `0x6ba68` | 616 | Accrued fee sum |
| `0x6bcd0` | 640 | Available quote reserve |
| `0x6bf50` | 760 | Effective virtual quote reserve |
| `0x6c248` | 224 | Nonzero-effective-reserve predicate; false on error |
| `0x12840` | 712 | Floor proportional amount from three u64 operands |
| `0x12b08` | 1,672 | Ceiling division of two u128 operands |

The small `source.patch` is confined to `lib.rs`: it extracts the four Pool
arithmetic helpers and gates/reloads effective virtual reserves like the
original. `prepare.py` applies it to a supplied isolated source tree without
touching `state.rs`. Its prepared tree is
`work/amm-liquidity-structure-20261027/source`.

`split.patch` is a separate, unbuilt structural experiment on top of that fix.
It uses compile-time deposit/withdraw paths and the recovered floor/ceiling
helper signatures. The prepared tree is
`work/amm-liquidity-structure-20261027/split-source`. No compiler layout
attributes, padding, or instruction bytes are introduced. Neither patch is
claimed as adopted or byte-matched until the integration build is measured and
validated. Exact source identifiers and historical source locations remain
unproved.

## Isolated split experiment result

The private COW-cache Linux build succeeded with dependency artifacts unchanged.
`results` freezes its source, actual build record/log, binaries, measurements and
signed receipts. Candidate SHA-256 is
`fa71948adfb003ba20a4e70938edf430547e6970fea37e40a9b4e0a63ff7805c`.
It has 552 normalized matches versus 550 for its base, gaining both complete
1,336-byte deposit/withdraw entry wrappers (`0xe5278`, `0xe57b0`) and losing none.
The artifact is 1,294,592 bytes; the large business handlers still do not match
the original. This trial does not establish whole-binary identity.

All 680 existing liquidity cases and all 18 overflow-boundary cases pass full
recorded-field/log comparison, with only compute and source locations excluded.
Every one of the 1,396 executions retains verified signatures and paired
instruction messages. Run `verify_saved.py` to recompute those checks and the
measurement. The source remains an isolated trial pending root integration.
