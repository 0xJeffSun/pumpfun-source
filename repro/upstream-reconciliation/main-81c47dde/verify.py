#!/usr/bin/env python3
"""Read-only verification of the audit-main reconciliation evidence."""
import argparse,hashlib,json
from pathlib import Path
P=Path(__file__).resolve().parent;H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();a=argparse.ArgumentParser();a.add_argument('--current',type=Path);args=a.parse_args()
m=json.loads((P/'manifest.json').read_text());assert H(P/'manifest.json')==(P/'manifest.sha256').read_text().split()[0]
assert set(m)=={str(p.relative_to(P))for p in P.rglob('*')if p.is_file()and p not in[P/'manifest.json',P/'manifest.sha256']}
for n,h in m.items():assert not(P/n).is_symlink()and H(P/n)==h,n
r=json.loads((P/'resolution.json').read_text());assert r['target_executions']==0 and r['protected_programs_workflow_binding_scripts_equal_to_base']
assert len(r['paths'])==101 and r['conflicts']==['repro/status.json']
assert H(P/'before-helper.py')=='e0eccab6f54fee2996039beb53075d9a7b3f411706a90634a44420dec7b173c1';assert H(P/'after-helper.py')=='bb683621ffc4297c58f030cb03da54484b7370b786fd8eda965a37f4b3198ee9'
if args.current:
 for row in r['paths']:assert H(args.current/row['path'])==row['resolved_sha256'],row['path']
 assert(args.current/'repro/status.json').read_bytes()==(P/'accepted-status.json').read_bytes()
print(json.dumps({'status':'PASS','incoming_paths':len(r['paths']),'current_checked':bool(args.current),'target_executions':0}))
