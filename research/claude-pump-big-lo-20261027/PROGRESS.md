# pump-big-lo progress (baseline g04 = 806 / 165)

## 2026-10-27

- **22:0x — baseline.** g04 rebuilt bit-for-bit (`5a13b87f…` / `4e9f82da…`, 101 s).
- **sc1 — `set_creator.rs`, `emit!(e); emit_cpi!(e);` with no clone** (both handlers).
  - 0x3a7b8 sync goes from 3,808 B to 3,552 B. Equal length; only 1 load is scheduled differently.
  - The load is `ldxdw r3,[r10-0x58]`: the data-Rc pointer of the `[authority_info]` array in the `emit_cpi!` error path, just after `From<ProgramError>::from`. The original loads it before the two result words, the build after.
  - `llx.py` reproduces this from the same IR. Changing the load order in the IR or the lifetime markers does not move it.
  - The original has 31 `emit_cpi!` error paths: 22 load the result first and 9 load the data pointer first. The data-first group is 0x3a7b8 plus 0x746a8, 0x76a28, 0x77940, 0x7b250, 0x144508 and 0x14a8a8, all unmatched. The remaining hits are two `ensure_rent_exempt` helpers.
- **sc2 — `set`: `match &creators { None => …, Some(cs) => … }` with mint and curve keys hoisted.**
  - 0x38fc0 goes from 6,800 B to 6,136 B (equal length) with 108 differing slots, all frame offsets.
  - sc3 (`if let Some … else …`, keys hoisted) moves the Some block first and the length differs.
- **IR experiment (`llx.py`) on sc2's `set`.** With the None-branch `invoke_signed` result alloca (`_44`, 24 B, no lifetime markers) moved to the front of the entry block, i.e. frame index 0 at r10-0x18, the function matches except the same single error-path load as sync (`ldxdw r3,[r10-0x70]`). So the frame difference is purely the order in which that local was created. Source forms (early return, let-else) are being built.
- **mbc1/mbc2 — 0x37e08 `migrate_bonding_curve_creator`: body fixed, coordinate-only** (lines 46/53). See the README. The patch has been forwarded to the layout integrator.
- **sc4–sc12, sw1–sw3 — the `emit_cpi!` error-path rule.**
  - `return Ok(())` inside the event's scope prevents InstCombine's aggregate-phi fold at the drop-tree join, which makes the error edge load data first.
  - **sw3 = gain01:** `match` with the Some arm first, keys hoisted, no clone, `return Ok(())` in the Some arm. 0x38fc0 and 0x3a7b8 are both matched: g04 808, L06 901, set_creator suite 509/509, full corpus 44/44 (10,468 cases, 0 diagnostic mismatches).
  - Data-first sites in the original (`tools/errpath.py`, 18 in total): 0x1e7c0 create_v2, 0x38fc0, 0x3a7b8, 0x43060, 0x4eb28, 0x52660, 0x746a8, 0x75308, 0x76a28, 0x77940, 0x7b250, 0x859b0 (3 sites), 0x138b20, 0x144508, 0x14a8a8, 0x1557e8.
  - Pump-session ownership: the `emit_cpi!` family is assigned to this lane.
- **gain02 — 0x746a8 `incentives::execute`.**
  - Form: pump-big-mid's mint capture, no clone, and an explicit `return Ok(());` at the end.
  - Matched: g04 807, L06 900. Incentive suites 909/909.
  - A blanket sweep of the same edits over every `emit_cpi!` handler lost 9 result-first windows, so the rule is per window.
- **0x7b250 `volume_sync`.**
  - Recovered the original's `msg!("No changes in accumulator for user={}", user.key())` (format pieces at 0x1bdc88) and `return Ok(())` in the event branch: equal length on L06.
  - IR shows what is left: the `and` operand order (last_update first) and the msg block placed last. With those, 2 diff slots remain: one store-order slot plus its partner.
  - The source form for that block order is not found yet. Tried `||`, `|`, `&`, negation, early-return and else forms.
