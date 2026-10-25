"""Read-only complete body/call and bounded data closure for a source-only proposal."""
from pathlib import Path
import hashlib,json,struct,sys
sys.dont_write_bytecode=True
W=Path(__file__).resolve().parent
sys.path.insert(0,str(W/'prerequisites'))
from elf_reader import Elf
P=W/'prerequisites';I=P/'inputs';sha=lambda b:hashlib.sha256(b).hexdigest()
o=Elf(I/'evidence/original/pump_amm/deployed.so');h=Elf(I/'repro/pump_amm/create-config-serialization-static/pump_amm_recovered.so');hs=Elf(I/'repro/pump_amm/create-config-serialization-static/unstripped.so')
prior=json.loads((P/'evidence.json').read_text());ob=dict(zip(o.entries,o.entries[1:]+[o.hi]));hf={}
for f in hs.funcs:hf.setdefault(f['start'],[]).append(f)
def ins(e,at):
 op,r,off,imm=struct.unpack_from('<BBhi',e.b,at);v={'address':at,'opcode':op,'dst':r&15,'src':r>>4,'offset':off,'immediate':imm}
 if op==0x18:v['wide_immediate']=struct.unpack_from('<I',e.b,at+4)[0]|struct.unpack_from('<I',e.b,at+12)[0]<<32
 if op&7 in (5,6)and op not in (0x85,0x8d,0x95):v['branch_target']=at+8+off*8
 if at in e.calls:v['call_target']=e.calls[at]
 return v
def span(e,a,n):
 b=e.b[a:a+n];assert len(b)==n
 return {'address':a,'bytes':n,'sha256':sha(b),'hex':b.hex()}
def textspan(e,a,n):
 d=span(e,a,n)
 try:d['text']=e.b[a:a+n].decode()
 except UnicodeDecodeError:pass
 return d
def body(e,a,n):return {'address':a,'bytes':n,'raw_sha256':sha(e.b[a:a+n]),'normalized_sha256':sha(e.normalized[a:a+n]),'relocation_pattern':e.pattern(a,n)}
def match(a,b,n,k):return n==k and o.normalized[a:a+n]==h.normalized[b:b+k]and o.pattern(a,n)==h.pattern(b,k)
bodies=[];calls=[];data=[];extern=[]
for label,r in prior['static_identity_matches'].items():
 a=r['original']['start'];n=r['original']['bytes'];b=r['historical_candidate']['start'];assert match(a,b,n,n)
 bodies.append({'name':label,'original':body(o,a,n),'historical':body(h,b,n),'historical_symbol':r['symbol'],'complete_normalized_match':True})
 for call in o.callsites(a,n):
  at=a+call['offset'];t=call['target'];ht=h.calls[b+call['offset']];assert t in ob and ht in hf
  size=ob[t]-t;ss={f['size']for f in hf[ht]};assert len(ss)==1;hn=ss.pop()
  calls.append({'body':label,'original_call':at,'historical_call':b+call['offset'],'original_target':body(o,t,size),'historical_target':body(h,ht,hn),'historical_symbols':[f['name']for f in hf[ht]],'raw_equal':size==hn and o.b[t:t+size]==h.b[ht:ht+hn],'complete_normalized_equal':match(t,ht,size,hn),'limit':'Immediate direct target only; does not assert recursive transitive or data closure.'})
 for at,rel in sorted(o.relocations.items()):
  if not a<=at<a+n:continue
  ha=b+at-a;assert h.relocations[ha]==rel
  if rel['type']==10:extern.append({'body':label,'original_call':at,'historical_call':ha,**rel});continue
  assert rel['type']==8
  data.append({'body':label,'original_reference':at,'historical_reference':ha,'original_pointer':ins(o,at)['wide_immediate'],'historical_pointer':ins(h,ha)['wide_immediate'],'reference_context':[ins(o,x)for x in range(max(a,at-16),min(a+n,at+64),8)]})
assert len(calls)==112 and sum(x['complete_normalized_equal']for x in calls)==109
assert {x['original_target']['address']for x in calls if not x['complete_normalized_equal']}=={0x61630,0x61898,0x61b00}
# Exact spans are bounded by instruction lengths, fixed public key/u32 types,
# or a named Rust ABI descriptor. No neighbouring rodata string is used as extent.
plain={0xe0c20:(25,'Instruction log; mov r2=25 at +16'),0xe12d8:(13,'with_account_name; mov r5=13 at +16'),0xe1290:(32,'GlobalConfig exit expected owner, Pubkey'),0x17638:(32,'Instruction::new_with_bytes program_id, Pubkey'),0x176e8:(17,'Event signer seed; store len=17 at 0x17720'),0x81fa0:(32,'memcmp explicit length32 at 0x81fb0'),0x82bb0:(13,'GlobalConfig CPI seed; length13 stored at 0x82d50'),0x836f8:(13,'GlobalConfig allocate seed; length13 stored at 0x83820'),0x83b70:(13,'GlobalConfig assign seed; length13 stored at 0x83bc8'),0x82df8:(4,'ErrorCode name consumes enum u32'),0x82e88:(4,'ErrorCode Display consumes enum u32'),0x82eb8:(55,'Panic message; mov r2=55 at +16'),0x82f58:(57,'Source origin filename; length57 stored at 0x82f88'),0x83c88:(13,'with_account_name; mov r5=13 at +16'),0x622f0:(4,'Error name consumes enum u32=12'),0x62380:(4,'Error Display consumes enum u32=12'),0x623b8:(4,'Error name consumes enum u32=11'),0x62448:(4,'Error Display consumes enum u32=11'),0x62478:(55,'Panic message; mov r2=55 at +16'),0x62518:(44,'Source origin filename; length44 stored at 0x62548'),0x62608:(44,'Source origin filename; length44 stored at 0x62638')}
for at,n in [(0x81150,5),(0x811d0,14),(0x814e0,15),(0x81578,7),(0x817a0,13),(0x81c68,5),(0x81d10,13),(0x81f10,13),(0x82138,15),(0x82268,5)]:plain[at]=(n,'with_account_name; explicit r5 length at +16')
for row in data:
 at=row['original_reference'];p=row['original_pointer'];q=row['historical_pointer']
 if at in plain:
  n,why=plain[at];row.update({'kind':'bounded_direct_bytes','extent_evidence':why,'original_consumed':textspan(o,p,n),'historical_consumed':textspan(h,q,n),'consumed_equal':o.b[p:p+n]==h.b[q:q+n]})
 elif at in (0x81648,0x81ff0):
  n=struct.unpack_from('<Q',o.b,p+8)[0];hp=struct.unpack_from('<Q',h.b,q)[0]>>32;op=struct.unpack_from('<Q',o.b,p)[0]>>32;assert n==struct.unpack_from('<Q',h.b,q+8)[0]and n in(13,17)
  row.update({'kind':'single_seed_fat_pointer','extent_evidence':'find_program_address receives count1 at +16; one16-byte fat pointer; explicit pointee length','original_descriptor':span(o,p,16),'historical_descriptor':span(h,q,16),'original_consumed':textspan(o,op,n),'historical_consumed':textspan(h,hp,n),'consumed_equal':o.b[op:op+n]==h.b[hp:hp+n]})
 else:
  row.update({'kind':'compiler_dependency_metadata','consumed_span_proven':False,'reason':'Exact pointer and matched consumer body retained. Full recursive Rust panic/format/I/O metadata graph is not closed; no equality assertion from adjacent-string previews.'})
assert len(data)==44
# Preserve disjoint code observations with exact operands/branch targets.
points=[0x16e20,0x16e28,0x16e30,0x16e38,0x16e40,0x16e48,0x16e70,0x16ed0,0x16f10,0x16f50,0x16f78,0x16f90,0x16fa0,0x16fb0,0x16fc0,0x16fd8,0x171b8,0x17200,0x17320,0x17648,0x176e8,0x17710,0x17718,0x17720,0x17740,0x17780,0xe1248,0xe1260,0xe1268,0xe12a0,0xe12f0,0x80ff0,0x81078,0x813e0,0x81648,0x81658,0x81660,0x81740,0x81980,0x81fb0,0x81fb8,0x81fd0,0x81ff0,0x82000,0x82008,0x820d8,0x82240,0x82280,0x82358,0x82658,0x82678,0x82688,0x82690,0x827d0,0x827f8,0x82800,0x82810,0x82818,0x82838,0x82dc0,0x834b8,0x83878,0x83c08,0x83c48,0x83ca0,0x82f88,0x62548,0x62638,0x82d50,0x83820,0x83bc8]
# Fixed admin is public, original authorization constant; no secret/signing material.
alpha='123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz'
def b58(b):
 n=int.from_bytes(b,'big');s=''
 while n:n,r=divmod(n,58);s=alpha[r]+s
 return '1'*(len(b)-len(b.lstrip(b'\0')))+s
assert b58(o.b[0x11be50:0x11be70])=='8LWu7QM2dGR1G8nKDHthckea57bkCzXyBTAKPJUBDHo8'
assert ins(o,0x83e00)['wide_immediate'].to_bytes(8,'little')==bytes.fromhex('6b34598137e25116')
tag=0x1d9acb512ea545e4;tagats=[at for at in range(0x16d88,0x17960,8)if o.b[at]==0x18 and ins(o,at).get('wide_immediate')==tag];assert len(tagats)==1

zero_calls=[0x61dc0,0x61e30,0x61e98,0x61f00,0x61f68,0x61fd0,0x62038,0x620a0]
order_calls=[0x620d8,0x62128,0x62170,0x621b8,0x62200,0x62248,0x62288]
for at in zero_calls+order_calls:
 assert o.calls[at]==0x1198e0 and ins(o,at-8)['dst']==3 and ins(o,at-8)['immediate']==32
for at in zero_calls:assert ins(o,at+24)['opcode']==0x15 and ins(o,at+24)['branch_target']==0x623a8
for at in order_calls[1:-1]:assert ins(o,at+24)['opcode']==0x65 and ins(o,at+24)['immediate']==-1 and ins(o,at+24)['branch_target']==0x622e0
for at,nextgood in [(order_calls[0],0x62100),(order_calls[-1],0x622b0)]:
 assert ins(o,at+24)['opcode']==0xc5 and ins(o,at+24)['immediate']==0 and ins(o,at+24)['branch_target']==nextgood
 assert ins(o,at+32)['branch_target']==0x622e0
assert ins(o,0x622c0)['dst']==3 and ins(o,0x622c0)['immediate']==256 and o.calls[0x622c8]==0x119898
assert ins(o,0x62530)['immediate']==6011 and ins(o,0x62620)['immediate']==6012
assert not any(r['target']==0x1031d0 for r in o.callsites(0x61d68,2336))
assert len(extern)==4

report={'scope':'Source-only proposal: no build, runtime, main edit, initializer authorization substitution or new positive acceptance.','inputs':prior['inputs'],'complete_historical_body_matches':bodies,'direct_targets':calls,'external_call_relocations':extern,'recipient_semantics':{'zero_check_calls':zero_calls,'strict_adjacent_calls':order_calls,'success_copy_call':0x622c8,'success_copy_bytes':256,'zero_failure_entry':0x623a8,'order_failure_entry':0x622e0,'error_codes':[6011,6012],'no_direct_with_pubkeys':True},'data_references':data,'ordering_and_constraints_instructions':[ins(o,p)for p in points],'fixed_admin':{'base58':b58(o.b[0x11be50:0x11be70]),'bytes':span(o,0x11be50,32),'check':ins(o,0x81fb8),'failure':ins(o,0x81fd0)},'create_event_layout':{'discriminator_encoded_instruction':span(o,0x83e00,16),'discriminator_little_endian':'6b34598137e25116','discriminator_instruction':ins(o,0x83e00),'fields':[{'field':s,'serialized_offset':a,'bytes':n}for s,a,n in [('discriminator',0,8),('timestamp',8,8),('admin',16,32),('lp_fee_basis_points',48,8),('protocol_fee_basis_points',56,8),('protocol_fee_recipients',64,256),('coin_creator_fee_basis_points',320,8),('admin_set_coin_creator_authority',328,32)]],'event_bytes':360,'event_cpi_prefix_instruction':ins(o,tagats[0]),'event_cpi_bytes':368,'instructions':[ins(o,p)for p in range(0x83e00,0x84020,8)]},'summary':{'complete_historical_bodies':len(bodies),'direct_calls':len(calls),'external_calls':len(extern),'complete_direct_target_matches':sum(x['complete_normalized_equal']for x in calls),'direct_target_mismatches':3,'data_references':len(data),'bounded_data_references':sum(x['kind']!='compiler_dependency_metadata'for x in data),'unclosed_metadata_references':sum(x['kind']=='compiler_dependency_metadata'for x in data),'historical_bounded_data_mismatches':sum(x.get('consumed_equal')is False for x in data),'new_proposal_built':False,'authentic_initializer_successes':0},'limits':['Historical six body matches are relocation-normalized instruction equality, not entire ELF equality or proof of reconstructed source spelling.','Three scalar historical direct targets are608 vs616bytes; proposed genuine two-caller sharing graph does not predict optimizer behavior.','Standard compiler panic/format/I/O metadata spans explicitly remain outside full data closure; exact reference addresses and complete consumers are retained.','Unchanged Account parser/serializer source is reused; original target0x3240 and exit0x4f00 are complete historical direct-target matches. Their transitive helper/data closure is not newly claimed here.','Fixed-admin successful execution is unavailable; historical rejection-only fixtures are neither rerun nor promoted to positive coverage.','New shared recipient method changes current require_keys_neq! diagnostic payload to original require! path; unbuilt and untested in this proposal.']}
if '--verify'in sys.argv:assert json.loads(json.dumps(report))==json.loads((W/'static-closure.json').read_text())
else:(W/'static-closure.json').write_text(json.dumps(report,indent=2)+'\n')
print(json.dumps({'status':'PASS',**report['summary']},indent=2))
