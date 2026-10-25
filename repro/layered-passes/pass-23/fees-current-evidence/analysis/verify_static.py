from pathlib import Path
import json,sys,struct,hashlib
P=Path(__file__).resolve().parent;W=P.parent;sys.path.insert(0,str(P/'method'));from elf_reader import Elf
C=Elf(W/'build-01/artifacts/pump_fees_candidate.so');O=Elf(P/'method/inputs/original.so');I=json.loads((P/'full-function-inventory.json').read_text())
for a,b,n in [(552776,376272,3712),(556488,379984,3712),(571320,392416,1072),(572392,393488,1072),(560200,277664,1400),(579040,402608,3584),(592712,413384,872),(591584,412256,1128)]:
 assert O.normalized[a:a+n]==C.normalized[b:b+n]and O.pattern(a,n)==C.pattern(b,n)
 assert next(m for r in I['candidate_rows']if r['start']==b for m in r['matches']if m['start']==a)['all_direct_bodies_supported']
def ins(p):return struct.unpack('<BBhi',C.b[p:p+8])
for pc,raw in [(524392,'5504c90000000000'),(524712,'1500330000000000'),(524848,'1500220000000000'),(532296,'050038fc00000000')]:assert C.b[pc:pc+8].hex()==raw
assert ins(524648)==(121,0x82,608,0)and ins(524656)==(7,2,0,360)
assert C.calls[524688]==C.calls[524824]==786232
assert ins(525904)[3]==6016 and ins(525912)==(114,0x0a,-760,2)and ins(525936)==(122,0x0a,-840,0)
assert C.calls[525976]==694256
for pc,t in [(528296,376272),(533112,379984),(536032,376272),(536344,402608)]:assert C.calls[pc]==t
assert json.loads((W/'controller-exit.json').read_text())['returncode']==0
print(json.dumps({'passed':True,'candidate_sha256':hashlib.sha256(C.b).hexdigest(),'caller':[524360,536384],'constructor':'plain source-bearing6016 no compared-key attachment','typed_helper_matches':8,'runtime_executions':0,'remaining_limits':'no whole original caller or recursive downstream identity; natural source-origin differences'}))
