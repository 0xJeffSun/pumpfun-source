from pathlib import Path
import json,gzip,hashlib,sys,base64,itertools
R=Path(__file__).resolve().parents[2];candidate=Path(sys.argv[1]).resolve();output=Path(sys.argv[2]).resolve()
sys.path.insert(0,str(R/'scripts'));import mayhem_validate_sweeps as m
from solders.account import Account
from solders.pubkey import Pubkey
class Patcher:
 def __init__(self,vm):self.vm=vm.with_sigverify(True).with_blockhash_check(True);self.case=None;self.receipt=None
 def __getattr__(self,k):return getattr(self.vm,k)
 def send_transaction(self,tx):
  c=self.case
  for i,counter in enumerate(c['counters']):
   key=Pubkey.find_program_address([b'fee-recipient',bytes([i])],m.PROGRAM)[0];a=self.vm.get_account(key);d=bytearray(a.data);off=18 if c['native']else 26;d[off:off+8]=counter.to_bytes(8,'little');self.vm.set_account(key,Account(a.lamports,bytes(d),a.owner))
  pre={str(k):None if self.vm.get_account(k)is None else self.vm.get_account(k).to_json()if not self.vm.get_account(k).executable else dict(executable=True,data_sha256=hashlib.sha256(bytes(self.vm.get_account(k).data)).hexdigest())for k in tx.message.account_keys}
  self.receipt=dict(transaction=base64.b64encode(bytes(tx)).decode(),verified=tx.verify_with_results(),preaccounts=pre);assert all(self.receipt['verified']);return self.vm.send_transaction(tx)
class Fixture(m.SweepFixture):
 def __init__(self,p):super().__init__(p);self.vm=Patcher(self.vm)
 def execute(self,c):self.vm.case=c;return super().execute(c)
MAX=2**64-1;cases=[]
for op,native,kind,limit,timecase,counter in itertools.product(['sweep_fees','sweep_fees_admin'],[False,True],['ok','duplicate_pair','swapped_pairs'],[0,1,2],[(0,0,100),(1,1,100),(99,2,100)],[0,MAX]):
 last,interval,now=timecase;d=bytearray(32);off=0 if native else 24;d[off:off+8]=last.to_bytes(8,'little')
 cases.append(dict(op=op,native=native,kind=kind,limit=limit,opaque=d.hex(),timestamp=now,global_offset=166,global_value=interval,counters=[counter]*8,tokens=0 if native else 1))
for op,kind,limit,lamports in itertools.product(['sweep_fees','sweep_fees_admin'],['ok','duplicate_pair'],[0,1],[1,1183199,1183200]):cases.append(dict(op=op,native=True,kind=kind,limit=limit,lamports=lamports,counters=[0]*8))
paths={'original':R/'evidence/original/mayhem/deployed.so','candidate':candidate};fs={k:Fixture(p)for k,p in paths.items()};rows=[]
for i,c in enumerate(cases):
 result={};receipts={}
 for k,f in fs.items():result[k]=f.execute(c);receipts[k]=f.vm.receipt
 assert receipts['original']['transaction']==receipts['candidate']['transaction'];assert {k:v for k,v in receipts['original']['preaccounts'].items()if k!=str(m.PROGRAM)}=={k:v for k,v in receipts['candidate']['preaccounts'].items()if k!=str(m.PROGRAM)}
 bad=[k for k in ['error','accounts','events','inner','return_data']if result['original'][k]!=result['candidate'][k]]
 rows.append(dict(case=c,results=result,receipts=receipts,different_fields=bad))
 if bad:print('MISMATCH',i,json.dumps(c),bad,{k:v['error']for k,v in result.items()},flush=True)
report=dict(binary_sha256={k:hashlib.sha256(v.read_bytes()).hexdigest()for k,v in paths.items()},count=len(rows),mismatches=[i for i,r in enumerate(rows)if r['different_fields']],cases=rows)
output.write_bytes(gzip.compress((json.dumps(report,separators=(',',':'))+'\n').encode(),mtime=0));print({k:v for k,v in report.items()if k!='cases'})
