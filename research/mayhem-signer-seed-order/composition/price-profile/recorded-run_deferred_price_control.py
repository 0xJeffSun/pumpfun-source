from pathlib import Path
import hashlib,json,shutil,subprocess,sys,time
W=Path(__file__).resolve().parent;P=W/'mayhem-trade-error-blocks';B=W/'mayhem-trade-guard-order/checked-price-first-late';label=sys.argv[1] if len(sys.argv)>1 else 'deferred-price-first-late';assert label in ('deferred-price-first-late','closure-price-first-late');out=P/label;out.mkdir(exist_ok=False)
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def identity(p):return dict(bytes=p.stat().st_size,sha256=sha(p))
def snap(p):return {x.relative_to(p).as_posix():sha(x) for x in sorted(p.rglob('*')) if x.is_file()}
def save(p,x):p.write_text(json.dumps(x,indent=2)+'\n',encoding='utf-8')
source=out/'source/programs/mayhem';shutil.copytree(B/'source/programs/mayhem',source);prior=json.loads((B/'launch.json').read_bytes());before=snap(source);assert before==prior['source_inputs']
f=source/'src/instructions/pump_interface.rs';b=f.read_bytes();original=b;changes=[
 (b' legacy_price_check(c.virtual_token_reserves as u128,c.virtual_sol_reserves as u128,reference,tolerance_bps)?;',b' legacy_price_check(c.virtual_token_reserves as u128,c,reference,tolerance_bps)?;'),
 (b'fn legacy_price_check(vt:u128,vs:u128,reference:u128,tolerance_bps:u16)',b'fn legacy_price_check(vt:u128,c:&SellCurve,reference:u128,tolerance_bps:u16)'),
 (b'  let price=vs*1_000_000_000_000_000u128/vt;',b'  let vs=c.virtual_sol_reserves as u128;let price=vs*1_000_000_000_000_000u128/vt;')]
if label=='closure-price-first-late':
    marker=b'fn legacy_price_check(vt:u128,vs:u128,reference:u128,tolerance_bps:u16)->core::result::Result<(),MayhemError> {';assert b.count(marker)==1;body=b.split(marker)[1].strip();assert body.endswith(b'}') and b'//' not in body;body=b' '.join(line.strip() for line in body[:-1].splitlines() if line.strip())
    old=changes[0][0];new=b' let vt=c.virtual_token_reserves as u128;let vs=c.virtual_sol_reserves as u128;let price_check:core::result::Result<(),MayhemError>=(||{'+body+b'})();price_check?;';changes=[(old,new)]
for old,new in changes:assert b.count(old)==1;b=b.replace(old,new)
assert b.count(b'\n')==original.count(b'\n');f.write_bytes(b);inputs=snap(source);assert [n for n in inputs if inputs[n]!=before[n]]==['src/instructions/pump_interface.rs']
command=prior['command'][:];command[command.index('--out-dir')+1]=str(out/'target');(out/'target').mkdir();env=dict(prior['environment']);env.update(MAYHEM_LINKER_OUTPUT=str(out/'link'),TEMP=str(out/'temp'),TMP=str(out/'temp'),CARGO_MANIFEST_DIR=str(source),CARGO_MANIFEST_PATH=str(source/'Cargo.toml'));(out/'temp').mkdir()
for collection in ('checked_executables','reused_dependencies'):assert all(sha(Path(n))==h for n,h in prior[collection].items())
save(out/'launch.json',dict(command=command,cwd=str(source),environment=env,source_inputs=inputs,parent_source_inputs=before,changed_source_files=['src/instructions/pump_interface.rs'],checked_executables=prior['checked_executables'],reused_dependencies=prior['reused_dependencies'],parent_launch_sha256=sha(B/'launch.json'),transforms=[dict(old=a.decode(),new=b.decode()) for a,b in changes],scope='Bounded deferred-reserve composition or typed closure in place of the inline helper; price-first source and late seeds retained. Unused original helper kept in closure control; no hints, binary rewriting, original compiler input or execution.',target_executions=0))
start=time.monotonic();result=dict(status='STARTED',target_executions=0)
try:
    with (out/'stdout.log').open('wb') as so,(out/'stderr.log').open('wb') as se:
        proc=subprocess.Popen(command,cwd=source,env=env,stdout=so,stderr=se,creationflags=subprocess.CREATE_NO_WINDOW);save(out/'process.json',dict(pid=proc.pid));code=proc.wait()
    result['returncode']=code;assert code==0,'deferred price compilation failed'
    shutil.copyfile(out/'target/mayhem_recovered.so',out/'symbols.so');strip=[str(W/'mayhem-native-build/sdk/llvm/bin/llvm-objcopy.exe'),'--strip-all',str(out/'symbols.so'),str(out/'candidate-v154-strip.so')]
    proc=subprocess.run(strip,env=env,capture_output=True,creationflags=subprocess.CREATE_NO_WINDOW);(out/'strip.stdout.log').write_bytes(proc.stdout);(out/'strip.stderr.log').write_bytes(proc.stderr);result['strip']=dict(command=strip,returncode=proc.returncode);assert proc.returncode==0
    result['outputs']={p.name:identity(p) for p in out.glob('*.so')}
    assert snap(source)==inputs and all(sha(Path(n))==h for key in ('checked_executables','reused_dependencies') for n,h in prior[key].items())
    result.update(status='SUCCEEDED',source_unchanged=True,dependencies_unchanged=True)
except Exception as exc:result.update(status='FAILED',error=str(exc));raise
finally:result['elapsed_seconds']=time.monotonic()-start;save(out/'result.json',result)
print(result['status'],result.get('outputs'))
