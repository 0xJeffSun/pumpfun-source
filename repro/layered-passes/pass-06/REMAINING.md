# Complete remaining byte comparison

The exact acceptance result is **0/4 core programs** and **2/5 dependency capture comparisons**. Every original byte is included. Different-position counts include only the common file extent; excess bytes are reported separately. Layout changes make these counts unsuitable as a completion percentage.

| Program | Original bytes | Candidate bytes | Different common positions | Excess bytes | Exact |
| --- | ---: | ---: | ---: | ---: | --- |
| pump | 10,485,715 | 1,588,480 | 883,909 | 8,897,235 | No |
| pump_amm | 10,485,715 | 1,199,064 | 670,580 | 9,286,651 | No |
| pump_fees | 948,944 | 826,904 | 461,552 | 122,040 | No |
| mayhem | 777,408 | 667,552 | 361,719 | 109,856 | No |
| spl_token | 108,600 | 108,600 | 0 | 0 | Yes |
| spl_token_2022 | 1,382,016 | 1,382,016 | 0 | 0 | Yes |
| associated_token | 105,032 | 105,032 | 307 | 0 | No |
| token_metadata | 793,991 | 793,991 | 1,509 | 0 | No |
| donation_relay | 830,448 | 460,496 | 252,831 | 369,952 | No |

SPL Token is a raw compiler output. Token-2022, ATA and Metaplex rows use existing retained allocation images; [raw compiler supplements](after-corrections/summary.json) remain separate. No image is padded or modified in this pass. The [complete compressed interval ledger](after-corrections/all-byte-ranges.json.gz) contains every mismatch interval and excess range.

## Function, call and data inventories

The [machine-readable index](current-analysis-index.json) binds the complete ledgers below to exact current original/candidate hashes. It preserves full rows rather than selecting only successful matches. These methods differ; their window and pair counts must not be combined into a percentage.

- [Pump: complete before/after inventory (use after)](../../pump/curve-preparation-fortyeight/full-before-after-inventory.json.gz) — candidate `b02a7e08b1f928a48793d909a86ef01c99cb3cb11a2aaf3d85e4ac422b989b51`.

- [AMM: complete residual ledger](../pass-02/after-fixes/ledgers/amm/after/residual-ledger.json.gz) — candidate `2a8a69f1e2f91f470b9742fe1c7caa129fa9ea126d54588473e8e3d490b7e706`.

- [Fees: current full function inventory](../../pump_fees/legacy-caller-v144/full-function-inventory.json) — candidate `e5c811e2a66b540f25b44d9a55dd7b890e7ff01a0074dfc0d0dfc25237c391fe`.

- [Mayhem: complete residual ledger](../pass-01/results/mayhem/residual-ledger.json) — candidate `9e4e19dfb3b3fefbec13ecfc0d43ffd2ff0bea7b74ac7b2fe14126d23c79c05b`.

- [Relay: complete original/candidate match ledger](../../donation-relay/source-build-07-owned-errors/match-ledger.json) — candidate `019a9ea7cb7cb6eb40db49125474135564c0e864ee2fc6bdad33231f8eb5827b`.

## Outstanding work by program

| Program | Remaining source and acceptance work |
| --- | --- |
| Pump | Five partial handlers and three unrecovered dispositions; V3 decoder/preparation full body equivalence and new short-layout runtime acceptance; mode/whitelist, residual/settlement/event composition; broader routes and creation; unmatched code, transitive calls/data, diagnostics and build provenance. Stopped scopes stay stopped. |
| AMM | 310 original windows without normalized matches; scalar specialization, diagnostic/data and recursive call gaps; authentic successful initializer replay; whole ELF identity. Existing scalar evidence does not justify forcing a code shape. |
| Fees | 135 unattributed and two conflicting original windows; 110 unmatched and two conflicting candidate windows; V2 and nonzero-quote payout proposal acceptance; legacy compared-value formatting correction; legacy handler/parser/wrapper and AMM CPI differences; cleanup, data, diagnostics and source/build identity. |
| Mayhem | Non-initializer source/error-formatting/lowering gaps, five unresolved GlobalParams roles, diagnostics/build provenance and full identity. Initializer remains excluded. |
| ATA | 304 text and three relocation bytes; original build/source ordering is not established. The differing code is not the custom panic body. |
| Metaplex | 1,477 text, 30 diagnostic and two relocation bytes. Local transformed CFG correspondence does not establish raw equality or historical source. No additional runtime probe. |
| Relay | 371 original windows without normalized matches; full serializer/owned-error body, conversion and logging differences, full call/data/error ABI; retained source-origin rejection, fixed-authority success routes and original build provenance. |
| All | Unknown transitive data extents, indirect calls, precise historical source/compiler/dependencies and incomplete security assessment. Normalized matching alone closes none of these globally. |

The exact incomplete instruction names and stopped-scope dispositions remain in [COMPLETION.md](../../../docs/COMPLETION.md). Published source contracts and finite regressions do not establish exhaustive semantics. The before/after snapshot, current index, package seals, build identities and saved receipt verification make this pass reviewable without claiming completion.
