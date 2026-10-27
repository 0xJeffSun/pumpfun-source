#!/usr/bin/env python3
"""mkpatch.py <out.patch> <base-src-dir> <relpath> <python-file-with-EDITS>
EDITS = [(old, new), ...] applied in order (each must match exactly once)."""
import difflib, sys, runpy
from pathlib import Path
out, base, rel, spec = sys.argv[1:5]
edits = runpy.run_path(spec)['EDITS']
text = (Path(base) / rel).read_text()
new = text
for old, rep in edits:
    assert new.count(old) == 1, ('edit must match once', old[:80], new.count(old))
    new = new.replace(old, rep)
d = difflib.unified_diff(text.splitlines(True), new.splitlines(True), 'a/' + rel, 'b/' + rel)
Path(out).write_text(''.join(d))
print('wrote', out)
