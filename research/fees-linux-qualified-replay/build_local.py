"""Native Linux control builds; originals are never compiler or linker inputs."""
import fcntl
import hashlib
import json
import os
from pathlib import Path
import shutil
import subprocess
import sys
import time

W = Path(__file__).resolve().parent
SDK = Path('/dev/shm/fees-585-sdk/tools')
SOURCE = W / 'qualified-source'
TARGET = Path('/dev/shm/fees-585-sdk/target')

def sha(path):
    with path.open('rb') as stream:
        return hashlib.file_digest(stream, 'sha256').hexdigest()

def inputs(root):
    return {p.relative_to(root).as_posix(): sha(p)
            for p in sorted(root.rglob('*')) if p.is_file()}

def main(label):
    out = W / 'builds' / label
    out.mkdir(parents=True, exist_ok=False)
    before = inputs(SOURCE)
    vendor = Path('/dev/shm/fees-585-sdk/vendor/used-public')
    vb = inputs(vendor)
    toolpaths = [SDK / 'rust/bin/rustc', SDK / 'rust/bin/cargo',
                 SDK / 'rust/lib/librustc_driver.so',
                 SDK / 'rust/lib/rustlib/x86_64-unknown-linux-gnu/bin/rust-lld']
    toolpaths += list((SDK / 'rust/lib/rustlib/sbpf-solana-solana/lib').glob('*'))
    tools = {str(p): sha(p) for p in toolpaths if p.is_file()}
    env = os.environ.copy()
    overrides = dict(RUSTC_BOOTSTRAP='1', PATH=str(SDK / 'rust/bin') + ':' + env['PATH'],
        RUSTC=str(SDK / 'rust/bin/rustc'), RUSTDOC=str(SDK / 'rust/bin/rustdoc'),
        CC=str(SDK / 'llvm/bin/clang'), AR=str(SDK / 'llvm/bin/llvm-ar'),
        CARGO_HOME='/dev/shm/fees-585-sdk/cargo-home', CARGO_TARGET_DIR=str(TARGET),
        CARGO_BUILD_JOBS='1', CARGO_NET_OFFLINE='true', RUSTFLAGS='-Zremap-cwd-prefix=')
    env.update(overrides)
    command = [str(SDK / 'rust/bin/cargo'), 'rustc', '--verbose', '--manifest-path',
        '/work/next650/sweep-qualified/programs/pump-fees/Cargo.toml', '--release',
        '--target', 'sbpf-solana-solana', '--locked', '--offline', '--jobs', '1', '--lib', '--',
        '--remap-path-prefix=/work/next650/sweep-qualified/programs/pump-fees/src/../../../pump-fees-math/=pump-fees-math/',
        '--remap-path-prefix=/work/next650/sweep-qualified/pump-fees-math/=pump-fees-math/',
        '--remap-path-prefix=programs/pump-fees/src/../../../pump-fees-math/=pump-fees-math/',
        '-C', 'link-arg=-Map=' + str(out / 'link.map'),
        '-C', 'linker=/work/next650/sweep-qualified/linker.sh']
    (out / 'launch.json').write_text(json.dumps(dict(command=command, cwd=str(SOURCE),
        environment=overrides, source_inputs=before, vendor_inputs=vb,
        toolchain_inputs=tools), indent=2) + '\n')
    with (W / 'native-target.lock').open('a') as lock:
        fcntl.flock(lock, fcntl.LOCK_EX)
        start = time.monotonic()
        with (out / 'build.log').open('wb') as log:
            result = subprocess.run(command, cwd=SOURCE, env=env, stdout=log, stderr=subprocess.STDOUT)
        receipt = dict(exit_code=result.returncode, seconds=time.monotonic() - start,
            source_unchanged=before == inputs(SOURCE), vendor_unchanged=vb == inputs(vendor),
            toolchain_unchanged=tools == {p: sha(Path(p)) for p in tools}, log_sha256=sha(out/'build.log'))
        if result.returncode == 0:
            shutil.copyfile(TARGET / 'sbpf-solana-solana/release/pump_fees_candidate.so', out/'symbols.so')
            subprocess.run([str(SDK/'llvm/bin/llvm-objcopy'), '--strip-all', str(out/'symbols.so'),
                            str(out/'candidate.so')], check=True)
            receipt.update(symbols_sha256=sha(out/'symbols.so'), candidate_sha256=sha(out/'candidate.so'))
        (out/'result.json').write_text(json.dumps(receipt, indent=2)+'\n')
        print(json.dumps(receipt), flush=True)
        if result.returncode:
            print((out/'build.log').read_text()[-6000:])
        return result.returncode

if __name__ == '__main__':
    sys.exit(main(sys.argv[1]))
