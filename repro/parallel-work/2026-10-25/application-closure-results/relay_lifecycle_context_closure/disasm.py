import struct,json
from pathlib import Path
P=Path(__file__).resolve().parent
B=(P/'inputs/deployed.so').read_bytes()
W=json.loads((P/'inputs/prior-windows.json').read_text())
EXTERNAL={c['pc']:c for w in W for c in w['external_calls']}
def instructions(a,z):
 while a<z:
  op,r,off,imm=struct.unpack_from('<BBhi',B,a);d=r&15;s=r>>4;n=8;src=f'r{s}' if op&8 else str(imm)
  if op==24:n=16;t=f'r{d} = {struct.unpack_from("<I",B,a+4)[0]+(struct.unpack_from("<I",B,a+12)[0]<<32)} (lddw)'
  elif op==133:t=('external '+str(EXTERNAL[a].get('relocation')) if a in EXTERNAL else 'call '+str(a+8+imm*8))
  elif op==149:t='exit'
  elif op==141:t='callx '+str(imm)
  elif op&7 in (4,7):
   name={0:'+=',16:'-=',32:'*=',48:'/=',64:'|=',80:'&=',96:'<<=',112:'>>=',128:'neg',144:'%=',160:'^=',176:'=',192:'s>>=',208:'endian'}.get(op&240,'?');t=f'r{d} {name} {src}'+(' (32)' if op&7==4 else '')
  elif op&7 in (5,6):
   name={0:'goto',16:'==',32:'>',48:'>=',64:'&',80:'!=',96:'s>',112:'s>=',160:'<',176:'<=',192:'s<',208:'s<='}.get(op&240,'?');t=f'if r{d} {name} {src} -> {a+8+off*8}' if op&240 else f'goto {a+8+off*8}'
  elif op&7==1:t=f'r{d} = u{ {0:32,8:16,16:8,24:64}[op&24]}[r{s}{off:+}]'
  elif op&7 in (2,3):t=f'u{ {0:32,8:16,16:8,24:64}[op&24]}[r{d}{off:+}] = '+(f'r{s}' if op&7==3 else str(imm))
  else:t=f'unknown {op}'
  yield a,B[a:a+n].hex(),t
  a+=n
def render(o):
 w=W[o];return '\n'.join(f'{p}: {raw:<32} {t}' for p,raw,t in instructions(w['start'],w['end']))+'\n'
if __name__=='__main__':
 import sys
 for o in map(int,sys.argv[1:]):print(render(o))
