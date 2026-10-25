# Handoff

**Static-only; no patch.** The original selects two owned payout-preparation helpers after the shared zero-quote check, releases the temporary curve AccountInfo before branching, can replace and serialize current shareholder state before Pump CPI, and skips that CPI for an empty prepared vector. The candidate generic CPI plus inline event path does not establish these contracts.

Recovered original CPI payload and twelve fixed privilege words agree with the candidate. Named account binding, remaining metas, signer seeds, the nonzero-quote branch and full ownership/error/event closure remain unresolved. The zero-quote helper's executable-recipient filtering and deterministic rescaling are documented with exact PCs.

Read REPORT.md; machine evidence is impacted-proof.json. The full previous Fees ledger and its ambiguity are retained unchanged. No build, runtime tests, new fixtures, main edits or count increases. Package verification was run from a separate copy; see verification.json. Publish only this public/ directory, never worker process logs or adjacent scratch files.
