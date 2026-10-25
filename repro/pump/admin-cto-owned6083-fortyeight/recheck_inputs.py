from pathlib import Path
import json,gzip,hashlib
R=Path.cwd();P=Path(__file__).resolve().parent;H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();J=lambda p:json.loads(p.read_text())
i=J(P/'inputs-before.json');drift=[];checked=0
for group in ['harness_sha256','repository_fixture_snapshot_sha256','published_additional_inputs','runtime_layer_sha256','baseline_main_source','compiler_source_sha256']:
 for n,h in i[group].items():
  z=H(R/n);checked+=1
  if z!=h:
   assert n=='scripts/build_partial_candidate.py'and h=='bb683621ffc4297c58f030cb03da54484b7370b786fd8eda965a37f4b3198ee9'and z=='e0eccab6f54fee2996039beb53075d9a7b3f411706a90634a44420dec7b173c1';drift.append({'path':n,'before':h,'after':z})
assert len(drift)==1
for n,v in J(P/'tools-observed.json')['files'].items():assert H(Path(v['path']))==v['sha256']
assert H(R/i['surfpool_path'])==i['surfpool_sha256']
d=json.loads(gzip.decompress((P/'baseline-dependency-provenance.json.gz').read_bytes()));count=0
for p in d['packages']:
 for f in p['archives']:assert H(R/f['path'])==f['sha256']==p['lock_checksum'];count+=1
 for t in p['source_trees_observed']:
  for n,h in t['source_files_sha256'].items():assert H(R/t['path']/n)==h;count+=1
assert count==14281 and len(d['packages'])==252
print(json.dumps({'status':'PASS_with_narrow_recorded_drift','checked_input_bindings':checked,'reviewed_drift':drift,'registry_packages':252,'dependency_files':count,'all_other_inputs_exact':True,'target_executions':0},indent=2))
