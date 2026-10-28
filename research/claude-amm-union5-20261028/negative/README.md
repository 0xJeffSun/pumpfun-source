# Incentive error-order controls for both union-768 images

These are the five synthetic stored-schedule controls of the PR434/PR464 packets (`producer.py` and `fixture.py` are
byte-identical to `research/claude-amm-union4-20261028/negative/`), re-run against this packet's source-only image
`ae44111a…` and its separately linked layout image `d532617a…` with `PUMP_AMM_FRESH_VM=1` (a fresh VM per execution).

They guard the H11 incentive error-order fix carried since union-764 (`if current_timestamp>=self.start_time {
require!(current_timestamp<=self.end_time, ...) }` in `state/volume_accumulator.rs`, unchanged here). **All five pairs agree
for both images (0 mismatches, 10 pairs, 20 executions).**

This is ten pairs, not a full-corpus qualification. Synthetic AMM-owned state, locally owned admin, Clock set by the fixture;
no live state, no transaction submission. `verify.py` checks the saved receipts, image hashes, input hashes, paired
pre/post states and signed bytes; `verify.py --signatures` also checks the Ed25519 signatures and instruction arguments
(needs `solders`).
