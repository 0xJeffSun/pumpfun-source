# Incentive error-order controls for both union-774 images

These are the five synthetic stored-schedule controls of the PR434/PR464 packets (`producer.py` and `fixture.py` are
byte-identical to `research/claude-amm-union4-20261028/negative/`), re-run against this packet's source-only image
`31a2fc17…` and its separately linked layout image `e1b6eca9…` with `PUMP_AMM_FRESH_VM=1` (a fresh VM per execution).

They guard the H11 incentive error-order fix carried since union-764. In this packet `state/volume_accumulator.rs` is the
fz-A-vol-r1-02 layout, which writes the same guard as `require!(current_timestamp < self.start_time || current_timestamp <=
self.end_time, PumpAmmError::SupplyUpdateForFinishedRange)` (error iff now >= start_time and now > end_time, same as the
union-764 `if now>=start {require!(now<=end)}` form; `verify.py` checks this witness). **All five pairs agree
for both images (0 mismatches, 10 pairs, 20 executions).**

This is ten pairs, not a full-corpus qualification. Synthetic AMM-owned state, locally owned admin, Clock set by the fixture;
no live state, no transaction submission. `verify.py` checks the saved receipts, image hashes, input hashes, paired
pre/post states and signed bytes; `verify.py --signatures` also checks the Ed25519 signatures and instruction arguments
(needs `solders`).
