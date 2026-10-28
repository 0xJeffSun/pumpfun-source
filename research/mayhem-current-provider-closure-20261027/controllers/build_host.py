from pathlib import Path
import gzip,hashlib,json,os,re,subprocess,tarfile,time
R=Path('/workspace/pumpfun-source-current');P=R/'research/mayhem-historical-macro-context';W=Path(__file__).resolve().parent;S=W/'historical-source';S.mkdir()
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
tree=json.loads((P/'source-tree.json').read_bytes())
for row in tree['files']:
 data=gzip.decompress((P/('historical/'+row['path']+'.gz')).read_bytes())
 assert hashlib.sha1(b'blob '+str(len(data)).encode()+b'\0'+data).hexdigest()==row['sha']
 dest=S/row['path'];dest.parent.mkdir(parents=True,exist_ok=True);dest.write_bytes(data)
supp=W/'supplements';supp.mkdir()
for package in json.loads((P/'supplement-packages.json').read_bytes()):
 name=package['name']+'-'+package['version'];arc=P/('supplements/'+name+'.crate');assert sha(arc)==package['checksum']
 with tarfile.open(arc) as tf:
  assert all(x.name.startswith(name+'/') and '..' not in Path(x.name).parts for x in tf)
  tf.extractall(supp,filter='data')
manifest=gzip.decompress((P/'host/host-build-03/Cargo.toml.gz').read_bytes()).decode()
manifest=re.sub(r'path = "C:/[^\"]*/supplements/([^\"]+)"',lambda m:'path = "'+str((supp/m[1]).resolve())+'"',manifest)
assert 'C:/' not in manifest
(S/'Cargo.toml').write_text(manifest);(S/'Cargo.lock').write_bytes(gzip.decompress((P/'host/host-build-03/Cargo.lock.gz').read_bytes()))
inputs=lambda:{f.relative_to(S).as_posix():sha(f) for f in S.rglob('*') if f.is_file()}
before=inputs();T=Path('/workspace/toolchains/v1.54');env=os.environ.copy();overrides={'RUSTC_BOOTSTRAP':'1','RUSTC':str(T/'rust/bin/rustc'),'RUSTDOC':str(T/'rust/bin/rustdoc'),'CARGO_HOME':'/workspace/mayhem-build/cargo-home','CARGO_TARGET_DIR':str(W/'host-target'),'RUSTFLAGS':''};env.update(overrides)
commands={'fetch':[str(T/'rust/bin/cargo'),'fetch','--manifest-path',str(S/'Cargo.toml'),'--locked'], 'compile':[str(T/'rust/bin/cargo'),'build','--manifest-path',str(S/'Cargo.toml'),'--release','--locked','--offline','--verbose','-p','anchor-attribute-program','--jobs','4']}
(W/'host-launch.json').write_text(json.dumps(dict(commands=commands,environment_overrides=overrides,source_inputs=before,source_revision=tree['revision']),indent=2)+'\n')
results={}
for name,cmd in commands.items():
 start=time.monotonic()
 with (W/(name+'.stdout')).open('wb') as out,(W/(name+'.stderr')).open('wb') as err:p=subprocess.run(cmd,cwd=S,env=env,stdout=out,stderr=err)
 results[name]=dict(returncode=p.returncode,seconds=time.monotonic()-start,source_unchanged=inputs()==before)
 (W/'host-results.json').write_text(json.dumps(results,indent=2)+'\n');print(name,results[name],flush=True);p.check_returncode()
