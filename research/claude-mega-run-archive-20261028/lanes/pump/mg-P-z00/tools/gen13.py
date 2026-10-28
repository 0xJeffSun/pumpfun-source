# helper split of create_v2 metadata/mint code on the L13 tree.  make(name, opts) -> var/<name>
import sys,shutil,os
L='/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-z00'
TM='anchor_spl::token_2022_extensions::spl_token_metadata_interface::state::TokenMetadata'
OK='anchor_spl::token_2022_extensions::spl_pod::optional_keys::OptionalNonZeroPubkey'
CTX="CpiContext::new_with_signer(accounts.0.to_account_info(),anchor_spl::token_2022_extensions::TokenMetadataUpdateAuthority{program_id:accounts.0.to_account_info(),metadata:accounts.1.to_account_info(),current_authority:accounts.2.to_account_info(),new_authority:accounts.1.to_account_info()},%s)"
UPD="anchor_spl::token_2022_extensions::token_metadata_update_authority"
UB={
 'u0':lambda S:[' '+UPD+'('+(CTX%S)+',None::<Pubkey>.try_into()?)'],
 'r1':lambda S:[' return '+UPD+'('+(CTX%S)+','+OK+'::try_from(None)?);'],
 'r7':lambda S:[' return '+UPD+'('+(CTX%S)+',match '+OK+'::try_from(None){Ok(v)=>v,Err(e)=>return Err(e.into())});'],
}
MT="token_interface::mint_to(CpiContext::new_with_signer(a.token_program.to_account_info(),token_interface::MintTo{mint:a.mint.to_account_info(),to:%s,authority:a.mint_authority.to_account_info()},%s),%s)?;"
SA="token_interface::set_authority(CpiContext::new_with_signer(a.token_program.to_account_info(),token_interface::SetAuthority{current_authority:a.mint_authority.to_account_info(),account_or_mint:a.mint.to_account_info()},%s),token_interface::spl_token_2022::instruction::AuthorityType::MintTokens,None)"
MB={
 'n0':lambda S,SIG:[' '+SIG,' '+MT%('a.associated_bonding_curve.to_account_info()',S,'a.global.token_total_supply'),' if is_mayhem_mode {','  '+MT%('a.mayhem_token_vault.to_account_info()',S,'a.global.token_total_supply'),' }',' '+SA%S],
 'n2':lambda S,SIG:[' let supply=a.global.token_total_supply;',' '+SIG,' '+MT%('a.associated_bonding_curve.to_account_info()',S,'supply'),' if is_mayhem_mode {','  '+MT%('a.mayhem_token_vault.to_account_info()',S,'supply'),' }',' '+SA%S],
}
def make(name, o, base='/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/base/L13/pump', extra_fns=''):
    d=f'{L}/var/{name}'
    if os.path.exists(d): shutil.rmtree(d)
    shutil.copytree(base,d)
    p=f'{d}/src/create_v2.rs'
    t=open(p).read()
    lines=t.rstrip('\n').split('\n')
    assert len(lines)==535 and lines[-1]=='}', len(lines)
    n=len(lines); pad_n=581-(n+2)
    body=['']+['// layout-pad(%d): aligns the next Source site with the original line'%pad_n]+['']*(pad_n-1)
    md=o.get('md',f"let metadata={TM}{{name:name.clone(),symbol:symbol.clone(),uri:uri.clone(),update_authority:{OK}(a.mint_authority.key()),mint:a.mint.key(),additional_metadata:vec![]}};")
    SIG="let signer:&[&[&[u8]]]=&[&[b\"mint-authority\",&[bump]]];"; S='signer'
    if o.get('seeds')=='inline': SIG=''; S='&[&[b"mint-authority",&[bump]]]'
    usig="fn update_metadata_authority<'info>(bump:u8,accounts:&(&Program<'info,Token2022>,&InterfaceAccount<'info,Mint>,&UncheckedAccount<'info>))->Result<()>{"
    ucall="update_metadata_authority(bump,&(&a.token_program,&a.mint,&a.mint_authority))"
    body+=[
    '#[inline(never)]',                                                       #581
    f"fn initialize_metadata<'info>(a:&CreateV2<'info>,bump:u8,name:String,symbol:String,uri:String)->Result<()>{{", #582
    ' '+md,                                                                    #583
    ' let rent_sysvar=Rent::get()?;',                                          #584
    ' let mint_info=a.mint.to_account_info();',                                #585
    ' let base_size=mint_info.data_len().checked_add(4).ok_or_else(|| error!(PumpError::Overflow))?;', #586
    ' let metadata_size=metadata.get_packed_len()?;',                          #587
    ' let size=base_size.checked_add(metadata_size).ok_or_else(|| error!(PumpError::Overflow))?;',    #588
    ' let rent=rent_sysvar.minimum_balance(size).saturating_sub(mint_info.lamports());',
    ' if rent>0 {anchor_lang::system_program::transfer(CpiContext::new(a.system_program.to_account_info(),anchor_lang::system_program::Transfer{from:a.user.to_account_info(),to:a.mint.to_account_info()}),rent)?;}',
    ' '+SIG,
    ' anchor_spl::token_2022_extensions::token_metadata_initialize(',
    '  CpiContext::new_with_signer(a.token_program.to_account_info(),anchor_spl::token_2022_extensions::TokenMetadataInitialize{',
    '   program_id:a.token_program.to_account_info(),metadata:a.mint.to_account_info(),update_authority:a.mint_authority.to_account_info(),mint_authority:a.mint_authority.to_account_info(),mint:a.mint.to_account_info(),',
    f'  }},{S}),name,symbol,uri,',
    ' )?;',
    ' '+o.get('ucall',ucall),
    '}','',
    '#[inline(never)]',
    f"fn mint_supply<'info>(a:&CreateV2<'info>,bump:u8,is_mayhem_mode:bool)->Result<()>{{",
    ]+MB[o.get('mb','n2')](S,SIG)+['}','','#[inline(never)]',usig]+([' '+SIG] if SIG else [])+UB[o.get('ub','r1')](S)+['}']
    t='\n'.join(lines+body)+'\n'+extra_fns
    s0=t.index(' let bump=[ctx.bumps.mint_authority];let seeds:&[&[u8]]=&[b"mint-authority",&bump];')
    s1=t.index(' let g=&ctx.accounts.global;let curve=&mut ctx.accounts.bonding_curve;')
    nl=t[s0:s1].count('\n')
    new=(' initialize_metadata(a,ctx.bumps.mint_authority,name.clone(),symbol.clone(),uri.clone())?;\n'
         ' if is_mayhem_mode { initialize_mayhem(&ctx)?; }\n'
         ' mint_supply(a,ctx.bumps.mint_authority,is_mayhem_mode)?;\n')
    new+='\n'*(nl-new.count('\n'))
    t=t[:s0]+new+t[s1:]
    open(p,'w').write(t)
    ln=t.split('\n')
    for i,l in enumerate(ln,1):
        if i>570 and 'error!(PumpError::Overflow))?;' in l: print(name,'site',i)
    return d
if __name__=='__main__':
    import json
    make(sys.argv[1], json.loads(sys.argv[2]) if len(sys.argv)>2 else {})
