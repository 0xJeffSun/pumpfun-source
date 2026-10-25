#!/usr/bin/env python3
"""Portable saved evidence verification. No build and no target transaction execution."""
from pathlib import Path
import argparse,base64,gzip,hashlib,importlib.util,json,struct,sys,subprocess,tarfile,tempfile
P=Path(__file__).resolve().parent
H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
def J(p):return json.loads(p.read_text() if p.exists() else gzip.decompress(p.with_name(p.name+'.gz').read_bytes()))
def load(name,path):
 spec=importlib.util.spec_from_file_location(name,path);m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m);return m
def main():
 ap=argparse.ArgumentParser(description=__doc__);ap.add_argument('--runtime',action='store_true');ap.add_argument('--repo',type=Path);a=ap.parse_args()
 assert H(P/'manifest.json')==(P/'MANIFEST.sha256').read_text().split()[0]
 manifest=J(P/'manifest.json');actual={str(p.relative_to(P))for p in P.rglob('*')if p.is_file()and str(p.relative_to(P))not in ['manifest.json','MANIFEST.sha256']};assert actual==set(manifest),'file inventory'
 for n,h in manifest.items():assert H(P/n)==h,n
 source=J(P/'inputs/corrected-source-sha256.json');base=J(P/'inputs/baseline-source-sha256.json');assert len(source)==26 and set(source)==set(base)
 assert {n for n in source if source[n]!=base[n]}=={'programs/pump-fees/src/sharing_update.rs'}
 assert source['programs/pump-fees/src/sharing_update.rs']=='94a11c22bc952b060119212b7982e638f8faf56af5e565e15234f88283766956'
 assert all(H(P/'source'/n)==h for n,h in source.items())
 assert source==J(P/'source-review/proposed-source-sha256.json') and base==J(P/'source-review/baseline-source-sha256.json')
 assert H(P/'source-review/manifest.json')=='f5c86d690dd1b0c78364cc3809439a276e524b093753f1cbbd8d0e6a4c09052d'
 subprocess.run([sys.executable,'-B',str(P/'source-review/verify.py')],check=True,stdout=subprocess.PIPE,text=True)
 if a.repo:
  assert all(H(a.repo.resolve()/n)==h for n,h in base.items()),'current main no longer equals recorded baseline'
 report=J(P/'build-01/build-comparison.json');attempt=J(P/'build-01/build-attempt.json');result=J(P/'build-result.json')
 assert report['source_sha256']==attempt['source_sha256']==attempt['source_after_sha256']==source
 assert attempt['returncode']==result['returncode']==0 and result['source_before']==result['source_after']==source and not result['backend_stack_diagnostics']
 assert H(P/'build-01/build.log')==report['build_log_sha256']==attempt['build_log_sha256']
 assert J(P/'inputs/dependency-before.json')==J(P/'dependency-after.json')
 payload=J(P/'inputs/dependency-before.json');cache=J(P/'inputs/cache-integrity.json')
 for pkg in cache['packages']:
  for ar in pkg['archives']:assert payload[str(Path(ar['path']).relative_to(cache['cache']))]==ar['sha256']
  for s in pkg['extracted_sources']:
   for n,h in s['files_sha256'].items():assert payload[str((Path(s['path'])/n).relative_to(cache['cache']))]==h
 tools=J(P/'inputs/tools-before.json');phase=J(P/'tool-phase-provenance.json')
 assert phase['candidate_sha256']==H(P/'candidate.so')=='e5c811e2a66b540f25b44d9a55dd7b890e7ff01a0074dfc0d0dfc25237c391fe'
 assert phase['symbols_sha256']==H(P/'symbols.so')=='336f49a8075c87efe2eead28290793823a6b5bf004fe000b82b27981ae6ce501'
 assert {n:v['sha256']for n,v in phase['compile'].items()}=={n:v['sha256']for n,v in tools['compile_tools'].items()}
 assert phase['strip']['sha256']==tools['strip_tool']['sha256'] and phase['sdk_files']==tools['sdk_template_files']==report['sdk_source_sha256']
 for v in [*tools['compile_tools'].values(),tools['strip_tool'],tools['cli']]:assert result['tool_after'][v['resolved_path']]==v['sha256']
 for n,h in tools['helper_files'].items():assert H(P/'source'/n)==h
 with tarfile.open(P/'sbf-sdk-snapshot.tar.gz','r:gz') as tf:
  sdk={m.name:hashlib.sha256(tf.extractfile(m).read()).hexdigest()for m in tf.getmembers()if m.isfile()}
 assert sdk==tools['sdk_template_files']
 with tarfile.open(P/'build-helper-snapshot.tar.gz','r:gz')as tf:
  helpers={m.name:hashlib.sha256(tf.extractfile(m).read()).hexdigest()for m in tf.getmembers()if m.isfile()}
 assert helpers==tools['helper_files']
 for n,h in J(P/'prebuild-manifest-sha256.json').items():assert H(P/n)==h
 for group,m in J(P/'runtime-frozen-inputs.json').items():
  for n,h in m.items():assert H(P/'runner-repo'/n)==h
 before=J(P/'runtime-engine-before.json');after=J(P/'runtime-engine-after.json')
 assert {k:v for k,v in before.items()if k!='scope'}=={k:v for k,v in after.items()if k!='scope'}
 assert J(P/'validation-layer/corrected-source-sha256.json')==source
 for n,h in J(P/'validation-layer/source-binding-update.json')['harness_sha256'].items():assert H(P/'validation-layer/harness'/n)==h
 assert H(P/'validation-layer/cases.json')=='c1add9689c3ff4e3621bce49d5248b9c9bb5ef5acb718cb2ab4222fda7e3fdd9'
 inspection=load('inspection',P/'reference/inspect_candidate.py')
 for n,v in inspection.run().items():assert J(P/'reference'/n)==v,n
 retained=load('retained',P/'reference/verify_retained.py');assert J(P/'reference/retained-static-gate.json')==retained.run()
 legacy=load('legacy',P/'inspect_legacy.py')
 for n,v in legacy.run().items():assert J(P/n)==v,n
 control=load('control',P/'check_control_witnesses.py');assert J(P/'legacy-control-witnesses.json')==control.run()
 social=load('social',P/'check_retained_social.py');assert J(P/'retained-social.json')==social.run()
 update=J(P/'static-replay-update.json');assert update['final_static_container_sha256']==H(P/'legacy-static-proof.json.gz') and update['new_method_sha256']==H(P/'inspect_legacy.py')
 assert update['pre_execution_static_sha256']==J(P/'static-gate.json')['legacy_static_sha256']
 x=(P/'reference/analysis-method/inputs/original.so').read_bytes();y=(P/'candidate.so').read_bytes();cmp=report['comparison'];assert cmp['original_sha256']==hashlib.sha256(x).hexdigest()and cmp['candidate_sha256']==H(P/'candidate.so');assert cmp['full_byte_equality']==(x==y)==False
 assert cmp['different_positions_in_shared_length']==sum(a!=b for a,b in zip(x,y))and cmp['length_difference']==len(y)-len(x)
 full=J(P/'complete-byte-comparison.json');cursor=0
 for start,end,equal in full['shared_byte_runs_start_end_equal']:
  assert start==cursor and start<end and all((a==b)==equal for a,b in zip(x[start:end],y[start:end]));cursor=end
 assert cursor==min(len(x),len(y))
 runtime=None
 if a.runtime:
  from solders.transaction import VersionedTransaction
  prior=load('prior_saved',P/'verify_prior_saved.py');assert prior.RESULT['comparison_receipts']==17441
  focused=J(P/'runtime/focused20.json');assert focused['case_count']==20 and not focused['mismatches']and focused['source_sha256']==source and focused['candidate_sha256']==H(P/'candidate.so')
  assert focused['build_record']==report and focused['build_record_sha256']==H(P/'build-01/build-comparison.json')
  assert focused['runtime']=={'signature_verification':True,'blockhash_check':True,'history':'default enabled; fresh VM per case'}
  sys.path.insert(0,str(P/'validation-layer/harness'));from assertions import comparable,check_expected
  count=0
  for row in focused['cases']:
   assert row['match']and not row['mismatches']and not any(row['expected_failures'].values())
   assert comparable(row['original'],focused['roles']['PROGRAM']['str'])==comparable(row['candidate'],focused['roles']['PROGRAM']['str'])
   for side in ['original','candidate']:
    assert not check_expected(row[side],row['case'],focused['roles'])
    raw=base64.b64decode(row[side]['transaction_base64']);tx=VersionedTransaction.from_bytes(raw);assert bytes(tx)==raw and all(tx.verify_with_results());count+=len(tx.signatures)
  assert count==80
  from check_retained_diagnostics import check
  with tempfile.TemporaryDirectory()as t:
   f=Path(t)/'differential.json';f.write_bytes(gzip.decompress((P/'runtime/differential.json.gz').read_bytes()));diagnostics=check(f)
  assert len(diagnostics['rows'])==11 and not diagnostics['mismatches']
  progress=J(P/'runtime/progress.json');assert len(progress)==11 and all(x['returncode']==0 and x['passed']for x in progress)
  for row in progress:
   raw=gzip.decompress((P/'runtime'/(row['name']+'.json.gz')).read_bytes());assert hashlib.sha256(raw).hexdigest()==row['report_sha256'];assert row['candidate_sha256']==H(P/'candidate.so')and row['build_report_sha256']==H(P/'build-01/build-comparison.json')
  assert J(P/'runtime/differential.json')['suites']['sharing_update']['case_count']==417
  runtime={'baseline':17441,'focused_repeated_corpus':20,'total_comparisons':17461,'separate_sequence_steps':10,'new_fixtures':0,'focused_verified_signatures':80,'baseline_signature_counts':prior.RESULT,'strict_saved_diagnostics':11,'existing_sharing_rows':417}
 print(json.dumps({'status':'PASS','payloads':len(manifest),'candidate_sha256':H(P/'candidate.so'),'source_inputs':26,'original_windows':585,'candidate_windows':562,'whole_original_equal':False,'runtime':runtime,'new_builds':0,'target_executions':0},sort_keys=True))
if __name__=='__main__':main()
