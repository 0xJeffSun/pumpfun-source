from pathlib import Path
import argparse,json,hashlib,difflib
p=argparse.ArgumentParser();p.add_argument('--repo',type=Path,required=True);a=p.parse_args();w=Path(__file__).resolve().parent;H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
for n,h in json.loads((w/'inputs.json').read_text()).items():assert H(a.repo/n)==h,n
lib='programs/pump-amm/src/lib.rs';im='programs/pump-amm/src/instructions/mod.rs';tm='programs/pump-amm/src/instructions/token_incentives/mod.rs';ctx='programs/pump-amm/src/instructions/token_incentives/init_user_volume_accumulator.rs'
s=(w/'before'/lib).read_text();assert s==(a.repo/lib).read_text();start=s.index('#[event_cpi]\n#[derive(Accounts)]\npub struct InitUserVolumeAccumulator');end=s.index('#[event_cpi]\n#[derive(Accounts)]\npub struct CloseUserVolumeAccumulator',start);block=s[start:end];assert block==(w/'context-verbatim.rs').read_text();assert(w/'after'/ctx).read_text()=='use crate::*;\n\n'+block
imports='pub use instructions::token_incentives::init_user_volume_accumulator::InitUserVolumeAccumulator;\nuse instructions::token_incentives::*;\n';assert(w/'after'/lib).read_text()==(s[:start]+s[end:]).replace('use instructions::admin::create_config::*;\n','use instructions::admin::create_config::*;\n'+imports,1)
assert(w/'before'/im).read_text()==(a.repo/im).read_text();assert(w/'after'/im).read_text()==(w/'before'/im).read_text()+'pub mod token_incentives;\n';assert(w/'after'/tm).read_text()=='pub mod init_user_volume_accumulator;\npub(crate) use init_user_volume_accumulator::*;\n'
paths=[lib,im,tm,ctx];before={n:(w/'before'/n).read_text()for n in [lib,im]};after={n:(w/'after'/n).read_text()for n in paths};patch=''.join(''.join(difflib.unified_diff(before.get(n,'').splitlines(True),after[n].splitlines(True),fromfile='a/'+n if n in before else '/dev/null',tofile='b/'+n))for n in paths);assert patch==(w/'proposal.patch').read_text()
assert after[ctx].splitlines().index('#[derive(Accounts)]')+1==4
if(w/'manifest.json').exists():
 m=json.loads((w/'manifest.json').read_text());assert set(m)=={str(f.relative_to(w))for f in w.rglob('*')if f.is_file()and f not in[w/'manifest.json',w/'manifest.sha256']}
 for n,h in m.items():assert H(w/n)==h,n
 assert H(w/'manifest.json')==(w/'manifest.sha256').read_text().strip()
print('PASS: exact4-file logical-module proposal; context verbatim;28 accepted inputs fixed; no build or runtime evidence.')
