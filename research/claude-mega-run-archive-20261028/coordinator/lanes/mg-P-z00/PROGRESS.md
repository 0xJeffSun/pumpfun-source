# mg-P-z00 PROGRESS (start = deliveries/r5-z00-03: 910/165, sha d4e0a41a)
Work dir: /Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-z00 (src/, var/<variant>, tools/bs.sh, mkvar.py)
Windows: 0x14910 0x173d8 0x18678 0x1ac28 0x1c880 0x1db88 0x1e7c0
Baseline rebuild (var/base0) reproduces d4e0a41a exactly, 33 s/build.

## Log
- 02:15 switched to base L13 (962/165) per coordinator; old tree kept in src_r5. Build: tools/bs.sh <var> <slot> (nbuild copy, baseline L13).
## 0x1db88 update_metadata_authority (helper split from gen_m2/m10; L13 port pending)
- Mechanism found (IR proof, llx/t2..t4): orig frame = T(CF partition,-0x70) R(try_from result,-0x50, colored w/ residual V) N/A(None+final arg,-0x28).
  Ours: `?` arm value `val` loses lifetime markers (GVN reuses it for the call-arg temp => StorageRemover) so N cannot merge with A.
  IR edits: val markers + R lifetime.end after A copy + scalar return phis => 10 diff lines left.
- `return UPD(CTX, OK::try_from(None)?);` (explicit return) fixes final [r5+8]/[r5+0] store order: 0.9385 (3128B) vs tail 0.587.
- const NONE -> rodata ptr (no stb), let none -> stored at entry: both wrong. `?;Ok(())` re-tags (3152B).
- Toy model (toy/chk.py, rustc 1.79 MIR) reproduces: only an aggregate arg `OK(x?.0)` keeps arg markers so far.
- 02:55 L13 port of the split: tools/gen13.py make(name,{ub:r1|u0|r7,mb:n2,seeds}) -> var/<name> (sites 586/588, no losses, 962).
  s1 (ub=r1: `return UPD(CTX, OK::try_from(None)?);`) = 0.9385 3128B = best. Remaining diff = N/T/A slot coloring only.
- IR proof refined (llx/t6,t8): ONLY needed change = `val` (the `?` Continue binding, high MIR index) keeps lifetime markers
  with lifetime.start BEFORE the CF partition copy; + scalar return phis (= `return`). Then 1-2 sched lines remain.
- Why ours fails: GVN marks `val` reused at `argtmp = copy val` (Copy type) -> StorageRemover strips its markers; the
  arg temp itself has a LOW index (alloca after CF partition) so N merges with T instead of A.
- Toy oracle: lanes/mg-P-z00/toy (dep.rs rlib + chk2.py/chk3.py, ~1 s/variant, reproduces real frame offsets).
  ~110 forms tried (block/let/match/map_err/clone/into/agg/closure/let-else/let-ctx...): none gives orig slots
  (orig = tf(r1=-0x50,r2=-0x28) upd(r3=-0x28)). Closest: agg `OK(x?.0)` (R,N right; A/T swapped), closure (N right).
## 02:30 WIN 0x1db88 -> deliveries/mg-P-z00-01 (963/1035, raw 165, base L13). Lane src = var/d1 (tools/mk_d1.py).
- Fix: `?`+CPI inside `#[inline(always)] fn revoke_update_authority(accounts, signer)` called with inline seeds
  `&[&[b"mint-authority",&[bump]]]` from the #[inline(never)] update_metadata_authority. Mechanism: MIR inliner adds
  StorageLive/Dead for callee locals that lost markers (GVN) => arg slot coloured with the None slot like the original.
- Toy (toy/chk2.py + dep.rs + TOYITEMS=items*.rs) found it in seconds: h1-h4 variants all give the orig slots.
- Next: 0x1c880 mint_supply / 0x1ac28 initialize_metadata with per-CPI #[inline(always)] helpers (seeds as call args).
## 0x1c880 mint_supply (02:40)
- Histogram vs orig: orig rebuilds the mint-authority seeds once per CPI (3x: +2 lddw, +6 stdw, +2 stxb); box ptrs of
  global/abc loaded at entry. Variants ma..mh (whole-body inline(always) helper, let bump=[bump], refs as args): 0.08-0.163.
- Next: per-CPI #[inline(always)] helpers each receiving its own inline seeds literal as a call argument.
- 02:58 mint_supply progress (tools/gen_ms.py, mk_v.py on top of d1): best pv = 0.6722 (4840B vs 4872B):
  `fn mint_supply(ctx:&Context<CreateV2>, is_mayhem_mode)` (ArgPromotion -> (accounts,bump,flag), non-noalias reloads)
  + `#[inline(always)] mint_tokens<T:ToAccountInfo>(a, to:&T, global:&Account<Global>, signer)` reading
  global.token_total_supply at the CPI + `#[inline(always)] revoke_mint_authority(a, signer)`; each call gets its own
  `&[&[b"mint-authority",&[bump]]]` literal. ctx form: 0.19->0.40; global ref: ->0.67.
  Residual: inner seeds array sits at frame top (orig: just below the CPI block, -0x110), block shifted 0x28; 4 insns short.
  Worse: seeds built inside helpers (po 0.61, pn 0.19), let amount (px 0.36), let bump=[bump] forms (0.14-0.16).
## 03:05 WIN 0x1c880 -> deliveries/mg-P-z00-02 (964, cumulative). Lane src = var/ms_rh (tools/gen_ms.py rh).
- Path: pv 0.67 -> IR alloca reorder test (llx/perm.sh) showed set_authority helper allocas must not be first ->
  set_authority in place (rd 0.836) -> SetAuthority literal order account_or_mint first (rh 1.000).
- NOTE: helpers are LLVM-inlined (alwaysinline), not MIR-inlined; InlineFunction adds lifetime markers.
- Next: 0x1ac28 initialize_metadata with the same recipe (ctx param; per-CPI helpers; literal field orders from clone order).
## 0x14910 admit_associated_token_account (03:3x)
- Masked compare showed orig has 2 extra 32-byte key copies: `create_associated_token_account_idempotent(&payer.key(),
  &authority.key(), mint, token_program)` (var/ad1) -> 0.297 -> 0.6441, 6056B vs 6080B. Residual = RA/spill-slot only
  (authority/mint spill slots swapped, system_program stack arg kept in r7 in orig, 3 insns).
- No effect: named slice, `*owner==ID`, inline account_infos/instruction (worse), account_infos order (af1-3).
## 0x1ac28 initialize_metadata
- im2_b: ctx param + `a.mint.to_account_info()` temps at data_len/lamports (orig has 11 clones/6 drops) -> 7232B vs
  7256B, rc counts equal; frame differs (orig: name clone at frame top; ours: inlined to_string/error allocas on top).
## 03:45 status
- Delivered: -01 (L13, +0x1db88), -02 (L13, +0x1c880 cumulative), -03 (L15 port, 974). Lane src = src15 (L15 + my create_v2.rs).
  bs.sh baseline = deliveries/mg-P-z00-03/score.json; tools/deliver15.sh for L15 deliveries.
- 0x14910: ah0 (= ad1 on L15) 0.6441 best; residual is RA only (orig keeps system_program stack arg in r7, spill slots
  differ by 8); tried ah3/ah4 (worse).
- 0x1ac28: im2_b/j1 (ctx param, temp mint clones; j1 = TMI CPI via #[inline(always)] helper) 0.18/0.24; event
  sequence identical to orig except error#1 block placement; frame layout puzzle unsolved (IR reorders no help).
- 0x173d8: decoded closure posted to INSIGHTS for z09 (handler owner).
- 0x18678 walk: orig sites at create_v2.rs 390/395/466/473 (ours 361/366/421/425); orig signature (accounts, g);
  orig starts with accounts[3] bounds check (panic_bounds_check) + len==4 -> error; has memset (records init) and
  2 rust_begin_unwind panics; ancestor (437-449) sits INSIDE walk's line span (nested fn?). Needs full rewrite.
## 03:4x rebased lane src onto base L28 (987; includes my -01/-02 + z07's original admit signature by-value Pubkeys)
- bs.sh baseline = base/L28/inventory.json.
- 0x14910 on L28: ak1 (`create_associated_token_account_idempotent(&payer.key(),&authority.key(),&mint,&token_program)`)
  0.2471 -> 0.6883 (6064B vs 6080B); al1 (+ `require_keys_eq!(token_program,*account.owner,..)`) 0.6897.
  Residual: system_program stack arg spilled (orig keeps it in r7) + with_pubkeys key-copy order in one error path.
  Worse: owner let-binding (am2/am3 0.26), owner.key() (am4 6168B), mint require swap (al2 0.665).
## 03:5x 0x1ac28 initialize_metadata (L28 tree, tools/gen_im2.py)
- im2_p1 = ctx param + KEEP `let mint_info=a.mint.to_account_info();` for data_len + temp `a.mint.to_account_info().lamports()`:
  event sequence (calls / Rc incs) now identical to orig incl. error#1 block placed between data_len and get_packed_len;
  rc counts, stack stores equal; 7304B vs 7256B. Ratio still ~0.15 (frame layout + RA).
- IR (llx, var/p1.ll): our `||error!` closures are NOT MIR-inlined (FnOnce::call_once stays in MIR) -> LLVM inlines them
  and their allocas (formatter/buf/AnchorError) go to the frame top; reordering them after the MIR locals (split after
  mint_info) cuts raw diff 1564 -> 1180 lines. Masked residual 15/21: orig clones 2 AccountInfos via a pointer/stack copy
  where ours reads fields from the account (ldxb +0x28..0x2a), plus jle/jne polarity. Not solved.
- Tried: eager ok_or (8096B), match/let-else (identical/worse), mint_info.clone() in CPI fields (p3-p5 worse),
  TMI/transfer #[inline(always)] helpers (q1-q3 0.17/0.15), metadata.name moved into TMI (m1 0.19).
## Next ideas
- 0x1ac28: find a source form that makes the two Overflow closures MIR-inlined (or otherwise not LLVM-inlined-last),
  e.g. a private `fn overflow_at(line)`-free form is NOT allowed (line must stay 586/588); maybe `.ok_or(...)` in a helper.
- 0x14910 (al1 0.69 on L28): RA residual; try IR experiments around stack-arg (system_program) live range.
- 0x18678 walk: full rewrite from the decoded CFG (see 03:45 notes); sites 390/395/412(closure)/466x2/473.
