import sys
D=sys.argv[1]+'/src/trade_v3.rs'; v=sys.argv[2]
l=open(D).read().split('\n')
def setl(n,old,new):
    assert old in l[n-1], (n,l[n-1][:80]); l[n-1]=l[n-1].replace(old,new)
if v=='X1':
    setl(381,'let gross=crate::transfer_fee_recovered::pre_fee_amount(quote_fee,net)?;','let gross=match crate::transfer_fee_recovered::pre_fee_amount(quote_fee,net){Ok(gross)=>gross,Err(e)=>return Err(e)};')
elif v=='X4':
    setl(373,'let second=match post{Some(p)=>add3(p.quote_in,p.fees.protocol_fee,p.fees.creator_fee)?,None=>0};','let second=if let Some(p)=post{add3(p.quote_in,p.fees.protocol_fee,p.fees.creator_fee)?}else{0};')
elif v=='X5':
    setl(365,"let (buyback,post_buyback)=if is_mayhem{(0,0)}else{(v3_buyback_split(protocol_fee,buyback_bps).0,match post{Some(p)=>v3_buyback_split(p.fees.protocol_fee,buyback_bps).0,None=>0})};",
         "let buyback=if is_mayhem{0}else{v3_buyback_split(protocol_fee,buyback_bps).0};let post_buyback=match post{Some(p) if !is_mayhem=>v3_buyback_split(p.fees.protocol_fee,buyback_bps).0,_=>0};")
elif v=='X6':
    setl(374,'let net=first.checked_add(second).and_then(|total|total.checked_sub(total_buyback))','let net=first.checked_add(second).and_then(|total|total.checked_sub(total_buyback))')
    setl(381,'let gross=crate::transfer_fee_recovered::pre_fee_amount(quote_fee,net)?;','let gross=crate::transfer_fee_recovered::pre_fee_amount(&quote_fee,net)?;')
elif v=='X7':
    setl(382,'let quote_transfer_fee=gross.checked_sub(net).ok_or_else(||error!(PumpError::Overflow))?;','let quote_transfer_fee=gross.checked_sub(net).ok_or_else(||error!(PumpError::Overflow));')
    setl(383,'Ok((gross,quote_transfer_fee))','Ok((gross,quote_transfer_fee?))')
open(D,'w').write('\n'.join(l)); print(v,'ok')
