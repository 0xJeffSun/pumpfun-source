#!/usr/bin/env python3
"""List added/removed/resized function symbols between two unstripped builds."""
import sys, re
from pathlib import Path
sys.path.insert(0, str(Path(__file__).parent))
from common import Elf
def syms(p):
    e = Elf(Path(p)); return {re.sub(r'17h[0-9a-f]{16}E$', '', f['name']): f['size'] for f in e.funcs}
a, b = syms(sys.argv[1]), syms(sys.argv[2])
print('removed:', [k[:110] for k in a if k not in b])
print('added:', [k[:110] for k in b if k not in a])
for k in a:
    if k in b and a[k] != b[k]: print('resized %6d -> %6d %s' % (a[k], b[k], k[:110]))
