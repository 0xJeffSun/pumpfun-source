# pumpfun-source

Rust reconstruction of Pump.fun's Solana programs from captured binaries.

**Current development progress — 28 October 2026:** 3,253 / 3,338 function
windows match (97.5%); 85 remain unmatched. Two of five programs reproduce
their complete meaningful ELF.

| Program | Matched windows | Matched % | Raw-equal bodies | Normalized only | Unmatched | Whole ELF equal |
| --- | ---: | ---: | ---: | ---: | ---: | --- |
| [Pump Main](research/claude-pump-integration-20261027/r37-layout-24/README.md) | 982 / 1,035 | 94.9% | 166 | 816 | 53 | No |
| [PumpSwap](research/claude-amm-union-20261028/README.md) | 755 / 785 | 96.2% | 159 | 596 | 30 | No |
| [Fees](research/claude-fees100-crank-donation-20261027/README.md) | 585 / 585 | 100.0% | 585 | 0 | 0 | **Yes** |
| [Mayhem](research/claude-mayhem-439-20261028/README.md) | 439 / 441 | 99.5% | 141 | 298 | 2 | No |
| [Donation Relay](repro/donation-relay/canonical-exact-selection/README.md) | 492 / 492 | 100.0% | 492 | 0 | 0 | **Yes** |
| **Total** | **3,253 / 3,338** | **97.5%** | **1,543** | **1,710** | **85** | **2 / 5** |

Matched windows cover **4,607,840 / 5,213,128 code bytes (88.4%)**;
**605,288 bytes (11.6%)** remain outside matched windows.

These figures use the latest published, manually checked artifacts, including
research still awaiting integration into the maintained source tree. Raw-equal
bodies match byte for byte; normalized matches mask specified call/address
operands. Window coverage is not a percentage of engineering work completed.

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

## Remaining work

- Recover the **53 Pump, 30 PumpSwap and 2 Mayhem** unmatched windows.
- Close the remaining call, data and relocation differences, complete source
  integration, and verify reproducible whole-program builds and uncovered behavior.
- Preserve the evidence limits: Pump's 982-window ELF is statically verified only
  and uses synthetic source-line positioning. The 977-window build retains 10,468
  state/diagnostic comparisons, with 141 non-filename log differences. PumpSwap's
  full runtime receipts are omitted; its summary does not establish a reviewed pass.

The linked program reports contain source, build and validation evidence.
[Build and verification guide](docs/TOOLING.md) ·
[Scripts](scripts/README.md) ·
[Dependency status](repro/dependency-status.json)

## License

Repository code and documentation are [MIT licensed](LICENSE). Third-party
sources and artifacts retain their original licenses and ownership.
