#!/usr/bin/env python3
from pathlib import Path
import gzip,hashlib,io,json,shutil,subprocess,tarfile
R=next(p for p in Path(__file__).resolve().parents if (p/'evidence/original/pump_fees/deployed.so').is_file());W=Path(__file__).resolve().parent;P=R/'repro/pump_fees/fee-config-serialization-v144'
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();read=lambda p:json.loads(p.read_text())
def cp(s,d):d.parent.mkdir(parents=True,exist_ok=True);shutil.copy2(s,d)
def gz(s,d):d.parent.mkdir(parents=True,exist_ok=True);d.write_bytes(gzip.compress(s.read_bytes(),mtime=0))
def write(p,j):p.parent.mkdir(parents=True,exist_ok=True);p.write_text(json.dumps(j,indent=2)+'\n')
def arc(files,d):
 b=io.BytesIO()
 with tarfile.open(fileobj=b,mode='w') as t:
  for n,p in sorted(files.items()):
   data=p.read_bytes();i=tarfile.TarInfo(n);i.size=len(data);i.mode=0o644;t.addfile(i,io.BytesIO(data))
 d.parent.mkdir(parents=True,exist_ok=True);d.write_bytes(gzip.compress(b.getvalue(),mtime=0))
main=W/'main-build';scratch=W/'build';B=W/'bundle'
assert (main/'artifacts/pump_fees_candidate.so').read_bytes()==(scratch/'artifacts/pump_fees_candidate.so').read_bytes()
digest=sha(main/'artifacts/pump_fees_candidate.so');assert digest=='a9c4ea9e47356a91bf9bd97318746a7c207b873e32485d7786853f048d7d4afa'
for n,h in read(B/'artifact-hashes.json').items():assert sha(B/n)==h,n
sources=read(main/'build-attempt.json')['source_sha256'];assert len(sources)==22 and all(sha(R/n)==h for n,h in sources.items())
assert sources==read(B/'source-sha256.json')
P.mkdir(exist_ok=False)
for n in ['build-attempt.json','build-comparison.json']:cp(main/n,P/n)
gz(main/'build.log',P/'build.log.gz');cp(main/'artifacts/pump_fees_candidate.so',P/'pump_fees_candidate.so');cp(main/'target/sbf-solana-solana/release/pump_fees_candidate.so',P/'symbol-source.so')
write(P/'source-sha256.json',sources);arc({n:R/n for n in sources},P/'source-snapshot.tar.gz')
for n in ['harness-source-sha256.json','harness-snapshot.tar.gz','runtime-inputs.json','dependency-inputs.json','dependency-verification.json','python-environment.json','toolchain.json']:cp(B/n,P/n)
for n in ['source.patch','provenance.json','static-source-evidence.json','body-analysis.json','original-exit.disassembly.txt','disassembler.json','analyze.py']:
 cp(B/n,P/'static'/n)
cp(B/'REPORT.md',P/'static/SCRATCH-REPORT.md')
for p in (B/'upstream').rglob('*'):
 if p.is_file():cp(p,P/'static'/p.relative_to(B))
for n in ['build-attempt.json','build-comparison.json','build.log.gz','source-sha256.json','source-snapshot.tar.gz','pump_fees_candidate.so','symbol-source.so','function-matches.json.gz']:cp(B/n,P/'scratch'/n)
for p in (B/'harness').glob('*.py'):cp(p,P/'scratch/harness'/p.name)
for n in ['finalize.py','promote_package.py']:cp(W/n,P/'scratch'/n)
cp(B/'runtime-validation.log.gz',P/'runtime-validation.log.gz')
for s,d in [('all-differential.json.gz','differential.json.gz'),('codec-rejections.json.gz','codec-rejections.json.gz'),('historical-replay.json.gz','initializer-history.json.gz'),('initializer-rejections.json.gz','initializer-rejections.json.gz'),('error-literals.json.gz','messages.json.gz'),('compared-values.json.gz','compared-values.json.gz'),('authority-logs.json.gz','authority-logs.json.gz'),('donation-sequence.json.gz','donation-sequence.json.gz'),('signed-transfers.json.gz','signed-transfers.json.gz'),('serialization-error.json.gz','serialization-error.json.gz')]:
 j=json.loads(gzip.decompress((B/'runtime'/s).read_bytes()));assert j['candidate_sha256']==digest and not j['mismatches'];cp(B/'runtime'/s,P/d)
previous=R/'repro/pump_fees/update-admin-dataflow-v144'
for n in ['compared_values.py','authority_logs.py','signed_transfers.py']:cp(previous/n,P/n)
cp(W/'serialization_error.py',P/'serialization_error.py')
write(P/'prior-checkpoint.json',{'path':str(previous.relative_to(R)),'artifact_manifest_sha256':sha(previous/'artifact-hashes.json'),'candidate_sha256':sha(previous/'pump_fees_candidate.so'),'retained_unchanged':True})
write(P/'main-scratch-identity.json',{'main_binary_sha256':digest,'scratch_binary_sha256':sha(scratch/'artifacts/pump_fees_candidate.so'),'byte_equal':True,'bytes':(main/'artifacts/pump_fees_candidate.so').stat().st_size,'main_source_manifest':'source-sha256.json','scratch_source_manifest':'scratch/source-sha256.json','source_files_equal_after_workspace_prefix_removal':True,'scope':'Exact main/scratch source content and whole ELF identity; original full-file equality remains false.'})
summary=read(W/'validation-summary.json');summary.pop('main_and_prior_packages_unchanged');summary.update(main_scratch_byte_equal=True,prior_packages_unchanged=True);write(P/'validation-summary.json',summary)
write(P/'runtime-commands.json',{'cwd':'<repo>','commands':['sh repro/pump_fees/update-admin-dataflow-v144/reproduce-validation.sh work/fees-config-serialization/build/artifacts/pump_fees_candidate.so work/fees-config-serialization/runtime > work/fees-config-serialization/runtime-validation.log 2>&1','work/test-env/bin/python work/fees-config-serialization/serialization_error.py --candidate work/fees-config-serialization/build/artifacts/pump_fees_candidate.so --output work/fees-config-serialization/runtime/serialization-error.json'],'main_receipt_reuse':'Whole main ELF bytes equal the exact scratch ELF that produced every receipt.'})
subprocess.run(['python3',str(R/'repro/pump_fees/framework-matching/match.py'),'--original',str(R/'evidence/original/pump_fees/deployed.so'),'--candidate',str(P/'pump_fees_candidate.so'),'--symbols',str(P/'symbol-source.so'),'--output',str(W/'main-function-matches.json')],check=True);gz(W/'main-function-matches.json',P/'function-matches.json.gz');print(P)
