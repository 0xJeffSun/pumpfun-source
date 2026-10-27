"""Compare Pool dispatch choices and slice consumption on every length boundary."""
from pathlib import Path
import argparse,hashlib,json,struct,sys
ROOT=Path(__file__).resolve().parents[3];sys.path.insert(0,str(ROOT/'repro/pump_amm/claim-self-transfer-v144/static-tool'))
from elf_reader import Elf
MASK=(1<<64)-1
DISC=int.from_bytes(bytes([241,154,109,4,17,177,109,188]),'little')
ORIGINS={0x65330:203,0x65d90:235,0x668e8:236,0x674d8:237,0x68118:253,0x68de0:262,0x69b58:263,0x6a920:279}

def trace(elf,start,length,valid,readers):
 data,fat,out,stack=0x100000,0x200000,0x300000,0x400000
 regs=[0]*11;regs[1]=out;regs[2]=fat;regs[10]=stack;memory={fat:data,fat+8:length,data:DISC if valid else DISC^1};pc=start;steps=0
 while steps<256:
  steps+=1;op,rs,off,imm=struct.unpack_from('<BBhi',elf.b,pc);dst=rs&15;src=rs>>4;next_pc=pc+8
  if op==0xbf:regs[dst]=regs[src]
  elif op==0xb7:regs[dst]=imm&MASK
  elif op==0x79:regs[dst]=memory[regs[src]+off]
  elif op==0x7b:memory[regs[dst]+off]=regs[src]
  elif op in [0x7a,0x72]:memory[regs[dst]+off]=imm&MASK
  elif op==0x18:regs[dst]=struct.unpack_from('<I',elf.b,pc+4)[0]+(struct.unpack_from('<I',elf.b,pc+12)[0]<<32);next_pc+=8
  elif op==0x07:regs[dst]=(regs[dst]+imm)&MASK
  elif op==0x0f:regs[dst]=(regs[dst]+regs[src])&MASK
  elif op==0x05:next_pc+=off*8
  elif op==0x85:
   target=elf.calls[pc]
   return {'decoder_payload':readers.get(target),'error':target not in readers,'remaining_len':memory[fat+8],'consumed':memory[fat]-data}
  elif op in [0x15,0x1d,0x25,0x2d,0x35,0x3d,0x55,0x5d,0xa5,0xad,0xb5,0xbd]:
   right=regs[src]if op&8 else imm&MASK;left=regs[dst];code=op&0xf0
   take={0x10:left==right,0x20:left>right,0x30:left>=right,0x50:left!=right,0xa0:left<right,0xb0:left<=right}[code]
   if take:next_pc+=off*8
  else:raise AssertionError((hex(pc),hex(op)))
  pc=next_pc
 raise AssertionError('unexpected loop')

def compare(candidate,symbols):
 o=Elf(ROOT/'evidence/original/pump_amm/deployed.so');c=Elf(candidate);s=Elf(symbols)
 readers={next(f['start']for f in s.funcs if f'read_pool_{n}17'in f['name']):n for n in ORIGINS.values()}
 checked=next(f for f in s.funcs if 'state..Pool$'in f['name']and'15try_deserialize17'in f['name'])
 unchecked=next(f for f in s.funcs if 'state..Pool$'in f['name']and'25try_deserialize_unchecked17'in f['name'])
 lengths=sorted({0,MASK,*[v+d for v in [8,211,243,244,245,261,270,271,287]for d in [-1,0,1]if v+d>=0]});rows=[]
 for label,old,new in [('checked',0x64e20,checked),('unchecked',0x650e8,unchecked)]:
  for length in lengths:
   for valid in [False,True]:
    a=trace(o,old,length,valid,ORIGINS);b=trace(c,new['start'],length,valid,readers);assert a==b,(label,length,valid,a,b);rows.append({'kind':label,'input_length':length,'valid_discriminator':valid,**a})
 return {'candidate_sha256':hashlib.sha256(c.b).hexdigest(),'candidate_frontends':[checked,unchecked],'cases':rows,'scope':'Finite boundary-partition instruction interpretation to first decoder/error call. Confirms dispatch and pre-decoder slice consumption; does not execute deserializers or establish full frontend byte identity.'}
if __name__=='__main__':
 p=argparse.ArgumentParser();p.add_argument('--candidate',type=Path,required=True);p.add_argument('--symbols',type=Path,required=True);a=p.parse_args();print(json.dumps(compare(a.candidate,a.symbols),indent=2))
