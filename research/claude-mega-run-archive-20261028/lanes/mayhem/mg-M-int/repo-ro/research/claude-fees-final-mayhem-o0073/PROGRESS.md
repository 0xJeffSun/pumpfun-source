# fees-final — Mayhem O0073 progress

## Result
`FeeRecipient::validate_sweep` (window **O0073**, original start 65472, 912 bytes) is now a
**normalized match** against the deployed Mayhem original, recovered by block placement only
(ordinary Rust, no asm/padding/patched bytes/unused ops).

- Baseline (432 parent `research/mayhem-quotes-current-recovery-20261027`): O0073 **unmatched**,
  920 bytes, ratio 0.6634. Normalized total **432/441**.
- After this change: O0073 **matched** (912 bytes, ratio 1.0000, 0 masked slots). Normalized
  total **433/441**, +3 Source records (456 -> 459), +7 direct edges (4314 -> 4321), **no losses
  of any kind**, no `Stack offset … exceeded max offset` warning.
- Deterministic: two clean builds produced identical `candidate.so` `c8fb565e…` and `symbols.so`
  `63a501e0…`.

## Edit (for mayhem-b coordination)
Only `programs/mayhem/src/instructions/fee_recipients.rs` changes, and only the `validate_sweep`
body. Exact touched lines: **46–64** (the `impl FeeRecipient` method). The file's **total line
count is unchanged** (blank lines were rebalanced inside the body; the method `}` stays at line 65
and the `impl` `}` at line 66). This does **not** overlap mayhem-b's edit regions
(fee_recipients.rs 13–14, 205–211, 264–437; lib.rs 425–456). `validate_sweep`'s definition is
unchanged above line 46 and everything at/after line 65 is byte-identical to the parent.

Per mayhem-b's constraint note, validate_sweep is normalized-identical in parent-432 and in
mayhem-b's q03 restructure, and the call site differs between the two trees
(`sweep_remaining` at lib.rs:433 vs `impl SweepFees::sweep` at fee_recipients.rs:272). This fix was
verified against **both** call-site forms:
- parent-432 (sweep_remaining call site): 433/441, O0073 gained, no losses.
- mayhem-b cp2 tree (impl SweepFees::sweep call site): O0073 gained, no losses
  (`measurement/measure-mbcp2-composition.json`).
O0073 is emitted as its own function, so the call site does not change its bytes.

## On the current frontier (composition-cp4/)
Upstream has since merged mayhem-b's O0075 closure (`cp4-q04-o0075`, 433/441, PR #390) and the
sweep-diagnostics work (PR #386); O0073 is still unmatched there (920 B, ratio 0.6634).
`validate_sweep` (lines 45–66) is identical in cp4, so the same `source.patch` applies unchanged.
- cp4 rebuilt here bit-for-bit: `c1f25d01…` / `73c28d5e…` (its recorded ELF-SHA256.txt).
- cp4 + this patch: `e0d0d0c3…` / `828751f9…`, **434/441**, gains vs cp4 = [O0073] only, **no
  losses** (raw 100 kept; Source 467 -> 470, edges 4363 -> 4370 as measured by measure.py), no
  stack warning. Versus the 432 parent: gains [O0073, O0075], no losses.
- Runtime: stock sweep suite equal to the original on all 692 cases **including logs** (cp4 already
  repaired the 58 handler diagnostics) and identical to cp4; targeted rate-limit differential
  856/0, logs equal, identical to cp4; trade suites 14 families, 6,636 cases, 0 mismatches, 0
  non-compute log differences (`composition-cp4/trades-summary.json`).

The upstream partial `research/mayhem-sweep-rate-current-recovery` (912 B, 19 slots, no match)
and PR #292's sweep-helper controls are prior work on this window; neither form removes both
causes below, and this packet does not reuse their source.

## Mechanism (proved at IR with `llc`, see `ir-evidence/`)
The 432 parent misses O0073 for two independent reasons, each reproduced on rustc's own IR:
1. **MIR `JumpThreading`** duplicates the `native` dispatch (the function reads and later writes a
   `native`-selected field, so `native` is a `switchInt` twice; the pass threads the
   `last==0 && interval==0` diamond into each arm). The original is unthreaded (single `select`
   join). Binding `let flag = &native;` makes `native` address-taken, which
   `rustc_mir_transform::jump_threading` excludes, so the thread does not fire.
2. **LLVM SimplifyCFG or-fusion** folds the two zero tests into one `or.cond` when `interval` is
   eager. Reading `global_params.field_10` lazily inside the short-circuit puts the load in the
   second-compare block and suppresses the fold, leaving the two sequential branches the original
   has.

`ir-evidence/NOTES.md` has the experiment table: parent 49 slots -> `-JumpThreading` diagnostic 18
-> split the `or.cond` = 0 (exact). The diagnostic flag is analysis only; the shipped build uses
ordinary source.

## Shipped source
```
let last = if native {self.field_10}else{self.field_34} as i64;
let flag = &native;
if last != 0 && global_params.field_10 as i64 != 0 {
    let interval = global_params.field_10 as i64;
    let next_time =    last + interval;
    require!(current_time >= next_time, crate::MayhemError::SweepFeeRateLimit);
}
if *flag {self.field_10=current_time as u64;}else{self.field_34=current_time as u64;}
```

## Runtime
All receipts are bound by digest to the shipped stripped ELF `c8fb565e…` and the deployed original
`a87fa9f8…`; `verify.py` recomputes them.
- **Targeted rate-limit differential** (`runtime/ratelimit-differential.json.gz`, driver
  `tools/o73_ratelimit_differential.py`, stock `SweepFixture` unchanged): **856 cases, 0
  mismatches, 0 log differences, identical to the parent**. It sets the sweep interval
  (GlobalParams `field_10`, serialized offset 166) together with non-zero last-sweep fields and
  timestamps, so it reaches every branch of the changed body: 417 pass-and-write, 219
  `SweepFeeRateLimit` at `fee_recipients.rs:61`, 220 add-overflow panics at `fee_recipients.rs:58:32`,
  plus field-selection and admin-bypass cases.
- **Stock sweep suite** (`scripts/mayhem_validate_sweeps.py`, `runtime/sweeps-differential.json.gz`):
  692 cases, **0 mismatches** on state, errors, events, CPIs and return data. Note: this suite
  never has a non-zero interval and a non-zero last sweep at once, so it does not reach the
  rate-limit body (hence the targeted run above).
- **Same suite on the 432 parent** (`runtime/sweeps-parent432.json.gz`, my run): the shipped ELF
  behaves exactly like the parent on all 692 cases, logs included (modulo compute units). The 58
  log-only differences from the original are the parent's existing sweep-handler diagnostic origins
  (32 `AnchorError` origins: original `fee_recipients.rs:431` trader / `:399` admin vs parent
  `lib.rs:428`, 16 each; 26 panic origins: original `fee_recipients.rs:284:17` trader (9) /
  `358:37` admin (17) vs parent `lib.rs:444:26`) — the 58 sweep diagnostics
  mayhem-b is repairing. None involve validate_sweep and none are introduced here.
- **Trade suites** (`runtime/trades-summary.json`): 14 families, **6,636 cases, 0 mismatches, 0
  non-compute log differences**.

## Not done / next
- O0073 is a **normalized** match; raw-local is not claimed (relocation operands depend on the rest
  of the binary). No further Mayhem windows were attempted in this lane.
