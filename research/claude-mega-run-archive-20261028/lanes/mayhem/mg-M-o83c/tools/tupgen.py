"""Tuple-form event lets generator. sol(order) / quote(order) build the two tuple lets from key orders."""
SOLV={'sa':('sol_amount','sol','0'),'svb':('sol_vault_balance','a.sol_vault.lamports()','0'),
      'ssd':('state_sol_deployed','a.mayhem_state.field_56','0'),'vs':('virtual_sol','a.bonding_curve.virtual_sol_reserves','0'),
      'gsd':('global_sol_deployed','a.global_params.sol_deployed','0'),'rs':('real_sol','a.bonding_curve.real_sol_reserves','0')}
QV={'qvb':('quote_vault_balance','sol_vault_balance','a.mayhem_quote_token_vault.amount'),
    'sqd':('state_quote_deployed','state_sol_deployed','a.mayhem_state.field_56'),
    'vq':('virtual_quote','virtual_sol','a.bonding_curve.virtual_sol_reserves'),
    'gqd':('global_quote_deployed','global_sol_deployed','a.global_params.stable_deployed'),
    'rq':('real_quote','real_sol','a.bonding_curve.real_sol_reserves')}
QM='let quote_mint=if native{Pubkey::default()}else{a.quote_mint.key()};'
def tup(D,order):
    ks=order.split(',')
    return 'let ('+','.join(D[k][0] for k in ks)+')=if native{('+','.join(D[k][1] for k in ks)+')}else{('+','.join(D[k][2] for k in ks)+')};'
def line(sol,quote,qm_first=False):
    return (QM if qm_first else '')+tup(SOLV,sol)+tup(QV,quote)+('' if qm_first else QM)
