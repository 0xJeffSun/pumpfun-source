from pathlib import Path
import hashlib,json,shutil,subprocess
P=Path(__file__).resolve().parent/'mayhem-whole-parser'
def ident(b):return dict(bytes=len(b),sha256=hashlib.sha256(b).hexdigest())
for label,parent,host in [('gated-empty','old-empty','host-build-04-gated'),('gated-historical-create','old-historical-create','host-build-04-gated'),('old-historical-create-repeat','old-historical-create','host-build-03')]:
    O=P/label;O.mkdir(exist_ok=False);S=O/'source';shutil.copytree(P/parent/'source',S)
    prior=json.loads((P/parent/'launch.json').read_bytes());args=list(prior['command']);args[args.index('--out-dir')+1]=str(O)
    dll=P/host/'target/release/anchor_attribute_program.dll'
    i=next(i for i,a in enumerate(args)if a.startswith('historical_anchor_program='));args[i]='historical_anchor_program='+str(dll)
    args[-1]='dependency='+str(dll.parent/'deps')
    env=dict(prior['environment'],CARGO_MANIFEST_DIR=str(S/'curve-accounts'),CARGO_MANIFEST_PATH=str(S/'curve-accounts/Cargo.toml'))
    before={p.relative_to(S).as_posix():ident(p.read_bytes())for p in S.rglob('*')if p.is_file()}
    launch=dict(prior,command=args,cwd=str(S),environment=env,source_inputs=before,historical_macro=ident(dll.read_bytes()))
    (O/'launch.json').write_text(json.dumps(launch,indent=2)+'\n',encoding='utf8',newline='\n')
    with(O/'stdout.log').open('wb')as stdout,(O/'stderr.log').open('wb')as stderr:r=subprocess.run(args,cwd=S,env=env,stdout=stdout,stderr=stderr,creationflags=subprocess.CREATE_NO_WINDOW)
    result=dict(returncode=r.returncode,source_unchanged=all(ident((S/n).read_bytes())==h for n,h in before.items()),outputs={p.name:ident(p.read_bytes())for p in O.iterdir()if p.suffix in('.rlib','.rmeta')},target_executions=0)
    (O/'result.json').write_text(json.dumps(result,indent=2)+'\n',encoding='utf8',newline='\n');print(label,r.returncode,flush=True)
