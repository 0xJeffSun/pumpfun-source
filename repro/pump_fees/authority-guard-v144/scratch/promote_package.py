#!/usr/bin/env python3
from pathlib import Path
import gzip,hashlib,io,json,shutil,subprocess,tarfile
R=next(p for p in Path(__file__).resolve().parents if (p/'evidence/original/pump_fees/deployed.so').is_file())
W=Path(__file__).resolve().parent;P=R/'repro/pump_fees/authority-guard-v144'
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
read=lambda p:json.loads(p.read_text())
def cp(src,dst):dst.parent.mkdir(parents=True,exist_ok=True);shutil.copy2(src,dst)
def gz(src,dst):dst.parent.mkdir(parents=True,exist_ok=True);dst.write_bytes(gzip.compress(src.read_bytes(),mtime=0))
def write(path,data):path.parent.mkdir(parents=True,exist_ok=True);path.write_text(json.dumps(data,indent=2)+'\n')
def archive(files,dst):
    b=io.BytesIO()
    with tarfile.open(fileobj=b,mode='w') as t:
        for n,p in sorted(files.items()):
            data=p.read_bytes();i=tarfile.TarInfo(n);i.size=len(data);i.mode=0o644;t.addfile(i,io.BytesIO(data))
    dst.parent.mkdir(parents=True,exist_ok=True);dst.write_bytes(gzip.compress(b.getvalue(),mtime=0))
main=W/'main-build';scratch=W/'build'
assert (main/'artifacts/pump_fees_candidate.so').read_bytes()==(scratch/'artifacts/pump_fees_candidate.so').read_bytes()
digest=sha(main/'artifacts/pump_fees_candidate.so');assert digest=='952a96cdb974517ec85ebeff3e2b5ec690029aaf3f822dfc22501e95bc3dba66'
P.mkdir(exist_ok=False)
for n in ['build-attempt.json','build-comparison.json']:cp(main/n,P/n)
gz(main/'build.log',P/'build.log.gz');cp(main/'artifacts/pump_fees_candidate.so',P/'pump_fees_candidate.so');cp(main/'target/sbf-solana-solana/release/pump_fees_candidate.so',P/'symbol-source.so')
sources=read(main/'build-attempt.json')['source_sha256'];assert len(sources)==22 and all(sha(R/n)==d for n,d in sources.items())
write(P/'source-sha256.json',sources);archive({n:R/n for n in sources},P/'source-snapshot.tar.gz')
harness=read(W/'runtime-harness-inputs.json');assert all(sha(R/n)==d for n,d in harness.items())
write(P/'harness-source-sha256.json',harness);archive({n:R/n for n in harness},P/'harness-snapshot.tar.gz')
cp(W/'authority_logs.py',P/'authority_logs.py');cp(R/'repro/pump_fees/buyback-source-v144/compared_values.py',P/'compared_values.py')
for n in ['source.patch','provenance.json','body-analysis.json','retained-log-evidence.json','anchor-macros.txt','screening.json','analyze.py']:
    cp(W/n,P/'static'/n)
cp(W/'REPORT.md',P/'static/SCRATCH-REPORT.md')
for n in ['build-attempt.json','build-comparison.json']:cp(scratch/n,P/'scratch'/n)
gz(scratch/'build.log',P/'scratch/build.log.gz');cp(scratch/'artifacts/pump_fees_candidate.so',P/'scratch/pump_fees_candidate.so');cp(scratch/'target/sbf-solana-solana/release/pump_fees_candidate.so',P/'scratch/symbol-source.so')
inputs=read(scratch/'build-attempt.json')['source_sha256'];prefix=str((W/'workspace').relative_to(R))+'/'
local={n.removeprefix(prefix):R/n for n in inputs};assert len(local)==22 and all(not n.startswith('work/') for n in local)
write(P/'scratch/source-sha256.json',{n:sha(p) for n,p in local.items()});archive(local,P/'scratch/source-snapshot.tar.gz')
cp(W/'authority_logs.py',P/'scratch/authority_logs.py');cp(W/'finalize.py',P/'scratch/finalize.py');cp(Path(__file__),P/'scratch/promote_package.py')
for f in (W/'harness').glob('*.py'):cp(f,P/'scratch/harness'/f.name)
gz(W/'function-matches.json',P/'scratch/function-matches.json.gz')
gz(W/'runtime-validation.log',P/'runtime-validation.log.gz');gz(W/'authority-logs.json',P/'authority-logs.json.gz')
for source,target in [('all-differential.json','differential.json.gz'),('codec-rejections.json','codec-rejections.json.gz'),('historical-replay.json','initializer-history.json.gz'),('initializer-rejections.json','initializer-rejections.json.gz'),('error-literals.json','messages.json.gz'),('compared-values.json','compared-values.json.gz'),('donation-sequence.json','donation-sequence.json.gz')]:
    d=read(W/'runtime'/source);assert d['candidate_sha256']==digest and not d['mismatches'];gz(W/'runtime'/source,P/target)
previous=R/'repro/pump_fees/buyback-source-v144'
for n in ['runtime-inputs.json','python-environment.json','dependency-inputs.json','dependency-verification.json']:cp(previous/n,P/n)
write(P/'prior-checkpoint.json',{'path':str(previous.relative_to(R)),'artifact_manifest_sha256':sha(previous/'artifact-hashes.json'),'candidate_sha256':sha(previous/'pump_fees_candidate.so'),'retained_unchanged':True})
write(P/'runtime-commands.json',{'cwd':'<repo>','commands':[
    'sh repro/pump_fees/buyback-source-v144/reproduce-validation.sh work/fees-admin-dataflow/build/artifacts/pump_fees_candidate.so work/fees-admin-dataflow/runtime work/test-env/bin/python > work/fees-admin-dataflow/runtime-validation.log 2>&1',
    'work/test-env/bin/python work/fees-admin-dataflow/authority_logs.py --candidate work/fees-admin-dataflow/build/artifacts/pump_fees_candidate.so --output work/fees-admin-dataflow/authority-logs.json'],
    'main_receipt_reuse':'Main and tested scratch whole ELF bytes are identical.'})
summary=read(W/'validation-summary.json');summary.pop('main_and_frozen_packages_unchanged');summary.update(main_scratch_byte_equal=True,main_rust_change_count=1,main_documentation_change='programs/pump-fees/README.md',prior_packages_unchanged=True)
write(P/'validation-summary.json',summary)
write(P/'main-scratch-identity.json',{'main_binary_sha256':digest,'scratch_binary_sha256':sha(scratch/'artifacts/pump_fees_candidate.so'),'byte_equal':True,'bytes':(main/'artifacts/pump_fees_candidate.so').stat().st_size,'main_source_manifest':'source-sha256.json','scratch_source_manifest':'scratch/source-sha256.json','source_difference_between_main_and_scratch':['programs/pump-fees/README.md'],'scope':'Clean main build differs from tested scratch source only in updated program documentation. ELF equality is byte for byte; this does not establish identity with the captured original.'})
subprocess.run(['python3',str(R/'repro/pump_fees/framework-matching/match.py'),'--original',str(R/'evidence/original/pump_fees/deployed.so'),'--candidate',str(P/'pump_fees_candidate.so'),'--symbols',str(P/'symbol-source.so'),'--output',str(W/'main-function-matches.json')],check=True)
gz(W/'main-function-matches.json',P/'function-matches.json.gz')
print(P)
