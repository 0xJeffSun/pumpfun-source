# Layered reconstruction pass 05

The exact acceptance target remains **0/4 core programs** and **2/5 dependency capture comparisons**. This pass integrates the independently reviewed Fees legacy caller, checks a clean main build against the tested scratch executable and symbols, and continues the remaining BuyV3 source contracts. The accepted corpus remains 53,787 comparisons; rerunning existing inputs adds no unique coverage.

## Fees legacy caller

The [reviewed proposal](../../pump_fees/legacy-caller-reviewed-proposal/REPORT.md) recovers the original legacy order: quote/version/authority checks, remaining-account preprocessing, the AMM adapter, recipient filtering and weight rescaling, early SharingConfig serialization, conditional Pump distribution, then new-share validation and update. Typed generated CPI clients preserve the fixed account order and privileges; ordinary Rust ownership preserves the AccountInfo lifetime across the AMM skip branch. V2 source and both account-context declarations are unchanged.

The [scratch build and complete evidence](review-candidates/fees-legacy-caller/README.md) contain the one reviewed source delta, unchanged pinned compiler/dependencies, full original/candidate function inventories, actual call/data witnesses and every regression receipt. The 826,904-byte candidate is `e5c811e2a66b540f25b44d9a55dd7b890e7ff01a0074dfc0d0dfc25237c391fe`; the symbol ELF is `336f49a8075c87efe2eead28290793823a6b5bf004fe000b82b27981ae6ce501`.

All **17,461** existing comparisons pass: 17,441 baseline plus the same 20 focused cases, including all 417 sharing-update rows. The ten donation sequence steps remain separate. Saved verification rechecks 17,204 signatures in the baseline encoded fields and 80 focused signatures, with unchanged genuine historical messages separately checked. These numbers are not unique transaction counts. No new fixture or relaxed comparator is used.

The [main checkpoint](../../pump_fees/legacy-caller-v144/README.md) records one clean main-source build and full executable **and** symbol identity with the tested scratch build. Main acceptance carries the receipts by that identity; it does not claim another target replay. The source map binds all 26 inputs, including the updated program README.

| Same-method Fees inventory | Previous 8ff12 | Current e5c811 |
| --- | ---: | ---: |
| Original inferred windows | 585 | 585 |
| Candidate symbol windows | 547 | 562 |
| Original mapped-pattern windows | 439 | 448 |
| Original unattributed windows | 143 | 135 |
| Original call-conflict windows | 3 | 2 |
| Whole original equal | No | No |

The Pump distribution CPI, four generated meta/info helpers, SharingConfig exit and event have complete normalized matches, with 96 matching immediate target comparisons. Five retained social roots and 176 immediate targets remain normalized-equal to the preceding candidate. The whole legacy handler, parser, wrapper and AMM generated CPI remain nonidentical. Ambiguous mappings, indirect calls, data extents, allocator behavior and diagnostic differences remain explicit in the complete ledger; normalized counts do not measure completed source recovery.

## BuyV3 contracts

- [Buyback admission](../../pump/buy-v3-buyback-admission-contract/README.md) rejects a zero recipient before searching eight configured keys, distinguishes native account keys from token authorities, releases the token borrow before authorization, and preserves repeated ATA derivation for mismatch diagnostics. Extended token layouts remain unresolved.
- [Historical short-curve decoding](../../pump/buy-v3-short-curve-contract/REPORT.md) identifies nine complete layout ranges beginning at 49 total bytes, with explicit absent-field defaults, cursor behavior and InvalidAccountData/Borsh error distinctions.
- [Checked/unchecked decoder composition](../../pump/buy-v3-curve-decoder-composition/REPORT.md) supplies the corresponding one-file trait proposal, preserving 19 fields, the existing serializer and account declarations. It remains unintegrated: the trait is shared by six entrypoints, and admitting short layouts without their original preparation/growth would change surrounding behavior. All affected callers need review before promotion.
- [Residual pricing](../../pump/buy-v3-residual-pricing-contract/README.md) preserves the selected first/residual quantities, distinguishes first-leg floor-plus-one from residual ceiling, and recovers checked-add/error order. It separates total buyback from later adjusted amounts. Present-descriptor behavior, rich-error lowering and full caller composition remain unresolved.

These add no runtime coverage and do not establish preservation of the 117 saved BuyV3 rows. The current reconstruction remains partial. Previously stopped scopes are not resumed.

## Source review and promotion checks

The independent [Fees delta review](audit-fees-delta/REPORT.md) checks all 26 frozen source inputs and the 14 explicit functions in the changed module against retained original evidence. It finds no concrete new regression and proposes no additional patch. F1–F5 remain unresolved observations; F5 now describes conditional distribution of the prepared old holders. Legacy cleanup/CFG, the generated AMM CPI, transitive data, historical diagnostics and V2 reconstruction remain open. This is not a security sign-off.

Root independently verified the main package's saved comparisons and signatures, then checked its current tracked-source bindings. The [separate-copy checks](verification/fees-main-portability/summary.json) also pass with a minimal tracked repository; missing candidate, changed source, resealed wrong text binding and resealed changed receipt are rejected. These main-promotion checks do not edit executable bytes. They are integrity checks, not new target executions.

## Remaining acceptance

Every original byte remains part of comparison. The before/after snapshots retain complete mismatch ranges and separate raw compiler supplements from retained allocation images. Pump, AMM, Mayhem and dependency candidates are unchanged in this pass; their prior complete inventories remain applicable. Fees uses the new full inventory rather than historical offsets.

Remaining work includes authentic BuyV3 composition and residual/event inputs; Fees V2/nonzero-quote payouts and complete legacy/framework identity; AMM diagnostic/scalar/call/data gaps; Mayhem source/lowering and unresolved fields; ATA build ordering/relocations; Metaplex raw body/diagnostics; and Relay serializers/error allocation/remaining bodies. Original build provenance, transitive dependencies, excluded work and the complete security assessment remain unfinished. No artifact is represented as a deployable byte-identical replacement.

The [complete byte table and evidence index](REMAINING.md) link every current function ledger and hash-bind the reused analysis to the unchanged candidates. The full [before](before-corrections/summary.json) and [after](after-corrections/summary.json) snapshots retain every mismatching interval and excess tail, including raw compiler supplements. Positional byte differences are not an estimate of work remaining.
