import sys
D=sys.argv[1]+'/src/trade_v3.rs'; var=sys.argv[2] if len(sys.argv)>2 else 'a'
l=open(D).read().split('\n')
def L_(n): return l[n-1]
# blank z09 v3_buy_costs (420-429)
assert L_(420)=='#[inline(never)]' and L_(421).startswith('fn v3_buy_costs(') and L_(429)=='}'
for n in range(420,430): l[n-1]=''
l[420-1]="fn snapshot_fee(s:&Option<(u64,u64,u64)>)->Option<native_transfer_fee::Fee>{s.map(|(epoch,maximum_fee,basis_points)|native_transfer_fee::Fee{epoch,maximum_fee,basis_points:basis_points as u16})}"
for n in range(363,378): assert L_(n)=='', (n,L_(n))
F='native_transfer_fee::Fee'
body={363:'#[inline(never)]',
364:f'fn v3_buy_costs(buyback_bps:u64,is_mayhem:bool,quote_fee:&Option<{F}>,quote:u64,protocol_fee:u64,creator_fee:u64,post:Option<&PostComplete>)->Result<(u64,u64,u64)>{{',
365:'    let (buyback,post_buyback)=if is_mayhem{(0,0)}else{(v3_buyback_split(protocol_fee,buyback_bps).0,match post{Some(p)=>v3_buyback_split(p.fees.protocol_fee,buyback_bps).0,None=>0})};',
371:'    let total_buyback=buyback.checked_add(post_buyback).ok_or_else(||error!(PumpError::Overflow))?;',
372:'    let first=add3(quote,protocol_fee,creator_fee)?;',
373:'    let second=match post{Some(p)=>add3(p.quote_in,p.fees.protocol_fee,p.fees.creator_fee)?,None=>0};',
374:'    let net=first.checked_add(second).and_then(|total|total.checked_sub(total_buyback))',
375:'        .ok_or_else(||error!(PumpError::Overflow))?;',
376:'    let (pool_quote,quote_transfer_fee)=gross_up_quote(quote_fee,net)?;',
377:'    Ok((pool_quote,total_buyback,quote_transfer_fee)) }'}
for n,x in body.items(): l[n-1]=x
assert L_(380).startswith('fn gross_up_quote(') and L_(381).startswith('    let gross=add(net,if is_sol')
l[380-1]=f'fn gross_up_quote(quote_fee:&Option<{F}>,net:u64)->Result<(u64,u64)>{{'
l[381-1]='    let gross=crate::transfer_fee_recovered::pre_fee_amount(quote_fee,net)?;'
k=[i for i,x in enumerate(l) if 'v3_buy_costs(a.global.buyback_basis_points,a.bonding_curve.is_mayhem_mode,&quote_fee,' in x]; assert len(k)==1
l[k[0]]=l[k[0]].replace('a.bonding_curve.is_mayhem_mode,&quote_fee,','a.bonding_curve.is_mayhem_mode,&snapshot_fee(&quote_fee),')
k=[i for i,x in enumerate(l) if 'gross_up_quote(&quote_fee,is_sol,net_pool_quote)?' in x]; assert len(k)==1
l[k[0]]=l[k[0]].replace('gross_up_quote(&quote_fee,is_sol,net_pool_quote)?','gross_up_quote(&snapshot_fee(&quote_fee),net_pool_quote)?')
open(D,'w').write('\n'.join(l)); print('ok')
