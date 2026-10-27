# Mayhem current-source initializer recovery

The complete 960-byte O0193 initializer now matches under the existing
normalization: **120/120 instruction slots**, all five immediate callee shapes,
both Source descriptors, the unwrap message, and the typed ProgramError debug
vtable. The current framework composition reaches **430/441 normalized windows,
100 raw-local windows**, preserving every prior matched body, positive call and
Source observation. **Eleven windows / 110,328 original text bytes remain.**
Whole-ELF equality and original source/toolchain identity remain unproved.
The [complete 441-window inventory](inventory.json) classifies 100 raw-equal,
330 normalized-only and eleven unmatched bodies, with candidate names where
available. Names and shape matches do not prove historical source identity.

The 67-file source set differs from the current
[BuyV2 sizing parent](../mayhem-sizing-panic-recovery/README.md) only in
`src/state.rs`. It incorporates the independently reproduced
[staged snapshot](../mayhem-initializer-staged-snapshot-20261027/README.md), while
retaining the current parent's BuyV2 error correction and framework. The real
80-byte snapshot owns one AccountInfo and a copied Pubkey. Its temporary
MaybeUninit key is written unconditionally before the only assumed initialized
reference; the borrow ends before normal snapshot destruction. This preserves
the original copy order without dummy stores, padding, assembly or byte edits.
The typed construction is safe under this fixed write-before-read sequence;
it does not authenticate historical source spelling.

Two incremental native root compilations produce identical stripped and symbol
artifacts. The compiler uses the already qualified macOS v1.54 host and Linux
target-library combination, the existing current-framework curve archive, and
the unchanged qualified linker script. Commands, source maps, hashed direct
inputs and before/after checks are retained. These are **not empty-cache full
dependency builds** and do not resolve original toolchain provenance.

- Current candidate: `499d43ac1e178752cb7ff3899fef103b0ffb9be345aea67af07bbd5c62af6dc6`
- Current symbols: `a96fca79ad903c9bb1fb1c714271019a34d874d64c4b4b9f44ab669afddbf833`

Fresh offline execution covers 6,636 trade pairs / 13,272 signed records and
69 initializer pairs / 168 signed records, including ten successful creations
through the captured Pump program. Results, account effects, events, returns,
inner instructions and non-compute logs agree. The initializer raw logs also
agree. Runtime scopes overlap prior corpora; these are new executions of this
artifact, not 6,705 newly discovered scenarios. No deployment occurred.

A separate historical-macro composition repeats byte for byte and reaches
430/441 normalized / 141 raw-local windows, retaining its parent's 139 raw
matches. Its initializer has the same complete normalized match and passes
69 fresh initializer pairs. This is a separately qualified cross-version
compiler context; its extra raw matches are not added to the current row.
Its trade corpus was not rerun. Raw-local bodies do not establish program-wide
call, data or relocation identity.

```sh
python -B research/mayhem-initializer-current-recovery-20261027/verify.py
python -B research/mayhem-initializer-current-recovery-20261027/test_verify.py
```

Verification requires the repository's existing Python runtime dependencies.
It reads saved artifacts and signatures; it performs no compilation, VM or RPC
execution. The older selected Mayhem program remains distinct from this
validated research frontier.
