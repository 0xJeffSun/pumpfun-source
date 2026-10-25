from pathlib import Path
import json,gzip,struct,importlib.util,sys,hashlib
P=Path(__file__).resolve().parent;W=P.parent
sys.path.insert(0,str(W));from elf_reader import Elf
spec=importlib.util.spec_from_file_location('cfg',W/'approved-proposal/cfg.py');cfg=importlib.util.module_from_spec(spec);spec.loader.exec_module(cfg)
def run():
 c=cfg.d.a.Elf((W/'candidate.so').read_bytes());r=json.loads(gzip.decompress((W/'full-candidate-call-data-ledger.json.gz').read_bytes()));by={x['start']:x for x in r}
 def ins(pc):return struct.unpack('<BBhi',c.at(pc,8))
 def call(pc,to):
  op,reg,off,imm=ins(pc);assert op==0x85 and pc+8+imm*8==to
 for pc,to in [(1119184,933976),(1119512,441928),(1119592,27824),(935304,9784),(9808,79832),(80000,35728),(36672,542312)]:call(pc,to)
 o=Elf(W/'static-inputs/original.so');e=Elf(W/'candidate.so');assert o.normalized[23080:24920]==e.normalized[27824:29664]and o.pattern(23080,1840)==e.pattern(27824,1840)
 assert ins(443960)==(0x62,10,-1608,6080)
 assert ins(456768)==(0x73,0x32,165,0)and ins(456800)==(0x73,0x42,163,0)and ins(456832)==(0x7b,0x21,112,0)and ins(456848)==(0x72,1,164,0)
 writes=[456680,456696,456712,456728,456768,456800,456848]
 g=cfg.graph(c,441928,467248);seen={441928};todo=[441928]
 while todo:
  for x in g[todo.pop()]:
   if x not in seen:seen.add(x);todo.append(x)
 pred={x:set()for x in seen}
 for a,ss in g.items():
  if a in seen:
   for b in ss:pred[b].add(a)
 dom={x:({x}if x==441928 else set(seen))for x in seen};changed=True
 while changed:
  changed=False
  for x in sorted(seen):
   if x==441928:continue
   d={x}|set.intersection(*(dom[p]for p in pred[x]))
   if d!=dom[x]:dom[x]=d;changed=True
 for target in [461336,456976]:assert all(x in dom[target]for x in writes)
 assert any(x['pc']==461336 and x['target']==1370528 for x in by[441928]['direct_calls']);assert any(x['pc']==456976 and x['target']==1371440 for x in by[441928]['direct_calls'])
 frames=[{'start':x['start'],'names':x['names'],'out_of_range':[a for a in x['direct_r10_accesses']if a['offset'] < -4096 or a['offset']>=0]}for x in r];assert not any(x['out_of_range']for x in frames)
 out={'status':'PASS','parser':[933976,955064],'app':[441928,467248],'wrapper':[1118072,1120200],'typed_decoder_chain':[935304,9808,80000,36672],'full_original_serializer_pattern_equal':True,'mutation_writes':writes,'mutations_dominate_pool_cpi_and_admin_clock':[461336,456976],'error6080_store':443960,'frames':frames,'scope':'All full bodies/call/data preserved; normalized serializer match is not raw/full program identity.'}
 return out
if __name__=='__main__':
 out=run();(W/'stack-observations.json').write_text(json.dumps({'backend_errors':[],'frames':out.pop('frames')},indent=2)+'\n');(P/'acceptance.json').write_text(json.dumps(out,indent=2)+'\n');print(json.dumps(out,indent=2))
