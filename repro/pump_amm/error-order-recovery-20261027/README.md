# PumpSwap error-order recovery

This frozen checkpoint restores legacy exact-quote and withdrawal error
precedence, preserves overflow diagnostic origins in fee sweeps, and reconstructs
the sell-event field evaluation order. Its candidate is
`8e69bb1b3d95dab5fb398f7842efbb9d2234075ec206fa447060bdd92714f328`.

It retains **584/785 normalized original windows and 124 raw byte-equal bodies**,
with no windows gained or lost from the preceding buy-route checkpoint. Matched
original text remains 642,616/1,162,040 bytes. Whole-ELF equality remains false:
the candidate is 1,307,824 bytes and the meaningful original ELF is 1,268,504
bytes. No padding, synthetic diagnostic coordinates, executable-byte patching,
or forced compiler layout was used.

## Changes

- Legacy exact-quote buys compute the inverse transfer fee before final
  base-output division and the minimum-base check. Checked zero-reserve
  arithmetic and the forward-fee subtraction retain the original error and
  diagnostic decoration. The final division uses the shared checked base-output
  helper already recovered from the original call graph.
- Withdrawals check minimum base output before quote arithmetic and transfer-fee
  decoding. The withdrawal quote path uses the recovered forward transfer-fee
  helper, while the deposit path retains its existing behavior.
- Three sweep overflow errors use the original decorated error construction.
  The later private Pool sweep-helper extraction is not part of this checkpoint.
- The sell-event builder captures its shared inputs and evaluates the event
  fields in the order supported by the original instructions. Its ten new event
  cases preserve behavior; this change does not claim a new exact window.

The exact source inputs and five integration patches are in `results/source`
and `results/integration-patches`. Both strict offline Linux v1.44 SBPF builds
produce identical stripped and unstripped binaries, with all 41 source inputs
and cached dependency artifacts unchanged during each build.

## Saved proof

All 17,462 corpus cases pass: 35,074 executions, 35,418 verified signature
fields, 17,537 identical signed-input pairs and 15,567 recorded top-level log
pairs. The preceding focused account/fee, boundary, CPI, square-root, transfer,
mint-policy, context, route, decoder and event groups also pass against this
candidate. The direct-call closure still covers 522 original windows / 1,329
pairs; all 680 bounded literal observations agree.

Another **1,485 signed cases** are retained with fresh before/after executions:

| Group | Cases | Preceding candidate mismatches | This candidate |
| --- | ---: | ---: | ---: |
| Legacy reserve/fee edges | 365 | 10 | 0 |
| Legacy transfer-fee rounding | 720 | 0 | 0 |
| Legacy simultaneous failures | 36 | 22 | 0 |
| Withdrawal ordering | 18 | 5 | 0 |
| Sell-event fields | 10 | 0 | 0 |
| Fee collection/sweep/payout edges | 336 | 30 | 0 |
| Total | 1,485 | 67 | 0 |

These before/after groups authenticate 5,940 signature fields. Their negative
candidate is the immutable preceding `e3ba7033…` binary; the earlier negative
baselines elsewhere in this packet preserve their own original candidate
hashes. Several cases intentionally use malformed or impossible synthetic
account states and are not live-chain observations.

The saved verifier compares every recorded field and verifies signed-message
identity and log hashes. Embedded account snapshots are also checked where
recorded. It normalizes only source locations and compute-consumption log lines.
Older corpus fixtures that did not record complete logs retain that limitation.

```sh
work/test-env/bin/python -B repro/pump_amm/error-order-recovery-20261027/verify_saved.py
```

The default command verifies frozen source and evidence without requiring the
working source tree to match. `--current-source` additionally checks that tree
and is intended for the root task's later promotion check. The sealed results
manifest SHA-256 is
`527d3ea27c4710bab497b38de651db75f057a0712d5109e0a6dda8ca3c1aace2`.

This remains an intermediate reconstruction: 201 original windows, complete
referenced-data and indirect-call identity, original source provenance, and the
fixed-admin `create_config` replay remain unresolved.
