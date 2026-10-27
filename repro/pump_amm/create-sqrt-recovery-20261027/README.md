# AMM creation arithmetic and v2 transfers

The maintained candidate is `6f5050382173bd166e5370594ddc1c67a4b1ce9ddec631656cee41371bc0425b`. It matches **565/785 normalized original windows**, with **114 raw matches**, **220 unmatched windows**, and **594,688/1,162,040 matched text bytes (51.2%)**. All earlier normalized matches remain. Whole-ELF equality is false.

The original creation path multiplies two u64 reserves and calls a two-word `uint` integer square root. Replacing the local binary search with that recovered operation produces complete normalized matches for the 4,440-byte division routine and 1,704-byte square-root routine. The 6,104-byte entry body also becomes matched in this build. The 696-byte initial-liquidity wrapper differs at two source-diagnostic metadata instructions and is not counted as matched.

The source now uses the already-matched 2,400-byte typed transfer helper in v2 trades as well as the previous legacy, collection, creation and deposit callers. This is a call-structure recovery; the v2 handlers and their higher-level original wrappers are not claimed to match.

A new signed 40-case creation probe covers floor-square-root boundaries and wide reserve products. All 33 successful original executions also agree with Python's independent `isqrt` calculation. The probe exposed three existing diagnostic mismatches on zero amounts: the original emits comparison operands. The reconstructed guards now use the corresponding comparisons. The earlier candidate and its three failing signed receipts are retained under `results/sqrt-negative`. Synthetic high-balance fixtures may exceed the captured mint's supply and are not claims about live chain state.

```sh
work/test-env/bin/python -B repro/pump_amm/create-sqrt-recovery-20261027/verify_saved.py --current-source
```

The saved verifier checks 17,462 corpus cases, 1,281 account/fee/whitelist cases, 273 legacy trade cases, 1,996 trade boundary/routing cases, 72 buyback cases, 91 controlled CPI cases, 18 liquidity cases and the 40 creation cases. Coverage can overlap. All recorded fields and available captured logs are compared, excluding compute lines and exact source coordinates. The 35,074 corpus executions include 35,418 verified signature fields; cases without full captured logs retain that limitation.

Paired direct-call closure covers 505 original windows (1,300 pairs), of which 263 windows exclude indirect calls and 72 exclude all static/external/indirect boundaries. All 591 observed bounded literal uses are equal. These bounded checks do not establish all data, indirect targets, runtime behavior or historical build provenance. The three newly required dependency archives are saved with checksums matching their cached registry records and the locked source build preserves all prior dependency artifacts.

Remaining work includes the 220 unmatched windows, higher-level transfer wrappers, fee selectors, full data/call identity, authentic fixed-administrator `create_config` success, and historical source/build provenance. No source-coordinate padding or executable-byte patching was used.
