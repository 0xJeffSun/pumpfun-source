"""Capture selected real LLVM pass boundaries without changing source or outputs."""
from pathlib import Path
import hashlib,json,shutil,subprocess,sys,time
W=Path(__file__).resolve().parent;P=W/'mayhem-trade-branch-metadata';P.mkdir(exist_ok=True);label=sys.argv[1];assert label in ('helper','closure','helper-callee','closure-callee');canonical=label.split('-')[0]
B=W/('mayhem-trade-guard-order/checked-price-first-late' if canonical=='helper' else 'mayhem-trade-error-blocks/closure-price-first-late');out=P/label;out.mkdir(exist_ok=False)
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def identity(p):return dict(bytes=p.stat().st_size,sha256=sha(p))
def snap(p):return {x.relative_to(p).as_posix():sha(x) for x in sorted(p.rglob('*')) if x.is_file()}
def save(p,x):p.write_text(json.dumps(x,indent=2)+'\n',encoding='utf-8')
source=out/'source/programs/mayhem';shutil.copytree(B/'source/programs/mayhem',source);prior=json.loads((B/'launch.json').read_bytes());inputs=snap(source);assert inputs==prior['source_inputs']
command=[];i=0
while i<len(prior['command']):
    if prior['command'][i]=='-C' and prior['command'][i+1].startswith('llvm-args='):i+=2;continue
    command.append(prior['command'][i]);i+=1
command[command.index('--out-dir')+1]=str(out/'target');(out/'target').mkdir();name='_ZN16mayhem_recovered12instructions14pump_interface19legacy_sell_handler17hf2e4c78980301589E'
filter_names=[name]
if label.endswith('callee'):
    filter_names.append('_ZN16mayhem_recovered12instructions14pump_interface18legacy_price_check17hb0c4e61afe85aad1E' if canonical=='helper' else '_ZN16mayhem_recovered12instructions14pump_interface19legacy_sell_handler28_$u7b$$u7b$closure$u7d$$u7d$17h60a03ec08cb4ff82E')
passes='lower-expect,inline,simplifycfg'+(',always-inline' if label.endswith('callee') else '')
flags=['-print-pass-numbers','-print-before='+passes,'-print-after='+passes+',codegenprepare','-filter-print-funcs='+','.join(filter_names)]
for f in flags:command+=['-C','llvm-args='+f]
env=dict(prior['environment']);env.update(MAYHEM_LINKER_OUTPUT=str(out/'link'),TEMP=str(out/'temp'),TMP=str(out/'temp'),CARGO_MANIFEST_DIR=str(source),CARGO_MANIFEST_PATH=str(source/'Cargo.toml'));(out/'temp').mkdir()
for collection in ('checked_executables','reused_dependencies'):assert all(sha(Path(n))==h for n,h in prior[collection].items())
save(out/'launch.json',dict(command=command,cwd=str(source),environment=env,source_inputs=inputs,checked_executables=prior['checked_executables'],reused_dependencies=prior['reused_dependencies'],parent_launch_sha256=sha(B/'launch.json'),function_filter=','.join(filter_names),diagnostic_flags=flags,scope='Actual compiler pass diagnostics on unchanged source. No hints or optimization changes, no original compiler input or target execution.',target_executions=0))
start=time.monotonic();result=dict(status='STARTED',target_executions=0)
try:
    with (out/'stdout.log').open('wb') as so,(out/'stderr.log').open('wb') as se:
        proc=subprocess.Popen(command,cwd=source,env=env,stdout=so,stderr=se,creationflags=subprocess.CREATE_NO_WINDOW);save(out/'process.json',dict(pid=proc.pid));code=proc.wait()
    result['returncode']=code;assert code==0,'metadata diagnostic compilation failed'
    shutil.copyfile(out/'target/mayhem_recovered.so',out/'symbols.so');strip=[str(W/'mayhem-native-build/sdk/llvm/bin/llvm-objcopy.exe'),'--strip-all',str(out/'symbols.so'),str(out/'candidate-v154-strip.so')]
    proc=subprocess.run(strip,env=env,capture_output=True,creationflags=subprocess.CREATE_NO_WINDOW);(out/'strip.stdout.log').write_bytes(proc.stdout);(out/'strip.stderr.log').write_bytes(proc.stderr);result['strip']=dict(command=strip,returncode=proc.returncode);assert proc.returncode==0
    result['outputs']={p.name:identity(p) for p in out.glob('*.so')};result['complete_outputs_equal_parent']=all((out/n).read_bytes()==(B/n).read_bytes() for n in ('symbols.so','candidate-v154-strip.so'));assert result['complete_outputs_equal_parent']
    assert snap(source)==inputs and all(sha(Path(n))==h for key in ('checked_executables','reused_dependencies') for n,h in prior[key].items())
    result.update(status='SUCCEEDED',source_unchanged=True,dependencies_unchanged=True)
except Exception as exc:result.update(status='FAILED',error=str(exc));raise
finally:result['elapsed_seconds']=time.monotonic()-start;save(out/'result.json',result)
log=(out/'stderr.log').read_text(encoding='utf-8');headers=[l for l in log.splitlines() if 'IR Dump' in l and len(l)<1000];save(out/'diagnostic-headers.json',headers)
print(label,result['status'],'complete outputs equal parent',result['complete_outputs_equal_parent'],'stderr bytes',len(log.encode()),'headers',len(headers))
