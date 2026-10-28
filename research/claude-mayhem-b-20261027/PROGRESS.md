# Lane mayhem-b progress (sweep + sell side)

Scope now: O0075 / O0076 (sweep bodies), O0079 AMM Sell, O0082 Legacy Sell, O0084 SellV2.
(O0093 was closed upstream by the quotes-current packet; O0073 was reassigned to the
fees-final lane. My O0073 notes are kept below for that lane.)

## Parent

`research/mayhem-quotes-current-recovery-20261027` (432/441 normalized, 100 raw-local,
9 unmatched / 107,952 bytes, 4,314 positive direct-call edges, 456 Source records).
Reproduced locally: stripped `73dff97e...`, symbols `440b9281...`. Its 67-file source is
not archived in that packet; it is spr (`mayhem-sizing-panic-recovery/source.tar.gz`)
+ `mayhem-sell-current-recovery-20261027/overrides` + `mayhem-quotes-current-recovery-
20261027/overrides` + `src/instructions/pump_interface.rs` =
`mayhem-current-ownership-composition-20261027/sources/qualified.rs` (all 67 hashes
verified against its source-inputs.json).

## Checkpoints committed

- `checkpoints/cp4-q04-o0075/` (current): **O0075 gained, 433/441 normalized, 100 raw-local, no losses.**
  - Edges 4,314 to 4,363; Source records 456 to 467.
  - Sweep differential: 692 cases, 0 mismatches, 0 non-compute log differences.
  - 14 trade suites: 6,636 cases, 0 mismatches, 0 normalized log differences.
  - Stripped `c1f25d01...`, symbols `73c28d5e...`. No Stack offset warnings. A repeat build is identical.
  - Source edit: `edits/q04_o0075.py`, described in the O0075 section below.
- `checkpoints/cp3-q03-sweep-columns/`.
  - **Diagnostic gain:** the sweep differential's non-compute log differences go from 58 (parent) to **0**. Every sweep panic now reports the original `line:column`.
  - **Change:** whitespace and line placement only (`edits/q03_columns.py` applied to the cp2 source). The sites are 276:84, 296:86, 353:84, 358:37 and 368:86.
  - **Counts:** 432/441 normalized, 100 raw-local, no losses of any kind.
  - **Trade suites:** all 14 (6,636 cases) give 0 mismatches and 0 normalized log differences.
  - **Hashes:** stripped `352328e2...`, symbols `b278b298...`. No Stack offset warnings.
- `checkpoints/cp2-q432-sweep-restructure/`: the sweep restructure plus the sell_amounts zero-check idiom on the 432 parent.
  - 432/100, no losses. Stripped `becda737...`.
  - 17 sweep log differences remained; cp3 fixes them.
  - O0075 is at the original 8,008 bytes with 8 differing instructions (below).
- `checkpoints/cp1-sweep-restructure/`: the same work on the older spr parent (superseded).

## Environment (durable since the 20:43 /tmp wipe)

W = /Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work

- **`W/mayhem-env/sysroot`** (shared, read-only):
  - Mac v1.54 rust plus the 26 official Linux v1.54 target files.
  - build_lane.py hash-checks them against the provider-sharing launch.json, which is copied to `build/provider-sharing-launch.json` and sha-pinned.
- **`W/mayhem-env/parent-432`** (published for other lanes):
  - The pristine parent tree: cp2 with its `source.patch` reversed. All 67 files equal quotes-current `source-inputs.json`.
  - Rebuilt in place: `73dff97e...` / `440b9281...`.
- **`W/mayhem-b/build`:**
  - `layout-lane-linux-target2-sysroot`, a symlink to the shared sysroot.
  - `cargo-home`, an APFS clone of Codex `work/mayhem-priority-20261027/cargo-home`.
  - `qualified/{linker.py,default.ld,ordered.ld}`, from quotes-current `layout/`.
  - The tools.
  - `roots/work`, the working source as a git repo with one commit per step.
- **Outputs and targets:** outputs go to `W/mayhem-b/out/builds/LABEL`. Cargo targets go to `W/mayhem-b/target`, a symlink to `SP/lanes/mayhem-b/target`, which can be recreated.
- **Shared users of the controller** (read-only), each with its own label and target prefix:
  - fees-final (`ff-`, O0073);
  - the buy-side IR workflow (`ir-o77`, `ir-o81`, `ir-o83`).
- **Tools:**
  - `tools/build_lane.py LABEL ROOT [TARGET]` rebuilds the root crate only in ~15-25 s and reproduces the parent bit-for-bit.
  - `tools/measure.py` applies progress.py logic against the parent and reports losses.
  - `tools/batch.py SLOT spec.json` builds several variants per sbf slot.
  - `tools/irbatch.py` dumps IR and MIR.
  - `tools/irsurg.py`, `irperm.py`, `objsec.py` and `cmpobj.py` edit one function's IR, re-run `llc` and compare with the original window.
    - `llc -O3 -mtriple=sbf -mcpu=generic -relocation-model=pic -function-sections` on the rustc-emitted IR reproduces rustc's bytes exactly.
  - `tools/run_trades.py` runs the 14 trade suites.
  - `tools/make_checkpoint.py` assembles a checkpoint that verify.py accepts.

## Coordination notes

- **validate_sweep (O0073, fees-final):** my restructure does not change it.
  - Its definition at fee_recipients.rs:45-65 is untouched. The built function is normalized-identical in parent and cp3 (920 bytes).
  - Only the call site moved: from lib.rs:433 `if !admin {..}` to fee_recipients.rs:272 in the trader sweep.
  - fees-final should keep fee_recipients.rs line counts above line 264 unchanged, because every sweep panic location depends on them.
  - Edits by fees-final: none landed yet.

## Attribution

- **O0075 = `sweep_fees_admin` program fn with the whole admin sweep inlined**; **O0076 =
  `sweep_fees` (trader) with the trader sweep inlined**. (Independently confirmed for
  O0075 by `mayhem-sweep-admin-attribution-20261027` via the matched wrapper.) The
  `remaining_accounts.len() == 16` require! has AnchorError origin fee_recipients.rs line
  399 (admin) / 431 (trader); panic Source records in fee_recipients.rs 353-378 (admin)
  and 207-208, 276-306 (trader); `#[event]` SweepEvent at fee_recipients.rs:13:1.
- The trader caps token and lamport amounts with a helper at fee_recipients.rs 205-211:
  `total == limit -> 0`, `total + amount >= limit -> limit - total` (207:8, 208:16).
- Indentation of the Source columns (17 for the lamport moves and field updates, 22 for
  a continued `.unwrap()`) implies the loops are methods (8-space bodies).

## O0075: closed in cp4

**Original preheader:** token_program, quote_ata and admin field loads, then `remaining.ptr` last. Before cp4 the candidate loaded `remaining.ptr` first, then the three fields in the opposite order. The cause was proven on rustc's IR with `llc` (`tools/prehdr.py`, specs in `tools/irexp/`).

**Fix 1: load `ctx.accounts` in the entry block.**
- The pre-RA list-ilp scheduler ranks a load whose base operand is already live and defined in the same block (LiveUses) ahead of a load from the `ctx` argument. While the accounts pointer was loaded inside the preheader block, `remaining.ptr` always went first.
- With the accounts pointer loaded in the entry block, it becomes a cross-block value: a CopyFromReg, which MachineSink later sinks after the length check. The tie disappears and `remaining.ptr` is scheduled last.
- Source: `let accounts = &*ctx.accounts;` before `require!(ctx.remaining_accounts.len() == 16, ..)`.
- Control: `let accounts = &ctx.accounts;` emits no load and leaves the result unchanged.

**Fix 2: hoisted loads in the order admin, admin_quote_ata, token_program.**
- The scheduler emits these hoisted loads in reverse IR order, so the IR needs admin first.
- Source: bind the three before the loop on the `let mut total` line, as `let x: &AccountInfo<'info> = self.x.as_ref();`, in the order admin, admin_quote_ata, token_program.
- Loop uses: `token_program.key()`, `admin_quote_ata.to_account_info()` and `admin.to_account_info()`.
- Of all 24 IR orders, only rem, 600, 160, 616 with the accounts pointer in the entry block gives 0 differences. The other source orders tried (program/ata/admin, ata/admin/program) leave 4 differences.

**Trader, with the same two changes** (`t2-*` variants):
- Binding orders trader/ata/program and program/ata/trader keep O0075 and give O0076 ratios of 0.281 and 0.282. No change.
- O0076's residual is elsewhere (see below).

## O0076 residual

Same restructure gives 8,464 vs 8,400 bytes; the require! error block is placed at the
end (original: inline after the first native-compare segment), and the limit select uses
520/576 instead of the original 176/232 + 344. Keeping the 344 base separate (llc
surgery) does not fix the placement. The trader loop's frequency structure (validate_sweep,
sweepable) drives MachineBlockPlacement differently; the seed form that fixed O0075's
frame (`let index = &[..]`) lowers O0076's alignment (0.53 -> 0.28 normalized ratio).

**2026-10-27 recheck on cp4** (`tools/irexp/lim.py`, trader IR with the accounts reference and bindings):
- The rustc IR keeps `select(native, 520, 576)` with a single load: 8,496 bytes, 990 differing slots.
- Branch plus phi of the offsets 176/232 on `accounts+344` gives 8,392 bytes and 841 slots. Without the separate 344 base it gives 842 slots.
- A phi of the two loaded values gives 8,464 bytes and 949 slots.
- So the branch form helps, but it is not sufficient.

## Findings reused upstream / for other lanes

1. Inline vs end placement of `unwrap_failed` (O0082/O0084/O0093): a fused `reserve >
   quote` branch gets ~50/50 weights only if exactly one fused check lacks `unlikely`;
   `checked_sub(..).and_then(|r| if r == 0 { None } else { Some(x / r as u128) })` gives
   the original placement (applied to sell_amounts; upstream's O0093 fix uses a `?`
   closure with the same effect).
2. O0073 (for fees-final): nested `if last != 0 { let interval = ..; if interval != 0 {..} }`
   gives 904 bytes / 23 diff slots under the qualified recipe (the original loads
   current_time inside each native arm and puts the non-native arm first). Computing
   `last` before `Clock::get()` (on line 46) did not help (904 bytes, 37 slots).

## Negative controls (beyond those above)

O0075: `&ctx` associated fns, outer `signer_seeds` array, `chunks(2)`, Transfer struct
before CpiContext (all worse); `&&[AccountInfo]` param, `total` before `native`, gp
reference for the limit (no change).
