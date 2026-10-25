# Fees SharingConfig source checkpoint

SharingConfig now occupies the original recorded file, `programs/pump-fees/src/instructions/fee_sharing/create_fee_sharing_config.rs`. Its complete account declaration is unchanged, and donation.rs reexports it for every existing consumer. ConfigStatus, Shareholder, handlers, account contexts, the accepted inline initializer, four state.rs accounts and dependencies remain unchanged. The approved patch changes five Rust paths; the final program README is the sixth owned source/document path.

The clean main ELF is 768,104 bytes, SHA-256 `8cce74a5191b286eaa10af59c02c9ee16d3853be214c5e9b1132e50bba15ef87`. It exactly matches the single SharingConfig scratch build that freshly passed all 17,441 existing comparison receipts and the ten-step donation sequence. Both builds bind 26 actual source/workspace/IDL/documentation inputs; only the finalized program README differs. No main runtime replay was performed. Receipt transfer rests on whole-file identity, with actual scratch execution source/build bindings retained.

## Static improvement and limits

All five complete checked account codecs now reference their original filenames and account-name literals. Their normalized bodies differ only at historical line immediate +528. SharingConfig uses natural line 5 versus original 37; the four state.rs declarations retain natural lines 3, 6, 9 and 12 versus original 50, 113, 135 and 154. No padding, source-coordinate alignment or path fabrication was used.

The five codecs' 35 immediate calls resolve to 11 complete normalized target bodies. The separate SharingConfig proof checks its 744-byte checked decoder, 1,472-byte unchecked decoder, 1,024-byte Account::try_from wrapper and 23 direct call sites. These sites overlap the wider codec proof. The unchecked decoder and wrapper fully match normalized original windows; the checked decoder retains the stated line difference. All pointer targets are inventoried, but only the identified filename/account-name extents are established. Arbitrary descendants, pointer objects and data closure remain unresolved.

The larger donation caller is not proved equivalent: the current named body is 10,576 bytes, while the second original incoming caller window is 13,800 bytes. Original extents are inferred from entry references, not recovered historical debug symbols. The retained inline initializer handler/parser/wrapper, social exit and six Pubkey helper windows also pass: ten complete bodies, 26 immediate calls and five known literal extents.

The complete captured original remains different: 948,944 versus 768,104 bytes, 419,928 differing positions in the shared length, first difference at byte 24 and length difference −180,840. These layout-sensitive counts are not semantic coverage percentages. The 31-handler count is unchanged; bounded evidence does not establish exhaustive behavior, complete security coverage, deployment readiness or unique historical source/compiler/dependency identity.

## Build and receipt provenance

One fixed scratch build and one clean main build used the established Darwin v1.44 compiler and unchanged SDK installer's v1.52 stripping phase. Each used isolated target, SDK and rustup directories. The package binds all 53 SDK sources, four build helpers, 26 inputs, logs and before/after tool hashes. Shared allocated ELF payloads, including `.text`, are unchanged by stripping. Retained file/phase records do not prove every historical invocation or a unique historical recipe.

The nine validation receipt gzip files and donation sequence are exposed directly and are byte-identical to their frozen scratch members. The 18-suite aggregate contributes 17,331 of the 17,441 comparisons. Sixty-nine focused comparisons repeat existing inputs; there are no new unique cases or handlers. `status-proposal.json` is a full compatible status entry for parent integration, including direct validation, donation and authentic-history paths.

Saved verification rechecks 8,644 encoded transaction fields with 17,204 signatures. These are distinct from total executions and unique transactions. Two genuine historical FeeConfig initializer messages retain their signed bytes, signatures, runtime verification and stale-blockhash rejection control. They do not establish FeeProgramGlobal initializer history. Nine external-codec rejection rows retain exact raw AnchorError log equality. Prior Surfpool results remain attached to prior executables.

The immutable scratch archive retains its original seal, `a89a31c7e2f3bc526579d1c973aa116ab6614d686703adeb40bbe5c467e553cd`, including the approved prebuild proposal, original-byte analysis, source snapshots, fixtures and all 46 executed harness origins. The canonical map binds those origins to 44 byte-identical published harness files. Historical work paths and Darwin native-runtime hashes are provenance records, not required live paths or claims of installed Linux runtime identity.

## Verify

Run `python3 -B repro/pump_fees/sharing-module-v144/verify.py` for portable saved-evidence and signature checks. The complete package can be copied outside the repository; Python with `solders` is required. This command neither builds nor replays program transactions.

Run `python3 -B repro/pump_fees/sharing-module-v144/verify_current_bindings.py --repo .` separately for current tracked source/helper/documentation/runtime/harness bindings. All three newly added module files must be tracked. The existing `scripts/verify_recovered_builds.py --program pump_fees` consumes the complete status proposal without schema changes.

The prior state-module, inline-context and earlier packages remain immutable, with their own original executable hashes and evidence.
