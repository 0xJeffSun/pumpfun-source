"""Isolated offline Fees builds; originals are never mounted in the compiler container."""
import argparse, hashlib, json, os, shutil, subprocess, time, tomllib, tarfile, fcntl, sys
from pathlib import Path

config = argparse.ArgumentParser(add_help=False)
for key in ['work', 'sdk', 'strip-sdk', 'cargo-home']:
    config.add_argument('--'+key, type=Path, required=True)
settings, remaining = config.parse_known_args()
sys.argv = [sys.argv[0]] + remaining
BASE = settings.work.resolve()
BASE.mkdir(parents=True, exist_ok=True)
SDK = settings.sdk.resolve()
STRIP_SDK = settings.strip_sdk.resolve()
CARGO_CACHE = settings.cargo_home.resolve()
IMAGE = 'solanafoundation/solana-verifiable-build@sha256:6c73adc767ee7ff212f2532d4695472b12f3d4ac20aea3db22b89d8c614dac50'
HASHES = {'rust/bin/rustc': 'c8807b7ebede8578ac5a257ea333780f9d89bd356064fd8184af7e996cb71a97',
          'rust/bin/cargo': 'd28444578306fe5a4f40524331411340123004e9e6556322fcabdbe351fe265d',
          'llvm/bin/llvm-objcopy': 'f078d5b1f9df4190e67938a13e81e1dda1057e16228ff1a6f2f5d5540c9e6aaf'}
def sha(p): return hashlib.sha256(p.read_bytes()).hexdigest()
def inventory(p): return {f.relative_to(p).as_posix():sha(f) for f in sorted(p.rglob('*')) if f.is_file()}

def verify_registry(source):
    registry={}
    for package in tomllib.loads((source/'Cargo.lock').read_text())['package']:
        if not package.get('source','').startswith('registry+'): continue
        name=package['name']+'-'+package['version']; archives=list((CARGO_CACHE/'registry/cache').glob('*/'+name+'.crate'))
        assert len(archives)==1 and sha(archives[0])==package['checksum'],name
        roots=list((CARGO_CACHE/'registry/src').glob('*/'+name)); assert len(roots)==1,name
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
    ap=argparse.ArgumentParser(); ap.add_argument('name'); ap.add_argument('--source', type=Path); ap.add_argument('--fresh',action='store_true'); a=ap.parse_args()
    source=(a.source or BASE/(a.name+'-source')).resolve(); output=BASE/'builds'/a.name
    assert a.name and Path(a.name).name==a.name and a.name not in ['.', '..']
    output.mkdir(parents=True, exist_ok=False); (output/'home').mkdir()
    before=inventory(source)
    assert len(before)==43
    for path,digest in HASHES.items(): assert sha(SDK/path)==digest,path
    registry=verify_registry(source)
    assert len(registry)==252
    assert sha(STRIP_SDK/'llvm/bin/llvm-objcopy')=='3a871eab7279dee53f2580e8a022c980305738b575755b7d3529a6230ec4f672'
    target=output/'target' if a.fresh else BASE/'shared-target'; target.mkdir(exist_ok=True)
    env={'PATH':'/sdk/rust/bin:/sdk/llvm/bin:/usr/bin:/bin','HOME':'/output/home','CARGO_HOME':'/cargo',
         'CARGO_TARGET_DIR':'/target','CARGO_NET_OFFLINE':'true','CARGO_REGISTRIES_CRATES_IO_PROTOCOL':'sparse',
         'CARGO_TERM_COLOR':'never','CARGO_BUILD_JOBS':'3','RUSTFLAGS':'-Zremap-cwd-prefix=',
         'RUSTC':'/sdk/rust/bin/rustc','RUSTDOC':'/sdk/rust/bin/rustdoc','CC':'/sdk/llvm/bin/clang',
         'AR':'/sdk/llvm/bin/llvm-ar','OBJDUMP':'/sdk/llvm/bin/llvm-objdump','OBJCOPY':'/sdk/llvm/bin/llvm-objcopy',
         'LANG':'C.UTF-8','LC_ALL':'C.UTF-8'}
    docker=['docker','run','--rm','--platform','linux/amd64','--network','none']
    for host,guest,ro in [(source,'/source',True),(output,'/output',False),(SDK,'/sdk',True),(STRIP_SDK,'/strip-sdk',True),(CARGO_CACHE,'/cargo',False),(target,'/target',False)]:
        docker+=['--mount',f'type=bind,source={host},target={guest}'+(',readonly' if ro else '')]
    docker+=['-w','/source',IMAGE,'env','-i']+[k+'='+v for k,v in env.items()]
    cargo=['/sdk/rust/bin/cargo']
    command=cargo+['rustc','--release','--target','sbpf-solana-solana','--locked','--offline','--verbose','--manifest-path','/source/programs/pump-fees/Cargo.toml','--lib','--','--remap-path-prefix=/source/programs/pump-fees/src/../../../pump-fees-math/=pump-fees-math/', '--remap-path-prefix=/source/pump-fees-math/=pump-fees-math/', '--remap-path-prefix=programs/pump-fees/src/../../../pump-fees-math/=pump-fees-math/']
    record={'source_inputs':before,'registry_archives':registry,'sdk_tools':HASHES,'image':IMAGE,'environment':env,
            'command':docker+command,'fresh_dependency_target':a.fresh,'originals_mounted':False}
    (output/'launch.json').write_text(json.dumps(record,indent=2)+'\n')
    start=time.monotonic()
    with (output/'build.log').open('wb') as log:
        if not a.fresh:
            subprocess.run(docker+cargo+['clean','--release','--target','sbpf-solana-solana','-p','pump-fun-fees-candidate','-p','pump-fees-math'],stdout=log,stderr=subprocess.STDOUT,check=True)
        p=subprocess.run(docker+command,stdout=log,stderr=subprocess.STDOUT)
    result={'exit_code':p.returncode,'seconds':time.monotonic()-start,'source_unchanged':inventory(source)==before,'registry_unchanged':verify_registry(source)==registry,
            'build_log_sha256':sha(output/'build.log'),'root_invocations':(output/'build.log').read_bytes().count(b'--crate-name pump_fees_candidate '),'math_invocations':(output/'build.log').read_bytes().count(b'--crate-name pump_fees_math ')}
    if p.returncode==0:
        shutil.copyfile(target/'sbpf-solana-solana/release/pump_fees_candidate.so',output/'symbols.so')
        subprocess.run(docker+['/strip-sdk/llvm/bin/llvm-objcopy','--strip-all','/output/symbols.so','/output/candidate.so'],check=True)
        result['artifacts']={n:{'sha256':sha(output/n),'bytes':(output/n).stat().st_size} for n in ['candidate.so','symbols.so']}
    (output/'result.json').write_text(json.dumps(result,indent=2)+'\n'); print(json.dumps(result,indent=2),flush=True)
    assert p.returncode==0 and result['source_unchanged'] and result['root_invocations']==1 and result['math_invocations']==1 and result['registry_unchanged']
if __name__=='__main__':
    with (BASE/'build.lock').open('a') as lock:
        fcntl.flock(lock,fcntl.LOCK_EX)
        main()
