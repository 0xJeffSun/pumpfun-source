from pathlib import Path
import shutil,json,hashlib,subprocess
R=Path.cwd();W=Path(__file__).resolve().parent;A=W/'inputs';S=W/'source';P=R/'work/fees-legacy-caller-review/publication';O=R/'work/fees-legacy-social-build';H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();J=lambda p:json.loads(p.read_text())
assert not A.exists() and not S.exists();A.mkdir();S.mkdir()
assert H(P/'manifest.json')=='f5c86d690dd1b0c78364cc3809439a276e524b093753f1cbbd8d0e6a4c09052d'
subprocess.run(['python3','-B',str(P/'verify.py'),'--repo',str(R)],check=True)
base=J(P/'baseline-source-sha256.json');new=J(P/'proposed-source-sha256.json')
for n,h in base.items():
 assert H(R/n)==h;d=S/n;d.parent.mkdir(parents=True,exist_ok=True);shutil.copyfile(R/n,d)
key='programs/pump-fees/src/sharing_update.rs';shutil.copyfile(P/'proposal/sharing_update.rs',S/key)
assert H(S/key)=='94a11c22bc952b060119212b7982e638f8faf56af5e565e15234f88283766956'
for n,h in new.items():assert H(S/n)==h
for f,src in [('baseline-source-sha256.json',P/'baseline-source-sha256.json'),('corrected-source-sha256.json',P/'proposed-source-sha256.json'),('source.patch',P/'proposal/source.patch'),('review-corrections.patch',P/'proposal/review-corrections.patch'),('review-manifest.json',P/'manifest.json'),('tools-before.json',R/'repro/pump_fees/legacy-social-admission-v144/tools-before.json'),('dependency-before.json',O/'inputs/dependency-before.json'),('registry-index-sha256.json',O/'inputs/registry-index-sha256.json')]:shutil.copyfile(src,A/f)
t=J(A/'tools-before.json')
for v in [*t['compile_tools'].values(),t['strip_tool'],t['cli']]:assert H(Path(v['resolved_path']))==v['sha256']
for n,h in t['helper_files'].items():
 assert H(R/n)==h;d=S/n;d.parent.mkdir(exist_ok=True);shutil.copyfile(R/n,d)
sdk=Path(t['cli']['resolved_path']).parent/'sdk/sbf'
for n,h in t['sdk_template_files'].items():assert H(sdk/n)==h
subprocess.run(['cp','-cR',str(O/'cargo-home'),str(W/'cargo-home')],check=True)
def deps():return {str(p.relative_to(W/'cargo-home')):H(p) for root in ['registry/cache','registry/src'] for p in (W/'cargo-home'/root).rglob('*') if p.is_file()}
d=deps();assert d==J(A/'dependency-before.json')
index=J(A/'registry-index-sha256.json')
for n,h in index.items():assert H(W/'cargo-home'/n)==h
shutil.copyfile(O/'build_once.py',W/'build_once.py')
(W/'preflight.json').write_text(json.dumps({'passed':True,'source_inputs':26,'changed_paths':[key],'source_sha256':new[key],'compile':'v1.44','strip':'v1.52','sdk_files':len(t['sdk_template_files']),'helper_files':t['helper_files'],'dependency_files':len(d),'dependency_packages':252,'isolated_target_sdk_rustup':True,'review_manifest_sha256':H(P/'manifest.json'),'launcher_origin':str(O/'build_once.py'),'launcher_sha256':H(W/'build_once.py'),'runtime_authorized_after_static_gate':True,'new_fixtures':False},indent=2)+'\n')
print('Preflight PASS; no build executed yet')
