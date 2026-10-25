#!/usr/bin/env python3
"""Read successful main artifacts into a new portable package; never builds or edits source."""
from pathlib import Path
import argparse,shutil,json,hashlib
ap=argparse.ArgumentParser();ap.add_argument('--main-run',type=Path,required=True);ap.add_argument('--repo',type=Path,required=True);ap.add_argument('--output',type=Path,required=True);ap.add_argument('--runner-exit',type=Path,required=True);a=ap.parse_args()
T=Path(__file__).resolve().parent;O=a.output.resolve();M=a.main_run.resolve();R=a.repo.resolve();H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();J=lambda p:json.loads(p.read_text())
assert J(a.runner_exit)['returncode']==0;assert not O.exists();assert J(M/'identity.json')['whole_candidate_equal'] and J(M/'identity.json')['whole_symbols_equal']
def cp(s,d):d.parent.mkdir(parents=True,exist_ok=True);shutil.copy2(s,d)
for f in T.rglob('*'):
 if f.is_file():cp(f,O/f.relative_to(T))
for n in ['identity.json','build-exit.json','dependencies-before-exit.json','dependencies-after-exit.json','dependency-integrity-before.json','dependency-integrity-after.json','build-launch.json','source-before.json','build.stdout','build.stderr','dependencies-before.stdout','dependencies-before.stderr','dependencies-after.stdout','dependencies-after.stderr']:
 cp(M/n,O/'main'/n)
for n in ['build-attempt.json','build-comparison.json','build.log']:cp(M/'build-01'/n,O/'main'/n)
cp(M/'build-01/artifacts/pump_amm_recovered.so',O/'main/candidate.so');cp(M/'build-01/target/sbf-solana-solana/release/pump_amm_recovered.so',O/'main/unstripped.so')
r=J(T/'reference/promotion-preconditions.json')
for n,h in r['proposed_source'].items():assert H(R/n)==h,n;cp(R/n,O/'main/source'/n)
assert H(R/'programs/pump-amm/README.md')==r['proposed_readme_sha256'];cp(R/'programs/pump-amm/README.md',O/'main/source/programs/pump-amm/README.md')
tools=J(T/'reference/tools-before.json');actual_tools={p:{'sha256':H(Path(p)),'bytes':Path(p).stat().st_size}for p in tools['tools']};actual_sdk={p:H(M/'build-01/sdk'/p)for p in tools['sdk_source']};helpers={p:H(R/p)for p in J(T/'reference/helper-sha256.json')}
assert actual_tools==tools['tools'];assert actual_sdk==tools['sdk_source'];assert helpers==J(T/'reference/helper-sha256.json')
for n in helpers:cp(R/n,O/'main/helpers'/n)
cp(T/'reference/promote_main_once.py',O/'main/promote_main_once.py')
(O/'main/packaging-observations.json').write_text(json.dumps({'tools':actual_tools,'sdk_source':actual_sdk,'helpers':helpers,'scope':'Independent packaging-time measurements. Original before-build checks derive from the frozen executed recipe; no per-process compiler tracing claimed.'},indent=2)+'\n')
cp(a.runner_exit,O/'main/runner-exit.json')
m={'schema':1,'files':{str(f.relative_to(O)):H(f)for f in sorted(O.rglob('*'))if f.is_file()and f not in [O/'manifest.json',O/'manifest.sha256']}}
(O/'manifest.json').write_text(json.dumps(m,indent=2)+'\n');(O/'manifest.sha256').write_text(H(O/'manifest.json')+'\n')
print(json.dumps({'output':str(O),'manifest_sha256':H(O/'manifest.json'),'candidate_sha256':H(O/'main/candidate.so')}))
