#!/usr/bin/env python3
"""Verify all retained signed square-root probes and independent integer results."""
from pathlib import Path
import argparse,base64,gzip,hashlib,importlib.util,json,math,struct,sys
from solders.transaction import Transaction
ROOT=Path(__file__).resolve().parents[3]
def load(p):
 p=Path(p);b=p.read_bytes();return json.loads(gzip.decompress(b)if p.suffix=='.gz'else b)
def sha(p):return hashlib.sha256(Path(p).read_bytes()).hexdigest()
def verify(report,sidecar,candidate,expected_bad=0):
 s=importlib.util.spec_from_file_location('sqrt_direct',ROOT/'repro/pump_amm/diagnostic-parity-20261027/compare_direct.py');direct=importlib.util.module_from_spec(s);s.loader.exec_module(direct)
 r=load(report);side=load(sidecar);assert r['candidate_sha256']==sha(candidate);assert r['original_sha256']==sha(ROOT/'evidence/original/pump_amm/deployed.so');assert r['probe_sha256']==sha(Path(__file__).with_name('probe.py'))
 assert len(r['cases'])==r['case_count']==40;assert len(side['transactions'])==80;bad=0;successes=0
 for i,c in enumerate(r['cases']):
  x,y=direct.clean(c['original']),direct.clean(c['candidate']);differences=[k for k in x if x[k]!=y[k]];assert differences==c['differences'];bad+=bool(differences)
  assert c['expected_floor_sqrt']==math.isqrt(c['base']*c['quote']);assert c['product']==str(c['base']*c['quote']);messages=[]
  if c['original']['error']is None:
   observed=struct.unpack_from('<Q',bytes.fromhex(next(iter(c['original']['states'].values()))['data']),203)[0];assert observed==c['observed_lp_supply']==c['expected_floor_sqrt'];successes+=1
  for label,t,digest in zip(['original','candidate'],side['transactions'][i*2:i*2+2],[r['original_sha256'],r['candidate_sha256']]):
   raw=base64.b64decode(t['transaction_base64'],validate=True);tx=Transaction.from_bytes(raw);assert all(tx.verify_with_results())and t['all_signatures_verified'];assert hashlib.sha256(raw).hexdigest()==t['transaction_sha256'];assert t['amm_program_sha256']==digest
   assert t['logs_sha256']==hashlib.sha256(json.dumps(c[label]['logs'],separators=(',',':')).encode()).hexdigest();messages.append(bytes(tx.message))
  assert messages[0]==messages[1]
 assert bad==r['mismatches']==expected_bad
 return {'cases':40,'successful_original_supply_checks':successes,'mismatches':bad}
if __name__=='__main__':
 p=argparse.ArgumentParser();p.add_argument('--report',type=Path,required=True);p.add_argument('--sidecar',type=Path,required=True);p.add_argument('--candidate',type=Path,required=True);p.add_argument('--expected-bad',type=int,default=0);a=p.parse_args();print(json.dumps(verify(a.report,a.sidecar,a.candidate,a.expected_bad)))
