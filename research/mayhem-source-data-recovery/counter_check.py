"""Recompute counter arithmetic, recipient effects, events and actual signatures."""
from pathlib import Path
import json,gzip,hashlib,base64,sys,re
P=Path(__file__).resolve().parent;R=P.parents[1]
def verify(candidate):
 from solders.transaction import Transaction
 from solders.pubkey import Pubkey
 sys.path.insert(0,str(R/'scripts'))
 import mayhem_validate_sweeps as m
 sha=lambda b:hashlib.sha256(b).hexdigest()
 r=json.loads(gzip.decompress((P/'runtime/sweep-counter.json.gz').read_bytes()))
 assert r['binary_sha256']==dict(original=sha((R/'evidence/original/mayhem/deployed.so').read_bytes()),baseline=sha(gzip.decompress((R/'research/mayhem-composed-recovery/artifacts/recovered/candidate.so.gz').read_bytes())),candidate=sha(candidate))
 assert r['harness_sha256']==sha((P/'runners/sweep-counter.py.txt').read_bytes()) and r['count']==len(r['cases'])==48
 assert len(r['mismatches']['baseline'])==10 and not r['mismatches']['candidate']
 total=successes=0;fields=['error','accounts','events','inner','return_data'];norm=lambda logs:[x for x in logs if not re.search(r' consumed \d+ of \d+ compute units',x)]
 for row in r['cases']:
  c=row['case'];off=18 if c['native']else 26;mint=m.WSOL if c['native']else m.OTHER
  assert len(c['counters'])==8 and set(row['receipts'])=={'original','baseline','candidate'}
  assert len({x['transaction']for x in row['receipts'].values()})==1
  for receipt in row['receipts'].values():
   tx=Transaction.from_bytes(base64.b64decode(receipt['transaction']));assert all(tx.verify_with_results()) and tx.verify_with_results()==receipt['verified'];total+=1
  assert all(row['results']['original'][k]==row['results']['candidate'][k]for k in fields) and not row['different_fields']['candidate']
  assert norm(row['results']['original']['logs'])==norm(row['results']['candidate']['logs'])
  for name in ['original','candidate']:
   result=row['results'][name];pre=row['receipts'][name]['preaccounts'];sum_delta=0
   for i in range(8):
    owner=Pubkey.find_program_address([b'fee-recipient',bytes([i])],m.PROGRAM)[0];ata=Pubkey.find_program_address([bytes(owner),bytes(m.TOKEN),bytes(mint)],m.ATA)[0]
    a=json.loads(pre[str(owner)]);b=json.loads(result['accounts'][str(owner)]);ta=json.loads(pre[str(ata)]);tb=json.loads(result['accounts'][str(ata)])
    old=int.from_bytes(bytes(a['data'][off:off+8]),'little');new=int.from_bytes(bytes(b['data'][off:off+8]),'little');assert old==c['counters'][i]
    if result['error']is None:
     delta=int.from_bytes(bytes(ta['data'][64:72]),'little')-int.from_bytes(bytes(tb['data'][64:72]),'little')+a['lamports']-b['lamports'];assert delta>=0 and new==old+delta;sum_delta+=delta
    else:assert a==b and ta==tb
   if result['error']is None:
    assert len(result['events'])==1;event=base64.b64decode(result['events'][0].split('Program data: ')[1]);assert int.from_bytes(event[8:16],'little')==sum_delta
   if name=='candidate'and result['error']is None:successes+=1
 assert total==144 and successes==20
 return dict(sweep_counter_cases=48,sweep_counter_successes=20,sweep_counter_repaired_failures=10,sweep_counter_signed_records=144)
