# Declared external programs: v1.44 candidate

The Fees source now generates external Pump and PumpSwap account codecs with two
consecutive `declare_program!` invocations at `programs/pump-fees/src/lib.rs:27`
and `:28`. The existing macro items were moved after `declare_id!`; no padding,
extra source lines or executable edits were used. The preceding reconstructed
imports/modules are not claimed to be the historical prefix.

The independent main build is **766,800 bytes**, SHA-256
`cf34104a46c65538e7de734abfa9d5d74102639257969cc4e51eb36a31cbd0eb`.
It is byte-for-byte identical to the tested scratch candidate. The captured
original remains different: 948,944 bytes, SHA-256
`4f2955d0f6b40cc9ff7daa18ccad7d19119ba1249759f4e7e3bb691beee6b35e`,
with the first full-file difference at byte 24.

## Static evidence

The complete checked Global, BondingCurve and Pool decoders are each 728 bytes.
All now match their corresponding captured instruction patterns after masking
only relocation and internal-call immediates in memory. Their relocation
offset/type/symbol patterns agree, all seven internal call targets per decoder
map consistently, and filename/line literals are separately checked. The prior
workspace control differed only at the source-line instruction: 5/5/6 versus
27/27/28. That control's source, binary and diagnostic are retained under
`control/`.

Raw decoder bodies still differ in relocated addresses and call displacements.
Other relocated data and vtables are not recursively proved identical. The full
diagnostic count rises from 389 to 392 bounded, call-consistent ranges out of 510;
raw exact ranges remain 68. Categories overlap and counts are not confidence
scores. These results support this macro placement without uniquely establishing
historical source, IDL revisions or compiler release.

The public historical IDLs remain unchanged: Pump revision
`f0ef005c386adeeb783c27fdcc4ddd9d49b255c5` (2026-01-09), SHA-256
`1b294bf4dda2f7b30e2ccb8ce4bdcabc0276f43168441d218e85470cd0586a7b`;
PumpSwap revision `2c22246b670812e2392e5f94b9543f500d6c9e15` (2026-07-15),
SHA-256 `01fe5f028f63639c7efc85c8f4ce20710585f8997e57da29437275f566c4ea7e`.
Their retained acquisition provenance is embedded in `experiment.json`.

## Runtime evidence and identity reuse

All **17,372 comparisons** pass against this exact ELF: 17,331 existing cases,
nine external-codec rejection cases, two historical initializer messages,
28 initializer rejections, and two literal error-message checks. The ten-step
persistent donation sequence also passes with twenty signed transactions.
All nine codec Anchor error lines match raw, including filename/line; broader
full-log and compute equality is not claimed.

Historical message bytes and original signatures remain unchanged, with signature
verification enabled. Only stale-blockhash freshness is adapted; the retained
enabled-freshness control returns `BlockhashNotFound`. These two replays use a
later captured executable and do not recreate the complete historical bank.
Other suites retain their original synthetic-fixture and comparison limits.
No live transaction was submitted.

The runtime receipts preserve the actual scratch candidate paths. They are reused
for the clean main build by the whole-file byte equality recorded in
`main-scratch-identity.json`; no redundant main runtime rerun is claimed.
The earlier 112 Surfpool comparisons remain attached to the separate
`all-thirtyone-v144` executable.

## Whole-input provenance

The repository-root workspace contains only `programs/pump-fees`; other crates
retain their own workspace boundaries. Root `Cargo.toml` owns the release profile
and root `Cargo.lock` owns the unchanged pinned graph. The previous member lock was
preserved in scratch before removal.

`source-snapshot.tar.gz` and `source-sha256.json` bind **22 files** at their main
repository paths: root manifest/lock, member manifest, both IDLs, all source and
recovered Rust files, and README. The new build helper automatically includes
workspace and IDL compiler inputs; README is explicitly bound with `--extra-input`.
Its before/after manifest is retained in `build-attempt.json`. A terminal blank
line in the member manifest was removed during promotion; the final clean build
binds that exact cleaned manifest. No Rust or IDL content changed for this cleanup.

`harness-snapshot.tar.gz` binds 33 helper/validation files, including both
`build_partial_candidate.py` and `build_source_manifest.py`. The old single-file
helper actually used for the isolated experiment remains under `scratch-build/`,
with that experiment's exact 32-file harness, workspace snapshot and untouched
build records. Its explicit 22-file experiment manifest fills the old helper's
workspace/IDL omission. The historical attempt is not relabeled as using the new
helper.

`dependency-inputs.json` records all 252 locked registry archives, verified against
Cargo checksums, and 13,300 extracted source files. `runtime-inputs.json` binds
captured executable dependencies, public transaction captures, upstream IDLs and
imported/query fixtures; individual receipts identify their relevant subsets.
`python-environment.json` records the actual interpreter and solders native-module
hash. This is reproducible input evidence, not a hermetic image.

## Reproduce

Restore snapshots in a separate checkout preserving their paths and the captured
evidence/fixtures listed in `runtime-inputs.json`. The obsolete
`programs/pump-fees/Cargo.lock` must be absent; the snapshot supplies root Cargo.lock.
Pinned Cargo/compiler/Python runtimes remain prerequisites.

```sh
python scripts/prepare_locked_cargo_home.py --lockfile Cargo.lock --output work/fees-declared-cargo-home
CARGO_HOME="$PWD/work/fees-declared-cargo-home" python scripts/build_partial_candidate.py --manifest programs/pump-fees/Cargo.toml --program pump_fees --artifact-name pump_fees_candidate.so --tools-version v1.44 --extra-input programs/pump-fees/README.md --output work/fees-declared-build
python repro/pump_fees/framework-matching/match.py --original evidence/original/pump_fees/deployed.so --candidate repro/pump_fees/declared-programs-v144/pump_fees_candidate.so --symbols repro/pump_fees/declared-programs-v144/symbol-source.so --output work/fees-declared-functions.json
python repro/pump_fees/declared-programs-v144/verify_publication.py
```

The last command verifies saved inputs, decoder bodies, receipts and signatures
without executing programs. `reproduce-validation.sh` runs the exact retained
runtime suite commands against a selected ELF, writing to a new scratch directory.
The recorded build has five Rust warnings and the local SDK's empty-syscall-list
warning; full logs are retained. Bounded successful runtime checks do not prove
general deployment compatibility. Whole-program source fidelity and byte identity
remain unresolved.
