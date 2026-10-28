# mg-P-z04 PROGRESS (mega run, main Pump)
Start: W/base/L20 (978/1035, 165 raw, unstripped caf1452e...). Baseline build in lane reproduces it (51 s).
Lane dir: W/lanes/mg-P-z04/{src (work tree), src_L20 (pristine), work, out, logs, v (variants), tools}.
Build: python3 -B W/lanes/mg-P-int/tools/nbuild.py --src <tree> --work W/lanes/mg-P-z04/work --out <out> --baseline W/base/L20/inventory.json
Windows: 0x4c158 (v2 create-ATA helper x4), 0x4eb28 (v2 quote funding), 0x52660 (v2 boost), 0x567d8 (multi_hop handler body), 0x57e40 (multi_hop exact-quote helper).

## Plan
- v1 twins already matched on L20 (migrate.rs): 0x414c0 create_pool_token_account (ATA), 0x43060 fund_quote_token_account,
  0x45fa0 init_pump_amm_boost (mg-P-z03-01). Port those recipes to migrate_v2 (v2 execute 0x49888 = z03's window, still monolithic).
- multi_hop: 0x567d8 handler body calls 0x5b3b0 (z05's window) per hop; 0x57e40 is called from 0x5b3b0.

## Log
- 02:50 lane set up, baseline 978/165 OK.
- 03:15 WIN 0x4eb28 -> deliveries/mg-P-z04-01 (979/165, 0 losses). Lane src = v/D1 (L20 + fund helper). src_pre01 = L20 copy.
  Recipe: private #[inline(never)] fn fund_quote_token_account_v2(ctx,amount,native) + inline(always) tq(a,mint,from,authority,amount,seeds)
  with `let decimals=mint.decimals; let mint_info:&AccountInfo=mint.as_ref();`. Found via IR: tools/irbuild.py (work-ir) +
  tools/irx.py (edit one fn in module .ll, llc 3.5 s, sacmp) -> moving the [mint+88] load after decimals + load order q,a,c = MATCH.
## Tools (lane tools/)
- mk.py (variant maker), mux.py (multiplex), bev.sh <dir> <tag> <workdir> win:sym... (build+score+ratio), ev.py, shape.py
  (register/stack-normalized structural diff), calls.py (call sequence orig vs cand), odiff.py (diff .o/.so fn vs window),
  rng.py (instruction range), irbuild.py/irx.py/irutil.py (IR loop), deliver.py.
- variant generators: v_r1.py (R1 = 3 helpers), v_ata1.py (MA1), v_m2.py, v_m3.py, v_b1.py (boost size forms), v_d1.py.
## Status of the other windows (on R1-style restructure)
- 0x4c158 ATA x4: best A4 0.5628 (8424 vs 8368 B; call sequence identical). Non-native path: `invoke(&Instruction{..},&[..])?`
  inline (drop after check, as orig); native path: v1-style inline(always) inner fn returning ProgramResult (tail invoke_signed).
  ctx-param forms (C*) worse (0.45). Remaining diffs = clone/regalloc in the non-native infos chain -> next: IR loop.
- 0x52660 boost: 0.154 (9576 vs 9776 B); call sequence identical except orig places the :747 error block at the END (cold);
  ours inline. Size-helper forms B1-B8 did not move it (let-else B2 9720 B but 0.116).
- 0x567d8/0x57e40: multi_hop split needed (z05 owns hop body 0x5b3b0); not started, coordination note in INSIGHTS.
- 03:50 boost 0x52660: K1 (bind `let user=a.user.to_account_info();` after after_balance so the clone drops after the final
  transfer_native, which is `...?; Ok(())`) 0.154 -> 0.5689; P1 (+ `let funding=Rent::get()?.minimum_balance(qsize(a)?);`, no
  rent binding) -> 0.5939 (9712 vs 9776 B). IR search (tools/irsearch.py <ll> <fn> <win> load|alloca): hoisting the InitBoost's
  quote_mint Box load next to the size-helper loads gives llc 0.8871 (prologue/ret-spill fixed; remaining: error temps 8 B deeper
  in orig, bump slot). Testing source forms that bind quote_mint (MB4).
- ATA 0x4c158: ctx-form (C1) reproduces the original's reloads of a.* fields but promotes mint (orig keeps mint ptr, reloads
  [mint+0x58]); raw-ptr/wrapper-typed params (E*, G*) worse (0.40-0.53). Best still A4 0.5628 (pub fn a:&MigrateV2).
- 04:25 boost 0x52660 -> 0.9445 (9760 vs 9776 B): size helper must take ctx (`fn qsize(ctx)->Result<usize>{let a=&ctx.accounts;
  if a.quote_token_program.key()==anchor_spl::token::ID{return Ok(165)} required_quote_account_len(&a.quote_mint.to_account_info()
  .try_borrow_data()?).ok_or_else(||error!(UnsupportedQuoteMint))}` at :747): with `a:&MigrateV2` ArgPromotion hoisted the
  quote_mint/quote_token_program field loads to the call site (before the memcmp); orig loads quote_mint inside the non-165 path.
  Body = P1 (v_b6.py V1). IR: moving the bump alloca (`&[bump]` seeds temp) right after the inlined closure's 760-B alloca gives
  0.9851 (remaining 2 insns: refund `?` emitted as `jeq ok;ja err` in orig + a tiny `ldxdw r2,[r10-0x458]; ja` block). Testing
  post-init code in a settle helper (MB7) so the seeds temps are the last own locals.
- 04:55 boost 0x52660 -> 0.9785 (Y1, v_b9.py): seeds built INSIDE the init closure (`let init=move||{let key=a.base_mint.key();
  let signer_seeds:&[&[&[u8]];1]=&[&[b"pool-authority",key.as_ref(),&[bump]]]; pump_amm::cpi::init_boost(CpiContext::new_with_signer(..,signer_seeds))};
  init()?;`) puts the bump temp right after the closure's CpiContext alloca (frame now = orig). Remaining: seed-slice store order
  (orig stores "pool-authority" ptr first, like the arg form), and two `jeq ok,+1; ja err` patterns in orig (init_boost and refund
  `?` checks: the err/continue block order at ISel). v_final.py boost_only() builds a clean single-variant tree (658/747 placed).
