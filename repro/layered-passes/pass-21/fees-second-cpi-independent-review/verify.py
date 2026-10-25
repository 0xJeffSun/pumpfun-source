from pathlib import Path
import sys,json,hashlib,struct
P=Path(__file__).resolve().parent;sys.path.insert(0,str(P));from elf_reader import Elf
H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
for n,h in json.loads((P/'manifest.json').read_text()).items():assert H(P/n)==h,n
O=Elf(P/'original.so');C=Elf(P/'candidate.so');I=json.loads((P/'inventory.json').read_text())
assert H(P/'candidate.so')=='466725afe7406860177df56696a60897874ffa6dab7429e5cc62da087dbf48b5'
for a,b,n in [(552776,377624,3712),(571320,393768,1072),(560200,279016,1400),(556488,381336,3712),(572392,394840,1072)]:
 assert O.normalized[a:a+n]==C.normalized[b:b+n]and O.pattern(a,n)==C.pattern(b,n)
 m=next(m for r in I['candidate_rows']if r['start']==b for m in r['matches']if m['start']==a);assert m['all_direct_bodies_supported']and m['unique_calls_consistent']
assert C.calls[524120]==377624 and C.calls[529000]==381336
for p,raw in [(524144,'5504f50102000000'),(529032,'550492ff02000000'),(529040,'5501130000000000')]:assert C.b[p:p+8].hex()==raw
assert 524120<524144<529000<529032<529040
print(json.dumps({'passed':True,'complete_matches':5,'immediate_target_calls_supported':45,'success_barriers':[524144,529032],'builds':0,'target_executions':0,'recursive_semantics_proven':False}))
