from pathlib import Path
import json,hashlib,subprocess,shutil,os,sys,time
W=Path(__file__).resolve().parent;P=W/'mayhem-current-cpi-order-control';B=W/'mayhem-current-trade-control/build-02-baseline'
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def snap(p):return {x.relative_to(p).as_posix():sha(x) for x in sorted(p.rglob('*')) if x.is_file()}
def save(p,x):p.write_text(json.dumps(x,indent=2)+'\n',encoding='utf-8')
label=sys.argv[1];assert label in ['root-cpi-early-staged','root-cpi-early-staged-02','root-cpi-early-staged-03','root-cpi-late-staged','root-cpi-late-staged-repeat']
out=P/label;out.mkdir(exist_ok=False);source=out/'source/programs/mayhem';shutil.copytree(P/'source',source)
before=snap(source);assert len(before)==67
p=source/'src/instructions/pump_interface.rs';text=p.read_text(encoding='utf-8');lines=text.splitlines(keepends=True)
seed=' let bump=[ctx.bumps.sol_vault];let seeds:&[&[u8]]=&[b"sol-vault",&bump];\n'
handler_start=next(i for i,line in enumerate(lines) if line.startswith('pub fn legacy_sell_handler('))
seed_indices=[i for i,line in enumerate(lines) if i>handler_start and line==seed];assert len(seed_indices)==1
seed_index=seed_indices[0]
start=' crate::pump::cpi::sell(CpiContext::new_with_signer(a.pump_program.key(),crate::pump::cpi::accounts::Sell {\n'
assert lines.count(start)==1;i=lines.index(start)
lines[i]=' let cpi_program=a.pump_program.key();let cpi_accounts=crate::pump::cpi::accounts::Sell {\n'
end=' },&[seeds])\n';assert lines.count(end)==1;j=lines.index(end)
tail=lines[j+1];assert '.with_remaining_accounts(vec![' in tail and 'error!(MayhemError::PumpCpiFailed)' in tail
vec_start=tail.index('vec![');vec_end=tail.index('),input,minimum)')
vec=tail[vec_start:vec_end];assert vec.endswith(']')
ctx='let signer_seeds=&[seeds];let cpi_ctx=CpiContext::new_with_signer(cpi_program,cpi_accounts,signer_seeds).with_remaining_accounts('+vec+');'
late=label.startswith('root-cpi-late')
lines[j]=' };'+(seed.strip() if late else '')+ctx+'\n'
if late:lines[seed_index]='\n'
prefix=' crate::pump::cpi::sell(cpi_ctx,input,minimum).map_err(|_|'
column=tail.index('error!');assert len(prefix)<=column
lines[j+1]=prefix+' '*(column-len(prefix))+tail[column:]
updated=''.join(lines);assert updated.count('\n')==text.count('\n')
p.write_text(updated,encoding='utf-8',newline='\n')
after=snap(source);changed=[n for n in before if before[n]!=after[n]]
records=[json.loads(p.read_bytes()) for p in (B/'wrapper-records').glob('*.json')];rows=[r for r in records if '--crate-name' in r['after'] and r['after'][r['after'].index('--crate-name')+1]=='mayhem_recovered'];assert len(rows)==1;r=rows[0]
args=r['after'][:];args[args.index('--out-dir')+1]=str(out/'target');(out/'target').mkdir()
launch=json.loads((B/'launch.json').read_bytes());env={k:os.environ[k] for k in ('SystemRoot','WINDIR','SystemDrive','COMSPEC','PROCESSOR_ARCHITECTURE') if k in os.environ};env.update(launch['environment_overrides']);env['MAYHEM_LINKER_OUTPUT']=str(out/'link');env['TEMP']=env['TMP']=str(out/'temp');(out/'temp').mkdir()
plan=json.loads((W/'mayhem-current-trade-control/native-build-plan/stdout.json').read_bytes());root_plan=[x for x in plan['invocations'] if '--crate-name' in x['args'] and x['args'][x['args'].index('--crate-name')+1]=='mayhem_recovered'];assert len(root_plan)==1
env.update(root_plan[0]['env']);env['CARGO_MANIFEST_DIR']=str(source);env['CARGO_MANIFEST_PATH']=str(source/'Cargo.toml')
deps={str(p):sha(p) for p in (B/'target/sbpf-solana-solana/release/deps').glob('*.rlib')}
deps.update({str(p):sha(p) for p in (B/'target/release/deps').glob('*.dll')})
checked={n:sha(Path(n)) for n in launch['checked_executables']};assert checked==launch['checked_executables']
command=[r['compiler'],*args];save(out/'launch.json',dict(command=command,cwd=str(source),environment=env,source_inputs=after,changed_source_files=changed,reused_dependencies=deps,checked_executables=checked,parent_source_inputs=before,root_record=r,scope='Incremental isolated Rust root compilation reusing current native full-build dependencies; original ELF is not a compiler input.',target_executions=0))
start=time.monotonic();result=dict(status='STARTED',target_executions=0)
try:
    with(out/'stdout.log').open('wb') as so,(out/'stderr.log').open('wb') as se:
        proc=subprocess.Popen(command,cwd=source,env=env,stdout=so,stderr=se,creationflags=subprocess.CREATE_NO_WINDOW);save(out/'process.json',dict(pid=proc.pid));code=proc.wait()
    result['returncode']=code;assert code==0,'root compile failed'
    shutil.copyfile(out/'target/mayhem_recovered.so',out/'symbols.so')
    strip=[str(W/'mayhem-native-build/sdk/llvm/bin/llvm-objcopy.exe'),'--strip-all',str(out/'symbols.so'),str(out/'candidate-v154-strip.so')]
    p=subprocess.run(strip,env=env,capture_output=True,creationflags=subprocess.CREATE_NO_WINDOW);(out/'strip.stdout.log').write_bytes(p.stdout);(out/'strip.stderr.log').write_bytes(p.stderr);result['strip']=dict(command=strip,returncode=p.returncode);assert p.returncode==0
    assert snap(source)==after,'source mutated during build';assert all(sha(Path(n))==h for n,h in deps.items()),'dependency changed';assert all(sha(Path(n))==h for n,h in checked.items()),'tool changed'
    result.update(status='SUCCEEDED',source_unchanged=True,dependencies_unchanged=True,outputs={p.name:dict(bytes=p.stat().st_size,sha256=sha(p)) for p in out.glob('*.so')})
except Exception as e:
    result.update(status='FAILED',error=str(e));raise
finally:
    result['elapsed_seconds']=time.monotonic()-start;save(out/'result.json',result)
print(label,result['status'],result.get('outputs'))
