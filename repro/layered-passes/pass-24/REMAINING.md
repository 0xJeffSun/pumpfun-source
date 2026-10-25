# Complete remaining byte comparison

The exact acceptance result is **0/4 core programs** and **2/5 dependency capture comparisons**. Every original byte is included. Different-position counts include only the common file extent; excess bytes are reported separately. Layout changes make these counts unsuitable as a completion percentage.

| Program | Captured bytes | Candidate bytes | Different common positions | Excess bytes | Exact |
| --- | ---: | ---: | ---: | ---: | --- |
| pump | 10,485,715 | 1,583,784 | 884,309 | 8,901,931 | No |
| pump_amm | 10,485,715 | 1,200,616 | 672,774 | 9,285,099 | No |
| pump_fees | 948,944 | 863,808 | 468,986 | 85,136 | No |
| mayhem | 777,408 | 668,640 | 362,490 | 108,768 | No |
| spl_token | 108,600 | 108,600 | 0 | 0 | Yes |
| spl_token_2022 | 1,382,016 | 1,382,016 | 0 | 0 | Yes |
| associated_token | 105,032 | 105,032 | 307 | 0 | No |
| token_metadata | 793,991 | 793,991 | 1,509 | 0 | No |
| donation_relay | 830,448 | 473,688 | 259,384 | 356,760 | No |

SPL Token is a raw compiler output. Token-2022, ATA and Metaplex rows use existing retained allocation images; [raw compiler supplements](after-corrections/summary.json) remain separate. No image is padded or modified in this pass. The [complete compressed interval ledger](after-corrections/all-byte-ranges.json.gz) contains every mismatch interval and excess range.

## Function, call and data inventories

The [machine-readable index](current-analysis-index.json) binds the complete ledgers below to exact current original/candidate hashes. It preserves full rows rather than selecting only successful matches. These methods differ; their window and pair counts must not be combined into a percentage.

- [Pump: complete before/after inventory (use after)](../../pump/admin-cto-compared-errors-fortyeight/build/analysis/full-before-after-inventory.json.gz) — candidate `e9494060904aad25f465efd93af9dd0bb09a5ded9f321747c789cbf0310bc6c5`.

- [AMM: complete residual ledger](../../pump_amm/init-logical-module-v144/inventory/after/residual-ledger.json.gz) — candidate `6dc621c8c6a165650a159b67f9f2d042c3ffc71481236208d2565485c3e169b2`.

- [Fees: current full function inventory](../pass-23/fees-current-evidence/analysis/full-function-inventory.json) — candidate `2387f8139a13918a5c9c523f140ecdd72db7243c8e2ed9cd7e1ff9d42ad6c8af`.

- [Mayhem: complete residual ledger](../../mayhem/sell-result-error-twentyfour/static/complete-inventory.json.gz) — candidate `7d416f848f03e46d9a514f4c505a8e903cdb908f52280bb961254eed90aebe1f`.

- [Relay: complete original/candidate match ledger](../../donation-relay/source-build-13-typed-borrow-owned/evidence/runtime-plan/static-proof/static/match-ledger.json) — candidate `e575529b6ccf6685a28ba45f010b3d15141e0cf689f94998afe60153936ed244`.

The [prior dependency review](../pass-09/dependency-review/REPORT.md) still applies to hash-identical ATA and Metaplex candidates. The [six-hypothesis Fees review](../pass-10/fees-residual-review/REPORT.md) identifies three already-correct orders and three unresolved ownership/function-boundary questions.

## Outstanding work by program

| Program | Remaining source and acceptance work |
| --- | --- |
| Pump | Five partial handlers and three unrecovered dispositions; V3 decoder/preparation full body equivalence and new short-layout runtime acceptance; mode0 divergent-supply runtime coverage after the buy fee-input correction; the buy complete-before-cashback order is corrected but exact-quote caller attribution remains limited; whitelist admission, residual/settlement/event composition; broader routes and creation; unmatched code, transitive calls/data, diagnostics and build provenance. Stopped scopes stay stopped. |
| AMM | 297 original windows without normalized matches; scalar specialization, diagnostic/data and recursive call gaps; authentic successful initializer replay; whole ELF identity. The supported accumulator Clock/store order, claim overflow-before-store order and explicit self-transfer predicate are corrected; unrelated snapshot-load movement remains an unproven source hypothesis. Existing scalar evidence does not justify forcing a code shape. The earlier Claim context and new Sync context close six normalized original windows across their checkpoints; raw identity, remaining data and indirect-call closure stay open. |
| Fees | 122 unattributed and two conflicting original windows; 117 unmatched and two conflicting candidate windows; full withdrawal/sharing and legacy/V2 caller, payout helper and compared-value CFG identity; legacy handler/parser/wrapper and complete sharing caller differences; admin-or-selected-creator authorization now corrected; admin-only runtime coverage remains zero; cleanup, data, diagnostics and source/build identity. |
| Mayhem | The reviewed typed zero-divisor errors are corrected in both BuyPumpSwap and SellPumpSwap. Other non-initializer source/error/ownership gaps, five unresolved GlobalParams roles, 61 retained diagnostic rows, build provenance and full identity remain. Initializer remains excluded. |
| ATA | 304 text and three relocation bytes; original build/source ordering is not established. The differing code is not the custom panic body. |
| Metaplex | 1,477 text, 30 diagnostic and two relocation bytes. Local transformed CFG correspondence does not establish raw equality or historical source. No additional runtime probe. |
| Relay | 370 original windows without normalized matches; remaining serializer/error adapter, conversion and logging differences after owned3002 correction, full call/data/error ABI; retained source-origin rejection, fixed-authority success routes and original build provenance. |
| All | Unknown transitive data extents, indirect calls, precise historical source/compiler/dependencies and incomplete security assessment. Normalized matching alone closes none of these globally. |

The exact incomplete instruction names and stopped-scope dispositions remain in [COMPLETION.md](../../../docs/COMPLETION.md). Published source contracts and finite regressions do not establish exhaustive semantics. The before/after snapshot, current index, package seals, build identities and saved receipt verification make this pass reviewable without claiming completion.

The complete Global cursor418..450/context776 authorization proof is integrated in this pass. A standalone precise type declaration remains a source hypothesis where bytes admit more than one Rust representation. The new Mayhem timestamp-role review resolves two already-used withdrawal timestamp roles, without changing the five unresolved business fields. Full ATA review confirms candidate2 already used official installer tools v1.27; historical unit graph/source order is still missing.

## Pass24 layered review and next acceptance gates

Pump: original6030and application2006 tuple roles are corrected and finite existing suites pass; actual2006 branch has no runtime coverage. Four numeric return sites still require original CFG/context/ownership proof (6019,6091,6092twice). No numerical substitution is justified from an error number alone. Current full caller/diagnostic/data identity remains open.

Relay: checked-borrow error ownership is corrected, but failure branch remains static-only; ordinary12pass and370originalwindows remain unmatched. Strong selected shared-library v1.47 evidence comes from a Fees graph rather than the Relay23 graph; it supports reviewing a separate compiler-only source23 measurement, not selecting a release historically or claiming complete Relay reconstruction. Existing remap/target/strip/cache provenance must be measured from Relay's actual recipe.

Mayhem: officialv1.54 fresh fixed-source build materially improves bounded std-helper matches and raw code/data proofs. Candidate ca5d remains unselected pending unchanged9595corpus/actual local loader acceptance and exact61diagnostic-row review. Even a pass would not establish historical compiler uniqueness or resolve the empty officialSDK syscall authority. Existing family VM settings must be disclosed precisely: six legacy administrative runners use history0, trade/burn constructors explicitly enable signature/blockhash checks; missing administrative raw transaction bytes cannot be invented or counted as independently signature-verified. Initializer remains excluded.

All prior stopped execution scopes remain excluded. Finite cases, normalized windows and compiler-helper agreement do not close exhaustive security, opaque functions, transitive indirect call/data or entire original ELF equality. Layered work continues from these exact candidate hashes and preserved failures.
