from pathlib import Path
import gzip,hashlib,io,json,shutil,tarfile
R=next(p for p in Path(__file__).resolve().parents if (p/'evidence/original/pump_fees/deployed.so').is_file());W=Path(__file__).resolve().parent;B=W/'bundle'
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();read=lambda p:json.loads(p.read_text())
def cp(s,d):d.parent.mkdir(parents=True,exist_ok=True);shutil.copy2(s,d)
def gz(s,d):d.parent.mkdir(parents=True,exist_ok=True);d.write_bytes(gzip.compress(s.read_bytes(),mtime=0))
def arc(files,d):
 b=io.BytesIO()
 with tarfile.open(fileobj=b,mode='w') as t:
  for n,p in sorted(files.items()):
   x=p.read_bytes();m=tarfile.TarInfo(n);m.size=len(x);m.mode=0o644;t.addfile(m,io.BytesIO(x))
 d.write_bytes(gzip.compress(b.getvalue(),mtime=0))
base=read(W/'provenance.json')['baseline_main_inputs'];assert len(base)==22 and all(sha(R/n)==h for n,h in base.items())
previous=R/'repro/pump_fees/fee-config-serialization-v144';assert all(sha(previous/n)==h for n,h in read(previous/'artifact-hashes.json').items())
B.mkdir(exist_ok=False)
for n in ['REPORT.md','provenance.json','original-call-evidence.json','original-deserializer-calls.json','caller-split-evidence.json','trial1-deltas.json','split-callers-calls.json','split-callers-deltas.json','fieldwise-analysis.json','source.patch','split-callers-source.patch','fieldwise-source.patch','package.py']:
 cp(W/n,B/n)
for p in W.glob('*.disassembly.txt'):cp(p,B/p.name)
cp(W/'split-callers-disassembly.txt',B/'split-callers-disassembly.txt')
for p in (W/'harness').glob('*.py'):cp(p,B/'harness'/p.name)
rows=[]
for label,build,workspace,matches,entry,length in [('branches','build','source','function-matches.json',78104,2664),('split-callers','split-callers-build','split-callers-source','split-callers-matches.json',78240,2472),('fieldwise','fieldwise-build','fieldwise-source','fieldwise-matches.json',78384,2704)]:
 b=W/build;s=W/workspace;d=B/label;d.mkdir();a=read(b/'build-attempt.json');assert a['returncode']==0 and a['source_unchanged'];m=a['source_sha256'];assert len(m)==22 and all(sha(R/n)==h for n,h in m.items());prefix=str(s.relative_to(R))+'/'
 local={n.removeprefix(prefix):R/n for n in m};assert all(not n.startswith('work/') for n in local)
 (d/'source-sha256.json').write_text(json.dumps({n:sha(p) for n,p in local.items()},indent=2)+'\n');arc(local,d/'source-snapshot.tar.gz')
 for n in ['build-attempt.json','build-comparison.json']:cp(b/n,d/n)
 gz(b/'build.log',d/'build.log.gz');cp(b/'artifacts/pump_fees_candidate.so',d/'pump_fees_candidate.so');cp(b/'target/sbf-solana-solana/release/pump_fees_candidate.so',d/'symbol-source.so');gz(W/matches,d/'function-matches.json.gz')
 rows.append({'name':label,'candidate_sha256':sha(d/'pump_fees_candidate.so'),'candidate_bytes':(d/'pump_fees_candidate.so').stat().st_size,'body_entry':entry,'body_bytes':length,'target_original_body_bytes':2648,'body_match':False,'runtime_tested':False,'bound_source_inputs':22})
refs={n:{'path':str((previous/n).relative_to(R)),'sha256':sha(previous/n)} for n in ['artifact-hashes.json','toolchain.json','dependency-inputs.json','dependency-verification.json']};(B/'retained-closure-references.json').write_text(json.dumps(refs,indent=2)+'\n')
report={'main_unchanged':True,'prior_publication_unchanged':True,'original_body':{'start':257264,'bytes':2648},'trials':rows,'promotion_recommended':False,'runtime_transactions':0,'whole_original_identity':False,'scope':'Three bounded source-structure hypotheses remain unmatched; no executable or optimizer attribute changes.'};(B/'trial-summary.json').write_text(json.dumps(report,indent=2)+'\n');(B/'artifact-hashes.json').write_text(json.dumps({str(p.relative_to(B)):sha(p) for p in sorted(B.rglob('*')) if p.is_file()},indent=2)+'\n');(W/'handoff.json').write_text(json.dumps({'bundle':str(B.relative_to(R)),**report},indent=2)+'\n');print(json.dumps(report,indent=2))
