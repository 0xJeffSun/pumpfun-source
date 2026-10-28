from pathlib import Path
import subprocess,json,hashlib,importlib.util,shutil,difflib
R=Path('/mnt/c/Users/ahi20/Documents/ChatGPT/pumpfun-source')
D=Path('/home/ahi200/pumpfun-work/20261028-pump-feeconfig-decoder')
ref='3887bcf3fbcfe308c986094a51a99bf75240a0a7';prefix='research/pump-round37-curvehop745/'
git=lambda *args:subprocess.check_output(['git','-c','safe.directory='+str(R),*args],cwd=R)
sha=lambda b:hashlib.sha256(b).hexdigest()
pub=D/'public342';pub.mkdir(exist_ok=False);pins={}
for name in git('ls-tree','-r','--name-only',ref,'--',prefix).decode().splitlines():
    data=git('show',ref+':'+name);p=pub/name[len(prefix):];p.write_bytes(data);pins[name]=sha(data)
spec=importlib.util.spec_from_file_location('public_materialize',pub/'materialize.py');m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m)
source=D/'source780';inputs=m.materialize(R/'repro/pump/main-contract-round37-20261027',source,'sourcefronts780')
(D/'public-inputs.json').write_text(json.dumps({'ref':ref,'files':pins,'materialized_source':inputs},indent=2)+'\n')
candidate=D/'source-local-feeconfig';shutil.copytree(source,candidate)
p=candidate/'programs/pump/src/trade_types.rs';before=p.read_text();old='    accounts::FeeConfig,\n';assert before.count(old)==1
# Keep existing diagnostic line coordinates; remove only this alias.
after=before.replace(old,'\n')+'''
// Route decoding has its own Rust type; the external CPI account keeps the IDL type.
#[derive(AnchorSerialize, AnchorDeserialize, Clone)]
pub struct FeeConfig {
    pub bump: u8,
    pub admin: Pubkey,
    pub flat_fees: Fees,
    pub fee_tiers: Vec<FeeTier>,
    pub stable_fee_tiers: Vec<FeeTier>,
    pub exotic_flat_fees: Fees,
}
'''
p.write_text(after)
(D/'local-feeconfig.patch').write_text(''.join(difflib.unified_diff(before.splitlines(True),after.splitlines(True),fromfile='source780/programs/pump/src/trade_types.rs',tofile='local-feeconfig/programs/pump/src/trade_types.rs')))
print('parent342',ref,'inputs',len(inputs),'new_local_type_fields',6)
