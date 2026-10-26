"""Shared gates only. No writes or subprocess build at import."""
from pathlib import Path
import hashlib,json,gzip,subprocess,shutil,importlib.util,sys,os
sys.dont_write_bytecode=True
P=Path(__file__).resolve().parent;H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();J=lambda p:json.loads(p.read_text())
def control(seal):
 assert H(P/'manifest.json')==seal
 m=J(P/'manifest.json');assert set(m)=={str(f.relative_to(P))for f in P.rglob('*')if f.is_file()and f not in[P/'manifest.json',P/'manifest.sha256']}
 for n,h in m.items():assert H(P/n)==h and not(P/n).is_symlink(),n
 return J(P/'inputs.json')
def scratch(g):
 S=Path(g['scratch_package']);assert H(S/'manifest.json')==g['scratch_seal']=='6dd9e2ea3de977a47867bbb11f249b3cba5f4683b16b3a568d949df30b8609d5'
 m=J(S/'manifest.json');assert len(m)==147
 assert set(m)=={str(f.relative_to(S))for f in S.rglob('*')if f.is_file()and f not in[S/'manifest.json',S/'manifest.sha256']}
 for n,v in m.items():assert H(S/n)==v['sha256']and(S/n).stat().st_size==v['bytes']and not(S/n).is_symlink(),n
 assert H(S/'candidate.so')==g['candidate']and H(S/'unstripped.so')==g['symbols']
 s=J(S/'runtime-controls/summary.json');assert s['passed']and s['differential_cases']==9269 and s['surfpool_comparisons']==1024 and s['receipt_bindings']==68
 assert all(r['returncode']==0 for r in s['all_actual_child_exits'])and J(S/'runtime-controls/controller-exit.json')['returncode']==0
 assert all(r['returncode']==0 for r in J(S/'runtime-controls/readonly-after.json'))
 assert J(S/'verification/first-portability-exit.json')['returncode']==1 and J(S/'verification/portability-exit.json')['returncode']==0
 assert J(S/'verification/disposition.json')['package_payload_unchanged_between_attempts']
 assert J(S/'summary.json')['build_attempt_history']['first_launch_exit']==1 and J(S/'summary.json')['build_attempt_history']['first_compiler_executions']==0
 assert H(P/'README.proposed.md')==g['readme_proposed_sha256']=='4df246f50e279df75cfdc85c064b72e16b4eaf0ec65c4e82adebaf0d78d757c5'
 assert (P/'README.proposed.md').read_bytes()==(S/'README.proposed.md').read_bytes()
 for field,folder in [('source_baseline37','baseline'),('source_proposed37','proposed-source')]:
  assert len(g[field])==37
  for n,h in g[field].items():assert H(P/folder/n)==h,n
 base=g['source_baseline37'];new=g['source_proposed37'];assert set(base)==set(new)and[n for n in base if base[n]!=new[n]]==['programs/pump/src/admin_cto.rs']
 old=(P/'baseline/programs/pump/src/admin_cto.rs').read_text();expected=old.replace('return Err(err(6030));','return Err(error!(PumpError::CreatorShouldNotBeZero).with_pubkeys((target,Pubkey::default())));').replace('return Err(err(2006));','return Err(error!(anchor_lang::error::ErrorCode::ConstraintSeeds).with_pubkeys((a.holder_creator_vault.key(),dest)));')
 assert (P/'proposed-source/programs/pump/src/admin_cto.rs').read_text()==expected
 return {'seal':H(S/'manifest.json'),'candidate':H(S/'candidate.so'),'symbols':H(S/'unstripped.so'),'runtime_children_all_zero':True,'failed_histories_retained':True}
def sources(g,M,expected):
 assert str(M.resolve())==g['managed_repo']
 branch=subprocess.check_output(['git','branch','--show-current'],cwd=M,text=True).strip();assert branch==g['expected_branch'],branch
 for n,h in g['helpers'].items():assert H(M/n)==h,n
 spec=importlib.util.spec_from_file_location('gated_source_scanner',M/'scripts/build_source_manifest.py');module=importlib.util.module_from_spec(spec);spec.loader.exec_module(module)
 actual=module.source_manifest(M/'programs/pump',M/'programs/pump',M,[],cwd=M);assert actual==expected,'Actual compile scanner source map differs'
 index={n:hashlib.sha256(subprocess.check_output(['git','show',':'+n],cwd=M)).hexdigest()for n in expected}
 head={n:hashlib.sha256(subprocess.check_output(['git','show','HEAD:'+n],cwd=M)).hexdigest()for n in expected}
 assert index==head==g['source_baseline37'],'Baseline index or HEAD compiled input changed'
 return {'working_source':actual,'index_source':index,'head_source':head,'head_commit':subprocess.check_output(['git','rev-parse','HEAD'],cwd=M,text=True).strip(),'branch':branch}
def external(g,M):
 flag_env={n:v for n,v in os.environ.items()if v and(n in ['RUSTFLAGS','RUSTDOCFLAGS','CARGO_ENCODED_RUSTFLAGS','CARGO_BUILD_RUSTFLAGS','RUSTC_WRAPPER','RUSTC_WORKSPACE_WRAPPER']or n.startswith('CARGO_PROFILE_')or(n.startswith('CARGO_TARGET_')and n.endswith('_RUSTFLAGS')))}
 assert not flag_env,flag_env
 for n,v in g['host_launch_tools'].items():assert Path(shutil.which(n)).resolve()==Path(v['path'])and H(Path(v['path']))==v['sha256'],n
 tools=g['tools'];cli=tools['files']['cargo-build-sbf'];chosen=shutil.which('cargo-build-sbf');assert chosen and Path(chosen).resolve()==Path(cli['path']).resolve()
 for v in tools['files'].values():assert H(Path(v['path']))==v['sha256'],v['path']
 helpers={n:H(M/n)for n in g['helpers']};assert helpers==g['helpers']and helpers['scripts/build_partial_candidate.py']=='bb683621ffc4297c58f030cb03da54484b7370b786fd8eda965a37f4b3198ee9'
 sdkroot=Path(tools['sdk_source']);sdk={str(f.relative_to(sdkroot)):H(f)for f in sdkroot.rglob('*')if f.is_file()and'dependencies'not in f.relative_to(sdkroot).parts and not f.name.endswith('-keypair.json')};assert sdk==g['sdk_source']
 d=json.loads(gzip.decompress((P/'baseline-dependency-provenance.json.gz').read_bytes()));count=0;R=Path(g['original_repo'])
 for pkg in d['packages']:
  for f in pkg['archives']:assert H(R/f['path'])==f['sha256']==pkg['lock_checksum'];count+=1
  for tree in pkg['source_trees_observed']:
   for n,h in tree['source_files_sha256'].items():assert H(R/tree['path']/n)==h;count+=1
 assert count==14281 and len(d['packages'])==252
 return {'prohibited_flag_environment':flag_env,'host_launch_tools':g['host_launch_tools'],'resolved_cli':str(Path(chosen).resolve()),'tools':tools,'helpers':helpers,'sdk':sdk,'dependency_witness_sha256':H(P/'baseline-dependency-provenance.json.gz'),'dependency_files':count,'packages':252}
