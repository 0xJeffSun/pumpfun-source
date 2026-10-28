#!/usr/bin/env python3
"""[mg-P-raw] fastbuild (harness identity recipe, same slot pool) + nested path-crate manifests + link hook.

usage: pbuild.py --src CRATE --work WORK --out OUT [--ordered ORDERED.ld] [--baseline INV.json] [--no-score]
The root pump cdylib is linked through tools/plink.py (-C linker, added by tools/rwrap.py for that crate only):
link inputs + replay.json + link.map are recorded in OUT/link; --ordered replaces the SDK default script.
Without --ordered the output equals plain fastbuild (verify: unstripped sha of the same tree).
"""
import argparse, json, os, shutil, subprocess, sys, time
from pathlib import Path
W = Path('/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work'); H = W / 'harness'
T = Path(__file__).resolve().parent
sys.path.insert(0, str(H)); import fastbuild as fb  # noqa


def stage(src, ws):
    crate = fb.stage(src, ws)
    for p in src.rglob('Cargo.toml'):
        rel = p.relative_to(src)
        if rel == Path('Cargo.toml') or 'target' in rel.parts: continue
        d = crate / rel; d.parent.mkdir(parents=True, exist_ok=True)
        if not d.exists() or d.read_bytes() != p.read_bytes(): shutil.copy2(p, d)
    return crate


def build(src, work, out, ordered=None, recipe='identity'):
    R = fb.RECIPES[recipe]; triple = R['triple']
    src, work, out = src.resolve(), work.resolve(), out.resolve()
    work.mkdir(parents=True, exist_ok=True)
    ws = work / 'ws'; crate = stage(src, ws)
    target = work / f'target-{recipe}'
    if not target.exists() and R['template'].exists():
        subprocess.run(['cp', '-cRp', str(R['template']), str(target)], check=True)
    if (out / 'link').exists(): shutil.rmtree(out / 'link')
    out.mkdir(parents=True, exist_ok=True)
    env = os.environ.copy(); env.pop('CARGO_BUILD_TARGET_DIR', None)
    reg = Path.home() / '.cargo'
    lld = Path(R['rustc']).parents[1] / 'lib/rustlib/aarch64-apple-darwin/bin/rust-lld'
    env.update(RUSTC_WRAPPER=str(T / 'rwrap.py'), PRAW_PHYS=str(H / 'pump_physical_source_wrapper.py'),
               PRAW_LINKER=str(T / 'plink.py'), PRAW_LLD=str(lld), PRAW_REC=str(out / 'link'),
               PRAW_ORDERED=str(Path(ordered).resolve()) if ordered else '', PRAW_ROOT='pump_recovered',
               PUMP_LOGICAL_REGISTRY_SRC=str(reg / 'registry/src'), CARGO_HOME=str(reg), CARGO_TARGET_DIR=str(target),
               CARGO_BUILD_JOBS=os.environ.get('CARGO_BUILD_JOBS', '2'), RUSTC=str(R['rustc']),
               CC=str(fb.SDK / 'llvm/bin/clang'), AR=str(fb.SDK / 'llvm/bin/llvm-ar'),
               OBJDUMP=str(fb.SDK / 'llvm/bin/llvm-objdump'), OBJCOPY=str(fb.SDK / 'llvm/bin/llvm-objcopy'))
    env['CARGO_TARGET_' + triple.upper().replace('-', '_') + '_RUSTFLAGS'] = '-Zremap-cwd-prefix='
    env.pop('RUSTFLAGS', None); env.pop('CARGO_ENCODED_RUSTFLAGS', None)
    cmd = [str(fb.SDK / 'rust/bin/cargo'), 'build', '--manifest-path', str(crate / 'Cargo.toml'), '--release',
           '--target', triple, '--locked', '--offline']
    for fp in list(target.glob('*/release/.fingerprint/pump-recovered-*')):
        shutil.rmtree(fp, ignore_errors=True)
    for so in target.glob('*/release/pump_recovered.so'):
        so.unlink()
    slot = fb.acquire_slot(); t0 = time.time()
    try:
        r = subprocess.run(cmd, cwd=ws, env=env, stdout=subprocess.PIPE, stderr=subprocess.STDOUT, text=True)
    finally:
        slot.close()
    dt = time.time() - t0
    (out / 'build.log').write_text(r.stdout)
    if r.returncode != 0:
        return {'ok': False, 'seconds': round(dt, 1), 'errors': [l for l in r.stdout.splitlines() if l.startswith('error')][:12]}
    stack = [l.strip() for l in r.stdout.splitlines() if 'exceeded max offset' in l]
    built = target / triple / 'release/pump_recovered.so'
    shutil.copy2(built, out / 'unstripped.so')
    subprocess.run([str(fb.SDK / 'llvm/bin/llvm-objcopy'), '--strip-all', str(built), str(out / 'candidate.so')], check=True)
    return {'ok': True, 'runtime_valid': not stack, 'stack_warnings': stack, 'seconds': round(dt, 1),
            'ordered': str(ordered) if ordered else None,
            'unstripped_sha256': fb.sha(out / 'unstripped.so'), 'candidate_sha256': fb.sha(out / 'candidate.so')}


if __name__ == '__main__':
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument('--src', type=Path, required=True); ap.add_argument('--work', type=Path, required=True)
    ap.add_argument('--out', type=Path, required=True); ap.add_argument('--ordered', type=Path)
    ap.add_argument('--baseline', type=Path, default=W / 'base/L28/inventory.json'); ap.add_argument('--no-score', action='store_true')
    a = ap.parse_args()
    res = build(a.src, a.work, a.out, a.ordered)
    if res['ok'] and not a.no_score:
        s = subprocess.run([sys.executable, '-B', str(H / 'score.py'), str(a.out / 'unstripped.so'), '--baseline', str(a.baseline),
                            '--json', str(a.out / 'score.json'), '--quiet'], capture_output=True, text=True)
        sc = json.loads(s.stdout); res['score'] = {k: sc.get(k) for k in ('normalized', 'raw', 'gains', 'losses', 'raw_gains', 'raw_losses')}
    (a.out / 'result.json').write_text(json.dumps(res, indent=1) + '\n')
    print(json.dumps(res, indent=1))
    sys.exit(0 if res['ok'] else 1)
