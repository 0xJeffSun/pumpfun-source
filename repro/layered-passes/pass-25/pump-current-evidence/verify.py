"""Verify exact published split-stream/member byte exports; no VM/build/math or old work imports."""
from pathlib import Path
import argparse,json,gzip,sys,hashlib
from strict_evidence import strict_package,data
from reader import *
P=Path(__file__).resolve().parent;p=argparse.ArgumentParser();p.add_argument('--expected-seal',required=True);p.add_argument('--wrapper',type=Path);p.add_argument('--main',type=Path);a=p.parse_args();strict_package(P,a.expected_seal)
if not a.wrapper or not a.main:
 root=next((x for x in P.parents if(x/'repro/pump/remaining-guards-fortyeight/manifest.json').is_file()),None);assert root,'Supply published wrapper/main paths'
 a.wrapper=a.wrapper or root/'repro/pump/remaining-guards-fortyeight';a.main=a.main or root/'repro/pump/remaining-guards-main-fortyeight'
C=context(a.wrapper,a.main);wrapper,main,m,layout=C;b=json.loads(data(P/'archive-bindings.json'));assert (b['outer_seal'],b['inner_seal'],b['main_seal'])==(OUTER,INNER,MAIN)
assert SHA(data(P/'outer-manifest.json'))==OUTER and SHA(data(P/'inner-manifest.json'))==INNER and SHA(data(P/'main-manifest.json'))==MAIN
assert data(P/'layout.json')==data(wrapper/'layout.json')
logical_archive=b['logical_archives']['runtime-repository.tar.gz'];assert logical_archive['sha256']==m['runtime-repository.tar.gz']['sha256']and logical_archive['bytes']==m['runtime-repository.tar.gz']['bytes']and logical_archive['parts']==layout['files']['runtime-repository.tar.gz']['parts']
assert logical_archive['catalog_sha256']==m['archive-members.json']['sha256']
wanted={v['member']for v in b['exports'].values()if v['kind']=='archive-member'};source_members=archive_members(C,wanted);checked=0
for name,v in b['exports'].items():
 stored=data(P/name);assert SHA(stored)==v['stored_sha256']and len(stored)==v['stored_bytes'];raw=gzip.decompress(stored)if v['encoding']=='gzip'else stored
 assert SHA(raw)==v['source_sha256']and len(raw)==v['source_bytes']
 assert (P/name).stat().st_mode&0o111==v['stored_mode']&0o111
 if v['kind']=='archive-member':expected,mode=source_members[v['member']];assert mode==v['source_mode']
 elif v['kind']=='inner-file':expected=logical(C,v['logical_file']);assert layout['files'][v['logical_file']]['mode']==v['source_mode']
 else:assert v['kind']=='main-file';expected=data(main/v['main_file'])
 assert raw==expected,name;checked+=1
def read(name):
 raw=data(P/name);return json.loads(gzip.decompress(raw)if raw[:2]==b'\x1f\x8b'else raw)
assert len(list((P/'differential').glob('*.json.gz')))==38
assert len(list((P/'surfpool').rglob('pump-*-transactions.json.gz')))==28
assert b['differential_reports']==40 and b['signed_sequence_reports']==28 and b['differential_cases']==9269 and b['surfpool_comparisons']==1024 and b['receipt_domains']==68
assert sum(r['case_count']for r in read('differential/run.json'))==9237
source=read('source37.json');identity=read('main-lineage/controls/identity.json');assert len(source)==37 and identity['source37']==source==b['source37']and identity['whole_candidate_equal']and identity['whole_symbols_equal']
assert logical(C,'candidate.so')==data(main/'main/candidate.so')and SHA(data(main/'main/candidate.so'))==b['candidate'];assert logical(C,'unstripped.so')==data(main/'main/unstripped.so')and SHA(data(main/'main/unstripped.so'))==b['symbols']
assert read('runtime-outer-exit.json')['returncode']==0 and read('main-lineage/controls/outer-runner-exit.json')['returncode']==0
print(json.dumps({'passed':True,'exports':checked,'differential_reports':40,'signed_sequence_reports':28,'source_inputs':37,'outer_seal':OUTER,'inner_seal':INNER,'main_seal':MAIN,'split_archive_whole_stream_and_member_hashes':True,'original_raw_modes_authenticated':True,'Git_physical_mode_limit':'only executable bit portable; exact source mode retained in authenticated bindings/archive','builds':0,'target_executions':0,'new_cases':0}))
