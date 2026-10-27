# Remaining work — Jupiter recovery, 26 October 2026

This is the action list for the [current reconstruction audit](RECONSTRUCTION-AUDIT.md),
with current research reviewed through evidence revision `c7d35041`. The [current review](RECONSTRUCTION-STATUS.md)
and [complete refreshed inventory](../repro/reconstruction-status-2026-10-26/README.md)
list every raw match and unresolved window; selected artifacts retain the
`1463bd22` audit bindings. The historical
[completion ledger](COMPLETION.md) remains a selected-checkpoint record; its old
candidate paths and “current” prose must not override newer evidence.

Subsequent gains are in the [byte-identity progress log](BYTE-IDENTITY-PROGRESS.md):
Relay research now has **11 unmatched windows**; Fees buyback-origin research
has **85 unmatched windows and 353 unique structural pairs**. The [Relay framework study](../repro/donation-relay/framework-sysroot-recovery/README.md)
recovers the three repeated type-ID bodies with official Linux target libraries,
adds the Anchor 0.32 framework matches and restores share-total compared values.
The subsequent [mint-predicate study](../repro/donation-relay/mint-fee-pair-recovery/README.md)
recovers window 106; the current remaining windows are 92–100, 109 and 112 after the
[Jupiter optional-seed recovery](../repro/donation-relay/jupiter-option-source-recovery/README.md). A
[fully Linux reproduction](../repro/donation-relay/linux-canonical-reproduction/README.md)
previously confirmed the 480-window frontier; the optional-seed study independently
confirms 481 with the full Linux compiler. The baseline counts below remain those
of the dated audit.

The earlier [compiled location recovery](../repro/donation-relay/source-location-recovery/README.md)
subsequently resolves all 43 source-location value differences in the audited
346-pair cohort, retaining 480 matched windows and 12 unmatched on both tested
compiler recipes, each with fresh replay. Other data,
absolute pointers, relocations and excluded/ambiguous functions still need work.

The [optional-seed recovery](../repro/donation-relay/jupiter-option-source-recovery/README.md)
closes Jupiter window 90 on both compiler recipes, taking the current frontier
to 481/492 without losing matches. The prior four instruction differences were
resolved by the optional-slice pointer test and Rust `match` structure. The
original location cohort remains equal and expands from 346 to 348 pairs.
Thirty-two earlier burn/close source variants remain negative; window 109 and
the other ten business/helper windows still require work.

## Audit baseline

- **Whole captured-file identity:** 0/4 selected core programs; selected Relay also differs.
- **Selected public handlers:** 140/150 bounded implementations, five partial,
  five unaccepted/unrecovered. No exhaustive semantic-perfection claim.
- **Selected machine windows:** 384 have equal local body bytes, 1,408 additional
  normalized-only matches, 1,301 have no full body match and 245 remain opaque.
  This partitions 3,338 windows, not the amount of source or effort recovered.
- **Newer Fees research:** 340 unique structural pairs plus 53 call-attributed
  duplicate pairs; 94 duplicate windows still unattributed and 98 unmatched.
- **Newer Relay research:** 465/492 normalized windows, including 86 raw local
  matches, with 27 unmatched. Selected source 15 remains at 122/492.
- **Dependencies:** SPL Token is fully raw-byte equal. Token-2022's raw ELF equals
  the meaningful prefix and its separately padded allocation equals the capture.
  ATA has two exact but non-historical research recipes; its selected status is
  still unresolved. Metaplex has 1,509 differing positions.

Use the [complete handler ledger](../repro/reconstruction-audit-2026-10-26/handlers.md),
[exact-byte appendix](../repro/reconstruction-audit-2026-10-26/raw-body-matches.md)
and [full window inventory](../repro/reconstruction-audit-2026-10-26/functions.tsv)
for function-level details. “No complete match” does not prove source absence;
“raw local match” does not prove transitive semantics.

## 1. Close public-handler and behavior gaps

| Work item | Current evidence | Completion condition |
| --- | --- | --- |
| Pump `admin_update_token_incentives` | Unselected overlay; 299 bounded comparisons | New selected build, bound receipts and broader validation |
| Pump `claim_token_incentives` | Recovered overlay source; older build-bound differential | Rebind and replay the actual intended candidate |
| Pump `set_mayhem_virtual_params` | Static recovery and 84 signer-stub comparisons | Resolve genuine caller and AccountInfo ownership contracts; select/revalidate |
| Pump `buy_v3`, `sell_v3`, `buy_exact_quote_in_v3` | Partial selected handlers; overlay adds finite transfer-fee coverage | Cover remaining routes, extensions, validation ordering and complete event data |
| Pump `create_v2` | Partial selected handler; overlay adds real Mayhem CPI coverage | Broader ancestry, modes and Token-2022 interactions |
| Pump `multi_hop_curve_swap` | Finite one/two/three-hop ordinary coverage | Arbitrary supported depth, quote currencies, lifecycle, resizing and mode combinations |
| AMM `create_config` | Compiled/static structural evidence | Authentic successful fixed-admin initialization and rejection validation |
| Mayhem `initialize_mayhem_state` | Corrected overlay: 53 rejection cases ([initializer correction](../research/mayhem-initializer-validation/README.md)) and 20 real Pump-CPI cases ([retained recheck](../research/mayhem-overlay-cpi-recheck/README.md)) | Select intended source/build and cover broader initializer behavior |
| Pump `sell_v2` | Bounded accepted handler with a known quote transfer-fee minimum-output/event discrepancy | Correct the discrepancy and retain regression evidence |
| Mayhem non-initializer ABI/state | Bounded handlers, known diagnostic/error differences, five unknown GlobalParams field roles | Resolve fields and full error/data contracts |

The selected 140 count includes finite, imperfect reconstructions. It must not be
presented as 140 fully correct or byte-perfect functions. Existing stopped-lane
and signing/ownership restrictions are unchanged by this documentation audit.

## 2. Finish source and binary reconstruction

| Program / research | Concrete remaining frontier |
| --- | --- |
| Selected Pump | 507 windows without full normalized matches; calls/data and ambiguous matches also remain. The separate workspace-member build has 538 normalized windows and 497 residuals: 233 different-body, 192 no-same-size, 72 store-immediate-only heuristic rows. One of those 72 changes an error code; only 71 are reported origin-only. |
| Selected AMM | 297 unmatched original windows, 160 ambiguous normalized rows, original diagnostics, data and full call contracts |
| Fees current research | 85 unmatched windows (348,264 original body bytes), 147 original windows in duplicate groups; rederive call attribution for this candidate, then close shareholder validators, transitive calls/data and full ELF/relocation layout |
| Selected Mayhem | Seven admitted unmatched windows and 257 source-ledger opaque windows; 12 of the opaque windows have local raw matches without semantic attribution |
| Relay current research | [11 explicit residual windows](RECONSTRUCTION-STATUS.md#relay-the-complete-remaining-body-list), spanning 55,472 original body bytes: donation/settlement bodies, burn/close and shared donation worker; privileged successes, transitive callees/data and allocator/borrow behavior |
| Metaplex | Utilize's 1,477 text differences, 30 source-coordinate differences, two relocation differences; authentic source/compiler layout |
| ATA | Historical recipe remains unknown despite exact output from explicit symbol ordering and an empty feature. Decide selection independently of historical authenticity. |
| All programs | Exact historical tool/dependency inputs, complete sections/relocations, data and indirect-call meaning; complete security and lifecycle acceptance |

The historical counts in the audit-baseline section are not the current research frontier.
The Fees and Relay research outputs are not selected production/source checkpoints.
The [audit](RECONSTRUCTION-AUDIT.md) records their full hashes, scope and exact
function-level evidence. Do not combine counts from different builds or matcher
rules into a single recovery percentage.

## 3. Integrate deliberately

The behavioral overlay and generated Relay source cannot be promoted by copying
files alone. Selection entails a new candidate, source/build manifests, exact
artifact hashes, bound differentials, current status/selection records and an
explicit guard transition. The current guard pins 37 Pump and 14 Mayhem compile
inputs; selected Relay uses its source-15 binding. This audit changes none of them.

README changes use the reviewed consolidation transition: its exact transition
hash and allowed paths live in `repro/consolidation/2026-10-26/guard.py`. Changing
a selected script set or immutable checkpoint package needs a separate reviewed
change, not a data-only reseal.

Historical SDK tests used older overlay artifacts. Repeat those flows against
any candidate actually proposed for selection. Preserve failed experiments and
finite-coverage limitations. A passing differential suite is not security sign-off.

## Evidence and reproducibility

The audit generator rechecks all selected input hashes, binary extents and body
bytes, preserves complete original partitions, and provides current candidate
bindings for every handler. Run:

```sh
python3 -B repro/reconstruction-audit-2026-10-26/audit.py --check
```

No source compilation or target-program execution is performed by that command.
This is a dated evidence snapshot, not a live PR queue or monitoring promise.
There is no defensible single overall percent complete or completion date.

## Consolidation record

| Source | Outcome |
| --- | --- |
| Primary checkout's uncommitted recovery work | Snapshotted as `1bec3365`, merged as `repro/behavioral-recovery/` |
| `codex/layered-reconstruction` | Merged: MIT `LICENSE`; its program edits went to the overlay |
| `review/reconstruction-2026-10-25` | Merged: nine A-reproduction build records |
| `codex/relay-generated-framework-20261025` @ `9f49231c` | Squashed in: all 15 evidence packages and the complete generated-framework source (its 50 Rust/Cargo inputs, byte-identical, in `repro/donation-relay/distribution-worker-source-recovery/settlement/source/`); PR #94 restored three predecessor packages its verifiers need. Only promotion to the active `programs/donation-relay` path is pending (§3) |
| Pull requests #32–#59 (except #34, closed as superseded by #38) | Merged by the parallel PR agent; included. PR #60, opened before the consolidation PR #61, merged just after it |
| Go-clone `codex/checkout-byte-preservation-transition` | Superseded by PR #32, which contains both commits plus the fix that kept the sealed attributes |
| Go-clone `research/pr8-harness-bindings-superseded` (`89634a4d`) | Not merged: self-labelled superseded, targets pass-22 bindings and edits two pinned scripts |
| Scratch worktrees `fees-edit`, `restruct-wt` | Removed after a byte-for-byte match against the banked restructure trees |
| Codex worktree `main-reconciliation` (`codex/layered-pass-36`) | Clean and contained in main; left for its owner |
