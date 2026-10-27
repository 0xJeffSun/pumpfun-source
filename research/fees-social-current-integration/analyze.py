"""Recompute the social correction on the fully retained401-pair source."""
from pathlib import Path
import gzip,hashlib,importlib.util,json
HERE=Path(__file__).resolve().parent;ROOT=HERE.parents[1]
def module(n,p):
 s=importlib.util.spec_from_file_location(n,p);m=importlib.util.module_from_spec(s);s.loader.exec_module(m);return m
old=module('social_parent',ROOT/'research/fees-admin-sharing-context/analyze.py');wm=old.wm

def social_data(image,f):
 ins={i['offset']:i for i in wm.m.instructions(image,f['address'],f['bytes'])};assert f['bytes']==3296
 return dict(strings=[wm.m.at_address(image,ins[k]['lddw_value'],n).decode()for k,n in [(56,29),(104,40),(1256,72)]],guard_line=ins[1296]['immediate'],path_bytes=ins[1304]['immediate'])
def analyze():
 e=json.loads((HERE/'experiment.json').read_text());o=(ROOT/'evidence/original/pump_fees/deployed.so').read_bytes();assert hashlib.sha256(o).hexdigest()=='4f2955d0f6b40cc9ff7daa18ccad7d19119ba1249759f4e7e3bb691beee6b35e';ow=wm.windows(o);oi={x['address']:x for x in ow};variants={};coverage={};raws={};details=[];data={};images={};indexes={};maps={}
 for label,v in e['variants'].items():
  b=gzip.decompress((HERE/v['files']['symbols']['path']).read_bytes());c=gzip.decompress((HERE/v['files']['candidate']['path']).read_bytes());cw=wm.windows(b);ci={x['address']:x for x in cw};symbols=wm.m.functions(b);assert set(ci)=={x['address']for x in symbols}and all(ci[x['address']]['bytes']==x['bytes']for x in symbols);assert wm.m.section_data(c,'.text')==wm.m.section_data(b,'.text');r=wm.compare(ow,cw);pairs={x['original']['address']:x['candidate']['address']for x in r['unique_pairs']};coverage[label]=set(pairs);raws[label]={x['address']for x in ow if x['raw_sha256']in{y['raw_sha256']for y in cw}};variants[label]=dict(r,candidate_windows=len(cw),unique_raw_pairs=sum(x['original']['raw_sha256']==x['candidate']['raw_sha256']for x in r['unique_pairs']),equals_original_capture=c==o,equals_original_elf_extent=c==o[:wm.m.elf_layout(o)['elf_extent']]);images[label]=b;indexes[label]=ci;maps[label]=pairs
  if label=='origins':
   for address in [190104,381352,642848]:
    l=oi[address];f=ci[pairs[address]];a,z=old.calls(o,l,oi),old.calls(b,f,ci);assert a.keys()==z.keys();details.append(dict(original=l,candidate=f,calls=[dict(offset=k,original=x,candidate=z[k],equal=x.get('signature',x.get('name'))==z[k].get('signature',z[k].get('name')))for k,x in a.items()]))
   data=dict(original=social_data(o,oi[190104]),candidate=social_data(b,ci[pairs[190104]]));program=dict(original=old.reader_contract(o,oi[381352],oi),candidate=old.reader_contract(b,ci[pairs[381352]],ci));admin_literals={str(k):dict(original=old.literals(o,oi[k],k),candidate=old.literals(b,ci[pairs[k]],k))for k in [381352,642848]}
 b=images['origins'];ci=indexes['origins'];pairs=maps['origins'];par=ROOT/'research/fees-admin-sharing-context';sc=module('social_slice',par/'slice_contract.py');cc=module('social_common',par/'common_contract.py');bc=module('social_buyback',par/'buyback_contract.py');slice_contract=sc.contract(b,list(ci.values()),pairs);common=cc.locations(b,ci[pairs[75880]]);assert common==cc.locations(o,oi[75880]);origin=bc.error_origin(b,ci[pairs[358312]]);bc.check_origin(origin);rc=module('social_relay',par/'relay_contract.py');relay=rc.relay_contract(b,ci[pairs[408640]]);expected=rc.relay_contract(o,oi[408640]);assert relay|dict(address_comparison_call=expected['address_comparison_call'])==expected;f=ci[pairs[18384]];hr={i['offset']:i for i in wm.m.instructions(b,f['address'],f['bytes'])};decoder=dict(owner_ids=[wm.m.at_address(b,hr[k]['lddw_value'],32).hex()for k in [32,96]],message_record=wm.m.message_record(b,wm.m.instructions(b,pairs[257264],2648)))
 return dict(variants=variants,details=details,social_data=data,preserved_program_reader=program,preserved_admin_literals=admin_literals,delta=dict(added=sorted(coverage['origins']-coverage['control']),lost=sorted(coverage['control']-coverage['origins'])),raw_delta=dict(added=sorted(raws['origins']-raws['control']),lost=sorted(raws['control']-raws['origins'])),preserved_slice_contract=slice_contract,preserved_common_locations=common,preserved_buyback_origin=origin,preserved_relay=relay,preserved_decoder=decoder)
if __name__=='__main__':
 r=analyze();(HERE/'analysis.json.gz').write_bytes(gzip.compress((json.dumps(r,indent=2)+'\n').encode(),mtime=0));print(r['delta']);print([(d['original']['address'],len(d['calls']),sum(c['original']['kind']=='import'for c in d['calls']),[c['offset']for c in d['calls']if not c['equal']])for d in r['details']])
