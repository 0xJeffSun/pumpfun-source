"""Small static eBPF decoder for retained windows; never executes code."""
import struct

def decode(data,start):
 out=[];i=0
 while i<len(data):
  op,regs,off,imm=struct.unpack_from('<BBhi',data,i);dst=regs&15;src=regs>>4;pc=start+i;n=8
  text=f'op=0x{op:02x} dst=r{dst} src=r{src} off={off} imm={imm}'
  if op==0x18:
   val=(imm&0xffffffff)|(struct.unpack_from('<I',data,i+12)[0]<<32);text=f'lddw r{dst}, 0x{val:x}';n=16
  elif op in [0x61,0x69,0x71,0x79]:text=f'load{ {0x61:32,0x69:16,0x71:8,0x79:64}[op]} r{dst}, [r{src}{off:+#x}]'
  elif op in [0x62,0x6a,0x72,0x7a,0x63,0x6b,0x73,0x7b]:text=f'store{ {0:32,8:16,16:8,24:64}[op&0x18]} [r{dst}{off:+#x}], '+(f'r{src}' if op&1 else str(imm))
  elif op==0x85:text=('call relocation placeholder (target unresolved)' if imm==-1 else f'call 0x{pc+8+imm*8:x} (src={src})')
  elif op==0x8d:text=f'callx r{imm}'
  elif op==0x95:text='exit'
  elif op&7 in [4,7]:
   names={0:'add',16:'sub',32:'mul',48:'div',64:'or',80:'and',96:'lsh',112:'rsh',128:'neg',144:'mod',160:'xor',176:'mov',192:'arsh',208:'end'}
   text=f'{names.get(op&240,"?")}{64 if op&7==7 else 32} r{dst}, '+(f'r{src}' if op&8 else str(imm))
  elif op&7 in [5,6]:
   names={0:'ja',16:'jeq',32:'jgt',48:'jge',64:'jset',80:'jne',96:'jsgt',112:'jsge',160:'jlt',176:'jle',192:'jslt',208:'jsle'}
   text=f'{names.get(op&240,"?")} r{dst}, '+(f'r{src}' if op&8 else str(imm))+f', 0x{pc+8+off*8:x}'
  out.append(f'{pc:06x}: {data[i:i+n].hex()}  {text}');i+=n
 return '\n'.join(out)+'\n'
