#!/usr/bin/env python3
"""3-way compose delivery crate snapshots onto a base crate (git merge-file per file).
  compose3.py --base <crate> --out <dir> --part label=<src>[:excl=f1,f2][:only=f1,f2] ...
Conflicting files are left unchanged in out; the merged-with-markers text goes to <out>.conflicts/<label>/<file>.
"""
import argparse, filecmp, json, shutil, subprocess, sys
from pathlib import Path
IGN = {'target', '.DS_Store'}
def files(root):
    return {str(p.relative_to(root)) for p in root.rglob('*') if p.is_file() and not IGN.intersection(p.relative_to(root).parts) and not p.name.endswith(('.orig', '.rej'))}
def same(a, b):
    return a.exists() and b.exists() and filecmp.cmp(a, b, shallow=False)
def main():
    ap = argparse.ArgumentParser(); ap.add_argument('--base', type=Path, required=True); ap.add_argument('--out', type=Path, required=True)
    ap.add_argument('--part', action='append', default=[]); ap.add_argument('--start', type=Path, help='starting tree (default: --base)'); a = ap.parse_args()
    if a.out.exists(): shutil.rmtree(a.out)
    cdir = Path(str(a.out) + '.conflicts')
    if cdir.exists(): shutil.rmtree(cdir)
    shutil.copytree(a.start or a.base, a.out, ignore=shutil.ignore_patterns(*IGN))
    bf = files(a.base); rep = []
    for spec in a.part:
        bits = spec.split(':'); label, src = bits[0].split('=', 1); src = Path(src)
        opts = dict(b.split('=', 1) for b in bits[1:]); excl = set(filter(None, opts.get('excl', '').split(','))); only = set(filter(None, opts.get('only', '').split(',')))
        pbase = Path(opts['base']) if 'base' in opts else a.base; pbf = files(pbase)
        sf = files(src); r = {'label': label, 'applied': [], 'same': [], 'conflict': [], 'skipped': []}
        for f in sorted(pbf | sf):
            if f in excl or (only and f not in only):
                if not same(pbase / f, src / f): r['skipped'].append(f)
                continue
            B, T, O = pbase / f, src / f, a.out / f
            inb, ins = f in pbf, f in sf
            if inb and ins and same(B, T): continue
            if inb and not ins:  # deleted by part
                if not O.exists(): r['same'].append(f)
                elif same(O, B): O.unlink(); r['applied'].append('D:' + f)
                else: r['conflict'].append('D:' + f)
                continue
            if not inb:  # added by part
                if not O.exists(): O.parent.mkdir(parents=True, exist_ok=True); shutil.copy2(T, O); r['applied'].append('A:' + f)
                elif same(O, T): r['same'].append(f)
                else:
                    m = subprocess.run(['git', 'merge-file', '-p', '-L', 'ours', '-L', 'base', '-L', label, str(O), '/dev/null', str(T)], capture_output=True, text=True)
                    (cdir / label / f).parent.mkdir(parents=True, exist_ok=True); (cdir / label / f).write_text(m.stdout); r['conflict'].append('A:' + f)
                continue
            if not O.exists(): r['conflict'].append('M-of-deleted:' + f); continue
            if same(O, T): r['same'].append(f); continue
            if same(O, B): shutil.copy2(T, O); r['applied'].append(f); continue
            m = subprocess.run(['git', 'merge-file', '-p', '-L', 'ours', '-L', 'base', '-L', label, str(O), str(B), str(T)], capture_output=True, text=True)
            if m.returncode == 0: O.write_text(m.stdout); r['applied'].append('3w:' + f)
            else:
                (cdir / label / f).parent.mkdir(parents=True, exist_ok=True); (cdir / label / f).write_text(m.stdout); r['conflict'].append(f'{f}({m.returncode})')
        rep.append(r)
        print(label, 'applied', len(r['applied']), 'same', len(r['same']), 'CONFLICT', r['conflict'] or '-', 'skipped', r['skipped'] or '-')
    (Path(str(a.out) + '.compose.json')).write_text(json.dumps(rep, indent=1))
if __name__ == '__main__': main()
