"""Keep exact raw-log failures separate from bounded branch/message progress."""
from pathlib import Path
import gzip,hashlib,importlib.util,json,re
HERE=Path(__file__).resolve().parent;ROOT=HERE.parents[1]
def module(n,p):
 s=importlib.util.spec_from_file_location(n,p);m=importlib.util.module_from_spec(s);s.loader.exec_module(m);return m
old=module('native_parent',ROOT/'research/fees-frontier-prefix-integration/analyze.py');wm=old.wm
def load(p):return json.loads(gzip.decompress(p.read_bytes())if p.suffix=='.gz'else p.read_bytes())
def cases():
 rows=[dict(name='flags-'+str(n),flags=n,amount=0,token_amount=0)for n in range(256)]
 for quote in ['So11111111111111111111111111111111111111112','5842jNQd5C7pWXFxcDu3kQ5XtgqH5st25tf2ZBjYaKg8']:
  for amount in [0,1]:
   for token in [None,0,1]:
    for flags in [0,8]:
     for listed in [False,True]:
      c=dict(name=f'flow-{quote}-{amount}-{token}-{flags}-{listed}',quote=quote,amount=amount,flags=flags,listed=listed)
      if token is not None:c['token_amount']=token
      rows.append(c)
 return rows
def strict_summary(r):
 assert r['case_count']==len(r['cases'])==304 and [x['case']for x in r['cases']]==cases()
 bad=[i for i,x in enumerate(r['cases'])if x['original']!=x['candidate']];assert r['mismatches']==bad and all(x['match']==(x['original']==x['candidate'])for x in r['cases'])
 app_bad=[];nonlog_bad=[];compute_only=[];delta=[];traces=[]
 regex=re.compile(r'^Program (\S+) consumed (\d+) of (\d+) compute units$')
 for i,row in enumerate(r['cases']):
  x,y=row['original'],row['candidate'];assert x.keys()==y.keys()
  if any(x[k]!=y[k]for k in x if k!='logs'):nonlog_bad.append(i)
  if [s for s in x['logs']if s.startswith(('Program log:','Program data:'))]!=[s for s in y['logs']if s.startswith(('Program log:','Program data:'))]:app_bad.append(i)
  if any(x['inner'])or any(y['inner']):traces.append(i)
  if i in bad and i not in nonlog_bad and len(x['logs'])==len(y['logs']):
   differing=[(a,b)for a,b in zip(x['logs'],y['logs'])if a!=b];parsed=[(regex.fullmatch(a),regex.fullmatch(b))for a,b in differing]
   if all(a and b and a[1]==b[1]for a,b in parsed):
    compute_only.append(i);delta.append(dict(case_index=i,case=row['case']['name'],lines=[dict(original=a,candidate=b)for a,b in differing],consumed_deltas=[int(b[2])-int(a[2])for a,b in parsed]))
 return dict(cases=304,raw_equal=304-len(bad),raw_mismatch_indices=bad,nonlog_mismatch_indices=nonlog_bad,application_log_mismatch_indices=app_bad,compute_only_mismatch_indices=compute_only,compute_differences=delta,nonempty_inner_trace_indices=traces)
def messages(image,f):
 ins={r['offset']:r for r in wm.m.instructions(image,f['address'],f['bytes'])};rel=dict(wm.m.relocations(image));dyn=wm.dynamic_symbols(image);out={s:[]for s in ['CrankDonationFeePda is currently disabled','Nothing to donate']}
 for offset,row in ins.items():
  if row['opcode']!=0x18 or rel.get(f['address']+offset,0)&0xffffffff!=8:continue
  for text,refs in out.items():
   try:raw=wm.m.at_address(image,row['lddw_value'],len(text))
   except StopIteration:continue
   if raw!=text.encode():continue
   assert ins[offset+16]['opcode']==0xb7 and ins[offset+16]['destination']==2 and ins[offset+16]['immediate']==len(text)
   call=ins[offset+24];info=rel.get(f['address']+offset+24,0);assert call['opcode']==0x85 and info&0xffffffff==10 and dyn[info>>32]['name']=='sol_log_'
   refs.append(dict(load_offset=offset,bytes=len(raw),import_name='sol_log_',value=raw.decode()))
 return out
def analyze():
 e=load(HERE/'experiment.json');o=(ROOT/'evidence/original/pump_fees/deployed.so').read_bytes();ow=wm.windows(o);oi={x['address']:x for x in ow};variants={};details={};coverage={};raws={};strict={};edges={};original=oi[147944]
 for label,v in e['variants'].items():
  images={k:gzip.decompress((HERE/d['path']).read_bytes())for k,d in v['files'].items()};b,c=images['symbols'],images['candidate'];cw=wm.windows(b);ci={x['address']:x for x in cw};symbols=wm.m.functions(b);assert set(ci)=={x['address']for x in symbols}and all(ci[x['address']]['bytes']==x['bytes']for x in symbols)
  for sec in wm.m.elf_layout(c)['sections']:
   if sec['flags']&2 and sec['type']!=8:
    other=next(s for s in wm.m.elf_layout(b)['sections']if s['name']==sec['name']);assert sec['address']==other['address']and wm.m.section_data(c,sec['name'])==wm.m.section_data(b,sec['name'])
  r=wm.compare(ow,cw);p={x['original']['address']:x['candidate']['address']for x in r['unique_pairs']};coverage[label]=set(p);raws[label]={x['address']for x in ow if x['raw_sha256']in{y['raw_sha256']for y in cw}};locations=old.front.cohort(wm,o,c,r['unique_pairs']);assert len(locations)==163 and all(x==y for x,y in locations.values());edges[label]=old.front.direct_edges(wm,o,c,ow,cw,r['unique_pairs'])
  variants[label]=dict(r,candidate_windows=len(cw),unique_raw_pairs=sum(x['original']['raw_sha256']==x['candidate']['raw_sha256']for x in r['unique_pairs']),normalized=sum(x['signature']in{y['signature']for y in cw}for x in ow),raw_originals=sorted(raws[label]),equals_original_capture=c==o,equals_original_elf_extent=c==o[:wm.m.elf_layout(o)['elf_extent']])
  f=next(x for x in cw if'pump_fees_candidate22crank_donation_fee_pda'in(x['name']or''));assert f['signature']!=original['signature'];details[label]=dict(crank=f,messages=messages(b,f),local_calls=old.admin.calls(b,f,ci),location_uses=163,pack=old.front.pack_proof(wm,o,c,ow,cw,r['unique_pairs']))
  strict[label]=strict_summary(load(HERE/f'receipts/{label}-crank.json.gz'))
  if label=='origins':
   sc=module('native_slice',ROOT/e['parent_packet']/'slice_contract.py');cc=module('native_common',ROOT/e['parent_packet']/'common_contract.py');bc=module('native_buyback',ROOT/e['parent_packet']/'buyback_contract.py');rc=module('native_relay',ROOT/e['parent_packet']/'relay_contract.py')
   slice_contract=sc.contract(b,cw,p);common=cc.locations(b,ci[p[75880]]);assert common==cc.locations(o,oi[75880]);origin=bc.error_origin(b,ci[p[358312]]);bc.check_origin(origin);relay=rc.relay_contract(b,ci[p[408640]]);expected=rc.relay_contract(o,oi[408640]);assert relay|dict(address_comparison_call=expected['address_comparison_call'])==expected
   decoder=old.decoder_data(b,ci,p);assert decoder==old.decoder_data(o,oi,{x:x for x in oi})
 edge_changes={}
 before={(a,k):(x,y)for a,k,x,y in edges['control']}
 for label in e['variants']:
  assert coverage[label]==coverage['control']and raws[label]==raws['control']
  after={(a,k):(x,y)for a,k,x,y in edges[label]};assert before.keys()==after.keys()
  changed=[k for k in before if before[k]!=after[k]];assert changed==([]if label=='control'else[(656832,464)])
  for k,(x,y)in before.items():assert after[k][0]==x and(x!=y or after[k][0]==after[k][1])
  wrapper=next(x['candidate']for x in variants[label]['unique_pairs']if x['original']['address']==656832)
  image=gzip.decompress((HERE/e['variants'][label]['files']['symbols']['path']).read_bytes());index={x['address']:x for x in wm.windows(image)};call=old.admin.calls(image,wrapper,index)[464]
  assert call['target']==details[label]['crank']['address']and old.admin.calls(o,oi[656832],oi)[464]['target']==147944
  edge_changes[label]=dict(changed=[list(k)for k in changed],business_target=call['target'],still_unequal=call['signature']!=original['signature'])
 return json.loads(json.dumps(dict(variants=variants,details=details,strict=strict,original_messages=messages(o,original),body_coverage_delta=dict(added=[],lost=[]),raw_coverage_delta=dict(added=[],lost=[]),direct_edges=len(edges['control']),open_business_edge=edge_changes,slice_contract=slice_contract,common_locations=common,buyback_origin=origin,relay=relay,decoder=decoder)))
if __name__=='__main__':
 r=analyze();(HERE/'analysis.json.gz').write_bytes(gzip.compress((json.dumps(r,indent=2)+'\n').encode(),mtime=0));print([(k,len(v['unique_pairs']),len(v['unmatched_original']))for k,v in r['variants'].items()]);print([(k,v['raw_equal'],len(v['application_log_mismatch_indices']),len(v['compute_only_mismatch_indices']))for k,v in r['strict'].items()])
