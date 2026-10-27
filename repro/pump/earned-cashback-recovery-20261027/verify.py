"""Verify the frozen main-Pump earned-counter reconstruction."""
from pathlib import Path
import json,gzip,hashlib,struct,sys,base64,importlib.util,tempfile,contextlib,io,subprocess
from solders.transaction import Transaction
HERE=Path(__file__).resolve().parent;ROOT=next(p for p in HERE.parents if (p/'evidence/original/pump/deployed.so').is_file())
sys.path[:0]=[str(HERE/'harness'),str(ROOT/'work/pump-claim-byte-recovery/z3-runtime')]
from pump_compare_function_bytes import body,normalize
from pump_quote_control_function_match import sections
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
def read(p):
 b=p.read_bytes();return json.loads(gzip.decompress(b) if b.startswith(b'\x1f\x8b') else b)
def source(r):return {k.split('programs/pump/',1)[1]:v for k,v in r['source_sha256'].items()}
for name,digest in read(HERE/'manifest.json').items():assert sha(HERE/name)==digest,name
original=ROOT/'evidence/original/pump/deployed.so';ob=original.read_bytes();os=sections(ob);assert sha(original)=='7a19affaa2c6187e04a5fe0ea298cee81fa5eb8c24cfcc30d85f615e89f7b02d'
for phase in ['baseline','recovered','repeat']:
 r=read(HERE/phase/'build-comparison.json');assert r['returncode']==0 and r['source_unchanged'] and r['source_sha256']==r['source_after_sha256']
 assert sha(HERE/phase/'candidate.so')==r['comparison']['candidate_sha256'] and sha(HERE/phase/'unstripped.so')==r['unstripped_sha256']
 assert not r['comparison']['full_byte_equality']
 if phase!='repeat':
  for path,digest in source(r).items():assert sha(HERE/phase/'source'/path)==digest
r=read(HERE/'recovered/build-comparison.json');repeat=read(HERE/'repeat/build-comparison.json');assert source(r)==source(repeat)
candidate=HERE/'recovered/unstripped.so';cb=candidate.read_bytes();cs=sections(cb);candidate_sha=sha(HERE/'recovered/candidate.so')
assert sha(candidate)==sha(HERE/'repeat/unstripped.so') and candidate_sha==sha(HERE/'repeat/candidate.so')
stripped=(HERE/'recovered/candidate.so').read_bytes();ss=sections(stripped)
for name in ('.text','.rodata','.data.rel.ro'):
 x,y=cs[name],ss[name];assert (x['addr'],x['size'])==(y['addr'],y['size']);assert cb[x['offset']:x['offset']+x['size']]==stripped[y['offset']:y['offset']+y['size']]
comparison=read(HERE/'recovered/function-comparison.json');c=comparison['candidates'][0]
assert comparison['candidate_sha256']==sha(candidate) and comparison['original_start']==0x7bda8 and c['bytes']==280
left,lo=normalize(body(ob,os,0x7bda8,280),0x7bda8,os);right,ro=normalize(body(cb,cs,c['start'],280),c['start'],cs)
assert left==right and c['normalized_equal'] and not c['raw_equal'] and not c['different_slots']
assert comparison['original_operands']==lo and c['operands']==ro
spec=importlib.util.spec_from_file_location('earned_model',HERE/'research/helper_symbolic.py');model=importlib.util.module_from_spec(spec);spec.loader.exec_module(model);z=model.z3
proof=read(HERE/'proof/proof.json');assert proof['script_sha256']==sha(HERE/'research/helper_symbolic.py') and proof['candidate_sha256']==sha(candidate)
assert proof['solver']==z.get_version_string()
with tempfile.TemporaryDirectory() as temp:
 old=sys.argv[:]
 try:
  sys.argv=['helper_symbolic.py','--candidate',str(candidate),'--output',temp]
  with contextlib.redirect_stdout(io.StringIO()):model.main()
 finally:sys.argv=old
 for name,p in proof['proofs'].items():
  assert p['result']=='unsat'
  saved=z.And(*z.parse_smt2_string((HERE/'proof'/(name+'.smt2')).read_text()));new=z.And(*z.parse_smt2_string((Path(temp)/(name+'.smt2')).read_text()))
  q=z.Solver();q.set(timeout=30000);q.add(z.Xor(saved,new));assert q.check()==z.unsat
calls=read(HERE/'recovered/callers.json');assert calls['candidate_sha256']==sha(candidate) and len(calls['calls'])==3 and calls['target']==c['start']
for call in calls['calls']:
 op,reg,off,imm=struct.unpack('<BBhi',body(cb,cs,call['pc'],8));assert op==0x85 and reg>>4==1 and call['pc']+8+imm*8==c['start']
def messages(x):return [v.split('\n',1)[-1] for v in x['logs'] if v.startswith('Program log: panicked at ')]
a,b=read(HERE/'baseline-cases.json.gz'),read(HERE/'earned-cases.json.gz')
assert a['candidate_sha256']==sha(HERE/'baseline/candidate.so') and b['candidate_sha256']==candidate_sha
assert len(a['mismatches'])==32 and b['mismatches']==[] and a['case_count']==b['case_count']==61
assert a['script_sha256']==b['script_sha256']==sha(HERE/'research/boundary_corpus.py')
for run in (a,b):
 mismatches=[]
 for i,row in enumerate(run['cases']):
  x,y=row['original'],row['candidate'];diff=[k for k in ('error','accounts','events','inner','return_data') if x[k]!=y[k]]
  if messages(x)!=messages(y):diff.append('panic_message')
  assert diff==row['different_fields'] and row['match']==(not diff)
  if diff:mismatches.append(i)
  assert x['transaction_base64']==y['transaction_base64'];Transaction.from_bytes(base64.b64decode(x['transaction_base64'])).verify()
 assert mismatches==run['mismatches']
 assert len(run['calibration'])==9
 for row in run['calibration']:
  x=row['original'];assert x['error'] is None
  data=base64.b64decode(x['accounts'][row['accumulator_key']]['data']);assert struct.unpack_from('<Q',data,row['offset'])[0]==row['earned_amount']>0
  Transaction.from_bytes(base64.b64decode(x['transaction_base64'])).verify()
for x,y in zip(a['cases'],b['cases'],strict=True):assert x['case']==y['case'] and x['original']==y['original']
normal=read(HERE/'recovered/normalized-inventory.json');assert normal['candidate_sha256']==sha(candidate) and normal['counts']=={'total':1035,'raw':112,'normalized':548,'unmatched':487}
raw_count=0
assert len(normal['windows'])==1035
for row in normal['windows']:
 obody=body(ob,os,row['start'],row['bytes'])
 for match in row['normalized_matches']:assert normalize(obody,row['start'],os)[0]==normalize(body(cb,cs,match['start'],row['bytes']),match['start'],cs)[0]
 raw_count+=any(obody==body(cb,cs,m['start'],row['bytes']) for m in row['normalized_matches'])
assert raw_count==112 and sum(bool(r['normalized_matches']) for r in normal['windows'])==548
full=read(HERE/'full-regression.json.gz');assert full['case_count']==10454 and len(full['suites'])==43 and not full['mismatches'] and full['candidate_sha256']==candidate_sha
assert sum(s['case_count'] for s in full['suites'].values())==10454 and full['runner_sha256']==sha(HERE/'harness/pump_validate_all.py')
assert full['suites']['earned_cashback']['cases']==b['cases']
for suite in full['suites'].values():assert not suite.get('mismatches',suite.get('failures',[]))
audit=read(HERE/'log-audit.json');assert audit['mismatches']==[] and audit['source_report_sha256']==sha(HERE/'full-regression.json.gz')
with tempfile.TemporaryDirectory() as temp:
 output=Path(temp)/'audit.json';subprocess.run([sys.executable,str(HERE/'research/audit_logs.py'),'--report',str(HERE/'full-regression.json.gz'),'--output',str(output)],check=True,capture_output=True);assert read(output)==audit
print('Verified earned-counter helper, scoped all-input proof, 61 signed boundary cases, 43 suites / 10454 cases and clean rebuild. Full main-Pump byte identity remains false.')
