"""Fresh symbol-located complete bodies, bounded targets/data and explicit residuals."""
from pathlib import Path
import hashlib,json,struct,sys
sys.dont_write_bytecode=True
from elf_reader import Elf
W=Path(__file__).resolve().parent;P=W/'prebuild'if(W/'prebuild').exists()else W.parent/'amm-scalar-setter-recovery'
O=P/'inputs/evidence/original/pump_amm/deployed.so';C=W/'candidate.so'if(W/'candidate.so').exists()else W/'build-01/artifacts/pump_amm_recovered.so';S=W/'unstripped.so'if(W/'unstripped.so').exists()else W/'build-01/target/sbf-solana-solana/release/pump_amm_recovered.so'
o,c,s=Elf(O),Elf(C),Elf(S);sha=lambda b:hashlib.sha256(b).hexdigest()
assert c.b[c.lo:c.hi]==s.b[s.lo:s.hi]and c.pattern(c.lo,c.hi-c.lo)==s.pattern(s.lo,s.hi-s.lo)
assert sha(o.b)=='6a7ad34596d83b4c435b32f458a56e718e9f82eb4ad38e4316616d15d24d8ff7'
assert sha(c.b)=='a6dbd0dc24e28a9459e50858136a2cfabb59fb8aa8399d58499d047a76ec291f'
ob=dict(zip(o.entries,o.entries[1:]+[o.hi]));cf={};names={}
for row in s.funcs:cf[row['start']]=row['size'];names.setdefault(row['start'],[]).append(row['name'])
def ins(e,at):
 op,reg,off,imm=struct.unpack_from('<BBhi',e.b,at);r={'at':at,'opcode':op,'dst':reg&15,'src':reg>>4,'offset':off,'immediate':imm}
 if op==0x18:r['wide_immediate']=struct.unpack_from('<I',e.b,at+4)[0]|struct.unpack_from('<I',e.b,at+12)[0]<<32
 if at in e.calls:r['call_target']=e.calls[at]
 if op&7 in[5,6]and op not in[0x85,0x8d,0x95]:r['branch_target']=at+8+off*8
 return r
def window(e,a,n):return {'start':a,'bytes':n,'raw_sha256':sha(e.b[a:a+n]),'normalized_sha256':sha(e.normalized[a:a+n]),'relocations':e.pattern(a,n),'calls':e.callsites(a,n),'instructions':[ins(e,at)for at in range(a,a+n,8)]}
def equal(a,b,n):return cf.get(b)==n and o.normalized[a:a+n]==c.normalized[b:b+n]and o.pattern(a,n)==c.pattern(b,n)
def matches(a):
 n=ob[a]-a
 return [{'start':b,'bytes':n,'names':names[b]}for b in cf if equal(a,b,n)]
def targetrows(a,b,n):
 out=[]
 for x in o.callsites(a,n):
  target=x['target'];other=c.calls.get(b+x['offset']);size=ob[target]-target
  out.append({'call_offset':x['offset'],'original_target':target,'original_bytes':size,'candidate_target':other,'candidate_bytes':cf.get(other),'candidate_names':names.get(other,[]),'complete_normalized_equal':equal(target,other,size)if other in cf else False})
 return out
wrapper=next(f for f in s.funcs if '__global17update_fee_config'in f['name']);handler=next(f for f in s.funcs if 'recovered17update_fee_config'in f['name']and '__global'not in f['name']);a=wrapper['start'];h=handler['start']
assert equal(0xe2230,a,2296)and c.calls[a+1600]==h
old=json.loads((P/'evidence.json').read_text());helper=[]
for row in old['shared_helpers']:
 start=row['original']['start'];m=matches(start);assert m
 for match in m:
  b=match['start'];checks=targetrows(start,b,match['bytes']);assert all(x['complete_normalized_equal']for x in checks)
  helper.append({'original_start':start,'bytes':match['bytes'],'candidate':match,'direct_targets':checks})
# Actual three new scalar error sites call a specialized with_values body. Retain
# the complete mismatch instead of substituting the unused generic match.
actual=[x for x in c.callsites(h,handler['size'])if any('Error11with_values'in name for name in names.get(x['target'],[]))]
assert len(actual)==3 and len({x['target']for x in actual})==1
special=actual[0]['target'];assert cf[special]==1336
helperdiff=[{'offset':off,'original':ins(o,0x1840+off),'candidate':ins(c,special+off)}for off in range(0,1336,8)if o.normalized[0x1840+off:0x1840+off+8]!=c.normalized[special+off:special+off+8]]
assert [x['offset']for x in helperdiff]==[24,32,40,48]
assert ins(c,special+48)['immediate']==1000
# Wrapper's explicit28-byte log remains equal. Candidate diagnostics use their
# truthful ten-byte local source coordinate, not the original44-byte path.
def ptr(e,at):return ins(e,at)['wide_immediate']
log_a=ptr(o,0xe2230+40);log_b=ptr(c,a+40);assert o.b[log_a:log_a+28]==c.b[log_b:log_b+28]==b'Instruction: UpdateFeeConfig'
paths=[]
for at,rel in c.relocations.items():
 if h<=at<h+handler['size']and c.b[at]==0x18:
  pointer=ptr(c,at)
  if c.b[pointer:pointer+10]==b'src/lib.rs':paths.append({'instruction':at,'pointer':pointer,'bytes':10,'hex':c.b[pointer:pointer+10].hex(),'context':[ins(c,p)for p in range(max(h,at-32),min(h+handler['size'],at+88),8)]})
assert paths
original_targets=[]
for call in o.callsites(0x1d8a0,2912):original_targets.append({'offset':call['offset'],'original_target':call['target'],'bytes':ob[call['target']]-call['target'],'fresh_complete_candidate_matches':matches(call['target'])})
report={'scope':'Fresh current symbol locations and complete bounded comparisons. No source/flag/compiler variant or ELF modification. Normalized matching masks relocation addresses/call displacement; data and targets are independent obligations.','original_sha256':sha(o.b),'candidate_sha256':sha(c.b),'symbols_sha256':sha(s.b),'wrapper':{'original':window(o,0xe2230,2296),'candidate':window(c,a,wrapper['size']),'names':names[a],'complete_normalized_equal':True,'direct_targets':targetrows(0xe2230,a,2296)},'handler':{'original':window(o,0x1d8a0,2912),'candidate':window(c,h,handler['size']),'names':names[h],'complete_normalized_equal':False,'original_direct_targets':original_targets,'candidate_direct_targets':[{'offset':x['offset'],'target':x['target'],'bytes':cf.get(x['target']),'names':names.get(x['target'],[])}for x in c.callsites(h,handler['size'])]},'original_scalar_complete_matches':[{'original_start':start,'original_bytes':616,'candidate_matches':matches(start)}for start in [0x61630,0x61898,0x61b00]],'generic_shared_helpers':helper,'actual_scalar_error_helper':{'original':window(o,0x1840,1336),'candidate':window(c,special,1336),'names':names[special],'complete_normalized_equal':False,'four_instruction_deltas':helperdiff,'three_call_sites':[{'offset':x['offset'],'target':x['target'],'argument_context':[ins(c,p)for p in range(h+x['offset']-40,h+x['offset']+8,8)]}for x in actual],'direct_targets':targetrows(0x1840,special,1336),'interpretation':'Original passes1000 andfee as two values. New caller passesfee; compiled specialization writes constant1000 inside the callee. Retained complete mismatch, not original-source/compiler recovery.'},'bounded_data':{'instruction_log':{'original_pointer':log_a,'candidate_pointer':log_b,'bytes':28,'sha256':sha(c.b[log_b:log_b+28]),'equal':True},'candidate_source_path_sites':paths,'original_proven_spans':old['bounded_literals'],'remaining':'Original filename is44 bytes, candidate10; historical line values are not imitated. Other relocated formatting/panic tables and full data equivalence remain unresolved.'},'residuals':['New handler6096 bytes versus original2912; prior currenthandler5832. No claim of handler byte convergence.','No616-byte standalone scalar setter match; guards are inlined.','Actual scalar with_values calls use constant-specialized1336-byte body, with four normalized instruction differences.','Generic original with_values has a complete current match but is not the body called by these three new error paths.','Full-file equality remains false; no new handler count/cases/security signoff.']}
assert handler['size']==6096
if '--verify'in sys.argv:assert json.loads(json.dumps(report))==json.loads((W/'static-comparison.json').read_text())
else:(W/'static-comparison.json').write_text(json.dumps(report,indent=2)+'\n')
print(json.dumps({'wrapper_start':hex(a),'handler_start':hex(h),'wrapper_bytes':wrapper['size'],'handler_bytes':handler['size'],'wrapper_matches':True,'handler_matches':False,'scalar_helper_start':hex(special),'scalar_helper_mismatched_instructions':len(helperdiff),'generic_helper_matches':len(helper),'generic_helper_direct_checks':sum(len(x['direct_targets'])for x in helper),'scalar_body_matches':[len(x['candidate_matches'])for x in report['original_scalar_complete_matches']]},indent=2))
