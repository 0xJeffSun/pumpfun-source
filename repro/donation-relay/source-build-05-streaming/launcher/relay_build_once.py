#!/usr/bin/env python3
"""Proposed single relay build orchestrator. Default is read-only preflight.

This file has NOT been executed with --execute. A later authorized build must use
exact frozen inputs and independently inspect its logs; no historical recipe or
complete invocation-level tool attestation is claimed.
"""
from pathlib import Path,PurePosixPath
import argparse,hashlib,json,os,shutil,subprocess,sys,tarfile,traceback,tempfile
P=Path(__file__).resolve().parent
NAME='donation_relay_source_proposal'
NAMESPACES=('index.crates.io-1949cf8c6b5b557f','index.crates.io-6f17d22bba15001f')
def sha(path):return hashlib.sha256(path.read_bytes()).hexdigest()
def write(path,value):path.parent.mkdir(parents=True,exist_ok=True);path.write_text(json.dumps(value,indent=2)+'\n')
def no_link_chain(path):
    path=Path(os.path.abspath(path))
    for part in [path,*path.parents]:
        if part.is_symlink():raise ValueError('Symlink path component: '+str(part))
    return path

def source_hashes(root):
    no_link_chain(root);out={}
    for p in sorted(root.rglob('*')):
        if p.is_symlink():raise ValueError('Source symlink: '+str(p))
        if p.is_file():out[str(p.relative_to(root))]=sha(p)
    return out

def safe_extract(archive,destination):
    no_link_chain(destination);destination.mkdir(parents=True,exist_ok=False)
    with tarfile.open(archive) as t:
        seen=set()
        for m in t:
            name=PurePosixPath(m.name)
            if not m.isfile() or name.is_absolute() or '..' in name.parts or m.name in seen:raise ValueError('Nonregular/unsafe archive member')
            seen.add(m.name);p=destination.joinpath(*name.parts);p.parent.mkdir(parents=True,exist_ok=True);p.write_bytes(t.extractfile(m).read());p.chmod(m.mode & 0o777)

def sdk_snapshot(sdk):
    out={}
    for p in sorted(sdk.rglob('*')):
        if 'dependencies' in p.relative_to(sdk).parts:continue
        if p.is_symlink():raise ValueError('SDK source symlink')
        if p.is_file():out[str(p.relative_to(sdk))]={'sha256':sha(p),'mode':p.stat().st_mode&0o777,'size':p.stat().st_size}
    return out

def phase_snapshot(sdk,rustup,tools):
    out={'tools':{n:{'path':r['path'],'resolved_path':str(Path(r['path']).resolve()),'sha256':sha(Path(r['path']))} for n,r in tools.items()},'links':{}}
    for n,p in [('sdk_platform',sdk/'dependencies/platform-tools'),('sdk_criterion',sdk/'dependencies/criterion'),('rustup_solana',rustup/'toolchains/solana')]:
        out['links'][n]={'exists':p.exists(),'is_symlink':p.is_symlink(),'link':os.readlink(p) if p.is_symlink() else None,'resolved':str(p.resolve()) if p.exists() else None}
    return out

def preflight():
    seal=json.loads((P/'manifest.json').read_text())['files']
    if any(f.is_symlink() for f in P.rglob('*')):raise ValueError('Frozen package symlink')
    actual={str(f.relative_to(P)):sha(f) for f in P.rglob('*') if f.is_file() and f!=P/'manifest.json'}
    if actual!=seal:raise ValueError('Frozen preflight package differs')
    expected=json.loads((P/'resolved-source-sha256.json').read_text())
    if source_hashes(P/'crate')!=expected:raise ValueError('Frozen relay source differs')
    tools=json.loads((P/'tool-witness/tool-files.json').read_text())
    # cargo-build-sbf internally invokes `cargo +solana`; this must resolve to
    # the genuine rustup proxy, not a direct toolchain Cargo executable.
    proxy=Path(tools['rustup']['path']).parent/'cargo'
    if sha(proxy)!=tools['rustup']['sha256'] or not os.access(proxy,os.X_OK):
        raise ValueError('The selected Cargo proxy is not the pinned rustup binary')
    for name,row in tools.items():
        p=Path(row['path'])
        if sha(p)!=row['sha256'] or not os.access(p,os.X_OK):raise ValueError('Tool mismatch/nonexecutable: '+name)
    cached=json.loads((P/'tool-witness/runtime-cache-paths.json').read_text())
    for name,row in cached.items():
        p=Path(row['path'])
        if not p.is_dir() or str(p.resolve())!=row['resolved_path']:raise ValueError('Required existing cache unavailable: '+name)
    actual_home=os.environ.get('HOME')
    if not actual_home or str(Path(actual_home)/'.cache/solana/v1.44/platform-tools')!=cached['compile_tools']['path']:
        raise ValueError('Current HOME does not identify the recorded existing tool caches')
    # No installer is run here, and no markers or global cache links are made.
    if Path(cached['compile_tools']['path']).resolve()!=Path(tools['compile_cargo']['path']).parent.parent.parent:raise ValueError('Compile-cache attribution')
    if Path(cached['strip_tools']['path']).resolve()!=Path(tools['sdk_strip_objcopy']['path']).parent.parent.parent:raise ValueError('Strip-cache attribution')
    return expected,tools,cached

def prepare_registry(destination):
    destination.mkdir(parents=True,exist_ok=False)
    # Only the frozen public registry index and exact official archives. Never
    # copy Cargo credentials, configuration, binaries or global registry state.
    safe_extract(P/'registry/index.tar.gz',destination/'registry/index')
    for ns in NAMESPACES:
        target=destination/'registry/cache'/ns;target.mkdir(parents=True)
        for archive in sorted((P/'registry/archives').glob('*.crate')):shutil.copyfile(archive,target/archive.name)

def inventory_extracted_sources(cargo_home):
    expected={r['name']+'-'+r['version']:r for r in json.loads((P/'resolved-source-archive-equality.json').read_text())}
    rows=[]
    for namespace in (cargo_home/'registry/src').iterdir():
        if namespace.is_symlink() or namespace.name not in NAMESPACES:raise ValueError('Unexpected source namespace')
        for source in namespace.iterdir():
            if source.is_symlink() or source.name not in expected:raise ValueError('Unexpected source package')
            files=source_hashes(source);markers={k:files.pop(k) for k in ['.cargo-ok'] if k in files}
            if files!=expected[source.name]['files']:raise ValueError('Extracted dependency differs from archive: '+source.name)
            rows.append({'namespace':namespace.name,'package':source.name,'files':files,'Cargo_generated_markers':markers})
    return rows

def retain_artifacts(output,target,artifacts,retained):
    # Check the whole output path chain BEFORE reading any artifact or target.
    for path in [output,target,artifacts,retained]:no_link_chain(path)
    selected={'candidate.so':artifacts/(NAME+'.so'),'unstripped.so':target/'sbf-solana-solana/release'/(NAME+'.so')}
    for name,path in selected.items():
        no_link_chain(path)
        if not path.is_file():raise ValueError('Missing named '+name+': '+str(path))
        if path.read_bytes()[:4]!=b'\x7fELF':raise ValueError('Named artifact is not ELF')
    retained.mkdir(exist_ok=False)
    records={}
    for name,path in selected.items():
        shutil.copyfile(path,retained/name);records[name]={'source':str(path.relative_to(output)),'sha256':sha(retained/name),'bytes':(retained/name).stat().st_size}
    # Keypair contents are NEVER opened or hashed. Only the two named ELFs are
    # copied; all generated keypairs remain private, outside retained outputs.
    records['excluded_keypair_names']=[p.name for p in artifacts.iterdir() if p.name.endswith('-keypair.json')]
    return records

def execute(output):
    expected,tools,cached=preflight();output=no_link_chain(output)
    if output.exists():raise ValueError('Output must be a new isolated path; no retries in place')
    output.mkdir(parents=True)
    try:
        source=output/'source';shutil.copytree(P/'crate',source)
        cargo_home=output/'cargo-home';prepare_registry(cargo_home)
        sdk=output/'sdk';safe_extract(P/'tool-witness/sbf-sdk-snapshot.tar.gz',sdk)
        sdk_expected=json.loads((P/'tool-witness/sdk-files.json').read_text())
        if sdk_snapshot(sdk)!=sdk_expected:raise ValueError('SDK bytes/modes differ')
        if (sdk/'dependencies').exists():raise ValueError('SDK starts with no installer completion state')
        for name in ['dump','install','objcopy','package','strip']:
            if not os.access(sdk/'scripts'/f'{name}.sh',os.X_OK):raise ValueError('SDK script is not executable')
        rustup=output/'rustup';(rustup/'toolchains').mkdir(parents=True)
        compiler_root=Path(tools['compile_cargo']['path']).parent.parent
        (rustup/'toolchains/solana').symlink_to(compiler_root,target_is_directory=True)
        (rustup/'settings.toml').write_text('version = "12"\ndefault_toolchain = "solana"\nprofile = "minimal"\n')
        target=output/'target';artifacts=output/'artifacts'
        env={'PATH':os.pathsep.join([str(Path(tools['rustup']['path']).parent),str(Path(tools['cargo_build_sbf']['path']).parent),str(Path(tools['compile_cargo']['path']).parent),'/usr/bin','/bin']),
             'CARGO_HOME':str(cargo_home),'RUSTUP_HOME':str(rustup),'CARGO_TARGET_DIR':str(target),'CARGO_NET_OFFLINE':'true','CARGO_TERM_COLOR':'never'}
        # Preserve the actual existing home only so the unchanged SDK installer
        # finds the already validated caches. Do not redirect HOME or read configs.
        if 'HOME' in os.environ:env['HOME']=os.environ['HOME']
        cmd=[tools['compile_cargo']['path'],'build-sbf','--manifest-path',str(source/'Cargo.toml'),'--tools-version','v1.44','--offline','--sbf-sdk',str(sdk),'--sbf-out-dir',str(artifacts),'--','--locked','--offline']
        write(output/'build-launch.json',{'command':cmd,'environment':env,'source':expected,'scope':'one relay source build, no runtime; compiler version request and file witnesses are not full process-invocation attestation'})
        write(output/'tool-phase-before.json',phase_snapshot(sdk,rustup,tools))
        # Use neutral cwd; Cargo must not discover parent repository configs.
        with tempfile.TemporaryDirectory(prefix='relay-build-cwd-') as temp:
            for a in [Path(temp),*Path(temp).parents]:
                if (a/'.cargo/config').exists() or (a/'.cargo/config.toml').exists():raise ValueError('Unexpected ancestor Cargo config')
            run=subprocess.run(cmd,cwd=temp,env=env,stdout=subprocess.PIPE,stderr=subprocess.PIPE)
        (output/'build.stdout').write_bytes(run.stdout);(output/'build.stderr').write_bytes(run.stderr)
        write(output/'build-result.json',{'returncode':run.returncode,'source_after':source_hashes(source),'runtime_cases':0})
        write(output/'tool-phase-after.json',phase_snapshot(sdk,rustup,tools))
        if source_hashes(source)!=expected:raise ValueError('Source/lock changed during build')
        if sdk_snapshot(sdk)!=sdk_expected:raise ValueError('SDK source changed during build')
        for name,row in tools.items():
            if sha(Path(row['path']))!=row['sha256']:raise ValueError('Tool bytes changed: '+name)
        write(output/'dependency-source-after.json',inventory_extracted_sources(cargo_home))
        if run.returncode:raise RuntimeError('Build failed; complete attempt retained')
        if (sdk/'dependencies/platform-tools').resolve()!=Path(cached['strip_tools']['resolved_path']):raise ValueError('Actual SDK strip path is not pinned v1.52')
        if (sdk/'dependencies/criterion').resolve()!=Path(cached['criterion']['resolved_path']):raise ValueError('SDK criterion attribution changed')
        write(output/'retained-artifacts.json',retain_artifacts(output,target,artifacts,output/'retained'))
    except Exception:
        (output/'failure.txt').write_text(traceback.format_exc());raise

def main():
    parser=argparse.ArgumentParser();parser.add_argument('--execute',action='store_true');parser.add_argument('--output',type=Path);args=parser.parse_args()
    expected,tools,cached=preflight()
    if not args.execute:
        print(json.dumps({'preflight':True,'source_inputs':len(expected),'tools_verified':len(tools),'build_started':False,'runtime_started':False},sort_keys=True));return
    if args.output is None:raise ValueError('--execute requires --output')
    execute(args.output)
if __name__=='__main__':main()
