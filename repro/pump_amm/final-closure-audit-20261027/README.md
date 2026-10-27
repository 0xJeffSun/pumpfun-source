# Guarded AMM closure audit

This is a new bound report for candidate
`2f5dfd029128dd345dfe80a4fc5385fb4624127b5d77ddb3c81a2bba024b08dd`.
The earlier diagnostic-parity reports remain unchanged.

| Scope | Original windows | Candidate pairs |
| --- | ---: | ---: |
| Complete normalized body matches | 541 | 1,640 |
| Internally closed direct-call relation | 481 | 1,271 |
| Also no transitive indirect calls | 259 | 967 |
| Also no transitive external calls or recorded static-data relocations | 71 | 733 |

All 580 conservatively observed bounded literal uses still agree. This does not
cover arbitrary static data, indirect targets, external providers or complete
runtime semantics. It does not change the established raw/body matcher.

`verify.py` recomputes this candidate's reports and checks the fixed input and
tool identities. It accepts explicit `--candidate`, `--symbols` and
`--measurement` paths for byte-identical archived copies. The follow-up
[`../final-table-closure-20261027`](../final-table-closure-20261027/README.md)
adds complete table/descriptor constraints without pretending they cover all
relocated data.
