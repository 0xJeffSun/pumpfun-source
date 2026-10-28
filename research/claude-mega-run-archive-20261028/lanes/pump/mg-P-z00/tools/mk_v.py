# variants on top of d1: mk(name, mb_lines(list) or None, extra_fns str, init_lines(list) or None)
import gen13, mk_d1
ACC=mk_d1.ACC
def mk(name, mb=None, extra='', mb_sig=None):
    if mb is not None:
        gen13.MB['_x']=lambda S,SIG: mb
    d=gen13.make(name,{'ub':'g2','mb':'_x' if mb is not None else 'n2'},extra_fns=mk_d1.HELP+extra)
    p=d+'/src/create_v2.rs'; t=open(p).read()
    head="fn update_metadata_authority<'info>(bump:u8,accounts:"+ACC+")->Result<()>{\n"
    i=t.index(head)+len(head); sig=' let signer:&[&[&[u8]]]=&[&[b"mint-authority",&[bump]]];\n'
    assert t[i:i+len(sig)]==sig; t=t[:i]+t[i+len(sig):]
    if mb_sig:
        old="fn mint_supply<'info>(a:&CreateV2<'info>,bump:u8,is_mayhem_mode:bool)->Result<()>{"
        assert t.count(old)==1; t=t.replace(old,mb_sig)
    open(p,'w').write(t); return d
