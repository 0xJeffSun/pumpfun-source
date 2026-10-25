# pump_amm stale-artifact: behavioral verification of current source

The committed `repro/pump_amm/create-config-shared-methods-v144/candidate.so`
(`80701082…`) is stale vs current source (see REPORT.md). To check whether the
`f0c80ca` lib.rs change ("Recover AMM event borrowing") altered behavior, I built a
fresh candidate from **current** source and ran the AMM differential suites against it.

**Fresh build:** `d27be7e97d00a5f4ce249bd0f9bceec697db3d6e43a2264ec159d9de5a0013d1`
(deterministic; 1,199,048 B).

**AMM differential suites vs the FRESH build — all passing, 0 mismatches:**

| suite | cases | mismatches |
|---|---:|---:|
| accumulator | 76 | 0 |
| admin | (n/a count) | 0 |
| boost_burn | 506 | 0 |
| boost | 100 | 0 |
| buyback | 369 | 0 |
| cashback | 146 | 0 |
| collect | 148 | 0 |
| create | 246 | 0 |
| creator_reassignment_cto | (n/a count) | 0 |
| creator_reassignment | (n/a count) | 0 |
| extend | 317 | 0 |
| fee_config | 356 | 0 |
| legacy_buy | 1,011 | 0 |
| legacy_sell | 575 | 0 |
| liquidity | 680 | 0 |
| migration_create | 37 | 0 |
| reserved | 157 | 0 |
| resize | 46 | 0 |
| sweep | 254 | 0 |
| trade_v2 | 870 | 0 |

Runners needing different CLI args (not failures of the build): `incentives`
(requires `--family`), `multi_hop`, `transfer_creator` — covered by agent B's full matrix.

**Conclusion:** the current pump_amm source is behaviorally sound; the stale artifact
is a *consistency* gap, not a correctness regression. The clean fix is to regenerate
the committed candidate from current source:

```
PYTHONPATH=scripts python3 scripts/build_partial_candidate.py \
  --manifest programs/pump-amm/Cargo.toml --program pump_amm \
  --artifact-name pump_amm_recovered.so --tools-version v1.44 --output <fresh-dir>
# then replace repro/pump_amm/create-config-shared-methods-v144/candidate.so with
# <fresh-dir>/artifacts/pump_amm_recovered.so and update the checkpoint's
# build-comparison.json / status.json hashes (80701082… -> d27be7e9…).
```

**NOT applied here**: this is a single shared working tree with concurrent sibling
sessions actively working the AMM area (f0c80ca). Overwriting the tracked
`candidate.so` in place would be visible to those sessions mid-task. Recommend
applying this fix once AMM work quiesces, or letting the session that owns the AMM
lane regenerate it.
