# Guarded AMM table-constrained closure

This separately bound proof uses candidate
`2f5dfd029128dd345dfe80a4fc5385fb4624127b5d77ddb3c81a2bba024b08dd`.
It preserves the established raw/window matcher and starts from the verified
541 body matches and 481 internally direct-call-closed original windows.

The five formatter tables are not interchangeable. Comparing their complete
48-byte objects produces the following unique counterpart relation:

| Original table | Candidate table |
| --- | --- |
| `0x1221e0` | `0x1209e8` |
| `0x122c98` | `0x1217e8` |
| `0x122e90` | `0x1219f8` |
| `0x123d90` | `0x122a10` |
| `0x123fa0` | `0x122c10` |

Each verified pair agrees on both scalar fields and all four actual function
pointer targets, including each target's complete normalized body and internal
direct-call closure. The proof checks 57 references to these objects across
matched body-pairs, including all 25 pairings of the five writer wrappers.
It also checks all 32 corresponding references to the complete 24-byte EOF
message descriptor.

The four alternate references reported against the first original String table
were false aliases: they have correct counterparts among the other four
original tables. They therefore provide **no evidence for a source edit**.
Trying to force those aliases to match would reduce fidelity.

All 20 off-diagonal table pairs have a concrete incompatible normalized-code
witness, retained in `results.json`. Missing target bounds would remain unknown
and would not justify pruning. Removing only those disproven body-pairs leaves
1,251 direct-call-closed pairs across the same 481 original windows. This is a
stronger pairing constraint, not 20 new function matches or semantic bug fixes.
No indirect calls, arbitrary data objects or runtime behavior are inferred from
it.

Run `work/test-env/bin/python -B repro/pump_amm/final-table-closure-20261027/verify.py`
to authenticate and recompute this report. Optional path arguments support
byte-identical archived copies. The separate
[`../final-closure-audit-20261027`](../final-closure-audit-20261027/README.md)
verifier covers its prerequisite body/direct-call relation.
