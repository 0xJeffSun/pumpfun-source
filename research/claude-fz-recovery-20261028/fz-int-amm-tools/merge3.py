"""merge3.py PATCH BASE_SRC TARGET_SRC : 3-way merge each file section of PATCH (made on BASE_SRC workspace) into TARGET_SRC.
Never applies in place: base file copied to a scratch dir, patched with patch -o, then git merge-file into TARGET."""
import re, shutil, subprocess, sys, tempfile
from pathlib import Path
patch, base, tgt = Path(sys.argv[1]), Path(sys.argv[2]), Path(sys.argv[3])
REL = re.compile(r'(?:^|/src/)((?:programs|crates)/\S+)$')
def rel(h):
    p = h.split('\t')[0].split(' ')[0]
    m = REL.search(p)
    if m: return m.group(1)
    p = re.sub(r'^[ab]/', '', p); return 'programs/pump-amm/src/' + p
secs, cur = [], None
for line in patch.read_text().splitlines(keepends=True):
    if line.startswith('--- ') :
        cur = {'old': line[4:].strip(), 'body': []}; secs.append(cur); continue
    if line.startswith('+++ ') and cur is not None and 'new' not in cur:
        cur['new'] = line[4:].strip(); continue
    if cur is not None and 'new' in cur and not line.startswith('diff '): cur['body'].append(line)
tmp = Path(tempfile.mkdtemp(dir=Path(__file__).resolve().parents[1] / 'merge'))
for i, s in enumerate(secs):
    r = rel(s['new'] if not s['new'].startswith('/dev/null') else s['old'])
    bf, tf = base / r, tgt / r
    b = tmp / f'{i}.base'; l = tmp / f'{i}.lane'; pf = tmp / f'{i}.patch'
    b.write_bytes(bf.read_bytes() if bf.exists() else b'')
    pf.write_text('--- a\n+++ b\n' + ''.join(s['body']))
    subprocess.run(['patch', '-s', '-o', str(l), str(b), str(pf)], check=True)
    u = tf.read_bytes() if tf.exists() else b''
    if u == b.read_bytes(): tf.parent.mkdir(parents=True, exist_ok=True); shutil.copy(l, tf); print('take', r); continue
    if u == l.read_bytes(): print('same', r); continue
    uf = tmp / f'{i}.union'; uf.write_bytes(u)
    rc = subprocess.run(['git', 'merge-file', '-L', 'union', '-L', 'base', '-L', 'lane', str(uf), str(b), str(l)]).returncode
    shutil.copy(uf, tf); print('merge' if rc == 0 else f'CONFLICT({rc})', r)
