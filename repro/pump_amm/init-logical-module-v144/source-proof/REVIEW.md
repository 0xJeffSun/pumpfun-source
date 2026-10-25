# Initializer logical-module restoration proposal

Move only `InitUserVolumeAccumulator` into `src/instructions/token_incentives/init_user_volume_accumulator.rs`, following its authentic original diagnostic filename. The new module contains `use crate::*;` and the existing context verbatim. The initializer handler remains in lib.rs unchanged. No workspace, dependency, compiler, feature, profile or runtime changes are proposed.

`proposal.patch` changes two existing files and adds two module files. `lib.rs` publicly re-exports the context at its former root path; the crate-visible glob re-export/import also carries Anchor's generated `pub(crate)` client-account modules needed by `#[program]`. `instructions/mod.rs` adds `token_incentives`; its new mod.rs declares the context module and performs the crate-visible re-export. The pattern uses the existing crate's module conventions while preserving root context visibility. No generated module names are hardcoded.

The context's event_cpi/Accounts annotations, four declared fields, CHECK comment, mut/init_if_needed/payer/space137/seeds/bump constraints and field order are byte-for-byte unchanged. Generated event-authority/program members remain macro-owned. No handler expression, state type, signature, event, error or other context is deliberately changed. The one-field AccountInfo correction from the accepted3fe checkpoint is preserved.

## Provenance and limits

The bound `work/amm-init-source-organization-review` proof establishes the original helper's source origin as `programs/pump-amm/src/instructions/token_incentives/init_user_volume_accumulator.rs`, line8. The actual initializer parser calls that complete7824-byte helper, whose only two normalized differences from the accepted candidate are source line and filename length. This gives a source-supported logical module ownership, rather than an invented filename.

The proposal does **not** reconstruct the original imports, module declaration syntax, all contents of that file or original workspace. The new Accounts derive naturally lands at line4, not original8; no spacer/comment is inserted to change it. The current AMM standalone `[workspace]`, root workspace containing only pump-fees, pinned dependencies and build recipe remain unchanged. Its future emitted filename may retain the `src/` prefix rather than original `programs/pump-amm/src/`; no remap or root-membership change is included. This proposal does not promise byte equivalence or a match-count increase.

Moving a declaration also relocates source spans and can change generated symbol names or other downstream diagnostics. All such consequences require honest full comparison after a separately authorized isolated build. In particular, no existing Claim147→149 history or other source-location difference may be normalized away. This source-only packet provides no compiler success, ABI verification, backend stack result or runtime evidence.

`inputs.json` binds all28 accepted compiler inputs, including the full vendor tree and unchanged Cargo files, plus the source-organization proof manifest. `before/` and `after/` provide complete proposed files. The verifier checks exact constrained transformation, root/public re-export, verbatim context movement and all baseline hashes. No source files outside this work directory were written.

Run `python3 -B verify.py --repo .`. This is a source/hash check only.
