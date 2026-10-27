"""Recompute the exact union of the decoder and relay-rejection source gains."""
from pathlib import Path
import gzip,hashlib,importlib.util,json
HERE=Path(__file__).resolve().parent;ROOT=HERE.parents[1]
def module(n,p):
 s=importlib.util.spec_from_file_location(n,p);m=importlib.util.module_from_spec(s);s.loader.exec_module(m);return m
old=module('integrated_relay',ROOT/'research/fees-crank-relay-rejection/analyze.py');wm=old.wm
relay_contract=old.relay_contract
calls=old.calls

def analyze():
 e=json.loads((HERE/'experiment.json').read_text());o=(ROOT/'evidence/original/pump_fees/deployed.so').read_bytes();ow=wm.windows(o);oi={x['address']:x for x in ow};variants={};data={};direct={};details={};contracts={};images={};indexes={};maps={}
 for label,v in e['variants'].items():
  b=gzip.decompress((HERE/v['files']['symbols']['path']).read_bytes());c=gzip.decompress((HERE/v['files']['candidate']['path']).read_bytes());cw=wm.windows(b);ci={x['address']:x for x in cw};symbols=wm.m.functions(b);assert set(ci)=={x['address']for x in symbols}and all(ci[x['address']]['bytes']==x['bytes']for x in symbols);assert wm.m.section_data(c,'.text')==wm.m.section_data(b,'.text');r=wm.compare(ow,cw);pairs={x['original']['address']:x['candidate']['address']for x in r['unique_pairs']};maps[label]=pairs;indexes[label]=ci;images[label]=b
  variants[label]=dict(r,candidate_windows=len(cw),unique_raw_pairs=sum(x['original']['raw_sha256']==x['candidate']['raw_sha256']for x in r['unique_pairs']),equals_original_capture=c==o,equals_original_elf_extent=c==o[:wm.m.elf_layout(o)['elf_extent']]);f=next(x for x in cw if'CrankDonationFeePda$u20$as$u20$anchor_lang..Accounts$LT$'in(x['name']or'')and'12try_accounts'in x['name']);contracts[label]=old.relay_contract(b,f)
  for address,right in [(408640,f),*[(k,ci[pairs[k]])for k in [18384,302032,257264,36072]]]:
   left=oi[address];a,z=old.calls(o,left,oi),old.calls(b,right,ci);assert a.keys()==z.keys();direct[label+':'+str(address)]=[dict(offset=k,original=x,candidate=z[k],equal=(x['name']==z[k].get('name')if x['kind']=='import'else x['signature']==z[k].get('signature')))for k,x in a.items()];details[label+':'+str(address)]=right
  helper=ci[pairs[18384]];ins={x['offset']:x for x in wm.m.instructions(b,helper['address'],helper['bytes'])};owner=[wm.m.at_address(b,ins[k]['lddw_value'],32).hex()for k in [32,96]];payload=ci[pairs[257264]];record=wm.m.message_record(b,wm.m.instructions(b,payload['address'],payload['bytes']));caller=ci[pairs[302032]];assert old.calls(b,caller,ci)[6040]['target']==helper['address'];data[label]=dict(owner_constants=owner,message_record=record,incoming_call=dict(caller=caller['address'],offset=6040,target=helper['address']))
 priorpath=ROOT/e['prior_relay']['packet'];prior_e=json.loads((priorpath/'experiment.json').read_text());d=prior_e['variants']['origins']['files']['symbols'];prior=wm.compare(ow,wm.windows(gzip.decompress((priorpath/d['path']).read_bytes())));prior_set={x['original']['address']for x in prior['unique_pairs']};before=set(maps['control']);after=set(maps['origins']);assert after==before|prior_set
 b=images['origins'];ci=indexes['origins'];pairs=maps['origins'];sc=module('joint_slice',ROOT/e['prior_relay']['packet']/'slice_contract.py');cc=module('joint_common',ROOT/e['prior_relay']['packet']/'common_contract.py');bc=module('joint_buyback',ROOT/e['prior_relay']['packet']/'buyback_contract.py');slice_contract=sc.contract(b,list(ci.values()),pairs);common=cc.locations(b,ci[pairs[75880]]);assert common==cc.locations(o,oi[75880]);origin=bc.error_origin(b,ci[pairs[358312]]);bc.check_origin(origin)
 a,b=[images[k]for k in ['control','origins']];assert len(a)==len(b);delta=[[i,x,y]for i,(x,y)in enumerate(zip(a,b))if x!=y];contracts['original']=old.relay_contract(o,oi[408640]);raw=lambda label:{x['address']for x in ow if x['raw_sha256']in{y['raw_sha256']for y in indexes[label].values()}}
 return dict(variants=variants,details=details,direct_calls=direct,contracts=contracts,decoder_data=data,symbol_delta=delta,union=dict(control_unique=len(before),relay_unique=len(prior_set),combined_unique=len(after),only_added_to_control=sorted(after-before),only_added_to_relay=sorted(after-prior_set),lost_from_either=[]),raw_delta=dict(added=sorted(raw('origins')-raw('control')),lost=sorted(raw('control')-raw('origins'))),preserved_slice_contract=slice_contract,preserved_common_locations=common,preserved_buyback_origin=origin)
if __name__=='__main__':
 r=analyze();(HERE/'analysis.json.gz').write_bytes(gzip.compress((json.dumps(r,indent=2)+'\n').encode(),mtime=0));print(r['union']);print('direct bindings',[(k,len(v),sum(x['equal']for x in v))for k,v in r['direct_calls'].items()])
