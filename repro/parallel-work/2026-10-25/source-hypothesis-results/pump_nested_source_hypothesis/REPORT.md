# Ordinary nested-create source hypothesis

This is a reviewable source-only proposal against frozen checkpoint `476ecf0d31a8dae66dc6e2fb0a97f19d4f163e40`. It replaces the one-root helper with the recovered bounded Curve/Pool walk and reverse u128 pricing fold. It is not an accepted source change, historical-source spelling claim, compiled artifact, runtime result, security conclusion, or audit completion.

`source.patch` changes only `programs/pump/src/create_v2.rs` and adds `programs/pump/src/nested_create.rs`. Full proposed files are in `proposed/`; the exact frozen edited file is in `frozen/`. `frozen-source-map.json`, `proposed-source-map.json`, and `evidence-to-change.json` identify source ranges, hashes, and the evidence for every changed business operation. `LEDGER.md` explains the contracts. The generic implementation includes migrated Pools at any selected position, including multi-record chains, rather than retaining a depth-one special case.

The walk consumes the unchanged remaining slice after 16 fixed accounts. It selects n=immediate-parent.depth+1, bounds n by min(Global.max_curve_depth,5), checks immediate-parent eligibility, and consumes 4+n+3m accounts for m Pool records. It does not add ancestor positional-depth equality, repeated ancestor eligibility, or trailing-account-count rejection. Terminal quote-control borrowing precedes terminal Curve/Pool selection even for native roots. Pool data, base vault, and quote vault are borrowed before pool validation. Pricing starts only after all records are admitted, processes last-to-first, keeps u128 intermediates, and narrows once after final rescaling.

The caller now checks quote-program executable status after key identity, performs zero/WSOL normalization and the operand-bound literal-key rejection before selection, and moves quote-mint owner/retained extension validation after whitelist/control/walk selection. Quote-control length precedes its discriminator, the first matching entry wins, and the lookup borrow ends before the walk. None of this introduces a replacement token runtime. The existing Token-2022 extension helper is retained as an inherited conditional boundary; the stopped extension work was not reopened.

## Fixed context and existing initialization

No fixed-account declaration change is needed for the proposed walk: remaining accounts already follow the existing 16-account context. The original context requires all slots, including its unconditional Mayhem-named PDA/writable constraints, in ordinary mode. The proposed `CreateV2` declaration is byte-for-byte unchanged. Mint/curve/ATA initialization macros, space 166, metadata operations, minting, authority change, persistence and event emission remain the frozen implementation. The excluded initializer is still not called. Existing empty-remaining native initialization and whitelist/control-entry selection remain present.

This preservation is a source-level statement, not a new runtime compatibility result. Exact framework expansion must still match reader order, mint init before writable/signer/rent, curve PDA/init/writable/rent, ATA init/writable/rent, then authority/global seeds and later account constraints. The precise potential context change, if that later review finds a mismatch, is its generated `try_accounts` implementation for those three ordinary initialization paths and their post-init readers, not the account list or a synthetic replacement runtime. No such generated-context change is guessed here. Existing ordinary initialization CPI/decoder semantics, allocation and extension details remain conditional as itemized in `OBLIGATIONS.md`.

## Evidence and identity

Only program source at the task's frozen commit was used. Pending evidence is limited to the expressly permitted nested-context package and independent context-closure review. Historical reports/manifests are copied verbatim as evidence subsets, without attributing their older checkpoints to this proposal. Their earlier 'no source proposal' dispositions remain immutable historical dispositions; this assignment separately authorizes the present hypothesis. Older `.rs` excerpts were not consumed. All newly extracted program source and typed evidence came from frozen Git blobs.

The independent review records 36 complete objects and 211 slices rebound at its historical checkpoint. Its critical qualification remains: route buyback slot 7/A+0x38 is a present writable raw AccountInfo locally, not a proven token account. This proposal does not use that route account or import a token-account constraint from it.

Original Pump SHA256 is `7a19affaa2c6187e04a5fe0ea298cee81fa5eb8c24cfcc30d85f615e89f7b02d`, Git blob `85cb0059f2814c86224fdfea778c56df770dd920`. The frozen original assembly SHA256 is `d4a29dc6921d25d9d2e8e7a0f8b4d68027005f2ab74a8151d5ac8a8ab575ba0d`, blob `4c37a9b4931438cfab0311bea6c6398c5d909321`. Eighty retained contiguous assembly windows were rebound directly to original bytes at the task checkpoint; intervals and upstream line ranges are in `byte-source-map.json`. These are static provenance checks, not instruction execution.

Current candidate identities, hash-checked only from the frozen commit:

| Artifact | SHA256 |
|---|---|
| Pump | `5c1c1c2d1cd2c334b3e054b6a8fb5ac0638d80d13495c1c18d935ad20bfd62bb` |
| AMM | `807010828fe3b4124b5e20c34ca627582e1718e9c5849bf0c15309983d4088b2` |
| Fees | `8f89dbeb0eaef9490a518a97adb50dd8cbf0a21984a2bfca343d6ff5c2fe6c8e` |

Pump is unchanged; AMM and Fees must not be substituted with older report identities. Complete Git identities, sizes and paths are in `current-artifact-identities.json` and `provenance.json`. No artifact was changed.

## Verification and handoff

Run `python3 -B verify.py` from any directory. The portable verifier checks the exact manifest file set, hashes, copied full-source Git object identities, patch equality, source maps, unchanged context/initialization boundaries, and assembly-byte correspondence. With `--repo /path/to/repo`, it additionally rebinds original/full-object hashes, all source extractions, constants and bounded windows to the frozen commit. It never compiles or executes Rust/SBF, generates runtime cases, invokes a network endpoint, or writes verification results into the seal.

An external copy is verified before handoff; its outcome is saved outside `publication/` in `verification-outcome.json`. Verification establishes package integrity and the stated static relations. It does not prove the business semantics, all-input arithmetic theorem, original error-object bytes, framework expansion, or resource behavior. Review the obligations before deciding whether to build/test/promote; `FUTURE_VALIDATION.md` describes only future normal-operation validation, with no generated cases or executable test harness.

No parent files, prior seals, source hypotheses, global settings, or other chats were changed. No builds, runtime cases, probes, signatures, chain/network actions, binary modifications, compiler/path/flag search, worker spawning, staging, commit or push occurred. Recovery remains **140/150 bounded handlers, 0/4 exact binaries; audit unfinished**.
