from pathlib import Path
import gzip,hashlib,importlib.util,json,os,shutil,subprocess,sys,time
W=Path(__file__).resolve().parent;P=W/'mayhem-historical-init-needed';M=P/sys.argv[1];O=P/sys.argv[2];O.mkdir(exist_ok=False)
S=M/'source';F=Path(sys.argv[3]) if len(sys.argv)>3 else M/'framework';prior=json.loads((W/'mayhem-qualified-native/build-01/launch.json').read_bytes());meta=json.loads((M/'stdout.log').read_bytes())
def ident(p):
    with p.open('rb')as f:h=hashlib.file_digest(f,'sha256').hexdigest()
    return dict(bytes=p.stat().st_size,sha256=h)
def snapshot(root):return{p.relative_to(root).as_posix():ident(p)for p in root.rglob('*')if p.is_file()}
def registry_check():
    rows=[]
    for pkg in meta['packages']:
        if not pkg.get('source',''):continue
        root=Path(pkg['manifest_path']).parent;ck=root/'.cargo-checksum.json';data=json.loads(ck.read_bytes())
        files={p.relative_to(root).as_posix()for p in root.rglob('*')if p.is_file()and p!=ck};assert files==set(data['files']),pkg['name']
        for n,h in data['files'].items():assert not(root/n).is_symlink()and ident(root/n)['sha256']==h,(pkg['name'],n)
        rows.append(dict(name=pkg['name'],version=pkg['version'],root=str(root),checksum_map=ident(ck),package_sha256=data['package'],files=len(files)))
    return rows
source_before=snapshot(S);framework_before=snapshot(F);registry_before=registry_check()
old_lock=__import__('tomllib').loads((F/'Cargo.lock').read_text(encoding='utf8'))['package']
historical_registry=all(any(p['name']==r['name']and p['version']==r['version']and p.get('checksum')==r['package_sha256']for p in old_lock)for r in registry_before)
sdk_rows=json.loads(gzip.decompress((W/'mayhem-qualified-native/sdk-components.json.gz').read_bytes()))['files']
target_rows=json.loads((W/'mayhem-qualified-native/target-components.json').read_bytes())['files']
def check_components():
    for base,rows in[(W/'mayhem-native-build/sdk',sdk_rows),(W/'windows-typeid-probe/linux-sysroot',target_rows)]:
        for row in rows:
            assert ident(base/row['path'])=={k:row[k]for k in('bytes','sha256')},row['path']
check_components()
path_roots={str(Path(p['manifest_path']).parent)for p in meta['packages']if not p.get('source')and str(Path(p['manifest_path'])).find('supplements')!=-1}
supplements_before={r:snapshot(Path(r))for r in path_roots}
anchors=[p for p in meta['packages']if p['name'].startswith('anchor-')];assert len(anchors)==14 and all(Path(p['manifest_path']).is_relative_to(F)for p in anchors)
tools={n:ident(Path(n))for n in prior['checked_executables']};assert all(tools[n]['sha256']==h for n,h in prior['checked_executables'].items())
parent=W/'mayhem-qualified-native/build-01';wrapper=parent/'wrapper.exe';linker=parent/'linker.exe';default=W/'mayhem-qualified-native/default.ld'
wrapper_inputs={str(p):ident(p)for p in(wrapper,linker,default,W/'mayhem-qualified-native/wrapper.rs',W/'mayhem-qualified-native/linker.rs')}
env={k:os.environ[k]for k in('SystemRoot','WINDIR','SystemDrive','COMSPEC','PROCESSOR_ARCHITECTURE')if k in os.environ};env.update(prior['environment_overrides'])
for folder in('temp','wrapper-records'): (O/folder).mkdir()
env.update(CARGO_HOME=str(M/'cargo-home'),CARGO_TARGET_DIR=str(O/'target'),TEMP=str(O/'temp'),TMP=str(O/'temp'),RUSTC_WRAPPER=str(wrapper),MAYHEM_METADATA_MODE='passthrough',MAYHEM_WRAPPER_RECORDS=str(O/'wrapper-records'),MAYHEM_LINKER_SCRIPT=str(default),MAYHEM_LINKER_OUTPUT=str(O/'link'))
cmd=[str(W/'mayhem-native-build/sdk/rust/bin/cargo.exe'),'rustc','--manifest-path',str(S/'Cargo.toml'),'--release','--target','sbpf-solana-solana','--locked','--offline','--verbose','--','--remap-path-prefix=src/=programs/mayhem-program/src/','--remap-path-prefix=src/account_wrapper.rs=src/account_wrapper.rs','-C','linker='+str(linker)]
launch=dict(command=cmd,cwd=str(S.parent),environment=env,source_inputs=source_before,framework_inputs=framework_before,registry_packages=registry_before,supplements=supplements_before,executables=tools,wrapper_inputs=wrapper_inputs,anchor_packages=[dict(name=p['name'],version=p['version'],manifest_path=p['manifest_path'])for p in anchors],target_directory_initially_absent=True,target_executions=0,scope='Fresh full native build. All Anchor path packages are historical source from one revision; other registry packages are the resolved existing vendor set. Compiler wrapper is passthrough; default linker script is unchanged. Not a qualified parent-recipe identity test or complete historical lock reproduction.')
launch.update(registry_versions_all_in_historical_lock=historical_registry,sdk_components=sdk_rows,target_components=target_rows)
launch['scope']=json.loads((M/'launch.json').read_bytes())['scope']+' Fresh full native compilation follows the resolved graph. Compiler wrapper is passthrough; default linker script is unchanged. Not a qualified-parent recipe identity test. No target execution.'
(O/'launch.json').write_text(json.dumps(launch,indent=2)+'\n',encoding='utf8',newline='\n');started=time.monotonic()
with(O/'stdout.log').open('wb')as so,(O/'stderr.log').open('wb')as se:
    process=subprocess.Popen(cmd,cwd=S.parent,env=env,stdout=so,stderr=se,creationflags=subprocess.CREATE_NO_WINDOW)
    (O/'process.json').write_text(json.dumps(dict(pid=process.pid,command=cmd))+'\n',encoding='utf8',newline='\n');code=process.wait()
result=dict(returncode=code,elapsed_seconds=time.monotonic()-started,source_unchanged=snapshot(S)==source_before,framework_unchanged=snapshot(F)==framework_before,registry_unchanged=registry_check()==registry_before,supplements_unchanged={r:snapshot(Path(r))for r in path_roots}==supplements_before,tools_unchanged={n:ident(Path(n))for n in tools}==tools,wrapper_inputs_unchanged={n:ident(Path(n))for n in wrapper_inputs}==wrapper_inputs,target_executions=0)
check_components();result['sdk_target_components_unchanged']=True
records=[json.loads(p.read_bytes())for p in(O/'wrapper-records').glob('*.json')];assert all(r['before']==r['after']and r['metadata_replaced']==0 for r in records)
result['wrapper_records']=len(records);result['crate_name_invocations']=sum('--crate-name'in r['after']for r in records)
result['crate_compilations']=sum('--crate-name'in r['after']and any(a in('--emit=dep-info,metadata,link','--emit=dep-info,link')for a in r['after'])for r in records)
if code==0:
    shutil.copyfile(O/'target/sbpf-solana-solana/release/mayhem_recovered.so',O/'symbols.so')
    strip=[str(W/'mayhem-native-build/sdk/llvm/bin/llvm-objcopy.exe'),'--strip-all',str(O/'symbols.so'),str(O/'stripped.so')]
    with(O/'strip.stdout.log').open('wb')as so,(O/'strip.stderr.log').open('wb')as se:sc=subprocess.run(strip,env=env,stdout=so,stderr=se,creationflags=subprocess.CREATE_NO_WINDOW)
    result['strip']=dict(command=strip,returncode=sc.returncode);result['outputs']={n:ident(O/n)for n in('symbols.so','stripped.so')}
    inv=json.loads((O/'link/invocation.json').read_bytes());rows=[]
    for row in inv['inputs']:
        path=O/'link'/row['retained']if row['retained']else Path(row['path']);rows.append(dict(**row,**ident(path)))
    (O/'link-input-identities.json').write_text(json.dumps(rows,indent=2)+'\n',encoding='utf8',newline='\n')
(O/'result.json').write_text(json.dumps(result,indent=2)+'\n',encoding='utf8',newline='\n');print(json.dumps(result),flush=True)
if code:print((O/'stderr.log').read_text(encoding='utf8',errors='replace')[-5000:])
