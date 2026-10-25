#!/usr/bin/env python3
"""Verify saved evidence and optional tracked current inputs; no build or VM execution."""
from pathlib import Path,PurePosixPath
import argparse,gzip,hashlib,importlib.util,json,subprocess,sys,tarfile,tempfile
sys.dont_write_bytecode=True
P=Path(__file__).resolve().parent
PREFIX='repro/pump/nested-ancestry-fortyeight'
SCRATCH_SEAL='3a907ab0ae1ae926c94951c98aede4da512e8a39e5bca5c5a437fe5fd1464f9c'
sha=lambda b:hashlib.sha256(b).hexdigest()
def safe(n):
 p=PurePosixPath(n);assert not p.is_absolute()and '..'not in p.parts and not p.name.endswith('-keypair.json'),n
 return p
def raw(n):
 p=P/safe(n);assert not p.is_symlink();return p.read_bytes()
def read(n):
 b=raw(n);return json.loads(gzip.decompress(b)if b.startswith(b'\x1f\x8b')else b)
def archive(n,output=None):
 rows={}
 with tarfile.open(P/n)as t:
  members=t.getmembers()
  for m in members:safe(m.name);assert m.isfile()and m.name not in rows;rows[m.name]=None
  for m in members:
   b=t.extractfile(m).read();rows[m.name]=sha(b)
   if output:
    p=output/m.name;p.parent.mkdir(parents=True,exist_ok=True);p.write_bytes(b)
 return rows
def load(path,name):
 s=importlib.util.spec_from_file_location(name,path);m=importlib.util.module_from_spec(s);s.loader.exec_module(m);return m
def main():
 ap=argparse.ArgumentParser();ap.add_argument('--current-main',action='store_true');a=ap.parse_args()
 manifest=read('manifest-sha256.json');files=set()
 for p in P.rglob('*'):
  assert not p.is_symlink(),str(p)
  if p.is_file()and p!=P/'manifest-sha256.json':files.add(p.relative_to(P).as_posix())
 assert files==set(manifest),'publication payload set'
 for n,v in manifest.items():b=raw(n);assert v=={'sha256':sha(b),'bytes':len(b)},n
 source=read('source-sha256.json');build=read('build-comparison.json');attempt=read('build-attempt.json');identity=read('main-scratch-identity.json')
 assert len(source)==37 and source==build['source_sha256']==attempt['source_sha256']==attempt['source_after_sha256']
 assert attempt['returncode']==0 and attempt['source_unchanged']and not build['comparison']['full_byte_equality']
 assert sha(gzip.decompress(raw('build.log.gz')))==build['build_log_sha256']==attempt['build_log_sha256']
 assert archive('source-snapshot.tar.gz')==source
 for n,h in source.items():assert sha(raw('source/'+n))==h,n
 assert identity['main_source_sha256']==source and identity['main_build_report_sha256']==sha(raw('build-comparison.json'))
 assert identity['source_content_equal_after_root_normalization']
 assert {n[n.index('programs/pump/'):]:h for n,h in identity['scratch_source_sha256'].items()}==source
 phases=read('toolchain-phases.json');assert read('tools-before.json')==read('tools-after.json')
 assert phases['compile']['selected_version']=='v1.44'and phases['compile']['tools']['bin/rustc']['sha256']=='1f26338cc2cabd0a6057dcbd0528bba262b23ca1296d357a55304ee31d1d9e5a'
 assert phases['strip']['tool']['sha256']=='12415dc01e08e4f606a1a4eac8c197d560c7883161d266312c821bf5db7bf8be'
 assert phases['cargo_rustc_info']['sha256']==sha(raw('cargo-rustc-info.json'))
 assert sha(raw('candidate.so'))==build['comparison']['candidate_sha256']==phases['candidate']['sha256']
 assert sha(raw('unstripped.so'))==phases['compiled_unstripped']['sha256']
 assert sha(raw('scratch-manifest-sha256.json'))==SCRATCH_SEAL==identity['scratch_manifest_sha256']
 with tempfile.TemporaryDirectory(prefix='pump-nested-saved-')as td:
  h=Path(td);archived=archive('scratch-handoff.tar.gz',h);sm=read('scratch-manifest-sha256.json')
  assert archived.pop('manifest-sha256.json')==SCRATCH_SEAL
  assert archived=={n:v['sha256']for n,v in sm.items()}
  for n in ['candidate.so','unstripped.so']:
   b=raw(n);assert b==(h/n).read_bytes()
   assert identity['files'][n]=={'main_sha256':sha(b),'scratch_sha256':sha(b),'bytes':len(b),'entire_files_equal':True}
  assert identity['scratch_build_report_sha256']==sha((h/'build-comparison.json').read_bytes())
  assert identity['scratch_source_sha256']==json.loads((h/'build-comparison.json').read_text())['source_sha256']
  proc=subprocess.run([sys.executable,'-B',str(h/'verify_handoff.py')],cwd='/',capture_output=True,text=True)
  assert proc.returncode==0,proc.stdout+proc.stderr;saved=json.loads(proc.stdout)
  assert saved['payloads']==935 and saved['combined_differential_cases']==9253 and saved['surfpool_cases']==1024
  # Recompute the complete serializer/call/literal and guard assertions on the
  # newly built main files, in the already verified portable static environment.
  for n in ['candidate.so','unstripped.so','function-match.json','depth-guard-match.json']:(h/n).write_bytes(raw(n))
  proc=subprocess.run([sys.executable,'-B',str(h/'verify_static_portable.py')],cwd='/',capture_output=True,text=True)
  assert proc.returncode==0,proc.stdout+proc.stderr;static=json.loads(proc.stdout)
  bindings=read('receipt-build-bindings.json');assert len(bindings)==67;counts={'differential':0,'surfpool':0};suites={}
  signature_totals={'differential':0,'surfpool':0}
  for b in bindings:
   n=PurePosixPath(b['receipt']).relative_to(PREFIX).as_posix();packet=raw(n);assert sha(packet)==b['receipt_sha256']
   data_bytes=gzip.decompress(packet);assert sha(data_bytes)==b['decoded_json_sha256'];data=json.loads(data_bytes)
   historic=(h/b['scratch_saved_path']).read_bytes()
   while historic.startswith(b'\x1f\x8b'):historic=gzip.decompress(historic)
   assert data_bytes==historic,'published receipt differs from verified saved case'
   assert b['actual_main_source_sha256']==source and b['main_build_report_sha256']==identity['main_build_report_sha256']
   assert b['executed_scratch_build_report_sha256']==identity['scratch_build_report_sha256']and b['identity_report_sha256']==sha(raw('main-scratch-identity.json'))
   assert b['executed_candidate_sha256']==sha(raw('candidate.so'))and b['executed_original_sha256']==build['comparison']['original_sha256']
   assert b['cases']==data.get('case_count',data.get('cases'))
   counts[b['kind']]+=b['cases'];signature_totals[b['kind']]+=b['verified']['signatures']
   if b['kind']=='differential':suites[b['suite']]=data
  assert counts=={'differential':9253,'surfpool':1024}and signature_totals=={'differential':24320,'surfpool':2980}
  agg=read('all-differential.json.gz');assert agg['suites']==suites and len(suites)==agg['suite_count']==39 and agg['case_count']==9253 and not agg['mismatches']
  assert agg['candidate_sha256']==sha(raw('candidate.so'))and agg['original_sha256']==build['comparison']['original_sha256']
  em=json.loads((h/'execution-harness-manifest.json').read_text())
  for n,z in em.items():assert sha(raw('nested-harness/'+n))==z and raw('nested-harness/'+n)==(h/'execution-harness'/n).read_bytes()
  assert read('nested-harness/expected-source-map.json')==source
  for n in ['pump_tokenkeg_two_curve_differential.py','base-fixture.json']:assert raw('harness/'+n)==(h/'two-curve-harness'/n).read_bytes()
  assert raw('original-only-nested.json.gz')==(h/'original-acceptance-01.json.gz').read_bytes()
 groups=read('current-bindings.json')['groups'];assert groups['source']==source and groups['documentation']==read('documentation-sha256.json')
 assert 'programs/pump/README.md'not in source and set(groups['documentation'])=={'programs/pump/README.md'}
 status=read('status-pump-proposal.json');assert status['validated_cases']==9253 and len(status['implemented_handlers'])==48 and len(status['partially_implemented_handlers'])==5
 assert len(status['signed_sequence_reports'])==28
 for n in status['validation_reports']+status['signed_sequence_reports']:assert (P/PurePosixPath(n).relative_to(PREFIX)).is_file(),n
 checked=0
 if a.current_main:
  root=next(p for p in P.parents if(p/'evidence/original/pump/deployed.so').is_file())
  tracked=set(subprocess.check_output(['git','-C',str(root),'ls-files','-z']).decode().split('\0'))
  for name in [*manifest,'manifest-sha256.json']:assert PREFIX+'/'+name in tracked,('Unpublished package input',name)
  for group,rows in groups.items():
   for n,z in rows.items():
    safe(n);assert not n.startswith('work/')and n in tracked,('Unpublished input',group,n)
    p=root/n;assert not p.is_symlink()and sha(p.read_bytes())==z,(group,n);checked+=1
  helper=load(P/'build-helper-snapshot/scripts/build_source_manifest.py','publication_source_manifest')
  assert helper.source_manifest(root/'programs/pump',root/'programs/pump',root)==source,'actual current compiler-input closure'
 print(json.dumps({'status':'PASS','payloads':len(manifest),'source_inputs':37,'documentation_inputs':1,'scratch_payloads':935,'main_scratch_stripped_and_symbol_elf_equal':True,'candidate_sha256':sha(raw('candidate.so')),'receipt_bindings':67,'differential_suites':39,'differential_cases':9253,'surfpool_cases':1024,'verified_comparison_signatures':27300,'original_acceptance_signatures_separate':32,'historical_failed_signatures_separate':96,'static':static,'current_main':a.current_main,'tracked_bindings_checked':checked,'full_original_byte_equality':False,'audit_complete':False,'new_builds':0,'new_transactions':0},indent=2))
if __name__=='__main__':main()
