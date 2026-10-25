#!/usr/bin/env python3
from pathlib import Path
import argparse,gzip,hashlib,importlib,json,shutil,subprocess,sys,tempfile
P=Path(__file__).resolve().parent;H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
J=lambda p:json.loads(gzip.decompress(p.read_bytes())if p.suffix=='.gz'else p.read_bytes())
a=argparse.ArgumentParser();a.add_argument('--current-main',type=Path);args=a.parse_args()
m=J(P/'manifest.json')['files'];assert H(P/'manifest.json')==(P/'manifest.sha256').read_text().strip()
assert set(m)=={str(p.relative_to(P))for p in P.rglob('*')if p.is_file()and p not in[P/'manifest.json',P/'manifest.sha256']}
for n,h in m.items():assert not(P/n).is_symlink()and H(P/n)==h,n
source=J(P/'proposed-source-sha256.json');base=J(P/'accepted-source-sha256.json');assert len(source)==len(base)==28
assert base==J(P/'baseline/proposed-source-sha256.json')
assert [n for n in base if source[n]!=base[n]]==['programs/pump-amm/src/incentives.rs']
for n,h in source.items():
 assert H(P/'source'/n)==h,n
 if args.current_main:assert H(args.current_main/n)==h,n
assert (P/'source/programs/pump-amm/src/incentives.rs').read_bytes()==(P/'source-proof/after.rs').read_bytes()
assert (P/'Cargo.lock.before').read_bytes()==(P/'Cargo.lock.after').read_bytes()==(P/'source/programs/pump-amm/Cargo.lock').read_bytes()
assert J(P/'dependency-integrity-before.json')==J(P/'dependency-integrity-after.json')
assert J(P/'tools-before.json')['tools']==J(P/'tools-after.json')['tools']
attempt=J(P/'build-01/build-attempt.json');report=J(P/'build-01/build-comparison.json')
assert attempt['returncode']==J(P/'build-exit.json')['returncode']==J(P/'runner-exit.json')['returncode']==0 and attempt['source_unchanged']
assert attempt['source_sha256']==attempt['source_after_sha256']==report['source_sha256']==source
assert H(P/'build-01/build.log')==report['build_log_sha256']==attempt['build_log_sha256']
assert H(P/'candidate.so')==report['comparison']['candidate_sha256']=='6f2589487eac44be02788312a55bcba09cebea635d9bdf0880d65b9999381815'
assert H(P/'unstripped.so')=='10a7804429ce02fdec15f9a37f34fc67dab987e514295630b467ace314f0d935'
assert report['selected_toolchain']=='v1.44'and not report['comparison']['full_byte_equality']
for k in ['parser','wrapper','exit']:assert J(P/'claim-static.json')[k]['complete_normalized_equal']
# Regenerate full current and prior inventories in disposable trees.
sys.path.insert(0,str(P/'static-tool'));an=importlib.import_module('analyze');en=importlib.import_module('enrich')
def cp(src,dst):dst.parent.mkdir(parents=True,exist_ok=True);shutil.copy2(src,dst)
for side in ['before','after']:
 with tempfile.TemporaryDirectory(prefix='amm-inventory-',dir=P.parent)as temp:
  q=Path(temp);b=q/'inputs/repro/pump_amm/update-event-borrow-v144';root=P/'baseline'if side=='before'else P
  cp(P/'source/evidence/original/pump_amm/deployed.so',q/'inputs/evidence/original/pump_amm/deployed.so')
  for n in ['candidate.so','unstripped.so','static-comparison.json']:cp(root/n,b/n)
  cp(P/'historical/pump_amm-bodies.json',q/'inputs/repro/function-inventory/2026-10-24-374fcf0/work/pump-amm-current-body-inventory/pump_amm-bodies.json')
  sources=J(P/'baseline/proposed-source-sha256.json')if side=='before'else source
  for n in sources:cp(root/'source'/n,q/'inputs'/n)
  out=q/'analysis';an.P=q;sys.argv=['analyze','--original',str(q/'inputs/evidence/original/pump_amm/deployed.so'),'--candidate',str(b/'candidate.so'),'--symbols',str(b/'unstripped.so'),'--out',str(out)];an.main();en.P=q;en.B=b;en.A=out;en.main()
  for f in out.iterdir():
   expected=P/'inventory'/side/(f.name+'.gz'if f.suffix=='.json'else f.name)
   assert (J(f)==J(expected)if f.suffix=='.json'else f.read_bytes()==expected.read_bytes()),(side,f.name)
# Re-run exact renderer proof in a disposable package so frozen evidence stays unchanged.
with tempfile.TemporaryDirectory(prefix='amm-renderer-',dir=P.parent)as temp:
 q=Path(temp)
 for n in ['candidate.so','unstripped.so','gate.py','claim_static.py','proposed-source-sha256.json','tools-before.json','tools-after.json','dependency-integrity-before.json','dependency-integrity-after.json','lock-delta.json']:cp(P/n,q/n)
 shutil.copytree(P/'source',q/'source');shutil.copytree(P/'static-tool',q/'static-tool')
 for n in ['build-attempt.json','build-log-placeholder']:
  if n=='build-log-placeholder':continue
  cp(P/'build-01'/n,q/'build-01'/n)
 cp(P/'build-01/build.log',q/'build-01/build.log')
 p=subprocess.run([sys.executable,'-B',str(q/'gate.py')],capture_output=True,text=True);assert p.returncode==0,(p.stdout,p.stderr)
 assert J(q/'renderer-static.json')==J(P/'renderer-static.json')
 p=subprocess.run([sys.executable,'-B',str(q/'claim_static.py')],capture_output=True,text=True);assert p.returncode==0,(p.stdout,p.stderr)
 assert J(q/'claim-static.json')==J(P/'claim-static.json')
p=subprocess.run([sys.executable,'-B',str(P/'verify_runtime.py'),'--verify'],capture_output=True,text=True);assert p.returncode==0,(p.stdout,p.stderr)
print(json.dumps({'status':'PASS','source_inputs':28,'candidate_sha256':H(P/'candidate.so'),'full_inventories_regenerated':2,'claim_parser_wrapper_exit_normalized_equal':True,'renderer_and_immediate_targets_verified':True,'cases':17462,'retained_signatures':35418,'whole_original_equal':False,'target_executions':0},indent=2))
