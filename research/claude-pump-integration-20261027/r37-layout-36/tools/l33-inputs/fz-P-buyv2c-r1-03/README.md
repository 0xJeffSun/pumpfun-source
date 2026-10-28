# fz-P-buyv2c-r1 deliveries (base L31, 991/1035, raw 166, +0x173d8, 0 losses; cumulative)

Change: programs/pump/src/buy_v2.rs, buy_exact_quote_in_handler only (generators: lanes/fz-P-buyv2c-r1/gen/p1.py then gen/p3.py).

Binary evidence (original 0x13f630, read with harness win.py/coords.py):
- calls in order: post_fee_amount; require available>0 (E6041 line 873); memcmp(user, global.whitelist_pda) -> whitelist branch calls
  constant_product::tokens_for_quote(curve, available) + Truncation closure 0x16fc8 (line 881);
  else fee_cpi::trade_fees, memcmp(creator, default), pbps+cb checked_add (Error::from Overflow), if total_bps==0 raw=available
  else __multi3/__udivti3 (available*10000/(10000+total_bps)), E6041 line 907, fee_math::fee(raw,pbps), creator memcmp + fee(raw,cbps),
  saturating adds, if total>available: raw - saturating_sub (Error::from Overflow), E6042 line 921; tokens_for_quote + closure 0x171d0 (line 927).
- 0x173d8 (line 949, called 3x) = pre_fee_amount(&transfer_fee, quote)? then two checked adds -> error!(Overflow) line 949; returns (gross,total).
- amount>real_token_reserves && partial: buy_quote(curve, real_token_reserves) + closure 0x176d8 (959), fee x2, 0x173d8, with_values E6002 line 967.
- else 0x173d8; if total>input: quote - saturating_sub(total,input) (Error::from 6041), E6042 line 979, tokens_for_quote + closure 0x178e0 (983), 0x173d8;
  then require_gte amount>=limit E6042 line 986.
- gross<quote -> closure 0x17ae8 (line 995, Overflow); real_token_reserves<amount -> E6021 line 997 (immediate 0x3e5); then BondingCurve::apply_buy(amount, quote).
-03 (same windows, closer handler; generators gen/p5 p6(b) p8 p9 p10(a) p12 p13(B) p14(A) + inline edits recorded in PROGRESS): recipient transfers as two straight calls; event inputs bound right before the TradeEvent literal in the original's load order (curve reserves/creator/quote_mint snapshot, Clock::get, user-volume fields, shareholders via cloned AccountInfo, is_sol test); &a.fee_recipient/&a.buyback_fee_recipient bound at entry; first fee readjust as let mut + if; signer seeds inline in the transfer_curve_tokens call; require_gt!(input) on line 771 (original line immediate 0x303); quote mint/program AccountInfo clones scoped to the admission calls (closed before get_transfer_fee); literal starts user,mint and puts holder_rewards before creator_fee. buy_v2.rs keeps L31's 1050 lines (-01/-02 had 4 extra blank lines after the last Source site). Stack frame offsets now equal the original's; remaining diff is mostly a callee-saved register permutation (orig ret=r6 tag=r7 accts=r8, ours r8/r6/r7).
