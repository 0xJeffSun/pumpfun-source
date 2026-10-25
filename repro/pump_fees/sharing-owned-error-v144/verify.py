#!/usr/bin/env python3
"""Verify sealed saved evidence only; never compile or execute target programs."""
from pathlib import Path
import argparse,json,hashlib,tempfile,tarfile,shutil,subprocess,sys,gzip,base64
P=Path(__file__).resolve().parent
J=lambda p:json.loads(p.read_text());H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
a=argparse.ArgumentParser();a.add_argument('--runtime-signatures',action='store_true');args=a.parse_args()
m=J(P/'manifest.json');assert H(P/'manifest.json')==(P/'manifest.sha256').read_text().split()[0]
assert set(m)=={str(f.relative_to(P))for f in P.rglob('*')if f.is_file()and f not in[P/'manifest.json',P/'manifest.sha256']}
for n,h in m.items():assert not(P/n).is_symlink()and H(P/n)==h,n
s=J(P/'acceptance.json');assert H(P/'build01/candidate.so')==s['candidate_sha256'] and H(P/'build01/symbols.so')==s['symbols_sha256']
assert len(s['scratch_source_sha256'])==26
for n,h in s['scratch_source_sha256'].items():assert H(P/'source'/n)==h,n
assert J(P/'dependency-before.json')==J(P/'dependency-after.json')
u=J(P/'runtime-engine-before.json');v=J(P/'runtime-engine-after.json');u.pop('scope');v.pop('scope');assert u==v
sys.path.insert(0,str(P/'analysis/method'));import inventory_method
assert inventory_method.catalogue(P/'build01/candidate.so',P/'build01/symbols.so')==J(P/'analysis/full-function-inventory.json')
with tempfile.TemporaryDirectory(prefix='fees-sharing-evidence-') as d:
 t=Path(d)
 for n in ['initial-source-review.tar.gz','runtime-repository.tar.gz','receipts-and-verification.tar.gz']:
  with tarfile.open(P/n) as z:z.extractall(t,filter='data')
 def run(script):
  p=subprocess.run([sys.executable,'-B',str(script)],cwd=t,capture_output=True,text=True);assert p.returncode==0,p.stderr;return p.stdout
 assert json.loads(run(t/'initial-source-review/verify.py'))==J(P/'source-review-verification.json')
 # Reproduce postbuild branch/converter check using a disposable expected layout.
 shutil.copy2(P/'build01/candidate.so',t/'candidate.so');shutil.copy2(P/'build01/symbols.so',t/'symbols.so');shutil.copytree(P/'source',t/'source');shutil.copy2(P/'gate-before.json',t/'gate-before.json');shutil.copytree(P/'analysis',t/'analysis');shutil.copy2(P/'check_sharing.py',t/'check_sharing.py');shutil.copy2(P/'before-sharing.rs',t/'before-sharing.rs');run(t/'check_sharing.py');assert J(t/'static-gate.json')==J(P/'static-gate.json')
 r=J(t/'runtime/summary.json');assert len(r['results'])==11 and all(x['returncode']==0 and x['passed'] for x in r['results'])
 assert sum(x['expected_cases']or 0 for x in r['results'])==17461
 for x in r['results']:
  p=t/'runtime'/(x['name']+'.json');assert H(p)==x['report_sha256'];z=J(p);assert z['candidate_sha256']==s['candidate_sha256'] and not z.get('mismatches',[])
 if args.runtime_signatures:
  v=t/'saved-verification';shutil.copy2(P/'build01/candidate.so',v/'candidate.so');(v/'runner-repo').symlink_to(t/'runner-repo');assert json.loads(run(v/'verify_prior_saved.py'))==J(v/'prior.stdout')
  from solders.transaction import VersionedTransaction
  counts={'fields':0,'signatures':0}
  def walk(v):
   if isinstance(v,dict):
    if isinstance(v.get('transaction_base64'),str):
     raw=base64.b64decode(v['transaction_base64']);tx=VersionedTransaction.from_bytes(raw);assert bytes(tx)==raw and all(tx.verify_with_results());counts['fields']+=1;counts['signatures']+=len(tx.signatures)
    for k,x in v.items():
     if k!='transaction_base64':walk(x)
   elif isinstance(v,list):
    for x in v:walk(x)
  walk(J(t/'runtime/focused20.json'));assert counts==J(v/'focused-signatures.json')
print(json.dumps({'passed':True,'candidate_sha256':s['candidate_sha256'],'comparisons':17461,'sequence_steps':10,'runtime_signatures_reverified':args.runtime_signatures}))
