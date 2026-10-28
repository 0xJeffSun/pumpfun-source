# mg-P-z02 PROGRESS (mega run, main Pump)
Start: delivery r5-z02-02 (912/165 on L12; baseline score = deliveries/r5-z02-02/score.json).
Work dir: claude-pump-work/lanes/mg-P-z02 (src/ = start src, exp/<name>/src experiments, work/w<slot> build dirs,
run.sh <exp> [slot] = build+score vs start baseline + ratios of my 3 windows, tools/ = copies of r5-z02 tools).
Windows: 0x3b8d8 extend_account body (5240 B), 0x34558 distribute_fee_to_holders body (14512 B),
0x2fa60 v2 token-distribution loop helper (6040 B; called by execute_v2 0x2d920 = mg-P-z01's window).
Prior notes: claude-pump-work/lanes/r5-z02/PROGRESS.md. Best partials there (not in start src):
  extend: variants/c6 extend_account.rs (get_account_size helper) 0.52; holders: variants/c7 distribute_fee_to_holders.rs 0.535.
Note: r5-z03-07 also edits extend_account.rs (fund_bonding_curve_rent at line 141) -> keep my extend_account.rs
compatible (execute body lines 12..~132, fund_bonding_curve_rent at 133..161) so mg-P-int can compose.

## Log
- 01:53 setup: src copied from r5-z02-02; tools copied; run.sh written.
- b0 (start + c6 extend + c7 holders): 912/165, extend 0.5214, holders 0.5346 (reproduces r5-z02 partials).
- e1 multiplexed 6 extend variants (gen/ext_mux.py + gen/ext_v1.py, remaining_accounts.len() dispatch): transfer helper over
  &AccountInfo/&Signer args 0.86; Rent+transfer helper 0.58; accounts-struct helper `transfer_lamports(&ExtendAccount, lamports)`
  with `if lamports>0 {transfer?}` = 5240 B, only line constants differ.
- e3 = clean (gen/ext_final.py: helper+execute at lines 25-68, get_account_size 83-110, sites 84/107) => 913/165 +0x3b8d8.
  DELIVERED deliveries/mg-P-z02-01 (behaviour check tools/refcmp.py: 19 lddw refs + 32 call targets agree). Lane src = e3.
- 02:1x L13 landed (962/165). f1 = L13 + my extend (lines 1-110 mine + L13 111-161 z03 fund_bonding_curve_rent) built with
  tools/nbuild.py (copy of mg-P-int's) => 963/165 +0x3b8d8 vs L13, no losses. DELIVERED deliveries/mg-P-z02-02 (base_round L13).
  From now on: lane tree = lanes/mg-P-z02/src13 (L13-based); run13.sh <exp> [slot] builds+scores vs L13.
- 0x34558 holders (L13 + h5 as exp/g0; multiplex gen/h_mux.py + gen/h_v*.py, dispatch on amounts.len()==1000+i):
  v1: `let recipient=&accounts[0];let amount=*amount;` before `if native` + [1] after the Option check = 0.5853 (frame now
  identical to the original). v3: token transfer via an inlined helper `transfer_tokens_X(&a.quote_token_program,
  &source.to_account_info() /*statement temp*/, &a.quote_mint, recipient_token_account, &a.holder_rewards, amount, &[seeds])?`
  with `if amount==0{return Ok(())}` + `TransferChecked{from:from.clone(),..}` = 14496 B (orig 14512), 0.6008 (best, exp/g3
  execute_i). Binary evidence: orig drops the from-clone AFTER transfer_checked and on the amount==0 path, seeds array and
  quote_mint box deref happen before the amount branch. `?`+Ok(()) inside the helper (o/r) = 14512 B exactly but 0.505.
  Residual: orig lays the amount==0 path inline (jne amount,0 -> transfer) with the loop latch tail-duplicated; ours puts
  the transfer path inline. Prologue spill choice and memcmp region also differ (RA).
- 0x2fa60 (v2 distribute_tokens): mg-P-z01-01 (L13, 963) MATCHED execute_v2 0x2d920 with an extracted distribute_tokens
  helper (orig call signature) -> exp/v0 = z01-01 src + my extend = 964/165. gen/dt_place.py places gen/dt_*.rs from line 335
  (sites 340/346/378). dt_a (creator_vault cloned once before the loop and passed as authority; transfers[i] between the two
  gets; ATA index transfers.len()+i): 0.22 -> 0.38 (6016 B vs 6040), frame identical. Residual: arg-spill order in the
  prologue, create-path block placement.

## STATUS (mega run, mg-P-z02)
Delivered: mg-P-z02-01 (913/165 on L12, +0x3b8d8), mg-P-z02-02 (963/165 on L13, +0x3b8d8; base_round L13). Lane tree = src13 (L13-based).
| window  | status | best | file / next |
|---------|--------|------|-------------|
| 0x3b8d8 | MATCHED (mg-P-z02-01 L12 / mg-P-z02-02 L13) | 1.0 | src13/src/extend_account.rs (lines 1-110 mine + L13 111-161 z03) |
| 0x2fa60 | partial 0.38 (frame matches) | exp/v1/src (dt_a, gen/dt_a.rs) | needs z01-01 composed first (execute_v2 helper); residual = arg-spill order + create-block placement. Build with run13.sh on exp/v0 (=z01-01+extend). |
| 0x34558 | partial 0.60 | exp/g3 execute_i (gen/h_v3.py var i) | residual = amount==0 skip inline + loop-latch tail-dup; 16-B/2-slot gap vs the `if amount>0` form (exact size, worse order). |
Most promising next: 0x34558 - find the 2-slot source of the size gap between the early-return (0.60, -16B) and `>0` (0.505, exact size) helper forms (likely an extra field load or clone the original keeps on the skip edge); reach exact size with the early-return block order.
