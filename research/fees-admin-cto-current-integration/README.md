# Fees: AdminCto recovery on the current source

This integrates [PR #200's included AdminCto handler](../fees-admin-cto-included-handler-source-proposal/README.md)
with the actual 553-window source, preserving the decoder, math, context,
social-creation and public-instruction-module recoveries. The new complete
window is original **127776 / 4,968 bytes**. No earlier context gains are counted
again.

| Measurement | Current control | Integrated source |
| --- | ---: | ---: |
| Complete normalized windows | 553 | 554 |
| Unique structural pairs | 406 | 407 |
| Raw-local windows | 118 | 118 |
| Unmatched windows | 32 | 31 |

No normalized or raw match is lost. All 20 actual direct callee bodies of the
business window match. The existing exact local Location cohort remains equal,
and previous equal direct-call observations remain equal. These are local
body/data checks, not exhaustive transitive equivalence.

Four files change. Three source overrides are byte-identical to PR #200; the
root file applies only its include-expression change, retaining the later
public module and other current-source edits. The included block restores the
zero-admin rejection, source spans, mutation order and event organization.
The local event/include topology is an inferred reconstruction, not proof of
historical source organization.

Two root builds from separate source trees reproduce both artifacts exactly.
The official Linux v1.44 compiler and existing dependency cache are used with
all three established math-path mappings. This is not a clean all-dependency
build. The complete 42-input hashes, actual commands/logs, results, stripped and
symbol outputs are retained. The control also independently reproduces the
previous current candidate.

Fresh original/candidate replay passes **17,331 cases across 18 suites**. All
suite-specific predicates and exclusions remain those of the unchanged harness.
This does not claim new exhaustive behavior, a rerun of every earlier specialized
matrix, or historical fixed-admin success coverage beyond those suites.
Whole meaningful-ELF and captured-file equality remain false; selected sources
and checkpoints are unchanged.

```sh
python3 -B research/fees-admin-cto-current-integration/verify.py
python3 -I -B research/fees-admin-cto-current-integration/test_scope.py
```

Verification rechecks source composition, emitted windows, calls, data, build
bindings and the saved runtime report; it does not compile or execute programs.
The actual local build driver is retained. Its SDK/cache/container paths must be
adapted with the same pinned inputs for another host.

Candidate SHA-256: `ce8e040056b0645e59473306ad6b9fc8f1428461695d7fece8d0b276fc3f10d8`.
Symbols SHA-256: `629b6d92b1b0ab81e924d5eaef867b4806e26fb041642c5c663df619f3745d9d`.
