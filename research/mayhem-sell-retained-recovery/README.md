# Complete AMM Sell quote-helper recovery

This Rust reconstruction closes the complete **1,120-byte O0093 helper at
186552**, raising the current-source native inventory from **430 to 431 of 441
normalized windows**. All **84 native raw-local matches** and **4,363 prior
positive immediate-call observations** survive; the new body contributes ten
same-offset callee observations, giving 4,373. Ten windows remain unmatched.
Complete Mayhem ELF/capture equality remains false. The other three core
programs are not freshly built or compared; whole core identity remains **0/4**.

The [current initializer parent](../mayhem-initializer-current-recovery-20261027/README.md)
owns the preceding initializer recovery. Its 100 qualified raw-local count and
the historical-macro recipe's 141 are separate measurements, not additions to
this native recipe's 84. Existing selected checkpoints and global ledgers are
unchanged by this packet.

## Source and actual machine evidence

Only `src/state.rs` and the internal call argument in
`src/instructions/sell_pump_swap.rs` differ from the exact 67-input parent.
The helper accepts the existing instruction's `u16` basis points, uses SPL's
`native_mint::id()`, and combines checked subtraction/division in a fallible
Result closure. It first calls the existing retained-basis-points helper for its
bounds rejection, then calculates the retained value after cap selection.
The compiler eliminates the redundant later bounds check. This restores the
original guard, load, register and arithmetic order without assembly, padding,
output edits or additional comparison masks.

A separately compiled control keeps all the other preparations but computes the
retained value early. It returns to 430 matched windows with sixteen different
eight-byte instruction slots. The deferred form matches all **140 slots / 126
decoded instructions**. This is a conditional source-cause experiment, not proof
that the original private Rust had this spelling or that every alternative
source form has been excluded.

The checker binds all ten actual local CALL sites to complete counterpart callee
shapes in order, the actual incoming SellPumpSwap call, and ten ordered typed
data references. These comprise three 43-byte Result-unwrap messages, three
32-byte Debug vtables with their immediate formatter shapes, and four Source
records with the counted 37-byte filename, including its NUL, at
`490:14`, `424:43`, `491:34` and `321:26`. The business handler remains unmatched.
Its incoming CALL is at original offset 1,944 and candidate offset 2,904; these
distinct positions are bound without treating the whole caller as equal.
These immediate references do not prove recursive, indirect or whole-program
semantic closure.

Physical source line counts, the entire root `lib.rs`, program namespace and
generated program references remain unchanged. The parent archive, complete
input maps and exact changed-input captures resolve all 67 files for every
build. No older whole-source snapshot replaces the current initializer or BuyV2
gains.

## Builds

Four actual sequential native builds retain the fresh current parent, prepared
early-value negative control, proposal and repeat. Both complete proposal outputs
repeat raw-byte exactly:

- Candidate, 755,864 bytes: `1f944954160df6b0ab60f15180cdaa451167f16f950eeb65a098a329fb32a3bf`
- Symbols: `2d1b8f9957178393f00cf64ba2e297b34686516f7c3f0a8f660a57b2924f2bc8`

Actual source maps, commands, environment overrides, six executable hashes,
compiler logs and eight compiled ELFs are retained. Four additional real strip
replays reproduce their respective candidate bytes. Official Linux
platform-tools v1.54, the canonical `sbpf-solana-solana` target and recorded path
remappings are used with existing dependency caches. This is not a clean
all-dependency build, a pin of every host library or historical compiler proof.
The archive and 26-target-library receipts and unchanged-byte host-linker mode
repair are retained. Stripping uses native v1.54, not the earlier mixed recipe's
v1.52. Originals are read-only comparison inputs, never compiler/linker inputs.

## Runtime evidence and its boundaries

Fresh execution of the **431-window proposal above** passes all **1,239 case
pairs** across native, legacy-token and Token-2022 AMM Sell suites. The unchanged
independent checkers verify all **2,478 signed transaction records**, successful
state/event/CPI behavior and rejection rollback under their recorded predicates.
Complete original/candidate receipts, raw logs, commands and independent outputs
are retained in `runtime/union.tar.xz`. No raw-log, compute-unit or exhaustive
behavioral equality is asserted.

The earlier minimal Sell-only candidate `af987b67…`, before the independently
published initializer was composed, separately passed **6,636 pairs / 13,272
verified signed records** across fourteen suites. Its exact source/build
snapshot and complete receipt archive are preserved as earlier evidence. The
snapshot's original draft marker predates completed runtime checks. Its receipts
are **not executions of the current 431-window candidate** and are not relabeled
or added as new unique scenarios. The broader exploratory handler variant is
excluded from this packet's acceptance claims.

Frozen script sources are retained in `runtime/harness.tar.xz`. This is a hash
inventory of the 220 available current scripts, not a claim that all were run.
Actual producer/checker command records identify the executed subset. Existing
scripts, workflows, captures and selections are not changed.

## Offline checks

```sh
python3 -B research/mayhem-sell-retained-recovery/verify.py
python3 -B research/mayhem-sell-retained-recovery/test_verify.py
# Optional explicit replay of the same signatures; needs an existing environment:
python3 -B research/mayhem-sell-retained-recovery/replay_saved_signatures.py --python /path/to/python-with-solders-0.27.1
```

The verifier recomputes the complete inventory, no-loss comparison, literal
whole-file failures, same-site callees, typed references, source/build bindings,
archive contents and saved runtime-check bindings. It reads four exact pinned
root inputs listed in `scope.json`: the ELF layout reader, captured original,
earlier static ELF reader and original window inventory. Missing inputs fail;
there is no compiler, VM, Git or network fallback. A minimal isolated checkout
needs only this packet and those four files.

The standalone runtime portion rehashes all saved records and binds the actual
independent-check outputs; it does **not** implement a second signature verifier.
The original frozen independent verifiers performed the reported signature
checks during validation and repeated all 2,478 checks in an isolated frozen
harness tree with Solders 0.27.1. These are the same records, not additional
cases. That isolated tree uses the exact recorded case/input hashes from
`executed-inputs.tar.xz`; an initial attempt without the recorded case vector
failed before verification, and the exact hashed input was restored without a
waiver. Their sources, commands and receipts remain available for explicit replay
with their Python dependencies.

Mutation tests exercise real scalar, register, stack, branch, CALL-target,
import-name and Source-record changes. A relocated-pointer boundary deliberately
remains opaque until the separate typed-data check, avoiding a false recursive
identity claim. Root-source changes, unlisted files, symlinks, special files and
optimized Python are rejected. Standard-library record checks and minimal
isolated replay are separate from runtime VM and signature execution.
