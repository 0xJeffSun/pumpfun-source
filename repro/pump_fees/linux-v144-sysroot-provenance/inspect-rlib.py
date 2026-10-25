from pathlib import Path
import json,struct,hashlib
W=Path('work/linux-v144-provenance');inputs=json.loads((W/'stdlib-path-comparison.json').read_text());sha=lambda b:hashlib.sha256(b).hexdigest()
def members(b):
 assert b.startswith(b'!<arch>\n');at=8;table=b'';out=[]
 while at<len(b):
  h=b[at:at+60];assert len(h)==60 and h[58:]==b'`\n';name=h[:16].decode().strip();size=int(h[48:58]);data=b[at+60:at+60+size];assert len(data)==size;at+=60+size+(size%2)
  if name=='//':table=data;continue
  if name.startswith('#1/'):
   n=int(name[3:]);name=data[:n].rstrip(b'\0').decode();data=data[n:]
  elif name.startswith('/') and name[1:].isdigit():name=table[int(name[1:]):].split(b'/\n',1)[0].decode()
  else:name=name.rstrip('/')
  row={'name':name,'bytes':len(data),'sha256':sha(data)}
  if data[:6]==b'\x7fELF\x02\x01':
   off=struct.unpack_from('<Q',data,40)[0];size,count,idx=struct.unpack_from('<HHH',data,58);assert size==64;ss=[struct.unpack_from('<IIQQQQIIQQ',data,off+i*size) for i in range(count)];st=ss[idx];names=data[st[4]:st[4]+st[5]];sections=[]
   for s in ss:
    name=names[s[0]:].split(b'\0',1)[0].decode();typ=s[1]
    if name and typ!=8:sections.append({'name':name,'type':typ,'flags':s[2],'bytes':s[5],'sha256':sha(data[s[4]:s[4]+s[5]])})
   row['machine']=struct.unpack_from('<H',data,18)[0];row['sections']=sections
  out.append(row)
 return out
rows=[]
for i in inputs:
 if i['host'] in ['linux','darwin']:
  p=Path(i['path']);b=p.read_bytes();assert sha(b)==i['sha256'];rows.append({'host':i['host'],'path':str(p),'sha256':sha(b),'members':members(b)})
(W/'rlib-members.json').write_text(json.dumps(rows,indent=2)+'\n')
for r in rows:print(r['host'],Path(r['path']).name,[(m['name'],m.get('machine'),len(m.get('sections',[]))) for m in r['members'] if 'sections' in m][:3])
