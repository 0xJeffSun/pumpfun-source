"""Read the complete crank parser, encoded calls and relay rejection contract."""
from pathlib import Path
import gzip,hashlib,importlib.util,json
HERE=Path(__file__).resolve().parent;ROOT=HERE.parents[1]
def module(name,path):
 s=importlib.util.spec_from_file_location(name,path);m=importlib.util.module_from_spec(s);s.loader.exec_module(m);return m
wm=module('relay_windows',HERE/'window_map.py')
RANGES={840:'event_authority',936:'program',1008:'payer',1080:'system_program',1152:'token_program',1224:'associated_token_program',1952:'donation_relay_program',2024:'fee_program_global',2096:'donation_fee_pda',2168:'rent',2240:'quote_mint',2440:'donation_relay_event_authority',2696:'mint_whitelist',2904:'epoch_tracker',3184:'debouncer_ata',3256:'debouncer',5208:'rent',5544:'donation_fee_pda_ata',6040:'donation_fee_pda_ata',6160:'event_authority',6472:'payer',6552:'fee-program-global',6744:'fee_program_global',7120:'fee_program_global',7432:'donation-fee-pda',7640:'donation_fee_pda',8016:'donation_fee_pda',8816:'debouncer',8936:'donation_fee_pda',9056:'quote_mint',9360:'quote_mint',9480:'donation_relay_program',9816:'donation_relay_program',9960:'debouncer_ata',10080:'epoch_tracker'}
def calls(image,f,index):
 rel=dict(wm.m.relocations(image));dyn=wm.dynamic_symbols(image);out={}
 for i in wm.m.instructions(image,f['address'],f['bytes']):
  if 'call_target'not in i:continue
  info=rel.get(f['address']+i['offset'],0)
  if info&0xffffffff==10:out[i['offset']]=dict(kind='import',name=dyn[info>>32]['name'])
  else:
   body=index[i['call_target']];out[i['offset']]=dict(kind='local',target=i['call_target'],bytes=body['bytes'],signature=body['signature'])
 return out

def relay_contract(image,f):
 ins={i['offset']:i for i in wm.m.instructions(image,f['address'],f['bytes'])}
 assert f['bytes']==10872
 assert (ins[8536]['opcode'],ins[8536]['displacement'])==(0x71,42)
 assert ins[8544]['opcode']==0x15 and ins[8544]['immediate']==0
 executable_target=8544+8+ins[8544]['displacement']*8;assert executable_target==9752
 assert ins[8664]['opcode']==0xb7 and ins[8664]['immediate']==32
 assert ins[8696]['opcode']==0x55 and ins[8696]['immediate']==0
 address_target=8696+8+ins[8696]['displacement']*8;assert address_target==9416
 assert ins[9432]['opcode']==ins[9768]['opcode']==0xb7
 labels=[wm.m.at_address(image,ins[k]['lddw_value'],ins[k+16]['immediate']).decode()for k in [9480,9816]]
 assert labels==['donation_relay_program']*2
 return dict(executable_check_offset=8536,executable_branch=8544,executable_error_target=executable_target,executable_error=ins[9768]['immediate'],address_pointer_offset=8648,address_comparison_call=ins[8672]['call_target'],address_branch=8696,address_error_target=address_target,address_error=ins[9432]['immediate'],relay_id=wm.m.at_address(image,ins[8648]['lddw_value'],32).hex(),labels=labels,selected_data=[dict(offset=k,bytes=len(value),value=wm.m.at_address(image,ins[k]['lddw_value'],len(value)).hex())for k,value in RANGES.items()])
def analyze():
 e=json.loads((HERE/'experiment.json').read_text());o=(ROOT/'evidence/original/pump_fees/deployed.so').read_bytes();assert hashlib.sha256(o).hexdigest()==e['original_sha256'];ow=wm.windows(o);oi={x['address']:x for x in ow};variants={};images={};indexes={};contracts={};direct={};details={}
 original_calls=calls(o,oi[408640],oi)
 for label,v in e['variants'].items():
  c=gzip.decompress((HERE/v['files']['candidate']['path']).read_bytes());b=gzip.decompress((HERE/v['files']['symbols']['path']).read_bytes());cw=wm.windows(b);ci={x['address']:x for x in cw};symbols=wm.m.functions(b)
  assert set(ci)=={x['address']for x in symbols}and all(ci[x['address']]['bytes']==x['bytes']for x in symbols)
  assert wm.m.section_data(c,'.text')==wm.m.section_data(b,'.text')
  r=wm.compare(ow,cw);variants[label]=dict(r,candidate_windows=len(cw),unique_raw_pairs=sum(x['original']['raw_sha256']==x['candidate']['raw_sha256']for x in r['unique_pairs']),equals_original_capture=c==o,equals_original_elf_extent=c==o[:wm.m.elf_layout(o)['elf_extent']]);images[label]=b;indexes[label]=ci
  f=next(x for x in cw if 'CrankDonationFeePda$u20$as$u20$anchor_lang..Accounts$LT$'in(x['name']or'')and'12try_accounts'in x['name']);contracts[label]=relay_contract(b,f);actual=calls(b,f,ci);assert actual.keys()==original_calls.keys()
  direct[label]=[dict(offset=k,original=x,candidate=actual[k],equal=(x['name']==actual[k].get('name')if x['kind']=='import'else x['signature']==actual[k].get('signature')))for k,x in original_calls.items()]
  details[label]=f
 contracts['original']=relay_contract(o,oi[408640])
 def unique(label):return {x['original']['address']for x in variants[label]['unique_pairs']}
 def raw(label):return {x['address']for x in ow if x['raw_sha256']in{y['raw_sha256']for y in indexes[label].values()}}
 pairs={x['original']['address']:x['candidate']['address']for x in variants['origins']['unique_pairs']};b=images['origins'];ci=indexes['origins'];cw=list(ci.values())
 sc=module('relay_slice',HERE/'slice_contract.py');slice_contract=sc.contract(b,cw,pairs)
 cc=module('relay_common',HERE/'common_contract.py');common_locations=cc.locations(b,ci[pairs[75880]]);assert common_locations==cc.locations(o,oi[75880])
 bc=module('relay_buyback',HERE/'buyback_contract.py');origin=bc.error_origin(b,ci[pairs[358312]]);bc.check_origin(origin)
 delta_bytes=[[i,x,y]for i,(x,y)in enumerate(zip(images['control'],images['origins']))if x!=y];assert len(images['control'])==len(images['origins'])
 return dict(symbol_artifact_delta=delta_bytes,variants=variants,details=details,contracts=contracts,direct_calls=direct,delta=dict(added_original_windows=sorted(unique('origins')-unique('control')),lost_original_windows=sorted(unique('control')-unique('origins'))),raw_delta=dict(added_original_windows=sorted(raw('origins')-raw('control')),lost_original_windows=sorted(raw('control')-raw('origins'))),preserved_slice_contract=slice_contract,preserved_common_locations=common_locations,preserved_buyback_origin=origin)
if __name__=='__main__':
 r=analyze();(HERE/'analysis.json.gz').write_bytes(gzip.compress((json.dumps(r,indent=2)+'\n').encode(),mtime=0));print(json.dumps(dict(delta=r['delta'],raw_delta=r['raw_delta'],calls=len(r['direct_calls']['origins']),different=[x for x in r['direct_calls']['origins']if not x['equal']]),indent=2))
