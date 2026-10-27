# pumpfun-source

Reconstructed Rust source for Pump.fun's Solana programs, with captured binaries,
reproducible builds and local differential tests.

**Progress as of 27 October 2026: all four core programs still differ from their
captured binaries. The selected Donation Relay reconstruction reproduces its complete meaningful
ELF and, through a separate loader deployment, its captured payload.**

## Current progress

The table uses the latest published research for Fees and Mayhem, the selected
Pump/PumpSwap builds and the canonical Relay selection. Research checkpoints
are distinct from [selected artifacts](repro/status.json).

| Program | Matched functions¹ | Matched % | Exact local bytes² | Normalized only | Unmatched | Unassessed | Whole ELF equal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | --- |
| [Pump selected](programs/pump/README.md) | 528 / 1,035 | 51.0% | 98 (9.5%) | 430 | 507 | 0 | No |
| [PumpSwap / AMM selected](programs/pump-amm/README.md) | 488 / 785 | 62.2% | 93 (11.8%) | 395 | 297 | 0 | No |
| [Fees research](research/fees-current-574-social-v2-union/README.md) | 574 / 585 | 98.1% | 143 (24.4%) | 431 | 11 | 0 | No |
| [Mayhem research](research/mayhem-source-data-recovery/README.md) | 426 / 441 | 96.6% | 70 (15.9%) | 356 | 15 | 0 | No |
| [Donation Relay selected](repro/donation-relay/canonical-exact-selection/README.md) | 492 / 492 | 100.0% | 492 (100.0%) | 0 | 0 | 0 | **Yes** |

Newer **local, unpublished** Pump/PumpSwap evidence was also verified on 27 October.
These saved checkpoints are separate from the published selections above; their
source and evidence packets are not included in this README-only update.

| Local checkpoint | Matched functions | Matched % | Exact local bodies | Normalized only | Unmatched |
| --- | ---: | ---: | ---: | ---: | ---: |
| Pump legacy cashback order | 548 / 1,035 | 52.9% | 112 (10.8%) | 436 | 487 |
| PumpSwap integrated reader/behavior recovery | 555 / 785 | 70.7% | 109 (13.9%) | 446 | 230 |

¹ “Functions” means inferred original machine-function windows, including
framework and runtime helpers. Matched counts include exact local bodies and
complete normalized counterparts. Normalization masks specified call/address
operands; it does not prove matching callees, data or behavior. Duplicate bodies
can have several candidate counterparts. Each original window counts once.

² The exact column counts functions whose entire local body is byte-equal; its
percentage uses the same original-window denominator. Local body equality alone
does not establish whole-program equality. The published Mayhem research scan assesses all 441 windows; its older selected
ledger still has 245 opaque windows.

Large functions remain, so function count and code coverage differ:

| Program | Text bytes in matched windows³ | Text covered | Text in unmatched / unassessed windows |
| --- | ---: | ---: | ---: |
| Pump selected | 400,752 / 1,792,208 | 22.4% | 1,391,456 |
| PumpSwap / AMM | 574,808 / 1,162,040 | 49.5% | 587,232 |
| Fees research | 699,952 / 799,648 | 87.5% | 99,696 |
| Mayhem research | 587,344 / 706,744 | 83.1% | 119,400 |
| Donation Relay selected | 752,488 / 752,488 | 100.0% | 0 |

³ Sum of original window sizes with a complete counterpart, including normalized
matches. This is **not** a count of identical bytes, a source-completion score or
an estimate of remaining effort. Headers, data and relocations are outside this
table. Counts and sizes come from the linked checkpoint inventories; the
[baseline and Fees/Relay ledger](repro/reconstruction-status-2026-10-26/README.md)
retains older selected Pump/PumpSwap measurements separately.

Fees has **427 unique structural pairs** within its 574 matched windows.
Its current report records 3,792 equal direct-callee observations out of 3,801;
the nine unequal observations remain unresolved.

Relay's exact result covers **818,280 / 818,280 meaningful ELF bytes (100%)**,
including headers, calls, data and relocations. Two Rust builds agree. A separate
912-transaction local loader deployment reproduces **830,448 / 830,448 captured
payload bytes**, including 12,168 loader-allocated zero bytes. Historical source,
build recipe and ProgramData metadata are not established by that result.

## Behavior and remaining work

| Program / checkpoint | Bounded public handlers⁴ | Saved comparisons |
| --- | ---: | ---: |
| Pump selected baseline | 48 / 56 (85.7%); 5 partial, 3 unaccepted | 9,269 + 1,024 Surfpool |
| Pump local unpublished checkpoint | Baseline handler classifications not re-audited | 10,468 across 44 suites |
| PumpSwap / AMM | 37 / 38 (97.4%) | 17,462 + separately reported focused matrices |
| Fees selected | 31 / 31 (100%) | 17,461 |
| Mayhem selected | 24 / 25 (96.0%) | 9,595 |
| Relay selected | No exhaustive handler certification | 536 replay records / 534 unique fixtures |

⁴ Handler counts describe bounded implementation evidence, not perfect semantic
reconstruction. The [150-handler audit](repro/reconstruction-audit-2026-10-26/handlers.md)
classifies the selected core baseline as **140 bounded, 5 partial and 5
unaccepted**. Newer focused work does not automatically update that audit.
Comparison counts come from different checkpoints and scopes; do not sum them
as unique scenarios. Tests use local VMs and simulators.

The current [Mayhem source/data recovery](research/mayhem-source-data-recovery/README.md)
adds 15 complete normalized windows and 11 raw-local matches over the 411-window
checkpoint. Two mixed-SDK builds agree. Fresh replay covers 6,636 trade comparisons,
1,032 admin cases, 1,601 additional cases, three Burn families, 150 sweep-rate cases,
48 counter cases, and initializer/program boundaries. It repairs ten newly found
counter failures and the prior 34 rate failures. Diagnostics, indirect/data closure
and full ELF identity retain explicit limits in the packet.

Remaining priorities:

- **Pump:** finish V3 trading, creation and multi-hop paths; close incentive,
  transfer-fee, account-validation and diagnostic discrepancies. The selected
  build has 507 unmatched windows; the newer local checkpoint has 487.
- **PumpSwap:** recover 297 selected-build windows (230 in the local checkpoint),
  referenced data and indirect calls; obtain authentic successful fixed-admin
  `create_config` coverage.
- **Fees:** recover 11 remaining bodies and resolve duplicate attribution,
  call/data identity and complete ELF layout.
- **Mayhem:** recover 15 remaining research windows and complete call/data,
  indirect-target and ELF identity. The composed checkpoint repairs all 34
  recorded sweep-rate differences and adds bounded initializer success coverage.
- **Relay:** establish historical build provenance and broader runtime coverage
  beyond the selected exact reconstructed ELF.

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
