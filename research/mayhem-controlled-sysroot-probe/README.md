# One compiler, three target library sets

The official **Windows x86_64 platform-tools v1.54 compiler**, held fixed,
emits different complete `Error::type_id` bodies when given the release's
Windows, Linux x86_64 and Darwin arm64 **generic-v0 target library sets**.
The Linux set reproduces the two already known 40-byte Mayhem ranges.
The Darwin set reproduces the constants in the retained Darwin alloc object
and linked build. Windows produces a third value.

This extends the [shipped alloc provenance study](../mayhem-alloc-typeid-provenance/README.md)
with actual controlled compilation. The changed input is the **whole target
library set**, not `liballoc` alone. It does not establish the original
compiler, historical concrete type, unique linked-copy attribution, or new
raw body coverage. No program was linked, stripped, padded, deployed or run.

## Retained experiment

`run/` contains four successful compilations, including a repeated Linux
control; all four unmodified relocatable objects and assembly outputs are
retained. `commands.json` records the actual arguments, timestamps, exit
codes and output identities. The exact original drivers are archived under
`controller/`; their workspace-relative acquisition paths are historical
records, not the portable replay entry point.

The existing two-function source fixture is copied byte-for-byte from
`repro/donation-relay/framework-sysroot-recovery/probes/probe.rs` at
`766975f21c66c520282cad3eb44828c221f744fc`.
Its SHA-256 is
`faeaaaed390ea6a595886ea8f7a1ef12e6c4f5bee79ce39bd6065c337e0cbbf1`;
`probe-input.json` also records its Git blob identity.
One function constructs a boxed string error; the other requests
`TypeId::of::<std::io::Error>()` as a distinct control.
Captured program bytes are comparison inputs read after compilation.

All four commands use the same compiler, source directory, minimal
environment, flags and `sbpf-solana-solana` target. Only `--sysroot` and the
output destination vary. Compilation uses `--emit=asm,obj`; no Cargo,
dependency resolution, linker or target VM is involved.

| Target libraries | Boxed error R0 | Boxed error R1 | Original raw matches |
| --- | --- | --- | --- |
| Windows x86_64 release | `0x855d782b03785e5d` | `0x207b8f08e575f1ed` | none |
| Linux x86_64 release | `0xb48b06e23bc32191` | `0x802914a71efcf08e` | offsets 599768 and 666624 |
| Darwin arm64 release | `0xfc2cba3a8bdda727` | `0x09f7c3b95c533b40` | none |

These are two returned registers decoded from two LDDW instructions and EXIT,
not a proposed Rust `TypeId` serialization convention. All selected bodies
are exactly 40 bytes with no object relocations. Each object's 88-byte table
has the type-ID reference at offset 56 alongside named `StringError`
drop/Debug/Display/description references; all nine table relocations and
zero addends are checked. The direct `std::io::Error` control has different
constants in every library set and matches neither original range.

Linux's **entire object and entire assembly** are byte-identical on repeat.
`findings.json` is regenerated from objects and the hash-pinned parent
evidence. Linux and Darwin fresh bodies equal their respective shipped
alloc bodies and both corresponding retained linked copies, despite
different mangled symbol hashes. Linux capture boundaries retain actual
code-pointer/direct-call witnesses, not just substring hits.
The two original ranges and four possible prior linked-copy/original
pairings are unchanged.

## Compiler and library provenance

All three complete publisher archives were SHA-256 checked before the
original run. The selected regular components were hashed before and after
compilation. `*-components.json` retains publisher asset metadata and every
selected member's size/hash: 38 Windows components and 27 per other host.
Each contains all 26 files in the generic-v0 target library directory.
Windows additionally supplies native executables/DLLs; selected Cargo,
rustdoc and PDB files are not evidence that those tools were executed.
Large SDK archives and libraries are not duplicated here.

The fixed `rustc.exe` is 110,592 bytes, SHA-256
`89c781244d73bda9434ad6fc47aafb8cb6de96a78fd8b3b649c3e7ef03a5f8ba`.
`rustc_driver-4c05705140f85a08.dll` is also held fixed, SHA-256
`2524d46d9a5dcd639f657952fd70ecf97041d73fa59bd3a8442cdbe63f26192b`.
The compiler self-reports Rust 1.89.0-dev, LLVM 20.1.7, host
`x86_64-pc-windows-msvc`, and **unknown commit hash/date**.
Release `version.md` files separately identify Rust source revision
`daa3af4a1110ec3f10ce08083bb0b7855a88416f`.
Release metadata is not presented as a compiler self-reported commit.

The commands ran natively on Windows with explicit sysroots and a minimal
environment. No network activity was requested by compilation commands;
this is not an OS sandbox, network-denial or exhaustive loaded-DLL
attestation. It does not independently prove which individual files rustc
read. The library-set intervention, selected component hashes, actual
outputs and command observations define the experiment's scope.

## Verify without compiling

Python 3.12+ standard library, from the repository root:

```sh
python3 research/mayhem-controlled-sysroot-probe/verify.py
python3 research/mayhem-controlled-sysroot-probe/test_probe.py
```

The default verifier checks package membership and every retained byte,
the 20 pinned repository inputs, the previous packet, command/exit/input
invariants, the complete Linux repeat, raw bodies, referring tables and
original boundaries. It performs **zero fresh compiler executions**.
It explicitly reports that publisher archive membership was not rechecked.
To recheck all selected components against complete official archives:

```sh
python3 research/mayhem-controlled-sysroot-probe/verify.py \
  --windows-archive /archives/platform-tools-windows-x86_64.tar.bz2 \
  --linux-archive /archives/platform-tools-linux-x86_64.tar.bz2 \
  --darwin-archive /archives/platform-tools-osx-aarch64.tar.bz2
```

The [official v1.54 release](https://github.com/anza-xyz/platform-tools/releases/tag/v1.54)
contains these assets. Archive verification requires no network or
compiler execution. It checks complete archive digests and all 92 selected
regular members, including components not necessarily loaded by rustc.

## Explicit native replay

`replay.py` accepts a provisioned SDK workspace with these layouts:
`windows-sdk/rust/...`, `linux-sysroot/rust/...`,
`darwin-sysroot/rust/...`, and `version.md` at each SDK root.
They correspond to the listed archive members. It downloads and installs
nothing. On Windows, using a new output directory:

```powershell
python research/mayhem-controlled-sysroot-probe/replay.py `
  --sdk-workspace C:\probes\v154-components `
  --output C:\probes\fresh-typeid-run
```

The replay checks all component hashes, copies only listed components into
the fresh directory, runs the six recorded commands, checks inputs again,
and requires all eight object/assembly outputs to equal the original run.
It retains stdout/stderr and a failure observation if a command fails.
It never opens the original Mayhem capture.
The separately retained `replay/` receipts document one successful use of
this portable controller. That is four additional tiny compilations;
neither run is a whole-program build or behavioral test.
The helper version actually imported for that replay is preserved as
`controller/verify_at_replay.py`; the current verifier additionally checks
the replay receipts and compares all eight outputs again.
The eight exact assembly receipts retain rustc's terminal blank line.
Package-local whitespace exceptions name only those eight files; their
complete bytes remain checked by the command records and manifest.

The tests include actual constant, vtable, instruction-shape and symbol
mutations, command/sysroot drift, missing/failed outputs, a changed repeat
with its receipt updated, incomplete observations, archive/hash rejection,
and an isolated Python replay in a relocated minimal checkout.

## Remaining question

This bounds the cause to the target-library-set choice under one fixed
compiler. An alloc-only swap, compatible crate-metadata dependencies,
the origin of crate/type fingerprints, historical concrete type and whole
Mayhem raw byte identity remain unresolved. No normalized comparison,
allocation image, completeness or security claim is substituted for raw
compiler output equality here.
