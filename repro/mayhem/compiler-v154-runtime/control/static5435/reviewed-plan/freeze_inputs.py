"""Preparation-only: hash retained inputs, no tool/target execution."""
from pathlib import Path
import json,hashlib,tarfile,tomllib,shutil,sys
sys.dont_write_bytecode=True
R=Path(__file__).resolve().parents[2];P=Path(__file__).resolve().parent
A=Path('/Users/shawwalters/Documents/Codex/2026-10-25/go/work/pumpfun-source/work/mayhem-v154-compiler-audit');U=A/'publication';T=Path('/Users/shawwalters/.cache/solana/v1.54/platform-tools');SDK=R/'work/mayhem-sell-result-error-main/sdk';H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();J=lambda p:json.loads(p.read_text())
def save(n,v):(P/n).write_text(json.dumps(v,indent=2)+'\n')
def copy(n,source):
 d=P/n;assert not d.exists();shutil.copytree(source,d,ignore=shutil.ignore_patterns('__pycache__','*.pyc'))
copy('audit',U);copy('independent-review',R/'work/mayhem-v154-independent-review');shutil.copytree(U/'crate',P/'source')
assert H(U/'manifest.json')=='b230c400b8352c0a8eb45fcb8bc052cce67aa6434c6dc45baae2907df2db10d4'
for n,h in J(U/'manifest.json').items():assert H(P/'audit'/n)==h
save('capture.json',{'original_packet':str(U),'original_manifest_sha256':H(U/'manifest.json'),'copied_payloads':len(J(U/'manifest.json')),'original_manifest_retained':True,'excluded_unsealed_files':{str(f.relative_to(U)):H(f)for f in U.rglob('*')if f.is_file()and '__pycache__'in f.parts},'upstream_mutated':False})
archive=A/'platform-tools-v154-osx-aarch64.tar.bz2';dist=J(U/'distribution-verification.json');assert H(archive)==dist['asset_sha256']and archive.stat().st_size==dist['asset_bytes']
tools={};selected=dist['selected_files'];matched=set()
with tarfile.open(archive,mode='r|bz2')as tf:
 for m in tf:
  n=m.name.removeprefix('./').removeprefix('platform-tools/')
  if n not in selected or not m.isfile():continue
  b=tf.extractfile(m).read();assert hashlib.sha256(b).hexdigest()==selected[n]['sha256']==H(T/n),n;assert len(b)==selected[n]['bytes'];matched.add(n);tools[str(T/n)]=H(T/n)
assert matched==set(selected)and len(matched)==38
strip=Path('/Users/shawwalters/.cache/solana/v1.52/platform-tools/llvm/bin/llvm-objcopy');assert H(strip)==J(U/'strip-tool-comparison.json')['baseline_tool_sha256'];tools[str(strip)]=H(strip)
base=J(R/'repro/mayhem/sell-result-error-main-twentyfour/main/build-comparison.json');sdk={str(f.relative_to(SDK)):H(f)for f in SDK.rglob('*')if f.is_file()and'dependencies'not in f.relative_to(SDK).parts};assert sdk==base['sdk_source_sha256']and len(sdk)==53;shutil.copytree(SDK,P/'sdk',ignore=shutil.ignore_patterns('dependencies'))
lock=tomllib.loads((P/'source/Cargo.lock').read_text());records=[];external={**tools,str(archive):H(archive)};registry=A/'cargo-home/registry';source=registry/'src/index.crates.io-1949cf8c6b5b557f';cache=registry/'cache/index.crates.io-1949cf8c6b5b557f'
for pkg in lock['package']:
 if not pkg.get('source','').startswith('registry+'):continue
 n=pkg['name']+'-'+pkg['version'];a=cache/(n+'.crate');assert H(a)==pkg['checksum'];external[str(a)]=H(a);members={}
 with tarfile.open(a)as tf:
  for m in tf:
   if not m.isfile():continue
   p=Path(m.name);assert p.parts[0]==n and '..'not in p.parts;relative=str(Path(*p.parts[1:]));b=tf.extractfile(m).read();f=source/n/relative;assert f.read_bytes()==b;members[relative]=H(f);external[str(f)]=H(f)
 actual={str(f.relative_to(source/n))for f in(source/n).rglob('*')if f.is_file()};assert actual-set(members)<=set(['.cargo-ok'])
 for extra in actual-set(members):external[str(source/n/extra)]=H(source/n/extra)
 records.append({'package':n,'checksum':pkg['checksum'],'files':members})
for f in(registry/'index').rglob('*'):
 if f.is_file():external[str(f)]=H(f)
for n,h in sdk.items():external[str(SDK/n)]=h
save('locked-dependencies.json',records);save('external-inputs.json',external)
shutil.copy2(R/'repro/identity-audit/2026-10-25/compiler-v1461/cargo-build-sbf-2.1.21.rs',P/'sdk-driver-source.rs')
save('fresh-input-witness.json',{'scope':'Fresh local hashing + actual official archive member and all215 locked crate archive/source byte comparisons during preparation; no archived receipt relabeled fresh','official_archive':str(archive),'official_archive_sha256':H(archive),'official_selected_cache_files':38,'tools_with_strip':len(tools),'sdk_files':len(sdk),'sdk_syscalls_bytes':(SDK/'syscalls.txt').stat().st_size,'locked_registry_packages':len(records),'locked_registry_source_files':sum(len(x['files'])for x in records),'external_files':len(external),'no_compiler_or_target_executed':True})
print('fresh gates PASS',len(external),len(records),flush=True)
