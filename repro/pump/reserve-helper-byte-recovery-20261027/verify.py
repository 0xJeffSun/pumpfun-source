"""Verify retained main-Pump source, compiled windows, and replay receipts."""
from pathlib import Path
import base64,gzip,hashlib,json,sys
from solders.transaction import Transaction
HERE=Path(__file__).resolve().parent;ROOT=HERE.parents[2]
sys.path.insert(0,str(HERE/'harness'))
from pump_compare_function_bytes import body,normalize
from pump_quote_control_function_match import sections
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
def read(p):
 data=p.read_bytes();return json.loads(gzip.decompress(data) if data.startswith(b'\x1f\x8b') else data)
def build(folder):
 r=read(folder/'build-comparison.json')
 assert r['source_unchanged'] and r['returncode']==0
 assert r['source_sha256']==r['source_after_sha256']
 for key,digest in r['source_sha256'].items():
  tail=key.split('programs/pump/',1)[1];assert sha(folder/'source'/tail)==digest,(folder,key)
 assert sha(folder/'candidate.so')==r['comparison']['candidate_sha256']
 assert sha(folder/'unstripped.so')==r['unstripped_sha256']
 assert not r['comparison']['full_byte_equality']
 a=(folder/'candidate.so').read_bytes();b=(folder/'unstripped.so').read_bytes();aa=sections(a)['.text'];bb=sections(b)['.text']
 assert a[aa['offset']:aa['offset']+aa['size']]==b[bb['offset']:bb['offset']+bb['size']]
 return r
for name,digest in read(HERE/'manifest.json').items():assert sha(HERE/name)==digest,name
original=ROOT/'evidence/original/pump/deployed.so';ob=original.read_bytes();os=sections(ob)
assert sha(original)=='7a19affaa2c6187e04a5fe0ea298cee81fa5eb8c24cfcc30d85f615e89f7b02d'
r=build(HERE/'recovered');candidate=HERE/'recovered/unstripped.so';cb=candidate.read_bytes();cs=sections(cb)
comparison=read(HERE/'recovered/function-comparison.json');c=comparison['candidates'][0]
assert comparison['original_sha256']==sha(original) and comparison['candidate_sha256']==sha(candidate)
on,oo=normalize(body(ob,os,0xa23f0,1168),0xa23f0,os);cn,co=normalize(body(cb,cs,c['start'],c['bytes']),c['start'],cs)
diffs=[{'offset':i,'original':on[i:i+8].hex(),'candidate':cn[i:i+8].hex()} for i in range(0,max(len(on),len(cn)),8) if on[i:i+8]!=cn[i:i+8]]
assert diffs==c['different_slots'] and len(diffs)==2
assert c['bytes']==1168 and not c['raw_equal'] and not c['normalized_equal']
assert {x['offset'] for x in diffs}=={736,744}
assert on[736:744]==cn[744:752] and on[744:752]==cn[736:744]
assert oo==comparison['original_operands'] and co==c['operands']
closure=read(HERE/'recovered/arithmetic-callee-closure.json')
assert not closure['unresolved'] and len(closure['pairs'])==6
pairs={(x['original_start'],x['candidate_start']) for x in closure['pairs']}
for row in closure['pairs']:
    a,b=row['original_start'],row['candidate_start']
    left,lo=normalize(body(ob,os,a,row['bytes']),a,os)
    right,ro=normalize(body(cb,cs,b,row['bytes']),b,cs)
    assert left==right and lo==row['original_operands'] and ro==row['candidate_operands']
    for x,y in zip(lo,ro,strict=True):
        assert x['kind']==y['kind']=='direct-call' and x['offset']==y['offset']
        assert (x['target'],y['target']) in pairs
for label,report in [('v1.43','cohort-v1.43-comparison.json'),('v1.45','cohort-v1.45-comparison.json'),('cgu16','cohort-cgu16-comparison.json'),('errors','error-cohort-comparison.json'),('loads','load-cohort-comparison.json'),('returns','return-cohort-comparison.json')]:
 folder=HERE/'research'/label;build(folder);report=read(HERE/'research'/report);bb=(folder/'unstripped.so').read_bytes();ss=sections(bb)
 assert report['candidate_sha256']==sha(folder/'unstripped.so')
 for row in report['rows']:
  raw=body(bb,ss,row['start'],row['bytes']);normal,_=normalize(raw,row['start'],ss)
  assert row['raw_equal']==(raw==body(ob,os,0xa23f0,1168))
  assert row['normalized_equal']==(normal==on)
build(HERE/'research/v1.46')
control=read(HERE/'research/v1.46/function-comparison.json')
assert control['candidates'][0]['different_slots']==c['different_slots']
build(HERE/'research/opt2')
opt2=read(HERE/'research/opt2/function-comparison.json')
assert len(opt2['candidates'][0]['different_slots'])==13
assert read(HERE/'research/opt2/normalized-inventory.json')['counts']['normalized']==459
receipts=read(HERE/'recovered-cases.json.gz');assert receipts['candidate_sha256']==sha(HERE/'recovered/candidate.so')
assert receipts['original_sha256']==sha(original) and receipts['case_count']==len(receipts['cases'])==192
assert receipts['compiled_source_sha256']==r['source_sha256'] and not receipts['mismatches']
fields=('error','before','after','events','inner','return_data')
for case in receipts['cases']:
 assert not case['differences'] and all(case['original'][f]==case['candidate'][f] for f in fields)
 assert case['original']['transaction_base64']==case['candidate']['transaction_base64']
 Transaction.from_bytes(base64.b64decode(case['original']['transaction_base64'],validate=True)).verify()
full=read(HERE/'full-regression.json.gz');assert full['case_count']==9785 and len(full['suites'])==40 and not full['mismatches']
assert full['candidate_sha256']==sha(HERE/'recovered/candidate.so') and full['original_sha256']==sha(original)
assert sum(s['case_count'] for s in full['suites'].values())==9785
repeat=read(HERE/'repeat/build-comparison.json');assert repeat['source_sha256']==r['source_sha256']
assert repeat['unstripped_sha256']==sha(HERE/'recovered/unstripped.so')==sha(HERE/'repeat/unstripped.so')
assert repeat['comparison']['candidate_sha256']==sha(HERE/'recovered/candidate.so')==sha(HERE/'repeat/candidate.so')
print('Verified: source bindings; 461 source trial/compiler comparisons; two unresolved load-order slots; 192 signed replays; 40 suites / 9785 cases; repeat build. No complete helper or whole-ELF equality.')
