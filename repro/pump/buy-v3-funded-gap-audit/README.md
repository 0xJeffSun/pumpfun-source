# Historical BuyV3 funded36 gap receipts

This package preserves existing offline audit evidence only. It contains no production source proposal and launches no VM, transaction, build, validator or network request.

The saved 36 target/candidate pairs (72 executions) compare original Pump SHA-256 `7a19affaa2c6187e04a5fe0ea298cee81fa5eb8c24cfcc30d85f615e89f7b02d` against historical baseline candidate SHA-256 `c261d215495a35aa59970546b87bd5fb74407d2bbd5d885d41a0d1a2677cc2f2`. There are 21 mismatching pairs, with 14 original successes and 9 baseline successes. Each pair uses the same normally signed transaction and input state. These are finite synthetic fixture comparisons, not live-state reachability or full handler identity evidence.

Main has since integrated pass21 in `850e0f39`, selecting Pump candidate SHA-256 `ffa0f3bab34b8cfca6d6aeef5e6b8dcabad0a16eccfeb3d22d5781e22ae3b193`. The captured static observation is from `b9227601850a4a526be47f2a05f06845dd714f7f`: `programs/pump/src/lib.rs:100` discards `partial_fill`. That source observation does not rerun or establish the 21/36 runtime result on latest main. The saved runtime is exclusively historical c261.

Run `python3 verify_package.py` from any directory. Python needs `solders==0.27.1` for signature verification. The verifier checks the package seal, the explicit verifier path and lossless gzip-reader adaptations, and saved receipts; it never executes the retained runtime harness. An optional `--repo-root /absolute/repo` additionally hashes the external files listed in `external-inputs.json`. No dependency installation is performed by either verifier.

`manifest.json` inventories every package payload except itself and `manifest.sha256`; `manifest.sha256` pins its bytes. This local integrity seal is not an independent provenance attestation. `external-inputs.json` records binaries/capture metadata/owning baseline report hashes without bundling executable binaries. The baseline build report is copied as `historical-build-comparison.json`.

`original/verify_receipts.py` is unchanged. The standalone `verify_receipts.py` changes only the package root and gzip import/receipt reader to find the bundled fixture and load the losslessly compressed receipt. `packaging.json` retains all three exact replacements and the original uncompressed size/SHA-256; the verifier checks the decompressed bytes. Existing runtime scripts are inert `.py.txt` provenance copies and are not used by verification. `original/receipt-verification.json` records the prior check; a fresh read-only packaging check is reported separately by the parent.

See `HANDOFF.md` for unaccepted isolated experiments and unfinished checks. The two original handoff files remain verbatim historical snapshots; their old statement that no standalone package existed describes their earlier capture time.
