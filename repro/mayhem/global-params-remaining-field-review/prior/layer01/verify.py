#!/usr/bin/env python3
"""Offline verifier; reads bundled evidence, never executes a target program."""
import hashlib,json,pathlib,subprocess,sys
sys.dont_write_bytecode=True
P=pathlib.Path(__file__).resolve().parent
sys.path.insert(0,str(P))
from analyze import analyze,ABI,CALL,FIELD,MACRO

def main():
 manifest=json.loads((P/'manifest.json').read_text())
 actual={p.relative_to(P).as_posix() for p in P.rglob('*') if p.is_file() and p!=P/'manifest.json'}
 assert actual==set(manifest),'Sealed file set differs'
 for name,info in manifest.items():
  p=P/name;assert p.is_file() and not p.is_symlink() and p.resolve().is_relative_to(P)
  b=p.read_bytes();assert len(b)==info['bytes'] and hashlib.sha256(b).hexdigest()==info['sha256'],name
 for r in json.loads((P/'inputs.json').read_text()):
  b=(P/'inputs'/r['path']).read_bytes()
  assert r['commit']=='c1ffdd0667608d4755227e68aab9f27a7e9a0d37'
  assert len(b)==r['size'] and hashlib.sha256(b).hexdigest()==r['sha256']
  assert hashlib.sha1(b'blob '+str(len(b)).encode()+b'\0'+b).hexdigest()==r['git_blob']
 expected=analyze();assert expected==json.loads((P/'residual-ledger.json').read_text()),'Static ledger differs'
 result=json.loads((P/'result.json').read_text());assert result['summary']==expected['summary']
 assert result['ledger_sha256']==hashlib.sha256((P/'residual-ledger.json').read_bytes()).hexdigest()
 checks=[]
 for package in [ABI,FIELD,CALL,MACRO]:
  proc=subprocess.run([sys.executable,'-B',str(P/'inputs'/package/'verify.py')],cwd=P,stdout=subprocess.PIPE,stderr=subprocess.PIPE,text=True)
  assert proc.returncode==0,(package,proc.stdout,proc.stderr)
  checks.append({'package':package,'status':'PASS','stdout':proc.stdout.strip()})
 print(json.dumps({'status':'PASS','baseline':result['baseline'],'sealed_files':len(manifest),'input_files':len(json.loads((P/'inputs.json').read_text())),'ledger_recomputed':True,'prior_static_verifiers':checks,'summary':expected['summary'],'scope':'Offline static identity, inventory, source binding and bounded assertions. No target execution or whole-program semantic proof.'},indent=2,sort_keys=True))
if __name__=='__main__':main()
