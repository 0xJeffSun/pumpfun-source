# main-e8338e77 preservation and selected Relay source alias

All **30 incoming files** from `e8338e77bcfb171ead2c2181c57782009db7d3a0` are retained exactly under `incoming/`. `preservation.json` records their SHA256 and Git blob IDs. The guard recomputes both from the saved raw bytes (Git's `blob <length>\0` framing, no Git process needed). Incoming initializer/create source and runner bytes remain opaque. No incoming initializer semantics are inspected or adopted.

The newly introduced Relay working-source variant differed from both the retained Relay12 and selected Relay13 snapshots in exactly `src/exit_error.rs` and `src/idl.rs`; its original23 inputs and former README remain preserved. Root copied the selected Relay13's exact **23 source/Cargo inputs** to `programs/donation-relay/`. `programs/donation-relay/source-selected.json` and its replacement README describe only this path alias. The source pointer, selected candidate, recipe/default/status and original packets remain unchanged.

`verify.py:check(root)` (CLI `--repo ROOT`) is the source-alias guard for the current reconciliation bridge. Python standard library only. It checks strict package inventory; all30 preserved SHA256/Git blobs; actual working23 versus the frozen selected13 source-map/snapshot/current.json; selected candidate/hash; source-selected metadata and working README; and exact Pump37/Mayhem14 inputs against their retained build reports. The two restored compiled files are separately bound by raw SHA256/Git blob to `4bde77ebbefe9d617de0cd9f9b1d15f29954c89a`: `programs/mayhem/src/lib.rs` and `programs/pump/src/create_v2.rs`. Restored files are checked as bytes only, without new semantic interpretation. `bindings.json` retains their original Git-reference witness, source maps, report hashes and metadata hashes.

The stopped initialization runner remains absent from the working tree and preserved only as incoming bytes. `scripts/donation_relay_differential.py` remains byte-identical to its incoming copy and is **not invoked** by this reconciliation or checker. Its former claims and the incoming README are not accepted source/build/runtime proof for the working alias.

This packet establishes **copy agreement**, not a fresh build from the new source path or historical source/compiler uniqueness. New builds **0**; new target executions **0**; full original byte equality **false**. Selected Relay13's prior finite ordinary12 evidence and static checked-borrow ownership proof remain limited; changed borrow-failure dynamic coverage remains zero. No source-completeness percentage or full ABI/security equivalence is asserted.

```sh
python3 -B repro/upstream-reconciliation/main-e8338e77/verify.py --repo .
python3 -B repro/upstream-reconciliation/main-e8338e77/test_guard.py
```

Eleven metadata/hash tests reject source drift/extra source, selection-pointer drift, false build/equality/semantic claims, corrupted preservation SHA/blob metadata, path escape and symlinks. Tests alter only in-memory metadata or temporary files. `local-validation.json` records actual saved-byte checks and test results; no compiler, signing, VM, transaction submission or network is used.
