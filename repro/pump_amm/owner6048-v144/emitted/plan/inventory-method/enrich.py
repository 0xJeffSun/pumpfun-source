#!/usr/bin/env python3
"""Deterministic additional body/data/provenance comparisons. No target execution."""
from pathlib import Path
import collections,json,struct,sys,re,tomllib
sys.dont_write_bytecode=True
from analyze import Elf,SHA,delta,ins,instructions,dump,headers
P=Path(__file__).resolve().parent;B=P/'inputs/repro/pump_amm/update-event-borrow-v144';A=Path(sys.argv[sys.argv.index('--out')+1])if '--out'in sys.argv else P/'analysis'
def main():
 o=Elf(P/'inputs/evidence/original/pump_amm/deployed.so');c=Elf(B/'candidate.so');s=Elf(B/'unstripped.so')
 ledger=json.loads((A/'residual-ledger.json').read_text());ors=ledger['original'];crs=ledger['candidate'];om={r['start']:r for r in ors};cm={r['start']:r for r in crs}
 # Complete symbol tables including undefined/data/zero-sized entries.
 allsyms={}
 for label,e in [('original',o),('candidate',c),('unstripped',s)]:
  rows=[]
  for secname,sec in e.secs.items():
   if sec[1]not in (2,11):continue
   st=e.raw[sec[6]];strings=e.b[st[4]:st[4]+st[5]]
   for i,at in enumerate(range(sec[4],sec[4]+sec[5],sec[9]or 24)):
    n,info,other,idx,value,size=struct.unpack_from('<IBBHQQ',e.b,at)
    rows.append(dict(table=secname,index=i,file_offset=at,name=strings[n:].split(b'\0',1)[0].decode(),name_offset=n,info=info,other=other,section_index=idx,value=value,size=size,raw_hex=e.b[at:at+24].hex()))
  allsyms[label]=rows
 dump(A/'all-symbols.json',allsyms)
 lock=P/'inputs/programs/pump-amm/Cargo.lock';packages=tomllib.loads(lock.read_text())['package']
 dump(A/'dependency-provenance.json',dict(lock_sha256=SHA(lock.read_bytes()),packages=packages,limitation='Frozen accepted lock graph only; historical original dependencies and optimizer decisions remain unknown; no registry source downloaded.'))
 oh,ch=headers(o),headers(c)
 dump(A/'header-differences.json',dict(fields={k:dict(original=v,candidate=ch['header'][k])for k,v in oh['header'].items()if v!=ch['header'][k]},program_headers_original=oh['program_headers'],program_headers_candidate=ch['program_headers'],relocations_original=len(oh['relocations']),relocations_candidate=len(ch['relocations'])))
 shape=collections.defaultdict(list)
 for r in crs:shape[(r['bytes'],json.dumps(r['relocations'],sort_keys=True))].append(r)
 near=[]
 for r in ors:
  if r['candidate_matches']:continue
  for q in shape[(r['bytes'],json.dumps(r['relocations'],sort_keys=True))]:
   a,b,n=r['start'],q['start'],r['bytes'];diff=[d for d in range(0,n,8)if o.normalized[a+d:a+d+8]!=c.normalized[b+d:b+d+8]]
   if len(diff)>4:continue
   near.append(dict(original_start=a,candidate_start=b,bytes=n,names=q['names'],status='similarity lead only; no equality',differences=[dict(offset=d,original=ins(o,a+d),candidate=ins(c,b+d))for d in diff],raw_comparison=delta(o.b[a:a+n],c.b[b:b+n]),actual_call_pairs=[dict(offset=x['offset'],original_target=x['target'],candidate_target=c.calls.get(b+x['offset']),normalized_body_option=c.calls.get(b+x['offset'])in [m['start']for m in om.get(x['target'],{}).get('candidate_matches',[])])for x in r['direct_calls']]))
 dump(A/'near-shape-residuals.json',near)
 # Every pointer relocation, including data-to-data edges, at its actual encoded site.
 graph={}
 for label,e in [('original',o),('candidate',c)]:
  rels=headers(e)['relocations'];out=[]
  for r in rels:
   x=dict(r)
   if 'pointer'in x:
    p=x['pointer'];regions=x['target_region'];x['candidate_recursive_relocation_edges']=[]
    if regions:
     # Preview bounded by section end, never declared consumed data.
     reg=regions[0];sec=e.secs[reg['section']];off=reg['file_offset'];n=min(64,sec[4]+sec[5]-off)
     raw=e.b[off:off+n];x['preview']=dict(file_start=off,bytes=n,sha256=SHA(raw),hex=raw.hex(),status='preview only; extent not proven')
     x['candidate_recursive_relocation_edges']=[z['address']for z in rels if off<=z['address']<off+n]
    x['recursive_edges_status']='only relocations in preview; full object extent, runtime loads and nonrelocated pointers unresolved'
   out.append(x)
  graph[label]=out
 dump(A/'relocation-data-graph.json',graph)
 # Every file region and tail; no stripping or allocation-padding fabrication.
 layouts={}
 for label,e in [('original',o),('candidate',c),('unstripped',s)]:
  h=headers(e)['header'];regions=[(0,h['ehsize'],'ELF header'),(h['phoff'],h['phoff']+h['phnum']*h['phentsize'],'program headers'),(h['shoff'],h['shoff']+h['shnum']*h['shentsize'],'section headers')]+[(v[4],v[4]+v[5],k)for k,v in e.secs.items()if v[1]!=8 and v[5]]
  extent=max(b for a,b,k in regions);bounds=sorted({0,len(e.b),*[a for a,b,k in regions],*[b for a,b,k in regions]});rows=[]
  for a,b in zip(bounds,bounds[1:]):
   raw=e.b[a:b];owners=[k for x,y,k in regions if x<=a and b<=y]
   rows.append(dict(start=a,end=b,bytes=b-a,sha256=SHA(raw),nonzero_bytes=sum(v!=0 for v in raw),owners=owners,status='mapped region'if owners else'outside declared ELF structures; preserved as bytes'))
  layouts[label]=dict(file_bytes=len(e.b),declared_file_extent=extent,tail_bytes=len(e.b)-extent,tail_sha256=SHA(e.b[extent:]),tail_nonzero_bytes=sum(v!=0 for v in e.b[extent:]),regions=rows)
 dump(A/'file-region-coverage.json',layouts)
 # Current source coordinates are observations, not requests to spoof historical paths.
 sources=[]
 for path in sorted((P/'inputs/programs/pump-amm').rglob('*.rs')):
  raw=path.read_bytes();lines=raw.decode().splitlines()
  for i,line in enumerate(lines,1):
   m=re.search(r'\bfn\s+(\w+)',line)
   if m:sources.append(dict(file=str(path.relative_to(P)),file_sha256=SHA(raw),line=i,declaration=line.strip(),function=m[1],candidate_symbol_windows=[r['start']for r in crs if any(m[1]in n for n in r['names'])],limit='name substring is an attribution lead, not source-map proof'))
 dump(A/'source-function-index.json',sources)
 # Explicit raw/normalized mismatches for every known focused pair.
 f=json.loads((B/'static-comparison.json').read_text());focused=[]
 for label,r in f['roots'].items():
  a,b,n,k=r['original']['address'],r['candidate']['address'],r['original']['bytes'],r['candidate']['bytes']
  focused.append(dict(label=label,original_start=a,candidate_start=b,original_sha256=SHA(o.b[a:a+n]),candidate_sha256=SHA(c.b[b:b+k]),raw=delta(o.b[a:a+n],c.b[b:b+k]),normalized=delta(o.normalized[a:a+n],c.normalized[b:b+k]),actual_original_instructions=list(instructions(o,a,n)),actual_candidate_instructions=list(instructions(c,b,k)),accepted_static_evidence=r,status='static-only initializer'if label.startswith('create')or label=='init_helper'else'body comparison; transitive obligations separate'))
 dump(A/'focused-body-differences.json',focused)
 # All original rows remain open for at least original provenance/semantic identity.
 lines=['side\tstart\tend\tbytes\tcategory\tstatus\tnames']
 for side,rows in [('original',ors),('candidate',crs)]:
  for r in rows:lines.append('\t'.join([side,hex(r['start']),hex(r['end']),str(r['bytes']),r['residual_category'],r['status'],' | '.join(r['names']or r.get('historical_labels_untrusted',[]))]))
 (A/'all-window-dispositions.tsv').write_text('\n'.join(lines)+'\n')
 summary=dict(near_shape_pairs=len(near),near_shape_originals=len({r['original_start']for r in near}),symbols={k:len(v)for k,v in allsyms.items()},regions={k:{x:y for x,y in v.items()if x!='regions'}for k,v in layouts.items()},original_categories=dict(collections.Counter(r['residual_category']for r in ors)),candidate_categories=dict(collections.Counter(r['residual_category']for r in crs)))
 dump(A/'enrichment-summary.json',summary);print(json.dumps(summary,indent=2))
if __name__=='__main__':main()
