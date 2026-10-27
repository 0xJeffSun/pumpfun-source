# Fees social-PDA creation body

The source overlay recovers the complete **3,296-byte original body at 190104**.
Its feature-disabled branch logs and converts the error directly; its existing-PDA
branch logs and succeeds before checking the instruction's user-ID length.
The length guard remains intact, at the original diagnostic path and line 67.
Account constraints, state writes and event construction are unchanged.

The new candidate has **396 unique structural pairs and 42 unmatched windows**,
versus 395/43 in the parent. No normalized or raw-local match is lost; 118
original windows retain raw-local counterparts. All **18 direct call sites** in
the recovered body reach matching callee bodies. Its two messages and complete
72-byte error path are checked independently of relocated pointer masking.

A fresh Linux v1.44 control reproduces both parent binaries exactly. The proposal
passes **17,331 comparisons across 18 existing suites** and **157 signed controls**
comparing every retained field, including raw logs and transaction bytes. The
parent fails 117 strict controls, including 12 differing instruction outcomes:
an already initialized PDA can have a shorter stored ID than its instruction ID.
The original succeeds in those cases; the parent incorrectly rejects them.

Run `.venv/bin/python -B research/fees-social-creation-body/verify.py` to recompute
the retained comparison and bindings. Run `branch_cases.py --candidate <ELF>
--output <JSON>` for fresh focused execution, or `scripts/fees_validate_all.py`
with the same arguments for the full existing suite.

Rebuild the [unchecked-prefix parent's](../fees-unchecked-prefix-recovery/README.md)
36-file `experiment.json` `origins.source_paths`, replacing
only the two files listed in this packet's `evidence.json`. The recorded launch
commands use official Linux platform-tools v1.44, canonical `sbpf-solana-solana`,
the unchanged lockfile/root path remaps, offline Cargo and a container without
network access. Archive/compiler/strip hashes, real compiler logs and both output
hashes are retained in `builds/`; absolute local mount paths require adaptation.

The candidate is 867,880 bytes, SHA-256
`c9f6f9c3c0494c37dfc775e85fa055a77dfe481c11e60528fc28b455b0bf0a53`.
This is complete **relocation-normalized body recovery**, not raw body or
whole-file identity. The inherited matcher masks CALL destinations and relocated
LDDW addresses; callee bodies and three strings receive separate checks.
Other data, transitive/indirect callees and exhaustive semantics remain open.
Selected source/checkpoints are unchanged. No executable bytes are patched.
