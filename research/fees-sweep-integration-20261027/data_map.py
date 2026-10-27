exec(open('/workspace/fees-recovery/measure.py').read().split('original=')[0])
import re,bisect,collections
W=Path('/workspace/fees-recovery');images=[(W/'accepted-symbols.so').read_bytes(),(W/'sweep-ordered-a/symbols.so').read_bytes()];paths=[W/'accepted-link.map',W/'sweep-ordered-a/link.map'];sections=[];layouts=[{s['name']:s for s in w.m.elf_layout(x)['sections']}for x in images];wins=[w.windows(x)for x in images];starts=[[r['address']for r in a]for a in wins];rels=[dict(w.m.relocations(x))for x in images]
for path in paths:
 rows=[]
 for line in path.read_text().splitlines():
  m=re.match(r'\s*([0-9a-f]+)\s+[0-9a-f]+\s+([0-9a-f]+)\s+\d+\s+(.+):\((\.data.rel.ro[^)]*)\)',line)
  if not m:continue
  at,size,origin,name=m.groups();origin=origin.split('/')[-1];ar=re.match(r'(.+)\((.+)\)$',origin);archive,member=ar.groups()if ar else(None,origin);provider=re.match(r'lib(.+)-[0-9a-f]+\.rlib',archive).group(1)if archive else'ROOT';rows.append(dict(address=int(at,16),bytes=int(size,16),archive=archive,member=member,provider=provider,section=name))
 sections.append(rows)

def key(i,row,depth=0):
 image=images[i];at=row['address'];raw=bytearray(w.m.at_address(image,at,row['bytes']));annotations=[]
 for address,kind in rels[i].items():
  if kind&0xffffffff!=8 or not at<=address<at+row['bytes']:continue
  target=int.from_bytes(w.m.at_address(image,address,8),'little')>>32;relative=address-at;raw[relative:relative+8]=bytes(8)
  if layouts[i]['.rodata']['address']<=target<layouts[i]['.rodata']['address']+layouts[i]['.rodata']['size']:dest=['rodata',target-layouts[i]['.rodata']['address']]
  elif layouts[i]['.text']['address']<=target<layouts[i]['.text']['address']+layouts[i]['.text']['size']:
   idx=bisect.bisect_right(starts[i],target)-1;dest=['code',idx,target-starts[i][idx]]
  else:
   hits=[r for r in sections[i]if r['address']<=target<r['address']+r['bytes']]
   if len(hits)==1 and depth<4:dest=['data',key(i,hits[0],depth+1),target-hits[0]['address']]
   else:dest=['unknown',target]
  annotations.append([relative,dest])
 return [raw.hex(),annotations]
records=[]
for old in sections[0]:
 wanted=key(0,old);hits=[new for new in sections[1]if new['provider']==old['provider']and key(1,new)==wanted]
 exact=[r for r in hits if r['section']==old['section']]
 if len(exact)==1:hits=exact
 records.append(dict(old=old,candidates=hits,status='mapped'if len(hits)==1 else'unresolved'))
(W/'data-bindings.json').write_text(json.dumps(records,indent=2)+'\n');print(collections.Counter(r['status']for r in records))
for r in records:
 if r['status']=='unresolved':print(r['old']['section'],r['old']['provider'],len(r['candidates']))
