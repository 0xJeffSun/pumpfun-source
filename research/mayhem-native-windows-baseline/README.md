# Native Windows Mayhem build control

Two builds from fresh dependency targets reproduce the same native Windows
Mayhem artifacts from all 15 published PR214 source inputs. This provides an
offline build path using the official Windows v1.54 SDK, official Darwin v1.54
generic-v0 target libraries, 215 checksum-verified locked crate archives and
existing MSVC/Windows SDK tools. No SDK installation, Cargo registry access
during compilation, or target-program execution is involved.
Each full build log contains 162 Rust compiler invocations: 78 host and 84
SBF target invocations, including exactly one Mayhem root invocation.
The 215 locked packages include platform/feature alternatives not compiled.

**The published Darwin baseline is not reproduced.** Both native outputs
remain different from it and from the captured original. The failure is
retained, with a bounded explanation of the observable differences. No Mayhem
source change, new original-window recovery, semantic admission or canonical
selection is proposed.

## Artifacts and comparison

| Observation | Published PR214 | Native Windows |
| --- | ---: | ---: |
| Stripped ELF bytes | 625,136 | 624,416 |
| Instruction section bytes | 559,280 | 558,560 |
| Symbol-defined function extents | 411 | 409 |
| Examined original windows with a strict normalized counterpart | 188 | 188 |
| All original windows with a strict normalized counterpart | 327 | 327 |
| Original windows with literal local body equality | 58 | 58 |

The 327-row set includes still-opaque functions and does **not** expand the
196-function admitted cohort. The exact 188 examined and 58 raw sets survive
without gains or losses. No call-graph, indirect-call, data or behavioral
closure follows from the normalized correspondence.

The complete function-shape multisets differ only by one 312-byte
`alloc::raw_vec::finish_grow` copy (7 versus 6) and one 408-byte
`RawVec::grow_one` copy (3 versus 2). Those two multiplicity differences
account for the 720-byte instruction-size delta. This is a comparison of
whole function extents under the existing, pinned normalization, not evidence
that the linker discarded those particular historical definitions.
The symbol names, extents, raw hashes and all possible shape counterparts
are retained in `findings.json.gz`.

`.rodata` and `.data.rel.ro` retain their sizes but differ in bytes.
The native artifact contains mixed Windows separators in source-path strings,
including `programs/mayhem-program/src/instructions\buy_v2.rs`.
The published counterpart uses forward slashes. Exact byte/offset witnesses
are regenerated; source files themselves are unchanged.

Native raw Cargo link output (symbol table retained):
`6711f95d813be2a9f56e2b3259a4c61071c741eba0f9c6b08fdc06aae60841e6`.
Native output after the separately recorded v1.54 `--strip-all` command:
`2fa0ef2e4bf18b8790a0743383d252e32819f221b6da39ea68159da56ccf738b`.
Both full files repeat exactly from a second fresh target and a relocated
source tree. A separate root relink adds an LLD map and reproduces the first
raw link output exactly. It is not counted as another clean dependency build.

An explicit strip control applies the Windows v1.54 objcopy to the retained
published symbol artifact. It exactly reproduces the published v1.52-stripped
SHA-256 `9be9d40f1c8995915d55c29abf42cf6bd1c07a1f386054ed89c2156a1ecd5460`.
The text-size difference already exists in the raw link outputs, and this
control rules out stripping as its explanation.

## Provenance and limits

The historical comparison is the
[GlobalParams layout recovery](../../repro/mayhem/global-params-layout-recovery/README.md),
not a claim to reproduce subsequent Mayhem source recoveries.
The exact 15-file source map, complete source bytes, Cargo lock and unchanged
projected Pump IDL are retained. Seven repository inputs, including original
capture, parent artifacts, the admitted cohort and unchanged `layer01.py`
normalization, are pinned by size, SHA-256 and Git blob.

The Windows archive SHA-256 is
`98e731bc4db8b55b4dc07229639bf0c91f76cc5117dcd7f31d9633a8943b96e9`;
the Darwin archive is
`1c8b3af5e8614e1c459393a95c5b19bfbcc8ed13822a1cb539fae68471f9bfbb`.
They are assets of the [official v1.54 release](https://github.com/anza-xyz/platform-tools/releases/tag/v1.54).
Both archives were fully hash-verified before component use. The 2,639
selected Windows SDK components and 27 Darwin target components are recorded
and checked before/after builds. Runtime use of every selected file is not
claimed. Compiler, Cargo, LLVM tools and the host cl/link executables have
separate hashes in launch records.

The host uses MSVC 14.44.35207 and Windows SDK 10.0.26100.0. Windows system
DLLs and every host SDK header/library are not exhaustively attested.
Native compiler, host build dependencies, crate metadata/source-path handling
and linkage differ from the published private Darwin cache recipe. This is
not a single-variable experiment and does not identify the cause of the
two missing duplicate copies or historical build provenance.

The original experiment controllers are preserved under `controller/`.
`build.py` is the portable controller actually used for the second fresh
build. Commands, logs, raw link outputs, stripped outputs, map and failed
published-baseline comparison are retained. Native build scripts/procedural
macros execute as part of compilation; no SBF program or VM is executed.
Cargo is offline; no OS network-denial or sandbox attestation is claimed.
No allocation image, binary patching or security/completeness claim is used.

## Verify offline

Python 3.12+ standard library, from the repository root:

```sh
python3 research/mayhem-native-windows-baseline/verify.py
python3 research/mayhem-native-windows-baseline/test_verify.py
```

Default verification recompares every original window, checks the complete
normalized multiplicity delta, sources, root-build receipts, both artifact
repetitions, strip control and exact hashes. It performs zero fresh compiler,
linker or target executions. It does not recheck unavailable SDK/vendor files
or publisher archives; those recorded observations stay distinct.

To additionally recheck a provisioned vendor tree and all original crate
archives:

```sh
python3 research/mayhem-native-windows-baseline/verify.py \
  --vendor /inputs/vendor --crate-archives /inputs/crates
```

This rehashes the actual vendor files, verifies each archive against Cargo.lock
and regenerates every vendor checksum map from its archive contents.
The original generated checksum maps use CRLF metadata endings; regeneration
preserves those exact endings without changing any crate source bytes.

## Explicit fresh build

Provision SDK/components and vendor directories matching the retained maps.
The controller downloads and installs nothing and requires a new output
directory. It checks the supplied executable identities, builds the retained
source with a new Cargo target, and requires both native output hashes:

```powershell
python research/mayhem-native-windows-baseline/build.py `
  --sdk C:\inputs\windows-v154 `
  --target-sysroot C:\inputs\darwin-v154\rust `
  --vendor C:\inputs\vendor `
  --msvc "C:\Program Files (x86)\Microsoft Visual Studio\2022\BuildTools\VC\Tools\MSVC\14.44.35207" `
  --windows-sdk "C:\Program Files (x86)\Windows Kits\10" `
  --output C:\probes\fresh-mayhem
```

The next baseline task is to reconcile crate-unit metadata, duplicate helper
emission and source-path handling with the published Darwin build. The two
published artifact hashes remain acceptance gates for that reproduction.
O0095 and the trade bodies are untouched by this packet.
