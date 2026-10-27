# Legacy AMM error-origin recovery

The `dac4b7c…` checkpoint preserves error numbers but omits source origins on 99
legacy-trade rejections and uses the wrong error-origin kind on two cashback
token-owner failures. This proposal addresses those 101 retained observations.
It changes only `legacy_buy.rs` and `legacy_sell.rs`. Parent-built candidate
`f2e3d097…` now passes all 1,586 complete legacy log/effect comparisons and 3,172
signature checks, including all 101 recovered origins. Nine malformed-receipt
mutations are rejected. `verified-summary.json` binds the actual ELF, build,
runtime receipts and verification scripts. This package did not run the compiler.

## Source scope

The patch changes 21 specifically attributed `.ok_or(...)` expressions to
`.ok_or_else(|| error!(...))`. The checked arithmetic and option predicates are
unchanged. All other `.ok_or` expressions remain unchanged, including paths that
lack evidence of an originating source diagnostic.

| Domain | Original source locations |
|---|---|
| Pool fee arithmetic and pricing | `pool.rs:386`, `408`, `417`, `439` |
| Buy reserve subtraction and pricing division | `constant_product.rs:21`, `fees.rs:21` |
| Buy cashback and remaining accounts | `buy.rs:44`, `98`, `116`, `121` |
| Sell fee arithmetic, cashback and remaining accounts | `sell.rs:179`, `378`, `383`, `502`, `520` |

`origin-map.json` binds each complete original diagnostic—including error name,
number and message—to one truthful proposed source line. Repeated source names
such as the two buyback-account lookups remain distinct. It also lists every
affected original row; no generic source-coordinate regular expression admits
the corrected errors.

The cashback ATA ownership check now calls the pinned framework's
`CheckOwner::check_owner`. The same `Owners::owners().contains(owner)` predicate
remains. Anchor 0.31.1 returns error 3007 with the actual owner's string as its
account name, matching the original. `framework-owner-evidence.json` retains
the relevant framework source excerpts and full-file hashes. The original ATA
call-site excerpt is retained, but its transitive body is not claimed fully
reconstructed from that excerpt.

## Evidence and verification

`original-origins.asm` contains 4,024 checked original instruction bytes covering
the fifteen source-origin locations and a bounded ATA-deserialization call site.
`original-origins.json` binds literal addresses and source-line stores to the
captured original ELF. Runtime evidence comes from all 1,586 pinned buy/sell
cases; all 3,172 signature fields and complete non-log comparisons are checked.

```sh
work/test-env/bin/python -B repro/pump_amm/legacy-origin-recovery-20261026/verify_evidence.py
```

After a real build, `run.py --candidate <ELF> --source <source-root>
--build-record <build-comparison.json> --output <new-directory>` runs both full
legacy suites and independent verification. To verify existing receipts without
rerunning them, invoke `verify.py --runtime <directory>` with the same candidate,
source and build-record arguments and `--output <new-verification.json>`.

Acceptance requires every signed input, pre/post-state, CPI, event, return value
and complete log to match the original. Only compute lines and explicitly paired
truthful source/panic coordinates are excluded. Account-name origins are compared
literally and checked against the actual signed ATA's before-state owner. All
99 source-origin witnesses and both account-name witnesses must pass. Existing
originless errors must retain their exact logs; they are not granted a blanket
exception. This remains bounded synthetic execution, not exhaustive AMM proof or
whole-binary identity.
