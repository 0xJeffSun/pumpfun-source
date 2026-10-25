"""Portable main/source/README identity verifier; no build/target/Git mutation."""
from pathlib import Path
import argparse,json,hashlib,importlib.util,subprocess,sys
from strict_evidence import strict_package,data,plain
sys.dont_write_bytecode=True
P=Path(__file__).resolve().parent;H=lambda p:hashlib.sha256(data(p)).hexdigest();J=lambda p:json.loads(p.read_text())
p=argparse.ArgumentParser();p.add_argument('--expected-seal',required=True);p.add_argument('--current-root',type=Path);p.add_argument('--scratch',type=Path);a=p.parse_args();strict_package(P,a.expected_seal)
s=J(P/'scratch/summary.json');source=s['source37'];assert len(source)==37 and all('README'not in n for n in source)
g=J(P/'promotion-control/inputs.json');assert g['ready_for_execution']and H(P/'scratch/manifest.json')==g['scratch_seal']
sm=J(P/'scratch/manifest.json')
for n in ['summary.json','runtime-controls/summary.json','runtime-controls/controller-exit.json','runtime-controls/readonly-after.json','runtime-controls/changed-domain-coverage.json','verification/disposition.json','verification/portability-exit.json']:assert H(P/'scratch'/n)==sm[n]['sha256']
assert H(P/'main/candidate.so')==s['candidate']=='71ec4d8a646eefc82ba177afbc3d08552deadd65cf2f80ec280862eb768d059c'and H(P/'main/unstripped.so')==s['symbols']=='6edbf4dedf535dd0dec1199ab87a97d6d83b60fb2c1c3a5791feffc953a33cda'
g=J(P/'promotion-control/inputs.json');before=J(P/'main/controls/gate-before.json');after=J(P/'main/controls/gate-after.json')
assert before['external']==after['external'] and before['scratch']==after['scratch']
assert before['sources']['working_source']==g['source_baseline37']and after['sources']['working_source']==source
for phase in [before,after]:assert phase['sources']['head_source']==phase['sources']['index_source']==g['source_baseline37']
assert before['README_sha256']==after['README_sha256']
children=J(P/'main/controls/runner-exit.json')['children'];assert [r['name']for r in children]==['scratch-saved-verification','four-helper-import-help','build']and all(r['returncode']==0 for r in children)
report=J(P/'main/build-comparison.json');attempt=J(P/'main/build-attempt.json');assert report['source_sha256']==attempt['source_sha256']==attempt['source_after_sha256']==source and attempt['returncode']==0 and attempt['source_unchanged']
assert H(P/'main/build.log')==report['build_log_sha256'];i=J(P/'main/controls/identity.json');assert i['whole_candidate_equal']and i['whole_symbols_equal']and i['source37']==source and i['README_compile_input']is False
assert J(P/'main/controls/build-exit.json')['returncode']==J(P/'main/controls/runner-exit.json')['returncode']==0
outer=J(P/'main/controls/outer-runner-exit.json');assert outer['returncode']==0 and outer['actual_terminal_completion_observed']
for n,h in source.items():assert H(P/'main/source'/n)==h,n
readme=g['readme_proposed_sha256'];assert H(P/'main/README.final.md')==readme and J(P/'main/controls/README-finalized.json')['after_sha256']==readme
assert J(P/'scratch/runtime-controls/controller-exit.json')['returncode']==0 and all(r['returncode']==0 for r in J(P/'scratch/runtime-controls/readonly-after.json'))
if a.current_root:
 R=plain(a.current_root)
 for n,h in source.items():assert H(R/n)==h,n
 assert H(R/'programs/pump/README.md')==readme
 for n,h in J(P/'promotion-control/inputs.json')['helpers'].items():assert H(R/n)==h,n
 spec=importlib.util.spec_from_file_location('current_input_scanner',R/'scripts/build_source_manifest.py');m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m);assert m.source_manifest(R/'programs/pump',R/'programs/pump',R,[],cwd=R)==source
if a.scratch:
 S=a.scratch.absolute();strict_package(S,g['scratch_seal']);assert H(S/'manifest.json')==H(P/'scratch/manifest.json');assert (S/'candidate.so').read_bytes()==(P/'main/candidate.so').read_bytes()and(S/'unstripped.so').read_bytes()==(P/'main/unstripped.so').read_bytes();subprocess.run([sys.executable,'-B',str(S/'verify.py'),'--expected-seal',g['scratch_seal'],'--runtime-signatures'],check=True)
print(json.dumps({'passed':True,'source_inputs':37,'whole_candidate_and_symbols_identity':True,'README_applied_postbuild':True,'current_root_checked':bool(a.current_root),'scratch_deep_checked':bool(a.scratch),'target_executions':0,'builds':0}))
