#!/usr/bin/env python3
"""Direct root-crate rustc invocation (no cargo): the exact program/args/env/cwd cargo would use, from cargo's build plan.

  rustc_replay.py plan <lane> <staged ws> <cmd.json> [--exact] [--target-dir DIR]
      `cargo build --build-plan -Z unstable-options` for the staged workspace with native_build.sh's environment (no
      compilation, no lock needed); stores the pump-amm-recovered invocation (program, args, env, cwd).
  rustc_replay.py run <cmd.json> --ws <staged ws> --out-dir <dir> [--emit LIST] [--extra ARG ...] [--lock]
      Run that invocation for another staged workspace (the recorded ws path in cwd/env/args is replaced; the build cwd is
      the workspace root and -Zremap-cwd-prefix= strips it). Outputs go to --out-dir (dependencies still come from the
      warm target cache named in -L/--extern). --emit replaces the emit list (llvm-ir: IR only, for fnllc.py;
      llvm-ir,link: both). --lock takes one sbf slot. The link output is <out-dir>/pump_amm_recovered.so.
The dependency artifacts named by --extern must exist (run one normal native_build.sh first to warm the target dir).
"""
import argparse, json, os, subprocess, sys, time
from pathlib import Path
SP = Path('/private/tmp/claude-501/-Users-shawwalters-Documents-Codex-2026-10-24-pumpfun-source/d810a7ff-a81e-46b2-bacd-4cd9cadc52cb/scratchpad')
def plan(a):
    L = SP/'lanes'/a.lane; ws = Path(a.ws).resolve()
    if a.exact:
        tc = Path(os.environ.get('XTOOLCHAIN', SP/'shared/toolchain/v144x')); rustc = tc/'bin/rustc'; cargo = tc/'rust/bin/cargo'
        tgt = a.target_dir or str(L/'target/xnative')
    else:
        tc = Path.home()/'.cache/solana/v1.44/platform-tools'; rustc = tc/'rust/bin/rustc'; cargo = tc/'rust/bin/cargo'
        tgt = a.target_dir or str(L/'target/native')
    env = {k: v for k, v in os.environ.items() if k not in ('RUSTFLAGS', 'CARGO_ENCODED_RUSTFLAGS', 'RUSTC_WRAPPER', 'RUSTC_WORKSPACE_WRAPPER')}
    # `cargo --build-plan` DELETES the .rlib of every unit it plans that also has an .rmeta output (cargo's "rustc prefers a stale
    # rlib" guard runs although nothing is compiled). Plan inside a throwaway APFS clone and point the paths back at the real dir.
    tmp = Path(str(tgt) + f'.plan{os.getpid()}')
    if Path(tgt).exists():
        subprocess.run(['cp', '-c', '-R', str(tgt), str(tmp)], check=True)
    env.update(CARGO_HOME=str(L/'cargo-home'), CARGO_TARGET_DIR=str(tmp), RUSTC=str(rustc), CARGO_TARGET_SBPF_SOLANA_SOLANA_RUSTFLAGS=' -Zremap-cwd-prefix=')
    try:
        r = subprocess.run([str(cargo), 'build', '--release', '--target', 'sbpf-solana-solana', '--manifest-path', str(ws/'Cargo.toml'),
                            '--locked', '--offline', '--build-plan', '-Z', 'unstable-options'], cwd=ws, env=env, capture_output=True, text=True)
    finally:
        subprocess.run(['rm', '-rf', str(tmp)])
    if r.returncode: sys.exit(r.stderr[-2000:])
    inv = [i for i in json.loads(r.stdout.replace(str(tmp), str(tgt)))['invocations'] if i['package_name'] == 'pump-amm-recovered']
    i = inv[-1]
    Path(a.cmd).write_text(json.dumps({'program': i['program'], 'args': i['args'], 'env': i['env'], 'cwd': i['cwd'], 'ws': str(ws),
                                       'target_dir': str(tgt)}, indent=1) + '\n')
    md = [x for x in i['args'] if x.startswith('metadata=')]
    print(f"recorded root invocation: {len(i['args'])} args, {len(i['env'])} env vars, {md}")
def run(a):
    c = json.loads(Path(a.cmd).read_text())
    ws = str(Path(a.ws).resolve()); od = Path(a.out_dir).resolve(); od.mkdir(parents=True, exist_ok=True)
    sub = lambda s: s.replace(c['ws'], ws)
    args = [sub(x) for x in c['args']]
    j = args.index('--out-dir'); args[j + 1] = str(od)
    if a.emit:
        args = [x for x in args if not x.startswith('--emit=')] + ['--emit=' + a.emit]
    args += a.extra
    env = {k: v for k, v in os.environ.items() if k not in ('RUSTFLAGS', 'CARGO_ENCODED_RUSTFLAGS', 'RUSTC_WRAPPER', 'RUSTC_WORKSPACE_WRAPPER')}
    env.update({k: sub(v) for k, v in c['env'].items()})
    pre = ['python3', str(SP/'shared/sbf_lock.py'), '--slots', '6', '--name', 'sbf', '--'] if a.lock else []
    t = time.monotonic()
    r = subprocess.run(pre + [c['program']] + args, cwd=sub(c['cwd']), env=env)
    print(f'rustc rc={r.returncode} {time.monotonic() - t:.1f}s', file=sys.stderr)
    sys.exit(r.returncode)
def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    sp = ap.add_subparsers(dest='sub', required=True)
    p = sp.add_parser('plan'); p.add_argument('lane'); p.add_argument('ws'); p.add_argument('cmd'); p.add_argument('--exact', action='store_true'); p.add_argument('--target-dir')
    p = sp.add_parser('run'); p.add_argument('cmd'); p.add_argument('--ws', required=True); p.add_argument('--out-dir', required=True)
    p.add_argument('--emit'); p.add_argument('--extra', action='append', default=[]); p.add_argument('--lock', action='store_true')
    a = ap.parse_args()
    plan(a) if a.sub == 'plan' else run(a)
if __name__ == '__main__':
    main()
