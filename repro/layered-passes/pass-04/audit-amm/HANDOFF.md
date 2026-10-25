# AMM static review handoff

Frozen source: `aa98fb45f3f756d008ccb9940bcfd9a6e986ef77`.

- Reviewed117 explicit functions,30 account contexts,23 program files; exact spans/hashes in `coverage.json`, readable ledger in `COVERAGE.md`.
- All22 compilation inputs match the destination-rent checkpoint. Against prior public review:116 unchanged bodies,30 unchanged contexts, one already-integrated rent correction; README also changed.
- No newly confirmed program defect and no patch. Retains F01–F09, adds conditional overflow observation O10, and records existing rent correction R01. Audit opening aggregate/checkpoint paragraph is stale. No security sign-off.
- No builds, transactions, fixtures, network, excluded-body reads or main changes. Runtime receipts and binary equality are cited checkpoint results, not new verification.

From any separate copy, using Python3.9+:

```
python3 -B verify.py
python3 -B verify.py --repo /path/to/pumpfun-source
```

Default verification is standalone. Optional `--repo` compares only the30 allowlisted public inputs to repository files and fails on drift; it does not require Git, inspect other files or prove HEAD identity. Exact frozen commit attribution was checked at capture. Neither mode verifies executable bytes/signatures, runs targets, proves audit conclusions or reconstructs prior source.

Copy only paths in `ownedmap.json` under this publication. External `publication-ownedmap.json` additionally hashes the complete sealed publication; `verification.json` records separate-copy verification and negative integrity/coverage checks. These external records are deliberately outside the payload to avoid circular self-hashing. Do not publish worker telemetry, prompts, caches or authoring script.
