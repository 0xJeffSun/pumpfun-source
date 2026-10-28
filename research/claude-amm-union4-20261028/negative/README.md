# Incentive error-order controls for both union-764 images

These are the five synthetic stored-schedule controls of the PR434 packet (`producer.py` and `fixture.py` are byte-identical to
`research/claude-amm-union3-20261028/negative/`), re-run against this packet's source-only image `4259b8b0…` and its
separately linked layout image `cbd9e10f…` with `PUMP_AMM_FRESH_VM=1` (a fresh VM per execution).

PR434's images returned 6035 (`SupplyUpdateForFinishedRange`) where the original returns `ProgramFailedToComplete` for
start=20/end=-1/now=0 and start=20/end=1/now=10. This tree carries the maintained H11 guard
(`if current_timestamp>=self.start_time { require!(current_timestamp<=self.end_time, ...) }`, imported unchanged from
`research/amm-v2-selector-union-recovery`), and **all five pairs now agree for both images (0 mismatches, 10 pairs, 20
executions)**. The same producer run against the intermediate union-763 tree without the guard (`bd3f3783…`, not packaged)
still gave 2 mismatches, so the guard is what removes them.

This is ten pairs, not a full-corpus qualification. Synthetic AMM-owned state, locally owned admin, Clock set by the fixture;
no live state, no transaction submission. `verify.py` checks the saved receipts, image hashes, input hashes, paired
pre/post states and signed bytes; `verify.py --signatures` also checks the Ed25519 signatures and instruction arguments
(needs `solders`).
