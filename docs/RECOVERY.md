# Reconstruction status

No program has been reconstructed. All four comparisons are **NOT RUN: no rebuilt
artifact**, not a match and not a measured mismatch. `repro/status.json` is the
machine-readable record. No generated executable is published under `binaries/`.

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
locations and original program implementations remain unresolved for each program.

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
