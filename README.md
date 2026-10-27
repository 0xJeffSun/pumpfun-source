# pumpfun-source

Reconstructed Rust source for Pump.fun's Solana programs, with captured binaries,
reproducible builds and local differential tests.

**Progress as of 27 October 2026: all four core programs still differ from their
captured binaries. The selected Donation Relay reconstruction reproduces its complete meaningful
ELF and, through a separate loader deployment, its captured payload.**

## Current progress

Across the latest verified checkpoints, **2,680 / 3,338 inferred function windows
match (80.3%)**. Their matched windows cover **3,227,184 / 5,213,128 original text
bytes (61.9%)**. **One of five programs has complete meaningful-ELF identity**;
all four core contracts still differ from their captured binaries.

These percentages measure bounded binary-recovery progress, not a claim that
80.3% of the engineering work is finished. Complete reconstruction also requires
all remaining code, calls, data, relocations and build provenance.

| Latest verified checkpoint | Matched windows | Matched % | Raw-equal bodies | Normalized only | Unmatched | Whole ELF equal |
| --- | ---: | ---: | ---: | ---: | ---: | --- |
| [Pump Round9](repro/pump/main-contract-round9-20261027/README.md) | 599 / 1,035 | 57.9% | 111 | 488 | 436 | No |
| [PumpSwap / AMM](repro/pump_amm/error-order-recovery-20261027/README.md) | 584 / 785 | 74.4% | 124 | 460 | 201 | No |
| [Fees research](research/fees-qualified-linker-layout/README.md) | 577 / 585 | 98.6% | 198 | 379 | 8 | No |
| [Mayhem research](research/mayhem-trade-source-origins/README.md) | 428 / 441 | 97.1% | 70 | 358 | 13 | No |
| [Donation Relay](repro/donation-relay/canonical-exact-selection/README.md) | 492 / 492 | 100.0% | 492 | 0 | 0 | **Yes** |
| **Total** | **2,680 / 3,338** | **80.3%** | **995** | **1,685** | **658** | **1 / 5** |

“Windows” are inferred original machine-function ranges, including framework and
runtime helpers. Complete normalized matches mask specified call/address
operands; they do not prove the referenced callees or data match. Each original
window counts once. Raw equality means that local body is byte-equal, not that
the whole program is identical.

| Checkpoint | Text bytes in matched windows | Text covered | Unmatched text |
| --- | ---: | ---: | ---: |
| Pump Round9 | 518,448 / 1,792,208 | 28.9% | 1,273,760 |
| PumpSwap / AMM | 642,616 / 1,162,040 | 55.3% | 519,424 |
| Fees research | 719,472 / 799,648 | 90.0% | 80,176 |
| Mayhem research | 594,160 / 706,744 | 84.1% | 112,584 |
| Donation Relay | 752,488 / 752,488 | 100.0% | 0 |
| **Total** | **3,227,184 / 5,213,128** | **61.9%** | **1,985,944** |

Pump and AMM rows describe the verified maintained sources. Fees and Mayhem rows
are the latest upstream research frontiers, distinct from their older maintained
selections in [repro/status.json](repro/status.json). The additional Mayhem
initializer source committed with this checkpoint is work in progress and does
not inherit either research or selected-artifact validation. Upstream Relay's
canonical selection remains the authority for its exact result.

Relay reproduces all **818,280 meaningful ELF bytes**. Its separate signed local
loader replay reproduces the **830,448-byte captured payload**, including 12,168
loader-allocated zero bytes. This does not establish the original historical
source or build recipe.

## Behavior and remaining work

Pump Round9 passes 10,468 full cases plus 3,187 focused executions, with 13,651
paired diagnostic-log cases. AMM passes 17,462 full cases plus the separate
account, fee, CPI, boundary and error-order matrices recorded in its checkpoint.
These corpora overlap and must not be summed as unique scenarios. Tests use
captured programs in local VMs; they do not establish current-chain acceptance.

Remaining priorities are the 436 Pump, 201 AMM, 8 Fees and 13 Mayhem unmatched
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
