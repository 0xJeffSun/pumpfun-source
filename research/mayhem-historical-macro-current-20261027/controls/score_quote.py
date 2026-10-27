"""Score the actual compiler-emitted sell_quote body; no matcher relaxation."""
from pathlib import Path
import difflib, hashlib, importlib.util, json, sys
D=Path(__file__).resolve().parent; W=D.parent; R=W.parents[1]
s=importlib.util.spec_from_file_location('quote_reader',R/'research/mayhem-provider-sharing/reader.py');m=importlib.util.module_from_spec(s);s.loader.exec_module(m)
o=m.Elf(R/'evidence/original/mayhem/deployed.so'); a=o.window(186552,187672); na=o.norm(186552,187672)[0]; aa=[na[i:i+8] for i in range(0,len(na),8)]
for label in sys.argv[1:]:
 c=m.Elf(W/(label+'-build/symbols.so')); symbols=[x for x in c.symbols if '10sell_quote17' in x['name']]; assert len(symbols)==1
 f=symbols[0];b=c.window(f['value'],f['value']+f['size']);nb=c.norm(b['start'],b['end'])[0];bb=[nb[i:i+8] for i in range(0,len(nb),8)]
 same=lambda x,y:(x['end']-x['start'],x['normalized_sha256'],x['normalization_pattern'])==(y['end']-y['start'],y['normalized_sha256'],y['normalization_pattern'])
 match=difflib.SequenceMatcher(a=aa,b=bb,autojunk=False)
 result={'label':label,'bytes':f['size'],'start':f['value'],'whole_body_normalized_equal':same(a,b),'same_position_slots':sum(x==y for x,y in zip(aa,bb)),'aligned_slots':sum(x.size for x in match.get_matching_blocks()),'original_slots':len(aa),'candidate_sha256':hashlib.sha256((W/(label+'-build/candidate.so')).read_bytes()).hexdigest()}
 (D/(label+'-quote-score.json')).write_text(json.dumps(result,indent=2)+'\n');print(json.dumps(result))
