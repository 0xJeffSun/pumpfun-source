"""Build the authenticated historical program macro with the current native host SDK."""
from pathlib import Path
import gzip,hashlib,json,os,re,subprocess,tarfile,time
W=Path(__file__).resolve().parent;R=W.parents[1];P=R/'research/mayhem-historical-macro-context';D=W/'historical-native-macro-gated-a';S=D/'source';S.mkdir(parents=True,exist_ok=False)
sha=lambda b:hashlib.sha256(b).hexdigest()
tree=json.loads((P/'source-tree.json').read_bytes())
for row in tree['files']:
 data=gzip.decompress((P/('historical/'+row['path']+'.gz')).read_bytes());assert hashlib.sha1(b'blob '+str(len(data)).encode()+b'\0'+data).hexdigest()==row['sha'];dest=S/row['path'];dest.parent.mkdir(parents=True,exist_ok=True);dest.write_bytes(data)
packages=json.loads((P/'supplement-packages.json').read_bytes());supp=D/'supplements';supp.mkdir()
for package in packages:
 name=package['name']+'-'+package['version'];arc=P/('supplements/'+name+'.crate');assert sha(arc.read_bytes())==package['checksum']
 with tarfile.open(arc) as tf:
  for member in tf:
   assert member.name.startswith(name+'/') and '..'not in Path(member.name).parts and (member.isdir()or member.isfile())
   dest=supp/member.name
   if member.isdir():dest.mkdir(parents=True,exist_ok=True)
   else:dest.parent.mkdir(parents=True,exist_ok=True);dest.write_bytes(tf.extractfile(member).read())
manifest=gzip.decompress((P/'host/host-build-03/Cargo.toml.gz').read_bytes()).decode()
manifest=re.sub(r'path = "C:/[^\"]*/supplements/([^\"]+)"',lambda m:'path = "'+str((supp/m[1]).resolve())+'"',manifest)
assert 'C:/' not in manifest
utils=S/'lang/attribute/program/src/declare_program/mods/utils.rs'
b=utils.read_bytes(); old=b'        /// Program utilities.\n        pub mod utils {'; assert b.count(old)==1; b=b.replace(old,b'        /// Program utilities.\n        #[cfg(not(target_os = \"solana\"))]\n        pub mod utils {'); assert hashlib.sha1(b'blob '+str(len(b)).encode()+b'\0'+b).hexdigest()=='4fb84b0879c07819886ba419fee5b6434436555d'; utils.write_bytes(b)
(S/'Cargo.toml').write_text(manifest);(S/'Cargo.lock').write_bytes(gzip.decompress((P/'host/host-build-03/Cargo.lock.gz').read_bytes()))
inputs={f.relative_to(S).as_posix():sha(f.read_bytes())for f in S.rglob('*')if f.is_file()}
sdk=W/'layout-lane-linux-target2-sysroot';env=os.environ.copy();overrides={'RUSTC':str(sdk/'bin/rustc'),'RUSTDOC':str(sdk/'bin/rustdoc'),'CARGO_HOME':str(W/'cargo-home'),'CARGO_TARGET_DIR':str(D/'target'),'CARGO_NET_OFFLINE':'true','RUSTFLAGS':''};env.update(overrides)
cmd=[str(sdk/'bin/cargo'),'build','--manifest-path',str(S/'Cargo.toml'),'--release','--locked','--offline','--verbose','-p','anchor-attribute-program','--jobs','2']
(D/'launch.json').write_text(json.dumps({'command':cmd,'environment_overrides':overrides,'source_inputs':inputs,'source_revision':tree['revision'],'scope':'Native host macro build; not a target program build or historical toolchain claim.'},indent=2)+'\n')
started=time.monotonic()
with (D/'stdout').open('wb')as out,(D/'stderr').open('wb')as err:p=subprocess.run(cmd,cwd=S,env=env,stdout=out,stderr=err)
result={'returncode':p.returncode,'seconds':time.monotonic()-started,'source_unchanged':inputs=={f.relative_to(S).as_posix():sha(f.read_bytes())for f in S.rglob('*')if f.is_file()},'outputs':{f.relative_to(D).as_posix():sha(f.read_bytes())for f in (D/'target/release').glob('*anchor_attribute_program*.dylib')}}
(D/'result.json').write_text(json.dumps(result,indent=2)+'\n');print(json.dumps(result,indent=2))
