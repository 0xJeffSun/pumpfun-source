# Integrate social creation ordering with the current context source

This artifact composes the merged
[social-creation correction](../fees-social-creation-body/README.md) with the
[401-pair admin/context source](../fees-admin-sharing-context/README.md).
It retains **402 unique structural pairs / 36 unmatched windows**, 588 candidate
windows and 64 unique raw-equal local pairs, with no prior raw or normalized
coverage lost. This integrates an existing recovery; it is not another
independent discovery of the 3,296-byte body at 190,104.

Only the two exact, hash-pinned source files from PR #172 replace their 401-parent
versions. Every other input, including the later sharing/admin context gains,
remains byte-identical. The program namespace, root program file and generated
type definitions are unchanged. The complete 36-input maps resolve retained
parent snapshots plus those two captured overrides; no receipt is retagged.

The fix logs and rejects the disabled feature first, then logs and succeeds for
an existing PDA before enforcing the instruction ID length. Fresh strict tests
compare **all retained fields**, including logs and transaction bytes. The
401-pair control fails 117/157 comparisons, with 12 differing instruction
outcomes. The integrated candidate passes all 157. The standalone checker
recomputes these counts, cases and comparisons rather than trusting `match`.

The complete recovered body matches, with all **18 local callees and three
imported calls** bound. Both log messages and the complete 72-byte error path
are read separately; the guard line remains 67. Earlier admin/program-reader
and slice/common/buyback/relay/decoder contracts remain verified. The admin
business body is still unmatched, and all transitive data/indirect semantics
remain unproven.

The new canonical Linux v1.44 build has its own actual compiler log, artifacts,
symbols and strip replay. The target and all three math-path remappings are
retained. Fresh runtime covers 17,331 comparisons across 18 suites, 1,542 exact
query outcome/log/compute comparisons, the five 24/32/20/8/30-case matrices,
16 relay cases and the new 157 strict cases. The unchanged control reuses its
published runtime receipts except for its freshly executed strict matrix.
Harness observation limits remain intact; authentic fixed-admin FeeConfig
initialization and exhaustive behavior are not validated here.

Candidate: 868,720 bytes, SHA-256
`b7f5b9834d65432626034b852687ca885c122396b30d595a63bfb41b694ab318`.
The four stored selected artifacts and this fresh Fees ELF still fail raw whole
capture and meaningful-ELF comparisons, without padding or rewriting:
**whole-binary identity remains 0/4**. The other three programs were not freshly
compiled. Selected sources, scripts, workflows, checkpoints and ledgers stay
unchanged. This artifact remains distinct from the separately pinned inventory
and source-only native recipes.

```sh
python3 -I -B research/fees-social-current-integration/verify.py
python3 -I -B research/fees-social-current-integration/test_scope.py
```

These inspect retained evidence without compiling or executing targets.
Four mutation tests check the unmasked guard coordinate, referenced error path,
masked local CALL and strict outcome accounting. External exact-byte dependencies
are listed in `parents.json`; runtime/build drivers are retained in the parent.
