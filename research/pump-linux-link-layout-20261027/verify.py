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
for label,count in [('baseline-default',744),('baseline-ordered',744),('candidate-default',778),('candidate-ordered',778),('repeat',778)]:
    build=HERE/'builds'/label;record=json.loads((build/'build-comparison.json').read_text());records[label]=record
    assert record['returncode']==0 and record['source_unchanged']
    assert record['comparison']['original_sha256']==sha(original)and not record['comparison']['full_byte_equality']
    if label!='baseline-default':assert record['dependency_cache']['main_freshly_compiled']
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
assert images['candidate-ordered']==images['repeat']


raw=Counter(x['raw_sha256']for x in ow)
for label,expected in [('baseline-default',121),('baseline-ordered',137),('candidate-default',121),('candidate-ordered',137),('repeat',137)]:assert sum((raw&Counter(x['raw_sha256']for x in rows[label])).values())==expected
for before,after in [('baseline-default','baseline-ordered'),('candidate-default','candidate-ordered')]:
    a,b=[Counter(x['signature']for x in rows[z])for z in [before,after]];assert a==b
spec=importlib.util.spec_from_file_location('layout_pipeline',HERE/'pipeline/pump_text_layout.py');pipeline=importlib.util.module_from_spec(spec);spec.loader.exec_module(pipeline)
for label in ['baseline-ordered','candidate-ordered','repeat']:
    rec=records[label]['text_layout'];assert rec['rustc_host']=='x86_64-unknown-linux-gnu'
    assert 'host: '+rec['rustc_host']in rec['rustc_verbose_version']
    assert '/'+rec['rustc_host']+'/bin/rust-lld' in rec['real_linker']
    assert sha((HERE/'builds'/label/'ordered.ld').read_bytes())==rec['script_sha256']
    for name,digest in rec['helper_sha256'].items():assert sha((HERE/'pipeline'/Path(name).name).read_bytes())==digest
    packed=(HERE/'builds'/label/'linker-invocation.json.gz').read_bytes();raw_inv=gzip.decompress(packed);assert sha(raw_inv)==rec['linker_invocation_sha256'];inv=json.loads(raw_inv)
    assert len(inv['link_inputs'])==rec['bound_inputs']==122
    assert set(pipeline.declared_inputs(inv['incoming']))==set(inv['link_inputs'])
    assert set(pipeline.declared_inputs(inv['forwarded']))=={v['copy']for v in inv['link_inputs'].values()}
    assert inv['replacement_script_sha256']==rec['script_sha256']and inv['real_linker_sha256']==rec['real_linker_sha256']
    for item in inv['link_inputs'].values():
        blob=gzip.decompress((HERE/'link-blobs'/(item['sha256']+'.gz')).read_bytes());assert sha(blob)==item['sha256']and len(blob)==item['bytes']
def graph(label):
    blob=images[label]['unstripped.so'];rr=rows[label];by={x['address']:x for x in rr};rel=dict(w.m.relocations(blob));result=[];count=0
    def identity(x):return(x['name'],x['signature'],x['bytes'])
    for row in rr:
        edges=[]
        for ins in w.m.instructions(blob,row['address'],row['bytes']):
            if 'call_target'not in ins or rel.get(row['address']+ins['offset'],0)&0xffffffff==10:continue
            edges.append((ins['offset'],identity(by[ins['call_target']])));count+=1
        result.append((identity(row),tuple(edges)))
    return Counter(result),count
left,count=graph('candidate-default');right,other=graph('candidate-ordered');assert left==right and count==other==10678
assert len(rows['candidate-ordered'])==964
print('Verified 744 and 778 normalized sets retained; raw equality 121 -> 137 on both source snapshots.')
print('Verified identical ordered repeat; 964 native windows / 10,678 direct callee-label edges retained.')
print('Verified all 122 actual linker inputs per ordered build; data, indirect and whole-ELF identity remain outside this check.')

runtime=json.loads(gzip.decompress((HERE/'runtime/exact-quote.json.gz').read_bytes()));candidate_sha=sha(images['candidate-ordered']['candidate.so'])
assert runtime['candidate_sha256']==candidate_sha and runtime['original_sha256']==sha(original)
assert runtime['case_count']==len(runtime['cases'])==352 and not runtime['mismatches']
loader=json.loads((HERE/'runtime/exact-quote.loader.json').read_text())
assert {x['elf_sha256']for x in loader['loads']}=={candidate_sha,sha(original)}
assert all(x['program_bytes']==36 and x['programdata_bytes']==10485760 and x['elf_prefix_unchanged']and x['zero_allocation_tail']for x in loader['loads'])
spec=importlib.util.spec_from_file_location('trade_add_diagnostics',HERE/'support/diagnostic_audit.py');auditor=importlib.util.module_from_spec(spec);spec.loader.exec_module(auditor)
diagnostics=auditor.audit({'exact_quote_v3':runtime});assert not diagnostics['mismatches']
print('Verified exact ordered 778 candidate: 352 focused exact-quote cases passed; diagnostic audit found zero mismatches.')
