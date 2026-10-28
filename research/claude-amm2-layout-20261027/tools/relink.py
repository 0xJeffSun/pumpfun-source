#!/usr/bin/env python3
"""Repeat a captured rust-lld link natively with a chosen linker script (iteration aid).

Inputs are the link kit written by link-wrapper.sh during a real build: the
effective argument list, the transient root objects / symbols.o / version
script, and the unchanged dependency rlibs in the lane target cache. Container
paths are mapped to the lane copies; every other argument is forwarded
unchanged. Only the `--script` operand, `-o` and `-Map=` differ. The result is
a diagnostic artifact; adopted layouts are always rebuilt with build_linux.py.
"""
import argparse, hashlib, json, re, subprocess, sys
from pathlib import Path

TARGET_C = '/Users/shawwalters/Documents/Codex/2026-10-24/pumpfun-source/work/amm-workspace-current-20261027/target'
DEFAULT_LLD = Path.home() / '.cache/solana/v1.44/platform-tools/rust/lib/rustlib/aarch64-apple-darwin/bin/rust-lld'


def sha(p):
    return hashlib.sha256(Path(p).read_bytes()).hexdigest()


def relink(kit, script, output, target_cache, mapfile=None, lld=DEFAULT_LLD, strip=True):
    kit = Path(kit)
    args = (kit / 'effective-args.txt').read_text().split('\n')
    assert args[-1] == ''
    args = args[:-1]
    out = []
    inputs = {p.name: p for p in (kit / 'inputs').iterdir()}
    i = 0
    seen_script = 0
    while i < len(args):
        a = args[i]
        if a in ('--script', '-T'):
            out += [a, str(script)]
            seen_script += 1
            i += 2
            continue
        if a == '-o':
            out += ['-o', str(output)]
            i += 2
            continue
        if a.startswith('-Map='):
            if mapfile:
                out.append('-Map=' + str(mapfile))
            i += 1
            continue
        if a.startswith('--version-script='):
            out.append('--version-script=' + str(inputs['version-script']))
        elif re.fullmatch(r'/tmp/rustc[^/]+/symbols\.o', a):
            out.append(str(inputs['symbols.o']))
        elif a.endswith('.o') and Path(a).name in inputs:
            out.append(str(inputs[Path(a).name]))
        elif a.startswith(TARGET_C):
            out.append(str(target_cache) + a[len(TARGET_C):])
        else:
            assert not a.startswith('/tmp/'), a
            out.append(a)
        i += 1
    assert seen_script == 1
    r = subprocess.run([str(lld)] + out, capture_output=True, text=True)
    if r.returncode:
        sys.stderr.write(r.stderr)
        raise SystemExit('relink failed')
    result = {'unstripped_sha256': sha(output)}
    if strip:
        objcopy = Path.home() / '.cache/solana/v1.52/platform-tools/llvm/bin/llvm-objcopy'
        stripped = Path(str(output) + '.stripped')
        subprocess.run([str(objcopy), '--strip-all', str(output), str(stripped)], check=True)
        result['candidate'] = str(stripped)
        result['candidate_sha256'] = sha(stripped)
    return result


def main():
    p = argparse.ArgumentParser(description=__doc__)
    p.add_argument('--kit', type=Path, required=True)
    p.add_argument('--script', type=Path, required=True)
    p.add_argument('--output', type=Path, required=True)
    p.add_argument('--target-cache', type=Path, required=True)
    p.add_argument('--map', type=Path)
    p.add_argument('--lld', type=Path, default=DEFAULT_LLD)
    a = p.parse_args()
    print(json.dumps(relink(a.kit, a.script.resolve(), a.output.resolve(), a.target_cache.resolve(), a.map, a.lld), indent=2))


if __name__ == '__main__':
    main()
