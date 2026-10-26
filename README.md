# pumpfun-source

Reconstructed Rust source for the Pump.fun Solana programs, plus the captured
on-chain binaries and the evidence used to check the reconstruction against them.

**None of the four core programs is byte-identical to its deployed binary yet.**
Behavior is reconstructed handler by handler and checked with differential tests
that run the captured original and the rebuilt candidate side by side in a local VM.

## Status

Handler counts are bounded reconstructions with saved differential comparisons.
They are not proof of exhaustive behavior.

| Program | Handlers reconstructed | Saved comparisons | Byte-identical to deployed |
| --- | ---: | ---: | --- |
| Pump | 48 / 56 (56 / 56 with the [recovery overlay](repro/behavioral-recovery/README.md)) | 9,269 + 1,024 Surfpool | No |
| PumpSwap (AMM) | 37 / 38 | 17,462 | No |
| Fees | 31 / 31 | 17,461 | No |
| Mayhem | 24 / 25 (25 / 25 with the overlay) | 9,595 | No |
| Donation Relay | selected source 15; newer generated-framework source in `repro/donation-relay/` | 12 ordinary | No |

Dependencies captured alongside the core programs:

| Dependency | Rebuilt from public source |
| --- | --- |
| SPL Token | Byte-identical |
| Token-2022 | Raw ELF matches the captured prefix; generated zero padding reproduces the full allocation ([report](repro/pump/verified-token-2022/README.md)) |
| Associated Token Account | Byte-identical through a reconstructed linker order ([report](repro/ata/reconstructed-order/README.md)); not yet promoted in `repro/dependency-status.json` |
| Metaplex Token Metadata | 1,509 differing positions in the allocation comparison: 1,477 text bytes in Utilize, 30 source-coordinate bytes and 2 relocation bytes ([report](repro/pump/metaplex-candidate-build-11/README.md)) |

The Token-2022 and Metaplex raw ELFs are shorter than their captured allocations
by 770,960 and 86,543 zero bytes respectively. Allocation-image comparisons are
separate from equality of the unmodified compiler output.

[`repro/status.json`](repro/status.json) is the authoritative index of selected
candidates. [`docs/REMAINING-WORK.md`](docs/REMAINING-WORK.md) lists what is left.

## Quick start

Python 3.12. Evidence checks need only the standard library; local VM execution
needs the pinned packages.

```sh
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

Toolchains: Pump, PumpSwap and Fees use platform-tools v1.44; Mayhem's selected
build uses v1.54. `scripts/build_partial_candidate.py` wraps the build with an
isolated SDK and records a provenance report.

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
| `audit/`, `docs/`, `outputs/` | Validation scope, design notes and per-pass reports. |

## Rules the evidence follows

- Behavioral equivalence and byte identity are reported separately and never combined into one score.
- Raw compiler-byte identity never uses padding or rewriting; allocation-image matches are labeled separately.
- Original binaries are read only after compilation finishes.
- Changing a CI-bound source file means selecting a new checkpoint with fresh build and differential evidence.
- Tests run only against local VMs and simulators; nothing is sent to a live network.

## More detail

- [Remaining work](docs/REMAINING-WORK.md), consolidated 2026-10-26
- [Completion ledger](docs/COMPLETION.md) and [scope](docs/SCOPE.md)
- [Tooling](docs/TOOLING.md) and [build-identity audit](docs/BUILD_IDENTITY_AUDIT.md)
- Per-pass ledgers in `repro/layered-passes/`; historical packages are immutable.
- [Security policy](SECURITY.md) and [audit scope](audit/AUDIT.md)

## License

This repository's own code and documentation are released under the
[MIT License](LICENSE). Third-party and vendored materials (for example the
Apache-2.0 Solana SDK files under `programs/pump-amm/vendor`, imported research
and retained crate archives) keep their original licenses, and upstream Pump IDLs
and binaries remain with their original authors.
