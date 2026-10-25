from pathlib import Path
import json,gzip,hashlib,tarfile,shutil
r=Path('work/pump-amm-boost-burn');b=r/'build-02';out=r/'handoff';sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();out.mkdir(exist_ok=False)
def cp(a,z):z.parent.mkdir(parents=True,exist_ok=True);shutil.copyfile(a,z)
def gz(a,z):z.parent.mkdir(parents=True,exist_ok=True);z.write_bytes(gzip.compress(a.read_bytes(),mtime=0))
candidate=b/'artifacts/pump_amm_recovered.so';comparison=json.loads((b/'build-comparison.json').read_text());assert not comparison['comparison']['full_byte_equality']
for p,h in comparison['source_sha256'].items():assert sha(Path(p))==h,p
for n in ['build-attempt.json','build-comparison.json','source-snapshot.tar.gz']:cp(b/n,out/n)
gz(b/'build.log',out/'build.log.gz');cp(candidate,out/'pump_amm_recovered.so')
for n in ['source-copy-check.json','static-evidence.json','independent-compare.py','independent-comparisons.json','run-regressions.py','boost-burn-differential.py','package.py','RECOVERY_NOTES.md']:cp(r/n,out/n)
for n in ['test-source-sha256.json','test-snapshot.tar.gz','regression-run.json']:cp(b/'results'/n,out/n)
for p,h in json.loads((b/'results/test-source-sha256.json').read_text()).items():assert sha(Path(p))==h,p
cp(Path('repro/pump_amm/legacy-buy-thirty-five/runtime-input-sha256.json'),out/'runtime-input-sha256.json')
for p,h in json.loads((out/'runtime-input-sha256.json').read_text()).items():assert sha(Path(p))==h,p
rows={}
for row in json.loads((b/'results/regression-run.json').read_text()):
 assert row['returncode']==0,row['suite'];p=b/'results'/(row['suite']+'.json');d=json.loads(p.read_text());assert d['candidate_sha256']==sha(candidate);assert not d.get('mismatches',d.get('failures',[])),p;rows[row['suite']]=d['case_count'];gz(p,out/(row['suite']+'-differential.json.gz'))
assert len(rows)==24 and sum(rows.values())==16727,rows
source=r/'build-01';dest=out/'unsuccessful-drafts/build-01';record=json.loads((source/'build-attempt.json').read_text());assert record['source_unchanged']and record['returncode']!=0
with tarfile.open(source/'source-snapshot.tar.gz')as t:
 for p,h in record['source_sha256'].items():assert hashlib.sha256(t.extractfile(str(Path(p).relative_to(r/'crate'))).read()).hexdigest()==h,p
for n in ['build-attempt.json','source-snapshot.tar.gz']:cp(source/n,dest/n)
gz(source/'build.log',dest/'build.log.gz')
observations={}
for p in sorted(r.iterdir()):
 if p.is_file()and(p.name.startswith(('observations-','probe'))or p.suffix=='.asm'or p.name in ['extract_amm.py']):
  z=out/'recovery-evidence'/p.name
  if p.suffix in ['.json','.log']:gz(p,z.with_suffix(z.suffix+'.gz'))
  else:cp(p,z)
  observations[str(p.relative_to(r))]=sha(p)
(out/'observation-source-sha256.json').write_text(json.dumps({'scope':'Exploratory original-only receipts and final exploratory script snapshots. These are not counted differential executions; exact executed test source is separately bound by test-source-sha256.json and its tar snapshot.','files':observations},indent=2)+'\n')
for n in ['dependency-pins.json','msrv-evidence.json','lock-diff.json','cache-manifest.json','toolchain-input-hashes.json']:cp(Path('repro/pump_amm/compiler-v144')/n,out/'compiler-provenance'/n)
summary={'scope':'Isolated AMM36 adds boost_buy_and_burn. Bounded local parity with ordinary verified test-owned signatures and captured dependencies, no live mutation or executable edits.','instruction_bodies':36,'idl_instruction_count':38,'new_instructions':['boost_buy_and_burn'],'candidate_bytes':candidate.stat().st_size,'candidate_sha256':sha(candidate),'full_byte_equality':False,'validated_cases':sum(rows.values()),'suites':rows,'mismatches':[],'main_source_changed':False,'source_inputs':len(comparison['source_sha256']),'test_helper_inputs':len(json.loads((out/'test-source-sha256.json').read_text())),'remaining_idl_instructions':['create_config','multi_hop_swap'],'prior_checkpoint':'repro/pump_amm/legacy-buy-thirty-five'};(out/'summary.json').write_text(json.dumps(summary,indent=2)+'\n')
(out/'README.md').write_text('''# AMM36 scratch checkpoint

This package adds `boost_buy_and_burn` to AMM35. All 24 suites passed against this exact executable: 16,727 comparisons including 506 new boost cases. The executable was built clean from isolated Rust source with the validated v1.44 compatibility lock graph. Lock/toolchain selection is not proof of the historical dependency graph. Full original and ELF-extent byte equality remain false.

`source-snapshot.tar.gz` uses crate-relative paths. `test-snapshot.tar.gz` binds the actual maintained helper closure and standalone scratch test; `regression-run.json` contains actual commands. Runtime inputs and compiler/dependency provenance are hashed. The failed borrow-check draft retains its source and complete build record. Exploratory original-only probes are retained separately and are not counted as additional validations.

The 506 new comparisons use synthetic configured boost authority and ordinary verified local signatures with actual captured token CPIs, including quote transfer, base burn, both event encodings, final vault close, Token-2022 fee harvesting, missing write privilege and arithmetic boundaries. No broadcast or signer bypass is used. See RECOVERY_NOTES.md for limitations and original function mapping. Main source has not been changed by this lane; create_config and multi_hop_swap remain missing.
''')
manifest={str(p.relative_to(out)):sha(p)for p in sorted(out.rglob('*'))if p.is_file()};(out/'manifest-sha256.json').write_text(json.dumps(manifest,indent=2)+'\n');print(json.dumps({**summary,'package_files':len(manifest),'manifest_sha256':sha(out/'manifest-sha256.json')},indent=2))
