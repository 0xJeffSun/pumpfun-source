# Preserve evidence bytes during Git checkout

With `core.autocrlf=true`, the previous binary-only attributes converted the
upstream JSON receipts from LF to CRLF. A fresh Windows checkout consequently
failed `scripts/verify_evidence.py` before checking any captured program. The
Git blobs themselves still matched their recorded SHA-256 values.

The root `* -text` rule disables Git line-ending conversion on checkout and
staging. This preserves both LF and authentic CRLF receipts; forcing `eol=lf`
would not preserve the latter. Existing binary and whitespace attributes remain
in place. No evidence blobs, source files, selected artifacts or recorded hashes
are rewritten. More specific nested attributes, if present, still take precedence.

Run the regression check and the existing capture checks:

```sh
python -B repro/checkout-integrity/test_checkout_bytes.py
python scripts/verify_evidence.py
python scripts/test_tooling.py
```

The regression creates temporary Git repositories and checks raw blob bytes
through real checkout and staging, using three line-ending settings. It includes
LF, CRLF, mixed-ending and binary fixtures, reproduces the previous failure, and
shows why forced LF is insufficient. It requires Git and Python's standard library.

The attributes take effect on newly checked-out files. They do not repair files
already converted in an existing working tree. For an existing clone, preserve
local edits before refreshing tracked files; do not rewrite manifests to accept
converted evidence.

This fixes evidence reproducibility across checkout settings. It adds no compiled
candidate or byte-identity claim.
