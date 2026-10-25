"""v3 saved selection identity; no compile/target/network/signing."""
from pathlib import Path
import argparse,json,sys
sys.dont_write_bytecode=True
from bindings import H,J,tree,record,checkpoint,selected,CHECKPOINT,V2
P=Path(__file__).resolve().parent
if __name__=='__main__':
 a=argparse.ArgumentParser();a.add_argument('--checkpoint',type=Path,required=True);a.add_argument('--current-root',type=Path);args=a.parse_args();tree(P,H(P/'manifest.json'))
 s=J(P/'selection.json');assert s['reviewed_v2_plan_sha256']==V2 and s['checkpoint_seal']==CHECKPOINT and s['new_builds']==s['new_target_executions']==0 and s['v2_stage_record_preserved']
 tree(P/'reviewed-v3',s['reviewed_v3_plan_sha256']);tree(P/'reviewed-v2',V2)
 assert(P/'reviewed-v3/prior-v2/manifest.json').read_bytes()==(P/'reviewed-v2/manifest.json').read_bytes()
 for n,copy in [('bindings.py','bindings.py'),('verify_selection.py','verify.py')]:assert(P/'reviewed-v3'/n).read_bytes()==(P/copy).read_bytes()
 for n in['current.before.json','current.proposed.json','README.before.md','README.proposed.md','stage_integration.py']:assert(P/n).read_bytes()==(P/'reviewed-v2'/n).read_bytes()
 Q=args.checkpoint.resolve();c=J(P/'current.proposed.json');r=J(P/'publication-identity.json');record(r,P/'reviewed-v2',c,Q)
 assert H(P/'stage_integration.py')==r['controller_sha256'];assert H(P/'checkpoint-manifest.json')==CHECKPOINT
 assert J(P/'checkpoint-manifest.json')==J(Q/'manifest.json');checkpoint(Q,c,J(P/'source-map.json'))
 if args.current_root:selected(args.current_root,Q,c,((P/'current.proposed.json').read_bytes(),(P/'README.proposed.md').read_bytes()))
 print(json.dumps({'passed':True,'scope':'reviewed v3/v2 plan and exact checkpoint publication; applied selected paths checked only with current-root','current_selection_applied_checked':bool(args.current_root),'v2_stage_record_preserved':True,'new_builds':0,'new_target_executions':0}))
