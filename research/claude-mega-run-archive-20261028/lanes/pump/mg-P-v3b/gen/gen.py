#!/usr/bin/env python3
"""gen.py <base trade_v3.rs> <handler template> <out trade_v3.rs> [--fee-exempt-line N]
Applies the v3 quote-fee type changes and splices the buy_exact_quote template into lines 872..1025 (line-neutral).
Template lines starting with @N must land on line N; others are placed sequentially; gaps are filled with blank lines."""
import sys,re
base,tmpl,out=sys.argv[1:4]
L=open(base).read().split('\n')
def rep(lineno,old,new):
    s=L[lineno-1]
    assert s.count(old)==1,(lineno,old,s[:120])
    L[lineno-1]=s.replace(old,new)
FEE='&Option<native_transfer_fee::Fee>'
# gross_up_quote (closure must stay on 382)
assert L[379].startswith('fn gross_up_quote(')
L[379]='fn gross_up_quote(quote_fee:'+FEE+',net:u64)->Result<(u64,u64)>{'
assert 'let gross=' in L[380]
L[380]='    let gross=crate::transfer_fee_recovered::pre_fee_amount(quote_fee,net)?;'
assert 'gross.checked_sub(net)' in L[381]
rep(421,'quote_fee:&Option<(u64,u64,u64)>','quote_fee:'+FEE)
rep(427,'gross_up_quote(quote_fee,false,net)','gross_up_quote(quote_fee,net)')
rep(601,'quote_fee:&Option<(u64,u64,u64)>','quote_fee:'+FEE)
rep(689,'quote_fee:&Option<(u64,u64,u64)>','quote_fee:'+FEE)
rep(725,'quote_post_fee_amount(quote_fee,total)','crate::transfer_fee_recovered::post_fee_amount(quote_fee,total)')
rep(726,'quote_post_fee_amount(quote_fee,post_buyback)','crate::transfer_fee_recovered::post_fee_amount(quote_fee,post_buyback)')
rep(803,'let quote_fee=quote_fee.map(|f|(f.epoch,f.maximum_fee,f.basis_points as u64));','')
assert L[1283].startswith('#[inline(always)] fn quote_post_fee_amount(')
L[1283]=''
# fee-exempt helper on a blank pad line
fe=None
for a in sys.argv[4:]:
    if a.startswith('--fee-exempt-line='): fe=int(a.split('=')[1])
if fe:
    assert L[fe-1].strip()=='',(fe,L[fe-1])
    L[fe-1]='#[inline(always)] fn v3_fee_exempt(global:&Global,curve:&BondingCurve,user:&Pubkey)->bool{curve.is_mayhem_mode || *user==global.whitelist_pda}'
# v3_emit_buy restructure (--emit=E1): post event built after the Trade/Complete emits, no clones
EMIT={
 'E1':['    let ctx=EvCtx{accounts:EvAccounts{event_authority:&a.event_authority},bumps:EvBumps{event_authority:event_authority_bump}};',
       '    emit!(event);emit_cpi!(event);',
       '    if a.bonding_curve.real_token_reserves==0{a.bonding_curve.complete=true;',
       '        let completion=crate::trade_types::CompleteEvent{user:a.user.key(),mint:a.base_mint.key(),bonding_curve:a.bonding_curve.key(),timestamp,quote_mint:a.bonding_curve.quote_mint};',
       '        emit!(completion);emit_cpi!(completion);}',
       '    if let Some(p)=post{let post_event=post_complete_buy_event(p,a.user.key(),a.base_mint.key(),a.bonding_curve.key(),a.bonding_curve.quote_mint,timestamp,post_buyback_fee)?;',
       '        emit!(post_event);emit_cpi!(post_event);}'],
}
for a in sys.argv[4:]:
    if a.startswith('--emit='):
        k=a.split('=')[1]
        assert L[546].startswith('    let completion=if a.bonding_curve.real_token_reserves==0') and L[552].startswith('    if let Some(post_event)=post_event'),L[546][:40]
        L[546:553]=EMIT[k]
# handler splice
assert L[871].startswith('pub fn buy_exact_quote('), L[871][:60]
assert L[1024]=='}' and L[1026].startswith('pub fn sell('), (L[1024],L[1026][:30])
T=[l for l in open(tmpl).read().split('\n')]
while T and T[-1]=='': T.pop()
lines=[]; cur=872
for t in T:
    m=re.match(r'^@(\d+)(.*)$',t)
    if m:
        n=int(m.group(1)); assert n>=cur,('anchor too early',n,cur,t[:60])
        lines+=['']*(n-cur); cur=n; t=m.group(2)
    lines.append(t); cur+=1
assert cur-1<=1025,('handler too long',cur-1)
lines+=['']*(1025-(cur-1))
assert len(lines)==1025-872+1
L[871:1025]=lines
open(out,'w').write('\n'.join(L))
print('ok handler ends at',cur-1)
