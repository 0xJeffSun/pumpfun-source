# Remaining work

Consolidated 2026-10-26, after reviewing every worktree, branch and pull request and
merging all but the exceptions in the record at the end. Numbers come from `repro/status.json`, `repro/donation-relay/current.json`,
the pass-27 current-state index and the evidence packages cited below.

## Summary

| Area | State | What is left |
| --- | --- | --- |
| Core byte identity | 0 / 4 programs | All four, plus Relay. Blocked mainly by unrecovered source layout and exact toolchain. |
| Dependencies | SPL Token raw output matches; Token-2022 matches after zero allocation padding; ATA's raw bytes reproduce only through two non-historical recipes | Metaplex: 1,477 differing text bytes in Utilize, 30 source-coordinate bytes and 2 relocation bytes. The authentic ATA recipe; decide whether a non-historical ATA recipe may be promoted in `repro/dependency-status.json`. |
| Handlers | 140 / 150 accepted (5 partial, 5 unrecovered). The overlay supplies 4 of the 5 unrecovered handlers and extends 4 partial ones; none are accepted | Promote the overlay, finish five partial handlers, replay AMM `create_config`. |
| Process | One CI guard (pass 27) pins README, scripts, workflows and sources | Decide how recovered-but-not-byte-exact source is admitted; plan the next guard generation. |

## 1. Byte identity

The deployed binaries remain the target. A build counts only when the whole file
matches with no patching or padding.

### Core programs

| Program | Original windows | Current gap | Most recent lead |
| --- | ---: | --- | --- |
| Pump | 1,035 | 538 normalized matches in a workspace-member build; of the 497 unmatched, 72 are metadata-only, 233 body, 192 missing (`repro/pump/frontier-*`) | `file!()` workspace prefix recovers 5 windows (PR #45); metadata-only windows need call-site layout, not module renames (PR #48) |
| PumpSwap | 785 | 297 unmatched original windows | Restructured module tree banked under `repro/parallel-work/2026-10-25/independent-reconstruction-review/restructure/` (13 of 33 path strings recovered) |
| Fees | 585 | Function bodies largely match after masking; residual is layout, scheduling and panic `Location` line/column | First owner/discriminator account parser is the frontier (pass 36) |
| Mayhem | 441 | 177 bounded normalized matches, 7 admitted handler windows unmatched, 257 opaque | Linux-hosted toolchain confirmed by the alloc `Location` payload (`repro/mayhem/linux-v154-recovery/`) |
| Donation Relay | 492 | Selected source 15: 370 unmatched | Generated-framework reconstruction reaches 465/492 normalized windows (27 unmatched) but is not yet selected; see §4 |

Known structural blockers, from the byte-grind experiments:

- Exact compiler release is narrowed to platform-tools v1.44–v1.46.1 for Pump, AMM and
  Fees (ELF `e_machine` rules out v1.43), but not pinned to one release.
- Function order and relocation layout depend on original source item and link order.
- Panic `Location` path strings are recoverable; their line and column values need the
  original statement positions. A workspace-member Pump build that keeps its own lock
  recovers 5 normalized windows (PR #45) but reorders `.text`, and a single shared
  workspace also drifts dependencies. Per-program `--remap-path-prefix` recovers the
  same path strings without reordering, at a negligible whole-binary change
  (`repro/parallel-work/2026-10-25/independent-reconstruction-review/WORKSPACE-BYTEMATCH-REPORT.md`;
  the proposal is retained as research by PR #63).
- High-similarity functions differ by instruction scheduling and register allocation,
  which source edits do not reliably control.

### Dependencies

- **Token-2022**: the unmodified 611,056-byte ELF equals the captured prefix.
  The 1,382,016-byte captured allocation has another 770,960 zero bytes; generating
  that padding reproduces the allocation image, not raw compiler-file equality
  (`repro/pump/verified-token-2022/`).
- **ATA**: raw-byte-identical (105,032 bytes, `6804554e…`) through two non-historical
  recipes: a reconstructed linker symbol order (`repro/ata/reconstructed-order/`,
  hosted run 40287588927) and, independently, one empty Cargo feature
  (`repro/ata/synthetic-ordering-exact-build/`). Neither is the uploader's original
  invocation, and the historical input that fixed the `RawVec::reserve_for_push` order
  is still unknown. `repro/dependency-status.json` still says `unresolved`; promoting
  either recipe is a selection change and needs review.
- **Metaplex Token Metadata**: 1,250 of 1,251 inferred function windows match.
  The 5,104-byte Utilize body contains all 1,477 differing text bytes; 30
  source-coordinate bytes and two relocation bytes also differ. The raw ELF is
  707,448 bytes, while the captured allocation is 793,991 bytes; the reported
  1,509 differing positions come from the separately padded allocation comparison
  (`repro/pump/metaplex-candidate-build-11/`). A fresh isolated build now reproduces
  candidate 11's raw output exactly (`research/metaplex-candidate11-offline/`), and
  captured final LLVM input and machine stages narrow the guard expansion to SBF
  instruction selection (`research/metaplex-utilize-trace/`). The deployed build's
  original source/compiler inputs remain unidentified.

## 2. Handler behavior

Accepted bounded reconstructions: Pump 48/56, PumpSwap 37/38, Fees 31/31, Mayhem 24/25.

The [behavioral recovery overlay](../repro/behavioral-recovery/README.md) adds four
handlers that are not in active source (three Pump, one Mayhem) and extends four
partial Pump handlers. Results from local re-runs on 2026-10-26 (receipts not
retained) and from the later initializer correction:

| Handler | Overlay result | Remaining |
| --- | --- | --- |
| `pump.admin_update_token_incentives` | 299 cases, 0 mismatches | Promotion (§3) |
| `pump.claim_token_incentives` | Recovered; its differential is tied to an older build record | Re-bind the differential to the overlay build and re-run |
| `pump.set_mayhem_virtual_params` | 84 cases, 0 mismatches via signer stub | Close the AccountInfo ownership question raised in review |
| `mayhem.initialize_mayhem_state` | 53 standalone rejection cases and 17 existing CPI cases, 0 mismatches in the [initializer correction](../research/mayhem-initializer-validation/README.md) | Overlay now matches signer-validation order and conditional token-vault creation. Broader behavior and whole-file byte identity remain unresolved; active source is still unpromoted. |
| `pump.create_v2` Mayhem mode | 17 cases, 0 mismatches | Exhaustive ancestry and new Token-2022 extension modes |
| `pump.buy_v3`, `sell_v3`, `buy_exact_quote_in_v3` transfer-fee quotes | 126 cases, 0 mismatches | Other quote routes, exhaustive extension/account validation, final event suffix |

Not covered by the overlay (partial, unrecovered, or accepted with a known gap):

- `pump.multi_hop_curve_swap` (partial): arbitrary hop counts, native/WSOL, other
  quote mints, completion/migration, Token-2022 and holder/cashback/Mayhem modes.
- `pump_amm.create_config` (unrecovered): compiled, but no authentic positive
  initializer replay.
- `pump.sell_v2` (accepted bounded handler): confirmed quote transfer-fee
  minimum-output/event mismatch.
- Mayhem: non-initializer error-return ABI differences and five unknown `GlobalParams` field roles.

## 3. Decision needed: admitting recovered source

The overlay builds, passes its differentials and supports the SDK flows, but it cannot
enter `programs/` today:

- `scripts/verify_recovered_builds.py` hash-binds all 37 Pump compile inputs (every
  `programs/pump/src` file, `Cargo.toml`/`Cargo.lock` and `programs/pump/recovered/*`)
  to the selected checkpoint. The pass-27 guard pins Mayhem's 14 compile inputs,
  including the `lib.rs` the overlay replaces.
- The pass-27 guard lists the incentive, virtual-params and signer-stub paths as
  must-not-exist and treats those lanes as stopped.
- CI suites `pump-1` through `pump-4` hard-code the selected candidate hash.

Promoting it means choosing an acceptance tier for behaviorally validated but not
byte-exact source, building a new checkpoint from the overlay, regenerating its
comparison report, updating `repro/status.json`, re-running the bound differential
suites against the new candidate and issuing a new guard generation. That is a policy
call for the repository owner, not a mechanical merge.

## 4. Repository and process

- **Open pull requests**: new contributions keep arriving after the consolidation
  (#60–#91 so far); a parallel review session merges them. See GitHub for the live list.
- **Relay generated-framework branch** (`codex/relay-generated-framework-20261025`, owned
  by an active Codex agent): its evidence is on main; its `programs/donation-relay`
  change is not, because CI pins that directory to source 15. Landing it needs a new
  Relay selection (current.json, source-selected.json and the Relay15 selection
  verifier).
- **Pinned tooling**: pass 27 freezes the 187 `scripts/*.py` files and their hashes, so
  the flat script directory and its duplicated LiteSVM boilerplate cannot be
  restructured yet. `repro/consolidation/2026-10-26/` can re-pin an edited asset, but
  adding or removing scripts changes the pinned set and needs a new guard generation.
- **Two automation lanes disagree**: the reconciliation pipeline archives and excludes
  recovery work that the Claude sessions validated. Section 3's decision resolves this.
- **Security audit**: incomplete. Differential tests are not an audit.
- **SDK acceptance**: the `@pump-fun/pump-sdk` harness last recorded 6/6 steps of the
  v2 create/buy/sell lifecycle, plus separate v3, incentives, Mayhem-create and AMM
  scripts, against the older overlay candidates (`5392c9a9…`, `cbe8c8e7…`). It was not
  re-run during this consolidation, so the current overlay builds are untested by it.
- **Local disk**: the primary checkout holds roughly 300 GB of ignored build output in
  `work/` and `target/`, used by the active Codex agent. Clean it once that agent stops.

## Consolidation record

| Source | Outcome |
| --- | --- |
| Primary checkout's uncommitted recovery work | Snapshotted as `1bec3365`, merged as `repro/behavioral-recovery/` |
| `codex/layered-reconstruction` | Merged: MIT `LICENSE`; its program edits went to the overlay |
| `review/reconstruction-2026-10-25` | Merged: nine A-reproduction build records |
| `codex/relay-generated-framework-20261025` @ `9f49231c` | Evidence squashed in; `programs/donation-relay` change left on the branch (§4) |
| Pull requests #32–#59 (except #34, closed as superseded by #38) | Merged by the parallel PR agent; included |
| Go-clone `codex/checkout-byte-preservation-transition` | Superseded by PR #32, which contains both commits plus the fix that kept the sealed attributes |
| Go-clone `research/pr8-harness-bindings-superseded` (`89634a4d`) | Not merged: self-labelled superseded, targets pass-22 bindings and edits two pinned scripts |
| Scratch worktrees `fees-edit`, `restruct-wt` | Removed after a byte-for-byte match against the banked restructure trees |
| Codex worktree `main-reconciliation` (`codex/layered-pass-36`) | Clean and contained in main; left for its owner |

## Open pull requests after consolidation

At consolidation (PR #61, 14:54 UTC on 2026-10-26) none were open. The 24 pull
requests open at the start (#32–#56 except #34, including draft #52) and the
review-fix pull requests #57–#59 had been merged. Later pull requests (#60 onward,
including PR #79's Mayhem initializer correction) are handled as they arrive.
