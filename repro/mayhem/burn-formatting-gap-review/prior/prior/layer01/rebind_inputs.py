#!/usr/bin/env python3
"""Optional read-only Git binding, always at the immutable manifest revision."""
import argparse,hashlib,json,pathlib,subprocess
P=pathlib.Path(__file__).resolve().parent
p=argparse.ArgumentParser();p.add_argument('--repo',required=True);a=p.parse_args()
rows=json.loads((P/'inputs.json').read_text())
for r in rows:
 b=subprocess.check_output(['git','-C',a.repo,'show',r['commit']+':'+r['path']])
 assert hashlib.sha256(b).hexdigest()==r['sha256'] and len(b)==r['size'],r['path']
 assert b==(P/'inputs'/r['path']).read_bytes(),r['path']
print(json.dumps({'status':'PASS','fixed_git_inputs':len(rows),'baseline':rows[0]['commit']}))
