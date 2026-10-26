from pathlib import Path
import json,hashlib,struct,shutil
R=Path(__file__).resolve().parents[2];Q=Path(__file__).resolve().parent;I=R/'work/relay114-116-static-inspection';shutil.copytree(I,Q/'newly-admitted');shutil.copytree(R/'work/relay114-116-static-scope-plan',Q/'reviewed-scope');shutil.copytree(R/'work/relay113-error8-edge-review',Q/'arithmetic-edge-proof');h=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();raw=(R/'evidence/dependencies/donation_relay/deployed.so').read_bytes();assert hashlib.sha256(raw).hexdigest()=='367f07a62e3f74d358187d175cf3228848e81a56c781a9a75b9df7fed1268563'
b=(I/'original-116.bin').read_bytes();messages=[];at=0
while at<len(b):
 op,regs,off,imm=struct.unpack_from('<BBhi',b,at)
 if op==0x18:
  value=struct.unpack_from('<I',b,at+4)[0]+(struct.unpack_from('<I',b,at+12)[0]<<32)
  if regs==2:
   nextop,nextr,no,nextimm=struct.unpack_from('<BBhi',b,at+16);assert (nextop,nextr,no)==(0xb7,3,0);data=raw[value:value+nextimm];assert len(data)==nextimm;messages.append({'lddw_pc':152552+at,'target':value,'bytes':nextimm,'hex':data.hex(),'utf8':data.decode(),'sha256':hashlib.sha256(data).hexdigest()})
  at+=16
 else:at+=8
assert len(messages)==34;assert next(m for m in messages if m['lddw_pc']==153432)['utf8']=='Arithmetic overflow';(Q/'direct-message-extents.json').write_text(json.dumps(messages,indent=2)+'\n');v=raw[772792:772824];(Q/'direct-formatter-writer-prefix.bin').write_bytes(v);(Q/'direct-formatter-writer-prefix.json').write_text(json.dumps({'file_offset':772792,'consumed_prefix_bytes':32,'raw_hex':v.hex(),'decoded_slots':[hex(x) for x in struct.unpack('<QQQQ',v)],'writer_method_target':50616,'drop_target':32584,'size':24,'alignment':8,'limit':'Directly consumed32Bprefix, not full vtable/indirect callee closure; no newbody recursion.'},indent=2)+'\n')
name=struct.pack('<Q',8387230176444510785)+struct.pack('<Q',7811056383822881641)+struct.pack('<H',30575);assert name==b'ArithmeticOverflow';(Q/'name8-initialization.json').write_text(json.dumps({'dispatch_branch_pc':143984,'case_entry':146464,'allocation_bytes':18,'alignment':1,'success_entry':149304,'stores':[149344,149368,149384],'name_hex':name.hex(),'name_utf8':name.decode(),'name_sha256':hashlib.sha256(name).hexdigest(),'common_string_return':152016},indent=2)+'\n')
metadata=json.loads((I/'original-metadata.json').read_text());coverage=[]
for ordinal in [114,116]:
 f=next(x for x in metadata if x['ordinal']==ordinal);b=(I/f'original-{ordinal}.bin').read_bytes();pcs=[];edges=[];ops={};at=0
 while at<len(b):
  pc=f['start']+at;op,regs,off,imm=struct.unpack_from('<BBhi',b,at);pcs.append(pc);ops[str(op)]=ops.get(str(op),0)+1;step=16 if op==0x18 else 8
  if op&7 in[5,6] and op not in[0x85,0x8d,0x95]:edges.append({'pc':pc,'target':pc+8+off*8,'opcode':op})
  at+=step
 assert at==len(b);assert all(e['target']in pcs for e in edges);coverage.append({'ordinal':ordinal,'start':f['start'],'end':f['end'],'bytes':len(b),'raw_sha256':hashlib.sha256(b).hexdigest(),'instruction_starts':pcs,'branch_edges':edges,'opcode_counts':ops,'structural_all_bytes_covered':True})
(Q/'complete-structural-coverage.json').write_text(json.dumps(coverage,indent=2)+'\n')
D=Q/'previously-admitted-owned';D.mkdir();O=R/'repro/donation-relay/owned-error-reviewed-proposal'
for n in ['original-286.asm','original-289.asm','original-290.asm']:shutil.copyfile(O/'evidence'/n,D/n)
shutil.copyfile(R/'work/relay114-116-static-scope-plan/already-admitted652392.asm',D/'original-284.asm');shutil.copyfile(R/'work/relay113-error8-source-proof/original115.asm',D/'original-115.asm')
S=R/'repro/donation-relay/source-build-13-typed-borrow-owned/source/src';(Q/'candidate-source').mkdir()
for n in ['lib.rs','error_report.rs','exit_error.rs','error_catalog.rs']:shutil.copyfile(S/n,Q/'candidate-source'/n)
(Q/'new-admission-record.json').write_text(json.dumps({'reviewed_scope_seal':h(R/'work/relay114-116-static-scope-plan/manifest.json'),'root_executed_static_inspector_exit':0,'new_original_bodies':[114,116],'prior_admission_claimed':False,'recursive_new_callee_bodies':[],'source_patch':False,'new_compiler_or_VM_runs':0},indent=2)+'\n')
