"""Fresh bounded ExtendAccount replay; records actual program bytes and signatures."""
from pathlib import Path
import base64,gzip,hashlib,json,re,sys
R=Path(__file__).resolve().parents[3];sys.path.insert(0,str(R/'scripts'))
import mayhem_validate_extend as fixture
from solders.transaction import Transaction
sha=lambda b:hashlib.sha256(b).hexdigest()
trim=lambda logs:[x for x in logs if not re.fullmatch(r'Program \S+ consumed \d+ of \d+ compute units',x)]
def verify(report,candidate):
 assert report['candidate_sha256']==sha(candidate.read_bytes())
 assert report['original_sha256']==sha((R/'evidence/original/mayhem/deployed.so').read_bytes())
 assert report['case_count']==len(report['cases'])==301 and [x['case']for x in report['cases']]==fixture.cases()
 for name,digest in report['harness_sha256'].items():assert sha((R/name).read_bytes())==digest
 assert report['runner_sha256']==sha(Path(__file__).read_bytes())
 for row in report['cases']:
  assert not row['different_fields']and trim(row['original']['logs'])==trim(row['candidate']['logs'])
  assert {k:v for k,v in row['original'].items()if k!='logs'}=={k:v for k,v in row['candidate'].items()if k!='logs'}
  assert row['original_transaction_base64']==row['candidate_transaction_base64']
  for label,digest in [('original',report['original_sha256']),('candidate',report['candidate_sha256'])]:
   assert all(Transaction.from_bytes(base64.b64decode(row[label+'_transaction_base64'])).verify_with_results())
   assert row[label+'_program']['sha256']==digest and row[label+'_program']['executable']
   expected=candidate if label=='candidate'else R/'evidence/original/mayhem/deployed.so';assert row[label+'_program']['bytes']==expected.stat().st_size
 return{'pairs':301,'verified_signed_records':602,'noncompute_log_mismatches':0,'original_successes':sum(x['original']['error']is None for x in report['cases'])}
def run(candidate,out):
 assert not out.exists();out.mkdir();original=R/'evidence/original/mayhem/deployed.so'
 class Recorder:
  def __init__(self,vm,path):self.vm=vm.with_sigverify(True).with_blockhash_check(True);self.path=path;self.last=None;self.account=None
  def __getattr__(self,n):return getattr(self.vm,n)
  def send_transaction(self,tx):
   assert all(tx.verify_with_results());self.last=base64.b64encode(bytes(tx)).decode();a=self.vm.get_account(fixture.PROGRAM);self.account={'sha256':sha(bytes(a.data)),'executable':a.executable,'bytes':len(a.data)};assert a.executable and self.account['sha256']==sha(self.path.read_bytes());return self.vm.send_transaction(tx)
 a,b=fixture.ExtendFixture(original),fixture.ExtendFixture(candidate);a.vm=Recorder(a.vm,original);b.vm=Recorder(b.vm,candidate);rows=[]
 for case in fixture.cases():
  x,y=a.execute(case),b.execute(case);bad=[k for k in x if k!='logs'and x[k]!=y[k]]
  rows.append({'case':case,'original':x,'candidate':y,'different_fields':bad,'original_transaction_base64':a.vm.last,'candidate_transaction_base64':b.vm.last,'original_program':a.vm.account,'candidate_program':b.vm.account})
 report={'schema':'source-origin-extend-validation-v1','candidate_sha256':sha(candidate.read_bytes()),'original_sha256':sha(original.read_bytes()),'runner_sha256':sha(Path(__file__).read_bytes()),'harness_sha256':{n:sha((R/n).read_bytes())for n in ['scripts/mayhem_validate_extend.py','scripts/mayhem_validate_admin.py']},'case_count':len(rows),'cases':rows};(out/'report.json.gz').write_bytes(gzip.compress(json.dumps(report).encode(),mtime=0));result=verify(report,candidate);(out/'verification.json').write_text(json.dumps(result,indent=2)+'\n');print(json.dumps(result,indent=2))
if __name__=='__main__':
 if sys.argv[1]=='--verify':
  p=Path(sys.argv[2]);r=json.loads(gzip.decompress(p.read_bytes()));print(json.dumps(verify(r,Path(sys.argv[3])),indent=2))
 else:run(Path(sys.argv[1]).resolve(),Path(sys.argv[2]).resolve())
