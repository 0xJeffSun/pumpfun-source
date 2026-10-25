#!/usr/bin/env python3
from pathlib import Path
import difflib, gzip, hashlib, io, json, shutil, subprocess, tarfile

ROOT=next(p for p in Path(__file__).resolve().parents if (p/'evidence/original/pump_fees/deployed.so').is_file())
W=Path(__file__).resolve().parent
P=ROOT/'repro/pump_fees/buyback-source-v144'
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
read=lambda p:json.loads(p.read_text())
def write(path,value):path.parent.mkdir(parents=True,exist_ok=True);path.write_text(json.dumps(value,indent=2)+'\n')
def copy(src,dst):dst.parent.mkdir(parents=True,exist_ok=True);shutil.copy2(src,dst)
def gz(src,dst):dst.parent.mkdir(parents=True,exist_ok=True);dst.write_bytes(gzip.compress(src.read_bytes(),mtime=0))
def archive(files,dst):
    stream=io.BytesIO()
    with tarfile.open(fileobj=stream,mode='w') as tar:
        for name,p in sorted(files.items()):
            data=p.read_bytes();i=tarfile.TarInfo(name);i.size=len(data);i.mode=0o644;i.mtime=0;tar.addfile(i,io.BytesIO(data))
    dst.parent.mkdir(parents=True,exist_ok=True);dst.write_bytes(gzip.compress(stream.getvalue(),mtime=0))

main=W/'main-build';scratch=W/'typed-macro-box-build'
assert (main/'artifacts/pump_fees_candidate.so').read_bytes()==(scratch/'artifacts/pump_fees_candidate.so').read_bytes()
digest=sha(main/'artifacts/pump_fees_candidate.so')
assert digest=='f7697d83d22f2fa812bcdc5667399fb4c859d866f24d01c583f2b87c311ecbfb'
assert read(main/'build-attempt.json')['returncode']==0
P.mkdir(exist_ok=False)
for n in ['build-attempt.json','build-comparison.json']:copy(main/n,P/n)
gz(main/'build.log',P/'build.log.gz')
copy(main/'artifacts/pump_fees_candidate.so',P/'pump_fees_candidate.so')
copy(main/'target/sbf-solana-solana/release/pump_fees_candidate.so',P/'symbol-source.so')
sources=read(main/'build-attempt.json')['source_sha256'];assert len(sources)==22
assert all(sha(ROOT/p)==d for p,d in sources.items())
write(P/'source-sha256.json',sources);archive({p:ROOT/p for p in sources},P/'source-snapshot.tar.gz')
harness=read(W/'runtime-harness-inputs.json')
assert all(sha(ROOT/p)==d for p,d in harness.items())
harness['work/fees-body-followup/compared_values.py']=sha(W/'compared_values.py')
harness['repro/pump_fees/declared-programs-v144/reproduce-validation.sh']=sha(ROOT/'repro/pump_fees/declared-programs-v144/reproduce-validation.sh')
write(P/'harness-source-sha256.json',harness);archive({p:ROOT/p for p in harness},P/'harness-snapshot.tar.gz')
copy(W/'compared_values.py',P/'compared_values.py')
for n in ['runtime-inputs.json','python-environment.json','dependency-inputs.json','dependency-verification.json','main-promotion.diff']:
    copy(W/n,P/n)
for src,dst in [('all-differential.json','differential.json.gz'),('codec-rejections.json','codec-rejections.json.gz'),('historical-replay.json','initializer-history.json.gz'),('initializer-rejections.json','initializer-rejections.json.gz'),('error-literals.json','messages.json.gz'),('donation-sequence.json','donation-sequence.json.gz')]:
    data=read(W/'runtime'/src);assert data['candidate_sha256']==digest and not data['mismatches'];gz(W/'runtime'/src,P/dst)
gz(W/'compared-values.json',P/'compared-values.json.gz')
gz(W/'runtime-validation.log',P/'runtime-validation.log.gz')
write(P/'runtime-commands.json',{'cwd':'<repo>','commands':[
    'sh repro/pump_fees/declared-programs-v144/reproduce-validation.sh work/fees-body-followup/typed-macro-box-build/artifacts/pump_fees_candidate.so work/fees-body-followup/runtime work/test-env/bin/python > work/fees-body-followup/runtime-validation.log 2>&1',
    'work/test-env/bin/python work/fees-body-followup/compared_values.py --candidate work/fees-body-followup/typed-macro-box-build/artifacts/pump_fees_candidate.so --output work/fees-body-followup/compared-values.json'],
    'main_receipt_reuse':'Main is byte-identical to the scratch executable tested by all receipts. No reattribution by normalized functions.'})
write(P/'main-scratch-identity.json',{'main_binary_sha256':digest,'scratch_binary_sha256':sha(scratch/'artifacts/pump_fees_candidate.so'),'main_bytes':(main/'artifacts/pump_fees_candidate.so').stat().st_size,'byte_equal':True,'main_source_manifest':'source-sha256.json','scratch_build':'scratch/typed-macro-box/build-comparison.json','scope':'Exact whole-ELF identity allows runtime receipts from the scratch candidate to apply to the clean main build. This is not equality with the captured program.'})
for name in ['macro','macro-box','typed-macro-box']:
    b=W/(name+'-build');s=W/(name+'-workspace');d=P/'scratch'/name
    for n in ['build-attempt.json','build-comparison.json']:copy(b/n,d/n)
    gz(b/'build.log',d/'build.log.gz')
    copy(b/'artifacts/pump_fees_candidate.so',d/'pump_fees_candidate.so')
    copy(b/'target/sbf-solana-solana/release/pump_fees_candidate.so',d/'symbol-source.so')
    prefix=str(s.relative_to(ROOT))+'/'
    hashes=read(b/'build-attempt.json')['source_sha256'];local={p.removeprefix(prefix):ROOT/p for p in hashes}
    assert len(local)==22 and all(not n.startswith('work/') for n in local)
    write(d/'source-sha256.json',{n:sha(p) for n,p in local.items()});archive(local,d/'workspace-source.tar.gz')
    gz(W/(name+'-function-matches.json'),d/'function-matches.json.gz')
for n in ['REPORT.md','baseline-analysis.json','macro-analysis.json','macro-box-analysis.json','typed-macro-box-analysis.json','with-values-calls.json','existing-log-evidence.json','trial-provenance.json','macro-source.diff','box-source.diff','typed-bound-source.diff','anchor-require-gt.txt','anchor-error-with-values.txt']:
    copy(W/n,P/'static'/n)
for n in ['analyze.py','reproduce.sh','package.py']:copy(W/n,P/'scratch'/n)
for n in ['build_partial_candidate.py','build_source_manifest.py','compare.py']:copy(W/'harness'/n,P/'scratch/harness'/n)
subprocess.run(['python3',str(ROOT/'repro/pump_fees/framework-matching/match.py'),'--original',str(ROOT/'evidence/original/pump_fees/deployed.so'),'--candidate',str(P/'pump_fees_candidate.so'),'--symbols',str(P/'symbol-source.so'),'--output',str(W/'main-function-matches.json')],check=True)
gz(W/'main-function-matches.json',P/'function-matches.json.gz')
summary={'candidate_sha256':digest,'case_count':17381,'retained_comparisons':17372,'additional_compared_value_comparisons':9,'additional_cases_overlap_full_regression_indices':True,'mismatches':0,'donation_steps':10,'donation_signed_transactions':20,'main_scratch_byte_equal':True,'full_byte_equality_with_original':False,'body_count':31,'limits':['Source locations and compute-unit consumption remain different.','Exact compared-value logs are asserted for indices7,8,255 of three buyback handlers; this is not equality of all raw logs.','Historical signatures/messages are unchanged; only historical blockhash freshness is disabled, and no complete historical bank is claimed.','All tests are local; no live submission.','The previous declared-programs-v144 package is preserved as a separate immutable checkpoint.']}
write(P/'validation-summary.json',summary)
print(P)
