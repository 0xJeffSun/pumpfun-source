#!/usr/bin/env python3
"""Print the frame objects (after prologepilog) of one function: frame.py <fn.ll> <symbol-substring>"""
import re, subprocess, sys
from pathlib import Path
SDK = Path.home() / '.cache/solana/v1.44/platform-tools/llvm/bin'
src, needle = sys.argv[1], sys.argv[2]
mir = Path(src).with_suffix('.mir')
subprocess.run([str(SDK / 'llc'), '-O3', '-march=sbf', '-mcpu=generic', '-mattr=+store-imm,+jmp-ext', '-relocation-model=pic',
                '-function-sections', '-data-sections', '-stop-after=prologepilog', '-o', str(mir), src], check=True)
t = mir.read_text()
i = t.index('name:            ' + next(m for m in re.findall(r'name:\s+(\S+)', t) if needle in m))
seg = t[i:]
s = seg.index('\nstack:'); e = seg.index('\nbody:')
print('allocas:', ' '.join(re.findall(r'^\s+%(\S+) = alloca \[(\d+) x i8\]', Path(src).read_text(), re.M)[:0]))
for m in re.finditer(r"- \{ id: (\d+), name: '?([^,']*)'?, type: (\S+), offset: (-?\d+), size: (\d+)", seg[s:e]):
    print(f"  id{m.group(1):>3} {m.group(2) or '-':<14} {m.group(3):<11} {int(m.group(4)):#7x} {m.group(5)}")
