# Reconstruction status after PR #123 — 26 October 2026

Reviewed main revision: `a8f2a7b272bffc66988572928670c02630d7e946`.
This review updates the research frontier while preserving the selected-checkpoint
[baseline audit](RECONSTRUCTION-AUDIT.md). The [recomputed inventory](../repro/reconstruction-status-2026-10-26/README.md)
contains every one of the **4,415 selected/research function-window rows**.

## What is actually byte-identical?

**None of Pump, PumpSwap, Fees, Mayhem or Relay has a whole-file byte-identical
reconstruction. No public handler has an exhaustive semantic-equivalence proof.**

| Dependency | Exact result | Remaining qualification |
| --- | --- | --- |
| SPL Token | All 108,600 captured bytes reproduced | Preserve source/build provenance; byte equality is not a security audit |
| Token-2022 | All 611,056 meaningful ELF bytes reproduced | The full 1,382,016-byte capture is reproduced only by separately adding 770,960 zero bytes |
| Associated Token Account | All 105,032 bytes reproduced by two research recipes | Explicit linker ordering and an empty Cargo feature are non-historical recipes; authentic recipe and selected promotion remain unresolved |
| Metaplex Token Metadata | Not identical: 1,509 differing positions | 1,477 text bytes in Utilize, 30 source-coordinate bytes and two relocation bytes; allocation padding is a separate issue |

See the baseline audit's [dependency evidence](RECONSTRUCTION-AUDIT.md#1-whole-program-and-dependency-identity).
A generated allocation image is not an unchanged compiler output.

## Function status: exact, reconstructed but imperfect, and unresolved

A **raw local match** reproduces all bytes inside an inferred original function
window. It can still reference different data or call different destinations at
its new address. A **normalized match** reproduces the complete body only after
the owning study masks specified calls/relocated pointers. It is not byte identity.
**Unmatched** means no full counterpart under that matcher, not necessarily absent
Rust source. **Opaque** means the source ledger has not admitted it for normalized
analysis. Candidate symbol names are hypotheses about original identity.

| Program / build | Original windows | Exact local bytes | Normalized only | No complete match | Opaque without raw match |
| --- | ---: | ---: | ---: | ---: | ---: |
| Pump selected | 1,035 | 98 | 430 | 507 | 0 |
| PumpSwap selected | 785 | 93 | 395 | 297 | 0 |
| Fees selected | 585 | 102 | 363 | 120 | 0 |
| Mayhem selected | 441 | 58 | 131 | 7 | 245 |
| Relay selected source 15 | 492 | 33 | 89 | 370 | 0 |
| **Fees latest research** | **585** | **107** | **393** | **85** | **0** |
| **Relay latest research** | **492** | **130** | **350** | **12** | **0** |

Each row is a partition, not a score of semantic correctness. Mayhem's source
ledger has 257 opaque windows, 12 of which happen to match local raw bytes.
Selected Fees retains two call-conflicting rows; body existence does not resolve
those conflicts. Different programs and studies use different matching rules.

- [Every exact local body, with candidate names and original addresses](../repro/reconstruction-status-2026-10-26/raw-body-matches.md).
- [Every matched/unmatched/opaque window and candidate correspondence](../repro/reconstruction-status-2026-10-26/functions.tsv).
- [Every unmatched or opaque window](../repro/reconstruction-status-2026-10-26/remaining-windows.md).
- [All 150 named public-handler dispositions and known gaps](../repro/reconstruction-audit-2026-10-26/handlers.md).

Examples of exact local matches include standard formatting/string helpers in
Pump/AMM/Fees and numeric/runtime helpers in Mayhem. Recent Relay recovery also
reproduces the repeated `StringError` type-ID bodies. These are not grounds for
calling whole trade or donation handlers perfect.

## How much remains?

The strongest Relay research candidate matches **480/492 windows (97.6% by
window count)**. Its 12 unmatched windows span **57,968 of 752,488 original text
bytes (7.7%)**. Those bytes describe the sizes of unmatched original windows,
not the number of absent or incorrect bytes. The residual includes large business
functions; matching the other 480 still leaves their call/data identity to prove.

Fees research has **500/585 windows with a normalized counterpart**: 353 unique
structural pairs and 147 original windows in ambiguous duplicate groups. Its 85
unmatched windows span **348,264 of 799,648 original text bytes (43.6%)**, although
they are only 14.5% of the window count. Many remaining bodies are large. The
older 53 duplicate-call attributions are historical evidence and have not been
recomputed for this candidate; do not add them to 353 as a new verified total.

There is no defensible single source-completion percentage or ETA. Whole-program
identity additionally requires data, layout, relocations, indirect calls and
build-input recovery, and behavior needs broader successful/rejected execution.

## Relay: the complete remaining body list

The labels below are working source attributions from the recovery studies,
not symbols authenticated from the stripped original. Every row remains
unmatched in the combined source-location candidate on both tested build recipes.

| Original ordinal | Address | Bytes | Working attribution / next comparison |
| --- | ---: | ---: | --- |
| 90 | 64,824 | 2,496 | Jupiter CPI builder: account ordering and instruction construction |
| 92 | 70,200 | 6,272 | Native donation body: transfers, bookkeeping and error paths |
| 93 | 76,472 | 6,272 | Native-pubkey donation variant |
| 94 | 82,744 | 2,568 | Regular donation body |
| 95 | 85,312 | 2,568 | Payer donation variant |
| 96 | 87,880 | 4,000 | Epoch close: state updates, checked increment and transfer |
| 97 | 91,880 | 5,216 | Distribution after swap |
| 98 | 97,096 | 5,696 | Distribution without swap |
| 99 | 102,792 | 4,448 | Swap-only body |
| 100 | 107,240 | 5,328 | Swap then distribute |
| 109 | 127,704 | 2,856 | Burn/close helper: ownership, drops and CPI construction |
| 112 | 131,136 | 10,248 | Shared donation worker and its error/data paths |

The former 27-window frontier is obsolete. Subsequent studies recovered receipt
coordinates (one), Token-2022/framework versions (four), framework/sysroot and
share-error behavior (nine), and the mint-fee predicate (one), without losing
previous normalized matches. Source-location recovery separately resolves all
43 differences in a fixed audited cohort of 346 location references; it does not
add another matched function or establish all-data identity.

Both combined candidates pass fresh **536 replay records / 534 unique fixtures**.
The Darwin-compiler/Linux-library candidate is 818,216 bytes, SHA-256
`54838343d646f7d79ab6183cc3d86a6a8d63eaa7b2247be0c015a9650528d26b`.
The full Linux candidate is also 818,216 bytes, SHA-256
`620777542fc7dc0507492718c4f5a3e95049c420ede0238a3d9b0c4282973a01`.
Their equal frontier does not imply equal ELF files or recovered historical tools.
The 64-byte length difference from the original's meaningful ELF is not an
estimate of remaining code. Privileged successes and allocation-failure paths
remain outside the claimed fresh replay coverage.

Evidence: [source-location recovery](../repro/donation-relay/source-location-recovery/README.md),
[Linux reproduction](../repro/donation-relay/linux-canonical-reproduction/README.md),
[framework recovery](../repro/donation-relay/framework-sysroot-recovery/README.md).

## Fees: new complete bodies, substantial residual business logic

The latest 851,424-byte candidate is SHA-256
`638eec2f01e3ad6412e0f61b0e0ac0836bbc4e61dcbde615b4e1d6cfec758a40`.
The newly merged studies recover:

| Complete original window | Evidence |
| --- | --- |
| 696-byte `update_buyback_authority` body at 96,896 | [Source path/guard recovery](../research/fees-buyback-update-origins/README.md) |
| 640-byte `update_buyback_claim_rate_limit` body at 97,592 | Same study; helper inlines into the public body |
| 336-byte Shareholder-vector clone at 58,520 | [`Copy` specialization](../research/fees-shareholder-copy-clone/README.md); both encoded callees independently bound to raw-equal helpers |
| 600-byte buyback initializer at 120,216 | [Unchanged helper relocated to its diagnostic source path](../research/fees-buyback-initializer-origin/README.md) |

These are complete normalized windows, not merely matching diagnostic fragments.
There are 57 unique raw-equal structural pairs; counting all original windows
with any raw counterpart, including ambiguous duplicates, gives 107. Those
numbers answer different questions and must not be interchanged.

The candidate retains passing **17,331 cases across 18 suites** and **1,542 exact
outcome/log/compute comparisons**. The initializer proposal was replayed afresh;
its identical control receipts were reused explicitly. Existing unchecked-input
and finite-coverage limits remain. The 85 unresolved bodies, ambiguous attribution,
shareholder validation, transitive calls/data and final ELF layout remain open.

## Public behavior: reconstructed is not perfect

Across the four core selected programs, **140/150 handlers have bounded
implementations, five are partial, and five are unaccepted/unrecovered**. This
count excludes the separately tracked Relay. In particular:

| Program | Partial / unaccepted selected handlers | Other known gaps |
| --- | --- | --- |
| Pump | Partial: `buy_v3`, `sell_v3`, `buy_exact_quote_in_v3`, `create_v2`, `multi_hop_curve_swap`. Unaccepted: `admin_update_token_incentives`, `claim_token_incentives`, `set_mayhem_virtual_params` | `sell_v2` quote transfer-fee minimum-output/event discrepancy; full extension, account, error precedence and event coverage |
| PumpSwap | `create_config` successful fixed-admin initialization lacks accepted runtime validation | 297 unmatched windows, 160 ambiguous normalized rows, call/data and diagnostics |
| Fees | All 31 selected handlers have bounded coverage | Does not make remaining business bodies exact or establish all-state equivalence |
| Mayhem | `initialize_mayhem_state` unaccepted in selected build; corrected overlay has rejection and real Pump-CPI evidence | Seven admitted unmatched bodies, 257 opaque rows, diagnostic/error differences and five unknown GlobalParams field roles |

The overlay supplies implementations for previously absent selected entrypoints,
but cannot acquire selected status by documentation. Candidate rebuilding, bound
receipts, acceptance decisions and explicit guard changes are still required.

## Recommended execution order and completion criteria

1. **Continue Relay body recovery:** isolate one ordinary Rust change per trial,
   starting with epoch close / burn-close and the shared donation worker. Keep
   negative trials; require no lost normalized matches and fresh replay of any
   proposed candidate. Do not infer a match from equal sizes or fuzzy similarity.
2. **Close known behavior defects:** Pump `sell_v2` and the ten partial/unaccepted
   selected dispositions above, with bound success/rejection tests. Cover genuine
   CPI callers, ownership and extension/mode combinations before acceptance.
3. **Continue Fees business/source recovery:** work from all 85 residual addresses,
   rerun duplicate-call attribution on the current binary, and validate paths not
   exercised by the existing corpus. Normalize only declared relocations/calls.
4. **Recover Pump/AMM/Mayhem residuals:** preserve opaque and ambiguous states.
   Pump's separate workspace-member experiment reaches 538 normalized windows
   with 497 residuals, but is not the selected 528-window candidate.
5. **Close data and build identity:** recover constants, strings, layout,
   relocations, indirect targets and authentic tool/dependency inputs; complete
   Metaplex and resolve ATA selection/provenance independently.
6. **Promote only with evidence:** source snapshot, locked build inputs, actual
   fresh compiler invocation, exact candidate hashes, replayed behavior and
   reviewed selection/guard updates. Final byte acceptance requires unchanged
   compiler output equality, separately labeling any allocation padding.

Security and operational acceptance remain distinct from reproduction. All tests
here are local; no live network action is part of this review.

## Reproduce this review

```sh
python3 -B repro/reconstruction-audit-2026-10-26/audit.py --check
python3 -B research/fees-shareholder-copy-clone/verify.py
python3 -B research/fees-buyback-initializer-origin/verify.py
python3 -B repro/donation-relay/source-location-recovery/verify.py
python3 -B repro/reconstruction-status-2026-10-26/refresh.py --check
```

These verify retained evidence and rederive byte/window inventories; they are not
new compiler builds or fresh VM executions. The owning packages record those
builds and replays. The new inventory preserves the old selected 3,338 rows and
recomputes the 1,077 current research rows directly from their artifacts.
