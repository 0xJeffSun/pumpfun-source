#!/usr/bin/env python3
"""Fresh Linux diagnostic build, not a byte-identical or runtime-qualified selection."""
import argparse
import hashlib
import json
import os
from pathlib import Path
import shutil
import subprocess
import tarfile
import time

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[1]
ARCHIVE_SHA = 'fcc41631c7f77561bf5412218bf297501dccf0305ea280f338f0ace2aab9f31e'
BASE = ROOT / 'research/mayhem-amm-handler-shape-controls-20261027'


def sha(path):
    with path.open('rb') as stream:
        return hashlib.file_digest(stream, 'sha256').hexdigest()


def write(path, value):
    path.write_text(json.dumps(value, indent=2) + '\n')


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--toolchain-archive', type=Path, required=True,
                        help='official v1.54 platform-tools-linux-x86_64.tar.bz2')
    parser.add_argument('--output', type=Path, required=True, help='must not exist')
    parser.add_argument('--control', choices=sorted(p.name for p in (HERE / 'controls').iterdir()), default='baseline')
    args = parser.parse_args()
    archive = args.toolchain_archive.resolve()
    if sha(archive) != ARCHIVE_SHA:
        raise ValueError('official tool archive hash differs')
    work = args.output.resolve()
    work.mkdir(parents=True, exist_ok=False)
    tools = work / 'toolchain'
    tools.mkdir()
    with tarfile.open(archive, 'r:bz2') as tar:
        tar.extractall(tools, filter='data')
    source = work / 'source'
    source.mkdir()
    with tarfile.open(BASE / 'base-source.tar.gz', 'r:gz') as tar:
        tar.extractall(source, filter='data')
    expected = json.loads((BASE / 'base-source-inputs.json').read_text())
    def source_hashes():
        return {p.relative_to(source).as_posix(): sha(p) for p in source.rglob('*') if p.is_file()}
    if source_hashes() != expected or len(expected) != 67:
        raise ValueError('67-file source differs')
    changed = source / 'src/instructions/fee_recipients.rs'
    changed.write_bytes((HERE / 'controls' / args.control / 'fee_recipients.rs').read_bytes())
    expected['src/instructions/fee_recipients.rs'] = sha(changed)
    receipt = work / 'build'
    receipt.mkdir()
    names = ['rust/bin/rustc', 'rust/bin/cargo', 'llvm/bin/clang', 'llvm/bin/llvm-ar',
             'llvm/bin/llvm-objcopy', 'rust/lib/rustlib/x86_64-unknown-linux-gnu/bin/rust-lld']
    tool_hashes = {name: sha(tools / name) for name in names}
    env = os.environ.copy()
    overrides = {'RUSTC_BOOTSTRAP': '1', 'CARGO_HOME': str(work / 'cargo-home'),
                 'RUSTC': str(tools / 'rust/bin/rustc'), 'RUSTDOC': str(tools / 'rust/bin/rustdoc'),
                 'CARGO_TARGET_DIR': str(work / 'target'), 'CC': str(tools / 'llvm/bin/clang'),
                 'AR': str(tools / 'llvm/bin/llvm-ar'),
                 'CARGO_TARGET_SBPF_SOLANA_SOLANA_RUSTFLAGS': '-Zremap-cwd-prefix='}
    env.update(overrides)
    cargo = str(tools / 'rust/bin/cargo')
    fetch = [cargo, 'fetch', '--locked', '--manifest-path', str(source / 'Cargo.toml')]
    command = [cargo, 'rustc', '--manifest-path', str(source / 'Cargo.toml'), '--release',
               '--target', 'sbpf-solana-solana', '--locked', '--offline', '--verbose', '--jobs', '4',
               '--', '--remap-path-prefix=src/=programs/mayhem-program/src/',
               '--remap-path-prefix=src/account_wrapper.rs=src/account_wrapper.rs']
    write(receipt / 'launch.json', {'command': command, 'fetch_command': fetch,
          'cwd': str(source), 'environment_overrides': overrides, 'source_inputs': expected,
          'tool_archive_sha256': ARCHIVE_SHA, 'tool_inputs': tool_hashes})
    for name, cmd in [('fetch', fetch), ('compile', command)]:
        start = time.monotonic()
        with (receipt / (name + '.stdout')).open('wb') as out, (receipt / (name + '.stderr')).open('wb') as err:
            result = subprocess.run(cmd, cwd=source, env=env, stdout=out, stderr=err)
        write(receipt / (name + '.result.json'), {'returncode': result.returncode, 'seconds': time.monotonic()-start})
        result.check_returncode()
    if source_hashes() != expected or any(sha(tools / name) != digest for name, digest in tool_hashes.items()):
        raise ValueError('source or checked tools changed')
    symbols = receipt / 'symbols.so'
    shutil.copyfile(work / 'target/sbpf-solana-solana/release/mayhem_recovered.so', symbols)
    candidate = receipt / 'candidate.so'
    subprocess.run([str(tools / 'llvm/bin/llvm-objcopy'), '--strip-all', str(symbols), str(candidate)], check=True)
    write(receipt / 'artifacts.json', {'symbols_sha256': sha(symbols), 'candidate_sha256': sha(candidate),
          'source_unchanged': True, 'checked_tools_unchanged': True,
          'scope': 'Fresh Linux diagnostic; no historical provenance, runtime qualification or ELF identity claimed'})
    subprocess.run(['python3', '-B', str(HERE / 'inventory.py'), str(symbols), str(work / 'inventory.json')], check=True)


if __name__ == '__main__':
    main()
