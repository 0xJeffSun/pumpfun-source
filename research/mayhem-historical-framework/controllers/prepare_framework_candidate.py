from pathlib import Path
import hashlib,json,os,re,shutil,subprocess,sys
W=Path(__file__).resolve().parent;P=W/'mayhem-historical-framework';O=P/sys.argv[1];O.mkdir(exist_ok=False)
historical_vendor='--historical-vendor'in sys.argv
S=O/'source';F=O/'framework';B=W/'mayhem-qualified-native/build-01/source/programs/mayhem'
shutil.copytree(B,S);shutil.copytree(P/'historical',F)
def ident(p):
    b=p.read_bytes();return dict(bytes=len(b),sha256=hashlib.sha256(b).hexdigest())
before={p.relative_to(O).as_posix():ident(p)for root in(S,F)for p in root.rglob('*')if p.is_file()}
mf=F/'Cargo.toml';data=mf.read_bytes();data=re.sub(rb'members = \[.*?\]',b'members = ["idl", "idl/spec", "lang", "lang/attribute/*", "lang/derive/*", "lang/syn", "spl"]',data,count=1,flags=re.S);mf.write_bytes(data)
root=S/'Cargo.toml';data=root.read_text(encoding='utf8').replace('version = "=1.0.0"','version = "=0.32.1"')
data=data.replace('anchor-lang = { path = "vendor/anchor-lang" }','anchor-lang = { path = '+json.dumps((F/'lang').as_posix())+' }\nanchor-spl = { path = '+json.dumps((F/'spl').as_posix())+' }')
patches=json.loads((W/'mayhem-whole-parser/supplement-packages.json').read_bytes())
more=P/'extra-packages.json'
if more.exists():patches+=json.loads(more.read_bytes())
if historical_vendor:patches=[];shutil.copyfile(F/'Cargo.lock',S/'Cargo.lock')
lines=[]
for row in patches:
    directory=Path(row['directory'])if'directory'in row else W/'mayhem-whole-parser/supplements'/(row['name']+'-'+row['version'])
    lines.append(row['name']+' = { path = '+json.dumps(directory.as_posix())+' }')
data=data.replace('[profile.release.package.curve-accounts]','\n'.join(lines)+'\n\n[profile.release.package.curve-accounts]');root.write_text(data,encoding='utf8',newline='\n')
curve=S/'curve-accounts/Cargo.toml';curve.write_bytes(curve.read_bytes().replace(b'anchor-lang="=1.0.0"',b'anchor-lang="=0.32.1"'))
idl=S/'curve-accounts/idls/pump.json';small=json.loads(idl.read_bytes());old=json.loads((W/'mayhem-whole-parser/historical-pump.json').read_bytes())
small.update(events=[e for e in old['events']if e['name']=='CreateEvent'],types=[t for t in old['types']if t['name']=='CreateEvent']);idl.write_text(json.dumps(small,indent=2)+'\n',encoding='utf8',newline='\n')
if '--empty'in sys.argv:shutil.copyfile(B/'curve-accounts/idls/pump.json',idl)
if '--gate'in sys.argv:
    f=F/'lang/attribute/program/src/declare_program/mods/utils.rs';b=f.read_bytes();needle=b'        /// Program utilities.\n        pub mod utils {';assert b.count(needle)==1
    b=b.replace(needle,b'        /// Program utilities.\n        #[cfg(not(target_os = "solana"))]\n        pub mod utils {');assert hashlib.sha1(b'blob '+str(len(b)).encode()+b'\0'+b).hexdigest()=='4fb84b0879c07819886ba419fee5b6434436555d';f.write_bytes(b)
after={p.relative_to(O).as_posix():ident(p)for root in(S,F)for p in root.rglob('*')if p.is_file()}
prior=json.loads((W/'mayhem-qualified-native/build-01/launch.json').read_bytes())
env={k:os.environ[k]for k in('SystemRoot','WINDIR','SystemDrive','COMSPEC','PROCESSOR_ARCHITECTURE')if k in os.environ};env.update(prior['environment_overrides']);env.pop('RUSTC_WRAPPER',None)
env.update(CARGO_HOME=str(O/'cargo-home'),CARGO_TARGET_DIR=str(O/'target'),TEMP=str(O/'temp'),TMP=str(O/'temp'))
vendor=P/'locked-vendor'if historical_vendor else W/'mayhem-native-build/vendor'
(O/'temp').mkdir();(O/'cargo-home').mkdir();(O/'cargo-home/config.toml').write_text('[source.crates-io]\nreplace-with="locked-vendor"\n[source.locked-vendor]\ndirectory='+json.dumps(str(vendor))+'\n[net]\noffline=true\n',encoding='utf8',newline='\n')
cmd=[str(W/'mayhem-native-build/sdk/rust/bin/cargo.exe'),'metadata','--offline','--manifest-path',str(root),'--format-version','1']
launch=dict(command=cmd,cwd=str(S),environment=env,before=before,source_inputs=after,changed_files=[n for n in after if after[n]!=before[n]],target_executions=0,scope='All fourteen historical Anchor path packages from one Git revision. Existing registry vendor versions and selected checksum-pinned supplements; not a complete historical lock reproduction. Baseline source is the older qualified 66-file diagnostic. Resolution only at this step.')
if historical_vendor:launch['scope']='All fourteen historical Anchor path packages from one Git revision. Registry vendor contains the 255-package dependency closure from its historical root Cargo.lock. That lock is supplied as the initial program lock and Cargo prunes it while adding the two reconstructed program packages. Baseline remains the older 66-file qualified diagnostic. Resolution only.'
launch['variant']=dict(historical_vendor=historical_vendor,gate='--gate'in sys.argv,empty_idl='--empty'in sys.argv)
(O/'launch.json').write_text(json.dumps(launch,indent=2)+'\n',encoding='utf8',newline='\n')
with(O/'stdout.log').open('wb')as so,(O/'stderr.log').open('wb')as se:r=subprocess.run(cmd,cwd=S,env=env,stdout=so,stderr=se,creationflags=subprocess.CREATE_NO_WINDOW)
result=dict(returncode=r.returncode,source_unchanged_except_lock=all(ident(O/n)==h for n,h in after.items()if n!='source/Cargo.lock'),lock_before=after['source/Cargo.lock'],lock_after=ident(S/'Cargo.lock'),target_executions=0)
(O/'result.json').write_text(json.dumps(result,indent=2)+'\n',encoding='utf8',newline='\n');print(result)
if r.returncode:print((O/'stderr.log').read_text(encoding='utf8')[-3500:])
