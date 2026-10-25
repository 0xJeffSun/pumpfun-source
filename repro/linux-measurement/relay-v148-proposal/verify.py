"""Source-only proposal integrity/metadata/plan check; no native process or network."""
from pathlib import Path
import argparse,ast,hashlib,importlib.util,json
P=Path(__file__).resolve().parent;H=lambda b:hashlib.sha256(b).hexdigest();J=lambda p:json.loads(p.read_text())
a=argparse.ArgumentParser();a.add_argument('--repo',type=Path,required=True);args=a.parse_args()
m=J(P/'manifest.json');assert set(m)=={str(f.relative_to(P))for f in P.rglob('*')if f.is_file()and f!=P/'manifest.json'and'__pycache__'not in f.parts}
for n,h in m.items():assert not(P/n).is_symlink()and H((P/n).read_bytes())==h,n
control=P/'original-control';assert H((control/'manifest.json').read_bytes())=='2d04b469ccd478eba0d07b956f2a568e57826c9a5ab130c1520c4ae592f5f38f'
for n,h in J(control/'manifest.json').items():assert H((control/n).read_bytes())==h,n
assert (P/'measure-relay-linux-v148.yml').read_bytes()==(control/'measure-relay-linux-v148.yml').read_bytes()
import difflib
assert (P/'source-hardening.patch').read_text()==''.join(difflib.unified_diff((control/'measure_relay_linux_v148.py').read_text().splitlines(True),(P/'measure_relay_linux_v148.py').read_text().splitlines(True),fromfile='original-control/measure_relay_linux_v148.py',tofile='measure_relay_linux_v148.py'))
for n in ['measure_relay_linux_v148.py','test_measure_relay_linux_v148.py']:ast.parse((P/n).read_text())
s=importlib.util.spec_from_file_location('reviewed_linux_proposal',P/'measure_relay_linux_v148.py');module=importlib.util.module_from_spec(s);s.loader.exec_module(module)
for label,pin in module.ASSETS.items():assert module.selected_asset(J(P/(pin['tag']+'-release.json')),pin)['id']==pin['id']
assert module.ASSETS['compiler']['digest']is None and module.ASSETS['strip']['digest']=='sha256:8b3861e93daf085ec12b65c4fac374d9bec4587a3de16871da6b08ab0c1d907e'
d=J(P/'dry-plan.json');assert len(d['frozen_source'])==23 and d['frozen_source']==module.source_inputs(args.repo.resolve())and d['assets']==module.ASSETS and d['output_created']is False and d['program_build_attempt_limit']==1 and not d['same_full_recipe_claimed']
w=(P/'measure-relay-linux-v148.yml').read_text();assert 'on:\n  workflow_dispatch:\n'in w and all(x not in w for x in['pull_request:','push:','schedule:','secrets.']);assert w.count('--execute')==1 and 'runs-on: ubuntu-24.04'in w and 'persist-credentials: false'in w and '/publication/'in w
t=(P/'synthetic-tests.stderr.txt').read_text();assert 'Ran 27 tests'in t and t.rstrip().endswith('OK')
assert not any(f.suffix in ['.so','.rlib','.bz2']for f in P.rglob('*')if f.is_file())
print(json.dumps({'verified':True,'status':'source-only; root review required before installing or dispatching','synthetic_tests':22,'saved_byte_control_checks':5,'readonly_dry_plan':True,'program_builds_executed':0,'workflow_dispatches':0,'target_or_vm_executions':0,'v148_publisher_digest_available':False,'v152_publisher_digest_pinned':True,'same_full_recipe_claimed':False,'tracked_files_installed':False},indent=2))
