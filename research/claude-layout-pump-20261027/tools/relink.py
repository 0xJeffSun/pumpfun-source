#!/usr/bin/env python3
"""Repeat a recorded root link (build.py --output DIR) with another linker script.

Used for fast layout trials. It re-runs the same rust-lld with the same
recorded arguments and the same compiler-produced object inputs (copies taken
by linker.py and hash-checked against its record), with the script and output
paths substituted. Archives (.rlib) are read from the build's target
directory and the SDK sysroot. Their sha256 are recorded in relink.json, and
when the build record lists archive hashes (linker.py records them since the
Round25 packet) they must be equal. Results used as round evidence were
compared with real build.py compilations wherever both ran.
"""
import sys
sys.dont_write_bytecode = True  # keep the packet free of __pycache__
import argparse
import hashlib
import json
import subprocess
from pathlib import Path

import layout_script

HERE = Path(__file__).resolve().parent
sha = lambda p: hashlib.sha256(Path(p).read_bytes()).hexdigest()


def relink(build_dir, script, out_dir, objcopy):
    build_dir, out_dir = Path(build_dir).resolve(), Path(out_dir).resolve()
    inv = json.loads((build_dir / 'link/linker-invocation.json').read_text())
    if script:
        layout_script.check_script((HERE / 'default.ld').read_text(), Path(script).read_text())
    out_dir.mkdir(parents=True, exist_ok=True)
    args, subs = [], 0
    incoming = inv['incoming']
    i = 0
    while i < len(incoming):
        a = incoming[i]
        if a in ('--script', '-T'):
            args += [a, str(Path(script).resolve()) if script else str(build_dir / 'link/default.ld')]
            i += 2
            subs += 1
            continue
        if a == '-o':
            args += ['-o', str(out_dir / 'unstripped.so')]
            i += 2
            continue
        if a.startswith('--version-script='):
            p = a.split('=', 1)[1]
            a = '--version-script=' + inv['object_inputs'][p]['copy']
        elif a in inv['object_inputs']:
            a = inv['object_inputs'][a]['copy']
        args.append(a)
        i += 1
    assert subs == 1
    for path, rec in inv['object_inputs'].items():
        assert sha(rec['copy']) == rec['sha256'], path
    archives = {a: sha(a) for a in args if a.endswith('.rlib')}
    for a, digest in inv.get('archive_sha256', {}).items():
        assert archives.get(a) == digest, ('archive changed since the build', a)
    args.append('-Map=' + str(out_dir / 'link.map'))
    real = inv['real_linker']
    assert sha(real) == inv['real_linker_sha256']
    r = subprocess.run([real, *args], capture_output=True, text=True)
    (out_dir / 'relink.log').write_text(r.stdout + r.stderr)
    r.check_returncode()
    subprocess.run([objcopy, '--strip-all', str(out_dir / 'unstripped.so'), str(out_dir / 'candidate.so')], check=True)
    record = {'scope': __doc__.split('\n')[0], 'build_dir': str(build_dir), 'script': str(script) if script else None,
              'script_sha256': sha(script) if script else None, 'arguments': [real, *args],
              'archive_sha256': archives, 'archives_checked_against_build': bool(inv.get('archive_sha256')),
              'unstripped_sha256': sha(out_dir / 'unstripped.so'), 'candidate_sha256': sha(out_dir / 'candidate.so')}
    (out_dir / 'relink.json').write_text(json.dumps(record, indent=1) + '\n')
    return record


def main():
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument('--build-dir', type=Path, required=True)
    ap.add_argument('--script', type=Path)
    ap.add_argument('--output', type=Path, required=True)
    ap.add_argument('--objcopy', default=str(Path.home() / '.cache/solana/v1.44/platform-tools/llvm/bin/llvm-objcopy'))
    a = ap.parse_args()
    r = relink(a.build_dir, a.script, a.output, a.objcopy)
    print(json.dumps({k: r[k] for k in ['unstripped_sha256', 'candidate_sha256']}))


if __name__ == '__main__':
    main()
