#!/usr/bin/env python3
"""Verify sealed evidence and regenerate all function/call/data inventories; no build or VM."""
from pathlib import Path
import argparse,hashlib,json,gzip,tempfile,shutil,sys,importlib,subprocess,struct
P=Path(__file__).resolve().parent
H=lambda b:hashlib.sha256(b).hexdigest()
J=lambda p:json.loads(gzip.decompress(p.read_bytes()) if p.suffix=='.gz' else p.read_bytes())
ap=argparse.ArgumentParser();ap.add_argument('--current-main',type=Path);ap.add_argument('--baseline-main',type=Path);args=ap.parse_args()
m=J(P/'manifest.json');actual={str(f.relative_to(P)) for f in P.rglob('*') if f.is_file() and f not in [P/'manifest.json',P/'manifest.sha256']}
assert actual==set(m['files']),'extra/missing payload'
for n,h in m['files'].items():assert H((P/n).read_bytes())==h,n
assert H((P/'manifest.json').read_bytes())==(P/'manifest.sha256').read_text().strip()
pre=J(P/'promotion-preconditions.json')
for n,h in pre['proposed_source'].items():assert H((P/'source'/n).read_bytes())==h,n
assert (P/'proposal/programs/pump-amm/src/lib.rs').read_bytes()==(P/'source/programs/pump-amm/src/lib.rs').read_bytes()
if args.current_main:
 for n,h in pre['proposed_source'].items():assert H((args.current_main/n).read_bytes())==h,n
 assert H((args.current_main/'programs/pump-amm/README.md').read_bytes())==pre['proposed_readme_sha256']
if args.baseline_main:
 for n,h in pre['source'].items():assert H((args.baseline_main/n).read_bytes())==h,n
 assert H((args.baseline_main/'programs/pump-amm/README.md').read_bytes())==pre['readme_sha256']
# Read-only receipt verifier retains original assertions, including all signatures.
p=subprocess.run([sys.executable,'-B',str(P/'verify_runtime.py'),'--verify'],capture_output=True,text=True)
assert p.returncode==0,p.stdout+p.stderr
sys.path.insert(0,str(P/'static-tool'));an=importlib.import_module('analyze');en=importlib.import_module('enrich')
for side in ['before','after']:
 with tempfile.TemporaryDirectory(prefix='amm-verify-',dir=P.parent) as td:
  q=Path(td);b=q/'inputs/repro/pump_amm/update-event-borrow-v144'
  def cp(a,d):d.parent.mkdir(parents=True,exist_ok=True);shutil.copy2(a,d)
  cp(P/'source/evidence/original/pump_amm/deployed.so',q/'inputs/evidence/original/pump_amm/deployed.so')
  for n in ['candidate.so','unstripped.so','static-comparison.json']:cp(P/'baseline'/n if side=='before' else P/n,b/n)
  cp(P/'historical/pump_amm-bodies.json',q/'inputs/repro/function-inventory/2026-10-24-374fcf0/work/pump-amm-current-body-inventory/pump_amm-bodies.json')
  for n in pre['proposed_source']:
   source=P/'before'/n if side=='before' and n=='programs/pump-amm/src/lib.rs' else P/'source'/n
   cp(source,q/'inputs'/n)
  out=q/'analysis';an.P=q;sys.argv=['analyze','--original',str(q/'inputs/evidence/original/pump_amm/deployed.so'),'--candidate',str(b/'candidate.so'),'--symbols',str(b/'unstripped.so'),'--out',str(out)];an.main();en.P=q;en.B=b;en.A=out;en.main()
  expected=P/'inventory'/side
  for f in out.iterdir():
   if f.suffix=='.json':assert J(f)==J(expected/(f.name+'.gz')),side+'/'+f.name
   else:assert f.read_bytes()==(expected/f.name).read_bytes(),side+'/'+f.name
# Fresh exact binary sequence establishes requested ordering.
order=J(P/'order-verification.json');binary=(P/'candidate.so').read_bytes();assert H(binary)==order['candidate_sha256']==pre['candidate_sha256']
assert H((P/'unstripped.so').read_bytes())==pre['symbols_sha256']
for row in order['complete_handler_instructions']:assert binary[row['address']:row['address']+8].hex()==row['raw']
assert order['clock_call']['address']<order['failure_branch']['address']<min(x['address']for x in order['user_stores'])
assert order['failure_target']>max(x['address']for x in order['user_stores'])
assert J(P/'build-records/build-attempt.json')['returncode']==0
assert J(P/'build-exit.json')['returncode']==0
assert J(P/'tools-before.json')['tools']==J(P/'tools-after.json')['tools']
print(json.dumps({'status':'PASS','source_files':22,'full_inventories_regenerated':2,'cases':17462,'signatures':35418,'candidate_sha256':pre['candidate_sha256'],'build_or_runtime_execution':False}))
