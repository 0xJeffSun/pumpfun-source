#!/usr/bin/env python3
"""Verify sealed source/build/runtime evidence and optional current tracked inputs."""
from pathlib import Path,PurePosixPath
import argparse,gzip,hashlib,importlib.util,json,subprocess,sys,tarfile,tempfile
sys.dont_write_bytecode=True
P=Path(__file__).resolve().parent;PREFIX='repro/pump/curve-preparation-fortyeight';SEAL='41938f03623cf4df631764f7d86e50520060e40fecc09caa6bf27bb9accd0cee';H=lambda b:hashlib.sha256(b).hexdigest()
def safe(n):
 p=PurePosixPath(n);assert not p.is_absolute()and '..'not in p.parts and not p.name.endswith('-keypair.json');return p
def raw(n):p=P/safe(n);assert not p.is_symlink();return p.read_bytes()
def obj(n):
 b=raw(n);return json.loads(gzip.decompress(b)if b.startswith(b'\x1f\x8b')else b)
def archive(n,out=None):
 result={}
 with tarfile.open(P/n)as t:
  for m in t:
   safe(m.name);assert m.isfile()and m.name not in result;b=t.extractfile(m).read();result[m.name]=H(b)
   if out:p=out/m.name;p.parent.mkdir(parents=True,exist_ok=True);p.write_bytes(b)
 return result
def main():
 ap=argparse.ArgumentParser();ap.add_argument('--current-main',action='store_true');ap.add_argument('--check-current',action='store_true');ap.add_argument('--repo',type=Path);a=ap.parse_args()
 manifest=obj('manifest.json');assert H(raw('manifest.json'))==raw('manifest.sha256').decode().split()[0]
 files=set()
 for p in P.rglob('*'):
  assert not p.is_symlink()
  if p.is_file()and p not in [P/'manifest.json',P/'manifest.sha256']:files.add(p.relative_to(P).as_posix())
 assert files==set(manifest)
 for n,v in manifest.items():b=raw(n);assert v=={'sha256':H(b),'bytes':len(b)},n
 source=obj('source-sha256.json');docs=obj('documentation-sha256.json');groups=obj('current-bindings.json')['groups'];assert len(source)==37 and groups['source']==source and groups['documentation']==docs
 assert archive('source-snapshot.tar.gz')==source and archive('prebuild-snapshot.tar.gz')==obj('prebuild-manifest.json')
 for n,h in source.items():assert H(raw('source/'+n))==h
 for n,h in docs.items():assert H(raw('owned/'+n))==h
 b=obj('build-comparison.json');attempt=obj('build-attempt.json');assert b['source_sha256']==attempt['source_sha256']==attempt['source_after_sha256']==source
 assert attempt['returncode']==0 and attempt['source_unchanged']and not b['comparison']['full_byte_equality']
 assert H(gzip.decompress(raw('build.log.gz')))==attempt['build_log_sha256']==b['build_log_sha256']
 result=obj('build-result.json');assert result['returncode']==0 and result['source_unchanged']and result['documentation_unchanged']and result['tools_unchanged']and not result['backend_stack_failures']and result['builds']==1 and result['retries']==0
 phases=obj('toolchain-phases.json');assert phases['compile']['selected_version']=='v1.44'and phases['strip']['actual_distribution']=='v1.52'and phases['compile']['before']==phases['compile']['after']
 assert phases['sdk_source_sha256']==b['sdk_source_sha256']==obj('sdk-source-sha256.json')
 assert obj('dependency-before.json')==obj('dependency-after.json')and obj('dependency-before.json')['files']==14281
 identity=obj('main-scratch-identity.json');assert identity['main_source_sha256']==source and identity['main_build_report_sha256']==H(raw('build-comparison.json'))and identity['scratch_manifest_sha256']==SEAL
 assert H(raw('candidate.so'))==b['comparison']['candidate_sha256']==phases['candidate']['sha256']=='b02a7e08b1f928a48793d909a86ef01c99cb3cb11a2aaf3d85e4ac422b989b51'
 assert H(raw('unstripped.so'))==phases['symbols']['sha256']=='95e2b7906dcfb0c343ac27346efddd7236a011dbf2fd156750a828a9852ef7a8'
 with tempfile.TemporaryDirectory(prefix='pump-error-main-')as td:
  temp=Path(td);members=archive('scratch-handoff.tar.gz',temp);sm=obj('scratch-manifest.json');assert H(raw('scratch-manifest.json'))==SEAL==members.pop('manifest.json');members.pop('manifest.sha256');assert members=={n:v['sha256']for n,v in sm.items()}
  pr=subprocess.run([sys.executable,'-B',str(temp/'verify.py')],cwd='/',capture_output=True,text=True);assert pr.returncode==0,pr.stdout+pr.stderr;saved=json.loads(pr.stdout)
  assert saved['totals']['differential']['cases']==9269 and saved['totals']['surfpool']['cases']==1024
  for n in ['candidate.so','unstripped.so']:
   data=raw(n);assert data==(temp/n).read_bytes();assert identity['files'][n]=={'main_sha256':H(data),'scratch_sha256':H(data),'bytes':len(data),'entire_files_equal':True}
  assert identity['scratch_build_report_sha256']==H((temp/'build/build-comparison.json').read_bytes())
  for n in ['full-before-after-inventory.json.gz','fresh-metadata.json','metadata-closure.json','before-after-inventory.json','function-match.json']:assert raw(n)==(temp/n).read_bytes()
  expected=json.loads((temp/'receipt-bindings.json').read_text());rows=obj('receipt-build-bindings.json');assert len(rows)==len(expected)==68;suites={}
  for row,old in zip(rows,expected):
   assert raw(row['path'])==(temp/old['path']).read_bytes()and row['sha256']==old['sha256']
   assert row['actual_source_sha256']==source and row['executed_scratch_source_sha256']==old['actual_source_sha256']
   assert row['main_build_report_sha256']==H(raw('build-comparison.json'))and row['identity_report_sha256']==H(raw('main-scratch-identity.json'))
   if row['kind']=='differential':suites[row['suite']]=obj(row['path'])
  agg=obj('all-differential.json.gz');assert agg['suites']==suites and agg['case_count']==9269 and agg['suite_count']==40 and not agg['mismatches']
  for path in (P/'nested-harness').rglob('*'):
   if path.is_file():assert path.read_bytes()==(temp/'runtime-layer/nested-harness'/path.relative_to(P/'nested-harness')).read_bytes()
  for name in ['pump_general_route_differential.py','base-fixture.json']:assert raw('route-harness/'+name)==(temp/'runtime-layer/route-harness'/name).read_bytes()
  assert obj('nested-harness/expected-source-map.json')==source
 checked=0
 if a.current_main or a.check_current:
  root=a.repo.resolve()if a.repo else next(p for p in P.parents if(p/'evidence/original/pump/deployed.so').is_file());tracked=set(subprocess.check_output(['git','-C',str(root),'ls-files','-z']).decode().split('\0'))if a.current_main else set()
  if a.current_main:
   for n in [*manifest,'manifest.json','manifest.sha256']:assert PREFIX+'/'+n in tracked,('Untracked publication',n)
  for group,rows in groups.items():
   for n,h in rows.items():
    safe(n);assert not n.startswith('work/'),n
    if a.current_main:assert n in tracked,('Untracked input',group,n)
    assert H((root/n).read_bytes())==h,(group,n);checked+=1
  spec=importlib.util.spec_from_file_location('source_closure',P/'build-helpers/scripts/build_source_manifest.py');mod=importlib.util.module_from_spec(spec);spec.loader.exec_module(mod);assert mod.source_manifest(root/'programs/pump',root/'programs/pump',root)==source
 status=obj('status-pump-proposal.json');assert status['validated_cases']==9269 and len(status['implemented_handlers'])==48 and len(status['partially_implemented_handlers'])==5
 for n in status['validation_reports']+status['signed_sequence_reports']:assert (P/PurePosixPath(n).relative_to(PREFIX)).is_file()
 print(json.dumps({'status':'PASS','payloads':len(manifest),'source_inputs':37,'documentation_inputs':1,'main_scratch_full_elf_and_symbols_equal':True,'scratch_payloads':saved['payloads'],'totals':saved['totals'],'metadata_full_bodies':4,'actual_metadata_targets':62,'current_main':a.current_main,'current_bindings_checked':checked,'full_original_byte_equality':False,'audit_complete':False},indent=2))
if __name__=='__main__':main()
