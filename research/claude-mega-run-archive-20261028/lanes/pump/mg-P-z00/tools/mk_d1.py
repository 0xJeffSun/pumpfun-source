import gen13,sys
OKT=gen13.OK
ACC="&(&Program<'info,Token2022>,&InterfaceAccount<'info,Mint>,&UncheckedAccount<'info>)"
CTXs="CpiContext::new_with_signer(accounts.0.to_account_info(),anchor_spl::token_2022_extensions::TokenMetadataUpdateAuthority{program_id:accounts.0.to_account_info(),metadata:accounts.1.to_account_info(),current_authority:accounts.2.to_account_info(),new_authority:accounts.1.to_account_info()},signer)"
UPD="anchor_spl::token_2022_extensions::token_metadata_update_authority"
HELP=("#[inline(always)]\nfn revoke_update_authority<'info>(accounts:%s,signer:&[&[&[u8]]])->Result<()>{\n %s(%s,%s::try_from(None)?)\n}\n"%(ACC,UPD,CTXs,OKT))
gen13.UB['g2']=lambda S:[' revoke_update_authority(accounts,&[&[b"mint-authority",&[bump]]])']
if __name__=='__main__':
    name=sys.argv[1] if len(sys.argv)>1 else "d1"
    d=gen13.make(name,{'ub':'g2'},extra_fns=HELP)
    p=d+'/src/create_v2.rs'; t=open(p).read()
    head="fn update_metadata_authority<'info>(bump:u8,accounts:"+ACC+")->Result<()>{\n"
    i=t.index(head)+len(head); sig=' let signer:&[&[&[u8]]]=&[&[b"mint-authority",&[bump]]];\n'
    assert t[i:i+len(sig)]==sig; t=t[:i]+t[i+len(sig):]
    open(p,'w').write(t); print('made',d)
    