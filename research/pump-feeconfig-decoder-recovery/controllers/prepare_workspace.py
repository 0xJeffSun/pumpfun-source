from pathlib import Path
import json,hashlib,importlib.util,shutil,difflib
R=Path('/mnt/c/Users/ahi20/Documents/ChatGPT/pumpfun-source')
D=Path('/home/ahi200/pumpfun-work/20261028-pump-feeconfig-decoder');pub=D/'public342'
sha=lambda b:hashlib.sha256(b).hexdigest()
spec=importlib.util.spec_from_file_location('public_materialize',pub/'materialize.py');m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m)
parent=D/'workspace-form-parent';parent.mkdir(exist_ok=False)
archived=R/'repro/pump/main-contract-round37-20261027'
shutil.copyfile(archived/'CHECKPOINT.json',parent/'CHECKPOINT.json');shutil.copytree(archived/'primary',parent/'primary')
# The archive stores a standalone Cargo manifest, while its checkpoint source map
# and public materializer expect the ordinary workspace form. Adapt ONLY a new
# local copy, using the same established normal-build conversion, then require
# the public pinned byte hash. Do not alter the public materializer or archive.
p=parent/'primary/Cargo.toml';original=p.read_bytes();s=original.decode();start=s.index('[profile.release]');converted=s[:start].rstrip()+'\n'
assert sha(converted.encode())==m.PINS['parent_source_sha256']['programs/pump/Cargo.toml'];p.write_text(converted)
source=D/'source780';inputs=m.materialize(parent,source,'sourcefronts780')
(D/'public-inputs.json').write_text(json.dumps({'ref':'3887bcf3fbcfe308c986094a51a99bf75240a0a7','public_files':{q.name:sha(q.read_bytes()) for q in pub.iterdir() if q.is_file()},'parent_manifest_adaptation':{'archive_sha256':sha(original),'workspace_sha256':sha(converted.encode()),'only_modified_path':'primary/Cargo.toml'},'materialized_source':inputs},indent=2)+'\n')
candidate=D/'source-local-feeconfig';shutil.copytree(source,candidate)
p=candidate/'programs/pump/src/trade_types.rs';before=p.read_text();old='    accounts::FeeConfig,\n';assert before.count(old)==1
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
print('validated public780 source map',len(inputs),'files')
