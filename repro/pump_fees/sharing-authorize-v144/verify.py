from pathlib import Path
import argparse,json,hashlib,tempfile,tarfile,subprocess,sys,shutil
P=Path(__file__).resolve().parent;J=lambda p:json.loads(p.read_text());H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
a=argparse.ArgumentParser();a.add_argument('--runtime-signatures',action='store_true');args=a.parse_args();m=J(P/'manifest.json');assert set(m)=={str(f.relative_to(P))for f in P.rglob('*')if f.is_file()and f not in[P/'manifest.json',P/'manifest.sha256']};assert H(P/'manifest.json')==(P/'manifest.sha256').read_text().split()[0]
for n,h in m.items():assert H(P/n)==h,n
s=J(P/'acceptance.json');assert H(P/'candidate.so')==s['candidate_sha256']and H(P/'symbols.so')==s['symbols_sha256'];assert J(P/'coverage.json')['admin_match_cases']==[]
with tempfile.TemporaryDirectory()as d:
 t=Path(d)
 for f in P.glob('*.tar.gz'):
  with tarfile.open(f)as z:z.extractall(t,filter='data')
 def run(f):
  p=subprocess.run([sys.executable,'-B',str(f)],cwd=t,capture_output=True,text=True);assert p.returncode==0,p.stderr;return json.loads(p.stdout)
 assert run(t/'source-proof/verify.py')['passed'];assert run(t/'build/analysis/verify_static.py')['passed']
 b=t/'build';w=t/'runtime-evidence';assert J(b/'controller-exit.json')['returncode']==J(w/'controller-exit.json')['returncode']==0
 for n,h in s['source'].items():assert H(b/'repo'/n)==H(w/'source'/n)==h
 summary=J(w/'runtime/summary.json');assert len(summary['results'])==11 and sum(x['expected_cases']or 0 for x in summary['results'])==17461
 for r in summary['results']:assert r['passed']and r['returncode']==0 and H(w/'runtime'/(r['name']+'.json'))==r['report_sha256']
 if args.runtime_signatures:
  v=w/'saved-verification';shutil.copy2(P/'candidate.so',v/'candidate.so');(v/'runner-repo').symlink_to(w/'runner-repo');assert run(v/'verify_prior_saved.py')==J(v/'prior.stdout')
  from solders.transaction import VersionedTransaction
  import base64
  count=[0,0]
  def walk(x):
   if isinstance(x,dict):
    if isinstance(x.get('transaction_base64'),str):
     raw=base64.b64decode(x['transaction_base64']);tx=VersionedTransaction.from_bytes(raw);assert bytes(tx)==raw and all(tx.verify_with_results());count[0]+=1;count[1]+=len(tx.signatures)
    for k,v in x.items():
     if k!='transaction_base64':walk(v)
   elif isinstance(x,list):
    for v in x:walk(v)
  walk(J(w/'runtime/focused20.json'));assert count==[40,80]
print(json.dumps({'passed':True,'comparisons':17461,'separate_steps':10,'runtime_signatures_reverified':args.runtime_signatures,'new_target_executions':0}))
