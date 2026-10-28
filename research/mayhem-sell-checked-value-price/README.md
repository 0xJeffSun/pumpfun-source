# Current-source LegacySell checked arithmetic and typed pricing

This packet qualifies the checked-denominator/value-price composition against
actual current inputs, complete native builds, and fresh signed sell executions.
It changes only `src/state.rs` and the LegacySell price-check portion of
`src/instructions/pump_interface.rs` within the pinned 67-input source. The other
65 inputs, generated account constraints, LegacyBuy ownership/error handling,
program namespace and existing CPI Source expression remain unchanged.

The ratio uses checked subtraction and division, then unwraps the typed result.
LegacySell passes reserve values to an inline price check returning
`Result<(), MayhemError>` and converts at the outer boundary. This is a partial
source recovery; the frozen case corpus supplies finite behavioral evidence.

## Complete bodies remain unequal

The actual matched entry wrappers select original LegacySell at 127520 and
SellV2 at 159160. The selected LegacySell body is 12,864 bytes versus original
12,992. All 51 callee identities/multiplicities agree; ordered correspondence is
50/51, compared with the current native parent's 46/51. Body length and call
ordering are diagnostics, not a complete match. All 432 normalized original
counterparts, 84 native raw-local windows and 4,383 positive immediate edges
retain their exact sets. There is no new complete window or whole-ELF identity.
LegacyBuy remains the current 13,784-byte body with the same complete normalized
signature; an older ownership version is not substituted.

| Profile | LegacySell body bytes | Ordered original callee matches | Scope |
| --- | ---: | ---: | --- |
| Current native parent | 13,008 | 46/51 | Existing artifact/provenance |
| Checked denominator | 13,008 | 49/51 | Earlier control |
| Checked denominator and value pricing | 12,864 | 50/51 | Freshly qualified composition |
| Actual root repeat | 12,864 | 50/51 | Both complete outputs equal |
| Borrowed reference | 12,864 | 50/51 | Both complete outputs equal; no code-generation effect |
| Deferred reserve read | 12,976 | 45/51 | Static negative control |
| Overflowing-product spelling | 12,896 | 46/51 | Static negative control |

The selected SellV2 body is 17,960 bytes versus original 18,096, with the same
callee multiset and ordered correspondence 48/49. It also remains unequal.
The two length-closer LegacySell controls regress ordering and are not adopted.
No independent VM qualification is claimed for those two controls.

Candidate SHA-256 (755,976 bytes):
`ae841f49d2786b78daab90d7ec5cd2f228af9992cec2d2cb425d0ef9fcc9bfd3`.
Symbols SHA-256:
`4be1f189477270a20cbe41e8d285978fbaeaa9a152f1721cfb5e8a728a66a010`.
The exact-source root repeat and the distinct borrowed-reference control each
reproduce both complete files byte for byte. They are separate real builds.

## Fresh signed comparisons

This exact candidate ran the four complete unchanged sell families: 1,815 fresh
original/candidate pairs and 3,630 independently verified signed records. No
previous receipts are relabeled. The one-pair smoke test is excluded from these
totals. There are no new unique cases.

| Family | Pairs | Successful pairs | Rejected pairs | Non-compute log differences | Raw log differences |
| --- | ---: | ---: | ---: | ---: | ---: |
| legacy | 396 | 134 | 262 | 0 | 267 |
| native | 473 | 176 | 297 | 0 | 320 |
| token | 473 | 121 | 352 | 0 | 317 |
| token22 | 473 | 121 | 352 | 0 | 317 |

The frozen comparisons and independent checkers verify errors, tracked accounts,
CPI/return data, signatures and transaction bytes, successful quote/event/state
results and failed-transaction rollback. A read-only forwarding observer checks
six real program images before/after each actual signed execution. All 21 pinned
public input files, signature/blockhash checks, signers, authorities, CPI
implementations and comparison predicates remain unchanged. The stricter log
check removes only explicit compute-unit lines. Raw log differences remain
reported; resource identity and exhaustive behavior are not established.
No CPI-error callback execution coverage is inferred.

## Build provenance and rechecking

Seven profiles include four new root compilations in this continuation and
three earlier artifacts with their actual provenance. All fourteen complete
files and seven actual standard objcopy replays are included. The official Linux
SDK v1.54's six tools are bound before/after builds; 26 target-library bindings
are checked for the new trials/repeat. The earlier selected artifact has a
recorded post-check rather than an invented pre-build library observation; the
new repeat recompiles its exact source with the current before/after checks.
Dependencies were warmed, not rebuilt entirely from a clean dependency tree.

```sh
python3 -I -B research/mayhem-sell-checked-value-price/verify.py
python3 -I -B research/mayhem-sell-checked-value-price/test_scope.py
```

Use ordinary Python with solders 0.27.1. The default verifier authenticates all
source/output/tool bindings, recomputes complete-window and entry/callee
observations, and reruns the frozen independent checkers on losslessly saved
receipts. It invokes no target VM, compiler, SDK, Git or network operation.
Three pinned external inputs are required; no unsealed cache is used.

Scope tests mutate actual in-memory bytes: the wrapper guard rejects a wrong
handler; resolved callee checks detect a redirected call despite the existing
call mask; an arithmetic literal change preserves the callee sequence but
changes body bytes; data outside the body changes the whole image. Reference
files and comparator masks remain unchanged.

Only this research packet is added. Selected programs, frozen scripts,
workflows, ledgers, stopped lanes and original binaries remain unchanged.
Original programs are comparison/VM inputs and never compiler/linker inputs.
No source paths, Source fields, modules, padding, assembly or binary patches
are introduced to pursue a match.
