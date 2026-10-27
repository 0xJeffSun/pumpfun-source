# Isolated AMM workspace-layout experiment

The original reports paths beginning `programs/pump-amm/src/`; the maintained
standalone crate reports `src/`. This experiment makes the unchanged Rust
source the sole member of an isolated workspace. The release profile and path
dependency patch move to that workspace root, and the exact lockfile bytes
move with them. No maintained source, global workspace or selected artifact
was changed.

The real v1.44 Darwin build succeeds and emits those longer source paths.
Candidate SHA-256 is
`3bb71ebe9550e33da18e7395c8c810c00048b85741e351fe4bc46aea93524f48`.
It remains at 503/785 normalized original matches, with zero gained or lost
windows. Text length remains 1,133,848 bytes. The experiment therefore resolves
the path-prefix mechanism but does not improve complete function matching or
prove the original workspace, lockfile or compiler provenance.

`results` retains all 31 source/build inputs, actual compiler records and logs,
both ELF outputs and measurements. The comparison of symbol names with their
terminal Rust hashes removed is display-only evidence; it does not alter the
binary matcher. This build has not received a fresh runtime acceptance run and
is not promoted.

```sh
work/test-env/bin/python -B repro/pump_amm/workspace-layout-20261026/verify.py
```

The verifier authenticates files, unchanged Rust and lockfile bytes, and freshly
recomputes the function-window measurement against the original. Historical
source spelling, source-line placement and complete ELF equality remain open.
