#!/usr/bin/env python3
"""Lane mg-M-int replica of the Codex qualified438 root recipe.

Source of the recipe: REPO research/mayhem-current438-composition-20261028/builds/first/launch.json
(root-only rustc compile of mayhem_recovered against the qualified434 dependency rlibs, linked through
linker.py, which swaps the target's default.ld for the packet's ordered.ld).

Differences from Codex's controllers/build.py: paths only.
  * rustc / rust-lld come from WM/mayhem-b/build/layout-lane-linux-target2-sysroot (2354 files byte-identical
    to Codex's layout-lane-linux-target2-sysroot, checked 01:55).
  * the dependency rlibs come from an APFS clone of Codex's parallel-targets/fast-amm-qualified434-20261027 and
    historical-native-macro-a/target/release/deps under mg-M-int/cache (hashes checked before and after).
Run under the shared slot lock:
  python3 WM/sbf_lock.py --slots 6 --name sbf -- python3 -B crecipe.py LABEL SOURCE_ROOT [PACKET_BUILD_DIR]
SOURCE_ROOT contains programs/mayhem (67 files). Output: mg-M-int/builds/LABEL.
"""
from pathlib import Path
import hashlib, json, os, shutil, subprocess, sys, time

T = Path(__file__).resolve().parent
W = T.parent
WM = W.parents[1]
label, root = sys.argv[1], Path(sys.argv[2]).resolve()
P = Path(sys.argv[3]).resolve() if len(sys.argv) > 3 else W / 'codex438/builds/first'
CW = '/Users/shawwalters/.codex/worktrees/pr-queue-review/pumpfun-source/work/mayhem-priority-20261027'
sdk = WM / 'mayhem-b/build/layout-lane-linux-target2-sysroot'
cache = Path(os.environ.get('CRECIPE_CACHE', str(W / 'cache'))).resolve()
S = root / 'programs/mayhem'
out = W / 'builds' / label
out.mkdir(parents=True)
(out / 'root-out').mkdir()
sha = lambda p: hashlib.sha256(Path(p).read_bytes()).hexdigest()
inventory = lambda: {p.relative_to(S).as_posix(): sha(p) for p in S.rglob('*') if p.is_file()}
inputs = inventory()
assert len(inputs) == 67, len(inputs)
launch = json.loads((P / 'launch.json').read_bytes())
oldS = launch['cwd']
oldout = str(Path(launch['command'][launch['command'].index('--out-dir') + 1]).parent)
repl = [(oldS, str(S)), (oldout, str(out)), (CW + '/layout-lane-linux-target2-sysroot', str(sdk)),
        (CW + '/parallel-targets/fast-amm-qualified434-20261027', str(cache / 'fast-amm-qualified434-20261027')),
        (CW + '/historical-native-macro-a', str(cache / 'historical-native-macro-a')),
        (CW + '/cargo-home', str(WM / 'mayhem-b/build/cargo-home'))]


def fix(x):
    for a, b in repl:
        x = x.replace(a, b)
    return x


cmd = [fix(x) for x in launch['command']]
cmd[cmd.index('--out-dir') + 1] = str(out / 'root-out')
for i, x in enumerate(cmd):
    if x.startswith('link-arg=-Map='):
        cmd[i] = 'link-arg=-Map=' + str(out / 'link.map')
    if x.startswith('linker='):
        cmd[i] = 'linker=' + str(out / 'linker.py')
assert not any('.codex' in x for x in cmd), [x for x in cmd if '.codex' in x]
shutil.copyfile(P / 'default.ld', out / 'default.ld')
# MGRAW_ORDERED: generated link script (mg-M-raw gen_ordered.py) replacing the qualified438 ordered.ld
shutil.copyfile(os.environ.get('MGRAW_ORDERED', str(P / 'ordered.ld')), out / 'ordered.ld')
lld = sdk / 'lib/rustlib/aarch64-apple-darwin/bin/rust-lld'
text = (P / 'linker.py').read_text()
old_real = text.split("real=Path('", 1)[1].split("')", 1)[0]
assert old_real == CW + '/layout-lane-linux-target2-sysroot/lib/rustlib/aarch64-apple-darwin/bin/rust-lld'
(out / 'linker.py').write_text(text.replace(old_real, str(lld)))
(out / 'linker.py').chmod(0o755)
env = os.environ.copy()
env.update({'RUSTC': str(sdk / 'bin/rustc'), 'RUSTDOC': str(sdk / 'bin/rustdoc'),
            'CARGO_HOME': str(WM / 'mayhem-b/build/cargo-home'), 'CARGO_TARGET_DIR': str(cache / 'fast-amm-qualified434-20261027'),
            'RUSTUP_HOME': str(WM / 'mayhem-b/build/rustup'), 'CARGO_NET_OFFLINE': 'true',
            'CC': '/Users/shawwalters/.cache/solana/v1.54/platform-tools/llvm/bin/clang',
            'AR': '/Users/shawwalters/.cache/solana/v1.54/platform-tools/llvm/bin/llvm-ar',
            'CARGO_TARGET_SBPF_SOLANA_SOLANA_RUSTFLAGS': '-Zremap-cwd-prefix='})
env.update({k: fix(v) for k, v in launch['environment'].items()})
env['CARGO_TARGET_DIR'] = str(cache / 'fast-amm-qualified434-20261027')
assert not any('.codex' in v for k, v in env.items() if k in launch['environment']), 'env path'
deps = lambda: {str(p.relative_to(cache)): sha(p) for p in cache.rglob('*') if p.suffix in ('.rlib', '.rmeta', '.dylib') and p.is_file()}
before = deps()
tools = {str(p): sha(p) for p in [sdk / 'bin/rustc', lld, out / 'ordered.ld', out / 'default.ld']}
record = dict(command=cmd, cwd=str(S), source_inputs=inputs, environment={k: env[k] for k in launch['environment']},
              controller_sha256=sha(Path(__file__)), packet_launch_sha256=sha(P / 'launch.json'),
              packet_linker_sha256=sha(P / 'linker.py'), tools=tools, dependency_archives=len(before),
              scope='mg-M-int replica of Codex qualified438 builds/first root recipe (paths only differ)')
(out / 'launch.json').write_text(json.dumps(record, indent=2) + '\n')
start = time.monotonic()
with (out / 'stdout').open('wb') as so, (out / 'stderr').open('wb') as se:
    r = subprocess.run(cmd, cwd=S, env=env, stdout=so, stderr=se)
res = dict(returncode=r.returncode, seconds=time.monotonic() - start, source_unchanged=inventory() == inputs,
           archives_unchanged=before == deps(), tools_unchanged=all(sha(p) == h for p, h in tools.items()),
           stack_offset_warnings=(out / 'stderr').read_bytes().count(b'Stack offset'))
if r.returncode == 0:
    shutil.copyfile(out / 'root-out/mayhem_recovered.so', out / 'symbols.so')
    subprocess.run(['/Users/shawwalters/.cache/solana/v1.52/platform-tools/llvm/bin/llvm-objcopy', '--strip-all',
                    str(out / 'symbols.so'), str(out / 'candidate.so')], check=True)
    res.update(candidate_sha256=sha(out / 'candidate.so'), symbols_sha256=sha(out / 'symbols.so'),
               candidate_bytes=(out / 'candidate.so').stat().st_size)
(out / 'result.json').write_text(json.dumps(res, indent=2) + '\n')
print(json.dumps(res, indent=2))
assert r.returncode == 0 and res['source_unchanged'] and res['archives_unchanged'] and res['tools_unchanged']
