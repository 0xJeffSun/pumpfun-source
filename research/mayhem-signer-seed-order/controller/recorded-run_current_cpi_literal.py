from pathlib import Path
import json,hashlib,subprocess,shutil,os,sys,time
W=Path(__file__).resolve().parent;P=W/'mayhem-current-cpi-order-control';B=W/'mayhem-current-trade-control/build-02-baseline'
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def snap(p):return {x.relative_to(p).as_posix():sha(x) for x in sorted(p.rglob('*')) if x.is_file()}
def save(p,x):p.write_text(json.dumps(x,indent=2)+'\n',encoding='utf-8')
label=sys.argv[1];assert label in ['root-cpi-late-literal','root-cpi-late-literal-repeat']
out=P/label;out.mkdir(exist_ok=False);source=out/'source/programs/mayhem';shutil.copytree(P/'source',source)
before=snap(source);assert len(before)==67
p=source/'src/instructions/pump_interface.rs';text=p.read_text(encoding='utf-8');start=text.index('pub fn legacy_sell_handler(');prefix_text=text[:start];tail=text[start:]
seed=' let bump=[ctx.bumps.sol_vault];let seeds:&[&[u8]]=&[b"sol-vault",&bump];\n';assert tail.count(seed)==1;tail=tail.replace(seed,'\n')
old='crate::pump::cpi::sell(CpiContext::new_with_signer(a.pump_program.key(),crate::pump::cpi::accounts::Sell {';new='crate::pump::cpi::sell(CpiContext{program_id:a.pump_program.key(),accounts:crate::pump::cpi::accounts::Sell {';assert tail.count(old)==1;tail=tail.replace(old,new)
old=' },&[seeds])';new=' },signer_seeds:&[&[b"sol-vault", &[ctx.bumps.sol_vault]]],';assert tail.count(old)==1;tail=tail.replace(old,new)
lines=tail.splitlines(keepends=True);i=next(i for i,line in enumerate(lines) if '.with_remaining_accounts(vec!' in line);oldline=lines[i];new=oldline.replace('.with_remaining_accounts(', 'remaining_accounts:').replace(']),input,minimum)', ']},input,minimum)');assert new!=oldline
column=oldline.index('error!');gap=column-new.index('error!');assert gap>=0;lines[i]=new.replace('error!', ' '*gap+'error!')
updated=prefix_text+''.join(lines);assert updated.count('\n')==text.count('\n');p.write_text(updated,encoding='utf-8',newline='\n')
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
