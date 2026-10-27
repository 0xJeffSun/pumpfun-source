#!/usr/bin/env python3
"""Read-only scan of Codex work dirs for mentions of original window addresses.

One combined regex finds every hex (0x...) or decimal mention of any of the 1,035
window starts; files that mention more than --max-windows-per-file windows are
treated as inventories/census files and skipped, so only targeted work shows up.
"""
import argparse, gzip, json, os, re, sys, time
from pathlib import Path

TEXT = {'.json', '.md', '.py', '.txt', '.log', '.patch', '.rs', '.toml', '.tsv', '.csv', '.jsonl'}


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--work', type=Path, required=True)
    ap.add_argument('--inventory', type=Path, required=True)
    ap.add_argument('--windows', required=True, help='comma list of hex starts')
    ap.add_argument('--minutes', type=int, default=180)
    ap.add_argument('--prefix', default='parallel-main-')
    ap.add_argument('--max-windows-per-file', type=int, default=40)
    ap.add_argument('--max-bytes', type=int, default=4_000_000)
    a = ap.parse_args()
    b = a.inventory.read_bytes()
    iv = json.loads(gzip.decompress(b) if b[:2] == b'\x1f\x8b' else b)
    allstarts = {w['start'] for w in iv['windows']}
    want = [int(x, 16) for x in a.windows.split(',') if x]
    rx = re.compile(r'(?<![0-9a-fA-Fx])(?:0x([0-9a-f]{3,6})|([0-9]{3,7}))(?![0-9a-fA-F])')
    cutoff = time.time() - a.minutes * 60
    hits = {s: [] for s in want}
    scanned = 0
    for d in sorted(a.work.iterdir()):
        if not d.is_dir() or not d.name.startswith(a.prefix):
            continue
        if d.stat().st_mtime < cutoff:
            continue
        for root, dirs, files in os.walk(d):
            dirs[:] = [x for x in dirs if x not in ('target', 'cargo-home', '__pycache__', '.git', 'registry', 'source', 'build')]
            for f in files:
                p = Path(root) / f
                if p.suffix not in TEXT:
                    continue
                try:
                    st = p.stat()
                except OSError:
                    continue
                if st.st_mtime < cutoff or st.st_size > a.max_bytes:
                    continue
                try:
                    t = p.read_text(errors='ignore')
                except OSError:
                    continue
                scanned += 1
                found = set()
                for m in rx.finditer(t):
                    v = int(m.group(1), 16) if m.group(1) else int(m.group(2))
                    if v in allstarts:
                        found.add(v)
                if not found or len(found) > a.max_windows_per_file:
                    continue
                for s in want:
                    if s in found:
                        hits[s].append((str(p.relative_to(a.work)), len(found), time.strftime('%H:%M', time.localtime(st.st_mtime))))
    print(f'scanned {scanned} recent text files', file=sys.stderr)
    for s in want:
        print(f'{s:#x}: {len(hits[s])} files')
        for h in sorted(hits[s], key=lambda x: x[2], reverse=True)[:8]:
            print('    ', h[2], f'(file mentions {h[1]} windows)', h[0])


if __name__ == '__main__':
    main()
