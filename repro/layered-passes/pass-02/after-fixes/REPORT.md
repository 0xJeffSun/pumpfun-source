# Layered pass 02: full-ledger comparison after the reviewed fixes

Whole captured-payload equality remains **0/4 core programs** and **2/5 dependency payloads**. This report compares exact artifacts against the published `dff3b7ddc64dc2ae1f3253252e096723998ce861` baseline. It performs no build, transaction, new fixture or source mutation. Source reconstruction counts and security audit completion are separate questions.

## Artifacts and acceptance

| Program | Baseline | Compared artifact | Status |
| --- | --- | --- | --- |
| Pump | `73100357…` | `2aa18c73…` | Accepted clean main; scratch provenance preserved |
| AMM | `d27be7e9…` | `2a8a69f1…` | Accepted clean main source build |
| Fees | `5cf8d567…` | `8ff12f9c…` | Accepted clean main source build |
| Mayhem | `9e4e19df…` | Same bytes | Unchanged accepted artifact |

`input-config.json` identifies full hashes through exact public package paths, source maps and build reports; `external-inputs.json` pins every consumed external file. The AMM builds each bind 22 recorded inputs; Fees binds 26. Mayhem's unchanged 14-input map is checked against the retained build and an observed source snapshot. The Pump paired ledger binds 37 scratch inputs and their original observed build paths. The additional Pump main acceptance record binds package seal `b8906c998c01a0dee9e8eb2f6bfbcc3c903e97d8753b22dbb316cc8dc0cc787e`, exact full executable and symbol identity, all 37 main inputs and the separate README. It does not rewrite the original scratch provenance.

The package is deliberately small relative to its source archives: public artifacts are hash-pinned dependencies rather than copied complete build/runtime archives. Verification requires those exact public files in `--repo`. No mutable `work/` input or private cache is required.

## Same-method full inventories

| Measure | Baseline | After |
| --- | ---: | ---: |
| Pump original inferred windows | 1,035 | 1,035 |
| Pump candidate symbol windows | 785 | 786 |
| Pump candidates with normalized pattern | 492 | 494 |
| Pump candidates with call-consistent pattern | 423 | 428 |
| Pump originals with call-consistent pattern | 450 | 455 |
| Pump raw-equal pairs, including ambiguous alternatives | 617 | 617 |
| AMM original inferred windows | 785 | 785 |
| AMM candidate symbol windows | 653 | 653 |
| AMM originals with normalized pattern | 475 | 475 |
| AMM originals with raw-body match | 92 | 92 |
| AMM candidate windows without normalized match | 197 | 197 |
| AMM immediate / recursive direct-call pairs | 1,136 / 1,083 | 1,136 / 1,083 |
| Fees original inferred windows | 585 | 585 |
| Fees candidate symbol windows | 546 | 547 |
| Fees call-consistent candidate windows | 438 | 440 |
| Fees raw-equal candidate windows | 98 | 100 |
| Fees mapped / unattributed original windows | 437 / 145 | 439 / 143 |
| Fees immediate call-pair residuals | 272 | 271 |

These rows have different denominators. Pump's raw count is a count of **pairs**, AMM's is a count of **original windows**, and Fees' is a count of **candidate windows**. They must not be added or turned into a percentage of functions or behavior. Original boundaries are inferred from entry/call/relocation evidence; candidate extents come from current symbols, retaining aliases. Recursive direct-call correspondence does not establish indirect-call, data or semantic equivalence.

The two newly mapped Fees originals start at 40472 and 41456. Every original row remains in `comparisons/fees-all-rows.json.gz`; unmatched and ambiguous rows are retained. Fees still has 105 unmatched candidate windows, two candidate call conflicts, three original call conflicts, 137 ambiguous original rows and 137 ambiguous candidate rows. Its 92 unresolved immediate call targets are unchanged. AMM has 310 original windows without a normalized match and 158 original windows with multiple matches; no AMM status row changes category in this comparison.

## Full bytes, calls and data

| Comparison against original | Baseline differing common-position bytes | After |
| --- | ---: | ---: |
| Pump | 880,923 | 883,173 |
| AMM | 670,956 | 670,580 |
| Fees | 421,191 | 423,337 |

These positional figures are sensitive to layout. They are not a measure of recovered semantics: a source correction can change addresses across the executable. Every mismatching run, excess region, section/header/relocation record, raw symbol-table row, candidate/inferred window, direct/indirect call and unresolved data extent is retained in the per-program ledgers or the hash-bound public Pump paired ledger. The complete original and candidate ELF hashes remain the controlling identity.

AMM and Fees use the unchanged public per-program full-ledger algorithms. The adapter only constructs their expected input directory and selects the exact candidate/source/static records. Fees also records every ELF symbol-table row without changing its matching algorithm. The optional selected-object annotation input is empty on **both** Fees runs: old concrete object addresses are not transferred to the new binary. All raw pointers, relocation edges, previews and unresolved consumed extents remain enumerated. Earlier bounded-object proofs are retained separately in history, and the current Fees admission/retained-body proofs are separately hash-bound; absence of optional annotation is not evidence that the objects disappeared.

Pump's public paired ledger is recomputed with its reviewed image-loading adapter. Both sides use the same pattern/relocation and call fixed-point algorithm. The public original adapter source and exact diff are bound; old source/status fields are not misrepresented as metadata-candidate acceptance. No historical function name is inferred from a shape or offset.

Mayhem's executable and its recorded source map are unchanged; its earlier static catalog remains the appropriate baseline. No semantic analysis of the stopped initializer or other excluded windows is performed. Original excluded regions remain opaque bytes in exhaustive structural comparisons.

## Unchanged dependencies

All five selected dependency payloads are byte-identical to the pass02 before-promotion selection. SPL Token and the retained Token-2022 allocation image match their captured payloads. ATA, Metaplex and the Relay review candidate do not. The raw Token-2022 and Metaplex compiler outputs are also checked separately from their retained allocation images. No image padding, binary modification or new build is performed.

The Relay candidate here is the same stack-clean review artifact selected in the baseline; this report does not grant it transaction acceptance. No Relay function-match totals are reused here: its historical analyzer classified some type-10 relocated calls as direct, and a separately sealed relocation-first correction is required before those historical totals can be compared. The unchanged files and complete byte ranges are in `comparisons/whole-files.json.gz`. Dependency equality does not close the source/compiler provenance requirements or the audit.

## Reproduction and remaining limits

Run `python3 -B /path/to/this/package/verify.py --repo /path/to/public/repository`. It checks the seal and every exact external file, reruns both full AMM and Fees ledgers and the Pump paired ledger, and checks all comparison records. `--integrity-only` skips recomputation and is used only for explicit negative integrity tests.

The result does not prove all account constraints, every runtime branch, complete consumed-object extents, arbitrary descendant/indirect-call equality, original source spelling or unique historical build recipes. There are no added fixtures, runtime assertions, source proposals, security sign-offs or changes to excluded work in this pass.
