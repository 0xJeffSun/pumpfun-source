from pathlib import Path
import json,gzip,hashlib,tarfile,shutil
r=Path('work/pump-amm-multi-hop');b=r/'build-05';out=r/'handoff';sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();out.mkdir(exist_ok=False)
def cp(a,z):z.parent.mkdir(parents=True,exist_ok=True);shutil.copyfile(a,z)
def gz(a,z):z.parent.mkdir(parents=True,exist_ok=True);z.write_bytes(gzip.compress(a.read_bytes(),mtime=0))
candidate=b/'artifacts/pump_amm_recovered.so';comparison=json.loads((b/'build-comparison.json').read_text());assert not comparison['comparison']['full_byte_equality']
for p,h in comparison['source_sha256'].items():assert sha(Path(p))==h,p
for n in ['build-attempt.json','build-comparison.json','source-snapshot.tar.gz']:cp(b/n,out/n)
gz(b/'build.log',out/'build.log.gz');cp(candidate,out/'pump_amm_recovered.so')
for n in ['source-copy-check.json','static-evidence.json','independent-compare.py','independent-comparisons.json','run-regressions.py','pump_amm_multi_hop_differential.py','bundle_harness.py','package.py','RECOVERY_NOTES.md']:cp(r/n,out/n)
for n in ['test-source-sha256.json','test-snapshot.tar.gz','regression-run.json']:cp(b/'results'/n,out/n)
for p,h in json.loads((b/'results/test-source-sha256.json').read_text()).items():assert sha(Path(p))==h,p
runtime=json.loads(Path('repro/pump_amm/boost-burn-thirty-six/runtime-input-sha256.json').read_text());p='research/imported-lab/analysis/pump_fun/curve-fresh-trades-v3-signed-surfpool.json';runtime[p]=sha(Path(p));(out/'runtime-input-sha256.json').write_text(json.dumps(runtime,indent=2)+'\n')
for p,h in runtime.items():assert sha(Path(p))==h,p
rows={}
for row in json.loads((b/'results/regression-run.json').read_text()):
 assert row['returncode']==0,row['suite'];p=b/'results'/('multi_hop/report.json'if row['suite']=='multi_hop'else row['suite']+'.json');d=json.loads(p.read_text());assert d['candidate_sha256']==sha(candidate);assert not d.get('mismatches',d.get('failures',[])),p;rows[row['suite']]=d['case_count'];gz(p,out/(row['suite']+'-differential.json.gz'))
assert len(rows)==25 and sum(rows.values())==17462,rows
standalone=json.loads((r/'standalone-05.json').read_text());actual=json.loads((b/'results/multi_hop/report.json').read_text());assert standalone['cases']==actual['cases'];assert not standalone['mismatches'];gz(r/'standalone-05.json',out/'standalone-differential.json.gz')
(out/'standalone-identity.json').write_text(json.dumps({'scope':'Same 735 case results, rerun from /tmp using the bundled scratch harness; not additional unique cases.','cases_equal':True,'case_count':735,'candidate_sha256':sha(candidate),'standalone_harness_sha256':sha(r/'pump_amm_multi_hop_differential.py'),'standalone_report_sha256':sha(r/'standalone-05.json'),'executed_helpers_report_sha256':sha(b/'results/multi_hop/report.json')},indent=2)+'\n')
negative=[]
for n in range(1,5):
 source=r/f'build-{n:02}';dest=out/'unsuccessful-drafts'/f'build-{n:02}';record=json.loads((source/'build-attempt.json').read_text());assert record['source_unchanged']
 snapshot=source/('failed-source.tar.gz'if n==1 else'source-snapshot.tar.gz')
 with tarfile.open(snapshot)as t:
  for p,h in record['source_sha256'].items():
   rel=str(Path(p).relative_to(r/'crate'));member=rel if rel in t.getnames()else'crate/'+rel;assert hashlib.sha256(t.extractfile(member).read()).hexdigest()==h,p
 cp(source/'build-attempt.json',dest/'build-attempt.json');cp(snapshot,dest/'source-snapshot.tar.gz');gz(source/'build.log',dest/'build.log.gz')
 if n>1:
  cp(source/'build-comparison.json',dest/'build-comparison.json');cp(source/'artifacts/pump_amm_recovered.so',dest/'pump_amm_recovered.so');check=r/f'check-{n:02}';d=json.loads((check/'report.json').read_text());gz(check/'report.json',dest/'differential.json.gz')
  for name in ['test-source-sha256.json','test-snapshot.tar.gz']:cp(check/name,dest/name)
  hmap=json.loads((check/'test-source-sha256.json').read_text())
  with tarfile.open(check/'test-snapshot.tar.gz')as t:
   for p,h in hmap.items():assert hashlib.sha256(t.extractfile(p).read()).hexdigest()==h,p
  negative.append({'build':n,'candidate_sha256':d['candidate_sha256'],'case_count':d['case_count'],'passed':d['passed'],'report_sha256':sha(check/'report.json')})
 else:negative.append({'build':n,'returncode':record['returncode'],'compile_failure':'Cannot assign amount through immutable TokenAccount dereference.'})
(out/'unsuccessful-drafts/index.json').write_text(json.dumps(negative,indent=2)+'\n')
observations={}
for p in sorted(r.iterdir()):
 if p.is_file()and(p.name.startswith(('observations-','probe'))or p.suffix=='.asm'or p.name in ['extract_amm.py','decode.py','decoded-events.txt']):
  z=out/'recovery-evidence'/p.name
  if p.suffix in ['.json','.log']:gz(p,z.with_suffix(z.suffix+'.gz'))
  else:cp(p,z)
  observations[str(p.relative_to(r))]=sha(p)
(out/'observation-source-sha256.json').write_text(json.dumps({'scope':'Exploratory original-only receipts and final exploratory script snapshots. Not counted differential executions; not a claim that every exploratory script snapshot is the exact per-probe executed version. Exact differential sources are separately bound by their test archives.','files':observations},indent=2)+'\n')
for n in ['dependency-pins.json','msrv-evidence.json','lock-diff.json','cache-manifest.json','toolchain-input-hashes.json']:cp(Path('repro/pump_amm/compiler-v144')/n,out/'compiler-provenance'/n)
summary={'scope':'Isolated AMM37 adds multi_hop_swap. Bounded local parity with ordinary verified test-owned signatures and actual captured Pump/token CPIs, no live mutation or executable edits.','instruction_bodies':37,'idl_instruction_count':38,'new_instructions':['multi_hop_swap'],'candidate_bytes':candidate.stat().st_size,'candidate_sha256':sha(candidate),'full_byte_equality':False,'validated_cases':sum(rows.values()),'suites':rows,'mismatches':[],'source_inputs':len(comparison['source_sha256']),'test_helper_inputs':len(json.loads((out/'test-source-sha256.json').read_text())),'remaining_idl_instructions':['create_config'],'prior_checkpoint':'repro/pump_amm/boost-burn-thirty-six'};(out/'summary.json').write_text(json.dumps(summary,indent=2)+'\n')
(out/'README.md').write_text('''# AMM37 scratch checkpoint

The candidate adds `multi_hop_swap` to AMM36. All 25 suites pass on this exact clean v1.44 executable: 17,462 cases including 735 new multi-hop comparisons. The same 735 cases were rerun through the bundled scratch harness from `/tmp`, with identical case results. These repeats add no unique cases.

Source, test/helper closure, runtime inputs, actual commands, compiler compatibility controls, negative draft executables, and complete failed build records are preserved and hashed. No original-binary or ELF-extent equality is claimed. The selected lock/toolchain graph is not proof of the historical dependency graph.

The normally signed synthetic fixtures execute real captured Pump CPIs using the AMM's own PDA signing, as well as actual captured token programs. No live mutation, signer bypass, or ELF patching was used. `create_config` remains unimplemented; only legitimate historical signed replays/static evidence are in scope for its fixed administrator. See `RECOVERY_NOTES.md` for behavior and limits.
''')
manifest={str(p.relative_to(out)):sha(p)for p in sorted(out.rglob('*'))if p.is_file()};(out/'manifest-sha256.json').write_text(json.dumps(manifest,indent=2)+'\n');print(json.dumps({**summary,'package_files':len(manifest),'manifest_sha256':sha(out/'manifest-sha256.json')},indent=2))
