"""42 bounded ErrorKind Debug table entries; no allocation-extent claim."""
from pathlib import Path
import gzip,hashlib,importlib.util,json,re,struct
if not __debug__:raise RuntimeError('Assertions are required')
P=Path(__file__).resolve().parent
PRIOR='research/mayhem-current437-program-error-messages-20261028'
OWNER=668424
sha=lambda b:hashlib.sha256(b).hexdigest()
def module(name,path):
 s=importlib.util.spec_from_file_location(name,path);m=importlib.util.module_from_spec(s);s.loader.exec_module(m);return m
def prior(root):return module('error_kind_prior',root/PRIOR/'proof.py')

def context(packet,root):
 source=(packet/'source-context/error.rs').read_text();start=source.index('pub enum ErrorKind {')+len('pub enum ErrorKind {');end=source.index('\n}',start)
 # This installed-source excerpt uses fieldless variants and attributes only.
 body=source[start:end];body=re.sub(r'//[^\n]*','',body);body=re.sub(r'#\[[^\]]*\]','',body,flags=re.S)
 variants=[]
 for part in body.split(','):
  part=part.strip()
  if not part:continue
  assert re.fullmatch(r'[A-Z][A-Za-z0-9_]*',part),part;variants.append(part)
 assert len(variants)==42 and len(set(variants))==42
 assert variants[0]=='NotFound'and variants[-1]=='Uncategorized'
 provenance=json.loads((packet/'source-context/provenance.json').read_bytes())
 launch=json.loads((root/'research/mayhem-current437-composition-20261028/builds/first/launch.json').read_bytes())
 tools=json.loads((root/'research/mayhem-current437-composition-20261028/tools-observed.json').read_bytes())
 compiler=Path(launch['command'][0]);assert tools['tools']['compiler']['path']==str(compiler)
 expected=compiler.parent.parent/'lib/rustlib/src/rust/library/std/src/io/error.rs'
 assert provenance['source_path']==str(expected)and provenance['source_sha256']==sha((packet/'source-context/error.rs').read_bytes())
 assert provenance['recorded_compiler_sha256']==tools['tools']['compiler']['sha256']
 assert provenance['scope']=='Installed source observation; not an attestation of original build provenance'
 return dict(variants=variants,source_sha256=provenance['source_sha256'],scope=provenance['scope'],observed_tag_range=[0,41])

OPS={0:(0xbf,0x24,0,0),8:(0x71,0x11,0,0),16:(0x67,0x01,0,3),40:(0x0f,0x13,0,0),64:(0x0f,0x12,0,0),72:(0x79,0x22,0,0),80:(0x79,0x33,0,0),88:(0xbf,0x41,0,0),104:(0x95,0,0,0)}
def decoder(e,w):
 assert w['end']-w['start']==112
 for offset,expected in OPS.items():
  pc=w['start']+offset;assert pc not in e.rel and struct.unpack_from('<BBhi',e.b,pc)==expected,'index/count forwarding changed'
 bases=[]
 for offset,reg in((24,3),(48,2)):
  pc=w['start']+offset;op,r,off,lo=struct.unpack_from('<BBhI',e.b,pc);continuation,hi=struct.unpack_from('<II',e.b,pc+8)
  assert(op,r,off,continuation)==(0x18,reg,0,0)
  assert e.rel.get(pc,{}).get('type')==8 and e.rel[pc]['symbol_index']==0
  assert not any(pc<r<pc+16 for r in e.rel);bases.append(lo|(hi<<32))
 pc=w['start']+96;op,r,off,imm=struct.unpack_from('<BBhi',e.b,pc);assert(op,r,off)==(0x85,0x10,0)and pc not in e.rel
 return dict(length_table=bases[0],pointer_table=bases[1],call_target=pc+8+imm*8,pointer_base_offset=48,length_base_offset=24,byte_tag_load_offset=8,index_shift=3,length_to_register=3,pointer_to_register=2)

def read(e,address,size,section):
 ss=[s for s in e.sections if s['name']==section and s['type']!=8 and s['flags']&2 and s['address']<=address<address+size<=s['address']+s['size']]
 assert len(ss)==1
 s=ss[0];at=s['offset']+address-s['address'];return e.b[at:at+size]
def entry(e,decoded,index):
 # This is an explicit selected source-tag domain, not the array's inferred size.
 assert 0<=index<42
 length_slot=decoded['length_table']+8*index;pointer_slot=decoded['pointer_table']+8*index
 assert not any(length_slot<=r<length_slot+8 for r in e.rel)
 length=struct.unpack('<Q',read(e,length_slot,8,'.rodata'))[0];assert 0<length<=256
 raw=struct.unpack('<Q',read(e,pointer_slot,8,'.data.rel.ro'))[0]
 assert raw&0xffffffff==0 and e.rel.get(pointer_slot,{}).get('type')==8 and e.rel[pointer_slot]['symbol_index']==0
 assert not any(pointer_slot<r<pointer_slot+8 for r in e.rel)
 pointer=raw>>32;data=read(e,pointer,length,'.rodata');assert not any(pointer<=r<pointer+length for r in e.rel)
 return dict(index=index,length_slot=length_slot,pointer_slot=pointer_slot,pointer=pointer,length=length,bytes_hex=data.hex())

def inspect(packet,original,candidate,root):
 previous=prior(root);message=previous.prior(root);names=message.prior(root);data=names.base_reader(root);prefix,records,_=data.readers(root/names.BASE,root)
 before=previous.inspect(root/PRIOR,original,candidate,root);initial={tuple(p)for p in before['active_pairs']};source=context(packet,root)
 o,c=prefix.elves(original,candidate);rows=json.loads((prefix.M/'original-windows.json').read_bytes());ow={r['start']:o.window(r['start'],r['start']+r['bytes'])for r in rows};cw,symbols=prefix.q.tables(c)
 edges={};bad=set();observations=[];owners=[];decoders=[];writers=[]
 for a,b in sorted(initial):
  left,right=ow[a],cw[b];edges[a,b]=[(x['target'],y['target'])for x,y in zip(left['direct'],right['direct'])];rd={x['offset']:x for x in right['data_references']}
  for x in left['data_references']:
   y=rd[x['offset']]
   if x['kind']=='code':edges[a,b].append((x['target'],y['target']))
   lp=prefix.prefix(o,ow,x['target'])
   if lp:
    rp=prefix.prefix(c,cw,y['target']);assert rp is not None
    edges[a,b].extend((u,v)for u,v in zip(lp['targets'],rp['targets'])if u is not None)
   ext=records.record48(prefix,o,ow,x['target'])
   if ext:
    other=records.record48(prefix,c,cw,y['target']);assert other is not None
    edges[a,b].extend((u,v)for u,v in zip(ext['targets'],other['targets'])if u is not None)
  if a!=OWNER:continue
  assert any('io..error..ErrorKind' in n and 'Debug' in n for n in symbols[b]);owners.append((a,b));ld=decoder(o,left);cd=decoder(c,right)
  assert(ld['call_target'],cd['call_target'])in initial
  writers.append(dict(original=previous.writer(o,ow[ld['call_target']]),candidate=previous.writer(c,cw[cd['call_target']])))
  decoders.append(dict(original_owner=a,candidate_owner=b,original=ld,candidate=cd))
  for i,name in enumerate(source['variants']):
   x=entry(o,ld,i);y=entry(c,cd,i);good=x['length']==y['length']==len(name)and x['bytes_hex']==y['bytes_hex']==name.encode().hex()
   if not good:bad.add((a,b))
   observations.append(dict(index=i,name=name,original_owner=a,candidate_owner=b,original=x,candidate=y,bytes_and_count_equal=good))
 active=initial-bad;rounds=[]
 while True:
  lost={p for p in active if any(t not in active for t in edges[p])}
  if not lost:break
  active-=lost;rounds.append(len(lost))
 for r in observations:r['owner_closed']=(r['original_owner'],r['candidate_owner'])in active
 spans=sorted({(r['original']['pointer'],r['original']['length'])for r in observations})
 for(a,n),(b,m)in zip(spans,spans[1:]):assert a+n<=b
 return dict(summary=dict(normalized_windows=before['summary']['normalized_windows'],raw_windows=before['summary']['raw_windows'],base_windows=before['summary']['extended_windows'],base_pairs=len(initial),extended_windows=len({a for a,b in active}),extended_pairs=len(active),owner_pairs=len(owners),selected_entries=len(observations),literal_spans=len(spans),literal_bytes=sum(n for a,n in spans),length_table_bytes=len(observations)*8,pointer_table_raw_bytes=len(observations)*4,pointer_table_mapped_bytes=len(observations)*4,rejected_pairs=len(initial-active),pruning_rounds=rounds),source_context=source,active_pairs=[list(p)for p in sorted(active)],observations=observations,decoders=decoders,writer_paths=writers)

def coverage_delta(root,report):
 previous=root/PRIOR/'coverage-delta.json';before=json.loads(previous.read_bytes());after=[]
 def union(intervals):
  out=[]
  for a,b in sorted(map(tuple,intervals)):
   if out and a<=out[-1][1]:out[-1][1]=max(b,out[-1][1])
   else:out.append([a,b])
  return out
 for s in before['sections']:
  row=dict(s);raw=[];mapped=[]
  for r in report['observations']:
   x=r['original']
   if s['section']=='.rodata':raw.extend([(x['pointer'],x['pointer']+x['length']),(x['length_slot'],x['length_slot']+8)])
   elif s['section']=='.data.rel.ro':raw.append((x['pointer_slot'],x['pointer_slot']+4));mapped.append((x['pointer_slot']+4,x['pointer_slot']+8))
  row['raw_intervals']=union(s['raw_intervals']+raw);row['mapped_intervals']=union(s['mapped_intervals']+mapped);row['covered_intervals']=union(row['raw_intervals']+row['mapped_intervals']);row['covered_bytes']=sum(b-a for a,b in row['covered_intervals']);row['raw_equal_bytes']=sum(b-a for a,b in row['raw_intervals']);row['pointer_only_bytes']=row['covered_bytes']-row['raw_equal_bytes'];row['new_bytes']=row['covered_bytes']-s['covered_bytes'];after.append(row)
 return dict(scope='42 selected index entries and counted names; no array/allocation extent.',prior_program_messages_delta_sha256=sha(previous.read_bytes()),sections=after,new_payload_bytes=sum(s['new_bytes']for s in after),payload_covered_bytes=sum(s['covered_bytes']for s in after),payload_total_bytes=before['payload_total_bytes'])

def check(packet,root):
 paths=list(packet.rglob('*'));assert not any(p.is_symlink()for p in paths),'packet symlink';assert all(p.is_file()or p.is_dir()for p in paths),'packet special file'
 assert{str(p.relative_to(packet)):sha(p.read_bytes())for p in paths if p.is_file()and p!=packet/'manifest.json'}==json.loads((packet/'manifest.json').read_bytes()),'packet inventory differs'
 for path,digest in json.loads((packet/'inputs.json').read_bytes()).items():
  p=Path(path);assert not p.is_absolute()and'..'not in p.parts
  assert sha((root/p).read_bytes())==digest,path
 previous=prior(root);previous.check(root/PRIOR,root);data=previous.prior(root).prior(root).base_reader(root)
 report=inspect(packet,(root/'evidence/original/mayhem/deployed.so').read_bytes(),data.inputs(root,'mayhem-current437-composition-20261028'),root)
 assert report==json.loads(gzip.decompress((packet/'observations.json.gz').read_bytes())),'fresh observations differ'
 delta=coverage_delta(root,report);assert delta==json.loads((packet/'coverage-delta.json').read_bytes()),'coverage delta differs'
 s=report['summary'];assert(s['normalized_windows'],s['raw_windows'],s['extended_windows'],s['extended_pairs'],s['owner_pairs'],s['selected_entries'],s['literal_spans'],s['literal_bytes'],s['rejected_pairs'])==(437,141,431,581,1,42,42,542,0)
 assert(delta['new_payload_bytes'],delta['payload_covered_bytes'],delta['payload_total_bytes'])==(1214,15229,26180)
 assert all(r['owner_closed']and r['bytes_and_count_equal']for r in report['observations'])
 return s
