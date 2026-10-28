"""Independent offline before/after reproduction of PR302's exact public sources."""
from pathlib import Path
import tomllib,hashlib,importlib.util,json,subprocess,sys,tarfile,time,shutil
R=Path('/mnt/c/Users/ahi20/Documents/ChatGPT/pumpfun-source')
T=Path(__file__).resolve().parent
IMAGE='solanafoundation/solana-verifiable-build@sha256:6c73adc767ee7ff212f2532d4695472b12f3d4ac20aea3db22b89d8c614dac50'
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
def write(p,x):p.write_text(json.dumps(x,indent=2)+'\n')
def inventory(p):return{f.relative_to(p).as_posix():sha(f)for f in sorted(p.rglob('*'))if f.is_file()}
def module(name,path):
 s=importlib.util.spec_from_file_location(name,path);m=importlib.util.module_from_spec(s);s.loader.exec_module(m);return m
def verify_registry(source):
    registry={}
    for package in tomllib.loads((source/'Cargo.lock').read_text())['package']:
        if not package.get('source','').startswith('registry+'): continue
        name=package['name']+'-'+package['version']; archives=list((CACHE/'registry/cache').glob('*/'+name+'.crate'))
        assert len(archives)==1 and sha(archives[0])==package['checksum'],name
        roots=list((CACHE/'registry/src').glob('*/'+name)); assert len(roots)==1,name
        with tarfile.open(archives[0]) as archive:
            expected=set()
            for member in archive.getmembers():
                if not member.isfile(): continue
                path=Path(member.name).relative_to(name);expected.add(path.as_posix())
                assert not (roots[0]/path).is_symlink()
                assert (roots[0]/path).read_bytes()==archive.extractfile(member).read(),(name,str(path))
        actual={p.relative_to(roots[0]).as_posix() for p in roots[0].rglob('*') if p.is_file()}
        assert actual-expected <= {'.cargo-ok'},(name,actual-expected)
        registry[name]={'archive_sha256':package['checksum'],'verified_files':len(expected)}
    return registry

def main():
 B.mkdir(exist_ok=False);public=B/'public302';public.mkdir()
 prefix='research/fees-causal582-source/'
 with tarfile.open(T/'public302.tar.xz')as archive:
  for member in archive:
   if member.isdir():continue
   assert member.isfile()and member.name.startswith(prefix)
   n=member.name[len(prefix):];assert '..'not in Path(n).parts and not Path(n).is_absolute()
   p=public/n;p.parent.mkdir(parents=True,exist_ok=True);p.write_bytes(archive.extractfile(member).read())
 source=module('public_source',public/'source_tools.py');metadata,before,after=source.stages(public)
 source.verify_public_provenance(public,R)
 audit=sys.modules[__name__]
 tools={n:sha(SDK/n)for n in ['rust/bin/rustc','rust/bin/cargo','llvm/bin/clang','llvm/bin/llvm-ar']}
 assert tools['rust/bin/rustc']=='c8807b7ebede8578ac5a257ea333780f9d89bd356064fd8184af7e996cb71a97'
 strip_hash=sha(STRIP/'llvm/bin/llvm-objcopy');assert strip_hash=='3a871eab7279dee53f2580e8a022c980305738b575755b7d3529a6230ec4f672'
 write(B/'tools.json',dict(sdk=tools,strip=strip_hash));write(B/'public-source-inputs.json',inventory(public))
 for stage,files in [('before',before),('after',after)]:
  if STAGE!='both'and STAGE!=stage:continue
  D=B/stage;S=D/'source';S.mkdir(parents=True);(D/'target').mkdir();(D/'cargo').mkdir();(D/'home').mkdir()
  for n,raw in files.items():p=S/n;p.parent.mkdir(parents=True,exist_ok=True);p.write_bytes(raw)
  inputs=inventory(S);assert inputs==metadata[stage]
  registry=audit.verify_registry(S)
  env={'PATH':'/sdk/rust/bin:/sdk/llvm/bin:/usr/bin:/bin','HOME':'/output/home','CARGO_HOME':'/cargo','CARGO_TARGET_DIR':'/target','CARGO_NET_OFFLINE':'true','CARGO_REGISTRIES_CRATES_IO_PROTOCOL':'sparse','CARGO_TERM_COLOR':'never','CARGO_BUILD_JOBS':'3','RUSTFLAGS':'-Zremap-cwd-prefix=','RUSTC':'/sdk/rust/bin/rustc','RUSTDOC':'/sdk/rust/bin/rustdoc','CC':'/sdk/llvm/bin/clang','AR':'/sdk/llvm/bin/llvm-ar','LANG':'C.UTF-8','LC_ALL':'C.UTF-8'}
  docker=['docker','run','--rm','--platform','linux/amd64','--network','none']
  for host,guest,ro in [(S,'/source',True),(D,'/output',False),(SDK,'/sdk',True),(STRIP,'/strip-sdk',True),(D/'cargo','/cargo',False),(CACHE/'registry','/cargo/registry',True),(D/'target','/target',False)]:docker+=['--mount',f'type=bind,source={host},target={guest}'+(',readonly'if ro else'')]
  docker+=['-w','/source',IMAGE,'env','-i']+[k+'='+v for k,v in env.items()]
  cmd=['/sdk/rust/bin/cargo','rustc','--release','--target','sbpf-solana-solana','--locked','--offline','--verbose','--manifest-path','/source/programs/pump-fees/Cargo.toml','--lib','--','--remap-path-prefix=/source/programs/pump-fees/src/../../../pump-fees-math/=pump-fees-math/','--remap-path-prefix=/source/pump-fees-math/=pump-fees-math/','--remap-path-prefix=programs/pump-fees/src/../../../pump-fees-math/=pump-fees-math/']
  write(D/'launch.json',dict(command=docker+cmd,source_inputs=inputs,registry=registry,tools=tools,strip_sha256=strip_hash,empty_target=True,originals_mounted=False,controller_sha256=sha(Path(__file__))))
  start=time.monotonic()
  with(D/'build.log').open('wb')as log:run=subprocess.run(docker+cmd,stdout=log,stderr=subprocess.STDOUT)
  result=dict(returncode=run.returncode,seconds=time.monotonic()-start,source_unchanged=inventory(S)==inputs,registry_unchanged=audit.verify_registry(S)==registry,tools_unchanged=all(sha(SDK/n)==v for n,v in tools.items()),root_invocations=(D/'build.log').read_bytes().count(b'--crate-name pump_fees_candidate '),log_sha256=sha(D/'build.log'))
  write(D/'result.json',result);run.check_returncode()
  shutil.copyfile(D/'target/sbpf-solana-solana/release/pump_fees_candidate.so',D/'symbols.so')
  strip=docker+['/strip-sdk/llvm/bin/llvm-objcopy','--strip-all','/output/symbols.so','/output/candidate.so']
  subprocess.run(strip,check=True);write(D/'strip-command.json',strip)
  result['artifacts']={n:dict(sha256=sha(D/n),bytes=(D/n).stat().st_size)for n in ['symbols.so','candidate.so']}
  write(D/'result.json',result);print(stage,json.dumps(result),flush=True)
  assert result['source_unchanged']and result['registry_unchanged']and result['tools_unchanged']and result['root_invocations']==1
if __name__=='__main__':
 import argparse
 p=argparse.ArgumentParser();p.add_argument('--output',type=Path,required=True);p.add_argument('--sdk',type=Path,required=True);p.add_argument('--strip-sdk',type=Path,required=True);p.add_argument('--cargo-home',type=Path,required=True);p.add_argument('--public-root',type=Path,required=True);p.add_argument('--stage',choices=['before','after','both'],default='both');a=p.parse_args()
 B=a.output.resolve();SDK=a.sdk.resolve();STRIP=a.strip_sdk.resolve();CACHE=a.cargo_home.resolve();R=a.public_root.resolve();STAGE=a.stage
 main()

