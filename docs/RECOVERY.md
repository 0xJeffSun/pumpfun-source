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
thirty-one-body Fees checkpoint compiles with v1.44 and passes all 17,372
saved behavioral cases. Its full binary still differs from the capture.

The [linked function comparison](../repro/pump_fees/framework-matching/README.md)
uses the thirty-one-body Fees build's own unstripped symbols to locate complete
instruction patterns in the capture. It identifies matching patterns for three
handler bodies, twelve generated instruction wrappers, and Anchor error/IDL
helpers. Relocation and internal-call immediates are masked only in memory;
relocated data and unmapped callees remain unresolved. This guides further
source recovery without changing any executable or establishing byte identity.

The [complete Fees error enum](../repro/pump_fees/error-enum-v144/README.md)
restores four omitted IDL variants and two literal runtime messages. Its generated
name and display functions add two complete instruction-pattern matches, while
all prior behavioral regressions pass. Whole-program bytes still differ.

The [external-account codecs](../repro/pump_fees/external-codecs-v144/README.md)
replace manual Global/BondingCurve/Pool decoding with Anchor-generated codecs and
one shared external AMM Pool type. Three checked decoders now match the original
instruction structure apart from source-file length and source-line constants;
unchecked decoder patterns also match after relocation/call masking. All existing
behavioral cases plus nine targeted malformed-account cases pass. This is source
recovery evidence, not a proof of historical macro choice or complete binary identity.

## Additional dependency evidence

A fifth fresh ATA build tested the source immediately preceding the public release
asset upload. It compiled but still differs at 1,506 byte positions; the closest
retained candidates differ at 307. The [chronology and exact build inputs](../repro/pump/dependency-exactness/ata-chronology-candidate.json)
preserve this negative result. The remaining two `RawVec::reserve_for_push`
specializations are associated with Token2022; their order remains unresolved.
The donation relay embeds a [source-repository attribution](../repro/pump/dependency-exactness/relay-source-attribution.json),
but the repository returned 404 through the current connection. No exact source
revision or relay rebuild has been recovered.

## PumpSwap compiler compatibility

The [v1.44 main-path build](../repro/pump_amm/compiler-v144/README.md) reproduces the same candidate as the validated scratch build and retains all 14,635 passing comparisons. The Rust implementation is unchanged; compatible lockfile pins and the selected compiler changed together. The 889,472-byte output has the captured machine/flags family, but both complete-file and parsed-ELF comparisons differ. This is a reproducible candidate configuration, not attribution of the historical compiler or dependency graph.

The [dependency provenance follow-up](../repro/pump/dependency-provenance-20261025/README.md) records the actual Anchor/Cargo release-recipe constraints for ATA and a newer, currently inaccessible audit-source revision for Metaplex. These primary-source observations select no new verified build and do not alter dependency byte-identity claims.

## Declared Fees dependencies and workspace layout

The [declared-program checkpoint](../repro/pump_fees/declared-programs-v144/README.md) generates external account types from genuine historical Pump/PumpSwap IDLs. A root workspace reproduces the captured source path, and consecutive macro placement at lines 27 and 28 closes the three checked decoders' remaining source-location instruction differences. The 766,800-byte main output exactly equals the scratch output that passed 17,372 comparisons and the ten-step donation sequence. All 22 local inputs, including the root manifest/lockfile and both IDLs, are bound. Three complete decoder patterns match after relocation/call masking, with matching source literals and mapped calls; raw-function and whole-ELF equality remain unproved. These constraints do not uniquely establish the historical IDLs or full source.

## PumpSwap legacy sell

The [33-handler checkpoint](../repro/pump_amm/legacy-sell-thirty-three/README.md) adds legacy sell with real Fees and token-program CPIs. Its 559 new cases cover direct fee payouts, gross-input pricing, cashback, buyback, reserve boundaries and account validation. All 21 prior suites also pass, for 15,194 total comparisons. The independently clean main build exactly matches the tested scratch executable (963,600 bytes); the package records that identity and preserves unsuccessful drafts. Five handlers and whole-program byte identity remain unresolved.

## Fees typed buyback guards

The [buyback-source checkpoint](../repro/pump_fees/buyback-source-v144/README.md) restores three typed `require_gt!` comparisons and a boxed update account. Their bodies now match original lengths, relocation patterns and mapped calls; source-location instructions still differ. The 768,976-byte clean main ELF exactly matches the tested scratch ELF. All 17,372 retained comparisons and the ten-step donation sequence pass, plus nine focused signed comparisons that repeat index values with explicit compared-value log assertions. Those nine strengthen diagnostics coverage rather than adding nine distinct boundary values. Whole-file equality remains false.

## Mayhem legacy sell

The [nineteen-handler checkpoint](../repro/mayhem/nineteen/README.md) adds legacy sell with the captured Pump/Token-2022 CPIs. Its 396 new signed cases include 134 successes, every curve prefix through 141 bytes, typed-account constraints, pricing bounds, complete events and rollback. All 2,953 inherited cases and six burn comparisons pass, totaling 3,355. An independent verifier checks 792 sell signatures and full state/event/CPI observations. The 415,168-byte clean main executable exactly equals the tested scratch build; its original comparison remains different. Panic-message/source-location differences and remaining handlers are documented.

## Pump sell, migration and configured fees

The [33-handler checkpoint](../repro/pump/creator-thirtythree/README.md) adds legacy sell, sell_v2 and migration while expanding quote-control creation. It corrects the earlier stored creator-fee override gap and exact-quote completion accounting. The 1,129,592-byte clean candidate passes 6,338 cases across 28 suites and 694 Surfpool comparisons with 1,388 verified ordinary signatures. Four creation/trading paths remain partial; runtime-specific IDL behavior, incomplete token-extension coverage and unknown event suffixes remain explicit. All 25 build inputs, 68 harness files and 27 fixture/capture hashes are bound. Full byte identity is false.

## Fees authority guard

The [authority-guard checkpoint](../repro/pump_fees/authority-guard-v144/README.md) restores the original plain inequality check for `set_authority`, removing compared-key logs absent from the capture. Its 3,320-byte function matches instruction structure and mapped calls except source-location constants. The 768,824-byte clean main output equals tested scratch; 17,384 comparison receipts and the ten-step donation sequence pass. Three focused cases strengthen log assertions on prior authority inputs. Complete ELF equality remains false.

## PumpSwap legacy buys and sell-event correction

The [35-handler checkpoint](../repro/pump_amm/legacy-buy-thirty-five/README.md) adds legacy buy and exact-quote buy, including fee payouts and transfer-fee handling. It also fixes the prior zero-fee cashback sell event mismatch. All 23 suites pass 16,221 cases, including 1,011 buy cases and 16 new sell-event cases. The 1,034,280-byte main build equals the tested scratch executable; the portable buy/sell runners were replayed against main. Three handlers and full ELF identity remain unresolved.

## Metaplex source differences

[Candidate5](../repro/pump/metaplex-candidate-build-5/README.md) is a fresh pinned Linux build with recovered edition conversion resets and master-edition metadata writability checks. All 53 signed boundary comparisons pass; full-file comparison still differs. Diagnostic function alignment finds 1,235 matching normalized instruction windows with corresponding calls and 16 structurally different windows. A [further five-file source trial](../repro/pump/metaplex-audit-source-recovery/README.md) targets captured burn-PDA checking and removal of a legacy metadata authority exception; its new build is pending. These dependency observations do not change the four main-program completeness claims.
