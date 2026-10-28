# Mayhem meaningful ELF reproduction with a fresh host macro

Three fresh host-and-target build chains reproduce both complete files qualified
by [PR446](https://github.com/lalalune/pumpfun-source/pull/446), without reusing its
previously compiled host macro or 61 host dependency files. The ordinary stripped
output equals all **775,416 bytes of the original meaningful Mayhem ELF**.

| Output, identical across all three chains | Bytes | SHA-256 |
| --- | ---: | --- |
| Compiler output `symbols.so` | 907,776 | `7b15bb1e5c7c9c53041322fa64d4a420906fffd96ff97a55d70d627bcb854960` |
| Ordinary `--strip-all` output | 775,416 | `9af9e3b1cbc9d89340af4d9d46e4c88d3dc2fc67e0090f9370047d97532ff09d` |

The original allocation image is 777,408 bytes. Its separate 1,992-byte zero tail
is not emitted, appended or otherwise fabricated. The compiler output is also a
different file from the original meaningful ELF; only ordinary stripping produces
the meaningful-file identity above. No compiled target is executed.

## Dependency removed

PR446's native recipe required a caller-supplied historical macro DLL and 61
host files from an older diagnostic build. Their hashes were checked, but that
recipe did not build them. Here, `host_build.py` builds the proc macro and its host
dependencies in an initially absent Cargo target directory with `--locked --offline`.
`build.py` then supplies that run's fresh DLL and dependency directory to the
unchanged target controller. All 67 target source files, linker data/function
selectors, compiler flags and metadata/path maps remain those of PR446.

The source boundary is explicit:

- 121 retained Anchor files from
  [`c0077c2a7de64361f451735ac89118bc89f1c277`](https://github.com/otter-sec/anchor/tree/c0077c2a7de64361f451735ac89118bc89f1c277),
  already authenticated in the merged
  [historical macro packet](../mayhem-historical-macro-context/README.md).
  Every retained file's Git blob is checked. Only the root workspace manifest is
  adapted: four workspace members and ten explicit relative path patches.
- The resolved lockfile from the earlier successful diagnostic host build,
  now used with `--locked`. This is **not** the complete historical framework's
  lockfile or historical dependency composition.
- Ten checksum-pinned optional dependency archives, included with their original
  licenses and notices. They are extracted into the new build directory; every
  regular member is checked against the retained receipt.
- The existing 215-package registry vendor set, checked against pinned checksum
  maps before and after the host build. The host compilation uses a subset of this
  set. The target runtime remains Anchor 1.0.0.
- The existing pinned Windows SDK/compiler and Linux target sysroot. MSVC and the
  Windows SDK remain explicit native build requirements; neither is installed here.

The macro source is historical, but the composition is a reconstruction recipe.
This does not attribute the original Mayhem program to this Anchor revision,
dependency resolution, host platform or compiler.

## Observations

Each chain records 42 host crate compilations and 163 target-Cargo crate
compilations, of which 85 are target compilations. Totals are **615 crate records**,
including 126 for the separate host-macro build and 255 target compilations.
All three have 441 normalized, 441 raw-local and 441 direct-closed function windows,
4,768 positive direct calls and 519 positive Source obligations.

The third chain invokes the integrated `build.py` controller from an empty output
directory. The first two invoke the same host controller and target controller
separately. Actual commands, pre/post input checks, complete target files, macro
DLLs, source archives, compiler logs and linker records are retained for all three.

| Host build | DLL bytes | DLL SHA-256 |
| --- | ---: | --- |
| 01 | 4,751,872 | `8cd862c2b4d570c15a1c26da27c5ec604225bad4eea7a51681c3761d9e4b258b` |
| 02 | 4,751,872 | `374bcfe56b3cbb3afa1f3085404477cc430c26b2eda3ebd9a2a0dfafb66f8dd8` |
| 03 | 4,751,872 | `e3f2d4cb4ecb4af69bd9fb5c334a7352b87394cc42c1cc6f8d86dbccccfcaf8b` |

These DLLs differ from each other and from the old cached DLL. Fifteen of each
run's 61 host dependency file hashes differ from the old cache. No cause is
attributed to those differences. Complete target outputs nevertheless repeat.
Do not infer identical host archives or DLLs from identical target output.

## Replay

The standard-library-only verifier runs without a compiler, network or external
artifacts:

```sh
python -I -B verify.py
python -I -B test_verify.py
```

All 12 counterexample tests pass on Python 3.13.7. They include relocated replay
with socket/process creation blocked, altered host source lock or controller,
missing compiler commands after log resealing, old macro-cache references, changed
macro dependency bindings, mutated DLL/target bytes, unlocked host commands and
fabricated allocation padding.

It checks the target controller's immutable identity and verifies each supplied
macro input file against the corresponding host output binding. The unchanged
target controller hashes that DLL and all 61 dependency files before and after
compilation. The packet retains the macro DLLs and dependency hash observations;
it does not duplicate all host archive containers. Saved logs and receipts are
not cryptographic execution or process-memory attestation.

For a new native build, use a new output directory and the same pinned external
SDK, sysroot and vendor inputs as PR446. Example PowerShell invocation, with
locators replaced by the caller's existing installations:

```powershell
python -I -B build.py `
  --sdk C:/inputs/platform-tools-v1.54 `
  --target-sysroot C:/inputs/linux-sysroot/rust `
  --vendor C:/inputs/mayhem-vendor `
  --msvc 'C:/Program Files (x86)/Microsoft Visual Studio/2022/BuildTools/VC/Tools/MSVC/14.44.35207' `
  --windows-sdk 'C:/Program Files (x86)/Windows Kits/10' `
  --output C:/builds/mayhem-fresh
```

There is no input option for a prebuilt historical macro. The retained
`controller/historical-macro.json` is the immutable baseline for comparison;
the integrated controller replaces it only in its new output directory with the
fresh host build's observed binding. External source/compiler inputs remain pinned.

The target-derived linker layout and metadata/path remaps are still required.
No runtime suite, historical toolchain attribution, security assessment, selected
artifact promotion, allocation image, account change or deployment is claimed.
The historical source archive retains Anchor's Apache-2.0 license. No failed
compilation occurred in these three chains.
