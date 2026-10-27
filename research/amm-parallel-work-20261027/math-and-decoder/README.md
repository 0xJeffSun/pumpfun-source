# Nonselected AMM worker research archive

This is a bounded research archive, not a selected checkpoint or a claim of whole-program identity. It preserves completed transfer-fee experiments, ceiling/floor module relocation trials, Pool content/helper ABI work, and the Pool source-organization hypothesis. Some source ideas were incorporated into later checkpoints; the exact historical binaries here remain research artifacts.

The selected 58-case transfer-fee portable proof is deliberately separate. Failed offline attempts, target directories, Cargo caches, and registry source trees are excluded. The archive includes the 49-file transfer-fee negative-experiment set, its complete application source variants, successful build records and binaries, source patches, disassembly, and the signed proofs needed to assess the completed work.

Run the read-only verification with Python and `solders==0.27.1`:

```sh
python -B verify_archive.py
```

The verifier checks every archived byte against `manifest.json`, authenticates the preserved transaction signatures and full recorded results/logs, checks included application source hashes against successful build records, recomputes five complete instruction-window measurements, and checks the exact historical Pool reader bodies and direct callees. It does not run SBF or rebuild the application. Historical absolute paths in logs and build records are provenance data; verifying this archive needs no original workspace paths.

The named experiments retain their original relative paths for traceability. Their original verifier scripts are preserved as historical sources; use the root `verify_archive.py` for portable, read-only verification. `claims.json` explicitly lists the checks. Toolchain and external dependency digests remain in the build records; those tools and caches are intentionally not bundled.

The results preserve uncertainty: source-origin-only bodies are not called exact; the Pool layout is a hypothesis; the SBF organization trial's 579-window result is distinct from later SBPF results; native transfer-fee receiver/cursor trials did not restore the original call boundary and were not promoted. No padding, representation tricks, or binary patches are introduced by this archive.
