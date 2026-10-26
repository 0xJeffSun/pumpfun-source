"""Saved review integrity and exact new-plan context; no native controller call."""
from pathlib import Path
import argparse,hashlib,json
P=Path(__file__).resolve().parent;H=lambda b:hashlib.sha256(b).hexdigest();J=lambda p:json.loads(p.read_text())
a=argparse.ArgumentParser();a.add_argument('--plan',type=Path,required=True);Q=a.parse_args().plan
for n,h in J(P/'manifest.json').items():assert H((P/n).read_bytes())==h
assert H((Q/'MANIFEST.json').read_bytes())=='f5d2ce6218e4f56eacda6693ee60dd377c9e4854c0a889989f149cc31fad9985';m=J(Q/'MANIFEST.json');assert len(m)==101
for n,h in m.items():assert H((Q/n).read_bytes())==h,n
assert H((Q/'controller.py').read_bytes())=='84615a14f66614cd2ead9abae4a7005d3da7474e3cd26795336572cee86b2208'
assert H((Q/'source-proposal/manifest.json').read_bytes())=='4e72efa4fadf5bed345b24d78ce4e9362105d89f3eccf858357905c045bcaefd'
q=Q/'source-proposal';pm=J(q/'manifest.json');assert len(pm)==49 and {str(f.relative_to(q))for f in q.rglob('*')if f.is_file()and f!=q/'manifest.json'}==set(pm)
for n,r in pm.items():assert H((q/n).read_bytes())==r['sha256']and(q/n).stat().st_size==r['bytes']
old=J(Q/'predecessor-materials-manifest.json');assert H((Q/'predecessor-materials-manifest.json').read_bytes())=='886910366f561a776c7ddb5c910481a576d4659d8bc2e7e61a608c592dbf9146'
plan=J(Q/'future-plan.json')
for n in ['availability.json','cache-allowlist.json',*plan['helper_sha256']]:
 rel='helpers/'+n if n.startswith('scripts/')else n;assert H((Q/rel).read_bytes())==old[rel]
assert plan['proposed_program_build_attempts']==1 and plan['runtime_executions_permitted']==0 and not plan['current_source_status_default_pointer_writes_permitted']
assert plan['future_experiment_root'].endswith('/cto-wallet-build-01')and plan['future_attempt_claim'].endswith('/cto-wallet-attempt-01.json')
source=J(Q/'source-proposed.json');baseline=J(Q/'source-baseline.json');assert len(source)==37 and[n for n in source if source[n]!=baseline[n]]==['programs/pump/src/admin_cto.rs']
assert source==J(q/'source-proposed.json')and baseline==J(q/'source-baseline.json');assert source['programs/pump/src/admin_cto.rs']=='d6b4937f03a62c013baca8d93bf1be72f035681e17a6a86e19df204c57cce457'
for n,h in source.items():assert H((Q/'source'/n).read_bytes())==h
c=(Q/'controller.py').read_text();assert 'assert manifest_hash==EXPECTED_PLAN_SEAL'in c and "parser.add_argument('--expected-plan-seal')"in c and "re.fullmatch('[0-9a-f]{64}',EXPECTED_PLAN_SEAL or '')"in c
assert "if result['cache_additions_require_review']and result['state']=='build-finished':"in c and "sys.exit(0 if result['state']=='build-finished' else 2)"in c
assert "'compiler_child_exit':None,'strip_child_exit':None"in c
material=J(P/'material-verification.json');assert material['status']=='VERIFIED_UNEXECUTED_WALLET_BUILD_PLAN'and material['material_availability_rehashed']and material['actual_source_baseline_checked']and material['new_builds']==material['runtime_executions']==0
assert 'Ran 3 tests'in(P/'path-tests.txt').read_text()and'OK'in(P/'path-tests.txt').read_text();assert 'Ran 13 tests'in(P/'terminal-tests.txt').read_text()and'OK'in(P/'terminal-tests.txt').read_text()
print('PASS: exact101plan/49proposal/source37/sixpredecessormaterials/controllercontext and retained3+13mockPASS; availabilitywasread-only; no native launch')
