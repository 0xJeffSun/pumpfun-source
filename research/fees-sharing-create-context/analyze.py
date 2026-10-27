"""Compare storage controls, complete parser/exit/dispatch bodies and data."""
from pathlib import Path
import gzip,hashlib,importlib.util,json
HERE=Path(__file__).resolve().parent;ROOT=HERE.parents[1]
def module(n,p):
 s=importlib.util.spec_from_file_location(n,p);m=importlib.util.module_from_spec(s);s.loader.exec_module(m);return m
wm=module('sharing_context_windows',HERE/'window_map.py')
TARGETS=[445160,464168,639104]
PARSER_STRINGS={576:'global',696:'event_authority',808:'program',880:'payer',1272:'mint',1752:'bonding_curve',1936:'system_program',2256:'pump_event_authority',2328:'pump_program',2600:'pool',2936:'pump_amm_event_authority',3056:'pump_amm_program',3584:'sharing-config',4048:'sharing_config',6200:'global',6504:'sharing_config',7016:'sharing_config',7136:'event_authority',7448:'payer',7552:'bonding-curve',8112:'bonding_curve',8832:'pump_event_authority',9144:'bonding_curve',9712:'pump_amm_event_authority',10960:'pool'}
RANGES={445160:PARSER_STRINGS,464168:{440:'sharing_config',1760:'bonding_curve',2944:'pool'},639104:{32:'Instruction: CreateFeeSharingConfig'}}
def calls(image,f,index):
 rel=dict(wm.m.relocations(image));dyn=wm.dynamic_symbols(image);out={}
 for i in wm.m.instructions(image,f['address'],f['bytes']):
  if'call_target'not in i:continue
  info=rel.get(f['address']+i['offset'],0)
  if info&0xffffffff==10:out[i['offset']]=dict(kind='import',name=dyn[info>>32]['name'])
  else:
   row=index[i['call_target']];out[i['offset']]=dict(kind='local',target=i['call_target'],bytes=row['bytes'],signature=row['signature'])
 return out

def data_contract(image,f,original_address):
 ins={i['offset']:i for i in wm.m.instructions(image,f['address'],f['bytes'])};out=dict(literals=[dict(offset=k,bytes=len(v),value=wm.m.at_address(image,ins[k]['lddw_value'],len(v)).hex())for k,v in RANGES[original_address].items()])
 if original_address==464168:out['owner_ids']=[wm.m.at_address(image,ins[k]['lddw_value'],32).hex()for k in [40,88,1416]]
 return out

def analyze():
 e=json.loads((HERE/'experiment.json').read_text());o=(ROOT/'evidence/original/pump_fees/deployed.so').read_bytes();assert hashlib.sha256(o).hexdigest()=='4f2955d0f6b40cc9ff7daa18ccad7d19119ba1249759f4e7e3bb691beee6b35e';ow=wm.windows(o);oi={x['address']:x for x in ow};variants={};coverage={};raws={};details=[];data={};layouts={}
 for label,v in e['variants'].items():
  b=gzip.decompress((HERE/v['files']['symbols']['path']).read_bytes());c=gzip.decompress((HERE/v['files']['candidate']['path']).read_bytes());cw=wm.windows(b);ci={x['address']:x for x in cw};symbols=wm.m.functions(b);assert set(ci)=={x['address']for x in symbols}and all(ci[x['address']]['bytes']==x['bytes']for x in symbols);assert wm.m.section_data(c,'.text')==wm.m.section_data(b,'.text');r=wm.compare(ow,cw);pairs={x['original']['address']:x['candidate']['address']for x in r['unique_pairs']};coverage[label]=set(pairs);raws[label]={x['address']for x in ow if x['raw_sha256']in{y['raw_sha256']for y in cw}};variants[label]=dict(r,candidate_windows=len(cw),unique_raw_pairs=sum(x['original']['raw_sha256']==x['candidate']['raw_sha256']for x in r['unique_pairs']),equals_original_capture=c==o,equals_original_elf_extent=c==o[:wm.m.elf_layout(o)['elf_extent']])
  f=next(x for x in cw if'CreateFeeSharingConfig$u20$as$u20$anchor_lang..AccountsExit'in(x['name']or''));ins={i['offset']:i for i in wm.m.instructions(b,f['address'],f['bytes'])};layouts[label]=dict(exit_bytes=f['bytes'],operands=[dict(offset=k,opcode=ins[k]['opcode'],displacement=ins[k]['displacement'],immediate=ins[k]['immediate'])for k in [152,592,1032,1360,1480,1920,2376]])
  if label=='origins':
   for address in TARGETS:
    left=oi[address];right=ci[pairs[address]];a,z=calls(o,left,oi),calls(b,right,ci);assert a.keys()==z.keys();details.append(dict(original=left,candidate=right,calls=[dict(offset=k,original=x,candidate=z[k],equal=(x.get('signature',x.get('name'))==z[k].get('signature',z[k].get('name'))))for k,x in a.items()]));data[str(address)]=dict(original=data_contract(o,left,address),candidate=data_contract(b,right,address))
   sc=module('sharing_slice',HERE/'slice_contract.py');cc=module('sharing_common',HERE/'common_contract.py');bc=module('sharing_buyback',HERE/'buyback_contract.py');slice_contract=sc.contract(b,cw,pairs);common=cc.locations(b,ci[pairs[75880]]);assert common==cc.locations(o,oi[75880]);origin=bc.error_origin(b,ci[pairs[358312]]);bc.check_origin(origin);rc=module('preserved_relay',HERE/'relay_contract.py');relay=rc.relay_contract(b,ci[pairs[408640]]);expected_relay=rc.relay_contract(o,oi[408640]);assert relay|dict(address_comparison_call=expected_relay['address_comparison_call'])==expected_relay;helper=ci[pairs[18384]];hr={i['offset']:i for i in wm.m.instructions(b,helper['address'],helper['bytes'])};decoder=dict(owner_ids=[wm.m.at_address(b,hr[k]['lddw_value'],32).hex()for k in [32,96]],message_record=wm.m.message_record(b,wm.m.instructions(b,pairs[257264],2648)))
 ins={i['offset']:i for i in wm.m.instructions(o,464168,3000)};layouts['original']=dict(exit_bytes=3000,operands=[dict(offset=k,opcode=ins[k]['opcode'],displacement=ins[k]['displacement'],immediate=ins[k]['immediate'])for k in [152,592,1032,1360,1480,1920,2376]])
 return dict(variants=variants,details=details,data_contracts=data,layouts=layouts,deltas={label:dict(added=sorted(v-coverage['control']),lost=sorted(coverage['control']-v))for label,v in coverage.items()if label!='control'},raw_deltas={label:dict(added=sorted(v-raws['control']),lost=sorted(raws['control']-v))for label,v in raws.items()if label!='control'},preserved_slice_contract=slice_contract,preserved_common_locations=common,preserved_buyback_origin=origin,preserved_relay=relay,preserved_decoder=decoder)
if __name__=='__main__':
 r=analyze();(HERE/'analysis.json.gz').write_bytes(gzip.compress((json.dumps(r,indent=2)+'\n').encode(),mtime=0));print(r['deltas']);print([(x['original']['address'],len(x['calls']),sum(c['original']['kind']=='import'for c in x['calls']),[c['offset']for c in x['calls']if not c['equal']])for x in r['details']])
