#!/usr/bin/env python3
"""Emit the optimized LLVM IR of the pump crate with the fastbuild identity recipe (deps stay cached).

  irbuild.py --src <crate> --work <dir> --out <dir>
Writes <out>/pump.ll (and the normal .so outputs). Takes one shared sbf slot like fastbuild.
"""
import argparse, json, os, shutil, subprocess, sys, time
from pathlib import Path
H = Path('/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/harness')
sys.path.insert(0, str(H))
import fastbuild as fb  # noqa
ap = argparse.ArgumentParser()
ap.add_argument('--src', type=Path, required=True); ap.add_argument('--work', type=Path, required=True); ap.add_argument('--out', type=Path, required=True)
a = ap.parse_args()
R = fb.RECIPES['identity']; triple = R['triple']
src = a.src.resolve(); work = a.work.resolve(); out = a.out.resolve()
work.mkdir(parents=True, exist_ok=True); out.mkdir(parents=True, exist_ok=True)
ws = work / 'ws'
crate = fb.stage(src, ws)
target = work / 'target-identity'
if not target.exists():
    subprocess.run(['cp', '-cRp', str(R['template']), str(target)], check=True)
env = os.environ.copy()
env.pop('CARGO_BUILD_TARGET_DIR', None)
reg = Path.home() / '.cargo'
env.update(RUSTC_WRAPPER=str(H / 'pump_physical_source_wrapper.py'), PUMP_LOGICAL_REGISTRY_SRC=str(reg / 'registry/src'),
           CARGO_HOME=str(reg), CARGO_TARGET_DIR=str(target), CARGO_BUILD_JOBS='2', RUSTC=str(R['rustc']),
           CC=str(fb.SDK / 'llvm/bin/clang'), AR=str(fb.SDK / 'llvm/bin/llvm-ar'))
env['CARGO_TARGET_' + triple.upper().replace('-', '_') + '_RUSTFLAGS'] = '-Zremap-cwd-prefix='
env.pop('RUSTFLAGS', None); env.pop('CARGO_ENCODED_RUSTFLAGS', None)
for ll in list(target.glob(f'{triple}/release/deps/pump_recovered*.ll')) + list(target.glob(f'{triple}/release/deps/pump_recovered*.mir')):
    ll.unlink()
cmd = [str(fb.SDK / 'rust/bin/cargo'), 'rustc', '--manifest-path', str(crate / 'Cargo.toml'), '--release', '--target', triple,
       '--locked', '--offline', '--lib', '--', '--emit=llvm-ir,mir,link']
slot = fb.acquire_slot(); t0 = time.time()
try:
    r = subprocess.run(cmd, cwd=ws, env=env, stdout=subprocess.PIPE, stderr=subprocess.STDOUT, text=True)
finally:
    slot.close()
(out / 'irbuild.log').write_text(r.stdout)
lls = list(target.glob(f'{triple}/release/deps/pump_recovered*.ll'))
if r.returncode != 0 or len(lls) != 1:
    print(r.stdout[-4000:]); sys.exit(1)
shutil.move(str(lls[0]), out / 'pump.ll')
for mir in target.glob(f'{triple}/release/deps/pump_recovered*.mir'):
    shutil.move(str(mir), out / 'pump.mir')
built = target / triple / 'release/pump_recovered.so'
if built.exists():
    shutil.copy2(built, out / 'unstripped.so')
print(json.dumps({'ll': str(out / 'pump.ll'), 'seconds': round(time.time() - t0, 1), 'so': str(out / 'unstripped.so')}))
