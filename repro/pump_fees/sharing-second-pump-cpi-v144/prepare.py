from pathlib import Path
import json,hashlib,shutil,subprocess,sys
P=Path(__file__).resolve().parent;R=P.parents[1];Q=R/'work/fees-sharing-second-pump-cpi-review';H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();J=lambda p:json.loads(p.read_text())
subprocess.run([sys.executable,'-B',str(Q/'verify.py'),'--repo',str(R)],cwd=R,check=True)
source=J(Q/'bindings.json')['baseline_source'];assert len(source)==26 and all(H(R/n)==h for n,h in source.items());prior=J(R/'work/fees-sharing-pump-extend-build/gate-before.json');tools=prior['tools'];helpers=prior['helpers']
for n,h in helpers.items():assert H(R/n)==h,n
for v in [*tools['compile_tools'].values(),tools['strip_tool'],tools['cli']]:assert H(Path(v['resolved_path']))==v['sha256']
S=P/'source';S.mkdir()
for n in source:
 d=S/n;d.parent.mkdir(parents=True,exist_ok=True);shutil.copy2(R/n,d)
n='programs/pump-fees/src/sharing.rs';shutil.copy2(Q/'proposal'/n,S/n);delta=[n for n,h in source.items()if H(S/n)!=h];assert delta==[n]
cache=R/'work/fees-v2-caller-build/cargo-home';deps={str(f.relative_to(cache)):H(f)for n in ['registry/cache','registry/src']for f in(cache/n).rglob('*')if f.is_file()};assert deps==J(R/'work/fees-sharing-pump-extend-build/dependency-after.json')
(P/'gate-before.json').write_text(json.dumps({'source':source,'helpers':helpers,'tools':tools,'scratch_source':{n:H(S/n)for n in source},'baseline':'6c87132fd95d0e2d4f1ba416667f1084e6a60937280639c473caeae8483e1887','only_source_change':delta,'source_proposal_manifest_sha256':H(Q/'manifest.json')},indent=2)+'\n');(P/'dependency-before.json').write_text(json.dumps(deps,indent=2)+'\n')
shutil.copy2(R/'work/fees-sharing-pump-extend-build/check_build.py',P/'check_build.py');print('Prepared exact one-source correction; no active source changed.')
