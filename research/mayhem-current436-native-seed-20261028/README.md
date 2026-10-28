# Exact native reproduction of the archived Mayhem436 compiler outputs

Correcting one stale `solana_stake_interface` metadata seed makes a fresh Windows
build reproduce **both complete archived Mayhem436 ELF files byte-for-byte**.
The symbol ELF, ordinary stripped ELF, every section, symbol, relocation and
file-header byte agree with the earlier macOS-host build using Linux target
libraries. No compiler output is patched, normalized in place or padded.

This closes the compiler-output gap reported in
[PR413's native436 packet](../mayhem-current436-native-20261028/README.md).
It is equality against the **archived reconstruction**, not the original
777408-byte allocation image. Original whole-image identity remains false.
The current upstream frontier is separately
[Mayhem437](../mayhem-current437-composition-20261028/README.md); this bounded
experiment holds the earlier 67-file 436 source fixed and does not claim to
rebuild or runtime-qualify 437.

## The missing compiler input

The native recipe correctly requested two code-generation units for
`solana-stake-interface`, but its metadata map still used
`96cf2e8d7313c997`. The exact Cargo compiler log from
[provider sharing](../mayhem-provider-sharing/README.md), Git blob
recorded under `provenance/`, specifies `ac89a8a18de78c4a` with the same
two-codegen-unit setting and archive filename
`libsolana_stake_interface-a818684676c22618.rlib`.

The verifier parses all **85 target compile commands** from that log and binds
duplicate crate names by package version. Of the native baseline's 85 delivered
seeds, this is the sole discrepancy. The corrected native builds deliver all
85 recorded upstream seeds. The old seed was inherited by the wrapper's map;
the source manifest already contained the correct two-unit profile.

The only recipe changes are this TSV row and the build driver's hash pin for
that TSV file:

```diff
-f40a94ce996608ed  96cf2e8d7313c997  solana_stake_interface
+f40a94ce996608ed  ac89a8a18de78c4a  solana_stake_interface
```

Spaces above display TSV columns. All 67 source files, the source-path remaps,
the 84 other metadata mappings, compiler/target/vendor inputs, and the complete
linker script remain unchanged. The wrapper replaces the single existing
`-C metadata` argument; it does not append another metadata value. No new
`share-generics` flag or codegen-unit change is introduced.

This establishes a sufficient, source-log-backed correction in this recipe.
It does not prove the deployed program's historical build command or identify
a unique original source/toolchain. It also does not by itself explain the
compiler's internal generic-partition algorithm.

## Fresh builds and reversal

Each row uses an initially absent target directory and compiles 163 crate units,
85 for the target. The historical host macro and its 61 pinned host dependency
files are reused. These are fresh target-dependency/root builds, not fresh
builds of all host inputs. Cargo uses the locked, offline vendor store.

| Build | Stake metadata | Compiler ELF | Stripped ELF | Text bytes |
| --- | --- | ---: | ---: | ---: |
| Corrected 01 | `ac89a8a18de78c4a` | 889096 | 756032 | 687144 |
| Fresh corrected repeat 02 | `ac89a8a18de78c4a` | 889096 | 756032 | 687144 |
| Fresh reversal 03 | `96cf2e8d7313c997` | 890080 | 756752 | 687864 |

Both corrected builds equal the archived436 comparison, including the complete
unstripped symbol file:

- Compiler ELF: `f03e73e7b82b152e64e9a999f4f9276ece9ebcd42d2273d0b8adaa7c5fb0c229`.
- Ordinary stripped ELF: `cac32dadb032cc80366124ab3ceb430fdc5bfae23ab9cec1b5d18bb9e0f55e5b`.

Reversal reproduces both PR413 final artifacts exactly:

- Compiler ELF: `9b9db8aeb27e69b3e3edec7d09f834b3e163fb958c3e76bcb2fe0451fedfaa07`.
- Ordinary stripped ELF: `00fe0ffb6e6b442ab1a8d0cf54a6ffd7f8c1f94503423dce290b572ef1b24660`.

The corrected image has the same 446 complete linked function ranges as upstream.
Reversal restores the two extra 312/408-byte allocator ranges identified by
PR413, giving 448 ranges and 720 extra code bytes. All three builds retain
436 normalized original windows, the same 141 raw-local IDs, 429 recursively
direct-call-closed windows, 4473 positive internal-call observations and 486
positive Source observations. No additional original function is recovered.

The original allocation image remains unchanged, SHA-256
`a87fa9f866272514e6acb852b668c4a08aeb173d56c883039991d114d1199bdb`.
The raw-file comparison explicitly rejects equality with it. No target program,
VM or live blockchain transaction was executed. Earlier runtime receipts are
not counted as new executions; full behavioral/security claims remain outside
this packet.

## Offline evidence and reproduction

```sh
python -I -B research/mayhem-current436-native-seed-20261028/verify.py
python -I -B research/mayhem-current436-native-seed-20261028/test_verify.py
```

The self-contained standard-library verifier checks exact Git-blob references,
the one-row map and builder delta, all 489 compiler records, actual flag delivery,
all three full outputs, allocated-section preservation under ordinary stripping,
all original-window observations, and both equality/reversal outcomes. It uses
the unchanged reader and comparison helpers; it does not execute their earlier
packet-specific qualification entry points. The parent helper includes the
maintainer's special-file rejection added after PR413; the provenance pin names
that exact revised helper. No compiler, subprocess or network call is used by
the saved-evidence verifier.

The packet retains full compiler logs and wrapper records, source bytes, SDK/
target/vendor inventories, actual linker invocations/maps and copied ephemeral
inputs, all three stake archives, ordinary ELFs, and the negative reversal.
Other dependency archives remain external build inputs; their post-build hashes
are recorded. Host-macro and host-tool inventory checks are recorded build
observations, not an exhaustive process-loader attestation.

For an explicit fresh Windows build, provision the already pinned inputs and
choose a new output directory:

```powershell
python -I -B controller/build.py --sdk <windows-v154> `
  --target-sysroot <linux-target-rust> --vendor <locked-vendor> `
  --msvc <msvc> --windows-sdk <windows-sdk> `
  --historical-macro-directory <historical-host-release> --output <new-directory>
```

The copied controller is the one used by corrected builds 01/02. Its original
source, toolchain and host-macro provenance is documented by the parent native436
packet. The before-controller files preserve the exact negative recipe. The
preparation scripts retain their original local paths as execution provenance;
they are not the portable interface.

Initial packaging rejected an outdated local copy of the parent verifier because
its Git-blob pin no longer matched upstream's special-file repair. The corrected
packet uses the exact newer helper; no build output was changed. That rejected
attempt is recorded under `provenance/validation-notes.json`.

Next: apply the now-complete compiler recipe to the current437 source in a
separate controlled experiment, and continue source/call/data work on the four
remaining trade bodies. Full archived-candidate reproducibility and deployed-byte
reconstruction are distinct objectives.
