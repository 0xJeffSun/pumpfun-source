"""Additional actual data/leaf and Relay checks; no compilation or target execution."""
from pathlib import Path
import ast,importlib.util,json,hashlib,re,urllib.request
P=Path(__file__).resolve().parent;R=next(p for p in P.parents if (p/'evidence/original/mayhem/deployed.so').is_file());H=lambda b:hashlib.sha256(b).hexdigest()
s=importlib.util.spec_from_file_location('matcher',P/'match_helpers.py');m=importlib.util.module_from_spec(s);s.loader.exec_module(m);j=json.loads((P/'helper-results.json').read_text());c=m.Elf(P/'build-01/candidate.so');o=m.Elf(R/'evidence/original/mayhem/deployed.so');relay=m.Elf(R/'evidence/dependencies/donation_relay/deployed.so')
url='https://raw.githubusercontent.com/anza-xyz/rust/daa3af4a1110ec3f10ce08083bb0b7855a88416f/library/core/src/fmt/num.rs';raw=urllib.request.urlopen(url,timeout=30).read();(P/'primary-source/v154-fmt-num.rs').write_bytes(raw)
match=re.search(r'static DEC_DIGITS_LUT: &\[u8; 200\] = b"(.*?)";',raw.decode(),re.S);assert match;literal=re.sub(r'\\\n\s*','',match.group(1));table=literal.encode();assert len(table)==200 and table==''.join(f'{i:02d}' for i in range(100)).encode()
leaves=[]
for f in j['builds']['v154']['functions']:
 if not any('3num3imp21_' in n for n in f['names']):continue
 assert not f['internal_calls'];matches=[x for x in f['matches'] if x['inferred_function_entry'] and x['next_entry_equals_window_end'] and x['mapped_helper_calls_consistent']];assert len(matches)==1;origrefs={r['instruction_offset']:r for r in matches[0]['original_data_references']};refs=[]
 for r in f['candidate_data_references']:
  at=r['immediate'];oa=origrefs[r['instruction_offset']]['immediate'];assert c.b[at:at+200]==o.b[oa:oa+200]==table;refs.append({'helper_instruction_offset':r['instruction_offset'],'candidate_table_offset':at,'original_table_offset':oa,'raw_200byte_table_equal':True})
 assert len(refs)==4;leaves.append({'names':f['names'],'candidate_start':f['candidate_start'],'original_start':matches[0]['original_start'],'bytes':f['bytes'],'direct_calls':[],'references':refs})
mul=next(f for f in j['builds']['v154']['functions'] if '__multi3' in f['names']);assert mul['bytes']==344 and not mul['internal_calls'] and not mul['candidate_data_references'];mulmatch=[x for x in mul['matches'] if x['inferred_function_entry'] and x['next_entry_equals_window_end'] and x['raw_byte_equality']];assert len(mulmatch)==1
(P/'decimal-and-multiply-proof.json').write_text(json.dumps({'source_url':url,'source_sha256':H(raw),'decimal_table_bytes':200,'decimal_table_sha256':H(table),'leaf_decimal_helpers':leaves,'multiply_leaf':{'candidate_start':mul['candidate_start'],'original_start':mulmatch[0]['original_start'],'bytes':344,'raw_sha256':mul['raw_sha256'],'raw_equal':True,'direct_calls':[],'data_references':[]},'scope':'Completeleafbodiesandactual200Btable;notfullformattercallersoruniquecompilerprovenance'},indent=2)+'\n')
negative=[]
for f in j['builds']['v154']['functions']:
 if not any(n in name for name in f['names'] for n in ['is_printable','printable5check','fmt5write','__multi3','3num3imp21_']):continue
 start=f['candidate_start'];size=f['bytes'];needle=c.normalized[start:start+size];found=[];pos=relay.lo
 while (at:=relay.normalized.find(needle,pos,relay.hi))>=0:
  pos=at+1
  if at%8 or relay.pattern(at,size)!=c.pattern(start,size):continue
  found.append({'start':at,'entry':at in relay.entries,'next':next((e for e in relay.entries if e>at),None),'raw_equal':relay.b[at:at+size]==c.b[start:start+size]})
 assert not found;negative.append({'names':f['names'],'candidate_start':start,'bytes':size,'candidate_raw_sha256':f['raw_sha256'],'analysis_normalized_sha256':f['analysis_normalized_sha256'],'relocation_pattern':f['relocations'],'full_relay_matches':found})
actual=[]
for name,start,size in [('is_printable',736464,696),('check',735760,704)]:
 assert start in relay.entries and next(e for e in relay.entries if e>start)==start+size
 actual.append({'role':name,'start':start,'bytes':size,'raw_sha256':H(relay.b[start:start+size]),'calls':relay.callsites(start,size),'data_references':m.references(relay,start,size)})
assert any(c['target']==735760 for c in actual[0]['calls'])
arrays={}
for a in re.finditer(r'const (SINGLETONS[01][UL]|NORMAL[01]):[^=]+= &\[(.*?)\];',(P/'primary-source/v154-unicode-printable.rs').read_text(),re.S):
 value=ast.literal_eval('['+a.group(2)+']');arrays[a.group(1)]=bytes(v for x in value for v in (x if isinstance(x,tuple) else (x,)))
relay_arrays=[]
for r in actual[0]['data_references']:
 at=r['immediate'];hits=[(n,b) for n,b in arrays.items() if relay.b[at:at+len(b)]==b]
 assert len(hits)==1
 name,data=hits[0];relay_arrays.append({'constant':name,'relay_file_offset':at,'helper_instruction_offset':r['instruction_offset'],'bytes':len(data),'sha256':H(data),'authentic_source_array_raw_equal':True})
assert len(relay_arrays)==6 and len({x['constant'] for x in relay_arrays})==6
(P/'relay-readonly-negative.json').write_text(json.dumps({'scope':'AlreadycompiledMayhemv154helpercomparisonagainstRelaycaptureonly;noRelaybuild/noVM/nohistoricalversionclaim','relay':relay.identity(),'candidate':c.identity(),'actual_relay_unicode_windows':actual,'relay_unicode_full_arrays':relay_arrays,'v154_helper_negatives':negative,'other_relay_source_or_sourcecompiler_family_identity_proven':False},indent=2)+'\n');print(json.dumps({'decimal_table_fullbytes':200,'decimal_leaves':len(leaves),'multiply_raw_leaf_bytes':344,'relay_v154_negative_fullhelpers':len(negative),'additional_builds':0}))
