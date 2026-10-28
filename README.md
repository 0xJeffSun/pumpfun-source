# pumpfun-source

Reconstructed Rust source for Pump.fun's Solana programs, with captured binaries,
reproducible builds and local differential tests.

**Progress updated 28 October 2026.** Pump Fees research and the selected Donation
Relay reproduce their complete meaningful ELFs. Main Pump, PumpSwap and Mayhem
still differ from their captured binaries.

## Newly merged research

The latest manually checked **Main Pump L15 artifact matches 967/1,035 windows
(93.4%), leaving 68 (6.6%) unmatched**. It is an unpromoted layout experiment;
the maintained main-contract source remains at **823/1,035 (79.5%)**.

Main Pump L15 includes explicitly labelled **synthetic source-line positioning**.
Its archived repository build passes 44 suites / 10,468 paired cases and the
saved outcomes were manually rechecked. A separate 972-window identity-recipe
run is reported, but its ELF is absent from that packet; the table uses the
independently verifiable 967-window artifact. Neither score proves historical
source recovery, referenced-data equality or whole-ELF identity.

The PumpSwap union is a research composition. Its 17,462-case execution summary
is retained, but the complete runtime receipts are omitted; manual review
verified its static artifact and source composition, not those executions.
The separate [checked group-slice recovery](research/amm-multi-hop-group-slice-recovery/README.md)
reaches 661 windows from the maintained 660-window baseline. Its saved runtime
receipt is unavailable and its recorded complete workspace differs from the PR
workspace; those build/runtime claims remain unverified here.

## Latest verified progress

This table lists the latest published, manually verified artifact for each
program, including unpromoted research. The maintained Pump and PumpSwap source
versions remain separate; these research counts do not promote new sources.

| Latest verified artifact | Matched windows | Matched % | Raw-equal bodies | Normalized only | Unmatched | Whole ELF equal |
| --- | ---: | ---: | ---: | ---: | ---: | --- |
| [Main Pump L15 research](research/claude-pump-integration-20261027/r37-layout-15/README.md) | 967 / 1,035 | 93.4% | 147 | 820 | 68 | No |
| [PumpSwap union research](research/claude-amm-union-20261028/README.md) | 755 / 785 | 96.2% | 159 | 596 | 30 | No |
| [Fees research](research/claude-fees100-crank-donation-20261027/README.md) | 585 / 585 | 100.0% | 585 | 0 | 0 | **Yes** |
| [Mayhem research](research/claude-mayhem-439-20261028/README.md) | 439 / 441 | 99.5% | 141 | 298 | 2 | No |
| [Donation Relay](repro/donation-relay/canonical-exact-selection/README.md) | 492 / 492 | 100.0% | 492 | 0 | 0 | **Yes** |
| **Total** | **3,238 / 3,338** | **97.0%** | **1,524** | **1,714** | **100** | **2 / 5** |


**Maintained source versions:** [Pump Round47](repro/pump/main-contract-round47-20261027/README.md)
remains 823/1,035 (79.5%), with 203 raw-equal bodies; [PumpSwap maintained](repro/pump_amm/v2-mint-clone-recovery-20261028/README.md)
remains 660/785 (84.1%), with 159 raw-equal bodies. L15's 147 raw-equal bodies
come from a different build and link layout, so the research-table raw total
is lower even though its normalized coverage is higher.

Across the latest verified checkpoints, **2 of five programs have complete meaningful-ELF identity**. The remaining core contracts still differ from their captured binaries.

These percentages measure bounded binary-recovery progress, not the fraction of engineering work finished.
Each inferred original function window counts once. Normalized matches mask
specified call/address operands; they do not establish the referenced callees
or data. Raw equality applies to that local body, not the entire program.

| Checkpoint | Text bytes in matched windows | Text covered | Unmatched text |
| --- | ---: | ---: | ---: |
| Main Pump L15 research | 1,370,400 / 1,792,208 | 76.5% | 421,808 |
| PumpSwap union research | 969,128 / 1,162,040 | 83.4% | 192,912 |
| Fees research | 799,648 / 799,648 | 100.0% | 0 |
| Mayhem research | 670,000 / 706,744 | 94.8% | 36,744 |
| Donation Relay | 752,488 / 752,488 | 100.0% | 0 |
| **Total** | **4,561,664 / 5,213,128** | **87.5%** | **651,464** |

The [Mayhem 439-window packet](research/claude-mayhem-439-20261028/README.md)
adds the AMM Buy body to its qualified parent, with no prior match losses.
Manual checks passed its 187-check verifier and 16 negative/positive tests;
its retained transaction signatures were also reverified. Two windows remain
(0.45%), covering 36,744 code bytes (5.20%). The recipe reuses qualified dependency
artifacts; fresh dependency-build and full data/indirect-call identity remain open.

Across the maintained selections and qualified Mayhem research, remaining priorities are
the 212 Pump, 125 AMM and 2 Mayhem unmatched windows, plus call/data/relocation
identity and original build provenance.

## Maintained main contract

**Main Pump: 79.5% of function windows matched; 61.8% of original text covered. Complete reconstruction remains unfinished.**

Reproduce the selected Pump ELF with its [archived Rust/linker recipe](repro/pump/main-contract-round47-20261027/reproduce.py).

<!-- MAIN-PUMP-REMAINING:BEGIN -->
### Main Pump remaining work

The maintained checkpoint matches **823/1,035 function windows (79.5%)**;
**212/1,035 (20.5%) remain unmatched**. Its matched windows cover
**1,108,072/1,792,208 code bytes (61.8%)**, leaving **684,136 bytes (38.2%)**.
Of the matches, 203 are raw byte-equal and 620 require normalization.

Pump Round47 passes 10,468 full cases plus 7,677 focused executions, with 18,141
paired diagnostic-log cases. The separate ordered-log audit reports 143
source-filename differences and zero other differences. These are bounded,
overlapping local-VM corpora; they do not establish current-chain acceptance.
The 34 added normal-account inputs include positive reserve-sync updates;
historical state reachability remains unproved.

Remaining work includes unmatched business and validation bodies, referenced
data, relocations, original compiler/dependency provenance and uncovered
behavior. A defensible percentage of engineering work remaining is unknown.
Whole-ELF equality is unproved. Research counts above do not promote a new
maintained source or replace these acceptance requirements.

The [main-contract work queue](research/main-pump-parallel-checkpoint-20261027/REMAINING-WORK.json)
and [selected checkpoint](repro/pump/main-contract-round47-20261027/README.md)
bind the maintained metrics. [Reconstruction status](docs/RECONSTRUCTION-STATUS.md)
and [remaining work](docs/REMAINING-WORK.md) retain the broader evidence history.
<!-- MAIN-PUMP-REMAINING:END -->

Relay reproduces all **818,280 meaningful ELF bytes**. A separate signed local
loader replay reproduces the **830,448-byte captured payload**, including 12,168
loader-allocated zero bytes. Historical source and build provenance remain separate.

## Dependencies

| Dependency | Current byte result |
| --- | --- |
| SPL Token | 108,600 / 108,600 captured bytes reproduced (100%) |
| Token-2022 | 611,056 / 611,056 meaningful ELF bytes reproduced (100%); full 1,382,016-byte allocation requires 770,960 separately added zero bytes |
| Associated Token Account | 105,032 / 105,032 bytes reproduced (100%) by two non-historical research recipes; authentic recipe and selected promotion unresolved |
| Metaplex Token Metadata | Research reproduces all 707,448 meaningful compiler-ELF bytes; an independent local loader replay reproduces the 793,991-byte payload. Maintained selection and historical provenance remain separate. |

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
