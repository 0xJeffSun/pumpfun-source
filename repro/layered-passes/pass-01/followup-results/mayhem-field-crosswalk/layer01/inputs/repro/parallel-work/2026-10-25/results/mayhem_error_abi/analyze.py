"""Static encoding and constant-branch checks only; no VM, build or runtime probes."""
import hashlib,json,struct
from pathlib import Path
P=Path(__file__).resolve().parent

def analyze():
 ws=json.loads((P/'windows.json').read_text()); windows={w['label']:w for w in ws}
 def raw(label):return (P/windows[label]['path']).read_bytes()
 def at(label,pc,n=8):
  w=windows[label];assert w['start']<=pc and pc+n<=w['end'];return raw(label)[pc-w['start']:pc-w['start']+n]
 def ins(label,pc):return struct.unpack('<BBhi',at(label,pc))
 def exact(label,pc,h):assert at(label,pc,len(bytes.fromhex(h))).hex()==h,(label,hex(pc))
 def call(label,pc,target):
  op,reg,off,imm=ins(label,pc);assert (op,reg,off)==(0x85,0x10,0);assert pc+8+imm*8==target
  return dict(window=label,pc=pc,raw_hex=at(label,pc).hex(),target=target)
 edges=[]
 for label,pc,target in [('original_sol',0x7ed48,0x9a5e8),('original_quote',0x7efd8,0x9a5e8),('candidate_sol',0x59078,0x817f0),('candidate_quote',0x58d48,0x817f0),('original_constructor',0x9a620,0x999e8),('original_constructor',0x9a6a0,0x9a830),('candidate_constructor',0x81830,0x80bf0),('candidate_constructor',0x818b0,0x81a40)]:edges.append(call(label,pc,target))
 checks=[('original_sol',0x7ed40,'b701000066000000'),('original_sol',0x7ed50,'0500360000000000'),('original_sol',0x7ef08,'9500000000000000'),('original_quote',0x7efd0,'b701000066000000'),('original_quote',0x7efe0,'0500370000000000'),('original_quote',0x7f1a0,'9500000000000000'),('candidate_sol',0x59060,'bfa10000000000000701000088fdffffb702000066000000'),('candidate_sol',0x59080,'79a890fd0000000079a688fd0000000005003d0000000000'),('candidate_sol',0x59280,'79a180fd000000007b610000000000007b810800000000009500000000000000'),('candidate_quote',0x58d30,'bfa10000000000000701000008f9ffffb702000066000000'),('candidate_quote',0x58d50,'79a110f90000000079a208f9000000000500420000000000'),('candidate_quote',0x58f78,'79a300f9000000007b230000000000007b130800000000009500000000000000'),('original_constructor',0x9a5e8,'bf16000000000000636a84ff00000000'),('original_constructor',0x9a730,'bf01000000000000'),('original_constructor',0x9a7a8,'63619800000000007201500002000000b7000000000000009500000000000000'),('candidate_constructor',0x817f0,'bf27000000000000bf16000000000000637a84ff00000000'),('candidate_constructor',0x819b0,'637098000000000072005000020000007b060800000000007a060000000000009500000000000000')]
 checks.extend([('original_sol',0x7eca8,'18010000ebdf0a000000000000000000b70200001a000000'),('original_quote',0x7ef38,'1801000005e00a000000000000000000b70200001f000000'),('original_sol',0x7ecc8,'2506110007000000'),('original_quote',0x7ef58,'2506110007000000'),('candidate_sol',0x58fe0,'796108f0000000002501150007000000'),('candidate_quote',0x58cb0,'796108f0000000002501150007000000')])
 for label,pc,h in checks:exact(label,pc,h)
 # Confirm the branch immediates actually reach the specified consumer/exit.
 for label,pc,target in [('original_sol',0x7ed50,0x7ef08),('original_quote',0x7efe0,0x7f1a0),('candidate_sol',0x59090,0x59280),('candidate_quote',0x58d60,0x58f78)]:
  op,reg,off,imm=ins(label,pc);assert op==5 and pc+8+off*8==target
 # The only branches evaluated here are fixed ErrorCode selector comparisons.
 # Stop before every call; this is a source-level constant CFG walk, not execution.
 def select(label,register):
  pc=windows[label]['start'];op,regs,_,_=ins(label,pc);assert op==0x61 and regs==register*17
  pc+=8;trace=[];value=102;literal=None;length=None
  for _ in range(50):
   op,regs,off,imm=ins(label,pc);trace.append(dict(pc=pc,raw_hex=at(label,pc,16 if op==0x18 else 8).hex()))
   if op in (0xd5,0x65,0x55,0x15):
    assert regs==register
    take={0xd5:value<=imm,0x65:value>imm,0x55:value!=imm,0x15:value==imm}[op];trace[-1]['taken']=take;pc+=8+(off*8 if take else 0)
   elif op==5:pc+=8+off*8
   elif op==0x18:
    literal=struct.unpack('<I',at(label,pc+4,4))[0]|(struct.unpack('<I',at(label,pc+12,4))[0]<<32);pc+=16
   elif op==0xb7:assert regs==3;length=imm;pc+=8
   else:break
  assert literal is not None
  return dict(window=label,input_code=value,selector_trace=trace,selected_literal=literal,selected_length=length,stop_pc=pc)
 sels=[select('original_name',2),select('candidate_name',2),select('original_display',1),select('candidate_display',1)]
 for kind in ['original','candidate']:
  name=next(s for s in sels if s['window']==kind+'_name');display=next(s for s in sels if s['window']==kind+'_display')
  assert name['selected_literal']==windows[kind+'_error_name']['start'] and name['selected_length']==28
  assert display['selected_literal']==windows[kind+'_message_descriptor']['start']
  assert raw(kind+'_error_name')==b'InstructionDidNotDeserialize'
  assert raw(kind+'_error_message')==b'The program could not deserialize the given instruction'
  desc=raw(kind+'_message_descriptor');low,ptr,length=struct.unpack('<IIQ',desc)
  assert low==0 and ptr==windows[kind+'_error_message']['start'] and length==55
  rels=json.loads((P/'inputs'/f'{kind}-relocations.json').read_text());rel=next(r for r in rels if r['at']==display['selected_literal']);assert rel['info']&0xffffffff==8
  display['descriptor']=dict(raw_hex=desc.hex(),relative_relocation=rel,message_file_offset=ptr,message_length=length,interpretation='Retained ELF type-8 data pointer encoded in upper word; no loader execution')
  for suffix,text in [('sol_log',b'Instruction: WithdrawAdmin'),('quote_log',b'Instruction: WithdrawQuoteAdmin')]:assert raw(kind+'_'+suffix)==text
 # Anchor source correspondence, not historical dependency identity.
 anchor=(P/'inputs/anchor-error-1.0.0.rs').read_bytes();official=(P/'inputs/official-anchor-error-1.0.0.rs').read_bytes();assert anchor==official
 assert b'#[error_code(offset = 0)]' in anchor and b'InstructionDidNotDeserialize' in anchor
 codegen=(P/'inputs/anchor-error-codegen-1.0.0.rs').read_text();assert 'error_code_number: error_code.into()' in codegen and 'error_name: error_code.name()' in codegen
 disp=json.loads((P/'inputs/dispatch.json').read_text())
 for name,row in disp['instructions'].items():assert hashlib.sha256(('global:'+name).encode()).digest()[:8].hex()==row['discriminator']
 return dict(schema=1,checkpoint='517d77db988d8c63b6cf476f0be138c5a4f3128a',status='bounded caller/callee/data witnesses established; historical lowering cause unclosed',original_sha256='a87fa9f866272514e6acb852b668c4a08aeb173d56c883039991d114d1199bdb',candidate_sha256='9e4e19dfb3b3fefbec13ecfc0d43ffd2ff0bea7b74ac7b2fe14126d23c79c05b',dispatch_identity={'basis':'Inherited dispatch metadata plus independently checked wrapper logs and current candidate symbol rows','mixed_entry_decoded':False,'entries':disp['instructions']},direct_edges=edges,encoding_assertions=len(checks),selectors=sels,conclusions={'same_error_code':102,'same_selected_error_text':True,'observed_original_boundary':'code in r1; tag r0=0, pointer r1 forwarded through wrapper exit','observed_candidate_boundary':'out pointer r1, code r2; out[0]=0/out[8]=box, wrapper copies pair to its own out buffer','changed_error_payload_representation_evidenced':False,'observed_call_convention_difference':True,'optimizer_pass_or_historical_target_attributed':False},source_changes=[],builds=0,runtime_probes=0,unclosed=['Historical dispatch identity is inherited, not rederived inside excluded mixed-entry body','No comparison of the mixed-entry consumer after wrapper return','Short-input prelude allocation/drop and indirect call closure','String-copy, formatter/vtable, allocator, panic and OOM transitive semantics','Historical compiler IR, target lowering, optimizer pass and source/dependency identity'])

if __name__=='__main__':print(json.dumps(analyze(),indent=2))
