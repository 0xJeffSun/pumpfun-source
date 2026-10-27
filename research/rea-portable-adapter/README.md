# Reproduce the recorded REA sBPF adapter in a fresh checkout

The historical `repro/rea/2026-10-26/prepare_adapter.py` uses one research
host's absolute macOS paths and deletes an existing destination. This additive
preparer takes explicit package, dependency and output paths, refuses an existing
output, and reproduces **all twelve recorded adapter file hashes** on Linux.
It leaves the historical scripts, manifest, package installation and captured
programs unchanged.

This is tool reproducibility, not a new recovered Pump function or an increase
in program byte equality. The original adapter remains experimental: it admits
only EM_SBF 263 / ELF64 / little endian / ET_DYN / flags zero. EM_BPF 247 is not
classified as sBPF. The same Ghidra seed preparer applies declared call
relocations in temporary analysis memory. Original file bytes are the comparison
authority; relocated analysis bytes must not become compiler inputs.

## Prepare and validate

Supply an unmodified, installed `rea-agents@6.8.0` package and its existing
dependencies. The measured environment used Node 24.22.1, Python 3.12.3, and the
npm package with integrity
`sha512-9QDeRnGqEDzABZyr04eLnBXBv/c6I9/TWu/6M0MD4pEfkySI/BIgwTODIbAReX3C1x6hjw9+Jlx4A2yUSPZ9ww==`.
No installation or network request is performed by the preparer.

```sh
python3 -B research/rea-portable-adapter/prepare.py \
  --source /absolute/path/to/node_modules/rea-agents \
  --dependencies /absolute/path/to/node_modules \
  --output /absolute/path/to/new-rea-sbpf

python3 -B research/rea-portable-adapter/test_prepare.py \
  --source /absolute/path/to/node_modules/rea-agents

/path/to/node24 research/rea-portable-adapter/check_headers.mjs \
  /absolute/path/to/new-rea-sbpf
```

`--dependencies` must select the dependency tree used by the original package.
For a flat npm/npx installation this is its parent `node_modules`; for a
self-contained installation it is the package's own `node_modules`. A conflicting
nested tree is rejected instead of silently changing resolution. Dependencies
are linked, not authenticated by the adapter report, and must remain available.

Before creating output, every patched input must match the historical original
SHA-256, and every transformed file must match the historical adapter SHA-256.
The manifest and relocation-method input are independently pinned too. After
copying, complete package inventories verify source preservation, unchanged
unpatched files, and the twelve transformed files. Output includes
`sbpf-adapter-report.json` with the complete inventories and scope. No existing
directory is removed; a failed partial copy is retained for inspection.

The preparer does not authenticate every unmodified npm file or install Ghidra,
Java, the sBPF processor or an MCP registration. It does not modify the user's
agent configuration. Ghidra engine prerequisites and the processor commit remain
as documented in `docs/REA.md`; use explicit Linux `JAVA_HOME` and engine paths.

## Measured validation

- All 12 transformed files match `repro/rea/2026-10-26/adapter-manifest.json`.
- Eight preparation tests pass against actual published-package files. They cover
  recorded output hashes, source preservation, existing destinations, dangling
  output links, input tampering, version drift, overlapping paths, package links,
  and conflicting dependency layouts. The small fixtures are not Ghidra runtimes.
- Nine checks execute the actual adapter's fixed-header reader, including
  rejected class, endianness, type, flags and truncation variants; EM_BPF stays
  unclassified and x86-64 retains its existing classification.
- The adapted public CLI successfully inspects the captured Pump file through
  `inspect-rust-binary`. Its subject SHA-256 is
  `7a19affaa2c6187e04a5fe0ea298cee81fa5eb8c24cfcc30d85f615e89f7b02d`.
  Complete REA Evidence is retained in `pump-rust-evidence.json` with ID
  `ev_fb6c83849d82cae5933db17be3a8dc254961e9d4db9da21ecd7ecc68c50dd19c`.
  No `.dep-v0` or read-only `/rustc/<40-hex>/` path was observed. Compiler and
  dependency identity therefore remain unknown by this inspection.
- `scripts/verify_evidence.py` passes for all nine saved captures, and the six
  existing comparator mutation tests pass. Neither check rebuilds a program.

This packet does not yet establish a fresh Ghidra decompilation or native engine
readiness. No program source, selected candidate, reconstruction count or historical
evidence is promoted by this change. The adapter transformations derive from this
repository's MIT-licensed preparation scripts; the installed REA package retains
its own MIT license and third-party notices, which are copied unchanged.
