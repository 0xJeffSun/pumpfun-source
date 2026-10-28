from pathlib import Path
import hashlib,json,os,shutil,subprocess,sys,time
W=Path(__file__).resolve().parent;P=W/'mayhem-trade-ir-placement';P.mkdir(exist_ok=True);label=sys.argv[1];assert label in ('baseline','late-inline')
B=W/'mayhem-trade-signer-composition'/label;out=P/label;out.mkdir(exist_ok=False)
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def identity(p):return dict(bytes=p.stat().st_size,sha256=sha(p))
def snap(p):return {x.relative_to(p).as_posix():sha(x) for x in sorted(p.rglob('*')) if x.is_file()}
def save(p,x):p.write_text(json.dumps(x,indent=2)+'\n',encoding='utf-8')
source=out/'source/programs/mayhem';shutil.copytree(B/'source/programs/mayhem',source);old=json.loads((B/'launch.json').read_bytes());inputs=snap(source);assert inputs==old['source_inputs']
command=old['command'][:];command[command.index('--out-dir')+1]=str(out/'target');(out/'target').mkdir()
emit=[i for i,a in enumerate(command) if a.startswith('--emit=')];assert len(emit)==1 and command[emit[0]]=='--emit=dep-info,link';command[emit[0]]='--emit=dep-info,link,llvm-ir'
env=dict(old['environment']);env.update(MAYHEM_LINKER_OUTPUT=str(out/'link'),TEMP=str(out/'temp'),TMP=str(out/'temp'),CARGO_MANIFEST_DIR=str(source),CARGO_MANIFEST_PATH=str(source/'Cargo.toml'));(out/'temp').mkdir()
for collection in ('checked_executables','reused_dependencies'):assert all(sha(Path(n))==h for n,h in old[collection].items())
launch=dict(command=command,cwd=str(source),environment=env,source_inputs=inputs,checked_executables=old['checked_executables'],reused_dependencies=old['reused_dependencies'],parent_launch_sha256=sha(B/'launch.json'),scope='Emit optimized LLVM IR alongside an ordinary Rust compiler/linker output; original ELF is not an input.',target_executions=0)
save(out/'launch.json',launch);start=time.monotonic();result=dict(status='STARTED',target_executions=0)
try:
    with (out/'stdout.log').open('wb') as so,(out/'stderr.log').open('wb') as se:
        proc=subprocess.Popen(command,cwd=source,env=env,stdout=so,stderr=se,creationflags=subprocess.CREATE_NO_WINDOW);save(out/'process.json',dict(pid=proc.pid));code=proc.wait()
    result['returncode']=code;assert code==0,'IR compiler build failed'
    shutil.copyfile(out/'target/mayhem_recovered.so',out/'symbols.so')
    strip=[str(W/'mayhem-native-build/sdk/llvm/bin/llvm-objcopy.exe'),'--strip-all',str(out/'symbols.so'),str(out/'candidate-v154-strip.so')]
    proc=subprocess.run(strip,env=env,capture_output=True,creationflags=subprocess.CREATE_NO_WINDOW);(out/'strip.stdout.log').write_bytes(proc.stdout);(out/'strip.stderr.log').write_bytes(proc.stderr);result['strip']=dict(command=strip,returncode=proc.returncode);assert proc.returncode==0
    ir=list((out/'target').glob('*.ll'));assert len(ir)==1
    result.update(outputs={p.name:identity(p) for p in out.glob('*.so')},llvm_ir={p.name:identity(p) for p in ir},complete_outputs_equal_parent=all((out/n).read_bytes()==(B/n).read_bytes() for n in ('symbols.so','candidate-v154-strip.so')))
    assert snap(source)==inputs and all(sha(Path(n))==h for key in ('checked_executables','reused_dependencies') for n,h in old[key].items())
    result.update(status='SUCCEEDED',source_unchanged=True,dependencies_unchanged=True)
except Exception as exc:result.update(status='FAILED',error=str(exc));raise
finally:result['elapsed_seconds']=time.monotonic()-start;save(out/'result.json',result)
print(label,result['status'],'complete_outputs_equal_parent',result['complete_outputs_equal_parent'],'llvm_ir',result.get('llvm_ir'))
