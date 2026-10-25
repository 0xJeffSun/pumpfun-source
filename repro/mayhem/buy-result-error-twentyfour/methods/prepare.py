from pathlib import Path
import hashlib,json,shutil,subprocess,sys
ROOT=Path(__file__).resolve().parents[2];P=Path(__file__).resolve().parent
H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
s=json.loads((ROOT/'repro/mayhem/twentyfour/summary.json').read_text());r=json.loads((ROOT/'repro/mayhem/twentyfour/runtime-manifest.json').read_text())
for group in [s['main_source_sha256'],r['test_source_sha256'],r['inputs_sha256']]:
 for f,h in group.items():assert H(ROOT/f)==h,f
assert H(ROOT/'work/mayhem-next-pass/proposal/buy_pump_swap.rs')!=H(ROOT/'programs/mayhem/src/instructions/buy_pump_swap.rs')
files={}
for f in (ROOT/'programs/mayhem').rglob('*'):
 if f.is_file() and 'target' not in f.relative_to(ROOT/'programs/mayhem').parts:
  d=P/'source/programs/mayhem'/f.relative_to(ROOT/'programs/mayhem');d.parent.mkdir(parents=True,exist_ok=True);shutil.copy2(f,d);files[str(f.relative_to(ROOT))]=H(f)
for name in ['buy_pump_swap','pump_swap_types']:
 shutil.copy2(ROOT/f'work/mayhem-next-pass/proposal/{name}.rs',P/f'source/programs/mayhem/src/instructions/{name}.rs')
tools={}
for cmd in ['cargo','cargo-build-sbf','rustup']:
 f=Path(shutil.which(cmd)).resolve();tools[str(f)]=H(f)
for f in [Path.home()/'.cache/solana/v1.52/platform-tools/rust/bin/rustc',Path.home()/'.cache/solana/v1.52/platform-tools/llvm/bin/clang']:
 if f.exists():tools[str(f)]=H(f)
gate={'main_sources':files,'helpers':r['test_source_sha256'],'runtime_inputs':r['inputs_sha256'],'tools':tools,'baseline_candidate':s['candidate_sha256'],'python_executable':sys.executable}
(P/'gate-before.json').write_text(json.dumps(gate,indent=2)+'\n')
print('Source, helper, case, dependency and original-image gates passed; isolated proposal source prepared.')
