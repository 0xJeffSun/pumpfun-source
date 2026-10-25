#!/usr/bin/env python3
"""Only verifier tests on temporary copies. Never a Solana/runtime test."""
import argparse,hashlib,json,shutil,subprocess,sys,tempfile
from pathlib import Path
P=Path(__file__).resolve().parent
H=lambda b:hashlib.sha256(b).hexdigest()
def seal(q):
 m={str(x.relative_to(q)):H(x.read_bytes()) for x in sorted(q.rglob('*')) if x.is_file() and str(x.relative_to(q)) not in ('manifest.json','manifest.sha256')}
 (q/'manifest.json').write_text(json.dumps(m,sort_keys=True,indent=2)+'\n');(q/'manifest.sha256').write_text(H((q/'manifest.json').read_bytes())+'  manifest.json\n')
def tests(pythons,repo):
 rows=[]
 with tempfile.TemporaryDirectory(prefix='relay-static-verifier-') as tmp:
  for i,python in enumerate(pythons):
   q=Path(tmp)/f'copy-{i}';shutil.copytree(P,q)
   cmd=[python,'-B',str(q/'verify.py'),'--repo',str(repo)];r=subprocess.run(cmd,cwd=tmp,capture_output=True,text=True);assert r.returncode==0,r.stderr
   rows.append({'case':'copied-package-positive','interpreter':python,'returncode':r.returncode,'result':json.loads(r.stdout)})
  actions=['missing-candidate','tampered-candidate','resealed-ledger','resealed-proposed-source','unlisted-bytecode-cache']
  for case in actions:
   q=Path(tmp)/case;shutil.copytree(P,q)
   if case=='missing-candidate':(q/'build05/candidate.so').unlink()
   if case=='tampered-candidate':
    x=q/'build05/candidate.so';b=bytearray(x.read_bytes());b[128]^=1;x.write_bytes(b)
   if case=='resealed-ledger':
    x=q/'field-stream-map.json';v=json.loads(x.read_text());v[0]['fields'][0]['bytes']=9;x.write_text(json.dumps(v));seal(q)
   if case=='resealed-proposed-source':
    x=q/'source-proposal/src/generated_exit.rs';x.write_text(x.read_text().replace('BpfWriter::new(data)','BpfWriter::new(data /* changed */)',1));m=json.loads((q/'source-proposal-sha256.json').read_text());m['src/generated_exit.rs']=H(x.read_bytes());(q/'source-proposal-sha256.json').write_text(json.dumps(m));seal(q)
   if case=='unlisted-bytecode-cache':
    x=q/'__pycache__/x.pyc';x.parent.mkdir();x.write_bytes(b'not an input')
   r=subprocess.run([pythons[0],'-B',str(q/'verify.py')],cwd=tmp,capture_output=True,text=True);assert r.returncode!=0,case
   rows.append({'case':case,'rejected':True,'returncode':r.returncode,'diagnostic_last_line':r.stderr.strip().splitlines()[-1]})
 return {'scope':'static verifier tests only; no new transaction, build or target execution','tests':rows,'passed':len(rows)}
if __name__=='__main__':
 ap=argparse.ArgumentParser();ap.add_argument('--repo',type=Path,required=True);ap.add_argument('--python',action='append');args=ap.parse_args();print(json.dumps(tests(args.python or [sys.executable],args.repo.resolve()),indent=2,sort_keys=True))
