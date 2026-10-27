"""Independent two-tree, empty-target reproduction of the public Metaplex repair."""
from pathlib import Path
import hashlib,json,subprocess,tarfile,time,shutil,tomllib
R=Path('/mnt/c/Users/ahi20/Documents/ChatGPT/pumpfun-source')
B=Path('/home/ahi200/pumpfun-work/20261028-metaplex-exact-git')
OLD=Path('/home/ahi200/pumpfun-work/20261027-metaplex')
P=R/'research/claude-deps-metaplex-20261027'
IMAGE='solanafoundation/solana-verifiable-build@sha256:43206149a565ec35da95b1a909f4714f5d5f0d8241c31df24189e517acd18467'
PT='/root/.cache/solana/v1.37/platform-tools'
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
def write(p,value):p.write_text(json.dumps(value,indent=2)+'\n')
def inventory(p):return{f.relative_to(p).as_posix():sha(f)for f in p.rglob('*')if f.is_file()}
def main():
 B.mkdir(exist_ok=False)
 expected=json.loads((P/'source-manifest.json').read_bytes())
 upstream=json.loads((R/'repro/pump/metaplex-owned-uses-20261026/upstream-source-manifest.json').read_bytes())
 files={n:(OLD/'upstream'/n).read_bytes()for n in upstream}
 assert {n:hashlib.sha256(b).hexdigest()for n,b in files.items()}==upstream
 with tarfile.open(P/'source-snapshot.tar.gz')as t:
  for m in t:
   assert m.isfile()and m.name in upstream
   files[m.name]=t.extractfile(m).read()
 assert {n:hashlib.sha256(b).hexdigest()for n,b in files.items()}==expected and len(files)==812
 tools={n:sha(OLD/'sdk'/n)for n in ['rust/bin/rustc','rust/bin/cargo','llvm/bin/llvm-objcopy','llvm/bin/clang','llvm/bin/llvm-ar']}
 assert tools['rust/bin/rustc']=='7194df9c12e893cfa88fff5dd821d02d45910b4d375e13677b4723f45769a384'
 assert sha(OLD/'platform-tools-v137.tar.bz2')=='8d5153589dbe19635affe937663cf4555a7e69a62d91ab4a1df064aaa8d5f066'
 write(B/'tools.json',tools);write(B/'source-inputs.json',expected)
 for label in ['first','repeat']:
  D=B/label;S=D/'source';S.mkdir(parents=True)
  for n,b in files.items():p=S/n;p.parent.mkdir(parents=True,exist_ok=True);p.write_bytes(b)
  (S/'programs/token-metadata/target').mkdir()
  cargo=D/'cargo';cargo.mkdir();target=D/'target';target.mkdir()
  shutil.copytree(OLD/'cargo/git',cargo/'git')
  write(D/'git-cache-before.json',inventory(cargo/'git'))
  env={'CARGO_HOME':'/usr/local/cargo','CARGO_TARGET_DIR':'/build/programs/token-metadata/target','CARGO_NET_OFFLINE':'true','CARGO_REGISTRIES_CRATES_IO_PROTOCOL':'sparse','RUSTC':PT+'/rust/bin/rustc','CARGO_TARGET_SBF_SOLANA_SOLANA_RUSTFLAGS':'-Zremap-cwd-prefix=','CC':PT+'/llvm/bin/clang','AR':PT+'/llvm/bin/llvm-ar','PATH':PT+'/rust/bin:'+PT+'/llvm/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin','CARGO_BUILD_JOBS':'3'}
  cmd=['docker','run','--rm','--platform','linux/amd64','--network','none']
  for src,dest,ro in [(S,'/build',True),(OLD/'sdk',PT,True),(cargo,'/usr/local/cargo',False),(OLD/'cargo/registry','/usr/local/cargo/registry',True),(target,'/build/programs/token-metadata/target',False)]:cmd+=['--mount',f'type=bind,source={src},target={dest}'+(',readonly'if ro else'')]
  for k,v in env.items():cmd+=['-e',k+'='+v]
  cmd+=['-w','/build/programs/token-metadata',IMAGE,PT+'/rust/bin/cargo','rustc','--package','token_metadata','--lib','--release','--target','sbf-solana-solana','--locked','--offline','--manifest-path','/build/programs/token-metadata/Cargo.toml','--','--emit=link']
  write(D/'launch.json',dict(command=cmd,source_inputs=expected,tools=tools,empty_target=True,network='none',original_mounted=False,controller_sha256=sha(Path(__file__))))
  start=time.monotonic()
  with(D/'build.log').open('wb')as log:run=subprocess.run(cmd,stdout=log,stderr=subprocess.STDOUT)
  result=dict(returncode=run.returncode,seconds=time.monotonic()-start,source_unchanged=inventory(S)==expected,tools_unchanged=all(sha(OLD/'sdk'/n)==v for n,v in tools.items()))
  write(D/'result.json',result);run.check_returncode()
  shutil.copyfile(target/'sbf-solana-solana/release/token_metadata.so',D/'compiler-output.so')
  strip=['docker','run','--rm','--platform','linux/amd64','--network','none','--mount',f'type=bind,source={OLD}/sdk,target={PT},readonly','--mount',f'type=bind,source={D},target=/out',IMAGE,PT+'/llvm/bin/llvm-objcopy','--strip-all','/out/compiler-output.so','/out/candidate.so']
  subprocess.run(strip,check=True);write(D/'strip-command.json',strip)
  result.update(compiler_sha256=sha(D/'compiler-output.so'),candidate_sha256=sha(D/'candidate.so'),candidate_bytes=(D/'candidate.so').stat().st_size,build_log_sha256=sha(D/'build.log'))
  assert result['source_unchanged']and result['tools_unchanged']
  assert result['candidate_sha256']=='99ee61a5159e15a359b01298b52c9f9f912eb19e47bdfe83987c16de52a4b1ff'
  assert result['compiler_sha256']=='d38edf7b5c03c25b9c323568932ac6e9c593c0e141bcea3781ee13132d88c6b0'
  write(D/'result.json',result);print(label,json.dumps(result),flush=True)
 for n in ['candidate.so','compiler-output.so']:assert(B/'first'/n).read_bytes()==(B/'repeat'/n).read_bytes()
 print('both independent complete outputs identical',flush=True)
if __name__=='__main__':main()
