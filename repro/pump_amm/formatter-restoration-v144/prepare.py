from pathlib import Path
import json,hashlib,tarfile,shutil,sys,tomllib
R=Path.cwd();W=Path(__file__).resolve().parent;P=R/'repro/pump_amm/accumulator-order-v144';Q=R/'work/amm-format-dependency-review'
H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
assert not (W/'source').exists();base=json.loads((P/'proposed-source-sha256.json').read_text());assert len(base)==22
for n,h in base.items():
 a=P/'source'/n;assert H(a)==h,n;d=W/'source'/n;d.parent.mkdir(parents=True,exist_ok=True);shutil.copy2(a,d)
for f in (P/'source/scripts').iterdir():
 d=W/'source/scripts'/f.name;d.parent.mkdir(parents=True,exist_ok=True);shutil.copy2(f,d)
d=W/'source/evidence/original/pump_amm/deployed.so';d.parent.mkdir(parents=True,exist_ok=True);shutil.copy2(R/'evidence/original/pump_amm/deployed.so',d)
vendor=W/'source/programs/pump-amm/vendor/solana-pubkey';before={}
archive=Q/'archives/solana-pubkey-2.4.0.crate';assert H(archive)=='9b62adb9c3261a052ca1f999398c388f1daf558a1b492f60a6d9e64857db4ff1'
with tarfile.open(archive,'r:gz')as t:
 for m in t:
  assert m.name.startswith('solana-pubkey-2.4.0/') or m.name=='solana-pubkey-2.4.0'
  rel=Path(m.name).relative_to('solana-pubkey-2.4.0');assert '..'not in rel.parts and not m.issym()and not m.islnk()
  if m.isfile():
   d=vendor/rel;d.parent.mkdir(parents=True,exist_ok=True);b=t.extractfile(m).read();d.write_bytes(b);before[str(rel)]=hashlib.sha256(b).hexdigest()
for n in ['src/lib.rs','Cargo.toml']:shutil.copy2(Q/'proposal/solana-pubkey-2.4.0'/n,vendor/n)
after={str(f.relative_to(vendor)):H(f)for f in vendor.rglob('*')if f.is_file()};assert set(before)==set(after);assert sorted(n for n in before if before[n]!=after[n])==['Cargo.toml','src/lib.rs']
p=W/'source/programs/pump-amm/Cargo.toml';text=p.read_text();assert '[patch.crates-io]'not in text;p.write_text(text+'\n[patch.crates-io]\nsolana-pubkey = { path = "vendor/solana-pubkey" }\n')
(W/'baseline-source-sha256.json').write_bytes((P/'baseline-source-sha256.json').read_bytes())
(W/'accepted-source-sha256.json').write_text(json.dumps(base,indent=2)+'\n')
(W/'vendor-before.json').write_text(json.dumps(before,indent=2)+'\n');(W/'vendor-after.json').write_text(json.dumps(after,indent=2)+'\n')
(W/'vendor-origin.json').write_text(json.dumps({'archive_sha256':H(archive),'changed_files':['Cargo.toml','src/lib.rs'],'all_other_archive_members_preserved':True,'extra_input':'programs/pump-amm/vendor/solana-pubkey'},indent=2)+'\n')
shutil.copy2(P/'tools-before.json',W/'tools-before.json');checks=json.loads((W/'tools-before.json').read_text())
for n,row in checks['tools'].items():assert H(Path(n))==row['sha256'],n
shutil.copytree(R/'work/amm-residual-next/build/cargo-home/registry',W/'cargo-home/registry',ignore=shutil.ignore_patterns('*-keypair.json'))
shutil.copytree(P/'runtime-source',W/'runtime-source');shutil.copytree(P/'inputs',W/'inputs')
for n in ['observe_suite.py','verify_runtime.py','check_dependencies.py']:
 shutil.copy2(P/n,W/n)
shutil.copy2(P/'run_regressions.py',W/'run_regressions.original.py')
s=(P/'run_regressions.py').read_text();s=s.replace("assert len(build['source_sha256'])==22","assert build['source_sha256']==json.loads((W/'proposed-source-sha256.json').read_text())")
(W/'run_regressions.py').write_text(s)
(W/'runtime-runner-adaptation.json').write_text(json.dumps({'only_replacement':"assert len(build['source_sha256'])==22 -> assert complete source map equals proposed map (includes all vendor assets)",'cases_controls_observer_unchanged':True,'before_sha256':H(W/'run_regressions.original.py'),'after_sha256':H(W/'run_regressions.py')},indent=2)+'\n')
(W/'Cargo.lock.before').write_bytes((W/'source/programs/pump-amm/Cargo.lock').read_bytes())
print('Prepared complete private vendor and preserved unchanged runtime corpus.')
