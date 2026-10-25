# Pump layer01 static inventory: publication envelope

This directory preserves the complete immutable Pump inventory at baseline
`c1ffdd0667608d4755227e68aab9f27a7e9a0d37`. It makes no new source, build,
runtime, full-binary equality, or security acceptance claim. The original
[report](REPORT.md) and [result](result.json) retain their historical scope.

The original 142 payload files plus manifest and anchor are archived, byte for
byte, in `original-publication.tar.gz`. Its original manifest SHA-256 remains
`1e2896882e16eecd9fde684c2e3ae5bdc699ac6eb231f74389904dedc84aaf15`.
Copies of that seal are in `original-seal/`. The archive preserves an accidentally
sealed `__pycache__/analyze.cpython-314.pyc` as opaque historical evidence. There
is no loose bytecode file in this publication envelope.

`archive-copy-correspondence.json` binds every readable report, ledger, source
tool, and text input copy to its exact archived member. `source-tools/` contains
unchanged original source tools for inspection; use the envelope verifier below
because those readable copies do not reproduce the original directory layout.
`adaptation.json` records all original member hashes and this packaging-only
change. The new top-level manifest seals the envelope separately from the
unchanged original seal.

Run from any working directory with Python 3.10 or newer (standard library only):

```sh
python3 -B /path/to/repro/layered-passes/pass-01/results/pump/verify.py
```

The wrapper verifies the envelope, every archived member against both the
original seal and archive inventory, and the readable-copy correspondence. It
extracts into a fresh temporary directory, then runs the unchanged original
`verify.py` source with `-B`, a fresh empty `PYTHONPYCACHEPREFIX`, and bytecode
writing disabled. Thus the preserved cache is not selected for imports. It
rechecks all extracted bytes afterward. This recomputes static instruction,
call, branch, data, source-binding, and Git-membership evidence without invoking
a compiler, ELF target program, network, or transaction runtime. Missing,
changed, nonregular, unsafe-path, and loose-bytecode files are rejected.

Whole original/candidate ELF equality remains false. These inventories remain
bound to the recorded baseline even if the repository's current source changes.
