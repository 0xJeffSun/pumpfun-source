"""Publish an allowlisted main-build proof package without reading generated keypairs."""
from pathlib import Path
import gzip,hashlib,json
W=Path(__file__).resolve().parent;R=W.parents[1];B=W/'main-build-01';S=W/'handoff';P=R/'repro/pump_amm/update-event-borrow-v144';P.mkdir(exist_ok=False);sha=lambda b:hashlib.sha256(b).hexdigest()
def copy(src,rel):
 rel=Path(rel);assert not rel.is_absolute()and '..'not in rel.parts and not any(x.endswith('-keypair.json')for x in rel.parts);assert not src.is_symlink()and not src.name.endswith('-keypair.json');dst=P/rel;dst.parent.mkdir(parents=True,exist_ok=True);dst.write_bytes(src.read_bytes())
def compress(src,rel):
 assert not src.name.endswith('-keypair.json');dst=P/rel;dst.parent.mkdir(parents=True,exist_ok=True)
 with dst.open('wb')as f:
  with gzip.GzipFile(filename='',mode='wb',fileobj=f,mtime=0)as z:z.write(src.read_bytes())
m=json.loads((S/'manifest.json').read_text())
assert sha((S/'manifest.json').read_bytes())=='ba22d964ab754b253110407cf17a386fdf822b05a6197d159ba1b3e2c158bc5a'
for rel,row in m['files'].items():
 assert not Path(rel).name.endswith('-keypair.json');assert sha((S/rel).read_bytes())==row['sha256'];copy(S/rel,'scratch/'+rel)
copy(S/'manifest.json','scratch/manifest.json')
for name in ['build-attempt.json','build-comparison.json']:copy(B/name,name)
compress(B/'build.log','build.log.gz');copy(B/'artifacts/pump_amm_recovered.so','candidate.so');copy(B/'target/sbf-solana-solana/release/pump_amm_recovered.so','unstripped.so');copy(B/'target/.rustc_info.json','rustc_info.json')
for src,dst in [('main-toolchain-phases.json','toolchain-phases.json'),('main-scratch-identity.json','main-scratch-identity.json'),('main-build-invocation.log','main-build-invocation.log'),('main-promotion-inputs-before.json','promotion-inputs-before.json'),('verify_publication.py','verify.py'),('static_compare_main.py','static_compare.py'),('verify_serializers_main.py','verify_serializers.py'),('verify_update_data_main.py','verify_update_data.py'),('verify_copy_and_negatives.py','verify_copy_and_negatives.py'),('record_main_phases.py','record_main_phases.py'),('package_main.py','package_main.py')]:copy(W/src,dst)
for name in ['scripts/strip.sh','scripts/install.sh','env.sh']:copy(B/'sdk'/name,'sdk-scripts/'+name)
for name in ['build_partial_candidate.py','build_source_manifest.py','compare.py','analyze.py']:copy(R/'scripts'/name,'build-helper-snapshot/scripts/'+name)
build=json.loads((B/'build-comparison.json').read_text());assert len(build['source_sha256'])==22
for path,h in build['source_sha256'].items():assert sha((R/path).read_bytes())==h;copy(R/path,'source/'+path)
copy(R/'programs/pump-amm/README.md','source/programs/pump-amm/README.md')
run=json.loads((S/'runtime-01/run.json').read_text());bindings=[];prefix='repro/pump_amm/update-event-borrow-v144/'
for row in sorted(run,key=lambda x:x['suite']):
 name=row['suite'];copy(S/'runtime-01'/(name+'.json.gz'),name+'-differential.json.gz')
 bindings.append({'suite':name,'cases':row['case_count'],'receipt':prefix+name+'-differential.json.gz','receipt_uncompressed_sha256':row['receipt_sha256'],'scratch_transactions':prefix+'scratch/runtime-01/'+name+'-transactions.json.gz','transaction_sidecar_sha256':row['transaction_sidecar_sha256'],'main_source_sha256':build['source_sha256'],'main_build_report_sha256':sha((P/'build-comparison.json').read_bytes()),'identity_report_sha256':sha((P/'main-scratch-identity.json').read_bytes()),'runtime_execution':'Saved scratch corpus reused only by complete main/scratch ELF identity. No main replay or initializer success fixture. Embedded legacy maps describe the accepted 22-input 807010 pre-promotion checkout, not the event-borrow main/scratch compilation.'})
(P/'main-receipt-bindings.json').write_text(json.dumps(bindings,indent=2)+'\n')
status=json.loads((R/'repro/status.json').read_text())['pump_amm'];assert len(status['implemented_handlers'])==37 and status['validated_cases']==17462
status.update(candidate_artifact=prefix+'candidate.so',comparison_report=prefix+'build-comparison.json',build_log=prefix+'build.log.gz',validation_reports=[b['receipt']for b in bindings],candidate_build_identity_report=prefix+'main-scratch-identity.json',prior_checkpoint='repro/pump_amm/create-config-shared-methods-v144',global_config_serialization_report=prefix+'function-match.json',pool_serialization_report=prefix+'function-match.json',scalar_guard_order_report=prefix+'README.md',scalar_compared_value_report=prefix+'scratch/scalar-diagnostics.json',scalar_existing_cases_with_stricter_assertions=191,recipient_error_output_report=prefix+'scratch/recipient-diagnostics.json',recipient_existing_cases_with_stricter_assertions=78,signature_evidence_report=prefix+'scratch/receipt-bindings.json.gz',verified_transaction_signatures=35418,existing_fixture_setup_transactions=150,handler_codegen_match=True,handler_codegen_match_scope='Complete normalized update_fee_config body only; immediate target closure remains12/16 and metadata incomplete.',update_fee_config_static_report=prefix+'static-comparison.json',update_fee_config_data_report=prefix+'update-data-comparison.json',update_fee_config_event_borrow_report=prefix+'README.md',static_only_handlers=['create_config'],create_config_runtime_successes=0,create_config_source_report='repro/pump_amm/create-config-shared-methods-v144/scratch/prebuild/REPORT.md',create_config_static_comparison_report=prefix+'static-comparison.json',create_config_validation='compiled_static_only_no_authentic_success')
(P/'status-pump_amm.json').write_text(json.dumps(status,indent=2)+'\n')
inputs=json.loads((S/'runtime-01/inputs-before.json').read_text());current={'compiled_source':build['source_sha256'],'program_documentation':{'programs/pump-amm/README.md':sha((R/'programs/pump-amm/README.md').read_bytes())},'build_helpers':{str(Path('scripts')/n):sha((R/'scripts'/n).read_bytes())for n in ['build_partial_candidate.py','build_source_manifest.py','compare.py','analyze.py']},'maintained_harness':{p:h for p,h in inputs['harness'].items()if p.startswith('scripts/')},'runtime_inputs':inputs['runtime']}
for mapping in current.values():
 for p,h in mapping.items():assert sha((R/p).read_bytes())==h,p
(P/'current-main-bindings.json').write_text(json.dumps(current,indent=2)+'\n')
copy(W/'publication-readme.md','README.md')
print(json.dumps({'package':str(P),'payload_files_before_static_seal':sum(1 for p in P.rglob('*')if p.is_file())},indent=2))
