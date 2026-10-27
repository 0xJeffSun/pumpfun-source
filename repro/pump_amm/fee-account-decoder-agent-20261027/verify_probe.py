"""Verify FeeConfig matrix observations and their independently captured signatures."""
from pathlib import Path
import argparse,base64,collections,gzip,hashlib,json,re
from solders.transaction import Transaction
ROOT=Path(__file__).resolve().parents[3]
NAMES=['buy','buy_exact_quote_in','sell','buy_v2','sell_v2','buy_exact_quote_in_v2']
def sha(p):return hashlib.sha256(Path(p).read_bytes()).hexdigest()
def load(p):
 p=Path(p);return json.loads(gzip.decompress(p.read_bytes())if p.suffix=='.gz'else p.read_bytes())
def clean(v):
 if isinstance(v,dict):
  return{k:([re.sub(r'(?<=thrown in )[^ ]+:[0-9]+','<source>',re.sub(r'(?<=panicked at )[^ ]+:[0-9]+:[0-9]+','<source>',s))for s in x if not re.fullmatch(r'Program \w+ consumed \d+ of \d+ compute units',s)]if k=='logs'else clean(x))for k,x in v.items()}
 if isinstance(v,list):return[clean(x)for x in v]
 return v

def verify(report,sidecar,candidate,expected=0):
 r=load(report);s=load(sidecar);original=sha(ROOT/'evidence/original/pump_amm/deployed.so');identity=sha(candidate)
 assert r['original_sha256']==original and r['candidate_sha256']==identity
 assert r['probe_sha256']==s['script_sha256']==sha(Path(__file__).with_name('probe.py'))
 assert s['observer_sha256']==sha(ROOT/'repro/pump_amm/owner6048-v144/runtime/observe_suite.py')
 assert r['case_count']==len(r['cases'])==1050
 assert collections.Counter(c['instruction']for c in r['cases'])=={name:175 for name in NAMES}
 assert len(s['transactions'])==s['transaction_count']==2100
 mismatch=[];signatures=0
 for i,c in enumerate(r['cases']):
  a,b=clean(c['original']),clean(c['candidate']);diff=[k for k in a if a[k]!=b[k]];assert diff==c['differences']
  if diff:mismatch.append({'index':i,'instruction':c['instruction'],'case':c['case'],'quote_case':c['quote_case'],'differences':diff})
  pair=s['transactions'][2*i:2*i+2];messages=[]
  for label,t,expected_program in zip(['original','candidate'],pair,[original,identity]):
   raw=base64.b64decode(t['transaction_base64'],validate=True);tx=Transaction.from_bytes(raw);assert bytes(tx)==raw and all(tx.verify_with_results())
   assert hashlib.sha256(raw).hexdigest()==t['transaction_sha256']
   assert t['amm_program_sha256']==expected_program and t['all_signatures_verified']
   assert t['logs_sha256']==hashlib.sha256(json.dumps(c[label]['logs'],separators=(',',':')).encode()).hexdigest()
   assert t['error']==c[label]['error'];signatures+=len(tx.signatures);messages.append(bytes(tx.message))
  assert messages[0]==messages[1]
 assert signatures==s['signature_count']==2100
 assert len(mismatch)==expected,(len(mismatch),mismatch[:4])
 return {'cases':1050,'transactions':2100,'signature_fields':signatures,'mismatches':mismatch,'candidate_sha256':identity}
if __name__=='__main__':
 p=argparse.ArgumentParser();p.add_argument('--report',type=Path,required=True);p.add_argument('--sidecar',type=Path,required=True);p.add_argument('--candidate',type=Path,required=True);p.add_argument('--expected-mismatches',type=int,default=0);a=p.parse_args();r=verify(a.report,a.sidecar,a.candidate,a.expected_mismatches);print(json.dumps(r,indent=2))
