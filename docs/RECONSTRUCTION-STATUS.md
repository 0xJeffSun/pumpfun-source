# Reconstruction status after burn/close recovery — 26 October 2026

Reviewed evidence revision: `725fb7e7ec7eb6442fd4062fb04b5cbe5b9dcb68`.
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
| **Fees latest research** | **585** | **109** | **400** | **76** | **0** |
| **Relay latest research** | **492** | **130** | **352** | **10** | **0** |

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

The strongest Relay research candidate matches **482/492 windows (98.0% by
window count)**. Its 10 unmatched windows span **52,616 of 752,488 original text
bytes (7.0%)**. Those bytes describe the sizes of unmatched original windows,
not the number of absent or incorrect bytes. The residual includes large business
functions; matching the other 482 still leaves their call/data identity to prove.

Fees research has **509/585 windows with a normalized counterpart**: 362 unique
structural pairs and 147 original windows in ambiguous duplicate groups. Its 76
unmatched windows span **339,424 of 799,648 original text bytes (42.4%)**, although
they are only 13.0% of the window count. Many remaining bodies are large. The
[current call ledger](../repro/reconstruction-status-2026-10-26/fees-call-attribution.json)
recomputes 61 additional duplicate-body correspondences on this candidate, for
423 attributed pairs. There are 86 still-unattributed duplicate windows and 24
call edges to different-body frontiers. This refinement adds no body coverage.

There is no defensible single source-completion percentage or ETA. Whole-program
identity additionally requires data, layout, relocations, indirect calls and
build-input recovery, and behavior needs broader successful/rejected execution.

## Relay: the complete remaining body list

The labels below are working source attributions from the recovery studies,
not symbols authenticated from the stripped original. Every row remains
unmatched in the current burn/close-recovery candidate on both tested build recipes.

| Original ordinal | Address | Bytes | Working attribution / next comparison |
| --- | ---: | ---: | --- |
| 92 | 70,200 | 6,272 | Native donation body: transfers, bookkeeping and error paths |
| 93 | 76,472 | 6,272 | Native-pubkey donation variant |
| 94 | 82,744 | 2,568 | Regular donation body |
| 95 | 85,312 | 2,568 | Payer donation variant |
| 96 | 87,880 | 4,000 | Epoch close: state updates, checked increment and transfer |
| 97 | 91,880 | 5,216 | Distribution after swap |
| 98 | 97,096 | 5,696 | Distribution without swap |
| 99 | 102,792 | 4,448 | Swap-only body |
| 100 | 107,240 | 5,328 | Swap then distribute |
| 112 | 131,136 | 10,248 | Shared donation worker and its error/data paths |

The former 27-window frontier is obsolete. Subsequent studies recovered receipt
coordinates (one), Token-2022/framework versions (four), framework/sysroot and
share-error behavior (nine), the mint-fee predicate (one), the Jupiter optional-seed builder (one), and burn/close ownership (one),
without losing previous normalized matches. Source-location recovery separately resolves all
43 differences in a fixed audited cohort of 346 location references; it does not
add another matched function or establish all-data identity.

Both current burn/close-recovery candidates pass fresh **536 replay records / 534 unique fixtures**.
The Darwin-compiler/Linux-library candidate is 818,096 bytes, SHA-256
`1eaf3af16fdafdfa9d2ca47e88c07a7f15f13b88aa57df1f63c655c10a1616e2`.
The full Linux candidate is also 818,096 bytes, SHA-256
`c6ae09b906b3c6a88042e40b02e0a2f6598268061d7527b667c0e631655a3921`.
Their equal frontier does not imply equal ELF files or recovered historical tools.
The 184-byte length difference from the original's meaningful ELF is not an
estimate of remaining code. Privileged successes and allocation-failure paths
remain outside the claimed fresh replay coverage.

Evidence: [source-location recovery](../repro/donation-relay/source-location-recovery/README.md),
[Linux reproduction](../repro/donation-relay/linux-canonical-reproduction/README.md),
[framework recovery](../repro/donation-relay/framework-sysroot-recovery/README.md).

### Jupiter is now a complete normalized match

The [optional-seed recovery](../repro/donation-relay/jupiter-option-source-recovery/README.md)
closes all four instructions left by the earlier iterator-clone trial. The
original tests the optional slice pointer, whereas the earlier source tested
slice length. `Option<&[&[&[u8]]]>` with a Rust `match` reproduces the entire
2,496-byte window on both compiler recipes. The caller passes `Some(seeds)`.
All 11 direct-call sites bind to complete matched callees. The location audit
retains its original 346 equal pairs and adds two, for 348/348 equal pairs.
This is normalized body recovery, not raw whole-file or exhaustive semantic
identity. Nineteen further metadata-construction trials and an `if let` variant
are retained as negative controls. The earlier 32 burn/close trials remain
negative; the subsequent ownership recovery below resolves window 109.

### Burn/close is now a complete normalized match

The [mint-ownership recovery](../repro/donation-relay/burn-mint-ownership-recovery/README.md)
resolves window 109 by consuming the mint in the nonzero burn and fully
destructuring the input context. This recovers the original conditional cleanup
and return layout. All 24 direct-call sites bind to matched callees; the same
348 source-location pairs remain equal. Both compiler recipes match the complete
2,856-byte body and pass fresh bounded replay. No whole-file or exhaustive
semantic identity is claimed. Thirty-six epoch-close trials remain negative;
epoch-close window 96 is still in the ten-row residual list.

### Donation controls: no new complete body match

The [59 source builds](../repro/donation-relay/donation-source-controls/README.md)
cover construction/argument variants in donation wrappers and ownership/result
variants in the shared worker. All 173 targeted window comparisons remain
unmatched. Some ownership variants also lose the previously matched context-drop
window 51. The control builds reproduce their respective 482-window parent
binaries exactly; experimental candidates are not promoted. This rules out the
tested source forms without claiming that all donation logic is understood.

### Shared-worker cleanup: verified graph, unresolved source

The [shared-worker flow audit](../repro/donation-relay/shared-worker-flow-audit/README.md)
shows that all paths in the conservative decoded graph to an explicit return
pass through the matched context-drop helper, in both original and current
workers. This also holds after the transfer call. The drop block is at different
linear offsets (3,152 versus 352); those positions do not establish a different
ownership boundary. Calls are assumed to return and branch feasibility is not
proved. Five further mint-key/whitelist source builds all retain 482 matches
without recovering the worker. Preserve the common cleanup while investigating
source expression and lifetimes; no experimental source is promoted.

### Donation wrapper argument-binding controls

The [complete 32-subset study](../repro/donation-relay/partial-argument-controls/README.md)
tests every subset of the five wire-argument fields as partial local bindings,
with the remaining fields read through `args`. All 128 comparisons of windows
92–95 remain unmatched. No subset gains or loses any full-window match. This
rules out partial argument binding alone under the tested compiler recipe; it
does not rule out different source layouts, ABI choices or compiler inputs.
The ten-window residual remains unchanged.

### Conditional wrapper value-flow diagnostic

The [caller diagnostic](../repro/donation-relay/wrapper-value-flow/README.md)
compares regular and payer wrappers on modeled success/error paths. Selected
context and argument fields match at the shared-worker boundary, and selected
return fields match given identical abstract worker results. This depends on
explicit clone/copy summaries, nonwrapping increments and the input-address
model; arbitrary aliases and real callee effects are not proved. The four
conditional traces add no body matches or accepted handlers. Both wrappers and
the shared worker remain in the residual list.

### Epoch-close source controls

The [fourteen epoch-close controls](../repro/donation-relay/epoch-source-controls/README.md)
test cached configuration/mint fields and checked-add error/Result forms. None
recovers original window 96, and all retain the 482-window frontier. Most error
forms compile to the same body; explicit eager conversion changes the body but
does not match. The observed post-conversion branch remains a diagnostic clue,
not proof of a particular source expression. A separate cached v1.50 compiler
substitution, retaining v1.48 libraries and linker, regresses to 226 normalized
matches (256 lost, none gained). That combination is rejected; it does not
establish the original compiler or evaluate every v1.50 recipe.

### Root-profile and Result-helper controls

The [twelve additional builds](../repro/donation-relay/profile-result-controls/README.md)
include an exact baseline control and four root compiler overrides. Opt-level 2,
s, z and codegen-units 2 retain 382, 316, 314 and 372 normalized windows,
respectively, with no new original match. Seven Result-helper source trials keep
482 matches. A unit-returning error helper reproduces the already-matched
504-byte window 115, illustrating that identical local shape does not uniquely
identify its original return type. Epoch close and the shared worker remain
unmatched; no candidate from this packet is promoted.

### Shared-worker arithmetic and ordering controls

The [six arithmetic/ordering builds](../repro/donation-relay/arithmetic-order-controls/README.md)
test in-place checked operations and a separately named tip division. None
recovers window 112 or changes the 482-window frontier. Both tip-only forms
reproduce the existing candidate exactly, so that source distinction is removed
by this compiler. The unit-result helpers do not recover their caller; no trial
is promoted or newly runtime-accepted.

### Swap caller constructor order and layout

The [swap-caller controls](../repro/donation-relay/swap-caller-controls/README.md)
retain compiler-generated layouts for the reconstructed account/context types;
the diagnostic build reproduces the current candidate exactly. Moving the
program field to the end of the `just_swap` burn-context initializer removes an
extra memcpy call, agreeing with the original call count. Its body is still
4,408 bytes versus the original 4,448 and remains unmatched. A fresh replay of
both original and this partial correction passes 536 records / 534 unique
fixtures with the existing exclusions. Four argument-wrapper variants remain
negative. No candidate is promoted and the frontier remains 482/492.

### Settlement direct-call inventory

The [direct-call audit](../repro/donation-relay/settlement-call-audit/README.md)
checks original windows 97–100 against the baseline and constructor-order
candidate. Every direct local callee has a normalized-body counterpart. Callee
body-group multiplicities agree for three baseline callers and all four after
the constructor change removes one memcpy. Linear call sequences and caller
bodies still differ. This narrows missing-call hypotheses without proving
arguments, inline checks, branch conditions, data or transitive behavior; no
additional function is considered recovered.

## Fees: new complete bodies, substantial residual business logic

The latest 859,256-byte candidate is SHA-256
`17d51bc9c2196a46ffa25cefd7d90beaa02e0682a765f8463364ab29ccce1b14`.
The newly merged studies recover:

| Complete original window | Evidence |
| --- | --- |
| 696-byte `update_buyback_authority` body at 96,896 | [Source path/guard recovery](../research/fees-buyback-update-origins/README.md) |
| 640-byte `update_buyback_claim_rate_limit` body at 97,592 | Same study; helper inlines into the public body |
| 336-byte Shareholder-vector clone at 58,520 | [`Copy` specialization](../research/fees-shareholder-copy-clone/README.md); both encoded callees independently bound to raw-equal helpers |
| 600-byte buyback initializer at 120,216 | [Unchanged helper relocated to its diagnostic source path](../research/fees-buyback-initializer-origin/README.md) |
| 3,320-byte authority-update body at 103,408 | [Preserved body tokens and diagnostic source coordinates](../research/fees-authority-body-origin/README.md) |
| 776-byte legacy account cleanup and 1,072-byte dispatcher | [Owned account/context recovery](../research/fees-sharing-owned-legacy/README.md); cleanup raw bytes equal |
| 192-byte fee-total predicate at 700568 | [Full Linux integration](../research/fees-total-predicate-integration/README.md); panic leaf, message and source coordinates checked |
| Two 624-byte setters at 260568 and 261192 | [Setter recovery](../research/fees-config-setter-recovery/README.md); error origins, field stores and ten direct callee bindings checked |
| V2 parser (352 bytes), cleanup (776 bytes), dispatcher (1,104 bytes) | [V2 ownership](../research/fees-sharing-owned-v2/README.md), integrated with the setters; cleanup raw bytes equal |

These are complete normalized windows, not merely matching diagnostic fragments.
There are 59 unique raw-equal structural pairs; counting all original windows
with any raw counterpart, including ambiguous duplicates, gives 109. Those
numbers answer different questions and must not be interchanged.

The candidate retains passing **17,331 cases across 18 suites** and **1,542 exact
outcome/log/compute comparisons**. The corrected setter and combined V2 candidates were replayed afresh;
the control is explicitly reused from the verified predicate packet. Existing unchecked-input
and finite-coverage limits remain. The 76 unresolved bodies, ambiguous attribution,
shareholder validation, transitive calls/data and final ELF layout remain open.

The [fee-total helper](../research/fees-total-predicate-integration/README.md)
and [flat-fee setters](../research/fees-config-setter-recovery/README.md) now have
complete normalized bodies. The setters preserve the observed error locations
and each of their five local callees has a matching body. Their public callers
and the two 4,160-byte tier-setting bodies remain unmatched. These are local
recoveries, not a complete configuration-path or transitive-equivalence proof.

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
   starting with epoch close and the shared donation worker. Keep
   negative trials; require no lost normalized matches and fresh replay of any
   proposed candidate. Do not infer a match from equal sizes or fuzzy similarity.
2. **Close known behavior defects:** Pump `sell_v2` and the ten partial/unaccepted
   selected dispositions above, with bound success/rejection tests. Cover genuine
   CPI callers, ownership and extension/mode combinations before acceptance.
3. **Continue Fees business/source recovery:** work from all 76 residual addresses,
   preserve the refreshed duplicate-call attribution, and validate paths not
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
python3 -B research/fees-authority-body-origin/verify.py
python3 -B research/fees-refreshed-call-attribution/verify.py
python3 -B repro/donation-relay/burn-mint-ownership-recovery/verify.py
python3 -B repro/reconstruction-status-2026-10-26/refresh.py --check
```

These verify retained evidence and rederive byte/window inventories; they are not
new compiler builds or fresh VM executions. The owning packages record those
builds and replays. The new inventory preserves the old selected 3,338 rows and
recomputes the 1,077 current research rows directly from their artifacts.
