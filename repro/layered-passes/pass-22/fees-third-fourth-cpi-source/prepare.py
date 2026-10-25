from pathlib import Path
import json,shutil,hashlib,difflib,sys
P=Path(__file__).resolve().parent;R=P.parents[1];H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
for d in ['inputs','method','evidence','baseline','third-layer','proposal']:(P/d).mkdir(exist_ok=True)
base=(R/'programs/pump-fees/src/sharing.rs').read_text();third=(R/'work/fees-sharing-amm-extend-review/proposal/sharing.rs').read_text();old=next(l for l in third.splitlines()if 'vec![208,8,159,4,74,175,16,58]'in l);new='''   crate::pump_amm::cpi::migrate_pool_coin_creator(CpiContext::new(
       program.to_account_info(),
       crate::pump_amm::cpi::accounts::MigratePoolCoinCreator {
           pool: pool.to_account_info(),
           sharing_config: state.to_account_info(),
           event_authority: event.to_account_info(),
           program: program.to_account_info(),
       },
   ))?;''';assert third.count(old)==1;after=third.replace(old,new)
(P/'baseline/sharing.rs').write_text(base);(P/'third-layer/sharing.rs').write_text(third);(P/'proposal/sharing.rs').write_text(after)
for a,b,n in [(third,after,'fourth-only.patch'),(base,after,'combined.patch')]: (P/n).write_text(''.join(difflib.unified_diff(a.splitlines(True),b.splitlines(True),fromfile='a/programs/pump-fees/src/sharing.rs',tofile='b/programs/pump-fees/src/sharing.rs')))
shutil.copy2(R/'work/fees-sharing-amm-extend-review/proposal/pump_amm.json',P/'proposal/pump_amm.json');shutil.copy2(R/'programs/pump-fees/idls/pump_amm.json',P/'baseline/pump_amm.json')
for n in ['elf_reader.py','disasm.py','analyze_elf.py']:shutil.copy2(R/'work/fees-sharing-amm-extend-review/method'/n,P/'method'/n)
shutil.copy2(R/'work/fees-sharing-amm-extend-review/inputs/original.so',P/'inputs/original.so');shutil.copy2(R/'work/fees-sharing-second-pump-cpi-build/analysis/full-function-inventory.json',P/'inputs/inventory.json')
sys.path.insert(0,str(P/'method'));import disasm;e=disasm.a.Elf((P/'inputs/original.so').read_bytes());I=json.loads((P/'inputs/inventory.json').read_text());rows=[]
for a in [177720,445160,579040,592712,591584,63024,724336]:
 r=next(x for x in I['original_rows']if x['start']==a);rows.append(r);(P/'evidence'/f'original-{a}.asm').write_text(disasm.render(e,a,r['end']))
(P/'evidence/ledger.json').write_text(json.dumps(rows,indent=2)+'\n');s=json.loads((R/'work/fees-sharing-second-pump-cpi-main-control/source-proposed.json').read_text());assert all(H(R/n)==h for n,h in s.items());(P/'bindings.json').write_text(json.dumps({'active_source':s,'active_candidate':'466725afe7406860177df56696a60897874ffa6dab7429e5cc62da087dbf48b5','third_layer_seal':'4b2ccbbc6eaf116d1e6a2af76afca4a077b2491c28451f5b5a53d622e00f1398','third_build_candidate':'abf283eff5760778c6eb9a2c44ef372c23bd901a0a21a32acb4d2f99da2f9d4a','combined_proposal_is_unbuilt':True},indent=2)+'\n')
