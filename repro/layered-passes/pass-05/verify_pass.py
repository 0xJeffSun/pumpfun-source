#!/usr/bin/env python3
"""Verify frozen packets, current-analysis bindings and every byte interval."""
from pathlib import Path
import argparse, hashlib, json, os, subprocess, sys
P=Path(__file__).resolve().parent
parser=argparse.ArgumentParser()
parser.add_argument('--repo',type=Path,required=True)
parser.add_argument('--runtime-signatures',action='store_true')
args=parser.parse_args();root=args.repo.resolve()
h=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
results=[];env={**os.environ,'PYTHONDONTWRITEBYTECODE':'1'}
for row in json.loads((P/'packets.json').read_text()):
 package=root/row['path'];assert h(package/row['manifest'])==row['sha256'],row['path']
 manifest=json.loads((package/row['manifest']).read_text());payload=manifest.get('files',manifest)
 for name,value in payload.items():
  part=Path(name);assert not part.is_absolute() and '..' not in part.parts,name
  file=package/part;assert file.is_file() and not file.is_symlink(),file
  expected=value['sha256'] if isinstance(value,dict) else value
  assert h(file)==expected,file
 command=row.get('command')
 if command:
  cmd=[sys.executable,'-B',str(package/command[0]),*command[1:]]
  if row.get('main_checkpoint') and args.runtime_signatures:cmd+=['--runtime']
  run=subprocess.run(cmd,cwd=root,env=env,capture_output=True,text=True)
  assert run.returncode==0,(row['path'],run.stdout,run.stderr)
  results.append({'path':row['path'],'returncode':run.returncode,'stdout_sha256':hashlib.sha256(run.stdout.encode()).hexdigest()})
 else:results.append({'path':row['path'],'mode':'manifest integrity only','files':len(payload)})
index=json.loads((P/'current-analysis-index.json').read_text())
for name,row in index['programs'].items():
 for kind in ['original','candidate']:assert h(root/row[kind+'_path'])==row[kind+'_sha256'],(name,kind)
 for f in row['full_ledger_files']:assert h(root/f['path'])==f['sha256'],f['path']
for name in ['before-corrections','after-corrections']:
 run=subprocess.run([sys.executable,'-B',str(P/'verify_comparison.py'),str(P/name),'--repo',str(root)],cwd=root,env=env,capture_output=True,text=True)
 assert run.returncode==0,(name,run.stdout,run.stderr)
 results.append({'snapshot':name,'returncode':0,'stdout_sha256':hashlib.sha256(run.stdout.encode()).hexdigest()})
print(json.dumps({'status':'PASS','target_executions':0,'runtime_signature_reverification':args.runtime_signatures,'current_analysis_programs':len(index['programs']),'results':results},indent=2))
