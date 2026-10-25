"""Read-only package tests in an isolated minimal checkout; no builds or VM calls."""
from pathlib import Path
import hashlib,json,os,shutil,subprocess,sys,tempfile
R=Path(__file__).resolve().parents[2];W=Path(__file__).resolve().parent
PREFIX='repro/pump/nested-ancestry-fortyeight';P=R/PREFIX
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
def run(args,cwd='/',ok=True):
 p=subprocess.run(args,cwd=cwd,capture_output=True,text=True);assert (p.returncode==0)==ok,{'args':args,'rc':p.returncode,'out':p.stdout,'err':p.stderr}
 return {'returncode':p.returncode,'stdout':p.stdout,'stderr':p.stderr}
with tempfile.TemporaryDirectory(prefix='nested-publication-clean-')as td:
 root=Path(td).resolve();published=root/PREFIX;published.parent.mkdir(parents=True);shutil.copytree(P,published)
 groups=json.loads((P/'current-bindings.json').read_text())['groups'];inputs={n for group in groups.values()for n in group}
 for n in inputs:
  if n.startswith(PREFIX+'/'):continue
  assert not n.startswith('work/')and not n.endswith('-keypair.json')
  p=root/n;p.parent.mkdir(parents=True,exist_ok=True);shutil.copyfile(R/n,p)
 assert not(root/'work').exists()
 run(['git','init','-q',str(root)]);run(['git','-C',str(root),'add','--','.'])
 command=[sys.executable,'-B',str(published/'verify-package.py'),'--current-main']
 positive=run(command)
 # Both canonical runners resolve repository inputs from the copied marker.
 nested=published/'nested-harness/proposed/pump_nested_general_differential.py';two=published/'harness/pump_tokenkeg_two_curve_differential.py'
 helpchecks=[run([sys.executable,'-B',str(p),'--help'])for p in [nested,two]]
 probe="""from pathlib import Path
import importlib.util,json,sys
p=Path(sys.argv[1]);sys.path.insert(0,str(p/'nested-harness/proposed'))
def load(name,path):
 s=importlib.util.spec_from_file_location(name,path);m=importlib.util.module_from_spec(s);s.loader.exec_module(m);return m
n=load('nested_publication_probe',p/'nested-harness/proposed/pump_nested_general_differential.py')
t=load('two_curve_publication_probe',p/'harness/pump_tokenkeg_two_curve_differential.py')
nb=n.bindings(p/'candidate.so',p/'build-comparison.json');tb=t.bindings(p/'candidate.so',p/'build-comparison.json')
assert nb['compiled_candidate_binding']['actual_source_sha256']==tb['compiled_candidate_binding']['actual_source_sha256']
assert len(nb['compiled_candidate_binding']['actual_source_sha256'])==37
print(json.dumps({'source_inputs':37,'nested_harness_inputs':len(nb['proposed_harness_inputs']),'two_curve_report':tb['compiled_candidate_binding']['report'],'new_transactions':0}))
"""
 binding=run([sys.executable,'-B','-c',probe,str(published)])
 saved=run([sys.executable,'-B',str(nested.parent/'verify_saved.py'),str(published/'differential/general_nested.json.gz')])
 missing=root/'scripts/pump_create_nested_fixture.py';kept=missing.read_bytes();missing.unlink()
 missing_result=run(command,ok=False);assert 'pump_create_nested_fixture.py'in missing_result['stderr'];missing.write_bytes(kept)
 document=root/'programs/pump/README.md';kept=document.read_bytes();document.write_bytes(kept+b'\nDeliberate copied-checkout tamper.\n')
 tamper_result=run(command,ok=False);assert 'documentation'in tamper_result['stderr']and 'programs/pump/README.md'in tamper_result['stderr'];document.write_bytes(kept)
 # Remove symbol artifact from only the disposable copy; do not modify ELF bytes.
 symbols=published/'unstripped.so';kept=symbols.read_bytes();symbols.unlink()
 payload_result=run(command,ok=False);assert 'publication payload set'in payload_result['stderr'];symbols.write_bytes(kept)
 final=run(command)
 # Exercise the unchanged central saved-build verifier against only a temporary
 # proposed Pump status row. This never edits repository status or dispatchers.
 shutil.copyfile(R/'scripts/verify_recovered_builds.py',root/'scripts/verify_recovered_builds.py')
 (root/'repro/status.json').write_text(json.dumps({'pump':json.loads((published/'status-pump-proposal.json').read_text())})+'\n')
 compatibility=run([sys.executable,'-B',str(root/'scripts/verify_recovered_builds.py'),'--program','pump'])
 result={'scope':'Minimal copied checkout staged only in a temporary Git repository, launched from /. No work directory, local Surfpool, compiler, VM execution or new transaction required. Main repository never staged.','package_manifest_sha256_tested':sha(P/'manifest-sha256.json'),'positive':json.loads(positive['stdout']),'canonical_help_checks':[x['returncode']for x in helpchecks],'canonical_read_only_binding':json.loads(binding['stdout']),'canonical_saved_nested_verifier':json.loads(saved['stdout']),'negative_missing_tracked_fixture':missing_result,'negative_changed_bound_README':tamper_result,'negative_missing_symbol_payload':payload_result,'restored_positive':json.loads(final['stdout']),'central_verifier_compatibility':compatibility,'central_verifier_sha256':sha(R/'scripts/verify_recovered_builds.py')}
 (W/'portability-checks.json').write_text(json.dumps(result,indent=2)+'\n')
 print(json.dumps({'status':'PASS','copied_checkout_inputs':len(inputs),'positive':2,'meaningful_negatives':3,'canonical_harness_imports_and_build_bindings':True,'saved_nested_signatures':64,'new_transactions':0}))
