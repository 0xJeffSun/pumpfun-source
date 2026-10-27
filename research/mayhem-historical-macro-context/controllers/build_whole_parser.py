from pathlib import Path
import hashlib,json,os,re,shutil,subprocess,sys
W=Path(__file__).resolve().parent;P=W/'mayhem-whole-parser';O=P/(sys.argv[1]if len(sys.argv)>1 else'host-build');O.mkdir(exist_ok=False)
S=O/'source';shutil.copytree(P/'historical',S)
manifest=S/'Cargo.toml';before=manifest.read_bytes();after=re.sub(rb'members = \[.*?\]',b'members = ["lang/attribute/program", "lang/syn", "idl", "idl/spec"]',before,count=1,flags=re.S)
assert before!=after
if len(sys.argv)>1:
    after+=b'\n[patch.crates-io]\n'
    for row in json.loads((P/'supplement-packages.json').read_bytes()):
        path=(P/'supplements'/(row['name']+'-'+row['version'])).as_posix()
        after+=(row['name']+' = { path = '+json.dumps(path)+' }\n').encode()
manifest.write_bytes(after)
if 'gated' in O.name:
    utils=S/'lang/attribute/program/src/declare_program/mods/utils.rs'
    data=utils.read_bytes();needle=b'        /// Program utilities.\n        pub mod utils {'
    assert data.count(needle)==1
    data=data.replace(needle,b'        /// Program utilities.\n        #[cfg(not(target_os = "solana"))]\n        pub mod utils {')
    assert hashlib.sha1(b'blob '+str(len(data)).encode()+b'\0'+data).hexdigest()=='4fb84b0879c07819886ba419fee5b6434436555d'
    utils.write_bytes(data)
def ident(b):return dict(bytes=len(b),sha256=hashlib.sha256(b).hexdigest())
snapshot={p.relative_to(S).as_posix():ident(p.read_bytes())for p in S.rglob('*')if p.is_file()}
prior=json.loads((W/'mayhem-allocator-source/full-parser-01/launch.json').read_bytes())
env={k:os.environ[k]for k in('SystemRoot','WINDIR','SystemDrive','COMSPEC','PROCESSOR_ARCHITECTURE')if k in os.environ}
env.update({k:v for k,v in prior['environment_overrides'].items()if k in('PATH','LIB','INCLUDE','RUSTC','RUSTDOC','CARGO_TARGET_X86_64_PC_WINDOWS_MSVC_LINKER')})
env.update(CARGO_HOME=str(O/'cargo-home'),CARGO_TARGET_DIR=str(O/'target'),CARGO_NET_OFFLINE='true',TEMP=str(O/'temp'),TMP=str(O/'temp'))
(O/'cargo-home').mkdir();(O/'temp').mkdir()
(O/'cargo-home/config.toml').write_text('[source.crates-io]\nreplace-with="locked-vendor"\n[source.locked-vendor]\ndirectory='+json.dumps(str(W/'mayhem-native-build/vendor'))+'\n[net]\noffline=true\n',encoding='utf8',newline='\n')
command=[str(W/'mayhem-native-build/sdk/rust/bin/cargo.exe'),'build','--offline','--manifest-path',str(manifest),'--release','-p','anchor-attribute-program','--verbose']
launch=dict(command=command,cwd=str(S),environment=env,source_inputs=snapshot,manifest_before=ident(before),manifest_after=ident(after),adaptation='Workspace members narrowed to the historical proc-macro/syn/IDL/spec. Offline path patches supply optional dependency archives pinned by the historical root lockfile; other registry dependencies use the existing pinned vendor set, not the complete historical lock. Only the root Cargo.toml differs among the121 retained historical files. Target runtime Anchor remains1.0.0 in later controls.',target_executions=0)
if 'gated' in O.name:launch['adaptation']+=' The gated control also applies the exact historical utils.rs gate addition; the resulting Git blob is4fb84b0879c07819886ba419fee5b6434436555d.'
(O/'launch.json').write_text(json.dumps(launch,indent=2)+'\n',encoding='utf8',newline='\n')
with(O/'stdout.log').open('wb')as stdout,(O/'stderr.log').open('wb')as stderr:r=subprocess.run(command,cwd=S,env=env,stdout=stdout,stderr=stderr,creationflags=subprocess.CREATE_NO_WINDOW)
result=dict(returncode=r.returncode,source_unchanged=all(ident((S/n).read_bytes())==h for n,h in snapshot.items()),outputs={p.relative_to(O).as_posix():ident(p.read_bytes())for p in(O/'target/release').glob('*.dll')},target_executions=0)
(O/'result.json').write_text(json.dumps(result,indent=2)+'\n',encoding='utf8',newline='\n');print(result)
