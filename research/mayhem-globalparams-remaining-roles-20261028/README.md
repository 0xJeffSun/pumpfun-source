# GlobalParams field_10 is the trader sweep-fee interval

Static census of the five GlobalParams roles that `docs/COMPLETION.md` and the
[corrected field crosswalk](../../repro/layered-passes/pass-01/followup-results/mayhem-field-crosswalk/REPORT.md)
still list as unknown. The source under test is the tree that matches all
441 Mayhem windows. One role is now read directly by that source. Three remain
transport-only. This package does not rename fields, patch binaries, or run a
program.

## Problem

`research/mayhem-globalparams-contracts` (PR #284) recovered a consumer for
`field_6` and left `field_0`, `field_1`, `field_3`, and `field_10` without one.
Its `field_10` entry says the consumer, if it existed, could still sit in the
then-unmatched sweep bodies. Those bodies are now in the published 441-window
source. The 30-byte dynamic-symbol residual is already closed by PR #446 and is
not revisited here.

The question is narrow: in the Rust that produces those windows, which of the
five names is actually read as program state, and by which owner?

## Source pins

| Input | SHA-256 |
| --- | --- |
| `research/claude-mayhem-441-20261028/sources/source.tar.gz` (94,829 bytes) | `049ba60cfbc9045ccdb1f9e929aed0111f28e7ac01ef4e96413d836c3e0bf494` |
| `research/mayhem-meaningful-elf-20261028/baseline/source.tar.gz` | same digest as the 441 archive |
| `src/instructions/fee_recipients.rs` inside that archive | `85932d6b0905f9d8abb9aaa95351dfe6971d1744a5f8a43cca7851c8e25de66b` |
| `src/state.rs` | `bbdba89e2ff44fac18dc06a2c75c93718a009ce29c9abdd2b5273886d708c6f0` |
| `src/lib.rs` | `5703fd824d0b8d04a5ff9900fd3b882a850d790cf2eeacb80a09a163549db579` |
| `src/instructions/admin.rs` | `9683684368debce589e639a5e5ceed47d6bf6d598bcf2e0162fbe4d5e1ecad1e` |
| Prior field_10 history in `research/mayhem-globalparams-contracts/contracts.json` | re-read by `verify.py`; values v1..v10 are `86400` six times, then `86280` four times |
| Captured Mayhem payload (`docs/SCOPE.md`) | `a87fa9f866272514e6acb852b668c4a08aeb173d56c883039991d114d1199bdb` |

PR #446's repeat build uses the same 22 program Rust files. Its only member
difference from the 441 archive is `vendor/anchor-lang/src/lib.rs`, the module
order that closes the 30 dynamic-symbol bytes. The stripped meaningful ELF from
that recipe is `9af9e3b1cbc9d89340af4d9d46e4c88d3dc2fc67e0090f9370047d97532ff09d`
(775,416 bytes). This package does not rebuild it.

## What the census finds

`verify.py` masks comments and string literals, then classifies every exact
identifier `field_0`, `field_1`, `field_3`, `field_6`, and `field_10` in the 22
non-vendor Rust files. `self` is attributed only inside `impl FeeRecipient` or
`impl GlobalParams`. A dotted read counts as a business read only when the
receiver is `global_params` or `params`. `field_N: state.field_N` stays an event
projection. `FeeRecipient.field_10` is a different stored value: the last native
sweep timestamp on that recipient account (account offset 10, after the
discriminator, bump, and index).

| Field | Business reads in the 441 tree | Role supported by this source |
| --- | ---: | --- |
| `field_0` | 0 | Still unknown. Optional `u32` storage, event output, and `reset_state` writes zero. |
| `field_1` | 0 | Still unknown. Same transport shape as `field_0`. |
| `field_3` | 0 | Still unknown. Optional `u64` in the native prefix. `reset_state` writes zero. |
| `field_6` | 1 | Already recorded by PR #284. `initialize_state` reads `params.field_6 as i64` into `duration_hours` and stores `now + duration_hours * 3600`. Reconfirmed, not re-executed. |
| `field_10` | 2 | Trader sweep-fee rate-limit interval, in seconds, compared as `i64`. |

The two `field_10` reads are both in `FeeRecipient::validate_sweep`:

```rust
let last = if native {self.field_10}else{self.field_34} as i64;
if last != 0 && global_params.field_10 as i64 != 0 {
    let interval = global_params.field_10 as i64;
    let next_time = last + interval;
    require!(current_time >= next_time, crate::MayhemError::SweepFeeRateLimit);
}
```

`SweepFees::sweep` calls `validate_sweep` for each recipient pair.
`SweepFeesAdmin::sweep` does not. The interval is therefore a trader-sweep
gate, not an admin-sweep gate. Zero interval or a zero last timestamp skips
the comparison, the same inactive-zero shape already recovered for the trade
interval. After the check passes, the recipient stores `current_time` in
`FeeRecipient.field_10` (native) or `FeeRecipient.field_34` (non-native). One
GlobalParams interval serves both quote families.

`reset_state` assigns zero to `field_0`, `field_1`, `field_3`, and `field_6`.
It does not assign `field_10`. The amount caps `max_sol_per_sweep` and
`max_stable_per_sweep` remain separate fields and are what `sweepable`
compares against. The error raised by the new read is
`SweepFeeRateLimit = 19` (`"Sweep fee Rate limit"`).

The stored history is consistent with a seconds interval near one day:
86,400 for versions 1–6, then 86,280 from version 7. This package only
re-reads that published series. It does not explain the 120-second reduction.

## What this does not show

- Historical identifiers. The neutral names stay.
- A business meaning for `field_0`, `field_1`, or `field_3`. In these 22 files
  the census records only declarations, optional updates, event output, and
  reset writes.
- That `programs/mayhem` `sweep_remaining` already contains this comparison.
  That older helper writes the recipient timestamp and does not read
  `GlobalParams.field_10`. It is left unchanged.
- A new build, runtime receipt, handler count, or whole-file equality result.
- Initializer behavior beyond the one already published `field_6` quote.
  That lane stays stopped and is not executed.
- Why version 7 changed 86,400 to 86,280.

## Verify

From the repository root, with the standard library only:

```sh
python3 -B research/mayhem-globalparams-remaining-roles-20261028/verify.py
python3 -B research/mayhem-globalparams-remaining-roles-20261028/test_verify.py
```

`verify.py` recomputes the archive digest, re-lexes the 22 files, checks the
business-read set, checks that `reset_state` still preserves `field_10`, checks
that only the trader sweep calls `validate_sweep`, and checks that the
meaningful-ELF repeat archive differs only in the Anchor module file.
`survey.json` is that census. `test_verify.py` rejects comments, string
literals, a `FeeRecipient` timestamp mistaken for the global interval, an
injected `field_0` read, and an admin sweep that starts calling
`validate_sweep`.
