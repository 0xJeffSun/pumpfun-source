# gain01: `set_creator` / `set_metaplex_creator` (0x38fc0, 0x3a7b8)

**Result:** g04 806 → **808** normalized; raw unchanged at 165. No normalized or raw losses, runtime_valid, no stack-offset warnings.

| base | before | after | gains |
|---|---|---|---|
| g04 | 806 | 808 | 0x38fc0, 0x3a7b8 |
| L06 | 899 | 901 | 0x38fc0, 0x3a7b8 |

- **Patch:** `source.patch` changes `src/set_creator.rs` only. It applies with `git apply -p1` inside a copy of `base/g04/pump`; that file is identical in L06 and g09.
- **ELFs:** in `elf/`. On g04 the unstripped ELF is `c696c519…` and the stripped one `78acaeec…`. On L06 the unstripped ELF is `dcd583de…`.

## Source form (behaviour unchanged)

```rust
// set_creator (0x38fc0)
if a.bonding_curve.creator != Pubkey::default() { msg!("Bonding curve has creator already set"); return Ok(()); }
let mint = a.mint.key(); let bonding_curve = a.bonding_curve.key();
match &a.metadata.creators {
    Some(cs) => { let creator = cs[0].address; a.bonding_curve.creator = creator;
        let e = SetMetaplexCreatorEvent { timestamp: Clock::get()?.unix_timestamp, mint, bonding_curve,
                                          metadata: a.metadata.key(), creator };
        emit!(e); emit_cpi!(e); return Ok(()); }
    None => { a.bonding_curve.creator = creator;
        let e = SetCreatorEvent { timestamp: Clock::get()?.unix_timestamp, mint, bonding_curve, creator };
        emit!(e); emit_cpi!(e); }
}
Ok(())
// set_metaplex_creator (0x3a7b8): the same Some arm, ending in `return Ok(())`;
// the None arm logs "Missing metaplex creators".
```

g04 had `emit!(e.clone())`, `if let … else` and late key reads. Each piece of the new form was isolated in a separate trial:

1. **No clone.** `emit!(e); emit_cpi!(e);` (`emit!` borrows its argument). The clone added a second event copy; with it gone, sync drops from 3,808 to 3,552 B.
2. **`match` (Some arm first, None arm second) with keys hoisted.** The mint and curve keys are read before the match.
   - The None arm is lowered last, so its `invoke_signed` result is the last MIR local and becomes the first alloca: frame index 0 at r10-0x18.
   - The None block is still laid out first after the check (`jeq +1; ja`), as in the original.
   - With `if let … else` the Some block is laid out first.
   - With `match { None => …, Some => … }` that local is created too early, and every slot from `ix` down moves by 0x18.
3. **`return Ok(())` inside the event's scope.** This explains the `emit_cpi!` error-path residual, `ldxdw r3,[r10-0x58]` loaded before the `From<ProgramError>` result words.
   - The drop tree gives the `Clock::get()?` and `emit_cpi!` exits a shared `StorageDead(e)` join. If only error exits reach it, its two scalar phis come from extractvalues of `{i64, ptr}` call results, and InstCombine folds them into one aggregate phi. The error edge then has no extract of its own, and the scheduler emits the result words first (result-first).
   - An `Ok(())` return through the same join gives the phis a constant input, so the fold stops. Each error edge then extracts its own value: data-first, as in the original.
   - The `match` arm form (rather than `if let`) also gives the event alloca a second end marker. That keeps it conservative in StackColoring, so the `Clock::get` result shares the `ix` slot at r10-0xd0 as in the original, instead of the event slot.
   - IR proof (`tools/llx.py`, `tools/frame.py`): on sc11's IR, adding one `lifetime.end(e)` on the Clock error edge makes `llc` reproduce 0x3a7b8 exactly.
   - The same rule should apply to the other data-first `emit_cpi!` windows (PROGRESS lists them).

## Runtime

- `runtime-set_creator.json`: set_creator suite, 509/509 cases, 0 errors, 0 diagnostic mismatches.
- `runtime-corpus44.json`: the full 44-suite corpus on the same stripped ELF: **44/44 suites, 10,468/10,468 cases, 0 errors, 10,464 paired diagnostic-log cases, 0 diagnostic mismatches**. tokenkeg_two_curve is bound to the staged workspace's source manifest.
- Runner: `tools/run_suites.py` (pump-hi's runner) with the repository harness scripts unchanged.

`verify.py` is stdlib only and passes with `HOME` set to an empty directory.
