"""Retained archive/object symbol inspection, no executable/metadata transformation."""
from pathlib import Path
import hashlib,json,struct
P=Path(__file__).resolve().parent
H=lambda b:hashlib.sha256(b).hexdigest()
def members(b):
 assert b[:8]==b'!<arch>\n';at=8;strings=b'';out=[]
 while at+60<=len(b):
  hdr=b[at:at+60];assert hdr[58:60]==b'`\n';size=int(hdr[48:58]);name=hdr[:16].decode().strip();data=b[at+60:at+60+size]
  if name=='//':strings=data
  elif name.startswith('#1/'):
   n=int(name[3:]);name=data[:n].rstrip(b'\0').decode();data=data[n:]
  elif name.startswith('/') and name[1:].isdigit():name=strings[int(name[1:]):].split(b'/\n',1)[0].decode()
  else:name=name.removesuffix('/')
  out.append((name,data));at+=60+size+(size%2)
 return out

def elf(b):
 assert b[:6]==b'\x7fELF\x02\x01';offset=struct.unpack_from('<Q',b,40)[0];step,count,names=struct.unpack_from('<HHH',b,58);sections=[]
 for i in range(count):
  v=struct.unpack_from('<IIQQQQIIQQ',b,offset+i*step);sections.append(dict(zip(['name_offset','type','flags','addr','offset','size','link','info','align','entsize'],v),index=i))
 def string(data,at):return data[at:].split(b'\0',1)[0].decode('utf8','replace')
 n=sections[names];strings=b[n['offset']:n['offset']+n['size']]
 for s in sections:s['name']=string(strings,s['name_offset'])
 symbols=[];tables={}
 for s in sections:
  if s['type'] not in(2,11):continue
  st=sections[s['link']];strings=b[st['offset']:st['offset']+st['size']];rows=[]
  for at in range(s['offset'],s['offset']+s['size'],s['entsize'] or 24):
   no,info,other,index,value,size=struct.unpack_from('<IBBHQQ',b,at);r=dict(index=len(rows),name=string(strings,no),info=info,section=index,value=value,size=size);rows.append(r);symbols.append(r)
  tables[s['index']]=rows
 relocations=[]
 for s in sections:
  if s['type'] not in(4,9):continue
  for at in range(s['offset'],s['offset']+s['size'],s['entsize'] or(24 if s['type']==4 else 16)):
   off,info=struct.unpack_from('<QQ',b,at);sym=tables[s['link']][info>>32];relocations.append(dict(relocation_section=s['name'],target_section=s['info'],offset=off,type=info&0xffffffff,symbol=sym['name'],addend=struct.unpack_from('<q',b,at+16)[0] if s['type']==4 else None))
 return sections,symbols,relocations

if __name__=='__main__':
 R=next(p for p in P.parents if (p/'evidence/dependencies/associated_token/deployed.so').is_file())
 out={}
 paths={'linux5':R/'repro/pump/dependency-exactness/ata-candidate-build-5/libspl_token_2022.rlib','native':Path('/Users/shawwalters/Documents/Codex/2026-10-24/pumpfun-source/work/pump-recovery/ata-native-build-isolated/target/bpfel-unknown-unknown/release/deps/libspl_token_2022.rlib')}
 for label,path in paths.items():
  archive=path.read_bytes();objs=[(n,b) for n,b in members(archive) if b[:4]==b'\x7fELF'];assert len(objs)==1;name,b=objs[0];(P/(label+'-token2022.o')).write_bytes(b);ss,syms,rel=elf(b);functions=[]
  for s in syms:
   if 'reserve_for_push' not in s['name'] or s['info']&15!=2 or not s['size']:continue
   section=ss[s['section']];off=section['offset']+s['value']-section['addr'];raw=b[off:off+s['size']];relo=[r for r in rel if r['target_section']==s['section'] and s['value']<=r['offset']<s['value']+s['size']]
   functions.append({'symbol':s['name'],'section':section['name'],'section_index':s['section'],'section_value':s['value'],'object_file_offset':off,'bytes':s['size'],'raw_sha256':H(raw),'raw':raw.hex(),'relocations':relo})
  out[label]={'archive_source':str(path),'archive_bytes':len(archive),'archive_sha256':H(archive),'object_member':name,'object_sha256':H(b),'object_bytes':len(b),'functions':functions}
 (P/'archive-witnesses.json').write_text(json.dumps(out,indent=2)+'\n');print(json.dumps({k:{'object':v['object_member'],'functions':[(f['symbol'],f['bytes'],f['section_value']) for f in v['functions']]} for k,v in out.items()},indent=2))
