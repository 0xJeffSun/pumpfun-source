# AMM exact-quote error origins and actual references

Independent qualification of the public [PR315 g02 recovery](https://github.com/lalalune/pumpfun-source/pull/315)
and [PR319 g02 composition](https://github.com/lalalune/pumpfun-source/pull/319).
The implementation credit belongs to those source lanes. This packet adds no
source recovery, normalized-window count, new native build or frontier promotion.

## Findings

The 17,462-case published matrix excludes the complete `logs` field from its
comparison. A normally signed `buy_exact_quote_in` with one quote unit, zero
effective quote reserves and zero trading fees reaches a previously unqualified
error-origin boundary:

| Artifact | `DivisionByZero` (6025) origin |
| --- | --- |
| Captured original | `curve/constant_product.rs:85` |
| Maintained 651 | `curve/constant_product.rs:17` |
| Public 693 | `curve/constant_product.rs:85` |
| Public 726 | `curve/constant_product.rs:85` |

Zero reserves, virtual-reserve cancellation and accrued-fee cancellation all
reach the same corrected origin. The helper copy in PR315 therefore repairs
observable diagnostic behavior, not only an address-normalized function count.

**The composition also loses two already-correct error origins.** These are
diagnostic-fidelity regressions relative to 693; the error codes, account results,
inner instructions and return data still agree in these cases.

| Rejected input | Original / 693 | 726 |
| --- | --- | --- |
| Negative effective quote reserve | `state/pool.rs:440` | `instructions/swap/buy.rs:404` |
| Accrued fees greater than raw quote reserves | `state/pool.rs:417` | `instructions/swap/buy.rs:395` |

The retained, unchanged [726 source](public/c726/buy.rs) directly reconstructs
these checked arithmetic operations inside the buy handler. In 693, the
corresponding pool helper supplies the original Source record. This explains
why the composition can preserve a matching helper somewhere in the ELF while
the executed diagnostic differs. Restoring the actual caller/error construction
belongs to the active integration lane; this packet does not submit a competing
handler rewrite or claim these two differences are fixed.

Four other buy guard origins remain different in both recovered candidates.
Two missing-buyback-tail diagnostics improve in 726. Every raw log, including
compute consumption and all disagreements, is retained. The verifier reports
both complete error-log equality and log equality excluding **only** the exact
compute-consumption line. It does not erase file names or line numbers.

## Machine evidence

The complete original `base_for_quote` window at `0x12310` is 144 bytes; its
actual `base_for_buy` target at `0x123a0` is 1,184 bytes. Both candidate counterparts
match with the explicitly defined call/address normalization. `proof.py` then:

- Resolves every one of the helper's 11 actual relocated pointer sites: four
  enum-discriminant uses, two uses of one 48-byte vtable, a panic string, a
  32-byte panic vtable, one 24-byte panic Location, and two Source filename uses.
- Checks the real vtable method targets, scalar layouts, enum values, filename
  bytes, Source lines 85/87 and error codes 6025/6024. The Source stores are
  checked in their exact straight-line construction, not by nearest-string search.
- Follows the two roots and root-table methods to 39 matching function pairs
  and 138 actual direct call edges for **each** candidate. Imported syscall names
  are part of the normalized signature. The two tables account for six distinct
  method roots. The report retains the addresses and complete edge list.
- Verifies every allocated section of each stripped executable agrees with its
  symbol-bearing counterpart, so the static analysis binds to the loaded bytes.

This is bounded root-reference qualification. Data referenced inside transitive
callees, other indirect dispatch and the rest of the program remain unqualified.
No whole-ELF identity or exhaustive behavior claim follows from this result.

## Runtime evidence and reproduction

Fifteen deterministic synthetic cases run against original, 651, 693 and 726:
**60 transactions and 60 independently checked signature fields**. Each execution
uses a fresh LiteSVM with normal signature/blockhash checks, captured original
Fees/Token/Token-2022/ATA dependencies and local fixture accounts. Every program
load is hashed at the actual loader call. All message non-executable accounts,
serialized transactions, complete logs, inner instructions and return data are
observed independently of the fixture's own return object.

All 45 candidate/original comparisons agree in transaction bytes, error codes,
account state, inner instructions and return data. All 56 rejected executions
roll back non-payer accounts; the payer loses only the 5,000-lamport transaction
fee. The normal-fee control succeeds on all four artifacts. Zero-fee trades past
the math helper hit a later buyback-recipient check in this fixture; they are
explicitly named downstream rejections, not successful swap coverage.

A second fresh-VM run through the portable controller reproduces the same
semantic report (another 60 signed transactions). `runtime/` retains the first
qualified run; `repeat/` retains the controller run, including its exact command,
environment, interpreter/package versions and exit status. Initial exploratory
runs were not relabeled as either qualified run.

From the repository root with Python 3.12 and the repository requirements:

```sh
python -B research/amm-math-error-reference/verify.py
python -B research/amm-math-error-reference/test_verify.py
python -B research/amm-math-error-reference/reproduce.py --output /tmp/amm-math-new-run
```

Use an absent output directory. The six falsifiers alter only in-memory copies:
same-length filename, enum discriminant, panic Location, actual vtable target,
loaded-artifact attribution and transaction signature. Original captures and
published candidate files are never edited. No RPC or live-chain transactions
are used.

## Inputs and remaining limits

The branch is based on `b855ede024ac3bac603405db1d874ee58e651b38`.
`builds.json` pins public refs, paths and executable/symbol hashes. Public ELFs
and the source excerpt are unchanged copies, not new compiler outputs. `manifest.json`
binds packet files and repository inputs; the observer binds actual fixture reads
and loaded dependencies. Original AMM SHA-256:
`6a7ad34596d83b4c435b32f458a56e718e9f82eb4ad38e4316616d15d24d8ff7`.

For genuine u64 helper inputs, after checked `quote - 1`, the denominator is
`quote_reserve + adjusted_quote` in u128 and the numerator is
`base_reserve * adjusted_quote`. A nonzero denominator bounds the quotient by
`base_reserve`; both operations fit u128. Thus the Truncation construction is
checked statically, not claimed as a dynamically reached error. Entry-point
guards prevent a raw quote-zero call from directly testing helper underflow.
This arithmetic argument is source reasoning, not an exhaustive VM proof.

These fixtures establish no production-pool reachability, financial exploit,
full transaction corpus equivalence, compiler-host provenance or native-build
reproducibility. Existing builds and broad corpus results remain credited to
their public packets. Source/integration ownership was checked before this
independent verification; no coordination/review comments were posted.
