# PumpSwap AMM focused reconstruction

This is the preserved earlier checkpoint. The maintained source now advances to
the [incentive and creator-transfer checkpoint](../incentive-diagnostics-20261026/README.md),
with separate new build and runtime evidence.

The maintained AMM source now includes the verified liquidity, sweep, migration,
boost/burn and liquidity numeric-diagnostic corrections. Only four Rust files
changed. The prior selected `owner6048` artifact and all historical receipts are
preserved; they do not represent these new source bytes.

The final compiled artifact is `results/liquidity/build/candidate.so`, SHA-256
`03554fa0f7e5ffe54ed7a88ce50e07ab3ee62a9f45034432763cd0a2b9d5cf1b`.
Its 30 source inputs match the maintained crate. `results/boost/` preserves the
intermediate four-file correction before the additional liquidity guards.
Both builds are actual pinned v1.44 Darwin compiler outputs, separately stripped
with v1.52 llvm-objcopy. No captured program bytes are compiler inputs.

## Recovered behavior

- Liquidity and sweep self-transfer failures retain their predicates and error
  codes while dropping unsupported compared-public-key diagnostics.
- Empty fee sweeps log their bucket, including creator bucket 1.
- Creator-fee migration errors drop unsupported numeric diagnostics.
- Five boost/burn errors restore the original numeric operand pairs.
- LP seed-lock and four liquidity slippage guards restore numeric operands,
  including the original base-before-quote rejection order.

The final build passes all 25 maintained suites: 17,462 comparison cases,
35,074 submitted transactions and 35,418 independently verified signature fields.
These suites omit some log comparisons. Separately, the final build passes the
52-case boost/prior-regression probe (120 signature fields) and the 13-case
liquidity numeric probe (26 signature fields). Those compare complete logs,
excluding compute-use lines and explicitly scoped source coordinates. Sixteen
boost receipt mutation checks passed on the intermediate build; eleven liquidity
receipt mutation checks passed on the final build.

The final binary has 489/785 complete normalized original function-window
matches, versus the prior selected 488/785; no prior match was lost. The gain is
the 448-byte `alloc::fmt::format` window at `0xafa8`. Raw matches remain 93.
These counts are not an overall completion percentage. Original complete ELF
extent is 1,268,504 bytes; this candidate is 1,201,376 bytes. The captured original
also contains 9,217,211 zero allocation bytes beyond its ELF extent. Both complete
ELF and complete captured-allocation equality remain false.

## Verification and reproduction

```sh
work/test-env/bin/python -B repro/pump_amm/focused-diagnostics-20261026/verify.py --variant liquidity --current-source
work/test-env/bin/python -B repro/pump_amm/focused-diagnostics-20261026/verify.py --variant boost
```

The verifier checks retained file hashes, build/source identity, all 25 receipts
and all 35,418 raw Ed25519 signature fields. It does not rerun SBF. The two
`results/*/manifest.json` files bind both stored and pre-compression bytes.
Existing `.json.gz` transaction sidecars remain exact original gzip files;
large raw JSON receipts are losslessly compressed for publication.

`direct_build.py` accepts a source root containing `programs/pump-amm`, a fresh
output directory and an authenticated Cargo cache. It uses installed v1.44
compiler tools and v1.52 llvm-objcopy directly. The first launcher attempt failed
before compilation because experimental cache-directory names were parsed as
versions; its record remains at `work/amm-focused-20261026/build`. The direct
build does not change HOME, global caches, compiler inputs or captured binaries.
`replay.py` runs the existing corpus with the original signature observer.
`expanded_probe.py` explicitly accepts the additional liquidity source hash while
retaining every prior probe effect/log/signature assertion; old validators and
records are unchanged. `measure.py` uses the retained AMM relocation/call masking
rules and compares complete ELF extents separately from allocation padding.

## Remaining AMM work

Perfection has **not** been reached. There are 296 unmatched original windows,
unresolved referenced data and indirect/transitive callees, historical
source/toolchain provenance gaps, and no authentic successful fixed-admin
`create_config` replay. The final fresh corpus still has 528 compared-value log
differences across six suites, recorded with exact row indices and receipt
hashes in `current-numeric-gaps.json`. This is a triage list, not 528 proven
defects or a completion metric:

| Suite | Rows requiring investigation |
| --- | ---: |
| incentives_admin | 197 |
| multi_hop | 122 |
| legacy_buy | 93 |
| legacy_sell | 76 |
| trade_v2 | 31 |
| creator_reassignment_cto | 9 |

Continue with original-byte and same-input runtime evidence for these guards,
then structural AMM context/handler recovery. Direct dependencies are in scope
only when needed for these AMM paths. Unrelated Pump, Relay and project-wide
reconstruction work is outside this goal.
