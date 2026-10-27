# Native Linux text-layout support

The text-layout helper previously selected an Apple linker directory solely from the machine architecture. It now reads the actual SDK rustc host triple and records the compiler's complete version facts. This allows the same bounded, pure text-section recipe to run with the official Linux SDK and keeps the actual linker hash bound to each build.

| Source | Default layout | Ordered layout | Normalized windows |
| --- | ---: | ---: | ---: |
| Round37 primary | 121 raw-equal bodies | 137 raw-equal bodies | 744 / 1,035 |
| 778 research primary | 121 raw-equal bodies | 137 raw-equal bodies | 778 / 1,035 |

Every native normalized window is retained across each ordering change. The 778 comparison also preserves the multiset of 964 named native instruction windows and their ordered direct callee-label/signature sequences, totaling 10,678 edges. Duplicate symbol names are distinguished by signature and callee sequence. Data, indirect calls and pointer-alias identity are excluded from this check. Fresh ordered 778 builds produce identical stripped and unstripped artifacts.

All 122 actual linker inputs per ordered build are hash-bound and retained as deduplicated compressed blobs. The recipe only orders input text sections; no original code or data is injected and no linked output is edited. Full primary source snapshots, native artifacts, build records and pipeline helpers are included. Run verify.py to check manifests, source bindings, native match counters, repeatability, linker inputs and the bounded call comparison independently.

The maintained macOS-host Round37 checkpoint has 175 raw-equal bodies. This Linux experiment does not reproduce that selected profile or replace it. It improves the Linux research recipe, with whole ELF identity still false. The exact ordered 778 candidate passes 352 focused exact-quote cases with zero diagnostic mismatches. Its own report and captured-loader receipt are retained under runtime/. Previous binaries' runtime results are not reused; this is not a new full-corpus qualification.
