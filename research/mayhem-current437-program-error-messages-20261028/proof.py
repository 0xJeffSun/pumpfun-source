"""Counted static ProgramError Display messages on qualified437 images.

Custom-number formatting is excluded. Each selected path stops at the writer
callback after checking the actual pointer/length register forwarding.
"""
from pathlib import Path
import gzip,hashlib,importlib.util,json,re,struct,tarfile,tomllib
if not __debug__:raise RuntimeError('Assertions are required')
P=Path(__file__).resolve().parent
PRIOR='research/mayhem-current437-error-messages-20261028'
OWNER=664640
sha=lambda b:hashlib.sha256(b).hexdigest()
def module(name,path):
 s=importlib.util.spec_from_file_location(name,path);m=importlib.util.module_from_spec(s);s.loader.exec_module(m);return m
def prior(root):return module('program_error_prior',root/PRIOR/'proof.py')

def source_context(packet,root):
 with tarfile.open(root/'research/mayhem-current437-composition-20261028/source.tar.gz')as t:lock=tomllib.loads(t.extractfile('Cargo.lock').read().decode())
 packages=[p for p in lock['package']if p['name']=='solana-program-error'];assert len(packages)==1
 package=packages[0];assert package['version']=='3.0.1'
 path=packet/'source-context/solana-program-error-3.0.1.crate';assert sha(path.read_bytes())==package['checksum']
 with tarfile.open(path)as t:source=t.extractfile('solana-program-error-3.0.1/src/lib.rs').read().decode()
 start=source.index('pub enum ProgramError {')+len('pub enum ProgramError {');end=source.index('\n}',start)
 body=source[start:end];body=re.sub(r'//[^\n]*','',body)
 variants=[]
 for part in body.split(','):
  part=part.strip()
  if not part:continue
  match=re.fullmatch(r'([A-Z][A-Za-z0-9_]*)(\(u32\))?',part);assert match,part
  variants.append(match[1])
 assert len(variants)==26 and variants[0]=='Custom'
 start=source.index('impl fmt::Display for ProgramError');end=source.index('\n/// A trait',start);display=source[start:end]
 arms=re.findall(r'ProgramError::([A-Za-z0-9_]+)\s*=>\s*f.write_str\(("(?:[^"\\]|\\.)*")\)',display)
 assert len(arms)==25 and [name for name,raw in arms]==variants[1:]
 assert 'ProgramError::Custom(num) => write!(f,"Custom program error: {num:#x}")'in display
 return dict(crate_sha256=package['checksum'],source_sha256=sha(source.encode()),static_variants=[dict(observed_tag=i+1,name=name,message=json.loads(raw))for i,(name,raw)in enumerate(arms)],excluded_variant='Custom',tag_scope='Observed compiler tags validated against these images, not a stable Rust enum ABI')

def counted(e,pointer,length):
 assert 0<length<=256
 ss=[s for s in e.sections if s['name']=='.rodata'and s['type']!=8 and s['flags']&2 and s['address']<=pointer<pointer+length<=s['address']+s['size']]
 assert len(ss)==1 and not any(pointer<=r<pointer+length for r in e.rel)
 s=ss[0];at=s['offset']+pointer-s['address'];return e.b[at:at+length]

def trace(e,w,tag):
 pc=w['start'];r1='enum';r2='formatter';r3=None;pointer_pc=None;length_pc=None;visited=[]
 # Only the selected fixed-message paths are interpreted; tag0 is excluded.
 assert 1<=tag<=25
 for _ in range((w['end']-w['start'])//8):
  assert w['start']<=pc<w['end']and pc%8==0 and pc not in visited
  visited.append(pc);op,reg,off,imm=struct.unpack_from('<BBhi',e.b,pc);nxt=pc+8
  if op==0x61:
   assert pc==w['start']and(reg,off,imm)==(0x13,0,0)and r1=='enum';r3=tag
  elif op in(0x15,0x55,0x65,0xd5):
   assert reg==3 and r3==tag and pointer_pc is None
   if {0x15:tag==imm,0x55:tag!=imm,0x65:tag>imm,0xd5:tag<=imm}[op]:nxt=pc+8+off*8
  elif op==0xbf:
   assert(reg,off,imm)==(0x21,0,0)and r2=='formatter';r1=r2
  elif op==0x18:
   assert(reg,off)==(2,0)and pointer_pc is None
   assert e.rel.get(pc,{}).get('type')==8 and e.rel[pc]['symbol_index']==0
   assert not any(pc<r<pc+16 for r in e.rel)
   continuation,high=struct.unpack_from('<II',e.b,pc+8);assert continuation==0
   r2=(imm&0xffffffff)|(high<<32);pointer_pc=pc;nxt=pc+16
  elif op==0xb7:
   assert(reg,off)==(3,0)and pointer_pc is not None and 0<imm<=256;r3=imm;length_pc=pc
  elif op==0x05:
   assert(reg,imm)==(0,0);nxt=pc+8+off*8
  elif op==0x85:
   assert(reg,off)==(0x10,0)and pc==w['end']-16 and pc not in e.rel
   assert r1=='formatter'and isinstance(r2,int)and pointer_pc is not None and length_pc is not None
   assert struct.unpack_from('<BBhi',e.b,pc+8)==(0x95,0,0,0)
   return dict(pointer=r2,length=r3,bytes_hex=counted(e,r2,r3).hex(),pointer_offset=pointer_pc-w['start'],length_offset=length_pc-w['start'],call_offset=pc-w['start'],call_target=pc+8+imm*8,path_offsets=[p-w['start']for p in visited],formatter_argument_preserved=True)
  else:raise AssertionError(f'outside fixed-message grammar at {pc-w["start"]}: {op:#x}')
  pc=nxt
 raise AssertionError('no counted writer call')

WRITER=[(0x79,0x14,0,0),(0x79,0x11,8,0),(0x79,0x15,24,0),(0xbf,0x41,0,0),(0x8d,0,0,5),(0x95,0,0,0)]
def writer(e,w):
 assert w['end']-w['start']==48
 for index,expected in enumerate(WRITER):
  pc=w['start']+index*8;assert pc not in e.rel
  assert struct.unpack_from('<BBhi',e.b,pc)==expected,'writer forwarding changed'
 return dict(start=w['start'],bytes=48,pointer_register_preserved=2,length_register_preserved=3,formatter_data_offset=0,formatter_table_offset=8,unresolved_writer_slot=24,unresolved_call_offset=32,scope='Stops before unresolved callback; no callback target or runtime effect claim')

def inspect(packet,original,candidate,root):
 previous=prior(root);names=previous.prior(root);data=names.base_reader(root);prefix,records,_=data.readers(root/names.BASE,root)
 before=previous.inspect(original,candidate,root);initial={tuple(p)for p in before['active_pairs']};context=source_context(packet,root)
 o,c=prefix.elves(original,candidate);rows=json.loads((prefix.M/'original-windows.json').read_bytes());ow={r['start']:o.window(r['start'],r['start']+r['bytes'])for r in rows};cw,symbols=prefix.q.tables(c)
 edges={};bad=set();observations=[];owner_pairs=[];writer_rows=[];covered=[]
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
  assert any('solana_program_error..ProgramError' in n and 'Display' in n for n in symbols[b]);owner_pairs.append((a,b));lv=set();cv=set()
  for variant in context['static_variants']:
   tag=variant['observed_tag'];x=trace(o,left,tag);y=trace(c,right,tag);message=variant['message'].encode();lv.update(x['path_offsets']);cv.update(y['path_offsets'])
   good=(x['length']==y['length']==len(message)and x['bytes_hex']==y['bytes_hex']==message.hex()and x['path_offsets']==y['path_offsets']and x['pointer_offset']==y['pointer_offset']and x['length_offset']==y['length_offset']and x['call_offset']==y['call_offset']and(x['call_target'],y['call_target'])in initial)
   if not good:bad.add((a,b))
   observations.append(dict(**variant,original_owner=a,candidate_owner=b,original=x,candidate=y,bytes_and_count_equal=good))
  x,y=observations[-1]['original']['call_target'],observations[-1]['candidate']['call_target']
  assert any('Formatter9write_str' in name for name in symbols[y]);writer_rows.append(dict(original=writer(o,ow[x]),candidate=writer(c,cw[y]),candidate_names=sorted(symbols[y])))
  # All 25 explicit literal-load and length-move sites must be selected. The
  # separate Custom formatting region is recorded as untraced, never inferred.
  literal_offsets={r['original']['pointer_offset']for r in observations};length_offsets={r['original']['length_offset']for r in observations}
  assert len(literal_offsets)==len(length_offsets)==25
  covered.append(dict(original_owner=a,candidate_owner=b,original_path_instruction_offsets=sorted(lv),candidate_path_instruction_offsets=sorted(cv),excluded_source_variant='Custom',untraced_instruction_offsets=sorted(set(range(0,left['end']-a,8))-lv-{p+8 for p in literal_offsets})))
 active=initial-bad;rounds=[]
 while True:
  lost={p for p in active if any(t not in active for t in edges[p])}
  if not lost:break
  active-=lost;rounds.append(len(lost))
 for r in observations:r['owner_closed']=(r['original_owner'],r['candidate_owner'])in active
 spans=sorted({(r['original']['pointer'],r['original']['length'])for r in observations})
 for(a,n),(b,m)in zip(spans,spans[1:]):assert a+n<=b
 return dict(summary=dict(normalized_windows=before['summary']['normalized_windows'],raw_windows=before['summary']['raw_windows'],base_windows=before['summary']['extended_windows'],base_pairs=len(initial),extended_windows=len({a for a,b in active}),extended_pairs=len(active),static_variants=25,excluded_variants=['Custom'],owner_pairs=len(owner_pairs),literal_spans=len(spans),literal_bytes=sum(n for a,n in spans),rejected_pairs=len(initial-active),pruning_rounds=rounds),source_context=context,active_pairs=[list(p)for p in sorted(active)],observations=observations,writer_paths=writer_rows,path_coverage=covered)

def coverage_delta(root,report):
 previous=root/PRIOR/'coverage-delta.json';before=json.loads(previous.read_bytes());after=[]
 def union(intervals):
  out=[]
  for a,b in sorted(map(tuple,intervals)):
   if out and a<=out[-1][1]:out[-1][1]=max(b,out[-1][1])
   else:out.append([a,b])
  return out
 for s in before['sections']:
  row=dict(s);old=s['covered_bytes'];add=[(r['original']['pointer'],r['original']['pointer']+r['original']['length'])for r in report['observations']]if s['section']=='.rodata'else[]
  row['raw_intervals']=union(s['raw_intervals']+add);row['covered_intervals']=union(row['raw_intervals']+s['mapped_intervals']);row['covered_bytes']=sum(b-a for a,b in row['covered_intervals']);row['raw_equal_bytes']=sum(b-a for a,b in row['raw_intervals']);row['new_bytes']=row['covered_bytes']-old;after.append(row)
 return dict(scope='Counted static ProgramError messages only; no Custom formatting or allocation extents.',prior_messages_delta_sha256=sha(previous.read_bytes()),sections=after,new_payload_bytes=sum(s['new_bytes']for s in after),payload_covered_bytes=sum(s['covered_bytes']for s in after),payload_total_bytes=before['payload_total_bytes'])

def check(packet,root):
 paths=list(packet.rglob('*'));assert not any(p.is_symlink()for p in paths),'packet symlink';assert all(p.is_file()or p.is_dir()for p in paths),'packet special file'
 assert{str(p.relative_to(packet)):sha(p.read_bytes())for p in paths if p.is_file()and p!=packet/'manifest.json'}==json.loads((packet/'manifest.json').read_bytes()),'packet inventory differs'
 for path,digest in json.loads((packet/'inputs.json').read_bytes()).items():
  p=Path(path);assert not p.is_absolute()and'..'not in p.parts
  assert sha((root/p).read_bytes())==digest,path
 previous=prior(root);previous.check(root/PRIOR,root);data=previous.prior(root).base_reader(root)
 report=inspect(packet,(root/'evidence/original/mayhem/deployed.so').read_bytes(),data.inputs(root,'mayhem-current437-composition-20261028'),root)
 assert report==json.loads(gzip.decompress((packet/'observations.json.gz').read_bytes())),'fresh observations differ'
 delta=coverage_delta(root,report);assert delta==json.loads((packet/'coverage-delta.json').read_bytes()),'coverage delta differs'
 assert(delta['new_payload_bytes'],delta['payload_covered_bytes'],delta['payload_total_bytes'])==(1105,14015,26180)
 s=report['summary'];assert(s['normalized_windows'],s['raw_windows'],s['extended_windows'],s['extended_pairs'],s['owner_pairs'],s['literal_spans'],s['literal_bytes'],s['rejected_pairs'])==(437,141,431,581,1,25,1105,0)
 assert all(r['owner_closed']and r['bytes_and_count_equal']for r in report['observations'])
 return s
