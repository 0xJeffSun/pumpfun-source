from pathlib import Path
from collections import defaultdict,Counter
import hashlib,io,json,re
from elftools.elf.elffile import ELFFile
W=Path(__file__).resolve().parent;D=W/'link-capture';link=json.loads((D/'link.json').read_text());groups=defaultdict(list)
def dehash(s):return re.sub(r'17h[0-9a-f]{16}E','17hHASH',s)
def members(data):
 assert data[:8]==b'!<arch>\n';at=8;longnames=b''
 while at<len(data):
  h=data[at:at+60];size=int(h[48:58]);name=h[:16].decode().rstrip();body=data[at+60:at+60+size];at+=60+size+(size%2)
  if name=='//':longnames=body;continue
  if name=='/':continue
  if name.startswith('/') and name[1:].isdigit():name=longnames[int(name[1:]):].split(b'/\n',1)[0].decode()
  elif name.startswith('#1/'):
   n=int(name[3:]);name=body[:n].decode();body=body[n:]
  else:name=name.rstrip('/')
  yield name,body

def add(data,provider,archive,member):
 if not data.startswith(b'\x7fELF'):return
 for s in ELFFile(io.BytesIO(data)).iter_sections():
  if not s['sh_flags']&2 or not s['sh_size']:continue
  groups[provider,dehash(s.name)].append(dict(archive=archive,member=member,section=s.name,sha256=hashlib.sha256(s.data()).hexdigest(),bytes=s['sh_size']))
for path,digest in link['inputs'].items():
 p=Path(path);data=(D/p.name).read_bytes() if p.suffix=='.o' else p.read_bytes();assert hashlib.sha256(data).hexdigest()==digest
 if p.suffix=='.rlib':
  provider=re.match(r'lib(.+)-[0-9a-f]+\.rlib',p.name).group(1)
  for member,blob in members(data):add(blob,provider,p.name,member)
 else:add(data,'ROOT',None,p.name)
data_records=json.loads((W/'data-bindings.json').read_text())
data_lookup={(r['old']['provider'],r['old']['section']):r['candidates'][0]for r in data_records if r['status']=='mapped'}
output=[];records=[];used=set()
for line in (W/'source/ordered.ld').read_text().splitlines(True):
 m=re.match(r'\s+\*(.+)\("([^\"]*)"\)\s*$',line)
 if not m:output.append(line);continue
 origin,section=m.groups();ar=re.search(r'lib(.+?)-[0-9a-f]+\.rlib:',origin);provider=ar.group(1) if ar else 'ROOT';hits=groups[provider,dehash(section)];exact=[r for r in hits if r['section']==section]
 if len(exact)==1:hits=exact
 if len(hits)>1:
  exact_origin=[r for r in hits if (r['archive']+':'if r['archive']else'')+r['member']==origin]
  if len(exact_origin)==1:hits=exact_origin
 colors=json.loads((W/'color-bindings.json').read_text())['resolved']
 if len(hits)>1 and section in colors:hits=[r for r in hits if r['section']==colors[section]]
 if (provider,section)in data_lookup:
  wanted=data_lookup[provider,section];hits=[r for r in groups[provider,dehash(wanted['section'])]if r['section']==wanted['section']and r['archive']==wanted['archive']and r['member']==wanted['member']]
 record=dict(origin=origin,section=section,candidates=len(hits))
 if len(hits)==1:
  r=hits[0];ident=(r['archive'],r['member'],r['section']);assert ident not in used;used.add(ident);selector=(r['archive']+':'if r['archive']else'')+r['member'];output.append('    *'+selector+'("'+r['section']+'")\n');record.update(status='mapped',current=r)
 else:record['status']='unresolved';record['hits']=hits
 records.append(record)
(W/'rebound.ld').write_text(''.join(output));(W/'layout-bindings.json').write_text(json.dumps(dict(counts=dict(Counter(r['status']for r in records)),records=records),indent=2)+'\n');print(Counter(r['status']for r in records))
