#!/usr/bin/env python3
"""Shared content-addressed cache of native AMM build results (SP/shared/buildcache/<flavor>/<key>/).

  buildcache.py key <stage.json> <flavor> <toolchain-root>   print the key: sha256 over the staged workspace's per-file
        sha256 map (stage.json workspace_sha256: every Cargo.toml/Cargo.lock/source/vendored input), the flavor, the
        rustc -vV text and the sbpf sysroot rlib names+sizes of <toolchain-root>.
  buildcache.py fetch <entry-dir> <out-dir>     copy candidate.so/unstripped.so into out-dir if the entry is complete and its
        artifacts still hash to meta.json; exit 1 on a miss.
  buildcache.py store <entry-dir> <out-dir> <lane>   publish out-dir's artifacts atomically (no-op if the entry exists).
Builds are deterministic for a fixed staged workspace + toolchain (lanes multihop and v2 built key 9968f7fa... natively in
separate target caches and got identical bytes), so a hit returns exactly what a fresh build would. NOCACHE=1 skips it.
"""
import hashlib, json, os, shutil, subprocess, sys, time
from pathlib import Path
def sha(p): return hashlib.sha256(Path(p).read_bytes()).hexdigest()
ART = ('candidate.so', 'unstripped.so')
def key(stage, flavor, tc):
    ws = json.loads(Path(stage).read_text())['workspace_sha256']
    tc = Path(tc); rustc = tc/'rust/bin/rustc'
    vv = subprocess.run([str(rustc), '-vV'], capture_output=True, text=True).stdout
    lib = tc/'rust/lib/rustlib/sbpf-solana-solana/lib'
    libs = sorted((p.name, p.stat().st_size) for p in lib.glob('*.rlib'))
    shim = {str(p.relative_to(tc)): sha(p) for p in [tc/'bin/rustc', *sorted((tc/'hostdeps').glob('*'))] if p.is_file()}
    blob = json.dumps({'workspace_sha256': ws, 'flavor': flavor, 'rustc_vV': vv, 'sysroot': libs, 'shim': shim}, sort_keys=True)
    return hashlib.sha256(blob.encode()).hexdigest()
def fetch(entry, out):
    entry, out = Path(entry), Path(out); m = entry/'meta.json'
    if not m.exists(): return 1
    meta = json.loads(m.read_text())
    for a in ART:
        if not (entry/a).exists() or sha(entry/a) != meta['sha256'][a]: return 1
    for a in ART:
        shutil.copy2(entry/a, out/a)
    (out/'cache-hit.json').write_text(json.dumps({'entry': str(entry), **meta}, indent=1) + '\n')
    return 0
def store(entry, out, lane):
    entry, out = Path(entry), Path(out)
    if (entry/'meta.json').exists():
        meta = json.loads((entry/'meta.json').read_text())
        if all((entry/a).exists() and sha(entry/a) == meta['sha256'][a] for a in ART): return 0
        shutil.rmtree(entry, ignore_errors=True)  # damaged entry: replace it
    tmp = entry.with_name(entry.name + f'.tmp{os.getpid()}'); tmp.mkdir(parents=True, exist_ok=True)
    for a in ART: shutil.copy2(out/a, tmp/a)
    meta = {'sha256': {a: sha(tmp/a) for a in ART}, 'lane': lane, 'out': str(out), 'time': time.strftime('%Y-%m-%dT%H:%M:%S')}
    (tmp/'meta.json').write_text(json.dumps(meta, indent=1) + '\n')
    try: os.rename(tmp, entry)
    except OSError: shutil.rmtree(tmp, ignore_errors=True)  # another lane stored it first
    return 0
if __name__ == '__main__':
    c = sys.argv[1]
    if c == 'key': print(key(*sys.argv[2:5]))
    elif c == 'fetch': sys.exit(fetch(*sys.argv[2:4]))
    elif c == 'store': sys.exit(store(*sys.argv[2:5]))
    else: sys.exit(__doc__)
