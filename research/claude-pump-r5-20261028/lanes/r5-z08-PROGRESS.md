# r5-z08 progress (base L12 = 907/165)

Tools: tools/ocalls.py <win> (original calls + names), tools/callers.py <addr> [so], tools/st.py a,b,c (window status), tools/deliver.py.

## Deliveries
- r5-z08-01: 909/165, gains 0x94e28, 0x95360. Separate crate `pump-token-fee` (native_fee/) for Fee helpers.

## Windows
- 0x94e28 transfer_fee.rs calculate_fee (line 48): MATCHED (r5-z08-01). Mechanism: callee in separate crate -> copy not elided.
- 0x95360 pre_fee_amount (line 66): MATCHED as side effect (not my window).

## Window identification (round 1)
- 0x94908 = util/transfer_fee.rs `get_transfer_fee(mint)->Result<Option<Fee>>` (line 31 map_err UnsupportedQuoteMint):
  owner!=token_2022 -> Ok(None); try_borrow_data; native TLV parser 0x17c850 (in the separate crate); Clock::get()? ALWAYS
  (even when no config); per-field select newer/older by epoch. Implemented (transfer_fee.rs lines 24-34; parser
  `get_transfer_fee_config` in native_fee crate; trade_v3 quote_fee_snapshot now delegates to it).
  Remaining diff (variant t1 = by-value select `if epoch>=c.newer.epoch{c.newer}else{c.older}`): ONLY the Ok(None) early
  return: original stores all 4 words zero ([r6+0x18],[0x10],[8],[0]=0), ours stores the tag only. Tried: return Ok(None),
  Ok(Default::default()), *owner!= form, Option::<Fee>::None.map(..), if/else expression (worse) - in flight: const NO_FEE.
- 0x89258 = trade_fees (CPI get_fees_with_quote_mint + return data + fee()): uses buy_fee_market_cap (0xa08f8; the
  local legacy market_cap duplicate was removed). Building the CpiContext INSIDE the call args (ctx temp in the arg slot,
  dropped on market-cap error) removed the 0xb8 memcpy: ratio 0.29 -> 0.50. Remaining: creator_fee_bps selection is
  computed before fee() with branches in the original (we select after); Ok tag phi; spill slots.
- 0x8eda0 = multi_hop_curve_swap transfer helper: anchor_spl token_2022::transfer_checked with new_with_signer, seeds
  array len 1; args (program:&AccountInfo [caller local], from:&<wrapper,&AccountInfo at 0> [accounts+0x20 inline field],
  to:&InterfaceAccount<TokenAccount> [Box at accounts+0x30], authority:&<wrapper>, decimals:u8 [mint.decimals],
  mint:&AccountInfo [mint InterfaceAccount info], amount, seeds). TransferChecked literal order from,to,authority,mint.
  Only caller = multi-hop handler 0x5b3b0 (lane z05) - candidate multi-hop uses a hand-built spl ix instead. Not attempted.
- 0x8bbd0 = event/record builder (Vec clone + memcmp vs default) called from multi-hop 0x5b3b0 and sell_v3 0x14a8a8. Not attempted.
- 0xcd3d8 = SetMayhemVirtualParams::try_accounts. Original calls Program<T>::try_accounts for token_program (we use
  Interface + address constraint). Variant m1 (Program<Token2022>) in flight.
- 0x1367c0 = set_params handler (lib.rs 222-278). Original calls a separate fee-recipient validator 0x3e550
  (fee_recipient.rs lines 47/60/78, lane z03's window) instead of the inline loop -> blocked on z03.
- 0x138b20 = create handler (lib.rs 334). Original: require_keys_neq(creator) then FULL BondingCurve struct assignment
  before any CPI (vqr = if quote_mint(default)==default {g.initial_virtual_sol_reserves} else {g.initial_virtual_quote_reserves},
  an uncollapsed memcmp of two zero pubkeys), then 3 String clones for DataV2, metadata CPI, mint_to, set_authority,
  event without clones (emit!(event) by ref). Candidate (0.23) sets curve fields after CPIs and clones strings for the event.
- 0x13b9b8 = buy_v2 handler (buy_v2.rs 345..494). Not attempted yet.

## Round-1 experiment log (continued)
- 0x94908: MATCHED via `const NO_FEE:Option<Fee>=None; return Ok(NO_FEE);` (A_z1) -> delivered r5-z08-02 (910).
- 0x89258 trade_fees: e03 buy_fee_market_cap (no change 0.29) ; e04 ctx built in call args (0.50) ; f1 nested-if creator
  bps (0.59) ; f2 reversed creator!=default (0.51 on e04) ; f3 `let mut creator_fee_bps=fees.creator_fee_bps; if
  global.creator_fee_configurable && curve.creator_fee_bps>0 {creator_fee_bps=curve.creator_fee_bps;}` -> 0.892 (main src).
  Remaining (f3): Ok/Err tag store not merged (orig: r7=0 early + shared `stxdw [r8],r7`), r6/r9 swapped (quote_amount vs
  creator bps), protocol-fee error branch polarity (orig jne r1,2 -> err). In flight: g1 (f3+reversed creator cond), g3 (f3+return Ok).
- 0xcd3d8 mayhem try_accounts: m1 token_program: Program<'info,Token2022> (orig calls Program::try_accounts) 0.49->0.51
  (applied to main). Remaining: nearly all stack offsets 0x20 deeper in the original (one extra/unmerged 32-byte alloca
  somewhere above -0x88), plus 2 copies of the Program result at -0x100/-0xe0 (ours -0xe0/-0xc0).
- 0x138b20 create: c1 = curve init (all fields except complete/creator_fee/protocol_fees; bools from candidate offsets:
  T+0x99 complete, +0x9a is_mayhem) BEFORE CPIs with quote_mint==default select, update_authority_is_signer=true
  (BEHAVIOUR FIX: original passes true, candidate passed false), emit!(event) without clone.
- 0x1367c0 set_params: wrote fee_recipient.rs `set_fee_recipients(&mut Context<SetParams>)->Result<[Pubkey;8]>` (lines
  47 require_gte NotEnoughRemainingAccounts, 60 require all non-zero, Rent::get, try_data_len()? is_exempt loop with
  Error::from(ConstraintRentExempt).with_account_name(format!), 78 sorted check, stores global.fee_recipient(s), returns
  array) = original 0x3e550 (z03's window, not started by z03). In flight (J_c1sp1).
- trade_fees: g3 (`return Ok((..));`) -> 0.986 (only 2 branch polarities differ); h1 (`if curve.creator != default {fee(..)?} else {0}`)
  fixes the creator-fee branch (0.973 incl. +1 insn, protocol-fee `?` still `jeq +1; ja err` vs orig `jne err`). h4 (match on
  protocol fee) 0.948 worse. In flight: p7 (bind protocol_fee_bps), p8 (protocol fee before creator-bps selection), h5.
- create: c2 (struct-update `***curve=BondingCurve{..,..***curve}`) -> temp + 0x40 memcpy (0.24); c3 (`let curve:&mut
  BondingCurve=&mut a.bonding_curve;` field stores, no per-store Box reload) -> init block matches except order (0x50 before
  0x88) and Box ptr loaded late. c4 (curve borrowed first, vqr store then ivqr, metadata_data before bump/seeds) in flight.
- set_params: sp3 (global stores interleaved right after each check, as orig) 0.51->0.55; sp4 = original formula
  final_real_sol_reserves = irtr*ivsr/(ivtr-irtr) (== old (ivtr*ivsr)/(ivtr-irtr)-ivsr exactly) in flight.
- 0x8eda0: mh1 = `transfer_quote_out(&program,&UncheckedAccount from,&InterfaceAccount<TokenAccount> to,&Account<BondingCurve>,
  decimals,&AccountInfo mint,amount,&[&[&[u8]];1])` (anchor token_2022::transfer_checked, new_with_signer) used for the
  last-hop SELL payout (quote vault -> destination) in multi_hop; program chosen by quote mint owner. In flight.
- trade_fees more: p7 (bind protocol_fee_bps) =h1, p8 (protocol fee before selection) =h1, p10 (tuple let) =h1, p11 (fees inside
  return tuple) =h1, p14 (block-scoped selection) 0.954 worse, p17 (`let x=fee(..); x?`) 0.62 worse, h5 (let in else, g3 basis)
  =g3. Protocol-fee `?` stays `jeq r1,2,+1; ja err` (orig `jne r1,2,err`). Best: g3 0.9857 (equal length) / h1 0.9732 (main).
- set_params: sp5 `require_keys_neq!(withdraw_authority, anchor_lang::system_program::ID, ..)` (orig memcmps against a rodata
  zero const, and the msg says "System Program ID"); sp6 emit!(event) without clone; K_c5 (sp1..sp6) -> 0.897, EXACT length
  5624. Remaining there: with_values for the two `require_gte!(1000, x)` (orig passes r4=0x3e8,r5=x to the SAME with_values
  as line 270 => the literal was u64-typed; ours `1000` in the tuple defaults to i32 -> separate, const-propagated instance)
  -> sp7 `1000u64` in flight; plus r8/r9 swaps.
- create: c5 (strings cloned first via let name_c..; DataV2 literal inside the call) 0.29; c6 (seeds inline per CPI
  `&[&[b"mint-authority",&[ctx.bumps.mint_authority]]]`, as orig rebuilds them for each CPI) in flight.
- validator 0x3e550: 0.39; block order differs (orig places the line-47/60 error blocks before the Rent loop). sp8 (for-loop
  require), sp9 (!contains) in flight.
