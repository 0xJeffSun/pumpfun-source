#!/usr/bin/env python3
"""N patch files -> ONE sbf slot -> N exact root-crate builds back to back -> ranked gained/lost window table.

usage: vbatch.py --lane <lane> --base <src-root containing programs/pump-amm> --base-measure <exact measure.json>
                 --out <new dir> patch1.patch [patch2.patch ...]

Under slot contention a lock wait (minutes) costs far more than a root-crate compile (~10-40 s), so this pays ONE wait for the whole
sweep instead of one per variant (variants.py). Exact toolchain only (SP/shared/toolchain/v144x; bytes == authenticated Linux):
  1. outside the lock: clone base programs/ (APFS), apply each patch (patch -p1), stage with the frontier recipe, sync registry
     archives, resolve shared-cache hits (SP/shared/buildcache/xnative-v144) and plan the root-crate rustc command once per distinct
     Cargo.toml+Cargo.lock (cargo build plan in a throwaway clone);
  2. inside one slot: run the remaining root-crate rustc invocations sequentially (rustc_replay.py; deps are read from one APFS
     clone of the shared primed cache, outputs go to per-variant dirs);
  3. outside the lock: strip + measure.py in parallel, store results in the shared cache, compare with --base-measure.
Direct rustc output is byte-identical to the cargo build (speed-lane g01 evidence). Confirm real gains with linux_build.py.
"""
import argparse, hashlib, json, os, shutil, subprocess, sys, time
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path
SP = Path('/private/tmp/claude-501/-Users-shawwalters-Documents-Codex-2026-10-24-pumpfun-source/d810a7ff-a81e-46b2-bacd-4cd9cadc52cb/scratchpad')
T = SP/'shared/tools'; TC = Path(os.environ.get('XTOOLCHAIN', SP/'shared/toolchain/v144x'))
STRIP = Path.home()/'.cache/solana/v1.52/platform-tools/llvm/bin/llvm-objcopy'
def sets(m):
    n = {r['start'] for r in m['rows'] if r['matches']}; r = {r['start'] for r in m['rows'] if r['raw_match']}
    return n, r, {r['start']: r['end'] - r['start'] for r in m['rows']}
def run(cmd, **kw): return subprocess.run([str(c) for c in cmd], capture_output=True, text=True, **kw)
def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument('--lane', required=True); ap.add_argument('--base', type=Path, required=True)
    ap.add_argument('--base-measure', type=Path, required=True); ap.add_argument('--out', type=Path, required=True)
    ap.add_argument('patches', nargs='+', type=Path)
    a = ap.parse_args()
    L = SP/'lanes'/a.lane; out = a.out.resolve(); out.mkdir(parents=True, exist_ok=False)
    mainck = (SP/'shared/frontier/MAIN').read_text().strip() if (SP/'shared/frontier/MAIN').exists() else ''
    recipe = Path(os.environ.get('RECIPE') or L/'wt/repro/pump_amm'/mainck/'workspace_recipe_v2.py')
    tgt = L/'target'/f'xbatch-{os.getpid()}'
    subprocess.run(['cp', '-c', '-R', str(SP/'shared/caches/xnative-v144'), str(tgt)], check=True)
    bn, br, size = sets(json.loads(a.base_measure.read_text()))
    t0 = time.monotonic(); vs = []
    # 1. prepare (outside the lock)
    for k, patch in enumerate(a.patches, 1):
        v = {'variant': f'v{k:02d}-{patch.stem}', 'dir': out/f'v{k:02d}-{patch.stem}'}; vd = v['dir']; (vd/'src').mkdir(parents=True)
        subprocess.run(['cp', '-c', '-R', str(a.base.resolve()/'programs'), str(vd/'src/programs')], check=True)
        pr = run(['patch', '-p1', '-s', '-d', vd/'src', '-i', patch.resolve()])
        if pr.returncode: v.update(status='patch-failed', detail=(pr.stdout + pr.stderr)[-400:]); vs.append(v); continue
        st = run([sys.executable, '-B', recipe, 'stage', '--source-root', vd/'src', '--output', vd/'ws'])
        if st.returncode: v.update(status='stage-failed', detail=st.stderr[-400:]); vs.append(v); continue
        (vd/'stage.json').write_text(st.stdout)
        run([sys.executable, T/'sync_registry.py', '--cargo-home', L/'cargo-home', '--lock', vd/'ws/Cargo.lock'])
        key = run([sys.executable, T/'buildcache.py', 'key', vd/'stage.json', 'xnative-v144', TC]).stdout.strip()
        v.update(key=key, entry=SP/'shared/buildcache/xnative-v144'/key)
        (vd/'build').mkdir()
        if run([sys.executable, T/'buildcache.py', 'fetch', v['entry'], vd/'build']).returncode == 0:
            v['how'] = 'cache'
        else:
            mani = hashlib.sha256((vd/'ws/Cargo.toml').read_bytes() + (vd/'ws/Cargo.lock').read_bytes() +
                                  (vd/'ws/programs/pump-amm/Cargo.toml').read_bytes()).hexdigest()[:16]
            cmd = out/f'rootcmd-{mani}.json'
            if not cmd.exists():
                pl = run([sys.executable, T/'rustc_replay.py', 'plan', a.lane, vd/'ws', cmd, '--exact', '--target-dir', tgt])
                if pl.returncode: v.update(status='plan-failed', detail=(pl.stdout + pl.stderr)[-400:]); vs.append(v); continue
            v.update(how='built', cmd=cmd)
        v['status'] = 'ok'; vs.append(v)
    prep = time.monotonic() - t0
    # 2. one slot for all root-crate compiles
    todo = [v for v in vs if v.get('how') == 'built']
    script = out/'batch.sh'
    script.write_text('#!/bin/bash\n' + ''.join(
        f"s=$(date +%s); python3 {T/'rustc_replay.py'} run {v['cmd']} --ws {v['dir']/'ws'} --out-dir {v['dir']/'rustc'} > {v['dir']/'rustc.log'} 2>&1;"
        f" echo \"{v['variant']} rc=$? $(( $(date +%s)-s ))s\"\n" for v in todo))
    t1 = time.monotonic(); lock_log = ''
    if todo:
        r = run(['python3', SP/'shared/sbf_lock.py', '--slots', '6', '--name', 'sbf', '--', 'bash', script])
        lock_log = r.stdout + r.stderr
    slot = time.monotonic() - t1
    (out/'batch.log').write_text(lock_log)
    shutil.rmtree(tgt, ignore_errors=True)
    # 3. strip + measure + cache + compare (outside the lock)
    def finish(v):
        if v['status'] != 'ok': return v
        b = v['dir']/'build'
        if v['how'] == 'built':
            so = v['dir']/'rustc/pump_amm_recovered.so'
            if not so.exists():
                v.update(status='build-failed', detail=(v['dir']/'rustc.log').read_text(errors='replace')[-600:]); return v
            shutil.copy2(so, b/'unstripped.so'); subprocess.run([str(STRIP), '--strip-all', str(b/'unstripped.so'), str(b/'candidate.so')], check=True)
            run([sys.executable, T/'buildcache.py', 'store', v['entry'], b, a.lane])
        m = run([sys.executable, L/'wt/repro/pump_amm/focused-diagnostics-20261026/measure.py', '--candidate', b/'candidate.so',
                 '--symbols', b/'unstripped.so', '--output', b/'measure.json'], cwd=L/'wt')
        if m.returncode: v.update(status='measure-failed', detail=m.stderr[-400:]); return v
        mm = json.loads((b/'measure.json').read_text()); n, rr, _ = sets(mm)
        v.update(normalized=len(n), raw=len(rr), unmatched=mm['unmatched'],
                 candidate_sha256=hashlib.sha256((b/'candidate.so').read_bytes()).hexdigest(),
                 norm_gained=[f'{x:#x}/{size[x]}' for x in sorted(n - bn)], norm_lost=[f'{x:#x}/{size[x]}' for x in sorted(bn - n)],
                 raw_gained=[f'{x:#x}' for x in sorted(rr - br)], raw_lost=[f'{x:#x}' for x in sorted(br - rr)])
        return v
    with ThreadPoolExecutor(4) as ex:
        vs = list(ex.map(finish, vs))
    ok = [v for v in vs if v['status'] == 'ok']
    ok.sort(key=lambda v: (bool(v['norm_lost'] or v['raw_lost']), -(len(v['norm_gained']) - len(v['norm_lost'])), -(len(v['raw_gained']) - len(v['raw_lost']))))
    clean = lambda v: {k: (str(x) if isinstance(x, Path) else x) for k, x in v.items()}
    (out/'table.json').write_text(json.dumps({'base_measure': str(a.base_measure), 'normalized_base': len(bn), 'raw_base': len(br),
        'seconds': {'prepare': round(prep, 1), 'slot_wait_plus_compiles': round(slot, 1), 'total': round(time.monotonic() - t0, 1)},
        'ranked': [clean(v) for v in ok], 'failed': [clean(v) for v in vs if v['status'] != 'ok']}, indent=1) + '\n')
    print(f'base: normalized {len(bn)} raw {len(br)} | prepare {prep:.0f}s, one slot (wait+{len(todo)} compiles) {slot:.0f}s')
    for v in ok:
        flag = 'LOSES' if v['norm_lost'] or v['raw_lost'] else 'clean'
        print(f"{v['variant']:<40} {flag} {v['how']:<5} norm {v['normalized']} (+{len(v['norm_gained'])}/-{len(v['norm_lost'])}) raw {v['raw']} "
              f"(+{len(v['raw_gained'])}/-{len(v['raw_lost'])}) gained {v['norm_gained'][:6]} lost {v['norm_lost'][:6]}")
    for v in vs:
        if v['status'] != 'ok': print(f"{v['variant']:<40} {v['status']}: {v.get('detail', '')[-200:]!r}")
if __name__ == '__main__':
    main()
