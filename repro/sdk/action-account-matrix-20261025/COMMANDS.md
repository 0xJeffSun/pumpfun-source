# Exact static recipe

All commands use Python standard library only, within the owned packet directory. V2 additionally runs `python3 work/sdk-action-account-matrix-v2/test_ts_static.py` (eight tests); the final verifier reruns these tests in-process.

```sh
python3 work/sdk-action-account-matrix-v2/analyze_sdk.py
python3 - <<'PYTHON'
import sys,json
sys.dont_write_bytecode=True
sys.path.insert(0,'work/sdk-action-account-matrix')
from rust_static import analyze,P
m=json.loads((P/'sdk-matrix.json').read_text())
(P/'source-matrix.json').write_text(json.dumps(analyze(m['instructions']),indent=2)+'\n')
PYTHON
python3 work/sdk-action-account-matrix-v2/supplement.py
python3 work/sdk-action-account-matrix-v2/entrypoints.py
python3 work/sdk-action-account-matrix-v2/render.py
```

The source snapshot was copied byte-for-byte from the 68 program Rust paths enumerated in `source-observation.json`; its HEAD/status fields record that original observation. The manifest generation hashes every packet file except `MANIFEST.json` and Python `__pycache__`; external input hashes cover the three tarballs, three saved registry responses, three receipts, prior report/result, and archived plan.

Final independent-cwd verification command (run with cwd `/tmp`, successful exit 0):

```sh
python3 /Users/shawwalters/Documents/Codex/2026-10-25/go/work/pumpfun-source/work/sdk-action-account-matrix-v2/verify.py
```

No network, npm installation, JavaScript evaluation, Anchor resolution, Rust build, RPC or target execution occurred.
