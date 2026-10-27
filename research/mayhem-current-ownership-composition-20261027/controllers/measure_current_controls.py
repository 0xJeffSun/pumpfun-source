from pathlib import Path
from collections import Counter
import difflib,hashlib,importlib.util,json,sys
W=Path(__file__).resolve().parent;R=W.parents[1]
def mod(n,p):
 s=importlib.util.spec_from_file_location(n,p);m=importlib.util.module_from_spec(s);s.loader.exec_module(m);return m
v=mod('ownership_measure',R/'research/mayhem-legacy-buy-cpi-ownership/verify.py');reader=mod('controls_reader',R/'research/mayhem-trade-origins-validator/reader.py');progress=mod('controls_progress',R/'research/mayhem-initializer-current-recovery-20261027/progress.py')
o=reader.Elf(R/'evidence/original/mayhem/deployed.so');base=(W/'fast-root-current-legacy-owned-error-build/symbols.so').read_bytes();rows=json.loads((R/'research/mayhem-trade-origins-validator/audit.json').read_text())['rows'];ow={r['start']:o.window(r['start'],r['end'])for r in rows};original=ow[113672]
for label in sys.argv[1:]:
 d=W/(label+'-build');e=reader.Elf(d/'symbols.so');ws=v.windows(e);s=[x for x in e.symbols if 'legacy_buy_handler' in x['name']];assert len(s)==1;w=ws[s[0]['value']];a=o.norm(original['start'],original['end'])[0];b=e.norm(w['start'],w['end'])[0];aa=[a[i:i+8]for i in range(0,len(a),8)];bb=[b[i:i+8]for i in range(0,len(b),8)]
 try:p=progress.compare(o.b,base,e.b);preserved=True
 except AssertionError as ex:
  tb=ex.__traceback__
  while tb and tb.tb_frame.f_code.co_name!='compare':tb=tb.tb_next
  assert tb;p=tb.tb_frame.f_locals['result'];preserved=False
 shapes=Counter(v.key(ow[x['target']])for x in original['direct']);actual=Counter(v.key(ws[x['target']])for x in w['direct']);cpishape=v.key(ow[452576]);fromshape=v.key(ow[620712]);cp=next(x['pc']for x in w['direct']if v.key(ws[x['target']])==cpishape);conversion=next(x['pc']for x in w['direct']if x['pc']>cp and v.key(ws[x['target']])==fromshape)
 result={'label':label,'candidate_sha256':hashlib.sha256((d/'candidate.so').read_bytes()).hexdigest(),'symbols_sha256':hashlib.sha256(e.b).hexdigest(),'bytes':w['end']-w['start'],'normalized_equal':v.key(w)==v.key(original),'same_position_slots':sum(x==y for x,y in zip(aa,bb)),'aligned_slots':sum(x.size for x in difflib.SequenceMatcher(a=aa,b=bb,autojunk=False).get_matching_blocks()),'calls':len(w['direct']),'callee_shapes_equal':shapes==actual,'Source_profile_equal':v.source_profile(o,original)==v.source_profile(e,w),'CPI_origin':v.cpi_origin(e,w),'after_cpi_bytes':e.b[cp+8:cp+40].hex(),'after_conversion_bytes':e.b[conversion+8:conversion+48].hex(),'prior_preserved':preserved,'preservation':p};(W/(label+'-review.json')).write_text(json.dumps(result,indent=2)+'\n');print({k:x for k,x in result.items()if k!='preservation'});print({k:p[k]for k in ['matches','raw_matches','positive_direct_edges_after','positive_Source_records_after','observed_Source_profile_losses']})
