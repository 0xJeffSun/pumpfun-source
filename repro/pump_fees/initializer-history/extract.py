#!/usr/bin/env python3
from pathlib import Path
import hashlib,json,re,struct,os
ROOT=Path(__file__).resolve().parent; REPO=next(p for p in ROOT.parents if (p/'evidence/original').exists())
b=(REPO/'evidence/original/pump_fees/deployed.so').read_bytes(); off=struct.unpack_from('<Q',b,40)[0];size,count,ni=struct.unpack_from('<HHH',b,58);raw=[struct.unpack_from('<IIQQQQIIQQ',b,off+i*size) for i in range(count)];st=raw[ni];names=b[st[4]:st[4]+st[5]];secs={names[s[0]:].split(b'\0',1)[0].decode():s for s in raw}; lo=secs['.text'][4]; hi=lo+secs['.text'][5]; symbols={}; s=secs['.dynsym']; st=raw[s[6]]; strings=b[st[4]:st[4]+st[5]]
for i,p in enumerate(range(s[4],s[4]+s[5],24)):
 n=struct.unpack_from('<I',b,p)[0];symbols[i]=strings[n:].split(b'\0',1)[0].decode()
rels={};s=secs['.rel.dyn']
for p in range(s[4],s[4]+s[5],16):
 at,info=struct.unpack_from('<QQ',b,p);rels[at]={'type':info&0xffffffff,'symbol':symbols.get(info>>32)}
calls={};entries={struct.unpack_from('<Q',b,24)[0]}
for at in range(lo,hi,8):
 if b[at]==0x85 and b[at+1]==0x10 and rels.get(at,{}).get('type')!=10:
  t=at+8+8*struct.unpack_from('<i',b,at+4)[0];calls[at]=t
  if lo<=t<hi:entries.add(t)
entries=sorted(entries)
full_asm=REPO/'work/disassembly/pump_fees.asm'
if full_asm.exists() and os.environ.get("FEES_INIT_BUNDLED_ASM")!="1":asm=full_asm.read_text().splitlines()
else:
 # The bundled selected excerpts retain raw disassembler bytes/mnemonics.
 # Verify their instruction bytes against the immutable original first.
 asm=[]
 for path in sorted(ROOT.glob('*.asm')):
  for line in path.read_text().splitlines():
   base=line.split(' ; ')[0];m=re.match(r'\s*([0-9a-f]+):\s*((?:[0-9a-f]{2} )+)',base)
   if m:
    at=int(m[1],16);raw=bytes.fromhex(m[2]);assert b[at:at+len(raw)]==raw
    asm.append(base)
 asm=sorted(set(asm),key=lambda line:int(re.match(r'\s*([0-9a-f]+):',line)[1],16))

def end(start):return next((x for x in entries if x>start),hi)
def dump(name,start,stop=None):
 stop=stop or end(start);lines=[]
 for line in asm:
  m=re.match(r'\s*([0-9a-f]+):',line)
  if not m:continue
  at=int(m[1],16)
  if not start<=at<stop:continue
  if rels.get(at,{}).get('type')==10:line+=' ; external '+str(rels[at]['symbol'])
  elif at in calls:line+=f' ; target {calls[at]:#x}'
  op=b[at]
  if op==0x18:
   ptr=struct.unpack_from('<I',b,at+4)[0]
   if hi<=ptr<len(b):
    raw=b[ptr:ptr+110].split(b'\0',1)[0];raw=raw[:next((i for i,c in enumerate(raw) if not 32<=c<127),len(raw))]
    if raw:line+=' ; data '+repr(raw.decode())
  if op&7==5 and op not in (0x85,0x95,0x8d):line+=f' ; branch {at+8+struct.unpack_from("<h",b,at+2)[0]*8:#x}'
  lines.append(line)
 (ROOT/(name+'.asm')).write_text('\n'.join(lines)+'\n')
 return {'start':start,'end_inferred':stop,'bytes':stop-start,'sha256':hashlib.sha256(b[start:stop]).hexdigest(),'calls':[{'at':p,'target':t,'target_end_inferred':end(t)} for p,t in calls.items() if start<=p<stop]}
if __name__=='__main__':
 import sys
 starts={'wrapper':0x96b90}
 if len(sys.argv)>1:starts={f'function-{x}':int(x,16) for x in sys.argv[1:]}
 result={n:dump(n,s) for n,s in starts.items()};print(json.dumps(result,indent=2));(ROOT/'last-extraction.json').write_text(json.dumps(result,indent=2)+'\n')
