"""Verify frozen main-Pump cashback recovery evidence without trusting summaries."""
from pathlib import Path
import sys,json,gzip,hashlib,struct,base64,importlib.util
from solders.transaction import Transaction
HERE=Path(__file__).resolve().parent
ROOT=next(p for p in HERE.parents if (p/'evidence/original/pump/deployed.so').is_file())
sys.path[:0]=[str(HERE/'harness'),str(ROOT/'work/pump-claim-byte-recovery/z3-runtime')]
from pump_compare_function_bytes import body,normalize
from pump_quote_control_function_match import sections
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
def read(p):
 b=p.read_bytes();return json.loads(gzip.decompress(b) if b.startswith(b'\x1f\x8b') else b)
for name,digest in read(HERE/'manifest.json').items():assert sha(HERE/name)==digest,name
original=ROOT/'evidence/original/pump/deployed.so';ob=original.read_bytes();os=sections(ob)
assert sha(original)=='7a19affaa2c6187e04a5fe0ea298cee81fa5eb8c24cfcc30d85f615e89f7b02d'
for phase in ('baseline','recovered'):
 record=read(HERE/phase/'build-comparison.json')
 assert record['returncode']==0 and record['source_unchanged'] and record['source_sha256']==record['source_after_sha256']
 for name,digest in record['source_sha256'].items():assert sha(HERE/phase/'source'/name.split('programs/pump/',1)[1])==digest
 assert record['comparison']['candidate_sha256']==sha(HERE/phase/'candidate.so')
 assert record['unstripped_sha256']==sha(HERE/phase/'unstripped.so') and not record['comparison']['full_byte_equality']
record=read(HERE/'recovered/build-comparison.json');candidate=HERE/'recovered/unstripped.so';cb=candidate.read_bytes();cs=sections(cb);candidate_sha=sha(HERE/'recovered/candidate.so')
repeat=read(HERE/'repeat/build-comparison.json');assert repeat['returncode']==0 and repeat['source_unchanged']
assert repeat['source_sha256']==record['source_sha256']==repeat['source_after_sha256']
assert repeat['comparison']['candidate_sha256']==candidate_sha==sha(HERE/'repeat/candidate.so')
assert repeat['unstripped_sha256']==sha(candidate)==sha(HERE/'repeat/unstripped.so')
stripped=(HERE/'recovered/candidate.so').read_bytes();ss=sections(stripped)
for name in ('.text','.rodata','.data.rel.ro'):
 x,y=cs[name],ss[name];assert (x['addr'],x['size'])==(y['addr'],y['size'])
 assert cb[x['offset']:x['offset']+x['size']]==stripped[y['offset']:y['offset']+y['size']]
comparison=read(HERE/'recovered/function-comparison.json');c=comparison['candidates'][0]
assert comparison['original_sha256']==sha(original) and comparison['candidate_sha256']==sha(candidate)
assert comparison['original_start']==0x7bec0 and comparison['original_bytes']==c['bytes']==280
left,lo=normalize(body(ob,os,0x7bec0,280),0x7bec0,os);right,ro=normalize(body(cb,cs,c['start'],280),c['start'],cs)
assert left==right and c['normalized_equal'] and c['different_slots']==[] and not c['raw_equal']
assert lo==comparison['original_operands'] and ro==c['operands']
callers=read(HERE/'recovered/callers.json')
for label,blob,sec in [('original',ob,os),('candidate',cb,cs)]:
 info=callers[label];assert info['sha256']==hashlib.sha256(blob).hexdigest() and len(info['calls'])==1
 call=info['calls'][0]['call'];op,reg,off,imm=struct.unpack('<BBhi',body(blob,sec,call,8));assert op==0x85 and reg>>4==1 and call+8+imm*8==info['target']
 assert info['target']==(0x7bec0 if label=='original' else c['start'])
# Re-execute symbolic instruction paths and all saved SMT queries.
spec=importlib.util.spec_from_file_location('cashback_model',HERE/'research/helper_symbolic.py');model=importlib.util.module_from_spec(spec);spec.loader.exec_module(model);z=model.z3
proof=read(HERE/'proof/proof.json');assert proof['script_sha256']==sha(HERE/'research/helper_symbolic.py') and proof['solver']==z.get_version_string()
assert proof['candidate_sha256']==sha(candidate) and proof['original_sha256']==sha(original)
n,s,a=z.BitVecs('native_total stable_total amount',64);flag=z.Bool('native');inputs=(n,s,a,flag)
for blob,start,target,expected in [(ob,0x7bec0,proof['original_panic_target'],proof['original_paths']),(cb,c['start'],proof['candidate_panic_target'],proof['candidate_paths'])]:
 paths=model.symbolic(blob,start,280,inputs,target)
 assert len(paths)==len(expected)==4
 for actual,saved in zip(paths,expected,strict=True):
  assert actual['trace']==saved['trace'] and actual['kind']==saved['kind'] and actual['message']==saved['message']
  assert str(actual['condition'])==saved['condition']
  assert {str(k):str(v) for k,v in actual['memory'].items()}==saved['memory']
for name,item in proof['proofs'].items():
 solver=z.Solver();solver.set(timeout=30000);solver.from_string((HERE/'proof'/(name+'.smt2')).read_text());assert solver.check()==z.unsat and item['result']=='unsat'
assert normalize(body(ob,os,proof['original_panic_target'],48),proof['original_panic_target'],os)[0]==normalize(body(cb,cs,proof['candidate_panic_target'],48),proof['candidate_panic_target'],cs)[0]
# Regenerate the queries from the saved instruction model, binding them to bytes.
import tempfile,contextlib,io,subprocess
with tempfile.TemporaryDirectory() as temp:
 old_argv=sys.argv[:]
 try:
  sys.argv=['helper_symbolic.py','--candidate',str(candidate),'--output',temp]
  with contextlib.redirect_stdout(io.StringIO()):model.main()
 finally:sys.argv=old_argv
 for name in proof['proofs']:
  regenerated=z.And(*z.parse_smt2_string((Path(temp)/(name+'.smt2')).read_text()))
  saved=z.And(*z.parse_smt2_string((HERE/'proof'/(name+'.smt2')).read_text()))
  equivalent=z.Solver();equivalent.set(timeout=30000);equivalent.add(z.Xor(regenerated,saved));assert equivalent.check()==z.unsat
# Bind before/interim/after receipts to their exact binaries and transactions.
def panics(x):return [v.split('\n',1)[-1] for v in x['logs'] if v.startswith('Program log: panicked at ')]
base=read(HERE/'baseline-cases.json.gz');interim=read(HERE/'interim-cases.json.gz');after=read(HERE/'cashback-cases.json.gz')
assert len(base['mismatches'])==14 and interim['mismatches']==[280] and after['mismatches']==[]
assert base['candidate_sha256']==sha(HERE/'baseline/candidate.so') and interim['candidate_sha256']==sha(HERE/'interim/candidate.so') and after['candidate_sha256']==candidate_sha
for run in (base,interim,after):
 assert run['case_count']==len(run['cases'])==283 and run['original_sha256']==sha(original)
 assert run['harness_sha256']==sha(HERE/'harness/pump_cashback_differential.py')
 mismatches=[]
 for index,row in enumerate(run['cases']):
  o,b=row['original'],row['candidate'];different=[k for k in ('error','accounts','events','inner','return_data') if o[k]!=b[k]]
  if panics(o)!=panics(b):different.append('panic_message')
  assert different==row['different_fields'] and row['match']==(not different)
  if different:mismatches.append(index)
  assert o['transaction_base64']==b['transaction_base64'] and o['signatures_verified'] and b['signatures_verified']
  Transaction.from_bytes(base64.b64decode(o['transaction_base64'])).verify()
 assert mismatches==run['mismatches']
for old,mid,new in zip(base['cases'],interim['cases'],after['cases'],strict=True):assert old['case']==mid['case']==new['case'] and old['original']==mid['original']==new['original']
assert 'ArithmeticOverflow' in after['cases'][280]['original']['error']
assert 'Overflowing total cashback claimed' in panics(interim['cases'][280]['candidate'])
raw=read(HERE/'recovered/raw-inventory.json');normal=read(HERE/'recovered/normalized-inventory.json')
assert raw['candidate_sha256']==normal['candidate_sha256']==sha(candidate)
assert raw['original_windows']==1035 and raw['raw_equal_windows']==112 and normal['counts']=={'total':1035,'raw':112,'normalized':547,'unmatched':488}
for row in raw['windows']:
 for match in row['raw_counterparts']:assert body(ob,os,row['original_start'],row['bytes'])==body(cb,cs,match['address'],row['bytes'])
for row in normal['windows']:
 for match in row['normalized_matches']:assert normalize(body(ob,os,row['start'],row['bytes']),row['start'],os)[0]==normalize(body(cb,cs,match['start'],row['bytes']),match['start'],cs)[0]
full=read(HERE/'full-regression.json.gz');assert full['case_count']==10393 and len(full['suites'])==42 and not full['mismatches'] and full['candidate_sha256']==candidate_sha
assert sum(s['case_count'] for s in full['suites'].values())==10393
assert full['runner_sha256']==sha(HERE/'harness/pump_validate_all.py')
for suite in full['suites'].values():assert not suite.get('mismatches',suite.get('failures',[]))
audit=read(HERE/'log-audit.json');assert audit['source_report_sha256']==sha(HERE/'full-regression.json.gz') and audit['script_sha256']==sha(HERE/'research/audit_logs.py') and audit['mismatches']==[]
with tempfile.TemporaryDirectory() as temp:
 output=Path(temp)/'audit.json'
 subprocess.run([sys.executable,str(HERE/'research/audit_logs.py'),'--report',str(HERE/'full-regression.json.gz'),'--output',str(output)],check=True,capture_output=True)
 assert read(output)==audit
print('Verified cashback helper, all-u64 scoped instruction proof, payment precedence, 283 signed cases, 42 suites / 10393 cases, inventories and clean rebuild. Full main-Pump byte identity remains false.')
