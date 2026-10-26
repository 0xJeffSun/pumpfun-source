"""UNRUN candidate-only method095fc2 adapter; sealed original492 records reused exactly.
Original image access is limited to separately admitted numeric whole-file comparison.
No original ELF parser, instruction decode, string/data following, or value dumps.
"""
from pathlib import Path
import argparse,json,hashlib,gzip,shutil
from candidate_elf import Elf
from raw_numeric import one
P=Path(__file__).resolve().parent
H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
J=lambda p:json.loads(p.read_text())
def write(p,v):
 data=(json.dumps(v,sort_keys=True,indent=2)+'\n').encode()
 p.write_bytes(gzip.compress(data,mtime=0)if p.suffix=='.gz'else data)
def check():
 m=J(P/'manifest.json');assert H(P/'manifest.json')==(P/'manifest.sha256').read_text().split()[0]
 assert set(m['files'])=={str(p.relative_to(P))for p in P.rglob('*')if p.is_file()and p.name not in ['manifest.json','manifest.sha256']}
 for n,r in m['files'].items():assert H(P/n)==r['sha256']and(P/n).stat().st_size==r['bytes']
def main():
 a=argparse.ArgumentParser();a.add_argument('--candidate',type=Path,required=True);a.add_argument('--unstripped',type=Path,required=True);a.add_argument('--original',type=Path,required=True);a.add_argument('--authority',type=Path,required=True);a.add_argument('--expected-authority-sha256',required=True);a.add_argument('--output',type=Path,required=True);x=a.parse_args();check()
 assert H(x.authority)==x.expected_authority_sha256;auth=J(x.authority)
 assert auth['root_reviewed_execution_authorized']is True and auth['candidate_ledger_adapter_reviewed']is True
 assert auth['adapter_packet_sha256']==H(P/'manifest.json')and auth['original_numeric_only_admission_sha256']==H(P/'ROOT-ADMISSION.json')
 assert not x.output.exists();assert x.candidate.resolve()!=x.original.resolve()and x.unstripped.resolve()!=x.original.resolve()
 # Authenticate the whole original FIRST; the numeric method below is the only original-byte consumer.
 assert x.original.stat().st_size==830448 and H(x.original)=='367f07a62e3f74d358187d175cf3228848e81a56c781a9a75b9df7fed1268563'
 original_file=P/'seed/retained/Darwin15/static/original-function-ledger.json';of=J(original_file)
 linux=J(P/'seed/retained/Linux13/download/extracted/full-ledger/original-function-ledger.json')
 assert len(of)==len(linux)==492
 for i,(a,b)in enumerate(zip(of,linux)):
  assert a['ordinal']==b['ordinal']==i
  assert all(a[k]==b[k]for k in ['start','end','bytes','raw_sha256','normalized_sha256'])
  assert a['end']==a['start']+a['bytes']
  if i:assert of[i-1]['end']==a['start']
 cb=x.candidate.read_bytes();ub=x.unstripped.read_bytes();c,u=Elf(cb),Elf(ub) # NEVER instantiated on original.
 syms={}
 for s in u.symbols:
  if s['type']==2 and s['size']:syms.setdefault((s['start'],s['size']),[]).append(s['name'])
 cf=[u.function(a,z,sorted(names))for(a,z),names in sorted(syms.items())]
 text=u.by_name['.text'];end=text['address'];gaps=[]
 for i,f in enumerate(cf):
  f['index']=i
  if f['start']!=end:gaps.append([end,f['start']])
  end=f['end']
 if end!=text['address']+text['size']:gaps.append([end,text['address']+text['size']])
 assert not gaps,'No partial candidate ledger accepted'
 raw={};norm={}
 for f in cf:raw.setdefault((f['bytes'],f['raw_sha256']),[]).append(f['index']);norm.setdefault((f['bytes'],f['normalized_sha256']),[]).append(f['index'])
 pairs=set();ledger=[];omap={f['start']:f['ordinal']for f in of};cmap={f['start']:f['index']for f in cf}
 for f in of:
  rk=raw.get((f['bytes'],f['raw_sha256']),[]);nk=norm.get((f['bytes'],f['normalized_sha256']),[])
  ledger.append(dict(ordinal=f['ordinal'],start=f['start'],end=f['end'],bytes=f['bytes'],raw_candidate_indices=rk,normalized_candidate_indices=nk,status='raw-body'if rk else'normalized-shape-only'if nk else'no-complete-body-match'))
  pairs.update((f['ordinal'],j)for j in nk)
 closed=set(pairs)
 while True:
  nxt=set()
  for i,j in closed:
   a,b=of[i],cf[j]
   if len(a['direct_calls'])!=len(b['direct_calls']):continue
   if all((omap.get(x['target']),cmap.get(y['target']))in closed for x,y in zip(a['direct_calls'],b['direct_calls'])):nxt.add((i,j))
  if nxt==closed:break
  closed=nxt
 witnesses=[]
 for i,j in sorted(pairs):
  a,b=of[i],cf[j];calls=[];refs=[]
  for x,y in zip(a['direct_calls'],b['direct_calls']):
   pair=(omap.get(x['target']),cmap.get(y['target']));calls.append(dict(original=x,candidate=y,target_pair=list(pair),normalized_body_pair=pair in pairs,recursive_call_shape_closed=pair in closed))
  for x,y in zip(a['data_references'],b['data_references']):refs.append(dict(original=x,candidate=y,equal_bounded_bytes=x.get('bounded_hex')==y.get('bounded_hex')and'bounded_hex'in x,complete_object_extent_proven=False))
  witnesses.append(dict(original_ordinal=i,candidate_index=j,raw_body=a['raw_sha256']==b['raw_sha256'],recursive_call_shape_closed=(i,j)in closed,direct_calls=calls,data_references=refs,indirect_calls=a['indirect_calls'],interpretation='complete instruction shape only; original metadata reused, no new original data; complete data extents/runtime ABI/indirect calls remain unproved'))
 allocated=[]
 for s in u.sections:
  if s['flags']&2 and s['type']!=8:
   cs=c.by_name[s['name']];assert s['address']==cs['address']and u.section_bytes(s)==c.section_bytes(cs)
   allocated.append(dict(name=s['name'],address=s['address'],bytes=s['size'],sha256=hashlib.sha256(u.section_bytes(s)).hexdigest()))
 # All actual raw positions/ranges, but NEVER original/candidate byte values.
 numeric=one(Path('/'),'donation_relay',str(x.original.resolve()).lstrip('/'),str(x.candidate.resolve()).lstrip('/'),'unselected_Linux15_raw_compiler_output')
 assert numeric['original_sha256']=='367f07a62e3f74d358187d175cf3228848e81a56c781a9a75b9df7fed1268563'
 matrix=[]
 baselines=[]
 for label,folder in [('Linux13','retained/Linux13/download/extracted/full-ledger'),('Darwin15','retained/Darwin15/static')]:baselines.append((label,J(P/'seed'/folder/'match-ledger.json')))
 for i,row in enumerate(ledger):
  matrix.append({'ordinal':i,'start':row['start'],'end':row['end'],'Linux13':baselines[0][1][i],'Darwin15':baselines[1][1][i],'newLinux15':row})
 summary=dict(original_sha256=numeric['original_sha256'],candidate_sha256=H(x.candidate),unstripped_sha256=H(x.unstripped),original_bytes=830448,candidate_bytes=len(cb),unstripped_bytes=len(ub),original_inferred_windows=492,candidate_symbol_windows=len(cf),original_raw_match_windows=sum(bool(r['raw_candidate_indices'])for r in ledger),original_normalized_match_windows=sum(bool(r['normalized_candidate_indices'])for r in ledger),unmatched_original_windows=sum(not r['normalized_candidate_indices']for r in ledger),matched_pairs=len(pairs),recursive_call_shape_closed_pairs=len(closed),new_original_decoded_functions=0,new_original_data_collections=0,original_numeric_only_admission_sha256=H(P/'ROOT-ADMISSION.json'),original_section_comparison='NOT_COLLECTED: no new original ELF parsing; known-bound section metadata may be added only in a separately reviewed adapter revision',runtime_cases=0,selected=False,execution_suitable=False)
 x.output.mkdir(parents=True);shutil.copyfile(original_file,x.output/'original-function-ledger.json')
 values={'candidate-function-ledger.json':cf,'match-ledger.json':ledger,'match-witnesses.json':witnesses,'complete492-three-way-status.json':matrix,'candidate-sections.json':u.sections,'candidate-relocations.json':u.relocations,'candidate-symbols.json':u.symbols,'allocated-strip-identity.json':allocated,'comparison-summary.json':summary,'whole-file-numeric-ranges.json.gz':numeric,'coverage.json':{'original':{'source':'sealed original492 metadata only','text_start':of[0]['start'],'text_end':of[-1]['end'],'distinct_windows':492,'gaps':[]},'candidate':{'text_start':text['address'],'text_end':end,'distinct_windows':len(cf),'gaps':gaps}}}
 for n,v in values.items():write(x.output/n,v)
 files={f.name:{'sha256':H(f),'bytes':f.stat().st_size}for f in sorted(x.output.iterdir())if f.is_file()};write(x.output/'manifest.json',{'files':files});(x.output/'manifest.sha256').write_text(H(x.output/'manifest.json')+'  manifest.json\n')
 print(json.dumps({'status':'UNSELECTED_STATIC_MEASUREMENT','original_records':492,'new_original_decoded_functions':0,'new_original_data_collections':0,'raw_numeric_ranges_complete':True,'new_target_executions':0,'new_builds':0,'manifest_sha256':H(x.output/'manifest.json')}))
if __name__=='__main__':main()
