"""Known-path, counted ErrorCode Display string descriptors for qualified437.

This reads the two saved images. It follows the known formatter consumer path
and stops before its unresolved writer callback. It does not model allocation,
formatting effects, runtime, or arbitrary dispatch.
"""
from pathlib import Path
import gzip,hashlib,importlib.util,json,re,struct,tarfile
if not __debug__:raise RuntimeError('Assertions are required')
P=Path(__file__).resolve().parent
NAMES='research/mayhem-current437-error-names-20261028'
OWNER=632880
sha=lambda b:hashlib.sha256(b).hexdigest()
def module(name,path):
 s=importlib.util.spec_from_file_location(name,path);m=importlib.util.module_from_spec(s);s.loader.exec_module(m);return m
def prior(root):return module('display_prior_names',root/NAMES/'proof.py')

def source_context(root):
 names=prior(root);context=names.source_context(root)
 with tarfile.open(root/names.PROGRAM/'source.tar.gz')as t:source=t.extractfile('vendor/anchor-lang/src/error.rs').read().decode()
 with tarfile.open(root/names.BASE/'source-context/anchor-syn-1.0.0.crate')as t:generator=t.extractfile('anchor-syn-1.0.0/src/codegen/error.rs').read().decode()
 for text in ['let display_msg = match &error_code.msg','Some(msg) =>','write!(fmt, #msg)','#enum_name::#ident => #display_msg']:
  assert text in generator
 source=source[source.index('pub enum ErrorCode {'):];source=source[:source.index('\n}')]
 messages=re.findall(r'#\[msg\(("(?:[^"\\]|\\.)*")\)\]\s*([A-Z][A-Za-z0-9_]*)\s*(?:=\s*\d+)?\s*,',source,re.S)
 assert len(messages)==77
 assert [name for raw,name in messages]==[v['name']for v in context['variants']]
 context['variants']=[dict(v,message=json.loads(raw))for v,(raw,name)in zip(context['variants'],messages)]
 assert all(isinstance(v['message'],str)and 0<len(v['message'].encode())<=256 for v in context['variants'])
 return context

TAIL=[(0x7b,0x1a,-48,0),(0x7a,0x0a,-16,0),(0x7a,0x0a,-40,1),(0x7a,0x0a,-24,0),(0x7a,0x0a,-32,8),(0x79,0x24,8,0),(0x79,0x21,0,0),(0xbf,0xa3,0,0),(0x07,0x03,0,-48),(0xbf,0x42,0,0)]
def instructions(e,w):
 out={};at=w['start'];end=w['end'];tail=end-96
 assert tail>=at
 while at<tail:
  op,reg,off,imm=struct.unpack_from('<BBhi',e.b,at)
  row=dict(pc=at,offset=at-w['start'],opcode=op,registers=reg,branch_offset=off,immediate=imm,width=8)
  if op==0x18:
   assert(reg,off)==(1,0)and at+16<=tail
   continuation,high=struct.unpack_from('<II',e.b,at+8);assert continuation==0
   assert e.rel.get(at,{}).get('type')==8 and e.rel[at]['symbol_index']==0
   assert not any(at<r<at+16 for r in e.rel)
   row.update(pointer=(imm&0xffffffff)|(high<<32),width=16)
  else:
   assert(op,reg)in{(0x61,0x11),(0x15,1),(0x55,1),(0x65,1),(0xd5,1),(0x05,0)}
   assert at not in e.rel
   if op==0x61:assert off==imm==0
   if op==0x05:assert imm==0
  out[at]=row;at+=row['width']
 assert at==tail
 assert struct.unpack_from('<BBhi',e.b,w['start'])==(0x61,0x11,0,0)
 assert sum(r['opcode']==0x61 for r in out.values())==1
 for i,expected in enumerate(TAIL):
  pc=tail+i*8;assert pc not in e.rel
  assert struct.unpack_from('<BBhi',e.b,pc)==expected,'formatter construction changed'
 call=tail+80;op,reg,off,imm=struct.unpack_from('<BBhi',e.b,call)
 assert(op,reg,off)==(0x85,0x10,0)and call not in e.rel
 assert struct.unpack_from('<BBhi',e.b,call+8)==(0x95,0,0,0)and call+8 not in e.rel
 for r in out.values():
  if r['opcode']in(0x15,0x55,0x65,0xd5,0x05):assert r['pc']+8+r['branch_offset']*8 in set(out)|{tail}
 return out,tail,call,call+8+imm*8

def counted_descriptor(e,address):
 ss=[s for s in e.sections if s['name']=='.data.rel.ro'and s['type']!=8 and s['flags']&2 and s['address']<=address<address+16<=s['address']+s['size']]
 assert len(ss)==1
 s=ss[0];at=s['offset']+address-s['address'];encoded,length=struct.unpack_from('<QQ',e.b,at)
 assert encoded&0xffffffff==0 and e.rel.get(address,{}).get('type')==8 and e.rel[address]['symbol_index']==0
 assert not any(address<r<address+16 for r in e.rel)
 assert 0<length<=256
 pointer=encoded>>32
 rs=[s for s in e.sections if s['name']=='.rodata'and s['type']!=8 and s['flags']&2 and s['address']<=pointer<pointer+length<=s['address']+s['size']]
 assert len(rs)==1 and not any(pointer<=r<pointer+length for r in e.rel)
 s=rs[0];p=s['offset']+pointer-s['address']
 return dict(descriptor=address,pointer=pointer,length=length,bytes_hex=e.b[p:p+length].hex())

def trace(e,w,decoded,tag):
 code,tail,call,target=decoded;pc=w['start'];value=None;pointer_pc=None;visited=[]
 for _ in range(len(code)+1):
  if pc==tail:
   assert pointer_pc is not None
   result=counted_descriptor(e,value)
   result.update(pointer_offset=pointer_pc-w['start'],tail_offset=tail-w['start'],call_offset=call-w['start'],call_target=target,path_offsets=[p-w['start']for p in visited],stack_pieces_count=1,stack_arguments_count=0,stack_arguments_pointer=8,stack_format_options=0)
   return result
  assert pc in code and pc not in visited
  visited.append(pc);r=code[pc];op=r['opcode'];imm=r['immediate'];nxt=pc+r['width']
  if op==0x61:value=tag
  elif op==0x18:value=r['pointer'];pointer_pc=pc
  elif op==0x05:nxt=pc+8+r['branch_offset']*8
  elif op in(0x15,0x55,0x65,0xd5):
   assert pointer_pc is None and value==tag
   if {0x15:tag==imm,0x55:tag!=imm,0x65:tag>imm,0xd5:tag<=imm}[op]:nxt=pc+8+r['branch_offset']*8
  else:raise AssertionError('unknown instruction')
  pc=nxt
 raise AssertionError('path did not reach formatter call')

CONSUMER_PATH={0:(0x7b,0x2a,-16,0),8:(0x7b,0x1a,-24,0),32:(0x7b,0x1a,-8,0),40:(0x79,0x38,32,0),48:(0x7b,0x3a,-40,0),56:(0x15,0x08,61,0),552:(0x79,0x31,24,0),560:(0x15,0x01,36,0),856:(0xb7,0x07,0,0),864:(0x79,0xa2,-40,0),872:(0x79,0x21,8,0),880:(0x3d,0x17,12,0),888:(0x67,0x07,0,4),896:(0x79,0x21,0,0),904:(0x0f,0x71,0,0),912:(0x79,0x13,8,0),920:(0x79,0x12,0,0),928:(0x79,0xa1,-16,0),936:(0x79,0x14,24,0),944:(0x79,0xa1,-24,0),952:(0x8d,0,0,4)}
def consumer(e,w):
 """Known one-piece/zero-argument path, stopping before an unknown callback."""
 assert w['end']-w['start']==1000
 for offset,expected in CONSUMER_PATH.items():
  pc=w['start']+offset;assert pc not in e.rel
  assert struct.unpack_from('<BBhi',e.b,pc)==expected,'counted consumer path changed'
 # This constant only initializes local format options, never pointer/count.
 op,reg,off,imm=struct.unpack_from('<BBhi',e.b,w['start']+16)
 assert(op,reg,off)==(0x18,1,0)and w['start']+16 not in e.rel
 assert struct.unpack_from('<I',e.b,w['start']+24)[0]==0
 # Proven caller fields: options=None -> 56 to552; args.len=0 ->560 to856;
 # pieces.len=1 and index=0 ->880 falls through; index<<4 stays0.
 assert 56+8+61*8==552 and 560+8+36*8==856
 return dict(start=w['start'],path_offsets=[0,8,16,32,40,48,56,552,560,856,864,872,880,888,896,904,912,920,928,936,944,952],preconditions=dict(format_options_pointer=0,dynamic_argument_count=0,piece_count=1),descriptor_index=0,descriptor_stride=16,pointer_read_offset=0,length_read_offset=8,writer_pointer_register=2,writer_length_register=3,unresolved_writer_table_offset=24,unresolved_writer_call_offset=952,scope='stops before unresolved callback; no runtime or arbitrary dispatch claim')

def inspect(original,candidate,root):
 names=prior(root);data=names.base_reader(root);prefix,writer,_=data.readers(root/names.BASE,root)
 before=names.inspect(original,candidate,root);initial={tuple(p)for p in before['active_pairs']};context=source_context(root)
 o,c=prefix.elves(original,candidate);rows=json.loads((prefix.M/'original-windows.json').read_bytes());ow={r['start']:o.window(r['start'],r['start']+r['bytes'])for r in rows};cw,symbols=prefix.q.tables(c)
 edges={};bad=set();observations=[];owner_pairs=[];failed=[];consumer_observations=[]
 for a,b in sorted(initial):
  left,right=ow[a],cw[b];edges[a,b]=[(x['target'],y['target'])for x,y in zip(left['direct'],right['direct'])];rd={x['offset']:x for x in right['data_references']}
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
  if a!=OWNER:continue
  assert any('anchor_lang..error..ErrorCode' in n and 'Display' in n for n in symbols[b])
  owner_pairs.append((a,b));ld=instructions(o,left);cd=instructions(c,right);lv=set();cv=set()
  original_wrapper=ow[ld[3]];candidate_wrapper=cw[cd[3]]
  assert original_wrapper['end']-original_wrapper['start']==candidate_wrapper['end']-candidate_wrapper['start']==16
  assert len(original_wrapper['direct'])==len(candidate_wrapper['direct'])==1
  original_consumer=original_wrapper['direct'][0]['target'];candidate_consumer=candidate_wrapper['direct'][0]['target']
  assert(original_consumer,candidate_consumer)in initial
  assert any('core3fmt5write' in n for n in symbols[candidate_consumer])
  consumer_observations.append(dict(original_wrapper=ld[3],candidate_wrapper=cd[3],original=consumer(o,ow[original_consumer]),candidate=consumer(c,cw[candidate_consumer])))
  for variant in context['variants']:
   x=trace(o,left,ld,variant['tag']);y=trace(c,right,cd,variant['tag']);expected=variant['message'].encode()
   lv.update(x['path_offsets']);cv.update(y['path_offsets'])
   good=(x['length']==y['length']==len(expected)and x['bytes_hex']==y['bytes_hex']==expected.hex()and x['path_offsets']==y['path_offsets']and x['pointer_offset']==y['pointer_offset']and x['call_offset']==y['call_offset']and(x['call_target'],y['call_target'])in initial)
   if not good:bad.add((a,b));failed.append(variant['tag'])
   assert any('Formatter9write_fmt' in n for n in symbols[y['call_target']])
   observations.append(dict(**variant,original_owner=a,candidate_owner=b,original=x,candidate=y,bytes_and_count_equal=good,callee_names=sorted(symbols[y['call_target']])))
  assert lv=={p-a for p in ld[0]},'unvisited original branch instructions'
  assert cv=={p-b for p in cd[0]},'unvisited candidate branch instructions'
 active=initial-bad;rounds=[]
 while True:
  lost={p for p in active if any(t not in active for t in edges[p])}
  if not lost:break
  active-=lost;rounds.append(len(lost))
 for r in observations:r['owner_closed']=(r['original_owner'],r['candidate_owner'])in active
 spans=sorted({(r['original']['pointer'],r['original']['length'])for r in observations});records={r['original']['descriptor']for r in observations}
 for(a,n),(b,m)in zip(spans,spans[1:]):assert a+n<=b,'overlapping literal intervals'
 return dict(summary=dict(normalized_windows=before['summary']['normalized_windows'],raw_windows=before['summary']['raw_windows'],base_windows=before['summary']['extended_windows'],base_pairs=len(initial),extended_windows=len({a for a,b in active}),extended_pairs=len(active),source_variants=len(context['variants']),owner_pairs=len(owner_pairs),literal_spans=len(spans),literal_bytes=sum(n for a,n in spans),descriptor_records=len(records),descriptor_raw_field_bytes=12*len(records),descriptor_pointer_field_bytes=4*len(records),reference_sites=len({r['original']['pointer_offset']for r in observations}),rejected_pairs=len(initial-active),pruning_rounds=rounds,failed_tags=failed),source_context=context,active_pairs=[list(p)for p in sorted(active)],observations=observations,consumer_paths=consumer_observations)

def coverage_delta(root,report):
 names=prior(root);p=root/NAMES/'coverage-delta.json';old=json.loads(p.read_bytes())
 coverage=json.loads((root/'research/mayhem-current437-data-coverage-20261028/coverage.json').read_bytes())
 def union(intervals):
  out=[]
  for a,b in sorted(map(tuple,intervals)):
   if out and a<=out[-1][1]:out[-1][1]=max(b,out[-1][1])
   else:out.append([a,b])
  return out
 additions=[]
 for r in report['observations']:
  x=r['original'];additions.extend([('.rodata','raw_equal',x['pointer'],x['pointer']+x['length']),('.data.rel.ro','raw_equal',x['descriptor'],x['descriptor']+4),('.data.rel.ro','pointer_correspondence',x['descriptor']+4,x['descriptor']+8),('.data.rel.ro','raw_equal',x['descriptor']+8,x['descriptor']+16)])
 sections=[]
 for section in coverage['coverage_by_section']:
  if section['section']not in('.rodata','.data.rel.ro'):continue
  sec=section['section'];raw=old['covered_intervals_after']if sec=='.rodata'else section['raw_intervals'];mapped=section['mapped_intervals'];before=union(raw+mapped)
  raw=union(raw+[(a,b)for s,m,a,b in additions if s==sec and m=='raw_equal']);mapped=union(mapped+[(a,b)for s,m,a,b in additions if s==sec and m=='pointer_correspondence']);after=union(raw+mapped)
  sections.append(dict(section=sec,total_bytes=section['bytes'],raw_equal_bytes=sum(b-a for a,b in raw),pointer_only_bytes=sum(b-a for a,b in after)-sum(b-a for a,b in raw),covered_bytes=sum(b-a for a,b in after),new_bytes=sum(b-a for a,b in after)-sum(b-a for a,b in before),covered_intervals=after,raw_intervals=raw,mapped_intervals=mapped))
 return dict(scope='Exact counted literal bytes and 16-byte descriptor fields only; no allocation extents.',prior_names_delta_sha256=sha(p.read_bytes()),sections=sections,new_payload_bytes=sum(x['new_bytes']for x in sections),payload_covered_bytes=sum(x['covered_bytes']for x in sections),payload_total_bytes=sum(x['total_bytes']for x in sections))

def check(packet,root):
 paths=list(packet.rglob('*'));assert not any(p.is_symlink()for p in paths),'packet symlink';assert all(p.is_file()or p.is_dir()for p in paths),'packet special file'
 assert{str(p.relative_to(packet)):sha(p.read_bytes())for p in paths if p.is_file()and p!=packet/'manifest.json'}==json.loads((packet/'manifest.json').read_bytes()),'packet inventory differs'
 for path,digest in json.loads((packet/'inputs.json').read_bytes()).items():
  p=Path(path);assert not p.is_absolute()and'..'not in p.parts
  assert sha((root/p).read_bytes())==digest,path
 names=prior(root);names.check(root/NAMES,root);data=names.base_reader(root)
 report=inspect((root/'evidence/original/mayhem/deployed.so').read_bytes(),data.inputs(root,'mayhem-current437-composition-20261028'),root)
 assert report==json.loads(gzip.decompress((packet/'observations.json.gz').read_bytes())),'fresh observations differ'
 delta=coverage_delta(root,report);assert delta==json.loads((packet/'coverage-delta.json').read_bytes()),'coverage delta differs'
 assert(delta['new_payload_bytes'],delta['payload_covered_bytes'],delta['payload_total_bytes'])==(4800,12910,26180)
 s=report['summary'];assert(s['normalized_windows'],s['raw_windows'],s['extended_windows'],s['extended_pairs'],s['source_variants'],s['owner_pairs'],s['literal_spans'],s['literal_bytes'],s['descriptor_records'],s['reference_sites'],s['rejected_pairs'])==(437,141,431,581,77,1,77,3568,77,77,0)
 assert all(r['owner_closed']and r['bytes_and_count_equal']for r in report['observations'])
 return s
