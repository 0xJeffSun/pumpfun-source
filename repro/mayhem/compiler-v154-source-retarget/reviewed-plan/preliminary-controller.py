"""UNEXECUTED one-attempt isolated stock-v1.54 validation, no runtime path."""
from pathlib import Path
import sys,json,hashlib,os,shutil,subprocess,traceback
sys.dont_write_bytecode=True
P=Path(__file__).resolve().parent;R=P.parents[1];H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();J=lambda p:json.loads(p.read_text())

def manifest():
 m=J(P/'manifest.json');assert H(P/'manifest.json')==args.reviewed_plan_sha256
 assert set(m)=={str(f.relative_to(P))for f in P.rglob('*')if f.is_file()and f not in[P/'manifest.json',P/'manifest.sha256']}
 for n,h in m.items():assert not(P/n).is_symlink()and H(P/n)==h,n

def gate():
 manifest();g=J(P/'plan.json');frozen=J(P/'audit/frozen-source.json');assert len(frozen)==14
 assert {str(f.relative_to(P/'source')):H(f)for f in(P/'source').rglob('*')if f.is_file()}==frozen
 baseline=J(R/'repro/mayhem/sell-result-error-main-twentyfour/main/build-attempt.json');assert frozen=={k.removeprefix('programs/mayhem/'):v for k,v in baseline['source_sha256'].items()}
 assert H(R/'repro/mayhem/sell-result-error-main-twentyfour/main/candidate.so')==g['accepted_candidate'];assert H(R/'evidence/original/mayhem/deployed.so')==g['original_sha256']
 for n,h in J(P/'external-inputs.json').items():assert H(Path(n))==h,n
 for n,h in J(P/'cargo-config-witness.json').items():assert(H(Path(n))if Path(n).is_file()else None)==h,n
 tools=J(P/'full-retained-tool-tree.json');T=Path(tools['root']);assert {str(f.relative_to(T))for f in T.rglob('*')if f.is_file()and not f.is_symlink()}==set(tools['regular_files'])
 assert {str(f.relative_to(T))for f in T.rglob('*')if f.is_symlink()}==set(tools['symlinks'])
 for n,target in tools['symlinks'].items():assert(T/n).is_symlink()and(T/n).readlink().as_posix()==target
 for p in J(P/'locked-dependencies.json'):
  root=Path(g['registry'])/'src/index.crates.io-1949cf8c6b5b557f'/p['package'];actual={str(f.relative_to(root))for f in root.rglob('*')if f.is_file()};assert actual-set(p['files'])<=set(['.cargo-ok'])and set(p['files'])<=actual
 return {'passed':True,'source_inputs':14,'full_external_file_hashes_checked':len(J(P/'external-inputs.json')),'locked_packages':215,'sdk_syscall_validation':'PENDING_EMPTY_SDK_ALLOWLIST','builds_executed_by_gate':0,'runtime_authorized':False}

def record(n,v):(O/n).write_text(json.dumps(v,indent=2)+'\n')
def run(name,cmd,env=None):
 with(O/(name+'.stdout')).open('x')as out,(O/(name+'.stderr')).open('x')as err:r=subprocess.run(cmd,cwd=R,env=env,stdout=out,stderr=err)
 row={'name':name,'command':cmd,'returncode':r.returncode,'stdout_sha256':H(O/(name+'.stdout')),'stderr_sha256':H(O/(name+'.stderr'))};children.append(row);record(name+'-exit.json',row);return r.returncode
if __name__=='__main__':
 import argparse
 p=argparse.ArgumentParser();p.add_argument('--reviewed-plan-sha256',required=True);p.add_argument('--build-once',action='store_true');args=p.parse_args();before=gate()
 if not args.build_once:print(json.dumps({'preflight':before,'build':'UNRUN','runtime':'UNAUTHORIZED'}));raise SystemExit(0)
 g=J(P/'plan.json');O=P.parent/'mayhem-v154-retarget-validation';O.mkdir(exist_ok=False);children=[];failure=None
 try:
  record('gate-before.json',before);shutil.copytree(P/'source',O/'source');shutil.copytree(Path(g['registry']),O/'cargo-home/registry');shutil.copy2(R/'evidence/original/mayhem/deployed.so',O/'original.so')
  copied_registry={str(f.relative_to(O/'cargo-home/registry')):H(f)for f in(O/'cargo-home/registry').rglob('*')if f.is_file()};record('copied-registry-before.json',copied_registry)
  T=Path(g['tools']);env={k:os.environ[k]for k in ['PATH','HOME','TMPDIR','USER','LOGNAME','LANG','LC_ALL','SHELL','SYSTEMROOT']if k in os.environ}
  for k in list(env):
   if k in ['RUSTFLAGS','CARGO_ENCODED_RUSTFLAGS','RUSTC_WRAPPER','RUSTC_WORKSPACE_WRAPPER','CARGO_BUILD_RUSTFLAGS','CARGO_ENCODED_RUSTDOCFLAGS','RUSTDOCFLAGS']or k.startswith(('CARGO_TARGET_','CARGO_PROFILE_')):env.pop(k)
  updates={'CARGO_HOME':str(O/'cargo-home'),'CARGO_TARGET_DIR':str(O/'target'),'RUSTUP_HOME':str(O/'rustup'),'CARGO_NET_OFFLINE':'true','RUSTC':str(T/'rust/bin/rustc'),'RUSTDOC':str(T/'rust/bin/rustdoc'),'CARGO_TARGET_SBPF_SOLANA_SOLANA_RUSTFLAGS':'-Zremap-cwd-prefix=','CC':str(T/'llvm/bin/clang'),'AR':str(T/'llvm/bin/llvm-ar'),'OBJDUMP':str(T/'llvm/bin/llvm-objdump'),'OBJCOPY':str(T/'llvm/bin/llvm-objcopy')};env.update(updates)
  record('recipe.json',{'command':[str(T/'rust/bin/cargo'),'build','--manifest-path',str(O/'source/Cargo.toml'),'--release','--target','sbpf-solana-solana','--locked','--offline','--verbose'],'environment_overrides':updates,'cwd':str(R),'note':'One documented stock genericV0 directCargo alias; no installer/globalalias/CPUoverride/source remapping fabrication; actual source path retained. Same cwd-remap flag as audited build.'})
  result=run('compile',J(O/'recipe.json')['command'],env)
  record('source-after-compile.json',{str(f.relative_to(O/'source')):H(f)for f in(O/'source').rglob('*')if f.is_file()});assert J(O/'source-after-compile.json')==J(P/'audit/frozen-source.json')
  assert result==0,'Compiler failure preserved; no retry'
  # A compiler exit0 with backend/stack diagnostics is not accepted.
  log=(O/'compile.stdout').read_text()+(O/'compile.stderr').read_text();bad=[line for line in log.splitlines()if any(x in line.lower()for x in ['stack offset of','stack frame size','llvm error','error: could not compile'])];record('backend-diagnostics.json',{'forbidden_diagnostics':bad});assert not bad
  shutil.copy2(O/'target/sbpf-solana-solana/release/mayhem_recovered.so',O/'unstripped.so');assert run('strip',[g['strip'],'--strip-all',str(O/'unstripped.so'),str(O/'candidate.so')],env)==0
  record('artifact-identity.json',{'candidate_sha256':H(O/'candidate.so'),'symbols_sha256':H(O/'unstripped.so'),'audited_v154_candidate_equal':H(O/'candidate.so')==g['audited_candidate'],'whole_original_equal':H(O/'candidate.so')==g['original_sha256'],'path_sensitive_differences_preserved':True})
  assert run('full-ledgers',[sys.executable,'-B',str(P/'refresh_ledgers.py'),str(O)],env)==0
  assert run('helper-ledgers',[sys.executable,'-B',str(P/'refresh_helpers.py'),str(O),str(R)],env)==0
  postlink=run('sdk-postlink',[sys.executable,'-B',str(P/'postlink.py'),str(O/'candidate.so'),str(O/'sdk-postlink.json')],env)
  record('pipeline-state.json',{'compile_exit':result,'postlink_exit':postlink,'sdk_validation':J(O/'sdk-postlink.json'),'complete_pipeline_accepted':postlink==0,'runtime_authorized':False})
  assert postlink==0,'SDK syscall validation pending/failed: compiler success is not full pipeline acceptance'
 except BaseException as exc:failure={'type':type(exc).__name__,'message':str(exc),'traceback':traceback.format_exc()}
 finally:
  if 'copied_registry'in locals():
   actual={str(f.relative_to(O/'cargo-home/registry')):H(f)for f in(O/'cargo-home/registry').rglob('*')if f.is_file()};record('copied-registry-after.json',actual)
   if actual!=copied_registry:failure=failure or{'type':'CopiedDependencyIntegrityFailure','message':'Copied registry changed during attempt; raw before/after retained'}
  try:record('gate-after.json',gate())
  except BaseException as exc:
   record('gate-after-failure.json',{'type':type(exc).__name__,'message':str(exc)});failure=failure or{'type':type(exc).__name__,'message':str(exc)}
  record('controller-exit.json',{'returncode':1 if failure else 0,'failure':failure,'children':children,'build_attempt_limit':1,'new_runtime':0})
 if failure:raise SystemExit(1)
