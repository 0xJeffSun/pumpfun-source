"""Bounded static ErrorCode::name counted-literal obligations for qualified437.

Interprets only the observed integer load, immediate branches, pointer/length
loads and shared direct-call boundary. It does not execute the ELF or model
allocation, copying, return values, arbitrary memory or indirect calls.
"""
from pathlib import Path
import gzip,hashlib,importlib.util,json,re,struct,tarfile,tomllib
if not __debug__:raise RuntimeError('Assertions are required')
P=Path(__file__).resolve().parent
BASE='research/mayhem-current437-selected-data-20261028'
PROGRAM='research/mayhem-current437-composition-20261028'
ORIGINAL_OWNER=629224
sha=lambda b:hashlib.sha256(b).hexdigest()
def module(name,path):
 s=importlib.util.spec_from_file_location(name,path);m=importlib.util.module_from_spec(s);s.loader.exec_module(m);return m
def base_reader(root):return module('error_names_current_data',root/BASE/'reader.py')

def source_context(root):
 with tarfile.open(root/PROGRAM/'source.tar.gz')as t:
  source=t.extractfile('vendor/anchor-lang/src/error.rs').read().decode()
  lock=tomllib.loads(t.extractfile('Cargo.lock').read().decode())
 packages=[p for p in lock['package']if p['name']=='anchor-syn'];assert len(packages)==1
 package=packages[0];assert package['version']=='1.0.0'
 archive=root/BASE/'source-context/anchor-syn-1.0.0.crate'
 assert sha(archive.read_bytes())==package['checksum']
 with tarfile.open(archive)as t:generator=t.extractfile('anchor-syn-1.0.0/src/codegen/error.rs').read().decode()
 for text in ['let ident_name = ident.to_string();','#enum_name::#ident => #ident_name.to_string()','#[repr(u32)]','pub fn name(&self) -> String']:
  assert text in generator
 head='pub enum ErrorCode {';start=source.index(head)+len(head);end=source.index('\n}',start);body=source[start:end]
 assert '#[error_code(offset = 0)]'in source[start-len(head)-80:start-len(head)]
 # The archived enum grammar is fieldless variants with decimal discriminants;
 # comments and balanced attributes are skipped, all other tokens must parse.
 pos=0;value=-1;variants=[]
 while pos<len(body):
  if body[pos].isspace():pos+=1;continue
  if body.startswith('//',pos):
   nxt=body.find('\n',pos);pos=len(body)if nxt<0 else nxt+1;continue
  if body.startswith('#[',pos):
   depth=1;pos+=2;quoted=False;escaped=False
   while depth:
    assert pos<len(body)
    ch=body[pos];pos+=1
    if quoted:
     if escaped:escaped=False
     elif ch=='\\':escaped=True
     elif ch=='"':quoted=False
    elif ch=='"':quoted=True
    elif ch=='[':depth+=1
    elif ch==']':depth-=1
   continue
  match=re.match(r'([A-Z][A-Za-z0-9_]*)\s*(?:=\s*(\d+))?\s*,',body[pos:]);assert match,body[pos:pos+80]
  value=int(match[2])if match[2]else value+1
  variants.append(dict(tag=value,name=match[1]));pos+=match.end()
 assert len(variants)==77 and len({v['tag']for v in variants})==77
 return dict(variants=variants,source_sha256=sha(source.encode()),generator_sha256=sha(generator.encode()),crate_sha256=package['checksum'])

def instructions(e,w):
 """Strictly decode this known finite branch grammar, including every word."""
 out={};at=w['start'];end=w['end']
 while at<end:
  op,reg,off,imm=struct.unpack_from('<BBhi',e.b,at)
  row=dict(pc=at,offset=at-w['start'],opcode=op,registers=reg,branch_offset=off,immediate=imm)
  if op==0x18:
   assert(reg,off)==(2,0)and at+16<=end
   continuation,high=struct.unpack_from('<II',e.b,at+8);assert continuation==0
   assert e.rel.get(at,{}).get('type')==8
   row.update(pointer=(imm&0xffffffff)|(high<<32),width=16)
  else:
   assert(op,reg)in {(0x61,0x22),(0xb7,3),(0x15,2),(0x55,2),(0x65,2),(0xd5,2),(0x05,0),(0x85,0x10),(0x95,0)}
   assert at not in e.rel;row['width']=8
   if op in (0x61,0xb7,0x85,0x95):assert off==0
   if op in (0x61,0x95):assert imm==0
   if op==0x05:assert imm==0
   if op==0xb7:assert 0<imm<=256
  out[at]=row;at+=row['width']
 assert at==end
 assert[(r['opcode'],r['registers'],r['branch_offset'],r['immediate'])for r in [out[w['start']]]]==[(0x61,0x22,0,0)]
 assert sum(r['opcode']==0x61 for r in out.values())==1
 assert sum(r['opcode']==0x85 for r in out.values())==1
 assert sum(r['opcode']==0x95 for r in out.values())==1
 call=next(r for r in out.values()if r['opcode']==0x85)
 assert out[call['pc']+8]['opcode']==0x95 and call['pc']+16==end
 for r in out.values():
  if r['opcode']in(0x15,0x55,0x65,0xd5,0x05):assert r['pc']+8+r['branch_offset']*8 in out
 return out

def interval(e,address,length):
 sections=[s for s in e.sections if s['type']!=8 and s['flags']&2 and s['name']=='.rodata'and s['address']<=address<address+length<=s['address']+s['size']]
 assert len(sections)==1
 assert not any(address<=r<address+length for r in e.rel)
 sec=sections[0];offset=sec['offset']+address-sec['address']
 return e.b[offset:offset+length]

def trace(e,w,decoded,tag):
 pc=w['start'];r2=None;r3=None;pointer_pc=None;length_pc=None;visited=[]
 for _ in range(len(decoded)+1):
  assert pc in decoded and pc not in visited
  visited.append(pc);r=decoded[pc];op=r['opcode'];imm=r['immediate'];nxt=pc+r['width']
  if op==0x61:r2=tag
  elif op==0x18:r2=r['pointer'];pointer_pc=pc
  elif op==0xb7:r3=imm;length_pc=pc
  elif op==0x05:nxt=pc+8+r['branch_offset']*8
  elif op in(0x15,0x55,0x65,0xd5):
   assert pointer_pc is None and r2==tag
   condition={0x15:tag==imm,0x55:tag!=imm,0x65:tag>imm,0xd5:tag<=imm}[op]
   if condition:nxt=pc+8+r['branch_offset']*8
  elif op==0x85:
   assert pointer_pc is not None and length_pc is not None
   raw=interval(e,r2,r3)
   return dict(pointer=r2,length=r3,bytes_hex=raw.hex(),pointer_offset=pointer_pc-w['start'],length_offset=length_pc-w['start'],call_offset=pc-w['start'],call_target=pc+8+imm*8,path_offsets=[p-w['start']for p in visited])
  else:raise AssertionError('exit reached before observed call boundary')
  pc=nxt
 raise AssertionError('path did not reach observed call')

def inspect(original,candidate,root):
 data=base_reader(root);prefix,writer,_=data.readers(root/BASE,root)
 before=data.inspect(root/BASE,root,original,candidate)['counted_literals']
 initial={tuple(p)for p in before['active_pairs']};context=source_context(root)
 o,c=prefix.elves(original,candidate);rows=json.loads((prefix.M/'original-windows.json').read_bytes())
 ow={r['start']:o.window(r['start'],r['start']+r['bytes'])for r in rows};cw,names=prefix.q.tables(c)
 edges={};bad=set();observations=[];owner_pairs=[];failures=[]
 for a,b in sorted(initial):
  left,right=ow[a],cw[b];edges[a,b]=[(x['target'],y['target'])for x,y in zip(left['direct'],right['direct'])]
  rd={x['offset']:x for x in right['data_references']}
  for x in left['data_references']:
   y=rd[x['offset']]
   if x['kind']=='code':edges[a,b].append((x['target'],y['target']))
   lp=prefix.prefix(o,ow,x['target'])
   if lp:
    rp=prefix.prefix(c,cw,y['target']);assert rp is not None
    edges[a,b].extend((u,v)for u,v in zip(lp['targets'],rp['targets'])if u is not None)
   ext=writer.record48(prefix,o,ow,x['target'])
   if ext:
    other=writer.record48(prefix,c,cw,y['target']);assert other is not None
    edges[a,b].extend((u,v)for u,v in zip(ext['targets'],other['targets'])if u is not None)
  if a!=ORIGINAL_OWNER:continue
  assert any('anchor_lang5error9ErrorCode4name' in n for n in names[b])
  owner_pairs.append((a,b));ld=instructions(o,left);cd=instructions(c,right);lv=set();cv=set()
  for variant in context['variants']:
   x=trace(o,left,ld,variant['tag']);y=trace(c,right,cd,variant['tag'])
   lv.update(x['path_offsets']);cv.update(y['path_offsets'])
   expected=variant['name'].encode();valid=(x['length']==y['length']==len(expected)and x['bytes_hex']==y['bytes_hex']==expected.hex()and x['path_offsets']==y['path_offsets']and x['pointer_offset']==y['pointer_offset']and x['length_offset']==y['length_offset']and x['call_offset']==y['call_offset']and(x['call_target'],y['call_target'])in initial)
   if not valid:bad.add((a,b));failures.append(variant['tag'])
   observations.append(dict(**variant,original_owner=a,candidate_owner=b,original=x,candidate=y,bytes_and_count_equal=valid,callee_names=sorted(names.get(y['call_target'],[]))))
  assert lv=={p-a for p,r in ld.items()if r['opcode']!=0x95},'unvisited original instructions'
  assert cv=={p-b for p,r in cd.items()if r['opcode']!=0x95},'unvisited candidate instructions'
 active=initial-bad;rounds=[]
 while True:
  lost={p for p in active if any(t not in active for t in edges[p])}
  if not lost:break
  active-=lost;rounds.append(len(lost))
 for row in observations:row['owner_closed']=(row['original_owner'],row['candidate_owner'])in active
 spans=sorted({(r['original']['pointer'],r['original']['length'])for r in observations})
 for (a,n),(b,m)in zip(spans,spans[1:]):assert a+n<=b,'overlapping counted intervals'
 return dict(summary=dict(normalized_windows=before['summary']['normalized_windows'],raw_windows=before['summary']['raw_windows'],base_windows=before['summary']['literal_windows'],base_pairs=len(initial),extended_windows=len({a for a,b in active}),extended_pairs=len(active),source_variants=len(context['variants']),owner_pairs=len(owner_pairs),literal_spans=len(spans),literal_bytes=sum(n for a,n in spans),reference_sites=len({r['original']['pointer_offset']for r in observations}),rejected_pairs=len(initial-active),pruning_rounds=rounds,failed_tags=failures),source_context=context,active_pairs=[list(p)for p in sorted(active)],observations=observations)

def coverage_delta(root,report):
 path=root/'research/mayhem-current437-data-coverage-20261028/coverage.json'
 coverage=json.loads(path.read_bytes());section=next(x for x in coverage['coverage_by_section']if x['section']=='.rodata')
 spans=[(r['original']['pointer'],r['original']['pointer']+r['original']['length'])for r in report['observations']]
 def union(intervals):
  out=[]
  for a,b in sorted(map(tuple,intervals)):
   if out and a<=out[-1][1]:out[-1][1]=max(b,out[-1][1])
   else:out.append([a,b])
  return out
 old=section['covered_intervals'];updated=union(old+spans)
 before=sum(b-a for a,b in old);after=sum(b-a for a,b in updated)
 gap=max(section['uncovered_intervals'],key=lambda p:p[1]-p[0])
 return dict(scope='Counted byte intervals only; no allocation extents.',old_coverage_sha256=sha(path.read_bytes()),literal_bytes=sum(b-a for a,b in spans),new_rodata_bytes=after-before,rodata_before=before,rodata_after=after,rodata_total=section['bytes'],largest_prior_gap=gap,new_bytes_in_largest_prior_gap=sum(max(0,min(b,gap[1])-max(a,gap[0]))for a,b in union(spans)),covered_intervals_after=updated)

def check(packet,root):
 paths=list(packet.rglob('*'));assert not any(p.is_symlink()for p in paths),'packet symlink';assert all(p.is_file()or p.is_dir()for p in paths),'packet special file'
 assert {str(p.relative_to(packet)):sha(p.read_bytes())for p in paths if p.is_file()and p!=packet/'manifest.json'}==json.loads((packet/'manifest.json').read_bytes()),'packet inventory differs'
 for path,digest in json.loads((packet/'inputs.json').read_bytes()).items():
  p=Path(path);assert not p.is_absolute()and'..'not in p.parts
  assert sha((root/p).read_bytes())==digest,path
 data=base_reader(root);data.check(root/BASE,root)
 original=(root/'evidence/original/mayhem/deployed.so').read_bytes();candidate=data.inputs(root,'mayhem-current437-composition-20261028')
 report=inspect(original,candidate,root)
 assert report==json.loads(gzip.decompress((packet/'observations.json.gz').read_bytes())),'fresh observations differ'
 assert coverage_delta(root,report)==json.loads((packet/'coverage-delta.json').read_bytes()),'coverage delta differs'
 s=report['summary'];assert(s['normalized_windows'],s['raw_windows'],s['extended_windows'],s['extended_pairs'],s['source_variants'],s['owner_pairs'],s['literal_spans'],s['literal_bytes'],s['reference_sites'],s['rejected_pairs'])==(437,141,431,581,77,1,77,2010,77,0)
 assert all(r['owner_closed']and r['bytes_and_count_equal']for r in report['observations'])
 return s
