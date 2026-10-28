#!/usr/bin/env python3
"""Link-only replay of a build made with tools/rbuild_raw.py (diagnostic; no compile).

usage: python3 -B relink.py BUILD_DIR ORDERED_LD OUT_DIR [--measure BASE_SYMBOLS]
Re-runs the recorded rust-lld command on the saved objects (BUILD_DIR/linkin) with ORDERED_LD as the script,
then strips with the pinned v1.52 llvm-objcopy. Writes OUT_DIR/{symbols.so,candidate.so,link.map,ordered.ld,result.json}.
"""
from pathlib import Path
import hashlib, json, shutil, subprocess, sys

OBJCOPY = '/Users/shawwalters/.cache/solana/v1.52/platform-tools/llvm/bin/llvm-objcopy'
MEASURE = '/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work/mayhem-b/build/measure.py'
sha = lambda p: hashlib.sha256(Path(p).read_bytes()).hexdigest()


def relink(build, script, out):
    build, out = Path(build), Path(out)
    out.mkdir(parents=True, exist_ok=True)
    rep = json.loads((build / 'replay.json').read_text())
    args = list(rep['args'])
    shutil.copyfile(script, out / 'ordered.ld')
    i = args.index('--script'); args[i + 1] = str(out / 'ordered.ld')
    i = args.index('-o'); args[i + 1] = str(out / 'symbols.so')
    args = [('-Map=' + str(out / 'link.map')) if a.startswith('-Map=') else a for a in args]
    r = subprocess.run([rep['real'], *args], capture_output=True, text=True)
    res = dict(returncode=r.returncode, stderr=r.stderr[-2000:], script_sha256=sha(out / 'ordered.ld'))
    if r.returncode == 0:
        subprocess.run([OBJCOPY, '--strip-all', str(out / 'symbols.so'), str(out / 'candidate.so')], check=True)
        res.update(candidate_sha256=sha(out / 'candidate.so'), symbols_sha256=sha(out / 'symbols.so'),
                   candidate_bytes=(out / 'candidate.so').stat().st_size)
    (out / 'result.json').write_text(json.dumps(res, indent=1) + '\n')
    return res


if __name__ == '__main__':
    a = sys.argv[1:]
    res = relink(a[0], a[1], a[2])
    print(json.dumps({k: v for k, v in res.items() if k != 'stderr' or v}, indent=1))
    if '--measure' in a and res['returncode'] == 0:
        base = a[a.index('--measure') + 1]
        subprocess.run(['python3', '-B', MEASURE, str(Path(a[2]) / 'symbols.so'), base, '--json', str(Path(a[2]) / 'measure.json')],
                       stdout=subprocess.DEVNULL, check=True)
        s = json.loads((Path(a[2]) / 'measure.json').read_text())
        print(json.dumps(dict(counts=s['counts'], no_losses=s['no_losses'], gains=s['gains'], raw_gains=len(s['raw_gains']),
                              raw_losses=s['raw_losses'], body_losses=s['body_losses'], edge_losses=len(s['edge_losses']),
                              source_losses=len(s['source_losses']), profile_losses=len(s['profile_losses']))))
