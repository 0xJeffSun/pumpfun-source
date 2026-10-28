# multiplex variants of update_metadata_authority: gen_mx.py <name> <key...>
import sys,gen_m2,os
U=gen_m2.UPD; C=gen_m2.CTX; OK=gen_m2.OK
S='signer'; SIG=' let signer:&[&[&[u8]]]=&[&[b"mint-authority",&[bump]]];'
T='OptionalNonZeroPubkey'
A2={
 'a':'{let r=%s::try_from(None);r?}'%OK,
 'b':'{let r=%s::try_from(None);r}?'%OK,
 'c':'%s::try_from(None)?.clone()'%OK,
 'e':'[%s::try_from(None)?][0]'%OK,
 'f':'(%s::try_from(None)?,).0'%OK,
 'g':'{let v=%s::try_from(None)?;v}'%OK,
 'i':'%s::try_from(None).map_err(|e|e)?'%OK,
 'k':'core::convert::identity(%s::try_from(None)?)'%OK,
 'l':'%s::try_from(None).or_else(|e|Err(e))?'%OK,
 'm':'{let r:core::result::Result<%s,ProgramError>=None.try_into();r?}'%OK,
 'n':'{let mut r=%s::try_from(None);r?}'%OK,
 'o':'{let r=&%s::try_from(None);(*r)?}'%OK,
}
name=sys.argv[1]; keys=sys.argv[2:]
gen_m2.make(name,{'ub':'u0','mb':'n2'})
d=f'{gen_m2.L}/var/{name}'; p=d+'/src/create_v2.rs'; t=open(p).read()
call="update_metadata_authority(bump,&(&a.token_program,&a.mint,&a.mint_authority))"
assert t.count(' '+call)==1
arms=''.join(f'{200+i}=>upd_{k}(bump,&(&a.token_program,&a.mint,&a.mint_authority)),' for i,k in enumerate(keys))
t=t.replace(' '+call,' match bump {'+arms+'_=>'+call+'}')
usig="fn %s<'info>(bump:u8,accounts:&(&Program<'info,Token2022>,&InterfaceAccount<'info,Mint>,&UncheckedAccount<'info>))->Result<()>{"
for k in keys:
    t+='#[inline(never)]\n'+(usig%('upd_'+k))+'\n'+SIG+'\n '+U+'('+(C%S)+','+A2[k]+')\n}\n'
open(p,'w').write(t); print('made',d,keys)
