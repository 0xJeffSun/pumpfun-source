# Legacy Sell signer-seed construction order

Constructing the signer seeds directly in the Legacy Sell CPI expression
recovers the original's **complete 176-byte straight-line seed constructor**.
The original reads the bump and constructs the seed descriptors after the fourteen
CPI account copies; the current parent constructs them before those copies.
The proposal places both operations later and reproduces the original stack
slots, descriptor lengths, registers and immediate copy-callee shape.

This is **partial recovery**. O0082 remains unmatched: original 12,992 bytes,
parent 13,008, proposal 12,952. No new complete function or whole-ELF identity is
claimed. All **432/441 normalized / 100 raw-local** matches survive; nine bodies
remain. The selected program/checkpoint is unchanged.

## Source and causal controls

Only two lines in `src/instructions/pump_interface.rs` change among the exact
67-file [current two-quote parent](../mayhem-quotes-current-recovery-20261027/README.md).
The named bump/seed locals are replaced with the ordinary expression
`&[&[b"sol-vault", &[ctx.bumps.sol_vault]]]` inside `CpiContext::new_with_signer`.
The lifetime of these temporaries extends through the consuming CPI expression.
No instructions are patched, no padding is added and no matcher is relaxed.
Line counts and the CPI error origin at `pump_interface.rs:436` stay fixed.

The complete matching Sell instruction wrapper identifies the actual handler;
the reader does not accept a disconnected lookalike. The 176-byte comparison
covers original offsets 6,304–6,480 and proposal offsets 6,152–6,328. It has no
branches or indirect calls. Its one data reference selects the counted
nine-byte `sol-vault` seed and its direct copy call has the original complete
normalized callee shape. The immediately preceding bump byte-load selects
field offset `0x22`. The ordinary whole-window matcher is used unchanged.

Four retained compiler controls isolate the seed/bump lifetime combination:

| Form | Bump load | Seed reference | Increment patterns before seed | Exact 176-byte constructor |
| --- | ---: | ---: | ---: | --- |
| Named bump and named seed list (parent) | 1,968 | 2,080 | 0 | No |
| Inline bump, named seed list | 1,968 | 2,000 | 0 | No |
| Named bump, inline seed list | 1,968 | 5,856 | 28 | No |
| Inline bump and seed list (proposal) | 6,144 | 6,176 | 28 | Yes |
| Original | 6,296 | 6,328 | 28 | Yes |

Offsets are relative to the actual handler. The 28 witnessed load/add-one
patterns correspond to the two reference counters in each of the fourteen
explicit AccountInfo copies. This is a bounded instruction/source observation,
not a proof of every borrow, overflow path or transitive callee.

All 50 immediate callee shapes remain equal as a multiset and all seven typed
Source records agree with the original. Every other candidate function extent
(446) retains its complete normalized body. The existing 4,314 positive direct
call observations, 456 positive Source observations and complete Source profiles
are retained. Full call order is still unequal: its LCS decreases from 45/50 to
44/50. Same-position slots improve from 12 to 47; heuristic sequence-aligned
slots increase from 566 to 925 out of 1,624 original slots. Those heuristic
scores are diagnostics, not recovered-window counts or equivalence proofs.

`controls.tar.xz` contains 39 successful compiler attempts (including baseline)
and four actual failures, full artifacts and per-control source/command/log
records. The negative search also covers context ownership, price-result
scopes, retained arithmetic and account borrowing. None matches the full body.
The four failures are one E0716 temporary-lifetime error, two E0382 partial-move
errors, and one E0425 preparation error that reached the compiler. Corrected
forms have separate records. No failed compilation is relabeled successful.
Only the selected proposal gets the final static/runtime qualification.

## Builds and execution

A fresh target-directory control reproduces both complete current-parent
artifacts exactly. Two further root compilations reproduce the proposal's full
outputs byte-for-byte:

- Stripped: `b3271dbe2fd6f9a8c8eaab1d7530193cbbf3e4e0f2b3b0640b70c526134d1452`, 755,320 bytes.
- Symbols: `62348ccef5fb7fe0d79213fc7aaf62aacc46ca1ffaf236d72336317de53a3a77`.

The recipe uses the previously verified macOS ARM v1.54 tools, 26 official
Linux v1.54 target-library files and unchanged ordered linker script. Controls
and proposal repetitions reuse dependency outputs. This is not a claim of
three clean dependency builds or the original historical compiler environment.
Commands, complete inputs, tool hashes, linker records/maps and logs are retained.
Standard `llvm-objcopy --strip-all` is the only post-link transformation.

Fresh local execution runs the frozen **396-case Legacy Sell corpus on both
control and proposal**: 792 original/candidate pairs and 1,584 signed execution
records. Each has 134 successful and 262 rejected original cases. All effects,
errors, events, inner instructions, return data and non-compute log lines agree.
The original records agree across both runs. No other handler corpus or new
unique-scenario coverage is claimed. These fixtures do not establish execution
of the native CPI-error conversion callback.

The unchanged independent Sell checker verifies signatures, authority/PDA
bindings, successful quote/CPI arguments, complete events/state and failure
rollback. The packet additionally checks exact case vectors, executed Mayhem
program hashes before/after, input/output accounts and strict non-compute logs.
Its verifier reruns the independent read-only checker on the losslessly retained
receipts. Fifteen actual instruction/data/receipt mutations are rejected.

## Reproduce and scope

```sh
python -B research/mayhem-legacy-sell-seed-lifetime/verify.py
python -B research/mayhem-legacy-sell-seed-lifetime/test_scope.py
```

Use Python 3.12 with repository `requirements.txt`. Verification runs no compiler,
VM, RPC or chain action. `--skip-runtime` needs only the standard library.
Optimized Python is rejected. `--materialize /path/to/new-source` reconstructs
all 67 checked source inputs and refuses an existing destination.

For a new compile, `build.py --help` lists the prepared SDK, offline Cargo home,
new output, target and strip paths. Use
`research/mayhem-trade-origins-validator/config/ordered.ld` as `--linker-script`.
The recorded launch paths describe the executed local build, not a portable SDK
installation. For a new runtime replay, use the unchanged
`scripts/mayhem_sell_differential.py --candidate ... --output ...` followed by
`scripts/verify_mayhem_sell.py --candidate ... --receipts ... --output ...`.
`replay.py` retains the exact local two-run controller for provenance.

Work is based on upstream `b855ede024ac3bac603405db1d874ee58e651b38`.
Open PRs were checked before and after investigation. Mayhem PRs #294–#298,
#300, #311, #313 and #324 concern sweep construction, framework/allocator or
Legacy Buy context, quote formatting, initializer form and BuyV2. This packet
is independent of those proposals and leaves their source regions untouched.
Only this new research directory and its dedicated CI workflow are added; no
shared ledger or workflow is edited. `overlap.json` retains the checked PR list.
