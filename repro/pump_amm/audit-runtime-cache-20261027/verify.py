"""Check cache equivalence on the full corpus and rejection of malformed receipts."""
from pathlib import Path
import base64,copy,gzip,hashlib,importlib.util,json,tempfile,time
ROOT=Path(__file__).resolve().parents[3];HERE=Path(__file__).resolve().parent
OLD=ROOT/'repro/pump_amm/diagnostic-parity-20261027/compare_direct.py';NEW=HERE/'compare_direct_cached.py'
assert hashlib.sha256(OLD.read_bytes()).hexdigest()==(HERE/'baseline-sha256.txt').read_text().strip()
def mod(name,path):
 s=importlib.util.spec_from_file_location(name,path);m=importlib.util.module_from_spec(s);s.loader.exec_module(m);return m
old=mod('uncached',OLD);new=mod('cached',NEW);runtime=ROOT/'repro/pump_amm/semantic-recovery-20261027/results/runtime';candidate='ac96a53eb7fa3f24ca275ceca733b99e4a4ced20460ee41d6979d683042be797'
results=[]
for label,m in [('uncached',old),('cached',new)]:
 start=time.monotonic();r=m.audit(runtime,candidate);results.append({'mode':label,'seconds':time.monotonic()-start,'result':r})
assert results[0]['result']==results[1]['result'] and results[0]['result']['cases']==17462 and not results[0]['result']['mismatches']
w=ROOT/'repro/pump_amm/semantic-recovery-20261027/results/supplemental';report=old.load(w/'sell-transfers.json');side=old.load(w/'sell-transfers-transactions.json.gz')
negatives=[]
with tempfile.TemporaryDirectory()as td:
 d=Path(td);(d/'progress.json').write_text(json.dumps([{'suite':'fixture'}]));(d/'fixture.json').write_text(json.dumps({'candidate_sha256':candidate,'case_count':1,'cases':report['cases'][:1]}))
 for kind in ['valid','false_cached_flag','wrong_cached_signature_count','changed_signature']:
  t=copy.deepcopy(side['transactions'][:2]);assert t[0]['transaction_base64']==t[1]['transaction_base64']
  if kind=='false_cached_flag':t[1]['all_signatures_verified']=False
  if kind=='wrong_cached_signature_count':t[1]['signature_count']+=1
  if kind=='changed_signature':
   raw=bytearray(base64.b64decode(t[1]['transaction_base64']));assert 0<raw[0]<128;raw[1]^=1;t[1]['transaction_base64']=base64.b64encode(raw).decode()
  (d/'fixture-transactions.json.gz').write_bytes(gzip.compress(json.dumps({'transactions':t}).encode()))
  for label,m in [('uncached',old),('cached',new)]:
   try:m.audit(d,candidate);accepted=True
   except (AssertionError,ValueError):accepted=False
   assert accepted==(kind=='valid'),(kind,label,accepted)
   negatives.append({'case':kind,'mode':label,'accepted':accepted})
summary={'baseline_sha256':hashlib.sha256(OLD.read_bytes()).hexdigest(),'cached_sha256':hashlib.sha256(NEW.read_bytes()).hexdigest(),'runs':results,'receipt_checks':negatives,'scope':'Within-call exact base64-key cache; every receipt flag/count and all signed-message comparisons still checked. No persisted trust cache.'}
(HERE/'verification.json').write_text(json.dumps(summary,indent=2)+'\n');print(json.dumps(summary,indent=2))
