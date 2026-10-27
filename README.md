# pumpfun-source

Reconstructed Rust source for Pump.fun's Solana programs, with captured binaries,
reproducible builds and local differential tests.

**Progress as of 27 October 2026: all four core programs still differ from their
captured binaries. The selected Donation Relay reconstruction reproduces its complete meaningful
ELF and, through a separate loader deployment, its captured payload.**

## Current progress

[Current main-Pump parallel research snapshot](research/main-pump-parallel-checkpoint-20261027/README.md) preserves the verified intermediates and in-progress source beyond the maintained checkpoint.

**Main Pump: 63.1% of function windows matched; 41.2% of original text covered. Complete reconstruction remains unfinished.**

Across the latest verified checkpoints, **2,737 / 3,338 inferred function windows
match (82.0%)**. Their matched windows cover **3,461,760 / 5,213,128 original text
bytes (66.4%)**. **One of five programs has complete meaningful-ELF identity**;
all four core contracts still differ from their captured binaries.

These percentages measure bounded binary-recovery progress, not a claim that
82.0% of the engineering work is finished. Complete reconstruction also requires
all remaining code, calls, data, relocations and build provenance.

| Latest verified checkpoint | Matched windows | Matched % | Raw-equal bodies | Normalized only | Unmatched | Whole ELF equal |
| --- | ---: | ---: | ---: | ---: | ---: | --- |
| [Pump Round13](repro/pump/main-contract-round13-20261027/README.md) | 653 / 1,035 | 63.1% | 113 | 540 | 382 | No |
| [PumpSwap / AMM](repro/pump_amm/structural-tlv-recovery-20261027/README.md) | 586 / 785 | 74.6% | 124 | 462 | 199 | No |
| [Fees research](research/fees-sharing-handler-recovery/README.md) | 578 / 585 | 98.8% | 198 | 380 | 7 | No |
| [Mayhem research](research/mayhem-provider-sharing/README.md) | 428 / 441 | 97.1% | 100 | 328 | 13 | No |
| [Donation Relay](repro/donation-relay/canonical-exact-selection/README.md) | 492 / 492 | 100.0% | 492 | 0 | 0 | **Yes** |
| **Total** | **2,737 / 3,338** | **82.0%** | **1,027** | **1,710** | **601** | **1 / 5** |

“Windows” are inferred original machine-function ranges, including framework and
runtime helpers. Complete normalized matches mask specified call/address
operands; they do not prove the referenced callees or data match. Each original
window counts once. Raw equality means that local body is byte-equal, not that
the whole program is identical.

| Checkpoint | Text bytes in matched windows | Text covered | Unmatched text |
| --- | ---: | ---: | ---: |
| Pump Round13 | 738,800 / 1,792,208 | 41.2% | 1,053,408 |
| PumpSwap / AMM | 644,456 / 1,162,040 | 55.5% | 517,584 |
| Fees research | 731,856 / 799,648 | 91.5% | 67,792 |
| Mayhem research | 594,160 / 706,744 | 84.1% | 112,584 |
| Donation Relay | 752,488 / 752,488 | 100.0% | 0 |
| **Total** | **3,461,760 / 5,213,128** | **66.4%** | **1,751,368** |

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

Pump Round13 passes 10,468 full cases plus 4,192 focused executions, with 14,656
paired diagnostic-log cases. AMM passes 17,462 full cases plus the separate
account, fee, CPI, boundary and error-order matrices recorded in its checkpoint.
These corpora overlap and must not be summed as unique scenarios. Tests use
captured programs in local VMs; they do not establish current-chain acceptance.

The latest [Mayhem provider-sharing recovery](research/mayhem-provider-sharing/README.md)
removes seven duplicate compiled helpers while preserving all 428 normalized
and 100 raw matches. Two builds agree. Fresh replay covers 69 initializer
comparisons and 2,496 AMM comparisons; prior Legacy, V2 and ExtendAccount
receipts retain their earlier artifact bindings. The initializer still has
920 bytes versus the original 960. A required allocator specialization and
all thirteen unmatched bodies remain unresolved.

A [same-IR compiler diagnostic](research/mayhem-host-llvm-comparison/README.md)
produces identical Mac and Linux LLVM objects for one earlier initializer
control. This narrows that investigation without adding a function match.

The latest [Fees Sharing recovery](research/fees-sharing-handler-recovery/README.md)
adds the complete 12,384-byte Sharing handler under the existing normalizer,
with all 64 immediate callees checked. It reaches 578 normalized and 198 raw
matches while retaining all 105 original Source records and 379 checked data
pointer targets. Two builds agree and 17,331 fresh comparisons pass. Seven
functions, 73 readonly bytes, absolute layout and complete ELF identity remain
unresolved.

The latest [PumpSwap decoder and structure recovery](repro/pump_amm/structural-tlv-recovery-20261027/README.md) fixes transfer-fee TLV differences: all 876 independent cases now match the captured original, compared with 430 differences in the preceding candidate. It retains all 586 matched AMM windows and raises raw-equal bodies to 124. The saved workspace recipe preserves the separate Fees workspace.

Remaining priorities are the 382 Pump, 199 AMM, 7 Fees and 13 Mayhem unmatched
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
