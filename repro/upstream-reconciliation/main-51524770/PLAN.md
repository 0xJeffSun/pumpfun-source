# Pinned515 reconciliation — work-only preservation and review plan

No merge, checkout, reset, staging/index change, active-file write, compiler/runtime execution or workflow dispatch occurred. All output is inside this work packet. Exact515/2508 objects already existed locally; no fetch was necessary. The only Git operations were object/tree/diff/ancestry reads with optional locks disabled. Incoming source, fixtures, probes and scripts were hashed and preserved opaquely. None of their bodies was interpreted or executed.

## Exact immutable inputs and scope

- Incoming main:515247707d6fa9f0e3816d9e22a8036f0e7e5272.
- Prior main/actual merge-base:2508c2be79bc5e66956dcd979e5d2f2a780fd851.
- Frozen accepted P25:576889cbfb2e28d5b1c2f47f1488c0caa80b88b7.

The full local Git comparison has358 incoming changed paths:353 additions,5 modifications,0 deletions and0 detected renames. It includes all paths beyond GitHub's300-file presentation limit. The direct root576→incoming515 comparison contains5555 differences; it must not be treated as an incoming deletion list. Most are P25-owned work absent from the other branch and must survive the three-way merge.

All three complete recursive tree memberships, root tree OIDs, exact raw pinned commit objects, canonical no-rename deltas and rename-aware membership are retained. INCOMING-DIFF-HASHES.tsv provides every exact path, status, old/new mode, Git OID, raw SHA256 and byte count. No stopped source or fixture body appears in this report.

All changed before/after blob versions are preserved as267 distinct content-addressed raw Git blobs,19289950 bytes total. The largest is3881111 bytes. Every Git blob OID was independently recomputed using its original blob header; every raw SHA256 and chunk hash is recorded. Original executable/symlink modes are metadata; archive chunks are inert regular0644 files and symlinks were not realized. There are no deletion/rename payloads to invent: both zero counts are explicit. The independently frozen opaque archive manifest has known seal:

`4ea702d99940634350051a200a8a4d57a2168db649ac2b469a112a78ab4828ab`

This is exact preservation, not approval of any incoming source or recipe. Archived programs/controllers must remain unexecuted.

## Exact future source restoration and passive retention

Five modified existing paths must resolve to the effective accepted snapshot, never to incoming515 bodies:

- programs/mayhem/src/lib.rs
- programs/pump/src/create_v2.rs
- programs/pump/src/lib.rs
- programs/pump/src/trade.rs
- programs/pump/src/volume_sync.rs

restoration-exact5.json binds the incoming and P25 selected OID/mode/SHA/bytes for each. Ten newly reintroduced active paths are absent in P25 and must remain absent after the future merge, once preserved in the opaque archive:

- programs/pump/src/incentives.rs
- programs/pump/src/mayhem_virtual_params.rs
- programs/pump/src/token_incentives/claim_token_incentives.rs
- programs/pump/src/token_incentives/mod.rs
- scripts/fixtures/signer_stub.so
- scripts/fixtures/signer_stub/Cargo.toml
- scripts/fixtures/signer_stub/src/lib.rs
- scripts/pump_create_mayhem_differential.py
- scripts/pump_set_mayhem_virtual_params_differential.py
- scripts/pump_v3_token_extensions_differential.py

inactive-exact10.json retains their exact incoming identities. Absence is a current scope restriction; the standalone future Mayhem source is not assigned a permanent semantic verdict by this reconciliation.

The other343 incoming paths are exact passive additions:340 repro paths, one documentation path, and two manual search assets. They include210 Linux13 measurement/recipe-comparison/Unicode-data paths,128 CTO static paths and2 independent-review paths, plus docs/BUILD_IDENTITY_RELAY13_AND_CTO.md, .github/workflows/search-dependency.yml and scripts/search_dependency_commit.py. passive-retention-exact343.json binds every mode/OID/SHA/byte count. This task did not inspect or execute the Linux13/static controllers or manual search recipe. Their presence does not select Linux13, supersede Relay15, authorize stopped lanes, or approve commit/feature/flag searches.

After the five restorations and ten absences, the incoming-only net change relative to accepted576 is exactly343 passive additions. planned-passive-only-net-delta.json records this expected membership. P25-only proofs/source/status/assets must not disappear merely because515 lacks them.

## Effective accepted snapshot and the separate AMM09be transition

P25-protected-paths.json binds107 compiled-source paths,23 canonical Relay source paths and all selected status/Relay alias/README/helper/workflow assets:329 unique protected paths. Their bytes were hashed from pinned576 Git objects and checked against P25's frozen current bindings; no active source body was interpreted. Preserve source37/14/30/26, Relay15 candidate5f6d…/canonical23, core status, Relay current.json/source-selected.json, README mappings and all existing helpers from one accepted snapshot.

The root is independently running the genuine AMM managed-main gate. Future AMM selection is explicitly permitted only as a separately reviewed transition, not as an old/new hash alternative. Reviewed plan metadata identifies expected scratch candidate09bee0dfd751dc6ae0240bbac262933c6bda6e0c94aa643f82c57f2956c3a117 and symbolsf6e504317ba774325c0ba682e2529c7f18d1ae645a0d7aa239de557729dd0cb4. Source proof328255… changes only programs/pump-amm/src/collect.rs; other29 AMM source paths agree. future-AMM09be-transition.UNBOUND.json binds the exact old/new source hashes, but intentionally leaves the root selection commit/seal, genuine managed-main seal and status/README/helper transition unbound. This plan claims neither main success nor selection.

Before a future merge, root must choose and freeze one effective accepted snapshot. If AMM selection happens first, pin that reviewed selection commit and exact delta, then restore/validate from that snapshot. Do not blindly restore collect.rs or AMM status/README/helper mappings from576 after a valid09be selection. If reconciliation happens first, preserve576 now and apply a separately reviewed selection afterward. Either sequence must freeze one coherent source107 and current provenance set; neither may accept both versions or an arbitrary AMM change.

## Current guard version proposal

P25's immutable current guard packages remain:

- current-applicability:fc55f78a92c73bbcb416ff0000263049a96c01e4e310e7999c8c5990d4b7e088.
- current-reconciliation:ebb51fcdfbfc009acd1a0cff0d89f484f59c732a8650b1592b789668edfac64f.
- current-proposal-v7:e761d922a00a04e2d0d9fb9e7d22ab581cf8cb28c1f31c1796aa6ebfd0faa6eb.

The final tree gains one manual workflow and one top-level Python search script. V7 freezes5 workflows/186 scripts, so its old current-state membership is deliberately inapplicable to the new state. A new version is required; do not edit its frozen bindings or weaken equality checks. Proposed exact sets are6 workflows/187 scripts, retaining all prior members and adding only the two exact passive search assets. Their SHA256 values are16684584401a14fa4cb60c9e41416c69b217fb3f69eb4d1fc1ea2560d34e4007 and80f5c77d48b85543fb63fd1b8d232cb92440f321d6e9f27210cbdafc8056f56a respectively.

CURRENT-GUARD-PROPOSAL.NOT_EXECUTABLE.json specifies a new pass26-pinned515-v1 applicability/reconciliation/CI endpoint packet. It must authenticate the known opaque archive seal, preserve343 passive identities, require10 active absences, bind the effective selected107/Relay23/status/aliases/helpers, and freeze full script/workflow membership. Any new active verify.yml endpoint rewrite needs its own exact reviewed before/after hash and known-seal receipt. Old P25/peer current guards remain historical integrity witnesses and must not be executed as current against a later selected state. No incoming passive verifier/controller or manual search asset enters automatic evidence merely because it was inherited.

## Future execution sequence — not performed

1. Finish the root's already authorized AMM gate and freeze the effective accepted commit/index/source/provenance snapshot. Record whether the separate09be selection is adopted. Do not start a merge while that gate is using its frozen baseline.
2. Root review this plan, known opaque archive seal and saved verifier. Install the exact archive with an explicit manifest path list and byte/mode/index audit before active source changes. No archived code executes.
3. Once separately authorized, merge the exact object515247707d6fa9f0e3816d9e22a8036f0e7e5272 with no automatic commit. Never use mutable origin/main. Do not execute workflows, probes or builds while incoming source is present/conflicted.
4. Resolve the five named existing source paths from the effective accepted snapshot, remove the ten exact inactive paths, retain all343 passive paths verbatim, and preserve every unrelated P25-owned path. Recheck complete source107/Relay23 and all protected status/alias/helper hashes before any checks that can load source.
5. Prepare the new current guard version and exact CI endpoint delta in work. Bind the postselection AMM transition only if root separately selected it. Review and seal the concrete final replacements; keep all old guard packages unchanged. No search workflow dispatch is part of this sequence.
6. Apply only the reviewed final replacements. Audit the exact final Git index blob/mode/membership and every package payload/sidecar. Stage explicit path lists, never broad git add-A. Then run only separately authorized saved/current checks on the restored final state and record actual exits before committing/publishing.

The current packet authorizes none of those mutations. verify_saved.py is a portable, read-only archive/metadata checker: it hashes opaque chunks, reconstructs Git object/tree identities and validates membership/classification/protection/plan constraints. It imports or executes no archived code and does not consult the active index or working source. Root owns all eventual merge/restoration/current-guard/selection operations.
