"""Full candidate symbol-body diagnostic; executable inputs are read only."""
import argparse, hashlib, json
from pathlib import Path
from elf_reader import Elf

p=argparse.ArgumentParser()
p.add_argument('--original',type=Path,required=True)
p.add_argument('--candidate',type=Path,required=True)
p.add_argument('--symbols',type=Path,required=True)
p.add_argument('--output',type=Path,required=True)
a=p.parse_args()
original,candidate,symbols=[Elf(p.resolve()) for p in [a.original,a.candidate,a.symbols]]
for elf in [original,candidate,symbols]:
    assert elf.text[3]==elf.text[4], 'This diagnostic requires equal text virtual/file addresses'
assert candidate.b[candidate.lo:candidate.hi]==symbols.b[symbols.lo:symbols.hi]
assert (candidate.lo,candidate.hi)==(symbols.lo,symbols.hi)
ranges={}
for f in symbols.funcs:
    if f['size']>=16:
        ranges.setdefault((f['start'],f['size']),[]).append(f['name'])
rows=[]
for (start,size),names in sorted(ranges.items()):
    needle=candidate.normalized[start:start+size]
    matches=[];position=original.lo
    while (at:=original.normalized.find(needle,position,original.hi))>=0:
        position=at+1
        if at%8 or original.pattern(at,size)!=candidate.pattern(start,size):continue
        next_entry=next((x for x in original.entries if x>at),None)
        matches.append({'start':at,'entry_bounded':at in original.entries and next_entry==at+size,
                        'raw_equal':original.b[at:at+size]==candidate.b[start:start+size],
                        'raw_sha256':hashlib.sha256(original.b[at:at+size]).hexdigest()})
    rows.append({'names':names,'start':start,'bytes':size,
                 'raw_sha256':hashlib.sha256(candidate.b[start:start+size]).hexdigest(),
                 'relocations':candidate.pattern(start,size),'matches':matches})
mapping={r['start']:r['matches'][0]['start'] for r in rows if len(r['matches'])==1 and r['matches'][0]['entry_bounded']}
for r in rows:
    for m in r['matches']:
        actual={c['offset']:c['target'] for c in original.callsites(m['start'],r['bytes'])}
        checks=[{'offset':c['offset'],'expected':mapping[c['target']],'actual':actual.get(c['offset'])}
                for c in candidate.callsites(r['start'],r['bytes']) if c['target'] in mapping]
        m['mapped_calls']=checks
        m['mapped_calls_consistent']=all(c['expected']==c['actual'] for c in checks)
def summarize(rs):
    return {'candidate_ranges':len(rs),'any_match':sum(bool(r['matches']) for r in rs),
            'bounded_call_consistent':sum(any(m['entry_bounded'] and m['mapped_calls_consistent'] for m in r['matches']) for r in rs),
            'bounded_raw_exact':sum(any(m['entry_bounded'] and m['raw_equal'] for m in r['matches']) for r in rs)}
summary={'all':summarize(rows),'anchor_named':summarize([r for r in rows if any('anchor' in n for n in r['names'])]),
         'crate_named':summarize([r for r in rows if any('pump_fees_candidate' in n for n in r['names'])])}
out={'method':'Full candidate function bodies; diagnostic immediate masking for loader relocations/internal calls only, in memory. Exact relocation offset/type/symbol patterns and inferred entry boundaries; mapped internal calls checked. No executable changes. Matching generic names may include user-type monomorphizations; counts do not establish framework version or program identity.',
     'original':original.identity(),'candidate':candidate.identity(),'symbols':symbols.identity(),
     'summary':summary,'functions':rows}
a.output.parent.mkdir(parents=True,exist_ok=True)
a.output.write_text(json.dumps(out,indent=2)+'\n')
print(json.dumps(summary,indent=2))
