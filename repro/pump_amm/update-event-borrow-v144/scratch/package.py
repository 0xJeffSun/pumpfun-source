"""Allowlisted portable handoff; never opens or archives generated keypairs/target trees."""
from pathlib import Path
import gzip,hashlib,json
W=Path(__file__).resolve().parent;R=W.parents[1];H=W/'handoff';H.mkdir(exist_ok=False);sha=lambda b:hashlib.sha256(b).hexdigest()
def copy(src,rel):
 rel=Path(rel);assert not rel.is_absolute()and '..'not in rel.parts and not any(x.endswith('-keypair.json')for x in rel.parts);assert not src.is_symlink()and not src.name.endswith('-keypair.json');dst=H/rel;dst.parent.mkdir(parents=True,exist_ok=True);dst.write_bytes(src.read_bytes())
def compress(src,rel):
 assert not src.name.endswith('-keypair.json')and not src.is_symlink();dst=H/rel;dst.parent.mkdir(parents=True,exist_ok=True)
 with dst.open('wb')as f:
  with gzip.GzipFile(filename='',mode='wb',fileobj=f,mtime=0)as z:z.write(src.read_bytes())
pre=json.loads((W/'prebuild/manifest.json').read_text())
for p,row in pre['files'].items():
 assert not Path(p).name.endswith('-keypair.json');assert sha((W/'prebuild'/p).read_bytes())==row['sha256'];copy(W/'prebuild'/p,'prebuild/'+p)
copy(W/'prebuild/manifest.json','prebuild/manifest.json')
for p in json.loads((W/'proposed-source-sha256.json').read_text()):copy(W/'source'/p,'source/'+p)
frozen=json.loads((W/'frozen-inputs.json').read_text())
for p,row in frozen['input_snapshots'].items():
 assert not Path(p).name.endswith('-keypair.json');assert sha((W/'inputs'/p).read_bytes())==row['sha256'];copy(W/'inputs'/p,'inputs/'+p)
files=['REPORT.md','verify.py','static_compare.py','static-comparison.json','static-comparison-01.log','verify_serializers.py','function-match.json','serializer-verification.log','verify_runtime.py','runtime-summary.json','runtime-verification-01.log','scalar-diagnostics.json','recipient-diagnostics.json','authorization.json','baseline-source-sha256.json','proposed-source-sha256.json','frozen-inputs.json','tools-before.json','tools-after.json','toolchain-phases.json','runtime-environment.json','verification-tools-before-runtime.json','dependency-integrity.json','dependency-integrity.log','check_dependencies.py','build-invocation.log','runtime-invocation.log','run_regressions.py','observe_suite.py','record_phases.py','package.py','verify_update_data.py','verify_update_data-attempt-01.py','update-data-checker-diagnostic.json','update-data-comparison.json','update-data-verification.log','update-data-verification-02.log']
for p in files:copy(W/p,p)
reference=json.loads((W/'static-reference/input-manifest.json').read_text())
for p in ['input-manifest.json',*reference]:copy(W/'static-reference'/p,'static-reference/'+p)
compress(W/'receipt-bindings.json','receipt-bindings.json.gz')
for name in ['build-attempt.json','build-comparison.json']:copy(W/'build-01'/name,name)
compress(W/'build-01/build.log','build.log.gz');copy(W/'build-01/artifacts/pump_amm_recovered.so','candidate.so');copy(W/'build-01/target/sbf-solana-solana/release/pump_amm_recovered.so','unstripped.so');copy(W/'build-01/target/.rustc_info.json','rustc_info.json')
for p in ['scripts/strip.sh','scripts/install.sh','env.sh']:copy(W/'build-01/sdk'/p,'sdk-scripts/'+p)
for p in frozen['build_helpers']:copy(W/'build-helper-snapshot'/p,'build-helper-snapshot/'+p)
for p in sorted((W/'runtime-01').iterdir()):
 assert p.is_file()and not p.name.endswith('-keypair.json')
 if p.suffix=='.json'and p.stem not in ['run','progress','inputs-before','inputs-after','summary']:compress(p,'runtime-01/'+p.name+'.gz')
 else:copy(p,'runtime-01/'+p.name)
inputs=json.loads((W/'runtime-01/inputs-before.json').read_text());locations={}
for group in ['actual_compiled_source','harness','runtime','legacy_checkout_snapshot']:
 for p,h in inputs[group].items():
  assert not Path(p).name.endswith('-keypair.json');assert sha((R/p).read_bytes())==h,p
  if p.startswith('work/amm-update-event-build/source/'):relative='source/'+p.removeprefix('work/amm-update-event-build/source/')
  elif p.startswith('work/amm-update-event-build/'):relative=p.removeprefix('work/amm-update-event-build/')
  elif group=='legacy_checkout_snapshot':relative='prebuild/inputs/source/'+p
  else:relative='inputs/'+p
  assert (H/relative).is_file()and sha((H/relative).read_bytes())==h,relative
  locations[p]=relative
(H/'input-location-map.json').write_text(json.dumps(locations,indent=2)+'\n')
print(json.dumps({'handoff':str(H),'payload_files':sum(1 for p in H.rglob('*')if p.is_file()),'bytes':sum(p.stat().st_size for p in H.rglob('*')if p.is_file())},indent=2))
