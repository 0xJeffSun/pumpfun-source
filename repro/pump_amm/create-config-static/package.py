from pathlib import Path
import json,hashlib,tarfile,shutil,gzip,subprocess,sys,platform,importlib.metadata
w=Path(__file__).resolve().parent;root=w.parents[1];dest=w/'handoff';assert not dest.exists();dest.mkdir()
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
def cp(src,name=None):
 out=dest/(name or src.name);out.parent.mkdir(parents=True,exist_ok=True);shutil.copyfile(src,out)
def gz(src,name):
 out=dest/name;out.parent.mkdir(parents=True,exist_ok=True);out.write_bytes(gzip.compress(src.read_bytes(),mtime=0))
for n in ['STATIC_FINDINGS.md','original-evidence.json','extract_amm.py','match.py','elf_analysis.py','matcher-provenance.json','matcher-failure-01.json','matcher-interruption.json','match-initial-slow.py','rejection_probe.py','main-unchanged.json','package.py']:cp(w/n)
for p in w.glob('*.asm'):cp(p,'original-static/'+p.name)
for n in [1,2,3,4,5]:
 b=w/f'build-{n:02d}';label='final-build'if n==5 else f'prior-builds/build-{n:02d}'
 for f in ['build-attempt.json','build-comparison.json','source-snapshot.tar.gz','function-match-bounded.log','scalar-setter-negative-analysis.json']:
  if (b/f).exists():cp(b/f,label+'/'+f)
 for f in ['build.log','function-matches.json','rejection-results.json']:
  if (b/f).exists():gz(b/f,label+'/'+f+'.gz')
 for f in ['artifacts/pump_amm_recovered.so','target/sbf-solana-solana/release/pump_amm_recovered.so']:
  if (b/f).exists()and ('target'not in f or n==5):cp(b/f,label+('/unstripped.so'if'target'in f else '/pump_amm_recovered.so'))
for p in (root/'repro/pump_amm/multi-hop-thirty-seven/compiler-provenance').iterdir():
 if p.is_file():cp(p,'compiler-provenance/'+p.name)
# Exact current helpers used by the test. Earlier source snapshots remain per build.
helpers=[w/'rejection_probe.py',w/'match.py',w/'elf_analysis.py',root/'scripts/pump_amm_admin_differential.py',root/'scripts/pump_amm_reusable_harness.py',root/'scripts/build_partial_candidate.py',root/'scripts/build_source_manifest.py',root/'scripts/compare.py']
hashes={str(p.relative_to(root)):sha(p)for p in helpers}
(dest/'helper-input-sha256.json').write_text(json.dumps(hashes,indent=2)+'\n')
with tarfile.open(dest/'helper-snapshot.tar.gz','w:gz')as t:
 for p in helpers:t.add(p,arcname=str(p.relative_to(root)))
inputs=['evidence/original/pump_amm/deployed.so','evidence/upstream/pump_amm.json','research/imported-lab/analysis/pump_fun/config-snapshot.json']
(dest/'runtime-input-sha256.json').write_text(json.dumps({p:sha(root/p)for p in inputs},indent=2)+'\n')
import solders
extensions=list(Path(solders.__file__).parent.glob('*.so'))
(dest/'test-environment.json').write_text(json.dumps({'python':sys.version,'platform':platform.platform(),'solders_version':importlib.metadata.version('solders'),'extension_sha256':{str(p):sha(p)for p in extensions},'execution':'LiteSVM offline; normal Transaction signatures verified; no RPC or broadcasts'},indent=2)+'\n')
r=json.loads((w/'build-05/rejection-results.json').read_text());m=json.loads((w/'build-05/function-matches.json').read_text());a=w/'build-05/artifacts/pump_amm_recovered.so'
assert not r['mismatches']and r['case_count']==372 and r['positive_runtime_cases']==0
assert all(all(side['signature_verification'])and side['error'] is not None for row in r['cases']for side in [row['original'],row['candidate']])
selected=[x for x in m['selected_functions']if x['matches']];calls=[c for x in selected for c in x['matches'][0]['direct_target_checks']]
summary={'scope':'Isolated static-only create_config hypothesis; not promoted, no main changes, no positive runtime case, no new implemented-handler claim.','candidate_sha256':sha(a),'candidate_bytes':a.stat().st_size,'build_inputs':20,'selected_complete_normalized_body_matches':len(selected),'selected_functions_compared':len(m['selected_functions']),'matched_body_direct_calls':len(calls),'direct_calls_with_matching_target_bodies':sum(c['target_has_matching_full_body']for c in calls),'unmatched_direct_calls':[c for c in calls if not c['target_has_matching_full_body']],'negative_runtime_cases':372,'runtime_transactions':744,'positive_runtime_cases':0,'full_byte_equality':False,'original_elf_extent_equality':False,'main_AMM37_unchanged':True,'prior_regression_suites_rerun':False,'compatibility_lock_and_compiler_do_not_prove_historical_build':True}
(dest/'summary.json').write_text(json.dumps(summary,indent=2)+'\n')
manifest={str(p.relative_to(dest)):sha(p)for p in sorted(dest.rglob('*'))if p.is_file()and p.name!='manifest-sha256.json'};(dest/'manifest-sha256.json').write_text(json.dumps(manifest,indent=2)+'\n')
for p,h in manifest.items():assert sha(dest/p)==h
result={'package':str(dest.relative_to(root)),'manifest_sha256':sha(dest/'manifest-sha256.json'),'package_files':len(manifest),**summary};(w/'handoff-status.json').write_text(json.dumps(result,indent=2)+'\n');print(json.dumps(result,indent=2))
