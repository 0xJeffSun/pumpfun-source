# pumpfun-source

Rust reconstruction of Pump.fun's Solana programs from captured binaries.

**Current binary coverage — 28 October 2026:** 3,320 / 3,338 function
windows match (99.5%); 18 remain unmatched. Three of five programs reproduce
their complete meaningful ELF.

| Program | Matched windows | Matched % | Raw-equal bodies | Normalized only | Unmatched | Whole ELF equal |
| --- | ---: | ---: | ---: | ---: | ---: | --- |
| [Pump Main](research/claude-pump-integration-20261027/r37-layout-41/README.md) | 1,019 / 1,035 | 98.5% | 168 | 851 | 16 | No |
| [PumpSwap / AMM](research/claude-amm-union12-20261028/README.md) | 783 / 785 | 99.7% | 236 | 547 | 2 | No |
| [Fees](research/claude-fees100-crank-donation-20261027/README.md) | 585 / 585 | 100.0% | 585 | 0 | 0 | **Yes** |
| [Mayhem](research/mayhem-meaningful-elf-20261028/README.md) | 441 / 441 | 100.0% | 441 | 0 | 0 | **Yes** |
| [Donation Relay](repro/donation-relay/canonical-exact-selection/README.md) | 492 / 492 | 100.0% | 492 | 0 | 0 | **Yes** |
| **Total** | **3,320 / 3,338** | **99.5%** | **1,922** | **1,398** | **18** | **3 / 5** |

Matched windows cover **5,014,880 / 5,213,128 code bytes (96.2%)**;
**198,248 bytes (3.8%)** remain outside matched windows.

These figures measure the latest published artifacts, including research not
integrated into the maintained source tree. Raw-equal bodies match byte for byte;
normalized matches mask specified call/address operands. Window coverage is not
a percentage of engineering work completed or proof of whole-program identity.
The Pump Main row is the composed [L41](research/claude-pump-integration-20261027/r37-layout-41/README.md)
build (L40 plus the legacy-sell boundary, repository Linux profile): 1,019 normalized and
168 raw. The AMM row is a
source-only Linux v1.44 build. Separately labeled linker layouts generated from the
original program report 293 (L41) and 259 (AMM) raw matches without increasing
normalized coverage.

## Remaining work

- Recover the **16 Pump Main and 2 PumpSwap / AMM** unmatched windows. The AMM
  remainder is `0x351a8 0x4c750`.
- Close remaining call, data and relocation differences, integrate qualified
  source changes, and verify reproducible whole-program builds and uncovered behavior.
- Pump Main reaches 1,019 windows with the
  [legacy-sell cashback boundary](research/pump-legacy-sell-boundary-20261028/README.md)
  (`0x152888`, all 8,488 bytes; 0 losses; 182 signed paired runtime cases) on L38. The
  composed line continues through data-side steps
  [L39](research/claude-pump-integration-20261027/r37-layout-39/README.md) and
  [L40](research/claude-pump-integration-20261027/r37-layout-40/README.md) to
  [L41](research/claude-pump-integration-20261027/r37-layout-41/README.md), which adds the
  legacy-sell boundary (1,019 windows, raw-ready 1,005/1,019 with the layout layer, 44-suite
  corpus 10,468 cases, 0 mismatches). Behavior corrections qualified with signed
  original/candidate replays and no window loss, not yet composed into one build:
  [v2 whitelist reserve sync](research/pump-v2-whitelist-sync-20261028/README.md),
  [v3 sell recovery](research/pump-l39-v3sell-recovery-20261028/README.md) (128 cases),
  [sweep zero-recipient guard](research/pump-l38-sweep-zero-recipient-20261028/README.md) (error 6000),
  [multi-hop crossing guard](research/pump-multi-hop-crossing-guard-20261028/README.md) (error 6021),
  [cashback-v2 quote-program guard](research/pump-l38-cashback-quote-program-20261028/README.md),
  [direct-route FeeConfig selection](research/pump-direct-route-fee-config-20261028/README.md) and the
  [checked cashback decoder](research/pump-checked-cashback-decoder-20261028/README.md).
- PumpSwap's [783-window union11](research/claude-amm-union11-20261028/README.md) recovers
  the volume updater (`0x6db20`) over the 782-window union10, with 0 normalized or raw losses;
  [union12](research/claude-amm-union12-20261028/README.md) is a data-side step with the same
  window sets. All nine panic Location operands in `0x6db20` now match the original
  ([panic locations](research/amm-incentive-panic-locations-20261028/README.md); 17,462 cases),
  and a [signed cashback witness](research/amm-cashback-signed-verification-20261028/README.md)
  covers the still-unmatched `distribute_cashback` helper (`0x351a8`; 146 cases, 0 mismatches).
  The [maintained AMM checkpoint](repro/pump_amm/v2-mint-clone-recovery-20261028/README.md)
  remains at 660 windows; research candidates are not promoted.
- Mayhem now [reproduces its complete meaningful ELF](research/mayhem-meaningful-elf-20261028/README.md):
  ordinary stripping of two fresh builds equals all 775,416 meaningful original bytes.
  The closing change moves one vendored-Anchor module declaration and rebinds the data layout.
  A [follow-up](research/mayhem-fresh-host-20261028/README.md) rebuilds the host macro from
  source, with no cached host artifacts, across three fresh chains. The recipe still uses
  a target-derived linker layout, so historical source/compiler provenance remains open.
  Static data proofs continue on the qualified437 image:
  [Anchor log formatter pieces](research/mayhem-current437-format-pieces-20261028/README.md),
  [counted account-name intervals](research/mayhem-current437-account-names-20261028/README.md)
  (125 `with_account_name` sites) and
  [`MayhemError` Display messages](research/mayhem-current437-mayhem-error-display-20261028/README.md)
  (20 messages, 531 bytes).
- Binary analysis packets ([window](research/pump-window-analysis-20261028/README.md),
  [deep disassembly](research/pump-deep-disasm-20261028/README.md) and
  [section](research/pump-section-analysis-20261028/README.md) analyses for each program, and a
  [reconstruction roadmap](research/reconstruction-roadmap-20261028/README.md)) describe the
  deployed binaries; the roadmap's open-window lists use the maintained checkpoints, not the
  research frontier above.
- PumpSwap transfer-fee diagnostics with basis points above 10,000 now trigger all
  three overflow sites at runtime: lines 57/67 for
  [deposit/withdraw](research/amm-transfer-fee-bps-overflow-20261028/README.md) and
  [v2 trades](research/amm-trade-v2-bps-overflow-20261028/README.md), and
  [line 49](research/amm-withdraw-bps-overflow-line49-20261028/README.md). Deployed and
  rebuilt programs agree in each case.

The linked program reports contain source, build and validation evidence.
[Build and verification guide](docs/TOOLING.md) ·
[Scripts](scripts/README.md) ·
[Dependency status](repro/dependency-status.json)

<!-- app-progress:start -->
## Application source and feature progress

As of **2026-10-28**. The [app workspace](app/README.md) contains the SDK, frontend and independent API-compatible backend. [PRD](app/PRD.md) · [Detailed ledger](app/contracts/feature-progress.json) · [Validation](app/evidence/validation.json).

Source acquisition/extraction is separate from editable feature reconstruction and working behavior. Percentages below use explicit counts or accepted milestones; they are not estimates of engineering effort. The original backend source is unavailable.

| Source / evidence measure | Complete / inventoried | Progress | Meaning |
| --- | ---: | ---: | --- |
| Published SDK source | 31 / 31 files | 100% | Exact npm 4.3.1 source bytes; full behavior parity still unqualified |
| Frontend JavaScript capture | 648 / 648 scripts | 100% | Known scripts in the captured route/asset graph only |
| Frontend factory extraction | 4915 / 4915 inventoried variants | 100% | Extracted factories, not original source files; authenticated/unseen modules unknown |
| Public developer API contract | 67 / 67 documented operations | 100% | Specification captured; native compatibility 0 / 67 (0%) |
| Original backend source | Not observable | N/A | Implement replacement behavior from API evidence |

**Feature scoring:** source = contract/dependency mapping, editable logic, and required adapters (3 milestones). Completion = source accepted, successful behavior, failure/auth states, and UI or data consistency checks (4 milestones). A milestone needs evidence to count. Stubs, 501 responses and historical fixture replay earn no feature credit. N/A needs an explicit applicability decision.

### Backend features

| Feature family | Static API leads¹ | Native source readiness | Feature completion | Reviewed state |
| --- | ---: | ---: | ---: | --- |
| Identity / authentication | 30 | 0/3 (0%) | 0/4 (0%) | Original auth, sessions and authorization unavailable. |
| Profiles / follow graph | 70 | 0/3 (0%) | 0/4 (0%) | No native profile or graph handlers. |
| Feed / posts / callouts | 39 | 0/3 (0%) | 0/4 (0%) | No native content handlers or persistence. |
| Market discovery / search | 35 | 0/3 (0%) | 0/4 (0%) | One dated price fixture; no native discovery or price service. |
| Leaderboards / competitions | 27 | 0/3 (0%) | 0/4 (0%) | No native ranking, PnL or competition logic. |
| Livestream / presence | 9 | 0/3 (0%) | 0/4 (0%) | LiveKit configuration observed; no native orchestration. |
| Coin creation / media | 4 | 0/3 (0%) | 0/4 (0%) | No upload or metadata lifecycle; SDK source is tracked separately. |
| Rewards / fees / referrals | 12 | 0/3 (0%) | 0/4 (0%) | No native reward accounting or claims. |
| Portfolio / indexing | 17 | 0/3 (0%) | 0/4 (0%) | No local indexer, portfolio read models or reorg handling. |
| Settings / notifications | 29 | 0/3 (0%) | 0/4 (0%) | No native preferences, notification or messaging handlers. |

¹ 330 distinct static operation candidates overall. Family leads overlap, lack confirmed origin bindings and may include privileged/excluded paths; do not sum them or treat them as a full API denominator. The 67 public developer operations currently have **0% native compatibility qualification**: `content.read` 0/18, `graph.read` 0/17, `leaderboards.read` 0/11, `moderation.read` 0/1, `positions.read` 0/7, `profiles.read` 0/13.

### Frontend features

| Feature family | Reconstructed source readiness | Feature completion | Reviewed state |
| --- | ---: | ---: | --- |
| Shared layout / navigation | 3/3 (100%) | 3/4 (75%) | Evidence-mapped responsive shell, active navigation, search URL state and failure boundaries pass browser tests. Pixel-level reference parity remains unqualified. |
| Home / feed | 3/3 (100%) | 3/4 (75%) | Evidence-mapped, hash-bound synthetic examples, strict local validation and honest For You/Following boundaries pass unit and browser tests. Native feed compatibility, authenticated personalization and original visual parity remain unqualified. |
| Explore / search | 3/3 (100%) | 3/4 (75%) | Authenticated one-record historical snapshot, fail-closed adapter and offline name/symbol/mint search pass unit and browser tests. Native market discovery, production ranking and original visual parity remain unqualified. |
| Leaderboards / competitions | 3/3 (100%) | 2/4 (50%) | Contract-driven read-only interface and failure paths verified. Live API success and original visual parity remain unqualified. |
| Live discovery / playback | 0/3 (0%) | 0/4 (0%) | Live route scaffold; media and realtime behavior not implemented. |
| GO | 0/3 (0%) | 0/4 (0%) | Route scaffold; campaign behavior and API binding unknown. |
| Mayhem | 0/3 (0%) | 0/4 (0%) | Route scaffold only. |
| Holder rewards | 3/3 (100%) | 3/4 (75%) | Published-SDK offline PDA derivation, validation and unavailable states pass unit and browser tests. Live account existence, balances, eligibility, claims and original visual parity remain unqualified. |
| Create coin / upload | 3/3 (100%) | 3/4 (75%) | Evidence-mapped offline metadata drafting, validation, local image preview and failure states pass browser tests. Upload, wallet signing, transaction creation, token launch and original visual parity remain unqualified. |
| Profiles / social graph | 3/3 (100%) | 3/4 (75%) | Evidence-mapped, hash-bound synthetic profiles resolve by exact user id or wallet and render filtered authored posts with responsive browser coverage. Native profile compatibility, follow graph, authenticated behavior and original visual parity remain unqualified. |
| Authentication / wallets | 0/3 (0%) | 0/4 (0%) | No local authenticated UI or wallet workflow. |
| Portfolio / positions | 0/3 (0%) | 0/4 (0%) | No local portfolio UI. |
| Settings / notifications | 0/3 (0%) | 0/4 (0%) | No local settings or notification UI. |
| Legal / fee information | 3/3 (100%) | 3/4 (75%) | Authenticated archived fee, privacy and terms documents now render through a fail-closed offline adapter with responsive navigation and corruption tests. Current legal authority and original visual parity remain unqualified. |

**Excluded (N/A, outside every feature denominator):** Support/Intercom; Terminal/Padre; Native/mobile app and app promotion; Individual coin/token detail pages; /pump-token ($PUMP).
**Deferred (N/A):** Perps/Hyperliquid; Separate PumpSwap/revenue/GO microsites.

All app percentages above are generated by `python3 app/scripts/progress.py` from the checked-in evidence and feature ledger. Verify freshness with `python3 app/scripts/progress.py --check`. Source capture is bounded by the recorded snapshot; original frontend source completeness and the full internal API surface remain unknown.
<!-- app-progress:end -->

## License

Repository code and documentation are [MIT licensed](LICENSE). Third-party
sources and artifacts retain their original licenses and ownership.
