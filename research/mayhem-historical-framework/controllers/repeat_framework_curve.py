from pathlib import Path
import hashlib,json,subprocess
W=Path(__file__).resolve().parent;P=W/'mayhem-historical-framework';B=P/'build-02';M=P/'metadata-05';O=P/'curve-repeat';O.mkdir(exist_ok=False)
def ident(p):return dict(bytes=p.stat().st_size,sha256=hashlib.sha256(p.read_bytes()).hexdigest())
records=[json.loads(p.read_bytes())for p in(B/'wrapper-records').glob('*.json')];r=next(r for r in records if'--crate-name'in r['after']and r['after'][r['after'].index('--crate-name')+1]=='curve_accounts')
prior=json.loads((B/'launch.json').read_bytes());env=dict(prior['environment']);root=M/'source/curve-accounts'
env.update(CARGO_MANIFEST_DIR=str(root),CARGO_MANIFEST_PATH=str(root/'Cargo.toml'),CARGO_PKG_NAME='curve-accounts',CARGO_CRATE_NAME='curve_accounts',CARGO_PKG_VERSION='0.1.0',CARGO_PKG_VERSION_MAJOR='0',CARGO_PKG_VERSION_MINOR='1',CARGO_PKG_VERSION_PATCH='0',CARGO_PKG_VERSION_PRE='',CARGO_PKG_AUTHORS='',CARGO_PKG_DESCRIPTION='',CARGO_PKG_HOMEPAGE='',CARGO_PKG_REPOSITORY='',CARGO_PKG_LICENSE='',CARGO_PKG_LICENSE_FILE='')
args=list(r['after']);args[args.index('--out-dir')+1]=str(O)
inputs={str(p):ident(p)for base in(M/'source',M/'framework')for p in base.rglob('*')if p.is_file()}
externs={a.split('=',1)[1]:ident(Path(a.split('=',1)[1]))for i,a in enumerate(args)if i and args[i-1]=='--extern'}
launch=dict(command=[r['compiler']]+args,cwd=r['cwd'],environment=env,parent_record=r,inputs=inputs,externs=externs,scope='One direct curve compilation repeating the successful historical-framework curve dependency invocation from a failed root build. Only output directory changes; reused historical host/target libraries. Not a fresh full dependency build.',target_executions=0)
(O/'launch.json').write_text(json.dumps(launch,indent=2)+'\n',encoding='utf8',newline='\n')
with(O/'stdout.log').open('wb')as so,(O/'stderr.log').open('wb')as se:c=subprocess.run(launch['command'],cwd=r['cwd'],env=env,stdout=so,stderr=se,creationflags=subprocess.CREATE_NO_WINDOW)
result=dict(returncode=c.returncode,inputs_unchanged=all(ident(Path(n))==v for n,v in inputs.items()),externs_unchanged=all(ident(Path(n))==v for n,v in externs.items()),outputs={p.name:ident(p)for p in O.glob('*.rlib')},target_executions=0)
(O/'result.json').write_text(json.dumps(result,indent=2)+'\n',encoding='utf8',newline='\n');print(result)
