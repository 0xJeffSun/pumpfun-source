"""Verify sealed saved evidence; optional unchanged receipt verifiers/signatures.
No target execution, build, fixture creation or network operation.
"""
from pathlib import Path
import argparse,base64,gzip,hashlib,json,os,subprocess,sys,tarfile,tempfile
P=Path(__file__).resolve().parent
H=lambda b:hashlib.sha256(b).hexdigest()
a=argparse.ArgumentParser();a.add_argument('--runtime-signatures',action='store_true');a.add_argument('--output',type=Path);args=a.parse_args()
m=json.loads((P/'manifest.json').read_text());actual={str(f.relative_to(P))for f in P.rglob('*')if f.is_file()and f not in [P/'manifest.json',P/'manifest.sha256']and '__pycache__'not in f.parts}
assert actual==set(m['files'])
for rel,row in m['files'].items():
 b=(P/rel).read_bytes();assert len(b)==row['bytes']and H(b)==row['sha256'],rel
assert (P/'manifest.sha256').read_text().split()[0]==H((P/'manifest.json').read_bytes())
assert H((P/'build01/artifacts/mayhem_recovered.so').read_bytes())=='7d416f848f03e46d9a514f4c505a8e903cdb908f52280bb961254eed90aebe1f'
assert H((P/'build01/target/sbf-solana-solana/release/mayhem_recovered.so').read_bytes())=='948a1a13f9ff947c8a544db7a2241c95e09618c9bb3613d4d2ab900d986329d8'
summary=json.loads((P/'summary.json').read_text());flat=[];count=0
for r in summary['rows']:
 if r['name']=='burn':continue
 j=json.loads(gzip.decompress((P/'replay'/(r['name']+'.json.gz')).read_bytes()));assert not j['mismatches'];count+=j['case_count'];flat.append((r['name'],j))
burn=json.loads((P/'replay/burn/comparison.json').read_text())
assert len(flat)==20 and count==9589 and burn['case_count']==3 and burn['signed_transactions']==12 and burn['mismatches']==[0,1,2]
for row in burn['cases']:assert row['different_fields']==['second.logs_without_compute_numbers']
assert count+2*burn['case_count']==9595
ledger=json.loads(gzip.decompress((P/'static/complete-inventory.json.gz').read_bytes()));assert len(ledger['original_rows'])==441 and len(ledger['candidate_rows'])==410
report={'status':'PASS','sealed_files':len(m['files']),'functional_comparisons':9595,'known_burn_source_location_rows':3,'new_target_executions':0}
if args.runtime_signatures:
 assert args.output is not None,'--output is required for logs'
 out=args.output.resolve();assert not out.is_relative_to(P),'output must be outside sealed publication';out.mkdir(parents=True,exist_ok=True)
 from solders.transaction import Transaction
 txs=sigs=0
 def check(raw):
  global txs,sigs
  t=Transaction.from_bytes(base64.b64decode(raw));v=t.verify_with_results();assert v and all(v);txs+=1;sigs+=len(v)
 for _,j in flat:
  for row in j['cases']:
   for side in ['original','candidate']:
    if 'transaction_base64'in row[side]:check(row[side]['transaction_base64'])
 for row in burn['cases']:
  for side in ['original','candidate']:
   check(row[side]['transaction_base64']);check(row[side]['sequential_second']['transaction_base64'])
 assert (txs,sigs)==(13284,26500),(txs,sigs)
 with tempfile.TemporaryDirectory(prefix='saved-evidence-',dir=out) as td:
  T=Path(td)
  with tarfile.open(P/'runtime-repository.tar.gz')as t:t.extractall(T,filter='data')
  with tarfile.open(P/'receipts-and-verification.tar.gz')as t:t.extractall(T,filter='data')
  S=T/'runtime-repository';R=T/'replay';V=T/'new-verification';V.mkdir()
  gate=json.loads((P/'gate-before.json').read_text())
  for rel,digest in gate['helpers'].items():assert H((S/rel).read_bytes())==digest,rel
  candidate=S/'repro/mayhem/result-error-candidate.so';assert H(candidate.read_bytes())==H((P/'build01/artifacts/mayhem_recovered.so').read_bytes())
  env=os.environ.copy();env['PYTHONDONTWRITEBYTECODE']='1';results=[]
  for name,j in flat:
   if name in ['admin','fee_recipient','extend','withdraw','quote_withdraw','sweeps']:continue
   base='pump_swap'if'pump-swap'in name else(name.split('-')[0]+'_v2'if'-v2-'in name else name)
   cmd=[sys.executable,'-B',str(S/f'scripts/verify_mayhem_{base}.py'),'--candidate',str(candidate),'--receipts',str(R/(name+'.json')),'--output',str(V/(name+'.json'))]
   p=subprocess.run(cmd,cwd=S,env=env,capture_output=True,text=True);(out/(name+'.log')).write_text(p.stdout+p.stderr);assert p.returncode==0,(name,p.stdout,p.stderr);results.append(name)
  p=subprocess.run([sys.executable,'-B',str(S/'scripts/verify_mayhem_burn_sequence.py'),'--fixtures',str(T/'burn-fixtures'),'--receipts',str(R/'burn')],cwd=S,env=env,capture_output=True,text=True)
  (out/'burn.log').write_text(p.stdout+p.stderr);assert p.returncode==0,p.stderr;results.append('burn');assert len(results)==15
  for f in V.iterdir(): (out/f.name).write_bytes(f.read_bytes())
 report.update(unchanged_receipt_verifiers=15,retained_transactions_signature_checked=txs,retained_signatures_checked=sigs,admin_raw_signature_coverage='not complete;19190 remains recorded/derived')
 (out/'result.json').write_text(json.dumps(report,indent=2)+'\n')
print(json.dumps(report,indent=2))
