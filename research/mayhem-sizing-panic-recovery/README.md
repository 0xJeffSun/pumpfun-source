# Recover BuyV2's typed sizing failure

When the virtual quote reserve is zero, BuyV2's duplicated sizing arithmetic
unwraps an `Option`. The captured original instead uses the typed
`PumpCpiMathOverflow` error (variant 9) at `state.rs:378:89`. Both reject the
transaction, but the reconstruction emits an extra panic message and the wrong
source location.

This one-file Rust change routes BuyV2 through the existing `buy_amounts` helper
in the [trade-origins/validator parent](../mayhem-trade-origins-validator/README.md).
It retains the native/token-specific cap, retained-reserve calculation and real
token cap. The helper is inlined by the compiler, as in the original. The other
66 source inputs, including the complete shared state module, are unchanged.
No executable patching, assembly, binary padding or diagnostic rewriting is used.

## Results

- **6,636 fresh original/candidate comparisons pass** across all fourteen existing
  trade/currency suites. Errors, watched accounts, events, inner instructions and
  return data agree. Every complete log also agrees after removing only
  compute-consumption lines.
- **Three BuyV2 diagnostic differences are repaired**, covering native, token and
  Token-2022 quote families. A separate original/control/proposal replay verifies
  the signed payloads, actual curve reserves `(1, 0)`, vault amount `1`, currency
  identities and executed-program hashes. These three cases overlap the full
  corpus and are not additional unique coverage.
- **All 429/441 normalized and 100 raw-local matches survive**, along with 4,288
  positive direct-call observations and 446 matched Source observations.
  No complete function match is added. Twelve bodies, covering 111,288 original
  text bytes, remain unmatched.
- The parent's complete quote-validator reference checks and all three recovered
  handler-origin checks pass against this candidate: fourteen typed validator
  data references, eight immediate validator callees, 21 trade Source descriptors,
  three CPI origins and 148 immediate-callee shape observations.
- **13 negative/control tests pass**, including incorrect executed-program hashes,
  invalid signatures, mislabeled account inputs with matching sides, redirected
  live-handler calls and altered panic discriminants, Source records or vtables.

The verifier independently checks 13,272 signed full-corpus records and nine
focused records. These are record counts, not distinct signed payload counts.
All executions use the existing local LiteSVM fixtures. No live transaction is
submitted. Finite synthetic cases do not establish unrestricted behavior.

## Source and build identity

The parent landed on main in `e2b9060f6`, included by `5f7e67879`. The exact
67-input source set is recorded in `source-inputs.json` and materialized in
`source.tar.gz`. `source.py`, `source.patch` and the single `overrides/` file are
checked independently against that parent archive.

A fresh dependency/control build reproduces the parent's complete stripped and
symbol ELFs exactly. Two subsequent proposal root compilations agree byte for
byte; they reuse the control's locked dependency build.

| Artifact | SHA-256 |
| --- | --- |
| Parent/control stripped, 755,048 bytes | `64da456052f6c359b5841e8e91c59db64a8e8778cf944fa13a158b141039c1ad` |
| Proposal stripped, 755,088 bytes | `f4f6a36829043aac0a49f1604b84cdf3650c88d3acee49ef6bf1e5f32a63e583` |
| Proposal with symbols | `2f6e9ad94c07e28d03498b771cc2b25a4e375ca44ae762edc6f91d83e62e1956` |

The recipe uses the parent's official macOS ARM v1.54 compiler tools, exact 26
official Linux v1.54 SBF target-library files, unchanged qualified linker script
and v1.52 stripper. Full commands, logs, tool/source hashes, raw outputs and
linker maps are retained. Original ELFs are comparison inputs only.

`static.py` follows the complete matching entry wrapper into the live BuyV2
handler and checks its inlined 88-byte typed panic setup: u32 variant 9 passed by
reference, the exact 43-byte Result panic message, four-byte Debug size/alignment,
and the typed Source record. Complete immediate panic/Debug callee bodies match
under the existing normalizer. The enclosing BuyV2 body and complete ELF remain
unequal. This is bounded recovery, not historical-source authentication or a new
selected checkpoint. Earlier non-trade receipts keep their earlier binary bindings.

## Verify and reproduce

With the repository's Python dependencies installed, from its root:

```sh
python -B research/mayhem-sizing-panic-recovery/verify.py
python -B research/mayhem-sizing-panic-recovery/test_scope.py
python -B research/mayhem-sizing-panic-recovery/verify.py \
  --skip-runtime --materialize /absolute/new/buy-v2-source
```

Verification reads saved evidence without compiling, executing a VM or accessing
the network. Materialization requires a new directory. To rebuild and replay
using an SDK matching `builds/control/launch.json`:

```sh
python -B research/mayhem-sizing-panic-recovery/build.py \
  --source /absolute/new/buy-v2-source --sdk /absolute/prepared-sdk \
  --cargo-home /absolute/locked-cargo-home --target /absolute/build-target \
  --output /absolute/new/build-output --strip /absolute/v1.52/llvm-objcopy \
  --linker-script research/mayhem-trade-origins-validator/config/ordered.ld
python -B research/mayhem-sizing-panic-recovery/replay.py \
  --candidate /absolute/new/build-output/candidate.so \
  --output /absolute/new/trade-receipts --jobs 4
python -B research/mayhem-sizing-panic-recovery/focused.py \
  --control /absolute/parent-control/candidate.so \
  --candidate /absolute/new/build-output/candidate.so \
  --output /absolute/new/focused.json.gz
```

PR checks found no overlap with Fees #252, Mayhem allocator-context #253 or REA
#254. A final upstream refresh found the newly merged trade-origins/validator
recovery, which already addressed legacy Buy and SellV2. This packet therefore
uses that successor as its parent and changes only the remaining BuyV2 path.
