"""Verify eighteen Pump source-coordinate recoveries."""
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
for label,count in [('parent',748),('sites',757),('candidate',766),('repeat',766)]:
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

def sources(label):
    with tarfile.open(HERE/'builds'/label/'primary.tar.gz')as a:return {m.name:a.extractfile(m).read()for m in a.getmembers()if m.isfile()}
for left,right,count in [('parent','sites',748),('sites','candidate',757)]:
    lc=Counter(x['signature']for x in rows[left]);rc=Counter(x['signature']for x in rows[right])
    assert sum(((oc&lc)&rc).values())==count
    a,b=sources(left),sources(right);assert set(a)==set(b)
    for name in a:
        if name.endswith('.rs'):assert [x for x in a[name].splitlines()if x.strip()]==[x for x in b[name].splitlines()if x.strip()]
        else:assert a[name]==b[name]
print('Verified 748 -> 757 -> 766 / 1035, preserving every earlier normalized match.')
print('Only blank lines changed; complete native repeat artifacts are identical; whole ELF remains unequal.')

candidate_sha=sha(images['candidate']['candidate.so'])
spec=importlib.util.spec_from_file_location('full_runtime_diagnostics',HERE/'support/diagnostic_audit.py');auditor=importlib.util.module_from_spec(spec);spec.loader.exec_module(auditor)
full=json.loads(gzip.decompress((HERE/'runtime/full.json.gz').read_bytes()))
assert full['candidate_sha256']==candidate_sha and full['original_sha256']==sha(original)
assert full['compiled_source_sha256']==records['candidate']['source_sha256']
assert full['loader_profile']=='captured-upgradeable' and not full['mismatches']
corpus=json.loads((HERE/'runtime/corpus.json').read_text())
assert set(full['suites'])==set(corpus) and len(corpus)==44
assert full['case_count']==sum(x['cases']for x in corpus.values())==10468
for name,definition in corpus.items():
    case=full['suites'][name];assert case['case_count']==definition['cases']
    assert not case.get('mismatches',case.get('failures',[]))
    assert full['script_sha256'][definition['script']]==definition['sha256']
diagnostics=auditor.audit(full['suites']);assert diagnostics==full['diagnostics']and not diagnostics['mismatches']
assert diagnostics['log_bearing_cases']==10464
receipts=json.loads(gzip.decompress((HERE/'runtime/full-loader-receipts.json.gz').read_bytes()));assert len(receipts)==44
for name in corpus:
    text=receipts[name+'.loader.json'];receipt=json.loads(text)
    assert sha(text.encode())==full['loader_receipts'][name]['sha256']
    assert {x['elf_sha256']for x in receipt['loads']}=={candidate_sha,sha(original)}
    assert all(x['program_bytes']==36 and x['programdata_bytes']==10485760 and x['elf_prefix_unchanged']and x['zero_allocation_tail']for x in receipt['loads'])
print('Verified exact 766 candidate: 44 suites / 10,468 cases; 10,464 diagnostic log pairs, zero mismatches.')
