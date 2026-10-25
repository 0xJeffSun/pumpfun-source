# Fees state module: uncompiled review patch

The scratch `after/` tree moves exactly BuybackVault, SocialFeePda, DonationFeePda and FeeProgramGlobal into `programs/pump-fees/src/state.rs`. Each complete `#[account]` declaration is copied byte-for-byte, including field order, types, visibility and attributes. Each former declaration is replaced by a public re-export, preserving existing imports and root glob-import access. `lib.rs` adds only `mod state;`. SharingConfig stays in donation.rs. No handler, account constraint, explicit trait implementation, Cargo selection, IDL or program ID is edited. These four accounts have no separate explicit impl blocks in the snapshot; their generated traits still come from the identical account attributes.

This is source-only review material, not an accepted executable. No compiler or program runtime was invoked. Static byte preservation does not prove macro expansion, compilation, behavior, or binary improvement.

## Inputs and patch

`before/` freezes exactly the 22 source/workspace/IDL/documentation paths in the accepted Fees package's `source-sha256.json`; `source-inputs.json` records their current hashes and lengths. Every frozen file was compared byte-for-byte with `git show 8099031:<path>` during preparation and matched. The observed packaging HEAD is recorded in `provenance.json`; it does not replace implementation checkpoint 8099031. The portable verifier validates the frozen bytes; the initial git comparison is a preparation observation, not a portable git-history proof.

`after/` contains those 22 inputs plus state.rs (23). This is the Fees input subset, not a complete standalone workspace/dependency cache. `source.patch` is a conventional unified patch with paths relative to the main repository. Parent may review/apply it later; this worker has not applied it to main. `moves.json` records exact declaration hashes, zero-based half-open byte ranges and one-based inclusive line ranges.

| Type | Before declaration lines | After state.rs lines |
|---|---|---|
| BuybackVault | buyback.rs 62–63 | 3–4 |
| SocialFeePda | social.rs 70–71 | 6–7 |
| DonationFeePda | donation.rs 99–100 | 9–10 |
| FeeProgramGlobal | types.rs 80–88 | 12–20 |

## Filename provenance and limits

The immutable first-wave fees_functions report, proposal, focused proof and input manifest are copied under `evidence/prior-fees-functions/`. Its raw captured original and accepted candidate are copied unchanged as `evidence/original.so` and `evidence/candidate.so`. No telemetry is sealed. The earlier inventory's a9c4ea9 candidate predates accepted e501ca2; its correspondence counts are not a current semantic proof. No new function matching is claimed.

Original SHA-256: `4f2955d0f6b40cc9ff7daa18ccad7d19119ba1249759f4e7e3bb691beee6b35e`.
Accepted Fees candidate SHA-256: `e501ca2c744373e5653a5ac7e25a3fd20f6058765808b888c3605fd03adba60f`.

The prior proof associates these full codec windows with a filename reference at relative instruction offset +488 and diagnostic line immediate at +528. Ranges below are ELF file byte offsets, exclusive at the end. Named candidate correspondences and original window attribution remain inherited evidence, not recovered historical debug symbols.

| Type | Candidate window | Original window | Recorded original line |
|---|---|---|---|
| BuybackVault | [251456,252184) | [529488,530216) | 50 |
| SocialFeePda | [188656,189400) | [531232,531976) | 113 |
| DonationFeePda | [151912,152640) | [532872,533600) | 135 |
| FeeProgramGlobal | [315304,316032) | [535376,536104) | 154 |

The actual original filename bytes occupy [804187,804218): `programs/pump-fees/src/state.rs`, SHA-256 `161c808910519273a89b20e69aac261cd8cc0f0609dd15e425c9fcb7b39510ab`. SharingConfig's different path occupies [803673,803749), SHA-256 `5c5fe100cbe2ec4a2c051fee697f64c8a66839b59168bedfa7d88df345c8deea`: `programs/pump-fees/src/instructions/fee_sharing/create_fee_sharing_config.rs`. Its original window is [442944,443688). All exact body, immediate-call target and type-name spans/hashes remain in focused-proof.json.

A filename literal supports the source file placement. It does not uniquely prove historical Rust module nesting, complete state.rs contents, source spelling, or compiler path-remapping configuration. The ordinary `mod state;` organization is the minimal proposal consistent with that filename. The new natural line numbers deliberately differ from the recorded originals. No padding or artificial line alignment is used.

Moving declarations changes canonical Rust type paths from buyback/social/donation/types to state. Re-exports retain source access paths but do not preserve compiler symbol names, `type_name` text or all macro-generated diagnostics. Account discriminators/serialization are intended to remain unchanged through identical names/attributes/fields; generated output remains unverified until an authorized parent-reviewed build. Source paths may include workspace prefixes depending on the existing build recipe. Existing `#[account]` attributes continue to use the same crate ID through Anchor expansion; compilation is still needed to check expansion and scope. Full transitive diagnostic/vtable data and whole-original ELF equality remain unresolved. Bounded earlier receipts are not exhaustive behavior or security proof.

## Reproduce static verification

Copy this entire publication directory anywhere and run `python3 verify.py` from the copy. Only Python's standard library is needed. It verifies every sealed file, 22 input hashes, exactly four unchanged declaration moves, all remaining source bytes, 23 output files, and exact patch reproduction. It also verifies retained raw codec/call-target/literal spans against the copied ELF bytes. It does not re-establish normalized call closure, relocation attribution, historical function identity or runtime semantics.

`prepare_publication.py` is the archived one-time preparation script, originally run from the assigned worker directory; it is not the portable entry point. `verify.py` is read-only and location-independent. `manifest-sha256.json` seals review material including code, reports and results, excluding itself. Worker telemetry and copied-verification receipts are outside that seal.

Parent review is the next gate. A subsequent explicitly authorized fixed-recipe build and suitable existing checks are necessary before accepting this reorganization as executable source. No runtime tests are inferred from missing evidence.
