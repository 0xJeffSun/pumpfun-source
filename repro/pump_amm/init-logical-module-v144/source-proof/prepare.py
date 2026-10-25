from pathlib import Path
import json,hashlib,difflib
R=Path.cwd();W=Path(__file__).resolve().parent
lib='programs/pump-amm/src/lib.rs';im='programs/pump-amm/src/instructions/mod.rs';tm='programs/pump-amm/src/instructions/token_incentives/mod.rs';ctx='programs/pump-amm/src/instructions/token_incentives/init_user_volume_accumulator.rs'
before={lib:(R/lib).read_text(),im:(R/im).read_text()};s=before[lib];start=s.index('#[event_cpi]\n#[derive(Accounts)]\npub struct InitUserVolumeAccumulator');end=s.index('#[event_cpi]\n#[derive(Accounts)]\npub struct CloseUserVolumeAccumulator',start);block=s[start:end];assert block.endswith('}\n')
imports='pub use instructions::token_incentives::init_user_volume_accumulator::InitUserVolumeAccumulator;\nuse instructions::token_incentives::*;\n'
after={lib:(s[:start]+s[end:]).replace('use instructions::admin::create_config::*;\n','use instructions::admin::create_config::*;\n'+imports,1),im:before[im]+'pub mod token_incentives;\n',tm:'pub mod init_user_volume_accumulator;\npub(crate) use init_user_volume_accumulator::*;\n',ctx:'use crate::*;\n\n'+block}
for side,files in [('before',before),('after',after)]:
 for n,text in files.items():p=W/side/n;p.parent.mkdir(parents=True,exist_ok=True);p.write_text(text)
(W/'context-verbatim.rs').write_text(block)
patch=''.join(''.join(difflib.unified_diff(before.get(n,'').splitlines(True),after[n].splitlines(True),fromfile='a/'+n if n in before else '/dev/null',tofile='b/'+n))for n in after);(W/'proposal.patch').write_text(patch)
source=json.loads((R/'repro/pump_amm/init-user-ownership-v144/proposed-source-sha256.json').read_text());H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
for n,h in source.items():assert H(R/n)==h,n
inputs={n:h for n,h in source.items()};inputs['work/amm-init-source-organization-review/manifest.json']=H(R/'work/amm-init-source-organization-review/manifest.json');(W/'inputs.json').write_text(json.dumps(inputs,indent=2)+'\n')
(W/'source-delta.json').write_text(json.dumps({'existing_changed':list(before),'added':[tm,ctx],'removed_files':[],'context_moved_verbatim':True,'new_derive_line':4,'original_recorded_derive_line':8,'current_before_derive_line':449,'workspace_dependencies_changed':False,'base_candidate':'3fe52eea99e26866795348aad93fb821f834bf04290b4176a67ae0b7add0fcb5'},indent=2)+'\n')
print('Prepared source-only4-file diff; no main edit/build.')
