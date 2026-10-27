"""Verify typed fee-selector gate probes, exact messages, log hashes and signatures."""
from pathlib import Path
import argparse,base64,gzip,hashlib,json,importlib.util,itertools
from solders.transaction import Transaction
HERE=Path(__file__).resolve().parent;ROOT=HERE.parents[2]
def load(p):p=Path(p);return json.loads(gzip.decompress(p.read_bytes())if p.suffix=='.gz'else p.read_bytes())
def sha(p):return hashlib.sha256(Path(p).read_bytes()).hexdigest()
def verify(kind,report,sidecar,candidate,expected=0):
 r=load(report);s=load(sidecar);file=HERE/('v2_creator_guard_probe.py'if kind=='v2'else'multihop_fee_probe.py');spec=importlib.util.spec_from_file_location('fee_extra_probe',file);mod=importlib.util.module_from_spec(spec);spec.loader.exec_module(mod)
 assert r['probe_sha256']==s['script_sha256']==sha(file);assert r['candidate_sha256']==sha(candidate)
 assert r['original_sha256']==sha(ROOT/'evidence/original/pump_amm/deployed.so')
 if kind=='v2':
  wanted=list(itertools.product(['buy_v2','buy_exact_quote_in_v2','sell_v2'],[False,True],[0,1,100,10000,65535]));actual=[(c['instruction'],c['flag'],c['bps'])for c in r['cases']]
 else:
  wanted=list(itertools.product(['native','stable','exotic'],[False,True],[177,2511,2512,4072,4073,4096,4097],[False,True],[0,100]));actual=[(c['quote'],c['sell'],c['length'],c['flag'],c['bps'])for c in r['cases']]
 assert actual==wanted and len(s['transactions'])==len(wanted)*2
 bad=[]
 for i,c in enumerate(r['cases']):
  a,b=mod.clean(c['original']),mod.clean(c['candidate']);diff=[k for k in a if a[k]!=b[k]];assert diff==c['differences']
  if diff:bad.append({'index':i,'input':actual[i],'differences':diff})
  messages=[]
  for side,t,digest in zip(['original','candidate'],s['transactions'][2*i:2*i+2],[r['original_sha256'],r['candidate_sha256']]):
   raw=base64.b64decode(t['transaction_base64']);tx=Transaction.from_bytes(raw);assert all(tx.verify_with_results())and t['all_signatures_verified'];assert hashlib.sha256(raw).hexdigest()==t['transaction_sha256'];assert t['amm_program_sha256']==digest
   assert t['error']==c[side]['error'];assert t['logs_sha256']==hashlib.sha256(json.dumps(c[side]['logs'],separators=(',',':')).encode()).hexdigest();messages.append(bytes(tx.message))
  assert messages[0]==messages[1]
 assert len(bad)==expected,(len(bad),bad[:4]);return{'cases':len(wanted),'signed_transactions':len(s['transactions']),'mismatches':bad,'candidate_sha256':r['candidate_sha256']}
if __name__=='__main__':
 p=argparse.ArgumentParser();p.add_argument('--kind',choices=['v2','multi'],required=True);p.add_argument('--report',type=Path,required=True);p.add_argument('--sidecar',type=Path,required=True);p.add_argument('--candidate',type=Path,required=True);p.add_argument('--expected-mismatches',type=int,default=0);a=p.parse_args();print(json.dumps(verify(a.kind,a.report,a.sidecar,a.candidate,a.expected_mismatches),indent=2))
