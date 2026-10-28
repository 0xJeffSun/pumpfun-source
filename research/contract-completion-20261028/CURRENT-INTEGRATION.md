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
its build run requires the reviewed inventory hash. Canonical Mayhem promotion
requires actual fresh host-and-target compiler evidence from that route.

The combined current reconstruction verifier currently fails on existing AMM
source drift: the 660-window maintained checkpoint has two changed input files.
No stale guard is reset or bypassed. The active AMM lane is preparing a newly
qualified canonical selection and candidate-bound runtime evidence. Pump and AMM
still need remaining function recovery and whole meaningful ELF identity.
