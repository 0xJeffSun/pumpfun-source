from pathlib import Path
import hashlib,json,shlex,subprocess,shutil
B=Path('/home/ahi200/pumpfun-work/20261028-fees-causal')
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
for label in ['after']:
 D=B/label;out=D/'ir-with-env';out.mkdir(exist_ok=False)
 launch=json.loads((D/'launch.json').read_bytes());cmd=launch['command'];docker=cmd[:cmd.index('/sdk/rust/bin/cargo')]
 lines=[s.strip()for s in (D/'build.log').read_text().splitlines()if s.strip().startswith('Running `')and '--crate-name pump_fees_candidate 'in s]
 assert len(lines)==1
 docker+=['CARGO_MANIFEST_DIR=/source/programs/pump-fees','CARGO_PKG_NAME=pump-fun-fees-candidate','CARGO_PKG_VERSION=0.1.0','CARGO_PKG_VERSION_MAJOR=0','CARGO_PKG_VERSION_MINOR=1','CARGO_PKG_VERSION_PATCH=0','CARGO_PKG_VERSION_PRE=','CARGO_CRATE_NAME=pump_fees_candidate']
 root=shlex.split(lines[0][len('Running `'):-1]);root[root.index('--out-dir')+1]='/output/ir-with-env'
 emit=next(i for i,s in enumerate(root)if s.startswith('--emit='));assert root[emit]=='--emit=dep-info,link'
 root[emit]='--emit=dep-info,link,llvm-ir'
 record=dict(command=docker+root,source_launch_sha256=sha(D/'launch.json'),root_command_line=lines[0],controller_sha256=sha(Path(__file__)))
 (out/'launch.json').write_text(json.dumps(record,indent=2)+'\n')
 with(out/'build.log').open('wb')as log:run=subprocess.run(docker+root,stdout=log,stderr=subprocess.STDOUT)
 result=dict(returncode=run.returncode);(out/'result.json').write_text(json.dumps(result)+'\n');run.check_returncode()
 files=list(out.glob('*.so'));assert len(files)==1
 result.update(symbols_sha256=sha(files[0]),symbols_equal=files[0].read_bytes()==(D/'symbols.so').read_bytes())
 irs=list(out.glob('*.ll'));assert len(irs)==1
 shutil.copyfile(irs[0],out/'root.ll');result['ir_sha256']=sha(out/'root.ll')
 (out/'result.json').write_text(json.dumps(result,indent=2)+'\n');print(label,result,flush=True)
