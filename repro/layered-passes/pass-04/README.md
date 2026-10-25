# Layered reconstruction pass 04

**Acceptance remains 0/4 byte-identical core programs and 2/5 byte-identical dependency capture comparisons.** The four accepted core candidates still cover 140 bounded handlers, five partial handlers and 53,787 saved comparisons. Handler coverage is not a whole-program completion percentage. This pass reviews the current source, applies a supported Relay source correction, builds once, repeats the unchanged ordinary corpus, and regenerates every byte difference.

## Changes and verification

The [Relay serializer review](../../donation-relay/build05-serializer-review/README.md) found that the original returns a short-write error after one partial copy, while the previous Cursor specialization retries. The [new build](../../donation-relay/source-build-06-bpf-writer/README.md) uses the exact retained public BpfWriter source in its natural module, with the same compiler, dependency graph and flags. All 22 source inputs, seven tools, 53 SDK files and 232 dependency records are bound. The sole build passed with no backend stack diagnostic.

The 451,896-byte candidate is `522a9799bc3f73872333a16f3c95836ccfdcb816e80f159c7fc3dafa726e4fd4`. Its complete writer now has a 288-byte normalized match, a matching `sol_memcpy_` relocation and naturally matching writer source-location data. Its error constructor and complete account serializers still differ.

| Relay measure | Before | After |
| --- | ---: | ---: |
| Original windows with a raw body match | 29 | 33 |
| Original windows with a normalized body match | 110 | 120 |
| Original windows without a normalized match | 382 | 372 |
| Normalized pairs | 277 | 307 |
| Internal-call-shape fixed-point pairs | 111 | 132 |
| Different common-position bytes | 247,460 | 247,805 |
| Original-only bytes | 378,016 | 378,552 |
| Whole original equal | No | No |

Several new matches share framework helpers. These are not ten newly reconstructed application functions, and a normalized match does not prove its referenced data or callees equal. Positional byte counts can increase as code moves even when a source contract improves.

The [fresh ordinary replay](../../donation-relay/build06-ordinary12/README.md) passes all 12 unchanged cases, comprising five donation and seven IDL operations. Independent saved verification checks 24 submissions, 12 unique transactions, 25 unique signatures, 50 encoded signature fields and 24 effects. Only the harness's expected candidate hash changed in a recorded adapter; case definitions, comparator and normal signature/blockhash/history controls stayed unchanged. The prior strict 6009 source-origin failure remains unresolved and was not rerun.

## Source recovery carried forward

These are reviewed, unaccepted proposals or static contracts. None is substituted for a complete BuyV3 implementation or credited with preserving its 117 saved rows.

| Work | Concrete result | Still open |
| --- | --- | --- |
| [Buy preparation](../../pump/buy-v3-preparation-contract/REPORT.md) | Rent for max(length,166), native reserve calculation, temporary AccountInfo lifetimes, short-only realloc(166,false) | Short-layout parser admission and other modes |
| [Buy fees and mode](../../pump/buy-v3-fee-mode-contract/REPORT.md) | Complete-before-cashback errors; whitelist zero amounts and rates; clone lifetime across threshold/selection | Alternate-mode supply, diagnostics and complete caller integration |
| [Buy quote/vaults](../../pump/buy-v3-quote-vault-contract/REPORT.md) | Caller supplies create=false; vault ATA address/owner checks; distinct user owner/mint/authority checks | Extended decoding, buyback admission, recursive data/destructor closure |
| [Buy settlement](../../pump/buy-v3-settlement-contract/REPORT.md) | Combined base amount, reserve/accrual order, sequential native debit; successful whitelist validation rejoins zero-user initialization | Descriptor adjustments, whitelist validator semantics and event/exit closure |
| [Buy event and exit](../../pump/buy-v3-event-exit-contract/REPORT.md) | All 36 TradeEvent fields, three event layouts, 106-byte volume serialization within a 137-byte allocation, success-only exit | Descriptor-derived event inputs, complete event/CPI/error recursion and untested nonzero reserved tails |
| [Fees legacy caller](../../pump_fees/legacy-caller-reviewed-proposal/REPORT.md) | Typed generated CPI clients, owning AMM adapter, remaining-slice preprocessing, recipient filtering, early serialization and final validation order | New build/static/regression acceptance and separate V2 implementation |

Every Buy proposal keeps all 117 historical rows, including 105 successes, as requirements. Retaining those rows in a ledger is not passing them with the proposal. The inherited domain fences still exclude required cases; no compatibility dispatcher or fabricated success is introduced.

## Current source audit

Four parallel reviews cover the accepted source at `aa98fb45`. Root verified each package and its repository binding before refreshing the stale opening of `audit/AUDIT.md`.

| Program | Explicit functions reviewed | Account contexts | Complete ledger/report |
| --- | ---: | ---: | --- |
| Pump | 209 | 38 | [Review](audit-pump/REPORT.md), [coverage](audit-pump/COVERAGE.md) |
| AMM | 117 | 30 | [Review](audit-amm/REPORT.md), [coverage](audit-amm/COVERAGE.md) |
| Fees | 64 in-program | 30 | [Review](audit-fees/REPORT.md), [coverage](audit-fees/COVERAGE.md) |
| Mayhem | 61 | 15 | [Review](audit-mayhem/REPORT.md), [coverage](audit-mayhem/COVERAGE.md) |

Fees separately indexes eight standalone definitions and two external declarations. Pump's six excluded declarations stay opaque. No new confirmed vulnerability or independently justified source patch follows from these reviews. Qualified observations, lifecycle/alias assumptions, macro-generated code, dependency behavior, reconstruction gaps and stopped scopes prevent security sign-off. The inventories use stated lexical scope rules; they are not a machine-code audit percentage. Future source changes need renewed applicability review.

## Complete remaining inventory

The [before](before-corrections/summary.json) and [after](after-corrections/summary.json) snapshots include all nine program/dependency comparisons and two separate raw compiler supplements. Each snapshot retains every differing interval, tail and exact input hash. The [complete core function/call/data analysis](../pass-02/after-fixes/REPORT.md) still applies because accepted core sources are unchanged in this pass. The new Relay package regenerates all 492 original and 289 candidate windows, unresolved pairs, data references and raw residuals.

| Program or dependency | Unfinished work |
| --- | --- |
| Pump | Five partial instructions; authentic BuyV3 parser/preparation/mode/quote/settlement/event composition; other partial branches; unmatched helpers, calls, data, diagnostics and historical build provenance |
| AMM | Scalar-helper specialization, recipient/initializer diagnostics, unresolved calls/data, authentic successful initializer replay and whole-file identity |
| Fees | Acceptance of legacy caller recovery; V2 preprocessing and nonzero-quote payouts; exact context/CPI mapping, serializers, diagnostics, unresolved calls/data and whole-file identity |
| Mayhem | Non-initializer source/lowering gaps, five unresolved GlobalParams roles, formatting/diagnostics and whole-file identity; initializer remains excluded |
| SPL Token | Captured compiler output is exact; no new gap asserted |
| Token-2022 | Retained allocation image is exact; raw compiler output remains a separately reported artifact |
| ATA | 307 differing positions; original build/source ordering and three relocation bytes unresolved |
| Metaplex | 1,509 differing retained-image positions; local Utilize control-flow correspondence now established under explicit transformations, but raw body, diagnostic data, two relocation bytes and historical source remain unequal or unresolved |
| Relay | 372 unmatched original normalized windows; unequal serializers/error allocator/call/data ABI; source-origin rejection and unavailable fixed-authority success routes; whole-file identity |

The [independent-review reconciliation](REVIEW-RECONCILIATION.md) distinguishes earlier candidate observations from current accepted artifacts. A [separate dependency review](dependency-claims/REPORT.md) disproves the ATA `custom_panic` attribution and establishes stronger local Metaplex control-flow correspondence without accepting an unsupported byte-closure prediction. Historical records are preserved.

No binaries were patched, padded or rewritten; no compiler/version/flag search or fake source coordinates were used. There were no live-chain transactions. Existing source evidence remains the basis for subsequent review → correction → build → comparison passes.
