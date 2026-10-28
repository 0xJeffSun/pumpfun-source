#!/usr/bin/env python3
"""publish.py <Lname> <composite dir> <build dir> <note>  -> W/base/<L> (pump/, ELFs, inventory vs L12, triage) + BASE line"""
import json, shutil, subprocess, sys, time
from pathlib import Path
W = Path('/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work'); MR = Path('/Users/shawwalters/Documents/Codex/2026-10-24/mega-run')
name, src, bld, note = sys.argv[1], Path(sys.argv[2]), Path(sys.argv[3]), sys.argv[4]
B = W / 'base' / name; assert not B.exists(), B
r = json.loads((bld.parent / (bld.name + '.json')).read_text()); assert r['build']['ok'] and r['build']['runtime_valid'] and not r['score']['losses'] and not r['score']['raw_losses']
B.mkdir(parents=True); subprocess.run(['cp', '-c', '-R', str(src), str(B / 'pump')], check=True)
for f in ('unstripped.so', 'candidate.so'): shutil.copy2(bld / f, B / f)
s = json.loads(subprocess.run([sys.executable, '-B', str(W / 'harness/score.py'), str(B / 'unstripped.so'), '--baseline', str(W / 'base/L12/inventory.json'), '--json', str(B / 'inventory.json'), '--quiet'], capture_output=True, text=True, check=True).stdout)
assert not s['losses'] and not s['raw_losses']
subprocess.run([sys.executable, '-B', str(W / 'harness/triage.py'), '--cand', str(B / 'unstripped.so'), '--json', str(B / 'triage.json')], capture_output=True, check=True)
line = f"{time.strftime('%H:%M')} BASE pump {name} {s['normalized']}/1035 raw={s['raw']} path={B} ({note}; unstripped {r['build']['unstripped_sha256'][:8]})"
with open(MR / 'EVENTS.log', 'a') as fh: fh.write(line + '\n')
print(line[:160])
