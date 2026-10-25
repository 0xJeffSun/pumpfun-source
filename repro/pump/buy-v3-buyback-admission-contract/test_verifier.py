#!/usr/bin/env python3
"""Exercise static integrity checks on temporary copies only."""
import json,hashlib,shutil,subprocess,tempfile
from pathlib import Path
P=Path(__file__).resolve().parent
H=lambda b:hashlib.sha256(b).hexdigest()
def seal(p):
 m={str(x.relative_to(p)):H(x.read_bytes())for x in sorted(p.rglob('*'))if x.is_file()and str(x.relative_to(p))not in ['manifest.json','manifest.sha256']};(p/'manifest.json').write_text(json.dumps(m,sort_keys=True,indent=2)+'\n');(p/'manifest.sha256').write_text(H((p/'manifest.json').read_bytes())+'  manifest.json\n')
def tests(pythons):
 rows=[]
 with tempfile.TemporaryDirectory(prefix='buyback-admission-static-')as tmp:
  for i,python in enumerate(pythons):
   p=Path(tmp)/f'positive-{i}';shutil.copytree(P,p);r=subprocess.run([python,'-B',str(p/'verify.py')],cwd=tmp,capture_output=True,text=True);assert r.returncode==0,r.stderr;rows.append({'case':'copied-default-positive','python':python,'returncode':r.returncode,'result':json.loads(r.stdout)})
  for case in ['missing-original','changed-contract-order','changed-source-array','missing-obligation-evidence']:
   p=Path(tmp)/case;shutil.copytree(P,p)
   if case=='missing-original':(p/'prior/b4/evidence/original.so').unlink()
   if case=='changed-contract-order':
    x=p/'admission-contract.json';j=json.loads(x.read_text());j['native_order'].reverse();x.write_text(json.dumps(j));seal(p)
   if case=='changed-source-array':
    x=p/'source/buyback_admission.rs';x.write_text(x.read_text().replace('[Pubkey; 8]','[Pubkey; 7]'));(p/'source/SOURCE_HASH.json').write_text(json.dumps({'buyback_admission.rs':H(x.read_bytes())}));seal(p)
   if case=='missing-obligation-evidence':(p/'prior/b4/prior/preservation-ledger.json').unlink();seal(p)
   r=subprocess.run([pythons[0],'-B',str(p/'verify.py')],cwd=tmp,capture_output=True,text=True);assert r.returncode!=0,case;rows.append({'case':case,'rejected':True,'returncode':r.returncode})
 return {'scope':'saved-byte and source integrity only; no target execution','passed':len(rows),'tests':rows}
