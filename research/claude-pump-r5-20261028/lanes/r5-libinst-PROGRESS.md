# r5-libinst PROGRESS (base L12 = 907/165)

Lane src: W/lanes/r5-libinst/src (= L12 + accepted changes). Experiments: exp/<name>, results res/<name>.{log,score.json}.
Tools: tools/cg.py (original/candidate call graph: `cg.py callers|callees ADDR [--cand so]`, original windows annotated with
L12 match status/symbol), tools/ro.py (read &[&str] pieces in original .rodata), tools/b.sh (build+score), tools/deliver.py.

KEY FINDING: triage "nearest" names for these windows are length neighbours only. Real identities (from callers/callees):

| window | identity | status |
|---|---|---|
| 0x7890 | InterfaceAccount<TokenAccount>::reload, called 2x by 8 trade handlers in the original mayhem sync block | MATCHED (exp rl, delivered 03) |
| 0xd300 | out-of-line `alloc::fmt::format` (callers: distribute v2 0x2d920 msg "Insufficient fees...", set_reserved_fee_recipients rent path) | MATCHED (exp fmt, delivered 02) |
| 0x1a918 | create_v2 `check_quote_mint_extensions(&AccountInfo)` borrow + quote_extensions_supported + require UnsupportedQuoteMint @create_v2.rs:528 | MATCHED (delivered 02) |
| 0x48e10 | migrate v1 LP burn helper (data.borrow(), StateWithExtensions<Account>::unpack amount, token_2022::burn with pool-authority seeds) | testing |
| 0x58bf0 | multi-hop `require_ata(key,owner,mint,program)`: require_keys_eq!(*key, get_ata(..), ConstraintSeeds) @multi_hop_curve_swap.rs:369 | MATCHED (delivered 02) |
| 0x60ee0,0x61348,0x63cf0,0x65eb0 | pump_quote.rs cluster (z05 owns the rest of the cluster) | remaining |
| 0x7fde8 | v3 fee helper: whitelist memcmp -> zero; data_len(fee_config) -> buy_fee_market_cap -> get_fees | remaining |
| 0x806c8, 0x80df8 | trade_v3.rs helpers (317/326, 371/375) | remaining |
| 0x89b48 | util/fee.rs calculate_fee_tier | MATCHED (coordbodyB-01 port, delivered r5-libinst-01) |
| 0x89ec8 | util/fee.rs get_fees: fee_config/len register swap (coordbodyB) | remaining |
| 0x93050, 0x940c0 | multi-hop transfer_checked wrappers (two copies differing in field offset) | remaining |
| 0x95360 | transfer_fee pre_fee_amount (+0x94e28 calculate_fee): cross-crate call keeps the Fee stack copy | MATCHED via separate crate (delivered 04) |
| 0x9b148, 0x9b430 | BondingCurve try_deserialize (unchecked inlined) / unchecked: block placement of n<41 error | testing |
| 0x17c850 | token-2022 TransferFeeConfig TLV parser -> Option<Option<(Fee,Fee)>>, called by util/transfer_fee.rs get_transfer_fee (0x94908, line 31) | testing |

## Experiments
- b0: unchanged L12 rebuild -> 907/165, sha 2ee9f796 (= base).
- cbB: coordbodyB-01 patch on L12 -> 908 (+0x89b48). DELIVERED r5-libinst-01.
- qx: create_v2 check_quote_mint_extensions helper (require at line 528 via end-of-file pad) -> +0x1a918, no losses.
- ata: nested fn require_ata inside multi_hop execute at line 369 (pad block), admit_vaults takes it as fn pointer -> +0x58bf0.
- fmt: distribute v1/v2 "Insufficient fees..." msg! + set_reserved_fee_recipients executable/rent error forms swapped to the original's -> +0xd300. DELIVERED r5-libinst-02 (911).
- rl: legacy buy mayhem sync block (whitelist user -> reload abc, au -> sync_virtual_quote_reserves) -> +0x7890. DELIVERED r5-libinst-03 (912).
- bcC (BondingCurve decode as range match, decode inline(always), checked fn inlines decode) -> 910 (no gain): unchecked 664 B, same n<41 block-placement diff.
- burn (0x48e10 helper burn_lp_tokens: data.borrow + StateWithExtensions<Account>::unpack + burn CPI, seeds inline in call) -> no gain, 2352 B vs 2296; original builds signer seeds (mint key copy, lens) BEFORE cloning the CPI AccountInfos. Variants burn1..4 (seeds bound first) building.
- burn2 (A1 unpack-temp + let bump/mint/seeds) 0.369; burn3 (block borrow + let mint + const signer array) 0.688 (best so far, 2312 B vs 2296):
  remaining = stack layout of mint/seeds/outer (orig: bump -0xe9, mint -0x110, seeds -0x140, outer -0x150 => MIR order outer,seeds,mint,bump
  => inline `&[&[b"pool-authority",a.mint.key().as_ref(),&[bump]]]`), burn4 (inline in let) does not compile (E0716). burn9/10: closure form
  `let burn=|signer_seeds:&[&[&[u8]];1]| burn(CpiContext::new_with_signer(..,signer_seeds),amount); burn(&[&[...inline...]])` (same trick as matched refund_pool_authority).
- v3f (0x7fde8 v3_fees helper, buy only) 0.28: original keeps the fee_config AccountInfo clone alive to function end (drops after get_fees) => v3f2/v3f3 bind `let fee_config=a.fee_config.to_account_info();`.
- ext: separate dependency crate W/lanes/r5-libinst/crates/pump-token-ext (Fee + calculate_fee/pre_fee + TLV parser) via absolute path dep + manual Cargo.lock entry (fastbuild rsync drops nested Cargo.toml). ext2 adds plainbody e09 quote_extensions_supported to the crate.
- 0x806c8/0x80df8: large trade_v3 math helpers (0x806c8 = net-quote-from-budget with creator==default gate, fee() x2, muldiv, two require_* with_values at trade_v3.rs:317/326, returns 5 words; 0x80df8 = gross-up with pre_fee_amount + add3 x2 + expect("...") at 371/375). Not attempted (needs full v3 handler restructure; candidate has net_quote/gross_up_quote instead).
- 0x93050/0x940c0: generic transfer_checked wrapper (anchor_spl::token_2022::transfer_checked via CpiContext; args program:&AccountInfo, source, destination (types with info ptr at +0x20 vs +0x0 => two monomorphizations), authority, decimals, mint, amount==0 early Ok, seeds) called from multi-hop execute 0x5e1d0/0x5e398. Candidate multi-hop uses its own checked_transfer (spl instruction + invoke_signed). Needs multi-hop execute restructure (z05 area). Not attempted.
- 0x65eb0: wrapper borrowing 3 account datas and calling 0x65238 (z05 pump_quote cluster); depends on z05's 0x65238 signature. 0x60ee0/0x61348/0x63cf0 also pump_quote internals (z05). Not attempted.
- c04: src(03) + separate crate pump-token-ext-v1 (Fee methods, TLV parser, quote_extensions_supported) + get_transfer_fee -> 914 (+0x94e28 +0x95360). DELIVERED r5-libinst-04.
- tf (parser inside pump) 0.589; x1 (4 loop shapes in crate: break-form 0.46, while-let 0.617, nested 0.617?, match-get 0.617): code identical, only block placement
  (orig: loop rotated so ADV tail precedes HEAD; branches as `jcc +1; ja` pairs, e.g. `jle r7,r3,+1; ja none`) => hypothesis: helper crate built with a
  different opt-level (per-package profile override). Testing xos/xoz/xo2/xo1 (opt-level s/z/2/1 for pump-token-ext).
- bcB (n>=41 nested dispatch): n<41 error now laid out as in original, but the dispatch chain reorders -> 0.70 (unchecked). bcA pending.
- v3f2 0.83, v3f4 (curve bound at top) 0.896: remaining diff = curve load position (orig loads [a+0x28] inside the fee_config clone) -> v3f5/v3f6 pending.
- burn9..14 closure forms 0.741 (seed stack layout now exact); remaining RA diffs in the AccountInfo clone sequence (r9 vs r8, amount kept in r0).
- opt-level override for pump-token-ext: z / 1 / s all LOSE 0x17c548 (913) and do not fix the parser => the crate is opt-level 3 like pump.
- bcA (early-return chain, decode inline(always) in both checked/unchecked): checked 720 B (0.74), unchecked 600 B (0.56).
  bcB/bcG/bcH/bcI (any form whose IR branch is `n > 40 -> chain`): n<41 error block now laid out exactly as original, but SimplifyCFG
  then merges the chain tests pairwise (jlt 0x49 / jeq 0x49 switch-like) -> unchecked 592 B (0.70), identical binaries for G/H/I.
  Original = bcA-style unmerged arms + bcB-style n<41 polarity. Not yet found. Ideas left: an opaque side effect between the n<41
  check and the chain (e.g. store to *buf after the check), or the chain in a separate #[inline(always)] fn called after the check.
- burn10 (A1 + closure) == burn9 0.741.

## Remaining windows - diagnosis summary (end of round)
- 0x48e10 migrate v1 burn helper: best burn9/burn14 (closure form) 0.741, 2312 vs 2296 B; seed layout exact; RA diffs in clone sequence.
- 0x7fde8 v3 fee helper: BEST v3f5 = 0.9923 (1040 B = same size; ONLY diff: position of `add64 r8, 0x8` (curve = &Account->data)):
  v3f5 source (appended to trade_v3.rs `fn add` line; buy handler lines 812-823 replaced by a call):
  `#[inline(never)] fn v3_fees(a:&SellV3,amount:u64)->Result<(u64,u64,u64,u64)>{if a.global.whitelist_pda==a.user.key(){return Ok((0,0,0,0));}let curve:&BondingCurve=&a.bonding_curve;let fee_config=a.fee_config.to_account_info();let config_len=fee_config.data_len();let cap=buy_fee_market_cap(curve,&a.base_mint)?;crate::legacy_sell::fee_math::get_fees(&a.global,curve,&a.fee_config.0,config_len,cap,amount)}`
  (orig places the +8 at the top of the block after the 2nd Rc check; ours right before the buy_fee_market_cap arg setup). v3f9 (&**), v3f12 (fresh &a.bonding_curve to get_fees) = identical binary; v3f13 (temp clone) 0.29; v3f6 0.86. Earlier: v3f4 0.896 (helper with bound fee_config AccountInfo + `let curve:&BondingCurve=&a.bonding_curve;` at top);
  remaining: curve ptr load position (orig loads it inside the fee_config clone, keeps amount in r8 and spills after memcmp).
  Only the v3 buy handler calls the helper in exp; original calls it from 0x147ba0, 0x1489f8, 0x14a8a8, 0x82af8.
- 0x89ec8 get_fees: fee_config/len register swap (coordbodyB); unchanged.
- 0x9b148/0x9b430 BondingCurve: see bc* above.
- 0x17c850 TLV parser: code identical, block placement (loop rotation + `jcc +1; ja` pairs) differs; 5 loop shapes + 4 opt-levels tried.
- 0x806c8/0x80df8, 0x93050/0x940c0, 0x60ee0/0x61348/0x63cf0/0x65eb0: not attempted (see above), need v3/multi-hop/pump_quote restructures.
- bcJ (n>=41 then separate #[inline(always)] dispatch fn) 0.72/0.54; bcK (#[inline] hints) decode not inlined, 424 B - worse.

## State at end of round 5
Latest delivery: W/deliveries/r5-libinst-04 = 914 normalized / 165 raw (+0x89b48 +0x1a918 +0x58bf0 +0xd300 +0x7890 +0x94e28 +0x95360).
Lane src == delivery 04 src (absolute path dep on W/lanes/r5-libinst/crates/pump-token-ext-v1; do not modify that dir).
Next round: start from v3f5 for 0x7fde8 (0.9923), burn9 for 0x48e10 (0.741), bcA/bcB for BondingCurve, x1 tfc_d for 0x17c850.

## Round 2 (r5 continued)
- src reset to delivery 04 (identical). Peers already matched 0x48e10 (r5-z03-03), 0x61348 + 0x65eb0 (r5-z05-02) -> skipped.
- gen/v3gen.py (src + v3_fees body + buy handler routed), gen/run.sh (build+score in work_<name>).
- t1..t6 v3_fees forms: t1 (data_len + buy_fee_market_cap as get_fees ARGS, curve let) MATCHED 0x7fde8 -> 915. DELIVERED r5-libinst-05.
  t2 (no curve let, &a.bonding_curve inline twice) 914, t3 (if/else expr) 914, t4/t5 914.
- 0x89ec8 get_fees (util/fee.rs, gen/gfgen.py + gen/gfgen2.py variant generators, region lines 171-204, require kept on 183):
  gA (positive `||` inline in if) 0.517, gD (exotic fn) 0.52, gF (len first param) 0.517, gH (no helper, calls in get_fees) 0.43,
  gJ (creator override let-if) 0.518, gC/h0 (`fn is_sol_quote(q)->bool` helper for default/WSOL/QUOTE_2) 0.760 (block order fixed),
  gK (`let is_sol=..;` bound before if) 0.760, hai (inline(always)) = gC, hm ([..].contains) 0.716, hb/hc param orders = gC,
  h1 (exotic `len<=4096 || all-zero -> flat`) 0.769, h2 (exotic `let use_exotic=len>4096&&(..); if use_exotic{exotic}else{flat}`) 0.772,
  gB (calculate_fee_tier called INSIDE the if arms, tail-expression if/else returning Result) 0.761 but fixes the register
  assignment (r7=fee_config, r9=len) and the -0x120 result-slot stores => a2 = gB arms + is_sol_quote fn + use_exotic = 0.9795
  (1640 B, same size); b2/c2 (return-form arms) = a2. Remaining: polarity of the two fee() `?` branches (orig protocol `jne r1,2 -> err`,
  creator `jeq r1,2,+1; ja err`). f1..f8 (creator if/else polarity, match, return Ok, Ok(0)? forms) building.
  f1/f5/f8 (creator != default first) fix the creator-fee polarity only (0.967); k2 (let-if creator override) fixes the protocol-fee
  polarity only (0.956); j1 = a2 + tail=j + fee=1 => 0x89ec8 MATCHED (1.0) -> 916. DELIVERED r5-libinst-06. src synced to exp/j1.
- 0x806c8 (decoded: net quote from budget; callers 0x5b3b0 multi-hop, 0x83088, 0x1489f8 v3 buy_exact_quote): gen/nqgen.py writes
  `#[inline(never)] fn net_quote_for_budget(creator:&Pubkey,protocol_fee_bps,creator_fee_bps,budget)->Result<(net,pf,cf,pbps,cbps)>`
  at trade_v3.rs 310-329 (require_gt! BuyNotEnoughSolToCoverFees on 317, BuySlippageBelowMinTokensOut on 326; gross_up_quote header
  moved from 295-298 to 378-381 so 295-377 is module-level), routed from v3 buy_exact_quote (old lines 900-902 -> 1 call + 2 blank).
  Semantics (from disasm): creator_bps = creator==default?0:cbps; total=pbps.checked_add(creator_bps).ok_or(Overflow)?;
  net=(budget*10000/(10000+total)) as u64; require_gt!(net,0,6041)@317; pf=fee_math::fee(net,pbps)?; cf=fee(net,creator_bps)?;
  if net.sat_add(pf).sat_add(cf)>budget {net=net.checked_sub(excess(sat_sub)).ok_or(Overflow)?; require_gt!(net,0,6042)@326}
  Ok((net,pf,cf,pbps,cbps_raw)).
  nq0 (trade_v3's private `fee`, inlined) 0.62; nq5 (fee_math::fee) 0.765; nz1/nz3 (`if total_bps==0 {budget} else {muldiv}`) 0.866
  (original has total==0 and budget==0 shortcuts before the muldiv). nz4/nz5 (budget==0 guard) building.
