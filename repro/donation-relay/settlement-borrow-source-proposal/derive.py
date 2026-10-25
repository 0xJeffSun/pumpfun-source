"""Deterministic source-only repair; no compiler or target execution."""
def derive(base):
 out=dict(base)
 s=base['src/handlers.rs']
 changes=[
 ('pub struct Settlement {pub source:TokenView,pub mint:MintView,pub program:Account,pub authority:Account,pub relayer:Account}',"pub struct Settlement<'a> {pub source:&'a TokenView,pub mint:&'a MintView,pub program:&'a Account,pub authority:&'a Account,pub relayer:&'a Account}",1),
 ('s:&Settlement,',"s:&Settlement<'_>,",1),
 ('pub settlement:Settlement}',"pub settlement:Settlement<'a>}",1),
 ('pub input:Settlement,pub output:Settlement,',"pub input:Settlement<'a>,pub output:Settlement<'a>,",1),
 ('transfer_checked(rt,s.program,s.source.account,s.mint.account,recipients[i],s.authority,','transfer_checked(rt,*s.program,s.source.account,s.mint.account,recipients[i],*s.authority,',1),
 ('authorize(s.relayer)?','authorize(*s.relayer)?',1),
 ('authorize(c.input.relayer)?','authorize(*c.input.relayer)?',2),
 ('burn_then_close(rt,s.program,s.source.account,s.mint.account,s.authority,s.relayer,','burn_then_close(rt,*s.program,s.source.account,s.mint.account,*s.authority,*s.relayer,',3),
 ('close_token(rt,o.program,o.source.account,o.relayer,o.authority,','close_token(rt,*o.program,o.source.account,*o.relayer,*o.authority,',1),
 ]
 for old,new,count in changes:
  assert s.count(old)==count,(old,s.count(old));s=s.replace(old,new)
 out['src/handlers.rs']=s
 s=base['src/frames.rs']
 old='fn settlement(source:&Loaded<TokenView>,mint:&Loaded<MintView>,program:Account,authority:Account,relayer:Account)->body::Settlement {\n body::Settlement{source:source.value,mint:mint.value,program,authority,relayer}\n}'
 new="""// Borrow the admitted cached views; these references do not borrow the live
// AccountInfo RefCell data/lamports and do not alter CPI reload behavior.
fn settlement<'a>(source:&'a Loaded<TokenView>,mint:&'a Loaded<MintView>,program:&'a Account,authority:&'a Account,relayer:&'a Account)->body::Settlement<'a> {
 body::Settlement{source:&source.value,mint:&mint.value,program,authority,relayer}
}"""
 assert s.count(old)==1;s=s.replace(old,new)
 for old,new in [
 ('&self.output_mint,self.output_mint_program,self.distribution.info,self.signer)','&self.output_mint,&self.output_mint_program,&self.distribution.info,&self.signer)'),
 ('&self.mint,self.token_program,self.distribution.info,self.signer)','&self.mint,&self.token_program,&self.distribution.info,&self.signer)'),
 ]:
  assert s.count(old)==3,(old,s.count(old));s=s.replace(old,new)
 out['src/frames.rs']=s
 return out
