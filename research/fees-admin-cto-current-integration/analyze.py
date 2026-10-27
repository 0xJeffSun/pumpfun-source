"""Recompute each retained compiler output using unchanged complete-body masks."""
from pathlib import Path
import gzip,hashlib,importlib.util,json,struct
HERE=Path(__file__).resolve().parent;ROOT=HERE.parents[1]
def read(p):return json.loads(gzip.decompress(p.read_bytes())if p.suffix=='.gz'else p.read_bytes())
def module(n,p):
 s=importlib.util.spec_from_file_location(n,p);m=importlib.util.module_from_spec(s);s.loader.exec_module(m);return m
wm=module('visibility_windows',HERE/'window_map.py')
front=module('visibility_frontier',ROOT/'research/fees-frontier-prefix-integration/frontier_contract.py')
def analyze():
 e=read(HERE/'experiment.json');o=(ROOT/'evidence/original/pump_fees/deployed.so').read_bytes();ow=wm.windows(o);reports={};details={};coverage={};raws={}
 for label,row in e['variants'].items():
  images={k:gzip.decompress((HERE/v['path']).read_bytes())for k,v in row['files'].items()};c,b=images['candidate'],images['symbols'];cw=wm.windows(b);result=wm.compare(ow,cw);normalized=sorted(f['address']for f in ow if f['signature']in{g['signature']for g in cw});raw=sorted(f['address']for f in ow if f['raw_sha256']in{g['raw_sha256']for g in cw});coverage[label]=set(normalized);raws[label]=set(raw)
  for section in wm.m.elf_layout(c)['sections']:
   if section['flags']&2 and section['type']!=8:
    other=next(s for s in wm.m.elf_layout(b)['sections']if s['name']==section['name']);assert section['address']==other['address'] and wm.m.section_data(c,section['name'])==wm.m.section_data(b,section['name'])
  result.update(candidate_windows=len(cw),normalized=normalized,raw=raw,unique_raw_pairs=sum(p['original']['raw_sha256']==p['candidate']['raw_sha256']for p in result['unique_pairs']),equals_original_capture=c==o,equals_original_elf_extent=c==o[:wm.m.elf_layout(o)['elf_extent']]);reports[label]=result
  locations=front.cohort(wm,o,c,result['unique_pairs']);assert all(x==y for x,y in locations.values())
  details[label]={'locations':[[a,k,x,y]for(a,k),(x,y)in sorted(locations.items())],'edges':front.direct_edges(wm,o,c,ow,cw,result['unique_pairs'])}
 result=reports['origins'];pair=next(p for p in result['unique_pairs']if p['original']['address']==650064);orig,cand=pair['original'],pair['candidate'];b=gzip.decompress((HERE/e['variants']['origins']['files']['symbols']['path']).read_bytes());ci={x['address']:x for x in wm.windows(b)};oi={x['address']:x for x in ow}
 def contract(img,f,idx):
  ins=wm.m.instructions(img,f['address'],f['bytes']);rel=dict(wm.m.relocations(img));at={i['offset']:i for i in ins};calls=[]
  for i in ins:
   if 'call_target'in i and rel.get(f['address']+i['offset'],0)&0xffffffff!=10:calls.append([i['offset'],idx[i['call_target']]['signature']])
  loc=wm.m.at_address(img,at[264]['lddw_value'],24);low,ptr,n,line,col=struct.unpack('<IIQII',loc);assert low==0
  return {'bytes':f['bytes'],'bump_store':{k:at[104][k]for k in ['opcode','destination','source','displacement','immediate']},'log':wm.m.at_address(img,at[40]['lddw_value'],at[56]['immediate']).decode(),'borrowed_record':dict(value=wm.m.at_address(img,ptr,n).decode(),tail=loc[8:].hex()),'direct_calls':calls}
 left,right=contract(o,orig,oi),contract(b,cand,ci);assert left==right and len(left['direct_calls'])==6
 before={(a,k):(x,y)for a,k,x,y in details['control']['edges']};after={(a,k):(x,y)for a,k,x,y in details['origins']['edges']};assert before.keys()<=after.keys()
 assert all(after[k]==v or after[k][0]==after[k][1]for k,v in before.items())
 admin_pair=next(p for p in reports['origins']['unique_pairs']if p['original']['address']==127776)
 ar=wm.m.instructions(o,127776,4968);br=wm.m.instructions(b,admin_pair['candidate']['address'],4968);orr=dict(wm.m.relocations(o));admin_calls=[]
 for x,y in zip(ar,br):
  if 'call_target'in x and orr.get(127776+x['offset'],0)&0xffffffff!=10:
   admin_calls.append({'offset':x['offset'],'original_target':x['call_target'],'candidate_target':y['call_target'],'equal':oi[x['call_target']]['signature']==ci[y['call_target']]['signature']})
 assert len(admin_calls)==20 and all(x['equal']for x in admin_calls)
 result={'variants':reports,'details':details,'deltas':{k:{'added':sorted(v-coverage['control']),'lost':sorted(coverage['control']-v),'raw_added':sorted(raws[k]-raws['control']),'raw_lost':sorted(raws['control']-raws[k])}for k,v in coverage.items()},'wrapper':{'pair':pair,'contract':left},'admin_cto':{'pair':admin_pair,'calls':admin_calls},'preserved_edges':{'control':len(before),'origins':len(after)}}
 return json.loads(json.dumps(result))
if __name__=='__main__':
 r=analyze();(HERE/'analysis.json.gz').write_bytes(gzip.compress((json.dumps(r,indent=2,sort_keys=True)+'\n').encode(),mtime=0));print([(k,len(v['normalized']),len(v['raw']),len(v['unmatched_original']))for k,v in r['variants'].items()])
