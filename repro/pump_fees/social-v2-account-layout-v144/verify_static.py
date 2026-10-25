from pathlib import Path
import hashlib,json,struct,sys
W=Path(__file__).resolve().parent;R=W/'runtime'
sys.dont_write_bytecode=True
sys.path.insert(0,str(W))
from elf_reader import Elf
sha=lambda b:hashlib.sha256(b).hexdigest()
o=Elf(R/'evidence/original/pump_fees/deployed.so')
c=Elf(W/'pump_fees_candidate.so')
s=Elf(W/'symbol-source.so')
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
build=json.loads((W/'build-comparison.json').read_text());plan=json.loads((W/'trials/trial-plan-v2.json').read_text())
actual=build['source_sha256'];assert len(actual)==22
assert {p for p in actual if actual[p]!=plan['trial_source_sha256'][p]}=={'programs/pump-fees/README.md'}
out={'scope':'Complete static exit and direct-callee comparison only; normalized equality does not establish whole ELF, transitive closure or runtime behavior','candidate_sha256':sha(c.b),'original_sha256':sha(o.b),'candidate_bytes':len(c.b),'source_inputs':22,'changed_source_inputs':plan['changed_inputs'],'candidate_exit':f,'original_exit':{'start':os,'size':n},'normalized_exit_equal':True,'relocation_patterns_equal':True,'raw_exit_equal':c.b[cs:cs+n]==o.b[os:os+n],'direct_calls':rows,'bounded_literals':literals,'full_byte_equality':False,'runtime_comparisons':0}
RESULT=out
if __name__=='__main__':print(json.dumps(RESULT,indent=2))
