"""Optional local compiler-output check; never run by default/source materialization."""
import collections,gzip,hashlib,importlib.util,json,struct,subprocess,tempfile
from pathlib import Path
HERE=Path(__file__).resolve().parent;ROOT=next(p for p in HERE.parents if(p/'.git').exists())
def sha(b):return hashlib.sha256(b).hexdigest()
def load(path):return json.loads(path.read_bytes())
def blob(rev,name):return subprocess.check_output(['git','--no-optional-locks','show',rev+':'+name],cwd=ROOT)
def module(name,path):
 s=importlib.util.spec_from_file_location(name,path);m=importlib.util.module_from_spec(s);s.loader.exec_module(m);return m
def location(w,image,target):
 rel=dict(w.m.relocations(image));assert rel.get(target,0)&0xffffffff==8
 raw=w.m.at_address(image,target,24);low,ptr,n,line,column=struct.unpack('<IIQII',raw)
 assert low==0 and 0<n<=300 and 0<line<=100000 and 0<column<=300
 section=next(s for s in w.m.elf_layout(image)['sections']if s['name']=='.rodata');assert section['address']<=ptr and ptr+n<=section['address']+section['size']
 name=w.m.at_address(image,ptr,n);assert name.endswith(b'.rs')and all(32<=b<127 for b in name)
 return name.decode(),line,column
def cohort(w,original,candidate,pairs):
 rows={};orr=dict(w.m.relocations(original));crr=dict(w.m.relocations(candidate))
 for pair in pairs:
  a,b=pair['original'],pair['candidate'];x=w.m.instructions(original,a['address'],a['bytes']);y=w.m.instructions(candidate,b['address'],b['bytes']);assert len(x)==len(y)
  for p,q in zip(x,y):
   if orr.get(a['address']+p['offset'],0)&0xffffffff!=8:continue
   assert crr.get(b['address']+q['offset'],0)&0xffffffff==8
   try:left=location(w,original,p['lddw_value'])
   except(AssertionError,ValueError,StopIteration,struct.error):continue
   right=location(w,candidate,q['lddw_value']);rows[(a['address'],p['offset'])]=(left,right)
 return rows
def check_summary(result,expected):
 for key in ['candidate_sha256','symbols_sha256','candidate_bytes','original_elf_extent','original_capture_bytes','original_windows','normalized','raw','unique_pairs','gains','losses','location_uses','location_equal']:
  assert result[key]==expected[key],key
 assert not result['whole_capture_equal'] and not result['equals_original_elf_extent']
 assert result['runtime_verified']is False
def compare(candidate_path,symbols_path):
 expected=load(HERE/'expected.json');rev=load(HERE/'baseline-sources.json')['revision'];candidate=candidate_path.read_bytes();symbols=symbols_path.read_bytes();assert sha(candidate)==expected['candidate_sha256']and sha(symbols)==expected['symbols_sha256']
 original=blob(rev,'evidence/original/pump_fees/deployed.so');assert sha(original)==expected['original_sha256']
 base='research/fees-crank-relay-rejection/';baseline=gzip.decompress(blob(rev,base+'artifacts/origins-candidate.so.gz'));bs=gzip.decompress(blob(rev,base+'artifacts/origins-symbols.so.gz'))
 assert sha(baseline)==expected['baseline_candidate_sha256']and sha(bs)==expected['baseline_symbols_sha256']
 with tempfile.TemporaryDirectory(prefix='fees-local-static-')as temp:
  directory=Path(temp)
  for name,digest in load(HERE/'parser-inputs.json').items():
   raw=blob(rev,name);assert sha(raw)==digest;p=directory/name;p.parent.mkdir(parents=True,exist_ok=True);p.write_bytes(raw)
  w=module('fees_pinned_window_map',directory/base/'window_map.py')
  ol,cl,sl=[w.m.elf_layout(b)for b in [original,candidate,symbols]]
  for s in cl['sections']:
   if s['flags']&2 and s['type']!=8:
    z=next(q for q in sl['sections']if q['name']==s['name']);assert s['address']==z['address']and w.m.section_data(candidate,s['name'])==w.m.section_data(symbols,s['name'])
  ow,bw,cw=w.windows(original),w.windows(bs),w.windows(symbols)
  assert all(q['symbol_bytes']is None or q['symbol_bytes']==q['bytes']for q in cw)
  before=w.compare(ow,bw);after=w.compare(ow,cw);bset={q['signature']for q in bw};cset={q['signature']for q in cw};rawset={q['raw_sha256']for q in cw}
  assert sum(q['signature']in bset for q in ow)==542
  old=cohort(w,original,baseline,before['unique_pairs']);new=cohort(w,original,candidate,after['unique_pairs']);assert len(old)==161 and sum(a==b for a,b in old.values())==134;assert set(old)==set(new)
  result={'candidate_sha256':sha(candidate),'symbols_sha256':sha(symbols),'candidate_bytes':len(candidate),'original_capture_bytes':len(original),'original_elf_extent':ol['elf_extent'],'original_windows':len(ow),'normalized':sum(q['signature']in cset for q in ow),'raw':sum(q['raw_sha256']in rawset for q in ow),'unique_pairs':len(after['unique_pairs']),'gains':sorted(q['address']for q in ow if q['signature']in cset and q['signature']not in bset),'losses':sorted(q['address']for q in ow if q['signature']in bset and q['signature']not in cset),'location_uses':len(new),'location_equal':sum(a==b for a,b in new.values()),'whole_capture_equal':original==candidate,'equals_original_elf_extent':candidate==original[:ol['elf_extent']],'common_position_different_bytes':sum(a!=b for a,b in zip(original,candidate)),'runtime_verified':False,'sections':[{'name':s['name'],'original_bytes':s['size'],'candidate_bytes':next(z['size']for z in cl['sections']if z['name']==s['name']),'raw_equal':w.m.section_data(original,s['name'])==w.m.section_data(candidate,s['name'])}for s in ol['sections']if s['name']]}
  # Actual direct-callee body correspondence for all 13 recovered/coordinate-corrected functions.
  targets={key[0]for key,(a,b)in old.items()if a!=b}|{291864,632080};oi={q['address']:q for q in ow};ci={q['address']:q for q in cw};bad=[];count=0
  orr=dict(w.m.relocations(original));crr=dict(w.m.relocations(candidate))
  for pair in after['unique_pairs']:
   a,b=pair['original'],pair['candidate']
   if a['address']not in targets:continue
   aa=w.m.instructions(original,a['address'],a['bytes']);bb=w.m.instructions(candidate,b['address'],b['bytes'])
   for p,q in zip(aa,bb):
    if 'call_target'not in p or orr.get(a['address']+p['offset'],0)&0xffffffff==10:continue
    assert 'call_target'in q and crr.get(b['address']+q['offset'],0)&0xffffffff!=10;count+=1
    if oi[p['call_target']]['signature']!=ci[q['call_target']]['signature']:bad.append([a['address'],p['offset'],p['call_target']])
  assert count==99 and bad==[[632080,416,76384]]
  result.update(direct_call_edges_checked=count,known_unmatched_business_edges=bad,scope='Complete normalized caller/callee shapes and 161 exact 24-byte Location-shaped values; not all-data, indirect, recursive-semantic or runtime closure.')
  check_summary(result,expected);return result
