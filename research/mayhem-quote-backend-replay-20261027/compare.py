from pathlib import Path
import difflib,gzip,hashlib,json,struct
P=Path(__file__).resolve().parent

def read(p):
 b=gzip.decompress(p.read_bytes()) if p.suffix=='.gz' else p.read_bytes();assert b[:6]==b'\x7fELF\x02\x01';typ=struct.unpack_from('<H',b,16)[0];at=struct.unpack_from('<Q',b,40)[0];sz,n,si=struct.unpack_from('<HHH',b,58);h=[struct.unpack_from('<IIQQQQIIQQ',b,at+i*sz)for i in range(n)];st=b[h[si][4]:h[si][4]+h[si][5]];sections=[]
 for x in h:sections.append({'name':st[x[0]:].split(b'\0')[0].decode(),'type':x[1],'flags':x[2],'addr':x[3],'off':x[4],'size':x[5],'link':x[6],'info':x[7],'entsize':x[9]})
 syms=[]
 for x in sections:
  if x['type']not in [2,11]:continue
  z=sections[x['link']];strings=b[z['off']:z['off']+z['size']]
  for off in range(x['off'],x['off']+x['size'],x['entsize']):
   name,info,other,sec,val,size=struct.unpack_from('<IBBHQQ',b,off)
   if info&15==2 and size:syms.append({'name':strings[name:].split(b'\0')[0].decode(),'sec':sec,'value':val,'size':size})
 reloc=[]
 for x in sections:
  if x['type']not in [4,9]:continue
  for off in range(x['off'],x['off']+x['size'],x['entsize']):
   target,info=struct.unpack_from('<QQ',b,off);reloc.append((x['info'],target,info&0xffffffff))
 return b,typ,sections,syms,reloc

def code(path,needle=None,start=None,size=None):
 b,typ,s,syms,rel=read(path)
 if needle:
  f=[x for x in syms if needle in x['name']];assert len(f)==1,f;f=f[0];sec=s[f['sec']];start=f['value'];size=f['size'];off=sec['off']+start-(0 if typ==1 else sec['addr']);section=f['sec']
 else:
  sec=next(x for x in s if x['name']=='.text');off=sec['off']+start-sec['addr'];section=s.index(sec)
 raw=bytearray(b[off:off+size]);rd={a-(start if typ==1 else start):t for si,a,t in rel if (typ!=1 or si==section) and start<=a<start+size};i=0
 while i<len(raw):
  op=raw[i]
  if op==0x85:raw[i+4:i+8]=bytes(4)
  if op==0x18:
   if rd.get(i)in [1,8]:raw[i+4:i+8]=bytes(4);raw[i+12:i+16]=bytes(4)
   i+=16
  else:i+=8
 return bytes(raw)
def compare(root, packet=P):
 original=root/'evidence/original/mayhem/deployed.so'
 a=code(original,start=186552,size=1120);rows=[]
 for label,path in [('llvm152',packet/'outputs/v152.o.gz'),('llvm154',packet/'outputs/v154.o.gz'),('rustc',packet/'reference/rustc-symbols.so.gz')]:
  b=code(path,'10sell_quote17');aa=[a[i:i+8]for i in range(0,len(a),8)];bb=[b[i:i+8]for i in range(0,len(b),8)];rows.append({'label':label,'bytes':len(b),'diagnostic_sha256':hashlib.sha256(b).hexdigest(),'original_diagnostic_equal':a==b,'same_position_slots':sum(x==y for x,y in zip(aa,bb)),'aligned_slots':sum(x.size for x in difflib.SequenceMatcher(a=aa,b=bb,autojunk=False).get_matching_blocks())})
 return rows
