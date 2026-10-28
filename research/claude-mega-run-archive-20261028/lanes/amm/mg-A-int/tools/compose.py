"""compose.py PATCH [PATCH...] : 3-way merge lane win patches (made on a frozen union base named in the patch's
--- header) into ~/amm100-run/lanes/mg-union/src.
SAFETY: the patch is never applied in place. Each file section's headers are rewritten and its hunks are applied with
`patch -o` to a private copy of the base file inside mg-A-int/tmp; only mg-union/src is written.
Per file: union==base -> take lane file; union==lane -> same; else `git merge-file union base lane`."""
import re, shutil, subprocess, sys, tempfile
from pathlib import Path

DEFAULT_BASE = __import__('pathlib').Path.home()/'amm100-run/lanes/mg-union/u744/src'
def split_path(old, new):
    """-> (base_root, rel) for headers like /abs/<base>/programs/..., programs/..., a/instructions/... (rel to pump-amm/src)."""
    import re as _re
    from pathlib import Path as _P
    m = _re.search(r'(?:^|/src/)((?:programs|crates)/\S+)$', new) or _re.search(r'(?:^|/src/)((?:programs|crates)/\S+)$', old)
    if m: rel = m.group(1)
    else:
        q = new if new != '/dev/null' else old
        q = _re.sub(r'^[ab]/', '', q); rel = 'programs/pump-amm/src/' + q
    b = _re.match(r'^(/\S+?)/(?:programs|crates)/', old)
    return (_P(b.group(1)) if b else DEFAULT_BASE), rel
H = Path.home()
U = H/'amm100-run/lanes/mg-union/src'
TMP = H/'amm100-run/lanes/mg-A-int/tmp'
REL = re.compile(r'(?:^|/src/)((?:programs|crates)/\S+)$')
def relpath(p):
    m = REL.search(p)
    return m.group(1) if m else None
for arg in sys.argv[1:]:
    patch, _, base_override = arg.partition('@')
    txt = Path(patch).read_text()
    if not base_override and not re.search(r'^--- /\S+/(?:programs|crates)/', txt, re.M):
        js = Path(patch).with_suffix('.json')
        mb = re.search(r'mg-union/(u\d+)/src', js.read_text()) if js.exists() else None
        if mb: base_override = str(H/'amm100-run/lanes/mg-union'/mb.group(1)/'src'); print('  base from json:', mb.group(1))
        else: print('  WARNING: base unknown, defaulting to u744')
    td = Path(tempfile.mkdtemp(dir=TMP))
    sections = [s for s in re.split(r'(?m)^(?=diff -r)', txt) if s.startswith('diff -r')]
    if not sections: sections = [txt]
    base = None
    for sec in sections:
        old = re.search(r'^--- (\S+)', sec, re.M).group(1); new = re.search(r'^\+\+\+ (\S+)', sec, re.M).group(1)
        b, rel = split_path(old, new)
        if base_override: b = Path(base_override)
        if base is None: base = b
        bfile = base/rel
        work = td/'base'/rel; work.parent.mkdir(parents=True, exist_ok=True)
        lane = td/'lane'/rel; lane.parent.mkdir(parents=True, exist_ok=True)
        if bfile.exists(): shutil.copyfile(bfile, work)
        else: work.write_text('')
        body = '\n'.join(l for l in sec.split('\n') if not l.startswith('diff -r'))
        body = re.sub(r'(?m)^--- \S+', '--- a', body, count=1); body = re.sub(r'(?m)^\+\+\+ \S+', '+++ b', body, count=1)
        r = subprocess.run(['patch', '--forward', '-s', '-o', str(lane), str(work)], input=body, text=True, capture_output=True,
                           cwd=str(td))
        if r.returncode: print('PATCH FAILED', rel, r.stdout[-300:], r.stderr[-300:]); sys.exit(1)
        deleted = new == '/dev/null' or (lane.exists() and lane.stat().st_size == 0 and bfile.exists() and bfile.stat().st_size > 0)
        u = U/rel
        if deleted:
            if u.exists() and bfile.exists() and u.read_bytes() == bfile.read_bytes(): u.unlink(); print('  removed', rel)
            else: print('  CONFLICT delete', rel); sys.exit(2)
            continue
        if not u.exists() and not bfile.exists(): u.parent.mkdir(parents=True, exist_ok=True); shutil.copyfile(lane, u); print('  added', rel); continue
        if bfile.exists() and u.exists() and u.read_bytes() == bfile.read_bytes(): shutil.copyfile(lane, u); print('  took lane', rel); continue
        if u.exists() and u.read_bytes() == lane.read_bytes(): print('  same', rel); continue
        r = subprocess.run(['git', 'merge-file', '-p', str(u), str(bfile), str(lane)], capture_output=True)
        if r.returncode: print('  CONFLICT', rel, r.returncode); sys.exit(2)
        u.write_bytes(r.stdout); print('  merged', rel)
    print('composed', patch, 'base', base)
