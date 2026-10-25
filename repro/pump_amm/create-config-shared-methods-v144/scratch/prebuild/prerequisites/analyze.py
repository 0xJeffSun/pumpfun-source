"""Read-only original scalar-call graph and natural source prerequisites."""
from pathlib import Path
import bisect,hashlib,json,struct,sys
sys.dont_write_bytecode=True
from elf_reader import Elf
W=Path(__file__).resolve().parent;I=W/'inputs';sha=lambda b:hashlib.sha256(b).hexdigest()
o=Elf(I/'evidence/original/pump_amm/deployed.so');c=Elf(I/'repro/pump_amm/scalar-guard-order-v144/candidate.so');cs=Elf(I/'repro/pump_amm/scalar-guard-order-v144/unstripped.so');h=Elf(I/'repro/pump_amm/create-config-serialization-static/pump_amm_recovered.so');hs=Elf(I/'repro/pump_amm/create-config-serialization-static/unstripped.so');ob=dict(zip(o.entries,o.entries[1:]+[o.hi]));hc={f['start']:f for f in hs.funcs}
assert c.b[c.lo:c.hi]==cs.b[cs.lo:cs.hi]and h.b[h.lo:h.hi]==hs.b[hs.lo:hs.hi]
def instruction(e,at):
 op,r,off,imm=struct.unpack_from('<BBhi',e.b,at);row={'at':at,'opcode':op,'dst':r&15,'src':r>>4,'offset':off,'immediate':imm}
 if op==0x18:row['wide_immediate']=struct.unpack_from('<I',e.b,at+4)[0]|struct.unpack_from('<I',e.b,at+12)[0]<<32
 if op&7 in[5,6]and op not in[0x85,0x8d,0x95]:row['branch_target']=at+8+off*8
 if at in e.calls:row['call_target']=e.calls[at]
 return row
def body(e,a,n):return {'start':a,'bytes':n,'raw_sha256':sha(e.b[a:a+n]),'normalized_sha256':sha(e.normalized[a:a+n]),'relocations':e.pattern(a,n),'calls':e.callsites(a,n),'instructions':[instruction(e,at)for at in range(a,a+n,8)]}
def callers(e,target,symbols=None):
 out=[]
 for at,t in e.calls.items():
  if t!=target:continue
  idx=bisect.bisect_right(e.entries,at)-1
  out.append({'call':at,'containing_start':e.entries[idx],'containing_end':e.entries[idx+1]if idx+1<len(e.entries)else e.hi,'symbol_names':[f['name']for f in symbols.funcs if f['start']<=at<f['start']+f['size']]if symbols else []})
 return out
def relocated_refs(e,target):
 out=[]
 for at,r in e.relocations.items():
  if r['type']!=8:continue
  value=instruction(e,at)['wide_immediate']if e.lo<=at<e.hi and e.b[at]==0x18 else struct.unpack_from('<Q',e.b,at)[0]>>32
  if value==target:out.append(at)
 return out
idl=json.loads((I/'evidence/upstream/pump_amm.json').read_text());create=next(x for x in idl['instructions']if x['name']=='create_config');disc=int.from_bytes(bytes(create['discriminator']),'little')
assert [x['type']for x in create['args']]==['u64','u64',{'array':['pubkey',8]},'u64','pubkey']
assert instruction(o,0xdbd28)['wide_immediate']==disc and instruction(o,0xdbd38)['branch_target']==0xdc318 and o.calls[0xdc368]==0xe0bf8 and o.calls[0xe1248]==0x16d88
create_wrapper=next(f for f in hs.funcs if '__global13create_config'in f['name']);create_body=next(f for f in hs.funcs if 'recovered13create_config'in f['name']and '__global'not in f['name'])
matched={}
for label,a,n in [('create_wrapper',0xe0bf8,2320),('create_handler',0x16d88,3032),('create_context',0x80fb8,5752),('init_helper',0x82630,5896),('recipient_setter',0x61d68,2336),('create_event',0x83d38,744)]:
 found=[f for f in hs.funcs if f['size']==n and o.normalized[a:a+n]==h.normalized[f['start']:f['start']+n]and o.pattern(a,n)==h.pattern(f['start'],n)];assert len(found)==1,(label,len(found));b=found[0]['start'];matched[label]={'original':body(o,a,n),'historical_candidate':body(h,b,n),'symbol':found[0]['name'],'complete_normalized_equal':True}
assert create_wrapper['start']==matched['create_wrapper']['historical_candidate']['start']and create_body['start']==matched['create_handler']['historical_candidate']['start']
assert h.calls[create_wrapper['start']+(0xe1248-0xe0bf8)]==create_body['start']
# All scalar setters return the same concrete success/error discriminant and
# differ only by destination field/source-coordinate values at this level.
scalars=[]
for name,target,offset,line,crecall,updcall in [('lp_fee_basis_points',0x61630,0x380,220,0x16e70,0x1d8f0),('protocol_fee_basis_points',0x61898,0x388,230,0x16ed0,0x1d958),('coin_creator_fee_basis_points',0x61b00,0x390,243,0x16f50,0x1d9e8)]:
 calls=callers(o,target);assert [x['call']for x in calls]==[crecall,updcall]
 assert instruction(o,target+16)['opcode']==0x25 and instruction(o,target+16)['immediate']==1000
 assert instruction(o,target+24)['opcode']==0x7b and instruction(o,target+24)['dst']==2 and instruction(o,target+24)['src']==7 and instruction(o,target+24)['offset']==offset
 assert instruction(o,target+440)['immediate']==6000
 assert instruction(o,target+456)['immediate']==line and instruction(o,target+552)['dst']==4 and instruction(o,target+552)['immediate']==1000 and instruction(o,target+560)['dst']==5 and instruction(o,target+560)['src']==7 and o.calls[target+568]==0x1840
 hf=next(f for f in hs.funcs if 'set_'+name in f['name']);historic_calls=callers(h,hf['start'],hs);assert len(historic_calls)==1 and historic_calls[0]['containing_start']==create_body['start']
 scalars.append({'field':name,'original':body(o,target,616),'field_store_offset':offset,'type':'u64','source_line_observed':line,'error':6000,'compared_values_order':[1000,'supplied_fee'],'original_direct_callers':calls,'recognized_relocated_function_pointer_refs':relocated_refs(o,target),'historical_setter':hf,'historical_direct_callers':historic_calls,'source_method_name_status':'Readable reconstruction spelling; original binary does not uniquely distinguish a method from an equivalent free function.'})
assert [x['call']for x in callers(o,0x61d68)]==[0x16f10,0x1d9a0]
create_order=[(x['offset']+0x16d88,x['target'])for x in o.callsites(0x16d88,3032)[:4]];update_order=[(x['offset']+0x1d8a0,x['target'])for x in o.callsites(0x1d8a0,2912)[:4]]
assert create_order==[(0x16e70,0x61630),(0x16ed0,0x61898),(0x16f10,0x61d68),(0x16f50,0x61b00)]
# Shared config reference for create: r6=r9+0x78; each call receives r2=r6.
assert instruction(o,0x16e40)['opcode']==0xbf and instruction(o,0x16e48)['immediate']==0x78
for at in [0x16e60,0x16ec0,0x16f00,0x16f40]:assert instruction(o,at)['opcode']==0xbf and instruction(o,at)['dst']==2 and instruction(o,at)['src']==6
for at,target in [(0x16e80,0x17060),(0x16ee0,0x16ef0),(0x16ee8,0x17070),(0x16f20,0x16f30),(0x16f28,0x17080),(0x16f60,0x16f70),(0x16f68,0x17090)]:assert instruction(o,at)['branch_target']==target
assert instruction(o,0x16f78)['opcode']==0x72 and instruction(o,0x16f78)['offset']==0x420 and instruction(o,0x16f78)['immediate']==0
sourcepath=o.b[0x11ce9f:0x11ce9f+44];assert sourcepath==b'programs/pump-amm/src/state/global_config.rs'
current_source=(I/'programs/pump-amm/src/lib.rs').read_text();assert 'pub fn create_config('not in current_source
historic_source=(W/'historical-source/lib.rs').read_text()
for name in ['lp_fee_basis_points','protocol_fee_basis_points','coin_creator_fee_basis_points']:assert historic_source.count('.set_'+name+'(')==1
report={'scope':'Read-only source prerequisite/callgraph analysis. No build/runtime/main edits. Original initializer identity is static only; no positive execution inferred.','inputs':{'original':sha(o.b),'accepted_current':sha(c.b),'historical_static':sha(h.b)},'create_instruction':create,'create_dispatch':{'discriminator_load':instruction(o,0xdbd28),'selection_branch':instruction(o,0xdbd38),'selected_block':body(o,0xdc318,0xdc370-0xdc318),'wrapper_handler_call':instruction(o,0xe1248)},'static_identity_matches':matched,'scalar_setters':scalars,'recipient_direct_callers':callers(o,0x61d68),'create_setter_order':create_order,'update_setter_order':update_order,'update_original_complete_body':body(o,0x1d8a0,2912),'shared_reference_proof':body(o,0x16e40,0x16f80-0x16e40),'module_path':{'pointer':0x11ce9f,'bytes':44,'text':sourcepath.decode(),'sha256':sha(sourcepath),'scope':'Original error-source path; exact line layout, method syntax, visibility and inlining attributes are not recovered.'},'current_create_handler_absent':True,'historical_graph_incomplete_for_scalar_sharing':True,'callgraph_limit':'Two direct text calls per scalar and no recognized relocated function-address references; dynamically computed indirect uses are not proved absent.','proposal_disposition':'Bounded natural method fragments only. No integration patch or build suggested: genuine two-caller graph requires independently accepted static-only create_config body/context/event and recipient-method dependencies. Do not synthesize duplicate/dead calls or infer optimizer outcomes.'}
if '--verify'in sys.argv:assert json.loads(json.dumps(report))==json.loads((W/'evidence.json').read_text())
else:(W/'evidence.json').write_text(json.dumps(report,indent=2)+'\n')
print(json.dumps({'status':'PASS','scalar_setters':3,'direct_callers_per_setter':2,'historical_direct_callers_per_setter':1,'create_handler_bytes':3032,'historical_static_complete_matches':len(matched),'no_current_create_config':True,'build':False,'runtime':False},indent=2))
