# Remaining work

Consolidated 2026-10-26, after merging every worktree, branch and pull request
into main. Numbers come from `repro/status.json`, `repro/donation-relay/current.json`,
the pass-27 current-state index and the evidence packages cited below.

## Summary

| Area | State | What is left |
| --- | --- | --- |
| Core byte identity | 0 / 4 programs | All four, plus Relay. Blocked mainly by unrecovered source layout and exact toolchain. |
| Dependencies | SPL Token, Token-2022, ATA reproduce exactly | Metaplex Utilize branch (1,509 bytes); promote the ATA result in `repro/dependency-status.json`. |
| Handlers | 140 / 150 accepted; 6 more validated in the overlay | Promote the overlay, finish five partial handlers, replay AMM `create_config`. |
| Process | One CI guard (pass 27) pins README, scripts, workflows and sources | Decide how recovered-but-not-byte-exact source is admitted; plan the next guard generation. |

## 1. Byte identity

The deployed binaries remain the target. A build counts only when the whole file
matches with no patching or padding.

### Core programs

| Program | Original windows | Current gap | Most recent lead |
| --- | ---: | --- | --- |
| Pump | 1,035 | Open PRs #47/#51 classify 497 unmatched windows: 72 metadata-only, 233 body, 192 missing | `file!()` workspace prefix recovers 5 windows (PR #45); metadata-only windows need call-site layout, not module renames (PR #48) |
| PumpSwap | 785 | 297 unmatched original windows | Restructured module tree banked under `repro/parallel-work/2026-10-25/independent-reconstruction-review/restructure/` (13 of 33 path strings recovered) |
| Fees | 585 | Function bodies largely match after masking; residual is layout, scheduling and panic `Location` line/column | First owner/discriminator account parser is the frontier (pass 36) |
| Mayhem | 441 | 177 bounded normalized matches, 7 admitted handler windows unmatched, 257 opaque | Linux-hosted toolchain confirmed by the alloc `Location` payload (`repro/mayhem/linux-v154-recovery/`) |
| Donation Relay | 492 | Selected source 15: 370 unmatched | Generated-framework reconstruction reaches 465/492 normalized windows (27 unmatched) but is not yet selected; see §4 |

Known structural blockers, from the byte-grind experiments:

- Exact compiler release is narrowed to platform-tools v1.44–v1.46.1 for Pump, AMM and
  Fees (ELF `e_machine` rules out v1.43), but not pinned to one release.
- Function order and relocation layout depend on original source item and link order.
- Panic `Location` path strings are recoverable from workspace layout; their line and
  column values need the original statement positions.
- High-similarity functions differ by instruction scheduling and register allocation,
  which source edits do not reliably control.

### Dependencies

- **ATA**: byte-identical through a reconstructed linker order
  (`repro/ata/reconstructed-order/`, hosted run 40287588927) and independently through
  one inert Cargo feature (`repro/ata/synthetic-ordering-exact-build/`).
  `repro/dependency-status.json` still says `unresolved`; updating it is a selection
  change and needs the usual review.
- **Metaplex Token Metadata**: 1,250 of 1,251 windows match. The 5,104-byte Utilize body
  remains, now traced to a compiler-stage branch-selection boundary
  (`repro/metaplex/branch-selection-audit/`). The pinned compiler image did not resolve
  candidate 11's compiler path (`repro/metaplex/compiler-image-observation/`).

## 2. Handler behavior

Accepted bounded reconstructions: Pump 48/56, PumpSwap 37/38, Fees 31/31, Mayhem 24/25.

The [behavioral recovery overlay](../repro/behavioral-recovery/README.md) adds six
validated handlers that are not in active source. Re-run during this consolidation
against a fresh build of the overlay on current main:

| Handler | Overlay result | Remaining |
| --- | --- | --- |
| `pump.admin_update_token_incentives` | 299 cases, 0 mismatches | Promotion (§3) |
| `pump.claim_token_incentives` | Recovered; its differential is tied to an older build record | Re-bind the differential to the overlay build and re-run |
| `pump.set_mayhem_virtual_params` | 84 cases, 0 mismatches via signer stub | Close the AccountInfo ownership question raised in review |
| `mayhem.initialize_mayhem_state` | 17 cases, 0 mismatches through pump's CPI | Standalone calls reject in a different order (candidate 3010 before mint deserialization; original 3012 then 2002). Likely fix: declare `mint_authority` as `UncheckedAccount` with a `signer` constraint |
| `pump.create_v2` Mayhem mode | 17 cases, 0 mismatches | Exhaustive ancestry and new Token-2022 extension modes |
| `pump.buy_v3`, `sell_v3`, `buy_exact_quote_in_v3` transfer-fee quotes | 126 cases, 0 mismatches | Other quote routes, exhaustive extension/account validation, final event suffix |

Still partial or unrecovered everywhere:

- `pump.multi_hop_curve_swap`: arbitrary hop counts, native/WSOL, other quote mints,
  completion/migration, Token-2022 and holder/cashback/Mayhem modes.
- `pump_amm.create_config`: compiled, but no authentic positive initializer replay.
- `pump.sell_v2`: confirmed quote transfer-fee minimum-output/event mismatch.
- Mayhem: non-initializer error-return ABI differences and five unknown `GlobalParams` field roles.

## 3. Decision needed: admitting recovered source

The overlay builds, passes its differentials and supports the SDK flows, but it cannot
enter `programs/` today:

- `scripts/verify_recovered_builds.py` hash-binds `programs/pump/src/{lib,trade,create_v2,admin_cto,volume_sync}.rs`
  to the selected checkpoint.
- The pass-27 guard lists the incentive, virtual-params and signer-stub paths as
  must-not-exist and treats those lanes as stopped.
- CI suites `pump-1` through `pump-4` hard-code the selected candidate hash.

Promoting it means choosing an acceptance tier for behaviorally validated but not
byte-exact source, building a new checkpoint from the overlay, regenerating its
comparison report, updating `repro/status.json`, re-running the bound differential
suites against the new candidate and issuing a new guard generation. That is a policy
call for the repository owner, not a mechanical merge.

## 4. Repository and process

- **Open pull requests**: see the list at the end of this file.
- **Relay generated-framework branch** (`codex/relay-generated-framework-20261025`, owned
  by an active Codex agent): its evidence is on main; its `programs/donation-relay`
  change is not, because CI pins that directory to source 15. Landing it needs a new
  Relay selection (current.json, source-selected.json and the Relay15 selection
  verifier).
- **Pinned tooling**: pass 27 freezes the 187 `scripts/*.py` files and their hashes, so
  the flat script directory and its duplicated LiteSVM boilerplate cannot be
  restructured yet. A next guard generation should allow reviewed script-set changes;
  `repro/consolidation/2026-10-26/` shows the transition pattern for single assets.
- **Two automation lanes disagree**: the reconciliation pipeline archives and excludes
  recovery work that the Claude sessions validated. Section 3's decision resolves this.
- **Security audit**: incomplete. Differential tests are not an audit.
- **SDK acceptance**: the `@pump-fun/pump-sdk` harness last recorded 6/6 flows against
  the overlay builds; it was not re-run during this consolidation.
- **Local disk**: the primary checkout holds roughly 300 GB of ignored build output in
  `work/` and `target/`, used by the active Codex agent. Clean it once that agent stops.

## Open pull requests after consolidation

Updated at merge time; see the consolidation commit on main.
