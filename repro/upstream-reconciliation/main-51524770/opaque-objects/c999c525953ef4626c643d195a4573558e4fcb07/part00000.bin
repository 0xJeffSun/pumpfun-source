"""Saved ELF/source table and bounded consumer analysis only."""
from pathlib import Path
import ast,gzip,hashlib,json,re,struct
from match_helpers import Elf,method
from extent_links import analyze as extents
P=Path(__file__).resolve().parent;H=lambda b:hashlib.sha256(b).hexdigest()
NEW='work/relay13-linux-v148-downloaded/extracted';MAC='repro/donation-relay/source-build-12-v148-measurement'
J=lambda p:json.loads(p.read_text())
def analyze(R):
 O=Elf(R/'evidence/dependencies/donation_relay/deployed.so');C=Elf(R/NEW/'build-01/candidate.so');S=Elf(R/NEW/'build-01/unstripped.so');L=R/NEW/'full-ledger'
 original=J(L/'original-function-ledger.json');candidate=J(L/'candidate-function-ledger.json');of={f['start']:f for f in original};cf={f['start']:f for f in candidate}
 caller=next(f for f in candidate if any('unicode9printable12is_printable' in n for n in f['names']));check=next(f for f in candidate if any('unicode9printable5check' in n for n in f['names']))
 assert caller['bytes']==696 and check['bytes']==704 and check['end']==caller['start'];delta=caller['start']-736464;assert check['start']==735760+delta
 def pattern(e,f):return [{'offset':pc-f['start'],**r}for pc,r in sorted(e.relocations.items())if f['start']<=pc<f['end']]
 def bodypair(a,b):
  assert a['bytes']==b['bytes'];aa=O.elf.function(a['start'],a['bytes'],a['names']);bb=S.elf.function(b['start'],b['bytes'],b['names']);assert aa['raw_sha256']==a['raw_sha256'] and bb['raw_sha256']==b['raw_sha256'];assert aa['direct_calls']==a['direct_calls'] and bb['direct_calls']==b['direct_calls'];assert aa['normalized_sha256']==bb['normalized_sha256'] and pattern(O,a)==pattern(C,b)
  assert any(x['type']==2 and x['start']==b['start'] and x['size']==b['bytes']for x in S.elf.symbols)
  assert C.elf.at(b['start'],b['bytes'])==S.elf.at(b['start'],b['bytes'])
  return dict(original=a,candidate=b,relocation_pattern=pattern(C,b),full_normalized_code_equal=True,original_hex=O.elf.at(a['start'],a['bytes']).hex(),candidate_hex=C.elf.at(b['start'],b['bytes']).hex(),raw_equal=a['raw_sha256']==b['raw_sha256'])
 bodies={'consumer':bodypair(of[736464],caller),'check':bodypair(of[735760],check)}
 assert caller['direct_calls']==[dict(displacement=-125,offset=288,pc=caller['start']+288,target=check['start'])]
 assert of[736464]['direct_calls'][0]['target']==735760
 raw=(P/'unicode-printable.rs').read_bytes();arrays={}
 for m in re.finditer(r'const (SINGLETONS[01][UL]|NORMAL[01]):[^=]+= &\[(.*?)\];',raw.decode(),re.S):arrays[m[1]]=bytes(y for x in ast.literal_eval('['+m[2]+']')for y in(x if isinstance(x,tuple)else(x,)))
 assert len(arrays)==6 and sum(map(len,arrays.values()))==1449
 records=[];actual={}
 for label,e,f in [('original',O,of[736464]),('candidate',C,caller)]:
  refs={r['offset']:r for r in f['data_references']};assert set(refs)=={104,152,176,200,248,272}
  used=set();rr=[]
  for off,r in sorted(refs.items()):
   at=r['target'];hits=[n for n,b in arrays.items()if e.elf.at(at,len(b))==b];assert len(hits)==1;n=hits[0];assert n not in used;used.add(n);b=arrays[n];sec=e.elf.containing(at);assert sec and at+len(b)<=sec['address']+sec['size'];assert sec['offset']==sec['address']
   assert e.relocations[f['start']+off]=={'type':8,'symbol':''}
   rr.append(dict(constant=n,helper_offset=off,pc=f['start']+off,start=at,end=at+len(b),bytes=len(b),sha256=H(b),hex=b.hex(),section=sec['name'],section_start=sec['address'],section_end=sec['address']+sec['size']))
  assert used==set(arrays);actual[label]=rr
  evidence=extents({'unicode':{'full_arrays':[dict(constant=x['constant'],bytes=x['bytes'],target_file_offset=x['start'])for x in rr]}},elf=e,delta=0 if label=='original' else delta)
  records.append(dict(artifact=label,tables=rr,argument_extent_proof=evidence))
 assert {x['constant']:x['sha256']for x in actual['original']}=={x['constant']:x['sha256']for x in actual['candidate']}
 layouts={}
 for label,e in [('original',O),('candidate',C)]:
  sortedrows=sorted(actual[label],key=lambda x:x['start']);gaps=[]
  for a,b in zip(sortedrows,sortedrows[1:]):
   assert a['end']<=b['start'];n=b['start']-a['end'];gaps.append(dict(after=a['constant'],before=b['constant'],start=a['end'],end=b['start'],bytes=n,sha256=H(e.b[a['end']:b['start']]),hex=e.b[a['end']:b['start']].hex()))
  layouts[label]=dict(ordered_constants=[x['constant']for x in sortedrows],gaps=gaps,total_array_bytes=sum(x['bytes']for x in sortedrows),covered_span=sortedrows[-1]['end']-sortedrows[0]['start'])
 sourcebounds={}
 for bank in [0,1]:
  u=arrays[f'SINGLETONS{bank}U'];l=arrays[f'SINGLETONS{bank}L'];n=arrays[f'NORMAL{bank}'];uppers=list(u[0::2]);counts=list(u[1::2]);assert len(u)%2==0 and uppers==sorted(set(uppers)) and sum(counts)==len(l)
  cursor=0;chunks=[]
  for k,count in zip(uppers,counts):chunks.append(dict(upper=k,lower_start=cursor,lower_end=cursor+count));cursor+=count
  i=0;entries=[]
  while i<len(n):
   start=i;i+=1
   if n[start]&128:assert i<len(n);i+=1
   entries.append([start,i])
  assert i==len(n);sourcebounds[str(bank)]=dict(tuple_bytes=len(u),tuple_stride=2,tuple_count=len(u)//2,lower_bytes=len(l),summed_lower_counts=sum(counts),lower_partitions=chunks,normal_bytes=len(n),normal_encoded_entry_ranges=entries)
 # Full immediate callee bodies, including both 8-byte thunks, with real targets.
 edges=[]
 for a,b in zip(of[735760]['direct_calls'],check['direct_calls']):
  assert a['offset']==b['offset'];pair=bodypair(of[a['target']],cf[b['target']]);row=dict(offset=a['offset'],original_call=a,candidate_call=b,body=pair,onward=[])
  if pair['original']['bytes']==8:
   ac=pair['original']['direct_calls'];bc=pair['candidate']['direct_calls'];assert len(ac)==len(bc)==1;row['onward'].append(bodypair(of[ac[0]['target']],cf[bc[0]['target']]))
  edges.append(row)
 locations={}
 for label,e,f in [('original',O,of[735760]),('candidate',C,check)]:
  rows=[]
  for at in sorted({r['target']for r in f['data_references']}):
   ptr,n,line,col=struct.unpack('<QQII',e.elf.at(at,24));path=ptr>>32;b=e.elf.at(path,n);assert all(e.elf.containing(v)['offset']==e.elf.containing(v)['address'] for v in [at,path]);assert n==29 and b==b'core/src/unicode/printable.rs';assert ptr&0xffffffff==0
   rows.append(dict(descriptor_start=at,descriptor_bytes=24,descriptor_hex=e.elf.at(at,24).hex(),path_start=path,path_end=path+n,path_bytes=n,path_hex=b.hex(),path_sha256=H(b),line=line,column=col))
  assert {(x['line'],x['column'])for x in rows}=={(10,43),(26,54)};locations[label]=rows
 return dict(source_sha256=H(raw),consumer_check_bodies=bodies,table_artifacts=records,layouts=layouts,source_internal_bounds=sourcebounds,immediate_check_callees=edges,check_locations=locations,all_six_complete_tables_equal=True,full_table_bytes=1449,scope_limit='Complete Unicode caller/check and six table extent/data closure plus immediate check callees/onward8Bthunks only; transitive panic/indirect/input ABI remains unclosed; no execution or unique historical compiler attribution')
if __name__=='__main__':
 import argparse
 a=argparse.ArgumentParser();a.add_argument('--repo',type=Path,required=True);r=a.parse_args();d=analyze(r.repo.resolve());(P/'proof.json').write_text(json.dumps(d,indent=2)+'\n');print(json.dumps({k:d[k]for k in ['full_table_bytes','all_six_complete_tables_equal','layouts']},indent=2))
