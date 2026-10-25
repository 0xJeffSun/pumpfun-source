from pathlib import Path
import gzip,hashlib,json,shutil
W=Path(__file__).resolve().parent;R=W.parents[1];B=W/'main-build-01';S=W/'handoff';P=R/'repro/pump_amm/scalar-guard-order-v144';P.mkdir(exist_ok=False);sha=lambda b:hashlib.sha256(b).hexdigest()
def copy(src,relative):
 rel=Path(relative);assert not rel.is_absolute()and '..'not in rel.parts and not any(x.endswith('-keypair.json')for x in rel.parts);assert not src.is_symlink()and not src.name.endswith('-keypair.json');dest=P/rel;dest.parent.mkdir(parents=True,exist_ok=True);dest.write_bytes(src.read_bytes())
def compress(src,relative):
 assert not src.name.endswith('-keypair.json');dest=P/relative;dest.parent.mkdir(parents=True,exist_ok=True)
 with dest.open('wb')as f:
  with gzip.GzipFile(filename='',mode='wb',fileobj=f,mtime=0)as z:z.write(src.read_bytes())
manifest=json.loads((S/'manifest.json').read_text())
for rel,row in manifest['files'].items():
 assert sha((S/rel).read_bytes())==row['sha256'];copy(S/rel,'scratch/'+rel)
copy(S/'manifest.json','scratch/manifest.json')
for name in ['build-attempt.json','build-comparison.json']:copy(B/name,name)
compress(B/'build.log','build.log.gz');copy(B/'artifacts/pump_amm_recovered.so','candidate.so');copy(B/'target/sbf-solana-solana/release/pump_amm_recovered.so','unstripped.so');copy(B/'target/.rustc_info.json','rustc_info.json')
copy(W/'main-toolchain-phases.json','toolchain-phases.json');copy(W/'main-scratch-identity.json','main-scratch-identity.json')
copy(W/'main-build-invocation.log','main-build-invocation.log');copy(W/'main-promotion-inputs-before.json','promotion-inputs-before.json')
copy(W/'verify_publication.py','verify.py');copy(W/'verify_serializers.py','verify_serializers.py');copy(W/'record_main_phases.py','record_main_phases.py');copy(W/'package_main.py','package_main.py')
for name in ['scripts/strip.sh','scripts/install.sh','env.sh']:copy(B/'sdk'/name,'sdk-scripts/'+name)
for name in ['build_partial_candidate.py','build_source_manifest.py','compare.py','analyze.py']:copy(R/'scripts'/name,'build-helper-snapshot/scripts/'+name)
build=json.loads((B/'build-comparison.json').read_text())
for path,h in build['source_sha256'].items():assert sha((R/path).read_bytes())==h;copy(R/path,'source/'+path)
copy(R/'programs/pump-amm/README.md','source/programs/pump-amm/README.md')
run=json.loads((S/'runtime-01/run.json').read_text());bindings=[];prefix='repro/pump_amm/scalar-guard-order-v144/'
for row in sorted(run,key=lambda x:x['suite']):
 name=row['suite'];copy(S/'runtime-01'/(name+'.json.gz'),name+'-differential.json.gz')
 bindings.append({'suite':name,'cases':row['case_count'],'receipt':prefix+name+'-differential.json.gz','receipt_uncompressed_sha256':row['receipt_sha256'],'scratch_transactions':prefix+'scratch/runtime-01/'+name+'-transactions.json.gz','transaction_sidecar_sha256':row['transaction_sidecar_sha256'],'main_source_sha256':build['source_sha256'],'main_build_report_sha256':sha((P/'build-comparison.json').read_bytes()),'identity_report_sha256':sha((P/'main-scratch-identity.json').read_bytes()),'runtime_execution':'Existing scratch run reused only by complete main/scratch byte identity; no fresh main execution. Embedded legacy checkout maps remain unchanged and do not represent compiled source.'})
(P/'main-receipt-bindings.json').write_text(json.dumps(bindings,indent=2)+'\n')
status=json.loads((R/'repro/status.json').read_text())['pump_amm'];status.update(candidate_artifact=prefix+'candidate.so',comparison_report=prefix+'build-comparison.json',build_log=prefix+'build.log.gz',validation_reports=[b['receipt']for b in bindings],candidate_build_identity_report=prefix+'main-scratch-identity.json',prior_checkpoint='repro/pump_amm/pool-serialization-thirty-seven',global_config_serialization_report=prefix+'function-match.json',pool_serialization_report=prefix+'function-match.json',scalar_guard_order_report=prefix+'README.md',scalar_compared_value_report=prefix+'scratch/scalar-diagnostics.json',scalar_existing_cases_with_stricter_assertions=191,signature_evidence_report=prefix+'scratch/receipt-bindings.json.gz',verified_transaction_signatures=35418,existing_fixture_setup_transactions=150,handler_codegen_match=False)
(P/'status-pump_amm.json').write_text(json.dumps(status,indent=2)+'\n')
inputs=json.loads((S/'runtime-01/inputs-before.json').read_text());current={'compiled_source':build['source_sha256'],'program_documentation':{'programs/pump-amm/README.md':sha((R/'programs/pump-amm/README.md').read_bytes())},'build_helpers':{str(Path('scripts')/n):sha((R/'scripts'/n).read_bytes())for n in ['build_partial_candidate.py','build_source_manifest.py','compare.py','analyze.py']},'maintained_harness':{p:h for p,h in inputs['harness'].items()if p.startswith('scripts/')},'runtime_inputs':inputs['runtime']}
for mapping in current.values():
 for p,h in mapping.items():assert sha((R/p).read_bytes())==h,p
(P/'current-main-bindings.json').write_text(json.dumps(current,indent=2)+'\n')
(P/'README.md').write_text('''# AMM scalar guard-order checkpoint

The clean main build restores scalar compared-value diagnostics and the original LP → protocol → recipients → creator guard/store order in `update_fee_config`. It preserves **37 recovered handlers, 25 suites and 17,462 existing comparisons**. All **191 existing scalar rejection cases** with stricter Left/Right assertions pass. No handler or testcase was added.

The main candidate is1,177,512 bytes, SHA256 `a6dbd0dc24e28a9459e50858136a2cfabb59fb8aa8399d58499d047a76ec291f`. Its complete bytes equal the tested scratch executable. `main-scratch-identity.json` justifies reusing its saved receipts without a suite rerun. `main-receipt-bindings.json` binds each direct per-suite receipt to both the main build and the preserved scratch signed evidence. These direct receipts are compatible with the repository's `verify_recovered_builds.py` schema; the proposed status entry is `status-pump_amm.json`.

**The fee-config handler remains unmatched:**6,096 candidate bytes versus2,912 original bytes. No standalone616-byte scalar setter matches. Its actual error helper retains four constant-specialization instruction differences. This is a validated source-behavior correction, not compiler/whole-program exactness. Fresh `function-match.json` preserves the complete Pool/GlobalConfig exit matches, each24direct targets and8-byte discriminator, at the new symbol locations. Full-file equality is false and the audit is incomplete.

Compilation uses the same locked18-input v1.44 recipe; the installed SDK's separate unchanged strip phase uses v1.52. `toolchain-phases.json` records both actual identities and the final-alias limitation. `build-comparison.json` contains actual main compiler inputs. `source/` retains those inputs and program documentation. The frozen scratch package includes the prior prebuild, all failures, source/build/tool/harness/runtime snapshots and dependency provenance. No deployment-keypair file is read, hashed or packaged.

There are35,074 observed signed transactions and35,418 verified signatures:34,924 comparison transactions plus150 existing original-program boost fixture-setup transactions, listed separately and not counted as new cases. Existing harnesses/fixtures were unchanged. Synthetic test-owned accounts and authentic unchanged historical signed messages retain their earlier documented scope. The old checkout-source maps embedded in legacy receipts remain labeled as snapshots; actual clean-build manifests establish compiled source provenance.

Run `python3 verify.py` with `solders==0.27.1` for portable saved-evidence verification, or `python3 verify.py --current-main` in a clean repository checkout to additionally check current main source/documentation/helpers/harness/runtime hashes. It verifies cryptographic signatures and saved artifacts only; it does not compile, replay transactions, require local Surfpool, or contact a network. Parent owns central status integration/publication. The full scratch findings and code-generation limits are in `scratch/REPORT.md`.
'''.replace('is1,','is 1,').replace('unmatched:**6,','unmatched:** 6,').replace('versus2,','versus 2,').replace('standalone616','standalone 616').replace('each24direct','each 24 direct').replace('and8-byte','and 8-byte').replace('locked18-input','locked 18-input').replace('are35,','are 35,').replace('and35,','and 35,').replace('signatures:34,','signatures: 34,').replace('plus150','plus 150'))
print(json.dumps({'package':str(P),'files_before_static_seal':sum(1 for p in P.rglob('*')if p.is_file())},indent=2))
