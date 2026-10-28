#!/usr/bin/env python3
"""Error-path load order (errpath.py logic) inside one candidate function: fnerr.py <unstripped.so> <symbol-regex>"""
import re, subprocess, sys
sys.path.insert(0, '/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/harness')
from score import candidate_functions
from win import demangle
OBJ = '/Users/shawwalters/.cache/solana/v1.52/platform-tools/llvm/bin/llvm-objdump'
so, rx = sys.argv[1], sys.argv[2]
fns = candidate_functions(so)
frm = [s for s, n, nm in fns if 'anchor_lang::error::Error as core::convert::From<solana_program_error::ProgramError>>::from' in demangle(nm)]
for s, n, nm in fns:
    if re.search(rx, nm) or re.search(rx, demangle(nm)):
        dis = subprocess.check_output([OBJ, '-d', '--no-show-raw-insn', f'--start-address={s:#x}', f'--stop-address={s + n:#x}', so], text=True)
        open('/tmp/fnerr.dis', 'w').write(dis) if False else None
        p = '/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work/pump-big-lo/out/fnerr.dis'
        open(p, 'w').write(dis)
        out = subprocess.check_output([sys.executable, '-B', '/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work/pump-big-lo/tools/errpath.py', p, hex(frm[0])], text=True)
        print(f'{demangle(nm)[:70]} @{s:#x} {n}B'); print(out.rstrip())
