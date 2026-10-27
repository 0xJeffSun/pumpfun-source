"""Verify v2 boundary receipts without excluding any result or diagnostic text."""
from pathlib import Path
import argparse,base64,gzip,hashlib,importlib.util,json
from solders.transaction import Transaction
ROOT=Path(__file__).resolve().parents[3];HERE=Path(__file__).resolve().parent
sp=importlib.util.spec_from_file_location('direct',ROOT/'repro/pump_amm/diagnostic-parity-20261027/compare_direct.py');direct=importlib.util.module_from_spec(sp);sp.loader.exec_module(direct)
def load(p):p=Path(p);return json.loads(gzip.decompress(p.read_bytes())if p.suffix=='.gz'else p.read_bytes())
def sha(p):return hashlib.sha256(Path(p).read_bytes()).hexdigest()
def verify(report,sidecar,candidate,producer,count,expected_bad):
 r=load(report);s=load(sidecar);assert r['candidate_sha256']==sha(candidate) and r['original_sha256']==sha(ROOT/'evidence/original/pump_amm/deployed.so')
 assert r['probe_sha256']==s['script_sha256']==sha(HERE/producer);assert r['case_count']==len(r['cases'])==count
 assert s['transaction_count']==len(s['transactions'])==count*2
 bad=[]
 for i,c in enumerate(r['cases']):
  a,b=direct.clean(c['original']),direct.clean(c['candidate']);diff=[k for k in a if a[k]!=b[k]];assert diff==c['differences']
  if diff:bad.append(i)
  messages=[]
  for label,t,identity in zip(['original','candidate'],s['transactions'][2*i:2*i+2],[r['original_sha256'],r['candidate_sha256']]):
   raw=base64.b64decode(t['transaction_base64'],validate=True);tx=Transaction.from_bytes(raw);assert bytes(tx)==raw and all(tx.verify_with_results()) and t['all_signatures_verified']
   assert hashlib.sha256(raw).hexdigest()==t['transaction_sha256']and t['amm_program_sha256']==identity
   assert t['logs_sha256']==hashlib.sha256(json.dumps(c[label]['logs'],separators=(',',':')).encode()).hexdigest()and t['error']==c[label]['error'];messages.append(bytes(tx.message))
  assert messages[0]==messages[1]
 assert len(bad)==expected_bad,(len(bad),bad)
 return {'cases':count,'transactions':count*2,'mismatches':bad,'candidate_sha256':r['candidate_sha256']}
if __name__=='__main__':
 p=argparse.ArgumentParser()
 p.add_argument('--report',type=Path,required=True)
 p.add_argument('--sidecar',type=Path,required=True)
 p.add_argument('--candidate',type=Path,required=True)
 p.add_argument('--suite',choices=['boundary','transfer','order','validation-order','curve-order','legacy-curve-order'],default='boundary')
 p.add_argument('--transfer',action='store_true')
 p.add_argument('--expected-mismatches',type=int,default=0)
 a=p.parse_args()
 suites={'boundary':('probe.py',72),'transfer':('probe_transfer.py',4),
         'order':('probe_order.py',144),'validation-order':('probe_validation_order.py',252),
         'curve-order':('probe_curve_order.py',32),'legacy-curve-order':('probe_legacy_curve_order.py',32)}
 producer,count=suites['transfer' if a.transfer else a.suite]
 print(json.dumps(verify(a.report,a.sidecar,a.candidate,producer,count,a.expected_mismatches),indent=2))
