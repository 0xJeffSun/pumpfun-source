# Metaplex recovered-source candidate 6

A fresh pinned Linux source build applies the [five-file trial](../metaplex-audit-source-recovery/README.md) to public revision `17e99434af5ead3e989c08f32af33609821d0bc0`. Its raw ELF is **706,584 bytes**, SHA-256 `355c4889beed49b89acf27aec5aadd63ab7c6471f0fb4f98cbd824f608ec1362`. Compilation succeeded; the hosted job failed its final equality requirement. **Full-file equality remains false.**

The source changes add captured burn-PDA checking and remove a legacy metadata authority exception, retaining the earlier edition corrections. The original and patched manifests confirm exactly five changed source files. The candidate uses no captured executable bytes as compiler input. Appended allocation zeros are separately recorded and do not repair the remaining original ELF differences.

All 53 edition regression comparisons pass with 106 verified ordinary signatures, complete watched state, errors, inner instructions and failure rollback. These tests cover the retained edition behaviors; they do not independently establish full burn or metadata-helper coverage. Logs and compute usage remain outside the equality claim.

Read-only ordinal analysis still finds 1,235 matching normalized instruction windows and 16 structural differences among 1,251 inferred windows. The burn function is now 4,816 bytes versus the original 4,912; the metadata helper is 4,480 versus 4,568. This is progress toward matching those functions, not exact source or complete call-graph proof. No executable output was edited.

Build records, source manifests, tool/image identities, the patch, log, comparison and bounded runtime receipts are retained here. Rerun the source build using workflow input `token_metadata_audit_recovered`. Rerun the edition comparisons from the repository root:

```sh
python3 repro/pump/metaplex-candidate-build-6/validation.py --output work/metaplex-candidate6-replay.json.gz
```

The saved receipt binds the original candidate-5 harness used for this replay; the copied runner is byte-identical and accepts an explicit candidate path. Package paths in the analysis record retain the actual execution locations.
