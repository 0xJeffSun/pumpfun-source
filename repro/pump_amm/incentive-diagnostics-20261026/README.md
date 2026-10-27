# PumpSwap incentive and creator-transfer recovery

This is a retained earlier checkpoint. The maintained source now advances to
the [trade-path checkpoint](../v2-route-diagnostics-20261026/README.md), with
separate new source, build and runtime evidence.

The maintained AMM source now matches the verified 30-file source snapshot in
`results/source`. Candidate `results/build/candidate.so` is 1,214,160 bytes,
SHA-256 `739ebefb6a02e40ecbcda0054b5e6cfc8f92f3c6aa9c5788b39233e11f29b833`.
It was compiled from Rust with the installed v1.44 Darwin toolchain and stripped
with v1.52 llvm-objcopy. Original executable bytes were comparison inputs only.
This supersedes the prior focused diagnostic source checkpoint; older artifacts
and receipts remain immutable.

## Recovered source behavior

Seven incentive guard expressions now produce the original compared values.
They cover eight original sites because the day/end check appears both before
and during an active schedule. The time-range error compares
`seconds_in_a_day * 30 - 1` against `end_time - start_time`, in that order.
The other guards preserve their original signed or unsigned operands and order.
The restored success log prints the updated `GlobalVolumeAccumulator` and its
account information after the event CPI and before account serialization.

Two `admin_cto` guards now produce plain errors for a noncanonical creator and
unswept creator fees. The predicates, codes, holder precedence, and Pump
PDA-signed CPI are preserved. The migration and other creator handlers retain
their prior source. See the sibling `cto-diagnostics-20261026` evidence package.

The instruction-level incentive evidence verifies 6,144 original bytes, eight
error constructors and numeric-helper calls, plus the success-log literal and
format descriptor. Exact original runtime witnesses support the operands and
ordering. This is not proof of historical source spelling or transitive closure.

## Validation

The final build passes the complete maintained AMM corpus: 25 suites, 17,462
comparison cases, 35,074 submitted transactions and 35,418 verified signature
fields. The suite comparators omit some full logs. Separate focused replays on
the same final binary verify:

- 205 incentive cases: 197 numeric rejections and eight successful controls,
  with complete effects, signed arguments, account routes and full logs.
- 15 creator-transfer cases, including all nine prior diagnostic discrepancies,
  five successes and one holder-error precedence control; 90 signature fields
  over three unique signed messages.
- All previous 52 boost/sweep/migration/liquidity cases and 13 numeric liquidity
  cases, with their full-log assertions retained.

Only compute consumption and explicitly identified source coordinates are
excluded from focused log comparisons. The incentive and creator verifiers
reject 14 and 12 actual-receipt mutations respectively. Failed earlier attempts
are retained: the first incentive source build omitted the successful debug log;
the first creator validator failed on tuple/list representation before saved
JSON normalization. Neither failed receipt is presented as accepted.

The complete normalized original function-window count is now **504/785**, up
from 489, with 15 gains and no losses. Raw matches increased from 93 to 113.
The gains include the accumulator Debug renderer, AccountInfo/hex renderers,
array/debug-list builders, signed-number formatting and an error-value helper.
The measured original ELF extent is 1,268,504 bytes. Its separate 9,217,211-byte
allocation suffix is zero. Complete ELF equality and full captured-file equality
are both false; 281 original windows remain unmatched.

## Reproduction and retained evidence

```sh
work/test-env/bin/python -B repro/pump_amm/incentive-diagnostics-20261026/verify_evidence.py
work/test-env/bin/python -B repro/pump_amm/incentive-diagnostics-20261026/verify_saved.py --current-source
```

The saved verifier checks the fixed publication manifest, actual build and all
30 source inputs, every retained transaction signature, all focused assertions,
and current source equality. It does not execute SBF. The source build command,
tool hashes, flags, compiler version, output identities and logs are in
`results/build/build-comparison.json`. `results/measurement.json` lists every
original window and candidate match. Large JSON is losslessly compressed;
existing gzip sidecars retain their exact original bytes.

To re-execute the probes use `probe.py`, the sibling creator package's `probe.py`,
`previous_probes.py` and the sibling numeric-liquidity probe with a new output
path, explicit candidate, exact compiled source and actual build record.
`previous_probes.py` admits only this exact expanded source manifest; it retains
the earlier probe assertions without rewriting their historical build records.
The full corpus runner remains `focused-diagnostics-20261026/replay.py`.

## Still open

Perfection remains unproved. In addition to the 281 unmatched original windows,
historical build/source provenance, indirect calls, referenced data and authentic
successful fixed-admin `create_config` replay remain open. The new full corpus
retains 322 compared-value-log triage rows: multi-hop 122, legacy buy 93, legacy
sell 76 and trade-v2 31. Exact row indices and receipt hashes are in
`remaining-numeric-gaps.json`. These are investigation candidates, not a count
of independently proved defects. Continue only the AMM and dependencies needed
for these paths, rather than broadening to unrelated project reconstruction.
