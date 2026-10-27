"""Optional read-only comparison of real compiler outputs; never builds or patches."""
from pathlib import Path
import collections,hashlib,importlib.util,json,struct
HERE=Path(__file__).resolve().parent;ROOT=HERE.parents[2]
def sha(b):return hashlib.sha256(b).hexdigest()
def module(n,p):
 s=importlib.util.spec_from_file_location(n,p);m=importlib.util.module_from_spec(s);s.loader.exec_module(m);return m
class View:
 def __init__(self,p):self.p=Path(p)
 def __truediv__(self,n):
  if n=='original.so':return ROOT/'evidence/dependencies/donation_relay/deployed.so'
  if n=='original-windows.json':return ROOT/'repro/donation-relay/swap-receipt-coordinate-recovery/original-windows.json'
  return self.p/n
def recompute(builds):
 a=module('access_layout_parser',ROOT/'repro/donation-relay/swap-receipt-coordinate-recovery/analyze.py');g=module('access_layout_graph',ROOT/'repro/donation-relay/donation-wrapper-source-proposal/compare.py');reports={}
 for label,p in builds.items():
  v=View(p);r=a.analyze(v);ob=(v/'original.so').read_bytes();cb=(v/'candidate.so').read_bytes();ub=(v/'unstripped.so').read_bytes();oe,ce=a.Elf(ob),a.Elf(cb);oh=struct.unpack_from('<16sHHIQQQIHHHHHH',ob)
  ranges={'elf_header':(0,oh[8]),'program_headers':(oh[5],oh[9]*oh[10]),'section_headers':(oh[6],oh[11]*oh[12])};headers={k:dict(offset=x,bytes=n,different=sum(u!=v for u,v in zip(ob[x:x+n],cb[x:x+n])))for k,(x,n)in ranges.items()}
  block=[]
  for i in range(194,205):
   o=r['original-function-ledger.json'][i];ids=r['match-ledger.json'][i]['normalized_candidate_indices'];j=min(ids,key=lambda j:abs(r['candidate-function-ledger.json'][j]['start']-o['start']));c=r['candidate-function-ledger.json'][j];w=next(w for w in r['match-witnesses.json']if w['original_ordinal']==i and w['candidate_index']==j)
   block.append(dict(ordinal=i,candidate_index=j,original_start=o['start'],candidate_start=c['start'],bytes=o['bytes'],raw_equal=w['raw_body'],same_address=o['start']==c['start'],direct_calls=len(w['direct_calls']),all_callees_closed=all(x['normalized_body_pair']and x['recursive_call_shape_closed']for x in w['direct_calls']),indirect_calls=len(w['indirect_calls']),data_references=len(w['data_references'])))
  graph=g.data_graph(a,r,ob,ub);rows=graph.pop('rows');graph['rows_sha256']=sha((json.dumps(rows,indent=2,sort_keys=True)+'\n').encode())
  so,sc=oe.by_name['.rel.dyn'],ce.by_name['.rel.dyn'];rels=[]
  for off in range(0,so['size'],16):
   x=oe.section_bytes(so)[off:off+16];y=ce.section_bytes(sc)[off:off+16]
   if x!=y:rels.append(dict(index=off//16,original=list(struct.unpack('<QQ',x)),candidate=list(struct.unpack('<QQ',y))))
  reports[label]=dict(summary=r['comparison-summary.json'],sections=r['section-comparison.json'],headers=headers,block=block,data_graph=graph,relocations=dict(total=so['size']//16,changed=len(rels),rows=rels),normalized_ordinals=[x['ordinal']for x in r['match-ledger.json']if x['normalized_candidate_indices']],raw_ordinals=[x['ordinal']for x in r['match-ledger.json']if x['raw_candidate_indices']])
 b,c=reports['baseline'],reports['recovered'];transition={k:dict(gains=sorted(set(c[k+'_ordinals'])-set(b[k+'_ordinals'])),losses=sorted(set(b[k+'_ordinals'])-set(c[k+'_ordinals'])))for k in ['normalized','raw']}
 return dict(reports=reports,transition=transition)
