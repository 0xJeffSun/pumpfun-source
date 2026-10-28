# gain02: `admin_update_token_incentives` (0x746a8)

**Result:** g04 806 → **807** normalized (gain 0x746a8); raw unchanged at 165. No losses, runtime_valid, no stack warnings.

- **L06:** 899 → 900, same single gain, no losses.
- **Patch:** `source.patch` changes `src/incentives.rs` only. It applies with `git apply -p1` to both `base/g04/pump` and `base/L06/pump`, where the file is identical.

## Source form (behaviour unchanged)

```rust
let mint = ctx.accounts.mint.key();          // pump-big-mid's finding (commit 5e6656f70)
let timestamp = Clock::get()?.unix_timestamp;
update_schedule(&mut ctx.accounts.global_volume_accumulator, start_time, end_time, seconds_in_a_day,
                &mint, day_number, token_supply_per_day, timestamp)?;
let event = AdminUpdateTokenIncentivesEvent { start_time, end_time, day_number, token_supply_per_day,
                                              mint, seconds_in_a_day, timestamp };
emit!(event);                                  // no clone
emit_cpi!(event);
msg!("GlobalVolumeAccumulator={:?}", ctx.accounts.global_volume_accumulator);
return Ok(());                                 // explicit return statement, not a tail expression
```

The explicit `return Ok(())` is the `emit_cpi!` data-first rule from gain01:
- A `return` statement goes through the MIR drop tree. Its Ok value joins the `?` exits there, so InstCombine can no longer build an aggregate `phi {i64, ptr}`.
- The `emit_cpi!` error edge then extracts its own value, and its data-Rc load is scheduled first, as in the original. A tail `Ok(())` leaves only error values at the join.
- With pump-big-mid's mint capture alone, the window was 3,152 B at ratio 0.938.

Not every handler follows this rule. On L06, a sweep that applied the same edits to every `emit_cpi!` handler lost 9 matched result-first windows: 0x662c8, 0x66fa8, 0x67c38, 0x6c160, 0x79bc0, 0x7a6c0, 0x1348c0, 0x135d60, 0x137fc0. In the original those handlers end in a tail `Ok(())`, and the error-path load order in the binary tells which form each handler used (see `tools/errpath.py`).

## Runtime

- `runtime-incentives.json`: the incentive_schedule and incentive_claim suites on this ELF, 909/909 cases, 0 errors, 0 diagnostic mismatches.
- The full 44-suite corpus runs on the cumulative g04 + gain01 + gain02 build; see `../cumulative/`.

`verify.py` is stdlib only and passes with `HOME` set to an empty directory.
