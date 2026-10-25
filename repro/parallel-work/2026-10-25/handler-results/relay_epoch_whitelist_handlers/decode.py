import json,struct,pathlib,sys
BASE=pathlib.Path(__file__).resolve().parent
b=(BASE/'inputs/deployed.so').read_bytes();w=json.load(open(BASE/'inputs/windows.json'))
def decode(n):
 r=w[n];p=r['start'];out=[f"WINDOW {n} [{p},{r['end']})"]
 while p<r['end']:
  op,reg,off,imm=struct.unpack_from('<BBhi',b,p);d=reg&15;s=reg>>4;v=f'op{op:02x} r{d} r{s} {off} {imm}'
  if op==24:
   val=struct.unpack_from('<I',b,p+4)[0]+(struct.unpack_from('<I',b,p+12)[0]<<32);v=f'r{d} = 0x{val:x} ({val})';out.append(f'{p}: {v}');p+=16;continue
  if op&7 in [4,7]:
   a={0:'+=',0x10:'-=',0x20:'*=',0x30:'/=',0x40:'|=',0x50:'&=',0x60:'<<=',0x70:'>>=',0x80:'neg',0x90:'%=',0xa0:'^=',0xb0:'=',0xc0:'s>>='}.get(op&0xf0,'?');v=f'r{d} {a} '+(f'r{s}' if op&8 else str(imm))+(' [32]' if op&7==4 else '')
  elif op&7 in [1,2,3]:
   size={0:32,8:16,16:8,24:64}[op&24]
   v=f'r{d} = u{size}[r{s}{off:+}]' if op&7==1 else f'u{size}[r{d}{off:+}] = '+(f'r{s}' if op&7==3 else str(imm))
  elif op==133:
   t=p+8+imm*8;own=next((x['ordinal'] for x in w if x['start']==t),None);external=next((x for x in r['external_calls'] if x['pc']==p),None)
   v=('external '+str(external.get('relocation')) if external else f'call {t} window {own}')
  elif op==149:v='exit'
  elif op==141:v=f'callx r{imm}'
  elif op&7 in [5,6]:
   cmp={0:'jump',0x10:'==',0x20:'>',0x30:'>=',0x40:'&',0x50:'!=',0x60:'s>',0x70:'s>=',0xa0:'<',0xb0:'<=',0xc0:'s<',0xd0:'s<='}.get(op&0xf0,'?');v=f'if r{d} {cmp} '+(f'r{s}' if op&8 else str(imm))+f' -> {p+8+off*8}'
  out.append(f'{p}: {v}');p+=8
 return '\n'.join(out)+'\n'
if __name__ == '__main__':
 for n in map(int,sys.argv[1:]):
  (BASE/f'window-{n}.txt').write_text(decode(n))
  print(decode(n))
