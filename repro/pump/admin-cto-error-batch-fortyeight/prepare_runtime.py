from pathlib import Path
import ast,difflib,gzip,hashlib,json,shutil,sys,tarfile
R=Path.cwd();W=R/'work/pump-admin-cto-error-batch-build';B=R/'repro/pump/nested-general-route-fortyeight';H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();J=lambda p:json.loads(p.read_text())
def save(n,v):(W/n).write_text(json.dumps(v,indent=2)+'\n')
assert J(W/'build-result.json')['returncode']==0 and not J(W/'build-result.json')['backend_stack_failures']
L=W/'runtime-layer';assert L.is_dir()
assert (L/'nested-harness').is_dir()and(L/'route-harness').is_dir()
old=(B/'nested-harness/expected-source-map.json').read_text();new=(W/'source-sha256.json').read_text();(L/'nested-harness/expected-source-map.json').write_text(new)
(L/'nested-source-map-only.patch').write_text(''.join(difflib.unified_diff(old.splitlines(True),new.splitlines(True),fromfile='published/nested-harness/expected-source-map.json',tofile='runtime-layer/nested-harness/expected-source-map.json')))
p=L/'route-harness/pump_general_route_differential.py';old=(B/'route-harness/pump_general_route_differential.py').read_text();needle="  assert all(p.startswith('programs/pump/')for p in data['source_sha256'])\n  relative_source=dict(data['source_sha256'])"
replacement="  prefixes={p[:p.index('programs/pump/')]for p in data['source_sha256']}\n  assert len(prefixes)==1\n  relative_source={p[p.index('programs/pump/'):]:h for p,h in data['source_sha256'].items()}"
assert old.count(needle)==1;new=old.replace(needle,replacement);p.write_text(new)
(L/'route-binding-only.patch').write_text(''.join(difflib.unified_diff(old.splitlines(True),new.splitlines(True),fromfile='published/route-harness/pump_general_route_differential.py',tofile='runtime-layer/route-harness/pump_general_route_differential.py')))
f=lambda t:{n.name:ast.dump(n)for n in ast.parse(t).body if isinstance(n,(ast.FunctionDef,ast.ClassDef))};a,b=f(old),f(new);assert a.keys()==b.keys()and [n for n in a if a[n]!=b[n]]==['bindings']
save('runtime-adaptation.json',{'scope':'Provenance only; no case, control, signature, assertion, runtime or instruction changes. Existing nested16 and route16 repeated, not new coverage.','route_changed_function':'bindings','route_before_sha256':hashlib.sha256(old.encode()).hexdigest(),'route_after_sha256':hashlib.sha256(new.encode()).hexdigest(),'nested_map_before_sha256':H(B/'nested-harness/expected-source-map.json'),'nested_map_after_sha256':H(L/'nested-harness/expected-source-map.json'),'logic_unchanged_ast':True})
i=J(R/'work/pump-nested-general-route-recovery/run-01/inputs-before.json');i['baseline_main_source']=J(W/'baseline-source-sha256.json');i['compiler_source_sha256']=J(W/'actual-source-sha256.json');i.pop('orchestration_sha256');i['scope']='Unchanged established Pump9269 differential cases and1024Surfpool; five approved named-owned error corrections candidate; legacy embedded source maps are checkout snapshots, actual compiled37inputs separately bound.'
save('prior-orchestration-inputs.json',i)
expected={'scripts/verify_recovered_builds.py':('81a448499c2c479389a6d59e9e43a29fe58859c995b80b4ef0b796d3d18f3387','50a061130d70e96c10c03da434d4272da58c991463fae9c88018257f3b9767b7'),'scripts/build_partial_candidate.py':('bb683621ffc4297c58f030cb03da54484b7370b786fd8eda965a37f4b3198ee9','e0eccab6f54fee2996039beb53075d9a7b3f411706a90634a44420dec7b173c1')}
for n,(old,new)in expected.items():
 assert i['harness_sha256'][n]==old and H(R/n)==new
 i['harness_sha256'][n]=new
save('actual-current-orchestration-inputs.json',i)
for group in ['harness_sha256','repository_fixture_snapshot_sha256','baseline_main_source','compiler_source_sha256']:
 for n,h in i[group].items():assert H(R/n)==h,(group,n)
g=J(B/'current-bindings.json')['groups'];extra={n:h for group in ['canonical_nested','canonical_route','nested_additional_inputs','route_additional_inputs']for n,h in g[group].items()}
for n,h in extra.items():assert H(R/n)==h,n
i['published_additional_inputs']=extra;i['runtime_layer_sha256']={str(p.relative_to(R)):H(p)for p in sorted(L.rglob('*'))if p.is_file()};assert H(R/i['surfpool_path'])==i['surfpool_sha256']
save('inputs-before.json',i)
for group in ['harness_sha256','repository_fixture_snapshot_sha256','published_additional_inputs']:
 with tarfile.open(W/(group+'.tar.gz'),'w:gz')as t:
  for n,h in i[group].items():assert not n.endswith('-keypair.json');t.add(R/n,arcname=n,recursive=False)
save('runtime-layer-manifest.json',{str(p.relative_to(L)):H(p)for p in sorted(L.rglob('*'))if p.is_file()})
print(json.dumps({'runtime_layer_prepared':True,'static_only':True,'cases_changed':0,'baseline_cases':9269,'surfpool_cases':1024,'manifest_sha256':H(W/'runtime-layer-manifest.json')}))
