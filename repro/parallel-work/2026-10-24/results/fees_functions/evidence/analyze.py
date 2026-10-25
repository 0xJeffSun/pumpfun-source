from pathlib import Path
import collections,gzip,hashlib,json,re,struct
from elf_reader import Elf
from dependency_reader import dependencies
W=Path(__file__).resolve().parent
sha=lambda b:hashlib.sha256(b).hexdigest()
read=lambda p:json.loads(p.read_text())
def canonical(s):return re.sub(r'17h[0-9a-f]{16}E$','E',s)
def main():
 O,C,S=[Elf(W/'inputs'/n) for n in ['original.so','candidate.so','symbols.so']]
 assert sha(C.b)=='e501ca2c744373e5653a5ac7e25a3fd20f6058765808b888c3605fd03adba60f'
 assert C.b[C.lo:C.hi]==S.b[S.lo:S.hi]
 key=lambda e,a,n:(n,sha(e.normalized[a:a+n]),json.dumps(e.pattern(a,n),sort_keys=True))
 os=[];ix=collections.defaultdict(list)
 for i,a in enumerate(O.entries):
  z=O.entries[i+1] if i+1<len(O.entries) else O.hi
  os.append(dict(start=a,end=z,bytes=z-a,entry_bounded=i+1<len(O.entries),raw_sha256=sha(O.b[a:z]),dependencies=dependencies(O,a,z)))
  if i+1<len(O.entries):ix[key(O,a,z-a)].append(a)
 om={r['start']:r for r in os}; group=collections.defaultdict(list)
 for f in S.funcs:
  if f['size']>=8:group[(f['start'],f['size'])].append(f['name'])
 cs=[]
 for (a,n),names in sorted(group.items()):
  cs.append(dict(start=a,end=a+n,bytes=n,names=sorted(set(names)),raw_sha256=sha(C.b[a:a+n]),dependencies=dependencies(C,a,a+n),matches=[dict(start=o,raw_equal=C.b[a:a+n]==O.b[o:o+n]) for o in ix[key(C,a,n)]]))
 assert cs[0]['start']==C.lo and cs[-1]['end']==C.hi and all(a['end']==b['start'] for a,b in zip(cs,cs[1:]))
 cm={r['start']:r for r in cs}; unique={r['start']:r['matches'][0]['start'] for r in cs if len(r['matches'])==1}
 accepted=read(W/'inputs/baseline.json');bn={canonical(n):r for r in accepted['candidate_rows'] for n in r['names']}
 published={r['start']:r for r in json.loads(gzip.decompress((W/'inputs/accepted-functions.json.gz').read_bytes()))['functions']}
 for r in cs:
  for p in r['matches']:
   od={d['offset']:d for d in om[p['start']]['dependencies']['direct']}; pairs=[]
   for d in r['dependencies']['direct']:
    actual=od[d['offset']]['target'];possible=[m['start'] for m in cm.get(d['target'],{}).get('matches',[])]
    pairs.append(dict(offset=d['offset'],candidate_target=d['target'],original_target=actual,possible_original_targets=possible,target_body_supported=actual in possible,unique_contradiction=d['target'] in unique and unique[d['target']]!=actual))
   p.update(calls=pairs,all_direct_bodies_supported=all(x['target_body_supported'] for x in pairs),unique_calls_consistent=not any(x['unique_contradiction'] for x in pairs))
   prior=next((m for m in published.get(r['start'],{}).get('matches',[]) if m['start']==p['start'] and m['entry_bounded']),None)
   p['published_call_consistent']=prior['mapped_calls_consistent'] if prior else None
  r['status']='normalized_call_consistent' if any(p['unique_calls_consistent'] for p in r['matches']) else ('call_conflict' if r['matches'] else 'unmatched')
  olds={bn[canonical(n)]['candidate_start']:bn[canonical(n)] for n in r['names'] if canonical(n) in bn}
  r['baseline_correspondences']=[dict(start=b['candidate_start'],bytes=b['candidate_bytes'],status=b['status'],basis='same symbol spelling ignoring Rust hash; not historical identity',known_counterparts=b['known_unmatched_counterparts']) for b in olds.values()]
  r['transitive_data_equivalence_proven']=False
 for r in os:
  # candidate start has separate field because pair start is original
  r['candidate_matches']=[dict(candidate_start=c['start'],names=c['names'],**p) for c in cs for p in c['matches'] if p['start']==r['start']]
  r['status']='mapped_pattern' if any(p['unique_calls_consistent'] for p in r['candidate_matches']) else ('call_conflict' if r['candidate_matches'] else 'unattributed')
 leads=[]
 for c in cs:
  if c['status']=='normalized_call_consistent' or c['bytes']<128:continue
  for o in os:
   a,b,n=c['start'],o['start'],c['bytes']
   if o['bytes']!=n or not o['entry_bounded'] or C.pattern(a,n)!=O.pattern(b,n):continue
   diff=[i for i in range(0,n,8) if C.normalized[a+i:a+i+8]!=O.normalized[b+i:b+i+8]]
   if 0<len(diff)<=8:
    pairs=[]; od={x['offset']:x for x in o['dependencies']['direct']}
    for d in c['dependencies']['direct']:
     target=od.get(d['offset'],{}).get('target');poss=[m['start'] for m in cm.get(d['target'],{}).get('matches',[])]
     pairs.append(dict(offset=d['offset'],candidate_target=d['target'],original_target=target,supported=target in poss))
    leads.append(dict(candidate_start=a,original_start=b,bytes=n,names=c['names'],differences=[dict(offset=i,candidate=C.b[a+i:a+i+8].hex(),original=O.b[b+i:b+i+8].hex()) for i in diff],direct_calls=pairs,all_direct_bodies_supported=all(x['supported'] for x in pairs),data_extent_proof_complete=False,status='similarity lead; identity unproven'))
 summary=dict(candidate_ranges=len(cs),candidate_text_bytes=C.hi-C.lo,original_ranges=len(os),original_text_bytes=O.hi-O.lo,candidate_status=dict(collections.Counter(r['status'] for r in cs)),original_status=dict(collections.Counter(r['status'] for r in os)),raw_equal_candidate_ranges=sum(any(m['raw_equal'] for m in r['matches']) for r in cs),candidate_ranges_at_least_16=sum(r['bytes']>=16 for r in cs),published_bounded_consistent=sum(any(p['published_call_consistent'] for p in r['matches']) for r in cs),all_direct_supported_candidate_ranges=sum(any(p['all_direct_bodies_supported'] for p in r['matches']) for r in cs),leads=len(leads))
 return dict(summary=summary,candidate_rows=cs,original_rows=os,limits=['All offsets are ELF file offsets; ends exclusive.','Original boundaries inferred from direct calls and relocations, not original function identity.','Normalization masks call/relocation immediates in memory only.','No complete transitive data or semantic proof.']),leads
if __name__=='__main__':
 j,l=main();(W/'catalog.json').write_text(json.dumps(j,indent=2)+'\n');(W/'leads.json').write_text(json.dumps(l,indent=2)+'\n');print(json.dumps(j['summary'],indent=2))
