from pathlib import Path
import hashlib,json,os,shutil,subprocess,sys
W=Path(__file__).resolve().parent;P=W/'mayhem-historical-root-compat';P.mkdir(exist_ok=True);H=W/'mayhem-historical-framework'
parent=('metadata-06','build-03-gated')if'--gated'in sys.argv else ('metadata-07','build-04-empty')if'--empty'in sys.argv else('metadata-05','build-02')
BASE=H/parent[0];B=H/parent[1];O=P/sys.argv[1];O.mkdir(exist_ok=False);S=O/'source';shutil.copytree(BASE/'source',S)
def ident(p):
    with p.open('rb')as f:return dict(bytes=p.stat().st_size,sha256=hashlib.file_digest(f,'sha256').hexdigest())
def snap(root):return{p.relative_to(root).as_posix():ident(p)for p in root.rglob('*')if p.is_file()}
before=snap(S)
f=S/'src/lib.rs';data=f.read_bytes();assert data.count(b"Context<'info, SweepFees")==2;data=data.replace(b"Context<'info, SweepFees",b"Context<'_, '_, 'info, 'info, SweepFees");f.write_bytes(data)
f=S/'src/checked_program.rs';data=f.read_bytes();needle=b"impl anchor_lang::DuplicateMutableAccountKeys for CheckedSystemProgram<'_> {\n    fn duplicate_mutable_account_keys(&self) -> Vec<Pubkey> { vec![] }\n}\n";assert data.count(needle)==1;f.write_bytes(data.replace(needle,b'\n'*needle.count(b'\n')))
after=snap(S);changed=[n for n in before if before[n]!=after[n]];assert changed==['src/checked_program.rs','src/lib.rs'],changed
records=[json.loads(p.read_bytes())for p in(B/'wrapper-records').glob('*.json')];r=next(r for r in records if'--crate-name'in r['after']and r['after'][r['after'].index('--crate-name')+1]=='mayhem_recovered')
prior=json.loads((B/'launch.json').read_bytes());env=dict(prior['environment']);env.pop('RUSTC_WRAPPER',None)
(O/'temp').mkdir();(O/'out').mkdir();env.update(TEMP=str(O/'temp'),TMP=str(O/'temp'),MAYHEM_LINKER_OUTPUT=str(O/'link'),CARGO_MANIFEST_DIR=str(S),CARGO_MANIFEST_PATH=str(S/'Cargo.toml'),CARGO_PKG_NAME='mayhem-recovered',CARGO_CRATE_NAME='mayhem_recovered',CARGO_PKG_VERSION='0.1.0',CARGO_PKG_VERSION_MAJOR='0',CARGO_PKG_VERSION_MINOR='1',CARGO_PKG_VERSION_PATCH='0',CARGO_PKG_VERSION_PRE='',CARGO_PKG_AUTHORS='',CARGO_PKG_DESCRIPTION='',CARGO_PKG_HOMEPAGE='',CARGO_PKG_REPOSITORY='',CARGO_PKG_LICENSE='',CARGO_PKG_LICENSE_FILE='')
args=list(r['after']);args[args.index('--out-dir')+1]=str(O/'out')
externs={args[i+1].split('=',1)[1]:ident(Path(args[i+1].split('=',1)[1]))for i,a in enumerate(args)if a=='--extern'}
framework_before=snap(BASE/'framework');tools={n:ident(Path(n))for n in prior['executables']};assert all(tools[n]==h for n,h in prior['executables'].items())
libraries={str(p):ident(p)for directory in(B/'target/release/deps',B/'target/sbpf-solana-solana/release/deps')for p in directory.iterdir()if p.suffix in('.dll','.rlib','.rmeta')}
launch=dict(command=[r['compiler']]+args,cwd=str(S),environment=env,parent_record=r,source_before=before,source_inputs=after,changed_files=changed,framework_inputs=framework_before,externs=externs,executables=tools,target_executions=0,scope='Incremental historical-framework root compatibility diagnostic. Reuses PR269 historical target/host libraries and source66; changes only two explicit Context lifetime signatures and removes one empty implementation of a trait absent from the historical runtime, preserving line count. No business-logic or framework-source patch; no behavior-equivalence claim.')
launch.update(parent_metadata=parent[0],parent_build=parent[1],library_inputs=libraries)
(O/'launch.json').write_text(json.dumps(launch,indent=2)+'\n',encoding='utf8',newline='\n')
with(O/'stdout.log').open('wb')as so,(O/'stderr.log').open('wb')as se:
    process=subprocess.Popen(launch['command'],cwd=S,env=env,stdout=so,stderr=se,creationflags=subprocess.CREATE_NO_WINDOW);(O/'process.json').write_text(json.dumps(dict(pid=process.pid))+'\n',encoding='utf8',newline='\n');code=process.wait()
result=dict(returncode=code,source_unchanged=snap(S)==after,framework_unchanged=snap(BASE/'framework')==framework_before,externs_unchanged={n:ident(Path(n))for n in externs}==externs,tools_unchanged={n:ident(Path(n))for n in tools}==tools,target_executions=0)
result['libraries_unchanged']={n:ident(Path(n))for n in libraries}==libraries
if code==0:
    shutil.copyfile(O/'out/mayhem_recovered.so',O/'symbols.so');strip=[str(W/'mayhem-native-build/sdk/llvm/bin/llvm-objcopy.exe'),'--strip-all',str(O/'symbols.so'),str(O/'stripped.so')]
    with(O/'strip.stdout.log').open('wb')as so,(O/'strip.stderr.log').open('wb')as se:sc=subprocess.run(strip,env=env,stdout=so,stderr=se,creationflags=subprocess.CREATE_NO_WINDOW)
    result['strip']=dict(command=strip,returncode=sc.returncode);result['outputs']={n:ident(O/n)for n in('symbols.so','stripped.so')}
    invocation=json.loads((O/'link/invocation.json').read_bytes());inputs=[]
    for row in invocation['inputs']:
        path=O/'link'/row['retained']if row['retained']else Path(row['path']);inputs.append(dict(**row,**ident(path)))
    (O/'link-input-identities.json').write_text(json.dumps(inputs,indent=2)+'\n',encoding='utf8',newline='\n')
(O/'result.json').write_text(json.dumps(result,indent=2)+'\n',encoding='utf8',newline='\n');print(json.dumps(result),flush=True)
