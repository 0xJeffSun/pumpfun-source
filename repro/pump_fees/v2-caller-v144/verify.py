#!/usr/bin/env python3
"""Verify sealed main/scratch identity, portable saved evidence and current tracked bindings."""
from pathlib import Path,PurePosixPath
import argparse,gzip,hashlib,json,os,subprocess,sys,tarfile,tempfile
sys.dont_write_bytecode=True
P=Path(__file__).resolve().parent;H=lambda b:hashlib.sha256(b).hexdigest()
def raw(n):
 q=PurePosixPath(n);assert not q.is_absolute()and'..'not in q.parts and not q.name.endswith('-keypair.json');f=P/n;assert not f.is_symlink();return f.read_bytes()
def J(n):return json.loads(raw(n))
def archive(n):
 out={}
 with tarfile.open(P/n)as t:
  for m in t:
   q=PurePosixPath(m.name);assert m.isfile()and not q.is_absolute()and'..'not in q.parts and not q.name.endswith('-keypair.json')and m.name not in out
   out[m.name]=t.extractfile(m).read()
 return out

def main():
 ap=argparse.ArgumentParser(description=__doc__);ap.add_argument('--runtime',action='store_true');ap.add_argument('--current-main',action='store_true');ap.add_argument('--repo',type=Path);a=ap.parse_args()
 manifest=J('manifest-sha256.json');assert H(raw('manifest-sha256.json'))==raw('MANIFEST.sha256').decode().split()[0]
 files={f.relative_to(P).as_posix()for f in P.rglob('*')if f.is_file()and f.relative_to(P).as_posix()not in['manifest-sha256.json','MANIFEST.sha256']};assert files==set(manifest)
 for n,h in manifest.items():assert H(raw(n))==h,n
 source=J('source-sha256.json');assert len(source)==26
 src=archive('source-snapshot.tar.gz');assert{n:H(b)for n,b in src.items()}==source
 helper=J('build-helper-sha256.json');assert{n:H(b)for n,b in archive('build-helper-snapshot.tar.gz').items()}==helper
 docs=J('documentation-sha256.json');assert docs=={'programs/pump-fees/README.md':source['programs/pump-fees/README.md']};assert raw('documentation/programs/pump-fees/README.md')==src['programs/pump-fees/README.md']
 scratch=archive('scratch-handoff.tar.gz');ss=json.loads(scratch['inputs/corrected-source-sha256.json']);seal=scratch['manifest.json'];sm=json.loads(seal)
 assert H(seal)=='998740bf13a64c32deeca43f2121b7e6ac3fd802096536e8e197d41e140b6135';assert H(seal)==scratch['MANIFEST.sha256'].decode().split()[0]
 assert set(scratch)==set(sm)|{'manifest.json','MANIFEST.sha256'}
 for n,h in sm.items():assert H(scratch[n])==h,n
 assert set(source)==set(ss)and[n for n in source if source[n]!=ss[n]]==['programs/pump-fees/README.md']
 c=raw('pump_fees_candidate.so');sy=raw('symbols.so');digest=H(c)
 assert digest=='b2d02994dbc29680273f0a3589d8d9fd2763445505483c1acbd4c9f09e1502fb'and len(c)==852248 and c==scratch['candidate.so']
 assert H(sy)=='4a3ea0102ef726e0b0666ab10e659147dc22ba3f59e1692a9213fb7304049532'and sy==scratch['symbols.so']
 build=J('build-comparison.json');attempt=J('build-attempt.json');result=J('build-result.json');ident=J('main-scratch-identity.json')
 assert build['source_sha256']==attempt['source_sha256']==attempt['source_after_sha256']==result['source_before']==result['source_after']==source
 assert attempt['returncode']==result['returncode']==0 and result['source_unchanged']and not result['backend_stack_diagnostics']
 assert H(gzip.decompress(raw('build.log.gz')))==build['build_log_sha256']==attempt['build_log_sha256']
 assert ident['whole_file_equal']and ident['whole_symbols_equal']and not ident['main_runtime_replayed']
 assert ident['main_binary_sha256']==ident['scratch_binary_sha256']==digest and ident['main_symbols_sha256']==ident['scratch_symbols_sha256']==H(sy)
 assert ident['main_source_sha256']==source and ident['scratch_source_sha256']==ss and ident['main_build_report_sha256']==H(raw('build-comparison.json'))and ident['scratch_build_report_sha256']==H(scratch['build-01/build-comparison.json'])
 original=scratch['reference/analysis-method/inputs/original.so'];cmp=build['comparison'];assert cmp['original_sha256']==H(original)and cmp['candidate_sha256']==digest and cmp['full_byte_equality']==(original==c)==False
 assert cmp['different_positions_in_shared_length']==sum(x!=y for x,y in zip(original,c))and cmp['length_difference']==len(c)-len(original)
 tools=J('tools-before.json');phase=J('tool-phase-provenance.json');sp=json.loads(scratch['tool-phase-provenance.json'])
 assert phase['candidate_sha256']==digest and phase['symbols_sha256']==H(sy)
 hashes=lambda m:{n:v['sha256']for n,v in m.items()}
 assert hashes(phase['compile'])==hashes(tools['compile_tools'])==hashes(sp['compile'])
 assert phase['strip']['sha256']==tools['strip_tool']['sha256']==sp['strip']['sha256']
 for v in[*tools['compile_tools'].values(),tools['strip_tool'],tools['cli']]:assert result['tool_after'][v['resolved_path']]==v['sha256']
 assert phase['sdk_files']==tools['sdk_template_files']==build['sdk_source_sha256']=={n:H(b)for n,b in archive('sbf-sdk-snapshot.tar.gz').items()}
 info=J('cargo-rustc-info.json');roots={line for v in info['outputs'].values()for line in v.get('stdout','').splitlines()if line.startswith('/')and line.endswith('/rust')};assert roots=={phase['observed_sysroot']}
 assert J('dependency-before.json')==J('dependency-after.json')==json.loads(scratch['inputs/dependency-before.json'])
 pre=J('main-prebuild-manifest-sha256.json')
 for n,h in pre.items():assert H(raw(n))==h,('main prebuild changed',n)
 assert J('build-launch.json')['runner_sha256']==H(raw('build_once.py'))
 copied=J('scratch-copied-files.json')
 for n,s in copied.items():assert raw(n)==scratch[s],n
 rows=J('receipt-build-bindings.json');assert len(rows)==11
 progress=json.loads(gzip.decompress(scratch['runtime/progress.json.gz']))
 for row in rows:
  n=row['name'];old=next(x for x in progress if x['name']==n);data=raw(n+'.json.gz')
  assert data==scratch['runtime/'+n+'.json.gz']and H(gzip.decompress(data))==old['report_sha256']
  assert row['execution']==old and row['main_candidate_sha256']==digest and row['main_build_report_sha256']==H(raw('build-comparison.json'))and row['main_source_sha256']==source and not row['main_runtime_replayed']
 canonical=J('published-harness-sha256.json');origins=J('harness-origin-map.json');recorded=J('harness-source-sha256.json')
 assert len(canonical)==42 and len(recorded)==44 and len(origins)==44
 assert{v['recorded_path']:v['sha256']for v in origins}==recorded and{v['published_path']:v['sha256']for v in origins}==canonical
 for v in origins:assert H(scratch['runner-repo/'+v['recorded_path']])==v['sha256']
 changed=J('focused-publication-adaptation.json');assert set(changed['changed_files'])=={'validation-layer/corrected-source-sha256.json','validation-layer/current-build-binding.json'}
 for n in [n for n in scratch if n.startswith('validation-layer/')]:
  if n not in changed['changed_files']:assert raw(n)==scratch[n]
  else:assert H(scratch[n])==changed['changed_files'][n]['before_sha256']and H(raw(n))==changed['changed_files'][n]['after_sha256']
 assert J('validation-layer/corrected-source-sha256.json')==source
 binding=J('validation-layer/current-build-binding.json');assert binding['candidate_sha256']==digest and binding['source_sha256']==source and binding['symbols_sha256']==H(sy)and binding['build_comparison_sha256']==H(raw('build-comparison.json'))and binding['build_attempt_sha256']==H(raw('build-attempt.json'))and binding['tool_phase_sha256']==H(raw('tool-phase-provenance.json'))
 prefix='repro/pump_fees/v2-caller-v144/'
 fh=J('published-focused-harness-sha256.json');fi=J('published-focused-inputs-sha256.json')
 assert fh=={prefix+n:H(raw(n))for n in files if n.startswith('validation-layer/harness/')}
 assert fi=={prefix+n:H(raw(n))for n in files if n.startswith('validation-layer/')and not n.startswith('validation-layer/harness/')}
 runtime=J('runtime-inputs.json');assert runtime==json.loads(scratch['runtime-frozen-inputs.json'])['runtime']
 for n,h in runtime.items():assert H(scratch['runner-repo/'+n])==h
 status=J('status-proposal.json');assert status['candidate_artifact']==prefix+'pump_fees_candidate.so'and status['candidate_sha256']==digest and len(status['implemented_handlers'])==31
 assert status['validated_cases']==status['total_comparison_receipts']==17461 and sum(json.loads(gzip.decompress(raw(Path(n).name)))['case_count']for n in status['validation_reports'])==17461
 claims=J('readme-claim-checks.json');assert claims['candidate_sha256']==digest and claims['symbols_sha256']==H(sy) and claims['README_sha256']==source['programs/pump-fees/README.md']
 assert claims['donation_handler_bytes']==12864 and claims['donation_parser_bytes']==8984 and claims['donation_wrapper_bytes']==928 and claims['donation_direct_targets']==76 and claims['donation_matching_targets']==74 and claims['donation_unique_direct_data_objects']==19
 assert len(claims['social_original_direct_targets'])==17 and all(x['matches']for x in claims['social_original_direct_targets'])
 assert J('post-build-checks/cpi-targets.json')['candidate_sha256']==digest and J('post-build-checks/cpi-targets.json')['matched_immediate_targets']==96
 acceptance=J('independent-review/acceptance.json');assert acceptance['accepted_for_bounded_integration'] and acceptance['candidate_sha256']==digest
 for n,h in acceptance['review_files'].items():assert H(raw('independent-review/at-acceptance/'+n))==h
 final_review=J('independent-review/final-root-verification.json');assert final_review['passed'] and final_review['manifest_sha256']==H(raw('independent-review/final/manifest.json'))
 review_manifest=J('independent-review/final/manifest.json')['files']
 for n,v in review_manifest.items():assert H(raw('independent-review/final/'+n))==v['sha256']
 with tempfile.TemporaryDirectory() as td:
  q=Path(td)/'review';q.mkdir()
  for n in review_manifest:
   d=q/n;d.parent.mkdir(parents=True,exist_ok=True);d.write_bytes(raw('independent-review/final/'+n))
  subprocess.run([sys.executable,'-B',str(q/'verify_parser_links.py')],cwd='/',check=True,stdout=subprocess.PIPE,text=True)
  for n,v in review_manifest.items():assert H((q/n).read_bytes())==v['sha256']
 current=None
 if a.current_main:
  root=a.repo.resolve()if a.repo else next(r for r in P.parents if(r/'repro/status.json').is_file()and(r/'Cargo.toml').is_file())
  tracked=set(subprocess.check_output(['git','-C',str(root),'ls-files','-z']).decode().split('\0'))
  current={'source':source,'helpers':helper,'documentation':docs,'baseline_harness':canonical,'focused_harness':fh,'focused_inputs':fi,'runtime':runtime,'candidate':{prefix+'pump_fees_candidate.so':digest,prefix+'symbols.so':H(sy)}}
  for group,mapping in current.items():
   for n,h in mapping.items():
    q=PurePosixPath(n);assert not q.is_absolute()and'..'not in q.parts and not n.startswith('work/')and n in tracked,('Untracked current binding',group,n)
    f=root/n;assert not f.is_symlink()and H(f.read_bytes())==h,('Current binding mismatch',group,n)
 with tempfile.TemporaryDirectory(prefix='fees-legacy-caller-saved-')as t:
  t=Path(t)
  for n,b in scratch.items():f=t/n;f.parent.mkdir(parents=True,exist_ok=True);f.write_bytes(b)
  proc=subprocess.run([sys.executable,'-B',str(t/'verify.py')]+(['--runtime']if a.runtime else[]),cwd='/',capture_output=True,text=True,env={**os.environ,'PYTHONDONTWRITEBYTECODE':'1'})
  assert proc.returncode==0,(proc.stdout,proc.stderr);saved=json.loads(proc.stdout);assert saved['status']=='PASS'
 print(json.dumps({'verified':True,'payloads':len(manifest),'candidate_sha256':digest,'candidate_bytes':len(c),'source_inputs':26,'main_scratch_elf_equal':True,'main_scratch_symbols_equal':True,'original_equal':False,'bounded_handlers':31,'saved':saved,'current_main':a.current_main,'current_groups':{g:len(m)for g,m in current.items()}if current else None,'new_target_executions':0},sort_keys=True))
if __name__=='__main__':main()
