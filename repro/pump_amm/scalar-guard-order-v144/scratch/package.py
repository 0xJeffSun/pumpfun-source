from pathlib import Path
import gzip,hashlib,json,shutil
W=Path(__file__).resolve().parent;R=W.parents[1];H=W/'handoff';H.mkdir(exist_ok=False);P=W.parent/'amm-scalar-setter-recovery';sha=lambda b:hashlib.sha256(b).hexdigest()
def copy(source,relative):
 rel=Path(relative);assert not rel.is_absolute()and '..'not in rel.parts and not any(x.endswith('-keypair.json')for x in rel.parts)
 assert not source.is_symlink()and not source.name.endswith('-keypair.json');target=H/rel;target.parent.mkdir(parents=True,exist_ok=True);target.write_bytes(source.read_bytes())
def compressed(source,relative):
 assert not source.name.endswith('-keypair.json');target=H/relative;target.parent.mkdir(parents=True,exist_ok=True)
 with target.open('wb')as f:
  with gzip.GzipFile(filename='',mode='wb',fileobj=f,mtime=0)as z:z.write(source.read_bytes())
pre=json.loads((P/'manifest.json').read_text())
for rel,expected in pre['files'].items():
 assert not rel.endswith('-keypair.json');data=(P/rel).read_bytes();assert sha(data)==expected['sha256'];copy(P/rel,'prebuild/'+rel)
copy(P/'manifest.json','prebuild/manifest.json')
for rel in json.loads((W/'proposed-source-sha256.json').read_text()):copy(W/'source'/rel,'source/'+rel)
# Explicit source/evidence allowlist. Never walk or archive the build target.
files=['authorization.json','scalar-guard-order.patch','proposed-source-sha256.json','baseline-source-sha256.json','toolchain-phases.json','runtime-environment.json','dependency-integrity.json','dependency-integrity.log','dependency-integrity-attempt-01.log','dependency-integrity-02.log','dependency-integrity-03.log','dependency-integrity-04.log','check_dependencies.py','check_dependencies-attempt-01.py','check_dependencies-attempt-02.py','check_dependencies-attempt-03.py','runtime-invocation.log','build-invocation.log','run_regressions.py','observe_suite.py','record_phases.py','phase-audit-attempt-01.json','runtime-verifier-attempt-02-diagnostic.json','runtime-verification-01.log','runtime-verification-02.log','runtime-verification-03.log','static-comparison-01.log','static-verification-02.log','static-comparison.json','static_compare.py','elf_reader.py','verify_runtime.py','runtime-summary.json','scalar-diagnostics.json','verify.py','REPORT.md','package.py']
for name in files:copy(W/name,name)
compressed(W/'receipt-bindings.json','receipt-bindings.json.gz')
for name in ['build-attempt.json','build-comparison.json','build.log']:copy(W/'build-01'/name,name)
copy(W/'build-01/artifacts/pump_amm_recovered.so','candidate.so');copy(W/'build-01/target/sbf-solana-solana/release/pump_amm_recovered.so','unstripped.so');copy(W/'build-01/target/.rustc_info.json','rustc_info.json')
for name in ['scripts/strip.sh','scripts/install.sh','env.sh']:copy(W/'build-01/sdk'/name,'sdk-scripts/'+name)
for name in ['build_partial_candidate.py','build_source_manifest.py','compare.py']:copy(W/'build-helper-snapshot/scripts'/name,'build-helper-snapshot/scripts/'+name)
for p in sorted((W/'runtime-01').iterdir()):
 assert p.is_file()and not p.name.endswith('-keypair.json')
 if p.suffix=='.json'and p.stem not in ['run','progress','inputs-before','inputs-after']:compressed(p,'runtime-01/'+p.name+'.gz')
 else:copy(p,'runtime-01/'+p.name)
inputs=json.loads((W/'runtime-01/inputs-before.json').read_text());locations={}
for group in ['actual_compiled_source','harness','runtime','legacy_checkout_snapshot']:
 for path,expected in inputs[group].items():
  assert sha((R/path).read_bytes())==expected,path
  if path.startswith('work/amm-scalar-setter-build/source/'):
   relative='source/'+path.removeprefix('work/amm-scalar-setter-build/source/')
  elif (H/'prebuild/inputs'/path).is_file()and sha((H/'prebuild/inputs'/path).read_bytes())==expected:relative='prebuild/inputs/'+path
  else:relative='inputs/'+path;copy(R/path,relative)
  locations[path]=relative
(H/'input-location-map.json').write_text(json.dumps(locations,indent=2)+'\n')
copy(R/'work/pump-amm-v144/dependency-pins.json','historical-dependency-pins.json');copy(R/'work/pump-amm-v144/cargo-home/cache-manifest.json','historical-cache-manifest.json')
print(json.dumps({'handoff':str(H),'files_before_seal':sum(1 for p in H.rglob('*')if p.is_file()),'bytes_before_seal':sum(p.stat().st_size for p in H.rglob('*')if p.is_file())},indent=2))
