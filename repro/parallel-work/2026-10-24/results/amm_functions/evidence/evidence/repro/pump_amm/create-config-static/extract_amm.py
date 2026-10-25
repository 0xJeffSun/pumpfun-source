from pathlib import Path
import json,re,struct,hashlib
ROOT=Path(__file__).resolve().parent;REPO=Path.cwd();b=(REPO/'evidence/original/pump_amm/deployed.so').read_bytes();s=struct.unpack_from('<Q',b,40)[0];z,n,k=struct.unpack_from('<HHH',b,58);hs=[struct.unpack_from('<IIQQQQIIQQ',b,s+i*z) for i in range(n)];h=hs[k];names=b[h[4]:h[4]+h[5]];ss={names[h[0]:].split(b'\0',1)[0].decode():h for h in hs};t=ss['.text'];lo,hi=t[4],t[4]+t[5];h=ss['.rel.dyn'];rels={struct.unpack_from('<QQ',b,i)[0]:struct.unpack_from('<QQ',b,i)[1]&0xffffffff for i in range(h[4],h[4]+h[5],16)};calls={};entries={lo}
for a in range(lo,hi,8):
 if b[a]==0x85 and b[a+1]==0x10 and rels.get(a)!=10:
  target=a+8+8*struct.unpack_from('<i',b,a+4)[0];calls[a]=target
  if lo<=target<hi:entries.add(target)
entries=sorted(entries)
asm={}
for line in (REPO/'work/disassembly/pump_amm.asm').read_text().splitlines():
 m=re.match(r'\s*([0-9a-f]+):\s*(?:[0-9a-f]{2} )+\s+(.+)',line)
 if m:asm[int(m[1],16)]=m[2]
def dump(name,start,end=None):
 end=end or next(x for x in entries if x>start);out=[]
 for at,mn in asm.items():
  if not start<=at<end:continue
  mn=re.sub(r' <[^>]*>','',mn)
  if at in calls:mn+=f' ; call {calls[at]:#x}'
  if b[at]&7==5 and b[at] not in [0x85,0x8d,0x95]:mn+=f' ; branch {at+8+8*struct.unpack_from("<h",b,at+2)[0]:#x}'
  if b[at]==0x18:
   ptr=struct.unpack_from('<I',b,at+4)[0]
   if hi<=ptr<len(b):mn+=' ; rodata '+repr(b[ptr:ptr+75])
  out.append(f'{at:06x}: {mn}')
 (ROOT/(name+'.asm')).write_text('\n'.join(out)+'\n');return (hex(start),hex(end),end-start)

selected={'body':0x16d88,'wrapper':0xe0bf8,'context':0x80fb8,'init_helper':0x82630,'lp_setter':0x61630,'protocol_setter':0x61898,'creator_setter':0x61b00,'recipients_setter':0x61d68,'event_serializer':0x83d38,'recipient_parser':0xd8f0}
rows={}
for name,start in selected.items():
 a,z,n=dump(name,start);rows[name]={'start':a,'end_inferred':z,'bytes':n,'sha256':hashlib.sha256((ROOT/(name+'.asm')).read_bytes()).hexdigest(),'direct_call_targets':sorted(set(t for c,t in calls.items() if start<=c<int(z,16)))}
(ROOT/'original-evidence.json').write_text(json.dumps({'original_sha256':hashlib.sha256(b).hexdigest(),'assembly_sha256':hashlib.sha256((REPO/'work/disassembly/pump_amm.asm').read_bytes()).hexdigest(),'note':'Read-only assembly excerpts. Function boundaries inferred from internal calls; absence of indirect-only entries is not assured.','excerpts':rows},indent=2)+'\n')
print(json.dumps(rows,indent=2))
