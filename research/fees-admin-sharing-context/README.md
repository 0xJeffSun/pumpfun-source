# Admin sharing context: heap storage and typed program reader

The recovered `AdminCtoSharingConfig` context reproduces the complete
**6,152-byte parser at 381,352** and **1,416-byte dispatch at 642,848**.
Fees advances from 399 to **401 unique structural pairs / 37 unmatched windows**,
with no previous normalized or raw matches lost. The candidate retains 588
windows and 64 unique raw-equal pairs. These two new matches are normalized,
not raw local equality. Whole-binary identity remains **0/4**.

Only `sharing_admin.rs` changes. Global and sharing-config accounts use boxed
storage. The program account uses the existing
`Program<'info, crate::program::PumpFeesCandidate>` reader in place of an
unchecked account with an address constraint. This reproduces the original
ID/executable validation reader. Account order and business code stay unchanged;
no program namespace, generated type definition or existing type name is
renamed. The event authority remains borrowed. These are reproducing source
choices, not authenticated historical source organization.

## Isolated controls and call scope

| Source variant | Unique pairs | Unmatched | New complete bodies |
| --- | ---: | ---: | --- |
| Parent control, reused | 399 | 39 | 0 |
| Both boxes only | 400 | 38 | Dispatch only |
| Typed program only | 399 | 39 | 0 |
| Both boxes + typed program + owned event | 399 | 39 | 0 |
| Both boxes + typed program | 401 | 37 | Parser and dispatch |

All controls preserve the parent's coverage. They are retained as build/static
controls, not newly runtime-accepted sources. The box-only wrapper match still
calls the wrong parser; the accepted combination closes that edge. Merely
converting the event authority to owned storage loses both new matches.

All **51 direct local parser call bodies** match. The dispatcher has 9/10
matching bindings, including its imported log call; offset 1,176 still targets
the unmatched business body at 127,776. This does not complete the business
handler, all indirect calls or all transitive data.

The reader separately binds 19 literal ranges, 744-byte and 104-byte allocation
operands, the 744-byte Global copy, and the actual program-reader call at offset
1,584. That 584-byte callee has the original expected program ID and error
operands 3005/3008/3009; its direct callees also agree. The earlier slice/common/
buyback locations, relay rejection and decoder owner/message contracts survive.
Other transitive metadata remains unproven. Three mutation tests distinguish
allocation operands from masked CALL targets and referenced program-ID data.

## Reproduction and local execution

Four fresh Linux v1.44 root compilations and the reused
[PR #176](https://github.com/lalalune/pumpfun-source/pull/176) control are retained.
All five 36-input maps resolve exact captured source bytes; only this context
file differs. Actual compiler logs, symbols, artifacts, strip replays and the
187 unchanged harness hashes are included. The canonical target and all three
math-path remappings remain in the launch records. No receipt is retagged.

The accepted candidate freshly passes 17,331 comparisons across 18 suites,
including the 63 signed, captured-Pump admin-CTO cases; 1,542 exact query
outcome/log/compute cases; five 24/32/20/8/30-case matrices; and 16 relay rejection
cases. Each harness retains its observation limits. These VM suites do not
validate authentic fixed-admin `initialize_fee_config`; no new native-test or
exhaustive behavior claim is made. Allocator exhaustion is not covered.

Candidate: 868,960 bytes, SHA-256
`2569220262773a86d2aaea2544378fab2a9e93093766ff5591eff804eda40cb8`.
The four stored selected artifacts and this new Fees ELF are raw-compared with
their original captures and ELF extents, without padding or rewriting. The other
three programs were not newly compiled. Selected sources, checkpoints, scripts,
workflows and ledgers are unchanged. Earlier P27 guard results retain their
recorded scope in PR #171; they are not asserted for this branch.

```sh
python3 -I -B research/fees-admin-sharing-context/verify.py
python3 -I -B research/fees-admin-sharing-context/test_scope.py
```

These standalone checks read retained evidence without compiling or executing
target programs. The source maps, actual launch records and retained drivers
provide the reproduction inputs.
