# Reconstruction status after exact Relay ELF reproduction

Reviewed parent revision: `45f79b7edd4af70e0933183b09287736eb5c340b`; new measurements are bound to the packets below.
This review updates the research frontier while preserving the selected-checkpoint
[baseline audit](RECONSTRUCTION-AUDIT.md). The [recomputed inventory](../repro/reconstruction-status-2026-10-26/README.md)
contains every one of the **4,415 selected/research function-window rows**.

The [comprehensive review](../repro/reconstruction-status-2026-10-26/review.md)
reconciles all 150 named handlers and all 4,415 window rows, gives unresolved
text size for every build and lists the largest remaining bodies. Its
[machine-readable summary](../repro/reconstruction-status-2026-10-26/review.json)
is regenerated from the verified inventory. No new runtime coverage is claimed
by this documentation review itself. Later sections preserve historical measurements;
the opening tables and final integration section give the current frontier.

## What is actually byte-identical?

**The four core selected programs remain byte-unequal. Canonical Relay now has an
exact meaningful ELF and a separately loader-reproduced captured payload. Its
linker recipe is reconstructed; no public handler has an exhaustive semantic proof.**

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
| Relay historical source 15 | 492 | 33 | 89 | 370 | 0 |
| **Fees latest research** | **585** | **143** | **434** | **8** | **0** |
| **Mayhem latest research** | **441** | **70** | **356** | **15** | **0** |
| **Relay canonical selection** | **492** | **492** | **0** | **0** | **0** |

The current research rows are bound to the [Fees sharing slice recovery](../research/fees-sharing-slice-recovery/README.md) and [Mayhem source/data recovery](../research/mayhem-source-data-recovery/README.md); they extend the dated generated inventory below. Each row is a partition, not a score of semantic correctness. The selected Mayhem source
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

The [exact Relay reproduction](../repro/donation-relay/linked-elf-reproduction/README.md)
matches **all 818,280 meaningful ELF bytes**, including **492/492 raw bodies**,
every call target, data pointer and relocation. Two Rust builds agree, including
a fresh isolated dependency build with no original binary mounted. The explicit
linker layout is inferred from the capture, not established as historical.
Fresh bounded replay passes 536 signed records / 534 fixtures. A separate fresh
912-transaction loader deployment reproduces the entire **830,448-byte captured
payload**, with 12,168 zero bytes allocated by the loader. Compiler output is
not padded. ProgramData metadata/history and broader runtime acceptance remain separate
requirements. The source and exact artifact are now canonically selected.

The latest [Fees composition](../research/fees-sharing-slice-recovery/README.md) has **577/585 normalized counterparts**, including 143 raw-local matches. Eight unmatched windows span **80,176 of 799,648 original text bytes (10.0%)**. It retains 430 unique structural pairs, 181 equal Location observations and 3,870 equal direct-callee observations out of 3,877 inspected. The seven remaining unequal direct-callee observations and whole-program data/layout are unresolved. Two native Rust builds agree. Fresh execution passes 17,331 cases across 18 suites, with equal application logs in all 6,413 cases that carry them. These are bounded observations, not whole-ELF identity.

The separately pinned, dated Fees inventory has **558/585 windows with a normalized counterpart**: 411 unique
structural pairs and 147 original windows in ambiguous duplicate groups. Its 27
unmatched windows span **189,248 of 799,648 original text bytes (23.7%)**, although
they are only 4.6% of the window count. Many remaining bodies are large. The
[current call ledger](../repro/reconstruction-status-2026-10-26/fees-call-attribution.json)
recomputes 69 additional duplicate-body correspondences on this candidate, for
480 attributed pairs. There are 78 still-unattributed duplicate windows and 13
call edges to different-body frontiers. This refinement adds no body coverage.

There is no defensible single source-completion percentage or ETA. Whole-program
identity additionally requires data, layout, relocations, indirect calls and
build-input recovery, and behavior needs broader successful/rejected execution.

### Artifact-backed shared-worker recovery

The [shared-worker artifact packet](../repro/donation-relay/shared-worker-artifact-recovery/README.md)
independently rebuilds the source-only proposal with the official Linux v1.48
SDK. A fresh baseline reproduces the prior `c6ae09b…` / `786d745…` artifacts;
the recovered build reproduces the proposal's `bdd03c77…` / `1ca9e99a…` hashes.
Only worker 112 is gained, no normalized/raw window is lost, and all 51 worker
callee bodies match. Fresh replay passes 536 records / 534 unique fixtures.

That packet established the 483-window checkpoint on its isolated pre-metadata
source state. The [new settlement artifact packet](../repro/donation-relay/settlement-artifact-recovery/README.md)
independently builds the later combined source: epoch close, swap-only and three
settlement bodies now match as well. Its fresh 485-window control and 488-window
result reproduce the published hashes exactly. All 99 direct callees of the
three new settlement bodies match, and fresh replay passes 536 records.
The complete read-only data section is raw-equal; 359 positional data pointers
and 507 nonpointer qwords recheck. Five text targets contain indirect calls, so
these data checks do not establish arbitrary runtime or transitive semantics.

## Relay: the complete remaining body list

There are now no unmatched normalized Relay windows. The four former residuals
below are raw body-equal in the current wrapper artifact. Their labels remain
working source attributions, not authenticated original symbols.

| Original ordinal | Address | Bytes | Working attribution / next comparison |
| --- | ---: | ---: | --- |
| 92 | 70,200 | 6,272 | Native donation body: transfers, bookkeeping and error paths |
| 93 | 76,472 | 6,272 | Native-pubkey donation variant |
| 94 | 82,744 | 2,568 | Regular donation body |
| 95 | 85,312 | 2,568 | Payer donation variant |

The former 27-window frontier is obsolete. Subsequent studies recovered receipt
coordinates (one), Token-2022/framework versions (four), framework/sysroot and
share-error behavior (nine), the mint-fee predicate (one), the Jupiter optional-seed
builder (one), burn/close ownership (one), and the shared donation worker (one),
without losing previous normalized matches. The latest combined source adds
epoch close, swap-only and three settlement bodies, reaching 488. The wrapper
artifact then recovers all four rows above, reaching 492.
Source-location recovery separately
resolves all 43 differences in a fixed audited cohort of 346 location references;
it does not add another matched function or establish all-data identity.

The current settlement candidate passes fresh **536 replay records / 534 unique fixtures**.
It is 818,392 bytes, SHA-256
`e98ef5d4453ea93ab8189b35d7183a0777b2bf3ee46f87497a11700c263f55a3`.
The separate 485-window baseline is 818,400 bytes, SHA-256
`95a5eb2f7a29be9dfe890c93c8f388533c403e999e370e2e00f665c8c49218c6`.
Both were built from fresh target directories with unchanged source inputs.
The candidate's 112-byte excess over the meaningful original ELF is not an
estimate of remaining code. Privileged settlement successes and allocation-failure
paths remain outside the retained replay coverage.

Evidence: [source-location recovery](../repro/donation-relay/source-location-recovery/README.md),
[Linux reproduction](../repro/donation-relay/linux-canonical-reproduction/README.md),
[framework recovery](../repro/donation-relay/framework-sysroot-recovery/README.md).

### Relay metadata now reproduced from source

The [security-metadata recovery](../repro/donation-relay/security-metadata-source-recovery/README.md)
uses ordinary `solana-security-txt` 1.1.3 source to reproduce the full 510-byte
payload and all 247 bytes of `.dynstr`, including the `SECURITY_TXT` export.
Its 818,664-byte Linux candidate is SHA-256
`af837c4491a267e144cfb0cb7e1fc6772f22ddd353ada93de2b1286489d4beea`.
The packet rederives 482/492 normalized matches, 130 raw-local matches, the same
348 equal source-location pairs and 536 fresh replay records / 534 unique
fixtures. There are no new or lost instruction-window matches. This is the earlier metadata-only candidate. The current inventory instead binds
the independently built settlement artifact, which preserves full read-only data
equality while adding later instruction-body recoveries.

The original meaningful ELF is 818,280 bytes; its captured allocation also has
12,168 trailing zero bytes. This candidate contains no added allocation padding
and still differs as a whole file. The string object and relocation are present,
but their addresses and other section contents still require recovery. These
results do not establish historical source authenticity or broader semantics.

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

The latest 861,000-byte candidate is SHA-256
`fe11df62162e27700890e5dcd07d5760a66f5528fd89de4b523975dbfc38f112`.
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
| Two 4,160-byte tier bodies, 368-byte reserve and 200-byte slice-length-mismatch panic bodies | [Tier replacement/upsert recovery](../research/fees-tier-splice-recovery/README.md); 57 direct callee-body bindings checked |
| Configuration/stable updates (2,608 / 2,568 bytes), normal/stable upserts (2,528 bytes each) | [Event and admin-source recovery](../research/fees-config-event-recovery/README.md); duplicate upserts distinguished by outgoing calls |

These are complete normalized windows, not merely matching diagnostic fragments.
There are 64 unique raw-equal structural pairs; counting all original windows
with any raw counterpart, including ambiguous duplicates, gives 118. Those
numbers answer different questions and must not be interchanged.

The candidate retains passing **17,331 cases across 18 suites** and **1,542 exact
outcome/log/compute comparisons**. The current context-origin candidate was replayed afresh;
its control reuses the verified buyback-context artifact. Existing unchecked-input
and finite-coverage limits remain. The 58 unresolved bodies, ambiguous attribution,
shareholder validation, transitive calls/data and final ELF layout remain open.

The fee-total helper, flat-fee setters, tier helpers and four configuration/upsert
public callers now have complete normalized counterparts. The upserts share a
body shape but are distinguished by their callee targets; both local outgoing
checks and the global incoming-call refinement agree. Other callers, referenced
data and full transitive behavior remain open. These matches do not establish
whole-program or exhaustive semantic equivalence.


The [exotic-fee growth study](../research/fees-exotic-growth-precedence/README.md)
adds 24 signed boundary cases crossing allocation size, account/admin funding,
invalid totals and overflow. The previous research candidate disagrees in four
cases; moving validation after growth and using the original false zero-init
flag removes all four. The corrected research candidate passes the existing
17,331-case suite and 1,542-case exact matrix too. Its 5,664-byte caller still
differs from the original's 5,520 bytes, so coverage remains unchanged. A
same-sized experimental body also fails full comparison and is not accepted.

### Optional account ownership: two recovered bodies

The [optional-account ownership study](../research/fees-optional-account-ownership/README.md)
changes only the optional AMM event authority from borrowed unchecked account
to owned `AccountInfo`. It recovers original 10,232 (528-byte normalized parser)
and 41,560 (160-byte raw-equal cleanup), with no lost matches. Both direct calls
in the optional parser bind to matched callee bodies. The enclosing account
parser remains unmatched. The new candidate passes fresh 17,331 suite cases,
1,542 exact comparisons, 24 retained growth-boundary cases and 32 new signed
optional-account cases. The 32-case matrix compares state, errors, lamports,
events and inner instructions; it makes no log/compute equality claim.

### Social-claim signing-seed vector

The [seed-vector recovery](../research/fees-social-seed-vector/README.md) copies
the stored user-ID bytes before constructing V2 token-claim signing seeds. It
recovers original 51,608 (296 bytes) with raw differences restricted to two call
immediates, both targeting complete matched bodies. No matches are lost. The
claim caller remains unmatched. Fresh suite, exact-matrix, growth and optional
replays pass; 20 extra cases cross native/token paths, token programs and user-ID
byte lengths including UTF-8. They compare state/errors/events/CPI/return data,
not all logs or compute.

### Extension no-resize messages

The [extension-size log study](../research/fees-extend-size-logs/README.md) restores
the original exact-size and oversized-account messages. Its eight signed cases
show program-log disagreement in the parent and agreement in the new candidate,
with other observed results unchanged. The change also recovers the complete
448-byte formatting helper at 52,568, with only three call-immediate differences
and matched callees. The larger resize handler remains unmatched. One previously
normalized 24-byte window also becomes raw-equal due to the new layout; that
adds no new body coverage. Fresh regression and all retained focused matrices pass.

### Crank boxed interface mint

The [crank mint recovery](../research/fees-crank-interface-mint/README.md) replaces
the research legacy mint account with a boxed interface mint. Original window
9,880 now matches completely; existing windows 640 and 693,080 become unique as
redundant candidate specializations disappear. That is one new body match and
two fewer structural ambiguities. All three parser callees match, and the
larger account parser remains unmatched. Thirty new signed owner/length cases
correct ten observed discrepancies in both the parent and boxed-legacy control.
All retained broad/focused regressions pass. This does not claim successful
Token-2022 transfers through the crank's downstream legacy token program.

### Shared zero-quote predicate

The [common-helper recovery](../research/fees-curve-zero-helper/README.md) emits
the 504-byte zero-quote predicate from ordinary Borsh pubkey deserialization.
Array conversion and `TryFrom` controls emit 432-byte bodies and do not match.
All four direct callee bodies and both referenced panic locations match. The
helper is wired into both existing fee-sharing callers; those full callers
remain unresolved. The change adds one normalized body with no lost coverage,
and passes fresh broad and retained focused regression suites.

### Tier-copy slice panic data

The [slice-origin contract study](../research/fees-slice-origin-contract/README.md)
corrects four location records on its reproduced PR #149 baseline. Only eight
ELF bytes change and the full instruction section remains raw-equal. It also
binds the real caller edges, three message pieces and numeric/panic callees,
identifying original 784,168 as a source/destination slice-length-mismatch
panic, rather than an ordinary index-bounds panic. It adds no body matches.
The [integration](../research/fees-slice-origin-integration/README.md) now carries
those four records into the latest research source. Its entire instruction
section remains raw-byte equal to the 376-pair parent, and exactly eight data
bytes change. All intervening gains and fresh regression suites are retained.
The older study's 368-pair counts do not replace the current frontier.

### Buyback initializer context

The [buyback context recovery](../research/fees-buyback-context-ownership/README.md)
boxes the vault and token account and owns the event/program account infos.
It recovers original windows 351,128 (7,184-byte parser), 364,568 (5,512-byte
initialization closure) and 370,080 (560-byte exit) without losing matches.
At this stage, 86 of 87 direct callee bodies matched; the remaining edge called
closure 358,312 (6,256 bytes), whose subsequent recovery is described below.
That adjoining body is excluded from the 7,184-byte parser size. The exit owner and error-field strings match,
and previous slice/common location contracts remain equal. Fresh broad and
focused regression suites pass. This is body/context recovery, not exhaustive
initializer semantics or a new selected-handler acceptance.

### Buyback context source origin

The [source-origin recovery](../research/fees-buyback-context-origin/README.md)
moves the unchanged context declaration to `instructions/buyback/mod.rs:12`,
while retaining the initializer function on line 94. It fixes the two unmasked
line/path-length constants and the actual error-origin path, recovering all
6,256 bytes of closure 358,312. All four parser/initialization/exit components
now have complete normalized bodies and all 104 direct callee bodies match.
This adds one body plus one duplicate call attribution; no previous match is
lost. Previous panic-location contracts and fresh regression suites pass.
Full data/indirect-call and whole-file identity remain open.

### Crank event-account layout and remaining caller gaps

The [owned event-account recovery](../research/fees-crank-event-ownership/README.md)
changes one context field from `UncheckedAccount` to `AccountInfo`, retaining its
seed constraint. This recovers the complete 952-byte crank exit and 840-byte
dispatch wrapper, without losing any match. Both original exit field offsets,
the owner bytes and three error labels agree; all 12 direct exit callees match.
The wrapper still calls the unmatched parser at 408,640 and business handler at
147,944. These two local gains do not close the public handler's full call tree.

The [root codegen controls](../research/fees-wrapper-codegen-controls/README.md)
reproduce the prior candidate exactly at one unit. Two, four, eight and sixteen
units recover no new bodies and lose 127, 133, 163 and 163 covered windows,
respectively. They retain a bump default store but do not recover the buyback
wrapper. Keep the one-unit recipe; the wrapper's original extra initialization
instruction still needs a source/build explanation.

### Sweep context: parser, exit and wrapper recovered

The [sweep context ownership study](../research/fees-sweep-context-ownership/README.md)
boxes the vault and both token accounts, and owns the event/program account
infos. The destination remains borrowed. This recovers the complete 9,280-byte
parser, 944-byte exit and 1,320-byte dispatch wrapper, without losing a match.
All 89 direct parser/exit callees match. The wrapper has five matching direct
callees and one remaining business-body frontier at original 120,816.

The three separate controls add no complete body match. Earlier crank and
initializer bodies, their explicit callee limitations, and retained panic-data
contracts remain unchanged. The new candidate passes fresh full and focused
regressions; source, build and data evidence are retained separately from the
local instruction matches. No selected artifact is promoted.

### Buyback update: shared parser and both wrappers recovered

The [buyback-update ownership study](../research/fees-buyback-update-ownership/README.md)
owns the event authority and program account infos in the shared update context.
It recovers the complete 5,856-byte parser, 1,744-byte authority-update wrapper
and 1,568-byte claim-rate wrapper. All 61 direct callee bodies match; single-field
ownership controls add no complete body. No prior match is lost.

Twenty-five selected message, seed, label and owner-ID ranges also match, with a
mutation test distinguishing their identity from instruction equality. Nested
panic/format metadata, wider transitive data and exhaustive behavior still need
separate proof. Fresh full and focused regression passes; earlier sweep, crank,
initializer and panic-location contracts remain verified.

### Isolated event-context integration

The [six ownership trials](../research/fees-event-context-ownership/README.md)
recover two bodies each for social claim, withdrawal and social-PDA creation.
Their combined source retains all six gains and every parent match. All 168
parser callees match; the three dispatch wrappers still call unmatched business
bodies. The original instruction-message bytes are checked separately.

The fee-sharing V2 trial loses two normalized bodies and one raw-local match;
its borrowed event field is retained. Admin-reset and fee-sharing-creation
trials add no complete body and are not integrated. Do not apply a blanket
conversion to every unchecked event account. Fresh combined-candidate full and
focused regressions pass, and earlier context/data contracts remain verified.

### FeeConfig unchecked prefix and initialization evidence

The [unchecked-prefix recovery](../research/fees-unchecked-prefix-recovery/README.md)
restores full-account input handling for the research decoder. It consumes the
eight-byte prefix, without checking its value in the unchecked path, and invokes
the existing payload decoder. The complete 1,144-byte helper now matches, all
11 direct callee bodies match, and the incoming initializer closure and payload
decoder remain matched. Owner constants and the decoder error-message record
are verified independently of instruction normalization.

The parent fails the added native prefix regression; the corrected source passes
35 host contract cases, including short buffers and format thresholds. The local
slice control restores the prefix but leaves 22 stack-operand differences and
does not consume the caller's descriptor. The consuming variant is retained.
The 17,331-case SBF regression passes but does not invoke `initialize_fee_config`.
These tests do not establish a successful authorized fixed-admin initializer
transaction. Older packets' discriminator-free unchecked-input limitation is
resolved for this current research candidate, not rewritten in those packets.

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


The [Mayhem configuration-history packet](../research/mayhem-globalparams-field-history/README.md)
adds captured account values and a reported ten-update trajectory. Its offline
checker passes file hashes, account decoding and the derived version chain;
it does not independently re-decode the transaction instruction/event payloads.
Those payloads need a separate cross-check before the history is used to close
field-role claims. The five semantic roles remain unresolved; no field is renamed.

1. **Preserve the canonical exact Relay recipe:** retain the fresh-build and loader
   evidence and successor guard; investigate authentic source/build provenance. The reconstructed layout
   closes byte identity, not historical provenance or all runtime coverage.
2. **Close known behavior defects:** Pump `sell_v2` and the ten partial/unaccepted
   selected dispositions above, with bound success/rejection tests. Cover genuine
   CPI callers, ownership and extension/mode combinations before acceptance.
3. **Continue Fees business/source recovery:** work from all 31 residual addresses,
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
python3 -B repro/donation-relay/settlement-artifact-recovery/verify.py
python3 -B research/fees-crank-event-ownership/verify.py
python3 -B research/fees-sweep-context-ownership/verify.py
python3 -B research/fees-buyback-update-ownership/verify.py
python3 -B research/fees-event-context-ownership/verify.py
python3 -B research/fees-unchecked-prefix-recovery/verify.py
python3 -B research/fees-wrapper-codegen-controls/verify.py
python3 -B repro/reconstruction-status-2026-10-26/refresh.py --check
```

These verify retained evidence and rederive byte/window inventories; they are not
new compiler builds or fresh VM executions. The owning packages record those
builds and replays. The new inventory preserves the old selected 3,338 rows and
recomputes the 1,077 current research rows directly from their artifacts.


## Verified Fees composition after PR #188

The [composed artifact](../research/fees-composed-frontier188/README.md) independently
reproduces the pinned math/SyncNative baseline and adds sharing creation parser,
exit and dispatch, admin-sharing parser and dispatch, and social-PDA creation.
All 163 decoded Location-shaped uses agree; the program reader and selected
literal contracts are rechecked. Dispatches still reach unmatched business code.
The current 551-window candidate freshly passes 17,331 suite comparisons and
157 strict signed social-creation cases. Earlier matrices retain their own
artifact bindings. Full data, indirect behavior and whole-file identity remain
open; these are normalized body gains, not six fully proven public handlers.


## Artifact-backed completion of the Relay normalized inventory

The [independently built wrapper recovery](../repro/donation-relay/donation-wrapper-artifact-recovery/README.md)
reproduces the 488 → 490 → 492 progression. The key source boundary is both
context field declaration order and caller construction order, with direct event
construction after native account close. All 18 wrapper callees and the existing
positional data graph pass; fresh signed replay passes 536 records. No whole-ELF,
protected-settlement-success or exhaustive semantic identity is claimed. Earlier
four-window lists below describe preceding checkpoints and are superseded for
current body coverage by this artifact.


The [access-control layout recovery](../repro/donation-relay/access-control-layout-artifact/README.md) retains all492 normalized windows, adds59 raw-local matches with no losses, restores the full194–204 runtime/settlement block and all ELF headers, and passes536 fresh signed replay records. There remain9,398 differing meaningful-ELF positions. The [allocation history](../repro/donation-relay/allocation-provenance/README.md) explains the12,168-byte tail; full Rust-build/captured-payload equality remains unproved.

## Relay raw-layout accounting

The [raw-layout audit](../repro/donation-relay/raw-layout-audit/README.md) verifies
that original and candidate have the same multiset of 492 normalized bodies.
Fifteen permutation regions contain 17,991 positionally differing text bytes;
outside them, all 462 differing text bytes are direct-call operands. The remaining
170 differences are pointer, symbol-value, relocation-site and entry-address
fields. This is complete positional accounting, not proof of unique correspondence
or semantic pointer identity. Six compiled source-identity controls do not reduce
the whole-file residual, and none replaces the accepted artifact.

## Exact Relay ELF and current Fees prefix integration

The [linked ELF packet](../repro/donation-relay/linked-elf-reproduction/README.md)
supersedes the earlier raw-layout residuals: zero differing meaningful-ELF bytes,
492 raw windows and an exact loader-created captured payload. Earlier sections
retain their historical measurements. The default-linker access-control source
variant remains a distinct 376-window result.

The [Fees prefix integration](../research/fees-frontier-prefix-integration/README.md)
restores the complete unchecked initializer helper without losing the composed
frontier. Independent compilation matches both published hashes; a fresh full
suite passes all 17,331 comparisons. Current attribution is 405 unique plus 69
call-attributed pairs (474 total); 78 duplicate windows remain unattributed and
16 call edges reach different-body frontiers. No Fees whole-file identity is claimed.

## Public instruction module restores the complete buyback wrapper

The [visibility recovery](../research/fees-instruction-visibility/README.md) changes
only `mod instructions;` to `pub mod instructions;` on the PR #195 source. This
restores the missing default-bump store and completes the 1,208-byte initializer
wrapper, original address 650064. All six direct callee bodies match, including
the parser, business handler and exit. Both root builds are identical; a fresh
17,331-case suite passes. The source visibility is a sufficient tested cause,
not proof of historical visibility or a traced compiler-pass explanation.

Current Fees coverage is 553/585, with 406 unique structural pairs and 32 unmatched
windows. The authorization-helper source variants remain rejected controls; they
do not close original 234096. Their source-path and signer-load observations
guide further work without promoting those variants.

## AdminCto integration and residual CPI adapters

The [current AdminCto composition](../research/fees-admin-cto-current-integration/README.md)
independently integrates PR #200 into the 553-window source and recovers original
127776 in full. Two root builds agree, all 20 direct callee bodies match, and
17,331 fresh regression cases pass. No existing normalized or raw match is lost.
That historical composition reaches 554/585 with 407 unique pairs and 31 unmatched windows.

The separate [CPI ownership controls](../research/fees-cpi-adapter-ownership-controls/README.md)
recover the observed argument/construction boundaries for 235304 and 236240.
Each closest body still differs at four unmasked copy displacement bytes. The
local three-word copy has equal effects and dead temporary-register differences,
but neither full body is byte-identical. All 13 controls retain their 553-window
base; 417 bounded sharing-update cases pass on the ordered prototype. These
controls are not promoted into the current AdminCto artifact.

## Canonical exact Relay selection

[PR #203](../repro/donation-relay/canonical-exact-selection/README.md) installs the
60-input Rust reconstruction at `programs/donation-relay` and selects the exact
818,280-byte ELF plus the real-loader 830,448-byte payload. The prior 23-input
source and selected metadata remain archived and checked as historical evidence.
The four core source maps and their 107 input pins remain unchanged. The current
4,415-row inventory now reflects this Relay selection rather than labeling the
old source-15 artifact current. Historical provenance and exhaustive behavior
remain unproved.

## Reviewed PR204–206 research additions

The [distribution helpers](../repro/pump_fees/distribution-helper-recovery/README.md)
close the historical copy residuals for both adapters on the 554-window AdminCto
baseline: 556 normalized, 409 unique pairs, 118 raw-local, 29 unmatched. All 23
helper callees and 165 Locations check; a fresh 417-case replay equals the retained
receipt. The generated inventory now uses this 556 candidate; all 17,331 fresh suite comparisons pass.
The earlier ownership-control results above are preserved as historical experiments.

The [constant-admin parser proposal](../research/fees-initialize-config-const-admin-source-proposal/README.md)
passes its source verifier and 13 tests; its older 550-to-551 source-only claim is
not added to the newer candidate. The [Crank checked-credit packet](../research/fees-crank-lamport-overflow/README.md)
passes evidence checks and a fresh 76-case differential, reproducing 15 control
failures and zero proposal failures. Its source must be composed with PR201's flow
before a current combined runtime or byte claim is made.

## Current 558-window composition

[Independent current-source integration](../research/fees-current-558-integration/README.md)
adds original encoder 270136 and initializer parser 295800 to the 556 baseline,
while composing PR201's native-only Crank and PR205's checked credit. Two builds
agree; the fresh all-dependency baseline matches the preceding published artifact.
All prior raw/normalized matches,165 Location uses and positive direct-call
observations survive. All 17,331 regression and 76 boundary cases pass. The304
strict Crank cases have identical retained non-log fields and application logs;
all 304 raw logs differ in explicit compute-consumption lines. Whole identity
and authentic fixed-admin success remain unproved. The inventory is now 558
normalized,142 raw-local,411 unique pairs,27 unmatched, with 480 attributed pairs.

## Active Mayhem priority

[AMM shared state and source origins](../research/mayhem-amm-source-origins/README.md) is the current research baseline: 198 examined, 188 matched, ten unmatched and 243 opaque windows. The preceding [GlobalParams layout](../repro/mayhem/global-params-layout-recovery/README.md) used a narrower 196-window scope. The [active work plan](MAYHEM-RECONSTRUCTION-PLAN.md) includes the opaque inventory, initializer and whole ELF obligations. [Seven quote-validator controls](../research/mayhem-quote-validator-controls/README.md) preserve every existing match but do not close O0095. This research does not change the canonical selected artifact or certify complete handlers.

## Earlier Mayhem interval correction

The [interval-location packet](../research/mayhem-interval-location-recovery/README.md) changes exactly one compiled data byte, reproducing original state.rs 562:32 while retaining every instruction byte and all body matches. Two root builds agree; 396 fresh Sell cases and 792 independently verified signatures pass. Three non-compute log differences remain. The [follow-up controls](../research/mayhem-quote-validator-followups/README.md) add no complete O0095 match; the eight-body and opaque remainders remain.

## Mayhem Sell baseline validation

[Sell source-origin recovery](../research/mayhem-sell-origin-recovery/README.md) builds twice to the same artifact. It passes 396 fresh Sell cases with equality of every non-compute log line, 1,032 admin cases, and three sequential Burn families. All 2,868 signatures and 624 successful admin account-byte outcomes verify independently. The [441-window inventory](../research/mayhem-sell-origin-recovery/functions.tsv) retains 188 matching examined bodies, eight unmatched bodies and 245 opaque windows. The new source fixes the earlier diagnostic differences, not full body or whole-file identity.

## Mayhem trade attribution and AMM controls

The [wrapper audit](../research/mayhem-trade-wrapper-attribution/README.md)
verifies the six trade handler names from deployed instruction log literals and
direct calls. O0077/O0079 are PumpSwap Buy/Sell; O0081/O0082 are legacy Buy/Sell;
O0083/O0084 are V2 Buy/Sell. Two source controls retain the 188 known normalized
and 58 all-inventory raw-local matches. The refined AMM Buy control passes 1,257
fresh comparisons and 2,514 signatures, including rejection-only Token-2022
coverage. Neither it nor its 1,104-byte helper matches the complete original body.
At that checkpoint these controls did not replace the Sell-origin baseline or
change its eight admitted gaps and 245 opaque windows. The expanded current
research scope is recorded below; ELF identity is still unresolved.

## Mayhem current research: shared AMM state and source origins

The [latest packet](../research/mayhem-amm-source-origins/README.md) preserves
188 normalized matches and admits two previously opaque helpers for explicit
comparison: 198 examined, ten unmatched and 243 opaque. Its complete ledger has
46 examined raw-local matches, 142 normalized-only matches and twelve additional
opaque raw-local matches. This scope expansion adds no complete-body gain or loss.

Two 16-input root builds agree. Fresh 1,257 AMM Buy and 396 legacy Sell comparisons
have equal non-compute logs; 1,032 admin cases and three Burn families also pass.
All 5,382 signatures verify, and 624 admin account results are reconstructed.
Token-2022 AMM cases cover rejection paths only. Whole Mayhem identity remains
false, and this research packet does not change canonical source/checkpoints.

## Complete Mayhem static scan

The [full-window audit](../research/mayhem-full-window-audit/README.md) removes
the prior scope limit for mechanical byte comparison: all 441 windows and
706,744 text bytes are covered. It finds 58 raw-local matches, 269 normalized-only
matches and 114 unmatched extents totaling 495,936 bytes. There is no new compiled
recovery in this count: the 243 rows outside the prior interpreted cohort already
contain 139 structural matches and 104 unmatched windows.

234 matched windows have a unique candidate; 93 have ambiguous counterparts.
Among unique pairs, 27 have at least one different direct-callee shape and 138
have unresolved referenced-data extents. Source attribution, interface semantics
and transitive call/data closure remain separate obligations. The earlier
198-window/188-match cohort is retained, not relabelled as semantic completion.
Root-only MIR levels 0, 1 and 3 do not recover the missing accounting/quote bodies
and are not promoted. The current candidate and runtime claims are unchanged.

## Current Mayhem source: native Program parser recovery

The [new packet](../research/mayhem-native-program-recovery/README.md) restores
the captured unconditional program-ID check through a checksum-bound Anchor
source variant and standard Program account fields. It adds fourteen complete
normalized bodies (145,720 original text bytes), including all six trade account
parsers and Burn's parser, with no loss of earlier matches. The complete scan is
now 58 raw-local / 283 normalized-only / 100 unmatched windows, with 350,216
unmatched text bytes. The explicit source cohort is 212 windows: 202 matching,
ten unmatched and 229 without complete source attribution.

Two root builds agree. All 6,636 trade comparisons, 1,032 admin cases and three
Burn families pass; 15,348 signatures and 624 complete admin account results
verify independently. Five newly matched bodies retain an unmatched direct
callee, and data/transitive closure is unproved. Initializer runtime is excluded.
The canonical selected checkpoint is unchanged; whole Mayhem equality is false.

## BuyV2 validator composition on the parser-recovery source

The [follow-up packet](../research/mayhem-native-buy-v2-validation/README.md)
keeps all 54 source/vendor inputs except BuyV2's duplicated trade-validation
block. The restored call targets the complete O0094 counterpart and its nine
ordered callees. All 341 window matches remain; no new complete body match is
claimed. Two builds agree and 1,839 fresh comparisons pass. The checker verifies
7,356 before/after signature entries, including 3,678 fresh candidate entries.
Non-compute log differences remain in 118 cases, reduced from 130. Other runtime
lanes retain the parser-recovery parent hash and were not rerun for this change.

## Current Mayhem source: complete external curve and boxed helpers

The [full curve recovery](../research/mayhem-full-curve-recovery/README.md)
replaces the abbreviated four-reserve representation with the complete external
curve. Four more complete normalized windows match: the two 424-byte boxed
account helpers, a 136-byte account parser and a 656-byte allocation helper.
All previous matches remain. The full scan is 59 raw-local / 286 normalized-only /
96 unmatched windows, totaling 348,576 unmatched text bytes. The extra raw-local
match is a previously normalized string helper whose call displacement now agrees.

All four immediate callees in each boxed helper match. Their account parser still
reaches an unmatched decoder at 26272; checked/unchecked decoding and padding
bodies remain unequal. Two builds explicitly recompile vendored Anchor and agree.
Fresh runtime passes all 6,636 trade comparisons, 1,032 admin cases and 12 Burn
transactions; 15,348 signatures verify. No initializer, whole-ELF or exhaustive
semantic completion is claimed. The interpreted source cohort is 216 windows,
with 206 matched, ten unmatched and 225 remaining without full source attribution.

## Parallel Mayhem source checkpoint

The [parallel recovery](../research/mayhem-parallel-recovery/README.md) composes
30 additional normalized windows: serializers and decoders, account parsers,
withdraw/pause methods, post-sell accounting, initialization closures, the Burn
body, CPI error adapters and used Pump V2 interface builders. It retains all
previous matches and reaches 375/441 (59 raw-local, 316 normalized-only), leaving
66 windows and 268,000 text bytes unmatched. All immediate callee shapes match
for 28 of the new windows; two account conversion helpers retain unmatched
decoder callees. Data and transitive closure remain separate obligations.

Two builds agree. Fresh standard regression passes 6,636 trade comparisons,
1,032 admin cases, 1,601 extra fee/sweep/withdrawal cases and 12 Burn transactions.
The expanded targeted sweep-rate matrix has 34 known differences in 150 cases;
the earlier zero-rate fixtures did not establish that missing behavior. Its
signed evidence is retained and a separate corrective candidate is being
validated. Do not call the current checkpoint semantically complete.

All remaining windows and the whole-ELF/data/toolchain tasks are assigned in the
[parallel work map](MAYHEM-PARALLEL-WORK.md). The active lanes continue after this
checkpoint; their subsequent uncomposed candidates are not silently added here.


## Historical Mayhem composition: 411 matching windows

The [composed packet](../research/mayhem-composed-recovery/README.md) adds 36
complete normalized windows to the published 375-window checkpoint, preserving
all prior raw matches and positive direct-call observations. It has 59 raw-local,
352 normalized-only and 30 unmatched windows. The remaining windows span
155,520 / 706,744 original text bytes (22.0%). No whole-file equality is claimed.

The gains cover external account codecs/owners, global-update arguments and
helper, fee-recipient parser and ATA closure, six trade exits, the complete
SellEvent routine, five initializer-related bodies, both AMM interfaces and the
used BuyV2 serializer. Of the 36 gains, 34 have all immediate callee shapes equal;
the initializer drop/dispatch still call three unmatched destinations. The 301
unique counterparts contain 13 differing direct-callee observations overall.

Fresh original/candidate execution passes all 6,636 trade comparisons, 1,032 admin
cases, 1,601 extra fee/sweep/withdrawal cases, three two-step Burn families and a
150-case sweep-rate matrix. The latter retains 34 parent failures and zero on
the composition. Initializer coverage adds 53 signed rejection cases and 16
real captured-Pump CPI cases with ten successes; this is bounded research
coverage, not promotion of the selected checkpoint or exhaustive acceptance.

Data work remains substantial. The 26 account gains have 156 reference
observations: 34 typed-equal, 63 typed-different and 59 unresolved. Seven interface
bodies retain two differing SDK Source paths out of 48 records. Formatter vtables
select two nonmatching String implementations even though matching alternatives
exist elsewhere in the candidate. These failures are part of the verified report.
The [parallel work map](MAYHEM-PARALLEL-WORK.md) assigns all 30 remaining windows.


## Latest Mayhem source/data recovery: 426 matching windows

The [successor packet](../research/mayhem-source-data-recovery/README.md) has
70 raw-local matches, 356 normalized-only matches and 15 unmatched windows.
The remaining bodies span 119,400 / 706,744 original text bytes (16.9%); whole
ELF and capture equality remain false. Fifteen new complete counterparts cover
36,120 bytes and preserve all earlier bodies and positive direct-call observations.
The new bodies cover typed Buy/BuyV2 interfaces, initialization, native token
helpers and two TypeId thunks. This does not certify whole public handlers.

A mixed recipe using the unchanged macOS compiler and Linux SBF libraries
repairs platform Source paths and metadata. All 26 target files were checked
against their members of the pinned official archive. Two builds agree; no
output is patched or padded. The actual V2 interface shares a crate with the
external account types, so both formatting vtables select the matching methods.
The earlier account cohort now has 97 typed-equal references, 0 typed-different,
and 59 unresolved. Fifty interface Source records and nineteen Buy/global-init
references agree. Other unexamined data extents and indirect paths remain work.

Fresh signed execution covers the standard 6,636 trade / 1,032 admin / 1,601 extra
suites and three Burn families. The 150-case rate matrix retains 34 failures on
the old 375 candidate and none on the successor. The 48-case counter matrix
retains 10 failures on 411 and none on the successor; its independent per-recipient
oracle and exact non-compute logs pass. Initializer coverage adds 53 rejections,
16 real Pump CPI cases (10 successes), 2 token-program negatives, and 6 global-init
cases (2 successes). The 692-case ordinary sweep corpus still has 58 non-compute log
differences. Full records and the diagnostic ledger preserve these distinctions.

The [AMM sell-call successor](../research/mayhem-sell-quote-call-recovery/README.md)
retains the same inventory and restores the actual shared quote call. Two
builds agree; all fourteen trade suites (6,636 cases) were freshly rerun. All
1,239 AMM sell cases now agree on non-compute logs, repairing eight differences.
The O0093 helper's ten callee and ten typed-data observations agree as multisets,
but its body remains 1,096 versus 1,120 bytes. This is partial recovery, not a
perfect function or a new normalized match. Parent admin/Burn/initializer/sweep
receipts are not rebound to the new candidate.

The [account-data refinement](../research/mayhem-account-data-extents/README.md)
then bounds 56 of the 59 unknown references on that unchanged candidate. The
156-reference cohort now has 153 typed-equal, zero typed-different and three
unresolved references. These comparisons use explicit read lengths, slice
fields, consumer loads and vtable/code targets. They preserve the initializer's
known nonmatching callee and do not claim raw relocated addresses or all-program
data equality. No new compilation or target execution is needed for this audit.
