# Reconstruction status

No program has been fully reconstructed. Partial executables for all four programs
now build and run local differential cases; their whole-file comparisons differ.
`repro/status.json` records the exact implemented handlers, artifacts and comparison
reports. Original captures are immutable comparison inputs, never build inputs.
Standalone compiler experiments remain under `binaries/experimental/`.


The official public documentation repository supplies three IDLs: Pump (56
instructions), PumpSwap (38), and Pump Fees (31). The pinned tree has no deployed
Rust implementation or Cargo.lock. Mayhem has a documented address but no IDL in
that tree. The public verified-build status endpoint reported `is_verified: false`
for all four; responses are preserved in `evidence/verified-build-status.json`.
That is a negative registry result, not proof that source does not exist elsewhere.

The other official on-chain source repository inspected, `pump-fun/transfer-hook-authority`
at `d5664eeb0dd13afe25f77b119ffd8425a23bfbaf`, declares a different program ID and an
empty Anchor program. It is not a replacement implementation for these deployments.
The remaining official repository inventory is saved under `evidence/upstream/`.

## Binary evidence

The captured programs are ELF64 little-endian SBF (machine 263), with `.text`,
`.rodata`, `.data.rel.ro`, dynamic symbol and relocation sections. Embedded path
strings establish Rust source module names and Solana platform-tools build paths.
`evidence/binary-analysis.json` records offsets, layouts and recovered path strings.
These are evidence of compilation structure, not recovered implementations.

Pump, PumpSwap and Pump Fees contain the older `library/alloc/src/raw_vec.rs`
path; Mayhem contains `library/alloc/src/raw_vec/mod.rs` and a path naming
`hashbrown-0.15.4`. These clues do not uniquely identify a compiler or lockfile.
Anchor-style logs and errors likewise do not uniquely establish an Anchor version.
Compiler, Cargo dependency graph, optimization settings, linker order, panic source
locations and original program implementations remain unresolved for each program. A first
fee-selector fragment has a v1.43 instruction match excluding relocations, which
is fragment evidence only: the stock v1.43 ELF header contradicts the full capture.

Disassembly was successfully generated locally for all four with the official
platform-tools v1.52 LLVM 20.1.7-rust-dev tool. Its identity and output hashes are
recorded in `evidence/disassembly-manifest.json`. This is an analysis tool version,
not a claim that v1.52 built the captured programs. Disassembly is derived evidence,
not independently compiled source, and must never be passed off as a rebuild.

## Work required to establish byte identity

Recover the implementations and account constraints, identify compiler/dependency
versions, and compile from a pinned source tree and lockfile in a clean environment.
Then resolve executable, relocation, data and layout differences. Generate allocation
padding only as newly created zero bytes after verifying the captured suffix is zero.
Compare the complete output, retaining any nonzero differences and the build log.

Run valid-state differential tests against the captured programs and local security
cases covering privileged instructions, token extensions, fee accounting, migrations,
CPI substitution and multi-hop swaps. Re-audit the actual recovered implementation.
None of these steps is satisfied by an IDL, equivalent high-level math, disassembly,
a copied ELF, or a successful hash comparison without build provenance.

## Integrated prior research

The selected research-lab import is indexed in `research/README.md`. Its three
original captures are identical to ours. Its lifecycle and fee-withdrawal fixtures
provide a stronger starting point for valid-state differential recovery, but the
imported 31-handler Fees source is an unsupported-handler scaffold. The existing
partial fee-selector recovery and its compiler comparison remain separate.

## Compiler-family evidence

The [static fingerprint report](../repro/compiler-fingerprints/REPORT.md) compares
captured Rust panic-location records with 22 official platform-tools releases.
With the subsequent [header evidence](../repro/pump_fees/compiler-family/HEADER-AND-BUILD-REPORT.md),
it prioritizes v1.44–v1.46.1 for Pump/PumpSwap/Fees and v1.52–v1.56 for Mayhem,
conditional on ordinary official sysroots. Its baseline source-line comparisons
are distinguished from independent filename-layout and impossible-coordinate
checks. It does not uniquely identify a compiler, linker, target or dependency
lock. Complete source builds and byte comparisons remain required.

The later [controlled helper comparison](../repro/pump_fees/compiler-family/CONTROLLED-HELPER-REPORT.md)
builds the same sixteen-handler Fees source and lockfile with v1.43, v1.44, v1.45
and v1.46. The complete captured `core::fmt::write` and `__multi3` bodies match
v1.44 exactly; those representative bodies differ in the other tested releases.
This makes v1.44 the preferred tested stock candidate for Fees, without excluding
untested v1.46.1, custom sysroots or different build settings. The current
thirty-one-body Fees checkpoint compiles with v1.44 and passes all 17,361
saved behavioral cases. Its full binary still differs from the capture.
