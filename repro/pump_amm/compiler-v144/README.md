# PumpSwap v1.44 main-path checkpoint

The unchanged AMM32 Rust source compiles from the main crate path with platform-tools
v1.44 after promoting the recorded lockfile compatibility pins. The clean output is 889,472 bytes, SHA-256
`f2d54e4529f94ad49a3e2fd5afe4e497df62e407d62d9f0d819788f43f583823`.
All 14,635 comparisons in the 21 existing AMM32 suites pass against the captured
original. They ran on the scratch v1.44 executable. The independent clean main-path
build produced exactly the same whole file, as recorded in
`main-scratch-identity.json`, so those receipts are reused without claiming that
main-path transactions were rerun. This checkpoint adds no handlers; only the
main Cargo.lock and its build documentation changed.

Whole-file equality and equality through the parsed ELF extent both remain false.
The first differing byte is 24; 492,903 positions differ in the shared length.
Both the captured original and this compiler output have e_machine 263 and e_flags
0. This establishes compatibility, not historical source/compiler identity. The
v1.52 checkpoint remains preserved separately. Because its graph differs from the
v1.44-compatible graph, the size change is not a compiler-only causal comparison.

The source has 12 unchanged Rust files and an unchanged manifest.
Only Cargo.lock changed: blake3 1.8.2 was already selected when this lane resumed;
proc-macro-crate 3.3.0, indexmap 2.11.4, unicode-segmentation 1.12.0, zeroize 1.8.2,
and zeroize_derive 1.4.2 match the existing validated Fees v1.44 compatibility graph.
The newer selected packages require Rust 1.85 or pull incompatible dependencies;
v1.44 reports Rust 1.79.0-dev. Other target-specific packages were not arbitrarily
changed. `dependency-pins.json`, `msrv-evidence.json`, and `lock-diff.json` preserve
the reasons, exact operations, inherited lock and final graph. The pin evidence
contains absolute local paths; those paths identify inputs, not external services.

The isolated Cargo home contains 254 archives verified against the final lockfile
checksums and existing sparse-index metadata. The build ran locked and offline in
a fresh target directory with isolated SDK and rustup state. Original executable
bytes were read only after compilation. No executable bytes or headers were edited.
Build records retain compiler/SDK hashes and commands. Toolchain provenance is also
recorded in the existing `repro/pump_fees/compiler-family/` package.

The two failed attempts are retained. The original attempt failed before compile
because its proc-macro-crate pin was ambiguous, leaving a graph whose toml_parser
was absent from the reused Fees cache. A subsequent correctly qualified pin still
failed because that cache lacked mpl-token-metadata; an accidentally continued
second build repeated the original metadata failure without changing its inputs.
The successful pin used the ambient cache for offline resolution, followed by a
new AMM-only verified Cargo home. Both failed source snapshots are checked against
their corresponding build-attempt hashes.

`source-snapshot.tar.gz` holds all 14 successful main-path build inputs. The
corresponding scratch build records and source snapshot are under `scratch-build/`.
`build-helper-provenance.json` identifies the exact helper version executed before
an independent root-owned source-manifest discovery improvement landed. Its old
version is in `test-snapshot.tar.gz`; both current helper modules are preserved in
`current-build-support-snapshot.tar.gz` as reproduction tooling. The standalone
AMM crate has exactly the same 14 source inputs under either discovery method. The 29-entry test and
helper snapshot includes the existing test dependency closure, comparison helper,
cache preparation script and this lane's runners. Receipts preserve each suite's
own comparison scope. Normal test-owned signatures and runtime verification remain
enabled; creator migration suites use genuine original-program CPI signers. The
synthetic fixtures do not prove production reachability or exhaustive equivalence.
Deprecation and generic build-sbf syscall warnings remain in the saved build log;
the local runtime comparisons above passed despite those generic warnings.

To reproduce in a checkout with the captured evidence and cached pinned archives,
restore the source and test archives into their repository-relative paths, prepare
a fresh cache with `scripts/prepare_locked_cargo_home.py`, set CARGO_HOME to it,
and run `scripts/build_partial_candidate.py` with `programs/pump-amm/Cargo.toml`, program
`pump_amm`, artifact `pump_amm_recovered.so`, tool version `v1.44`, and a new output
folder. Replay the exact suite commands in `regression-run.json` against the new
artifact with fresh output paths. This is an input-hashed reproducibility record,
not a hermetic toolchain image.

The previous `repro/pump_amm/cashback-thirty-two` package remains intact. Six IDL
handlers, exact original source/compiler/dependency attribution, and whole ELF
identity remain unresolved. The independent security scan frozen at 329fc44 does
not cover this compiler checkpoint.
