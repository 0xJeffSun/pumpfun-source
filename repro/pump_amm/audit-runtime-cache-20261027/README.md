# Cached signed-transaction audit

`compare_direct_cached.py` preserves the existing direct comparison policy and return schema. Within one audit, it reuses decoded transactions and successful signature checks only for exactly identical encoded transaction bytes. Every receipt's verification flag, signature count, all message pairs, every output field and all retained logs are still checked. No trust cache persists between audits.

The original auditor remains unchanged. `verify.py` pins that implementation by SHA-256, runs both implementations over all 17,462 cases / 35,074 transactions / 35,418 signature fields, and asserts identical output. Both reject a false verification flag on an otherwise cached transaction, a changed signature count, and a newly corrupted signature. The valid paired fixture passes both.

One sequential measurement under current host load took 9.34 seconds without caching and 6.50 seconds with caching. This is a local measurement, not a general performance guarantee. The saved `verification.json` binds both implementation hashes and the results. Future AMM replay verification can select the cached auditor without modifying existing sealed checkpoints or their comparators.

```sh
work/test-env/bin/python -B repro/pump_amm/audit-runtime-cache-20261027/verify.py
```
