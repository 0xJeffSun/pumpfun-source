# initialize_metadata variants: patch a copy of lane src (= d2 state). mk(name, [(old,new),...])
import shutil,os,sys
L='/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-z00'
OLDSIG="fn initialize_metadata<'info>(a:&CreateV2<'info>,bump:u8,name:String,symbol:String,uri:String)->Result<()>{"
CTXSIG="fn initialize_metadata<'info>(ctx:&Context<'_,'_,'_,'info,CreateV2<'info>>,name:String,symbol:String,uri:String)->Result<()>{let a=&ctx.accounts;let bump=ctx.bumps.mint_authority;"
OLDCALL=' initialize_metadata(a,ctx.bumps.mint_authority,name.clone(),symbol.clone(),uri.clone())?;'
NEWCALL=' initialize_metadata(&ctx,name.clone(),symbol.clone(),uri.clone())?;'
CTX=[(OLDSIG,CTXSIG),(OLDCALL,NEWCALL)]
def mk(name, reps):
    d=f'{L}/var/{name}'
    if os.path.exists(d): shutil.rmtree(d)
    shutil.copytree(L+'/src',d)
    p=d+'/src/create_v2.rs'; s=open(p).read()
    for o,n in reps:
        assert s.count(o)==1,(name,o[:70],s.count(o)); s=s.replace(o,n)
    open(p,'w').write(s)
    ln=s.split('\n'); sites=[i+1 for i,l in enumerate(ln) if 'PumpError::Overflow' in l and 570<i<600]
    assert sites==[586,588],sites
    return d
