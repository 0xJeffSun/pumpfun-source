from pathlib import Path
import hashlib,json,struct,sys
R=Path(__file__).resolve().parents[2];W=Path(__file__).resolve().parent
sys.path.insert(0,str(R/'work/fees-mayhem-function-inventory/inputs'))
from elf_reader import Elf
sha=lambda b:hashlib.sha256(b).hexdigest()
o=Elf(R/'evidence/original/pump_fees/deployed.so')
c=Elf(W/'build-01/artifacts/pump_fees_candidate.so')
s=Elf(W/'build-01/target/sbf-solana-solana/release/pump_fees_candidate.so')
assert s.b[s.lo:s.hi]==c.b[c.lo:c.hi] and s.relocations==c.relocations
fs=[f for f in s.funcs if 'ClaimSocialFeePdaV2' in f['name'] and 'AccountsExit' in f['name'] and '4exit' in f['name']];assert len(fs)==1
f=fs[0];cs=f['start'];os=405560;n=560
assert f['size']==n and next(a for a in o.entries if a>os)==os+n
assert c.normalized[cs:cs+n]==o.normalized[os:os+n]
assert c.pattern(cs,n)==o.pattern(os,n)
cc=c.callsites(cs,n);oc=o.callsites(os,n);assert len(cc)==len(oc)==7
rows=[]
for a,b in zip(cc,oc):
 assert a['offset']==b['offset'];ca=a['target'];oa=b['target'];sizes={x['size'] for x in s.funcs if x['start']==ca};assert len(sizes)==1
 size=sizes.pop();assert next(x for x in o.entries if x>oa)==oa+size,(ca,oa,size)
 assert c.normalized[ca:ca+size]==o.normalized[oa:oa+size]
 assert c.pattern(ca,size)==o.pattern(oa,size)
 rows.append({'offset':a['offset'],'candidate_target':ca,'original_target':oa,'complete_body_bytes':size,'normalized_equal':True,'relocation_patterns_equal':True,'raw_equal':c.b[ca:ca+size]==o.b[oa:oa+size]})
literals=[]
for off,size in [(40,32),(320,14),(504,10)]:
 def ref(e,pc):
  assert e.b[pc]==0x18 and e.relocations[pc]['type']==8
  at=struct.unpack_from('<I',e.b,pc+4)[0]|(struct.unpack_from('<I',e.b,pc+12)[0]<<32)
  return at,e.b[at:at+size]
 ca,cb=ref(c,cs+off);oa,ob=ref(o,os+off);assert cb==ob and len(cb)==size
 literals.append({'instruction_offset':off,'bytes':size,'candidate_address':ca,'original_address':oa,'data_sha256':sha(cb),'equal':True})
build=json.loads((W/'build-01/build-comparison.json').read_text());plan=json.loads((W/'trial-plan.json').read_text())
actual={str(Path(p).relative_to('work/fees-social-v2-box-recovery/source')):h for p,h in build['source_sha256'].items()}
assert actual==plan['trial_source_sha256'] and len(actual)==22
out={'scope':'Complete static exit and direct-callee comparison only; normalized equality does not establish whole ELF, transitive closure or runtime behavior','candidate_sha256':sha(c.b),'original_sha256':sha(o.b),'candidate_bytes':len(c.b),'source_inputs':22,'changed_source_inputs':plan['changed_inputs'],'candidate_exit':f,'original_exit':{'start':os,'size':n},'normalized_exit_equal':True,'relocation_patterns_equal':True,'raw_exit_equal':c.b[cs:cs+n]==o.b[os:os+n],'direct_calls':rows,'bounded_literals':literals,'full_byte_equality':False,'runtime_comparisons':0}
(W/'exit-comparison.json').write_text(json.dumps(out,indent=2)+'\n')
print(json.dumps({k:v for k,v in out.items() if k not in ['direct_calls','bounded_literals']},indent=2))
