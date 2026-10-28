# r5-z05 PROGRESS (base L12 = 907/165)

## Identification (original callgraph, orig_full.s + callmap.py/callers.py in this dir)
pump_quote.rs (original order = source order):
- 0x60a80 depth(curve,&Global)->Result<u8> :61 checked_add Overflow, :62 require_gte!(max_curve_depth.min(5), depth, CurveDepthExceeded)
- 0x60ee0 root_seed(curve,g,control) :90 (calls control_entry 0x6a1e0) [not my window]
- 0x61348 initial_amount(seed,g)->Result<u128> :104/:106 [not my window]
- 0x617e8 final_reserves(amount u128,g)->Result<u64> :117 :119 :121 :122
- 0x62170 constant_product(base u64, quote u128, amount u128) :131 :134 :137 :139
- 0x62aa0 convert(&Record, amount) :199 :201 + closures 0x63530(:212) 0x63738(:222)
- 0x63940 price(seed, &[Record], g) :241 (calls 0x61348, 0x62aa0 per record rev, 0x617e8)
- 0x63cf0 parse_pool(data) :279 :280 (calls read_pubkey 0x64358 x2 with &data[..211]) [not my window]
- 0x64358 read_pubkey(data, offset)->Result<Pubkey> :307 InvalidQuotePool
- 0x645f8 adjusted_quote(u64, i128)->Result<u128> :334 (single Overflow site)
- 0x64888 vault_amount(owner, data)->Result<u64> :365 :366 :371 :372 :378
- 0x65238 validate_pool(&View pool, expected, &View base, &View quote) :406 :407 :410 :415
- 0x65eb0 pool_record(pool, expected, base, quote AccountInfos): 3 borrows then validate_pool [not my window]
- caller of all: walk 0x18678 (create_v2.rs:390..473) [not my window]
multi_hop_curve_swap.rs:
- 0x567d8 handler (per-hop loop, CurveHop::try_accounts) -> 0x5b3b0 hop body (18.5KB, :484..:686)
- 0x5b3b0 -> 0x58668 x2 (token program select), 0x5a260 x2 (transfer_checked CPI builder, anchor_spl::token_2022::transfer_checked),
  0x58f58 x1 (native: transfer_native, invoke_signed, invoke ... = native buyback path)
- 0x58668 token_program_for(token_program, token_2022_program, mint) -> Result<AccountInfo>: mint.to_account_info().owner;
  ==token_2022 -> clone token_2022_program; ==token -> clone token_program; else AccountTypeNotSupported(6010) :359

## Status
- MATCHED (delivered r5-z05-01, 913): 0x60a80, 0x62170, 0x63940, 0x645f8, 0x65238 (+0x65eb0 peer window)
- g1_3: +0x61348 (initial_amount: `let amount = numerator.checked_div(difference).ok_or_else(..DivisionByZero)?; Ok(amount)`)

## Key mechanism
pub mod pump_quote + pub fn => no inlining into single caller (t1 private: only +2; t2 pub: +6).
u128 subtraction `(a as u128).checked_sub(b as u128)` reproduces the original's `neg64 borrow` high word (f1, f2, convert).

## Experiments
- t1 private fns: 908 (+0x62170 +0x645f8, -0x63530)
- t2 pub mod + pub fn: 913 (+6, no losses) -> delivered 01
- t3 u128 subtractions: 913; final_reserves 0.87 similar (load order virt/real swapped; try_from error block placement)
- g1 (slot variants F1/F2/CONV/PARSE/READ/VAULT, generator gen/g1.py + gen/base.tpl): see below
- g1 (4 variants): F1 alt3 (checked_div + ? + Ok) matched 0x61348; F2 alt2/3 0.9965 (only load order); READ alt2 0.93; VAULT contains 0.934
- g2: F2 `let real; let virt;` order + checked_div => 0x617e8 MATCH; READ alt3 ([u8;32] via get(offset..offset.wrapping_add(32)).and_then(try_into.ok)) => 0x64358 MATCH
- mh_a2: token_program_for nested #[inline(never)] fn at multi_hop_curve_swap.rs:359 => 0x58668 MATCH
- delivered r5-z05-02 (916), r5-z05-03 (917)
- g3: CONV `if remainder > 1 {pool leg; return} Ok(rt)` => 0.968 (only remaining diff: :199 checked_sub branch is jlt+ja vs original jge);
  VAULT iter().any(|id| owner == id) 0.943 (array constant instead of direct token::ID refs; data[165] check block placed cold)
- g4: VAULT `[&token::ID,&token_2022::ID].iter().any(|id| owner == *id)` + `if data.len()==165 {return Ok(amount)}` before require_eq at :378 => 0x64888 MATCH -> delivered r5-z05-04 (918)
- g4/g5/g6: CONV :199 forms tried (ok_or_else closure, let-else, match, ok_or eager(worse), separate let, if vt<rt return, require!(vt>=rt)+sub,
  numerator after check(worse), rt as u128 >= output, u128::from, checked_mul numerator): best stays 0.9679 with only diff
  `jlt r6,r1,+1; ja +0x27` (candidate) vs `jge r6,r1,+0x27` (original) at the :199 check (+1 instr => all later ja offsets +1).
- PARSE (0x63cf0, peer window): header via data.get(..211).ok_or_else(..)? at :279 => 0.80 (g5_1); keys-before-adjustment 0.57; copy_from_slice adj 0.67
- multi_hop 0x5a260: identified as token input transfer helper: transfer_input(a, previous: Option<&PreviousHop>, token_program: &AccountInfo,
  to: &AccountInfo, decimals: u8, mint: &AccountInfo, amount) using anchor_spl::token_2022::transfer_checked(CpiContext::new[_with_signer](
  program.clone(), TransferChecked{from, to, authority, mint} (literal order = clone order)), amount, decimals); None branch first.
  mh2a (if-let Some first, key()): 0.31 (4408B vs 4432B); mh2b (key refs) 0.18.
- multi_hop 0x58f58: native buyback: amount==0 -> Ok; to = buyback_fee_recipient clone; curve info clone; trade::quote_payments::transfer_native(curve, to.clone(), amount);
  invoke_signed(event self-CPI [event_authority ro signer, curve w, to w], data e445a52e51cb9a1d, seeds __event_authority+bump); sync_native invoke. (mh3)
