# cbvar2.py : batch 2 variants (seed/bump locals scoped outside the if/else)
G='/Users/shawwalters/amm100-run/lanes/mg-A-sp1/gen'
B=open(G+'/cb_base.rs').read()
def R(t,a,b,n=1):
    assert t.count(a)>=1,(a[:70]); return t.replace(a,b,n)
IFL="    if user_volume_accumulator.data_is_empty() {\n"
BUMP="        let bump = [bump];\n"
SEEDS="        let seeds: &[&[u8]] = &[b\"user_volume_accumulator\", user_key.as_ref(), &bump];\n"
SIG="        let signer_seeds = &[seeds];\n"
dd=lambda s: s[4:]
V={}
t=R(R(R(B,BUMP,""),SEEDS,""),SIG,""); V['s1_seeds_before_if']=R(t,IFL,dd(BUMP)+dd(SEEDS)+dd(SIG)+IFL)
t=R(B,BUMP,""); V['s2_bump_before_if']=R(t,IFL,dd(BUMP)+IFL)
t=R(R(B,BUMP,""),SEEDS,""); V['s3_bumpseeds_before_if']=R(t,IFL,dd(BUMP)+dd(SEEDS)+IFL)
t=R(R(R(B,BUMP,""),SEEDS,""),SIG,""); V['s4_seeds_after_pda']=R(t,"    if user_volume_accumulator.key() != expected_accumulator {\n",dd(BUMP)+dd(SEEDS)+dd(SIG)+"    if user_volume_accumulator.key() != expected_accumulator {\n")
t=R(R(R(B,BUMP,""),SEEDS,""),SIG,""); V['s5_seeds_after_395']=R(t,"    require!(user_volume_accumulator.is_writable, PumpAmmError::InvalidCashbackAccumulator);\n","    require!(user_volume_accumulator.is_writable, PumpAmmError::InvalidCashbackAccumulator);\n"+dd(BUMP)+dd(SEEDS)+dd(SIG))
# s6: signer seeds as one expression before if
t=R(R(R(B,BUMP,""),SEEDS,""),SIG,"")
V['s6_sig_onelet']=R(t,IFL,"    let bump = [bump];\n    let signer_seeds: &[&[&[u8]]] = &[&[b\"user_volume_accumulator\", user_key.as_ref(), &bump]];\n"+IFL)
names=[]
for k,v in V.items():
    open(f'{G}/cbv/b2_{k}.rs','w').write(v); names.append(f'{G}/cbv/b2_{k}.rs')
open(G+'/cbv/b2.list','w').write('\n'.join(names)+'\n'); print(len(names))
