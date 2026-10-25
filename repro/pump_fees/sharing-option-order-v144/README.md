# Fees sharing option-order checkpoint

One pinned v1.44 build with the existing v1.52 strip phase applies only the reviewed sharing.rs order change to the c37 baseline. The graduated path now checks pool, updates and serializes sharing state, then checks program and event before AMM calls. The nongraduated path bypasses the second state rewrite/exit. The accepted first enum19 conversion and all-four-reserves-zero predicate remain unchanged.

The complete new executable is `4baf4866909828f5017a86e595a72dc7f47b443ad4623597b2d532f9ca57778e` (849,472 bytes); symbols are `6cd45b521ac233e1396d794e9f44baec04d8d6814f3b527e38a0c25f50ab56cc`. Full inventories, immediate bodies, original/candidate raw files and source proof are retained. The static verifier checks both CPI-success barriers, late option order, fieldless enum conversion, and conservative full-function reachability excluding the second state exit from the nongraduated path. This is not recursive CPI or whole original identity.

All 17,461 unchanged comparisons and the separate ten-step sequence pass. Saved checks verify 17,204 signatures in 8,644 baseline/sequence transaction fields plus 80 signatures in 40 focused fields; historical messages are checked separately. Raw diagnostic differences are retained, not emptied or newly normalized. Detailed path coverage and limitations are in acceptance.json and saved-verification inside the receipt archive.

`initial-source-review.tar.gz` contains the reviewed source-only original/parser/application proof. `runtime-repository.tar.gz` contains unchanged runner-repo/ and validation-layer/. `receipts-and-verification.tar.gz` retains runtime/ and saved-verification/ with raw diagnostic checks.

Run `python3 -B verify.py --runtime-signatures` to verify this exact packet and reverify saved signed transactions. This runs no compiler or target transaction. The complete manifest requires exactly its listed files, and rejects Python caches. Publication destination: `repro/pump_fees/sharing-option-order-v144`; root main identity is separate.
