"""Freeze the independent two-feature Pump scratch build after every check passes."""
from pathlib import Path
import gzip,hashlib,json,shutil,tarfile
W=Path(__file__).resolve().parent;R=W.parents[1];D=W/'handoff';sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
candidate=W/'build/artifacts/pump_recovered.so';expected='c07e67b055c87da881b33c9e07bddf913d5b0beffa1cfe52169ba1bc3f6d2bbf'
assert sha(candidate)==expected and candidate.stat().st_size==1405520
verification=json.loads((W/'independent-verification.json').read_text());assert verification['candidate_sha256']==expected and not verification['mismatches']
assert verification['differential_cases']==8654 and verification['surfpool_comparisons']==1024 and verification['surfpool_signed_transactions']==2048
inputs=json.loads((W/'inputs-before.json').read_text())
for group in ['harness_sha256','repository_fixture_snapshot_sha256','orchestration_sha256','main41_source_before']:
 for p,h in inputs[group].items():assert sha(R/p)==h,p
build=json.loads((W/'build/build-comparison.json').read_text());attempt=json.loads((W/'build/build-attempt.json').read_text())
assert attempt['returncode']==0 and attempt['source_unchanged']
before={str(Path(p).relative_to('programs/pump')):h for p,h in inputs['main41_source_before'].items()}
after={str(Path(p).relative_to('work/pump-holder-nested-main41/crate')):h for p,h in build['source_sha256'].items()}
changed=sorted(p for p in set(before)|set(after)if before.get(p)!=after.get(p))
assert changed==['src/create_v2.rs','src/holder_distribution.rs','src/lib.rs'],changed
assert len(after)==31
D.mkdir(exist_ok=False)
def cp(src,dest):dest.parent.mkdir(parents=True,exist_ok=True);shutil.copyfile(src,dest)
def gz(src,dest):dest.parent.mkdir(parents=True,exist_ok=True);dest.write_bytes(gzip.compress(src.read_bytes(),mtime=0))
for name in ['README.md','inputs-before.json','harness-snapshot.tar.gz','test-environment.json','source-review.json','main41-source-before.json','independent-verification.json','bind-inputs.py','run-regressions.py','run-surfpool.py','verify-evidence.py','package.py']:
 cp(W/name,D/name)
for name in ['build-attempt.json','build-comparison.json']:cp(W/'build'/name,D/name)
gz(W/'build/build.log',D/'build.log.gz');cp(candidate,D/'candidate.so');cp(W/'build/target/sbf-solana-solana/release/pump_recovered.so',D/'unstripped.so')
with tarfile.open(D/'source-snapshot.tar.gz','w:gz')as t:
 for p,h in build['source_sha256'].items():assert sha(R/p)==h,p;t.add(R/p,arcname=p)
helpers={str((W/name).relative_to(R)):sha(W/name)for name in ['verify-evidence.py','package.py']}
(D/'verification-helper-sha256.json').write_text(json.dumps(helpers,indent=2)+'\n')
with tarfile.open(D/'verification-helpers.tar.gz','w:gz')as t:
 for p in helpers:t.add(R/p,arcname=p)
delta={'scope':'Exact frozen main41 to isolated candidate source delta. No other source edits.',
 'changed_paths':changed,'main_source_unchanged':True,'before':before,'scratch_after':after}
(D/'source-delta.json').write_text(json.dumps(delta,indent=2)+'\n')
copied={};suites={};rows=json.loads((W/'differential/run.json').read_text())
for row in rows:
 p=W/'differential'/(row['suite']+'.json.gz');raw=p.read_bytes();plain=gzip.decompress(raw)if raw.startswith(b'\x1f\x8b')else raw
 report=json.loads(plain);report.setdefault('case_count',len(report['cases']));suites[row['suite']]=report
 target=D/'differential'/(row['suite']+'.json.gz');target.parent.mkdir(exist_ok=True)
 target.write_bytes(raw if raw.startswith(b'\x1f\x8b')else gzip.compress(raw,mtime=0))
 copied[str(target.relative_to(D))]={'executed_path':str(p.relative_to(R)),'executed_file_sha256':sha(p),'stored_file_sha256':sha(target),'decompressed_sha256':hashlib.sha256(plain).hexdigest()}
 gz(W/'differential'/(row['suite']+'.log'),D/'differential'/(row['suite']+'.log.gz'))
for name in ['run.json','summary.json']:cp(W/'differential'/name,D/'differential'/name)
aggregate={'scope':'42 recovered handlers plus partial v3 trades and create_v2. Exact frozen main41 plus holder distribution and depth-one normal-SOL-root creation; known sell_v2 transfer-fee mismatch remains unchanged.',
 'candidate_sha256':expected,'original_sha256':verification['original_sha256'],'case_count':8654,'mismatches':[],
 'group_cases':{'main41':7957,'focused':697},'suites':suites}
(D/'all-differential.json.gz').write_bytes(gzip.compress((json.dumps(aggregate,separators=(',',':'))+'\n').encode(),mtime=0))
surfrows=json.loads((W/'surfpool/run.json').read_text());assert len(surfrows)==28
executables={}
for row in surfrows:
 directory=R/row['output'];dest=D/'surfpool'/row['name'];dest.mkdir(parents=True)
 for p in sorted(directory.iterdir()):
  if not p.is_file():continue
  if p.suffix=='.so':
   digest=sha(p);assert digest==(expected if p.name=='candidate.so'else verification['original_sha256'])
   executables[str(p.relative_to(R))]=digest
  elif p.suffix in ['.json','.log']:
   q=dest/(p.name+'.gz');gz(p,q);copied[str(q.relative_to(D))]={'executed_path':str(p.relative_to(R)),'executed_file_sha256':sha(p),'stored_file_sha256':sha(q),'decompressed_sha256':sha(p)}
  else:raise AssertionError(('Unexpected unclassified Surfpool output',str(p)))
 gz(W/'surfpool'/(row['name']+'.log'),dest/'runner.log.gz')
cp(W/'surfpool/run.json',D/'surfpool-run.json')
(D/'surfpool-executable-sha256.json').write_text(json.dumps(executables,indent=2)+'\n')
(D/'receipt-copy-map.json').write_text(json.dumps(copied,indent=2)+'\n')
origins={}
for short,lane in [('holder','pump-holder-distribution-recovery'),('nested','pump-create-nested-recovery')]:
 p=R/'work'/lane/'parent-verified-handoff';m=json.loads((p/'manifest-sha256.json').read_text())
 for n,h in m.items():assert sha(p/n)==h,n
 shutil.copytree(p,D/'imported-handoffs'/short)
 origins[short]={'original_path':str(p.relative_to(R)),'manifest_sha256':sha(p/'manifest-sha256.json'),'files':len(m)}
(D/'import-provenance.json').write_text(json.dumps(origins,indent=2)+'\n')
summary={'scope':'Isolated current-main41 plus two independent recoveries. Main unchanged; no promotion or byte-identity claim.',
 'candidate_sha256':expected,'candidate_bytes':candidate.stat().st_size,'instruction_bodies':42,'partial_paths':['buy_v3','sell_v3','buy_exact_quote_in_v3','create_v2'],
 'full_byte_equality':False,'differential_cases':8654,'differential_suites':35,'differential_groups':{'main41':7957,'focused':697},
 'surfpool_comparisons':1024,'surfpool_suites':28,'surfpool_signed_transactions':2048,'surfpool_groups':{'main41':936,'focused':88},
 'source_files_verified':31,'harness_files_verified':86,'fixture_files_verified':27,'orchestration_files_verified':3,
 'main_source_changed':False,'mismatches':[],'known_sell_v2_gap_preserved':True,
 'new_source_paths':['src/holder_distribution.rs','src/lib.rs','src/create_v2.rs'],
 'limits':['Depth-one normal SOL-root nested creation only; Mayhem, migrated-parent and deeper routes remain partial.','Existing sell_v2 quote-transfer-fee minimum-output and fee-event mismatch remains; no correction or new probes.','V3 trade extension/fee recovery, incentives and initializer recovery excluded.','Historical full source/compiler/dependency reconstruction and security audit remain incomplete.']}
(D/'summary.json').write_text(json.dumps(summary,indent=2)+'\n')
manifest={str(p.relative_to(D)):sha(p)for p in sorted(D.rglob('*'))if p.is_file()}
(D/'manifest-sha256.json').write_text(json.dumps(manifest,indent=2)+'\n')
for p,h in manifest.items():assert sha(D/p)==h,p
status={'package':str(D.relative_to(R)),'package_files':len(manifest),'manifest_sha256':sha(D/'manifest-sha256.json'),**summary}
(W/'handoff-status.json').write_text(json.dumps(status,indent=2)+'\n');print(json.dumps(status,indent=2))
