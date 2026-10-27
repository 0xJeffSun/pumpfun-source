"""Verify the frozen main-Pump legacy cashback payment-order checkpoint."""
from pathlib import Path
import json,gzip,hashlib,struct,sys,base64,subprocess,tempfile,re
from solders.transaction import Transaction
HERE=Path(__file__).resolve().parent;ROOT=next(p for p in HERE.parents if (p/'evidence/original/pump/deployed.so').is_file())
sys.path.insert(0,str(HERE/'harness'))
from pump_compare_function_bytes import body,normalize
from pump_quote_control_function_match import sections
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
def read(p):
 b=p.read_bytes();return json.loads(gzip.decompress(b) if b.startswith(b'\x1f\x8b') else b)
def source(r):return {k.split('programs/pump/',1)[1]:v for k,v in r['source_sha256'].items()}
for name,digest in read(HERE/'manifest.json').items():assert sha(HERE/name)==digest,name
ob=(ROOT/'evidence/original/pump/deployed.so').read_bytes();os=sections(ob);assert hashlib.sha256(ob).hexdigest()=='7a19affaa2c6187e04a5fe0ea298cee81fa5eb8c24cfcc30d85f615e89f7b02d'
records={}
for phase in ['baseline','recovered','repeat']:
 r=records[phase]=read(HERE/phase/'build-comparison.json');assert r['returncode']==0 and r['source_unchanged'] and r['source_sha256']==r['source_after_sha256']
 assert sha(HERE/phase/'candidate.so')==r['comparison']['candidate_sha256'] and sha(HERE/phase/'unstripped.so')==r['unstripped_sha256'] and not r['comparison']['full_byte_equality']
 if phase!='repeat':
  for name,digest in source(r).items():assert sha(HERE/phase/'source'/name)==digest
assert source(records['recovered'])==source(records['repeat'])
a,b=source(records['baseline']),source(records['recovered']);assert set(a)==set(b) and [k for k in a if a[k]!=b[k]]==['src/legacy_buy.rs']
candidate_sha=sha(HERE/'recovered/candidate.so');assert candidate_sha==sha(HERE/'repeat/candidate.so') and sha(HERE/'recovered/unstripped.so')==sha(HERE/'repeat/unstripped.so')
cb=(HERE/'recovered/unstripped.so').read_bytes();cs=sections(cb);stripped=(HERE/'recovered/candidate.so').read_bytes();ss=sections(stripped)
for name in ['.text','.rodata','.data.rel.ro']:
 x,y=cs[name],ss[name];assert (x['addr'],x['size'])==(y['addr'],y['size']);assert cb[x['offset']:x['offset']+x['size']]==stripped[y['offset']:y['offset']+y['size']]
for name,start in [('claimed',0x7bec0),('earned',0x7bda8)]:
 r=read(HERE/'recovered'/(name+'-comparison.json'));c=r['candidates'][0];assert r['candidate_sha256']==sha(HERE/'recovered/unstripped.so') and r['original_start']==start and c['bytes']==280
 left,lo=normalize(body(ob,os,start,280),start,os);right,ro=normalize(body(cb,cs,c['start'],280),c['start'],cs)
 assert left==right and c['normalized_equal'] and not c['raw_equal'] and not c['different_slots'];assert lo==r['original_operands'] and ro==c['operands']
def diagnostics(x):
 panic=[l.split('\n',1)[-1] for l in x['logs'] if l.startswith('Program log: panicked at ')]
 anchor=[m.groups() for l in x['logs'] if (m:=re.search(r'Error Code: (.*?)\. Error Number: (\d+)\. Error Message: (.*)',l))]
 return {'panic':panic,'anchor':anchor}
before,after=read(HERE/'before.json.gz'),read(HERE/'after.json.gz')
assert before['candidate_sha256']==sha(HERE/'baseline/candidate.so') and after['candidate_sha256']==candidate_sha
assert before['case_count']==after['case_count']==14 and before['mismatches']==[2,3,5,9,10,12] and after['mismatches']==[]
assert before['script_sha256']==after['script_sha256']==sha(HERE/'research/corpus.py')
for run in (before,after):
 mismatches=[]
 for i,row in enumerate(run['cases']):
  x,y=row['original'],row['candidate'];d=[k for k in ['error','before','accounts','events','inner','return_data'] if x[k]!=y[k]]
  if diagnostics(x)!=diagnostics(y):d.append('diagnostics')
  assert d==row['different_fields'] and row['match']==(not d)
  if d:mismatches.append(i)
  assert x['transaction_base64']==y['transaction_base64'] and x['signatures_verified'] and y['signatures_verified'];Transaction.from_bytes(base64.b64decode(x['transaction_base64'])).verify()
 assert mismatches==run['mismatches']
 assert len(run['calibration'])==2
 for row in run['calibration']:
  x=row['original'];assert x['error'] is None;assert struct.unpack_from('<Q',base64.b64decode(x['accounts'][row['key']]['data']),74)[0]==row['amount']>0
for x,y in zip(before['cases'],after['cases'],strict=True):assert x['case']==y['case'] and x['original']==y['original']
normal=read(HERE/'recovered/normalized-inventory.json');assert normal['candidate_sha256']==sha(HERE/'recovered/unstripped.so') and normal['counts']=={'total':1035,'raw':112,'normalized':548,'unmatched':487}
raw_count=0
assert len(normal['windows'])==1035
for row in normal['windows']:
 x=body(ob,os,row['start'],row['bytes'])
 for m in row['normalized_matches']:assert normalize(x,row['start'],os)[0]==normalize(body(cb,cs,m['start'],row['bytes']),m['start'],cs)[0]
 raw_count+=any(x==body(cb,cs,m['start'],row['bytes']) for m in row['normalized_matches'])
assert raw_count==112 and sum(bool(row['normalized_matches']) for row in normal['windows'])==548
full=read(HERE/'full-regression.json.gz');assert full['case_count']==10468 and len(full['suites'])==44 and not full['mismatches'] and full['candidate_sha256']==candidate_sha
assert sum(s['case_count'] for s in full['suites'].values())==10468 and full['runner_sha256']==sha(HERE/'harness/pump_validate_all.py')
assert full['suites']['legacy_cashback']['cases']==after['cases']
for s in full['suites'].values():assert not s.get('mismatches',s.get('failures',[]))
audit=read(HERE/'log-audit.json');assert audit['mismatches']==[] and audit['source_report_sha256']==sha(HERE/'full-regression.json.gz')
with tempfile.TemporaryDirectory() as temp:
 out=Path(temp)/'audit.json';subprocess.run([sys.executable,str(HERE/'research/audit_logs.py'),'--report',str(HERE/'full-regression.json.gz'),'--output',str(out)],check=True,capture_output=True);assert read(out)==audit
rejected=read(HERE/'rejected-cache-collision.json');assert rejected['status']=='rejected' and rejected['observed_candidate_sha256']!=candidate_sha and rejected['expected_candidate_sha256']==candidate_sha
print('Verified legacy payment ordering, 14 signed cases, 44 suites /10468 cases, unchanged normalized cashback helpers, inventories and clean builds. Full main-Pump byte identity remains false.')
