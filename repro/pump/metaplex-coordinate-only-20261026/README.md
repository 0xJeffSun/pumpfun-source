# Metaplex diagnostic-coordinate recovery

This source-built checkpoint reduces the captured Metaplex mismatch from **1,509
to 1,479 bytes**. All 29 previously different source-coordinate records now match.
The complete 12,752-byte `.data.rel.ro` section is byte-identical to the original,
as are `.rodata`, dynamic tables, symbol/string tables and section layouts.

All instruction bytes are unchanged from candidate11. **1,250 of 1,251 inferred
function windows are raw-identical to the target.** The remaining differences are
1,477 bytes within the 5,104-byte Utilize window and two relocation bytes. The
full reconstructed allocation image is still unequal to the original. This is
source/data recovery, not a claim of completed dependency reconstruction.

All five inherited runtime groups pass again: **135 cases / 270 signed
transactions**. Complete watched state, errors and inner instructions match under
the existing comparators. Raw logs and compute remain excluded; these finite cases
do not prove exhaustive input coverage or new zero-use boundary acceptance.

The source changes are whitespace-only in nine files, on top of candidate11's
18-file public-source reconstruction. They implement the observed diagnostic
coordinates without asserting historical whitespace or comments. The original
Utilize business logic is unchanged. Apply `base-source.patch`, then
`coordinate-only.patch`, to public revision
`17e99434af5ead3e989c08f32af33609821d0bc0`. `patch-application.json` records an
independent application to original Git blobs and exact source-hash verification.
The final 18 changed source files are also saved in `source-snapshot.tar.gz`.

The build ran in an isolated Linux/amd64 container using the pinned image and
SDK v1.37 / Rust 1.68.0-dev recorded in `command.json` and `tool-versions.json`.
The SDK and registry were read-only mounts; the target executable was not mounted.
An initial fresh-target build was followed by a source-only refinement using its
compiled dependencies. The first coordinate placement repaired the 29 records
but shifted three already-correct records; moving two blank-line insertions below
those locations repaired that regression. Initial offline-cache setup failures
remain in the original work directory and are not represented as successful builds.

The raw Rust output is 707,448 bytes, SHA-256
`5d89440f85e1a45964c8966f4dee7e1087757f05897f25a58d227808853e9cbe`.
The 793,991-byte allocation image appends 86,543 verified zero bytes and has SHA-256
`1789b173028c4a0942b16c289cdb76adb75a5247326a5ebefdaebbf798f44a51`.
No executable instructions, relocation values or ELF headers were patched.

```sh
work/test-env/bin/python -B repro/pump/metaplex-coordinate-only-20261026/verify.py
```

The verifier checks source/artifact hashes, all function windows, complete section
and residual-byte comparisons, runtime comparison fields and every transaction's
signature. Build commands retain their original host paths; to rerun elsewhere,
adjust host mount paths while preserving the recorded container paths and inputs.
