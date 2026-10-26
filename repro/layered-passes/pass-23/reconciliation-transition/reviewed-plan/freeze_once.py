"""UNEXECUTED root-reviewed freeze. Writes only a new work companion, not current inputs."""
from pathlib import Path
import argparse,json,shutil,sys
sys.dont_write_bytecode=True
from bridge import H,J,manifest,check
P=Path(__file__).resolve().parent
if __name__=='__main__':
 a=argparse.ArgumentParser();a.add_argument('--current-root',type=Path,required=True);a.add_argument('--reviewed-plan-sha256',required=True);a.add_argument('--reviewed-attributes-sha256',required=True);a.add_argument('--output',type=Path,required=True);args=a.parse_args();manifest(P,args.reviewed_plan_sha256);R=args.current_root.resolve();witness=check(P,R,args.reviewed_attributes_sha256)
 D=args.output.resolve();D.relative_to(R/'work');assert D!=P and P not in D.parents and not D.exists(),'New companion only; never retry/overwrite'
 D.mkdir(parents=True);shutil.copytree(P,D/'reviewed-plan')
 for n in['bridge.py','verify_current.py']:shutil.copyfile(P/n,D/('verify.py'if n=='verify_current.py'else n))
 shutil.copyfile(R/'.gitattributes',D/'attributes.after');witness['reviewed_plan_sha256']=args.reviewed_plan_sha256;witness['controller_sha256']=H(P/'freeze_once.py');witness['current_state_frozen_once']=True
 (D/'transition.json').write_text(json.dumps(witness,indent=2)+'\n')
 m={str(f.relative_to(D)):H(f)for f in sorted(D.rglob('*'))if f.is_file()};(D/'manifest.json').write_text(json.dumps(m,indent=2)+'\n');(D/'manifest.sha256').write_text(H(D/'manifest.json')+'  manifest.json\n');print(H(D/'manifest.json'))
