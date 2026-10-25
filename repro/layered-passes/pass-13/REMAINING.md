# Complete remaining byte comparison

The exact acceptance result is **0/4 core programs** and **2/5 dependency capture comparisons**. Every original byte is included. Different-position counts include only the common file extent; excess bytes are reported separately. Layout changes make these counts unsuitable as a completion percentage.

| Program | Original bytes | Candidate bytes | Different common positions | Excess bytes | Exact |
| --- | ---: | ---: | ---: | ---: | --- |
| pump | 10,485,715 | 1,588,408 | 883,574 | 8,897,307 | No |
| pump_amm | 10,485,715 | 1,196,544 | 670,791 | 9,289,171 | No |
| pump_fees | 948,944 | 852,248 | 465,764 | 96,696 | No |
| mayhem | 777,408 | 668,640 | 362,490 | 108,768 | No |
| spl_token | 108,600 | 108,600 | 0 | 0 | Yes |
| spl_token_2022 | 1,382,016 | 1,382,016 | 0 | 0 | Yes |
| associated_token | 105,032 | 105,032 | 307 | 0 | No |
| token_metadata | 793,991 | 793,991 | 1,509 | 0 | No |
| donation_relay | 830,448 | 460,272 | 252,624 | 370,176 | No |

SPL Token is a raw compiler output. Token-2022, ATA and Metaplex rows use existing retained allocation images; [raw compiler supplements](after-corrections/summary.json) remain separate. No image is padded or modified in this pass. The [complete compressed interval ledger](after-corrections/all-byte-ranges.json.gz) contains every mismatch interval and excess range.

## Function, call and data inventories

The [machine-readable index](current-analysis-index.json) binds the complete ledgers below to exact current original/candidate hashes. It preserves full rows rather than selecting only successful matches. These methods differ; their window and pair counts must not be combined into a percentage.

- [Pump: complete before/after inventory (use after)](../../pump/buy-mode-order-fortyeight/full-before-after-inventory.json.gz) — candidate `bc6775052d8d335907d2a797113a4bb8e0008f07fa9d69c7597984fda9887314`.

- [AMM: complete residual ledger](../../pump_amm/formatter-restoration-v144/inventory/after/residual-ledger.json.gz) — candidate `d3dacf1bd54e0b7b825557d01adfe158bc229753fb4b945618c5eabf2bdb1bab`.

- [Fees: current full function inventory](../../pump_fees/v2-caller-v144/full-function-inventory.json) — candidate `b2d02994dbc29680273f0a3589d8d9fd2763445505483c1acbd4c9f09e1502fb`.

- [Mayhem: complete residual ledger](../../mayhem/sell-result-error-twentyfour/static/complete-inventory.json.gz) — candidate `7d416f848f03e46d9a514f4c505a8e903cdb908f52280bb961254eed90aebe1f`.

- [Relay: complete original/candidate match ledger](../../donation-relay/source-build-08-whitelist-writer/match-ledger.json) — candidate `ef91a674f2180f4500a087585c5f7e1e90758b9e05fe8e77a7f2669bdbdd898f`.

The [prior dependency review](../pass-09/dependency-review/REPORT.md) still applies to hash-identical ATA and Metaplex candidates. The [six-hypothesis Fees review](../pass-10/fees-residual-review/REPORT.md) identifies three already-correct orders and three unresolved ownership/function-boundary questions.

## Outstanding work by program

| Program | Remaining source and acceptance work |
| --- | --- |
| Pump | Five partial handlers and three unrecovered dispositions; V3 decoder/preparation full body equivalence and new short-layout runtime acceptance; mode0 divergent-supply runtime coverage after the buy fee-input correction; the buy complete-before-cashback order is corrected but exact-quote caller attribution remains limited; whitelist admission, residual/settlement/event composition; broader routes and creation; unmatched code, transitive calls/data, diagnostics and build provenance. Stopped scopes stay stopped. |
| AMM | 306 original windows without normalized matches; scalar specialization, diagnostic/data and recursive call gaps; authentic successful initializer replay; whole ELF identity. The supported accumulator Clock/store order is corrected; unrelated snapshot-load movement remains an unproven source hypothesis. Existing scalar evidence does not justify forcing a code shape. The restored base58/UTF8 formatter closes four more normalized function windows; raw identity, remaining data and indirect-call closure stay open. |
| Fees | 130 unattributed and two conflicting original windows; 118 unmatched and two conflicting candidate windows; full legacy/V2 caller, payout helper and compared-value CFG identity; legacy handler/parser/wrapper and AMM CPI differences; cleanup, data, diagnostics and source/build identity. |
| Mayhem | The reviewed typed zero-divisor errors are corrected in both BuyPumpSwap and SellPumpSwap. Other non-initializer source/error/ownership gaps, five unresolved GlobalParams roles, 61 retained diagnostic rows, build provenance and full identity remain. Initializer remains excluded. |
| ATA | 304 text and three relocation bytes; original build/source ordering is not established. The differing code is not the custom panic body. |
| Metaplex | 1,477 text, 30 diagnostic and two relocation bytes. Local transformed CFG correspondence does not establish raw equality or historical source. No additional runtime probe. |
| Relay | 371 original windows without normalized matches; full serializer/owned-error body, conversion and logging differences, full call/data/error ABI; retained source-origin rejection, fixed-authority success routes and original build provenance. |
| All | Unknown transitive data extents, indirect calls, precise historical source/compiler/dependencies and incomplete security assessment. Normalized matching alone closes none of these globally. |

The exact incomplete instruction names and stopped-scope dispositions remain in [COMPLETION.md](../../../docs/COMPLETION.md). Published source contracts and finite regressions do not establish exhaustive semantics. The before/after snapshot, current index, package seals, build identities and saved receipt verification make this pass reviewable without claiming completion.

## Pass13 attribution refinements

The six reviews in [README.md](README.md) refine specific source roles without changing any current artifact. Mayhem181656/184200 now have bounded posttrade accounting attribution while their historical opaque records remain preserved. AMM's claim-exit offset needs parser/member provenance; Relay's header I/O/owned-error boundary has a separate unaccepted source proposal. No global mismatch count or exactness claim is changed by these attributions.
