# Native Windows reproduction of the published Mayhem research candidate

Three fresh native Windows builds reproduce the **raw and stripped ELFs** from
the [source/data recovery](../mayhem-source-data-recovery/README.md) at
`5f88c2f7e7b32bd499bda8aa86c68b6d6e061ac0`, without changing its 65 source inputs.
The compiler uses official v1.54 Windows tools and the official Linux target
libraries. Replaying target-crate metadata from retained compiler commands,
then reproducing their source-path spelling, closes this cross-host artifact
gap. This gives subsequent source experiments a byte-identical baseline.

**The reference is a reconstructed candidate, not the deployed Mayhem program.**
It still has 426/441 normalized original-window counterparts, 70 raw-local
counterparts and 15 unmatched windows. No new original window is recovered here.
The later sell-quote-call and 428-window accounting/ExtendAccount successors,
and all selected artifacts, retain their own bindings. No VM, loader, live
transaction or target execution was performed.

| Artifact | Bytes | SHA-256 |
| --- | ---: | --- |
| Raw compiler-linked ELF, `symbols.so` | 868,280 | `6d90940933cc97c7858fae262e77c0f735ee059c1a71350e500b156cd7809522` |
| Separate `llvm-objcopy --strip-all` output | 733,568 | `e51e600c339f592d75889e82d5b0d9eb397982c32a64f15a5debcf5a114375cf` |
| Original captured payload, comparison only | 777,408 | `a87fa9f866272514e6acb852b668c4a08aeb173d56c883039991d114d1199bdb` |

The original payload includes a 775,416-byte meaningful ELF and a 1,992-byte zero
allocation suffix, as recorded in [scope](../../docs/SCOPE.md). The two new build
outputs are compiler/strip outputs, not allocation images. Raw equality here
covers complete file bytes, including headers, data, relocations and symbols;
it is neither a normalized comparison nor a behavioral claim.

## Controls and result

All seven full builds use fresh Cargo homes and target directories, locked
offline dependencies, the same sources and identical pre-wrapper compiler
arguments after build-root relocation. All 163 Cargo-reported crate compilations
per build are bound to actual wrapper observations: 78 host and 85 target. Each
trace also records 13 auxiliary invocations, including two compile probes;
these are accounted separately. Atomic create-new record files prevent PID
reuse from silently losing an observation.

| Control | Repetitions | Raw ELF bytes | Text bytes / function extents | Ordered normalized text equal to reference | Raw text differing overlap positions | Whole raw/stripped equal |
| --- | ---: | ---: | --- | --- | ---: | --- |
| Native metadata, passthrough | 1 | 866,040 | 663,512 / 449 | No | 59,783, plus a 1,008-byte extent difference | No |
| Published target metadata only | 2 | 868,520 | 664,520 / 456 | Yes | 2,179 | No |
| Metadata plus full-file path remaps, absolute registry inputs | 1 | 868,296 | 664,520 / 456 | Yes | 1,972 | No |
| Metadata, path remaps and relative registry inputs | 3 | 868,280 | 664,520 / 456 | Yes | 0 | **Yes, both files** |

The third exact run uses the portable builder in this packet and recompiles its
host wrapper from source. Negative controls and their complete outputs are
retained. The native baseline happens to have 75 raw-local original counterparts;
the exact reference reproduction has 70. Those local counts do not rank whole
artifact identity. The preceding [sharing matrix](../mayhem-sharing-matrix/README.md)
isolated explicit sharing flags from Cargo-derived identities; this packet
replays the retained identities directly, without adding a sharing flag.

## Compiler-command provenance

`upstream-inputs.json` pins exact revisions, repository paths, SHA-256 values and
Git blob identities. Two primary retained logs determine the metadata map:

1. `repro/mayhem/compiler-v154-main/main/build.log` at
   `e57657def421f34ceb31166626e6a07b801ebb6f` contains 84 target compilations.
2. `research/mayhem-source-data-recovery/builds/recovered/stderr.gz` at the same
   revision contains four target recompilations. These replace `anchor_lang`,
   `anchor_spl` and `mayhem_recovered`, and add `curve_accounts`.

The composite contains 85 target units. The verifier joins native and published
units by source package/version/path, checks the 295 target dependency edges
through their actual output filenames, and compares the remaining argument
sequences. It explicitly excludes executable paths, `-C metadata`,
`extra-filename`, output/search/dependency paths and the native explicit
`--sysroot`; positional source paths are canonicalized only for this comparison.
Host proc-macro edges are outside the target-edge comparison. These exclusions
do not assert complete invocation or host-library equality.

`metadata-map.tsv` replaces one existing `-C metadata` value for each target
unit. Of 85 replacements, 65 change the value and 20 are already equal. It does
not append another metadata flag, modify Cargo's artifact filenames or redirect
dependency files. All host compilations and auxiliary probes remain unchanged.
The map is reproduced from the primary logs rather than inferred from mangled
symbols or from the target ELF. Ten other scanned logs and the exploratory
controllers are retained for provenance, but do not supply additional map rows.

`path-map.tsv` contains 719 full-file remaps across 76 crate names. Registry
source paths map to their forward-slash relative spelling. The root and local
Anchor/curve paths follow the retained source/recipe paths, including the
`src/account_wrapper.rs` exception. With absolute registry source inputs, eight
backslash-spelled source strings leave a 16-byte `.rodata` size residual. Passing
the same 82 registry input files relative to each actual crate working directory
allows the remaps to take effect. The verifier checks that every relativized
input resolves to the same file and that no other argument changed.

Four tiny object compilations separately measure this path behavior: relative
input plus same-file remaps produces forward slashes; absolute input plus
absolute remaps still retains backslashes with `-Zremap-cwd-prefix=`. Their
objects, sources and logs are retained under `exploration/path-probe-02`. The
initial failed probe, which omitted the apostrophe in `&'static str`, is retained
under `exploration/path-probe`; it contributes no positive evidence.

The reference ELF is never a compiler or wrapper input. Matching it establishes
a sufficient recipe for this published reconstruction. It does not establish
the historical deployment compiler, original source, unique flags, or a general
cross-host equivalence theorem.

## Verify saved evidence

Python 3.11+ and the standard library suffice on Windows or Unix. The verifier
does not invoke a compiler or execute ELF inputs. The copied `layer01.py` is
pinned to the existing upstream reader; no normalization mask is added.

```sh
python3 -I -B research/mayhem-native-reference-identity/verify.py
python3 -I -B research/mayhem-native-reference-identity/test_verify.py
```

The packet retains 1,141 Cargo-reported crate compilations, four host-wrapper
compilations, four successful tiny compilations and the failed tiny compilation.
Auxiliary probes/queries are recorded separately. Eighteen regression tests
reject lost/duplicate observations, changed host/codegen arguments, unbound
metadata and dependency edges, source escape, and conflation of normalized and
raw equality. `findings.json` retains the complete original-window ID sets and
section comparisons. `manifest.json` seals the entire packet.

## Rebuild explicitly on Windows

Supply the same v1.54 Windows SDK, official Linux target sysroot, checksum-verified
vendor tree, MSVC 14.44.35207 and Windows SDK 10.0.26100.0 used in the preceding
native compiler packets. `sdk-components.json.gz` pins 2,639 Windows distribution
files; `target-components.json` pins 26 Linux target files plus `version.md`.
The 215-package vendor inventory includes all 214 locked registry packages and
the unused registry Anchor copy; the build uses the retained local Anchor source.
The declared Rust revision is `daa3af4a1110ec3f10ce08083bb0b7855a88416f`.

```powershell
python -I -B research/mayhem-native-reference-identity/build.py `
  --sdk C:/inputs/platform-tools-windows `
  --target-sysroot C:/inputs/platform-tools-linux/rust `
  --vendor C:/inputs/vendor `
  --msvc 'C:/Program Files (x86)/Microsoft Visual Studio/2022/BuildTools/VC/Tools/MSVC/14.44.35207' `
  --windows-sdk 'C:/Program Files (x86)/Windows Kits/10' `
  --output C:/work/mayhem-reference-repeat
Get-FileHash C:/work/mayhem-reference-repeat/symbols.so -Algorithm SHA256
Get-FileHash C:/work/mayhem-reference-repeat/candidate-v154-strip.so -Algorithm SHA256
```

Use a new output directory and compare both hashes with the table above. The
builder fails on input/tool mismatch, builds its wrapper, runs Cargo with
`--locked --offline`, retains all invocation records, and checks inputs again
after compilation. It prints output identities; the saved-evidence verifier
checks the three retained runs. Offline Cargo and a private process environment
are used; no OS network-denial sandbox or exhaustive host DLL attestation is
claimed. Failed builds retain their logs and result records.
