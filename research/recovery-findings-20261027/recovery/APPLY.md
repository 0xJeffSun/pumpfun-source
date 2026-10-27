# Archived patch proposals — not approved for application

These diffs record the PR #265 author's proposed changes against `a853b393`.
They are retained as research inputs; patch applicability does not establish
correctness, reproducibility, or suitability for the selected reconstruction.

| Diff | Proposed change | Review disposition |
|---|---|---|
| [`mayhem-enum-consolidation.diff`](mayhem-enum-consolidation.diff) | Consolidate split error enums and replace both swap price-band errors from 6012 to 6013. | **Do not apply as written.** Six retained original/candidate swap comparisons return 6012. The blanket 6013 replacement contradicts that evidence. Enum consolidation requires separate source and runtime validation. |
| [`fees-pathstring-relocations.diff`](fees-pathstring-relocations.diff) | Six source-file relocations and corresponding `#[path]` module declarations. | Unpromoted source-layout hypothesis. The author's similarity measurements lack retained candidate ELFs and complete reproducible build receipts in this submission. |

The original build report is preserved in
[`../submitted-followups/pr265.md`](../submitted-followups/pr265.md), with provenance
in [`../followups.json`](../followups.json). Its claimed compilation and similarity
results are author-reported, not independently reproduced by this review.
[`mayhem-enum-validation.md`](mayhem-enum-validation.md) retains the report with a
review warning. See [`../REVIEW.md`](../REVIEW.md),
[`../review-evidence.json`](../review-evidence.json), and the six hash-bound
counterexamples checked by `python -I -B research/recovery-findings-20261027/verify.py`.

No `programs/*` source or selected artifact changes here. Any future source
promotion requires a candidate build, bound receipts and differential validation,
updated status, and a reviewed guard transition. In particular, a successful
`git apply --check` is not permission or evidence to promote either patch.
