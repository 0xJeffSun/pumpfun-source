# B6 handoff

Static partial recovery only; **not integratable, B6 open**. Read REPORT.md and contract.json.

- Root83c00, every immediate callee, selected CPI/lifetime chains and unresolved frontier are raw-byte bound.
- Combined base transfer is first base plus optional residual, after first-leg reserve writes. Fee accrual follows common zero-user init; native whole-input funding precedes sequential direct debit. Token result adjustment remains open.
- Whitelist correction:83fa0->84468 performs late validation; success84588->83fa8 rejoins zero-user init. Do not add an unconditional whitelist skip.
- Minimal uncompiled fragments only. No main patch/build/runtime/new fixture. Keep the owner fence; all117 rows/105 successes/12 failures remain mandatory and unproved for the proposal.
- Quote-vault/preparation, mode/whitelist semantics, present descriptor quantities, event suffix, recursive data/diagnostics and historical whole-file identity remain open.

Export only this directory's manifest/owned-map allowlist. Run `python3 -B verify.py` offline from a separate copy. PASS certifies static integrity and retained obligations, not recovered authentic source or behavior.
