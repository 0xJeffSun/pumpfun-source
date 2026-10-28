# r5-z03 PROGRESS (base L12 907/165)

Windows: 0x3cd50 0x3d250 0x3e550 0x3fb70 0x414c0 0x42618 0x43060 0x43ea0 0x45fa0 0x47e28 0x48128 0x49888

## Key finding: migrate v1 (0x3fb70) is split into helpers in the original
Original call graph of 0x3fb70 (migrate::execute): prepare_bonding_curve 0x3cd50 -> require complete (migrate.rs:251)
-> "already migrated" check (rqr,vqr,rtr,vtr order) -> lamports curve->pool_authority (anchor Lamports sub/add pattern)
-> 0x414c0 x4 (create ATA: pool base, pool quote, pa base temp, [memcmp pa_wsol.owner==system] pa wsol temp)
-> 0x42618 (transfer_checked curve->pa temp, bonding-curve seeds) -> 0x47d00 pool_authority_mint_token_account
-> quote checked math (closures 0x410b0/0x412b8, lines 280/282) -> 0x43060 (lamports curve->wsol temp + SyncNative 3 metas)
-> 0x43ea0 create_pool(ctx,base,quote) -> 0x45fa0 boost(ctx) [require line 527] -> 0x48128 close temp(mint)
-> [if wsol temp was system-owned] 0x48128 close temp(wsol) -> 0x48e10 burn LP (data.borrow + StateWithExtensions unpack)
-> 0x48710 close LP account -> 0x49708 refund -> zero reserves -> event emit! + emit_cpi!.
0x47e28 = base_token_program(mint_info, token_program, token_2022) -> AccountInfo (called from 0x414c0/0x42618/0x43ea0/0x48128).
Source generator: gen/body.rs + gen/expand.py (pads to lines 250/279/527), head.rs, tail_orig.rs.

## Status
- 0x47e28 MATCHED (r5-z03-01)
- 0x48128 MATCHED (r5-z03-02): pub fn + seeds built as argument of #[inline(always)] inner fn.
- 0x48e10 MATCHED (r5-z03-03; not in my list but part of the split): private fn taking &Context (ArgPromotion).
- 0x414c0 MATCHED (r5-z03-04): pub fn + inner returning ProgramResult (infos dropped before error check) + `?;Ok(())`.
- 0x43060 MATCHED (r5-z03-05): Instruction built inside invoke() args.
- 0x42618 MATCHED (r5-z03-06): private ctx fn + inner taking token program by value + let decimals after check.
- 0x3d250 MATCHED (r5-z03-07, 914): fn moved to extend_account.rs (Overflow error! at line 141), `let native = quote_mint==default; if !native {0} else {..}`.
- 0x3fb70 (0.867), 0x43ea0 (0.373), 0x45fa0 (0.277 with bW): remaining (see log)
- 0x3cd50, 0x3d250, 0x3e550, 0x49888: not yet started this round

## Log
- m01: first split (private #[inline(never)] helpers, let-bound seeds) -> 908 (+0x47e28).
- m03: pub helpers + seeds-arg inner, move_lamports inline(always), reserve order -> 909 (+0x48128).
  ratios: 3fb70 .77, 414c0 .60, 42618 .28, 43060 .52, 43ea0 .14, 45fa0 .15, 48e10 .74
- m04: anchor Lamports trait (sub_lamports/add_lamports) for curve->pa and curve->wsol moves (original loads the dest
  account only after the first borrow) -> pending
- m05: fund/transfer/ATA/burn as private fns taking &Context -> 910 (+0x48e10); fund 0.93; transfer 0.17 (worse), ATA 0.593.
- m06: transfer back to pub(a,bump) (0.28); boost `if !mayhem&&(len==2||boost_enabled){require!..}` -> 0.1499 (no change)
- m07: ATA pub + inner ProgramResult + map_err(Into::into) -> 0x414c0 0.986 (only error-copy diff); boost `if len==2{body}else{require!(!boost_enabled)}` 0.1499
- m08: ATA `inner(..)?;Ok(())` -> 0x414c0 MATCH -> 911 (delivered r5-z03-04)
- fund variants: map_err 0.75, Ok(..?) 0.93 (=), let infos 0.77 -> keep `invoke(..)?;Ok(())`; remaining diff = stack slot order
  (orig: infos -0x90, rent-key staging -0xb0, ix -0x100, result -0x118; ours: result -0xa8 right below infos).
- transfer variants (single fn so the amount==0 path drops token_program inline like the original): t1 let mint_key 0.22,
  t2 &key().to_bytes() 0.247, t3 if amount>0 0.19; opcode-level 0.82 for all. Original loads mint.decimals right after the
  amount branch (before clones) -> next: t4/t5 with `let decimals=a.mint.decimals;`.
- 0x3d250 (fund_bonding_curve_rent): moved to extend_account.rs line 141 (x01 0.893); inverted `if quote_mint != default {0}
  else {...}` x02 0.913 (best); `let mut reserved=0;if..` = x01 (identical binary); match bool x04 build issue; fees
  let-bound x05 0.879; `let rent=Rent::get()?` x06 0.24. Remaining: `mov r8,0` hoisted into entry in original (phi copy
  placed in entry, no critical-edge split) + Rent::get error-block placement.
- 0x43ea0 create_pool: opcode-level 0.52: the original spills much more (base spilled at entry, bump loaded first); same
  call/clone order. Not yet understood.
- 0x45fa0 boost: original lays the len==2 path (Rent::get) as fallthrough; 3 source forms all give else-first -> trying
  b1 (if len!=2 {require!(!boost_enabled);return Ok}), b2 (slice match), b4 (let-else).
- v07 (t4 + fund_inl): 0x43060 MATCH -> 912 (r5-z03-05; its src was re-synced after a slot-reuse mixup, verified by rebuild fix05).
- boost: b1 (if len!=2) = b4-ish 0.1499/0.166; b2 slice-match 0.1669 (block order now right); s1/s2 seeds lets no change.
- create_pool/boost without inner fns + let-bound seeds (cX/bX) -> 0.369 / 0.262 (orig reloads fields: no noalias);
  cY (let mint_key) same; cZ1 (let bump first) 0.3726 (adopted), cZ3 (named seeds array) 0.360.
- transfer: t6 (inner takes token_program by value; early return drops it inline) 0.664; t8 (= t6 + private ctx fn) 1.0 MATCH.
- prepare_bonding_curve 0x3cd50: p1 (`fund()?; if size<166 {realloc?}; Ok(())`) 0.9154 (tag-first order right but the exit
  block is tail-duplicated into the error edge; original loads the fund payload BEFORE the tag branch and keeps it for the
  size>165 exit = it returns `funding` itself); p4 (if let Err) 0.80; p5 (and_then) 0.76; p7 (is_err early return then
  `funding`) == base binary (0.9245). Base form returns funding but tests size before tag.
- execute 0x3fb70: e4 (negated || chain) identical binary; residual = msg/"already migrated" block and add_lamports-error
  block placement (orig out of line), exit block at end in orig.
- 0x3e550 (fee_recipient.rs 47/60/78): identified = set_params' fee-recipient validation split out of lib.rs set_params:
  `set_fee_recipients(&mut ctx)->Result<[Pubkey;8]>`: require_gte!(len,8) [47]; keys = remaining[..8].iter().map(key)
  .collect::<Vec<_>>().try_into().unwrap(); require!(all != default) [60]; Rent::get; for (i,acc) in remaining[..8]
  .enumerate(): is_exempt(acc.lamports(), acc.try_data_len()?) else Err(Error::from(ErrorCode::ConstraintRentExempt)
  .with_account_name(format!("fee_recipients[{}]",i))); require!(windows(2) a<b) [78]; global.fee_recipient=[0];
  global.fee_recipients=[1..]; Ok(arr). First build x11 pending.
- 0x3d250 variants: f3 (inline(always) helper w/ early return Ok(0)) 0.21; match bool 0.82; f4/f5 (let-bound bool) 1.0 MATCH -> m09 914 delivered r5-z03-07.
- boost bW (seeds as arg of inline(always) inner taking ctx) 0.277 (adopted in body, not in a delivery yet); create_pool cW 0.369 (not adopted).
- prepare p12 (`size<166 && is_ok()`), p13 (bitwise &) == base binary (LLVM ranks the earlier-defined size compare first in the
  merged `and`). p10 (match Ok=>{}, f=>return f; ...Ok(())) 0.82. Next: p11 (`if funding.is_err(){return funding;} ...Ok(())`).
- 0x3e550: x11 build: fn got inlined into set_params (pub fn in pub(crate) mod -> internal) -> x19 with #[inline(never)].
