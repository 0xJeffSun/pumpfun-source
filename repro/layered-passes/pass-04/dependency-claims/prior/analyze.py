#!/usr/bin/env python3
"""Offline static derivation. Never invokes a compiler or target, never writes binaries."""
from pathlib import Path
import collections,hashlib,json,struct,tarfile
P=Path(__file__).resolve().parent
H=lambda b:hashlib.sha256(b).hexdigest()
def read(n):return (P/n).read_bytes()
def js(n):return json.loads(read(n))
def elf(b):
 assert b[:6]==b'\x7fELF\x02\x01'
 off=struct.unpack_from('<Q',b,40)[0];sz,num,ni=struct.unpack_from('<HHH',b,58)
 rows=[struct.unpack_from('<IIQQQQIIQQ',b,off+i*sz) for i in range(num)]
 names=b[rows[ni][4]:rows[ni][4]+rows[ni][5]]
 secs=[]
 for i,s in enumerate(rows):secs.append(dict(index=i,name=names[s[0]:].split(b'\0')[0].decode(),type=s[1],flags=s[2],addr=s[3],offset=s[4],size=s[5],link=s[6],entsize=s[9]))
 syms=[]
 for sec in secs:
  if sec['type'] not in [2,11]:continue
  st=secs[sec['link']];strings=b[st['offset']:st['offset']+st['size']]
  for j,at in enumerate(range(sec['offset'],sec['offset']+sec['size'],sec['entsize'])):
   name,info,other,idx,val,size=struct.unpack_from('<IBBHQQ',b,at)
   syms.append(dict(table=sec['name'],ordinal=j,name=strings[name:].split(b'\0')[0].decode(),type=info&15,section=idx,value=val,size=size))
 return secs,syms
def payload(b,s):return b[s['offset']:s['offset']+s['size']]
def ranges(a,b):
 out=[];start=None
 for i in range(min(len(a),len(b))):
  if a[i]!=b[i] and start is None:start=i
  if a[i]==b[i] and start is not None:out.append([start,i]);start=None
 if start is not None:out.append([start,min(len(a),len(b))])
 return out
def compare(a,b):
 rs=ranges(a,b);secs,_=elf(a)
 return {'original_bytes':len(a),'candidate_bytes':len(b),'original_sha256':H(a),'candidate_sha256':H(b),'raw_equal':a==b,'common_extent_changed':sum(y-x for x,y in rs),'absent_bytes':abs(len(a)-len(b)),'runs':[dict(range=[x,y],original=a[x:y].hex(),candidate=b[x:y].hex()) for x,y in rs],'sections':[dict(name=s['name'],range=[s['offset'],s['offset']+s['size']],changed=sum(a[i]!=b[i] for i in range(s['offset'],min(s['offset']+s['size'],len(b))))) for s in secs if s['type']!=8]}
def ar(b):
 assert b.startswith(b'!<arch>\n');off=8;table=b'';out=[]
 while off<len(b):
  h=b[off:off+60];assert h[58:]==b'`\n';size=int(h[48:58]);name=h[:16].decode().strip();body=b[off+60:off+60+size]
  if name=='//':table=body
  elif name.startswith('/') and name[1:].isdigit():name=table[int(name[1:]):].split(b'/\n')[0].decode()
  elif name.endswith('/') and name!='/':name=name[:-1]
  out.append((name,off+60,body));off+=60+size+size%2
 assert off==len(b);return out
def named_functions(b,word):
 secs,syms=elf(b);out=[]
 for s in syms:
  if s['type']==2 and word in s['name'] and s['section']<len(secs):
   sec=secs[s['section']];at=sec['offset']+s['value']-sec['addr'];code=b[at:at+s['size']]
   out.append({**s,'file_offset':at,'code_sha256':H(code),'first_32_bytes':code[:32].hex()})
 return out
def fingerprints(b):
 secs,syms=elf(b)
 needles=[b'library/alloc/src/raw_vec.rs',b'/home/runner/work/platform-tools/platform-tools/out/rust/library/std/src/io/impls.rs',b'/home/runner/.cargo/registry/src/github.com-1ecc6299db9ec823/hashbrown-0.12.3/src/raw/mod.rs']
 out=[]
 for n in needles:
  at=0
  while True:
   at=b.find(n,at)
   if at<0:break
   out.append(dict(literal=n.decode(),range=[at,at+len(n)],hex=n.hex()));at+=len(n)
 return dict(sections=[s['name'] for s in secs],exported_functions=[s for s in syms if s['type']==2],literal_samples=out,limit='Literal bytes and symbol names do not uniquely identify historical compiler, crate ownership or source declarations.')
def derive():
 a=read('inputs/ata/original.so');cs=[read(f'inputs/ata/build{i}/spl_associated_token_account.so') for i in range(1,6)]
 pairs=[compare(a,c) for c in cs];assert [p['common_extent_changed'] for p in pairs]==[1199,307,1506,307,1506]
 assert cs[1]==cs[3] and cs[2]==cs[4]
 assert cs[1][28592:29384]==cs[4][28592:29384]
 al=js('inputs/ata/baseline/residual-ledger.json')
 invs={'original':a,**{f'candidate{i}':c for i,c in enumerate(cs,1)}}
 for key,b in invs.items():
  inv=al['inventories'][key]
  for w in inv['windows']:
   x,y=w['range'];assert H(b[x:y])==w['sha256']
  for c in inv['calls']:
   pc=c['pc'];assert b[pc:pc+8].hex()==c['raw']
   if c['kind']=='internal-direct':assert pc+8+8*struct.unpack_from('<i',b,pc+4)[0]==c['target']
 def mapping(x):return x+352 if 28592<=x<29032 else x-440 if 29032<=x<29384 else x
 for row in al['best_window_correspondence']:
  for c in row['calls']:
   if c['original']['kind']=='internal-direct':assert mapping(c['original']['target'])==c['candidate']['target']
 archive=[]
 for name,off,b in ar(read('inputs/ata/build5/libspl_token_2022.rlib')):
  archive.append(dict(member=name,offset=off,bytes=len(b),sha256=H(b),functions=named_functions(b,'reserve_for_push') if b.startswith(b'\x7fELF') else []))
 un=read('inputs/ata/build5/unstripped.so');us,_=elf(un);ss,_=elf(cs[4]);su={x['name']:x for x in us}
 alloc=[dict(name=s['name'],equal=payload(un,su[s['name']])==payload(cs[4],s)) for s in ss if s['flags']&2 and s['type']!=8 and s['name'] in su]
 m=read('inputs/metaplex/original.so');c=read('inputs/metaplex/build11/token_metadata.so');pad=read('inputs/metaplex/build11/rebuilt.deployed.so')
 mp=compare(m,c);pp=compare(m,pad);assert mp['common_extent_changed']==pp['common_extent_changed']==1509
 assert m[len(c):]==bytes(86543) and pad[:len(c)]==c and pad[len(c):]==m[len(c):]
 ws=js('inputs/metaplex/baseline/windows.json');assert len(ws)==1251
 for w in ws:
  for side,b in [('original',m),('candidate',c)]:
   x,y=w[side]['range'];assert H(b[x:y])==w[side]['sha256']
   for call in w[side]['calls']:
    pc=call['site'];assert b[pc:pc+8].hex()==call['raw']
    if call['kind']=='signed_relative':assert pc+8+8*struct.unpack_from('<i',b,pc+4)[0]==call['target']
 for w in ws:
  x,y=w['original']['range'];u,v=w['candidate']['range']
  assert w['raw_equal']==(m[x:y]==c[u:v])
 assert sum(w['raw_equal'] for w in ws)==1250
 diag=[]
 for r in js('inputs/metaplex/baseline/source-attribution.json'):
  d=r['coordinate'];x,y=d['record_range'];ob=m[x:y];cb=c[x:y]
  assert ob[:16]==cb[:16]
  ol,oc=struct.unpack_from('<II',ob,16);cl,cc=struct.unpack_from('<II',cb,16)
  assert (ol,oc,cl,cc)==(d['original_line'],d['original_column'],d['candidate_line'],d['candidate_column'])
  ptr=struct.unpack_from('<Q',ob)[0]>>32;ln=struct.unpack_from('<Q',ob,8)[0]
  assert m[ptr:ptr+ln].decode()==d['file']
  diag.append({**d,'original_hex':ob.hex(),'candidate_hex':cb.hex(),'line_delta':ol-cl,'column_delta':oc-cc,'filename_range':[ptr,ptr+ln]})
 assert sum(x!=y for d in diag for x,y in zip(bytes.fromhex(d['original_hex']),bytes.fromhex(d['candidate_hex'])))==30
 groups={}
 for d in diag:groups.setdefault(d['file'],[]).append(d)
 groups=[dict(file=f,records=len(ds),line_deltas=sorted(set(d['line_delta'] for d in ds)),column_deltas=sorted(set(d['column_delta'] for d in ds))) for f,ds in groups.items()]
 archives={}
 manifest=js('inputs/metaplex/build11/source-manifest.json')
 for n in ['source-snapshot.tar.gz','static-evidence.tar.gz']:
  rows=[]
  with tarfile.open(P/'inputs/metaplex/zero'/n) as tf:
   for member in tf.getmembers():
    assert member.isfile() and not member.name.startswith('/') and '..' not in Path(member.name).parts
    b=tf.extractfile(member).read();rows.append(dict(member=member.name,bytes=len(b),sha256=H(b)))
    if n=='source-snapshot.tar.gz':assert H(b)==manifest[member.name]
  archives[n]=rows
 patched=js('inputs/metaplex/build11/source-manifest.json');up=js('inputs/metaplex/build11/upstream-source-manifest.json')
 changed=[n for n in sorted(patched) if patched[n]!=up[n]];assert len(changed)==18
 utilize=ws[346];u=[]
 for side,b in [('original',m),('candidate',c)]:
  calls=utilize[side]['calls'];targets=[v['target'] for v in calls if v['kind']=='signed_relative']
  for call in calls:
   x,y=call['target_window_range'];assert m[x:y]==c[x:y]
  u.append(dict(side=side,direct_calls=len(targets),unique_targets=len(set(targets)),targets=targets,guards=[dict(offset=i,hex=b[i:i+8].hex(),branch_destination=i+8+8*struct.unpack_from('<h',b,i+2)[0]) for i in [0x3a4d0,0x3a4e0,0x3a4f0]]))
 assert collections.Counter(u[0]['targets'])==collections.Counter(u[1]['targets']) and u[0]['targets']!=u[1]['targets']
 return {'scope':'Static archival checks only. No historical recipe uniquely selected. No target or compiler execution.', 'ata':{'original_fingerprints':fingerprints(a),'best_pair_equals_build5_pair_raw':True,'pairs':pairs,'all_inventoried_windows_hash_checked':{k:len(v['windows']) for k,v in al['inventories'].items()},'mapped_call_targets_checked':True,'build5_archive':archive,'build5_unstripped_rawvec':named_functions(un,'reserve_for_push'),'build5_unstripped_alloc_sections':alloc},'metaplex':{'original_fingerprints':fingerprints(m),'elf_pair':mp,'capture_sized_pair':pp,'zero_tail':{'range':[len(c),len(m)],'sha256':H(m[len(c):])},'all_windows_hash_checked':len(ws),'raw_equal_windows':1250,'diagnostics':diag,'diagnostic_groups':groups,'archives':archives,'changed_source_members':changed,'utilize_calls_and_guards':u},'proposal':None,'new_builds':0,'new_runtime_probes':0}
if __name__=='__main__':
 import sys
 result=derive()
 if '--write' in sys.argv:(P/'evidence.json').write_text(json.dumps(result,indent=2,sort_keys=True)+'\n')
 else:
  assert result==js('evidence.json'),'derivation differs'
  print('Static derivation passed: ATA 307; Metaplex 1509 + 86543 absent raw-ELF tail bytes; no recipe selected.')
