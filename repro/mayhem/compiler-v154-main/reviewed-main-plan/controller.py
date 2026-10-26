"""UNEXECUTED one genuine managed-source main build. No runtime or active edits."""
from pathlib import Path
import argparse,json,hashlib,os,shutil,subprocess,sys,traceback
sys.dont_write_bytecode=True
P=Path(__file__).resolve().parent;H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();J=lambda p:json.loads(p.read_text())
def sealed(root,seal):
 assert H(root/'manifest.json')==seal and(root/'manifest.sha256').read_text().split()[0]==seal;m=J(root/'manifest.json');assert set(m)=={str(f.relative_to(root))for f in root.rglob('*')if f.is_file()and f not in[root/'manifest.json',root/'manifest.sha256']}
 for n,h in m.items():assert not(root/n).is_symlink()and H(root/n)==h,n

def source():return{'programs/mayhem/'+n:H(R/'programs/mayhem'/n)for n in g['source14']}
def observed(path):
 try:return H(path)if path.is_file()else None
 except BaseException as e:return'READ_ERROR:'+type(e).__name__+':'+str(e)
def gate():
 sealed(P,args.reviewed_plan_sha256);sealed(Q,g['scratch_plan_seal']);assert R==Path(g['managed_root']).resolve(),'Only frozen managed compiler root; never shared ORIGINAL'
 U=R/g['runtime_publication_path'];sealed(U,g['runtime_publication_seal']);assert H(P/'runtime-publication-manifest.json')==g['runtime_publication_seal'];assert source()=={'programs/mayhem/'+n:h for n,h in g['source14'].items()};assert H(R/'programs/mayhem/README.md')==g['component_readme_sha256']
 for n,h in J(Q/'external-inputs.json').items():assert H(Path(n))==h,n
 for n,h in J(P/'cargo-config-witness.json').items():assert observed(Path(n))==h,n
 tree=J(Q/'full-retained-tool-tree.json');T=Path(tree['root']);assert{str(f.relative_to(T))for f in T.rglob('*')if f.is_file()and not f.is_symlink()}==set(tree['regular_files']);assert{str(f.relative_to(T))for f in T.rglob('*')if f.is_symlink()}==set(tree['symlinks'])
 for n,target in tree['symlinks'].items():assert(T/n).readlink().as_posix()==target
 for pkg in J(Q/'locked-dependencies.json'):
  folder=Path(g['registry'])/'src/index.crates.io-1949cf8c6b5b557f'/pkg['package'];actual={str(f.relative_to(folder))for f in folder.rglob('*')if f.is_file()};assert actual-set(pkg['files'])<=set(['.cargo-ok'])and set(pkg['files'])<=actual
 assert H(R/'evidence/original/mayhem/deployed.so')==g['original_sha256'];assert H(U/'control/static5435/build/candidate.so')==g['candidate']and H(U/'control/static5435/build/unstripped.so')==g['symbols']
 return{'passed':True,'actual_managed_root':str(R),'actual_source14_sha256':source(),'component_readme_sha256':H(R/'programs/mayhem/README.md'),'external_files':len(J(Q/'external-inputs.json')),'locked_packages':215,'runtime_publication_seal':g['runtime_publication_seal'],'sdk_allowlist_authority':'unresolved0B; actual warning-only check required after compile','runtime_authorized':False}
def record(n,v):(O/n).write_text(json.dumps(v,indent=2)+'\n')
def run(name,cmd,env):
 with(O/(name+'.stdout')).open('x')as out,(O/(name+'.stderr')).open('x')as err:r=subprocess.run(cmd,cwd=R,env=env,stdout=out,stderr=err)
 row={'name':name,'command':cmd,'returncode':r.returncode,'stdout_sha256':H(O/(name+'.stdout')),'stderr_sha256':H(O/(name+'.stderr'))};children.append(row);record(name+'-exit.json',row);return r.returncode
if __name__=='__main__':
 a=argparse.ArgumentParser();a.add_argument('--current-root',type=Path,required=True);a.add_argument('--reviewed-plan-sha256',required=True);a.add_argument('--build-once',action='store_true');args=a.parse_args();g=J(P/'plan.json');R=args.current_root.resolve();Q=P/'scratch-plan'
 if not args.build_once:print(json.dumps({'preflight':gate(),'build':'UNRUN','runtime':'UNAUTHORIZED'}));raise SystemExit(0)
 assert R==Path(g['managed_root']).resolve();O=R/g['output'];O.mkdir(exist_ok=False);children=[];failure=None
 try:
  record('gate-before.json',gate());record('source-before.json',source());shutil.copytree(Path(g['registry']),O/'cargo-home/registry');copied={str(f.relative_to(O/'cargo-home/registry')):H(f)for f in(O/'cargo-home/registry').rglob('*')if f.is_file()};record('copied-registry-before.json',copied);shutil.copy2(R/'evidence/original/mayhem/deployed.so',O/'original.so')
  T=Path(g['tools']);env={k:os.environ[k]for k in['PATH','HOME','TMPDIR','USER','LOGNAME','LANG','LC_ALL','SHELL','SYSTEMROOT']if k in os.environ};updates={'CARGO_HOME':str(O/'cargo-home'),'CARGO_TARGET_DIR':str(O/'target'),'RUSTUP_HOME':str(O/'rustup'),'CARGO_NET_OFFLINE':'true','RUSTC':str(T/'rust/bin/rustc'),'RUSTDOC':str(T/'rust/bin/rustdoc'),'CARGO_TARGET_SBPF_SOLANA_SOLANA_RUSTFLAGS':'-Zremap-cwd-prefix=','CC':str(T/'llvm/bin/clang'),'AR':str(T/'llvm/bin/llvm-ar'),'OBJDUMP':str(T/'llvm/bin/llvm-objdump'),'OBJCOPY':str(T/'llvm/bin/llvm-objcopy')};env.update(updates)
  command=[str(T/'rust/bin/cargo'),'build','--manifest-path',str(R/'programs/mayhem/Cargo.toml'),'--release','--target','sbpf-solana-solana','--locked','--offline','--verbose'];record('build-attempt.json',{'frontend':g['frontend'],'command':command,'cwd':str(R),'environment_overrides':updates,'actual_source_sha256':source(),'selected_tools':'v1.54 official cached distribution','target':'stockgenericV0/sbpf-solana-solana','source_overlay_used':False,'standard_driver_cwd_remap_default_reproduced':True,'global_alias_changed':False,'no_compiler_exit_claim_until_actual_child_record':True})
  code=run('compile',command,env);attempt=J(O/'build-attempt.json');attempt.update(returncode=code,actual_source_after_sha256=source(),source_unchanged=source()==J(O/'source-before.json'),stdout_sha256=H(O/'compile.stdout'),stderr_sha256=H(O/'compile.stderr'));record('build-attempt.json',attempt);assert code==0,'Actual main compiler failure; no retry';assert attempt['source_unchanged']
  log=(O/'compile.stdout').read_text()+(O/'compile.stderr').read_text();bad=[line for line in log.splitlines()if any(s in line.lower()for s in['stack offset of','stack frame size','llvm error','error: could not compile'])];record('backend-diagnostics.json',{'forbidden_diagnostics':bad});assert not bad,'Backend/stack gate failed despite possible Cargo0'
  shutil.copy2(O/'target/sbpf-solana-solana/release/mayhem_recovered.so',O/'unstripped.so');assert run('strip',[g['strip'],'--strip-all',str(O/'unstripped.so'),str(O/'candidate.so')],env)==0
  assert run('full-ledgers',[sys.executable,'-B',str(Q/'refresh_ledgers.py'),str(O)],env)==0;assert run('helper-ledgers',[sys.executable,'-B',str(Q/'refresh_helpers.py'),str(O),str(R)],env)==0
  assert run('readelf-structure',[str(T/'llvm/bin/llvm-readelf'),'-aW',str(O/'candidate.so')],env)==0;assert run('readelf-dyn-symbols',[str(T/'llvm/bin/llvm-readelf'),'--dyn-symbols',str(O/'candidate.so')],env)==0
  assert run('independent-import-structure',[sys.executable,'-B',str(Q/'compare_imports.py'),str(O/'original.so'),str(O/'candidate.so'),str(O/'import-structure-comparison.json')],env)==0
  assert run('sdk-postlink',[sys.executable,'-B',str(Q/'postlink.py'),str(O/'candidate.so'),str(O/'sdk-postlink.json'),str(O/'readelf-dyn-symbols.stdout')],env)==0
  identity={'whole_candidate_equal':H(O/'candidate.so')==g['candidate'],'whole_symbols_equal':H(O/'unstripped.so')==g['symbols'],'actual_candidate_sha256':H(O/'candidate.so'),'actual_symbols_sha256':H(O/'unstripped.so'),'expected_candidate_sha256':g['candidate'],'expected_symbols_sha256':g['symbols'],'actual_managed_source_sha256':source(),'recipe_is_genuine_main_direct_official_v154':True,'old_frontend_claimed_used':False};record('identity.json',identity)
  imports=J(O/'import-structure-comparison.json');record('pipeline-state.json',{'compile_exit':code,'sdk_check_outcome':J(O/'sdk-postlink.json')['official_driver_check_outcome'],'syscall_authority':J(O/'sdk-postlink.json')['syscall_authority_status'],'original_candidate_import_set_equal':imports['undefined_import_sets_equal'],'runtime_packet_seal':g['runtime_publication_seal'],'new_target_executions':0,'selection_or_promotion_authorized':False})
  assert identity['whole_candidate_equal']and identity['whole_symbols_equal'],'Full main/scratch identity failed; raw output/ledgers retained, no variants'
  assert imports['undefined_import_sets_equal']
 except BaseException as exc:failure={'type':type(exc).__name__,'message':str(exc),'traceback':traceback.format_exc()}
 finally:
  raw={n:observed(Path(n))for n in J(Q/'external-inputs.json')};mismatches=[n for n,h in J(Q/'external-inputs.json').items()if raw[n]!=h];record('independent-after-witness.json',{'actual_external_hashes':raw,'external_mismatches':mismatches,'actual_managed_source14':{'programs/mayhem/'+n:observed(R/'programs/mayhem'/n)for n in g['source14']},'component_readme_sha256':observed(R/'programs/mayhem/README.md')});record('source-after.json',{'programs/mayhem/'+n:observed(R/'programs/mayhem'/n)for n in g['source14']})
  if mismatches:failure=failure or{'type':'ExternalPostGateFailure','message':'No drift ignored'}
  if 'copied'in locals():
   after={str(f.relative_to(O/'cargo-home/registry')):H(f)for f in(O/'cargo-home/registry').rglob('*')if f.is_file()};record('copied-registry-after.json',after)
   if after!=copied:failure=failure or{'type':'CopiedDependencyPostGateFailure','message':'Copied registry drift'}
  try:record('gate-after.json',gate())
  except BaseException as exc:record('gate-after-failure.json',{'type':type(exc).__name__,'message':str(exc)});failure=failure or{'type':type(exc).__name__,'message':str(exc)}
  record('controller-exit.json',{'returncode':1 if failure else 0,'failure':failure,'children':children,'build_attempt_limit':1,'new_runtime':0,'active_source_or_status_edits':False})
 if failure:raise SystemExit(1)
