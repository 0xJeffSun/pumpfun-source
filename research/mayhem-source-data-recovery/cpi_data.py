from pathlib import Path
import hashlib,importlib.util,json,struct,sys

P=Path(__file__).resolve().parent
R=P.parents[1]
symbols=Path(sys.argv[1]).resolve();candidate=Path(sys.argv[2]).resolve();output=Path(sys.argv[3]).resolve()
spec=importlib.util.spec_from_file_location('elf',R/'repro/mayhem/global-params-layout-recovery/tools/layer01.py')
elf=importlib.util.module_from_spec(spec);spec.loader.exec_module(elf)
o=elf.Elf(R/'evidence/original/mayhem/deployed.so')
c=elf.Elf(symbols)
key=lambda w:(w['end']-w['start'],w['normalized_sha256'],json.dumps(w['normalization_pattern'],sort_keys=True))
cw={a:c.window(a,b)for a,b in {(s['value'],s['value']+s['size'])for s in c.symbols if s['info']&15==2 and s['size']>=8 and c.lo<=s['value']<c.hi}}
original_rows=json.loads((R/'research/mayhem-full-curve-recovery/audit.json').read_bytes())['rows']
ow={r['start']:o.window(r['start'],r['end'])for r in original_rows}
def names(address):return [s['name']for s in c.symbols if s['info']&15==2 and s['value']==address]
def source(e,address):
 assert e.rel[address]['type']==8
 zero,p=struct.unpack_from('<II',e.b,address)
 size,line,column=struct.unpack_from('<QII',e.b,address+8)
 assert zero==0 and 1<=size<300
 return {'path':e.b[p:p+size].decode(),'line':line,'column':column}
rows=[]
for a in [481752,487224,492400,497440,503736,508344,543848,588544]:
 original=ow[a];found=[w for w in cw.values()if key(w)==key(original)];assert len(found)==1
 candidate=found[0];assert len(original['direct'])==len(candidate['direct'])
 calls=[{'offset':x['offset'],'original':x['target'],'candidate':y['target'],'same':key(ow[x['target']])==key(cw[y['target']])}for x,y in zip(original['direct'],candidate['direct'])]
 assert all(x['same']for x in calls)
 data=[]
 for x,y in zip(original['data_references'],candidate['data_references']):
  first,second=source(o,x['target']),source(c,y['target'])
  data.append({'offset':x['offset'],'original':first,'candidate':second,'same':first==second})
 callers=[{'address':p,'names':names(p)}for p,w in cw.items()if any(d['target']==candidate['start']for d in w['direct'])]
 assert callers
 if a==481752:assert any('instructions13buy_pump_swap7handler' in n for x in callers for n in x['names'])
 if a==487224:assert any('instructions14sell_pump_swap7handler' in n for x in callers for n in x['names'])
 if a==543848:assert any('instructions6buy_v27handler' in n for x in callers for n in x['names'])
 if a==588544:assert any('buy_v2_recovered' in n for x in callers for n in x['names'])
 rows.append({'original':a,'candidate':candidate['start'],'bytes':candidate['end']-candidate['start'],'names':names(candidate['start']),'raw_equal':original['raw_sha256']==candidate['raw_sha256'],'normalized_equal':True,'direct_calls':calls,'source_records':data,'callers':callers})
bad=[{'original_start':r['original'],**x}for r in rows for x in r['source_records']if not x['same']]
assert not bad
summary={'symbols_sha256':hashlib.sha256(c.b).hexdigest(),'normalized_bodies':len(rows),'body_bytes':sum(r['bytes']for r in rows),'direct_calls_checked':sum(len(r['direct_calls'])for r in rows),'source_records_checked':sum(len(r['source_records'])for r in rows),'source_records_equal':sum(x['same']for r in rows for x in r['source_records']),'unclosed_source_records':bad,'scope':'Eight complete normalized bodies and their immediate direct callees; does not claim raw-byte, arbitrary data, transitive runtime, or whole-ELF identity.'}
output.write_text(json.dumps({'summary':summary,'rows':rows},indent=2)+'\n')
print(json.dumps(summary,indent=2))
