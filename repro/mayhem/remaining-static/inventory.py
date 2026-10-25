#!/usr/bin/env python3
from pathlib import Path
import gzip,hashlib,json,re,struct
ROOT=Path(__file__).resolve().parent;REPO=next(p for p in ROOT.parents if (p/'evidence/original/mayhem/deployed.so').is_file());binary=REPO/'evidence/original/mayhem/deployed.so';b=binary.read_bytes();dispatch=json.loads((ROOT/'inputs/dispatch-map.json').read_text())['mayhem']['instructions'];implemented=set(json.loads((ROOT/'inputs/status.json').read_text())['mayhem']['implemented_handlers']);shoff=struct.unpack_from('<Q',b,40)[0];ent,count,ni=struct.unpack_from('<HHH',b,58);hs=[struct.unpack_from('<IIQQQQIIQQ',b,shoff+i*ent) for i in range(count)];st=hs[ni];names=b[st[4]:st[4]+st[5]];ss={names[h[0]:].split(b'\0',1)[0].decode():h for h in hs};txt=ss['.text'];lo,hi=txt[4],txt[4]+txt[5];rels={};sym=ss['.dynsym'];strings=hs[sym[6]];strings=b[strings[4]:strings[4]+strings[5]];symbols={}
for i,p in enumerate(range(sym[4],sym[4]+sym[5],24)):
 n=struct.unpack_from('<I',b,p)[0];symbols[i]=strings[n:].split(b'\0',1)[0].decode()
s=ss['.rel.dyn']
for i in range(s[4],s[4]+s[5],16):
 at,info=struct.unpack_from('<QQ',b,i);rels[at]={'type':info&0xffffffff,'symbol':symbols.get(info>>32)}
wraps={n:v['matches'][0]['first_direct_calls'][0]['target'] for n,v in dispatch.items()};entries=set(wraps.values());entries.add(struct.unpack_from('<Q',b,24)[0]);calls={}
for pos in range(lo,hi,8):
 if b[pos]==0x85 and b[pos+1]==0x10 and not (pos in rels and rels[pos]['type']==10):
  target=pos+8+8*struct.unpack_from('<i',b,pos+4)[0];calls[pos]=target
  if lo<=target<hi:entries.add(target)
entries=sorted(entries);out={}
for n in sorted(set(dispatch)-implemented):
 start=wraps[n];end=next((x for x in entries if x>start),hi)
 out[n]={'discriminator':dispatch[n]['discriminator'],'wrapper_start':start,'wrapper_end_inferred':end,'direct_calls':[{'at':p,'target':t,'target_end_inferred':next((x for x in entries if x>t),hi)} for p,t in calls.items() if start<=p<end]}
(ROOT/'remaining-dispatch.json').write_text(json.dumps(out,indent=2)+'\n');(ROOT/'input-hashes.json').write_text(json.dumps({str(p.relative_to(REPO)):hashlib.sha256(p.read_bytes()).hexdigest() for p in [binary,ROOT/'inputs/mayhem-lib.rs',ROOT/'inputs/status.json',ROOT/'inputs/dispatch-map.json',ROOT/'inputs/disassembly-excerpts.asm.gz']},indent=2)+'\n')
asm=gzip.decompress((ROOT/'inputs/disassembly-excerpts.asm.gz').read_bytes()).decode().splitlines()
for line in asm:
 m=re.match(r'\s*([0-9a-f]+):\s*((?:[0-9a-f]{2} )+)',line)
 assert m, ('Unrecognized disassembly line',line)
 at=int(m[1],16);raw=bytes.fromhex(m[2])
 assert b[at:at+len(raw)]==raw, ('Disassembly does not match captured ELF',hex(at))
def dump(label,start,end):
 lines=[]
 for line in asm:
  m=re.match(r'\s*([0-9a-f]+):',line)
  if not m:continue
  at=int(m[1],16)
  if not start<=at<end:continue
  if at in rels and rels[at]['type']==10:line+=' ; external '+str(rels[at]['symbol'])
  elif at in calls:line+=f' ; target {calls[at]:#x}'
  if b[at]==0x18:
   ptr=struct.unpack_from('<I',b,at+4)[0]
   if hi<=ptr<len(b):
    raw=b[ptr:ptr+110].split(b'\0',1)[0]
    if raw and all(32<=v<127 for v in raw):line+=' ; data '+repr(raw.decode())
  lines.append(line)
 (ROOT/(label+'.asm')).write_text('\n'.join(lines)+'\n')
for n,v in out.items():
 if n!='initialize_mayhem_state':dump(n+'-wrapper',v['wrapper_start'],v['wrapper_end_inferred'])
for n,v in out.items():
 if n not in ['burn_tokens','initialize_mayhem_state']:
  c=v['direct_calls'][2];dump(n+'-accounts',c['target'],c['target_end_inferred'])
for label,start in [('burn-accounts',0x38670),('burn-handler',0xd898),('burn-exit',0x3afb8),('burn-cpi-helper',0x90bc0),('clock-helper',0x9efd0),('burn-instruction-helper',0x93510),('first-trade-account-helper',0xa030),('signer-validation-helper',0x976d8),('burn-mayhem-state-helper',0xa138)]:dump(label,start,next(x for x in entries if x>start))
print(json.dumps(out,indent=2))
