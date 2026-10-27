#!/usr/bin/env python3
"""Measure an isolated workspace layout using pinned direct SBF Cargo."""
import argparse
import hashlib
import json
import os
from pathlib import Path
import subprocess
import sys

ROOT = Path(__file__).resolve().parents[3]
sys.path.insert(0, str(ROOT / 'scripts'))
from build_source_manifest import source_manifest
from compare import compare


def sha(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def main():
    p = argparse.ArgumentParser(description=__doc__)
    p.add_argument('--source', type=Path, required=True)
    p.add_argument('--output', type=Path, required=True)
    p.add_argument('--cargo-home', type=Path, required=True)
    args = p.parse_args()
    source, out = args.source.resolve(), args.output.resolve()
    out.mkdir(parents=True, exist_ok=False)
    crate = source / 'programs/pump-amm'
    compiler = Path.home() / '.cache/solana/v1.44/platform-tools'
    strip = Path.home() / '.cache/solana/v1.52/platform-tools/llvm/bin/llvm-objcopy'
    inputs = lambda: source_manifest(crate, source, ROOT, [crate / 'vendor/solana-pubkey'], cwd=ROOT)
    before = inputs()
    env = os.environ.copy()
    env.update(CARGO_HOME=str(args.cargo_home.resolve()), CARGO_TARGET_DIR=str(out / 'target'),
        RUSTC=str(compiler / 'rust/bin/rustc'), RUSTDOC=str(compiler / 'rust/bin/rustdoc'),
        CC=str(compiler / 'llvm/bin/clang'), AR=str(compiler / 'llvm/bin/llvm-ar'),
        CARGO_TARGET_SBF_SOLANA_SOLANA_RUSTFLAGS=' -Zremap-cwd-prefix=')
    env.pop('RUSTFLAGS', None)
    command = [str(compiler / 'rust/bin/cargo'), 'build', '--release', '--target',
               'sbf-solana-solana', '--manifest-path', str(source / 'Cargo.toml'), '--locked', '--offline']
    record = {'scope': __doc__, 'program': 'pump_amm', 'command': command,
        'cwd': str(source), 'source_sha256': before, 'selected_toolchain': 'v1.44',
        'environment': {key: env[key] for key in ('CARGO_HOME', 'CARGO_TARGET_DIR', 'RUSTC', 'RUSTDOC', 'CC', 'AR', 'CARGO_TARGET_SBF_SOLANA_SOLANA_RUSTFLAGS')},
        'tool_sha256': {str(path): sha(path) for path in (compiler / 'rust/bin/cargo', compiler / 'rust/bin/rustc', compiler / 'llvm/bin/ld.lld', strip)},
        'rustc_version': subprocess.check_output([str(compiler / 'rust/bin/rustc'), '--version', '--verbose'], text=True)}
    def save():
        (out / 'build-attempt.json').write_text(json.dumps(record, indent=2) + '\n')
    save()
    with (out / 'build.log').open('w') as log:
        run = subprocess.run(command, cwd=source, env=env, stdout=log, stderr=subprocess.STDOUT)
    record.update(returncode=run.returncode, source_after_sha256=inputs(), build_log_sha256=sha(out / 'build.log'))
    record['source_unchanged'] = before == record['source_after_sha256']
    save()
    run.check_returncode()
    assert record['source_unchanged']
    unstripped = out / 'target/sbf-solana-solana/release/pump_amm_recovered.so'
    artifacts = out / 'artifacts'
    artifacts.mkdir()
    candidate = artifacts / 'pump_amm_recovered.so'
    strip_command = [str(strip), '--strip-all', str(unstripped), str(candidate)]
    subprocess.run(strip_command, check=True)
    record.update(strip_command=strip_command, unstripped_sha256=sha(unstripped),
        comparison=compare((ROOT / 'evidence/original/pump_amm/deployed.so').read_bytes(), candidate.read_bytes()))
    save()
    (out / 'build-comparison.json').write_text(json.dumps(record, indent=2) + '\n')
    print(json.dumps(record['comparison'], indent=2))


if __name__ == '__main__':
    main()
