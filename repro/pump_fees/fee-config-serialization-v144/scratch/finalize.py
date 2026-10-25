#!/usr/bin/env python3
from pathlib import Path
import base64,gzip,hashlib,io,json,shutil,tarfile
from solders.transaction import VersionedTransaction
R=next(p for p in Path(__file__).resolve().parents if (p/'evidence/original/pump_fees/deployed.so').is_file());W=Path(__file__).resolve().parent
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
read=lambda p:json.loads(p.read_text())
candidate=W/'build/artifacts/pump_fees_candidate.so';digest=sha(candidate);assert digest=='a9c4ea9e47356a91bf9bd97318746a7c207b873e32485d7786853f048d7d4afa'
counts={'all-differential.json':17331,'codec-rejections.json':9,'historical-replay.json':2,'initializer-rejections.json':28,'error-literals.json':2,'compared-values.json':9,'authority-logs.json':3,'signed-transfers.json':56,'serialization-error.json':1}
for name,count in counts.items():
 data=read(W/'runtime'/name);assert data['candidate_sha256']==digest and data['case_count']==count and not data['mismatches'],name
for name in ['compared-values.json','authority-logs.json','signed-transfers.json','serialization-error.json']:
 d=read(W/'runtime'/name);assert d['signature_verification_enabled'] and d['blockhash_check_enabled']
 for row in d['cases']:
  assert row.get('match',True) and all(row.get('checks',{}).values())
  for side in ['original','candidate']:assert all(VersionedTransaction.from_bytes(base64.b64decode(row[side]['transaction_base64'])).verify_with_results())
history=read(W/'runtime/historical-replay.json')
for row in history['cases']:
 capture=R/f"repro/pump_fees/initializer-history/transactions/admin-success-{row['index']}.json";raw=base64.b64decode(read(capture)['response']['result']['transaction'][0]);tx=VersionedTransaction.from_bytes(raw);assert tx.verify_with_results()==[True]
 for side in ['original','candidate']:
  assert row[side]['raw_transaction_sha256']==hashlib.sha256(raw).hexdigest() and row[side]['signature']==str(tx.signatures[0])
  assert row[side]['signed_message_and_signature_unchanged'] and row[side]['sigverify_runtime_enabled']
assert history['freshness_control']['blockhash_freshness_check'] and 'BlockhashNotFound' in history['freshness_control']['error']
donation=read(W/'runtime/donation-sequence.json');assert donation['candidate_sha256']==digest and len(donation['steps'])==10 and not donation['mismatches'] and not donation['unexpected_errors']
for row in donation['steps']:
 for side in ['original','candidate']:assert all(VersionedTransaction.from_bytes(base64.b64decode(row[side]['transaction_base64'])).verify_with_results())
prov=read(W/'provenance.json');assert all(sha(R/n)==d for n,d in prov['baseline_main_inputs'].items())
for name in ['update-admin-dataflow-v144','authority-guard-v144','buyback-source-v144','declared-programs-v144']:
 p=R/'repro/pump_fees'/name;assert all(sha(p/n)==d for n,d in read(p/'artifact-hashes.json').items())
analysis=read(W/'body-analysis.json');assert all(r['normalized_equal'] and r['all_direct_targets_supported'] for r in analysis['rows'])
summary={'candidate_sha256':digest,'candidate_bytes':candidate.stat().st_size,'prior_comparison_receipts':17440,'new_repeated_serialization_error_receipts':1,'validated_cases':sum(counts.values()),'new_unique_cases_added':0,'mismatches':0,'donation_steps':10,'donation_signed_transactions':20,'main_and_prior_packages_unchanged':True,'full_original_byte_equality':False,'static_matches':[{'name':r['name'],'bytes':r['bytes'],'direct_calls':len(r['all_direct_calls']),'all_direct_targets_supported':True} for r in analysis['rows']],'previous_unresolved_exit_now_supported':True,'limitations':['Static scope is four bounded bodies, their direct targets and the exit discriminator; no recursively complete call graph or unique source spelling proof.','The 56 transfer repeats and one serialization error repeat add receipt/assertion evidence, not unique inputs.','Historical signatures unchanged; only historical blockhash freshness is adapted, not a complete historical bank.','Raw logs/compute are not wholly equal; focused serialization ProgramError logs are exactly equal.','No live submission.']}
(W/'validation-summary.json').write_text(json.dumps(summary,indent=2)+'\n')
bundle=W/'bundle';bundle.mkdir(exist_ok=False)
def cp(src,dst):dst.parent.mkdir(parents=True,exist_ok=True);shutil.copy2(src,dst)
def gz(src,dst):dst.parent.mkdir(parents=True,exist_ok=True);dst.write_bytes(gzip.compress(src.read_bytes(),mtime=0))
def archive(files,dst):
 b=io.BytesIO()
 with tarfile.open(fileobj=b,mode='w') as t:
  for n,p in sorted(files.items()):
   data=p.read_bytes();i=tarfile.TarInfo(n);i.size=len(data);i.mode=0o644;t.addfile(i,io.BytesIO(data))
 dst.write_bytes(gzip.compress(b.getvalue(),mtime=0))
for n in ['REPORT.md','source.patch','provenance.json','static-source-evidence.json','original-exit.disassembly.txt','disassembler.json','body-analysis.json','validation-summary.json','runtime-inputs.json','analyze.py','serialization_error.py','finalize.py','dependency-inputs.json','dependency-verification.json','python-environment.json','toolchain.json','reproduce-build.sh','reproduce-validation.sh']:
 cp(W/n,bundle/n)
for p in (W/'upstream').rglob('*'):
 if p.is_file():cp(p,bundle/p.relative_to(W))
for p in (W/'harness').glob('*.py'):cp(p,bundle/'harness'/p.name)
for n in ['build-attempt.json','build-comparison.json']:cp(W/'build'/n,bundle/n)
gz(W/'build/build.log',bundle/'build.log.gz');cp(candidate,bundle/'pump_fees_candidate.so');cp(W/'build/target/sbf-solana-solana/release/pump_fees_candidate.so',bundle/'symbol-source.so');gz(W/'function-matches.json',bundle/'function-matches.json.gz')
attempt=read(W/'build/build-attempt.json');assert attempt['source_unchanged'];inputs=attempt['source_sha256'];assert len(inputs)==22 and all(sha(R/n)==h for n,h in inputs.items());prefix=str((W/'source').relative_to(R))+'/'
local={n.removeprefix(prefix):R/n for n in inputs};assert len(local)==22 and all(not n.startswith('work/') for n in local)
(bundle/'source-sha256.json').write_text(json.dumps({n:sha(p) for n,p in local.items()},indent=2)+'\n');archive(local,bundle/'source-snapshot.tar.gz')
harness=read(W/'runtime-harness-inputs.json');harness[str((W/'serialization_error.py').relative_to(R))]=sha(W/'serialization_error.py');assert all(sha(R/n)==h for n,h in harness.items())
(bundle/'harness-source-sha256.json').write_text(json.dumps(harness,indent=2)+'\n');archive({n:R/n for n in harness},bundle/'harness-snapshot.tar.gz')
gz(W/'runtime-validation.log',bundle/'runtime-validation.log.gz')
for p in (W/'runtime').glob('*.json'):gz(p,bundle/'runtime'/(p.name+'.gz'))
(bundle/'artifact-hashes.json').write_text(json.dumps({str(p.relative_to(bundle)):sha(p) for p in sorted(bundle.rglob('*')) if p.is_file()},indent=2)+'\n')
handoff={'scope':'Source-only isolated FeeConfig serialization patch ready for review; no main or published-package edits.','patch':str((W/'source.patch').relative_to(R)),'source_files':['programs/pump-fees/src/types.rs'],'baseline_main_source_sha256':prov['baseline_main_inputs'],'candidate':str(candidate.relative_to(R)),'bundle':str(bundle.relative_to(R)),**summary,'promotion_recipe':'Apply only source.patch after verifying current main inputs. Clean-build main and require exact whole-ELF equality before reusing runtime receipts. Preserve previous packages; parent controls promotion.'}
(W/'handoff.json').write_text(json.dumps(handoff,indent=2)+'\n');print(json.dumps(summary,indent=2))
