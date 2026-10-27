"""Read the boxed admin context and its typed self-program boundary."""
from pathlib import Path
import gzip,hashlib,importlib.util,json
HERE=Path(__file__).resolve().parent;ROOT=HERE.parents[1]
def module(n,p):
 s=importlib.util.spec_from_file_location(n,p);m=importlib.util.module_from_spec(s);s.loader.exec_module(m);return m
wm=module('admin_windows',HERE/'window_map.py')
RANGES={381352:{416:'pool_authority',488:'authority',576:'global',784:'mint',1296:'sharing_config',1744:'pool-authority',2232:'pool_authority',2488:'program',2560:'event_authority',3088:'global',3560:'global',3752:'sharing-config',3944:'sharing_config',4328:'sharing_config',4912:'sharing_config',5216:'sharing_config',5624:'event_authority'},642848:{40:'Instruction: AdminCtoSharingConfig',1320:'sharing_config'}}
def calls(image,f,index):
 rel=dict(wm.m.relocations(image));dyn=wm.dynamic_symbols(image);out={}
 for i in wm.m.instructions(image,f['address'],f['bytes']):
  if'call_target'not in i:continue
  info=rel.get(f['address']+i['offset'],0)
  if info&0xffffffff==10:out[i['offset']]=dict(kind='import',name=dyn[info>>32]['name'])
  else:
   row=index[i['call_target']];out[i['offset']]=dict(kind='local',target=i['call_target'],bytes=row['bytes'],signature=row['signature'])
 return out

def literals(image,f,address):
 ins={i['offset']:i for i in wm.m.instructions(image,f['address'],f['bytes'])}
 return [dict(offset=k,bytes=len(v),value=wm.m.at_address(image,ins[k]['lddw_value'],len(v)).hex())for k,v in RANGES[address].items()]
def reader_contract(image,parser,index):
 rows={i['offset']:i for i in wm.m.instructions(image,parser['address'],parser['bytes'])};assert parser['bytes']==6152
 assert rows[376]['immediate']==rows[680]['immediate']==744 and rows[1248]['immediate']==104
 target=rows[1584]['call_target'];helper=index[target];assert helper['bytes']==584
 ins={i['offset']:i for i in wm.m.instructions(image,target,584)}
 return dict(allocation_bytes=[rows[376]['immediate'],rows[1248]['immediate']],global_copy_bytes=rows[680]['immediate'],program_call_offset=1584,reader_bytes=584,reader_signature=helper['signature'],expected_program=wm.m.at_address(image,ins[144]['lddw_value'],32).hex(),errors=[dict(offset=k,code=ins[k]['immediate'])for k in [40,256,544]])
def analyze():
 e=json.loads((HERE/'experiment.json').read_text());o=(ROOT/'evidence/original/pump_fees/deployed.so').read_bytes();assert hashlib.sha256(o).hexdigest()=='4f2955d0f6b40cc9ff7daa18ccad7d19119ba1249759f4e7e3bb691beee6b35e';ow=wm.windows(o);oi={x['address']:x for x in ow};variants={};coverage={};raws={};details=[];data={}
 for label,v in e['variants'].items():
  b=gzip.decompress((HERE/v['files']['symbols']['path']).read_bytes());c=gzip.decompress((HERE/v['files']['candidate']['path']).read_bytes());cw=wm.windows(b);ci={x['address']:x for x in cw};symbols=wm.m.functions(b);assert set(ci)=={x['address']for x in symbols}and all(ci[x['address']]['bytes']==x['bytes']for x in symbols);assert wm.m.section_data(c,'.text')==wm.m.section_data(b,'.text');r=wm.compare(ow,cw);pairs={x['original']['address']:x['candidate']['address']for x in r['unique_pairs']};coverage[label]=set(pairs);raws[label]={x['address']for x in ow if x['raw_sha256']in{y['raw_sha256']for y in cw}};variants[label]=dict(r,candidate_windows=len(cw),unique_raw_pairs=sum(x['original']['raw_sha256']==x['candidate']['raw_sha256']for x in r['unique_pairs']),equals_original_capture=c==o,equals_original_elf_extent=c==o[:wm.m.elf_layout(o)['elf_extent']])
  if label=='origins':
   for address in [381352,642848]:
    left=oi[address];right=ci[pairs[address]];a,z=calls(o,left,oi),calls(b,right,ci);assert a.keys()==z.keys();details.append(dict(original=left,candidate=right,calls=[dict(offset=k,original=x,candidate=z[k],equal=(x.get('signature',x.get('name'))==z[k].get('signature',z[k].get('name'))))for k,x in a.items()]));data[str(address)]=dict(original=literals(o,left,address),candidate=literals(b,right,address))
   program=dict(original=reader_contract(o,oi[381352],oi),candidate=reader_contract(b,ci[pairs[381352]],ci));ph=wm.m.instructions(b,pairs[381352],6152);target=next(i['call_target']for i in ph if i['offset']==1584);oldtarget=74128;a,z=calls(o,oi[oldtarget],oi),calls(b,ci[target],ci);assert a.keys()==z.keys();program['reader_calls']=[dict(offset=k,equal=x.get('signature',x.get('name'))==z[k].get('signature',z[k].get('name')))for k,x in a.items()]
   sc=module('admin_slice',HERE/'slice_contract.py');cc=module('admin_common',HERE/'common_contract.py');bc=module('admin_buyback',HERE/'buyback_contract.py');slice_contract=sc.contract(b,cw,pairs);common=cc.locations(b,ci[pairs[75880]]);assert common==cc.locations(o,oi[75880]);origin=bc.error_origin(b,ci[pairs[358312]]);bc.check_origin(origin);rc=module('admin_relay',HERE/'relay_contract.py');relay=rc.relay_contract(b,ci[pairs[408640]]);expected=rc.relay_contract(o,oi[408640]);assert relay|dict(address_comparison_call=expected['address_comparison_call'])==expected;helper=ci[pairs[18384]];hr={i['offset']:i for i in wm.m.instructions(b,helper['address'],helper['bytes'])};decoder=dict(owner_ids=[wm.m.at_address(b,hr[k]['lddw_value'],32).hex()for k in [32,96]],message_record=wm.m.message_record(b,wm.m.instructions(b,pairs[257264],2648)))
 return dict(variants=variants,details=details,literals=data,program_reader=program,deltas={label:dict(added=sorted(v-coverage['control']),lost=sorted(coverage['control']-v))for label,v in coverage.items()if label!='control'},raw_deltas={label:dict(added=sorted(v-raws['control']),lost=sorted(raws['control']-v))for label,v in raws.items()if label!='control'},preserved_slice_contract=slice_contract,preserved_common_locations=common,preserved_buyback_origin=origin,preserved_relay=relay,preserved_decoder=decoder)
if __name__=='__main__':
 r=analyze();(HERE/'analysis.json.gz').write_bytes(gzip.compress((json.dumps(r,indent=2)+'\n').encode(),mtime=0));print(r['deltas']);print([(d['original']['address'],len(d['calls']),[c['offset']for c in d['calls']if not c['equal']])for d in r['details']])
