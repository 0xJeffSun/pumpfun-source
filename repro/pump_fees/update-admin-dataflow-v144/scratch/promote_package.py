#!/usr/bin/env python3
from pathlib import Path
import gzip,hashlib,io,json,shutil,subprocess,tarfile
R=next(p for p in Path(__file__).resolve().parents if (p/'evidence/original/pump_fees/deployed.so').is_file())
W=Path(__file__).resolve().parent;P=R/'repro/pump_fees/update-admin-dataflow-v144'
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
read=lambda p:json.loads(p.read_text())
def cp(s,d):d.parent.mkdir(parents=True,exist_ok=True);shutil.copy2(s,d)
def gz(s,d):d.parent.mkdir(parents=True,exist_ok=True);d.write_bytes(gzip.compress(s.read_bytes(),mtime=0))
def write(p,j):p.parent.mkdir(parents=True,exist_ok=True);p.write_text(json.dumps(j,indent=2)+'\n')
def arc(files,d):
 b=io.BytesIO()
 with tarfile.open(fileobj=b,mode='w') as t:
  for n,p in sorted(files.items()):
   data=p.read_bytes();i=tarfile.TarInfo(n);i.size=len(data);i.mode=0o644;t.addfile(i,io.BytesIO(data))
 d.parent.mkdir(parents=True,exist_ok=True);d.write_bytes(gzip.compress(b.getvalue(),mtime=0))
main=W/'main-build';scratch=W/'state-accountinfo-build'
assert (main/'artifacts/pump_fees_candidate.so').read_bytes()==(scratch/'artifacts/pump_fees_candidate.so').read_bytes()
digest=sha(main/'artifacts/pump_fees_candidate.so');assert digest=='b56d1852f9eed1ee1ad423d8724d5254f1e167ff7e76ca7d52ae7829c5e1b309'
P.mkdir(exist_ok=False)
for n in ['build-attempt.json','build-comparison.json']:cp(main/n,P/n)
gz(main/'build.log',P/'build.log.gz');cp(main/'artifacts/pump_fees_candidate.so',P/'pump_fees_candidate.so');cp(main/'target/sbf-solana-solana/release/pump_fees_candidate.so',P/'symbol-source.so')
sources=read(main/'build-attempt.json')['source_sha256'];assert len(sources)==22 and all(sha(R/n)==d for n,d in sources.items())
write(P/'source-sha256.json',sources);arc({n:R/n for n in sources},P/'source-snapshot.tar.gz')
harness=read(W/'runtime-harness-inputs.json');assert all(sha(R/n)==d for n,d in harness.items())
write(P/'harness-source-sha256.json',harness);arc({n:R/n for n in harness},P/'harness-snapshot.tar.gz')
previous=R/'repro/pump_fees/authority-guard-v144'
for n in ['authority_logs.py','compared_values.py','runtime-inputs.json','python-environment.json','dependency-inputs.json','dependency-verification.json']:cp(previous/n,P/n)
cp(W/'signed_transfers.py',P/'signed_transfers.py')
for n in ['source.patch','state-source.patch','accountinfo-source.patch','provenance.json','account-type-evidence.json','body-analysis.json','state-deltas.json','analyze.py']:
 cp(W/n,P/'static'/n)
cp(W/'REPORT.md',P/'static/SCRATCH-REPORT.md')
for phase in ['state','state-accountinfo']:
 b=W/(phase+'-build');d=P/'scratch'/phase;workspace=W/(phase+'-workspace')
 for n in ['build-attempt.json','build-comparison.json']:cp(b/n,d/n)
 gz(b/'build.log',d/'build.log.gz');cp(b/'artifacts/pump_fees_candidate.so',d/'pump_fees_candidate.so');cp(b/'target/sbf-solana-solana/release/pump_fees_candidate.so',d/'symbol-source.so')
 inputs=read(b/'build-attempt.json')['source_sha256'];prefix=str(workspace.relative_to(R))+'/'
 local={n.removeprefix(prefix):R/n for n in inputs};assert len(local)==22 and all(not n.startswith('work/') for n in local)
 write(d/'source-sha256.json',{n:sha(p) for n,p in local.items()});arc(local,d/'source-snapshot.tar.gz')
gz(W/'state-accountinfo-matches.json',P/'scratch/state-accountinfo/function-matches.json.gz')
for p in (W/'harness').glob('*.py'):cp(p,P/'scratch/harness'/p.name)
for n in ['signed_transfers.py','finalize.py','promote_package.py']:cp(W/n,P/'scratch'/n)
gz(W/'runtime-validation.log',P/'runtime-validation.log.gz');gz(W/'signed-transfers.json',P/'signed-transfers.json.gz')
for s,d in [('all-differential.json','differential.json.gz'),('codec-rejections.json','codec-rejections.json.gz'),('historical-replay.json','initializer-history.json.gz'),('initializer-rejections.json','initializer-rejections.json.gz'),('error-literals.json','messages.json.gz'),('compared-values.json','compared-values.json.gz'),('authority-logs.json','authority-logs.json.gz'),('donation-sequence.json','donation-sequence.json.gz')]:
 j=read(W/'runtime'/s);assert j['candidate_sha256']==digest and not j['mismatches'];gz(W/'runtime'/s,P/d)
write(P/'prior-checkpoint.json',{'path':str(previous.relative_to(R)),'artifact_manifest_sha256':sha(previous/'artifact-hashes.json'),'candidate_sha256':sha(previous/'pump_fees_candidate.so'),'retained_unchanged':True})
write(P/'main-scratch-identity.json',{'main_binary_sha256':digest,'scratch_binary_sha256':sha(scratch/'artifacts/pump_fees_candidate.so'),'byte_equal':True,'bytes':(main/'artifacts/pump_fees_candidate.so').stat().st_size,'main_source_manifest':'source-sha256.json','scratch_source_manifest':'scratch/state-accountinfo/source-sha256.json','source_files_equal_after_workspace_prefix_removal':True,'scope':'Exact main/scratch source content and whole ELF identity; original full-file equality remains false.'})
summary=read(W/'validation-summary.json');summary.pop('main_and_frozen_packages_unchanged');summary.update(main_scratch_byte_equal=True,prior_packages_unchanged=True)
write(P/'validation-summary.json',summary)
write(P/'runtime-commands.json',{'cwd':'<repo>','commands':[
 'sh repro/pump_fees/authority-guard-v144/reproduce-validation.sh work/fees-update-admin-dataflow/state-accountinfo-build/artifacts/pump_fees_candidate.so work/fees-update-admin-dataflow/runtime work/test-env/bin/python > work/fees-update-admin-dataflow/runtime-validation.log 2>&1',
 'work/test-env/bin/python work/fees-update-admin-dataflow/signed_transfers.py --candidate work/fees-update-admin-dataflow/state-accountinfo-build/artifacts/pump_fees_candidate.so --output work/fees-update-admin-dataflow/signed-transfers.json'],
 'main_receipt_reuse':'Whole main ELF bytes equal the exact scratch ELF that produced every receipt.'})
subprocess.run(['python3',str(R/'repro/pump_fees/framework-matching/match.py'),'--original',str(R/'evidence/original/pump_fees/deployed.so'),'--candidate',str(P/'pump_fees_candidate.so'),'--symbols',str(P/'symbol-source.so'),'--output',str(W/'main-function-matches.json')],check=True)
gz(W/'main-function-matches.json',P/'function-matches.json.gz')
print(P)
