"""Verify four recovered Pump bodies and exact-candidate focused receipts."""
from pathlib import Path
from collections import Counter
from functools import lru_cache
import gzip,hashlib,importlib.util,json,tarfile
HERE=Path(__file__).resolve().parent;ROOT=HERE.parents[1]
def sha(b):return hashlib.sha256(b).hexdigest()
assert json.loads((HERE/'MANIFEST.json').read_text())=={p.relative_to(HERE).as_posix():sha(p.read_bytes())for p in sorted(HERE.rglob('*'))if p.is_file()and p.name!='MANIFEST.json'and '__pycache__'not in p.parts}
spec=importlib.util.spec_from_file_location('name_windows',HERE/'support/window_map.py');w=importlib.util.module_from_spec(spec);spec.loader.exec_module(w)
w.m.elf_layout=lru_cache(maxsize=8)(w.m.elf_layout);w.m.relocations=lru_cache(maxsize=8)(w.m.relocations)
original=(ROOT/'evidence/original/pump/deployed.so').read_bytes();ow=w.windows(original);oc=Counter(x['signature']for x in ow);assert len(ow)==1035
images={};rows={};records={}
for label,count in [('linux-baseline',744),('arithmetic-parent',747),('candidate',748),('repeat',748)]:
    build=HERE/'builds'/label;record=json.loads((build/'build-comparison.json').read_text());records[label]=record
    assert record['returncode']==0 and record['source_unchanged']
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
parent=Counter(x['signature']for x in rows['arithmetic-parent']);cc=Counter(x['signature']for x in rows['candidate']);assert sum(((oc&parent)&cc).values())==747
om={x['address']:x for x in ow};cm={x['address']:x for x in rows['candidate']};queue=[]
for address in [0x880b0,0xa0838,0x834c8,0x2bc0]:
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
assert len(seen)==33 and len(edges)==120
runtime={};candidate_sha=sha(images['candidate']['candidate.so'])
for name,count in [('authority',59),('configuration',351)]:
    d=json.loads(gzip.decompress((HERE/'runtime'/(name+'.json.gz')).read_bytes()));runtime[name]=d
    assert d['candidate_sha256']==candidate_sha and d['original_sha256']==sha(original)and d['case_count']==count and not d['mismatches']
    receipt=json.loads((HERE/'runtime'/(name+'-loader.json')).read_text());assert {x['elf_sha256']for x in receipt['loads']}=={candidate_sha,sha(original)}
    assert all(x['program_bytes']==36 and x['programdata_bytes']==10485760 and x['elf_prefix_unchanged']and x['zero_allocation_tail']for x in receipt['loads'])
spec=importlib.util.spec_from_file_location('name_diagnostics',HERE/'support/diagnostic_audit.py');auditor=importlib.util.module_from_spec(spec);spec.loader.exec_module(auditor);diag=auditor.audit(runtime);assert not diag['mismatches']
print('Verified 748 / 1035; retained all 747 arithmetic matches and all 744 Round37 matches.')
print('Four recovered roots; 33 direct-call pairs / 120 edges; identical repeat artifacts; 410 focused cases passed.')
