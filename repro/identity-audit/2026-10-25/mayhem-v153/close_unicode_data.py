"""Read-only full constant-array proof for the positive Unicode helper match."""
from pathlib import Path
import ast,hashlib,importlib.util,json,re,urllib.request
P=Path(__file__).resolve().parent;R=next(p for p in P.parents if (p/'evidence/original/mayhem/deployed.so').is_file())
url='https://raw.githubusercontent.com/anza-xyz/rust/7a87f939d96c478029873d3d43f3a4372f484c42/library/core/src/unicode/printable.rs';raw=urllib.request.urlopen(url,timeout=30).read();(P/'primary-source/v153-unicode-printable.rs').write_bytes(raw)
cache=Path('/Users/shawwalters/.cache/solana/v1.53/platform-tools/rust/lib/rustlib/src/rust/library/core/src/unicode/printable.rs');assert cache.read_bytes()==raw
arrays={}
for m in re.finditer(r'const (SINGLETONS[01][UL]|NORMAL[01]):[^=]+= &\[(.*?)\];',raw.decode(),re.S):
 value=ast.literal_eval('['+m.group(2)+']');data=bytes(v for x in value for v in (x if isinstance(x,tuple) else (x,)));arrays[m.group(1)]=data
assert len(arrays)==6
spec=importlib.util.spec_from_file_location('matcher',P/'match_helpers.py');mod=importlib.util.module_from_spec(spec);spec.loader.exec_module(mod)
j=json.loads((P/'helper-results.json').read_text());f=next(x for x in j['builds']['v153']['functions'] if any('is_printable' in n for n in x['names']));matches=[m for m in f['matches'] if m['inferred_function_entry'] and m['next_entry_equals_window_end'] and m['mapped_helper_calls_consistent']];assert len(matches)==1
candidate=mod.Elf(P/'build-01/candidate.so');original=mod.Elf(R/'evidence/original/mayhem/deployed.so');match=matches[0];originalrefs={r['instruction_offset']:r for r in match['original_data_references']};records=[]
for ref in f['candidate_data_references']:
 pos=ref['immediate'];candidates=[(name,b) for name,b in arrays.items() if candidate.b[pos:pos+len(b)]==b];assert len(candidates)==1
 name,b=candidates[0];opos=originalrefs[ref['instruction_offset']]['immediate'];assert original.b[opos:opos+len(b)]==b
 records.append({'constant':name,'bytes':len(b),'sha256':hashlib.sha256(b).hexdigest(),'helper_instruction_offset':ref['instruction_offset'],'candidate_file_offset':pos,'original_file_offset':opos,'original_candidate_source_array_raw_equal':True})
assert len(records)==6 and len({x['constant'] for x in records})==6
out={'source_url':url,'source_sha256':hashlib.sha256(raw).hexdigest(),'source_equals_cached_distribution_file':True,'helper_bytes':f['bytes'],'candidate_start':f['candidate_start'],'original_start':match['original_start'],'full_six_arrays':records,'mapped_callee_checks':match['mapped_helper_call_checks'],'scope':'Fullrawarrayidentityforactualsixhelperreferences;notuniquelyhistoricalsource/compileridentity'};(P/'unicode-data-proof.json').write_text(json.dumps(out,indent=2)+'\n');print(json.dumps({'complete_arrays':6,'bytes':sum(x['bytes'] for x in records),'mapped_callee_checks':len(out['mapped_callee_checks'])}))
