FIELDS = [
 ('mint','*mint'),('sol_amount','if is_sol{quote_amount}else{0}'),('token_amount','token_amount'),('is_buy','is_buy'),('user','*user'),('timestamp','timestamp'),
 ('virtual_sol_reserves','if is_sol{virtual_quote_reserves}else{0}'),('virtual_token_reserves','curve.virtual_token_reserves'),
 ('real_sol_reserves','if is_sol{real_quote_reserves}else{0}'),('real_token_reserves','curve.real_token_reserves'),
 ('fee_recipient','Pubkey::default()'),('fee_basis_points','fees.2'),('fee','fees.0'),('creator','curve.creator'),('creator_fee_basis_points','fees.3'),('creator_fee','fees.1'),
 ('track_volume','false'),('total_unclaimed_tokens','volume.total_unclaimed_tokens'),('total_claimed_tokens','volume.total_claimed_tokens'),
 ('current_sol_volume','volume.current_sol_volume'),('last_update_timestamp','volume.last_update_timestamp'),('ix_name','ix_name.to_string()'),
 ('mayhem_mode','curve.is_mayhem_mode'),('cashback_fee_basis_points','0'),('cashback','0'),
 ('buyback_fee_basis_points','if curve.is_mayhem_mode{0}else{global.buyback_basis_points}'),('buyback_fee','buyback_fee'),('shareholders','vec![]'),
 ('quote_mint','curve.quote_mint'),('quote_amount','quote_amount'),('virtual_quote_reserves','virtual_quote_reserves'),('real_quote_reserves','real_quote_reserves'),
 ('holder_rewards_bps','if curve.is_holder_reward{fees.3}else{0}'),('holder_rewards','if curve.is_holder_reward{fees.1}else{0}'),
 ('creator_fee_unclaimed','curve.creator_fee'),('unparsed_trailing_field','unparsed_trailing_field'),
]
def lit(fields): return 'TradeEvent{' + ','.join(f'{k}:{v}' if k != v else k for k, v in fields) + '}'
LET_A = "let real_quote_reserves=curve.real_quote_reserves;let virtual_quote_reserves=curve.virtual_quote_reserves;"
LET_B = "let virtual_quote_reserves=curve.virtual_quote_reserves;let real_quote_reserves=curve.real_quote_reserves;"
QM = "let quote_mint=curve.quote_mint;let is_sol=quote_mint==Pubkey::default();"
VARIANTS = {
 'a0': LET_A + QM + lit(FIELDS),
 'b0': LET_B + QM + lit(FIELDS),
}
def F(**ov):
    return [(k, ov.get(k, v)) for k, v in FIELDS]
QM2 = "let is_sol=curve.quote_mint==Pubkey::default();"
VARIANTS = {
 'b0': LET_B + QM + lit(FIELDS),
 'c1': LET_B + QM + lit(F(quote_mint='quote_mint')),
 'c3': LET_B + QM2 + lit(FIELDS),
 'c4': "let quote_mint=curve.quote_mint;" + LET_B + "let is_sol=quote_mint==Pubkey::default();" + lit(F(quote_mint='quote_mint')),
 'c5': LET_B + QM + lit(F(quote_mint='quote_mint', creator_fee_unclaimed='curve.creator_fee')),
 'c6': LET_B + "let quote_mint=curve.quote_mint;let is_sol=quote_mint==Pubkey::default();let mint=*mint;let user=*user;" + lit(F(quote_mint='quote_mint', mint='mint', user='user')),
}
ORIG_ORDER = ['is_buy','token_amount','mint','sol_amount','real_token_reserves','real_sol_reserves','virtual_token_reserves','virtual_sol_reserves','timestamp','fee','fee_basis_points','user','fee_recipient','creator','last_update_timestamp','current_sol_volume','total_claimed_tokens','total_unclaimed_tokens','ix_name','creator_fee','creator_fee_basis_points','mayhem_mode','track_volume','cashback','cashback_fee_basis_points','buyback_fee','buyback_fee_basis_points','shareholders','quote_mint','unparsed_trailing_field','creator_fee_unclaimed','holder_rewards','holder_rewards_bps','real_quote_reserves','virtual_quote_reserves','quote_amount']
D = dict(FIELDS)
VARIANTS = {
 'b0': LET_B + QM + lit(FIELDS),
 'd1': LET_B + QM + lit(list(reversed(FIELDS))),
 'd2': LET_B + QM + lit([(k, D[k]) for k in ORIG_ORDER]),
 'd3': LET_B + QM + lit([(k, D[k]) for k in reversed(ORIG_ORDER)]),
}
SELS = "let sol_amount=if is_sol{quote_amount}else{0};let virtual_sol_reserves=if is_sol{virtual_quote_reserves}else{0};let real_sol_reserves=if is_sol{real_quote_reserves}else{0};"
HR = "let holder_rewards_bps=if curve.is_holder_reward{fees.3}else{0};let holder_rewards=if curve.is_holder_reward{fees.1}else{0};"
BB = "let buyback_fee_basis_points=if curve.is_mayhem_mode{0}else{global.buyback_basis_points};"
IX = "let ix_name=ix_name.to_string();"
def G(*names): return F(**{n: n for n in names})
VARIANTS = {
 'b0': LET_B + QM + lit(FIELDS),
 'e5': LET_B + QM + SELS + lit(G('sol_amount','virtual_sol_reserves','real_sol_reserves')),
 'e6': LET_B + QM + HR + lit(G('holder_rewards_bps','holder_rewards')),
 'e7': LET_B + QM + BB + lit(G('buyback_fee_basis_points')),
 'e8': LET_B + QM + SELS + HR + BB + lit(G('sol_amount','virtual_sol_reserves','real_sol_reserves','holder_rewards_bps','holder_rewards','buyback_fee_basis_points')),
 'e9': LET_B + QM + IX + lit(G('ix_name')),
 'e10': IX + LET_B + QM + lit(G('ix_name')),
 'e11': LET_B + QM + "let mut event=" + lit(FIELDS) + ";event.quote_mint=quote_mint;event",
}
def MOVE(name, pos):
    fl = [f for f in FIELDS if f[0] != name]; item = [f for f in FIELDS if f[0] == name][0]
    fl.insert(pos if pos >= 0 else len(fl) + 1 + pos, item); return fl
VARIANTS = {
 'b0': LET_B + QM + lit(FIELDS),
 'g1': LET_B + QM + lit(MOVE('quote_mint', -1)),
 'g2': LET_B + QM + lit(MOVE('quote_mint', 0)),
 'g3': LET_B + QM + lit(MOVE('quote_mint', 21)),
 'g4': LET_B + QM + lit(MOVE('quote_mint', 22)),
 'g5': LET_B + QM + lit(MOVE('creator', -1)),
 'g6': LET_B + QM + lit(MOVE('mint', -1)),
 'g7': LET_B + QM + lit(MOVE('ix_name', -1)),
 'g8': LET_B + QM + lit(MOVE('ix_name', 0)),
}
G2 = MOVE('quote_mint', 0)
def SUB(fl, **ov): return [(k, ov.get(k, v)) for k, v in fl]
def MV(fl, name, pos):
    fl = list(fl); item = [f for f in fl if f[0] == name][0]; fl.remove(item); fl.insert(pos, item); return fl
VARIANTS = {
 'g2': LET_B + QM + lit(G2),
 'h1': LET_B + QM + lit(SUB(G2, quote_mint='quote_mint')),
 'h2': LET_A + QM + lit(G2),
 'h3': LET_B + QM + lit(MV(G2, 'quote_mint', 1)),
 'h4': LET_B + QM + lit(MV(G2, 'creator', 1)),
 'h7': QM + LET_B + lit(G2),
 'h8': QM + LET_A + lit(G2),
 'h9': LET_B + QM + lit(MV(MV(G2, 'quote_amount', 1), 'virtual_quote_reserves', 2)),
}
