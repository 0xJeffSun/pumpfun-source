#!/usr/bin/env python3
"""mx.py: multiplex N execute variants into ONE IR build.
make_mx(name, base_exec, variants: {key(1 char 0-9a-z): exec_lines}) -> tree v/<name>
- main execute = base_exec (as gen.make_variant)
- each variant k lives in src/migrate_xK.rs (same path length as migrate_v2.rs) as `pub fn execute` at the SAME lines
  (236..349), declared as `#[path="migrate_xK.rs"] pub mod mxK;` appended to migrate_v2.rs (child module => private
  helpers visible via `use super::*;`). Copies keep identical Source sites, so llc'd copy == what the real fn would be.
run(name, keys): IR build + one llc + sacmp per copy (and the main execute)."""
import os, re, subprocess, sys
W = '/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work'
L = W + '/lanes/mg-P-mig'
sys.path.insert(0, L + '/tools')
from gen import make_variant, place
LLC = os.path.expanduser('~/.cache/solana/v1.44/platform-tools/llvm/bin/llc')

def make_mx(name, base_exec, variants, **kw):
    tail = ''.join(f'#[path="migrate_x{k}.rs"] pub mod mx{k};\n' for k in variants)
    d = make_variant(name, base_exec, tail=tail, **kw)
    for k, ex in variants.items():
        extra = ''
        if isinstance(ex, tuple): ex, extra = ex
        lines = ['use super::*;'] + [''] * 108 + place(ex, 110, 349)
        open(f'{d}/src/migrate_x{k}.rs', 'w').write('\n'.join(lines) + '\n' + extra)
    return d

def run(name, keys, win='0x49888'):
    d = L + '/v/' + name
    r = subprocess.run([L + '/tools/irb.sh', d, name], capture_output=True, text=True)
    if r.returncode: print('IRBUILD FAIL', r.stdout[-1500:], r.stderr[-500:]); return None
    ll = f'{L}/llx/{name}.ll'; o = f'{L}/llx/{name}.o'
    r = subprocess.run([LLC, '-O3', '-march=sbf', '-mattr=+store-imm,+jmp-ext', '-function-sections', '-filetype=obj', ll, '-o', o], capture_output=True, text=True)
    if r.returncode: print('LLC FAIL', r.stderr[-800:]); return None
    res = {}
    for k in ['main'] + list(keys):
        rx = 'migrate_v27execute17h' if k == 'main' else f'migrate_v23mx{k}7execute17h'
        out = subprocess.run(['python3', '-B', L + '/tools/sacmp.py', o, win, rx], capture_output=True, text=True).stdout.strip()
        res[k] = out; print(k, out)
    return res
