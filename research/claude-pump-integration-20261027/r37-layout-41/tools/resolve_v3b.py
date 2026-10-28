"""Resolve the 9 trade_v3.rs conflict hunks of fz-P-v3b-r1-02 against c2 (hop-02/v3a-02): pick side per hunk (o=ours/hop, t=theirs/v3b)."""
import sys
from pathlib import Path
src, out, picks = Path(sys.argv[1]), Path(sys.argv[2]), sys.argv[3]
res, side, buf, i = [], None, {'o': [], 't': []}, 0
for line in src.read_text().splitlines(keepends=True):
    if line.startswith('<<<<<<< '): side = 'o'; buf = {'o': [], 't': []}; continue
    if side and line.startswith('=======') and line.strip() == '=======': side = 't'; continue
    if side and line.startswith('>>>>>>> '): res += buf[picks[i]]; i += 1; side = None; continue
    if side: buf[side].append(line)
    else: res.append(line)
assert i == len(picks), (i, picks)
out.write_text(''.join(res)); print(len(res), 'lines')
