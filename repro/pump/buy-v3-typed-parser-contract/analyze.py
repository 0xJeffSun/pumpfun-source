"""Selected original windows only. No target execution or semantic equivalence test."""
import json,struct
from pathlib import Path
from elf_reader import ELF,H
P=Path(__file__).resolve().parent
# Inferred bounds for explicitly called readers and selected decoders only.
RANGES={
'parser':(0x102578,0x105b78),'init':(0x105b78,0x107b38),'exit':(0x107b38,0x107f78),
'global_reader':(0x13270,0x13328),'global_checked':(0x96d0,0x9ab0),
'curve_reader':(0x13048,0x13100),'curve_checked':(0x8320,0x8710),
'mint_reader':(0x288,0x340),'mint_checked':(0x32d8,0x3748),
'base_token_box':(0x38a8,0x3a08),'base_token_reader':(0x1d0,0x288),'base_token_checked':(0x2e48,0x32d8),
'interface_reader':(0x120,0x1d0),'interface_check':(0x9eb0,0xa090),
'signer_reader':(0x127a0,0x12850),'fee_box':(0x3cc8,0x3e38),'fee_reader':(0x133e0,0x134a8),'fee_checked':(0x92d0,0x96d0),
'system_reader':(0x13b80,0x13da8),'event_reader':(0x2ca8,0x2e48),'pump_program_reader':(0x136f0,0x13938),
'volume_checked':(0x9ab0,0x9eb0),'volume_unchecked':(0x5628,0x5a28),'volume_decode_checked':(0x101c20,0x101ef8),'volume_decode':(0x101ef8,0x102578),
'fee_decode_checked':(0x1156f0,0x1159d8),'fee_decode':(0x1159d8,0x115e70),
'curve_exit':(0x5a28,0x6158),'volume_exit':(0x6158,0x66f0)}
def analyze():
 e=ELF(P/'evidence/original.so');rows=[]
 for name,(a,z) in RANGES.items():
  ins=[];norm=bytearray(e.at(a,z-a))
  for pc,op,reg,off,imm in e.instructions(a,z):
   size=16 if op==0x18 else 8
   r=dict(pc=pc,raw=e.at(pc,size).hex(),opcode=op,dst=reg&15,src=reg>>4,offset=off,immediate=imm)
   rel=[v for v in e.reloc if pc<=v['offset']<pc+size]
   if op==0x85:
    r['call_target']=pc+8+8*imm if reg==0x10 and not rel else None
    r['call_status']='relative target' if r['call_target'] is not None else 'loader/external unresolved'
    r['relocations']=rel
    if r['call_target'] is not None:norm[pc-a+4:pc-a+8]=bytes(4)
   if op==0x8d:r['indirect_call']='unresolved; no guessed target'
   if op&7 in (5,6) and op not in (0x85,0x95):r['branch_target']=pc+8+8*off
   if op==0x18:r['lddw']=(imm&0xffffffff)|(struct.unpack('<I',e.at(pc+12,4))[0]<<32)
   ins.append(r)
  assert sum(len(bytes.fromhex(r['raw'])) for r in ins)==z-a
  rows.append(dict(name=name,start=a,end=z,boundary='inferred; not historical symbols',size=z-a,raw_sha256=H(e.at(a,z-a)),call_normalized_sha256=H(norm),instructions=ins))
 return dict(original_sha256=H(e.b),normalization='zero unrelocated direct call immediates only; no equality claim',windows=rows,proposal_compiled=False,raw_equality=None,normalized_equality=None,transitive_closure=False)
if __name__=='__main__':print(json.dumps(analyze(),indent=2))
