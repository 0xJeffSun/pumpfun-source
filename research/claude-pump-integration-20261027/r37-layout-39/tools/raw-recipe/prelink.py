#!/usr/bin/env python3
"""[mg-P-raw] link-only replay of a pbuild.py build with another script (diagnostic; no compile; ~1 s).
usage: prelink.py BUILD_OUT SCRIPT.ld OUT_DIR [--score BASELINE_INV]
Re-runs the recorded rust-lld command on the saved objects (BUILD_OUT/link/linkin; archives must be unchanged,
checked by sha256) with SCRIPT.ld, strips with the harness llvm-objcopy, optionally scores."""
import hashlib, json, shutil, subprocess, sys
from pathlib import Path
W = Path('/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work')
OBJCOPY = str(Path.home() / '.cache/solana/v1.44/platform-tools/llvm/bin/llvm-objcopy')
sha = lambda p: hashlib.sha256(Path(p).read_bytes()).hexdigest()


def relink(build, script, out):
    build, out = Path(build), Path(out); out.mkdir(parents=True, exist_ok=True)
    rep = json.loads((build / 'link/replay.json').read_text())
    for a, h in rep['archives'].items():
        assert sha(a) == h, 'archive changed since the build: ' + a
    args = list(rep['args'])
    shutil.copyfile(script, out / 'ordered.ld')
    i = args.index('--script'); args[i + 1] = str(out / 'ordered.ld')
    i = args.index('-o'); args[i + 1] = str(out / 'unstripped.so')
    args = [('-Map=' + str(out / 'link.map')) if a.startswith('-Map=') else a for a in args]
    r = subprocess.run([rep['real'], *args], capture_output=True, text=True)
    res = dict(returncode=r.returncode, stderr=r.stderr[-3000:], script_sha256=sha(out / 'ordered.ld'))
    if r.returncode == 0:
        subprocess.run([OBJCOPY, '--strip-all', str(out / 'unstripped.so'), str(out / 'candidate.so')], check=True)
        res.update(unstripped_sha256=sha(out / 'unstripped.so'), candidate_sha256=sha(out / 'candidate.so'))
    (out / 'relink.json').write_text(json.dumps(res, indent=1) + '\n')
    return res


if __name__ == '__main__':
    a = sys.argv[1:]
    res = relink(a[0], a[1], a[2])
    print(json.dumps({k: v for k, v in res.items() if k != 'stderr' or v}, indent=1))
    if '--score' in a and res['returncode'] == 0:
        base = a[a.index('--score') + 1]
        s = subprocess.run([sys.executable, '-B', str(W / 'harness/score.py'), str(Path(a[2]) / 'unstripped.so'), '--baseline', base,
                            '--json', str(Path(a[2]) / 'score.json'), '--quiet'], capture_output=True, text=True)
        sc = json.loads(s.stdout)
        print(json.dumps({k: sc.get(k) for k in ('normalized', 'raw', 'gains', 'losses', 'raw_gains', 'raw_losses')}))
