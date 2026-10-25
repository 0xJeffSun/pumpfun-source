"""Independent encoded-frame-byte disjointness check. No target execution."""
from pathlib import Path
import json,struct,hashlib,collections,sys,argparse
sys.dont_write_bytecode=True
P=Path(__file__).resolve().parent
H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
J=lambda p:json.loads(p.read_bytes())
def read_elf(path):
 b=path.read_bytes();h=struct.unpack_from('<16sHHIQQQIHHHHHH',b);assert h[0][:6]==b'\x7fELF\x02\x01';sections=[]
 for i in range(h[12]):sections.append(struct.unpack_from('<IIQQQQIIQQ',b,h[6]+i*h[11]))
 def at(a,n):
  found=[s for s in sections if s[1]!=8 and s[2]&2 and s[3]<=a and a+n<=s[3]+s[5]];assert len(found)==1;s=found[0];return b[s[4]+a-s[3]:s[4]+a-s[3]+n]
 return at
def decoded(raw):
 op,regs,off,imm=struct.unpack('<BBhi',bytes.fromhex(raw)[:8]);return op,regs&15,regs>>4,off,imm
def width(op):return{0:4,8:2,16:1,24:8}[op&24]
def overlap(a,b):return max(a['start'],b['start'])<min(a['end'],b['end'])
def analysis():
 I=P/'inputs';assert H(I/'parent-manifest.json')=='d153ca5c4bee7e592e363e5622db0c2f1e8462c170604fe5aed7c59cc59dd806';parent=J(I/'parent-manifest.json')
 for own,old in [('instruction-correspondence.json','instruction-correspondence.json'),('handler-candidate-instructions.json','collection/bounded/handler-candidate-instructions.json'),('candidate-symbols.so','collection/unstripped.so'),('baseline-symbols.so','plan/baseline-inputs/unstripped.so')]:assert H(I/own)==parent[old]
 A=read_elf(I/'baseline-symbols.so');B=read_elf(I/'candidate-symbols.so');w=J(I/'instruction-correspondence.json');assert len(w)==681
 for r in w:
  assert A(r['baseline_pc'],len(bytes.fromhex(r['baseline_raw_hex']))).hex()==r['baseline_raw_hex']
  assert B(r['candidate_pc'],len(bytes.fromhex(r['candidate_raw_hex']))).hex()==r['candidate_raw_hex']
 ins={r['pc']:r for r in J(I/'handler-candidate-instructions.json')};rows={r['candidate_pc']:r for r in w}
 for pc,r in rows.items():assert ins[pc]['raw_hex']==r['candidate_raw_hex']
 # Independent decoding of every current and baseline direct FP-relative cell,
 # with opcode-specific byte width. No start-offset-only comparisons.
 direct=[];aliases={}
 for r in w:
  op,dst,src,off,imm=decoded(r['candidate_raw_hex']);cl=op&7
  if(cl==1 and src==10)or(cl in[2,3]and dst==10):
   oldop,olddst,oldsrc,oldoff,oldimm=decoded(r['baseline_raw_hex']);assert oldop==op and olddst==dst and oldsrc==src and oldimm==imm
   n=width(op);row={'pc':r['candidate_pc'],'baseline_pc':r['baseline_pc'],'start':off,'end':off+n,'baseline_start':oldoff,'baseline_end':oldoff+n,'bytes':n,'base_register':10,'kind':'load'if cl==1 else'store','rule':r['rule']}
   if r['rule']=='explicit_private_spill_slot_alias_plus16':assert n==8 and off==oldoff+16;aliases[oldoff]=off
   else:assert off==oldoff
   direct.append(row)
 assert len(aliases)==34 and len(set(aliases.values()))==34
 moved=[r for r in direct if r['rule']=='explicit_private_spill_slot_alias_plus16'];unchanged=[r for r in direct if r['rule']!='explicit_private_spill_slot_alias_plus16']
 collisions=[{'moved':x,'unchanged':y}for x in moved for y in unchanged if overlap(x,y)];assert not collisions
 moved_bytes={v for r in moved for v in range(r['start'],r['end'])};unchanged_bytes={v for r in unchanged for v in range(r['start'],r['end'])}
 assert moved_bytes==set(range(-928,-656))and not moved_bytes&unchanged_bytes
 assert all(r['end']<=-4080 or r['start']>=-640 for r in unchanged)
 # Conservative fixed point over the encoded CFG induced by the 681 paired
 # instructions. Track only exact frame offsets in registers. Joins disagree ->
 # unknown; all loads destroy pointer knowledge; unknown is never called non-frame.
 # Calls clobber r0..r5, retain r6..r9, keep frame r10. This is the ordinary caller
 # ABI assumption already used in parent proof, not a proof of opaque callees.
 # LDDW, MOV immediate and other ALU writes explicitly destroy FP provenance.
 def join(a,b):return tuple(x if x==y else None for x,y in zip(a,b))
 states={781856:tuple([None]*10+[0])};queue=collections.deque([781856]);steps=0;outside=set()
 while queue:
  pc=queue.popleft();s=list(states[pc]);op,dst,src,off,imm=decoded(rows[pc]['candidate_raw_hex']);cl=op&7
  if op==191:s[dst]=s[src]
  elif op==7:s[dst]=None if s[dst]is None else s[dst]+imm
  elif op==24 or cl in[1,4,7]:s[dst]=None
  if op in[133,141]:
   for reg in range(6):s[reg]=None
  s[10]=0
  assert ins[pc]['local_encoded_successors']==([]if op==149 else[pc+8+off*8]if op==5 else[pc+8+off*8,pc+len(bytes.fromhex(rows[pc]['candidate_raw_hex']))]if cl in[5,6]and op not in[133,141]else[pc+len(bytes.fromhex(rows[pc]['candidate_raw_hex']))])
  for target in ins[pc]['local_encoded_successors']:
   if target not in rows:outside.add((pc,target));continue
   new=tuple(s)if target not in states else join(states[target],tuple(s))
   if target not in states or states[target]!=new:states[target]=new;queue.append(target)
  steps+=1;assert steps<10000
 assert len(states)==681
 derived=[];opaque=[];callargs=[]
 for pc,state in sorted(states.items()):
  op,dst,src,off,imm=decoded(rows[pc]['candidate_raw_hex']);cl=op&7
  if op in[133,141]:callargs.append({'pc':pc,'known_frame_register_arguments':{str(i):state[i]for i in range(1,6)if state[i]is not None},'callee_memory_effects_not_analyzed':True})
  if cl in[1,2,3]:
   base=src if cl==1 else dst;n=width(op);row={'pc':pc,'base_register':base,'offset':off,'bytes':n,'rule':rows[pc]['rule'],'kind':'load'if cl==1 else'store'}
   if state[base]is not None:
    if base!=10:row.update(start=state[base]+off,end=state[base]+off+n);derived.append(row)
   else:opaque.append(row)
 assert len(derived)==16 and all(not overlap(x,y)for x in moved for y in derived)
 return {'status':'PASS_KNOWN_FRAME_BYTE_IMAGES_DISJOINT','parent_manifest_sha256':H(I/'parent-manifest.json'),'paired_instructions':681,'relocated_spill_cells':34,'relocated_accesses':len(moved),'unchanged_direct_frame_accesses':len(unchanged),'relocated_union':[-928,-656],'unchanged_nearest_frame_extent':[-640,0],'unchanged_remote_extent':[-4096,-4080],'separating_unused_extent':[-656,-640],'direct_collision_pairs':collisions,'known_derived_frame_accesses':derived,'derived_collision_pairs':[],'opaque_or_nonframe_memory_accesses':opaque,'opaque_memory_nonalias_proven':False,'callee_memory_effects_proven':False,'call_frame_arguments':callargs,'encoded_edges_leaving_paired_domain':[list(v)for v in sorted(outside)],'def_use_lifetime_separation_required_for_known_cells':False,'original_new_body_or_data_decodes':0,'target_executions':0,'generic_stack_safety_claimed':False,'direct_frame_accesses':direct,'spill_offset_mapping':{str(k):v for k,v in sorted(aliases.items())}}
def main():
 a=argparse.ArgumentParser();a.add_argument('--emit',action='store_true');x=a.parse_args()
 if not x.emit:
  assert H(P/'manifest.json')==(P/'manifest.sha256').read_text().split()[0];m=J(P/'manifest.json');assert set(m)=={str(p.relative_to(P))for p in P.rglob('*')if p.is_file()and p not in[P/'manifest.json',P/'manifest.sha256']}
  for n,h in m.items():assert H(P/n)==h
 result=analysis()
 if x.emit:print(json.dumps(result,indent=2))
 else:
  assert result==J(P/'observations.json');print(json.dumps({k:v for k,v in result.items()if k not in['direct_frame_accesses','opaque_or_nonframe_memory_accesses','call_frame_arguments','known_derived_frame_accesses']},indent=2))
if __name__=='__main__':main()
