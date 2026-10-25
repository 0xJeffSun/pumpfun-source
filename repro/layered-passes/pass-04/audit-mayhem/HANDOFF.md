# Handoff

Frozen public Mayhem at `aa98fb45f3f756d008ccb9940bcfd9a6e986ef77`: **61 explicit functions, 15 contexts / 231 fields, all 24 admitted handlers reviewed**. All 14 build inputs equal the accepted Mayhem24 hashes and prior `517d77d` review source.

**No newly confirmed defect; no patch.** Retain M-01–M-06 and open U1–U7. The initializer stays excluded. Raw original ELF equality remains false; no new build, target execution, fixture, network or security sign-off.

- `REPORT.md`: results, causal source references, arithmetic reasoning and limits.
- `COVERAGE.md` / `coverage.json`: complete review ledger; `inventory.json`: exact spans and hashes.
- `cpi-contracts.json`: six candidate vectors, targets, selectors, flags and data fields.
- `input-binding.json`: frozen input identities and accepted/prior source equality.
- `allowlist.json`, `ownedmap.json`, `manifest.json`: exact delivery scope and seal contents.

From any copy: `python3 -B verify.py`. Add `--expected-manifest-sha256 DIGEST` using the adjacent `seal.json`; optionally add `--repo /path/to/pumpfun-source` for frozen Git rebinding. `verification.json` outside the package records separate-copy and verifier-tamper checks. Deliver only `publication/`, `seal.json`, and `verification.json`. Do not copy the worker directory or assembly scripts.
