# pumpfun-source

Rust reconstruction of Pump.fun's Solana programs from captured binaries.

**Current binary coverage — 28 October 2026:** 3,271 / 3,338 function
windows match (98.0%); 67 remain unmatched. Three of five programs reproduce
their complete meaningful ELF.

| Program | Matched windows | Matched % | Raw-equal bodies | Normalized only | Unmatched | Whole ELF equal |
| --- | ---: | ---: | ---: | ---: | ---: | --- |
| [Pump Main](research/claude-pump-integration-20261027/r37-layout-31/README.md) | 990 / 1,035 | 95.7% | 166 | 824 | 45 | No |
| [PumpSwap / AMM](research/claude-amm-union3-20261028/README.md) | 763 / 785 | 97.2% | 160 | 603 | 22 | No |
| [Fees](research/claude-fees100-crank-donation-20261027/README.md) | 585 / 585 | 100.0% | 585 | 0 | 0 | **Yes** |
| [Mayhem](research/mayhem-meaningful-elf-20261028/README.md) | 441 / 441 | 100.0% | 441 | 0 | 0 | **Yes** |
| [Donation Relay](repro/donation-relay/canonical-exact-selection/README.md) | 492 / 492 | 100.0% | 492 | 0 | 0 | **Yes** |
| **Total** | **3,271 / 3,338** | **98.0%** | **1,844** | **1,427** | **67** | **3 / 5** |

Matched windows cover **4,722,600 / 5,213,128 code bytes (90.6%)**;
**490,528 bytes (9.4%)** remain outside matched windows.

These figures measure the latest published artifacts, including research not
integrated into the maintained source tree. Raw-equal bodies match byte for byte;
normalized matches mask specified call/address operands. Window coverage is not
a percentage of engineering work completed or proof of whole-program identity.
The Pump Main and AMM rows use source-only builds. Separate original-derived
linker layouts report 204 and 172 raw matches, respectively, without increasing
normalized coverage.

## Remaining work

- Recover the **45 Pump Main and 22 PumpSwap / AMM** unmatched windows.
- Close remaining call, data and relocation differences, integrate qualified
  source changes, and verify reproducible whole-program builds and uncovered behavior.
- Pump Main's 990-window build (L31) uses synthetic source-line positioning. Its
  44-suite captured-loader corpus passes against the exact candidate (10,468 cases,
  0 mismatches). On L30, 138 ordinary-log differences and 52 source-filename
  differences were recorded. Two follow-up packets port known Round47 notices with
  no window change:
  [empty-fee-sweep](research/pump-l30-fee-sweep-log-parity-20261028/README.md)
  (84/84 notices restored, 138 → 54 on L30) and
  [zero-cashback](research/pump-l24-cashback-log-parity-20261028/README.md)
  (34/34 notices on L24). Neither is composed into L31 yet.
- PumpSwap's 763-window research has **two reproduced incentive error-order
  differences in five signed synthetic pairs for each build**. Its full runtime receipts are not
  included, so the claimed 17,462-case summaries are not independently verified
  passes. The [maintained AMM checkpoint](repro/pump_amm/v2-mint-clone-recovery-20261028/README.md)
  remains at 660 windows; this research candidate is not approved for promotion.
  A separate [760-window integration](research/amm-v2-selector-union-recovery/README.md)
  resolves the tested incentive failures; it is not composed with the 763-window
  artifact. Its [signed-outcome witness](research/amm-h11-signed-outcome-witness-20261028/README.md)
  binds 1,805 accumulator/incentive cases to serialized signed transactions with
  zero error, state, rollback, CPI or event mismatches; its 327 remaining log
  differences are all source filename/line/column coordinates.
- Mayhem now [reproduces its complete meaningful ELF](research/mayhem-meaningful-elf-20261028/README.md):
  ordinary stripping of two fresh builds equals all 775,416 meaningful original bytes.
  The closing change moves one vendored-Anchor module declaration and rebinds the data layout.
  A [follow-up](research/mayhem-fresh-host-20261028/README.md) rebuilds the host macro from
  source, with no cached host artifacts, across three fresh chains. The recipe still uses
  a target-derived linker layout, so historical source/compiler provenance remains open.
- A newer unverified PumpSwap composite is archived and not counted above:
  [union-760](research/claude-mega-run-archive-20261028/amm/union-758-to-760.patch)
  (765 / 785 Linux source-only). The
  [mega-run archive](research/claude-mega-run-archive-20261028/README.md) holds
  its lane notes, deliveries and partial work.
- PumpSwap transfer-fee diagnostics now include a runtime trigger for line 57 with
  basis points above 10,000 ([bps overflow](research/amm-transfer-fee-bps-overflow-20261028/README.md));
  line 49 is still untriggered.

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
| Shared layout / navigation | 0/3 (0%) | 0/4 (0%) | Local shell exists; original layout and responsive states unqualified. |
| Home / feed | 0/3 (0%) | 0/4 (0%) | Feed placeholder; captured content is not a local feed implementation. |
| Explore / search | 0/3 (0%) | 0/4 (0%) | Search page scaffold; filters, pagination and results unimplemented. |
| Leaderboards / competitions | 0/3 (0%) | 0/4 (0%) | Route scaffold only. |
| Live discovery / playback | 0/3 (0%) | 0/4 (0%) | Live route scaffold; media and realtime behavior not implemented. |
| GO | 0/3 (0%) | 0/4 (0%) | Route scaffold; campaign behavior and API binding unknown. |
| Mayhem | 0/3 (0%) | 0/4 (0%) | Route scaffold only. |
| Holder rewards | 0/3 (0%) | 0/4 (0%) | Route scaffold; reward state and claims unimplemented. |
| Create coin / upload | 0/3 (0%) | 0/4 (0%) | Route scaffold; no signing, upload or transaction flow. |
| Profiles / social graph | 0/3 (0%) | 0/4 (0%) | Planned route; identity, profile and social components unimplemented. |
| Authentication / wallets | 0/3 (0%) | 0/4 (0%) | No local authenticated UI or wallet workflow. |
| Portfolio / positions | 0/3 (0%) | 0/4 (0%) | No local portfolio UI. |
| Settings / notifications | 0/3 (0%) | 0/4 (0%) | No local settings or notification UI. |
| Legal / fee information | 0/3 (0%) | 0/4 (0%) | Placeholders, not reconstructed document content. |

**Excluded (N/A, outside every feature denominator):** Support/Intercom; Terminal/Padre; Native/mobile app and app promotion; Individual coin/token detail pages; /pump-token ($PUMP).
**Deferred (N/A):** Perps/Hyperliquid; Separate PumpSwap/revenue/GO microsites.

All app percentages above are generated by `python3 app/scripts/progress.py` from the checked-in evidence and feature ledger. Verify freshness with `python3 app/scripts/progress.py --check`. Source capture is bounded by the recorded snapshot; original frontend source completeness and the full internal API surface remain unknown.
<!-- app-progress:end -->

## License

Repository code and documentation are [MIT licensed](LICENSE). Third-party
sources and artifacts retain their original licenses and ownership.
