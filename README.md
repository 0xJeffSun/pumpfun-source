# pumpfun-source

Rust reconstruction of Pump.fun's Solana programs from captured binaries.

**Current development progress — 28 October 2026:** 3,238 / 3,338 function
windows match (97.0%); 100 remain unmatched. Two of five programs reproduce
their complete meaningful ELF.

| Program | Matched windows | Matched % | Raw-equal bodies | Normalized only | Unmatched | Whole ELF equal |
| --- | ---: | ---: | ---: | ---: | ---: | --- |
| [Pump Main](research/claude-pump-integration-20261027/r37-layout-15/README.md) | 967 / 1,035 | 93.4% | 147 | 820 | 68 | No |
| [PumpSwap](research/claude-amm-union-20261028/README.md) | 755 / 785 | 96.2% | 159 | 596 | 30 | No |
| [Fees](research/claude-fees100-crank-donation-20261027/README.md) | 585 / 585 | 100.0% | 585 | 0 | 0 | **Yes** |
| [Mayhem](research/claude-mayhem-439-20261028/README.md) | 439 / 441 | 99.5% | 141 | 298 | 2 | No |
| [Donation Relay](repro/donation-relay/canonical-exact-selection/README.md) | 492 / 492 | 100.0% | 492 | 0 | 0 | **Yes** |
| **Total** | **3,238 / 3,338** | **97.0%** | **1,524** | **1,714** | **100** | **2 / 5** |

Matched windows cover **4,561,664 / 5,213,128 code bytes (87.5%)**;
**651,464 bytes (12.5%)** remain outside matched windows.

These figures use the latest published, manually checked artifacts, including
research still awaiting integration into the maintained source tree. Raw-equal
bodies match byte for byte; normalized matches mask specified call/address
operands. Window coverage is not a percentage of engineering work completed.

## Remaining work

- Recover the **68 Pump, 30 PumpSwap and 2 Mayhem** unmatched windows.
- Close the remaining call, data and relocation differences, complete source
  integration, and verify reproducible whole-program builds and uncovered behavior.
- Preserve the evidence limits: Pump's current artifact includes synthetic
  source-line positioning; its separately reported 972-window build is excluded
  because that ELF is not retained. PumpSwap's full runtime receipts are omitted,
  so its retained execution summary does not establish a reviewed runtime pass.

The linked program reports contain source, build and validation evidence.
[Build and verification guide](docs/TOOLING.md) ·
[Scripts](scripts/README.md) ·
[Dependency status](repro/dependency-status.json)

## License

Repository code and documentation are [MIT licensed](LICENSE). Third-party
sources and artifacts retain their original licenses and ownership.
