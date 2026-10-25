"""Publish an allowlisted main-build proof package without reading generated keypairs."""
from pathlib import Path
import gzip,hashlib,json
W=Path(__file__).resolve().parent;R=W.parents[1];B=W/'main-build-01';S=W/'handoff';P=R/'repro/pump_amm/create-config-shared-methods-v144';P.mkdir(exist_ok=False);sha=lambda b:hashlib.sha256(b).hexdigest()
def copy(src,rel):
 rel=Path(rel);assert not rel.is_absolute()and '..'not in rel.parts and not any(x.endswith('-keypair.json')for x in rel.parts);assert not src.is_symlink()and not src.name.endswith('-keypair.json');dst=P/rel;dst.parent.mkdir(parents=True,exist_ok=True);dst.write_bytes(src.read_bytes())
def compress(src,rel):
 assert not src.name.endswith('-keypair.json');dst=P/rel;dst.parent.mkdir(parents=True,exist_ok=True)
 with dst.open('wb')as f:
  with gzip.GzipFile(filename='',mode='wb',fileobj=f,mtime=0)as z:z.write(src.read_bytes())
m=json.loads((S/'manifest.json').read_text())
assert sha((S/'manifest.json').read_bytes())=='e8c4409a74d83e3e33c8a0bc44d7430b6bd92fbe2b230c4de425400410e78d0b'
for rel,row in m['files'].items():
 assert not Path(rel).name.endswith('-keypair.json');assert sha((S/rel).read_bytes())==row['sha256'];copy(S/rel,'scratch/'+rel)
copy(S/'manifest.json','scratch/manifest.json')
for name in ['build-attempt.json','build-comparison.json']:copy(B/name,name)
compress(B/'build.log','build.log.gz');copy(B/'artifacts/pump_amm_recovered.so','candidate.so');copy(B/'target/sbf-solana-solana/release/pump_amm_recovered.so','unstripped.so');copy(B/'target/.rustc_info.json','rustc_info.json')
for src,dst in [('main-toolchain-phases.json','toolchain-phases.json'),('main-scratch-identity.json','main-scratch-identity.json'),('main-build-invocation.log','main-build-invocation.log'),('main-promotion-inputs-before.json','promotion-inputs-before.json'),('verify_publication.py','verify.py'),('static_compare_main.py','static_compare.py'),('verify_serializers_main.py','verify_serializers.py'),('record_main_phases.py','record_main_phases.py'),('package_main.py','package_main.py')]:copy(W/src,dst)
for name in ['scripts/strip.sh','scripts/install.sh','env.sh']:copy(B/'sdk'/name,'sdk-scripts/'+name)
for name in ['build_partial_candidate.py','build_source_manifest.py','compare.py','analyze.py']:copy(R/'scripts'/name,'build-helper-snapshot/scripts/'+name)
build=json.loads((B/'build-comparison.json').read_text());assert len(build['source_sha256'])==22
for path,h in build['source_sha256'].items():assert sha((R/path).read_bytes())==h;copy(R/path,'source/'+path)
copy(R/'programs/pump-amm/README.md','source/programs/pump-amm/README.md')
run=json.loads((S/'runtime-01/run.json').read_text());bindings=[];prefix='repro/pump_amm/create-config-shared-methods-v144/'
for row in sorted(run,key=lambda x:x['suite']):
 name=row['suite'];copy(S/'runtime-01'/(name+'.json.gz'),name+'-differential.json.gz')
 bindings.append({'suite':name,'cases':row['case_count'],'receipt':prefix+name+'-differential.json.gz','receipt_uncompressed_sha256':row['receipt_sha256'],'scratch_transactions':prefix+'scratch/runtime-01/'+name+'-transactions.json.gz','transaction_sidecar_sha256':row['transaction_sidecar_sha256'],'main_source_sha256':build['source_sha256'],'main_build_report_sha256':sha((P/'build-comparison.json').read_bytes()),'identity_report_sha256':sha((P/'main-scratch-identity.json').read_bytes()),'runtime_execution':'Saved scratch corpus reused only by complete main/scratch ELF identity. No main replay or initializer success fixture. Embedded legacy maps describe the accepted18-input pre-promotion checkout, not either22-input compilation.'})
(P/'main-receipt-bindings.json').write_text(json.dumps(bindings,indent=2)+'\n')
status=json.loads((R/'repro/status.json').read_text())['pump_amm'];assert len(status['implemented_handlers'])==37 and status['validated_cases']==17462
status.update(candidate_artifact=prefix+'candidate.so',comparison_report=prefix+'build-comparison.json',build_log=prefix+'build.log.gz',validation_reports=[b['receipt']for b in bindings],candidate_build_identity_report=prefix+'main-scratch-identity.json',prior_checkpoint='repro/pump_amm/scalar-guard-order-v144',global_config_serialization_report=prefix+'function-match.json',pool_serialization_report=prefix+'function-match.json',scalar_guard_order_report=prefix+'README.md',scalar_compared_value_report=prefix+'scratch/scalar-diagnostics.json',scalar_existing_cases_with_stricter_assertions=191,recipient_error_output_report=prefix+'scratch/recipient-diagnostics.json',recipient_existing_cases_with_stricter_assertions=78,signature_evidence_report=prefix+'scratch/receipt-bindings.json.gz',verified_transaction_signatures=35418,existing_fixture_setup_transactions=150,handler_codegen_match=False,static_only_handlers=['create_config'],create_config_runtime_successes=0,create_config_source_report=prefix+'scratch/prebuild/REPORT.md',create_config_static_comparison_report=prefix+'static-comparison.json',create_config_validation='compiled_static_only_no_authentic_success')
(P/'status-pump_amm.json').write_text(json.dumps(status,indent=2)+'\n')
inputs=json.loads((S/'runtime-01/inputs-before.json').read_text());current={'compiled_source':build['source_sha256'],'program_documentation':{'programs/pump-amm/README.md':sha((R/'programs/pump-amm/README.md').read_bytes())},'build_helpers':{str(Path('scripts')/n):sha((R/'scripts'/n).read_bytes())for n in ['build_partial_candidate.py','build_source_manifest.py','compare.py','analyze.py']},'maintained_harness':{p:h for p,h in inputs['harness'].items()if p.startswith('scripts/')},'runtime_inputs':inputs['runtime']}
for mapping in current.values():
 for p,h in mapping.items():assert sha((R/p).read_bytes())==h,p
(P/'current-main-bindings.json').write_text(json.dumps(current,indent=2)+'\n')
(P/'README.md').write_text('''# AMM create-config/shared-method checkpoint

The exact reviewed source adds `create_config`, its account context and event, and the four original shared GlobalConfig methods. The initializer retains its genuine fixed administrator and canonical PDA/account constraints. It is **compiled with static-only evidence**: no authentic successful initializer replay, signer substitution or altered historical message was introduced. The count remains **37 bounded handlers, 25 suites and 17,462 existing comparisons**.

The clean main executable is **1,199,296 bytes**, SHA-256 `807010828fe3b4124b5e20c34ca627582e1718e9c5849bf0c15309983d4088b2`. Its complete bytes equal the tested scratch executable. Both clean builds bind their own actual22-input source manifests; `main-scratch-identity.json` and `main-receipt-bindings.json` justify reusing the complete saved corpus without another runtime replay. Direct per-suite receipts support the existing central verifier schema. `status-pump_amm.json` is a proposed replacement entry; central integration remains separate.

All17,462 comparisons passed. Saved-evidence verification checks35,418 signatures,191 stricter existing scalar rejection cases and78 stricter recipient rejection cases. The recipient setter restores the original plain error diagnostics without extra public-key Left/Right output. There are34,924 comparison transactions plus150 pre-existing signed original-program boost setup transactions; setup does not increase the case count. The original18-input checkout maps embedded in legacy receipts remain unchanged and explicitly historical. The actual22-input compiler maps establish the compiled sources.

Fresh complete normalized matches cover the create wrapper, handler, account parser and event serializer, plus the update wrapper. Among the six initializer roots,107 of112 immediate direct targets match completely. The init helper differs in two truthful source-coordinate immediates and the recipient setter in four; source filenames also differ. The three scalar methods remain608 bytes versus616 original bytes. The update handler is3,160 versus2,912 original bytes, and the actual scalar error helper retains four specialization differences. All four methods have the real create/update callers. That call graph alone does not reproduce original codegen. Eleven compiler panic/format/I/O references remain outside recursive data closure. Full ELF equality is **false**, and the audit remains incomplete.

`static-comparison.json` recomputes the main candidate's symbol/body/call/data evidence. `function-match.json` independently confirms the complete Pool and GlobalConfig exits, their24 direct targets each and eight-byte discriminators at fresh main-symbol locations. The frozen293-file scratch package retains the reviewed source proposal, baseline/history evidence, compile/dependency provenance, unchanged harness/runtime inputs, all receipts/logs/signed sidecars and precise residuals. Earlier published packages and seals remain intact.

Compilation uses the unchanged pinned v1.44 recipe; the installed SDK's separate unchanged v1.52 strip phase is recorded independently. SDK, rustup and target are isolated. Program README was finalized before main compilation. No generated deployment keypair was opened, hashed, copied or archived; only its path metadata is retained.

Run `python3 verify.py` with `solders==0.27.1` for portable saved-evidence verification. Use `python3 verify.py --current-main` in a repository checkout, or add `--repo /path/to/repository` when verifying a separate package copy, to check live source/documentation/helpers/harness/runtime hashes. Verification reads artifacts and independently checks signatures; it performs no build, replay, Surfpool launch or network access. See `verification-copy-and-negatives.json` for verification from a separate copy and missing-file/tamper rejection checks.
'''.replace('actual22','actual 22').replace('All17,','All 17,').replace('checks35,','checks 35,').replace('signatures,191','signatures, 191').replace('and78','and 78').replace('are34,','are 34,').replace('plus150','plus 150').replace('original18','original 18').replace('roots,107','roots, 107').replace('of112','of 112').replace('remain608','remain 608').replace('versus616','versus 616').replace('is3,','is 3,').replace('versus2,','versus 2,').replace('their24','their 24').replace('frozen293','frozen 293'))
print(json.dumps({'package':str(P),'payload_files_before_static_seal':sum(1 for p in P.rglob('*')if p.is_file())},indent=2))
