import sys,shutil,os
L='/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-z00'
TM='anchor_spl::token_2022_extensions::spl_token_metadata_interface::state::TokenMetadata'
OK='anchor_spl::token_2022_extensions::spl_pod::optional_keys::OptionalNonZeroPubkey'
CTX="CpiContext::new_with_signer(accounts.0.to_account_info(),anchor_spl::token_2022_extensions::TokenMetadataUpdateAuthority{program_id:accounts.0.to_account_info(),metadata:accounts.1.to_account_info(),current_authority:accounts.2.to_account_info(),new_authority:accounts.1.to_account_info()},%s)"
UPD="anchor_spl::token_2022_extensions::token_metadata_update_authority"
UB={
 'u0':lambda S:[' '+UPD+'('+(CTX%S)+',None::<Pubkey>.try_into()?)'],
 'u1':lambda S:[' let ctx='+(CTX%S)+';',' '+UPD+'(ctx,None.try_into()?)'],
 'u2':lambda S:[' let ctx='+(CTX%S)+';',' let new_authority=None::<Pubkey>.try_into()?;',' '+UPD+'(ctx,new_authority)'],
 'u3':lambda S:[' '+UPD+'('+(CTX%S)+',anchor_spl::token_2022_extensions::spl_pod::optional_keys::OptionalNonZeroPubkey::try_from(None)?)'],
 'u6':lambda S:[' let none:Option<Pubkey>=None;',' '+UPD+'('+(CTX%S)+',none.try_into()?)'],
 'u7':lambda S:[' '+UPD+'('+(CTX%S)+',match None.try_into(){Ok(v)=>v,Err(e)=>return Err(e.into())})'],
 'u10':lambda S:[' '+UPD+'('+(CTX%S)+',{None.try_into()?})'],
 'u11':lambda S:[' '+UPD+'('+(CTX%S)+',{let v=None.try_into()?;v})'],
 'u13':lambda S:[' '+UPD+'('+(CTX%S)+',match None::<Pubkey>.try_into(){Ok(v)=>v,Err(e)=>return Err(Into::into(e))})'],
 'u14':lambda S:[' '+UPD+'('+(CTX%S)+',match anchor_spl::token_2022_extensions::spl_pod::optional_keys::OptionalNonZeroPubkey::try_from(None){Ok(v)=>v,Err(e)=>return Err(e.into())})'],
 'u15':lambda S:[' '+UPD+'('+(CTX%S)+',{let none:Option<Pubkey>=None;none.try_into()?})'],
 'u16':lambda S:[' '+UPD+'('+(CTX%S)+',core::convert::identity(None::<Pubkey>).try_into()?)'],
 'u4':lambda S:[' let new_authority:anchor_spl::token_2022_extensions::spl_pod::optional_keys::OptionalNonZeroPubkey=None.try_into()?;',' '+UPD+'('+(CTX%S)+',new_authority)'],
}
MT="token_interface::mint_to(CpiContext::new_with_signer(a.token_program.to_account_info(),token_interface::MintTo{mint:a.mint.to_account_info(),to:%s,authority:a.mint_authority.to_account_info()},%s),%s)?;"
SA="token_interface::set_authority(CpiContext::new_with_signer(a.token_program.to_account_info(),token_interface::SetAuthority{current_authority:a.mint_authority.to_account_info(),account_or_mint:a.mint.to_account_info()},%s),token_interface::spl_token_2022::instruction::AuthorityType::MintTokens,None)"
MB={
 'n0':lambda S,SIG:[' '+SIG,' '+MT%('a.associated_bonding_curve.to_account_info()',S,'a.global.token_total_supply'),' if is_mayhem_mode {','  '+MT%('a.mayhem_token_vault.to_account_info()',S,'a.global.token_total_supply'),' }',' '+SA%S],
 'n1':lambda S,SIG:[' let global:&Account<Global>=&a.global;let curve_ata:&InterfaceAccount<TokenAccount>=&a.associated_bonding_curve;',' '+SIG,' '+MT%('curve_ata.to_account_info()',S,'global.token_total_supply'),' if is_mayhem_mode {','  '+MT%('a.mayhem_token_vault.to_account_info()',S,'global.token_total_supply'),' }',' '+SA%S],
 'n2':lambda S,SIG:[' let supply=a.global.token_total_supply;',' '+SIG,' '+MT%('a.associated_bonding_curve.to_account_info()',S,'supply'),' if is_mayhem_mode {','  '+MT%('a.mayhem_token_vault.to_account_info()',S,'supply'),' }',' '+SA%S],
}
def make(name, o, base=L+'/src'):
    d=f'{L}/var/{name}'
    if os.path.exists(d): shutil.rmtree(d)
    shutil.copytree(base,d)
    p=f'{d}/src/create_v2.rs'
    t=open(p).read()
    lines=t.rstrip('\n').split('\n')
    assert len(lines)==501 and lines[-1]=='}'
    n=len(lines)
    pad_n=581-(n+2)
    body=['']+['// layout-pad(%d): aligns the next Source site with the original line'%pad_n]+['']*(pad_n-1)
    iref=o.get('iref','&')   # '&' or '&mut '
    nref=o.get('nref','&')
    md=o.get('md',f"let metadata={TM}{{name:name.clone(),symbol:symbol.clone(),uri:uri.clone(),update_authority:{OK}(a.mint_authority.key()),mint:a.mint.key(),additional_metadata:vec![]}};")
    SIG="let signer:&[&[&[u8]]]=&[&[b\"mint-authority\",&[bump]]];"
    S='signer'
    if o.get('seeds')=='inline':
        SIG='';S='&[&[b"mint-authority",&[bump]]]'
    if o.get('seeds')=='old':
        SIG="let seeds:&[&[u8]]=&[b\"mint-authority\",&[bump]];"; S='&[seeds]'
    upd=o.get('upd','ref')
    if upd=='ref':
        usig="fn update_metadata_authority<'info>(bump:u8,accounts:&(&Program<'info,Token2022>,&InterfaceAccount<'info,Mint>,&UncheckedAccount<'info>))->Result<()>{"
        ucall="update_metadata_authority(bump,&(&a.token_program,&a.mint,&a.mint_authority))"
    elif upd=='val':
        usig="fn update_metadata_authority<'info>(bump:u8,accounts:(&Program<'info,Token2022>,&InterfaceAccount<'info,Mint>,&UncheckedAccount<'info>))->Result<()>{"
        ucall="update_metadata_authority(bump,(&a.token_program,&a.mint,&a.mint_authority))"
    body+=[
    '#[inline(never)]',                                                       #581
    f"fn initialize_metadata<'info>(a:{iref}CreateV2<'info>,bump:u8,name:String,symbol:String,uri:String)->Result<()>{{", #582
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
    ' '+ucall,
    '}',
    '',
    '#[inline(never)]',
    f"fn mint_supply<'info>(a:{nref}CreateV2<'info>,bump:u8,is_mayhem_mode:bool)->Result<()>{{",
    ]+MB[o.get('mb','n0')](S,SIG)+[
    '}',
    '',
    '#[inline(never)]',
    usig,
    ' '+SIG,
    ]+UB[o.get('ub','u0')](S)+['}']
    lines+=body
    t='\n'.join(lines)+'\n'
    old_start=t.index(' let bump=[ctx.bumps.mint_authority];let seeds:&[&[u8]]=&[b"mint-authority",&bump];')
    old_end=t.index(' let event=CreateEvent{')
    old=t[old_start:old_end]
    nl=old.count('\n')
    aa='a' if iref=='&' else '&mut ctx.accounts'
    na='a' if nref=='&' else '&mut ctx.accounts'
    new=(f' initialize_metadata({aa},ctx.bumps.mint_authority,name.clone(),symbol.clone(),uri.clone())?;\n'
         ' if is_mayhem_mode { initialize_mayhem(&ctx)?; }\n'
         f' mint_supply({na},ctx.bumps.mint_authority,is_mayhem_mode)?;\n')
    new+= '\n'*(nl-new.count('\n'))
    t=t[:old_start]+new+t[old_end:]
    if iref!='&' or nref!='&':
        # execute binds a=&ctx.accounts at top; re-borrow needed after; replace subsequent a. uses? keep simple: a is a shared borrow used later -> rebind
        t=t.replace(' let event=CreateEvent{',' let a=&ctx.accounts;\n let event=CreateEvent{',1)
        # remove one blank line to stay line neutral
        i=t.index(f' mint_supply({na},'); j=t.index('\n\n',i); t=t[:j]+t[j+1:]
    open(p,'w').write(t)
    for i,l in enumerate(t.split('\n'),1):
        if ('error!(PumpError::Overflow))?;' in l and i>500) or 'let event=CreateEvent' in l: print(name,i,l.strip()[:50])
