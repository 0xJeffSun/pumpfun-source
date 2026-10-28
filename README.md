# pumpfun-source

Rust reconstruction of Pump.fun's Solana programs from captured binaries.

**Current binary coverage — 28 October 2026:** 3,259 / 3,338 function
windows match (97.6%); 79 remain unmatched. Two of five programs reproduce
their complete meaningful ELF.

| Program | Matched windows | Matched % | Raw-equal bodies | Normalized only | Unmatched | Whole ELF equal |
| --- | ---: | ---: | ---: | ---: | ---: | --- |
| [Pump Main](research/claude-pump-integration-20261027/r37-layout-24/README.md) | 982 / 1,035 | 94.9% | 166 | 816 | 53 | No |
| [PumpSwap / AMM](research/claude-amm-union2-20261028/README.md) | 759 / 785 | 96.7% | 159 | 600 | 26 | No |
| [Fees](research/claude-fees100-crank-donation-20261027/README.md) | 585 / 585 | 100.0% | 585 | 0 | 0 | **Yes** |
| [Mayhem](research/claude-mayhem-441-20261028/README.md) | 441 / 441 | 100.0% | 441 | 0 | 0 | No |
| [Donation Relay](repro/donation-relay/canonical-exact-selection/README.md) | 492 / 492 | 100.0% | 492 | 0 | 0 | **Yes** |
| **Total** | **3,259 / 3,338** | **97.6%** | **1,843** | **1,416** | **79** | **2 / 5** |

Matched windows cover **4,670,016 / 5,213,128 code bytes (89.6%)**;
**543,112 bytes (10.4%)** remain outside matched windows.

These figures measure the latest published artifacts, including research not
integrated into the maintained source tree. Raw-equal bodies match byte for byte;
normalized matches mask specified call/address operands. Window coverage is not
a percentage of engineering work completed or proof of whole-program identity.

## Remaining work

- Recover the **53 Pump Main and 26 PumpSwap / AMM** unmatched windows.
- Close remaining call, data and relocation differences, integrate qualified
  source changes, and verify reproducible whole-program builds and uncovered behavior.
- Pump Main's 982-window ELF is statically verified and uses synthetic source-line
  positioning. The separate 977-window build retains 10,468 state/diagnostic
  comparisons with 141 non-filename log differences.
- PumpSwap's 759-window research artifact has **two reproduced incentive error-order
  differences in five signed synthetic pairs**. Its full runtime receipts are not
  included, so the claimed 17,462-case summary is not an independently verified
  pass. The [maintained AMM checkpoint](repro/pump_amm/v2-mint-clone-recovery-20261028/README.md)
  remains at 660 windows; this research candidate is not approved for promotion.
- Mayhem matches all function bodies, but **30 bytes still differ** in dynamic-symbol
  ordering and relocation metadata. Whole-ELF identity and historical build
  provenance remain open.

The linked program reports contain source, build and validation evidence.
[Build and verification guide](docs/TOOLING.md) ·
[Scripts](scripts/README.md) ·
[Dependency status](repro/dependency-status.json)

## License

Repository code and documentation are [MIT licensed](LICENSE). Third-party
sources and artifacts retain their original licenses and ownership.
