# Fees second Pump CPI ownership restoration

Exactly one source call changes: the second Pump migration now uses the original generated typed API and natural CpiContext ownership. Its local IDL already matches the original metadata; no IDL or guard-order change is made. Both CPI calls retain their success barriers.

The single pinned v1.44 compile and unchanged v1.52 strip succeed with no backend stack failures. Candidate466725afe7406860177df56696a60897874ffa6dab7429e5cc62da087dbf48b5 and symbols31604790201a414dfe4bd2a8515eb213b3731ad0c36be61da56dc2a123d91d7e are bound to26 compiler inputs, exact tools and unchanged dependencies.

The new complete3712-byte CPI helper and1072-byte AccountMeta constructor match normalized original windows and relocation patterns; their immediate targets are supported. The prior three helper matches remain. Full inventories retain125 unattributed/two conflicting originals and118 unmatched/two conflicting candidate windows. No full caller, recursive or whole-file identity is claimed.

All17,461 unchanged comparisons and a separate ten-step sequence pass;17,204 baseline/sequence signatures plus80 focused signatures are checked. Existing logs show26 of116 sharing cases reach the second Pump migration. These are coverage observations, not new cases or exhaustive callee semantics.6,523 raw log differences remain retained. Late program/event6019 failures remain without runtime coverage.

Full source/static/runtime receipts, independent review and exact source/tool/dependency gates are retained. Run python3 -B verify.py, optionally --runtime-signatures. It does not compile or execute a target program.
