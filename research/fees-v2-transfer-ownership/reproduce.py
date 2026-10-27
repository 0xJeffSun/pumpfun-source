"""Rebuild the sealed source using explicit local native SDK/cache locations.

No originals, Git history, network download, container or runtime execution.
Use a fresh workspace/output and serialize access to a shared Cargo target.
"""
from pathlib import Path
import argparse,gzip,hashlib,json,os,shutil,subprocess
HERE=Path(__file__).resolve().parent
sha=lambda b:hashlib.sha256(b).hexdigest()
def main():
 p=argparse.ArgumentParser();p.add_argument('--sdk',type=Path,required=True);p.add_argument('--strip-tool',type=Path,required=True);p.add_argument('--cargo-home',type=Path,required=True);p.add_argument('--target-dir',type=Path,required=True);p.add_argument('--workspace',type=Path,required=True);p.add_argument('--output',type=Path,required=True);a=p.parse_args()
 for n in vars(a):setattr(a,n,getattr(a,n).resolve())
 assert a.sdk.is_dir()and a.cargo_home.is_dir()and not a.workspace.exists()and not a.output.exists()
 tools={'rustc':a.sdk/'rust/bin/rustc','cargo':a.sdk/'rust/bin/cargo','clang':a.sdk/'llvm/bin/clang','ar':a.sdk/'llvm/bin/llvm-ar','strip':a.strip_tool};expected=json.loads((HERE/'sdk-tools.json').read_text());assert {n:sha(x.read_bytes())for n,x in tools.items()}==expected
 e=json.loads((HERE/'experiment.json').read_text());v=e['variants']['origins'];assert len(v['input_sha256'])==43
 a.workspace.mkdir(parents=True);a.output.mkdir(parents=True)
 for n,h in v['input_sha256'].items():
  rel=Path(n);assert not rel.is_absolute()and'..'not in rel.parts;src=HERE/v['source_paths'][n];assert src.resolve().is_relative_to(HERE)and not src.is_symlink();raw=src.read_bytes();assert sha(raw)==h;dst=a.workspace/rel;dst.parent.mkdir(parents=True,exist_ok=True);dst.write_bytes(raw)
 env=os.environ.copy();fixed=dict(CARGO_HOME=str(a.cargo_home),CARGO_TARGET_DIR=str(a.target_dir),RUSTC=str(tools['rustc']),RUSTFLAGS='-Zremap-cwd-prefix=',CC=str(tools['clang']),AR=str(tools['ar']),PATH=str(a.sdk/'rust/bin')+':'+env.get('PATH',''));env.update(fixed)
 cmd=[str(tools['cargo']),'rustc','--verbose','--manifest-path',str(a.workspace/'programs/pump-fees/Cargo.toml'),'--release','--target','sbpf-solana-solana','--locked','--offline','--jobs','2','--lib','--','--remap-path-prefix='+str(a.workspace/'programs/pump-fees/src/../../../pump-fees-math')+'/=pump-fees-math/','--remap-path-prefix='+str(a.workspace/'pump-fees-math')+'/=pump-fees-math/','--remap-path-prefix=programs/pump-fees/src/../../../pump-fees-math/=pump-fees-math/']
 launch=dict(command=cmd,cwd=str(a.workspace),environment=fixed,input_sha256=v['input_sha256'],tool_sha256=expected,expected_artifacts={k:d['sha256']for k,d in v['files'].items()});(a.output/'launch.json').write_text(json.dumps(launch,indent=2)+'\n')
 with(a.output/'build.log').open('w')as log:code=subprocess.run(cmd,cwd=a.workspace,env=env,stdout=log,stderr=subprocess.STDOUT).returncode
 result=dict(exit_code=code,source_unchanged=all(sha((a.workspace/n).read_bytes())==h for n,h in v['input_sha256'].items()),artifacts={},strip_exit_code=None)
 if code==0:
  symbols=a.output/'symbols.so';shutil.copyfile(a.target_dir/'sbpf-solana-solana/release/pump_fees_candidate.so',symbols);candidate=a.output/'candidate.so';strip=[str(a.strip_tool),'--strip-all',str(symbols),str(candidate)];r=subprocess.run(strip,capture_output=True);result['strip_command']=strip;result['strip_exit_code']=r.returncode
  for kind,path in [('symbols',symbols),('candidate',candidate)]:
   if path.exists():result['artifacts'][kind]=dict(sha256=sha(path.read_bytes()),bytes=path.stat().st_size)
 (a.output/'result.json').write_text(json.dumps(result,indent=2)+'\n');assert code==result['strip_exit_code']==0 and result['source_unchanged'];assert {k:d['sha256']for k,d in result['artifacts'].items()}==launch['expected_artifacts'];print('PASS: portable native replay reproduces both570 ELFs raw-byte exactly')
if __name__=='__main__':main()
