# Current Mayhem sweep-rate composition

The ordinary Rust selection `if native == false { field_34 } else { field_10 }`
reduces O0073's current 920-byte candidate to the original **912-byte** extent.
It preserves a register-sensitive 22-block graph and 11 typed data references,
with **95/114 same-position slots equal**. Nineteen slots still differ:
**this is partial recovery, with no new complete function match**.

The proposal also composes the already merged [sweep failure recovery](../mayhem-sweep-failure-recovery/README.md)
with the [current two-quote parent](../mayhem-quotes-current-recovery-20261027/README.md).
All **432/441 normalized matches, 100 raw-local matches, 4,314 positive direct-call
observations, 456 matching Source observations and complete observed Source
profiles** survive. Nine original functions and whole-ELF identity remain open.
The selected checkpoint is unchanged.

## Provenance and overlap

Work started from upstream `327f60999f197cf6ff2104d4ff66a4d1b4eb6039` after
checking open PR #290, which concerned fresh Linux builds and LegacyBuy ownership.
Before publication the branch was fast-forwarded to
`2ad487d013c8a620a4649d2cd49681ee4e806e4e`; no PRs remained open at that check.
The source parent used here is unchanged between those commits.

During this work, [PR #292](https://github.com/lalalune/pumpfun-source/pull/292)
landed fourteen Linux sweep-helper controls. Its interval-load and nested-guard
experiments overlap some families retained here; they are credited as parallel
work, not claimed as new discoveries. Its 432/84 Linux baseline differs from this
packet's reproduced 432/100 baseline. The new deliverable here is the ordinary
Rust helper form composed with the diagnostic fixes and current qualified source,
with complete validation of that composition.

The earlier [branch-layout packet](../mayhem-sweep-branch-layout/README.md)
already established the 22-block / 11-reference correspondence using an unstable
`unlikely(native)` intrinsic on an older source cohort. Here an ordinary boolean
comparison produces that bounded correspondence with the current source, without
an intrinsic or feature gate. The graph method is reused and credited, not new.
Likewise the 58 diagnostic fixes come from [PR #276](https://github.com/lalalune/pumpfun-source/pull/276).

`source.py` reconstructs the exact 67-file parent from the initializer archive,
ownership proposal, current Sell quote and current Buy quote overrides. It checks
the complete source hash map against the two-quote packet. It then applies #276's
source transformation and changes one timestamp-selection expression. Only
`src/lib.rs` and `src/instructions/fee_recipients.rs` change; the other 65 inputs
are byte-identical. The complete source archive, readable overrides and reversible
patch are included. No binary rewriting or artificial padding is used.

## Build and static evidence

Three new root compilations retain commands, tool and source hashes, logs,
linker inputs, maps, symbol ELFs and stripped ELFs. The unchanged control
reproduces the current parent's complete outputs exactly. Proposal and repeat
produce byte-identical complete outputs:

| Artifact | Bytes | SHA-256 |
| --- | ---: | --- |
| Control stripped ELF | 755,376 | `73dff97e65535ce7d2552ba6f29f94fe0e08ebd414a51871a81c6cba2d7d6168` |
| Proposal stripped ELF | 757,408 | `b9ee32ace909496a77f852f1ec2989c6a0c7513e782e9c3fca3d8a7e5ff5165d` |
| Proposal symbol ELF | — | `a341f799f13cce90d05b722bb792210b1f2044700d2065f45d57a26d58613d6e` |

The recorded environment is the previously verified official macOS ARM v1.54
compiler/tools with the 26 official Linux v1.54 target-library files and the
existing ordered linker recipe. The control began with a new target directory.
The source experiments and final two root compilations reused its dependency
outputs. These are not three independent empty-cache builds, and do not identify
the original historical compiler environment.

`analysis.py` follows the complete matching trader instruction wrapper into its
actual handler and unique helper call. It rechecks typed literals, error
discriminants, formatting vtables, Source descriptors and the four-frame overflow
panic tail ending in the `abort` import. Its graph comparison maps all branch
edges explicitly and retains registers and complete immediate-callee shapes.
Only this separate graph comparison removes local branch displacement bytes;
the ordinary full-window matcher is unchanged and still rejects O0073.

The composition preserves 443 candidate function extents. Removed extent sizes
are 920, 4,408, 4,712 and 7,272 bytes; added sizes are 912, 8,864 and 9,352 bytes.
Inlined sweep diagnostic helpers enlarge the two sweep handlers; neither matches
its original full body. The stripped image grows by 2,032 bytes overall.
Both quote bodies and typed data, the 120-slot initializer, BuyV2's recovered
sizing failure and the parent's 13,784-byte LegacyBuy / 13,008-byte LegacySell
shapes are checked against the actual candidate. This does not establish
recursive call-graph, indirect-call or whole-program equivalence.

## Compiler controls

`controls.tar.xz` retains 90 successful root compiler attempts and eight failed
attempts, each with actual changed source inputs, commands, launch/result records
and compiler logs. Successful attempts also include full symbol/stripped ELFs
and helper measurements. The archive index binds every member. The saved
controller snapshots document the source generators and their corrections.

Controls cover boolean selection, load/store orientation, closures, early
returns, nested guards, optional/result forms, inline/cold/optimization hints,
signed timestamp fields and wider native arguments. The eight failed attempts
are real E0308 errors from an overbroad argument-type replacement; corrected
scoped replacements have separate successful records. One additional preparation
assertion is retained as a note, not counted as a compiler attempt.

Every helper measurement is recomputed from its saved ELF. None is a complete
helper match. Same-position and heuristic aligned-slot counts are separate; the
90 controls have not each received the final candidate's full frontier/runtime
qualification. This is a finite negative search, not proof that a source family
cannot match. Overlapping controls from #292 should be consulted before further
experimentation.

## Fresh execution and verification

The exact proposal ELF was executed locally with solders 0.27.1/LiteSVM:

| Corpus | Cases | Signed records | Result |
| --- | ---: | ---: | --- |
| Three-way sweep corpus | 692 | 2,076 | All functional fields and non-compute logs agree with original |
| Three-way rate boundaries | 150 | 450 | All functional fields and non-compute logs agree with original |
| Fourteen trade suites | 6,636 | 13,272 | All functional fields and non-compute logs agree with original |

The control differs in 58 sweep diagnostics (32 account-count and 26 rent
underflow cases); the composed proposal repairs all of them. Rate fixtures cover
native/stable selection, signed interval and timestamp boundaries, overflow,
zero limits and malformed recipients. These are 15,798 signed execution records,
not 15,798 unique test inputs. Full receipts, logs, commands and summaries are
retained. Initializer preservation is static here; it was not freshly VM-replayed.

The portable verifier recomputes source/build/static/control evidence, verifies
transaction signatures and program identities, compares input/output accounts,
errors, events, inner instructions and return data, and compares logs after
removing only compute-consumption lines. Its 18 mutation controls reject altered
live callers, helper instructions/branches/callees, typed data, panic text,
missing cases, changed outcomes and unauthenticated inputs. Assertions must be
enabled; optimized Python is rejected explicitly.

From the repository root, using Python 3.12 and `requirements.txt`:

```sh
python -B research/mayhem-sweep-rate-current-recovery/verify.py
python -B research/mayhem-sweep-rate-current-recovery/test_scope.py
```

`verify.py --skip-runtime` needs only the standard library. Add
`--materialize /path/to/new-source` to reconstruct the checked 67-file source;
the destination must not exist. `build.py --help` lists the required paths for
the prepared SDK, locked offline Cargo home, output and target directories,
strip tool and optional linker script. Use the checked
`research/mayhem-trade-origins-validator/config/ordered.ld` script for this recipe.
The saved `launch.json` files record the exact executed commands; local absolute
paths are provenance, not portable installation instructions.

For fresh execution, use the unchanged
`research/mayhem-sweep-failure-recovery/replay_sweeps.py` runner with `--control`,
`--candidate`, `--output`, and its `replay_trades.py` runner with `--candidate`
and `--output`. These execute only local fixtures against captured programs.
The normal verifier reads retained evidence and does not execute target code
or invoke the compiler. All packet files and external verification inputs are
bound by exact manifests.
