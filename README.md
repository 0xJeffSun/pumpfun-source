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
