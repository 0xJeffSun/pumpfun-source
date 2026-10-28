# O0073 `FeeRecipient::validate_sweep` — IR proof of the block layout

Window O0073 (`FeeRecipient14validate_sweep`, original start 65472, 912 bytes) was the last
block-placement residual in the Mayhem 432 parent. The parent source compiles this function
to 920 bytes / ratio 0.6634 against the deployed original. The cause is two separate codegen
effects, both proven here with `llc` on rustc's own emitted IR before any source was changed.

`llc` command (same toolchain that built the parent, reproduces rustc's bytes exactly):

    llc -O3 -mtriple=sbf -mcpu=generic -relocation-model=pic -function-sections \
        -filetype=obj validate_sweep.ll -o validate_sweep.o

Positional masked-slot diff (mask call/lddw relocations only, no difflib alignment) against the
original O0073 window:

| experiment                                                    | bytes | diff slots | file |
|---------------------------------------------------------------|-------|-----------|------|
| parent default build (threaded + or-fused)                    | 920   | 49        | validate_sweep.threaded.ll.gz |
| rustc with `-Zmir-enable-passes=-JumpThreading` (diagnostic)  | 912   | 18 (12 difflib) | validate_sweep.nojumpthreading.ll.gz |
| that IR, with the `or.cond` split back into two branches      | 912   | **0 — exact** | validate_sweep.surgery-splitchecks.ll |

The diagnostic flag is for analysis only and is **not** used in the shipped build.

## Cause 1 — MIR `JumpThreading` duplicates the `native` dispatch
`validate_sweep` reads a field chosen by `native` (`self.field_10` vs `self.field_34`) and, at
the end, writes the time back to the same `native`-chosen field. The parent writes it with a
second `if native { … } else { … }`. `native` is therefore a `switchInt` discriminant twice.
`mir.before-jumpthreading.mir` has the load as two predecessor blocks (`bb2`/`bb3`) joining at a
single `last == 0` check (`bb4`); `mir.after-jumpthreading.mir` shows the pass duplicating that
whole `last == 0` / `interval == 0` diamond back into each `native` arm (new `bb24…bb31`), so
the two `native` tests collapse into per-arm straight lines. That reshapes the function.

The original is **not** threaded: its load is a single `select` with one join (see
`validate_sweep.nojumpthreading.ll.gz`, block `bb19`). `rustc_mir_transform::jump_threading`
skips locals whose address is taken, so binding `let flag = &native;` and writing through
`if *flag { … }` keeps the final test on an address-taken local and blocks the thread. A plain
`let flag = native;` copy also works here (JumpThreading's bounded backtrack does not re-link the
copy across the diamond), but the reference is the documented, robust form.

## Cause 2 — LLVM SimplifyCFG fuses the two zero tests
Even unthreaded, LLVM folds `last != 0 && interval != 0` into one `or.cond` when `interval` is
loaded eagerly (both compares sit in empty blocks that branch to the same target —
`FoldBranchToCommonDest`). The original keeps them as two sequential branches. Loading
`interval` lazily inside the short-circuit (the field read lands in the second-compare block, so
that block is no longer empty) suppresses the fold. The surgery row above confirms that splitting
the fused `or.cond` into two branches is the whole remaining difference (0 slots).

## Shipped source (both mechanisms, ordinary Rust)
```
let last = if native {self.field_10}else{self.field_34} as i64;
let flag = &native;                                   // address-taken → no MIR JumpThreading
if last != 0 && global_params.field_10 as i64 != 0 {  // field read here is lazy → no or-fusion
    let interval = global_params.field_10 as i64;
    let next_time =    last + interval;
    require!(current_time >= next_time, crate::MayhemError::SweepFeeRateLimit);
}
if *flag {self.field_10=current_time as u64;}else{self.field_34=current_time as u64;}
```
Result: 912 bytes, normalized-identical to the original window (ratio 1.0000, 0 slots), no inline
asm / padding / unused operations. The two field reads of `global_params.field_10` are CSE'd to a
single load by the compiler.
