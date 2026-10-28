#!/usr/bin/env python3
"""N patch files -> N parallel native builds (through the shared slot lock) -> ranked gained/lost window table.

usage: variants.py --lane <lane> --base <src-root containing programs/pump-amm> --base-measure <measure.json>
                   --out <new dir> [--exact] [--jobs N] [--keep-targets] patch1.patch [patch2.patch ...]

Each patch (unified diff for `patch -p1` against --base) is applied to an APFS clone of the base programs/ tree,
staged with the frontier recipe and built by native_exact_build.sh (--exact; bytes == authenticated Linux) or
native_build.sh, each in its own APFS-cloned target dir (cp -c -R of the lane's warm cache), so up to --jobs builds
run concurrently (each still waits for one of the 6 sbf slots). Every variant's measure.json is compared with
--base-measure: lost windows are listed first because a variant that loses anything must not be adopted.
Writes <out>/table.json and prints the ranked table. --base-measure must come from the same build flavor
(exact native == Linux; plain native differs in sysroot-owned windows).
"""
import argparse, json, os, shutil, subprocess, sys, time
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path
SP = Path('/private/tmp/claude-501/-Users-shawwalters-Documents-Codex-2026-10-24-pumpfun-source/d810a7ff-a81e-46b2-bacd-4cd9cadc52cb/scratchpad')
def sets(m):
    n = {r['start'] for r in m['rows'] if r['matches']}; r = {r['start'] for r in m['rows'] if r['raw_match']}
    return n, r, {r['start']: r['end'] - r['start'] for r in m['rows']}
def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument('--lane', required=True); ap.add_argument('--base', type=Path, required=True)
    ap.add_argument('--base-measure', type=Path, required=True); ap.add_argument('--out', type=Path, required=True)
    ap.add_argument('--exact', action='store_true'); ap.add_argument('--jobs', type=int, default=3)
    ap.add_argument('--keep-targets', action='store_true'); ap.add_argument('patches', nargs='+', type=Path)
    a = ap.parse_args()
    L = SP/'lanes'/a.lane; out = a.out.resolve(); out.mkdir(parents=True, exist_ok=False)
    tools = SP/'shared/tools'
    script = tools/('native_exact_build.sh' if a.exact else 'native_build.sh')
    # exact: clone the immutable shared primed cache (deps only); plain: the lane's own warm cache (do not build into it meanwhile)
    warm = (SP/'shared/caches/xnative-v144') if a.exact and (SP/'shared/caches/xnative-v144').exists() else L/'target'/('xnative' if a.exact else 'native')
    bn, br, size = sets(json.loads(a.base_measure.read_text()))
    def one(k_p):
        k, patch = k_p
        vd = out/f'v{k:02d}-{patch.stem}'; src = vd/'src'; src.mkdir(parents=True)
        subprocess.run(['cp', '-c', '-R', str(a.base.resolve()/'programs'), str(src/'programs')], check=True)
        pr = subprocess.run(['patch', '-p1', '-s', '-d', str(src), '-i', str(patch.resolve())], capture_output=True, text=True)
        if pr.returncode:
            return {'variant': vd.name, 'status': 'patch-failed', 'detail': (pr.stdout + pr.stderr)[-400:]}
        tgt = L/'target'/f'var-{os.getpid()}-{k:02d}'
        if warm.exists():
            subprocess.run(['cp', '-c', '-R', str(warm), str(tgt)], check=True)
        t = time.monotonic()
        r = subprocess.run(['bash', str(script), a.lane, str(src), str(vd/'build')], env=dict(os.environ, TARGET_DIR=str(tgt)),
                           capture_output=True, text=True)
        secs = round(time.monotonic() - t, 1)
        if not a.keep_targets:
            shutil.rmtree(tgt, ignore_errors=True)
        mj = vd/'build/measure.json'
        if r.returncode or not mj.exists():
            return {'variant': vd.name, 'status': 'build-failed', 'seconds': secs, 'detail': (r.stdout + r.stderr)[-600:]}
        m = json.loads(mj.read_text()); n, rr, _ = sets(m)
        return {'variant': vd.name, 'status': 'ok', 'seconds': secs, 'normalized': len(n), 'raw': len(rr), 'unmatched': m['unmatched'],
                'norm_gained': [f'{x:#x}/{size[x]}' for x in sorted(n - bn)], 'norm_lost': [f'{x:#x}/{size[x]}' for x in sorted(bn - n)],
                'raw_gained': [f'{x:#x}' for x in sorted(rr - br)], 'raw_lost': [f'{x:#x}' for x in sorted(br - rr)],
                'candidate': str(vd/'build/candidate.so')}
    with ThreadPoolExecutor(max(1, a.jobs)) as ex:
        res = list(ex.map(one, enumerate(a.patches, 1)))
    ok = [r for r in res if r['status'] == 'ok']
    ok.sort(key=lambda r: (bool(r['norm_lost'] or r['raw_lost']), -(len(r['norm_gained']) - len(r['norm_lost'])), -(len(r['raw_gained']) - len(r['raw_lost']))))
    (out/'table.json').write_text(json.dumps({'base_measure': str(a.base_measure), 'normalized_base': len(bn), 'raw_base': len(br),
                                              'ranked': ok, 'failed': [r for r in res if r['status'] != 'ok']}, indent=1) + '\n')
    print(f'base: normalized {len(bn)} raw {len(br)}')
    for r in ok:
        flag = 'LOSES' if r['norm_lost'] or r['raw_lost'] else 'clean'
        print(f"{r['variant']:<40} {flag} norm {r['normalized']} (+{len(r['norm_gained'])}/-{len(r['norm_lost'])}) raw {r['raw']} "
              f"(+{len(r['raw_gained'])}/-{len(r['raw_lost'])}) {r['seconds']}s  gained {r['norm_gained'][:6]} lost {r['norm_lost'][:6]}")
    for r in res:
        if r['status'] != 'ok':
            print(f"{r['variant']:<40} {r['status']}: {r.get('detail', '')[-200:]!r}")
if __name__ == '__main__':
    main()
