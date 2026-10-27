"""Independent repeat of both changed compiler crates and qualified root."""
from pathlib import Path
import hashlib,json,os,shutil,subprocess,time
W=Path(__file__).resolve().parents[1];D=W/'layout-allocator-current-historical-04';S=D/'programs/mayhem';Q=W/'layout-allocator-historical-qualified-04';T=W/'layout-allocator-historical-qualified-repeat-04';assert not T.exists();T.mkdir()
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
for name in ['linker.py','default.ld','ordered.ld']:shutil.copyfile(Q/name,T/name)
(T/'linker.py').chmod(0o755)
curve=json.loads((D/'builds.json').read_text())[0];root=json.loads((Q/'launch.json').read_text())
expected=curve['source_inputs'];inventory=lambda:{p.relative_to(S).as_posix():sha(p)for p in S.rglob('*')if p.is_file()};assert inventory()==expected
receipts=[];new_archive=None
for name,build in [('curve',curve),('root',root)]:
 out=T/(name+'-out');out.mkdir();cmd=list(build['command']);cmd[cmd.index('--out-dir')+1]=str(out)
 if name=='root':
  cmd=[a.replace(str(D/'curve_accounts-out'),str(T/'curve-out')).replace(str(Q/'linker.py'),str(T/'linker.py')).replace(str(Q/'link.map'),str(T/'link.map'))for a in cmd]
 env=os.environ.copy();env.update(build.get('target_build_environment',{}));env.update(build.get('env_overrides',{}));env.update(build.get('environment_overrides',{}))
 # Source is fixed; output/qualified script paths alone differ from the first pair.
 receipt={'command':cmd,'cwd':str(S),'source_inputs':expected,'environment_overrides':{k:v for k,v in env.items()if k in ['RUSTC','RUSTDOC','CARGO_HOME','CARGO_TARGET_DIR','RUSTUP_HOME','CARGO_NET_OFFLINE','CC','AR','CARGO_TARGET_SBPF_SOLANA_SOLANA_RUSTFLAGS','CARGO_MANIFEST_DIR','CARGO_MANIFEST_PATH','CARGO_PKG_NAME','CARGO_PKG_VERSION']}}
 start=time.monotonic()
 with(T/(name+'.stdout')).open('wb')as so,(T/(name+'.stderr')).open('wb')as se:r=subprocess.run(cmd,cwd=S,env=env,stdout=so,stderr=se)
 receipt.update(returncode=r.returncode,seconds=time.monotonic()-start,source_unchanged=inventory()==expected);receipts.append(receipt);(T/'builds.json').write_text(json.dumps(receipts,indent=2)+'\n');assert r.returncode==0;print(name,r.returncode,flush=True)
 if name=='curve':
  new_archive=next(out.glob('libcurve_accounts-*.rlib'));old_archive=next((D/'curve_accounts-out').glob('libcurve_accounts-*.rlib'));assert sha(new_archive)==sha(old_archive)
 else:
  shutil.copyfile(out/'mayhem_recovered.so',T/'symbols.so');strip=Path('/Users/shawwalters/.cache/solana/v1.52/platform-tools/llvm/bin/llvm-objcopy');subprocess.run([str(strip),'--strip-all',str(T/'symbols.so'),str(T/'candidate.so')],check=True)
  result={'candidate_sha256':sha(T/'candidate.so'),'symbols_sha256':sha(T/'symbols.so'),'curve_archive_sha256':sha(new_archive),'source_unchanged':inventory()==expected,'candidate_repeated':sha(T/'candidate.so')==sha(Q/'candidate.so'),'symbols_repeated':sha(T/'symbols.so')==sha(Q/'symbols.so')};(T/'result.json').write_text(json.dumps(result,indent=2)+'\n');assert result['candidate_repeated'] and result['symbols_repeated'];print(json.dumps(result,indent=2))
