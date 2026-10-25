# Fees static audit handoff

Frozen source: `aa98fb45f3f756d008ccb9940bcfd9a6e986ef77`.

- No newly confirmed defect or patch. F1–F5 retained; existing remaining-account/V2 payout gaps remain open. No security sign-off.
- Reviewed64 explicit in-program definitions,31 handlers,30 contexts; separately8 standalone definitions and2 external declarations. All26 accepted source inputs agree with legacy/social checkpoint.
- `REPORT.md`: conclusions, exact causal source references, reconstruction/authority/CPI/arithmetic/serialization limits and stale AUDIT summary note.
- `COVERAGE.md`, `files.json`, `functions.json`, `contexts.json`, `obligations.json`, `cpi.json`: complete admitted source coverage and43 explicit CPI-source sites.
- `inputs.json`, `ownedmap.json`, `manifest.json`, `SEAL.sha256`: exact public input bindings, ownership/allowlist and integrity seal. No runtime archives, telemetry, secrets or target binaries.
- Run `python3 -B /absolute/path/review/verify.py`; optional `--repo /path/to/pumpfun-source`. Only Python standard library is required. Separate-copy tests are recorded in `PORTABILITY.json`.

No main edits, builds, runtime executions, new fixtures, network, git writes or excluded-lane work. Existing test/ELF results are attributed evidence, not new results. Parent should preserve these limits when integrating; source reconstruction and whole-original identity remain unfinished.
