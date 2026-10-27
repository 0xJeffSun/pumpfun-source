"""Explicit read-only local ELF comparison; no Git/network/build/VM/receipt access."""
import hashlib,importlib.util,json,struct
from pathlib import Path
P=Path(__file__).resolve().parent
H=lambda b:hashlib.sha256(b).hexdigest()
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
def direct_edges(w,original,candidate,ow,cw,pairs):
 oi={x['address']:x for x in ow};ci={x['address']:x for x in cw};orr=dict(w.m.relocations(original));crr=dict(w.m.relocations(candidate));edges=[]
 for pair in pairs:
  a,b=pair['original'],pair['candidate'];x=w.m.instructions(original,a['address'],a['bytes']);y=w.m.instructions(candidate,b['address'],b['bytes']);assert len(x)==len(y)
  for p,q in zip(x,y):
   if 'call_target'not in p or orr.get(a['address']+p['offset'],0)&0xffffffff==10:continue
   assert 'call_target'in q and crr.get(b['address']+q['offset'],0)&0xffffffff!=10
   af,bf=oi[p['call_target']],ci[q['call_target']];edges.append([a['address'],p['offset'],af['signature'],bf['signature']])
 return sorted(edges)

def recompute(original_path,baseline,candidate,parser_root):
 for name,h in json.loads((P/'parser-inputs.json').read_bytes()).items():
  path=parser_root/name;assert not path.is_symlink()and H(path.read_bytes())==h
 path=parser_root/'research/fees-crank-relay-rejection/window_map.py';s=importlib.util.spec_from_file_location('fees_union_pinned_window_map',path);w=importlib.util.module_from_spec(s);s.loader.exec_module(w)
 original=original_path.read_bytes();assert H(original)=='4f2955d0f6b40cc9ff7daa18ccad7d19119ba1249759f4e7e3bb691beee6b35e';ow=w.windows(original);ol=w.m.elf_layout(original);reports={};edges={};locations={};pairs_by={}
 for label,folder in [('baseline',baseline),('candidate',candidate)]:
  raw=(folder/'candidate.so').read_bytes();symbols=(folder/'symbols.so').read_bytes();cl=w.m.elf_layout(raw);sl=w.m.elf_layout(symbols)
  for section in cl['sections']:
   if section['flags']&2 and section['type']!=8:
    other=next(x for x in sl['sections']if x['name']==section['name']);assert section['address']==other['address']and w.m.section_data(raw,section['name'])==w.m.section_data(symbols,section['name'])
  cw=w.windows(symbols);pairs=w.compare(ow,cw)['unique_pairs'];pairs_by[label]={x['original']['address']:x for x in pairs};sig={x['signature']for x in cw};rh={x['raw_sha256']for x in cw};normalized=[x['address']for x in ow if x['signature']in sig];raw_matches=[x['address']for x in ow if x['raw_sha256']in rh];edge=direct_edges(w,original,raw,ow,cw,pairs);edges[label]={(x[0],x[1]):x for x in edge};locations[label]=cohort(w,original,raw,pairs);assert all(a==b for a,b in locations[label].values())
  sections=[]
  for sec in ol['sections']:
   if not sec['name']:continue
   a=w.m.section_data(original,sec['name']);b=w.m.section_data(raw,sec['name']);sections.append({'name':sec['name'],'original_bytes':len(a),'candidate_bytes':len(b),'raw_equal':a==b,'common_position_differences':sum(x!=y for x,y in zip(a,b))})
  reports[label]={'candidate_sha256':H(raw),'symbols_sha256':H(symbols),'candidate_bytes':len(raw),'normalized':len(normalized),'raw':len(raw_matches),'unique_pairs':len(pairs),'candidate_windows':len(cw),'normalized_inventory':normalized,'raw_inventory':raw_matches,'actual_direct_edges':len(edge),'unequal_complete_callee_edges':sum(x[2]!=x[3]for x in edge),'edge_ledger_sha256':H((json.dumps(edge,sort_keys=True)+'\n').encode()),'equal_location_uses':len(locations[label]),'sections':sections,'common_position_differences':sum(a!=b for a,b in zip(original,raw)),'whole_capture_equal':original==raw,'whole_meaningful_elf_equal':original[:ol['elf_extent']]==raw,'runtime_verified':False}
 gains=sorted(set(reports['candidate']['normalized_inventory'])-set(reports['baseline']['normalized_inventory']));losses=sorted(set(reports['baseline']['normalized_inventory'])-set(reports['candidate']['normalized_inventory']));assert gains==[127776,270136,271536,276672,295800,650064]and not losses
 raw_gains=sorted(set(reports['candidate']['raw_inventory'])-set(reports['baseline']['raw_inventory']));raw_losses=sorted(set(reports['baseline']['raw_inventory'])-set(reports['candidate']['raw_inventory']));assert not raw_losses
 previous={k:r for k,r in edges['baseline'].items()if r[2]==r[3]};assert all(k in edges['candidate']and edges['candidate'][k][2]==edges['candidate'][k][3]for k in previous)
 assert locations['candidate'].keys()>=locations['baseline'].keys()and all(locations['candidate'][k]==v for k,v in locations['baseline'].items())
 new=[]
 for address in gains:
  pair=pairs_by['candidate'][address];calls=[r for (a,_),r in edges['candidate'].items()if a==address];assert all(r[2]==r[3]for r in calls);new.append({'original_address':address,'candidate_address':pair['candidate']['address'],'bytes':pair['original']['bytes'],'actual_direct_callees':len(calls),'all_complete_callee_shapes_equal':True,'actual_callee_shape_ledger_sha256':H((json.dumps(calls,sort_keys=True)+'\n').encode())})
 assert [reports[x]['normalized']for x in ['baseline','candidate']]==[552,558]and [reports[x]['raw']for x in ['baseline','candidate']]==[118,143];assert len(previous)==3233 and sum(x['actual_direct_callees']for x in new)==83
 return {'original_sha256':H(original),'original_capture_bytes':len(original),'original_elf_extent':ol['elf_extent'],'reports':reports,'normalized_gains':gains,'normalized_losses':losses,'raw_gains':raw_gains,'raw_losses':raw_losses,'preserved_prior_equal_direct_callee_obligations':len(previous),'new_windows':new,'scope':'Complete normalized windows, actual one-hop callee shapes, decoded Location values and raw sections only. No arbitrary duplicate pairing, general object extents, recursive/indirect semantics or target execution.'}
