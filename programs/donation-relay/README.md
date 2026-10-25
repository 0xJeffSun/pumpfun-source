# Donation Relay source alias

This directory contains an exact 23-input copy of the selected Relay13 source snapshot, including Cargo.toml and Cargo.lock. `source-selected.json` binds it to `repro/donation-relay/current.json`, the frozen source map, and selected candidate `e575529b6ccf6685a28ba45f010b3d15141e0cf689f94998afe60153936ed244`.

This is source-copy agreement only. No fresh build from this new path, target execution, compiler determination, recovered-source completeness or whole-original identity is established by the copy. New builds: **0**. New target executions: **0**. Full original byte equality: **false**. The original selected artifact, recipe, defaults, status and pointers are unchanged. The selected packet retains the finite ordinary12 evidence and the checked-borrow ownership proof; changed borrow-failure runtime coverage remains zero.

The incoming working-source variant differed from the selected snapshot in `src/exit_error.rs` and `src/idl.rs`. All incoming bytes, including its former README claims, are preserved opaquely under `repro/upstream-reconciliation/main-e8338e77/incoming/`. They are not promoted by this alias. The incoming legacy `scripts/donation_relay_differential.py` is retained unmodified and uninvoked; it is not accepted source/build/runtime proof for this directory.

Read-only check (Python standard library, no compiler or VM):

```sh
python3 -B repro/upstream-reconciliation/main-e8338e77/verify.py --repo .
```

The check verifies the exact working-source map, selected snapshot/current metadata, incoming preservation hashes and Git blob identities, restored Pump/Mayhem inputs, and absence of the stopped initialization runner. It does not inspect incoming initializer semantics. Existing unresolved byte, account ABI, allocator/OOM, transitive library and security-equivalence limits remain.
