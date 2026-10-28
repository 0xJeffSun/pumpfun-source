import re
L='/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work/mega/mg-M-o84c'
BASEROOT=L+'/roots/c1'   # c1 = cap-fixed base (3 masked)
HDR=open(L+'/tools/handler_c1.txt').read()
# the 11 if-native/scalar lets, in current order (0..10)
LETS=[
 "let quote_vault_balance=if native{a.sol_vault.lamports()}else{a.mayhem_quote_token_vault.amount};",
 "let state_quote_deployed=a.mayhem_state.field_56;",
 "let global_sol_deployed=if native{a.global_params.sol_deployed}else{0};",
 "let virtual_quote=a.bonding_curve.virtual_sol_reserves;",
 "let real_quote=a.bonding_curve.real_sol_reserves;",
 "let global_quote_deployed=if native{a.global_params.sol_deployed}else{a.global_params.stable_deployed};",
 "let sol_amount=if native{sol}else{0};",
 "let sol_vault_balance=if native{quote_vault_balance}else{0};",
 "let state_sol_deployed=if native{a.mayhem_state.field_56}else{0};",
 "let virtual_sol=if native{a.bonding_curve.virtual_sol_reserves}else{0};",
 "let real_sol=if native{a.bonding_curve.real_sol_reserves}else{0};",
]
OLD=" "+"".join(LETS)
def build(order):
    assert order.index(0)<order.index(7)  # sol_vault_balance needs quote_vault_balance
    new=" "+"".join(LETS[k] for k in order)
    assert HDR.count(OLD)==1, HDR.count(OLD)
    return HDR.replace(OLD,new)
VARIANTS=[]
base=list(range(11))
VARIANTS.append(('base', build(base), None))
for i in range(10):
    o=base[:]; o[i],o[i+1]=o[i+1],o[i]
    if o.index(0)<o.index(7):
        VARIANTS.append((f'swap{i}-{i+1}', build(o), None))
