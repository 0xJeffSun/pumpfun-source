#!/usr/bin/env python3
"""splice.py FILE MARKER VARIANT -> replace the item starting at the line that starts with MARKER
(through the next line that is exactly '}') with VARIANT's text. Prints old/new line counts."""
import sys
from pathlib import Path
f,marker,var=Path(sys.argv[1]),sys.argv[2],Path(sys.argv[3])
t=f.read_text().split('\n'); s=next(i for i,l in enumerate(t) if l.startswith(marker))
e=next(i for i in range(s,len(t)) if t[i]=='}')
v=var.read_text().rstrip('\n').split('\n')
t[s:e+1]=v; f.write_text('\n'.join(t)); print(f'spliced {e-s+1} -> {len(v)} lines at {s+1}')
