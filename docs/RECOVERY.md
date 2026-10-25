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
[thirty-one-body Fees serializer checkpoint](../repro/pump_fees/fee-config-serialization-v144/README.md)
compiles with v1.44 and passes 17,441 saved comparison receipts, including 69
repeated-input checks. Its full binary still differs from the capture.

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

[Candidate5](../repro/pump/metaplex-candidate-build-5/README.md) is a fresh pinned Linux build with recovered edition conversion resets and master-edition metadata writability checks. All 53 signed boundary comparisons pass; full-file comparison still differs. Diagnostic function alignment finds 1,235 matching normalized instruction windows with corresponding calls and 16 structurally different windows. A [further five-file source trial](../repro/pump/metaplex-audit-source-recovery/README.md) targets captured burn-PDA checking and removal of a legacy metadata authority exception; its [candidate 6 build](../repro/pump/metaplex-candidate-build-6/README.md) compiles and passes all 53 edition regressions but still differs in 16 instruction windows. A [ten-file source trial](../repro/pump/metaplex-uses-source-recovery/README.md) adds captured Uses bounds and token-standard checks; its [candidate 7 build](../repro/pump/metaplex-candidate-build-7/README.md) passes all 109 retained edition/Uses/burn comparisons. That context-check/seed-ownership trial subsequently produced candidate 8; see the metadata-context checkpoint below. These dependency observations do not change the four main-program completeness claims.

## Fees update-admin state access

The [update-admin checkpoint](../repro/pump_fees/update-admin-dataflow-v144/README.md) reconstructs event values from FeeConfig state and the new-admin `AccountInfo` layout. Its 2,824-byte handler and 5,664-byte account parser match normalized instructions and all mapped direct calls. The 769,640-byte clean main output equals tested scratch. All 17,384 prior comparisons and the donation sequence pass; 56 signed repeats add signature/state evidence but no new input cases. That checkpoint still differed in the dispatcher serialization-exit helper; the following checkpoint addresses it.

## PumpSwap boost buy and burn

The [36-handler checkpoint](../repro/pump_amm/boost-burn-thirty-six/README.md) adds boost buy-and-burn with real quote transfers, base-token burning, event CPIs and vault-drain cleanup. Its 506 new signed cases and all prior suites pass, totaling 16,727 comparisons across 24 suites. The 1,071,304-byte clean main ELF exactly matches tested scratch. The observed QuoteMintNotWritable error6088 is restored. `multi_hop_swap`, `create_config` and full byte identity remain unresolved.

## Mayhem legacy buy

The [twenty-handler checkpoint](../repro/mayhem/twenty/README.md) adds legacy buy with captured Pump CPIs and overall/per-coin risk checks. Its 486 buy cases include 187 successes and 299 rejections; all prior 3,355 comparisons pass, totaling 3,841 across nine suites. Independent verifiers check complete state, events, CPIs and rollback. The 457,600-byte clean main artifact equals tested scratch. Four trade handlers, Mayhem-state initialization and whole-program byte identity remain unresolved.

## Fees serialization error conversion

The [serialization checkpoint](../repro/pump_fees/fee-config-serialization-v144/README.md) restores direct Anchor I/O error propagation. The complete 992-byte exit body and all its direct calls now match after address normalization, resolving the previously unmatched update-admin exit target. All 17,441 receipts and the ten-step donation sequence pass; one repeated serialization failure adds exact error-log and signed rollback assertions, not a new unique input. The 769,000-byte clean main ELF equals tested scratch. Full original binary identity remains false.


## Pump legacy/v2 buys, migration and cashback

The [41-handler checkpoint](../repro/pump/creator-fortyone/README.md) adds eight handlers while retaining four partial paths. Its clean 1,361,464-byte candidate passes 7,957 differential comparisons across 33 suites and 936 Surfpool comparisons with 1,872 independently verified signatures. All 30 source, 80 harness and 27 fixture hashes are bound. Nested creation, v3 token extensions and full original binary identity remain unresolved in this checkpoint.

## PumpSwap routed swaps

The [37-handler checkpoint](../repro/pump_amm/multi-hop-thirty-seven/README.md) adds routed swaps across AMM pools and Pump curves using real program-derived CPI signing. All 735 new route comparisons and the complete 25-suite regression pass, totaling 17,462 cases. The 1,177,560-byte main build equals tested scratch; root independently checked 1,470 focused transaction signatures. Fixed-admin create_config and whole-file identity remain unresolved.

## Mayhem quote-aware sell

The [21-handler checkpoint](../repro/mayhem/twentyone/README.md) adds sell_v2 with native, legacy-token and Token-2022 quotes. Each family passes 473 comparisons; together with all prior cases, the candidate passes 5,260 comparisons across 12 suite runs. Independent checks cover quote calculations, CPI payloads, full watched state/events, signatures and rollback. The 502,192-byte main build equals scratch. Three trade handlers, state initialization and full original binary identity remain unresolved.

## Retained Fees deserializer negatives

[Four source trials](../repro/pump_fees/deserialization-source-trials/README.md) preserve the captured decoder's allocation branches and test Borsh API spelling. None reproduces the whole decoder; no runtime or source promotion claim is made. One API variant produces the exact same ELF as its predecessor. The validated serializer remains the active Fees candidate.


## Mayhem quote-aware buy

The [22-handler checkpoint](../repro/mayhem/twentytwo/README.md) adds buy_v2 with 1,839 new native/legacy-token/Token-2022 quote comparisons, including 704 successes and 1,135 rejections. All 5,260 inherited cases pass on the same bytes, totaling 7,099 comparisons across 15 suite runs. The 547,048-byte clean main executable equals tested scratch. The initial extra writable constraint on the global-volume account was removed after original-program comparison, and every focused case was rerun. Two PumpSwap trade handlers, state initialization and full original binary identity remain unresolved.

## Known current Pump transfer-fee gap

A review confirmed that the 41-handler candidate's sell_v2 minimum-output check and fee-event fields differ from the captured original for a quote token with a transfer fee. The current 42-handler candidate preserves that implementation and limitation; its 8,654 differential passes and 1,024 Surfpool passes do not cover this boundary. This is a reconstruction limitation; the captured original rejected the observed requested minimum. No corrected executable is published, and the candidate remains unsuitable for deployment.

The next [twelve-file Metaplex trial](../repro/pump/metaplex-validation-source-recovery/README.md) adds observed collection system-program and mint-owner checks to the preceding context trial. Eighteen ordinary-signed baseline comparisons retain twelve differences and six controls. This twelve-file trial subsequently compiled as candidate 9 and passed 135 retained comparisons; see the collection and mint-owner checkpoint below.


## Metaplex metadata-context recovery

[Candidate 8](../repro/pump/metaplex-candidate-build-8/README.md) passes all 117 edition/Uses/burn/system-program comparisons with 234 ordinary signed transactions. Its ten-file source patch compiles successfully and fixes the observed metadata context mismatch; full original binary identity remains false. Detailed instruction-window counts and limitations are retained with the candidate.


## AMM initializer static recovery

The remaining AMM `create_config` source hypothesis and its [static evidence](../repro/pump_amm/create-config-static/STATIC_FINDINGS.md) are preserved with compiler inputs, earlier attempts and 372 ordinary signed rejection cases. A separate [serialization follow-up](../repro/pump_amm/create-config-serialization-static/README.md) reproduces the complete normalized account-exit body and passes 8,687 administration/fee-configuration regressions plus the same 372 rejection cases. There are no successful fixed-administrator initializer transactions; these packages do not promote the instruction or increase the active handler count. Main AMM validation remains a separate source-bound package.


## Metaplex collection and mint-owner recovery

[Candidate 9](../repro/pump/metaplex-candidate-build-9/README.md) compiles the twelve-file validation trial and passes all 135 saved comparisons, with 270 independently verified transaction signatures. Normalized instruction/relocation/direct-call matching improves to 1,240 of 1,251 inferred windows; eleven remain different. Full-file equality remains false, including a documented unresolved check-order difference.


## AMM GlobalConfig serialization

The active [37-handler candidate](../repro/pump_amm/serialization-thirty-seven/README.md) now uses ordinary Anchor IO-error conversion in GlobalConfig serialization. Its complete 1,648-byte normalized account-exit body and all 24 direct target bodies match the original. The clean main executable equals the separately tested scratch executable (1,176,640 bytes); all 25 suites and 17,462 existing comparisons pass. This changes no handler count or unique-case count, and full original binary equality remains false.


## ATA provenance follow-up

An [independent read-only review](../repro/pump/dependency-exactness/ata-provenance-followup/PUBLICATION.md) rechecked all five retained ATA candidates and 51 source/provenance inputs. The best candidate still differs in 307 byte positions. Present-day release/check-run queries did not recover the exact historical build recipe; empty responses are preserved without inferring that historical CI never ran. No further build variant was selected from that incomplete evidence.


## Mayhem PumpSwap trade recovery

The [24-handler checkpoint](../repro/mayhem/twentyfour/README.md) adds `buy_pump_swap` and `sell_pump_swap` with actual Mayhem PDA-signed CPIs and ordinary test-owned outer signers. The six new matrices pass 2,496 comparisons, including 680 successes and 1,816 rejections; all 7,099 inherited cases also pass. Root independently verified all 4,992 new transaction signatures and full saved-state/event/CPI/rollback checks. Main and scratch builds are byte-identical (667,552 bytes). The full 21-suite total is 9,595 comparisons. Twenty-six panic diagnostic cases retain source-location differences, including eight unwrap-message-detail differences; original whole-file identity remains false, and the stopped initializer lane remains absent.


## Donation-relay public provenance

A [bounded public-source follow-up](../repro/pump/dependency-exactness/donation-relay-provenance-followup/README.md) confirms the captured program ID in official documentation but recovers no source revision or build recipe tied to the deployment. Twenty-nine timestamped public repository/archive/publisher responses are recorded by URL and hash. Their negative results do not establish universal source or audit absence. No new relay build is proposed from this evidence.


## Metaplex handler and dispatch recovery

[Candidate 10](../repro/pump/metaplex-candidate-build-10/README.md) compiles the eighteen-file source trial and passes all 135 inherited comparisons with 270 independently verified signatures. It matches 1,248 of 1,251 inferred normalized instruction/relocation/direct-call windows and the complete 21,043-byte rodata section. Three structural windows and full-file equality remain unresolved. Existing regression passes do not establish coverage of every new branch.


## Fees documentation provenance

The source-bound Fees README now points to the serializer checkpoint and labels earlier figures as historical. A [new clean v1.44 build](../repro/pump_fees/readme-provenance-v144/README.md) records all 22 current inputs and produces exactly the prior 769,000-byte executable. All 17,441 existing receipts are retained by whole-file identity; no new runtime comparisons, unique cases or signature claims are added. Prior packages remain immutable.


## Pump holder distribution and nested creation

The [42-handler checkpoint](../repro/pump/holder-nested-fortytwo/README.md) integrates holder distribution and depth-one creation under a normal SOL-root parent. Only three reviewed Rust paths changed from Pump41. All 35 differential suites pass 8,654 comparisons, and all 28 signed Surfpool runners pass 1,024 comparisons / 2,048 independently reverified transactions. The clean main executable is byte-identical to the tested scratch build (1,405,520 bytes). Four v3/create paths remain partial, the existing sell_v2 transfer-fee gap is preserved, and whole-file identity and the security audit remain incomplete.


## Metaplex zero-use analysis correction

A later [raw control-flow review](../repro/pump/metaplex-zero-use-source-recovery/STATIC-CORRECTION.md) corrects the earlier source hypothesis: the original ApproveUseAuthority and Utilize paths reject zero uses with error86. Candidate10 skips that rejection; its 135 inherited regressions do not cover the boundary. The new source-only trial restores both predicates and the separately observed edition-conversion data-length evaluation order. Exact branch bytes and destinations are retained, and the earlier incorrect analysis remains identifiable as historical evidence. Candidate11 subsequently compiled this correction and passed the inherited comparisons; its remaining differences are recorded below.


## Metaplex final-window comparison

[Candidate11](../repro/pump/metaplex-candidate-build-11/README.md) compiles the zero-use and conversion-order correction and passes all 135 inherited comparisons with 270 independently verified signed transactions. Its 707,448-byte raw ELF matches 1,250 of 1,251 inferred function windows byte-for-byte. The remaining Utilize window, two relocation bytes and 29 Rust source-coordinate records account for all 1,509 differing positions after explicit zero allocation padding. The existing cases do not cover the zero-use boundaries. Full-file equality remains false; the pinned hosted build failed that final requirement after successful compilation.

## Static Mayhem virtual-reserve instruction

The [static set_mayhem_virtual_params package](../repro/pump/mayhem-virtual-params-static/README.md) retains dispatch, account constraints, arithmetic and event-sequence evidence, with 22 original windows checked against raw bytes. Its Rust hypothesis is uncompiled. A genuine Mayhem invocation with its sol-vault PDA signer has not been established. This research adds zero implemented handlers and zero runtime comparisons; it does not resume the stopped initializer work.


## Six quote-control handlers

The [Pump48 checkpoint](../repro/pump/quote-control-fortyeight/README.md) recovers quote-control initialization, admin and reserves-admin rotation, mint addition/removal, and reserve updates. Its clean main build is whole-file identical to the tested scratch build: 1,478,960 bytes, SHA-256 `c9c364b59fca69ecc395c1e7911d55fc7997631daa0dd0b0bcf37d7f0dfa4804`. All 9,161 comparisons across 36 suites and all 1,024 Surfpool comparisons across 28 runners pass. The quote-control cases contain 1,014 executed transactions with 2,008 verified signatures; Surfpool separately contains 2,048 transactions with 2,980 signatures. Old unbound reports remain preserved as unaccepted history. The four programs now total 140 implemented handlers plus four partial paths and 53,659 saved comparison receipts. Every original whole-file comparison still differs, and the current sell_v2 gap remains explicit.


## AMM Pool error-conversion recovery

The [Pool serializer checkpoint](../repro/pump_amm/pool-serialization-thirty-seven/README.md) independently traces all 19 original writes and their error branches, then replaces the two explicit Borsh error mappings with direct I/O-error propagation. Its 1,175,720-byte main/scratch-identical candidate has SHA-256 `5a68db39372121c6406727bced3087aa9caf63f14a999ac68206c9b5b3401216`. All 17,462 existing cases across 25 suites pass again. The 1,704-byte Pool exit and 1,648-byte GlobalConfig exit each match normalized complete bodies and their 24 direct callees; full original-byte identity remains false. Counts remain 37 implemented AMM handlers with create_config absent.


## Partial native curve execution

The [native/legacy curve checkpoint](../repro/pump/native-curve-partial-fortyeight/README.md) retains 48 implemented Pump handlers and adds a fifth partial path. The 1,534,904-byte clean main build is identical to the regressed scratch composite, SHA-256 `6271a6d5782d350f6d716a91712d283592d4589aa8e9befb9c1f1a0dd3ac7ebe`. All 9,217 comparisons across 37 suites and 1,024 Surfpool comparisons pass. The 56 new fixed-scope comparisons include six rejections before Pump and 11 successes; the actual captured AMM supplies the required PDA signature. Every receipt is bound to the tested ELF and all 36 actual compiler inputs; legacy embedded source maps remain labeled as incidental checkout snapshots. The four-program total is now 140 implemented handlers, five partial paths and 53,715 saved comparison receipts. All original whole-file comparisons still differ.

## Controlled Pump source-path remap

The [controlled source-path remap](../repro/pump/path-remap-fortyeight/README.md)
uses the retained Pump48 source and v1.44 compiler inputs from the earlier
quote-control checkpoint, before the native curve addition above. The
Pump-crate-only Rust path remap reproduces the target's sampled
`programs/pump/src/create_v2.rs` path bytes, stored length and NUL policy,
but not its source line numbers or executable bytes. This historical trial is a
build-layout clue, not evidence of the deployed build flags or a matching Pump
binary.
