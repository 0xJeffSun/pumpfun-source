#!/usr/bin/env python3
"""mkvar.py NAME [--from DIR] spec.json : clone lane src (or DIR) to v/NAME/src and apply {file: {lineno: text}} replacements.
Line-neutral: each replacement replaces exactly one physical line."""
import json, subprocess, sys
from pathlib import Path
LANE = Path(__file__).resolve().parents[1]
args = sys.argv[1:]
name = args.pop(0)
src = LANE / 'src'
if args and args[0] == '--from':
    args.pop(0); src = Path(args.pop(0))
spec = json.loads(Path(args[0]).read_text())
dst = LANE / 'v' / name / 'src'
if dst.exists():
    subprocess.run(['rm', '-rf', str(dst)], check=True)
dst.parent.mkdir(parents=True, exist_ok=True)
subprocess.run(['cp', '-c', '-R', str(src), str(dst)], check=True)
for f, reps in spec.items():
    p = dst / f
    lines = p.read_text().split('\n')
    for ln, txt in reps.items():
        lines[int(ln) - 1] = txt
    p.write_text('\n'.join(lines))
print(dst)
