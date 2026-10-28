"""Recompute injective Pump recovery and pointwise direct-call closure."""
from pathlib import Path
from collections import Counter
from functools import lru_cache
import gzip,hashlib,importlib.util,json,tarfile
HERE=Path(__file__).resolve().parent;ROOT=HERE.parents[1]
def sha(b):return hashlib.sha256(b).hexdigest()
files={p.relative_to(HERE).as_posix():sha(p.read_bytes()) for p in sorted(HERE.rglob('*')) if p.is_file() and p.name!='MANIFEST.json' and '__pycache__' not in p.parts}
assert files==json.loads((HERE/'MANIFEST.json').read_text())
spec=importlib.util.spec_from_file_location('arithmetic_windows',HERE/'support/window_map.py')
w=importlib.util.module_from_spec(spec);spec.loader.exec_module(w)
w.m.elf_layout=lru_cache(maxsize=8)(w.m.elf_layout);w.m.relocations=lru_cache(maxsize=8)(w.m.relocations)
original=(ROOT/'evidence/original/pump/deployed.so').read_bytes()
parent=(ROOT/'repro/pump/main-contract-round37-20261027/unstripped.so').read_bytes()
assert sha(parent)=='1a4b06640581f2223205571725c7e8b62ac38114098e5268483413c7c39ac0ec'
ow,pw=[w.windows(x)for x in [original,parent]];oc,pc=[Counter(x['signature']for x in rows)for rows in[ow,pw]]
wanted=oc&pc;assert len(ow)==1035 and sum(wanted.values())==744
expected={'linux-baseline':744,'first-two':746,'private-narrow-control':746,'public-three':747,'repeat':747}
images={};all_rows={}
for label,count in expected.items():
    build=HERE/'builds'/label;record=json.loads((build/'build-comparison.json').read_text())
    assert record['returncode']==0 and record['source_unchanged']
    if label!='linux-baseline':assert record['dependency_cache']['main_freshly_compiled']
    with tarfile.open(build/'primary.tar.gz')as archive:
        archived={m.name:sha(archive.extractfile(m).read())for m in archive.getmembers()if m.isfile()}
    parts=Path(record['primary_source_directory']).parts;bound=record['primary_source_sha256'];prefix=None
    for n in range(1,len(parts)):
        trial='/'.join(parts[-n:])+'/'
        if all(k.startswith(trial)for k in bound):prefix=trial;break
    assert prefix
    for name,digest in bound.items():assert archived[name[len(prefix):]]==digest
    blobs={name:gzip.decompress((build/(name+'.gz')).read_bytes())for name in['unstripped.so','candidate.so']}
    assert sha(blobs['unstripped.so'])==record['unstripped_sha256']
    assert sha(blobs['candidate.so'])==record['comparison']['candidate_sha256']
    rows=w.windows(blobs['unstripped.so']);cc=Counter(x['signature']for x in rows)
    assert sum((wanted&cc).values())==744 and sum((oc&cc).values())==count
    raw_original=Counter(x['raw_sha256']for x in ow)
    assert sum((raw_original&Counter(x['raw_sha256']for x in rows)).values())==121
    assert blobs['candidate.so']!=original
    all_rows[label]=rows;images[label]=blobs
    print(label,count,'/ 1035; retained 744; whole ELF false')
assert images['public-three']==images['repeat'],'repeat artifacts differ'
om={x['address']:x for x in ow};cm={x['address']:x for x in all_rows['public-three']}
queue=[]
for address in [0x880b0,0xa0838,0x834c8]:
    hits=[x for x in cm.values()if x['signature']==om[address]['signature']];assert len(hits)==1
    queue.append((address,hits[0]['address']))
seen=set();edges=[]
while queue:
    a,b=queue.pop()
    if(a,b)in seen:continue
    seen.add((a,b));left,right=om[a],cm[b];assert left['signature']==right['signature']
    ar,br=[w.m.instructions(z,f['address'],f['bytes'])for z,f in[(original,left),(images['public-three']['unstripped.so'],right)]]
    for x,y in zip(ar,br):
        if'call_target'not in x:continue
        oa,cb=x['call_target'],y['call_target']
        if oa not in om or cb not in cm:continue
        assert x['offset']==y['offset'] and om[oa]['signature']==cm[cb]['signature']
        edges.append((a,b,x['offset'],oa,cb));queue.append((oa,cb))
assert len(seen)==31 and len(edges)==115
print('Verified three complete roots, 31 direct-call pairs / 115 edges, and native repeat identity.')
corpus=json.loads((HERE/'runtime/corpus.json').read_text())
runtime=json.loads(gzip.decompress((HERE/'runtime/revalidated.json.gz').read_bytes()))
assert runtime['candidate_sha256']==sha(images['public-three']['candidate.so'])
assert runtime['original_sha256']==sha(original) and runtime['loader_profile']=='captured-upgradeable'
record=json.loads((HERE/'builds/public-three/build-comparison.json').read_text())
assert runtime['compiled_source_sha256']==record['source_sha256']
assert set(runtime['suites'])==set(corpus) and len(corpus)==44
assert runtime['case_count']==sum(row['cases']for row in corpus.values())==10468
assert not runtime['mismatches']
for name,definition in corpus.items():
    result=runtime['suites'][name]
    assert result['case_count']==definition['cases']
    assert not result.get('mismatches',result.get('failures',[]))
    assert runtime['script_sha256'][definition['script']]==definition['sha256']
spec=importlib.util.spec_from_file_location('retained_diagnostic_audit',HERE/'support/diagnostic_audit.py')
auditor=importlib.util.module_from_spec(spec);spec.loader.exec_module(auditor)
diagnostics=auditor.audit(runtime['suites'])
assert diagnostics==runtime['diagnostics'] and not diagnostics['mismatches']
assert diagnostics['log_bearing_cases']==10464
receipts=json.loads(gzip.decompress((HERE/'runtime/loader-receipts.json.gz').read_bytes()))
admitted_raw=(HERE/'runtime/admitted.json.gz').read_bytes()
admitted=json.loads(gzip.decompress(admitted_raw))
assert runtime['validation_only_source_sha256']==sha(admitted_raw)
assert admitted['suites']==runtime['suites'] and admitted['candidate_sha256']==runtime['candidate_sha256']
assert len(receipts)==44
for name in corpus:
    text=receipts[name+'.loader.json'];loaded=json.loads(text)
    assert sha(text.encode())==admitted['loader_receipts'][name]['sha256']
    assert {x['elf_sha256']for x in loaded['loads']}=={sha(original),runtime['candidate_sha256']}
    assert all(x['program_bytes']==36 and x['programdata_bytes']==10485760 and x['elf_prefix_unchanged'] and x['zero_allocation_tail']for x in loaded['loads'])
print('Verified 44 captured-loader suites / 10,468 cases; 10,464 diagnostic log pairs, zero mismatches.')
