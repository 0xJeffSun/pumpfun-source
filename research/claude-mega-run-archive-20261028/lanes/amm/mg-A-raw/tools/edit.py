#!/usr/bin/env python3
"""edit.py ROOT FILE LINE=TEXT [LINE=TEXT ...] : replace whole lines (1-based) of ROOT/programs/pump-amm/src/FILE
(line-neutral edits). TEXT '' = empty line. Prints old -> new."""
import sys
from pathlib import Path
p = Path(sys.argv[1]) / 'programs/pump-amm/src' / sys.argv[2]
lines = p.read_text().split('\n')
for spec in sys.argv[3:]:
    n, t = spec.split('=', 1); n = int(n)
    print(f'{sys.argv[2]}:{n}: {lines[n-1]!r} -> {t!r}'); lines[n - 1] = t
p.write_text('\n'.join(lines))
