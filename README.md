# pumpfun-source

Reconstructed Rust source for Pump.fun's Solana programs, with captured binaries,
reproducible builds and local differential tests.

**Progress as of 27 October 2026: all four core programs still differ from their
captured binaries. The selected Donation Relay reconstruction reproduces its complete meaningful
ELF and, through a separate loader deployment, its captured payload.**

## Current progress

[Current main-Pump parallel research snapshot](research/main-pump-parallel-checkpoint-20261027/README.md) preserves the verified intermediates and in-progress source beyond the maintained checkpoint.

**Main Pump: 68.1% of function windows matched; 47.2% of original text covered. Complete reconstruction remains unfinished.**

Across the latest verified checkpoints, **2,803 / 3,338 inferred function windows
match (84.0%)**. Their matched windows cover **3,588,912 / 5,213,128 original text
bytes (68.8%)**. **One of five programs has complete meaningful-ELF identity**;
all four core contracts still differ from their captured binaries.

These percentages measure bounded binary-recovery progress, not a claim that
84.0% of the engineering work is finished. Complete reconstruction also requires
all remaining code, calls, data, relocations and build provenance.

| Latest verified checkpoint | Matched windows | Matched % | Raw-equal bodies | Normalized only | Unmatched | Whole ELF equal |
| --- | ---: | ---: | ---: | ---: | ---: | --- |
| [Pump Round20](repro/pump/main-contract-round20-20261027/README.md) | 705 / 1,035 | 68.1% | 120 | 585 | 330 | No |
| [PumpSwap / AMM](repro/pump_amm/native-fee-cpi-recovery-20261027/README.md) | 599 / 785 | 76.3% | 125 | 474 | 186 | No |
| [Fees research](research/fees-readonly-order-recovery/README.md) | 578 / 585 | 98.8% | 198 | 380 | 7 | No |
| [Mayhem research](research/mayhem-trade-origins-validator/README.md) | 429 / 441 | 97.3% | 100 | 329 | 12 | No |
| [Donation Relay](repro/donation-relay/canonical-exact-selection/README.md) | 492 / 492 | 100.0% | 492 | 0 | 0 | **Yes** |
| **Total** | **2,803 / 3,338** | **84.0%** | **1,035** | **1,768** | **535** | **1 / 5** |

“Windows” are inferred original machine-function ranges, including framework and
runtime helpers. Complete normalized matches mask specified call/address
operands; they do not prove the referenced callees or data match. Each original
window counts once. Raw equality means that local body is byte-equal, not that
the whole program is identical.

| Checkpoint | Text bytes in matched windows | Text covered | Unmatched text |
| --- | ---: | ---: | ---: |
| Pump Round20 | 845,272 / 1,792,208 | 47.2% | 946,936 |
| PumpSwap / AMM | 663,840 / 1,162,040 | 57.1% | 498,200 |
| Fees research | 731,856 / 799,648 | 91.5% | 67,792 |
| Mayhem research | 595,456 / 706,744 | 84.3% | 111,288 |
| Donation Relay | 752,488 / 752,488 | 100.0% | 0 |
| **Total** | **3,588,912 / 5,213,128** | **68.8%** | **1,624,216** |

Pump and AMM rows describe the verified maintained sources. Fees and Mayhem rows
are the latest upstream research frontiers, distinct from their maintained
selections in [repro/status.json](repro/status.json). The maintained Mayhem initializer now has its own [current-source build and
signed validation](repro/mayhem/initializer-current-20261027/README.md), separate
from the larger research frontier. Upstream Relay's canonical selection remains
the authority for its exact result.

Relay reproduces all **818,280 meaningful ELF bytes**. Its separate signed local
loader replay reproduces the **830,448-byte captured payload**, including 12,168
loader-allocated zero bytes. This does not establish the original historical
source or build recipe.

## Behavior and remaining work

Pump Round20 passes 10,468 full cases plus 5,278 focused executions, with 15,742
paired diagnostic-log cases. AMM passes 17,462 full cases plus the separate
account, fee, CPI, boundary and error-order matrices recorded in its checkpoint.
These corpora overlap and must not be summed as unique scenarios. Tests use
captured programs in local VMs; they do not establish current-chain acceptance.

The latest [Mayhem trade-origin and validator recovery](research/mayhem-trade-origins-validator/README.md)
adds the complete 1,296-byte normalized quote validator with its eight immediate
callees and fourteen typed data references checked. It reaches 429 normalized
and retains all 100 raw matches. Three partial trade handlers now reproduce 21
Source records and three CPI error origins. Two qualified builds agree, and 65
fresh case pairs pass. Twelve bodies, a required allocator specialization and
whole-ELF identity remain unresolved; older runtime receipts keep their original
artifact bindings.

A [same-IR compiler diagnostic](research/mayhem-host-llvm-comparison/README.md)
produces identical Mac and Linux LLVM objects for one earlier initializer
control. This narrows that investigation without adding a function match.

An [allocator-context experiment](research/mayhem-allocator-context/README.md)
reproduces the missing reserve helper through a zeroed-allocation probe. It
identifies a compiler condition to recover through justified source; the probe
remains a diagnostic and the current reconstruction counts are unchanged.

The latest [Fees readonly-order recovery](research/fees-readonly-order-recovery/README.md)
reproduces all 21,079 readonly bytes while preserving 578 normalized and 198 raw
function matches, all 105 Source records and 379 checked data-pointer targets.
Two native builds agree and all 17,331 fresh comparisons pass. Seven functions,
absolute layout and complete ELF identity remain unresolved.

The latest [PumpSwap native-fee and CPI recovery](repro/pump_amm/native-fee-cpi-recovery-20261027/README.md) adds 13 matching windows and fixes native fee handling, buyback diagnostics and multihop real-reserve protection. All 17,462 full cases and the expanded signed probes pass; 186 AMM windows remain.

Remaining priorities are the 330 Pump, 186 AMM, 7 Fees and 12 Mayhem unmatched
windows; deeper call/data/relocation identity; original build provenance; and
uncovered behavior such as authentic fixed-admin AMM `create_config` success.
The historical [150-handler audit](repro/reconstruction-audit-2026-10-26/handlers.md)
remains a separate bounded classification; newer function matches do not
retroactively certify every handler.

See [remaining work](docs/REMAINING-WORK.md),
[current reconstruction review](docs/RECONSTRUCTION-STATUS.md) and the
[research history](docs/BYTE-IDENTITY-PROGRESS.md) for evidence and limitations.

## Dependencies

| Dependency | Current byte result |
| --- | --- |
| SPL Token | 108,600 / 108,600 captured bytes reproduced (100%) |
| Token-2022 | 611,056 / 611,056 meaningful ELF bytes reproduced (100%); full 1,382,016-byte allocation requires 770,960 separately added zero bytes |
| Associated Token Account | 105,032 / 105,032 bytes reproduced (100%) by two non-historical research recipes; authentic recipe and selected promotion unresolved |
| Metaplex Token Metadata | Latest reviewed inventory: 1,509 differing positions—1,477 text, 30 source-coordinate and 2 relocation bytes; allocation padding assessed separately |

[Dependency evidence and selection status](repro/dependency-status.json).
Allocation-image equality is separate from unchanged compiler-output equality.

## Quick start

Use Python 3.12. Clone without line-ending conversion to preserve evidence hashes:

```sh
git clone --config core.autocrlf=false https://github.com/lalalune/pumpfun-source.git
cd pumpfun-source
python3 scripts/verify_evidence.py
python3 scripts/test_tooling.py
python3 -m venv .venv
.venv/bin/pip install -r requirements.txt
.venv/bin/python scripts/local_validation.py
```

Build and compare instructions: [tooling guide](docs/TOOLING.md) and
[scripts index](scripts/README.md). Source is in `programs/`, captured comparison
inputs in `evidence/`, and reproducibility records in `repro/` and `research/`.
See also [scope](docs/SCOPE.md), [security policy](SECURITY.md) and
[audit scope](audit/AUDIT.md).

## License

This repository's own code and documentation are released under the
[MIT License](LICENSE). Third-party and vendored materials (for example the
Apache-2.0 Solana SDK files under `programs/pump-amm/vendor`, imported research
and retained crate archives) keep their original licenses, and upstream Pump IDLs
and binaries remain with their original authors.
