import subprocess, os, sys
L='/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work/mega/mg-M-o83a'
SRC=L+'/roots/s2c9'
def mk(name, attr='#[inline]', order='maxfirst', trait_tail=None, legacy_arg='&a.global_params.field_2', v2_arg=None, ito_vis='fn', cap_impl=None):
    dst=f'{L}/roots/{name}'
    subprocess.run(['rm','-rf',dst]); subprocess.run(['cp','-c','-R',SRC,dst],check=True)
    s=f'{dst}/programs/mayhem/src/state.rs'; st=open(s).read().split('\n')
    assert st[339].strip()=='#[inline(always)]' and 'fn initial_trade_output' in st[340]
    st[339]=attr
    st[340]=ito_vis+' initial_trade_output<C:TradeCap>(vt:u128,c:&curve_accounts::BondingCurve,cap:C,tokens:u128,retained:u16)->u64 {'
    maxs=' let max=(c.real_sol_reserves as u128*retained as u128/10_000)as u64;'
    caps=' let cap=cap.cap();if *cap!=0 {output=output.min(*cap);}'
    if order=='maxfirst': st[350],st[351]=maxs,caps
    else: st[350],st[351]=caps,maxs
    assert 'pub fn buy_amounts' in st[360]
    st[360]='pub fn buy_amounts<C:TradeCap>(vt:u128,c:&curve_accounts::BondingCurve,cap:C,tokens:u128,retained_bps:u16)->(u64,u64) {'
    st[361]=st[361].replace('initial_trade_output(vt,c,global_params,quote_mint,tokens,retained)','initial_trade_output(vt,c,cap,tokens,retained)'); assert 'initial_trade_output(vt,c,cap,' in st[361]
    assert 'pub fn sell_amounts' in st[385]
    st[385]='pub fn sell_amounts<C:TradeCap>(vt:u64,c:&curve_accounts::BondingCurve,cap:C,balance:u64,retained_bps:u16)->(u64,u64) {'
    st[387]=st[387].replace('initial_trade_output(vt as u128,c,global_params,quote_mint,balance as u128,retained)','initial_trade_output(vt as u128,c,cap,balance as u128,retained)'); assert ',c,cap,balance' in st[387]
    if cap_impl is None:
        cap_impl=['pub trait TradeCap { fn cap(&self)->&u64; }',
          'impl TradeCap for &u64 { #[inline(always)] fn cap(&self)->&u64 { self } }',
          "pub struct QuoteCap<'a> { pub global_params:&'a GlobalParams, pub quote_mint:Pubkey }",
          "impl<'a> TradeCap for QuoteCap<'a> { #[inline(always)] fn cap(&self)->&u64 { if self.quote_mint==Pubkey::default()||self.quote_mint==anchor_spl::token::spl_token::native_mint::id(){&self.global_params.field_2}else{&self.global_params.field_11} } }"]
    while st and st[-1]=='': st.pop()
    st+=cap_impl+['']
    open(s,'w').write('\n'.join(st))
    # callers
    p=f'{dst}/programs/mayhem/src/instructions/pump_interface.rs'; t=open(p).read()
    t=t.replace('crate::state::buy_amounts(vt,c,&a.global_params,Pubkey::default(),','crate::state::buy_amounts(vt,c,'+legacy_arg+',')
    t=t.replace('crate::state::sell_amounts(c.virtual_token_reserves,c,&a.global_params,Pubkey::default(),','crate::state::sell_amounts(c.virtual_token_reserves,c,'+legacy_arg+',')
    assert t.count(legacy_arg+',')>=2; open(p,'w').write(t)
    v2=v2_arg or 'crate::state::QuoteCap{global_params:&a.global_params,quote_mint:a.quote_mint.key()}'
    p=f'{dst}/programs/mayhem/src/instructions/pump_interface_v2.rs'; t=open(p).read()
    n0=t.count('&a.global_params,a.quote_mint.key(),')
    t=t.replace('crate::state::buy_amounts(vt,c,&a.global_params,a.quote_mint.key(),','crate::state::buy_amounts(vt,c,'+v2+',')
    t=t.replace('crate::state::sell_amounts(c.virtual_token_reserves,c,&a.global_params,a.quote_mint.key(),','crate::state::sell_amounts(c.virtual_token_reserves,c,'+v2+',')
    assert t.count(v2)==2,(t.count(v2),n0); open(p,'w').write(t)
    return dst
if __name__=='__main__':
    which=sys.argv[1:]
    V={'g1':dict(),'g2':dict(attr='#[inline(always)]'),'g3':dict(ito_vis='pub fn'),'g4':dict(attr='')}
    for k in which: print(mk(k,**V[k]))
