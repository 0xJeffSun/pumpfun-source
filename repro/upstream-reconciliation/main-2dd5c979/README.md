# Opaque main-2dd5c979 retention and selected restore

This packet preserves exactly eight changed paths from `e8338e77bcfb171ead2c2181c57782009db7d3a0` to `2dd5c97928a6a0e5c756dbbd0b25c798e8c2dd5b`: five additions and three modifications, no upstream deletions. All incoming source/script/document bodies are opaque. Only filenames, raw lengths, SHA256 and Git blob identities were inspected; no stopped-lane semantics or scripts were analyzed/executed.

`preservation.json` binds every incoming file to its Git object. The three modified compiled inputs (`programs/pump/src/lib.rs`, `trade.rs`, `volume_sync.rs`) have baseline e833 byte hashes equal to the selected37-input Pump report. Root restores those selected bytes. The three added incentive source files and added V3 execution script remain absent from active paths, with exact copies under `incoming/`; they are not adopted or promoted. The added reconciliation document is preserved both here and at its incoming path as passive historical material, not accepted source/build/runtime proof. Its body is not interpreted.

`verify.py:check(root)` / `--repo ROOT` verifies this strict packet, all eight SHA256/Git blobs, three restored paths against the selected report and recorded baseline blobs, the complete unchanged Pump37 actual hash map, all four inactive paths absent, and the passive document byte-identical at its original path. It invokes no Git, compiler, VM, RPC or target script. Package-local `.gitattributes` protects incoming bytes; the existing parent attributes and every old package remain untouched.

The preparer wrote only the new proposal/package; root owns checkout merge/restoration. New builds **0**, target executions **0**, incoming semantic acceptance **false**, whole-original identity **false**. No current artifact/recipe/default/status/source-pointer change is established by this retention.

```sh
python3 -B repro/upstream-reconciliation/main-2dd5c979/verify.py --repo .
```
