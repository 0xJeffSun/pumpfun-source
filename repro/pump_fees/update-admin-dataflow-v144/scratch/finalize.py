#!/usr/bin/env python3
from pathlib import Path
import base64,gzip,hashlib,io,json,shutil,tarfile
from solders.transaction import VersionedTransaction
R=next(p for p in Path(__file__).resolve().parents if (p/'evidence/original/pump_fees/deployed.so').is_file())
W=Path(__file__).resolve().parent
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
read=lambda p:json.loads(p.read_text())
candidate=W/'state-accountinfo-build/artifacts/pump_fees_candidate.so';digest=sha(candidate)
assert digest=='b56d1852f9eed1ee1ad423d8724d5254f1e167ff7e76ca7d52ae7829c5e1b309'
counts={'all-differential.json':17331,'codec-rejections.json':9,'historical-replay.json':2,'initializer-rejections.json':28,'error-literals.json':2,'compared-values.json':9,'authority-logs.json':3}
for name,count in counts.items():
    data=read(W/'runtime'/name);assert data['candidate_sha256']==digest and data['case_count']==count and not data['mismatches']
signed=read(W/'signed-transfers.json');assert signed['candidate_sha256']==digest and signed['case_count']==56 and not signed['mismatches']
for data in [signed,read(W/'runtime/compared-values.json'),read(W/'runtime/authority-logs.json')]:
    assert data['signature_verification_enabled'] and data['blockhash_check_enabled']
    for row in data['cases']:
        assert row.get('match',True) and all(row.get('checks',{}).values())
        for side in ['original','candidate']:assert all(VersionedTransaction.from_bytes(base64.b64decode(row[side]['transaction_base64'])).verify_with_results())
history=read(W/'runtime/historical-replay.json')
for row in history['cases']:
    capture=R/f"repro/pump_fees/initializer-history/transactions/admin-success-{row['index']}.json"
    raw=base64.b64decode(read(capture)['response']['result']['transaction'][0]);tx=VersionedTransaction.from_bytes(raw);assert tx.verify_with_results()==[True]
    for side in ['original','candidate']:
        assert row[side]['raw_transaction_sha256']==hashlib.sha256(raw).hexdigest() and row[side]['signature']==str(tx.signatures[0])
        assert row[side]['signed_message_and_signature_unchanged'] and row[side]['sigverify_runtime_enabled']
assert history['freshness_control']['blockhash_freshness_check'] and 'BlockhashNotFound' in history['freshness_control']['error']
donation=read(W/'runtime/donation-sequence.json');assert donation['candidate_sha256']==digest and len(donation['steps'])==10 and not donation['mismatches'] and not donation['unexpected_errors']
for row in donation['steps']:
    for side in ['original','candidate']:assert all(VersionedTransaction.from_bytes(base64.b64decode(row[side]['transaction_base64'])).verify_with_results())
provenance=read(W/'provenance.json');assert all(sha(R/n)==d for n,d in provenance['baseline_main_source_sha256'].items())
for name in ['authority-guard-v144','buyback-source-v144','declared-programs-v144']:
    p=R/'repro/pump_fees'/name;assert all(sha(p/n)==d for n,d in read(p/'artifact-hashes.json').items())
summary={'candidate_sha256':digest,'candidate_bytes':candidate.stat().st_size,'prior_comparisons':sum(counts.values()),
         'repeated_signed_transfer_comparisons':56,'repeated_transfer_signed_transactions':112,'total_comparison_receipts':sum(counts.values())+56,
         'new_unique_cases_added':0,'mismatches':0,'donation_steps':10,'donation_signed_transactions':20,
         'main_and_frozen_packages_unchanged':True,'full_original_byte_equality':False,
         'static_matches':{'handler_bytes':2824,'account_parser_bytes':5664,'dispatcher_bytes':1384,'unresolved_dispatcher_exit_call':True},
         'limitations':['The 56 signed transfer comparisons repeat the existing full-suite cases; raw signatures are retained, not new unique coverage.','Dispatch exit_with_expected_owner callee differs (1568 vs992 bytes).','No recursively complete rodata/call-graph or unique source spelling proof.','Historical signatures unchanged; only historical blockhash freshness is adapted, not a complete historical bank.','No live submission.']}
(W/'validation-summary.json').write_text(json.dumps(summary,indent=2)+'\n')
bundle=W/'bundle';bundle.mkdir(exist_ok=False)
def cp(src,dst):dst.parent.mkdir(parents=True,exist_ok=True);shutil.copy2(src,dst)
def gz(src,dst):dst.parent.mkdir(parents=True,exist_ok=True);dst.write_bytes(gzip.compress(src.read_bytes(),mtime=0))
def archive(files,dst):
    b=io.BytesIO()
    with tarfile.open(fileobj=b,mode='w') as tar:
        for n,p in sorted(files.items()):
            data=p.read_bytes();i=tarfile.TarInfo(n);i.size=len(data);i.mode=0o644;tar.addfile(i,io.BytesIO(data))
    dst.parent.mkdir(parents=True,exist_ok=True);dst.write_bytes(gzip.compress(b.getvalue(),mtime=0))
for n in ['REPORT.md','source.patch','state-source.patch','accountinfo-source.patch','provenance.json','account-type-evidence.json','body-analysis.json','state-deltas.json','validation-summary.json','runtime-inputs.json','analyze.py','signed_transfers.py','finalize.py']:
    cp(W/n,bundle/n)
for phase in ['state','state-accountinfo']:
    build=W/(phase+'-build');workspace=W/(phase+'-workspace');out=bundle/phase
    for n in ['build-attempt.json','build-comparison.json']:cp(build/n,out/n)
    gz(build/'build.log',out/'build.log.gz');cp(build/'artifacts/pump_fees_candidate.so',out/'pump_fees_candidate.so');cp(build/'target/sbf-solana-solana/release/pump_fees_candidate.so',out/'symbol-source.so')
    inputs=read(build/'build-attempt.json')['source_sha256'];assert len(inputs)==22 and all(sha(R/n)==d for n,d in inputs.items())
    prefix=str(workspace.relative_to(R))+'/'
    local={n.removeprefix(prefix):R/n for n in inputs};assert len(local)==22 and all(not n.startswith('work/') for n in local)
    (out/'source-sha256.json').write_text(json.dumps({n:sha(p) for n,p in local.items()},indent=2)+'\n');archive(local,out/'source-snapshot.tar.gz')
gz(W/'state-accountinfo-matches.json',bundle/'state-accountinfo/function-matches.json.gz')
harness=read(W/'runtime-harness-inputs.json');assert all(sha(R/n)==d for n,d in harness.items());cp(W/'runtime-harness-inputs.json',bundle/'harness-source-sha256.json');archive({n:R/n for n in harness},bundle/'harness-snapshot.tar.gz')
for f in (W/'harness').glob('*.py'):cp(f,bundle/'harness'/f.name)
gz(W/'runtime-validation.log',bundle/'runtime-validation.log.gz');gz(W/'signed-transfers.json',bundle/'signed-transfers.json.gz')
for p in (W/'runtime').glob('*.json'):gz(p,bundle/'runtime'/(p.name+'.gz'))
for n in ['python-environment.json','dependency-inputs.json','dependency-verification.json']:cp(R/'repro/pump_fees/authority-guard-v144'/n,bundle/n)
(bundle/'artifact-hashes.json').write_text(json.dumps({str(p.relative_to(bundle)):sha(p) for p in sorted(bundle.rglob('*')) if p.is_file()},indent=2)+'\n')
handoff={'scope':'Isolated source patch ready for review; main and existing packages unchanged. Root owns approval of promotion and integration.',
         'patch':str((W/'source.patch').relative_to(R)),'source_files':['programs/pump-fees/src/lib.rs','programs/pump-fees/src/contexts.rs'],
         'baseline_main_source_sha256':provenance['baseline_main_source_sha256'],'candidate':str(candidate.relative_to(R)),
         'bundle':str(bundle.relative_to(R)),**summary,
         'promotion_recipe':'Apply only source.patch after verifying current source inputs. Clean-build main with current source/README binding and compare full ELF; reuse receipts only if byte-identical. Do not claim the unresolved exit callee or full historical identity.'}
(W/'handoff.json').write_text(json.dumps(handoff,indent=2)+'\n')
print(json.dumps(summary,indent=2))
