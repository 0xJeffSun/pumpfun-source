"""UNEXECUTED private direct-Cargo compiler-only adapter. No runtime path."""
from pathlib import Path
import argparse,json,hashlib,importlib.util,sys,shutil,subprocess,tempfile,re,os,traceback
sys.dont_write_bytecode=True
P=Path(__file__).resolve().parent;H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();J=lambda p:json.loads(p.read_text());CREATED=None
NAME='donation_relay_source_proposal'
def load(p,name):
 s=importlib.util.spec_from_file_location(name,p);m=importlib.util.module_from_spec(s);s.loader.exec_module(m);return m

def save(p,x):p.write_text(json.dumps(x,indent=2)+'\n')
def main():
 global CREATED
 a=argparse.ArgumentParser();a.add_argument('--reviewed-plan-sha256',required=True);a.add_argument('--repo',type=Path,required=True);a.add_argument('--output',type=Path);a.add_argument('--execute',action='store_true');args=a.parse_args();R=args.repo.resolve();gate=load(P/'verify_plan.py','gate');pre=gate.verify(args.reviewed_plan_sha256,R)
 if not args.execute:print(json.dumps(pre));return
 assert args.output is not None;D=args.output.absolute()
 for p in[D,*D.parents]:assert not p.is_symlink()
 D=D.resolve();D.relative_to(R/'work');assert not D.exists() and D!=P and P not in D.parents;D.mkdir();CREATED=D;save(D/'preflight.json',pre);save(D/'controller-launch.json',{'reviewed_plan_sha256':args.reviewed_plan_sha256,'controller_sha256':H(Path(__file__)),'attempt_limit':1,'runtime_authorized':False})
 old=load(P/'accepted-launcher/relay_build_once.py','unchanged_source_cache_helpers');source=D/'source';shutil.copytree(P/'source',source);expected=old.source_hashes(source);cargo_home=D/'cargo-home';old.prepare_registry(cargo_home);sdk=D/'sdk';old.safe_extract(P/'accepted-launcher/tool-witness/sbf-sdk-snapshot.tar.gz',sdk);sdk_expected=J(P/'accepted-launcher/tool-witness/sdk-files.json');assert old.sdk_snapshot(sdk)==sdk_expected
 tools=Path(J(P/'external-distribution.json')['root']);target=D/'target';rustup=D/'rustup';rustup.mkdir();env={'PATH':os.pathsep.join([str(tools/'rust/bin'),str(tools/'llvm/bin'),'/usr/bin','/bin']),'CARGO_HOME':str(cargo_home),'CARGO_TARGET_DIR':str(target),'RUSTUP_HOME':str(rustup),'CARGO_NET_OFFLINE':'true','CARGO_TERM_COLOR':'never','RUSTC':str(tools/'rust/bin/rustc'),'RUSTDOC':str(tools/'rust/bin/rustdoc'),'CARGO_TARGET_SBF_SOLANA_SOLANA_RUSTFLAGS':'-Zremap-cwd-prefix=','CC':str(tools/'llvm/bin/clang'),'AR':str(tools/'llvm/bin/llvm-ar'),'OBJDUMP':str(tools/'llvm/bin/llvm-objdump'),'OBJCOPY':str(tools/'llvm/bin/llvm-objcopy')}
 if 'HOME'in os.environ:env['HOME']=os.environ['HOME']
 cmd=[str(tools/'rust/bin/cargo'),'build','--manifest-path',str(source/'Cargo.toml'),'--release','--target','sbf-solana-solana','--locked','--offline','--verbose'];save(D/'build-launch.json',{'command':cmd,'environment':env,'source':expected,'adapter_delta':'Direct officialv147 Cargo/rustc in place of installer-driven cargo-build-sbf; own retained rustflags/profile/legacytarget unchanged; verbose is logging only.'})
 with tempfile.TemporaryDirectory(prefix='relay-v147-cwd-') as temp:
  for p in[Path(temp),*Path(temp).parents]:assert not(p/'.cargo/config').exists() and not(p/'.cargo/config.toml').exists()
  run=subprocess.run(cmd,cwd=temp,env=env,capture_output=True)
 (D/'build.stdout').write_bytes(run.stdout);(D/'build.stderr').write_bytes(run.stderr);save(D/'build-result.json',{'returncode':run.returncode,'source_after':old.source_hashes(source),'stdout_sha256':H(D/'build.stdout'),'stderr_sha256':H(D/'build.stderr')});assert old.source_hashes(source)==expected and old.sdk_snapshot(sdk)==sdk_expected
 deps=old.inventory_extracted_sources(cargo_home);save(D/'dependency-source-after.json',deps)
 used=set(re.findall(re.escape(str(cargo_home/'registry/src'))+r'/[^/\s]+/([^/\s]+)/',(run.stdout+run.stderr).decode(errors='replace')));assert used<={r['package'] for r in deps};save(D/'compiled-dependency-roots.json',{'positively_observed_in_verbose_log':sorted(used),'all_extracted_roots_verified':True,'not_complete_process_attestation':True});gate.verify(args.reviewed_plan_sha256,R)
 assert run.returncode==0,'Compiler failed; preserve attempt, no retry'
 diagnostics=(run.stdout+run.stderr).decode(errors='replace');bad=[x for x in diagnostics.splitlines() if re.search(r'(stack offset .*exceed|stack frame .*exceed|stack.*exceeded|LLVM ERROR|Cannot select:)',x,re.I)];save(D/'backend-diagnostics.json',{'failures':bad});assert not bad
 fp=list((target/'sbf-solana-solana/release/.fingerprint').glob('donation-relay-source-proposal-*/lib-*.json'));assert len(fp)==1;actual=J(fp[0]);save(D/'emitted-root-fingerprint.json',actual);assert actual['rustflags']==['-Zremap-cwd-prefix='] and actual['features']=='[]'
 symbols=target/'sbf-solana-solana/release'/(NAME+'.so');assert symbols.read_bytes()[:4]==b'\x7fELF';shutil.copyfile(symbols,D/'unstripped.so');strip=J(P/'accepted-launcher/tool-witness/tool-files.json')['sdk_strip_objcopy'];assert H(Path(strip['path']))==strip['sha256'];scmd=[strip['path'],'--strip-all',str(D/'unstripped.so'),str(D/'candidate.so')];srun=subprocess.run(scmd,capture_output=True);(D/'strip.stdout').write_bytes(srun.stdout);(D/'strip.stderr').write_bytes(srun.stderr);save(D/'strip-result.json',{'command':scmd,'tool_sha256':strip['sha256'],'returncode':srun.returncode});assert srun.returncode==0
 Q=D/'static';Q.mkdir();shutil.copytree(P/'baseline-static',D/'baseline-static')
 for n in['original.so','original-windows.json']:shutil.copyfile(P/'method'/n,Q/n)
 for n in['candidate.so','unstripped.so']:shutil.copyfile(D/n,Q/n)
 method=load(P/'method/analyze.py','full_inventory');method.write(Q)
 # Bounded generic helper matching only, no new opaque target application decoding.
 elf=method.Elf((Q/'unstripped.so').read_bytes());rows=J(Q/'candidate-function-ledger.json');selected=[f for f in rows if any(x in n for n in f['names'] for x in['fmt5write','unicode9printable','compiler_builtins3int3mul','__multi3','3idl5typed','with_account_name','error_report6report','error_report5lower'])];save(Q/'bounded-review-pending.json',{'candidate_rows':selected,'emitted_acceptance_pending':True,'runtime_authorized':False});dis=load(P/'method/disasm.py','disasm');(Q/'bounded').mkdir()
 for f in selected:(Q/'bounded'/str(f['start'])).write_text(dis.render(elf,f['start'],f['end']))
 gate.verify(args.reviewed_plan_sha256,R);assert old.source_hashes(source)==expected and old.sdk_snapshot(sdk)==sdk_expected;save(D/'build-only-result.json',{'candidate_sha256':H(D/'candidate.so'),'symbols_sha256':H(D/'unstripped.so'),'source_inputs':23,'source_unchanged':True,'one_compile_attempt':True,'runtime_executions':0,'emitted_semantic_review_pending':True,'postbuild_driver_syscall_validation_reproduced':False})
if __name__=='__main__':
 code=0
 try:main()
 except BaseException as e:
  code=e.code if isinstance(e,SystemExit) and isinstance(e.code,int) else 1
  if CREATED is not None:(CREATED/'failure.txt').write_text(traceback.format_exc())
  raise
 finally:
  if CREATED is not None:save(CREATED/'controller-exit.json',{'returncode':code,'one_compile_attempt_limit':True,'runtime_executions':0})
