"""Verify the retained main-Pump incentive-worker reconstruction evidence."""
from pathlib import Path
import base64,gzip,hashlib,importlib.util,json,sys
from solders.transaction import Transaction
HERE=Path(__file__).resolve().parent;ROOT=HERE.parents[2]
sys.path.insert(0,str(HERE/'harness'));sys.path.insert(0,str(ROOT/'work/pump-claim-byte-recovery/z3-runtime'))
from pump_compare_function_bytes import body,normalize
from pump_quote_control_function_match import sections
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
def read(p):
 b=p.read_bytes();return json.loads(gzip.decompress(b) if b.startswith(b'\x1f\x8b') else b)
def module(name,path):
 spec=importlib.util.spec_from_file_location(name,path);m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m);return m
for name,digest in read(HERE/'manifest.json').items():assert sha(HERE/name)==digest,name
original=ROOT/'evidence/original/pump/deployed.so';ob=original.read_bytes();os=sections(ob)
assert sha(original)=='7a19affaa2c6187e04a5fe0ea298cee81fa5eb8c24cfcc30d85f615e89f7b02d'
for row in read(HERE/'original-functions.json')['functions']:
 assert hashlib.sha256(body(ob,os,row['start'],row['bytes'])).hexdigest()==row['sha256']
r=read(HERE/'recovered/build-comparison.json');candidate=HERE/'recovered/unstripped.so';cb=candidate.read_bytes();cs=sections(cb)
assert r['returncode']==0 and r['source_unchanged'] and r['source_sha256']==r['source_after_sha256']
for name,digest in r['source_sha256'].items():assert sha(HERE/'recovered/source'/name.split('programs/pump/',1)[1])==digest
assert sha(candidate)==r['unstripped_sha256'] and sha(HERE/'recovered/candidate.so')==r['comparison']['candidate_sha256']
assert not r['comparison']['full_byte_equality'] and ob!=cb
repeat=read(HERE/'repeat/build-comparison.json')
assert repeat['source_sha256']==r['source_sha256'] and repeat['source_unchanged']
assert repeat['unstripped_sha256']==sha(candidate)==sha(HERE/'repeat/unstripped.so')
assert repeat['comparison']['candidate_sha256']==sha(HERE/'recovered/candidate.so')==sha(HERE/'repeat/candidate.so')
reports={}
for kind,start,size in [('worker',0x7bfd8,1864),('day',0x7dfc8,232)]:
 d=read(HERE/f'recovered/{kind}-comparison.json');c=d['candidates'][0];reports[kind]=c
 assert d['candidate_sha256']==sha(candidate) and d['original_sha256']==sha(original)
 left,lo=normalize(body(ob,os,start,size),start,os);right,ro=normalize(body(cb,cs,c['start'],c['bytes']),c['start'],cs)
 diffs=[{'offset':i,'original':left[i:i+8].hex(),'candidate':right[i:i+8].hex()} for i in range(0,max(len(left),len(right)),8) if left[i:i+8]!=right[i:i+8]]
 assert diffs==c['different_slots'] and lo==d['original_operands'] and ro==c['operands']
 assert not c['raw_equal'] and not c['normalized_equal']
assert body(ob,os,0x7bfd8,104)==body(cb,cs,reports['worker']['start'],104)
assert reports['day']['bytes']==232 and len(reports['day']['different_slots'])==12
micro=module('pump_day_micro',HERE/'research/day_microcheck.py');proof=read(HERE/'proof/proof.json')
assert proof['candidate_sha256']==sha(candidate) and proof['original_sha256']==sha(original)
op={int(k):v for k,v in proof['original_panic_targets'].items()};cp={int(k):v for k,v in proof['candidate_panic_targets'].items()}
rows=read(HERE/'day-microcheck.json');assert rows['candidate_sha256']==sha(candidate) and not rows['mismatches'] and rows['case_count']==4515
for row in rows['cases']:
 left,lp=micro.run(ob,0x7dfc8,232,row['inputs'],op);right,rp=micro.run(cb,proof['candidate_start'],232,row['inputs'],cp)
 assert left==right==row['original']==row['candidate'] and lp==row['original_path'] and rp==row['candidate_path']
sym=module('pump_day_symbolic',HERE/'research/day_symbolic.py');z3=sym.z3
assert sha(HERE/'research/day_symbolic.py')==proof['script_sha256'] and z3.get_version_string()==proof['solver']
inputs=z3.BitVecs('start_time end_time seconds_in_a_day',64)
left,ld=sym.symbolic(ob,0x7dfc8,232,inputs,op);right,rd=sym.symbolic(cb,proof['candidate_start'],232,inputs,cp)
assert len(left)==len(proof['original_paths']) and len(right)==len(proof['candidate_paths'])
terms=[]
for x in left:
 for y in right:
  difference=z3.BoolVal(x['kind']!=y['kind'] or x.get('message')!=y.get('message'))
  if x['kind']==y['kind']=='return':difference=x['value']!=y['value']
  terms.append(z3.And(x['condition'],y['condition'],difference))
queries={'no_mismatch':z3.Or(*terms),'original_paths_cover_all_inputs':z3.Not(z3.Or(*(x['condition'] for x in left))),'candidate_paths_cover_all_inputs':z3.Not(z3.Or(*(x['condition'] for x in right))),'no_reachable_divide_by_zero':z3.Or(*(ld+rd))}
for name,query in queries.items():
 solver=z3.Solver();solver.set(timeout=30000);solver.add(query);assert solver.check()==z3.unsat,name
 assert proof['proofs'][name]['result']=='unsat'
worker=module('pump_worker_micro',HERE/'research/worker_microcheck.py')
wm=read(HERE/'worker-microcheck.json')
assert wm['script_sha256']==sha(HERE/'research/worker_microcheck.py') and wm['candidate_sha256']==sha(candidate)
assert wm['case_count']==645 and not wm['mismatches']
wn_o={int(k):v for k,v in wm['original_call_names'].items()};wn_c={int(k):v for k,v in wm['candidate_call_names'].items()}
for row in wm['cases']:
 left=worker.run(ob,wm['original_start'],wm['original_bytes'],wn_o,row['input'])
 right=worker.run(cb,wm['candidate_start'],wm['candidate_bytes'],wn_c,row['input'])
 assert left==right==row['original']==row['candidate'] and row['matches']
for filename,seed in [('final-claim-cases.json.gz',20261027),('holdout-claim-cases.json.gz',20261028)]:
 claim=read(HERE/filename);assert claim['case_count']==len(claim['cases'])==334 and not claim['mismatches'] and claim['seed']==seed
 assert claim['compiled_source_sha256']==r['source_sha256'] and claim['candidate_sha256']==sha(HERE/'recovered/candidate.so')
 for row in claim['cases']:
  assert not row['differences']
  for field in ('error','before','after','event_data_base64','inner'):assert row['original'][field]==row['candidate'][field]
  assert row['original']['transaction_base64']==row['candidate']['transaction_base64']
  Transaction.from_bytes(base64.b64decode(row['original']['transaction_base64'])).verify()
panic=read(HERE/'panic-cases.json.gz');assert panic['case_count']==2 and not panic['mismatches']
assert panic['candidate_sha256']==sha(HERE/'recovered/candidate.so')
for row in panic['cases']:
 assert not row['differences'] and row['original_panic']['message']==row['candidate_panic']['message']==row['expected_message']
 Transaction.from_bytes(base64.b64decode(row['original']['transaction_base64'])).verify()
before=read(HERE/'panic-before-fix.json.gz');assert before['mismatches']==['claimed-add-overflow']
assert before['candidate_sha256']==sha(HERE/'research/final/candidate.so')
# The sealed receipt keys its inputs by the authoring checkout's absolute paths;
# select the panic harness entry by its repository-relative suffix.
old_hash,=[h for k,h in before['inputs_sha256'].items() if k.endswith('/scripts/pump_claim_panic_differential.py')]
assert old_hash==sha(HERE/'research/panic-harness-before-dependency-binding.py')
inventory=read(HERE/'recovered/exact-body-inventory.json');assert inventory['candidate_sha256']==sha(candidate)
assert inventory['raw_equal_windows']==112 and inventory['original_windows']==1035 and not inventory['whole_file_equal']
at=os['.text']['addr'];matched=0
for row in inventory['windows']:
 assert row['original_start']==at;at=row['original_end']
 raw=body(ob,os,row['original_start'],row['bytes']);assert hashlib.sha256(raw).hexdigest()==row['sha256']
 for m in row['raw_counterparts']:assert raw==body(cb,cs,m['address'],row['bytes'])
 matched+=bool(row['raw_counterparts'])
assert at==os['.text']['addr']+os['.text']['size'] and matched==112
normalized=read(HERE/'recovered/normalized-inventory.json')
assert normalized['candidate_sha256']==sha(candidate) and normalized['counts']['normalized']==546
assert sum(bool(row['normalized_matches']) for row in normalized['windows'])==546
for row in normalized['windows']:
 original_body=body(ob,os,row['start'],row['bytes']);left,_=normalize(original_body,row['start'],os)
 for match in row['normalized_matches']:
  candidate_body=body(cb,cs,match['start'],row['bytes']);right,_=normalize(candidate_body,match['start'],cs)
  assert left==right and hashlib.sha256(candidate_body).hexdigest()==match['raw_sha256']
full=read(HERE/'full-regression.json.gz');assert full['candidate_sha256']==sha(HERE/'recovered/candidate.so')
assert full['original_sha256']==sha(original) and full['case_count']==9787 and len(full['suites'])==41 and not full['mismatches']
assert sum(s['case_count'] for s in full['suites'].values())==9787
print('Verified: reconstructed worker source; exact 104-byte entry prefix; 4515 direct day cases; all-input day-model equivalence; 334 signed claim cases; 2 panic diagnostics; 41 suites / 9787 cases; reproducible build. Whole-contract byte identity remains false.')
