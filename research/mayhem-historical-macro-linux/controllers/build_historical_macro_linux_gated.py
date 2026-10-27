from pathlib import Path
import gzip,hashlib,json,os,re,subprocess,tarfile,time,io
W=Path(__file__).resolve().parent;R=W.parent/'pumpfun-current';D=W/'historical-linux-macro-gated';S=D/'source';S.mkdir(parents=True,exist_ok=False);base='research/mayhem-historical-macro-context/'
get=lambda n:subprocess.check_output(['git','show','upstream/main:'+base+n],cwd=R)
sha=lambda b:hashlib.sha256(b).hexdigest();tree=json.loads(get('source-tree.json'))
for row in tree['files']:
 data=gzip.decompress(get('historical/'+row['path']+'.gz'));assert hashlib.sha1(b'blob '+str(len(data)).encode()+b'\0'+data).hexdigest()==row['sha'];p=S/row['path'];p.parent.mkdir(parents=True,exist_ok=True);p.write_bytes(data)
packages=json.loads(get('supplement-packages.json'));supp=D/'supplements';supp.mkdir()
for package in packages:
 name=package['name']+'-'+package['version'];raw=get('supplements/'+name+'.crate');assert sha(raw)==package['checksum']
 with tarfile.open(fileobj=io.BytesIO(raw)) as t:
  for m in t:
   assert m.name.startswith(name+'/') and '..' not in Path(m.name).parts and (m.isdir() or m.isfile());p=supp/m.name
   if m.isdir():p.mkdir(parents=True,exist_ok=True)
   else:p.parent.mkdir(parents=True,exist_ok=True);p.write_bytes(t.extractfile(m).read())
manifest=gzip.decompress(get('host/host-build-03/Cargo.toml.gz')).decode();manifest=re.sub(r'path = "C:/[^\"]*/supplements/([^\"]+)"',lambda m:'path = "'+str((supp/m[1]).resolve())+'"',manifest);assert 'C:/' not in manifest;(S/'Cargo.toml').write_text(manifest);(S/'Cargo.lock').write_bytes(gzip.decompress(get('host/host-build-03/Cargo.lock.gz')))
utils=S/'lang/attribute/program/src/declare_program/mods/utils.rs';b=utils.read_bytes();old=b'        /// Program utilities.\n        pub mod utils {';assert b.count(old)==1;b=b.replace(old,b'        /// Program utilities.\n        #[cfg(not(target_os = "solana"))]\n        pub mod utils {');assert hashlib.sha1(b'blob '+str(len(b)).encode()+b'\0'+b).hexdigest()=='4fb84b0879c07819886ba419fee5b6434436555d';utils.write_bytes(b)
inputs={p.relative_to(S).as_posix():sha(p.read_bytes()) for p in S.rglob('*') if p.is_file()};sdk=W.parent/'mayhem-sdk/v1.54';env=os.environ.copy();overrides={'RUSTC':str(sdk/'rust/bin/rustc'),'RUSTDOC':str(sdk/'rust/bin/rustdoc'),'CARGO_HOME':str(W/'cargo-home'),'CARGO_TARGET_DIR':str(D/'target'),'CARGO_NET_OFFLINE':'true','RUSTFLAGS':''};env.update(overrides);cmd=[str(sdk/'rust/bin/cargo'),'build','--manifest-path',str(S/'Cargo.toml'),'--release','--locked','--offline','--verbose','-p','anchor-attribute-program','--jobs','2'];(D/'launch.json').write_text(json.dumps({'command':cmd,'cwd':str(S),'environment_overrides':overrides,'source_inputs':inputs,'source_revision':tree['revision'],'checked_tools':{str(sdk/p):sha((sdk/p).read_bytes()) for p in ['rust/bin/rustc','rust/bin/rustdoc','rust/bin/cargo']},'controller_sha256':sha(Path(__file__).read_bytes()),'scope':'New actual Linux-host macro build from exact authenticated historical source; no original target bytes used'},indent=2)+'\n');start=time.monotonic()
with(D/'stdout').open('wb')as out,(D/'stderr').open('wb')as err:p=subprocess.run(cmd,cwd=S,env=env,stdout=out,stderr=err)
result={'returncode':p.returncode,'seconds':time.monotonic()-start,'source_unchanged':inputs=={f.relative_to(S).as_posix():sha(f.read_bytes()) for f in S.rglob('*')if f.is_file()},'outputs':{f.relative_to(D).as_posix():sha(f.read_bytes()) for f in (D/'target/release').glob('*anchor_attribute_program*.so')}};(D/'result.json').write_text(json.dumps(result,indent=2)+'\n');print(json.dumps(result,indent=2));assert p.returncode==0
