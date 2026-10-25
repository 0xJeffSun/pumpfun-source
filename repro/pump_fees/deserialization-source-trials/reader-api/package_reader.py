from pathlib import Path
import gzip,hashlib,io,json,shutil,tarfile
R=next(p for p in Path(__file__).resolve().parents if (p/'evidence/original/pump_fees/deployed.so').is_file());W=Path(__file__).resolve().parent;B=W/'reader-bundle'
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();read=lambda p:json.loads(p.read_text())
def cp(s,d):d.parent.mkdir(parents=True,exist_ok=True);shutil.copy2(s,d)
def arc(files,d):
 b=io.BytesIO()
 with tarfile.open(fileobj=b,mode='w') as t:
  for n,p in sorted(files.items()):
   data=p.read_bytes();m=tarfile.TarInfo(n);m.size=len(data);m.mode=0o644;t.addfile(m,io.BytesIO(data))
 d.write_bytes(gzip.compress(b.getvalue(),mtime=0))
assert all(sha(W/'bundle'/n)==h for n,h in read(W/'bundle/artifact-hashes.json').items())
assert all(sha(R/n)==h for n,h in read(W/'provenance.json')['baseline_main_inputs'].items())
P=R/'repro/pump_fees/fee-config-serialization-v144';assert all(sha(P/n)==h for n,h in read(P/'artifact-hashes.json').items())
build=W/'reader-build';binary=build/'artifacts/pump_fees_candidate.so';previous=W/'split-callers-build/artifacts/pump_fees_candidate.so';assert binary.read_bytes()==previous.read_bytes()
attempt=read(build/'build-attempt.json');assert attempt['returncode']==0 and attempt['source_unchanged'];m=attempt['source_sha256'];assert len(m)==22 and all(sha(R/n)==h for n,h in m.items())
B.mkdir(exist_ok=False)
for n in ['READER-REPORT.md','reader-evidence.json','reader-source.patch','provenance.json','package_reader.py']:cp(W/n,B/n)
for p in (W/'reader-evidence').rglob('*'):
 if p.is_file():cp(p,B/p.relative_to(W))
for p in (W/'harness').glob('*.py'):cp(p,B/'harness'/p.name)
for n in ['build-attempt.json','build-comparison.json']:cp(build/n,B/n)
(B/'build.log.gz').write_bytes(gzip.compress((build/'build.log').read_bytes(),mtime=0));cp(binary,B/'pump_fees_candidate.so');cp(build/'target/sbf-solana-solana/release/pump_fees_candidate.so',B/'symbol-source.so')
prefix=str((W/'reader-source').relative_to(R))+'/';local={n.removeprefix(prefix):R/n for n in m};(B/'source-sha256.json').write_text(json.dumps({n:sha(p) for n,p in local.items()},indent=2)+'\n');arc(local,B/'source-snapshot.tar.gz')
identity={'candidate_sha256':sha(binary),'candidate_bytes':binary.stat().st_size,'byte_identical_to_split_callers_trial':True,'previous_candidate_sha256':sha(previous),'previous_evidence_manifest_sha256':sha(W/'bundle/artifact-hashes.json'),'bound_source_inputs':22,'original_field_decoder_bytes':2648,'candidate_field_decoder_bytes':2472,'targeted_body_match':False,'runtime_transactions':0,'main_unchanged':True,'prior_bundles_and_publication_unchanged':True,'promotion_recommended':False}
(B/'identity.json').write_text(json.dumps(identity,indent=2)+'\n');cp(W/'bundle/retained-closure-references.json',B/'retained-closure-references.json');(B/'artifact-hashes.json').write_text(json.dumps({str(p.relative_to(B)):sha(p) for p in sorted(B.rglob('*')) if p.is_file()},indent=2)+'\n');(W/'reader-handoff.json').write_text(json.dumps({'bundle':str(B.relative_to(R)),**identity},indent=2)+'\n');print(json.dumps(identity,indent=2))
