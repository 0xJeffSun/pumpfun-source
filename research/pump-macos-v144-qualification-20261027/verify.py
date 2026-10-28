from pathlib import Path
from collections import Counter
from functools import lru_cache
import gzip,hashlib,importlib.util,json
P=Path(__file__).resolve().parent;R=P.parents[1];D=P/'run-40604554341'
sha=lambda b:hashlib.sha256(b).hexdigest()
for base in [P,D]:
 m=json.loads((base/'MANIFEST.json').read_text())
 assert all(sha((base/k).read_bytes())==v for k,v in m.items())
assert (D/'revision.txt').read_text().strip()=='bb408bf595c3d01b677591c44ab64227d1653385'
assert json.loads((D/'host.json').read_text())['system']=='Darwin'
spec=json.loads((D/'inputs.json').read_text())
a=importlib.util.spec_from_file_location('windows',R/spec['window_reader']);w=importlib.util.module_from_spec(a);a.loader.exec_module(w)
w.m.elf_layout=lru_cache(maxsize=8)(w.m.elf_layout);w.m.relocations=lru_cache(maxsize=8)(w.m.relocations)
original=(R/'evidence/original/pump/deployed.so').read_bytes();ow=w.windows(original);oc=Counter(x['signature']for x in ow);raw=Counter(x['raw_sha256']for x in ow)
assert len(ow)==1035 and sha(original)=='7a19affaa2c6187e04a5fe0ea298cee81fa5eb8c24cfcc30d85f615e89f7b02d'
measurement=json.loads((D/'measurement.json').read_text());images={};counters={}
for label,count,raw_count in [('baseline',744,121),('candidate',778,121),('repeat',778,121),('round37-identity',744,121),('round37-canonical',744,175)]:
 b=D/label;images[label]={n:gzip.decompress((b/(n+'.gz')).read_bytes())for n in ['candidate.so','unstripped.so']}
 record=json.loads(gzip.decompress((b/'build-comparison.json.gz').read_bytes()));assert record['returncode']==0 and record['source_unchanged']
 rows=w.windows(images[label]['unstripped.so']);cc=Counter(x['signature']for x in rows);counters[label]=cc
 assert sum((oc&cc).values())==count and sum((raw&Counter(x['raw_sha256']for x in rows)).values())==raw_count
 assert sha(images[label]['candidate.so'])==measurement['builds'][label]['candidate_sha256']
 assert sha(images[label]['unstripped.so'])==measurement['builds'][label]['unstripped_sha256']
profile_spec=json.loads((R/'scripts/pump_linux_v144_sbf_libraries.json').read_text())
checkpoint=json.loads((R/'repro/pump/main-contract-round37-20261027/CHECKPOINT.json').read_text())
digest=lambda x:sha(json.dumps(x,sort_keys=True,separators=(',',':')).encode())
for label in images:
 record=json.loads(gzip.decompress((D/label/'build-comparison.json.gz').read_bytes()))
 profile=record['target_library_profile'];assert profile['native_host_files_unchanged'] is True
 assert profile['cache_context']==checkpoint['target_library_profile_context']
 data=gzip.decompress((D/label/'target-library-profile-files.json.gz').read_bytes())
 assert sha(data)==profile['file_manifest_sha256'];files=json.loads(data)
 assert digest(files['native'])==profile['cache_context']['native_sdk_manifest_sha256']
 assert digest(files['prepared'])==profile['cache_context']['prepared_sdk_manifest_sha256']
 assert all(files['native'][name]['sha256']==h for name,h in profile_spec['native_tools'].items())
 assert profile['cache_context']['target_libraries']==profile_spec['target_libraries']
 if label!='baseline':assert record['dependency_cache']['main_freshly_compiled'] is True
assert images['candidate']==images['repeat']
assert sum(((oc&counters['baseline'])&counters['candidate']).values())==744
assert sha(images['round37-canonical']['candidate.so'])==spec['round37_candidate_sha256']
assert sha(images['round37-canonical']['unstripped.so'])==spec['round37_unstripped_sha256']
assert not measurement['whole_elf_equal']
print('Verified 52 artifact hashes, exact canonical Round37 hashes, repeated native 778 builds, all 744 retained; whole original ELF equality remains false.')

import tarfile
full=json.loads(gzip.decompress((P/'runtime/full.json.gz').read_bytes()))
record=json.loads(gzip.decompress((D/'candidate/build-comparison.json.gz').read_bytes()))
assert full['candidate_sha256']==sha(images['candidate']['candidate.so']) and full['original_sha256']==sha(original)
assert full['compiled_source_sha256']==record['source_sha256']
assert len(full['suites'])==44 and full['case_count']==10468 and not full['mismatches']
with tarfile.open(P/'runtime/compiled-source.tar.gz')as a:source={m.name:sha(a.extractfile(m).read())for m in a.getmembers()if m.isfile()}
prefix='work/pump-macos-qualification/candidate/source/'
assert all(source[k[len(prefix):]]==h for k,h in record['source_sha256'].items())
corpus=json.loads((P/'runtime/corpus.json').read_text());assert full['script_sha256']=={v['script']:v['sha256']for v in corpus.values()}
assert all(sha((R/k).read_bytes())==h for k,h in full['script_sha256'].items())
receipts=json.loads(gzip.decompress((P/'runtime/full-loader-receipts.json.gz').read_bytes()));assert len(receipts)==44
for name,result in full['suites'].items():
 assert result['case_count']==corpus[name]['cases']
 receipt=json.loads(receipts[name+'.loader.json'])
 assert {x['elf_sha256']for x in receipt['loads']}=={sha(original),sha(images['candidate']['candidate.so'])}
 assert all(x['program_bytes']==36 and x['programdata_bytes']==10485760 and x['elf_prefix_unchanged']and x['zero_allocation_tail']for x in receipt['loads'])
a=importlib.util.spec_from_file_location('runtime_audit',P/'runtime/diagnostic_audit.py');auditor=importlib.util.module_from_spec(a);a.loader.exec_module(auditor)
result=auditor.audit(full['suites']);assert not result['mismatches']and result['log_bearing_cases']==10464
assert full['resumption']['initial_completed_suites']==42 and set(full['resumption']['resumed_suites'])=={'tokenkeg_two_curve','claim_panic_diagnostics'}
assert sha((P/'runtime/initial-failure.json').read_bytes())==full['resumption']['initial_failure_sha256']
print('Verified exact macOS 778 candidate: 44 suites / 10,468 cases; 10,464 log-bearing cases, zero diagnostic mismatches.')
