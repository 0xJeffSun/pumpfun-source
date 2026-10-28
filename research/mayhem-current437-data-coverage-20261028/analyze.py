"""Inventory the byte intervals justified by the existing437 data observations."""
from pathlib import Path
from collections import defaultdict
import gzip,hashlib,importlib.util,json,struct
import argparse
parser=argparse.ArgumentParser();parser.add_argument('--output-dir',type=Path,default=Path('work/mayhem437-data-coverage'));args=parser.parse_args()
R=Path.cwd();P=R/'research/mayhem-current437-selected-data-20261028';OUT=args.output_dir.resolve();OUT.mkdir(parents=True,exist_ok=True)
def H(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def module(n,p):
 s=importlib.util.spec_from_file_location(n,p);m=importlib.util.module_from_spec(s);s.loader.exec_module(m);return m
v=module('coverage_data_reader',P/'reader.py');validated=v.check(P,R);prefix,_,_=v.readers(P,R)
data=json.loads(gzip.decompress((P/'observations.json.gz').read_bytes()));o,c=prefix.elves((R/'evidence/original/mayhem/deployed.so').read_bytes(),v.inputs(R,'mayhem-current437-composition-20261028'))
rows=json.loads((prefix.M/'original-windows.json').read_bytes());ow={r['start']:o.window(r['start'],r['start']+r['bytes'])for r in rows};cw,names=prefix.q.tables(c);groups,pairs,_,_=prefix.q.relation(ow,cw);byid={r['start']:r['id']for r in rows};active={tuple(p)for p in data['counted_literals']['active_pairs']}
sections=[s for s in o.sections if s['flags']&2];data_sections=[s for s in sections if s['name']!='.text'];payload_names={'.rodata','.data.rel.ro'}
def section_for(a,b):
 matches=[s for s in sections if s['address']<=a<b<=s['address']+s['size']]
 assert len(matches)==1,(a,b);return matches[0]
spans=[];relocs=defaultdict(list);source_records=defaultdict(set);code_sites=set();direct_roots=[]
def add(a,b,mode,kind,proof):
 s=section_for(a,b);spans.append(dict(start=a,end=b,bytes=b-a,section=s['name'],mode=mode,kind=kind,proof=proof))
def relocation(a,b,why):
 left=o.rel.get(a);right=c.rel.get(b)
 assert left and right and left['type']==right['type']==8
 relocs[a].append(dict(candidate_address=b,why=why))
def pointer(a,b,kind,proof):
 # Data-side R_BPF_64_64 pointer encoding: low u32 zero, high u32 target.
 assert o.b[a:a+4]==c.b[b:b+4]==b'\0'*4
 add(a,a+4,'raw_equal',kind+'.zero_word',proof);add(a+4,a+8,'pointer_correspondence',kind+'.address_word',proof);relocation(a,b,proof)
# Each active pair is already closed under Source/code/prefix/writer/literal obligations.
for a,b in sorted(active):
 left,right=ow[a],cw[b];rd={r['offset']:r for r in right['data_references']}
 for ref in left['data_references']:
  other=rd[ref['offset']];proof={'owner':byid[a],'original_owner':a,'candidate_owner':b,'offset':ref['offset']}
  src=prefix.q.source(o,ref['target'])
  if src:
   assert prefix.q.source(c,other['target'])==src
   x,y=ref['target'],other['target'];z,ptr=struct.unpack_from('<II',o.b,x);n,line,col=struct.unpack_from('<QII',o.b,x+8);cz,cptr=struct.unpack_from('<II',c.b,y);cn,cl,cc=struct.unpack_from('<QII',c.b,y+8)
   assert(z,cz)==(0,0)and(n,line,col)==(cn,cl,cc)
   assert o.b[ptr:ptr+n]==c.b[cptr:cptr+n]
   pointer(x,y,'Source.pointer',proof);add(x+8,x+24,'raw_equal','Source.length_line_column',proof);add(ptr,ptr+n,'raw_equal','Source.filename_including_nul',proof)
   relocation(ref['pc'],other['pc'],proof);source_records[x].add((a,ref['offset']))
  if ref['kind']=='code':
   assert other['kind']=='code' and(ref['target'],other['target'])in active
   for shift in (4,12):add(ref['pc']+shift,ref['pc']+shift+4,'pointer_correspondence','text.code_address_operand',proof)
   relocation(ref['pc'],other['pc'],proof);code_sites.add((a,ref['offset']))
for row in data['selected32']['prefixes']:
 if not row['pair_closed']:continue
 x,y=row['left']['address'],row['right']['address'];proof={'owner':byid[row['original']],'original_owner':row['original'],'candidate_owner':row['candidate'],'offset':row['offset']}
 assert row['shape_equal'];add(x+8,x+24,'raw_equal','prefix32.size_alignment',proof)
 for slot,target in zip((0,24),row['left']['targets']):
  if target is None:
   assert o.b[x+slot:x+slot+8]==c.b[y+slot:y+slot+8]==b'\0'*8;add(x+slot,x+slot+8,'raw_equal','prefix32.null_pointer',proof)
  else:pointer(x+slot,y+slot,'prefix32.function_pointer',proof)
 relocation(row['original']+row['offset'],row['candidate']+row['offset'],proof)
for row in data['writer48']['records']:
 assert row['owner_closed'];x,y=row['original']['address'],row['candidate']['address'];proof={'owner':byid[row['original_owner']],'original_owner':row['original_owner'],'candidate_owner':row['candidate_owner'],'offset':row['reference_offset']}
 for slot in (32,40):pointer(x+slot,y+slot,'writer48.extra_method',proof)
for row in data['counted_literals']['observations']:
 assert row['owner_closed'] and row['bytes_equal'];d=row['original'];proof={'owner':byid[row['original_owner']],'original_owner':row['original_owner'],'candidate_owner':row['candidate_owner'],'offset':d['lddw_offset']}
 add(d['pointer'],d['pointer']+d['length'],'raw_equal','literal.counted_bytes',proof);relocation(row['original_owner']+d['lddw_offset'],row['candidate_owner']+row['candidate']['lddw_offset'],proof)
# Count only the relocation fields actually checked by these obligations.
# r_offset maps the corresponding code/data slot; r_type is exactly8. The
# symbol-index word is not counted merely because the parser read it.
for a,proofs in sorted(relocs.items()):
 row=o.rel[a];at=row['record_offset'];s=next(s for s in data_sections if s['offset']<=at< s['offset']+s['size']);addr=s['address']+at-s['offset']
 add(addr,addr+8,'pointer_correspondence','relocation.r_offset',{'slot':a,'correspondences':proofs})
 add(addr+8,addr+12,'raw_equal','relocation.r_type',{'slot':a,'type':8})
def union(rs):
 out=[]
 for a,b in sorted(rs):
  if out and a<=out[-1][1]:out[-1][1]=max(b,out[-1][1])
  else:out.append([a,b])
 return out
def nbytes(rs):return sum(b-a for a,b in rs)
def complement(a,b,rs):
 out=[];pos=a
 for lo,hi in rs:
  if pos<lo:out.append([pos,lo])
  pos=max(pos,hi)
 if pos<b:out.append([pos,b])
 return out
coverage=[];gaps=[]
for sec in data_sections:
 own=[x for x in spans if x['section']==sec['name']];raw=union((x['start'],x['end'])for x in own if x['mode']=='raw_equal');mapped=union((x['start'],x['end'])for x in own if x['mode']=='pointer_correspondence');all_=union(raw+mapped);missing=complement(sec['address'],sec['address']+sec['size'],all_)
 coverage.append(dict(section=sec['name'],start=sec['address'],end=sec['address']+sec['size'],bytes=sec['size'],class_='payload'if sec['name']in payload_names else'ELF_metadata',raw_equal_bytes=nbytes(raw),pointer_only_bytes=nbytes(all_)-nbytes(raw),covered_bytes=nbytes(all_),uncovered_bytes=sec['size']-nbytes(all_),raw_intervals=raw,mapped_intervals=mapped,covered_intervals=all_,uncovered_intervals=missing))
 for a,b in missing:gaps.append(dict(section=sec['name'],start=a,end=b,bytes=b-a,class_='payload'if sec['name']in payload_names else'ELF_metadata'))
# Read-only references to uncovered positions. These are point xrefs; no extent
# or semantic role is inferred for the containing gap.
for row in rows:
 a=row['start'];w=ow[a];hits=groups[prefix.q.key(w)]
 for ref in w['data_references']:
  if ref['kind']!='data':continue
  ss=[s for s in data_sections if s['address']<=ref['target']<s['address']+s['size']]
  if not ss:continue
  direct_roots.append(dict(owner=row['id'],original_owner=a,offset=ref['offset'],target=ref['target'],normalized_body=bool(hits),selected_data_closed=any((a,b)in active for b in hits),candidate_names=sorted({n for b in hits for n in names[b]})))
incoming=[]
for rel in o.relocations:
 if rel['type']!=8:continue
 a=rel['address'];ss=[s for s in data_sections if s['address']<=a and a+8<=s['address']+s['size']]
 if not ss:continue
 s=ss[0];off=s['offset']+a-s['address'];value=struct.unpack_from('<Q',o.b,off)[0]
 if value&0xffffffff:continue
 target=value>>32
 if any(s['address']<=target<s['address']+s['size']for s in data_sections):incoming.append(dict(slot=a,target=target,source_section=ss[0]['name']))
for gap in gaps:
 a,b=gap['start'],gap['end'];refs=[x for x in direct_roots if a<=x['target']<b];pointers=[x for x in incoming if a<=x['target']<b]
 gap.update(direct_code_xref_count=len(refs),direct_code_owners=sorted({r['owner']for r in refs}),unmatched_code_owners=sorted({r['owner']for r in refs if not r['normalized_body']}),code_xrefs=refs,data_pointer_count=len(pointers),incoming_data_pointers=pointers)
for kind in ['payload','ELF_metadata']:
 selected=sorted((g for g in gaps if g['class_']==kind),key=lambda g:(-g['bytes'],g['start']))
 for i,g in enumerate(selected,1):g['size_rank_within_class']=i
summary={}
for kind in ['payload','ELF_metadata']:
 selected=[s for s in coverage if s['class_']==kind];summary[kind]={k:sum(s[k]for s in selected)for k in ['bytes','raw_equal_bytes','pointer_only_bytes','covered_bytes','uncovered_bytes']}
summary['all_non_text_allocated']={k:sum(s[k]for s in coverage)for k in ['bytes','raw_equal_bytes','pointer_only_bytes','covered_bytes','uncovered_bytes']}
assert summary['payload']['bytes']==26180 and summary['ELF_metadata']['bytes']==41549
assert all(s['covered_bytes']+s['uncovered_bytes']==s['bytes'] and s['raw_equal_bytes']+s['pointer_only_bytes']==s['covered_bytes']for s in coverage)
report=dict(inputs={'analysis_sha256':H(Path(__file__)), 'original_sha256':H(R/'evidence/original/mayhem/deployed.so'),'symbols_sha256':hashlib.sha256(c.b).hexdigest(),'data_packet_manifest_sha256':H(P/'manifest.json')},scope='Coverage from existing selected437 data obligations only. Raw comparisons and pointer/relocation correspondence are separate. Gaps are unproved intervals, not allocations or mismatches.',summary=summary,upstream_proof_summaries=validated,source_sites=sum(len(v)for v in source_records.values()),unique_source_records=len(source_records),code_address_load_sites=len(code_sites),checked_relocation_records=len(relocs),coverage_by_section=coverage,spans=spans,uncovered_ranges=sorted(gaps,key=lambda x:(x['class_'],-x['bytes'],x['start'])))
(OUT/'coverage.json').write_text(json.dumps(report,indent=2)+'\n');print(json.dumps(summary,indent=2));print('source',report['source_sites'],report['unique_source_records'],'code',len(code_sites),'relocations',len(relocs))
for g in sorted((g for g in gaps if g['class_']=='payload'),key=lambda x:-x['bytes'])[:12]:print(g['section'],g['start'],g['end'],g['bytes'],g['direct_code_xref_count'],g['direct_code_owners'][:15],g['data_pointer_count'])
