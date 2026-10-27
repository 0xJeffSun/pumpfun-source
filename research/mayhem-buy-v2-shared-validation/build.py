from pathlib import Path
import argparse,hashlib,json,subprocess,tarfile,tomllib,shutil,time,fcntl,sys
config=argparse.ArgumentParser(add_help=False);config.add_argument('--work',type=Path,required=True);options,remaining=config.parse_known_args();sys.argv=[sys.argv[0]]+remaining
B=options.work.resolve();B.mkdir(parents=True,exist_ok=True);SDK=B/'sdk-1.54';STRIP=B/'sdk-1.52';CACHE=B/'cargo-home';HERE=Path(__file__).resolve().parent
IMAGE='solanafoundation/solana-verifiable-build@sha256:6c73adc767ee7ff212f2532d4695472b12f3d4ac20aea3db22b89d8c614dac50'
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def inventory(p):return {f.relative_to(p).as_posix():sha(f)for f in sorted(p.rglob('*'))if f.is_file()}
def registry(source):
 result={}
 for p in tomllib.loads((source/'Cargo.lock').read_text())['package']:
  if not p.get('source','').startswith('registry+'):continue
  name=p['name']+'-'+p['version'];archives=list((CACHE/'registry/cache').glob('*/'+name+'.crate'));roots=list((CACHE/'registry/src').glob('*/'+name));assert archives and roots and all(sha(archive)==p['checksum']for archive in archives),name
  with tarfile.open(archives[0])as tar:
   for m in tar.getmembers():
    if m.isfile():
     data=tar.extractfile(m).read();assert all((root/Path(m.name).relative_to(name)).read_bytes()==data for root in roots),name
  result[name]=p['checksum']
 return result
def main():
 p=argparse.ArgumentParser();p.add_argument('label');p.add_argument('--source',type=Path);p.add_argument('--fresh',action='store_true');a=p.parse_args()
 assert Path(a.label).name==a.label and a.label not in ['.','..']
 src=(a.source or B/(a.label+'-source')).resolve();out=B/'builds'/a.label;out.mkdir(parents=True,exist_ok=False);(out/'home').mkdir()
 inputs=inventory(src);assert len(inputs)==15;reg=registry(src)
 for version,folder in [('1.54',SDK),('1.52',STRIP)]:
  for name,digest in json.loads((HERE/'toolchains'/('sdk-'+version+'.json')).read_bytes())['tools'].items():assert sha(folder/name)==digest
 target=out/'target'if a.fresh else B/'shared-target';target.mkdir(exist_ok=True)
 env={'PATH':'/sdk/rust/bin:/sdk/llvm/bin:/usr/bin:/bin','HOME':'/output/home','CARGO_HOME':'/cargo','CARGO_TARGET_DIR':'/target','CARGO_NET_OFFLINE':'true','CARGO_BUILD_JOBS':'3','CARGO_TARGET_SBPF_SOLANA_SOLANA_RUSTFLAGS':'-Zremap-cwd-prefix=','RUSTC':'/sdk/rust/bin/rustc','RUSTDOC':'/sdk/rust/bin/rustdoc','CC':'/sdk/llvm/bin/clang','AR':'/sdk/llvm/bin/llvm-ar','OBJCOPY':'/sdk/llvm/bin/llvm-objcopy','OBJDUMP':'/sdk/llvm/bin/llvm-objdump','LANG':'C.UTF-8','LC_ALL':'C.UTF-8'}
 docker=['docker','run','--rm','--platform','linux/amd64','--network','none']
 for host,guest,ro in [(src,'/source',True),(out,'/output',False),(SDK,'/sdk',True),(STRIP,'/strip-sdk',True),(CACHE,'/cargo',False),(target,'/target',False)]:docker+=['--mount',f'type=bind,source={host},target={guest}'+(',readonly'if ro else'')]
 docker+=['-w','/source',IMAGE,'env','-i']+[k+'='+v for k,v in env.items()]
 command=['/sdk/rust/bin/cargo','rustc','--manifest-path','/source/Cargo.toml','--release','--target','sbpf-solana-solana','--locked','--offline','--verbose','--','--remap-path-prefix=src/=programs/mayhem-program/src/']
 (out/'launch.json').write_text(json.dumps(dict(command=docker+command,source_inputs=inputs,registry=reg,environment=env,fresh=a.fresh,originals_mounted=False),indent=2)+'\n')
 start=time.monotonic()
 with(out/'build.log').open('xb')as log:
  if not a.fresh:subprocess.run(docker+['/sdk/rust/bin/cargo','clean','--manifest-path','/source/Cargo.toml','--release','--target','sbpf-solana-solana','-p','mayhem-recovered'],stdout=log,stderr=subprocess.STDOUT,check=True)
  proc=subprocess.run(docker+command,stdout=log,stderr=subprocess.STDOUT)
 result=dict(exit_code=proc.returncode,seconds=time.monotonic()-start,source_unchanged=inputs==inventory(src),registry_unchanged=reg==registry(src),build_log_sha256=sha(out/'build.log'),root_invocations=(out/'build.log').read_bytes().count(b'--crate-name mayhem_recovered '))
 if not proc.returncode:
  shutil.copyfile(target/'sbpf-solana-solana/release/mayhem_recovered.so',out/'symbols.so');subprocess.run(docker+['/strip-sdk/llvm/bin/llvm-objcopy','--strip-all','/output/symbols.so','/output/candidate.so'],check=True)
  result['artifacts']={name:dict(sha256=sha(out/name),bytes=(out/name).stat().st_size)for name in ['candidate.so','symbols.so']}
 (out/'result.json').write_text(json.dumps(result,indent=2)+'\n');print(json.dumps(result,indent=2),flush=True)
 assert result['exit_code']==0 and result['source_unchanged']and result['registry_unchanged']and result['root_invocations']==1
if __name__=='__main__':
 with(B/'build.lock').open('a')as lock:fcntl.flock(lock,fcntl.LOCK_EX);main()
