# REA and Solana byte reconstruction

REA 6.8.0 is installed and registered with Codex on the research host. Its
unmodified native target detector rejects both EM_SBF and EM_BPF, so registration
alone does not enable Solana analysis. The separate local adapter admits only
EM_SBF (263), ELF64 little-endian ET_DYN images with zero flags. It does not change
captured binaries or compiler inputs. The standard REA installation remains
unmodified.

`scripts/rea-sbpf` selects that adapter, Node 24.22.1, Ghidra 12.1.4, and the
NWMonster/Ghidra_sBPF processor at commit
`907bd4476432ca83bb2352686ad1ccafdb38504c`. The Ghidra archive's SHA-256 is
`ddac49f903da9d5bac833e5cc79395098b9c33cfd3279be5f31bd00387d2d4db`.
The processor's language IDs were given Ghidra's conventional four-field form
(`sBPF:LE:64:v1`). Its three Sleigh definitions were compiled locally. The missing
macOS ARM64 decompiler was built from the release's bundled C++ source with
`make -j8 ghidra_opt ARCH_TYPE='-arch arm64'` and installed in Ghidra's
`Ghidra/Features/Decompiler/os/mac_arm_64/decompile` location.

The wrapper is specific to these captured sBPF programs. Use standard REA for
other architectures. Its paths can be overridden with `PUMPFUN_REA_TOOL_ROOT`,
`PUMPFUN_REA_NODE`, `PUMPFUN_REA_INSTALL`, `GHIDRA_INSTALL_DIR`, and `JAVA_HOME`.
This is an experimental local integration, not upstream REA sBPF support or a
validation of every instruction in the third-party processor.

For a fresh checkout, the [portable adapter preparer](../research/rea-portable-adapter/README.md)
accepts explicit package, dependency and output paths. It reproduces the twelve
recorded adapter hashes without replacing an existing directory. Its offline
checks cover preparation and the real header reader; Ghidra and processor setup
remain separate prerequisites.

Example, from the repository root:

```sh
scripts/rea-sbpf doctor --provider ghidra --json
REA_GHIDRA_SEED_FILE="$PWD/repro/rea/2026-10-26/relay-seeds.tsv" \
REA_GHIDRA_DISABLED_ANALYZERS='Shared Return Calls' \
  scripts/rea-sbpf decompile evidence/dependencies/donation_relay/deployed.so \
  0x1c300 --provider ghidra --json
```

The 492 Relay seeds come from the existing inferred function-window inventory.
They are analyst assertions, not independent Ghidra discoveries. Ghidra accepted
490 newly created and two existing functions, with no failed or unmapped seeds.
The first successful decompilation is the original mint-policy function. Its
subject hash equals the captured Relay hash
`367f07a62e3f74d358187d175cf3228848e81a56c781a9a75b9df7fed1268563`.

The local seed preparer also resolves 99 declared ELF call relocations in
temporary Ghidra memory: 98 syscall references and one `custom_panic` reference.
Without this step, Ghidra invents function boundaries at unresolved call sites.
No original file is modified. Memory-reading tools may return relocated bytes;
use the captured file for byte comparisons. The custom relocation profile and
this limitation are recorded in the REA evidence. The seed file is required by
this preparer; supply the correct file for each target.

The saved [business export](../repro/rea/2026-10-26/relay-business-export.json)
contains 23 functions covering original windows 90–112. Every exported inclusive
range equals its existing raw-disassembly window. These are reconstructed
pseudocode observations, not recovered Rust or successful binary reproduction.
Run `python3 repro/rea/2026-10-26/verify.py` to recheck target hashes, export
hashes/ranges, and the current source binding. The same folder records the local
adapter construction, toolchain provenance, and seven unsuccessful source trials.

## Reconstruction checkpoint

The prior 50-file Relay Rust input manifest matches the existing experimental
`work/relay-anchor32-final-v148` build. It has 476/492 normalized function-window
matches, 107 raw matches, and **no whole-file equality**. The remaining 16 windows
are 56, 90, 92–100, 106, 109, 112, 267, and 351. Three are identical type-ID
helpers. Mint policy 106 differs at three register-selecting instructions.

The first seven source trials (five fee-expression forms and two Jupiter
construction forms) produced no additional complete matches. They are retained
under `work/rea-policy-operand-v148` and `work/rea-reconstruction-20261026` and were
not promoted to `programs/`. These are static build experiments, with no new
runtime-equivalence claim. Work-directory records include build commands,
source snapshots, manifests, complete ELF comparisons, adapter changes,
negative header controls, and toolchain hashes.

Decompiler output is an analysis aid. Final acceptance still requires compiling
the reconstructed Rust and comparing the entire artifact, including data,
relocations, ELF layout, and captured allocation padding. The other four core
programs and remaining dependencies remain in scope; REA setup does not close
their outstanding byte differences.

The [Jupiter CPI checkpoint](../repro/donation-relay/rea-jupiter-cpi-20261026/README.md) binds the current 58-file source, all 527 finite runtime case records, and a fresh current-location build. The iterator account clone and optional signer-seed handling reproduce the complete 2,496-byte normalized Jupiter body, increasing coverage to 477 normalized windows and retaining 107 raw matches. Fifteen original windows remain unmatched. All four event source descriptors and the inferred order of 27 business functions remain preserved. The older REA verifier checks its historical export by default; use `--current` only when intentionally testing that older source binding.

The [host-sysroot probes](../repro/rea/2026-10-26/host-sysroot-probes/README.md) add verified v1.48 Linux ARM/macOS x86_64 and v1.44 Linux x86_64 checks. None reproduces the captured StringError type ID. A separate current-source Linux-x86-sysroot experiment preserves 477 normalized matches and improves some bounded data comparisons, but it is not an accepted original-toolchain identification or a promoted artifact.

The [Linux 1.49–1.51 probes](../repro/rea/2026-10-26/linux-family-probes/README.md) also fail to reproduce the captured StringError type ID; their target libraries remain hash-verified. The [Metaplex coordinate-only build](../repro/pump/metaplex-coordinate-only-20261026/README.md) independently repairs 29 source descriptors while preserving every preceding instruction byte. It still differs from the full target by 1,479 bytes.

The [Metaplex owned-Uses build](../repro/pump/metaplex-owned-uses-20261026/README.md) supersedes that dependency checkpoint: 80 differing bytes remain, with 1,250/1,251 raw-equal windows, complete read-only data equality, and 147 signed runtime cases verified. The 12 direct owner-use cases cover the changed count checks; full artifact equality is still false.
