"""Standard-library portable companion verifier; no build/VM/network/signing."""
from pathlib import Path
import argparse,hashlib,json,subprocess,sys,gzip
sys.dont_write_bytecode=True
P=Path(__file__).resolve().parent;H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();J=lambda n:json.loads((P/n).read_text())
def run(root):
 m=J('manifest.json');assert H(P/'manifest.json')==(P/'manifest.sha256').read_text().split()[0];paths=set()
 for p in P.rglob('*'):
  assert not p.is_symlink()and p.name!='__pycache__'and p.suffix!='.pyc'and not p.name.endswith('-keypair.json')
  if p.is_file()and p not in[P/'manifest.json',P/'manifest.sha256']:paths.add(str(p.relative_to(P)))
 assert paths==set(m)
 for n,v in m.items():assert H(P/n)==v['sha256']and(P/n).stat().st_size==v['bytes'],n
 assert H(P/'scratch/manifest.json')=='aa7cdc0eb3f16c6b1eeb1738c47c2c5b9a2cc6cb70a716f5f4850f8b27fb2005'
 sm=J('scratch/manifest.json')
 for n in J('scratch-subset.json'):
  if n not in['manifest.json','manifest.sha256']:assert H(P/'scratch'/n)==sm[n]['sha256'],n
 cand='ffa0f3bab34b8cfca6d6aeef5e6b8dcabad0a16eccfeb3d22d5781e22ae3b193';sym='964c06b5bfa5611f7297a590e53edce44cd38372661ad3bd231e6bc1805496a4'
 assert H(P/'main/candidate.so')==cand==sm['candidate.so']['sha256'];assert H(P/'main/unstripped.so')==sym==sm['unstripped.so']['sha256']
 c='main/controls/';identity=J(c+'identity.json');assert identity['whole_candidate_equal']and identity['whole_symbols_equal']and identity['candidate_sha256']==cand and identity['symbols_sha256']==sym
 assert J(c+'runner-exit.json')['returncode']==J(c+'build-exit.json')['returncode']==0
 before=J(c+'gate-before.json');after=J(c+'gate-after.json');assert before==after
 old='bb683621ffc4297c58f030cb03da54484b7370b786fd8eda965a37f4b3198ee9';new='e0eccab6f54fee2996039beb53075d9a7b3f411706a90634a44420dec7b173c1';proof='eb9173e77c85d1b5e55c8556b52e002ad655e5abe3b8a430a13e5a7fe7cb3223'
 helpers=J('scratch/build-helper-sha256.json');expected=dict(helpers);assert expected['scripts/build_partial_candidate.py']==old;expected['scripts/build_partial_candidate.py']=new
 assert before['helpers']==expected and before['frozen_scratch_helpers']==helpers and before['helper_transition_proof']==proof
 for n,h in before['helpers'].items():assert H(P/'main/build-helpers'/n)==h,n
 assert H(P/'scratch/helper-explicit-version-proof/manifest.json')==proof
 p=subprocess.run([sys.executable,'-B',str(P/'scratch/helper-explicit-version-proof/verify.py')],capture_output=True,text=True);assert p.returncode==0,p.stdout+p.stderr
 assert before['dependency_files']==14281 and before['registry_packages']==252
 tools=J('scratch/tools-observed.json')['files'];assert before['tools']=={n:v['sha256']for n,v in tools.items()};assert before['sdk']==J('scratch/sdk-source-sha256.json')
 launch=J(c+'build-launch.json');cmd=launch['command'];assert cmd[cmd.index('--tools-version')+1]=='v1.44'and launch['attempt_limit']==1
 source=J('scratch/source-sha256.json');base=J('scratch/baseline-source-sha256.json');assert len(source)==len(base)==37 and [n for n in source if source[n]!=base[n]]==['programs/pump/src/admin_cto.rs']
 assert J(c+'source-before.json')==base and J(c+'source-proposed.json')==source
 report=J('main/build-comparison.json');attempt=J('main/build-attempt.json');assert report['source_sha256']==attempt['source_sha256']==attempt['source_after_sha256']==source
 assert attempt['returncode']==0 and attempt['source_unchanged'];assert H(P/'main/build.log')==report['build_log_sha256']==attempt['build_log_sha256']
 assert report['comparison']['candidate_sha256']==cand and not report['comparison']['full_byte_equality'];assert report['sdk_source_sha256']==before['sdk']
 actual=J('scratch/actual-source-sha256.json');assert {n[n.index('programs/pump/'):]:h for n,h in actual.items()}==source
 for n,h in source.items():assert H(P/'main/source'/n)==h
 assert all('README'not in n for n in source);assert(P/'main/README.final.md').read_bytes()==(P/'scratch/README.proposed.md').read_bytes()
 assert identity['README_sha256_unchanged']==J(c+'README-before.json')['sha256']
 assert [r['returncode']for r in J('scratch/root-runtime-exits.json')]==[0,1,0,1]
 coverage=J('scratch/owned-coverage-review.json');assert len(coverage['differential']['actual6083'])==6 and not coverage['surfpool']['actual6083']
 bindings=J('scratch/receipt-bindings.json');assert len(bindings)==68;totals={'differential':0,'surfpool':0}
 for r in bindings:
  assert r['actual_source_sha256']==actual and r['candidate_sha256']==cand;totals[r['kind']]+=r['cases']
 assert totals=={'differential':9269,'surfpool':1024}
 if root:
  for n,h in source.items():assert H(root/n)==h,n
  for n,h in before['helpers'].items():assert H(root/n)==h,n
  assert(root/'programs/pump/README.md').read_bytes()==(P/'main/README.final.md').read_bytes()
 return {'status':'PASS_main_identity_with_reviewed_helper_transition','payloads':len(m),'source_inputs':37,'candidate_sha256':cand,'symbols_sha256':sym,'preserved_scratch_orchestrator_exit1':2,'changed_guard_differential_cases':6,'changed_guard_signed_cases':0,'main_checked':bool(root),'whole_original_byte_equality':False}
if __name__=='__main__':
 a=argparse.ArgumentParser();a.add_argument('--current-main',type=Path);args=a.parse_args();print(json.dumps(run(args.current_main),indent=2))
