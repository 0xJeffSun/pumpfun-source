"""Recompute the full-buffer decoder composition on the current 551-window source."""
from pathlib import Path
import gzip,hashlib,importlib.util,json
HERE=Path(__file__).resolve().parent;ROOT=HERE.parents[1]
def module(n,p):
 s=importlib.util.spec_from_file_location(n,p);m=importlib.util.module_from_spec(s);s.loader.exec_module(m);return m
wm=module('prefix_windows',HERE/'window_map.py');admin=module('prefix_admin',HERE/'admin_contract.py');sharing=module('prefix_sharing',HERE/'sharing_contract.py');front=module('prefix_front',HERE/'frontier_contract.py')
def decoder_data(image,index,pairs):
 helper=index[pairs[18384]];ins={i['offset']:i for i in wm.m.instructions(image,helper['address'],helper['bytes'])}
 owners=[wm.m.at_address(image,ins[k]['lddw_value'],32).hex()for k in [32,96]]
 payload=index[pairs[257264]];record=wm.m.message_record(image,wm.m.instructions(image,payload['address'],payload['bytes']))
 closure=index[pairs[302032]];target=admin.calls(image,closure,index)[6040]['target'];assert target==helper['address']
 return dict(owner_ids=owners,message=record['message'],message_nonpointer_bytes=record['raw'][16:],incoming_call_offset=6040)
def analyze():
 e=json.loads((HERE/'experiment.json').read_text());o=(ROOT/'evidence/original/pump_fees/deployed.so').read_bytes();assert hashlib.sha256(o).hexdigest()=='4f2955d0f6b40cc9ff7daa18ccad7d19119ba1249759f4e7e3bb691beee6b35e'
 ow=wm.windows(o);oi={x['address']:x for x in ow};variants={};details={};images={};indexes={};pairs={}
 for label,v in e['variants'].items():
  b=gzip.decompress((HERE/v['files']['symbols']['path']).read_bytes());c=gzip.decompress((HERE/v['files']['candidate']['path']).read_bytes());cw=wm.windows(b);ci={x['address']:x for x in cw};symbols=wm.m.functions(b)
  assert set(ci)=={x['address']for x in symbols}and all(ci[x['address']]['bytes']==x['bytes']for x in symbols)
  for sec in wm.m.elf_layout(c)['sections']:
   if sec['flags']&2 and sec['type']!=8:
    other=next(s for s in wm.m.elf_layout(b)['sections']if s['name']==sec['name']);assert sec['address']==other['address']and wm.m.section_data(c,sec['name'])==wm.m.section_data(b,sec['name'])
  r=wm.compare(ow,cw);pairs[label]={x['original']['address']:x['candidate']['address']for x in r['unique_pairs']};images[label]=b;indexes[label]=ci
  normalized=sorted(x['address']for x in ow if x['signature']in{y['signature']for y in cw});raw=sorted(x['address']for x in ow if x['raw_sha256']in{y['raw_sha256']for y in cw});locations=front.cohort(wm,o,c,r['unique_pairs']);assert all(a==z for a,z in locations.values())
  variants[label]=dict(r,candidate_windows=len(cw),normalized=normalized,raw=raw,unique_raw_pairs=sum(x['original']['raw_sha256']==x['candidate']['raw_sha256']for x in r['unique_pairs']),equals_original_capture=c==o,equals_original_elf_extent=c==o[:wm.m.elf_layout(o)['elf_extent']])
  details[label]=dict(location_uses=len(locations),locations=[dict(original=a,offset=k,left=x,right=y)for(a,k),(x,y)in sorted(locations.items())],edges=front.direct_edges(wm,o,c,ow,cw,r['unique_pairs']),pack=front.pack_proof(wm,o,c,ow,cw,r['unique_pairs']))
 b=images['origins'];ci=indexes['origins'];p=pairs['origins'];direct={}
 for address in [18384,302032,257264,36072,408640,381352,445160,464168,639104,642848,190104]:
  left,right=oi[address],ci[p[address]];a,z=admin.calls(o,left,oi),admin.calls(b,right,ci);assert a.keys()==z.keys()
  direct[str(address)]=[dict(offset=k,original=x,candidate=z[k],equal=x.get('signature',x.get('name'))==z[k].get('signature',z[k].get('name')))for k,x in a.items()]
 literals={}
 for address in sharing.RANGES:
  a,z=sharing.data_contract(o,oi[address],address),sharing.data_contract(b,ci[p[address]],address);assert a==z;literals[str(address)]=a
 for address in admin.RANGES:
  a,z=admin.literals(o,oi[address],address),admin.literals(b,ci[p[address]],address);assert a==z;literals[str(address)]=a
 a,z=admin.reader_contract(o,oi[381352],oi),admin.reader_contract(b,ci[p[381352]],ci);assert a==z
 program_reader=z
 sc=module('prefix_slice',HERE/'slice_contract.py');cc=module('prefix_common',HERE/'common_contract.py');bc=module('prefix_buyback',HERE/'buyback_contract.py');rc=module('prefix_relay',HERE/'relay_contract.py')
 slice_contract=sc.contract(b,list(ci.values()),p);common=cc.locations(b,ci[p[75880]]);assert common==cc.locations(o,oi[75880]);origin=bc.error_origin(b,ci[p[358312]]);bc.check_origin(origin)
 relay=rc.relay_contract(b,ci[p[408640]]);expected=rc.relay_contract(o,oi[408640]);assert relay|dict(address_comparison_call=expected['address_comparison_call'])==expected
 original_decoder=decoder_data(o,oi,{x:x for x in oi});candidate_decoder=decoder_data(b,ci,p);assert original_decoder==candidate_decoder
 social={i['offset']:i for i in wm.m.instructions(b,p[190104],3296)};strings=[wm.m.at_address(b,social[k]['lddw_value'],n).decode()for k,n in [(56,29),(104,40),(1256,72)]];assert social[1296]['immediate']==67 and social[1304]['immediate']==72
 old,new=set(pairs['control']),set(pairs['origins']);assert new-old=={18384}and not old-new
 before={(a,k):(x,y)for a,k,x,y in details['control']['edges']};after={(a,k):(x,y)for a,k,x,y in details['origins']['edges']};assert before.keys()<=after.keys()
 for k,(x,y)in before.items():assert after[k][0]==x and (after[k][1]==y or after[k][1]==x),k
 result=dict(variants=variants,details=details,direct_calls=direct,delta=dict(added=sorted(new-old),lost=sorted(old-new)),raw_delta=dict(added=sorted(set(variants['origins']['raw'])-set(variants['control']['raw'])),lost=sorted(set(variants['control']['raw'])-set(variants['origins']['raw']))),decoder=original_decoder,literals=literals,program_reader=program_reader,slice_contract=slice_contract,common_locations=common,buyback_origin=origin,relay=relay,social_strings=strings,preserved_edges=dict(control=len(before),origins=len(after),newly_equal=[list(k)for k,(x,y)in before.items()if x!=y and after[k][0]==after[k][1]]))
 return json.loads(json.dumps(result))
if __name__=='__main__':
 r=analyze();(HERE/'analysis.json.gz').write_bytes(gzip.compress((json.dumps(r,indent=2)+'\n').encode(),mtime=0));print([(k,len(v['unique_pairs']),len(v['normalized']),len(v['unmatched_original']))for k,v in r['variants'].items()]);print(r['delta'],r['preserved_edges']);print('direct calls',[(k,len(v),sum(x['equal']for x in v))for k,v in r['direct_calls'].items()])
