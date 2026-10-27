"""Full instruction-window, real-call, selected-data and preservation checks."""
from pathlib import Path
import gzip,hashlib,importlib.util,json
HERE=Path(__file__).resolve().parent;ROOT=HERE.parents[1]
def module(n,p):
 s=importlib.util.spec_from_file_location(n,p);m=importlib.util.module_from_spec(s);s.loader.exec_module(m);return m
def load(p):return json.loads(gzip.decompress(p.read_bytes()) if p.suffix=='.gz' else p.read_bytes())
wm=module('v2_windows',HERE/'window_map.py');front=module('v2_front',HERE/'frontier_contract.py');admin=module('v2_calls',HERE/'admin_contract.py')
def calls(o,of,oi,b,cf,ci):
 a,z=admin.calls(o,of,oi),admin.calls(b,cf,ci);assert a.keys()==z.keys();rows=[dict(offset=k,original=x,candidate=z[k],equal=x.get('signature',x.get('name'))==z[k].get('signature',z[k].get('name')))for k,x in a.items()];assert all(x['equal']for x in rows);return rows
def system_id(b,f):
 rows={x['offset']:x for x in wm.m.instructions(b,f['address'],f['bytes'])};rel=dict(wm.m.relocations(b));assert f['bytes']==3096 and rows[224]['opcode']==0x18 and rel.get(f['address']+224,0)&0xffffffff==8
 value=wm.m.at_address(b,rows[224]['lddw_value'],32);assert value==bytes(32);return value.hex()
def analyze():
 e=load(HERE/'experiment.json');o=(ROOT/'evidence/original/pump_fees/deployed.so').read_bytes();assert hashlib.sha256(o).hexdigest()=='4f2955d0f6b40cc9ff7daa18ccad7d19119ba1249759f4e7e3bb691beee6b35e';ow=wm.windows(o);oi={x['address']:x for x in ow};reports={};sets={};rawsets={};edge_sets={};locsets={};details={}
 for label in ['control','borrowed','origins']:
  v=e['variants'][label];b=gzip.decompress((HERE/v['files']['symbols']['path']).read_bytes());c=gzip.decompress((HERE/v['files']['candidate']['path']).read_bytes());cw=wm.windows(b);ci={x['address']:x for x in cw};syms=wm.m.functions(b);assert set(ci)=={x['address']for x in syms}and all(ci[x['address']]['bytes']==x['bytes']for x in syms)
  for sec in wm.m.elf_layout(c)['sections']:
   if sec['flags']&2 and sec['type']!=8:
    other=next(x for x in wm.m.elf_layout(b)['sections']if x['name']==sec['name']);assert sec['address']==other['address']and wm.m.section_data(c,sec['name'])==wm.m.section_data(b,sec['name'])
  r=wm.compare(ow,cw);pairs={x['original']['address']:x['candidate']['address']for x in r['unique_pairs']};sig={x['signature']for x in cw};raw={x['raw_sha256']for x in cw};sets[label]={x['address']for x in ow if x['signature']in sig};rawsets[label]={x['address']for x in ow if x['raw_sha256']in raw};loc=front.cohort(wm,o,c,r['unique_pairs']);assert all(a==z for a,z in loc.values());locsets[label]=loc;edges=front.direct_edges(wm,o,c,ow,cw,r['unique_pairs']);edge_sets[label]={(a,k):(x,y)for a,k,x,y in edges}
  reports[label]=dict(unique=len(pairs),normalized=len(sets[label]),unmatched=len(r['unmatched_original']),candidate_windows=len(cw),raw=len(rawsets[label]),unique_raw=sum(x['original']['raw_sha256']==x['candidate']['raw_sha256']for x in r['unique_pairs']),normalized_inventory=sorted(sets[label]),raw_inventory=sorted(rawsets[label]),equal_locations=len(loc),direct_edges=len(edges),unequal_callee_edges=sum(x!=y for _,_,x,y in edges),candidate_bytes=len(c),candidate_sha256=hashlib.sha256(c).hexdigest(),capture_equal=c==o,extent_equal=c==o[:wm.m.elf_layout(o)['elf_extent']])
  if label=='origins':
   cf=ci[pairs[240088]];checks=calls(o,oi[240088],oi,b,cf,ci);assert len(checks)==14 and sum(x['original']['kind']=='local'for x in checks)==13;assert oi[240088]['annotations']==[[224,'opaque_relocated_pointer'],[368,'import','abort']];assert not any(x['opcode']==0x8d for x in wm.m.instructions(b,cf['address'],3096));assert system_id(o,oi[240088])==system_id(b,cf)
   incoming=[]
   for tag,image,windows,target in [('original',o,ow,240088),('candidate',b,cw,cf['address'])]:
    rel=dict(wm.m.relocations(image));rows=[]
    for f in windows:
     for i in wm.m.instructions(image,f['address'],f['bytes']):
      if i.get('call_target')==target and rel.get(f['address']+i['offset'],0)&0xffffffff!=10:rows.append(dict(caller=f['address'],caller_bytes=f['bytes'],call_offset=i['offset'],target=target,caller_signature=f['signature']))
    assert len(rows)==1;incoming.append(dict(image=tag,**rows[0]))
   assert incoming[0]['caller']==211408 and incoming[0]['call_offset']==6032 and incoming[0]['caller_signature']!=incoming[1]['caller_signature']
   sc=module('v2_slice',HERE/'slice_contract.py');cc=module('v2_common',HERE/'common_contract.py');bc=module('v2_buyback',HERE/'buyback_contract.py');rc=module('v2_relay',HERE/'relay_contract.py');selected=dict(slice=sc.contract(b,cw,pairs),common=cc.locations(b,ci[pairs[75880]]),buyback=bc.error_origin(b,ci[pairs[358312]]),relay=rc.relay_contract(b,ci[pairs[408640]]),sync_native=front.pack_proof(wm,o,c,ow,cw,r['unique_pairs']));assert selected['common']==cc.locations(o,oi[75880]);bc.check_origin(selected['buyback']);expected=rc.relay_contract(o,oi[408640]);assert selected['relay']|dict(address_comparison_call=expected['address_comparison_call'])==expected
   h={x['offset']:x for x in wm.m.instructions(b,pairs[18384],1144)};oh={x['offset']:x for x in wm.m.instructions(o,18384,1144)};selected['decoder_owner_ids']=[wm.m.at_address(b,h[k]['lddw_value'],32).hex()for k in [32,96]];assert selected['decoder_owner_ids']==[wm.m.at_address(o,oh[k]['lddw_value'],32).hex()for k in [32,96]];selected['decoder_message']=wm.m.message_record(b,wm.m.instructions(b,pairs[257264],2648))['message'];assert selected['decoder_message']=='failed to fill whole buffer';details=dict(original_address=240088,candidate=cf,callees=checks,system_program_id=system_id(b,cf),incoming=incoming,selected_data=selected)
 for label in ['borrowed','origins']:
  assert sets['control']<=sets[label]and rawsets[label]==rawsets['control']
  for k,v in locsets['control'].items():assert locsets[label][k]==v
  for k,(x,y)in edge_sets['control'].items():assert edge_sets[label][k][0]==x and(x!=y or edge_sets[label][k][1]==x)
 assert sets['borrowed']==sets['control']and sets['origins']-sets['control']=={240088}
 return dict(reports=reports,details=details,positive_edges_preserved=sum(x==y for x,y in edge_sets['control'].values()),locations_preserved=len(locsets['control']),gains=[240088],losses=[])
if __name__=='__main__':
 r=analyze();(HERE/'analysis.json.gz').write_bytes(gzip.compress((json.dumps(r,indent=2)+'\n').encode(),mtime=0));print({k:{n:v[n]for n in ['normalized','unique','unmatched','raw','equal_locations','direct_edges','candidate_bytes']}for k,v in r['reports'].items()});print(r['details']['incoming'])
