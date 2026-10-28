# mg-P-z01 PROGRESS (mega run, main Pump)
Start: delivery r5-z01-02 (909/165 on L12). Work dir: claude-pump-work/lanes/mg-P-z01 (src/, work/, tools/, so/).
Windows: 0x22a10 (27400 B) 0x298b0 (4152 B) 0x2bf18 (6664 B) 0x2d920 (8512 B).
Prior notes: claude-pump-work/lanes/r5-z01/PROGRESS.md (0x2bf18 d7 = 0.8897 same len, 0x298b0 v1g 0.61).

## Log
- 01:5x setup: src copied from r5-z01-02.
- 01:50 start build reproduces r5-z01-02 exactly (sha 09722d68, 909/165).
- 01:52 p1 = start + r5-z01 d7 (creator/distribute_creator_fee_v2.rs relayout+inline validate helper) + v1l (collect_creator_fee
  handler moved to creator/collect_creator_fee.rs:99-113 with #[inline] transfer_lamports helper; lib.rs forwarder line-neutral)
  -> 909/165, no losses. 0x298b0 0.9051 (4128 vs 4152 B), 0x2bf18 0.8897 (same 6664 B), 0x2d920 0.12, 0x22a10 0.087.
  Tool: tools/blk.py orig <start> | cand <so> <sym> (basic-block summary with lines/callees/successors).
- 02:05 c1 = p1 + r5-z02-02 (3-way merge, tools/compose.py) = 914, no losses (z02's 5 gains).
- 02:15 L13 landed: s13 = L13 + my diff (vs r5-z01-02) via compose.py; build with b13.sh (nbuild, score vs L13).
## 0x2d920 execute_v2 decoded (orig CFG, see INSIGHTS-R5 entry)
- token path: try_borrow_data + TokenAccount try_deserialize_unchecked -> get_token_distribution_amounts -> helper 0x2fa60
  (z02's window) -> drops of 2 AccountInfo clones -> Clock::get -> emit!+emit_cpi! -> Ok(event).
  Native path: Rent::get -> get_distribution_amounts -> if available<minimum {msg!(format); return Ok(event, Clock, no emit)}
  -> distribute_native(1 clone) -> Clock::get -> emit pair -> Ok(event).
- 0x2fa60 call (orig 0x2e3b0): sret r1; r2=&a.sharing_config (accounts base, offset 0); r3=&clone(a.creator_vault inline
  AccountInfo @+0xe8); r4=&clone(cvqta @[+0x208]); stack params in order: [+0x1f8] (deref'd account), remaining_accounts
  (ptr,len), transfers (2 words), bump (ctx+0x22), [+0x1f0], quote_mint.decimals, quote_mint info ([qm+0x58]),
  &a.quote_token_program (address +0x218, not loaded => helper not arg-promoted => pub), [+0x220].
  Hypothesis: pub fn(sharing_config,&AccountInfo creator_vault,&AccountInfo cvqta,&AccountInfo system_program,
  remaining,&[(u64,bool)],bump,&AccountInfo payer,decimals,&AccountInfo quote_mint,&Interface qtp,&AccountInfo atp)->Result<u64>.
- llc note: llc on rustc's printed IR reproduces every fn EXCEPT loop fns (get_token_distribution_amounts, execute_v2,
  migrate_v2::quote_extensions) -> IR-level experiments are unreliable for these (use-list order / LSR suspected).
- 02:3x WIN 0x2d920 (deliveries/mg-P-z01-01, 963/165 on L13, no losses): gen/gen2d.py variant B1 (native-first early
  return + let-bound single compare quote_mint==Pubkey::default()). Multiplex x2: A1 0.9874, C1 (token-first) 0.9981,
  B2 inline-if 0.9874. Two-compare (|| native_mint) forms: 0.53/0.30. distribute_tokens helper (0x2fa60) body 0.22 (z02).
  Current tree: lanes/mg-P-z01/d1 (= delivery 01 src).

## Status after 0x2d920 win (my win composed into L16=974 and L17=975)
All 4 windows on L16 base:
- 0x2d920  MATCHED 1.0000  (delivered mg-P-z01-01; in L16/L17)
- 0x298b0  0.9051  partial (collect_v2::collect_creator_fee; in L16 via my delivery) — levers exhausted
- 0x2bf18  0.8897  partial (get_token_distribution_amounts; in L16) — MBP cold-block order; Vec::new 0.69, eager ok_or 0.27 (both worse)
- 0x22a10  0.0870  admin_cto::execute (27400 B) — candidate is incomplete (missing 2nd token side + ~14 checks); needs full reconstruction
Best tree: lanes/mg-P-z01/d1 (= delivery mg-P-z01-01 src; L13-based, composes onto L16). Experiment trees x1/x2/xc/xo/xL were probes (can delete).
Next ideas: (1) 0x22a10 is the only window with headroom but needs a dedicated admin_cto.rs reconstruction (two-sided coin+quote payout loop, freeze checks, 2x create/invoke_signed/events). (2) 0x2bf18 cold-block order might only yield to an IR/llc branch-weight edit, but llc does NOT reproduce this loop fn (verified), so that path is closed.
