"""Verify the saved main-Pump shared-helper and scheduler evidence."""
from pathlib import Path
import json,gzip,hashlib,base64,struct,sys,importlib.util
from collections import Counter
from solders.transaction import Transaction
HERE=Path(__file__).resolve().parent;ROOT=HERE.parents[2]
sys.path.insert(0,str(HERE/'harness'));sys.path.insert(0,str(ROOT/'work/pump-claim-byte-recovery/z3-runtime'))
from pump_compare_function_bytes import body,normalize
from pump_quote_control_function_match import sections
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
def read(p):
 b=p.read_bytes();return json.loads(gzip.decompress(b) if b.startswith(b'\x1f\x8b') else b)
def load(name,path):
 s=importlib.util.spec_from_file_location(name,path);m=importlib.util.module_from_spec(s);s.loader.exec_module(m);return m
for name,h in read(HERE/'manifest.json').items():assert sha(HERE/name)==h,name
original=ROOT/'evidence/original/pump/deployed.so';ob=original.read_bytes();os=sections(ob)
assert sha(original)=='7a19affaa2c6187e04a5fe0ea298cee81fa5eb8c24cfcc30d85f615e89f7b02d'
for f in read(HERE/'static-original.json')['functions']:
 assert hashlib.sha256(body(ob,os,int(f['start'],0),f['bytes'])).hexdigest()==f['sha256']
for phase in ('baseline','recovered'):
 build=read(HERE/phase/'build-comparison.json');assert build['returncode']==0 and build['source_unchanged'] and build['source_sha256']==build['source_after_sha256']
 for name,h in build['source_sha256'].items():assert sha(HERE/phase/'source'/name.split('programs/pump/',1)[1])==h,(phase,name)
 assert sha(HERE/phase/'candidate.so')==build['comparison']['candidate_sha256'] and not build['comparison']['full_byte_equality']
build=read(HERE/'recovered/build-comparison.json');candidate=HERE/'recovered/unstripped.so';cb=candidate.read_bytes();cs=sections(cb)
assert sha(candidate)==build['unstripped_sha256'];candidate_sha=sha(HERE/'recovered/candidate.so')
stripped=(HERE/'recovered/candidate.so').read_bytes();ss=sections(stripped)
for name in ('.text','.rodata','.data.rel.ro'):
 a,b=cs[name],ss[name];assert a['addr']==b['addr'] and a['size']==b['size']
 assert cb[a['offset']:a['offset']+a['size']]==stripped[b['offset']:b['offset']+b['size']]
repeat=read(HERE/'repeat/build-comparison.json');assert repeat['source_sha256']==build['source_sha256']
assert repeat['comparison']['candidate_sha256']==candidate_sha==sha(HERE/'repeat/candidate.so')
assert repeat['unstripped_sha256']==sha(candidate)==sha(HERE/'repeat/unstripped.so')
for label,start,size in [('day',0x7dfc8,232),('scheduler',0x7c720,6312)]:
 r=read(HERE/f'recovered/{label}-comparison.json');x=r['candidates'][0]
 assert r['candidate_sha256']==sha(candidate) and r['original_sha256']==sha(original)
 left,lo=normalize(body(ob,os,start,size),start,os);right,ro=normalize(body(cb,cs,x['start'],x['bytes']),x['start'],cs)
 diff=[{'offset':i,'original':left[i:i+8].hex(),'candidate':right[i:i+8].hex()} for i in range(0,max(len(left),len(right)),8) if left[i:i+8]!=right[i:i+8]]
 assert diff==x['different_slots'] and lo==r['original_operands'] and ro==x['operands']
 assert not x['raw_equal'] and not x['normalized_equal']
callers=read(HERE/'recovered/callers.json');assert callers['candidate_sha256']==sha(candidate)
assert len(callers['original_calls'])==4 and len(callers['candidate_calls'])==3
assert callers['candidate_target_bytes']==232
for data,image,sec,target in [(callers['original_calls'],ob,os,callers['original_target']),(callers['candidate_calls'],cb,cs,callers['candidate_target'])]:
 for row in data:
  raw=body(image,sec,row['call'],8);op,reg,off,im=struct.unpack('<BBhi',raw);assert op==0x85 and reg>>4==1 and row['call']+8+im*8==target
for name,module_name,original_start,length in [('worker','worker_microcheck',0x7bfd8,1864),('scheduler','scheduler_microcheck',0x7c720,6312)]:
 r=read(HERE/f'models/{name}.json');m=load('model_'+name,HERE/f'models/{module_name}.py')
 assert r['candidate_sha256']==sha(candidate) and r.get('model_sha256',r.get('script_sha256'))==sha(HERE/f'models/{module_name}.py')
 on={int(k):v for k,v in r['original_call_names'].items()};cn={int(k):v for k,v in r['candidate_call_names'].items()}
 assert not r['mismatches'] and r['case_count']==(645 if name=='worker' else 816)
 for row in r['cases']:
  a=m.run(ob,original_start,length,on,row['input']);b=m.run(cb,r['candidate_start'],r['candidate_bytes'],cn,row['input'])
  assert a==b==row['original']==row['candidate'] and row['matches']
calibration=read(HERE/'models/calibration.json');assert calibration['case_count']==191 and calibration['candidate_sha256']==sha(candidate)
scheduler=load('calibrated_scheduler',HERE/'models/scheduler_microcheck.py');sr=read(HERE/'models/scheduler.json')
assert calibration['model_sha256']==sha(HERE/'models/scheduler_microcheck.py')
assert calibration['script_sha256']==sha(HERE/'research/calibrate_scheduler_model.py')
assert calibration['receipt_sha256']==sha(HERE/'schedule-cases.json.gz')
vm_cases={row['case']['name']:row for row in read(HERE/'schedule-cases.json.gz')['cases'] if row['original']['error'] is None}
assert len(vm_cases)==191

for row in calibration['cases']:
 vm=vm_cases[row['case']]['original'];data=bytes.fromhex(vm['after'][calibration['global_key']]['data'])
 start,end,period=struct.unpack_from('<qqq',data,8)
 decoded={'start':start,'end':end,'day':period,'mint':data[32:64].hex(),'supplies':list(struct.unpack_from('<30Q',data,64)),'volumes':list(struct.unpack_from('<30Q',data,304))}
 assert row['vm_after']==decoded
 for image,start,size,names_key in [(ob,sr['original_start'],sr['original_bytes'],'original_call_names'),(cb,sr['candidate_start'],sr['candidate_bytes'],'candidate_call_names')]:
  state=scheduler.run(image,start,size,{int(k):v for k,v in sr[names_key].items()},row['input'])
  assert state['outcome']=={'kind':'ok'} and state['global']==row['vm_after']
r=read(HERE/'models/day.json');m=load('day_model',HERE/'models/day_microcheck.py');assert r['case_count']==4515 and not r['mismatches'] and r['candidate_sha256']==sha(candidate)
assert r['model_sha256']==sha(HERE/'models/day_microcheck.py');cp={int(k):v for k,v in r['candidate_panic_targets'].items()}
for row in r['cases']:
 a,ap=m.run(ob,0x7dfc8,232,row['inputs'],{0x1ace18:'conversion-panic',0x1ac528:'schedule-panic'});b,bp=m.run(cb,r['candidate_start'],232,row['inputs'],cp)
 assert a==b==row['original']==row['candidate'] and ap==row['original_path'] and bp==row['candidate_path']
p=read(HERE/'proof/proof.json');sm=load('symbolic_day',HERE/'models/day_symbolic.py');z=sm.z3
assert p['candidate_sha256']==sha(candidate) and p['script_sha256']==sha(HERE/'models/day_symbolic.py') and p['solver']==z.get_version_string()
inputs=z.BitVecs('start_time end_time seconds_in_a_day',64);op={int(k):v for k,v in p['original_panic_targets'].items()};cp={int(k):v for k,v in p['candidate_panic_targets'].items()}
a,ad=sm.symbolic(ob,0x7dfc8,232,inputs,op);b,bd=sm.symbolic(cb,p['candidate_start'],232,inputs,cp);terms=[]
for x in a:
 for y in b:
  d=z.BoolVal(x['kind']!=y['kind'] or x.get('message')!=y.get('message'))
  if x['kind']==y['kind']=='return':d=x['value']!=y['value']
  terms.append(z.And(x['condition'],y['condition'],d))
queries=[z.Or(*terms),z.Not(z.Or(*(x['condition'] for x in a))),z.Not(z.Or(*(x['condition'] for x in b))),z.Or(*(ad+bd))]
for query in queries:
 solver=z.Solver();solver.set(timeout=30000);solver.add(query);assert solver.check()==z.unsat
assert all(x['result']=='unsat' for x in p['proofs'].values())
def panics(x):return [l.split('\n',1)[-1] for l in x['logs'] if l.startswith('Program log: panicked at ')]
before=read(HERE/'before-schedule.json.gz');after=read(HERE/'schedule-cases.json.gz')
assert before['case_count']==after['case_count']==575 and len(before['mismatches'])==25 and not after['mismatches']
assert Counter(tuple(panics(row['original'])) for row in before['cases'] if row['differences'])=={('current_timestamp should be bigger than start_time',):21,('Unexpected overflow',):4}
assert before['candidate_sha256']==sha(HERE/'baseline/candidate.so') and after['candidate_sha256']==candidate_sha and after['compiled_source_sha256']==build['source_sha256']
for old,row in zip(before['cases'],after['cases'],strict=True):
 assert old['case']==row['case'] and not row['differences']
 assert old['differences'] in ([],['panic_message'])
 assert bool(old['differences'])==(panics(old['original'])!=panics(old['candidate']))
 for field in ('before','after','error','events','inner','return'):assert row['original'][field]==row['candidate'][field]==old['original'][field]
 assert panics(row['original'])==panics(row['candidate'])
 assert [line for line in row['original']['logs'] if line.startswith('Program log: GlobalVolumeAccumulator=')]==[line for line in row['candidate']['logs'] if line.startswith('Program log: GlobalVolumeAccumulator=')]
 assert row['original']['transaction_base64']==row['candidate']['transaction_base64'];Transaction.from_bytes(base64.b64decode(row['original']['transaction_base64'])).verify()
for filename,count,fields in [('claim-cases.json.gz',334,('error','before','after','event_data_base64','inner')),('claim-panic-cases.json.gz',2,('error','before','after','event_data_base64','inner')),('joint-time-edges.json.gz',60,('before','after','error','events','inner','return'))]:
 r=read(HERE/filename);assert r['case_count']==count and not r['mismatches'] and r['candidate_sha256']==candidate_sha
 for row in r['cases']:
  assert not row['differences']
  for f in fields:assert row['original'][f]==row['candidate'][f]
  assert row['original']['transaction_base64']==row['candidate']['transaction_base64']
  if filename=='joint-time-edges.json.gz':assert panics(row['original'])==panics(row['candidate'])
  if filename=='claim-panic-cases.json.gz':assert row['original_panic']['message']==row['candidate_panic']['message']==row['expected_message']
  Transaction.from_bytes(base64.b64decode(row['original']['transaction_base64'])).verify()
raw=read(HERE/'recovered/raw-inventory.json');assert raw['candidate_sha256']==sha(candidate) and raw['original_windows']==1035 and raw['raw_equal_windows']==112
assert sum(bool(r['raw_counterparts']) for r in raw['windows'])==112
for row in raw['windows']:
 for match in row['raw_counterparts']:assert body(ob,os,row['original_start'],row['bytes'])==body(cb,cs,match['address'],row['bytes'])
full=read(HERE/'full-regression.json.gz');assert full['case_count']==10362 and len(full['suites'])==42 and not full['mismatches'] and full['candidate_sha256']==candidate_sha
assert sum(s['case_count'] for s in full['suites'].values())==10362
print('Verified shared scheduler/claim helper, 25 corrected panic cases, 816 scheduler + 645 claim-worker + 4515 day-model cases, all-input day-model proof, signed transactions, 42 suites / 10362 cases, and a reproducible build. Full ELF equality remains false.')
