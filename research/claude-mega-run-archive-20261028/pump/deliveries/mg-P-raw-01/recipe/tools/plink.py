#!/usr/bin/env python3
"""[mg-P-raw] linker hook: records every link input (objects/version script copied, archives hashed) to
$PRAW_REC/{linkin/,replay.json}, writes a link map, and replaces the SDK default script with $PRAW_ORDERED
(when set and non-empty). Output bytes for the default script are unchanged (the map is a side file)."""
import hashlib, json, os, shutil, sys
from pathlib import Path
args = sys.argv[1:]
rec = Path(os.environ['PRAW_REC']); rec.mkdir(parents=True, exist_ok=True)
d = rec / 'linkin'; d.mkdir(exist_ok=True)
real = os.environ['PRAW_LLD']
ordered = os.environ.get('PRAW_ORDERED', '')
sha = lambda p: hashlib.sha256(Path(p).read_bytes()).hexdigest()
out, archives, scripts = [], {}, 0
i = 0
while i < len(args):
    a = args[i]
    if a in ('--script', '-T'):
        s = Path(args[i + 1]); shutil.copyfile(s, d / 'default.ld')
        out += [a, ordered if ordered else str(d / 'default.ld')]; scripts += 1; i += 2; continue
    if a.startswith('--version-script='):
        q = Path(a.split('=', 1)[1]); shutil.copyfile(q, d / q.name); out.append('--version-script=' + str(d / q.name)); i += 1; continue
    if not a.startswith('-') and a.endswith('.o') and Path(a).is_file():
        shutil.copyfile(a, d / Path(a).name); out.append(str(d / Path(a).name)); i += 1; continue
    if not a.startswith('-') and a.endswith('.rlib') and Path(a).is_file():
        archives[a] = sha(a)
    out.append(a); i += 1
assert scripts == 1, 'expected exactly one --script'
out.append('-Map=' + str(rec / 'link.map'))
(rec / 'replay.json').write_text(json.dumps(dict(incoming=args, args=out, real=real, real_sha256=sha(real),
                                                 ordered=ordered, archives=archives), indent=1) + '\n')
os.execv(real, [real, *out])
