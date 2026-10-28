#!/usr/bin/env python3
"""Shared Mayhem build for trees based on WM/mayhem-env/parent-439 (and later parents built the same way).

Why: parent-439 = Codex qualified438 (+ O0077). Its curve-accounts uses historical_anchor_program::declare_program!
and its Cargo.toml has a profile-rustflags remap for anchor-lang, so mayhem-b/build/build_lane.py cannot compile it.
This is the Codex qualified438 recipe (REPO research/mayhem-current438-composition-20261028/builds/first/launch.json):
a root-only rustc compile of mayhem_recovered against the qualified434 dependency rlibs (APFS clone in
tools/cache-q434, hash-pinned in cache-q434.SHA256SUMS), linked via linker.py with the packet's ordered.ld.
Paths are the only change; it reproduces Codex's b69ee99d.../a4e4768d... byte-for-byte on the codex438 tree.

ONLY programs/mayhem/src/** and programs/mayhem/idls/** are compiled. Every other input (Cargo.toml, Cargo.lock,
curve-accounts/**, vendor/**) must equal parent-439's copy (checked; the build refuses otherwise).

usage (always under the slot lock):
  python3 WM/sbf_lock.py --slots 6 --name sbf -- python3 -B WM/mayhem-env/tools/rbuild.py LABEL ROOT
ROOT contains programs/mayhem. Output: WM/mayhem-b/out/builds/LABEL/{candidate.so,symbols.so,stderr,result.json,...}
"""
from pathlib import Path
import hashlib, json, os, shutil, subprocess, sys, time

T = Path('/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work/mayhem-env/tools')
WM = T.parents[1]
label, root = sys.argv[1], Path(sys.argv[2]).resolve()
P = T / 'q438-first'
cache = T / 'cache-q434'
pin = T.parent / 'parent-439/SOURCE-SHA256SUMS'
CW = '/Users/shawwalters/.codex/worktrees/pr-queue-review/pumpfun-source/work/mayhem-priority-20261027'
sdk = WM / 'mayhem-b/build/layout-lane-linux-target2-sysroot'
S = root / 'programs/mayhem'
out = WM / 'mayhem-b/out/builds' / label
sha = lambda p: hashlib.sha256(Path(p).read_bytes()).hexdigest()
inventory = lambda: {p.relative_to(S).as_posix(): sha(p) for p in S.rglob('*') if p.is_file()}
inputs = inventory()
pinned = {l.split('  ', 1)[1][2:]: l.split('  ', 1)[0] for l in pin.read_text().splitlines() if l.strip()}
compiled = lambda n: n.startswith('src/') or n.startswith('idls/')
bad = sorted(n for n in set(pinned) | set(inputs) if not compiled(n) and pinned.get(n) != inputs.get(n))
if bad:
    sys.exit('refusing: non-root inputs differ from parent-439 (not compiled by this recipe): %s' % bad[:8])
out.mkdir(parents=True)
(out / 'root-out').mkdir()
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
if os.environ.get('EMIT_IR') == '1':
    cmd[cmd.index('--emit=dep-info,link')] = '--emit=dep-info,link,llvm-ir'
for i, x in enumerate(cmd):
    if x.startswith('link-arg=-Map='):
        cmd[i] = 'link-arg=-Map=' + str(out / 'link.map')
    if x.startswith('linker='):
        cmd[i] = 'linker=' + str(out / 'linker.py')
assert not any('.codex' in x for x in cmd), [x for x in cmd if '.codex' in x]
for n in ['default.ld', 'ordered.ld']:
    shutil.copyfile(P / n, out / n)
lld = sdk / 'lib/rustlib/aarch64-apple-darwin/bin/rust-lld'
text = (P / 'linker.py').read_text()
old_real = text.split("real=Path('", 1)[1].split("')", 1)[0]
(out / 'linker.py').write_text(text.replace(old_real, str(lld)))
(out / 'linker.py').chmod(0o755)
env = os.environ.copy()
env.update({'RUSTC': str(sdk / 'bin/rustc'), 'RUSTDOC': str(sdk / 'bin/rustdoc'),
            'CARGO_HOME': str(WM / 'mayhem-b/build/cargo-home'), 'RUSTUP_HOME': str(WM / 'mayhem-b/build/rustup'),
            'CARGO_NET_OFFLINE': 'true', 'CC': '/Users/shawwalters/.cache/solana/v1.54/platform-tools/llvm/bin/clang',
            'AR': '/Users/shawwalters/.cache/solana/v1.54/platform-tools/llvm/bin/llvm-ar',
            'CARGO_TARGET_SBPF_SOLANA_SOLANA_RUSTFLAGS': '-Zremap-cwd-prefix='})
env.update({k: fix(v) for k, v in launch['environment'].items()})
env['CARGO_TARGET_DIR'] = str(cache / 'fast-amm-qualified434-20261027')
assert not any('.codex' in env[k] for k in launch['environment']), 'env path'
pinned_cache = {l.split('  ', 1)[1]: l.split('  ', 1)[0] for l in (T / 'cache-q434.SHA256SUMS').read_text().splitlines() if l}
used = [x.split('=', 1)[1] for x in cmd if x.startswith(('anchor_lang=', 'anchor_spl=', 'curve_accounts='))]
for u in used:
    assert pinned_cache['./' + str(Path(u).relative_to(cache))] == sha(u), u
tools = {str(p): sha(p) for p in [sdk / 'bin/rustc', lld, out / 'ordered.ld', out / 'default.ld']}
record = dict(command=cmd, cwd=str(S), source_inputs=inputs, environment={k: env[k] for k in launch['environment']},
              controller_sha256=sha(Path(__file__)), packet_launch_sha256=sha(P / 'launch.json'), tools=tools,
              scope='mg-M-int shared replica of Codex qualified438 builds/first root recipe (paths only differ)')
(out / 'launch.json').write_text(json.dumps(record, indent=2) + '\n')
start = time.monotonic()
with (out / 'stdout').open('wb') as so, (out / 'stderr').open('wb') as se:
    r = subprocess.run(cmd, cwd=S, env=env, stdout=so, stderr=se)
res = dict(returncode=r.returncode, seconds=time.monotonic() - start, source_unchanged=inventory() == inputs,
           archives_unchanged=all(pinned_cache['./' + str(Path(u).relative_to(cache))] == sha(u) for u in used),
           tools_unchanged=all(sha(p) == h for p, h in tools.items()),
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
