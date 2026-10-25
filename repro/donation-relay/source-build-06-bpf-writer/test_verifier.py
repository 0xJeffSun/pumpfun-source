#!/usr/bin/env python3
"""Static verifier tests only; mutate temporary copies, never build/run target."""
import hashlib,json,shutil,subprocess,tempfile
from pathlib import Path
P=Path(__file__).resolve().parent
H=lambda b:hashlib.sha256(b).hexdigest()
def seal(q):
 m={str(x.relative_to(q)):H(x.read_bytes()) for x in sorted(q.rglob('*')) if x.is_file() and str(x.relative_to(q)) not in ('manifest.json','manifest.sha256')};(q/'manifest.json').write_text(json.dumps(m,sort_keys=True,indent=2)+'\n');(q/'manifest.sha256').write_text(H((q/'manifest.json').read_bytes())+'  manifest.json\n')
def tests(pythons):
 rows=[]
 with tempfile.TemporaryDirectory(prefix='relay06-static-copy-') as tmp:
  for i,python in enumerate(pythons):
   q=Path(tmp)/f'positive-{i}';shutil.copytree(P,q);r=subprocess.run([python,'-B',str(q/'verify.py')],cwd=tmp,capture_output=True,text=True);assert r.returncode==0,r.stderr;rows.append({'case':'copied-default-positive','interpreter':python,'returncode':0,'result':json.loads(r.stdout)})
  for case in ['missing-candidate','tampered-source','resealed-field-ledger','resealed-dependency-omission','resealed-tool-change']:
   q=Path(tmp)/case;shutil.copytree(P,q)
   if case=='missing-candidate':(q/'candidate.so').unlink()
   if case=='tampered-source':
    x=q/'source/src/bpf_writer.rs';x.write_text(x.read_text()+'\n')
   if case=='resealed-field-ledger':
    x=q/'serializer-fields.json';v=json.loads(x.read_text());v[0]['fields'][0]['candidate_pc']+=8;x.write_text(json.dumps(v));seal(q)
   if case=='resealed-dependency-omission':
    x=q/'attempt/dependency-source-after.json';v=json.loads(x.read_text());v.pop();x.write_text(json.dumps(v));seal(q)
   if case=='resealed-tool-change':
    x=q/'attempt/tool-phase-after.json';v=json.loads(x.read_text());next(iter(v['tools'].values()))['sha256']='0'*64;x.write_text(json.dumps(v));seal(q)
   r=subprocess.run([pythons[0],'-B',str(q/'verify.py')],cwd=tmp,capture_output=True,text=True);assert r.returncode!=0,case;rows.append({'case':case,'rejected':True,'returncode':r.returncode,'last_diagnostic':r.stderr.strip().splitlines()[-1]})
 return {'scope':'static verifier copies, no compiler or target execution','passed':len(rows),'tests':rows}
