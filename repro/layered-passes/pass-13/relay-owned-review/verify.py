from pathlib import Path
import argparse,hashlib,json,tempfile,shutil,subprocess,sys,importlib.util
P=Path(__file__).resolve().parent;H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();J=lambda p:json.loads(p.read_text())
p=argparse.ArgumentParser();p.add_argument('--repo',type=Path,required=True);a=p.parse_args();R=a.repo.resolve()
m=J(P/'manifest.json')['files'];assert H(P/'manifest.json')==(P/'manifest.sha256').read_text().strip()
assert set(m)=={str(f.relative_to(P))for f in P.rglob('*')if f.is_file()and f not in[P/'manifest.json',P/'manifest.sha256']}
for n,h in m.items():assert H(P/n)==h and not(P/n).is_symlink(),n
x=J(P/'execution.json');O=P/'original';assert H(O/'manifest.json')==x['original_manifest_sha256']
om=J(O/'manifest.json');om=om.get('files',om)
for n,v in om.items():assert H(O/n)==(v['sha256']if isinstance(v,dict)else v),n
with tempfile.TemporaryDirectory(prefix='static-review-',dir=P.parent)as tmp:
 T=Path(tmp)/'review';shutil.copytree(O,T)
 if x['runner']:
  f=T/x['runner'];s=f.read_text()
  if x['rewrite_work_path']:
   old="W=R/"+repr(x['rewrite_work_path']);assert s.count(old)==1;s=s.replace(old,"W=Path(__file__).resolve().parent")
  f.write_text(s);run=subprocess.run([sys.executable,'-B',str(f)],cwd=R,capture_output=True,text=True);assert run.returncode==0,(run.stdout,run.stderr)
  for n,v in om.items():
   if n==x['runner']and x['rewrite_work_path']:continue
   assert H(T/n)==(v['sha256']if isinstance(v,dict)else v),('regenerated mismatch',n)
 else:
  spec=importlib.util.spec_from_file_location('selected_analysis',T/'analyze.py');mod=importlib.util.module_from_spec(spec);spec.loader.exec_module(mod)
  for side,rows in J(T/'selected.json').items():
   if side not in ['original','candidate']:continue
   elf=mod.Elf((T/(side+'.so')).read_bytes())
   for row in rows:assert hashlib.sha256(elf.at(row['start'],row['bytes'])).hexdigest()==row['raw_sha256']
print(json.dumps({'status':'PASS','review':P.name,'mode':x['mode'],'target_executions':0,'source_changes':0},indent=2))
