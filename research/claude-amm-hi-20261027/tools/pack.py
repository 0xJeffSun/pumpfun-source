#!/usr/bin/env python3
"""Copy build records, measurements, tools and the source patch into the lane packet."""
import gzip, json, shutil, subprocess, sys, hashlib
from pathlib import Path
LANE = Path('/private/tmp/claude-501/-Users-shawwalters-Documents-Codex-2026-10-24-pumpfun-source/bf960843-6806-451b-a211-62c8b228d301/scratchpad/lanes/amm-hi')
WT = LANE / 'wt'; PK = WT / 'research/claude-amm-hi-20261027'
def gz(src, dst):
    dst.write_bytes(gzip.compress(Path(src).read_bytes(), mtime=0))
def main(tags):
    (PK / 'builds').mkdir(parents=True, exist_ok=True)
    for tag in tags:
        b = LANE / 'out/builds' / tag; d = PK / 'builds' / tag; d.mkdir(parents=True, exist_ok=True)
        rec = json.loads((b / 'build.json').read_text())
        rec['src'] = rec['src'].replace(str(LANE), '<lane>')
        (d / 'build.json').write_text(json.dumps(rec, indent=1) + '\n')
        gz(b / 'build.log', d / 'build.log.gz')
        if (b / 'measurement.json').exists():
            gz(b / 'measurement.json', d / 'measurement.json.gz')
            m = json.loads((b / 'measurement.json').read_text())
            (d / 'summary.json').write_text(json.dumps({k: m[k] for k in ('candidate_sha256', 'symbols_sha256', 'windows', 'normalized_matches', 'raw_matches', 'unmatched')}, indent=1) + '\n')
    td = PK / 'tools'; td.mkdir(exist_ok=True)
    for f in (LANE / 'out/tools').glob('*.py'):
        shutil.copy2(f, td / f.name)
    diff = subprocess.run(['git', 'diff', 'origin/main', '--', 'programs/pump-amm/src'], cwd=WT, capture_output=True, text=True).stdout
    (PK / 'source.patch').write_text(diff)
    sd = PK / 'sources'
    if sd.exists(): shutil.rmtree(sd)
    names = subprocess.run(['git', 'diff', '--name-only', 'origin/main', '--', 'programs/pump-amm/src'], cwd=WT, capture_output=True, text=True).stdout.split()
    for n in names:
        (sd / n).parent.mkdir(parents=True, exist_ok=True); shutil.copy2(WT / n, sd / n)
    print('packed', tags, 'changed sources:', names)
main(sys.argv[1:])
