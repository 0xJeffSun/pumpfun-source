"""Portable acceptance only; no build/target execution."""
from pathlib import Path
import argparse,json,hashlib,tarfile,subprocess,sys
P=Path(__file__).resolve().parent;H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();J=lambda p:json.loads(p.read_text())
SEAL='52cd978029f67b8c79e738131fa2bec3251de8fdfc2a22270e1464b210125ba7';PLAN='91266961b78156dcf3637c00e12f9617cca3800ca94c71997cd92c5ed597fada';CAND='2387f8139a13918a5c9c523f140ecdd72db7243c8e2ed9cd7e1ff9d42ad6c8af';SYM='4a8084f8a1056e3d0b2df5b0a272c1a3f0a56d3e96532e1b8a2ba7eb21d6ac4c'
def manifest(p,known=None):
 assert not p.is_symlink();m=J(p/'manifest.json');assert H(p/'manifest.json')==(p/'manifest.sha256').read_text().split()[0]
 if known:assert H(p/'manifest.json')==known
 fs=set()
 for f in p.rglob('*'):
  assert not f.is_symlink()and f.name!='__pycache__'and f.suffix!='.pyc'and not f.name.endswith('-keypair.json'),f
  if f.is_file()and f not in[p/'manifest.json',p/'manifest.sha256']:fs.add(f.relative_to(p).as_posix())
 assert fs==set(m)
 for n,h in m.items():
  q=Path(n);assert not q.is_absolute()and'..'not in q.parts;assert H(p/n)==h
 return m
def member(archive,n):
 with tarfile.open(archive)as t:
  m=t.getmember(n);assert m.isfile();return json.load(t.extractfile(m))
def run(root=None,signatures=False):
 manifest(P);S=P/'scratch';manifest(S,SEAL);plan=P/'reviewed-plan';manifest(plan,PLAN);C=P/'controls';M=P/'main';i=J(C/'identity.json')
 assert H(M/'candidate.so')==H(S/'candidate.so')==i['candidate_sha256']==CAND
 assert H(M/'symbols.so')==H(S/'symbols.so')==i['symbols_sha256']==SYM
 assert i['whole_candidate_equal']is True and i['whole_symbols_equal']is True and i['source_tool_dependency_gates_passed']is True and i['new_runtime_executions']==0
 assert J(C/'runner-exit.json')['returncode']==J(C/'build-exit.json')['returncode']==0
 g=J(C/'gate-before.json');assert g==J(plan/'inputs.json')
 sg=member(S/'source-proof-and-controls.tar.gz','build-control/inputs.json');pre=member(S/'build-evidence.tar.gz','build/preflight.json')
 assert g['helpers']==sg['helpers']==pre['helper_sha256'] and g['tools']==sg['tools']==pre['tool_inputs']
 assert H(P/'dependency-expected.json')==g['dependency_manifest_sha256']
 assert J(C/'dependency-before.json')==J(C/'dependency-after.json')==J(P/'dependency-expected.json')
 launch=J(C/'launch.json');assert launch['reviewed_plan_sha256']==PLAN and launch['build_limit']==1 and launch['runtime_executions']==0
 assert H(P/'controller.py')==H(plan/'promote.py');cmd=launch['command'];assert cmd[cmd.index('--tools-version')+1]=='v1.44' and cmd[cmd.index('--program')+1]=='pump_fees'
 src=J(C/'source-proposed.json');base=J(S/'acceptance.json')['source'];assert len(src)==len(base)==26 and set(src)==set(base)
 assert[n for n in src if src[n]!=base[n]]==['programs/pump-fees/README.md'];assert src['programs/pump-fees/README.md']==H(plan/'README.proposed.md')
 assert src==i['main_source_sha256'] and base==i['scratch_source_sha256'] and i['main_scratch_input_difference']==['programs/pump-fees/README.md']
 assert J(C/'source-before.json')==g['source']
 report=J(M/'build-comparison.json');attempt=J(M/'build-attempt.json');scratch_report=member(S/'build-evidence.tar.gz','build/build-01/build-comparison.json')
 assert report['source_sha256']==attempt['source_sha256']==attempt['source_after_sha256']==src
 assert attempt['returncode']==0 and attempt['source_unchanged']is True
 assert H(M/'build.log')==report['build_log_sha256']==attempt['build_log_sha256']
 for record in [report,attempt]:assert record['selected_toolchain']=='v1.44';assert record['command'][record['command'].index('--tools-version')+1]=='v1.44'
 assert report['comparison']==scratch_report['comparison'] and report['comparison']['candidate_sha256']==CAND and not report['comparison']['full_byte_equality']
 assert report['sdk_source_sha256']==g['tools']['sdk_template_files']==scratch_report['sdk_source_sha256'];assert report['rustc_sha256']==scratch_report['rustc_sha256']
 for n,h in src.items():
  assert H(P/'source'/n)==h
  if root:assert H(root/n)==h,n
 for n,h in g['helpers'].items():
  assert H(P/'helpers'/n)==h,n
  if root:assert H(root/n)==h,n
 for n,h in g['tools']['sdk_template_files'].items():assert H(P/'sdk-source'/n)==h,n
 p=subprocess.run([sys.executable,'-B',str(S/'verify.py')]+(['--runtime-signatures']if signatures else[]),capture_output=True,text=True);assert p.returncode==0,p.stderr
 return {'passed':True,'candidate_sha256':CAND,'symbols_sha256':SYM,'whole_main_scratch_identity':True,'source_inputs':26,'README_only_difference':True,'current_root_checked':bool(root),'new_builds':0,'new_target_executions':0}
if __name__=='__main__':
 a=argparse.ArgumentParser();a.add_argument('--current-root',type=Path);a.add_argument('--runtime-signatures',action='store_true');args=a.parse_args();print(json.dumps(run(args.current_root,args.runtime_signatures),indent=2))
