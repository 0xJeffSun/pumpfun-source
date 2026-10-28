# mg-P-cash PROGRESS (main Pump window 0x76a28 claim_cashback body, 3864 B)
Start = WP/base/L27 (986/1035, raw 166). Score baseline: WP/base/L27/inventory.json.
Work dir: WP/lanes/mg-P-cash (src/ = L27 copy, work/, out/, v/, tools/). WP = /Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work

## State at start
- L27 cashback::claim = 4464 B, ratio 0.178 vs window (base form: no Clock-first, no msg, ok_or_else).
- Prior best: mg-P-z07 v/c1 (L13 + c1 claim form) 3888 B ratio 0.8666 (orig 3864 B; 3 insns longer).
  c1 form (claim_token_incentives.rs lines 152, 251-254): Clock-first timestamp, named min via Rent::get()?.minimum_balance(
  uva.to_account_info().data_len()), amount=uva.get_lamports().saturating_sub(min), msg!("No cashback to claim"),
  sub/add lamports on 251, eager ok_or(error!(Overflow))? on 252, emit!(event) without clone.
- Known residual (z07): two adjacent bool loads [r2+0x28]/[r2+0x29] into swapped r8/r9; spill-slot pair -0x2a0/-0x2a8 swapped;
  original reloads [accounts+0x10] (uva info ptr) after calls, ours caches it.

## Log
- 03:25 lane src = cp -c -R base/L27/pump. Tools copied from mg-P-res1 (irbuild/xfn/lle/sacmp/odf/wd/llf) + own mkvar.py
  (line-replace variant maker), mux.py (multiplex claim_X copies dispatched on remaining_accounts.len()), perm.py (IR unit
  permutations of the event block), irsum.py, ocalls.py.
- 03:26 v/c1 = L27 + z07 c1 claim lines (152, 251-254): 986, no losses, claim 3888 B ratio 0.8666 (same as on L13).
  IR build (work-ir) + xfn single-fn module: llc reproduces 0.8666/71 slots exactly.
- Diagnosis: our IR loads uva.info once inside inlined sub_lamports (self=&Account noalias readonly => GVN merges the
  two as_ref() loads across the lamports() call). Original reloads [a+0x10] per call => Self must not be noalias-covered.
- 03:33 v/m1 multiplex (claim_b/c/d/f): `&mut Account` local (Self=&mut Account) => c/d 3864 B 0.9679 (24 slots), b
  (Clock first, then local) 0.9379, f (to_account_info on ctx.accounts..., local after) 0.9251.
- IR perm (tools/perm.py on claim_c): residual = event block order. All 24 orders of {update store, earned load,
  lifetime.start(event), key ptr load}: match (only copy line consts left) iff earned load and update store precede
  lifetime.start(event). Reversing the literal's store order in IR changes nothing.
- 03:40 v/m2 (claim_g/h/i/j): g/h/i (= c/d + `let total_cashback_earned=uva.cashback_earned;` after the update) 2 slots
  (line consts only); j (Clock first) 0.9657.
- 03:42 v/d1 = L27 + final claim form in place (lines 152, 251-254, line-neutral): 987/1035, raw 166, gains [0x76a28],
  losses [], raw_losses [], runtime_valid, no stack warnings. DELIVERED mg-P-cash-01 (WP/deliveries/mg-P-cash-01),
  WIN line in MR/EVENTS.log, finding in WP/shared/INSIGHTS-R5.md. Lane src = d1 tree.

## Current best
- WP/deliveries/mg-P-cash-01 (= lane src = v/d1/src): 987/1035 normalized, 166 raw, unstripped 411fee10...
- All assigned windows closed (0x76a28). Raw match of 0x76a28 not reached (global layout: call/lddw immediates).

## Next ideas (for other lanes)
- 0x77940 claim_v2 (lane mg-P-z07b): same family; try the `&mut ctx.accounts.user_volume_accumulator` local + Clock
  after it, and read event fields in statements before `let event`.
- 03:44 rebased onto L29 (988; claim_token_incentives.rs identical to L27): v/r29 = L29 + same file -> 989/1035, raw 166,
  gains [0x76a28], no losses, runtime_valid. DELIVERED mg-P-cash-02 (base_round L29) + WIN line. Cleaned llx/ir/work-ir scratch.
## STOP (03:45): only assigned window 0x76a28 closed (normalized). Deliveries: mg-P-cash-01 (L27, 987), mg-P-cash-02 (L29, 989).
