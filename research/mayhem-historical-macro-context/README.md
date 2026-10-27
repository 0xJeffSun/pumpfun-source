# Mayhem allocator with the complete historical Anchor macro

The complete historical `declare_program!` macro reproduces the 328-byte curve
allocator helper using an official November 2025 event definition. Restoring
Anchor's actual Solana exclusion returns the helper to 312 bytes. This removes
the manually rendered event-template limitation of
[PR #257](https://github.com/lalalune/pumpfun-source/pull/257).

This remains a **cross-version diagnostic**. The macro, `anchor-syn`, IDL and
IDL-spec source come from one historical Anchor revision. The target runtime
and derive macros remain Anchor 1.0.0, and the existing registry vendor versions
are used. It is not a reproduction of the complete historical framework, its
lockfile or original Mayhem source. No historical IDL version is attributed to
the captured program.

## Authenticated source inputs and actual compilation

`source-tree.json` records 121 selected GitHub tree-associated blobs under
`lang/` and `idl/`, plus the root manifest/license, from
[`c0077c2`](https://github.com/otter-sec/anchor/tree/c0077c2a7de64361f451735ac89118bc89f1c277).
Every retained file's Git blob hash is rechecked. The following
[`624f3ae` change](https://github.com/otter-sec/anchor/commit/624f3ae95c84f65c16567f997f29721fb9827406)
adds one Solana exclusion to `utils.rs`; applying it reproduces the exact blob
`4fb84b0879c07819886ba419fee5b6434436555d` used in the gated control.

The contemporaneous [official Pump IDL](https://github.com/pump-fun/pump-public-docs/blob/7d7abd77403f0646ea17468d7cb6e66b33dbc3ed/idl/pump.json)
is 122,063 bytes, Git blob `1ecf2a032c83a4c7a66648e8bf21bd58dc2b6e4d`.
The controls take its event/type definitions while retaining the reconstruction's
three CPI instruction definitions. They do not substitute the complete historical
IDL, whose interface differs. The complete macro generates accounts, instructions,
event types and utilities; no event parser is manually appended.

Two fresh host builds compile the historical macro and its historical path
dependencies, before and after the gate. Each Cargo log contains 42 Rust compiler
commands, including build scripts. All 121 selected source files are checked
before and after. The root workspace member list is narrowed; ten optional
dependency archives are supplied through explicit path patches, with checksums
from the historical root Cargo.lock. Other registry dependencies use the existing
vendor set. A separate **post-run** observation checks all files in the 28 used
registry packages against their earlier pinned checksum maps; it is not relabeled
as a before/after observation of these host builds.

The new macro is supplied directly with `--extern` and invoked through an
explicit proc-macro alias in the curve crate; the program Cargo manifests are
unchanged. Only that invocation and the curve IDL change among the 66 program source
files. Both host DLLs, all commands, exact source hashes and generated archives
are retained. The target compiler/library set and other direct compiler arguments
remain those of the qualified baseline.

| Curve control | Helper bytes | Changed existing executable sections | Added sections |
| --- | ---: | ---: | ---: |
| Historical macro, no events | 312 | 0 | 5 |
| Historical macro, current CreateEvent | 328 | 1 | 10 |
| Historical macro, November CreateEvent | 328 | 1 | 10 |
| Historical macro, all November events/types | 328 | 1 | 40 |
| Current macro, November CreateEvent | 312 | 0 | 2 |
| Gated historical macro, no events | 312 | 0 | 0 |
| Gated historical macro, November CreateEvent | 312 | 0 | 2 |
| Repeated historical macro + November CreateEvent | 328 | 1 | 10 |

Every baseline executable section remains. The only changed existing section is
`finish_grow`; its raw object body equals the earlier 328-byte positive and the
Token-2022 helper. The repeated curve compilation produces an identical complete
object. Gated/no-event executable sections equal the baseline, but complete object
identity with the baseline is not claimed.

## Incremental program builds

Three successful root compilations use these new curve archives and the
qualified parent's 93 other linker archives. They are **incremental builds**,
not fresh full dependency builds. Two enabled runs produce identical raw ELF:

| Output | Bytes | SHA-256 |
| --- | ---: | --- |
| Enabled raw ELF, both runs | 867,760 | `e5f076671f5b6a2aa85bd37c25578a8fa55186b1de910170075018e544e45595` |
| Enabled separately stripped ELF | 733,368 | `56bd28a9c5956c01df8495647a4ea953840640a0f15fe3a260547d86efafe3a3` |
| Gated raw ELF | 867,744 | `7db3f0e2a92a47bee88dd2a6862f3b32cc9cc8dd6ff46c0a99b82f2309287cfa` |
| Gated separately stripped ELF | 733,352 | `03f1f70e6a33cb60a1a1fa7110cdecf03553ee30b1ff7b9a0e26905d0ba1c175` |

The enabled stripped output exactly equals PR #253's zeroed-vector diagnostic;
the gated stripped output equals PR #250's qualified parent. Each raw output
differs from the corresponding earlier raw ELF. Only `.symtab` and `.strtab`
section payloads differ; this statement excludes section-header metadata and
does not assert that all changed file bytes lie inside those payloads.

All 456 linked function providers remain. The generated utility parser functions
are discarded by the linker. Only the allocator helper changes normalized shape;
enabled text grows by 16 bytes. The reserve at 487224 calls the new helper at
486896 at offset 528. Enabled counts are 428 normalized, 139 raw-local and 428
maximum injective matches; gated counts are 428, 100 and 427. These describe the
older qualified diagnostic, not the separate 429-window trade/validator successor
or its later updates. The same thirteen old-baseline bodies remain unmatched.

No allocation image is produced, no target program is executed, and no original
source, whole-file identity, runtime equivalence or security claim follows.

## Recheck and limitations

```sh
python -I -B research/mayhem-historical-macro-context/verify.py
python -I -B research/mayhem-historical-macro-context/test_verify.py
```

Verification is self-contained, offline and uses the Python standard library.
It rechecks source hashes, historical gate/IDL associations, supplemental archive
checksums, actual Cargo/compiler argument records, source scope, macro DLL input
bindings, direct objects, reused linker archives, raw/stripped output, maps and
local call correspondence. It rejects unlisted files, symlinks and special files.
It performs no compilation or execution of retained binaries.

The initial archive connection timed out; the successful curl acquisition and
all selected Git blob checks are retained. Two host attempts stop at missing
offline optional dependencies (`regex`, then `cargo_toml`). Three initial root
attempts fail E0463 because required search directories were omitted; the successful
controls add both the macro host-dependency and curve-output directories. No sole
cause is attributed to one directory. All failures remain. `scope.json` also
corrects the second failed host launch's incomplete adaptation prose: its four
path patches are visible in the retained manifest and source hash.

`controllers/` retains the experiment scripts with their original workspace
layout assumptions. They are not a portable turnkey rebuild interface; the
recorded launch commands and pinned source/library locators must be recreated
explicitly. The baseline controller is retained for its input-checking functions
and provenance, not presented as a new full-build recipe. Other parent libraries
are pinned by hash rather than duplicated.

Historical Anchor sources keep their Apache-2.0 license in `historical/LICENSE.gz`.
The gated source is explicitly modified by the recorded upstream one-line change;
workspace manifests are modified as described above. Supplemental crate archives
retain their original licenses and notices. Public IDLs retain their authors'
ownership. Verification helpers are unchanged copies from PR #257, with exact
hashes in `helper-origins.json.gz`.

Upstream's [current parser-context composition](../mayhem-control-work-20261027/README.md)
already carries the manually rendered template into the newer source set and
retains bounded runtime comparisons. Those results do not qualify the complete
historical macro tested here. The next step is to test that macro in the newer
source context and qualify its resulting artifact independently. This packet
establishes sufficient compilation context while keeping cross-version and reuse
limits explicit.
