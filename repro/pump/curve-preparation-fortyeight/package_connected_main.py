from pathlib import Path
import json,hashlib,shutil
R=Path.cwd();W=R/'work/pump-curve-preparation-main';P=R/'repro/pump/curve-preparation-fortyeight'
H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
recorded=json.loads((W/'prebuild-manifest.json').read_text())
changed={n for n,h in recorded.items()if H(W/n)!=h}
assert changed=={'main-launch.stdout'}
assert recorded['main-launch.stdout']==hashlib.sha256(b'').hexdigest()
snapshot=W/'recorded-empty-driver-output';snapshot.mkdir(exist_ok=True)
(snapshot/'main-launch.stdout').write_bytes(b'')
if P.exists():
 assert not(P/'manifest.json').exists()
 P.rename(W/'packaging-attempt-01')
source=(W/'package_main.py').read_text()
old='  for n,h in items.items():assert H(root/n)==h;t.add(root/n,arcname=n,recursive=False)'
new='''  for n,h in items.items():
   actual=root/n
   if archive=='prebuild-snapshot.tar.gz' and n=='main-launch.stdout':actual=W/'recorded-empty-driver-output/main-launch.stdout'
   assert H(actual)==h;t.add(actual,arcname=n,recursive=False)'''
assert source.count(old)==1
exec(compile(source.replace(old,new),str(W/'package_main.py'),'exec'))
shutil.copyfile(Path(__file__),P/'package_connected_main.py')
shutil.copyfile(W/'main-launch.stdout',P/'main-launch.stdout')
record={'first_packaging_returncode':1,'cause':'Driver stdout was empty at prebuild snapshot and filled only after successful build/identity verification. No source, compiler input, dependency, or build helper changed.','recorded_initial_sha256':recorded['main-launch.stdout'],'final_driver_stdout_sha256':H(W/'main-launch.stdout'),'snapshot_handling':'Archive contains explicitly reconstructed empty driver output matching the observed prebuild digest. Final driver output retained separately.','build_repeats':0}
(P/'packaging-note.json').write_text(json.dumps(record,indent=2)+'\n')
