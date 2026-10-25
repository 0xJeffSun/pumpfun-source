#!/usr/bin/env python3
"""Portable static and saved-runtime checks; never compiles or submits transactions."""
from pathlib import Path
import argparse,base64,gzip,hashlib,importlib.util,json,struct,sys
P=Path(__file__).resolve().parent
H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
def J(p):return json.loads(p.read_text()if p.exists()else gzip.decompress(p.with_name(p.name+'.gz').read_bytes()))
def load(name,path):
 spec=importlib.util.spec_from_file_location(name,path);m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m);return m
def main():
 ap=argparse.ArgumentParser(description=__doc__);ap.add_argument('--runtime',action='store_true');args=ap.parse_args()
 assert H(P/'manifest-sha256.json')==(P/'MANIFEST.sha256').read_text().split()[0]
 manifest=J(P/'manifest-sha256.json');actual={str(p.relative_to(P))for p in P.rglob('*')if p.is_file()and str(p.relative_to(P))not in['manifest-sha256.json','MANIFEST.sha256']};assert actual==set(manifest)
 for n,x in manifest.items():assert H(P/n)==x['sha256']and(P/n).stat().st_size==x['bytes'],n
 source=J(P/'inputs/corrected-source-sha256.json');base=J(P/'inputs/baseline-source-sha256.json');assert len(source)==26 and set(source)==set(base)
 assert{n for n in source if source[n]!=base[n]}=={'programs/pump-fees/src/sharing_update.rs','programs/pump-fees/src/social.rs','programs/pump-fees/src/instructions/fee_sharing/mod.rs'}
 assert all(H(P/'source'/n)==h for n,h in source.items())
 assert H(P/'source/programs/pump-fees/src/sharing_update.rs')==J(P/'inputs/legacy-proposal/proposal.json')['proposals']['after_parallel']['new_sha256']
 for n,x in J(P/'inputs/social-proposal/proposal-source-map.json').items():assert base[n]==x['before_sha256']and source[n]==x['after_sha256']
 accepted=J(P/'inputs/accepted-manifest.json');assert H(P/'inputs/accepted/candidate.so')==accepted['candidate.so'];assert H(P/'inputs/accepted/symbols.so')==accepted['symbols.so'];assert H(P/'inputs/baseline-source-sha256.json')==accepted['inputs/corrected-source-sha256.json']
 report=J(P/'build-01/build-comparison.json');attempt=J(P/'build-01/build-attempt.json');result=J(P/'build-result.json')
 assert report['source_sha256']==attempt['source_sha256']==attempt['source_after_sha256']==source
 assert attempt['returncode']==result['returncode']==0 and result['source_before']==result['source_after']==source and not result['backend_stack_diagnostics']
 assert H(P/'build-01/build.log')==report['build_log_sha256']==attempt['build_log_sha256']
 assert J(P/'inputs/dependency-before.json')==J(P/'dependency-after.json')
 payload=J(P/'inputs/dependency-before.json');cache=J(P/'inputs/cache-integrity.json')
 for pkg in cache['packages']:
  for a in pkg['archives']:assert payload[str(Path(a['path']).relative_to(cache['cache']))]==a['sha256']
  for s in pkg['extracted_sources']:
   for n,h in s['files_sha256'].items():assert payload[str((Path(s['path'])/n).relative_to(cache['cache']))]==h
 tools=J(P/'inputs/tools-before.json');phase=J(P/'tool-phase-provenance.json')
 assert phase['candidate_sha256']==H(P/'candidate.so')and phase['symbols_sha256']==H(P/'symbols.so')
 assert {n:v['sha256']for n,v in phase['compile'].items()}=={n:v['sha256']for n,v in tools['compile_tools'].items()}
 assert phase['strip']['sha256']==tools['strip_tool']['sha256'];assert phase['sdk_files']==tools['sdk_template_files']==report['sdk_source_sha256']
 for v in [*tools['compile_tools'].values(),tools['strip_tool'],tools['cli']]:assert result['tool_after'][v['resolved_path']]==v['sha256']
 for n,h in J(P/'inputs/build-helper-sha256.json').items():assert H(P/'source'/n)==h
 for name,rows in J(P/'runtime-frozen-inputs.json').items():
  for n,h in rows.items():assert H(P/'runner-repo'/n)==h
 for group,rows in J(P/'inputs/runtime-copy-bindings.json').items():
  if group in ['runner_repo','focused_layer']:
   root=P/('runner-repo'if group=='runner_repo'else'validation-layer')
   for n,h in rows.items():assert H(root/n)==h
 inspection=load('inspection',P/'reference/inspect_candidate.py')
 for n,v in inspection.run().items():assert J(P/n)==v,n
 added=load('added',P/'inspect_added.py');assert J(P/'added-static-proof.json')==json.loads(json.dumps(added.run()))
 retained=load('retained',P/'reference/verify_retained.py');assert J(P/'retained-static-gate.json')==retained.run()
 a=(P/'reference/analysis-method/inputs/original.so').read_bytes();b=(P/'candidate.so').read_bytes();cmp=report['comparison'];assert cmp['original_sha256']==hashlib.sha256(a).hexdigest()and cmp['candidate_sha256']==H(P/'candidate.so');assert cmp['full_byte_equality']==(a==b)==False
 assert cmp['different_positions_in_shared_length']==sum(x!=y for x,y in zip(a,b))and cmp['length_difference']==len(b)-len(a)
 full=J(P/'complete-byte-comparison.json');cursor=0
 for start,end,equal in full['shared_byte_runs_start_end_equal']:
  assert start==cursor and start<end and all((x==y)==equal for x,y in zip(a[start:end],b[start:end]));cursor=end
 assert cursor==min(len(a),len(b))
 runtime=None
 if args.runtime:
  from solders.transaction import VersionedTransaction
  prior=load('prior_saved',P/'verify_prior_saved.py');assert prior.RESULT['comparison_receipts']==17441
  focused=J(P/'runtime/focused20.json');assert focused['case_count']==20 and not focused['mismatches']and focused['source_sha256']==source and focused['candidate_sha256']==H(P/'candidate.so')
  assert focused['build_record']==report and focused['build_record_sha256']==H(P/'build-01/build-comparison.json')
  assert focused['runtime']=={'signature_verification':True,'blockhash_check':True,'history':'default enabled; fresh VM per case'}
  count=0
  for row in focused['cases']:
   assert row['match']and not row['mismatches']and not any(row['expected_failures'].values())
   for side in ['original','candidate']:
    raw=base64.b64decode(row[side]['transaction_base64']);tx=VersionedTransaction.from_bytes(raw);assert bytes(tx)==raw and all(tx.verify_with_results());count+=len(tx.signatures)
  assert count==80
  sys.path.insert(0,str(P/'validation-layer/harness'));from check_retained_diagnostics import check
  # This unmodified checker takes a plain JSON filename; decompress to a
  # temporary file, never rewrite published evidence or its assertions.
  import tempfile
  with tempfile.TemporaryDirectory()as t:
   f=Path(t)/'differential.json';f.write_bytes(gzip.decompress((P/'runtime/differential.json.gz').read_bytes()));diagnostics=check(f)
  assert len(diagnostics['rows'])==11 and not diagnostics['mismatches']
  progress=J(P/'runtime/progress.json');assert len(progress)==11 and all(x['returncode']==0 and x['passed']for x in progress)
  for row in progress:
   raw=gzip.decompress((P/'runtime'/(row['name']+'.json.gz')).read_bytes());assert hashlib.sha256(raw).hexdigest()==row['report_sha256'];assert row['candidate_sha256']==H(P/'candidate.so')and row['build_report_sha256']==H(P/'build-01/build-comparison.json')
  runtime={'baseline':17441,'focused_repeated_corpus':20,'total_comparisons':17461,'separate_sequence_steps':10,'new_fixtures':0,'focused_verified_signatures':80,'baseline_signature_counts':prior.RESULT,'strict_saved_diagnostics':11}
 print(json.dumps({'status':'PASS','payloads':len(manifest),'candidate_sha256':H(P/'candidate.so'),'source_inputs':26,'original_windows':585,'candidate_windows':547,'whole_original_equal':False,'runtime':runtime,'new_builds':0,'target_executions':0},sort_keys=True))
if __name__=='__main__':main()
