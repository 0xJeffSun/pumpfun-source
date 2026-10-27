# Fees: V2 native social payout and buyback arithmetic

This proposal fixes two native recipient additions and V2's native no-op
diagnostics. It builds directly on the exact 43-input source of
[PR215](https://github.com/lalalune/pumpfun-source/pull/215), revision
`eae87f58426911685a908340354d2a3868e2ede3`. The legacy social claim is unchanged;
its recovery belongs to PR215. The baseline's two published ELF hashes are
independently reproduced from an empty dependency target.

Only three source expressions in `social.rs` and `buyback.rs` change:

- V2 native recipient credit uses saturating addition. At `u64` overflow, the
  original emits/returns the clamped balance and the runtime then rejects the
  transaction with `UnbalancedInstruction`, rolling back account changes.
  The reconstruction previously panicked before producing those records.
- Buyback native recipient credit uses Anchor's checked `add_lamports`, returning
  the original `ArithmeticOverflow` instead of panicking.
- V2 native no-op admission checks an executable recipient before zero amount,
  restoring the respective original messages. Legacy's different check order
  is retained unchanged from PR215.

These are bounded behavioral corrections, with **no new complete function-body
match**. Synthetic near-`u64::MAX` balances do not establish mainnet reachability,
an exploit or fund loss. Failed-transaction events/return data are not completed
payments. No original, dependency, existing harness or selected source/checkpoint
is modified. No assembly, compiler/layout sweep or binary edit is used.

## Evidence and limits

The 119-case focused matrix executes the captured original, fresh baseline and
proposal with normal test-owned signatures. It includes six headrooms × six
amounts for each of legacy social, V2 social and buyback; ordinary positive
controls; active-program recipient rejection; and valid executable recipients.
Legacy cases are preservation controls, not newly recovered behavior.

| Measurement | PR215 baseline | Proposal |
| --- | ---: | ---: |
| Focused mismatches | 38 | 0 |
| Overflow mismatches | 30 | 0 |
| Native no-op diagnostic mismatches | 8 | 0 |
| Normalized original counterparts | 559 | 559 |
| Raw-local original counterparts | 143 | 143 |
| Unique structural pairs | 412 | 412 |
| Equal decoded Location uses | 166 | 166 |

The eight no-op cases are six zero-amount cases and two executable-recipient
cases. All 3,353 direct-edge observations remain, including 12 already unequal
callee shapes. No previously equal edge or normalized/raw counterpart is lost.
There remain 26 unmatched original windows. Candidate windows increase 590→591;
the extra emitted function is not a coverage gain. Common-position differences
worsen 453,541→466,189, which is separate from the behavioral improvement.

Proposal: 873,488 bytes, SHA-256
`9e935f0a2d14006c49b9c7c83ec528278090f6b700221ec765962f87259bac1d`.
Symbols:
`3d36fd51063c1a577afad83e3008f9a5a54ed4c93e47f5b49cfbccc0a7fce078`.

The executable fixture installs the untouched SPL Token ELF at an otherwise
unused test-owned recipient key, solely to create a valid executable account.
That ELF is never invoked; no signer or actual CPI target is replaced. The
original Fees program remains at its authentic ID.

Compared fields are errors, retained before/after account snapshots, inner
instructions, return data, signed transaction bytes and application logs
(`Program log`, `Program data`, `Program return`). Overflow cases also verify
rollback and decode the clamped social return balance. Raw VM logs are retained;
compute/timing lines and untracked accounts are outside the comparison.

All 17,331 existing comparisons across 18 suites run on the actual proposal with
their unchanged predicates. A separate all-dependency-clean proposal build must
reproduce both ELF hashes. These finite checks do not prove unrestricted
transitive equivalence or authentic fixed-admin initialization.

The static audit checks full original windows using existing normalization,
decoded Location uses, direct edges, SyncNative packing and allocated-section
equality between symbol and stripped artifacts. Whole ELF/capture equality is
still false. Numerical results and build hashes are recorded in `validation/`
and `builds/`; the verifier checks the bindings rather than executing targets.

## Local reproduction

`baseline-sources.json` pins all 43 public Git inputs. `source.patch` shows the
entire reversible delta; source maps bind both stages. The default verifier needs
Python 3.11+ and the public Git history, performs no network request and does not
compile or execute a program. Materialization refuses existing destinations.

```sh
P=research/fees-native-payout-arithmetic
python3 -I -B "$P/verify.py"
python3 -I -B "$P/verify.py" --variant baseline --materialize /fresh/baseline
python3 -I -B "$P/verify.py" --variant proposal --materialize /fresh/proposal
python3 "$P/build.py" baseline --source /fresh/baseline --fresh \
  --work /fresh/work --sdk /sdk/v1.44 --strip-sdk /sdk/v1.48 \
  --cargo-home /verified/cargo-home
python3 "$P/build.py" proposal --source /fresh/proposal --fresh \
  --work /fresh/work --sdk /sdk/v1.44 --strip-sdk /sdk/v1.48 \
  --cargo-home /verified/cargo-home
python3 -I -B "$P/boundary.py" \
  --control /fresh/work/builds/baseline/candidate.so \
  --proposal /fresh/work/builds/proposal/candidate.so --output /fresh/boundary.json.gz
python3 -I -B "$P/static.py" --builds /fresh/work/builds --output /fresh/static.json.gz
python3 -B scripts/fees_validate_all.py \
  --candidate /fresh/work/builds/proposal/candidate.so --output /fresh/full.json
```

The builder verifies the pinned Docker image, official Linux SDK tool hashes,
252 locked archives and extracted registry sources before/after compilation.
Baseline and repeat use empty dependency targets; the first changed-source build
reuses the verified baseline dependencies and recompiles root/math. Builds use
`env -i`, no network, read-only source/SDK mounts, and never mount the original.
Runtime uses Python 3.12.3, `solders==0.27.1` and `pyelftools==0.32`, locally
without RPC or live transactions. Actual commands, logs and full comparisons
are retained alongside compressed artifacts.

## Relationship to concurrent work

During development PR215 merged the legacy correction. The earlier 554-based
experiment was therefore superseded, retained locally, and excluded from this
PR's source delta and acceptance counts. All published acceptance receipts here
come from new runs on PR215's exact 559-window source. Later independent branches
are not silently composed or credited. PR213's preprocessing helper and PR214's
Mayhem layout work address different bodies.
