# Metaplex recovered-source candidate 7

A fresh pinned Linux build applies the [ten-file Uses trial](../metaplex-uses-source-recovery/README.md) to public revision `17e99434af5ead3e989c08f32af33609821d0bc0`. The raw ELF is **706,952 bytes**, SHA-256 `fe8c3025b30ee56f3cc7d281f85d6759713a8cb5777d77e35f941fd37b34fbc5`. Compilation succeeded, and the hosted job failed its final full-byte equality requirement. **Complete original-file equality remains false.**

All **109 normally signed offline comparisons / 218 transactions** pass: 53 edition regressions, 35 Uses/token-standard cases, and 21 owner-signed burn boundaries. The recovered Uses bounds and programmable-edition checks now agree within those fixtures. Complete watched state, errors and inner instructions are compared; raw logs and compute remain outside the equality claim. These finite tests do not prove full dependency behavior.

Read-only alignment finds 1,251 inferred windows and 776 unique normalized anchors, all retaining their ordinal. 1,236 windows match normalized instructions, relocation patterns and direct-call ordinals; 15 remain structurally different. No executable bytes, headers or relocations were rewritten. Referenced rodata and recursive semantic equivalence are not established by normalization.

The package retains build source manifests, exact patch, image/tool identities, build log, full-file comparison, runtime receipts and harness-reference hashes. Root independently confirmed exactly ten source changes and matching build-log/artifact hashes. The next [context source trial](../metaplex-context-source-recovery/README.md) addresses a metadata system-program check and burn seed-vector ownership; its new build remains pending.

Rebuild using workflow input `token_metadata_uses_recovered`. Rerun the three immutable referenced runners with `--candidate repro/pump/metaplex-candidate-build-7/token_metadata.so` and a new `--output` path. The runner locations and hashes are in `harness-references.json`; their supporting baseline fixtures remain in the referenced packages. Source recovery is incomplete, and this candidate is not a production substitute.
