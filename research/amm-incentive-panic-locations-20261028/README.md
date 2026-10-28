# AMM incentive panic locations

Correct five remaining panic source-location records on the exact source of union11, PR #548 at `59576b0d2d7496b75f49abbae36ec4974f4839b1`. All nine Location operands in the complete 6,312-byte updater `0x6db20` now resolve to the original filename, line, and column.

| Operation | Union11 | Corrected/original |
|---|---|---|
| Signed time conversion | 391:28 | 398:28 |
| Volume-range index | 354:17 | 359:17 |
| Range multiplication overflow | 332:51 | 334:18 |
| Range subtraction overflow | 333:46 | 339:18 |
| Current-day conversion | 340:18 | 348:18 |

**No function-window gain is claimed.** Both builds retain exactly the same 783/785 normalized and 236 raw memberships. The two cashback windows remain unmatched and whole-ELF equality remains false. The baseline independently reproduces both of #548's published Linux ELFs byte for byte.

Only `state/volume_accumulator.rs` changes. Its Rust tokens and string literals remain identical after removing whitespace and existing comment-only lines. The nine Anchor error macro starts retain their original positions. The genuine range/store/checked-arithmetic expressions are deliberately formatted at the recorded original panic coordinates; this is source positioning, not a claim to historical formatting. There are no custom Location constants, dummy operations, comparator changes, SDK changes, or emitted-byte patches.

Both local crates were explicitly cleaned and freshly compiled for control and candidate, with source/tool/library bindings retained. An earlier, equivalent source form produced exactly the same stripped candidate. The already-executed runtime receipts therefore bind the final candidate byte for byte: 25 suites, 17,462 paired cases, zero compared state/error/event/CPI/return differences, and 35,074 observed transactions with 35,418 independently verified signatures. Logs remain in the case receipts; these suite comparators exclude log fields and do not prove complete log parity or every panic path. The static relocation/data audit proves the nine Location values independently of runtime coverage.

The archive contains both compiler source trees, artifacts and receipts, the exact published upstream source archive, complete runtime cases and signed transactions, and snapshots of the executed harnesses and recorded inputs. No transaction is broadcast. `recorded-builder.py` and `recorded-replay-driver.py` preserve the actual executed controllers, including their historical workspace paths.

Verify without a compiler or network:

```sh
python3 -I -B research/amm-incentive-panic-locations-20261028/verify.py
```

To re-verify every Ed25519 signature with the installed `solders` package:

```sh
python3 -B research/amm-incentive-panic-locations-20261028/verify.py --signatures
```

The verifier authenticates the artifact set, exact upstream baseline and one-file source patch, fresh build/source bindings, all 785 windows, the nine real relocated Location records, and every saved case and transaction. Optimized Python is rejected explicitly.
