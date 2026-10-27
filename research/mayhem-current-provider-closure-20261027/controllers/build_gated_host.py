from pathlib import Path
import hashlib,json,os,subprocess,time
W=Path(__file__).resolve().parent;S=W/'historical-source';sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();inputs=lambda:{p.relative_to(S).as_posix():sha(p) for p in S.rglob('*') if p.is_file()};before=inputs();base=json.loads((W/'host-launch.json').read_bytes());cmd=base['commands']['compile'];env=os.environ.copy();env.update(base['environment_overrides']);start=time.monotonic()
with (W/'gated-host.stdout').open('wb') as out,(W/'gated-host.stderr').open('wb') as err:p=subprocess.run(cmd,cwd=S,env=env,stdout=out,stderr=err)
(W/'gated-host.json').write_text(json.dumps(dict(command=cmd,source_inputs=before,returncode=p.returncode,source_unchanged=inputs()==before,seconds=time.monotonic()-start),indent=2)+'\n');p.check_returncode();import shutil;shutil.copyfile(W/'host-target/release/libanchor_attribute_program.so',W/'gated-macro.so')
