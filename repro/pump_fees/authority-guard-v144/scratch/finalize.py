#!/usr/bin/env python3
from pathlib import Path
import base64,gzip,hashlib,io,json,shutil,sys,tarfile
R=next(p for p in Path(__file__).resolve().parents if (p/'evidence/original/pump_fees/deployed.so').is_file())
W=Path(__file__).resolve().parent
from solders.transaction import VersionedTransaction
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
read=lambda p:json.loads(p.read_text())
digest=sha(W/'build/artifacts/pump_fees_candidate.so')
assert digest=='952a96cdb974517ec85ebeff3e2b5ec690029aaf3f822dfc22501e95bc3dba66'
counts={'all-differential.json':17331,'codec-rejections.json':9,'historical-replay.json':2,'initializer-rejections.json':28,'error-literals.json':2,'compared-values.json':9}
for n,count in counts.items():
    data=read(W/'runtime'/n);assert data['candidate_sha256']==digest and data['case_count']==count and not data['mismatches']
focused=read(W/'authority-logs.json');assert focused['candidate_sha256']==digest and focused['case_count']==3 and not focused['mismatches']
for data in [focused,read(W/'runtime/compared-values.json')]:
    assert data['signature_verification_enabled'] and data['blockhash_check_enabled']
    for row in data['cases']:
        assert all(row['checks'].values())
        for side in ['original','candidate']:assert all(VersionedTransaction.from_bytes(base64.b64decode(row[side]['transaction_base64'])).verify_with_results())
history=read(W/'runtime/historical-replay.json')
for row in history['cases']:
    capture=R/f"repro/pump_fees/initializer-history/transactions/admin-success-{row['index']}.json"
    raw=base64.b64decode(read(capture)['response']['result']['transaction'][0]);tx=VersionedTransaction.from_bytes(raw);assert tx.verify_with_results()==[True]
    for side in ['original','candidate']:
        assert row[side]['raw_transaction_sha256']==hashlib.sha256(raw).hexdigest()
        assert row[side]['signature']==str(tx.signatures[0]) and row[side]['signed_message_and_signature_unchanged'] and row[side]['sigverify_runtime_enabled']
assert history['freshness_control']['blockhash_freshness_check'] and 'BlockhashNotFound' in history['freshness_control']['error']
donation=read(W/'runtime/donation-sequence.json');assert donation['candidate_sha256']==digest and len(donation['steps'])==10 and not donation['mismatches'] and not donation['unexpected_errors']
for row in donation['steps']:
    for side in ['original','candidate']:assert all(VersionedTransaction.from_bytes(base64.b64decode(row[side]['transaction_base64'])).verify_with_results())
provenance=read(W/'provenance.json');assert all(sha(R/n)==d for n,d in provenance['baseline_main_source_sha256'].items())
for name in ['buyback-source-v144','declared-programs-v144']:
    p=R/'repro/pump_fees'/name;assert all(sha(p/n)==d for n,d in read(p/'artifact-hashes.json').items())
summary={'candidate_sha256':digest,'candidate_bytes':(W/'build/artifacts/pump_fees_candidate.so').stat().st_size,
         'previous_comparisons':sum(counts.values()),'additional_authority_comparisons':3,'total_comparisons':sum(counts.values())+3,
         'focused_cases_overlap_prior_indices':True,'mismatches':0,'donation_steps':10,'donation_signed_transactions':20,
         'main_and_frozen_packages_unchanged':True,'full_byte_equality_with_original':False,
         'limitations':['Ordinary signed offline synthetic fixtures except separately identified genuine historical messages.','Historical signatures/messages are unchanged; freshness alone is adapted and no complete historical bank is claimed.','Raw source locations and compute consumption remain unequal.','Source spelling is not uniquely recoverable from matching machine code.']}
(W/'validation-summary.json').write_text(json.dumps(summary,indent=2)+'\n')
bundle=W/'bundle';bundle.mkdir(exist_ok=False)
def cp(src,dst):dst.parent.mkdir(parents=True,exist_ok=True);shutil.copy2(src,dst)
def gz(src,dst):dst.parent.mkdir(parents=True,exist_ok=True);dst.write_bytes(gzip.compress(src.read_bytes(),mtime=0))
def arc(files,dst):
    stream=io.BytesIO()
    with tarfile.open(fileobj=stream,mode='w') as tar:
        for n,p in sorted(files.items()):
            data=p.read_bytes();i=tarfile.TarInfo(n);i.size=len(data);i.mode=0o644;tar.addfile(i,io.BytesIO(data))
    dst.write_bytes(gzip.compress(stream.getvalue(),mtime=0))
for n in ['REPORT.md','source.patch','provenance.json','body-analysis.json','validation-summary.json','retained-log-evidence.json','anchor-macros.txt','analyze.py','authority_logs.py','finalize.py','screening.json']:
    cp(W/n,bundle/n)
for n in ['build-attempt.json','build-comparison.json']:cp(W/'build'/n,bundle/n)
gz(W/'build/build.log',bundle/'build.log.gz')
cp(W/'build/artifacts/pump_fees_candidate.so',bundle/'pump_fees_candidate.so')
cp(W/'build/target/sbf-solana-solana/release/pump_fees_candidate.so',bundle/'symbol-source.so')
gz(W/'function-matches.json',bundle/'function-matches.json.gz')
gz(W/'authority-logs.json',bundle/'authority-logs.json.gz')
gz(W/'runtime-validation.log',bundle/'runtime-validation.log.gz')
for f in (W/'runtime').glob('*.json'):gz(f,bundle/'runtime'/(f.name+'.gz'))
sources=read(W/'build/build-attempt.json')['source_sha256'];assert len(sources)==22 and all(sha(R/n)==d for n,d in sources.items())
prefix=str((W/'workspace').relative_to(R))+'/'
local={n.removeprefix(prefix):R/n for n in sources}
assert all(not n.startswith('work/') for n in local)
(bundle/'source-sha256.json').write_text(json.dumps({n:sha(p) for n,p in local.items()},indent=2)+'\n');arc(local,bundle/'source-snapshot.tar.gz')
harness=read(W/'runtime-harness-inputs.json');assert all(sha(R/n)==d for n,d in harness.items())
cp(W/'runtime-harness-inputs.json',bundle/'harness-source-sha256.json');arc({n:R/n for n in harness},bundle/'harness-snapshot.tar.gz')
for f in (W/'harness').glob('*.py'):cp(f,bundle/'harness'/f.name)
(bundle/'artifact-hashes.json').write_text(json.dumps({str(p.relative_to(bundle)):sha(p) for p in sorted(bundle.rglob('*')) if p.is_file()},indent=2)+'\n')
handoff={'scope':'Ready isolated source patch; main and frozen packages unchanged. Root owns promotion/publication/central integration.',
         'patch':str((W/'source.patch').relative_to(R)),'source_file':'programs/pump-fees/src/lib.rs','changed_expression_count':1,
         'baseline_main_source_sha256':provenance['baseline_main_source_sha256'],
         'candidate':str((W/'build/artifacts/pump_fees_candidate.so').relative_to(R)),**summary,
         'bundle':str(bundle.relative_to(R)),'static_report':str((W/'body-analysis.json').relative_to(R)),
         'promotion_recipe':'Apply the single source.patch expression to current main, clean-build v1.44 with full22input binding. Reuse receipts only if whole ELF equals952a96cd…; otherwise rerun. Preserve source line/module placement. No patching binaries.'}
(W/'handoff.json').write_text(json.dumps(handoff,indent=2)+'\n')
print(json.dumps(summary,indent=2))
