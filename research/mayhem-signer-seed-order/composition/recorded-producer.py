"""Isolated incremental compiler controls from exact merged PR330 source."""
from pathlib import Path
import hashlib,json,os,shutil,subprocess,sys,time
W=Path(__file__).resolve().parent;P=W/'mayhem-trade-signer-composition';B=W/'mayhem-current-trade-control/build-02-baseline'
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def snap(p):return {x.relative_to(p).as_posix():sha(x) for x in sorted(p.rglob('*')) if x.is_file()}
def save(p,x):p.write_text(json.dumps(x,indent=2)+'\n',encoding='utf-8')
label=sys.argv[1];assert label in ['baseline','late-inline','late-inline-repeat','baseline-repeat','late-staged','late-literal','price-eager','price-eager-inline']
out=P/label;out.mkdir(exist_ok=False);source=out/'source/programs/mayhem';shutil.copytree(P/'source',source)
before=snap(source);acquisition=json.loads((P/'acquisition.json').read_bytes());assert before==acquisition['source_inputs'] and len(before)==67
if label.startswith('late-inline') or label=='price-eager-inline':
    p=source/'src/instructions/pump_interface.rs';b=p.read_bytes();marker=b'pub fn legacy_sell_handler(';prefix,tail=b.split(marker);assert b.count(marker)==1
    seed=b' let bump=[ctx.bumps.sol_vault];let seeds:&[&[u8]]=&[b"sol-vault",&bump];\n';assert tail.count(seed)==1
    tail=tail.replace(seed,b'\n');old=b' },&[seeds])';assert tail.count(old)==1;tail=tail.replace(old,b' },&[&[b"sol-vault", &[ctx.bumps.sol_vault]]])')
    updated=prefix+marker+tail;assert updated.count(b'\n')==b.count(b'\n')
    def origin(s):i=s.index(b'error!(MayhemError::PumpCpiFailed)');return s[:i].count(b'\n')+1,i-s.rfind(b'\n',0,i)
    assert origin(updated)==origin(b);p.write_bytes(updated)
elif label in ['late-staged','late-literal']:
    p=source/'src/instructions/pump_interface.rs';b=p.read_bytes()
    prior=(W/'mayhem-current-cpi-order-control/publication/source'/(label+'.rs')).read_bytes()
    def region(s):
        start=s.index(b'pub fn legacy_sell_handler(');a=s.index(b' let before_sol=',start);z=s.index(b' a.mayhem_token_vault.reload()?;a.bonding_curve.reload()?;',a);return a,z
    a,z=region(b);pa,pz=region(prior);updated=b[:a]+prior[pa:pz]+b[z:]
    def origin(s):i=s.index(b'error!(MayhemError::PumpCpiFailed)');return s[:i].count(b'\n')+1,i-s.rfind(b'\n',0,i)
    assert origin(updated)==origin(b) and updated.count(b'\n')==b.count(b'\n');p.write_bytes(updated)
if label.startswith('price-eager'):
    p=source/'src/instructions/pump_interface.rs';b=p.read_bytes()
    old=b'  let scaled=reference.checked_mul(tolerance_bps as u128);';new=b'  let scaled=reference.checked_mul(tolerance_bps as u128).ok_or(MayhemError::MathOverflow)?;'
    assert b.count(old)==1;b=b.replace(old,new)
    old=b'  let delta=scaled.ok_or(MayhemError::MathOverflow)?/10_000;';assert b.count(old)==1;b=b.replace(old,b'  let delta=scaled/10_000;');p.write_bytes(b)
after=snap(source);changed=[n for n in before if before[n]!=after[n]]
assert changed==([] if label.startswith('baseline') else ['src/instructions/pump_interface.rs'])
records=[json.loads(p.read_bytes()) for p in (B/'wrapper-records').glob('*.json')];rows=[r for r in records if '--crate-name' in r['after'] and r['after'][r['after'].index('--crate-name')+1]=='mayhem_recovered'];assert len(rows)==1;r=rows[0]
args=r['after'][:];args[args.index('--out-dir')+1]=str(out/'target');(out/'target').mkdir()
launch=json.loads((B/'launch.json').read_bytes());env={k:os.environ[k] for k in ('SystemRoot','WINDIR','SystemDrive','COMSPEC','PROCESSOR_ARCHITECTURE') if k in os.environ};env.update(launch['environment_overrides']);env['MAYHEM_LINKER_OUTPUT']=str(out/'link');env['TEMP']=env['TMP']=str(out/'temp');(out/'temp').mkdir()
plan=json.loads((W/'mayhem-current-trade-control/native-build-plan/stdout.json').read_bytes());roots=[x for x in plan['invocations'] if '--crate-name' in x['args'] and x['args'][x['args'].index('--crate-name')+1]=='mayhem_recovered'];assert len(roots)==1
env.update(roots[0]['env']);env['CARGO_MANIFEST_DIR']=str(source);env['CARGO_MANIFEST_PATH']=str(source/'Cargo.toml')
deps={str(p):sha(p) for folder,pattern in [('target/sbpf-solana-solana/release/deps','*.rlib'),('target/release/deps','*.dll')] for p in (B/folder).glob(pattern)}
checked={n:sha(Path(n)) for n in launch['checked_executables']};assert checked==launch['checked_executables']
command=[r['compiler'],*args];save(out/'launch.json',dict(command=command,cwd=str(source),environment=env,source_inputs=after,changed_source_files=changed,parent_source_inputs=before,reused_dependencies=deps,checked_executables=checked,root_record=r,scope='Incremental isolated Rust root compilation from exact merged PR330 source with pinned native dependencies; original ELF is not a compiler input.',target_executions=0))
start=time.monotonic();result=dict(status='STARTED',target_executions=0)
try:
    with(out/'stdout.log').open('wb') as so,(out/'stderr.log').open('wb') as se:
        proc=subprocess.Popen(command,cwd=source,env=env,stdout=so,stderr=se,creationflags=subprocess.CREATE_NO_WINDOW);save(out/'process.json',dict(pid=proc.pid));code=proc.wait()
    result['returncode']=code;assert code==0,'root compile failed'
    shutil.copyfile(out/'target/mayhem_recovered.so',out/'symbols.so')
    strip=[str(W/'mayhem-native-build/sdk/llvm/bin/llvm-objcopy.exe'),'--strip-all',str(out/'symbols.so'),str(out/'candidate-v154-strip.so')]
    stripped=subprocess.run(strip,env=env,capture_output=True,creationflags=subprocess.CREATE_NO_WINDOW);(out/'strip.stdout.log').write_bytes(stripped.stdout);(out/'strip.stderr.log').write_bytes(stripped.stderr);result['strip']=dict(command=strip,returncode=stripped.returncode);assert stripped.returncode==0
    assert snap(source)==after and all(sha(Path(n))==h for n,h in deps.items()) and all(sha(Path(n))==h for n,h in checked.items())
    result.update(status='SUCCEEDED',source_unchanged=True,dependencies_unchanged=True,outputs={p.name:dict(bytes=p.stat().st_size,sha256=sha(p)) for p in out.glob('*.so')})
except Exception as e:
    result.update(status='FAILED',error=str(e));raise
finally:
    result['elapsed_seconds']=time.monotonic()-start;save(out/'result.json',result)
print(label,result['status'],result.get('outputs'))
