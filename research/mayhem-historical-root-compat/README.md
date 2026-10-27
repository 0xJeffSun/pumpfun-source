# Mayhem historical framework: root API compatibility

The historical framework from [PR269](../mayhem-historical-framework/README.md)
now compiles a complete research root with three API compatibility edits in two
files. A fresh dependency/root build exactly repeats the raw and separately
stripped ELFs from two incremental root builds. It matches fewer captured
original windows than a fresh current-runtime control: **403 versus 428**
normalized matches, with **25 losses and no gains**. This bounded result does
not support replacing the current reconstruction with this historical graph.

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

There are no additional handler, arithmetic, CPI-constructor or framework Rust
edits. The archived CPI constructor already accepts `Pubkey`; its API must be
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
