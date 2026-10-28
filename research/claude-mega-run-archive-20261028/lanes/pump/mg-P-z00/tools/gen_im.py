# initialize_metadata variants on top of ms_pv's mint_supply
import mk_v,gen_ms,sys,re
V=gen_ms.V
base_mb,base_ex,base_sig=V['pv']
OLDSIG="fn initialize_metadata<'info>(a:&CreateV2<'info>,bump:u8,name:String,symbol:String,uri:String)->Result<()>{"
CTXSIG="fn initialize_metadata<'info>(ctx:&Context<'_,'_,'_,'info,CreateV2<'info>>,name:String,symbol:String,uri:String)->Result<()>{let a=&ctx.accounts;let bump=ctx.bumps.mint_authority;"
OLDCALL=' initialize_metadata(a,ctx.bumps.mint_authority,name.clone(),symbol.clone(),uri.clone())?;'
NEWCALL=' initialize_metadata(&ctx,name.clone(),symbol.clone(),uri.clone())?;'
TMI_OLD=" anchor_spl::token_2022_extensions::token_metadata_initialize(\n  CpiContext::new_with_signer(a.token_program.to_account_info(),anchor_spl::token_2022_extensions::TokenMetadataInitialize{\n   program_id:a.token_program.to_account_info(),metadata:a.mint.to_account_info(),update_authority:a.mint_authority.to_account_info(),mint_authority:a.mint_authority.to_account_info(),mint:a.mint.to_account_info(),\n  },signer),name,symbol,uri,\n )?;"
TMI_HELP_CALL=" initialize_token_metadata(a,name,symbol,uri,&[&[b\"mint-authority\",&[bump]]])?;\n\n\n\n\n"
TMI_HELP="#[inline(always)]\nfn initialize_token_metadata<'info>(a:&CreateV2<'info>,name:String,symbol:String,uri:String,signer:&[&[&[u8]]])->Result<()>{\n anchor_spl::token_2022_extensions::token_metadata_initialize(CpiContext::new_with_signer(a.token_program.to_account_info(),anchor_spl::token_2022_extensions::TokenMetadataInitialize{program_id:a.token_program.to_account_info(),metadata:a.mint.to_account_info(),update_authority:a.mint_authority.to_account_info(),mint_authority:a.mint_authority.to_account_info(),mint:a.mint.to_account_info()},signer),name,symbol,uri)\n}\n"
def mk(name, ctx=True, tmi=False):
    d=mk_v.mk(name,base_mb,base_ex+(TMI_HELP if tmi else ''),base_sig)
    p=d+'/src/create_v2.rs'; s=open(p).read()
    o=' mint_supply(a,ctx.bumps.mint_authority,is_mayhem_mode)?;'
    assert s.count(o)==1; s=s.replace(o,' mint_supply(&ctx,is_mayhem_mode)?;')
    if ctx:
        assert s.count(OLDSIG)==1 and s.count(OLDCALL)==1
        s=s.replace(OLDSIG,CTXSIG).replace(OLDCALL,NEWCALL)
    if tmi:
        assert s.count(TMI_OLD)==1, s.count(TMI_OLD)
        s=s.replace(TMI_OLD,TMI_HELP_CALL.rstrip('\n')+'\n'*0)
        # keep line count: TMI_OLD has 5 lines; replacement is 1 line + 4 blank
        s=s.replace(TMI_HELP_CALL.split('\n')[0]+'\n',TMI_HELP_CALL.split('\n')[0]+'\n'+'\n'*4,1) if False else s
    open(p,'w').write(s)
    ln=s.split('\n'); print(name,[i+1 for i,l in enumerate(ln) if 'error!(PumpError::Overflow))?;' in l and i>570])
    return d
if __name__=='__main__':
    for k in sys.argv[1:]:
        if k=='ia': mk('im_ia',True,False)
        if k=='ib': mk('im_ib',True,True)
        if k=='i0': mk('im_i0',False,False)
