# Mayhem 432-window research source under a clean, reproducible pinned build (28 Oct 2026)

**Question answered.** The published 432-window Mayhem frontier
(`research/mayhem-quotes-current-recovery-20261027`) was produced by an
incremental root compilation bound to one developer's scratch tree: a
`layout-lane-linux-target2-sysroot` rustc, unpublished cached dependency
archives under `work/…/parallel-targets/`, and a custom linker script
(`ordered.ld`) whose section order is keyed to one codegen hash
(`a46a1b6815b9c4-cgu.0`). None of that is reproducible from committed inputs.
This packet measures what the **same 67 source files** recover under a recipe
anyone can reproduce: the pinned official v1.54 toolchain, `cargo build
--locked --offline`, and the default linker.

## Result

| Candidate | raw-equal | normalized-only | unmatched | matched text |
| --- | ---: | ---: | ---: | ---: |
| selected `programs/mayhem` (v1.54, [independent reproduction](../mayhem-v154-independent-reproduction-20261028/README.md)) | 58 | 255 | 128 | 187,016 B (26.5%) |
| **frontier source, clean pinned rebuild (this packet)** | **83** | **327** | **31** | **557,664 B (78.9%)** |
| frontier published artifact (layered toolchain + `ordered.ld`) | 100 | 332 | 9 | 598,792 B (84.7%) |

Two findings:

1. **The research source is robustly ahead of the selected source**, not only
   under its bespoke recipe. Rebuilt cleanly it still matches 410/441 windows
   versus the selected source's 313/441, and 78.9% versus 26.5% of original
   text. The six trade bodies, Burn and the large parsers that are unmatched in
   the selected build are mostly matched here (only the trade bodies, Burn and
   a few helpers remain).
2. **22 windows depend on the non-reproducible layout recipe.** The clean build
   loses 17 raw-equal and 22 normalized windows relative to the published
   artifact: `O0094`, `O0095` (quote validation), `O0090` (shared buy
   accounting), five 1,000-byte helpers `O0114/O0139/O0143/O0150/O0158`, the
   short wrappers `O0085/O0086/O0088/O0089/O0078/O0080`, `O0073`, `O0074`,
   `O0072`, `O0100`, `O0117`, `O0147`, and two 40-byte stubs. These are the
   layout-sensitive bodies: their instruction bytes depend on where the linker
   places them or their neighbours. They quantify the provenance cost that the
   status documents flag as open ("selected-source promotion of research").

Whole-file identity remains false in every row. No window match here is a
source-identity, call/data-closure or semantic claim.

## Determinism

Two fully independent runs (fresh materialized source, fresh target directory)
produced identical artifacts:

| artifact | sha256 |
| --- | --- |
| `symbols.so` (unstripped) | `d6ea5caa34d876a29f790ef70690daeb7a5b41d7176c36412743b70d27b05440` |
| `candidate.so` (stripped) | `6fa1945d4041587226c5091258b61ad7e1d86590024c962228820d63d1485944` |

Both runs: raw 83 / normalized 327 / unmatched 31, 557,664 matched text bytes.

## Reproduce

```sh
# 1. materialize the exact 67-file source from pinned, committed inputs (hash-verified 67/67)
.venv/bin/python research/mayhem-frontier-clean-rebuild-20261028/materialize_frontier_source.py <src-dir>

# 2. one-time crate fetch for the vendored-anchor lock (217 packages)
(cd <src-dir> && ~/.cache/solana/v1.54/platform-tools/rust/bin/cargo fetch --locked)

# 3. clean offline build + strip + 441-window inventory, in one step
research/mayhem-frontier-clean-rebuild-20261028/build_and_measure.sh <new-output-dir>
```

Source composition (all hashes checked against the quote-pair packet's
`source-inputs.json`):

| layer | file(s) |
| --- | --- |
| `research/mayhem-initializer-current-recovery-20261027/source.tar.gz` (`0e0254f2…`) | 67-file base snapshot |
| `research/mayhem-sell-current-recovery-20261027/overrides/` | `src/instructions/sell_pump_swap.rs` |
| `research/mayhem-current-ownership-composition-20261027/sources/qualified.rs` | `src/instructions/pump_interface.rs` |
| `research/mayhem-quotes-current-recovery-20261027/overrides/` | `src/instructions/buy_pump_swap.rs`, `src/state.rs` |

The source differs structurally from `programs/mayhem`: it adds a
`curve-accounts` path crate, patches `anchor-lang` from `vendor/anchor-lang`
(`[patch.crates-io]`), and uses `cargo-features = ["profile-rustflags"]` for a
per-package `--remap-path-prefix`. Promoting it into the CI-bound selected tree
is a maintainer decision; this packet does not change `programs/mayhem`.

## Scope and limitations

- Static window partition via the repository matcher
  ([inventory tool](../mayhem-window-inventory-tool-20261028/README.md),
  calibrated to the published 100/332/9).
- Measures reproducibility of the *source's* recovery; it does not reproduce
  the published artifact and does not claim the layered recipe is wrong.
- No runtime replay was run here; the quote-pair packet's 6,636 trade pairs
  bind to its own artifact, not to this one.
- Build outputs live under git-ignored `work/`; only the scripts and this
  note are committed.
