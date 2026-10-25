"""Read-only coverage classification of already saved admin-CTO receipts."""
from pathlib import Path
import json,gzip
P=Path(__file__).resolve().parent
D=bytes.fromhex('17b7f83760d8ac60')
def load(p):
 b=p.read_bytes();return json.loads(gzip.decompress(b)if b.startswith(b'\x1f\x8b')else b)
def curve(row):
 if 'bonding_curve'in row['before']:
  v=row['before']['bonding_curve'];return bytes.fromhex(v['data'])if v else b''
 for v in row['before'].values():
  if v and isinstance(v.get('data'),str):
   b=bytes.fromhex(v['data'])
   if b.startswith(D):return b
 return None

def codes(v):
 if isinstance(v,dict):
  return ({v['Custom']}if isinstance(v.get('Custom'),int)else set())|set().union(*(codes(x)for x in v.values()))
 if isinstance(v,list):return set().union(*(codes(x)for x in v))
 return set()
def analyze(rows):
 out={'cases':len(rows),'holder_with_old_cashback':[],'fee_with_effective_cashback':[],'actual_6080_errors':[],'short_curve_cases':[],'exact123_nonzero_fee_inputs':[]}
 for row in rows:
  case=row['case'];raw=curve(row);old_cash=raw is not None and len(raw)>82 and raw[82]==1;holder=case.get('holder')is True;fee=case.get('fee')is not None
  item={'case':case['name'],'original_success':row['error']is None}
  if holder and old_cash:out['holder_with_old_cashback'].append(item)
  if fee and old_cash and not holder:out['fee_with_effective_cashback'].append(item)
  if 6080 in codes(row['error']):out['actual_6080_errors'].append(item)
  length=case.get('curve_length',len(raw)if raw is not None else None)
  if length is not None and length<166:out['short_curve_cases'].append(dict(item,input_length=length))
  if raw is not None and len(raw)==123 and int.from_bytes(raw[115:123],'little')!=0:out['exact123_nonzero_fee_inputs'].append(item)
 return out

def run():
 d=load(P/'differential/admin_cto.json.gz');assert not d['mismatches'];diff=analyze([dict(x['original'],case=x['case'])for x in d['cases']])
 s=P/'surfpool/admin_cto.json.gz'
 if not s.exists():
  found=[p for p in(P/'surfpool/admin_cto').glob('pump-*-transactions.json')if 'signed_transactions'in load(p)];assert len(found)==1;s=found[0]
 v=load(s);assert not v['mismatches'];surf=analyze(v['original'])
 return {'new_fixtures':0,'new_probes':0,'scope':'Saved-case classification only; no program execution. Success names do not establish exhaustive path coverage; mutation-before-CPI/Clock remains static source/CFG proof.','differential':diff,'surfpool':surf}
if __name__=='__main__':(P/'coverage-review.json').write_text(json.dumps(run(),indent=2)+'\n')
