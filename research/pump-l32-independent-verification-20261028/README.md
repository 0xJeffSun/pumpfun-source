# Pump Main L32 independent verification

This is an evidence-only follow-up to PR #465. It does not resubmit L32 source or
claim a new historical-source discovery. PR #465 established the combined L32
source and these qualified executable hashes:

- stripped: `45c5af2485f6d8138b471cbd6b56e0bf59135dcefea15f055d6387b4f1ac0bca`
- unstripped: `868a868be78e576143fdb8bc8c5a3681410e186a11856c62405ed5e217d0bc5c`
- source-only census: 990/1,035 normalized and 166/1,035 raw

This follow-up closes three independent evidence gaps.

## Portable, fail-closed verification

The original runtime-review helpers embedded another contributor's absolute Mac
paths. They now resolve all inputs relative to the repository and run from an
unrelated current working directory. The L32 main verifier also used Python
`assert` as its enforcement mechanism. A controlled manifest corruption proved
that `python -O -I -B verify.py` could erase the checks and return success. The
verifier now rejects optimized Python before any assertion-based gate runs.

The follow-up packet's own verifier uses explicit exceptions instead of
assertions, and its transaction-accounting result is identical under normal and
optimized Python.

## Independently staged signed replay

The retained Window B evidence compares the captured original against four
separately loaded source configurations:

| configuration | source behavior | focused pairs |
|---|---|---:|
| A | untouched L31 | 787 |
| B | fee-sweep notice only | 787 |
| C | V2 cashback notice only | 787 |
| D | both corrections; exact L32 stripped hash | 787 |

All 3,148 paired executions are rechecked. The analyzer verifies 150 distinct
signed transactions, every loader receipt, structured outcomes, and ordered logs
after excluding compute-consumption lines only. The matrix independently shows:

- B and D restore 84 fee-sweep notices (43 bucket 0, 41 bucket 1).
- C and D restore 31 V2 cashback notices.
- The three existing V1 cashback notices remain present in every configuration.
- D restores 115 intended notices with no structured mismatch.

This is materially different from merely observing the already-combined L32
binary: the A/B/C/D matrix isolates each source correction.

## Transaction-count reconciliation

The apparent 2,407 versus 2,409 discrepancy was a scope difference:

| scope | occurrences | distinct |
|---|---:|---:|
| direct `transaction_base64` fields on paired outcomes | 18,268 | 2,407 |
| nested transaction fields inside paired outcomes | 16 | 2 |
| all transaction fields inside paired outcomes | 18,284 | 2,409 |
| every serialized transaction in the corpus | 18,343 | 2,411 |

All serialized transactions in all four scopes have valid signatures. L31 and
L32 have the same direct path-to-transaction map, whose canonical SHA-256 is
`5e99f21ec08b0d4d13ca48fc60c15b9419abd081dfe38326d5adfe126649b5f8`.

## Controls and limitations

Twenty negative controls reject missing or misplaced diagnostics, incorrect
buckets, structured-result changes, corrupted signatures and hashes, swapped or
duplicate case identities, unexpected files, and inconsistent artifacts. Five
integration controls exercise normal/optimized verification and run the portable
runtime tools from temporary directories.

The saved 10,468-pair L32 corpus is independently re-audited here, including all
serialized signatures and ordered logs. That is a saved-outcome audit, not a new
second execution of the complete VM corpus. Twenty-three non-filename and 52
filename-only log differences remain outside this focused follow-up. No Pump
source, executable, normalization mask, or machine-function result is changed.

See [REPRODUCE.md](REPRODUCE.md) for exact commands.
