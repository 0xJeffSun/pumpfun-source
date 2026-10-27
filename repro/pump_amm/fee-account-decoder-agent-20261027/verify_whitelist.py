"""Verify v2 whitelist ordering matrices and actual signed transaction observations."""
from pathlib import Path
import argparse,hashlib,json,gzip,base64,itertools,importlib.util
from solders.transaction import Transaction
ROOT=Path(__file__).resolve().parents[3];HERE=Path(__file__).resolve().parent
def sha(p):return hashlib.sha256(Path(p).read_bytes()).hexdigest()
def load(p):p=Path(p);return json.loads(gzip.decompress(p.read_bytes())if p.suffix=='.gz'else p.read_bytes())
def verify(kind,report,sidecar,candidate,expected=0):
 r=load(report);s=load(sidecar);file=HERE/('v2_whitelist_order_probe.py'if kind=='order'else'v2_whitelist_probe.py');sp=importlib.util.spec_from_file_location('white_probe',file);m=importlib.util.module_from_spec(sp);sp.loader.exec_module(m)
 assert s['script_sha256']==sha(file)and r['candidate_sha256']==sha(candidate)
 if kind=='order':wanted=list(itertools.product(['buy_v2','buy_exact_quote_in_v2','sell_v2'],[False,True],['default','short-valid','empty-tiers','huge-lp']));actual=[(c['instruction'],c['whitelisted'],c['fee_case'])for c in r['cases']]
 else:wanted=list(itertools.product(['buy_v2','buy_exact_quote_in_v2','sell_v2'],['default','outsider','user']));actual=[(c['instruction'],c['whitelist'])for c in r['cases']]
 assert actual==wanted and len(s['transactions'])==len(wanted)*2
 original=sha(ROOT/'evidence/original/pump_amm/deployed.so');bad=[]
 for i,c in enumerate(r['cases']):
  a,b=m.clean(c['original']),m.clean(c['candidate']);diff=[k for k in a if a[k]!=b[k]];assert diff==c['differences']
  if diff:bad.append({'input':actual[i],'differences':diff})
  messages=[]
  for side,t,digest in zip(['original','candidate'],s['transactions'][2*i:2*i+2],[original,r['candidate_sha256']]):
   raw=base64.b64decode(t['transaction_base64']);tx=Transaction.from_bytes(raw);assert all(tx.verify_with_results())and t['all_signatures_verified'];assert hashlib.sha256(raw).hexdigest()==t['transaction_sha256']and t['amm_program_sha256']==digest
   assert t['logs_sha256']==hashlib.sha256(json.dumps(c[side]['logs'],separators=(',',':')).encode()).hexdigest()and t['error']==c[side]['error'];messages.append(bytes(tx.message))
  assert messages[0]==messages[1]
 assert len(bad)==expected,(len(bad),bad[:3]);return{'cases':len(wanted),'signed_transactions':len(s['transactions']),'candidate_sha256':r['candidate_sha256'],'mismatches':bad}
if __name__=='__main__':
 p=argparse.ArgumentParser();p.add_argument('--kind',choices=['basic','order'],required=True);p.add_argument('--report',type=Path,required=True);p.add_argument('--sidecar',type=Path,required=True);p.add_argument('--candidate',type=Path,required=True);p.add_argument('--expected-mismatches',type=int,default=0);a=p.parse_args();print(json.dumps(verify(a.kind,a.report,a.sidecar,a.candidate,a.expected_mismatches),indent=2))
