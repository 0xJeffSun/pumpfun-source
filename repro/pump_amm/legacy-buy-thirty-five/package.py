from pathlib import Path
import json,gzip,hashlib,tarfile,shutil
r=Path('work/pump-amm-legacy-buy');b=r/'build-03';out=r/'handoff';sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();out.mkdir(exist_ok=False)
def cp(a,z):z.parent.mkdir(parents=True,exist_ok=True);shutil.copyfile(a,z)
def gz(a,z):z.parent.mkdir(parents=True,exist_ok=True);z.write_bytes(gzip.compress(a.read_bytes(),mtime=0))
candidate=b/'artifacts/pump_amm_recovered.so';comparison=json.loads((b/'build-comparison.json').read_text())
assert not comparison['comparison']['full_byte_equality']
for p,h in comparison['source_sha256'].items():assert sha(Path(p))==h,p
for n in ['build-attempt.json','build-comparison.json','source-snapshot.tar.gz']:cp(b/n,out/n)
gz(b/'build.log',out/'build.log.gz');cp(candidate,out/'pump_amm_recovered.so')
for n in ['source-copy-check.json','static-evidence.json','independent-compare.py','independent-comparisons.json','run-regressions.py','buy-differential.py','sell-differential.py','package.py','sell-event-correction.json']:cp(r/n,out/n)
for n in ['test-source-sha256.json','test-snapshot.tar.gz','regression-run.json']:cp(b/'results'/n,out/n)
for p,h in json.loads((b/'results/test-source-sha256.json').read_text()).items():assert sha(Path(p))==h,p
cp(Path('work/pump-amm-legacy-sell/runtime-input-sha256.json'),out/'runtime-input-sha256.json')
for p,h in json.loads((out/'runtime-input-sha256.json').read_text()).items():assert sha(Path(p))==h,p
rows={}
for row in json.loads((b/'results/regression-run.json').read_text()):
 assert row['returncode']==0,row['suite'];p=b/'results'/(row['suite']+'.json');d=json.loads(p.read_text());assert d['candidate_sha256']==sha(candidate);assert not d.get('mismatches',d.get('failures',[])),p;rows[row['suite']]=d['case_count'];gz(p,out/(row['suite']+'-differential.json.gz'))
assert len(rows)==23 and sum(rows.values())==16221,rows
for attempt in ['01','02']:
 source=r/('build-'+attempt);dest=out/'unsuccessful-drafts'/('build-'+attempt);record=json.loads((source/'build-attempt.json').read_text());assert record['source_unchanged']
 with tarfile.open(source/'source-snapshot.tar.gz') as t:
  for p,h in record['source_sha256'].items():assert hashlib.sha256(t.extractfile(str(Path(p).relative_to(r/'crate'))).read()).hexdigest()==h,p
 for n in ['build-attempt.json','build-comparison.json','source-snapshot.tar.gz','differential.py','probe.py']:cp(source/n,dest/n)
 gz(source/'build.log',dest/'build.log.gz');d=json.loads((r/('differential-'+attempt+'.json')).read_text());assert sha(source/'differential.py')==d['script_sha256'];assert sha(source/'probe.py')==d['probe_sha256'];gz(r/('differential-'+attempt+'.json'),dest/'differential.json.gz')
observations={}
for p in sorted(r.iterdir()):
 if p.is_file() and (p.name.startswith(('observations-','probe')) or p.suffix=='.asm' or p.name in ['extract_amm.py','decode_event.py','sell-zero-cashback-event-gap.json']):
  dest=out/'recovery-evidence'/p.name
  if p.suffix in ['.json','.log']:gz(p,dest.with_suffix(dest.suffix+'.gz'))
  else:cp(p,dest)
  observations[str(p.relative_to(r))]=sha(p)
(out/'observation-source-sha256.json').write_text(json.dumps(observations,indent=2)+'\n')
for n in ['dependency-pins.json','msrv-evidence.json','lock-diff.json','cache-manifest.json','toolchain-input-hashes.json']:cp(Path('repro/pump_amm/compiler-v144')/n,out/'compiler-provenance'/n)
summary={'scope':'Isolated AMM35: two legacy buy bodies and correction for AMM33 zero-fee cashback sell event labels. Bounded local parity; ordinary verified signatures and actual captured dependencies, no live mutation or executable edits.','instruction_bodies':35,'idl_instruction_count':38,'new_instructions':['buy','buy_exact_quote_in'],'corrected_instruction':'sell','candidate_bytes':candidate.stat().st_size,'candidate_sha256':sha(candidate),'full_byte_equality':False,'validated_cases':sum(rows.values()),'suites':rows,'mismatches':[],'main_source_changed':False,'source_inputs':len(comparison['source_sha256']),'test_helper_inputs':len(json.loads((out/'test-source-sha256.json').read_text())),'remaining_idl_instructions':['boost_buy_and_burn','create_config','multi_hop_swap']};(out/'summary.json').write_text(json.dumps(summary,indent=2)+'\n');cp(r/'README-handoff.md',out/'README.md')
manifest={str(p.relative_to(out)):sha(p) for p in sorted(out.rglob('*')) if p.is_file()};(out/'manifest-sha256.json').write_text(json.dumps(manifest,indent=2)+'\n');print(json.dumps({**summary,'package_files':len(manifest),'manifest_sha256':sha(out/'manifest-sha256.json')},indent=2))
