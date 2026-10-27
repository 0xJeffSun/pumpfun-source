"""Verify frozen signed VM receipts only; never execute a target or harness."""
from pathlib import Path
import gzip,hashlib,importlib.util,json,lzma,shutil,tempfile
MAYHEM='MAyhSmzXzV1pTf7LsNkrNwkWKTo4ougAJ1PPg47MD4e'
EXPECTED={'buy':486,'sell':396,**{f'buy-amm-{f}':419 for f in ['native','token','token22']},**{f'sell-amm-{f}':413 for f in ['native','token','token22']},**{f'buy-v2-{f}':613 for f in ['native','token','token22']},**{f'sell-v2-{f}':473 for f in ['native','token','token22']}}
def require(ok,message):
 if not ok:raise ValueError(message)
def sha(b):return hashlib.sha256(b).hexdigest()
def raw(p):
 b=p.read_bytes();return gzip.decompress(b)if p.suffix=='.gz'else lzma.decompress(b)if p.suffix=='.xz'else b
def module(n,p):
 spec=importlib.util.spec_from_file_location(n,p);m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m);return m
def check(packet,root,candidate,compare_saved=True):
 p=packet/'runtime';status=json.loads((p/'status.json').read_text());digest=sha(candidate);require(status['state']=='complete'and status['candidate_sha256']==digest,'runtime completion binding differs')
 inputs=json.loads((p/'inputs.json').read_text());require(inputs['candidate_sha256']==digest,'runtime input artifact binding differs')
 for name,ref in [('trade_check.py','research/mayhem-accounting-extend-recovery/verify.py'),('initializer_check.py','research/mayhem-quotes-current-recovery-20261027/runtime_check.py'),('producer.py','research/mayhem-quotes-current-recovery-20261027/runtime/producer.py')]:require((p/name).read_bytes()==(root/ref).read_bytes(),'frozen runtime checker differs: '+name)
 for name,h in inputs['staged_files'].items():require(sha((p/name).read_bytes())==h,'runtime retained file differs: '+name)
 actual={f.relative_to(p/'frozen').as_posix():sha(f.read_bytes())for f in(p/'frozen').rglob('*')if f.is_file()}
 require(actual==inputs['frozen'],'runtime frozen input inventory differs')
 commands=json.loads((p/'trades/commands.json').read_text());require(commands['candidate_sha256']==digest and len(commands['runs'])==14,'runtime command binding differs')
 require({r['family']:(r['returncode'],r['cases'],r['mismatches'])for r in commands['runs']}=={n:(0,c,0)for n,c in EXPECTED.items()},'runtime producer completion differs')
 production=json.loads((p/'production-summary.json').read_text());require(production=={'candidate_sha256':digest,'trade_pairs':6636,'families':14,'initializer':[{'kind':'rejections','pairs':53},{'kind':'pump-cpi','pairs':16}],'producer_success':True},'runtime producer summary differs')
 trade=module('current_closure_trade_check',p/'trade_check.py');init=module('current_closure_init_check',p/'initializer_check.py');require(trade.EXPECTED==EXPECTED,'trade verifier cases differ')
 results=[]
 with tempfile.TemporaryDirectory(prefix='macro-runtime-inputs-')as td:
  r=Path(td)
  for name in inputs['frozen']:
   dest=r/name;dest.parent.mkdir(parents=True,exist_ok=True);shutil.copyfile(p/'frozen'/name,dest)
  for name in ['evidence/original/mayhem/deployed.so','evidence/original/pump/deployed.so']:
   dest=r/name;dest.parent.mkdir(parents=True,exist_ok=True);shutil.copyfile(root/name,dest)
  original=(r/'evidence/original/mayhem/deployed.so').read_bytes();digests={'original':sha(original),'candidate':digest}
  for name,count in EXPECTED.items():
   report=json.loads(raw(p/'trades'/(name+'.json.xz')));result=trade.check_trade_receipts(name,report,candidate,r)
   require(result['exact_noncompute_logs']==count,'runtime normalized log differences: '+name)
   for row in report['cases']:
    for label,body in [('original',original),('candidate',candidate)]:
     for phase in ['before','after']:
      account=row[label][phase][MAYHEM];require(account['data_sha256']==digests[label]and account['executable'],'runtime actual Mayhem program binding differs')
   results.append(result)
  initializer=init.verify(r,packet,True,digest,'first')
 require(sum(z['cases']for z in results)==6636 and sum(z['signed_transaction_records']for z in results)==13272,'trade totals differ')
 require(initializer['case_pairs']==69 and initializer['signed_records']==168,'initializer totals differ')
 result={'state':'complete','qualified':True,'trade_pairs':6636,'trade_signed_records':13272,'initializer_pairs':69,'initializer_signed_records':168,'total_pairs':6705,'total_signed_records':13440,'trade_results':results,'initializer':initializer,'scope':'Finite signed offline VM records; no new execution, unique-signature count, exhaustive equivalence or deployment claim.'}
 if compare_saved:require(result==json.loads((p/'verification.json').read_text()),'saved runtime verification differs')
 return result
