# PumpSwap liquidity numeric diagnostics

`source.patch` proposes five numeric guard corrections in the liquidity helper.
It preserves the predicates and error numbers, restores the original left/right
operands, and separates base and quote slippage checks in their observed order.
It does not modify selected source. The parent focused recovery built the
cumulative corrected source; its actual thirteen-case receipt now passes this
package's independent verifier and all eleven receipt-mutation checks. The
receipt, build, source and validator hashes are recorded in
`corrected-runtime-verification.json`; this package did not run the compiler.

| Original location | Correct comparison / diagnostic operands | Error |
|---|---|---|
| `deposit.rs:79` | base limit >= base amount | 6004 |
| `deposit.rs:100` | quote limit >= quote transfer amount | 6004 |
| `withdraw.rs:62` | pool LP supply >= LP mint supply | 6067 |
| `withdraw.rs:86` | base amount >= base limit | 6004 |
| `withdraw.rs:107` | quote received >= quote limit | 6004 |

All paths in the first column begin with
`programs/pump-amm/src/instructions/liquidity/` in the original logs.

`original-diagnostics.asm` retains 816 actual original instruction bytes. Each
block constructs the matching source path, source line and error number, passes
its operands in r4/r5, and calls the same numeric error helper at absolute
`0x1840`. `verify_evidence.py` checks those bytes against original SHA-256
`6a7ad34596d83b4c435b32f458a56e718e9f82eb4ad38e4316616d15d24d8ff7`.
These are bounded error-construction blocks, not a proof of all callers or of
the complete helper body.

The new actual `observation.json` executes 13 synthetic signed cases against the
original and previously accepted creator candidate `7f6c301e…`: seven rejections
and six successful controls. Cases cover each of the five sites, both-invalid
limits to establish base-error precedence, exact equality, ordinary success and
zero transfers. Identical signed inputs, all non-executable account pre-states,
and non-log effects match. The seven original rejections emit precisely the
predicted numeric operands. This observes the earlier gap; it is not the corrected
acceptance receipt. Its exact producer is `observation-producer.py`.

One initial observation was interrupted because its observer copied executable
program-account data repeatedly. Its unaccepted output and failure note are
retained as `observation-attempt01-*`. The corrected observer excludes executable
program accounts and retains all ordinary account data before execution. Program
identities are bound separately by complete ELF hashes.

Run saved checks from the repository root:

```sh
work/test-env/bin/python -B repro/pump_amm/liquidity-numeric-diagnostics-20261026/verify_evidence.py
work/test-env/bin/python -B repro/pump_amm/liquidity-numeric-diagnostics-20261026/scan_saved.py --output repro/pump_amm/liquidity-numeric-diagnostics-20261026/saved-log-gaps.json --check
```

After compiling the exact patched source, run the current `probe.py` with
`--candidate <ELF> --source <compiled-lib.rs> --build-record <actual-build-record>`
and `--output <new-receipt>`. Corrected mode requires all thirteen comparisons
to pass, including complete logs with only compute lines and the five exact
source-coordinate pairs excluded. It independently verifies signatures, payloads,
account routing and privileges, original guard identity, numeric operand order,
and complete non-log effects. Actual source/binary hashes must agree with the
provided build record. The original and candidate receive the same signed bytes.
The output must be new; failed receipts remain failed. This is bounded synthetic
execution, not historical transaction replay, exhaustive coverage or byte identity.

## Further diagnostic queue

`scan_saved.py` generates `saved-log-gaps.json` from all 25 immutable selected
AMM receipts. It retains each raw/stored receipt hash, selected binary hashes,
exact row indexes, original error origins and differing left/right labels.
It finds 635 rows with a difference in compared-value labels:

| Suite | Rows |
|---|---:|
| incentives_admin | 197 |
| multi_hop | 122 |
| legacy_buy | 93 |
| boost_burn | 77 |
| legacy_sell | 76 |
| trade_v2 | 31 |
| liquidity | 28 |
| creator_reassignment_cto | 9 |
| creator_reassignment | 2 |

This is a triage count, not 635 independent bugs or transactions. Some rows
already have separately validated research corrections. The scanner compares
label lines only and does not claim complete log comparison, identical signed
inputs for formats that omit transaction bytes, or fresh runtime verification.
Each follow-up still needs original instruction attribution, signed input checks,
bounded corrected execution and candidate binding. Current liquidity rows include
the four already corrected self-transfer diagnostics and 24 numeric differences.
