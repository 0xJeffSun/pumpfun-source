"""Verify this source-only proposal and run synthetic validation; never run Cargo/rustc."""
from pathlib import Path
import argparse,difflib,hashlib,json,subprocess,sys
P=Path(__file__).resolve().parent
ap=argparse.ArgumentParser();ap.add_argument('--check-repository',action='store_true');a=ap.parse_args()
H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
m=json.loads((P/'manifest.json').read_text());actual={str(p.relative_to(P)) for p in P.rglob('*') if p.is_file() and '__pycache__' not in p.parts};assert actual==set(m)|{'manifest.json'}
for name,digest in m.items():assert H(P/name)==digest,name
history=json.loads((P/'historical-inputs.json').read_text())
for path,digest in history.items():assert H(P/'historical'/Path(path).name)==digest
old=(P/'historical/build_reconstruction_candidate.py').read_text();new=(P/'build_reconstruction_candidate.py').read_text();assert ''.join(difflib.unified_diff(old.splitlines(True),new.splitlines(True),fromfile='a/scripts/build_reconstruction_candidate.py',tofile='b/scripts/build_reconstruction_candidate.py'))==(P/'wrapper-routing.patch').read_text()
for version in ('v1.53','v1.54'):
 policy=P/'supported_sbpf_policies'/(version+'.json');j=json.loads(policy.read_text());plan=json.loads((P/('dry-run-'+version.replace('.','')+'.json')).read_text())
 assert len(j['selected_files'])==38 and j['publisher_digest_verified'] and j['extra_tools_archive_verified']
 assert j['target']=='sbpf-solana-solana' and j['target_rustflags']=='-Zremap-cwd-prefix='
 assert plan['dry_run'] and not plan['comparison_reference_read_before_compile'] and not plan['global_alias_mutated']
 assert len(plan['source_sha256'])==14 and len(plan['tool_sha256'])==42
 assert plan['adapter_sha256']==H(P/'build_supported_sbpf_candidate.py') and plan['policy_sha256']==H(policy)
 assert plan['source_manifest_utility_sha256']==history['scripts/build_source_manifest.py']
 assert '--locked' in plan['command'] and '--offline' in plan['command'] and plan['command'][plan['command'].index('--target')+1]=='sbpf-solana-solana'
 assert not Path(plan['output']).exists(), 'saved dry-run output directory unexpectedly exists'
 if a.check_repository:
  repo=Path(plan['repository'])
  for path,digest in history.items():assert H(repo/path)==digest,path
result=subprocess.run([sys.executable,'-B',str(P/'test_proposal.py')],capture_output=True,text=True)
assert result.returncode==0,result.stdout+result.stderr
assert 'Ran 17 tests' in result.stderr and '\nOK\n' in result.stderr
print(json.dumps({'integrity':True,'synthetic_tests':17,'saved_readonly_plans':2,'historical_helper_unchanged':True,'defaults_unchanged':True,'proposal_compiler_or_VM_runs':0,'repository_installed_or_integrated':False,'live_repository_script_check':a.check_repository},indent=2))
