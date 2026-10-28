# Reproducing the L32 verification follow-up

Run these commands from a fresh repository checkout after installing the pinned
repository Python dependencies, including `solders`:

```sh
PACKET=research/pump-l32-independent-verification-20261028
python3 "$PACKET/verify.py"
python3 "$PACKET/test_negative_controls.py"
python3 -O "$PACKET/test_negative_controls.py"
python3 "$PACKET/test_l32_tooling.py"
```

The packet verifier performs the following checks:

1. rejects symlinks, unlisted files, and content not bound by `MANIFEST.json`;
2. binds the qualified L32 stripped and unstripped artifacts and 990/166 census;
3. rechecks the 3,148-case staged signed comparison matrix and loader receipts;
4. verifies every serialized transaction while reconciling the 2,407, 2,409,
   and 2,411 scopes;
5. runs the retained-versus-fresh and complete saved-runtime audits from
   checkout-independent paths;
6. runs the unchanged L32 verifier normally and proves optimized Python is
   rejected; and
7. proves the explicit transaction accounting is invariant under `python -O`.

Expected packet summary:

```text
status: verified
L32 stripped: 45c5af2485f6d8138b471cbd6b56e0bf59135dcefea15f055d6387b4f1ac0bca
L32 unstripped: 868a868be78e576143fdb8bc8c5a3681410e186a11856c62405ed5e217d0bc5c
function census: 990 normalized, 166 raw
focused paired executions: 3148
focused distinct signed transactions: 150
saved full-corpus pairs re-audited: 10468
direct/all-outcome distinct transactions: 2407/2409
remaining non-filename log differences: 23
```

To reproduce the portability checks directly from an unrelated working
directory:

```sh
cd /tmp
python3 /absolute/path/to/repository/research/claude-pump-integration-20261027/r37-layout-32/runtime-review/retained_vs_fresh.py
python3 /absolute/path/to/repository/research/claude-pump-integration-20261027/r37-layout-32/runtime-review/audit_saved_runtime.py
```

`audit_saved_runtime.py` rewrites its own derived JSON report deterministically;
the packet manifest and Git status must remain unchanged afterward.
