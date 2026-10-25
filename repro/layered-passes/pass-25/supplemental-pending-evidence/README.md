# Supplemental pending evidence archive

This archive preserves five exact sealed packages: AMM source proof32825564, UNEXECUTED AMM build plane3c3a9d (including its full registry/source closure), Fees no-change limited static reviewfcd5e6a and admitted with-values659afe6d, plus UNEXECUTED metadata-v2 proposal23082c20. It is recoverable pending work, not a new build/runtime acceptance or a claim that the reviews close original equivalence.

`INVENTORY.md` lists exact inner seals and readable counts. `archive-index.json` binds every regular file, directory, byte count/hash, permissions and observed tar metadata, with explicit member order. Exact source manifests and sidecars are inside their complete packages. The gzip stream is stored as ordered parts of at most64MiB, with whole-stream and per-part hashes; no source file, history, manifest or permission is discarded. Private audit paths, unrelated scratch outputs and already-retained Pump/Relay packages are not included.

Run `python3 -B verify.py --expected-seal OUTER_SHA256`. The independent verifier streams all archive members, checks exact whole compressed bytes/order, permissions/metadata, every inner manifest's known hardcoded seal, sidecar, full membership and file hashes. It never extracts or imports archived code, runs a controller/probe/build/VM, interprets stopped source or consults the original work directories. This is byte/permission preservation only.

Verifier history: initial reader62f failed on a full-stat-mode versus TAR-permission-field comparison. Its exact manifest/reader/stderr are preserved under prior-attempt. This reader separately verifies permissionbits AND filetypebits; the archive stream, all parts and every inner package are unchanged. No failure is relabeled as a pass.
