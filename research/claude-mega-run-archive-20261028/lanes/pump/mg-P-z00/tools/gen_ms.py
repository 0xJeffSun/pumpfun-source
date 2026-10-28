import mk_v,sys
MT="token_interface::mint_to(CpiContext::new_with_signer(a.token_program.to_account_info(),token_interface::MintTo{mint:a.mint.to_account_info(),to:%s,authority:a.mint_authority.to_account_info()},signer),%s)?;"
SA="token_interface::set_authority(CpiContext::new_with_signer(a.token_program.to_account_info(),token_interface::SetAuthority{current_authority:a.mint_authority.to_account_info(),account_or_mint:a.mint.to_account_info()},signer),token_interface::spl_token_2022::instruction::AuthorityType::MintTokens,None)"
SEEDS='&[&[b"mint-authority",&[bump]]]'
def body(curve,supply):
    return [' '+MT%(curve,supply),' if is_mayhem_mode {','  '+MT%('a.mayhem_token_vault.to_account_info()',supply),' }',' '+SA]
V={}
# ma: whole body in inline(always) helper; refs to global/curve ata as args; seeds as call arg
V['ma']=([' mint_initial_supply(&a.global,&a.associated_bonding_curve,a,is_mayhem_mode,'+SEEDS+')'],
 "#[inline(always)]\nfn mint_initial_supply<'info>(global:&Account<'info,Global>,curve_ata:&InterfaceAccount<'info,TokenAccount>,a:&CreateV2<'info>,is_mayhem_mode:bool,signer:&[&[&[u8]]])->Result<()>{\n"+'\n'.join(body('curve_ata.to_account_info()','global.token_total_supply'))+"\n}\n")
V['mb']=([' mint_initial_supply(a,&a.global,&a.associated_bonding_curve,is_mayhem_mode,'+SEEDS+')'],
 "#[inline(always)]\nfn mint_initial_supply<'info>(a:&CreateV2<'info>,global:&Account<'info,Global>,curve_ata:&InterfaceAccount<'info,TokenAccount>,is_mayhem_mode:bool,signer:&[&[&[u8]]])->Result<()>{\n"+'\n'.join(body('curve_ata.to_account_info()','global.token_total_supply'))+"\n}\n")
V['mc']=([' mint_initial_supply(a,is_mayhem_mode,'+SEEDS+')'],
 "#[inline(always)]\nfn mint_initial_supply<'info>(a:&CreateV2<'info>,is_mayhem_mode:bool,signer:&[&[&[u8]]])->Result<()>{\n"+'\n'.join(body('a.associated_bonding_curve.to_account_info()','a.global.token_total_supply'))+"\n}\n")
V['md']=([' mint_initial_supply(a,bump,is_mayhem_mode)'],
 "#[inline(always)]\nfn mint_initial_supply<'info>(a:&CreateV2<'info>,bump:u8,is_mayhem_mode:bool)->Result<()>{\n let signer:&[&[&[u8]]]="+SEEDS+";\n"+'\n'.join(body('a.associated_bonding_curve.to_account_info()','a.global.token_total_supply'))+"\n}\n")
LB=' let bump=[bump];'
LS=' let signer:&[&[&[u8]]]=&[&[b"mint-authority",&bump]];'
V['me']=([LB,LS]+body('a.associated_bonding_curve.to_account_info()','a.global.token_total_supply'),'')
HF="#[inline(always)]\nfn mint_initial_supply<'info>(%s,is_mayhem_mode:bool,signer:&[&[&[u8]]])->Result<()>{\n"+'\n'.join(body('curve_ata.to_account_info()','global.token_total_supply'))+"\n}\n"
V['mf']=([LB,LS,' mint_initial_supply(&a.global,&a.associated_bonding_curve,a,is_mayhem_mode,signer)'],HF%"global:&Account<'info,Global>,curve_ata:&InterfaceAccount<'info,TokenAccount>,a:&CreateV2<'info>")
V['mg']=([LB,LS,' mint_initial_supply(&a.associated_bonding_curve,&a.global,a,is_mayhem_mode,signer)'],HF%"curve_ata:&InterfaceAccount<'info,TokenAccount>,global:&Account<'info,Global>,a:&CreateV2<'info>")
V['mh']=([' let global=&a.global;let curve_ata=&a.associated_bonding_curve;',LB,LS]+body('curve_ata.to_account_info()','global.token_total_supply'),'')
S2='&[&[b"mint-authority",&[bump]]]'
MTH="#[inline(always)]\nfn mint_tokens<'info>(a:&CreateV2<'info>,%s,amount:u64,signer:&[&[&[u8]]])->Result<()>{\n token_interface::mint_to(CpiContext::new_with_signer(a.token_program.to_account_info(),token_interface::MintTo{mint:a.mint.to_account_info(),to:to.to_account_info(),authority:a.mint_authority.to_account_info()},signer),amount)\n}\n"
SAH="#[inline(always)]\nfn revoke_mint_authority<'info>(a:&CreateV2<'info>,signer:&[&[&[u8]]])->Result<()>{\n "+SA+"\n}\n"
V['pa']=([' mint_tokens(a,&a.associated_bonding_curve.to_account_info(),a.global.token_total_supply,'+S2+')?;',' if is_mayhem_mode {','  mint_tokens(a,&a.mayhem_token_vault.to_account_info(),a.global.token_total_supply,'+S2+')?;',' }',' revoke_mint_authority(a,'+S2+')'],
  MTH%"to:&AccountInfo<'info>"+SAH)
V['pb']=([' mint_tokens(a,a.associated_bonding_curve.as_ref(),a.global.token_total_supply,'+S2+')?;',' if is_mayhem_mode {','  mint_tokens(a,a.mayhem_token_vault.as_ref(),a.global.token_total_supply,'+S2+')?;',' }',' revoke_mint_authority(a,'+S2+')'],
  MTH%"to:&AccountInfo<'info>"+SAH)
MTG="#[inline(always)]\nfn mint_tokens<'info,T:ToAccountInfo<'info>>(a:&CreateV2<'info>,to:&T,amount:u64,signer:&[&[&[u8]]])->Result<()>{\n token_interface::mint_to(CpiContext::new_with_signer(a.token_program.to_account_info(),token_interface::MintTo{mint:a.mint.to_account_info(),to:to.to_account_info(),authority:a.mint_authority.to_account_info()},signer),amount)\n}\n"
V['pc']=([' mint_tokens(a,&*a.associated_bonding_curve,a.global.token_total_supply,'+S2+')?;',' if is_mayhem_mode {','  mint_tokens(a,&a.mayhem_token_vault,a.global.token_total_supply,'+S2+')?;',' }',' revoke_mint_authority(a,'+S2+')'],MTG+SAH)
V['pd']=([' token_interface::mint_to(CpiContext::new_with_signer(a.token_program.to_account_info(),token_interface::MintTo{mint:a.mint.to_account_info(),to:a.associated_bonding_curve.to_account_info(),authority:a.mint_authority.to_account_info()},'+S2+'),a.global.token_total_supply)?;',' if is_mayhem_mode {','  token_interface::mint_to(CpiContext::new_with_signer(a.token_program.to_account_info(),token_interface::MintTo{mint:a.mint.to_account_info(),to:a.mayhem_token_vault.to_account_info(),authority:a.mint_authority.to_account_info()},'+S2+'),a.global.token_total_supply)?;',' }',' revoke_mint_authority(a,'+S2+')'],SAH)
CTXSIG="fn mint_supply<'info>(ctx:&Context<'_,'_,'_,'info,CreateV2<'info>>,is_mayhem_mode:bool)->Result<()>{"
MTI="#[inline(always)]\nfn mint_tokens<'info,T:ToAccountInfo<'info>>(token_program:&Program<'info,Token2022>,mint:&InterfaceAccount<'info,Mint>,authority:&UncheckedAccount<'info>,to:&T,amount:u64,signer:&[&[&[u8]]])->Result<()>{\n token_interface::mint_to(CpiContext::new_with_signer(token_program.to_account_info(),token_interface::MintTo{mint:mint.to_account_info(),to:to.to_account_info(),authority:authority.to_account_info()},signer),amount)\n}\n"
SAI="#[inline(always)]\nfn revoke_mint_authority<'info>(token_program:&Program<'info,Token2022>,mint:&InterfaceAccount<'info,Mint>,authority:&UncheckedAccount<'info>,signer:&[&[&[u8]]])->Result<()>{\n token_interface::set_authority(CpiContext::new_with_signer(token_program.to_account_info(),token_interface::SetAuthority{current_authority:authority.to_account_info(),account_or_mint:mint.to_account_info()},signer),token_interface::spl_token_2022::instruction::AuthorityType::MintTokens,None)\n}\n"
IND=[' mint_tokens(&a.token_program,&a.mint,&a.mint_authority,&*a.associated_bonding_curve,a.global.token_total_supply,'+S2+')?;',' if is_mayhem_mode {','  mint_tokens(&a.token_program,&a.mint,&a.mint_authority,&a.mayhem_token_vault,a.global.token_total_supply,'+S2+')?;',' }',' revoke_mint_authority(&a.token_program,&a.mint,&a.mint_authority,'+S2+')']
V['pe']=([' let a=&ctx.accounts;let bump=ctx.bumps.mint_authority;']+V['pc'][0],V['pc'][1],CTXSIG)
V['pf']=([' let a=&ctx.accounts;let bump=ctx.bumps.mint_authority;']+IND,MTI+SAI,CTXSIG)
V['pg']=(IND,MTI+SAI)
MTJ="#[inline(always)]\nfn mint_tokens<'info,T:ToAccountInfo<'info>>(a:&CreateV2<'info>,global:&Account<'info,Global>,to:&T,signer:&[&[&[u8]]])->Result<()>{\n token_interface::mint_to(CpiContext::new_with_signer(a.token_program.to_account_info(),token_interface::MintTo{mint:a.mint.to_account_info(),to:to.to_account_info(),authority:a.mint_authority.to_account_info()},signer),global.token_total_supply)\n}\n"
LA=' let a=&ctx.accounts;let bump=ctx.bumps.mint_authority;'
V['pj']=([LA,' mint_tokens(a,&a.global,&*a.associated_bonding_curve,'+S2+')?;',' if is_mayhem_mode {','  mint_tokens(a,&a.global,&a.mayhem_token_vault,'+S2+')?;',' }',' revoke_mint_authority(a,'+S2+')'],MTJ+SAH,CTXSIG)
MTK=MTJ.replace("(a:&CreateV2<'info>,global:&Account<'info,Global>,","(global:&Account<'info,Global>,a:&CreateV2<'info>,")
V['pk']=([LA,' mint_tokens(&a.global,a,&*a.associated_bonding_curve,'+S2+')?;',' if is_mayhem_mode {','  mint_tokens(&a.global,a,&a.mayhem_token_vault,'+S2+')?;',' }',' revoke_mint_authority(a,'+S2+')'],MTK+SAH,CTXSIG)
V['pl']=([LA,' mint_tokens(a,&a.global,&*a.associated_bonding_curve,'+S2+')?;',' if is_mayhem_mode {','  mint_tokens(a,&a.global,&a.mayhem_token_vault,'+S2+')?;',' }',' return revoke_mint_authority(a,'+S2+');'],MTJ+SAH,CTXSIG)
MTN=MTJ.replace("to:&T,signer:&[&[&[u8]]])","to:&T,bump:u8)").replace("},signer),global","},&[&[b\"mint-authority\",&[bump]]]),global")
SAN=SAH.replace("signer:&[&[&[u8]]])","bump:u8)").replace("},signer),token_interface::spl","},&[&[b\"mint-authority\",&[bump]]]),token_interface::spl")
V['pn']=([LA,' mint_tokens(a,&a.global,&*a.associated_bonding_curve,bump)?;',' if is_mayhem_mode {','  mint_tokens(a,&a.global,&a.mayhem_token_vault,bump)?;',' }',' revoke_mint_authority(a,bump)'],MTN+SAN,CTXSIG)
MTO=MTJ.replace("to:&T,signer:&[&[&[u8]]])->Result<()>{\n","to:&T,bump:u8)->Result<()>{\n let signer:&[&[&[u8]]]=&[&[b\"mint-authority\",&[bump]]];\n")
SAO=SAH.replace("signer:&[&[&[u8]]])->Result<()>{\n","bump:u8)->Result<()>{\n let signer:&[&[&[u8]]]=&[&[b\"mint-authority\",&[bump]]];\n")
V['po']=([LA,' mint_tokens(a,&a.global,&*a.associated_bonding_curve,bump)?;',' if is_mayhem_mode {','  mint_tokens(a,&a.global,&a.mayhem_token_vault,bump)?;',' }',' revoke_mint_authority(a,bump)'],MTO+SAO,CTXSIG)
MTV=MTJ.replace("(a:&CreateV2<'info>,global:&Account<'info,Global>,to:&T,","(a:&CreateV2<'info>,to:&T,global:&Account<'info,Global>,")
V['pv']=([LA,' mint_tokens(a,&*a.associated_bonding_curve,&a.global,'+S2+')?;',' if is_mayhem_mode {','  mint_tokens(a,&a.mayhem_token_vault,&a.global,'+S2+')?;',' }',' revoke_mint_authority(a,'+S2+')'],MTV+SAH,CTXSIG)
MTX=MTJ.replace("signer:&[&[&[u8]]])->Result<()>{\n","signer:&[&[&[u8]]])->Result<()>{\n let amount=global.token_total_supply;\n").replace("},signer),global.token_total_supply)","},signer),amount)")
V['px']=([LA,' mint_tokens(a,&a.global,&*a.associated_bonding_curve,'+S2+')?;',' if is_mayhem_mode {','  mint_tokens(a,&a.global,&a.mayhem_token_vault,'+S2+')?;',' }',' revoke_mint_authority(a,'+S2+')'],MTX+SAH,CTXSIG)
DMT="token_interface::mint_to(CpiContext::new_with_signer(a.token_program.to_account_info(),token_interface::MintTo{mint:a.mint.to_account_info(),to:%s,authority:a.mint_authority.to_account_info()},"+S2+"),a.global.token_total_supply)?;"
DSA="token_interface::set_authority(CpiContext::new_with_signer(a.token_program.to_account_info(),token_interface::SetAuthority{current_authority:a.mint_authority.to_account_info(),account_or_mint:a.mint.to_account_info()},"+S2+"),token_interface::spl_token_2022::instruction::AuthorityType::MintTokens,None)"
V['py']=([LA,' '+DMT%'a.associated_bonding_curve.to_account_info()',' if is_mayhem_mode {','  '+DMT%'a.mayhem_token_vault.to_account_info()',' }',' '+DSA],'',CTXSIG)
V['pz']=([LA,' mint_tokens(a,&*a.associated_bonding_curve,&a.global,'+S2+')?;',' if is_mayhem_mode {','  mint_tokens(a,&a.mayhem_token_vault,&a.global,'+S2+')?;',' }',' '+DSA],MTV,CTXSIG)
V['qa']=(V['pv'][0],V['pv'][1].replace('#[inline(always)]','#[inline]'),CTXSIG)
V['qb']=(V['pv'][0],V['pv'][1].replace('#[inline(always)]\n',''),CTXSIG)
S3='&[&[b"mint-authority",&[ctx.bumps.mint_authority]]]'
V['qc']=([' let a=&ctx.accounts;']+[l.replace(S2,S3) for l in V['pv'][0][1:]],V['pv'][1],CTXSIG)
CL=[LA,' let mint_tokens=|to:AccountInfo<\'info>|->Result<()>{token_interface::mint_to(CpiContext::new_with_signer(a.token_program.to_account_info(),token_interface::MintTo{mint:a.mint.to_account_info(),to,authority:a.mint_authority.to_account_info()},'+S2+'),a.global.token_total_supply)};',
 ' mint_tokens(a.associated_bonding_curve.to_account_info())?;',' if is_mayhem_mode {','  mint_tokens(a.mayhem_token_vault.to_account_info())?;',' }',' revoke_mint_authority(a,'+S2+')']
V['ra']=(CL,SAH,CTXSIG)
V['rb']=([LA,' mint_tokens(a,&a.global,&*a.associated_bonding_curve,bump)?;',' if is_mayhem_mode {','  mint_tokens(a,&a.global,&a.mayhem_token_vault,bump)?;',' }',' '+DSA],MTN,CTXSIG)
DSA2="token_interface::set_authority(CpiContext::new_with_signer(a.token_program.to_account_info(),token_interface::SetAuthority{current_authority:a.mint_authority.to_account_info(),account_or_mint:a.mint.to_account_info()},signer),token_interface::spl_token_2022::instruction::AuthorityType::MintTokens,None)"
V['rd']=([LA,' mint_tokens(a,&*a.associated_bonding_curve,&a.global,'+S2+')?;',' if is_mayhem_mode {','  mint_tokens(a,&a.mayhem_token_vault,&a.global,'+S2+')?;',' }',' let signer:&[&[&[u8]]]='+S2+';',' '+DSA2],MTV,CTXSIG)
V['re']=([LA,' mint_tokens(a,&*a.associated_bonding_curve,&a.global,'+S2+')?;',' if is_mayhem_mode {','  mint_tokens(a,&a.mayhem_token_vault,&a.global,'+S2+')?;',' }',' let signer:&[&[&[u8]]]='+S2+';',' return '+DSA2+';'],MTV,CTXSIG)
DSA3=DSA2.replace("current_authority:a.mint_authority.to_account_info(),account_or_mint:a.mint.to_account_info()","account_or_mint:a.mint.to_account_info(),current_authority:a.mint_authority.to_account_info()")
V['rh']=(V['rd'][0][:-1]+[' '+DSA3],MTV,CTXSIG)
if __name__=='__main__':
  for k in sys.argv[1:]:
      v=V[k]; d=mk_v.mk('ms_'+k,v[0],v[1],v[2] if len(v)>2 else None)
      if len(v)>2:
          p2=d+'/src/create_v2.rs'; s=open(p2).read(); o=' mint_supply(a,ctx.bumps.mint_authority,is_mayhem_mode)?;'
          assert s.count(o)==1; s=s.replace(o,' mint_supply(&ctx,is_mayhem_mode)?;'); open(p2,'w').write(s)
      print(d)
