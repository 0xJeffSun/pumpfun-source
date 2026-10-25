"""UNEXECUTED: package selection evidence after root-reviewed stage; no active writes."""
from pathlib import Path
import argparse,json,hashlib,shutil
P=Path(__file__).resolve().parent;H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
a=argparse.ArgumentParser();a.add_argument('--reviewed-plan-sha256',required=True);a.add_argument('--stage',type=Path,required=True);a.add_argument('--output',type=Path,required=True);args=a.parse_args()
assert H(P/'manifest.json')==args.reviewed_plan_sha256
for n,h in json.loads((P/'manifest.json').read_text()).items():assert H(P/n)==h
S=args.stage.resolve();Q=S/'source-build-12-idl-discriminator-owned';record=json.loads((S/'publication-identity.json').read_text());assert record['reviewed_plan_sha256']==args.reviewed_plan_sha256 and record['staged_manifest_sha256']=='d12ad064c15a5e1760f6a566349f982b9e4e4e57430b455a0386b89a4a57248a'
O=args.output.resolve();assert not O.exists();O.mkdir(parents=True)
for n in ['current.before.json','current.proposed.json','README.before.md','README.proposed.md','stage_integration.py']:shutil.copy2(P/n,O/n)
shutil.copy2(S/'publication-identity.json',O/'publication-identity.json');shutil.copy2(Q/'manifest.json',O/'checkpoint-manifest.json');shutil.copy2(Q/'launcher/resolved-source-sha256.json',O/'source-map.json');shutil.copy2(P/'verify_selection.py',O/'verify.py')
(O/'selection.json').write_text(json.dumps({'reviewed_plan_sha256':args.reviewed_plan_sha256,'checkpoint_seal':record['staged_manifest_sha256'],'state':'selection_proposal_not_applied','new_builds':0,'new_target_executions':0},indent=2)+'\n')
m={str(f.relative_to(O)):H(f)for f in sorted(O.rglob('*'))if f.is_file()};(O/'manifest.json').write_text(json.dumps(m,indent=2)+'\n');(O/'manifest.sha256').write_text(H(O/'manifest.json')+'  manifest.json\n');print(H(O/'manifest.json'))
