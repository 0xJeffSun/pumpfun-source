"""Portable main/source/README identity verifier; no build/target/Git mutation."""
from pathlib import Path
import argparse,json,hashlib,importlib.util,subprocess,sys
sys.dont_write_bytecode=True
P=Path(__file__).resolve().parent;H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();J=lambda p:json.loads(p.read_text())
p=argparse.ArgumentParser();p.add_argument('--current-root',type=Path);p.add_argument('--scratch',type=Path);a=p.parse_args();m=J(P/'manifest.json');assert set(m)=={str(f.relative_to(P))for f in P.rglob('*')if f.is_file()and f not in[P/'manifest.json',P/'manifest.sha256']}
for n,v in m.items():assert H(P/n)==v['sha256']and(P/n).stat().st_size==v['bytes']and not(P/n).is_symlink(),n
s=J(P/'scratch/summary.json');source=s['source37'];assert len(source)==37 and all('README'not in n for n in source)
assert H(P/'scratch/manifest.json')=='6dd9e2ea3de977a47867bbb11f249b3cba5f4683b16b3a568d949df30b8609d5'
sm=J(P/'scratch/manifest.json')
for n in ['summary.json','runtime-controls/summary.json','runtime-controls/controller-exit.json','runtime-controls/readonly-after.json','runtime-controls/changed-domain-coverage.json','verification/disposition.json','verification/first-portability-exit.json','verification/portability-exit.json']:assert H(P/'scratch'/n)==sm[n]['sha256']
assert H(P/'main/candidate.so')==s['candidate']=='e9494060904aad25f465efd93af9dd0bb09a5ded9f321747c789cbf0310bc6c5'and H(P/'main/unstripped.so')==s['symbols']=='04641cb62e11e7abfc1db824374861a88fb067484b5c6c271ed0e6283b975a37'
g=J(P/'promotion-control/inputs.json');before=J(P/'main/controls/gate-before.json');after=J(P/'main/controls/gate-after.json')
assert before['external']==after['external'] and before['scratch']==after['scratch']
assert before['sources']['working_source']==g['source_baseline37']and after['sources']['working_source']==source
for phase in [before,after]:assert phase['sources']['head_source']==phase['sources']['index_source']==g['source_baseline37']
assert before['README_sha256']==after['README_sha256']
children=J(P/'main/controls/runner-exit.json')['children'];assert [r['name']for r in children]==['scratch-saved-verification','four-helper-import-help','build']and all(r['returncode']==0 for r in children)
report=J(P/'main/build-comparison.json');attempt=J(P/'main/build-attempt.json');assert report['source_sha256']==attempt['source_sha256']==attempt['source_after_sha256']==source and attempt['returncode']==0 and attempt['source_unchanged']
assert H(P/'main/build.log')==report['build_log_sha256'];i=J(P/'main/controls/identity.json');assert i['whole_candidate_equal']and i['whole_symbols_equal']and i['source37']==source and i['README_compile_input']is False
assert J(P/'main/controls/build-exit.json')['returncode']==J(P/'main/controls/runner-exit.json')['returncode']==0
for n,h in source.items():assert H(P/'main/source'/n)==h,n
readme='4df246f50e279df75cfdc85c064b72e16b4eaf0ec65c4e82adebaf0d78d757c5';assert H(P/'main/README.final.md')==readme and J(P/'main/controls/README-finalized.json')['after_sha256']==readme
assert J(P/'scratch/runtime-controls/controller-exit.json')['returncode']==0 and all(r['returncode']==0 for r in J(P/'scratch/runtime-controls/readonly-after.json'))
if a.current_root:
 R=a.current_root.resolve()
 for n,h in source.items():assert H(R/n)==h,n
 assert H(R/'programs/pump/README.md')==readme
 for n,h in J(P/'promotion-control/inputs.json')['helpers'].items():assert H(R/n)==h,n
 spec=importlib.util.spec_from_file_location('current_input_scanner',R/'scripts/build_source_manifest.py');m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m);assert m.source_manifest(R/'programs/pump',R/'programs/pump',R,[],cwd=R)==source
if a.scratch:
 S=a.scratch.resolve();assert H(S/'manifest.json')==H(P/'scratch/manifest.json');assert (S/'candidate.so').read_bytes()==(P/'main/candidate.so').read_bytes()and(S/'unstripped.so').read_bytes()==(P/'main/unstripped.so').read_bytes();subprocess.run([sys.executable,'-B',str(S/'verify.py')],check=True)
print(json.dumps({'passed':True,'source_inputs':37,'whole_candidate_and_symbols_identity':True,'README_applied_postbuild':True,'current_root_checked':bool(a.current_root),'scratch_deep_checked':bool(a.scratch),'target_executions':0,'builds':0}))
