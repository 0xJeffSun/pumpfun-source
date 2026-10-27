"""Verify eleven Pump declaration and source-coordinate recoveries."""
from pathlib import Path
from collections import Counter
from functools import lru_cache
import gzip,hashlib,importlib.util,json,tarfile
HERE=Path(__file__).resolve().parent;ROOT=HERE.parents[1]
def sha(b):return hashlib.sha256(b).hexdigest()
assert json.loads((HERE/'MANIFEST.json').read_text())=={p.relative_to(HERE).as_posix():sha(p.read_bytes())for p in sorted(HERE.rglob('*'))if p.is_file()and p.name!='MANIFEST.json'and '__pycache__'not in p.parts}
spec=importlib.util.spec_from_file_location('name_windows',HERE/'support/window_map.py');w=importlib.util.module_from_spec(spec);spec.loader.exec_module(w)
w.m.elf_layout=lru_cache(maxsize=8)(w.m.elf_layout);w.m.relocations=lru_cache(maxsize=8)(w.m.relocations)
original=(ROOT/'evidence/original/pump/deployed.so').read_bytes();assert sha(original)=='7a19affaa2c6187e04a5fe0ea298cee81fa5eb8c24cfcc30d85f615e89f7b02d';ow=w.windows(original);oc=Counter(x['signature']for x in ow);assert len(ow)==1035
images={};rows={};records={}
for label,count in [('parent',777),('candidate',778),('repeat',778),('decoder-guard',777),('decoder-inline',777),('decoder-tail',777),('decoder-inverted-tail',777)]:
    build=HERE/'builds'/label;record=json.loads((build/'build-comparison.json').read_text());records[label]=record
    assert record['returncode']==0 and record['source_unchanged']
    assert record['comparison']['original_sha256']==sha(original)and not record['comparison']['full_byte_equality']
    if label!='linux-baseline':assert record['dependency_cache']['main_freshly_compiled']
    with tarfile.open(build/'primary.tar.gz')as a:source={m.name:sha(a.extractfile(m).read())for m in a.getmembers()if m.isfile()}
    parts=Path(record['primary_source_directory']).parts;bound=record['primary_source_sha256'];prefix=None
    for n in range(1,len(parts)):
        trial='/'.join(parts[-n:])+'/'
        if all(k.startswith(trial)for k in bound):prefix=trial;break
    assert prefix
    assert all(source[k[len(prefix):]]==v for k,v in bound.items())
    blobs={name:gzip.decompress((build/(name+'.gz')).read_bytes())for name in['unstripped.so','candidate.so']};images[label]=blobs
    assert sha(blobs['unstripped.so'])==record['unstripped_sha256']and sha(blobs['candidate.so'])==record['comparison']['candidate_sha256']
    rows[label]=w.windows(blobs['unstripped.so']);cc=Counter(x['signature']for x in rows[label]);assert sum((oc&cc).values())==count
    assert blobs['candidate.so']!=original
assert images['candidate']==images['repeat']


parent=Counter(x['signature']for x in rows['parent'])
for label in ['candidate','decoder-guard','decoder-inline','decoder-tail','decoder-inverted-tail']:
    cc=Counter(x['signature']for x in rows[label]);assert sum(((oc&parent)&cc).values())==777
with tarfile.open(HERE/'builds/parent/primary.tar.gz')as a:before=a.extractfile('src/trade_v3.rs').read().decode().splitlines(True)
with tarfile.open(HERE/'builds/candidate/primary.tar.gz')as a:after=a.extractfile('src/trade_v3.rs').read().decode().splitlines(True)
assert before[75].startswith('fn add(')and after[75]=='\n'and after[389]==before[75]
assert after[:75]==before[:75]and after[76:387]==before[76:387]and after[415:]==before[415:]
assert after[387]==' '.join(x.strip()for x in before[387:414])+'\n'
assert after[388]==before[414]and all(not x.strip()for x in after[390:415])
om={x['address']:x for x in ow};cm={x['address']:x for x in rows['candidate']};queue=[]
for address in [0x81848]:
    hits=[x for x in cm.values()if x['signature']==om[address]['signature']];assert len(hits)==1;queue.append((address,hits[0]['address']))
seen=set();edges=[]
while queue:
    a,b=queue.pop()
    if(a,b)in seen:continue
    seen.add((a,b));left,right=om[a],cm[b];assert left['signature']==right['signature']
    ar,br=[w.m.instructions(z,f['address'],f['bytes'])for z,f in[(original,left),(images['candidate']['unstripped.so'],right)]]
    for x,y in zip(ar,br):
        if'call_target'not in x:continue
        oa,cb=x['call_target'],y['call_target']
        if oa not in om or cb not in cm:continue
        assert x['offset']==y['offset']and om[oa]['signature']==cm[cb]['signature'];edges.append((a,b,x['offset'],oa,cb));queue.append((oa,cb))
assert len(seen)==23 and len(edges)==81
print('Verified 778 / 1035; all 777 parent matches retained; identical native repeat artifacts.')
print('Verified unchanged checked-add expression, source reformatting, and 23 direct-call pairs / 81 edges.')
print('Four decoder controls retain 777 and add no normalized matches. Whole ELF remains unequal.')

runtime=json.loads(gzip.decompress((HERE/'runtime/exact-quote.json.gz').read_bytes()));candidate_sha=sha(images['candidate']['candidate.so'])
assert runtime['candidate_sha256']==candidate_sha and runtime['original_sha256']==sha(original)
assert runtime['case_count']==len(runtime['cases'])==352 and not runtime['mismatches']
loader=json.loads((HERE/'runtime/exact-quote.loader.json').read_text())
assert {x['elf_sha256']for x in loader['loads']}=={candidate_sha,sha(original)}
assert all(x['program_bytes']==36 and x['programdata_bytes']==10485760 and x['elf_prefix_unchanged']and x['zero_allocation_tail']for x in loader['loads'])
spec=importlib.util.spec_from_file_location('trade_add_diagnostics',HERE/'support/diagnostic_audit.py');auditor=importlib.util.module_from_spec(spec);spec.loader.exec_module(auditor)
diagnostics=auditor.audit({'exact_quote_v3':runtime});assert not diagnostics['mismatches']
print('Verified exact 778 candidate: 352 focused exact-quote cases passed; diagnostic audit found zero mismatches.')
