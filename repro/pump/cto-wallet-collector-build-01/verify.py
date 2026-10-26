"""Portable publication validator. Default: stdlib/hash/saved-metadata only.
No archived controllers, harnesses, compilers, VM, JS or original ELF parser runs.
Optional --crypto executes only the explicitly derived saved-transaction checker.
"""
from pathlib import Path,PurePosixPath
import argparse,base64,difflib,gzip,hashlib,importlib.util,json,sys
P=Path(__file__).resolve().parent;J=lambda p:json.loads(p.read_text());H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
C='6e0c9002d09e0cee6cc738b3a9e0983a8d0cd89374fa2cc7c41fa45910515b9e';U='f09ac5696038d7ee9a2d28767b02cbae5b5504a56086d8baf4019f316b8a0c86';ORIGINAL='7a19affaa2c6187e04a5fe0ea298cee81fa5eb8c24cfcc30d85f615e89f7b02d'
def checks(crypto=False):
 assert __debug__,'Do not use Python -O'
 manifest=J(P/'manifest.json');actual={str(f.relative_to(P))for f in P.rglob('*')if f.is_file()}-{'manifest.json','manifest.sha256'};assert actual==set(manifest)
 for f in P.rglob('*'):assert not f.is_symlink()and f.name!='__pycache__'and f.suffix!='.pyc'
 for n,row in manifest.items():
  q=PurePosixPath(n);assert not q.is_absolute()and'..'not in q.parts
  f=P/n;assert f.stat().st_size==row['bytes']and H(f)==row['sha256'],n
 for name,binding in J(P/'copy-bindings.json').items():
  if 'manifest'not in binding:continue
  folder=P/name;mp=folder/binding['manifest'];assert H(mp)==binding['seal']
  sub=J(mp)
  for n,row in sub.items():
   q=PurePosixPath(n);assert not q.is_absolute()and'..'not in q.parts
   f=folder/n;expected=row['sha256']if isinstance(row,dict)else row;assert H(f)==expected
   if isinstance(row,dict)and'bytes'in row:assert f.stat().st_size==row['bytes']
  members={str(f.relative_to(folder))for f in folder.rglob('*')if f.is_file()};assert members-set(sub)<={binding['manifest'],'manifest.sha256'}
 source=J(P/'build-plan/source-proposed.json');assert len(source)==37 and source==J(P/'source-proposal/source-after.json')==J(P/'preservation-plan/source37.json')
 assert source['programs/pump/src/admin_cto.rs']=='5499f2b14a7ad21ce1a4e5144882230d7bb668fce24fb735803fc78285f0f3a3'
 for n,h in source.items():assert H(P/'build-plan/source'/n)==H(P/'source-proposal/source'/n)==h
 before=J(P/'source-proposal/source-before.json');assert before==J(P/'build-plan/predecessor-source-proposed.json')
 assert[n for n in source if source[n]!=before[n]]==['programs/pump/src/admin_cto.rs']
 selected=J(P/'build-plan/source-baseline.json');assert[n for n in source if source[n]!=selected[n]]==['programs/pump/src/admin_cto.rs']
 assert H(P/'artifacts/candidate.so')==C and(P/'artifacts/candidate.so').stat().st_size==1589176
 assert H(P/'artifacts/unstripped.so')==U and(P/'artifacts/unstripped.so').stat().st_size==2172416
 r=J(P/'build-results/controller-result.json');b=J(P/'build-results/build-01/build-attempt.json');comp=J(P/'build-results/build-01/build-comparison.json')
 assert r['state']=='requires-cache-review'and r['helper_exit']==r['build_sbf_aggregate_exit']==b['returncode']==0
 assert r['compiler_child_exit']is None and r['strip_child_exit']is None and r['source_unchanged']and r['private_cache_existing_unchanged']and r['cache_additions_require_review']
 assert not r['backend_error_lines']and not r['stack_llvm_diagnostics']and r['tool_sdk_before']==r['tool_sdk_after']
 assert r['source_after']==b['source_sha256']==b['source_after_sha256']==comp['source_sha256']==source
 assert r['proposal_manifest']==H(P/'build-plan/MANIFEST.json')
 claim=J(P/'root-observations/cto-wallet-collector-attempt-01.json');assert claim['proposal_manifest']==r['proposal_manifest']and claim['controller_sha256']==H(P/'build-plan/controller.py')and claim['attempts']==1 and claim['candidate']=='UNSELECTED'
 assert H(P/'build-results/build-01/build.log')==b['build_log_sha256']==comp['build_log_sha256']
 assert comp['comparison']['candidate_sha256']==C and comp['comparison']['original_sha256']==ORIGINAL and comp['comparison']['full_byte_equality']is False
 assert H(P/'cache-review/controller-result.json')==H(P/'build-results/controller-result.json')==H(P/'preservation-plan/build-controller-result.json')
 cache=J(P/'cache-review/review.json');assert cache['status']=='PASS_GENERATED_BOOKKEEPING_ONLY_UNSELECTED'and cache['controller_receipt_unchanged']
 terminal=J(P/'root-observations/cto-wallet-collector-build-terminal-observation.json');assert terminal['actual_terminal_controller_exit']==2 and terminal['receipt_not_rewritten']and terminal['rerun_performed']is False
 launches=J(P/'emitted-results/launch-results.json');assert launches['plan_seal']==H(P/'emitted-plan/manifest.json')and len(launches['runs'])==4
 for i,run in enumerate(launches['runs']):
  assert run['returncode']==0
  for kind in ['stdout','stderr']:assert H(P/'emitted-results'/f'run-{i}.{kind}')==run[kind+'_sha256']
 bound_raw=J(P/'emitted-review/input-hashes.json')['raw_outputs'];assert set(bound_raw)=={str(f.relative_to(P/'emitted-results'))for f in(P/'emitted-results').rglob('*')if f.is_file()}
 for n,h in bound_raw.items():assert H(P/'emitted-results'/n)==h
 invs={n:json.loads(gzip.decompress((P/'emitted-results'/(n+'.json.gz')).read_bytes()))for n in ['baseline-before','baseline-after','new-inventory']}
 assert invs['baseline-before']['baseline_replay_match']and invs['baseline-after']['baseline_replay_match']
 ni=invs['new-inventory'];proof=J(P/'emitted-results/candidate-bodies/proof.json');assert ni['candidate_sha256']==proof['candidate_sha256']==C and ni['symbols_sha256']==proof['symbols_sha256']==U
 assert len(ni['original_windows'])==1035 and len(proof['functions'])==23 and proof['source37']==source and proof['collector_named_body_present']
 assert len(proof['prior_function_names_absent_or_renamed'])==1 and'token_raw_amount'in proof['prior_function_names_absent_or_renamed'][0]
 independent=J(P/'emitted-review/review.json');assert independent['status']=='PASS_BOUNDED_EMITTED_COLLECTOR_SEQUENCE'and independent['original1035_vs71ec_strongest_changes']==0 and independent['original1035_vsd75_strongest_changes']==1
 fieldmap=J(P/'shared6093-fieldmap/findings.json');assert fieldmap['named_field_mapping_proven']is False and fieldmap['shared6093_composition_ready']is False
 assert fieldmap['slot136_before_slot72_on_reviewed_success_route']is True and fieldmap['original_control_exported_payloads']==39 and fieldmap['original1b_manifest_payloads']==47 and len(fieldmap['original1b_nonbody_payloads_not_exported'])==8
 # Hash all15 retained input files; captured ELF payloads are opaque bytes only.
 inputs=J(P/'preservation-plan/inputs.json');assert len(inputs)==15
 assert set(inputs)=={str(f.relative_to(P/'preservation-plan/repo'))for f in(P/'preservation-plan/repo').rglob('*')if f.is_file()}
 for n,h in inputs.items():assert H(P/'preservation-plan/repo'/n)==h
 receipt=J(P/'preservation-results/receipt.json');exit=J(P/'preservation-results/exit.json');signed=J(P/'preservation-results/independent-saved-signatures.json');launch=J(P/'preservation-results/launch.json')
 assert exit['returncode']==0 and exit['passed']and exit['receipt_valid']and exit['inputs_unchanged']and exit['case_assertions_unchanged']and exit['new_cases']==exit['new_fixtures']==0
 assert receipt['candidate_sha256']==exit['candidate_sha256']==C and receipt['original_sha256']==ORIGINAL
 assert receipt['case_count']==exit['case_count']==len(receipt['cases'])==363 and receipt['mismatches']==exit['mismatches']==[]
 for n in ['stdout.log','stderr.log','receipt.json']:assert H(P/'preservation-results'/n)==exit[n.replace('.','_')+'_sha256']
 successes=0;txs=0;sigs=0
 for row in receipt['cases']:
  assert row['match']and row['original']['case']==row['case']==row['candidate']['case']
  for k in ['error','before','after','events','inner','return']:assert row['original'][k]==row['candidate'][k]
  successes+=row['original']['error']is None
  for side in ['original','candidate']:
   saved=signed['rows'][txs];item=row[side];raw=base64.b64decode(item['transaction_base64'],validate=True)
   assert saved['case']==row['case']['name']and saved['side']==side and saved['transaction_sha256']==hashlib.sha256(raw).hexdigest()
   assert saved['all_verified']and saved['top_level_pool_authority_signer']is False and item['signatures_verified']and item['pool_authority_top_level_signer']is False
   txs+=1;sigs+=saved['signatures']
 assert successes==signed['original_successes']==169 and txs==signed['transaction_count']==726 and sigs==signed['signature_fields']==1448
 obs=J(P/'root-observations/cto-wallet-collector-preservation-terminal-observation.json');assert obs['controller_actual_terminal_exit']==obs['independent_saved_signature_verifier_actual_exit']==0 and obs['signature_result_sha256']==H(P/'preservation-results/independent-saved-signatures.json')
 # Authenticate the EXACT three declared adapter replacements, not an arbitrary edited checker.
 adapter=J(P/'portable-crypto-adapter.json');old=(P/adapter['original_checker']).read_text();new=old
 assert H(P/adapter['original_checker'])==adapter['original_sha256']
 for replacement in adapter['replacements']:
  assert new.count(replacement['before'])==1;new=new.replace(replacement['before'],replacement['after'])
 assert len(adapter['replacements'])==3 and(P/adapter['derived_checker']).read_text()==new and H(P/adapter['derived_checker'])==adapter['derived_sha256']
 assert(P/'portable-crypto-adapter.diff').read_text()==''.join(difflib.unified_diff(old.splitlines(True),new.splitlines(True),fromfile=adapter['original_checker'],tofile=adapter['derived_checker']))
 cmd=launch['command'];recorded_repo=str(Path(cmd[2]).parents[1]);recorded_candidate=cmd[cmd.index('--candidate')+1]
 assert adapter['recorded_repo_prefix']==recorded_repo and adapter['recorded_candidate_path']==recorded_candidate
 expected={recorded_repo+'/'+n:{'packaged':'preservation-plan/repo/'+n,'sha256':h}for n,h in inputs.items()if n!='research/imported-lab/analysis/pump_fun/config-snapshot.json'};expected[recorded_candidate]={'packaged':'artifacts/candidate.so','sha256':C}
 assert adapter['recorded_provenance_bindings']==expected and receipt['provenance']=={n:r['sha256']for n,r in expected.items()}
 for row in expected.values():assert H(P/row['packaged'])==row['sha256']
 assert not[n for n,row in manifest.items()if row['bytes']>50*1024*1024]
 crypto_status='NOT_RERUN_DEFAULT_SAVED_OBSERVATIONS_ONLY'
 if crypto:
  import importlib.metadata
  assert sys.version_info[:2]==(3,12)and importlib.metadata.version('solders')=='0.27.1'
  spec=importlib.util.spec_from_file_location('declared_portable_saved_crypto',P/'portable_verify_results.py');module=importlib.util.module_from_spec(spec);spec.loader.exec_module(module)
  observed=module.verify_results(P/'preservation-results');assert observed==signed;crypto_status=observed['status']
 return {'state':'PASS_PORTABLE_PASSIVE_COLLECTOR_PUBLICATION','payload_files':len(manifest),'payload_bytes':sum(x['bytes']for x in manifest.values()),'largest_payload_bytes':max(x['bytes']for x in manifest.values()),'files_over_50MiB':[n for n,r in manifest.items()if r['bytes']>50*1024*1024],'candidate_disposition':'UNSELECTED','candidate_sha256':C,'source37_bound':True,'saved_case_count':363,'saved_original_successes':169,'saved_transactions':726,'saved_signature_fields':1448,'crypto_replay':crypto_status,'target_runtime_compiler_or_original_decoder_invocations':0,'whole_original_byte_identity':False,'shared6093_composed':False}
def main():
 ap=argparse.ArgumentParser();ap.add_argument('--expected-seal',required=True);ap.add_argument('--crypto',action='store_true');a=ap.parse_args();sys.dont_write_bytecode=True
 assert H(P/'manifest.json')==a.expected_seal and(P/'manifest.sha256').read_text().strip()==a.expected_seal
 print(json.dumps(checks(a.crypto),indent=2))
if __name__=='__main__':main()
