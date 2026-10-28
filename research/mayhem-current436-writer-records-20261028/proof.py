"""Extend the existing selected-data relation with four complete method slots."""
from pathlib import Path
if not __debug__:raise RuntimeError("Assertions are required")
import importlib.util,json,struct
def module(name,path):
 spec=importlib.util.spec_from_file_location(name,path);out=importlib.util.module_from_spec(spec);spec.loader.exec_module(out);return out

def record48(base,elf,windows,address):
 first=base.prefix(elf,windows,address)
 if first is None:return None
 sections=[s for s in elf.sections if s['type']!=8 and s['address']<=address and address+48<=s['address']+s['size']]
 if len(sections)!=1:return None
 section=sections[0];at=section['offset']+address-section['address'];words=struct.unpack_from('<6Q',elf.b,at)
 targets=first['targets'][:]
 for offset in (32,40):
  value=words[offset//8];reloc=elf.rel.get(address+offset)
  if not reloc or reloc['type']!=8 or value&0xffffffff or value>>32 not in windows:return None
  targets.append(value>>32)
 return {'address':address,'bytes':48,'scalars':first['scalars'],'slots':[0,24,32,40],'targets':targets}

def inspect(original,candidate,root):
 base=module("prefix_extension_base",root/"research/mayhem-current436-selected-prefixes-20261027/reader.py")
 before=base.inspect(original,candidate)
 o,c=base.elves(original,candidate);rows=json.loads((base.M/'original-windows.json').read_bytes())
 ow={r['start']:o.window(r['start'],r['start']+r['bytes'])for r in rows};cw,names=base.q.tables(c)
 initial={tuple(p)for p in before['active_pairs']};edges={};bad=set();tables=[]
 for a,b in sorted(initial):
  left,right=ow[a],cw[b]
  edges[a,b]=[(x['target'],y['target'])for x,y in zip(left['direct'],right['direct'])]
  ld={r['offset']:r for r in left['data_references']};rd={r['offset']:r for r in right['data_references']}
  for offset,x in ld.items():
   y=rd[offset]
   if x['kind']=='code':edges[a,b].append((x['target'],y['target']))
   prefix=base.prefix(o,ow,x['target'])
   if prefix:
    other=base.prefix(c,cw,y['target']);assert other is not None
    edges[a,b].extend((u,v)for u,v in zip(prefix['targets'],other['targets'])if u is not None)
   selected=record48(base,o,ow,x['target'])
   if selected is None:continue
   paired=record48(base,c,cw,y['target']);valid=bool(paired and selected['scalars']==paired['scalars']and all((u is None)==(v is None)for u,v in zip(selected['targets'],paired['targets'])))
   row={'original_owner':a,'candidate_owner':b,'reference_offset':offset,'original':selected,'candidate':paired,'shape_equal':valid}
   tables.append(row)
   if not valid:bad.add((a,b));continue
   edges[a,b].extend((u,v)for u,v in zip(selected['targets'],paired['targets'])if u is not None)
 active=initial-bad;rounds=[]
 while True:
  lost={p for p in active if any(edge not in active for edge in edges[p])}
  if not lost:break
  rounds.append(len(lost));active-=lost
 for row in tables:
  row['owner_closed']=(row['original_owner'],row['candidate_owner'])in active
  row['methods']=[]
  if row['candidate']:
   for slot,u,v in zip(row['original']['slots'],row['original']['targets'],row['candidate']['targets']):
    row['methods'].append({'slot':slot,'original':u,'candidate':v,'target_closed':u is None or(u,v)in active,'candidate_names':sorted(names.get(v,[]))})
 return {'summary':{'normalized_windows':before['summary']['normalized_windows'],'raw_windows':before['summary']['raw_windows'],'base_selected_windows':len({a for a,b in initial}),'base_selected_pairs':len(initial),'extended_windows':len({a for a,b in active}),'extended_pairs':len(active),'lost_windows':sorted({a for a,b in initial}-{a for a,b in active}),'extra_rejected_pairs':len(initial-active),'selected_original_records':len({r['original']['address']for r in tables}),'selected_original_sites':len({(r['original_owner'],r['reference_offset'])for r in tables}),'record_observations':len(tables),'malformed_owner_pairs':len(bad),'pruning_rounds':rounds},'active_pairs':[list(p)for p in sorted(active)],'records':tables}


def sha(data):
 return __import__('hashlib').sha256(data).hexdigest()

def inputs(root):
 import gzip
 return ((root/'evidence/original/mayhem/deployed.so').read_bytes(),gzip.decompress((root/'research/mayhem-current436-composition-20261027/builds/first/symbols.so.gz').read_bytes()))

def check(packet,root):
 paths=list(packet.rglob('*'))
 assert not any(p.is_symlink()for p in paths),'packet symlink'
 assert all(p.is_file()or p.is_dir()for p in paths),'packet special file'
 actual={str(p.relative_to(packet)):sha(p.read_bytes())for p in paths if p.is_file()and p!=packet/'manifest.json'}
 assert actual==json.loads((packet/'manifest.json').read_bytes()),'packet inventory differs'
 for name,digest in json.loads((packet/'inputs.json').read_bytes()).items():assert sha((root/name).read_bytes())==digest,name
 contexts=json.loads((packet/'source-context.json').read_bytes())
 for item in contexts:
  text=(packet/item['file']).read_text();assert sha(text.encode())==item['sha256']
  lo,hi=item['lines'];assert 0<lo<=hi<=len(text.splitlines())
 trait=(packet/'source-context/core-fmt.rs').read_text().split('pub trait Write {',1)[1].split('#[stable(feature = "fmt_write_blanket_impl"',1)[0]
 assert trait.index('fn write_str(')<trait.index('fn write_char(')<trait.index('fn write_fmt(')
 for name,marker in [('alloc-string.rs','impl fmt::Write for String {'),('core-fmt-builders.rs',"impl fmt::Write for PadAdapter<'_, '_> {")]:
  text=(packet/'source-context'/name).read_text().split(marker,1)[1]
  assert text.index('fn write_str(')<text.index('fn write_char(')
 result=inspect(*inputs(root),root)
 assert result==json.loads((packet/'observations.json').read_bytes()),'fresh observation differs'
 summary=result['summary'];assert(summary['normalized_windows'],summary['raw_windows'],summary['extended_windows'],summary['extended_pairs'])==(436,141,429,579)
 assert(summary['selected_original_records'],summary['selected_original_sites'],summary['record_observations'])==(5,47,47)
 assert not summary['lost_windows']and not summary['extra_rejected_pairs']and not summary['malformed_owner_pairs']
 for row in result['records']:
  assert row['owner_closed']and all(m['target_closed']for m in row['methods'])
  for slot,fragment in [(24,'9write_str'),(32,'10write_char'),(40,'9write_fmt')]:
   method=next(m for m in row['methods']if m['slot']==slot)
   assert any(fragment in name and 'Write' in name for name in method['candidate_names'])
 return summary
