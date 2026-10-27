from pathlib import Path
import hashlib,json,os,shutil,subprocess,sys
W=Path(__file__).resolve().parent;P=W/'mayhem-whole-parser';BASE=W/'mayhem-qualified-native/build-01'
records=[json.loads(p.read_bytes())for p in(BASE/'wrapper-records').glob('*.json')]
r=next(r for r in records if '--crate-name'in r['after']and r['after'][r['after'].index('--crate-name')+1]=='mayhem_recovered')
prior=json.loads((BASE/'launch.json').read_bytes())
def ident(p):
    b=p.read_bytes();return dict(bytes=len(b),sha256=hashlib.sha256(b).hexdigest())
for label,parent in [('root-gated','gated-historical-create'),('root-enabled-01','old-historical-create'),('root-enabled-02','old-historical-create-repeat')]:
    if len(sys.argv)>1:label+='-search-paths'
    O=P/label;O.mkdir(exist_ok=False);S=O/'source';shutil.copytree(P/parent/'source',S);(O/'temp').mkdir();(O/'out').mkdir()
    arc=next((P/parent).glob('*.rlib'));args=list(r['after']);args[args.index('--out-dir')+1]=str(O/'out')
    i=next(i for i,a in enumerate(args)if a.startswith('curve_accounts='));args[i]='curve_accounts='+str(arc)
    if len(sys.argv)>1:
        host='host-build-04-gated'if'gated'in parent else'host-build-03'
        args+=['-L','dependency='+str(P/host/'target/release/deps'),'-L','dependency='+str(P/parent)]
    env={k:os.environ[k]for k in('SystemRoot','WINDIR','SystemDrive','COMSPEC','PROCESSOR_ARCHITECTURE')if k in os.environ}
    env.update(prior['environment_overrides']);env.pop('RUSTC_WRAPPER',None)
    env.update(MAYHEM_LINKER_OUTPUT=str(O/'link'),TEMP=str(O/'temp'),TMP=str(O/'temp'),CARGO_MANIFEST_DIR=str(S),CARGO_MANIFEST_PATH=str(S/'Cargo.toml'),CARGO_PKG_NAME='mayhem-recovered',CARGO_CRATE_NAME='mayhem_recovered',CARGO_PKG_VERSION='0.1.0',CARGO_PKG_VERSION_MAJOR='0',CARGO_PKG_VERSION_MINOR='1',CARGO_PKG_VERSION_PATCH='0',CARGO_PKG_VERSION_PRE='')
    source_inputs={p.relative_to(S).as_posix():ident(p)for p in S.rglob('*')if p.is_file()}
    launch=dict(command=[r['compiler']]+args,cwd=str(S),environment=env,parent_record=r,source_inputs=source_inputs,curve_archive=dict(path=str(arc),**ident(arc)),compiler=ident(Path(r['compiler'])),target_executions=0,scope='Incremental root compilation using the newly compiled curve archive and reused qualified-parent target libraries; not a fresh dependency build.')
    (O/'launch.json').write_text(json.dumps(launch,indent=2)+'\n',encoding='utf8',newline='\n')
    with(O/'stdout.log').open('wb')as stdout,(O/'stderr.log').open('wb')as stderr:c=subprocess.run(launch['command'],cwd=S,env=env,stdout=stdout,stderr=stderr,creationflags=subprocess.CREATE_NO_WINDOW)
    result=dict(returncode=c.returncode,source_unchanged=all(ident(S/n)==h for n,h in source_inputs.items()),curve_unchanged=ident(arc)=={k:launch['curve_archive'][k]for k in('bytes','sha256')},target_executions=0)
    if c.returncode==0:
        shutil.copyfile(O/'out/mayhem_recovered.so',O/'symbols.so')
        strip=[str(W/'mayhem-native-build/sdk/llvm/bin/llvm-objcopy.exe'),'--strip-all',str(O/'symbols.so'),str(O/'stripped.so')]
        with(O/'strip.stdout.log').open('wb')as stdout,(O/'strip.stderr.log').open('wb')as stderr:sc=subprocess.run(strip,env=env,stdout=stdout,stderr=stderr,creationflags=subprocess.CREATE_NO_WINDOW)
        result['strip']=dict(command=strip,returncode=sc.returncode);result['outputs']={n:ident(O/n)for n in('symbols.so','stripped.so')}
        invocation=json.loads((O/'link/invocation.json').read_bytes());inputs=[]
        for item in invocation['inputs']:
            path=O/'link'/item['retained']if item['retained']else Path(item['path']);inputs.append(dict(**item,**ident(path)))
        (O/'link-input-identities.json').write_text(json.dumps(inputs,indent=2)+'\n',encoding='utf8',newline='\n')
    (O/'result.json').write_text(json.dumps(result,indent=2)+'\n',encoding='utf8',newline='\n');print(label,result,flush=True)
