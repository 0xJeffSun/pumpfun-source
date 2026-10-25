# Read-only origin/main reconciliation review

Pin accepted head b3f23323f93061821ff98221dfbf6ed34f6f9918, incoming bde19c4ee0632cfe0d22c9100f55b0475c8aff24, merge base0c70dbb014a59aa0e50ccb9d7f8089004186ac23. `paths.json` enumerates all266 incoming paths, exact incoming Git blob/SHA256/size, accepted blob-or-absence and explicit disposition. Fifteen paths restore accepted active content while retaining incoming variants under reconciliation/upstream-files;251 other paths remain as inactive upstream material. This is a review, not a performed merge.

## Required resolution

Preserve the complete accepted programs/pump tree, including accepted absence of newly added active .rs files. Restore accepted workflow, status, verify_current_bindings.py, verify_recovered_builds.py, audit/AUDIT.md and docs/RECOVERY.md. Archive each incoming variant byte-for-byte at its ledger archive path. Keep the upstream commit as merge history and all nonconflicting upstream evidence/research at its incoming path with explicit inactive/no-execution status. This retains all upstream material without accepting its source or claims as current provenance.

Do not depend on Git conflict prompts: incoming programs/pump/src/lib.rs and verify_recovered_builds.py are not shared-touched paths since the merge base and may apply automatically. Safe top-level inspection shows incoming lib.rs adds active module/re-export wiring for incentives, token_incentives, mayhem_virtual_params and multi_hop_curve_swap. Merely reverting that wiring is insufficient for fixed source manifests: extra unreferenced .rs files under the active crate are still scanner inputs. Preserve them outside the active programs/pump tree, under the exact-byte archive disposition.

Incoming .github/workflows/verify.yml replaces accepted Pump groups with merged-prs replay groups, whose suite metadata includes Pump admin incentives, claim incentives and synthetic Mayhem. It removes pass19 applicability/follow-up gates and changes AMM3fe back to eeca and Fees4baf back to76b0. It must not be enabled. Incoming verify_current_bindings.py and verify_recovered_builds.py unconditionally redirect Pump to the merged-prs verifier and drop newer dispatch support. Preserve the accepted scripts; no incoming replay or verifier was executed by this review.

Incoming status points Pump at merged-prs-20261025 with9558 cases, drops its explicit current candidate/identity fields, and reverts AMM/Fees current pointers to older artifacts. Those candidate paths are historical evidence, not replacements for accepted5d/3fe/4baf source/binary/README bindings. Restore accepted status/README/audit/recovery text; attach a reconciliation note rather than silently combining claim counts or source snapshots.

## v1.43 package

The new v1.43 recipe-switch artifacts may be preserved as inactive research. Their own build-comparison metadata records full_byte_equality=false and first_difference18 for all three programs. The proposed status patch labels v1.43 a corrected compiler, but that historical conclusion is not established by these files and must not be applied as an instruction.

The v1.43 Pump source map differs from current accepted admin_cto.rs; its AMM map has26 inputs and differs in incentives.rs/lib.rs; its Fees map differs in sharing.rs. None binds the current accepted source/artifact combination. Exact reported candidate hashes and source counts are retained in recipe-metadata.json. This review did not compile, execute, disassemble these candidates or inspect recipe/path-remap script bodies.

## Inactive preservation conditions

All incoming research scripts, synthetic crate, stopped Pump handler implementations and receipts stay unexecuted and excluded from current compiler manifests and CI. No synthetic project is added to workspace membership. Explicitly record that directory presence, a commit merge or an imported receipt does not grant execution approval or make historical evidence current. Preserve original relative paths in the archive manifest so future reviewers can recover upstream content without re-enabling it. Separate any future scope request from this history reconciliation.

The review inspected Git metadata, workflow/status/build-binding metadata and safe top-level dispatch names only. Stopped handler bodies, synthetic probe implementations, path-remap wrappers and private security outputs were not analyzed or executed. Blob hashing is identity-only. Existing build/corpus acceptance and all stopped-scope restrictions remain unchanged.
