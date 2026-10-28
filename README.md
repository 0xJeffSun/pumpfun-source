# pumpfun-source

Rust reconstruction of Pump.fun's Solana programs from captured binaries.

**Current binary coverage — 28 October 2026:** 3,270 / 3,338 function
windows match (98.0%); 68 remain unmatched. Two of five programs reproduce
their complete meaningful ELF.

| Program | Matched windows | Matched % | Raw-equal bodies | Normalized only | Unmatched | Whole ELF equal |
| --- | ---: | ---: | ---: | ---: | ---: | --- |
| [Pump Main](research/claude-pump-integration-20261027/r37-layout-30/README.md) | 989 / 1,035 | 95.6% | 166 | 823 | 46 | No |
| [PumpSwap / AMM](research/claude-amm-union3-20261028/README.md) | 763 / 785 | 97.2% | 160 | 603 | 22 | No |
| [Fees](research/claude-fees100-crank-donation-20261027/README.md) | 585 / 585 | 100.0% | 585 | 0 | 0 | **Yes** |
| [Mayhem](research/claude-mayhem-441-20261028/README.md) | 441 / 441 | 100.0% | 441 | 0 | 0 | No |
| [Donation Relay](repro/donation-relay/canonical-exact-selection/README.md) | 492 / 492 | 100.0% | 492 | 0 | 0 | **Yes** |
| **Total** | **3,270 / 3,338** | **98.0%** | **1,844** | **1,426** | **68** | **2 / 5** |

Matched windows cover **4,721,320 / 5,213,128 code bytes (90.6%)**;
**491,808 bytes (9.4%)** remain outside matched windows.

These figures measure the latest published artifacts, including research not
integrated into the maintained source tree. Raw-equal bodies match byte for byte;
normalized matches mask specified call/address operands. Window coverage is not
a percentage of engineering work completed or proof of whole-program identity.
The Pump Main and AMM rows use source-only builds. Separate original-derived
linker layouts report 204 and 172 raw matches, respectively, without increasing
normalized coverage.

## Remaining work

- Recover the **46 Pump Main and 22 PumpSwap / AMM** unmatched windows.
- Close remaining call, data and relocation differences, integrate qualified
  source changes, and verify reproducible whole-program builds and uncovered behavior.
- Pump Main's 989-window build uses synthetic source-line positioning. Its 10,468
  saved state/error comparisons agree, but 138 ordinary-log differences and
  52 source-filename differences remain. The 44 referenced loader receipts are
  not included as complete payloads.
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
- Mayhem matches all function bodies, but **30 bytes still differ** in dynamic-symbol
  ordering and relocation metadata. Whole-ELF identity and historical build
  provenance remain open. The archived 441-window builds now also
  [reproduce from fresh native dependencies](research/mayhem-current441-native-20261028/README.md).
- Newer unverified composites are archived, not counted above:
  [Pump Main L31](research/claude-mega-run-archive-20261028/pump/L30-to-L31.patch)
  (990 / 1,035 source-only) and
  [PumpSwap union-760](research/claude-mega-run-archive-20261028/amm/union-758-to-760.patch)
  (765 / 785 Linux source-only). Neither has a verified packet yet; the
  [mega-run archive](research/claude-mega-run-archive-20261028/README.md) holds
  their lane notes, deliveries and partial work.

The linked program reports contain source, build and validation evidence.
[Build and verification guide](docs/TOOLING.md) ·
[Scripts](scripts/README.md) ·
[Dependency status](repro/dependency-status.json)

## License

Repository code and documentation are [MIT licensed](LICENSE). Third-party
sources and artifacts retain their original licenses and ownership.
