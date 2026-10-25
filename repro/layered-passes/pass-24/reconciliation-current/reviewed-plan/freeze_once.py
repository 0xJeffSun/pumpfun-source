"""UNEXECUTED until root reviews exact plan seal. New work outputs only; no active edits."""
from pathlib import Path
import argparse,json,shutil,sys
sys.dont_write_bytecode=True
from bridge import sealed,check,H,J
P=Path(__file__).resolve().parent
if __name__=='__main__':
 a=argparse.ArgumentParser();a.add_argument('--repo',type=Path,required=True);a.add_argument('--reviewed-plan-seal',required=True);a.add_argument('--reviewed-attributes-sha256',required=True);a.add_argument('--output',type=Path,required=True);args=a.parse_args();sealed(P,args.reviewed_plan_seal);R=args.repo.resolve();assert args.reviewed_attributes_sha256==J(P/'plan.json')['attributes_sha256'];witness=check(P,R)
 D=args.output.resolve();D.relative_to(R/'work');assert D!=P and P not in D.parents and not D.exists();wrapper=D.with_name(D.name+'-verify_reconciliation.py');assert not wrapper.exists()
 D.mkdir(parents=True);shutil.copytree(P,D/'reviewed-plan');shutil.copy2(P/'bridge.py',D/'bridge.py');shutil.copy2(P/'verify_current.py',D/'verify.py')
 (D/'transition.json').write_text(json.dumps({'reviewed_plan_seal':args.reviewed_plan_seal,'controller_sha256':H(P/'freeze_once.py'),'current_state_frozen_once':True,'witness':witness},indent=2)+'\n')
 m={str(f.relative_to(D)):H(f)for f in sorted(D.rglob('*'))if f.is_file()};(D/'manifest.json').write_text(json.dumps(m,indent=2)+'\n');seal=H(D/'manifest.json');(D/'manifest.sha256').write_text(seal+'  manifest.json\n')
 # External wrapper receives the already-final companion seal: no circular seal or current-state self-reference.
 wrapper.write_text((P/'wrapper.template.txt').read_text().replace('@KNOWN_SEAL@',seal))
 print(json.dumps({'seal':seal,'companion':str(D),'external_wrapper':str(wrapper),'copy_companion_to':'repro/layered-passes/pass-24/reconciliation-current','copy_wrapper_to':'repro/layered-passes/pass-24/verify_reconciliation.py','new_builds':0,'new_target_executions':0}))
