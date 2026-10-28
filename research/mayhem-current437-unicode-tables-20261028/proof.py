"""Exact six printable tables and their observed slice arguments; no runtime claim."""
from pathlib import Path
import ast,gzip,hashlib,importlib.util,json,re,struct
if not __debug__:raise RuntimeError('Assertions are required')
P=Path(__file__).resolve().parent
PRIOR='research/mayhem-current437-error-kind-tables-20261028'
OWNER=690080
sha=lambda b:hashlib.sha256(b).hexdigest()
def module(name,path):
 s=importlib.util.spec_from_file_location(name,path);m=importlib.util.module_from_spec(s);s.loader.exec_module(m);return m
def prior(root):return module('printable_prior',root/PRIOR/'proof.py')

def context(packet,root):
 raw=(packet/'source-context/printable.rs').read_bytes();source=raw.decode();result={}
 for name,typ,body in re.findall(r'const\s+(\w+):\s*(&\[[^;=]+)\s*=\s*&\[(.*?)\];',source,re.S):
  values=ast.literal_eval('['+body+']');pairs=typ.replace(' ','')=='&[(u8,u8)]'
  assert pairs or typ.replace(' ','')=='&[u8]'
  assert all(isinstance(v,tuple)and len(v)==2 and all(type(i)is int and 0<=i<=255 for i in v)for v in values)if pairs else all(type(v)is int and 0<=v<=255 for v in values)
  b=bytes(i for pair in values for i in pair)if pairs else bytes(values)
  result[name]=dict(name=name,element_count=len(values),element_bytes=2 if pairs else 1,byte_count=len(b),bytes_hex=b.hex())
 expected={'SINGLETONS0U':(40,2),'SINGLETONS0L':(290,1),'SINGLETONS1U':(44,2),'SINGLETONS1L':(208,1),'NORMAL0':(297,1),'NORMAL1':(486,1)}
 assert set(result)==set(expected)
 for k,v in expected.items():assert(result[k]['element_count'],result[k]['element_bytes'])==v
 for s in ('check(lower, SINGLETONS0U, SINGLETONS0L, NORMAL0)','check(lower, SINGLETONS1U, SINGLETONS1L, NORMAL1)','singletonuppers: &[(u8, u8)]','singletonlowers: &[u8]','normal: &[u8]'):assert s in source
 provenance=json.loads((packet/'source-context/provenance.json').read_bytes());launch=json.loads((root/'research/mayhem-current437-composition-20261028/builds/first/launch.json').read_bytes());tools=json.loads((root/'research/mayhem-current437-composition-20261028/tools-observed.json').read_bytes());compiler=Path(launch['command'][0])
 assert provenance['source_path']==str(compiler.parent.parent/'lib/rustlib/src/rust/library/core/src/unicode/printable.rs')
 assert provenance['source_sha256']==sha(raw)and provenance['recorded_compiler_sha256']==tools['tools']['compiler']['sha256']
 assert provenance['scope']=='Installed source observation; not an attestation of original build provenance'
 return dict(tables=result,source_sha256=sha(raw),scope=provenance['scope'])

PREFIX={0:(0xb7,0,0,0),8:(0xbf,0x12,0,0),16:(0x67,2,0,32),24:(0x77,2,0,32),32:(0xa5,2,28,32),40:(0xb7,0,0,1),48:(0xa5,2,26,127),56:(0x35,2,12,65536),160:(0x35,2,14,131072),264:(0x57,0,0,1),272:(0x95,0,0,0)}
def fixed(e,w,offset,expected):
 pc=w['start']+offset;assert pc not in e.rel and struct.unpack_from('<BBhi',e.b,pc)==expected,'slice construction changed'
def pointer(e,w,offset,reg):
 pc=w['start']+offset;op,r,off,lo=struct.unpack_from('<BBhI',e.b,pc);cont,hi=struct.unpack_from('<II',e.b,pc+8)
 assert(op,r,off,cont)==(0x18,reg,0,0)and e.rel.get(pc,{}).get('type')==8 and e.rel[pc]['symbol_index']==0
 assert not any(pc<r<pc+16 for r in e.rel);return lo|(hi<<32)
def slices(e,w,source):
 assert w['end']-w['start']==768
 for offset,expected in PREFIX.items():fixed(e,w,offset,expected)
 rows=[]
 for plane,start,upper,lower,normal in[(0,64,'SINGLETONS0U','SINGLETONS0L','NORMAL0'),(1,168,'SINGLETONS1U','SINGLETONS1L','NORMAL1')]:
  up,lo,no=[source[k]for k in(upper,lower,normal)]
  np=pointer(e,w,start,2);fixed(e,w,start+16,(0x7b,0x2a,-4088,0));fixed(e,w,start+24,(0x7a,0x0a,-4080,no['element_count']));fixed(e,w,start+32,(0x7a,0x0a,-4096,lo['element_count']));fixed(e,w,start+40,(0xbf,0xa5,0,0))
  upp=pointer(e,w,start+48,2);fixed(e,w,start+64,(0xb7,3,0,up['element_count']));lp=pointer(e,w,start+72,4)
  for name,ptr,off in [(upper,upp,start+48),(lower,lp,start+72),(normal,np,start)]:
   src=source[name];n=src['byte_count'];sections=[s for s in e.sections if s['name']=='.rodata'and s['type']!=8 and s['flags']&2 and s['address']<=ptr<ptr+n<=s['address']+s['size']];assert len(sections)==1
   s=sections[0];at=s['offset']+ptr-s['address'];assert not any(ptr<=r<ptr+n for r in e.rel)
   rows.append(dict(name=name,plane=plane,pointer=ptr,pointer_offset=off,element_count=src['element_count'],element_bytes=src['element_bytes'],byte_count=n,bytes_hex=e.b[at:at+n].hex()))
 fixed(e,w,152,(0x05,0,12,0));assert 152+8+12*8==256
 pc=w['start']+256;op,reg,off,imm=struct.unpack_from('<BBhi',e.b,pc);assert(op,reg,off)==(0x85,0x10,0)and pc not in e.rel
 return rows,pc+8+imm*8

UNPACK={0:(0x7b,0x4a,-8,0),8:(0x67,3,0,1),16:(0xbf,0x27,0,0),24:(0x0f,0x37,0,0),40:(0x79,0x53,-4080,0),48:(0x7b,0x3a,-24,0),56:(0x79,0x53,-4088,0),64:(0x7b,0x3a,-16,0),72:(0x79,0x56,-4096,0),104:(0x71,0x28,1,0),128:(0x71,0x24,0,0),136:(0x07,2,0,2),160:(0x2d,0x65,52,0),168:(0x79,0xa4,-8,0),216:(0x71,0x43,0,0),224:(0x07,4,0,1),264:(0x5d,0x72,-21,0),272:(0x79,0xa5,-16,0),280:(0xbf,0x52,0,0),288:(0x79,0xa3,-24,0),296:(0x0f,0x32,0,0),336:(0x71,0x53,0,0),440:(0x71,0x54,1,0),504:(0x5d,0x25,-24,0)}
def consumer(e,w):
 assert w['end']-w['start']==648
 for off,expected in UNPACK.items():fixed(e,w,off,expected)
 return dict(start=w['start'],bytes=648,checked_offsets=sorted(UNPACK),upper_element_stride=2,lower_element_stride=1,normal_element_stride=1,scope='Actual argument unpacking, table load widths and boundary comparisons; no Unicode semantic/runtime claim')

def inspect(packet,original,candidate,root):
 previous=prior(root);program=previous.prior(root);message=program.prior(root);names=message.prior(root);data=names.base_reader(root);prefix,records,_=data.readers(root/names.BASE,root)
 before=previous.inspect(root/PRIOR,original,candidate,root);initial={tuple(p)for p in before['active_pairs']};src=context(packet,root)
 o,c=prefix.elves(original,candidate);rows=json.loads((prefix.M/'original-windows.json').read_bytes());ow={r['start']:o.window(r['start'],r['start']+r['bytes'])for r in rows};cw,symbols=prefix.q.tables(c)
 edges={};bad=set();observations=[];consumers=[];owners=[]
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
  assert any('unicode9printable12is_printable' in n for n in symbols[b]);owners.append((a,b))
  ll,lt=slices(o,left,src['tables']);rr,rt=slices(c,right,src['tables']);assert(lt,rt)in initial
  assert any('unicode9printable5check' in n for n in symbols[rt]);consumers.append(dict(original=consumer(o,ow[lt]),candidate=consumer(c,cw[rt])))
  for x,y in zip(ll,rr):
   assert x['name']==y['name'];good=x['bytes_hex']==y['bytes_hex']==src['tables'][x['name']]['bytes_hex']
   if not good:bad.add((a,b))
   observations.append(dict(name=x['name'],original_owner=a,candidate_owner=b,original=x,candidate=y,bytes_equal=good))
 active=initial-bad;rounds=[]
 while True:
  lost={p for p in active if any(t not in active for t in edges[p])}
  if not lost:break
  active-=lost;rounds.append(len(lost))
 for r in observations:r['owner_closed']=(r['original_owner'],r['candidate_owner'])in active
 spans=sorted({(r['original']['pointer'],r['original']['byte_count'])for r in observations})
 for(a,n),(b,m)in zip(spans,spans[1:]):assert a+n<=b
 return dict(summary=dict(normalized_windows=before['summary']['normalized_windows'],raw_windows=before['summary']['raw_windows'],base_windows=before['summary']['extended_windows'],base_pairs=len(initial),extended_windows=len({a for a,b in active}),extended_pairs=len(active),owner_pairs=len(owners),tables=len(spans),table_bytes=sum(n for a,n in spans),rejected_pairs=len(initial-active),pruning_rounds=rounds),source_context=src,active_pairs=[list(p)for p in sorted(active)],observations=observations,consumer_paths=consumers)

def coverage_delta(root,report):
 p=root/PRIOR/'coverage-delta.json';before=json.loads(p.read_bytes());after=[]
 def union(intervals):
  out=[]
  for a,b in sorted(map(tuple,intervals)):
   if out and a<=out[-1][1]:out[-1][1]=max(b,out[-1][1])
   else:out.append([a,b])
  return out
 for s in before['sections']:
  row=dict(s);add=[(r['original']['pointer'],r['original']['pointer']+r['original']['byte_count'])for r in report['observations']]if s['section']=='.rodata'else[]
  row['raw_intervals']=union(s['raw_intervals']+add);row['covered_intervals']=union(row['raw_intervals']+s['mapped_intervals']);row['raw_equal_bytes']=sum(b-a for a,b in row['raw_intervals']);row['covered_bytes']=sum(b-a for a,b in row['covered_intervals']);row['new_bytes']=row['covered_bytes']-s['covered_bytes'];after.append(row)
 return dict(scope='Six observed slice byte intervals; no allocation extent or Unicode semantic claim.',prior_error_kind_delta_sha256=sha(p.read_bytes()),sections=after,new_payload_bytes=sum(s['new_bytes']for s in after),payload_covered_bytes=sum(s['covered_bytes']for s in after),payload_total_bytes=before['payload_total_bytes'])

def check(packet,root):
 paths=list(packet.rglob('*'));assert not any(p.is_symlink()for p in paths),'packet symlink';assert all(p.is_file()or p.is_dir()for p in paths),'packet special file'
 assert{str(p.relative_to(packet)):sha(p.read_bytes())for p in paths if p.is_file()and p!=packet/'manifest.json'}==json.loads((packet/'manifest.json').read_bytes()),'packet inventory differs'
 for path,digest in json.loads((packet/'inputs.json').read_bytes()).items():
  p=Path(path);assert not p.is_absolute()and'..'not in p.parts
  assert sha((root/p).read_bytes())==digest,path
 previous=prior(root);previous.check(root/PRIOR,root);data=previous.prior(root).prior(root).prior(root).base_reader(root)
 report=inspect(packet,(root/'evidence/original/mayhem/deployed.so').read_bytes(),data.inputs(root,'mayhem-current437-composition-20261028'),root)
 assert report==json.loads(gzip.decompress((packet/'observations.json.gz').read_bytes())),'fresh observations differ'
 delta=coverage_delta(root,report);assert delta==json.loads((packet/'coverage-delta.json').read_bytes()),'coverage delta differs'
 s=report['summary'];assert(s['normalized_windows'],s['raw_windows'],s['extended_windows'],s['extended_pairs'],s['owner_pairs'],s['tables'],s['table_bytes'],s['rejected_pairs'])==(437,141,431,581,1,6,1449,0)
 assert(delta['new_payload_bytes'],delta['payload_covered_bytes'],delta['payload_total_bytes'])==(1449,16678,26180)
 assert all(r['owner_closed']and r['bytes_equal']for r in report['observations'])
 return s
