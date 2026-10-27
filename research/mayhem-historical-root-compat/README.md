# Mayhem historical framework: root API compatibility

The historical framework from [PR269](../mayhem-historical-framework/README.md)
now compiles a complete research root with three API compatibility edits in two
files. A fresh dependency/root build exactly repeats the raw and separately
stripped ELFs from two incremental root builds. It matches fewer captured
original windows than a fresh current-runtime control: **403 versus 428**
normalized matches, with **25 losses and no gains**. This bounded result does
not support replacing the current reconstruction with this historical graph.
An isolated follow-up ports the current reconstruction's already recovered
Program ID check into that historical graph. It restores **one** of the lost
windows (O0062), leaving **404 normalized matches and 24 losses** against the
current-runtime control. It adds no match beyond the current reconstruction.

An adjacent February Anchor revision control then isolates duplicate-mutable
validation changes with their required empty trait implementation. Identical
resolved dependency graphs yield **407 to 420 normalized matches**, with no
losses, seven raw-local gains and identical complete outputs from fresh after
repeats. Eight differences remain against the older current-runtime control.
This further explains the historical gap without improving the current frontier.

The following upstream Borsh derive revision restores **O0141 and O0142**,
reaching **422 normalized matches** with six differences against the older
current-runtime control. A separate dependency-only control preserves the 420
normalized matches and accounts for five raw-local gains. Repeated final
compiler outputs are identical; this remains provenance evidence, not a new
current reconstruction checkpoint.

## Source and build boundary

The parent is pinned at `0a881f726f8dae34a2f53f2438cdb271ab830e41`, including
every file in its manifest. It retains 152 historical Anchor Git blobs from
`c0077c2a7de64361f451735ac89118bc89f1c277`, the historical public CreateEvent,
187 resolved registry archives authenticated by the historical lockfile, and
the failed root compiler diagnostics. The reconstructed program baseline is
the older 66-file source at `21bf0cf41ffed3c753630235969b6f183efabf35`.

The compatibility transformation is exact and checked against the parent:

- Expand the two SweepFees `Context<'info, ...>` signatures to
  `Context<'_, '_, 'info, 'info, ...>`.
- Remove the empty `DuplicateMutableAccountKeys` implementation from
  `src/checked_program.rs`, retaining its three newlines. That trait is absent
  in the archived runtime.

Those initial compatibility builds make no additional handler, arithmetic,
CPI-constructor or framework Rust edits. The archived CPI constructor already accepts `Pubkey`; its API must be
read from the actual source. These edits are compiler compatibility evidence,
not proof of behavioral equivalence or the original deployed source.

Both fresh builds use the existing native Windows SDK v1.54 compiler, Linux
target libraries, passthrough metadata and the default linker script. This is
not a claim about the original historical toolchain. The current control keeps
the baseline runtime/dependencies and uses the same historical event. Its
controller differs from the pinned qualified builder only in metadata mode
and script selection. Those parent builder/vendor files match exact Git blobs
at `c268a71bce3047f8b700673fec9f5d86af13c516`.

## Complete retained comparisons

All counts use the same 441 captured original windows and unchanged matcher.
Raw-local means a complete individual window's bytes match; normalized means
the matcher's normalized body matches. Injective is the maximum one-to-one
assignment. None means whole-ELF identity or runtime equivalence.

| Build | Raw ELF bytes | Stripped bytes | Functions | Normalized | Raw-local | Injective |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| Historical enabled, incremental x2 and fresh | 879,664 | 744,496 | 455 | 403 | 62 | 402 |
| Historical gated, incremental | 881,168 | 745,080 | 460 | 403 | 61 | 401 |
| Historical empty event, incremental | 881,168 | 745,080 | 460 | 403 | 61 | 401 |
| Current runtime, fresh native | 865,504 | 732,136 | 449 | 428 | 75 | 427 |

The enabled historical raw SHA-256 is
`1b741df49b29237a31754fdf181483e93366c7b3e2b4020d997711dd0a406e74`;
its separately stripped SHA-256 is
`0464d549853847987b3db8218ef41898c303fbe360421659106e48fdbf188cb2`.
Every run's complete identities, match candidates and unmatched IDs are in
`report.json`. All raw ELFs differ from the captured original. No allocation
image, padding or binary patch is applied to produce the reported raw output.
Gated and empty outputs have different bytes despite equal counts.

The fresh historical build records **153 actual Cargo compiler commands**
(79 target compiles), among 163 wrapper observations. The current control
records **163** actual commands (85 target), among 176 observations. Auxiliary
compiler probes are excluded. The historical root sees 88 linker archives;
the current root sees 94, including 12 target-sysroot archives in each case.

Whole-ELF repetition does **not** imply identical dependency archives:
**50 of the 88 fresh historical archive identities differ** from the reused
cohort, despite identical archive basenames and final ELFs. Their observed
identities and exact difference list are retained. No explanation for those
archive differences is inferred from the ELF repetition.

The gate comparison adds only O0207 to the raw-local match set. It also changes
the full linked function cohort (455 versus 460) and text extent (674,096
versus 674,368 bytes); it is not a one-function change. The family comparison
changes framework, registry graph and necessary root API adaptations together.
It cannot isolate their causal contributions or exclude all historical recipes.
These older-source counts must not be combined with the newer 67-file,
429-window current-source historical-macro composition.

## Control for the existing Program ID recovery

The current baseline already modifies `Program::try_from` to check all IDs,
including the all-zero System ID. The unmodified historical runtime omits that
check for the all-zero ID. `program-id-control/` isolates this difference:

1. Copy the same historical framework and API-compatible root to a fixed,
   separate location. Only two framework paths in the root manifest change;
   the same lock is accepted offline without modification.
2. Build the unmodified historical framework in a fresh target directory.
3. Port exactly the current recovery to `lang/src/accounts/program.rs`,
   preserving line count; build twice more in fresh target directories.

The three builds each record 153 actual compiler commands (459 total).
The relocated baseline preserves exactly the parent's normalized and raw-local
match sets (403/62/402), but its raw ELF and linked function cohort differ:
460 functions and 674,384 text bytes versus 455 and 674,096 in the prior path
context. It is retained as the immediate comparison, without attributing that
layout difference to a specific compiler mechanism.

The single-condition recovery yields **404/62/403**, with 460 functions and
674,608 text bytes. Only O0062 is gained; no normalized or raw-local match is
lost, and no new raw-local match appears. The complete 881,408-byte raw ELF
repeats at SHA-256
`1a746a194866babfc88cb5ece258ef28eecda81fdf1dbc5d790646fcd50e2d2d`;
the separate 745,320-byte stripped ELF repeats at
`49c259aa19578a54a667a74a1e8ba304b1fd693ec372ef5c321f10e47cdf9f5c`.
Both remain different from the captured original. `report.json` records the
remaining 24 current-family differences and the dependency archive identities
that differ between the two repeated full builds.

This explains one confound in the historical/current comparison. It is a
reconstructed runtime patch, not an authenticated historical Anchor revision,
new source recovery, improvement over the current frontier or runtime test.
The offline checker binds both complete framework snapshots, the relocated root,
actual compiler arguments, source/dependency/tool observations, linker inputs,
all original-window comparisons and both repeated outputs.

## Adjacent duplicate-mutable validation revision

The next control holds the source directory, resolved package graph, compiler,
target libraries and linker recipe fixed across Anchor parent
`5d058305cd8a01c9854ea0efdef6e2afaa62cf5c` and its immediate child
[`d790f27fe240a5a557c93b117f0c4ddda4831ce5`](https://github.com/otter-sec/anchor/commit/d790f27fe240a5a557c93b117f0c4ddda4831ce5).
That upstream commit narrows duplicate-mutable validation to types that serialize
on exit, adds composite-account key collection and permits duplicates in remaining
accounts. The retained selected upstream trees authenticate 149 and 150 files.
Exactly five framework files change between builds. The root also restores its
existing empty `DuplicateMutableAccountKeys` implementation, which becomes required
when the trait is introduced. This measures that revision and its required API
adaptation together; it does not attribute the result to one edited line.

Both variants retain the recovered Program ID check, four-lifetime Context
signatures, historical CreateEvent and older 66-file root baseline. The upstream
lock is identical across revisions; the pruned root lock and all three Cargo
metadata outputs are byte-identical. The resolved graph has 187 registry packages
and 14 framework path packages. Compared with the earlier December framework
control, only proc-macro2 changes registry version (1.0.95 to 1.0.105). The new
archive and its complete checksum map are retained; all other archive proofs
come from the authenticated parent packet. Differences from the December result
are not attributed solely to this one February commit.

| Complete fresh build | Functions | Text bytes | Normalized | Raw-local | Injective |
| --- | ---: | ---: | ---: | ---: | ---: |
| Before duplicate-mutable relaxation | 455 | 674312 | 407 | 62 | 405 |
| After relaxation and required empty trait implementation | 451 | 663160 | 420 | 69 | 418 |
| Fresh after repeat | 451 | 663160 | 420 | 69 | 418 |

The 13 normalized gains are O0066, O0067, O0099, O0102, O0104, O0109, O0111,
O0120, O0122, O0129, O0131, O0134 and O0136. No normalized or raw-local match
is lost. Seven raw-local gains (O0045, O0331, O0338, O0362, O0363, O0366,
O0372) were already normalized matches in the before build; they are not seven
additional recovered function bodies. Eight differences remain against this
packet's older current-runtime control: O0106, O0116, O0124, O0127, O0141,
O0142, O0145 and O0199. There is no new normalized match beyond that control
or the newer project frontier.

After and repeat produce the same **865648-byte raw ELF**
(`15d3216e678aa7eb12898b5f7970016cd7264750bc19ca71b4bf35d159086ee8`)
and the same separately stripped **731880-byte ELF**
(`61eb8558fd5c4060ed4333d2cd16a81795d05d1dacc10b1bccde767ba579e51c`).
The before raw ELF is 878640 bytes
(`fd2927be0cde3440cad64adbd69225df471cb175373a662a980dfe512bc73beb`).
These are compiler outputs, not allocation images. All differ from the captured
original. Each of the three builds records 153 actual Cargo compiler commands,
including 79 target compilations; no target code is executed.

The checker replays the exact upstream blob sets, source transformations, unchanged
metadata graph, archive checksums, source/tool observations, actual compiler
records, retained linker objects, function maps and all 441 original windows.
Complete dependency archives are not retained, and their repeat identity
differences remain in `report.json` rather than being inferred from equal ELFs.
This is evidence for a source-generation mechanism under the recorded recipe;
it is not original framework attribution, a historical date constraint, current
checkpoint promotion or runtime qualification.

## Original Borsh derive and dependency controls

The immediate child of the duplicate-mutable revision,
[`2dd5c2473f7964e080f5fa3bc06aa445c07396db`](https://github.com/otter-sec/anchor/commit/2dd5c2473f7964e080f5fa3bc06aa445c07396db),
replaces Anchor's handwritten serialization derives with Borsh's original derives.
It changes two Rust files, the derive package manifest and the workspace lock.
The two selected upstream snapshots each contain 150 authenticated Git blobs.

Four fresh builds separate the source and dependency changes at one fixed source
path. All retain the recovered Program ID check, historical CreateEvent and
four-lifetime Context signatures. The baseline relocates the previous d790f27f
recipe and preserves exactly its normalized and raw-local match sets; its whole
bytes change, so it is not presented as a raw repetition of that earlier path.
The synthetic graph control then adopts only the successor manifest and lock,
leaving every framework Rust file unchanged. Finally, the after variant replaces
exactly the two upstream Rust files; root sources, pruned lock and raw Cargo
metadata are identical to the graph control.

| Fresh build | Functions | Text bytes | Normalized | Raw-local | Injective |
| --- | ---: | ---: | ---: | ---: | ---: |
| Relocated d790f27f baseline | 451 | 663160 | 420 | 69 | 418 |
| New dependency graph, old Rust | 449 | 662440 | 420 | 74 | 418 |
| Original Borsh derives | 449 | 662328 | 422 | 74 | 421 |
| Fresh derive repeat | 449 | 662328 | 422 | 74 | 421 |

The dependency-only control adds raw-local O0255, O0256, O0258, O0265 and
O0271, with no normalized change or loss. Those functions already matched after
normalization. The two Rust changes add normalized O0141 (MayhemStatus
deserialization) and O0142 (MayhemState serialization), with no lost normalized
or raw-local matches and no additional raw-local gain. This measures the two
upstream Rust files together, not individual generated statements or runtime
equivalence. It isolates their effect from the separately measured graph change
under this recorded recipe.

The lock-resolved registry cohort changes from 187 to 188 packages: five versions
are replaced and toml_parser is added. The six new archives (memchr,
proc-macro-crate, toml_datetime, toml_edit, toml_parser and winnow), their source
files and licenses are retained and authenticated against the upstream lock.
The initial build records 153 actual compiler commands; the next three record
154 each, **615 total**. All input and tool observations pass.

After and repeat produce the same **864360-byte raw ELF**
(`f7aa2b51ccb1d90ea608e73686d8654f9022aa9b5c0c560ce721add235641688`)
and separately stripped **730992-byte ELF**
(`e2dde5a7815cd60ecd8c2b87a7a00f4fabf676424cdd0dcbbe8340181a508ad3`).
Neither equals the captured original. Full dependency archive identity differences
between repeated builds remain explicit in `report.json`.

Six normalized differences remain against the older current-runtime control:
O0106, O0116, O0124, O0127, O0145 and O0199. Its only missing raw-local match
is O0199. No new normalized or raw-local match exceeds that control. This does
not identify the original framework, constrain the original build date, advance
the newer current-source checkpoint or supply runtime/security qualification.

## Offline replay and retained limits

From a checkout containing both sibling packets, with Python 3.11 or newer:

```sh
python -I -B research/mayhem-historical-root-compat/verify.py
python -I -B research/mayhem-historical-root-compat/test_verify.py
```

The verifier checks this packet and authenticates the entire parent before
importing its helpers. It replays the parent's historical-source/archive proof,
the exact compatibility edit, compiler log/record binding, current primary
source bytes against vendor/source maps, linker arguments, all linked text
sections and complete original-window comparisons. It runs no retained
executable and needs no network, compiler installation or blockchain access.
The tests copy just these two packets to a fresh temporary directory.
Retained third-party source keeps its upstream license. The current registry's
242 available license, notice, copying and author files are retained in
`current-registry/licenses.tar.gz` and checked against the package checksum maps;
package manifests carry license declarations where no such file was shipped.

Source, dependency, tool and SDK before/after observations come from the
retained controllers. The first incremental root observed only its three
direct externs, source, framework and tools. Later incremental roots additionally
observed the parent build's host/target DLL, rlib and rmeta files; their sysroot
archives are separately bound to the parent's component pins, not a new
incremental before/after sysroot observation. Link archive hashes are post-run
observations; this packet does not retain every compiled dependency archive.
Fresh builds use initially absent target directories and check their inputs
before and after compilation. The current controller records environment
overrides; the historical controller records its complete constructed environment.

The initial full-build controller was launched from the wrong nesting level
and failed before compilation with `FileNotFoundError`. Its exact controller
and log remain under `failed-controller/`; the root-level controller then
completed `full-compatible-build-02`. Parent failed compiler/resolution controls
are retained through the pinned parent. Local verifier-development failures
included double gzip packaging and an incorrect assumption of archive equality;
both were corrected against the original retained files.

There were **zero target executions**. This adds no fresh runtime differential
coverage, security assurance, deployed-source attribution or completeness claim.
