# Metaplex source recovery experiment

Two behavioral differences distinguish the captured program from the public baseline at `17e99434af5ead3e989c08f32af33609821d0bc0` and its retained candidate4 build.

* Legacy edition conversion clears exactly the last two bytes of the edition allocation after serialization. Across 39 normally signed offline comparisons, nine successful states differ because candidate4 retains those bytes. The original stores and source-location records support `data[data_len - 2] = 0` and `data[data_len - 1] = 0`.
* Create Master Edition V3 rejects a read-only metadata account with custom error203 and message `Master edition is not mutable`. Fourteen further normally signed probes confirm two such differences, successful writable controls, earlier supply/decimal errors and rollback. The original guard reads the sixth AccountInfo's writability byte. Its metadata `is_mutable` value is a different field and does not trigger this guard.

`source.patch` applies only inferred Rust changes to those two handlers and appends error203 with its captured literal. The variant name and exact historical spelling are not attributed. The public baseline and patched file hashes are bound in `source-inputs.json`. Application to a fresh baseline copy was checked, but this package initially contains no rebuilt candidate or post-patch equivalence claim.

The hosted `token_metadata_recovered` build uses the same pinned Linux image and public source revision as candidate4, then applies this source patch before compilation. The builder records full baseline and patched input manifests, the patch, compiler identity, log and an honest whole-file comparison. Original ELF bytes are read only after compilation, never transformed into compiler output. A failed full comparison is expected until all remaining differences are resolved.

The 53 baseline comparisons preserve ordinary test-owned signatures, enabled runtime signature/blockhash verification, full watched account bytes/owners/lamports, errors, inner instructions, logs and failed rollback assertions. Master-edition tests invoke actual System and captured SPL Token programs. There were no live transactions. The frozen probe scripts retain their actual `work/metaplex-conversion-recovery` output paths; restore them there to rerun from the repository root.

`superseded-ix-only-reachability.json` preserves a rejected static hypothesis. It stopped only at IX-prefixed log messages and missed `V3 Create Master Edition`. The corrected analysis and runtime controls in `static-evidence.json` establish that error203 belongs to master-edition creation, not legacy conversion. This correction is not a security finding.
