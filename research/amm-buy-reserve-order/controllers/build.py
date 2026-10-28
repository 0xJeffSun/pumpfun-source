from pathlib import Path
import subprocess,json,hashlib,shutil,os,datetime,difflib
R=Path('/mnt/c/Users/ahi20/Documents/ChatGPT/pumpfun-source');D=Path('/home/ahi200/pumpfun-work/20261028-amm-reserve-source');W=Path('/home/ahi200/pumpfun-work/20261028-amm-sweep-order');ref='63d108022f6be295d9e8e7f697f3024f4aa44fea';prefix='research/claude-amm2-integrate-20261027/g02-c726/'
git=lambda *a:subprocess.check_output(['git','-c','safe.directory='+str(R),*a],cwd=R)
source=D/'source726';source.mkdir();shutil.copytree(R/'repro/pump_amm/optional-context-recovery-20261027/results/canonical-source/programs',source/'programs');shutil.copyfile(W/'control-source/Cargo.toml',source/'Cargo.toml');shutil.copyfile(source/'programs/pump-amm/Cargo.lock',source/'Cargo.lock');(source/'programs/pump-amm/Cargo.lock').unlink()
# Convert archived standalone release settings to ordinary workspace form.
p=source/'programs/pump-amm/Cargo.toml';s=p.read_text();s=s.split('[profile.release]')[0].rstrip()+'\n';p.write_text(s)
patch=git('show',ref+':'+prefix+'source.patch');(D/'public726.patch').write_bytes(patch);proc=subprocess.run(['git','apply','--check','--unsafe-paths','-'],input=patch,cwd=source,capture_output=True);assert proc.returncode==0,proc.stderr.decode();subprocess.run(['git','apply','--unsafe-paths','-'],input=patch,cwd=source,check=True)
# Validate every full changed source carried by public319, after applying its patch.
files=git('ls-tree','-r','--name-only',ref,'--',prefix+'source/').decode().splitlines();pubinputs={}
for f in files:
 b=git('show',ref+':'+f);p=source/f[len(prefix+'source/'):];assert p.read_bytes()==b,f;pubinputs[str(p.relative_to(source))]=hashlib.sha256(b).hexdigest()
(D/'public-source.json').write_text(json.dumps({'ref':ref,'changed_inputs':pubinputs},indent=2)+'\n')
candidate=D/'source-reserve-methods';shutil.copytree(source,candidate);p=candidate/'programs/pump-amm/src/instructions/swap/buy.rs';before=p.read_text();start=before.index('    let old_virtual = a.pool.virtual_quote_reserves;');end=before.index('    let b = a.pool_base_token_account.amount;',start);old=before[start:end]
new='''    let old_virtual = a.pool.virtual_quote_reserves;
    let old_accrued = a.pool.total_accrued_fees()?;
    let can_boost = a.pool.total_virtual_quote_reserves()? != 0;
    a.pool.available_quote_reserves(a.pool_quote_token_account.amount)?;
    let q = a.pool.effective_quote_reserves(a.pool_quote_token_account.amount)?;
''';new+= '\n'*(old.count('\n')-new.count('\n'));after=before[:start]+new+before[end:];assert len(after.splitlines())==len(before.splitlines());p.write_text(after);(D/'reserve-methods.patch').write_text(''.join(difflib.unified_diff(before.splitlines(True),after.splitlines(True),fromfile='baseline/buy.rs',tofile='reserve-methods/buy.rs')))
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();inv=lambda p:{q.relative_to(p).as_posix():sha(q) for q in p.rglob('*') if q.is_file()};base=json.loads((W/'builds/control/command.json').read_text());sdk=Path('/home/ahi200/pumpfun-work/20261027-crank/sdk');tools={x:sha(sdk/y) for x,y in [('rustc','rust/bin/rustc'),('cargo','rust/bin/cargo'),('objcopy','llvm/bin/llvm-objcopy')]}
for label,src in [('baseline726',source),('reserve-methods',candidate)]:
 out=D/label;out.mkdir();inputs=inv(src);os.utime(src/'programs/pump-amm/src/lib.rs',None);cmd=[x.replace(str(W/'control-source')+':',str(src)+':') for x in base];cmd.append('--verbose');deps={p.relative_to(W/'build-target').as_posix():sha(p) for p in (W/'build-target').rglob('*') if p.is_file() and p.suffix in ['.rlib','.rmeta','.a','.so'] and 'pump_amm_recovered' not in p.name};launch={'at':datetime.datetime.now(datetime.timezone.utc).isoformat(),'command':cmd,'inputs':inputs,'dependencies_before':deps,'tools':tools,'controller_sha256':sha(Path(__file__))};(out/'launch.json').write_text(json.dumps(launch,indent=2)+'\n')
 with (out/'build.log').open('wb') as f:r=subprocess.run(cmd,stdout=f,stderr=subprocess.STDOUT)
 log=(out/'build.log').read_text();root=[l for l in log.splitlines() if l.strip().startswith('Running `') and '--crate-name pump_amm_recovered ' in l];result={'returncode':r.returncode,'actual_root_invocations':len(root),'source_unchanged':inv(src)==inputs,'changed_prior_dependencies':[k for k,v in deps.items() if not (W/'build-target'/k).exists() or sha(W/'build-target'/k)!=v]};(out/'result.json').write_text(json.dumps(result,indent=2)+'\n');r.check_returncode();assert len(root)==1 and result['source_unchanged'];shutil.copyfile(W/'build-target/sbpf-solana-solana/release/pump_amm_recovered.so',out/'symbols.so');subprocess.run([str(sdk/'llvm/bin/llvm-objcopy'),'--strip-all',str(out/'symbols.so'),str(out/'candidate.so')],check=True);result.update(symbols_sha256=sha(out/'symbols.so'),candidate_sha256=sha(out/'candidate.so'));(out/'result.json').write_text(json.dumps(result,indent=2)+'\n');print(label,json.dumps(result),flush=True)
