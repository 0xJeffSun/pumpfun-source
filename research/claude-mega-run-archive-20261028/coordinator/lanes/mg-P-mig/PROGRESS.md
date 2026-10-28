# mg-P-mig PROGRESS (fleet B, main Pump)
Start: W/base/L27 (986/1035, 166 raw). W = /Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work
Lane dir: W/lanes/mg-P-mig/{src (work tree = L27 copy), work, out, tools, v (variants)}.
Build: python3 -B W/lanes/mg-P-int/tools/nbuild.py --src W/lanes/mg-P-mig/src --work W/lanes/mg-P-mig/work --out <out> --baseline W/base/L27/inventory.json
Windows: 0x49888 migrate_v2::execute (8888 B), 0x3e550 fee_recipient.rs set_fee_recipients validator (5664 B).
Peers: mg-P-z04 (fleet A) owns migrate_v2 helpers 0x4c158 (ATA x4) / 0x52660 (boost); coordinate via INSIGHTS-R5.md.

## Log
- 03:25 lane set up (src = L27 copy). Baseline build pending.
- 03:30 baseline b00 = L27 exactly (sha 2e1e1d20, 986/166, 44 s).
- 03:35 V1 (tools/v1.py + tools/gen.py): v1-style migrate_v2::execute at lines 236-349 (sites 243 ev-auth require_keys_eq with
  &pump_amm::ID, 249 complete, closures 309/313/326 kept, 335 PumpError::QuoteMintNotWritable via get_transfer_fee),
  calling z04's R1 helpers create_token_account_v2 x4 / init_pump_amm_boost_v2 (appended at file end, 658/747 layout).
  Result: 986/167 (raw +0xd240), 0 losses; execute 8744 B vs orig 8888, ratio 0.7581 (L27 was 22168 B, 0.085).
  Call sequence identical to the original except the "already migrated" msg block placement.
- IR finding (llc, llx/e_pa.py): orig computes the &a.pool_authority GEP ONCE before `if native` (used by add_lamports and
  transfer_native) -> CGP does not fold system_program/pool_authority loads -> llc 8912 B, 0.9516 (69 diffslots).
  `let pool_authority=&a.pool_authority;` alone (V2) does NOT do it (MIR reborrow propagation duplicates the GEP) -> testing
  UFCS Lamports::add_lamports(pool_authority,..) / helper-fn forms via multiplex (tools/mx.py: copies in src/migrate_xK.rs,
  same path length + same lines => identical sites; one IR build + one llc).
- 03:50 MX1 multiplex (tools/mx1.py, one IR build + llc): control copy == main (295 diffslots, fidelity OK).
  UFCS `Lamports::add_lamports(pool_authority,..)` on a let-bound ref (a, c): no change (295).
  Private helper `fn pay_migration_fee(a,pool_authority:&UncheckedAccount,native,fee)` called as
  `pay_migration_fee(a,&a.pool_authority,native,fee)?` (b): 8896 B vs 8888, ratio 0.9470, 72 diffslots (45 hunks, mostly
  branch-offset shifts). Helper with explicit curve/system/user params (d): 0.7832.
- 03:55 STOPPED (coordinator rule: a safety check halted one of my steps; no retry). No delivery: no normalized gain yet.

## Status at stop
- Best BUILT tree: W/lanes/mg-P-mig/BEST-V1 (= v/V1; score BEST-V1.score.json): 986/167, raw +0xd240 (incidental), 0 losses,
  runtime_valid, no stack warnings; 0x49888 execute 8744 B, 0.7581. Not delivered (TASK.md needs normalized gains>0).
- Best MEASURED form (llc only, UNBUILT): v/V3 (tools/v3.py = V1 + pay_migration_fee helper) -> expect ~0.947.
- 0x3e550 (set_fee_recipients) not started.
## Next ideas
1. Build v/V3 with tools/bld.sh (expect 0 losses), then use the scorer/hunk counts on the residue: hunk list shows a few real
   diffs besides offset shifts: the reserve-zero chain placement after the complete check (orig lays the chain inline, ours
   moves it out of line), and 3 extra curve-pointer reloads in ours near the curve reset; the rest are branch-offset deltas.
2. Try the reserve check as a small helper/method returning bool (e.g. `fn already_migrated(c:&BondingCurve)->bool`), and
   the curve reset through one `let c=&mut ..` binding vs field writes, via tools/mx.py copies (same lines => exact).
3. Coordinate with mg-P-z04: my execute calls its R1 helper signatures; if z04 changes create_token_account_v2's signature,
   re-check the call shape (orig: r2=a, r3=bump, r4=dest, stack wallet/mint/native/token_program).
## Tools (lane tools/)
gen.py (variant tree: execute at lines 236-349 + z04 R1 helpers), v1.py/v2.py/v3.py, mx.py (multiplex copies in
src/migrate_xK.rs), mx1.py, bld.sh (nbuild + score summary), irb.sh/irbuild.py/irx.py/sacmp.py (IR + llc), hk.py (hunk summary),
cfg.py, filesites.py (orig windows with Source sites per file).
