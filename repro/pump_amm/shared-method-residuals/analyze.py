"""Read-only exact scalar/with_values residual and complete direct-caller ledger."""
from pathlib import Path
import bisect,hashlib,json,struct,sys
sys.dont_write_bytecode=True
W=Path(__file__).resolve().parent;I=W/'inputs';sys.path.insert(0,str(I/'scratch/prebuild/prerequisites'))
from elf_reader import Elf
sha=lambda b:hashlib.sha256(b).hexdigest()
o=Elf(I/'scratch/prebuild/prerequisites/inputs/evidence/original/pump_amm/deployed.so');c=Elf(I/'candidate.so');s=Elf(I/'unstripped.so');prior=json.loads((I/'static-comparison.json').read_text());cf={f['start']:f['size']for f in s.funcs};names={}
for f in s.funcs:names.setdefault(f['start'],[]).append(f['name'])
ob=dict(zip(o.entries,o.entries[1:]+[o.hi]));cb=dict(zip(c.entries,c.entries[1:]+[c.hi]));assert c.b[c.lo:c.hi]==s.b[s.lo:s.hi]
def ins(e,a):
 op,r,off,imm=struct.unpack_from('<BBhi',e.b,a);d={'address':a,'opcode':op,'dst':r&15,'src':r>>4,'offset':off,'immediate':imm}
 if op==0x18:d['wide_immediate']=struct.unpack_from('<I',e.b,a+4)[0]|struct.unpack_from('<I',e.b,a+12)[0]<<32
 if op&7 in(5,6)and op not in(0x85,0x8d,0x95):d['branch_target']=a+8+off*8
 if a in e.calls:d['call_target']=e.calls[a]
 return d
def body(e,a,n):return {'address':a,'bytes':n,'raw_sha256':sha(e.b[a:a+n]),'normalized_sha256':sha(e.normalized[a:a+n]),'relocations':e.pattern(a,n),'direct_calls':e.callsites(a,n),'instructions':[ins(e,x)for x in range(a,a+n,8)]}
def complete_matches(a,n):
 return [{'address':b,'bytes':n,'names':names[b]}for b,k in cf.items()if n==k and o.normalized[a:a+n]==c.normalized[b:b+n]and o.pattern(a,n)==c.pattern(b,n)]
def incoming(e,t):
 rows=[]
 for a,target in e.calls.items():
  if target!=t:continue
  idx=bisect.bisect_right(e.entries,a)-1;start=e.entries[idx];end=e.entries[idx+1]if idx+1<len(e.entries)else e.hi
  rows.append({'call':a,'containing_body_address':start,'containing_body_bytes':end-start,'current_symbols':names.get(start,[])if e is c else [],'caller_context':[ins(e,x)for x in range(max(start,a-56),min(end,a+56),8)]})
 return rows
def relocated_refs(e,target):
 out=[]
 for at,r in e.relocations.items():
  if r['type']!=8:continue
  ptr=ins(e,at)['wide_immediate']if e.lo<=at<e.hi and e.b[at]==0x18 else struct.unpack_from('<Q',e.b,at)[0]>>32
  if ptr==target:out.append(at)
 return out
scalars=[]
for name,a,b,line,cl in [('lp_fee_basis_points',0x61630,0xf758,220,7),('protocol_fee_basis_points',0x61898,0xf9b8,230,13),('coin_creator_fee_basis_points',0x61b00,0xfc18,243,19)]:
 assert ob[a]-a==616 and cf[b]==608
 # All shared-prefix instruction differences are branch displacement or
 # truthful diagnostic source coordinates. The argument block is separate.
 differences=[d for d in range(0,552,8)if o.normalized[a+d:a+d+8]!=c.normalized[b+d:b+d+8]];assert differences==[40,456,464]
 assert ins(o,a+16)['opcode']==ins(c,b+16)['opcode']==0x25 and ins(o,a+16)['immediate']==ins(c,b+16)['immediate']==1000
 assert ins(o,a+24)==dict(ins(c,b+24),address=a+24)
 assert ins(o,a+456)['immediate']==line and ins(c,b+456)['immediate']==cl
 assert ins(o,a+464)['immediate']==44 and ins(c,b+464)['immediate']==26
 assert ins(o,a+552)['opcode']==0xb7 and ins(o,a+552)['dst']==4 and ins(o,a+552)['immediate']==1000
 assert ins(o,a+560)['opcode']==0xbf and ins(o,a+560)['dst']==5 and ins(o,a+560)['src']==7
 assert ins(c,b+552)['opcode']==0xbf and ins(c,b+552)['dst']==4 and ins(c,b+552)['src']==7
 assert o.calls[a+568]==0x1840 and c.calls[b+560]==0x340
 assert o.normalized[a+576:a+616]==c.normalized[b+568:b+608]
 oi=incoming(o,a);ci=incoming(c,b);assert len(oi)==len(ci)==2
 scalars.append({'field':name,'original':body(o,a,616),'candidate':body(c,b,608),'argument_contract':{'method_entry':{'r1':'Result output pointer','r2':'mutable GlobalConfig reference','r3':'supplied u64 fee'},'success':'unsigned fee<=1000 stores r7 to config field; writes Result tag2 and returns. Second word is irrelevant for Ok.','failure':'Constructs6000 AnchorError with diagnostic source origin; original passes r4=1000,r5=fee to generic helper; candidate passes r4=fee to actual specialized helper.','output':'Same two-word Result output store sequence after helper call; callers inspect tag2 before proceeding.'},'prefix_difference_offsets':differences,'original_error_argument_instructions':[ins(o,x)for x in range(a+552,a+576,8)],'candidate_error_argument_instructions':[ins(c,x)for x in range(b+552,b+568,8)],'shifted_return_suffix_complete_normalized_equal':True,'original_direct_callers':oi,'candidate_direct_callers':ci,'original_relocated_address_references':relocated_refs(o,a),'candidate_relocated_address_references':relocated_refs(c,b),'source_coordinate_differences':{'original_line':line,'candidate_line':cl,'original_filename_bytes':44,'candidate_filename_bytes':26}})
# Actual called helper has exactly four differing instructions; two input
# values are still materialized in identical stack slots before the common tail.
a=0x1840;b=0x340;n=1336
assert ob[a]-a==cf[b]==n
hd=[d for d in range(0,n,8)if o.normalized[a+d:a+d+8]!=c.normalized[b+d:b+d+8]];assert hd==[24,32,40,48]
assert o.normalized[a:a+24]==c.normalized[b:b+24]and o.normalized[a+56:a+n]==c.normalized[b+56:b+n]
assert o.pattern(a,n)==c.pattern(b,n)
assert ins(o,a+24)['opcode']==0x7b and ins(o,a+24)['src']==5 and ins(o,a+24)['offset']==-288
assert ins(o,a+32)['opcode']==0x7b and ins(o,a+32)['src']==4 and ins(o,a+32)['offset']==-296
assert ins(c,b+24)['opcode']==0x7b and ins(c,b+24)['src']==4 and ins(c,b+24)['offset']==-288
assert ins(c,b+48)['opcode']==0x7a and ins(c,b+48)['immediate']==1000 and ins(c,b+48)['offset']==-296
assert len(incoming(o,a))==24 and len(incoming(c,b))==3
actual_targets=prior['actual_scalar_error_helper']['direct_targets'];assert len(actual_targets)==8 and all(x['equal']for x in actual_targets)
for row in actual_targets:
 ot=row['original']['address'];ct=row['candidate']['address'];nn=ob[ot]-ot;assert o.calls[a+row['offset']]==ot and c.calls[b+row['offset']]==ct
 assert cf[ct]==nn and o.normalized[ot:ot+nn]==c.normalized[ct:ct+nn]and o.pattern(ot,nn)==c.pattern(ct,nn)
generic=complete_matches(a,n);assert len(generic)==1 and generic[0]['address']==0x1308
assert len(incoming(c,0x1308))==6
helper_data=[]
for rel in o.pattern(a,n):
 assert rel['type']==8;at=a+rel['offset'];ct=b+rel['offset'];op=ins(o,at)['wide_immediate'];cp=ins(c,ct)['wide_immediate'];row={'offset':rel['offset'],'original_reference':at,'original_pointer':op,'candidate_reference':ct,'candidate_pointer':cp}
 if rel['offset']==232:
  assert o.b[op:op+55]==c.b[cp:cp+55]==b'a Display implementation returned an error unexpectedly';assert ins(o,at+16)['immediate']==ins(c,ct+16)['immediate']==55
  row.update(bytes=55,sha256=sha(o.b[op:op+55]),consumed_equal=True,extent='Explicit55-byte panic string length in both consumers.')
 else:row['extent']='Exact reference and complete consumer retained; recursive formatting/vtable/Location metadata extent is not proved.'
 helper_data.append(row)
# Preserve complete original/current caller windows, not isolated load guesses.
callers={}
for side,e,t in [('original',o,0x1840),('current_actual',c,0x340),('current_other_generic',c,0x1308)]:
 sites=incoming(e,t);windows={}
 for r in sites:
  start=r['containing_body_address'];size=r['containing_body_bytes'];windows[str(start)]=body(e,start,size)
  if e is o:r['fresh_complete_candidate_body_matches']=complete_matches(start,size)
 callers[side]={'callee':t,'direct_calls':sites,'complete_caller_windows':windows,'relocated_callee_address_references':relocated_refs(e,t)}
handlers={}
for name in ['create_handler','update_handler']:
 row=prior['roots'][name];oa=row['original']['address'];ca=row['candidate']['address'];handlers[name]={'original':row['original'],'candidate':row['candidate'],'original_direct_callers':incoming(o,oa),'candidate_direct_callers':incoming(c,ca),'original_targets':row['direct_targets'],'candidate_targets':row['candidate_direct_calls']};assert len(handlers[name]['original_direct_callers'])==len(handlers[name]['candidate_direct_callers'])==1
report={'scope':'Bounded static analysis only; original and newly frozen807010 candidate. No builds/runtime/main edits. Initializer remains static-only.','inputs':{'original_sha256':sha(o.b),'candidate_sha256':sha(c.b),'symbols_sha256':sha(s.b)},'scalar_methods':scalars,'actual_with_values':{'original':body(o,a,n),'candidate':body(c,b,n),'four_difference_offsets':hd,'stack_contract':{'original':'r4=1000 -> stack[-296],r5=fee -> stack[-288]','candidate':'r4=fee -> stack[-288],literal1000 -> stack[-296]','common_tail':'After+56 all normalized instructions and relocation shape match. Calling conventions differ before it. Full relocated compiler data identity is not inferred.'},'direct_targets':actual_targets,'data':helper_data,'other_generic_complete_match':generic,'other_generic_is_not_scalar_actual_target':True},'helper_caller_graphs':callers,'handler_roots_and_callers':handlers,'limits':['Original24 generic-helper callsites occur in16 entry-bounded caller windows; current actual constant-specialized helper has3 scalar callers, while another generic match has6 different callers. These graphs are not interchangeable.','Lowered64-bit register values do not uniquely recover original Rust generic types (u64 versus usize etc.) or compiler phase decisions. The causal compiler/source explanation for scalar specialization is not established.','No dummy callsite, cast/type variant, inline attribute, source-padding or flag/compiler experiment is proposed.','Direct call graphs and recognized relocated-address references do not prove absence of dynamically computed indirect calls.','All original/current caller windows are retained, but this task does not reconstruct each unrelated caller source or claim full transitive data closure.']}
summary={'status':'PASS','scalar_methods':3,'real_direct_callers_per_scalar':2,'scalar_prefix_difference_offsets':[40,456,464],'scalar_argument_block_reduction_bytes':8,'actual_helper_difference_offsets':hd,'actual_helper_direct_targets_matching':8,'original_helper_direct_calls':24,'original_helper_caller_windows':len(callers['original']['complete_caller_windows']),'current_actual_helper_direct_calls':3,'current_other_generic_direct_calls':6,'source_change_for_scalar_specialization_justified':False,'build_or_runtime':False}
report['summary']=summary
if '--verify'in sys.argv:assert json.loads(json.dumps(report))==json.loads((W/'residual-ledger.json').read_text())
else:(W/'residual-ledger.json').write_text(json.dumps(report,indent=2)+'\n')
print(json.dumps(summary,indent=2))
