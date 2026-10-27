# Mayhem sweep failure-path recovery

Two source-file changes repair **58 diagnostic differences** in the 692-case
sweep corpus: 32 account-count failures and 26 native rent-underflow failures.
The exact compiled candidate preserves **430/441 normalized windows and all
141 raw-local windows** of the latest historical-macro initializer composition.
**No new complete function match is claimed. Eleven original windows / 110,328
text bytes remain unmatched.** Whole-ELF identity remains false.

This work was rebased onto upstream `004b3c02e` after inspecting other PRs.
The newly merged initializer recovery belongs to upstream. The separate Legacy
Buy ownership control, quote controls, historical framework experiment and
initializer machine-path research were inspected for overlap. This patch changes
the sweep source only; it does not claim their work. The 141 raw matches belong
to the separately qualified historical-macro context, not the current-framework
100-raw selected row. Selected program sources and checkpoint artifacts are not
promoted by this research packet.

## Recovered behavior

The original trader and admin handlers reject a remaining-account count other
than sixteen using `require!`, not `require_eq!`. The latter adds Left/Right log
lines that the original does not emit. The recovered checks retain error 6016
and restore `fee_recipients.rs:431` and `:399` respectively.

Native balance minus rent remains a real checked subtraction. Inline helpers
restore the original panic locations `fee_recipients.rs:284:17` (trader) and
`:358:37` (admin). The explicit SweepEvent discriminator is unchanged; moving
its declaration restores the original event Source at `fee_recipients.rs:13:1`.
The shared sweep body is inlined so each handler contains its own failure path.
No output bytes, synthetic diagnostic strings, normalization masks or branch
offsets are patched. These source forms reproduce observed behavior; they do
not authenticate the original Rust spelling.

[The source patch](source.patch) changes exactly `src/lib.rs` and
`src/instructions/fee_recipients.rs` out of 67 inputs. The other 65 inputs are
byte-identical to the historical initializer parent. The archive is complete,
with readable changed files under `overrides/`.

## Native build and static evidence

A fresh native host build reconstructs the authenticated historical program
macro. Its 121 historical files, locked manifest, ten supplemental crate
archives, command and logs are bound by the verifier. The program recipe uses
the pinned macOS v1.54 compiler and 26 Linux target-library files, and the
existing trade/validator linker script. This reproduces both complete upstream
historical-initializer artifacts exactly:

- Parent candidate: `9e0e32a9395b5ab6eebd239fd7d0fbc04c4c1b0981a83857f0cbeef2352ec869`
- Parent symbols: `a6a4e593a08f50aae3c03dae02d1afc1ed32f24cc43f430e43b161422c43d7bb`
- Recovered candidate: `d20402416f92b30c7ec704be17ee6699ec50ec48e2d0a517c64d097a0b865d47`
- Recovered symbols: `89e5dbb6d607063a1be80977c2f3bba5e6f943b41118ec3e4cc2f15ab2927fc6`

The recovered candidate and independent root recompile repeat byte for byte.
The three final program builds reuse a prepared dependency target; these are
not three empty-cache builds. The complete stripped candidate grows from
755,144 to 757,184 bytes. Commands, wrappers, linker maps, stdout/stderr, tool
hashes and before/after checks are retained. Host compiler provenance remains
distinct from original toolchain attribution.

Static checks bind live sweep handlers through their complete matching dispatch
wrappers, then inspect the actual Anchor error-origin operands, underflow branch,
Source descriptors and four-frame branch-free panic tail ending in abort. The
subtraction panic message and immediate callee shapes match the original.
These are bounded failure-path observations, not whole-handler equivalence.
The admin body is 8,864 versus 8,008 original bytes; trader is 9,352 versus 8,400.
All 444 other candidate function extents preserve their normalized shapes.
The former 7,272-byte shared body and two wrappers are replaced by two inlined
handlers.

The original-window audit preserves 4,295 positive immediate-call observations,
448 positive Source observations, every observed Source profile and injective
capacity for all 430 matched windows. The complete initializer, typed BuyV2
sizing failure, shared validator and three earlier trade-origin profiles are
independently rechecked. These are local structural observations, not a proof
of transitive program equivalence.

## Fresh execution evidence

The exact final artifact was replayed locally against the captured original:

| Corpus | Cases | Signed records | Result |
| --- | ---: | ---: | --- |
| Trader/admin sweeps, original/control/recovered | 692 | 2,076 | 58 control diagnostic differences repaired |
| Rate-limit boundaries and malformed inputs, three sides | 150 | 450 | Zero differences |
| Fourteen trade suites, original/recovered | 6,636 | 13,272 | Zero differences |

Errors, account state, events, inner instructions, return data and all
non-compute log lines agree. Only complete compute-consumption lines are
excluded from log comparison. The rate corpus overlaps the larger sweep corpus;
these totals are not disjoint unique coverage. Initialization was not freshly
replayed here; its complete normalized body and typed data are preserved.

Sweep receipts retain each signed transaction and every message-account prestate
and poststate. Verification authenticates signatures and the executable program
hashes, compares transaction bytes and non-program account states across all
three sides, and checks instruction discriminators, quote selection, global
configuration bytes and rate-limit account inputs. Clock values come from the
pinned fixture configuration; signatures do not authenticate VM clock state.
Trade verification uses the unchanged corpus definitions and retained harness
hashes. No chain transaction or deployment occurred.

## Reproduce and verify

Python 3.12 with the repository's `solders` dependency suffices for read-only
verification. No compiler, VM, Git or network fallback occurs:

```sh
python -B research/mayhem-sweep-failure-recovery/verify.py
python -B research/mayhem-sweep-failure-recovery/test_scope.py
python -B research/mayhem-sweep-failure-recovery/verify.py --materialize /tmp/mayhem-sweep-source
```

The 20 negative checks corrupt live wrapper targets, panic Source lines,
underflow opcodes, panic callees/messages, error-origin operands, case coverage,
logs, return data, transaction signatures, executable hashes and actual global
or rate account inputs. Each must be rejected. CI runs both verification commands.

For a new build, prepare the pinned SDK, Cargo cache and historical macro, then
use `build.py --source ... --sdk ... --cargo-home ... --target ... --output ...
--strip ... --historical-macro ... --linker-script
research/mayhem-trade-origins-validator/config/ordered.ld`. The retained launch
records provide exact invocations and all tool/input hashes. `host/controller.py.txt`
is the executed local preparation/build script; its historical working paths
must be adapted deliberately. `replay_sweeps.py` and `replay_trades.py` accept the
new binary paths and a new output directory. Verification never rebuilds missing
evidence or treats missing receipts as a pass.
