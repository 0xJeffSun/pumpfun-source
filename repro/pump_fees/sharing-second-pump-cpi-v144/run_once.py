from pathlib import Path
import subprocess,sys,os,json
P=Path(__file__).resolve().parent;R=P.parents[1];B=P/'build-01';assert not B.exists()
subprocess.run([sys.executable,'-B',str(P/'prepare.py')],cwd=R,check=True)
cmd=[sys.executable,'-B',str(R/'scripts/build_partial_candidate.py'),'--manifest',str(P/'source/programs/pump-fees/Cargo.toml'),'--program','pump_fees','--artifact-name','pump_fees_candidate.so','--tools-version','v1.44','--output',str(B),'--extra-input',str(P/'source/programs/pump-fees/README.md')]
env={**os.environ,'CARGO_HOME':str(R/'work/fees-v2-caller-build/cargo-home'),'CARGO_NET_OFFLINE':'true','PYTHONDONTWRITEBYTECODE':'1'};(P/'build-launch.json').write_text(json.dumps({'command':cmd,'attempt_limit':1,'environment_overrides':{k:env[k]for k in ['CARGO_HOME','CARGO_NET_OFFLINE','PYTHONDONTWRITEBYTECODE']}},indent=2)+'\n')
with(P/'build.stdout').open('w')as out,(P/'build.stderr').open('w')as err:p=subprocess.run(cmd,cwd=R,env=env,stdout=out,stderr=err)
(P/'build-exit.json').write_text(json.dumps({'returncode':p.returncode})+'\n');p.check_returncode()
subprocess.run([sys.executable,'-B',str(P/'check_build.py')],cwd=R,check=True)
