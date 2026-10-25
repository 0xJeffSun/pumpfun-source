from pathlib import Path
import sys,json,hashlib,gzip,collections
P=Path(__file__).resolve().parent;B=P.parent;ROOT=B.parents[1]
sys.path.insert(0,str(P/'method'));import layer01 as a
O=a.Elf(B/'source/evidence/original/mayhem/deployed.so');C=a.Elf(B/'build01/artifacts/mayhem_recovered.so');S=a.Elf(B/'build01/target/sbf-solana-solana/release/mayhem_recovered.so')
assert C.b[C.lo:C.hi]==S.b[S.lo:S.hi]
prior=json.loads(gzip.decompress((P/'before-inventory.json.gz').read_bytes()))
original=[]
for old in prior['original_rows']:
 r={k:v for k,v in old.items() if k!='prior_candidates'}
 r['raw_sha256']=a.sha(O.b[r['start']:r['end']]);r['fresh_normalized_matches']=[]
 if r['scope']=='static_window':
  new=O.window(r['start'],r['end']);assert new['raw_sha256']==r['body_analysis']['raw_sha256'] and new['normalized_sha256']==r['body_analysis']['normalized_sha256'];r['body_analysis']=new
 original.append(r)
# Exact same symbol-alias grouping rule as the prior candidate inventory.
groups=collections.defaultdict(set)
for s in S.symbols:
 if s['info']&15==2 and s['size']>=8 and S.lo<=s['value']<S.hi:groups[(s['value'],s['value']+s['size'])].add(s['name'])
old_excluded_names={name for r in prior['candidate_rows'] if r['scope']=='opaque' for name in r['names']}
rows=[]
for idx,((lo,hi),names) in enumerate(sorted(groups.items())):
 excluded=bool(names&old_excluded_names) or any('initialize_mayhem_state' in n for n in names)
 r={'id':f'N{idx:04}','start':lo,'end':hi,'names':sorted(names),'raw_sha256':a.sha(C.b[lo:hi]),'scope':'opaque' if excluded else 'static_window','body_analysis':None if excluded else C.window(lo,hi),'fresh_normalized_matches':[]}
 rows.append(r)
lookup=collections.defaultdict(list)
for r in original:
 if r['body_analysis']:
  b=r['body_analysis'];lookup[(r['end']-r['start'],b['normalized_sha256'],json.dumps(b['normalization_pattern'],sort_keys=True))].append(r)
for r in rows:
 if r['body_analysis']:
  b=r['body_analysis']
  for old in lookup[(r['end']-r['start'],b['normalized_sha256'],json.dumps(b['normalization_pattern'],sort_keys=True))]:
   r['fresh_normalized_matches'].append(old['id']);old['fresh_normalized_matches'].append(r['id'])
coverage={'original_text':[O.lo,O.hi],'candidate_text':[C.lo,C.hi],'original_uncatalogued_intervals':a.complement(O.lo,O.hi,[(r['start'],r['end']) for r in original]),'candidate_uncatalogued_intervals':a.complement(C.lo,C.hi,[(r['start'],r['end']) for r in rows])}
ledger={'scope':'Consistent prior normalization and candidate symbol-alias grouping, refreshed admitted-original bodies only. Original opaque regions remain opaque; matches are bounded instruction/relocation-pattern evidence, never completeness percentages.','original_sha256':a.sha(O.b),'candidate_sha256':a.sha(C.b),'original_rows':original,'candidate_rows':rows,'prior_candidate_rows':prior['candidate_rows'],'coverage':coverage,'original_sections':O.sections,'candidate_sections':C.sections,'original_relocations':O.relocations,'candidate_relocations':C.relocations,'whole_file_comparison':a.diff(O.b,C.b),'counts':{'original_windows':len(original),'new_candidate_grouped_windows':len(rows),'new_candidate_symbols':sum(len(r['names']) for r in rows),'admitted_original_windows':sum(r['body_analysis'] is not None for r in original),'opaque_original_windows':sum(r['body_analysis'] is None for r in original),'candidate_windows_with_admitted_matches':sum(bool(r['fresh_normalized_matches']) for r in rows)}}
with gzip.open(P/'complete-inventory.json.gz','wt') as f:json.dump(ledger,f,separators=(',',':'))
(P/'inventory-summary.json').write_text(json.dumps({'counts':ledger['counts'],'coverage':coverage,'scope':ledger['scope']},indent=2)+'\n')
print(json.dumps(ledger['counts']))
