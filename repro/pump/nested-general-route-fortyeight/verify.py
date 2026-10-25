#!/usr/bin/env python3
"""Saved build/receipt verification and optional tracked-input checks; no VM execution."""
from pathlib import Path,PurePosixPath
import argparse,ast,gzip,hashlib,importlib.util,json,subprocess,sys,tarfile,tempfile
sys.dont_write_bytecode=True
P=Path(__file__).resolve().parent;PREFIX='repro/pump/nested-general-route-fortyeight';SCRATCH_SEAL='0e4e2d6644c6bede5b164f6c2450c3ebd95460173f27e1537979a052f6d92aa1'
sha=lambda b:hashlib.sha256(b).hexdigest()
def safe(n):
 p=PurePosixPath(n);assert not p.is_absolute()and '..'not in p.parts and not p.name.endswith('-keypair.json'),n
 return p
def raw(n):p=P/safe(n);assert not p.is_symlink();return p.read_bytes()
def read(n):
 b=raw(n);return json.loads(gzip.decompress(b)if b.startswith(b'\x1f\x8b')else b)
def archive(n,output=None):
 rows={}
 with tarfile.open(P/n)as t:
  members=t.getmembers()
  for m in members:safe(m.name);assert m.isfile()and m.name not in rows;rows[m.name]=None
  for m in members:
   b=t.extractfile(m).read();rows[m.name]=sha(b)
   if output:p=output/m.name;p.parent.mkdir(parents=True,exist_ok=True);p.write_bytes(b)
 return rows
def load(path,name):
 s=importlib.util.spec_from_file_location(name,path);m=importlib.util.module_from_spec(s);s.loader.exec_module(m);return m
def main():
 ap=argparse.ArgumentParser();ap.add_argument('--current-main',action='store_true');ap.add_argument('--repo',type=Path);ap.add_argument('--runtime',action='store_true',help='Saved signatures are always verified; no runtime replay is performed.');ap.add_argument('--check-canonical',action='store_true',help='Also check current canonical route build bindings without creating a VM.');a=ap.parse_args()
 manifest=read('manifest-sha256.json');files=set()
 for p in P.rglob('*'):
  assert not p.is_symlink(),str(p)
  if p.is_file()and p!=P/'manifest-sha256.json':files.add(p.relative_to(P).as_posix())
 assert files==set(manifest),('publication payload set',files-set(manifest),set(manifest)-files)
 for n,v in manifest.items():b=raw(n);assert v=={'sha256':sha(b),'bytes':len(b)},n
 source=read('source-sha256.json');groups=read('current-bindings.json')['groups'];checked=0
 assert groups['source']==source and groups['documentation']==read('documentation-sha256.json')
 assert len(source)==37 and 'programs/pump/README.md'not in source and set(groups['documentation'])=={'programs/pump/README.md'}
 root=a.repo.resolve()if a.repo else None
 if a.current_main or a.check_canonical:
  if root is None:root=next(p for p in P.parents if(p/'evidence/original/pump/deployed.so').is_file())
 if a.current_main:
  tracked=set(subprocess.check_output(['git','-C',str(root),'ls-files','-z']).decode().split('\0'))
  for n in [*manifest,'manifest-sha256.json']:assert PREFIX+'/'+n in tracked,('Unpublished package input',n)
  for group,rows in groups.items():
   for n,z in rows.items():
    safe(n);assert not n.startswith('work/')and n in tracked,('Unpublished input',group,n)
    p=root/n;assert not p.is_symlink()and sha(p.read_bytes())==z,(group,n);checked+=1
  helper=load(P/'build-helpers/scripts/build_source_manifest.py','published_source_manifest')
  assert helper.source_manifest(root/'programs/pump',root/'programs/pump',root)==source,'actual current compiler input closure'
 build=read('build-comparison.json');attempt=read('build-attempt.json');identity=read('main-scratch-identity.json')
 assert source==build['source_sha256']==attempt['source_sha256']==attempt['source_after_sha256']
 assert attempt['returncode']==0 and attempt['source_unchanged']and not build['comparison']['full_byte_equality']
 assert sha(gzip.decompress(raw('build.log.gz')))==build['build_log_sha256']==attempt['build_log_sha256']
 assert archive('source-snapshot.tar.gz')==source
 assert archive('prebuild-inputs.tar.gz')==read('prebuild-manifest-sha256.json')
 completion=read('postbuild-completion.json');assert completion['compiler_returncode']==0 and completion['launcher_returncode']==1 and completion['build_count']==1 and completion['rebuilds']==0
 assert completion['excluded_immutable_entry_only']=='build-invocation.log' and completion['whole_stripped_and_symbol_identity']
 assert sha(raw('preserved-launcher-failure/build-invocation-before.log'))==completion['before_log_sha256']
 assert sha(raw('preserved-launcher-failure/build-invocation-after.log'))==completion['after_log_sha256']
 assert read('sdk-source-sha256.json')==read('sdk-postbuild-source-sha256.json')==build['sdk_source_sha256']
 for n,h in source.items():assert sha(raw('source/'+n))==h,n
 for n,h in groups['documentation'].items():assert sha(raw('owned/'+n))==h
 assert identity['main_source_sha256']==source and identity['main_build_report_sha256']==sha(raw('build-comparison.json'))
 assert {n[n.index('programs/pump/'):]:h for n,h in identity['scratch_source_sha256'].items()}==source
 phases=read('toolchain-phases.json');assert phases['compile']['selected_version']=='v1.44'and phases['strip']['actual_distribution']=='v1.52'
 assert phases['compile']['before']==phases['compile']['after']
 assert read('dependency-before.json')==read('dependency-after.json')
 assert sha(raw('candidate.so'))==build['comparison']['candidate_sha256']==phases['candidate']['sha256']=='731003570927c206353555d9743d70229234e7e3fa167a5915fa146f3007fc93'
 assert sha(raw('unstripped.so'))==phases['symbols']['sha256']=='151727642ec97f48b7bc3aba5f3311a09c1a2400f6b8a757210aa83e63454b7d'
 assert sha(raw('scratch-manifest-sha256.json'))==SCRATCH_SEAL==identity['scratch_manifest_sha256']
 with tempfile.TemporaryDirectory(prefix='pump-combined-saved-')as td:
  h=Path(td);archived=archive('scratch-handoff.tar.gz',h);sm=read('scratch-manifest-sha256.json');assert archived.pop('manifest-sha256.json')==SCRATCH_SEAL
  assert archived=={n:v['sha256']for n,v in sm.items()}
  for n in ['candidate.so','unstripped.so']:
   b=raw(n);assert b==(h/'focused-handoff/static'/n).read_bytes()
   assert identity['files'][n]=={'main_sha256':sha(b),'scratch_sha256':sha(b),'bytes':len(b),'entire_files_equal':True}
  assert identity['scratch_build_report_sha256']==sha((h/'focused-handoff/build/build-comparison.json').read_bytes())
  proc=subprocess.run([sys.executable,'-B',str(h/'verify.py')],cwd='/',capture_output=True,text=True);assert proc.returncode==0,proc.stdout+proc.stderr;saved=json.loads(proc.stdout)
  assert saved['payloads']==385 and saved['combined_differential_cases']==9269 and saved['surfpool_cases']==1024
  bindings=read('receipt-build-bindings.json');assert len(bindings)==68;counts={'differential':0,'surfpool':0};suites={};signatures={'differential':0,'surfpool':0};transactions={'differential':0,'surfpool':0}
  for b in bindings:
   n=PurePosixPath(b['receipt']).relative_to(PREFIX).as_posix();packet=raw(n);assert sha(packet)==b['receipt_sha256'];data_bytes=gzip.decompress(packet);assert sha(data_bytes)==b['decoded_json_sha256'];data=json.loads(data_bytes)
   if b['scratch_saved_path']:
    historic=(h/b['scratch_saved_path']).read_bytes()
    while historic.startswith(b'\x1f\x8b'):historic=gzip.decompress(historic)
    assert data_bytes==historic,'published receipt differs from verified saved evidence'
   else:
    assert b['suite']=='general_route'and b['cases']==16
    cs=json.loads((h/'focused-handoff/focused-candidate/summary.json').read_text());pairs=[]
    for row in cs['rows']:
     name=row['file'];pairs.append({'case':row['case'],'original':json.loads((h/'focused-handoff/focused-original'/name).read_text()),'candidate':json.loads((h/'focused-handoff/focused-candidate'/name).read_text()),'mismatches':row['mismatches']})
    assert data['cases']==pairs
   assert b['actual_main_source_sha256']==source and b['main_build_report_sha256']==identity['main_build_report_sha256']
   assert b['executed_scratch_build_report_sha256']==identity['scratch_build_report_sha256']and b['identity_report_sha256']==sha(raw('main-scratch-identity.json'))
   assert b['executed_candidate_sha256']==sha(raw('candidate.so'))and b['executed_original_sha256']==build['comparison']['original_sha256']
   ncases=data.get('case_count',data.get('cases'));assert b['cases']==(len(ncases)if isinstance(ncases,list)else ncases)
   counts[b['kind']]+=b['cases'];signatures[b['kind']]+=b['verified']['signatures'];transactions[b['kind']]+=b['verified']['transactions']
   if b['kind']=='differential':suites[b['suite']]=data
  assert counts=={'differential':9269,'surfpool':1024}and signatures=={'differential':24352,'surfpool':2980}and transactions=={'differential':15934,'surfpool':2048}
  agg=read('all-differential.json.gz');assert agg['suites']==suites and len(suites)==agg['suite_count']==40 and agg['case_count']==9269 and not agg['mismatches']
  assert agg['candidate_sha256']==sha(raw('candidate.so'))and agg['original_sha256']==build['comparison']['original_sha256']
  em=json.loads((h/'nested-execution-harness-manifest.json').read_text())
  for n,z in em.items():assert sha(raw('nested-harness/'+n))==z and raw('nested-harness/'+n)==(h/'nested-execution-harness'/n).read_bytes()
  assert read('nested-harness/expected-source-map.json')==source
  for n in ['pump_tokenkeg_two_curve_differential.py','base-fixture.json']:assert raw('harness/'+n)==(h/'two-curve-harness'/n).read_bytes()
  assert raw('original-only-nested.json.gz')==(h/'nested-original-acceptance.json.gz').read_bytes()
  with tarfile.open(h/'focused-handoff/focused-layer.tar.gz')as t:
   before=t.extractfile('focused-layer/harness/pump_general_route_differential.py').read().decode();fixture=t.extractfile('focused-layer/harness/base-fixture.json').read()
  after=raw('route-harness/pump_general_route_differential.py').decode();get=lambda s:{n.name:ast.dump(n)for n in ast.parse(s).body if isinstance(n,(ast.FunctionDef,ast.ClassDef))}
  aa,bb=get(before),get(after);assert aa.keys()==bb.keys()and[n for n in aa if aa[n]!=bb[n]]==['bindings']
  assert fixture==raw('route-harness/base-fixture.json');rp=read('route-harness/provenance.json');assert rp['approved_driver_sha256']==sha(before.encode())and rp['canonical_driver_sha256']==sha(after.encode())
  for side in ['original','candidate']:
   for f in(h/('focused-handoff/focused-'+side)).iterdir():
    if f.is_file():assert raw('route-'+side+'/'+f.name)==f.read_bytes()
  for n in ['function-match.json','route-windows.json','combined-static.json']:assert raw(n)==(h/'focused-handoff/static'/n).read_bytes()
 status=read('status-pump-proposal.json');assert status['validated_cases']==9269 and len(status['implemented_handlers'])==48 and len(status['partially_implemented_handlers'])==5 and len(status['signed_sequence_reports'])==28
 for n in status['validation_reports']+status['signed_sequence_reports']:assert(P/PurePosixPath(n).relative_to(PREFIX)).is_file(),n
 if a.check_canonical:
  route=load(P/'route-harness/pump_general_route_differential.py','published_route_binding')
  binding=route.bindings(root,P/'candidate.so',P/'build-comparison.json',root);assert binding['candidate']['relative_source_sha256']==source
  assert len(route.cases())==16
 print(json.dumps({'status':'PASS','payloads':len(manifest),'source_inputs':37,'documentation_inputs':1,'scratch_payloads':385,'main_scratch_stripped_and_symbol_elf_equal':True,'candidate_sha256':sha(raw('candidate.so')),'receipt_bindings':68,'differential_suites':40,'differential_cases':9269,'surfpool_cases':1024,'transactions':transactions,'signatures':signatures,'original_acceptance_transactions_separate':16,'original_acceptance_signatures_separate':32,'current_main':a.current_main,'tracked_bindings_checked':checked,'canonical_binding_checked':a.check_canonical,'full_original_byte_equality':False,'audit_complete':False,'new_builds':0,'new_transactions':0},indent=2))
if __name__=='__main__':main()
