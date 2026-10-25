"""Full opaque call/data inventories plus selected fee-basis bodies; no target execution."""
from pathlib import Path
import importlib.util,hashlib,json,gzip,struct,sys
P=Path(__file__).resolve().parent
spec=importlib.util.spec_from_file_location('rich',P/'fee-basis-static/analyze_elf.py');a=importlib.util.module_from_spec(spec);spec.loader.exec_module(a)
spec=importlib.util.spec_from_file_location('entries',P/'elf_reader.py');b=importlib.util.module_from_spec(spec);spec.loader.exec_module(b)
def generate():
 ob=(P/'static-inputs/original.so').read_bytes();cb=(P/'candidate.so').read_bytes();ub=(P/'unstripped.so').read_bytes();o=a.Elf(ob);c=a.Elf(ub);entry=b.Elf(P/'static-inputs/original.so')
 of=[o.function(x,y-x,[])for x,y in zip(entry.entries,entry.entries[1:]+[entry.hi])]
 fs={}
 for r in c.symbols:
  if r['type']==2 and r['size']:fs.setdefault((r['start'],r['size']),[]).append(r['name'])
 cf=[c.function(x,n,sorted(names))for(x,n),names in sorted(fs.items())]
 selected=[r for r in cf if any(k in ' '.join(r['names'])for k in ['trade18buy_fee_market_cap','trade3buy17','trade15buy_exact_quote17'])];assert len(selected)==3
 cap=next(r for r in selected if 'buy_fee_market_cap' in ' '.join(r['names']));ocap=next(r for r in of if r['start']==657656);assert cap['bytes']==ocap['bytes']==760
 incoming=[{'caller_start':r['start'],'caller_names':r['names'],**call}for r in cf for call in r['direct_calls']if call['target']==cap['start']];assert len(incoming)==2 and {r['caller_start']for r in incoming}=={r['start']for r in selected if r!=cap}
 pc=cap['start'];expect={8:(0x79,0x27,64,0),16:(0x55,7,34,0),304:(0x71,0x21,154,0),328:(7,3,0,96),336:(0x79,0x33,0,0),344:(0x79,0x24,72,0),624:(0x62,10,-120,6026),752:(0x95,0,0,0)}
 for off,v in expect.items():assert struct.unpack('<BBhi',c.at(pc+off,8))==v,(off,v)
 diffs=[{'offset':i,'original':x,'candidate':y}for i,(x,y)in enumerate(zip(o.at(ocap['start'],760),c.at(pc,760)))if x!=y]
 result={'candidate_sha256':a.H(cb),'original_sha256':a.H(ob),'original_windows':len(of),'candidate_windows':len(cf),'original_cap':ocap,'candidate_cap':cap,'selected_buy_functions':selected,'incoming_cap_calls':incoming,'raw_cap_equal':not diffs,'raw_cap_differences':diffs,'notes':['All full call/data ledgers are opaque inventories; no semantic analysis of excluded bodies.','Original zero error block follows arithmetic; candidate zero block precedes arithmetic. Complete cap bodies are unequal.','Data previews are section-bounded at64bytes, not proof of object extents.']}
 runs=[];i=0;common=min(len(ob),len(cb))
 while i<common:
  if ob[i]==cb[i]:i+=1;continue
  start=i
  while i<common and ob[i]!=cb[i]:i+=1
  runs.append({'start':start,'end':i,'original_hex':ob[start:i].hex(),'candidate_hex':cb[start:i].hex()})
 if len(ob)!=len(cb):runs.append({'start':common,'end':max(len(ob),len(cb)),'original_hex':ob[common:].hex(),'candidate_hex':cb[common:].hex(),'excess':True})
 byte_comparison={'original_sha256':a.H(ob),'candidate_sha256':a.H(cb),'original_bytes':len(ob),'candidate_bytes':len(cb),'whole_file_equal':ob==cb,'common_position_different_bytes':sum(x!=y for x,y in zip(ob,cb)),'excess_bytes':abs(len(ob)-len(cb)),'all_differing_ranges':runs}
 return {'full-original-call-data-ledger.json.gz':of,'full-candidate-call-data-ledger.json.gz':cf,'fee-basis-static-review.json':result,'complete-byte-comparison.json.gz':byte_comparison}
if __name__=='__main__':
 check='--check'in sys.argv
 for name,v in generate().items():
  f=P/name
  if check:assert json.loads(gzip.decompress(f.read_bytes())if name.endswith('.gz')else f.read_bytes())==v,name
  else:
   data=(json.dumps(v,sort_keys=True,separators=(',',':'))+'\n').encode();f.write_bytes(gzip.compress(data,mtime=0)if name.endswith('.gz')else data)
 print('PASS full opaque call/data ledgers and complete fee-basis bodies')
