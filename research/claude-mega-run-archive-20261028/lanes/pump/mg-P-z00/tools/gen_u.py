import sys,gen_m2
U=gen_m2.UPD; C=gen_m2.CTX; OK=gen_m2.OK
F={
 'c1':lambda S:[' const NONE:Option<Pubkey>=None;',' '+U+'('+(C%S)+',NONE.try_into()?)'],
 'c2':lambda S:[' const NONE:Option<Pubkey>=None;',' '+U+'('+(C%S)+','+OK+'::try_from(NONE)?)'],
 'c3':lambda S:[' '+U+'('+(C%S)+','+OK+'::try_from(None::<Pubkey>)?)'],
 'c4':lambda S:[' '+U+'('+(C%S)+',TryInto::<'+OK+'>::try_into(None::<Pubkey>)?)'],
 'd1':lambda S:[' let none:Option<Pubkey>=None;',' '+U+'('+(C%S)+',none.try_into()?)'],
 'd3':lambda S:[' let none:Option<Pubkey>=None;',' '+U+'('+(C%S)+','+OK+'::try_from(none)?)'],
 'd4':lambda S:[' '+U+'('+(C%S)+',{let none:Option<Pubkey>=None;none}.try_into()?)'],
 'e1':lambda S:[' let ctx='+(C%S)+';',' let new_authority=None::<Pubkey>.try_into()?;',' '+U+'(ctx,new_authority)'],
 'e2':lambda S:[' '+U+'('+(C%S)+',*&None::<Pubkey>.try_into()?)'],
 'f1':lambda S:[' '+U+'('+(C%S)+','+OK+'::try_from(None)?)?;',' Ok(())'],
 'f2':lambda S:[' '+U+'('+(C%S)+',None.try_into()?)?;',' Ok(())'],
 'f3':lambda S:[' return '+U+'('+(C%S)+','+OK+'::try_from(None)?);'],
 'f4':lambda S:[' let result='+U+'('+(C%S)+','+OK+'::try_from(None)?);',' result'],
}
for name in sys.argv[1:]:
    gen_m2.UB[name]=F[name]
    gen_m2.make('u_'+name,{'ub':name,'mb':'n2'})
