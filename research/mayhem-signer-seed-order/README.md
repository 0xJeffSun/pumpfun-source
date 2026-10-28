# Legacy Sell signer-seed evaluation order

This packet preserves historical 432-window source controls. The later
[qualified436 composition](../mayhem-current436-composition-20261027/README.md)
closes both Legacy bodies under normalization; its artifact and runtime
qualification are separate. The [price-profile pass traces](composition/price-profile/README.md)
explain a compiler difference and an exact candidate-output collision within
these older controls, without changing the current checkpoint.

The historical qualified Legacy Sell source reads `ctx.bumps.sol_vault` before
constructing the Pump CPI account value. The original has a Context-associated
byte load at relative offset **6,296**, among the later CPI preparation
instructions. The current qualified and native baseline read it at **1,968**.
Ordinary Rust controls that evaluate the seed expression after the account
value move that load to **6,144** or **6,160**. This bounds a source-order gap;
it does **not** recover the complete handler or identify original source text.

The verifier retains the exact load bytes and a syntactic register/spill chain
back to argument one. This chain follows instruction file order; it is not a
CFG path, alias, dominance or arbitrary-state proof. A deliberately narrow
load/increment/store signature finds 19 preceding reference-count-like patterns
in the original, zero in the early controls and 18 in the inline late control.
These are diagnostic signatures, not an exhaustive count of clones.

## Paired source controls

All controls start with the exact **67 current qualified inputs** at
`0cc61d6363719fd6d60634ec657446c72d20d550`, composed from the published initializer,
ownership and quote packets. Only the Legacy Sell region of
`src/instructions/pump_interface.rs` changes. The CPI error macro's line and
column, all other modules and the dependency graph are retained.

[PR #327](https://github.com/lalalune/pumpfun-source/pull/327) and
[PR #330](https://github.com/lalalune/pumpfun-source/pull/330) appeared during
validation. Their checked arithmetic and typed-price composition is separate:
five PR #327 source forms at `a600dd2617cf9d062b0a602204fb8419e9e8c108` and
PR #330 at `ea2b4e13db1c4e3d81836a4bdacbf312697d74d1` retain the exact parent's
Legacy Sell CPI region, including its early seed declaration. The six exact
Git blobs are retained and this comparison is replayed. These signer controls
were initially separate from those proposals. A subsequent
[composition experiment](composition/README.md) retains eight new root builds
from merged PR #330: all three late-seed forms reduce ordered Legacy Sell
callee correspondence from 50/51 to 45/51, despite higher instruction overlap
in the inline case. Paired eager-price controls reproduce their complete
parent outputs. These negative results inherit none of the upstream runtime
evidence and add no complete window. All 14 acquired qualified inputs/artifacts/readers remain unchanged
on reviewed main `cbcdfc9f16500674bdf35e1d8d43ed4e2b9c9672`.

A subsequent [LLVM trace](composition/placement/README.md) locates that
composition's callee-layout divergence in machine block placement. Both
variants have identical ordered callees before the pass and different
sequences afterward, each matching its final executable. This is a layout
diagnostic, not a behavioral regression or complete source recovery.

| Source form | Complete handler bytes | Bump-load offset | Diagnostic aligned slots |
| --- | ---: | ---: | ---: |
| Original | 12,992 | 6,296 | — |
| Current native baseline | 13,008 | 1,968 | 566 |
| Named accounts/context, early seeds | 12,824 | 1,968 | 521 |
| Named accounts/context, late seeds | 12,736 | 6,160 | 388 |
| Inline late seeds, existing constructor chain | 12,952 | 6,144 | 925 |
| Inline late seeds, context struct literal | 12,888 | 6,144 | 752 |

Alignment is `difflib.SequenceMatcher` overlap of the existing normalized
8-byte slots, with `autojunk=False`. It neither counts recovered instructions
nor establishes a function match. Every complete handler comparison remains
false. The inline form repeats both complete compiler outputs; it is retained
as a reproducible partial control, not selected as the new program source.

All seven saved successful builds retain the same **432 normalized / 77
native raw-local / 431 injective** inventory and all **4,314** positive
immediate-call observations on matched windows. The handler's 50 internal
immediate-callee shapes have the original multiset, but their order remains
different; its one external call is counted separately. No new complete
normalized or raw-local match is claimed. The separate qualified artifact is
**432 / 100 / 431**, and its normalized Legacy Sell body equals this native
baseline's. Its additional raw matches are not transferred to this context.

## Build provenance and limits

The native baseline is a fresh dependency/root build with **163 actual compiler
commands**, including 85 target commands. It uses the pinned Windows v1.54
compiler, supplied Linux target libraries, locked offline registry sources,
the inherited metadata/path mappings and whole-section linker order. Current
Cargo's stake-interface profile changes five incoming metadata identities;
the saved build plan explicitly rebinds those to the existing target metadata
column. The compiler wrapper still requires an exact input metadata/name pair.
This is an experimental native recipe, not the qualified macOS root recipe or
proof of the historical build environment.

The baseline root repeat and five source-control/repeat builds reuse that
baseline's dependencies in isolated root directories. They are not seven
fresh dependency builds. Both symbols and standard `llvm-objcopy --strip-all`
outputs are retained. The verifier separately checks their allocated sections;
no padded allocation image is substituted for compiler output. Original bytes
are comparison inputs, never linker or compiler inputs.

The public `rebuild.py` entry point was then run in another new directory. Its
second fresh baseline dependency/root build executes another 163 compiler
commands and reproduces both complete baseline outputs. Its separate logs,
argument records and comparison are retained under `rebuild-validation/`;
identical ELF bytes reuse the baseline artifact files. Thus there are seven
retained artifact pairs plus this eighth successful validation build, of which
two builds start with fresh dependencies. Complete dependency-archive equality
is not claimed.

Full commands, source maps, tool/dependency hash records, linker maps, compiler
logs and failed controls are retained. Failures include an initially stale
metadata binding, missing Cargo environment on a direct launch, and a temporary
signer slice that did not outlive a named context. A longer-lived signer binding
fixes that compile error. Two preparation-script failures are retained too.

There is **no target execution or fresh runtime evidence**. Existing upstream
receipts do not apply to these controls. Full data/Source, indirect and
transitive call closure are not established. Moving a read across Rc/allocation
operations is explicit; arbitrary alias, Rc-overflow and allocation-failure
equivalence is not claimed. Whole original ELF identity remains false.

## Replay and optional rebuild

From any directory, standard Python can replay the self-contained packet:

```sh
python -I -B research/mayhem-signer-seed-order/verify.py
python -I -B research/mayhem-signer-seed-order/test_verify.py
```

These commands execute neither a compiler nor a VM and need no Git or network.
`rebuild.py` is a separate, explicit Windows compilation entry point. Supply
the SDK, target libraries, vendor tree, MSVC and Windows SDK whose hashes are
recorded under `controller/`; the tool neither downloads nor installs them.

```powershell
python -I -B research/mayhem-signer-seed-order/rebuild.py `
  --sdk C:/owned/sdk-v154 --target-sysroot C:/owned/linux-sysroot/rust `
  --vendor C:/owned/vendor --msvc C:/owned/MSVC/14.44.35207 `
  --windows-sdk 'C:/Program Files (x86)/Windows Kits/10' `
  --variant baseline --output C:/owned/new-output
```

The output directory must be new. It receives a private controller/source copy;
the evidence packet stays unchanged. Complete output hashes are compared to
the selected saved control. Other listed variants use the same entry point,
but the saved exploratory controls were incremental roots as described above.
