# Mayhem initializer panic Source recovery

A whitespace-only source correction changes **exactly three bytes** in the
compiler-linked ELF from the [428-window trade-source candidate](../mayhem-trade-source-origins/README.md).
They are the incorrect line/column bytes in the initializer's two Rust panic
Source records. All executable bytes, headers, relocations, symbols and every
other data byte remain equal to that baseline. Three fresh full builds,
including this packet's portable builder, reproduce the corrected raw and
stripped outputs.

The initializer's whole body **still does not match**: 920 candidate bytes
versus 960 original bytes. The inventory stays **428/441 normalized windows,
70 raw-local and 13 unmatched**. No new complete function, deployed-ELF identity,
historical source spelling or fresh runtime result is claimed. Canonical
selections, active program sources and workflows are unchanged.

The concurrent [qualified linker-order control](../mayhem-qualified-linker-layout/README.md)
uses the same 66-file trade-source input and reaches 100 raw-local matches with
its separate layout. This packet measures the source correction on the pinned
70-raw-local layout. Combining the correction with that linker control and
replaying its runtime suites remains follow-up work; its gains are not attributed
to this artifact.

## Exact change

The source patch preserves statement order, all non-whitespace bytes and all
later line numbers in `src/state.rs`. The original binary supplies the two
filename/line/column tuples; this does not authenticate its original source
text. The source retains the original checked addition and `Clock::get().unwrap()`.

| Actual initializer consumer | Parent Source | Original and corrected Source | Changed raw file byte |
| --- | --- | --- | ---: |
| Signed timestamp-add overflow | `state.rs:535:25` | `state.rs:532:32` | 684096 and 684100 |
| Clock-result unwrap failure | `state.rs:531:26` | `state.rs:531:43` | 684156 |

Each Source has a 24-byte descriptor with a relocated pointer to the same
37-byte `programs/mayhem-program/src/state.rs\0` filename. The checker validates
the relocation and bounded filename, line and column; it does not compare
relocated pointers as equal raw addresses. All three byte changes also occur
at those positions in the stripped artifact.

| Artifact | Bytes | SHA-256 |
| --- | ---: | --- |
| Published trade-source parent / fresh native baseline, raw | 867,744 | `c29b81a84b4308170d65eb9a0d602e6246c7a1ba9ec98dc71fcbf6fee3944333` |
| Corrected raw compiler ELF | 867,744 | `c72f4c0bfb91546886aa2ce0383200c5aa9943b5824e0287af67cecd9735cf62` |
| Corrected separate `--strip-all` output | 733,352 | `ce78c7f307a4fb70366831c15cfa9a9b3562edd7709a03966f9e631d94d15529` |

These are compiler and stripper outputs, not allocation images. The original
capture remains a separate 777,408-byte payload with a 1,992-byte allocation
suffix. Its SHA-256 is
`a87fa9f866272514e6acb852b668c4a08aeb173d56c883039991d114d1199bdb`.
No captured bytes are inserted into a build, and the compiler never reads the
original or reference ELF.

## Static scope and preservation

The accepted change leaves the entire raw `.text` and the initializer's raw
instructions/addresses unchanged. The checker finds only the initializer as a
direct function reference owner of the two modified Source records. It also
checks all four immediate relocated data observations against the original:
the two Source descriptors, the actual 43-byte unwrap literal consumed by the
call, and the 32-byte ProgramError Debug vtable. The vtable's formatter is
compared as a complete normalized function, with its three scalar slots checked
directly. Five immediate direct-callee bodies match in ordinal order; the
external `abort` import agrees. These comparisons do not establish complete
caller instruction correspondence, recursive call closure or behavior.

The existing parent preservation checker runs on the exact old/new bytes. It
retains all 428 matched bodies, 70 raw-local bodies, **4,280 positive direct-call
observations**, **444 matching Source observations**, and every observed Source
profile. Those counts start from the already-composed 428-window baseline.
The parent report started from 426 windows and counted 4,235/441; the extra
45 calls and three Sources belong to its previously recovered O0072/O0090
cohort, not to this patch. The two initializer Source corrections are inspected
separately because its body is still unmatched.

The latest composition also retains all five previously recovered trade Source
observations, checked through the complete entry wrappers and their live handler
data references. Its 66-file source archive includes all prior trade changes;
the only new source edit is initializer whitespace.

No target VM or transaction was run. The parent's saved trade/ExtendAccount
replays retain their exact original candidate binding; they are not relabelled
as executions of this corrected artifact. Runtime confirmation of the two
panic diagnostics remains separate work.

## Retained controls

The [native compiler recipe](../mayhem-native-reference-identity/README.md) first
reproduced the earlier [accounting/ExtendAccount candidate](../mayhem-accounting-extend-recovery/README.md)
raw **and stripped** exactly from
its 66 source inputs. Its four retained target recompilations use the same
metadata as the earlier source/data candidate. Together with the pinned full
dependency log, they bind all 85 target units and 295 target dependency edges.
The source-path map adds the new ExtendAccount file, for 720 full-file remaps.
All 214 locked registry packages, SDK/target-library files and checked host tools
retain the preceding recipe's identities.

Eleven unsuccessful source controls are retained alongside the correction:

| Control family | Fresh builds | Initializer bytes | Complete original body equal |
| --- | ---: | ---: | --- |
| Published accounting/ExtendAccount baseline | 1 | 920 | No |
| Key copied before Clock; declaration, borrow and clone variants | 7 | 960 | No |
| Aggregate assignment / `set_inner` | 2 | 968 | No |
| Precomputed end timestamp, field or aggregate assignment | 2 | 968 | No |
| Accepted Source-only correction, repeat and portable build | 3 | 920 | No |
| Newer trade-source baseline | 1 | 920 | No |
| Correction composed onto trade-source, repeat and portable build | 3 | 920 | No |

The early-key controls reproduce the original's observed key-load timing and
body size, but still have different stack slots and ordered instructions. None
is promoted as a recovered function. All controls retain 428 normalized and 70
raw-local original counterparts. Their actual sources, artifacts, logs and
compiler observations remain available to prevent repeating the same search.
`exploration/initializer-data-preview.json.gz` is an earlier, rejected generic
pointer preview; the strict relocation-aware decoder in `verify.py` supplies
the accepted Source evidence.

The first 15 builds are retained at the packet root. The four builds under
`latest/` compose the same correction onto the newer trade-source checkpoint;
the table above identifies that final result. The earlier correction's raw hash
is `fc4dadb6d1cb2b1934ddaf303529680ab12f3c47acaf0969fa42fecb056275c1`
(868,144 bytes); it is a separate artifact, not the latest composition.

There are **19 fresh full builds / 3,097 Cargo-reported crate compilations**
(78 host and 85 target each), plus 19 host-wrapper compilations. Each complete
wrapper trace records 176 invocations: 163 crate compilations and 13 auxiliary
invocations, including two compile probes. Auxiliary probes/queries are counted
separately. Host compiler arguments are unchanged; target metadata and source
path transformations follow the published recipe. All build roots are fresh.

## Verify and rebuild

Python 3.11+ and the standard library suffice to verify saved evidence:

```sh
python3 -I -B research/mayhem-initializer-origins/verify.py
python3 -I -B research/mayhem-initializer-origins/test_verify.py
```

The twenty-one regression tests reject substituted parent artifacts, extra data
or code changes, wrong Source fields/relocations/filename bounds, bad literal
bytes, wrong formatter/callee targets, lost trade Sources, unrelated source changes
and unlisted nested manifests.
The original ELF reader, compiler-observation helpers and parent preservation
checker are retained with exact upstream revision/blob/hash bindings. No new
normalization mask is introduced. `manifest.json` seals the complete packet.

`latest/source.patch` applies only to `src/state.rs` in the exact 66-file trade-source
parent archive; `latest/overrides/src/state.rs.gz` and `latest/sources/` retain the
corrected bytes. The corresponding root files retain the older accounting control.
To rebuild the latest composition,
use the same native Windows SDK, official Linux target sysroot, vendor tree,
MSVC 14.44.35207 and Windows SDK 10.0.26100.0 described in the native recipe:

```powershell
python -I -B research/mayhem-initializer-origins/latest/build.py `
  --sdk C:/inputs/platform-tools-windows `
  --target-sysroot C:/inputs/platform-tools-linux/rust `
  --vendor C:/inputs/vendor `
  --msvc 'C:/Program Files (x86)/Microsoft Visual Studio/2022/BuildTools/VC/Tools/MSVC/14.44.35207' `
  --windows-sdk 'C:/Program Files (x86)/Windows Kits/10' `
  --output C:/work/mayhem-initializer-origins-repeat
```

Use a new output directory and compare both output hashes with the table above.
The builder verifies supplied inputs, compiles the host wrapper, uses Cargo
`--locked --offline`, retains observations and verifies inputs again. This is
an isolated offline build process, not an OS network-denial sandbox or an
exhaustive host-library attestation.
