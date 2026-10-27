# Historical recovery findings — reviewed, unpromoted

This preserves the twelve files submitted in [PR #263](https://github.com/lalalune/pumpfun-source/pull/263), unchanged under [`submitted/`](submitted/). They describe older candidate artifacts and exploratory proposals. Their completion, impossibility and ready-to-apply claims are **not accepted conclusions**. No contract source, build selection or runtime artifact is changed by this package.

The [review](REVIEW.md) identifies material corrections:

| Submitted claim | Reviewed disposition |
| --- | --- |
| All four contracts are behaviorally 100% complete | Finite, overlapping fixtures do not establish exhaustive behavior; current gaps remain. |
| Swap slippage must change from `6012` to `6013` | Six retained original/candidate swap executions agree on `6012`. Reject the blanket replacement. |
| No further Fees logic or source recovery is possible | The newer [Social recovery](../fees-social-claim-v2-recovery/README.md) reaches 579/585 normalized windows, including a newly recovered handler. |
| The compiler sweep is exhaustive and proves host-independent impossibility | It records five successful and seven failed attempts in a limited version set, without complete build inputs or artifacts. |
| An admin private key is required for byte identity | Authentic initializer runtime acceptance and static binary reproduction are separate obligations. |
| The proposed source relocations and enum consolidation are ready to apply | They remain unbuilt, unvalidated hypotheses against older sources. |

Use the [current repository overview](../../README.md), [reconstruction status](../../docs/RECONSTRUCTION-STATUS.md), and [remaining work](../../docs/REMAINING-WORK.md) for accepted progress. The [current Mayhem experiment](../mayhem-control-work-20261027/README.md) also supersedes this submission's older byte counts without claiming complete identity.

`submission-manifest.json` binds the original files to commit `db0031f6f7bab06c0b3379e3da04fe7193a57d0c`. `review-evidence.json` records six retained runtime counterexamples with source-file hashes. Recheck both with:

```sh
python -I -B research/recovery-findings-20261027/verify.py
```

The verifier reads existing evidence; it runs no compiler, target program or proposed edit. Statements about authorization inside the historical submission are preserved text, not instructions or permission for subsequent work.

The [PR #265 follow-up](submitted-followups/pr265.md) is also retained unchanged, with its origin in `followups.json`. It reports a successful build but supplies no candidate ELF, complete build receipt or differential runtime evidence. Its claim that replacing `6012` with `6013` is behaviorally correct remains contradicted by the six retained comparisons above; no proposed source edit is applied.

The subsequent [patch attachment](submitted-followups/pr265-patches/APPLY.md)
adds concrete diffs at `d1a8572c9c235458f13e241cb8fe545cf52c5506`; all three
files are preserved unchanged. Applying cleanly does not resolve the behavioral
counterexamples or validate the reported build. These remain unvalidated proposals.

The [subsequent review update](submitted-followups/pr265-review-update/APPLY.md) is
archived separately so the originally submitted patch notes remain byte-identical.
It adds warnings around the same unsupported 6013 proposal; no contract edits are applied.
