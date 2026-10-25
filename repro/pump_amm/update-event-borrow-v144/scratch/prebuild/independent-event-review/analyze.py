"""Read-only independent update-event copy dataflow proof; no compilation/runtime."""
from pathlib import Path
import hashlib,json,struct,sys
sys.dont_write_bytecode=True
W=Path(__file__).resolve().parent;sys.path.insert(0,str(W/'inputs'))
from elf_reader import Elf
sha=lambda b:hashlib.sha256(b).hexdigest()
o=Elf(W/'inputs/original.so');c=Elf(W/'inputs/candidate.so');s=Elf(W/'inputs/unstripped.so');assert c.b[c.lo:c.hi]==s.b[s.lo:s.hi]
assert sha(c.b)=='807010828fe3b4124b5e20c34ca627582e1718e9c5849bf0c15309983d4088b2'
ob=dict(zip(o.entries,o.entries[1:]+[o.hi]));cf={f['start']:f['size']for f in s.funcs};names={}
for f in s.funcs:names.setdefault(f['start'],[]).append(f['name'])
def ins(e,a):
 op,r,off,imm=struct.unpack_from('<BBhi',e.b,a);v={'at':a,'opcode':op,'dst':r&15,'src':r>>4,'offset':off,'immediate':imm}
 if op==0x18:v['wide_immediate']=struct.unpack_from('<I',e.b,a+4)[0]|struct.unpack_from('<I',e.b,a+12)[0]<<32
 if a in e.calls:v['call_target']=e.calls[a]
 if op&7 in(5,6)and op not in(0x85,0x8d,0x95):v['branch_target']=a+8+off*8
 return v
def body(e,a,n):return {'start':a,'bytes':n,'raw_sha256':sha(e.b[a:a+n]),'normalized_sha256':sha(e.normalized[a:a+n]),'relocations':e.pattern(a,n),'instructions':[ins(e,p)for p in range(a,a+n,8)]}
def eq(a,b,n):return cf.get(b)==n and o.normalized[a:a+n]==c.normalized[b:b+n]and o.pattern(a,n)==c.pattern(b,n)
def isins(e,a,op,dst=None,src=None,off=None,imm=None):
 i=ins(e,a);assert i['opcode']==op,(hex(a),i)
 for k,v in [('dst',dst),('src',src),('offset',off),('immediate',imm)]:
  if v is not None:assert i[k]==v,(hex(a),k,i)
 return i
f=next(f for f in s.funcs if '18pump_amm_recovered17update_fee_config'in f['name']);assert f['start']==0xc8340 and f['size']==3160
original_start,original_n=0x1d8a0,2912;candidate_start,candidate_n=f['start'],f['size']
oc=o.callsites(original_start,original_n);cc=c.callsites(candidate_start,candidate_n);assert len(oc)==16 and len(cc)==17
extra=next(x for x in cc if candidate_start+x['offset']==0xc8758);assert extra['target']==0x10b138
remaining=[x for x in cc if x!=extra];pairs=[]
for a,b in zip(oc,remaining):
 target=a['target'];other=b['target'];n=ob[target]-target
 pairs.append({'original_call':original_start+a['offset'],'candidate_call':candidate_start+b['offset'],'original_target':target,'candidate_target':other,'original_target_bytes':n,'candidate_target_bytes':cf[other],'candidate_symbols':names[other],'complete_target_match':eq(target,other,n)})
assert sum(x['complete_target_match']for x in pairs)==12
assert all(x['complete_target_match']for x in pairs[4:])
# Prologue and source argument provenance: r9=LP, r8=protocol; r6 receives the
# recipients pointer through the same multi-argument ABI on both programs.
for e,a in [(o,original_start),(c,candidate_start)]:
 isins(e,a,0xbf,6,5);isins(e,a+8,0xbf,8,4);isins(e,a+16,0xbf,9,3)
isins(o,0x1d928,0x79,6,6,-4096);isins(c,0xc83c8,0x79,6,6,-4096)
# Original construction: one recipients copy, one materialized352-byte event.
isins(o,0x1dbb8,0xbf,8,10);isins(o,0x1dbc0,0x07,8,0,0,-584)
isins(o,0x1dbc8,0xbf,1,8);isins(o,0x1dbd0,0xbf,2,6);isins(o,0x1dbd8,0xb7,3,0,0,256);assert o.calls[0x1dbe0]==0x119898
isins(o,0x1dc50,0xbf,2,8);assert o.calls[0x1dc58]==0x89148
isins(o,0x1ddb0,0xbf,2,10);isins(o,0x1ddb8,0x07,2,0,0,-584);assert o.calls[0x1ddc0]==0x89148
# Candidate persistent event recipient copy and redundant log-event copy both
# read the same recipient pointer, each with an explicit256-byte extent.
for at,base in [(0xc8688,-856),(0xc8758,-504)]:
 assert c.calls[at]==0x10b138;isins(c,at-8,0xb7,3,0,0,256);isins(c,at-16,0xbf,2,6)
 if at==0xc8688:isins(c,at-24,0x07,1,0,0,base);isins(c,at-32,0xbf,1,10)
 else:isins(c,at-32,0x07,1,0,0,base);isins(c,at-40,0xbf,1,10);isins(c,at-24,0x7b,10,1,-1000)
isins(c,0xc87e8,0x79,2,10,-1000);assert c.calls[0xc87f0]==0x44878
isins(c,0xc8948,0xbf,2,10);isins(c,0xc8950,0x07,2,0,0,-856);assert c.calls[0xc8958]==0x44878
# The data serializer is exactly the same complete744-byte implementation;
# its field-load offsets establish the optimized in-memory event layout.
assert eq(0x89148,0x44878,744)
fields=[('recipients',0,256),('admin',256,32),('authority',288,32),('timestamp',320,8),('lp_fee',328,8),('protocol_fee',336,8),('creator_fee',344,8)]
layout=[{'field':name,'event_relative_offset':off,'bytes':n,'original_event_stack_offset':-584+off,'candidate_retained_event_stack_offset':-856+off,'candidate_log_event_stack_offset':-504+off}for name,off,n in fields]
# All scalar/public-key clone stores are accounted; recipients are the second memcpy.
clone_stores={'admin':[(0xc86f8,-224),(0xc8708,-232),(0xc8718,-240),(0xc8728,-248)],'authority':[(0xc87b8,-216),(0xc87c0,-208),(0xc87c8,-200),(0xc87d0,-192)],'timestamp':[(0xc8790,-184)],'lp_fee':[(0xc8798,-176)],'protocol_fee':[(0xc87a0,-168)],'creator_fee':[(0xc87b0,-160)]}
for rows in clone_stores.values():
 for at,off in rows: isins(c,at,0x7b,10,off=off)
isins(c,0xc8798,0x7b,10,9,-176);isins(c,0xc87a0,0x7b,10,8,-168)
# Explicit duplicated field provenance, independent of source-token inference.
field_provenance={}
isins(c,0xc85e8,0x79,2,10,-464);isins(c,0xc85f0,0x7b,10,2,-992);isins(c,0xc8650,0x7b,10,2,-536);isins(c,0xc8788,0x79,5,10,-992);isins(c,0xc8790,0x7b,10,5,-184)
field_provenance['timestamp']={'source':'same Clock-success scalar','instructions':[ins(c,a)for a in[0xc85e8,0xc85f0,0xc8650,0xc8788,0xc8790]]}
for name,reg,a,b,x,y in [('lp_fee',9,0xc8658,0xc8798,-528,-176),('protocol_fee',8,0xc8660,0xc87a0,-520,-168)]:
 isins(c,a,0x7b,10,reg,x);isins(c,b,0x7b,10,reg,y);field_provenance[name]={'source_register':reg,'instructions':[ins(c,a),ins(c,b)]}
isins(c,0xc8690,0x79,1,10,-976);isins(c,0xc8698,0x7b,10,1,-512);isins(c,0xc87a8,0x79,5,10,-976);isins(c,0xc87b0,0x7b,10,5,-160)
field_provenance['creator_fee']={'source':'same saved creator argument at r10-976','instructions':[ins(c,a)for a in[0xc8690,0xc8698,0xc87a8,0xc87b0]]}
isins(c,0xc8608,0x7b,10,3,-1000);isins(c,0xc86e8,0x79,2,10,-1000)
admin_ops=[]
for i,off in enumerate([24,16,8,0]):
 a=0xc8610+16*i;b=0xc86f0+16*i;isins(c,a,0x79,1,3,off);isins(c,a+8,0x7b,10,1,-576-8*i);isins(c,b,0x79,1,2,off);isins(c,b+8,0x7b,10,1,-224-8*i);admin_ops.extend([ins(c,x)for x in[a,a+8,b,b+8]])
field_provenance['admin']={'source':'same admin key pointer, retained across construction at r10-1000','instructions':[ins(c,0xc8608),ins(c,0xc86e8),*admin_ops]}
isins(c,0xc86a0,0x79,2,10,-984);isins(c,0xc8760,0x79,4,10,-984)
authority_ops=[]
for i,off in enumerate([0,8,16,24]):
 a=0xc86a8+16*i;isins(c,a,0x79,1,2,off);isins(c,a+8,0x7b,10,1,-568+8*i);authority_ops.extend([ins(c,a),ins(c,a+8)])
for a,reg,off in [(0xc8768,1,24),(0xc8770,2,16),(0xc8778,3,8),(0xc8780,4,0)]:isins(c,a,0x79,reg,4,off);authority_ops.append(ins(c,a))
for a,reg,off in [(0xc87b8,4,-216),(0xc87c0,3,-208),(0xc87c8,2,-200),(0xc87d0,1,-192)]:isins(c,a,0x7b,10,reg,off);authority_ops.append(ins(c,a))
field_provenance['authority']={'source':'same authority argument pointer at r10-984','instructions':[ins(c,0xc86a0),ins(c,0xc8760),*authority_ops]}
field_provenance['recipients']={'source':'same r6 array pointer; explicit256-byte memcpy each','calls':[0xc8688,0xc8758]}

# Exact instruction-count partition around event construction; equal counts of
# prefix/suffix do NOT claim they are byte-identical or erase frame differences.
parts={'prefix':{'original':[original_start,0x1db48],'candidate':[candidate_start,0xc85e8]},'event_construction_and_first_serialization':{'original':[0x1db48,0x1dc60],'candidate':[0xc85e8,0xc87f8]},'suffix':{'original':[0x1dc60,original_start+original_n],'candidate':[0xc87f8,candidate_start+candidate_n]}}
for row in parts.values():
 row['original_bytes']=row['original'][1]-row['original'][0];row['candidate_bytes']=row['candidate'][1]-row['candidate'][0];row['difference']=row['candidate_bytes']-row['original_bytes']
assert parts['prefix']['difference']==parts['suffix']['difference']==0 and parts['event_construction_and_first_serialization']['difference']==248
macro=(W/'inputs/event-macro.rs').read_text();assert 'anchor_lang::Event::data(&#data)'in macro and 'anchor_lang::Event::data(&#event_struct)'in macro
source=(W/'inputs/lib.rs').read_text();start=source.index('    pub fn update_fee_config(');end=source.index('\n    pub fn update_buyback_config',start);handler=source[start:end];assert 'emit!(event.clone());'in handler and 'emit_cpi!(event);'in handler
report={'scope':'Independent read-only static evidence for duplicate event materialization. No source edits, builds, runtime, initializer replay or signed-message changes.','original_sha256':sha(o.b),'candidate_sha256':sha(c.b),'unstripped_sha256':sha(s.b),'original_handler':body(o,original_start,original_n),'candidate_handler':body(c,candidate_start,candidate_n),'direct_call_pairs_after_removing_extra_memcpy':pairs,'extra_candidate_call':{'call':0xc8758,'target':0x10b138,'bytes_copied':256,'source_register':6,'destination_stack_offset':-504},'event_serializer':{'original':body(o,0x89148,744),'candidate':body(c,0x44878,744),'complete_normalized_equal':True},'event_layout':layout,'candidate_clone_stores':clone_stores,'duplicated_field_provenance':field_provenance,'first_second_event_bases':{'original':[-584,-584],'candidate':[-504,-856]},'exact_partition':parts,'source_operation':{'path':'programs/pump-amm/src/lib.rs','handler':'update_fee_config','expression':'emit!(event.clone());','pinned_emit_expansion':'anchor_lang::Event::data(&event.clone())','pinned_emit_cpi_expansion':'anchor_lang::Event::data(&event)','ownership_fact':'Both macros borrow their expression; this Clone-derived all-value event need not be cloned to remain available for the subsequent CPI.'},'conclusion':'The current explicit clone corresponds to a distinct second352-byte event materialization used only for the log serializer; the original uses a single stack event buffer for both serializer calls. An ownership-required clone is disproved by the exact macro expansion.','limits':['Original Rust token spelling is not uniquely recovered; equivalent source or historical optimization could also result in one event buffer.','The entire248-byte size increase is localized to the construction/first-serialization partition, but no future compiler output or exact size after a source change is predicted.','Outside that partition, equal instruction counts do not mean byte equality: frame/register choices and branches retain recorded differences.','The three scalar targets and recipient source-coordinate target do not match; this event-copy finding does not resolve them.','No initializer success coverage or whole-program identity is inferred.']}
if '--verify'in sys.argv:assert json.loads(json.dumps(report))==json.loads((W/'evidence.json').read_text())
else:(W/'evidence.json').write_text(json.dumps(report,indent=2)+'\n')
print(json.dumps({'status':'PASS','original_handler_bytes':original_n,'candidate_handler_bytes':candidate_n,'extra_event_bytes':352,'extra_recipients_memcpy_bytes':256,'extra_instruction_bytes_in_event_partition':248,'original_event_bases':[-584,-584],'candidate_event_bases':[-504,-856],'event_serializer_full_match':True,'builds_or_runtime':False},indent=2))
