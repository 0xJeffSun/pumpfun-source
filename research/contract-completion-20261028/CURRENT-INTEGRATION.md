# Maintained contract integration — 28 October 2026

The full objective in REQUIREMENTS.md remains active. Research window coverage
and exact research images do not establish completion of maintained integration.

## Fees

The maintained `programs/pump-fees` now contains the qualified source, local math
crate, pinned local macro and explicit `build_exact.py` entry point. Its 69-file
canonical inventory maps explicitly to 65 compiler-workspace inputs. Root Cargo
files select both local crates and the same macro/dependency cohort. The new
selected artifact is the ordinary compiler-and-strip output in
`research/all-contract-completion-20261028/fees-built/canonical-01/`.

Two independent maintained-source builds produce identical complete symbol-bearing
and stripped ELFs; the second starts with an empty target and compiles all
dependencies anew. All 873,256 meaningful original bytes match literally. The 75,688-byte trailing
zero allocation is checked separately and is absent from compiler output. This
uses a disclosed target-derived linker layout and path adaptation; no original
instruction bytes are linked into the candidate and no output byte patch occurs.
It establishes a reconstructed recipe, not historical source spelling.

A fresh full differential replay on this exact image passes 18 suites and 17,331
cases. Independent receipt verification checks every outcome field, 6,413 ordered
log pairs after removing compute-meter lines only, and 16,852 retained signature
fields. `verify_fees_runtime.py` and five mutation controls bind that report to
the actual selected candidate and original images.

The current checkpoint, recovered-build and binding entry points dispatch this
specific selection to its complete canonical-input/build/output verifier. The
historical P27 inventory remains sealed and authenticated. Its old Fees source
binding applies only to its old selection; it does not claim to bind the new
source. The new branch also binds the actual root Cargo manifest and lock.

## Donation Relay

The canonical 60-file source and existing exact ELF remain selected. The
unmodified sealed verifier pins an older source scanner. The new bridge admits
exactly the reviewed serialization change from `str(relative_path)` to
`relative_path.as_posix()`, recomputes both source maps, and keeps every other
source, ELF and loader check. Four controls reject unrelated scanner changes,
extra source and changed source. It performs no new compilation or replay.

## Mayhem and remaining gaps

The manual Windows workflow publishes a 67-input source proposal. Its first run
records exact native tool candidates and a complete MSVC/Windows Kit inventory;
its build run requires the reviewed inventory hash. The offline-vendor successor now compiles host and target on Windows. Its
expected output hash gate fails: actual archive basenames differ from the
file-specific linker selectors, so orphaned sections change the layout. Those
failed fresh receipts remain separate. Canonical Mayhem promotion still requires
a qualified explicit recipe, two fresh exact outputs, and candidate-bound runtime.

The combined current reconstruction verifier now passes with the new Pump and
AMM selections. The old checkpoints and their source/loader evidence remain
historical; no stale source guard is disabled or reset.

Pump binds 65 canonical inputs to 66 compiler inputs, two fresh local-crate
builds and a portable empty-target build. All complete outputs reproduce.
Its exact 1,019 normalized / 188 raw membership remains, with 44 suites / 10,468
cases and 65 focused cases. The 18,343 serialized transaction fields and 27,875
signature fields in the full receipt are observations, not unique transaction
counts. Focused evidence adds 195 outcome transactions / 258 signature fields.
The four creation-key cases explicitly retain Source220 versus reconstructed70.

AMM binds 68 canonical inputs to 69 compiler inputs and authenticates all 257
registry packages / 8,180 archive files. Its final cold build and repeat produce
the 784 normalized / 394 raw frontier; 17,462 strict runtime pairs and 72 loader
pairs pass. Three retained backend call/frame diagnostics refer to a matched
1,488-byte original wrapper with six matched actual callees; its incentives-admin
suite has 668 pairs and 296 successes. This does not claim broad frame safety.

[Relay's second maintained build](../relay-current-repeat-20261028/README.md)
reproduces the entire meaningful ELF from an empty target. Fresh real-loader
execution uses 912 signed transactions, and the resulting exact allocation
payload passes all 536 retained records with literal account-state and ordered
log agreement. The new gate rechecks 3,006 loader/runtime signature fields.

Sixteen Pump windows, one AMM window, complete Pump/AMM ELF identity and current
Mayhem promotion remain open. None of these integration results completes the
full objective in REQUIREMENTS.md.
