# pumpfun-source

Reconstructed Rust source for the Pump.fun Solana programs, plus the captured
on-chain binaries and the evidence used to check the reconstruction against them.

**None of the four core programs or the selected Relay is byte-identical to its
deployed binary yet.**
Behavior is reconstructed handler by handler and checked with differential tests
that run the captured original and the rebuilt candidate side by side in a local VM.

For subsequent gains and the latest research frontier, see the
[byte-identity progress log](docs/BYTE-IDENTITY-PROGRESS.md).

Latest Relay research: **480/492 normalized windows, 12 unmatched**. Source-coordinate
builds using both compiler recipes have **130 raw local body matches**, resolve
all 43 location-value differences in the audited subset, and each pass 536
replay records. This includes a fresh build with the full Linux SDK.
Latest Fees research: **353 unique structural pairs, 85 unmatched windows**.
Whole-file identity remains unachieved.
[Residual CPI trials](repro/donation-relay/residual-cpi-source-trials/README.md)
narrow Jupiter to four differing instruction slots; it remains unmatched.

The [current reconstruction review](docs/RECONSTRUCTION-STATUS.md) lists exact,
normalized, unmatched and opaque function status, all 12 remaining Relay bodies,
and prioritized behavior/build work. The [refreshed 4,415-row inventory](repro/reconstruction-status-2026-10-26/README.md)
includes every exact local body match and every unresolved window.

The [26 October reconstruction audit](docs/RECONSTRUCTION-AUDIT.md) separates
selected builds from newer research and lists [all 150 handlers](repro/reconstruction-audit-2026-10-26/handlers.md),
[every exact local body-byte match](repro/reconstruction-audit-2026-10-26/raw-body-matches.md)
and [all selected/research function windows](repro/reconstruction-audit-2026-10-26/functions.tsv).

## Status

Handler counts are bounded reconstructions with saved differential comparisons;
they are not counts of exhaustively perfect functions. The unaccepted
[behavioral recovery overlay](repro/behavioral-recovery/README.md) dispatches all
56 Pump and 25 Mayhem instructions for local testing.

| Program | Selected bounded handlers | Saved comparisons | Whole captured file equal |
| --- | ---: | ---: | --- |
| Pump | 48 / 56; 5 partial, 3 unaccepted | 9,269 + 1,024 Surfpool | No |
| PumpSwap (AMM) | 37 / 38 | 17,462 | No |
| Fees | 31 / 31 | 17,461 | No |
| Mayhem | 24 / 25 | 9,595 | No |
| Donation Relay | selected source 15; newer generated-framework source in `repro/donation-relay/` | 12 ordinary | No |

Selected original-window inventories contain **384 windows with equal local
body bytes**, **1,408 additional normalized-only matches**, **1,301 without a
complete body match**, and **245 remaining opaque windows**. These partition
3,338 original windows; matching bytes or normalized instructions does not prove
call/data identity or all behavior. Original boundaries remain inferred.

At the audit snapshot, research was separate: Fees had 340 unique structural pairs, 53 additional
call-attributed duplicate pairs, 94 still-unattributed duplicate windows and 98
unmatched windows. Relay's distribution-worker research reached 465/492 normalized
windows (86 raw local matches), leaving 27 unmatched; selected Relay remains at
122/492. These are not source-completion percentages or promoted checkpoints.

Known behavior gaps remain even among bounded handlers, including Pump `sell_v2`
quote transfer fees. See the [remaining-work list](docs/REMAINING-WORK.md).

Dependencies captured alongside the core programs:

| Dependency | Rebuilt from public source |
| --- | --- |
| SPL Token | Byte-identical |
| Token-2022 | Raw ELF matches the captured prefix; generated zero padding reproduces the full allocation ([report](repro/pump/verified-token-2022/README.md)) |
| Associated Token Account | Raw bytes reproduced (105,032 bytes, `6804554e…`) only through two non-historical recipes: a linker symbol order ([report](repro/ata/reconstructed-order/README.md)) and one empty Cargo feature ([report](repro/ata/synthetic-ordering-exact-build/REPORT.md)). The authentic recipe is unknown; `repro/dependency-status.json` still says unresolved |
| Metaplex Token Metadata | 1,509 differing positions in the allocation comparison: 1,477 text bytes in Utilize, 30 source-coordinate bytes and 2 relocation bytes ([report](repro/pump/metaplex-candidate-build-11/README.md)) |

The Token-2022 and Metaplex raw ELFs are shorter than their captured allocations
by 770,960 and 86,543 zero bytes respectively. Allocation-image comparisons are
separate from equality of the unmodified compiler output.

Selections live in [`repro/status.json`](repro/status.json) (the four core
programs), [`repro/donation-relay/current.json`](repro/donation-relay/current.json)
(Relay) and [`repro/dependency-status.json`](repro/dependency-status.json)
(dependencies). [`docs/REMAINING-WORK.md`](docs/REMAINING-WORK.md) lists what is left.

## Quick start

Python 3.12. Evidence checks need only the standard library; local VM execution
needs the pinned packages. Clone with line-ending conversion off, or converted
receipts break the evidence hashes
([checkout integrity](repro/checkout-integrity/README.md)).

```sh
git clone --config core.autocrlf=false https://github.com/lalalune/pumpfun-source.git
cd pumpfun-source
python3 scripts/verify_evidence.py      # captured bytes and manifests
python3 scripts/test_tooling.py         # tooling self-tests
python3 -m venv .venv && .venv/bin/pip install -r requirements.txt
.venv/bin/python scripts/local_validation.py
```

Build a program and compare it with the deployed original:

```sh
cargo build-sbf --manifest-path programs/pump/Cargo.toml --tools-version v1.44 \
  --sbf-out-dir work/pump-build -- --locked
python3 scripts/compare.py pump work/pump-build/pump_recovered.so --output work/comparison-pump
```

Toolchains: Pump, PumpSwap and Fees use platform-tools v1.44 through
`scripts/build_partial_candidate.py`, which wraps `cargo build-sbf` with an
isolated SDK and records a provenance report. Mayhem's selected v1.54 build came
from a one-shot direct Cargo/rustc controller (`repro/mayhem/compiler-v154-main/`);
the repository adapter (`scripts/build_reconstruction_candidate.py --tools-version v1.54`)
reproduces the same bytes (`repro/build-tooling/supported-sbpf-integration/`).

For local SDK testing with every handler present, apply the
[behavioral recovery overlay](repro/behavioral-recovery/README.md) and use the
`@pump-fun/pump-sdk` harness in
`repro/parallel-work/2026-10-25/independent-reconstruction-review/sdk-integration-test/`.

## Layout

| Path | Contents |
| --- | --- |
| `programs/` | Reconstructed Rust crates. CI hash-binds these to the selected checkpoints. |
| `evidence/` | Captured deployed binaries, account payloads and upstream IDLs. Comparison inputs only, never compiler inputs. |
| `repro/` | One evidence package per checkpoint or study: builds, comparison reports, differential receipts, verifiers. |
| `scripts/` | Capture, build, compare and differential tooling ([index](scripts/README.md)). |
| `localnet/` | Surfpool fixtures and transaction tests. |
| `research/` | Imported research lab and provenance studies. |
| `binaries/` | Standalone compiler-experiment objects; never selected candidates. |
| `audit/`, `docs/`, `outputs/` | Validation scope, design notes and per-pass reports. |

## Rules the evidence follows

- Behavioral equivalence and byte identity are reported separately and never combined into one score.
- Raw compiler-byte identity never uses padding or rewriting; allocation-image matches are labeled separately.
- Original binaries are read only after compilation finishes.
- Changing a CI-bound source file means selecting a new checkpoint with fresh build and differential evidence.
- Tests run only against local VMs and simulators; nothing is sent to a live network.

## More detail

- [Current reconstruction review](docs/RECONSTRUCTION-STATUS.md), [selected baseline audit](docs/RECONSTRUCTION-AUDIT.md) and [remaining work](docs/REMAINING-WORK.md)
- [Historical selected-checkpoint completion ledger](docs/COMPLETION.md) and [scope](docs/SCOPE.md)
- [Tooling](docs/TOOLING.md) and [historical build-identity audit](docs/BUILD_IDENTITY_AUDIT.md)
- Per-pass ledgers in `repro/layered-passes/`; historical packages are immutable.
- [Security policy](SECURITY.md) and [audit scope](audit/AUDIT.md)

## License

This repository's own code and documentation are released under the
[MIT License](LICENSE). Third-party and vendored materials (for example the
Apache-2.0 Solana SDK files under `programs/pump-amm/vendor`, imported research
and retained crate archives) keep their original licenses, and upstream Pump IDLs
and binaries remain with their original authors.
