"""Verify saved negative controls. --signatures additionally requires solders; no VM/compiler."""
import argparse,base64,gzip,hashlib,json,struct,tarfile
from pathlib import Path
CAND='1eb1ce0502159081cf928abdeaf8d2f2e56cbaf4c241d8e649c82b790e56218f'
ORIG='6a7ad34596d83b4c435b32f458a56e718e9f82eb4ad38e4316616d15d24d8ff7'
def require(ok,msg):
 if not ok:raise ValueError(msg)
def sha(b):return hashlib.sha256(b).hexdigest()
def packet_preflight(p):
 paths=list(p.rglob('*'))
 require(not any(f.is_symlink()for f in paths),'negative packet symlink')
 require(all(f.is_file()or f.is_dir()for f in paths),'negative packet special file')
 manifest=json.loads((p/'MANIFEST.json').read_text())['files']
 require({f.relative_to(p).as_posix()for f in paths if f.is_file()}==set(manifest)|{'MANIFEST.json'},'negative packet membership')
 for name,h in manifest.items():require(sha((p/name).read_bytes())==h,'negative packet hash '+name)
def verify(packet=None,signatures=False,validate_packet=True):
 p=Path(packet)if packet is not None else Path(__file__).resolve().parent.parent
 if validate_packet:packet_preflight(p)
 d=json.loads(gzip.decompress((p/'negative/receipts.json.gz').read_bytes()));require(d['candidate_sha256']==CAND and d['original_sha256']==ORIG,'negative images')
 require(sha(gzip.decompress((p/'builds/a/candidate.so.gz').read_bytes()))==CAND,'candidate bytes')
 for key,name in [('producer_sha256','producer.py'),('fixture_sha256','fixture.py')]:require(d[key]==sha((p/'negative'/name).read_bytes()),'negative '+key)
 root=p.parents[1]
 for name,h in d['inputs'].items():require(sha((root/name).read_bytes())==h,'negative input '+name)
 with tarfile.open(p/'sources/candidate.tar.gz')as t:source=t.extractfile('programs/pump-amm/src/state/volume_accumulator.rs').read().decode()
 require('require!(current_timestamp<=self.end_time,PumpAmmError::SupplyUpdateForFinishedRange);'in source,'unconditional guard witness')
 rows=d['cases'];require([r['name']for r in rows]==['negative-end','end-before-start','active-control','equality-control','zero-supply'],'negative case inventory')
 expected=[(-1,0,1),(1,10,1),(49,10,1),(1,20,1),(1,10,0)]
 complete='TransactionErrorInstructionError((0, Fieldless(ProgramFailedToComplete)))';e6035='TransactionErrorInstructionError((0, Tagged(InstructionErrorCustom(6035))))'
 sigs=0
 for i,(r,(end,now,supply))in enumerate(zip(rows,expected)):
  require(r['input']==dict(instruction='admin_update_token_incentives',start=20,end=end,period=1,new_start=0,new_end=0,new_period=1,now=now,day=0,supply=supply),'negative fixture input')
  a,b=r['original'],r['candidate'];require(a['before']==b['before'],'unequal prestates')
  state=bytes.fromhex(a['before'][d['global_volume_account']]['data']);require(struct.unpack_from('<qqq',state,8)==(20,end,1),'stored schedule')
  require(a['after']==b['after'],'unequal poststates')
  require(a['transaction_base64']==b['transaction_base64'],'unequal signed transaction')
  for role,x,h in [('original',a,ORIG),('candidate',b,CAND)]:
   require(x['executed_program_sha256']==h,'wrong executable account '+role)
   require(x['signature_verification']and x['sigverify_runtime_enabled'],'signature flag')
   txbytes=base64.b64decode(x['transaction_base64'],validate=True);require(bool(txbytes),'missing transaction')
   if signatures:
    from solders.transaction import Transaction
    tx=Transaction.from_bytes(txbytes);require(all(tx.verify_with_results()),'invalid signature');sigs+=len(tx.signatures)
  require(r['error_equal']==(a['error']==b['error']),'error equality summary')
  if i<2:require(a['error']==complete and b['error']==e6035,'counterexample changed')
  elif i==3:require(a['error']==b['error']==e6035,'equality boundary changed')
  else:require(a['error']is None and b['error']is None,'success control changed')
 return dict(candidate_sha256=CAND,cases=5,executions=10,mismatches=2,matching_controls=3,cryptographically_verified_signatures=sigs,scope='Saved finite synthetic counterexamples. No live-state reachability or full-1730 count claim.')
if __name__=='__main__':
 a=argparse.ArgumentParser();a.add_argument('--signatures',action='store_true');args=a.parse_args();print(json.dumps(verify(signatures=args.signatures),sort_keys=True))
