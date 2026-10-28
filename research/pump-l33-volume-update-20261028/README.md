# L33 volume update: 1011/1035 normalized windows

This isolated research packet recovers the complete 1,864-byte Pump update window at `0x7bfd8`. The native Linux control is unchanged L33: **1010 normalized / 166 raw**. This candidate is **1011 normalized / 166 raw**, with one normalized gain and **zero normalized or raw losses**. Whole-ELF byte identity remains false. The published L33 raw count is 168; the native Linux control, candidate, SDK and source-wrapper cohort here consistently use 166.

Only `programs/pump/src/token_incentives/volume_accumulator.rs` changes. `source.patch` is its exact diff from the immutable L33 package. `source.tar.gz` contains the entire compiled Cargo workspace, and `build-record.json` binds every source file, the SDK binaries, target libraries, wrapper, command and compiler environment. Both local path crates, `pump-token-ext` and `pump-recovered`, were freshly compiled. No published source, dependencies, SDK or comparator were edited. The dependency target was privately copied from the L31 seed and never written in place.

The recovery ports the already recovered AMM union7 volume decomposition, identified by `amm_final_five`: rollover returns a `Result`, the dispatcher maps it to `Result<Option<day>>`, applies current volume only through `if let Ok(Some(day))`, and returns `result.map(|_| ())`. Separate, used helpers add global and user volume. Pump retains its original public arguments and initial user-key copy. This is source recovery without original-byte embedding or binary edits.

The full 1035-window census uses the published L33 boundaries and the unchanged repository normalization: internal direct-call immediates and ELF-address operands only. All 13 outgoing direct calls from the gained body point to complete normalized-original matched callees. Its matched caller, the claim handler at `0x75308`, calls the real gained body. `calls.json` records both checks.

**Synthetic source positioning is inherited and extended.** This delivery uses the existing blank-line space to place the same recovered operations at their measured original coordinates: the Truncation conversion at line 103 and panic Locations `53:14`, `78:17`, `108:14`, `429:43`, `431:14`, `436:28`. These are the actual operations that generate those errors and panics. All six gained-body panic Locations, their filenames and its SDK Location equal the original (`pointers.json`). The file remains 470 lines; the pre-existing scheduler, end-day and cashback Source coordinates do not move. The unusual indentation and blank blocks preserve measured coordinates.

Focused signed offline validation uses the captured upgradeable loader: 334 claim-boundary cases and 2 panic cases, **336 cases with zero structured mismatches**. The gained accrual overflow panic now matches the original source, line, column and message. The unrelated pre-existing `record_claim` panic still reports `148:10` against original `136:14`; this function was not changed. The root integration lane owns the complete 44-suite replay; this packet claims only its focused replay.

```sh
python research/pump-l33-volume-update-20261028/verify.py
```

`verify.py` checks all packet hashes, full compiled-source binding, exact source diff, unchanged other Rust inputs, both native ELFs, all 1035 windows, the gain/loss sets, direct callees and claim caller, retained panic Locations, and focused runtime/loader receipts. It does not rebuild or claim whole-ELF identity.

For reproduction, extract `source.tar.gz` to a fresh directory and compile that workspace with the recorded v1.44 `sbpf-solana-solana` SDK, physical source wrapper and offline registry home. Use `--release --target sbpf-solana-solana --locked --offline` and target rustflags `-Zremap-cwd-prefix=`. `tools/recorded-build.py` is the exact invoked build driver, retained byte-for-byte; its absolute session paths and output-directory argument are recorded in the receipt. `control/source.tar.gz` is the matching unchanged L33 workspace. A changed toolchain, target (`sbf` instead of `sbpf`), physical registry path or host can change TypeIds and raw counts, so compare a fresh unchanged control alongside a reproduction.

Credit: the AMM union7 source recovery (`research/claude-amm-union7-20261028`, commit `bdf0a2b0`) supplied the successful source decomposition. The simultaneous AMM worker identified its reuse. This packet independently adapts, compiles, checks and positions the Pump source on L33.
