"""NEW v3: package reviewed v2 stage identity faithfully; no active/build/runtime writes."""
from pathlib import Path
import argparse,json,shutil,sys
sys.dont_write_bytecode=True
from bindings import H,J,tree,record,CHECKPOINT,V2
P=Path(__file__).resolve().parent
if __name__=='__main__':
 a=argparse.ArgumentParser();a.add_argument('--reviewed-plan-sha256',required=True);a.add_argument('--stage',type=Path,required=True);a.add_argument('--output',type=Path,required=True);args=a.parse_args()
 tree(P,args.reviewed_plan_sha256);V=P/'prior-v2';tree(V,V2)
 S=args.stage.resolve();Q=S/'source-build-12-idl-discriminator-owned';r=J(S/'publication-identity.json');c=J(V/'current.proposed.json');record(r,V,c,Q)
 for n in['current.proposed.json','README.proposed.md']:assert(S/n).read_bytes()==(V/n).read_bytes()
 assert H(Q/'manifest.json')==CHECKPOINT
 O=args.output.resolve();assert O!=P and P not in O.parents and O!=S and S not in O.parents,'Output must be outside reviewed plan and staged checkpoint trees';assert not O.exists();O.mkdir(parents=True)
 shutil.copytree(V,O/'reviewed-v2')
 # Carry exact reviewed v3 manifest and all its controls for independently verifiable review binding.
 shutil.copytree(P,O/'reviewed-v3')
 for n in['current.before.json','current.proposed.json','README.before.md','README.proposed.md','stage_integration.py']:shutil.copyfile(V/n,O/n)
 for source,name in[(S/'publication-identity.json','publication-identity.json'),(Q/'manifest.json','checkpoint-manifest.json'),(Q/'launcher/resolved-source-sha256.json','source-map.json'),(P/'bindings.py','bindings.py'),(P/'verify_selection.py','verify.py')]:shutil.copyfile(source,O/name)
 (O/'selection.json').write_text(json.dumps({'reviewed_v3_plan_sha256':args.reviewed_plan_sha256,'reviewed_v2_plan_sha256':V2,'checkpoint_seal':CHECKPOINT,'state':'immutable_selection_proposal; application checked separately','new_builds':0,'new_target_executions':0,'v2_stage_record_preserved':True},indent=2)+'\n')
 m={str(f.relative_to(O)):H(f)for f in sorted(O.rglob('*'))if f.is_file()};(O/'manifest.json').write_text(json.dumps(m,indent=2)+'\n');(O/'manifest.sha256').write_text(H(O/'manifest.json')+'  manifest.json\n');print(H(O/'manifest.json'))
