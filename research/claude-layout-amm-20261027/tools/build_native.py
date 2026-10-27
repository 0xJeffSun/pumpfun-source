#!/usr/bin/env python3
"""Native macOS iteration build (diagnostic; adopted layouts are rebuilt with build_linux.py).

Compiler: the official macOS platform-tools v1.44 rustc in a lane sysroot whose
`sbpf-solana-solana` target libraries are a byte-identical copy of the
authenticated Linux v1.44 SDK's (so std/core/alloc carry the Linux source
prefix, as in the frontier). Same release profile, `-Zremap-cwd-prefix=`,
`cargo rustc -- -Clinker=<wrapper> -Clink-arg=-Map=…`, `--locked --offline`.
"""
import argparse, hashlib, json, os, shutil, subprocess, sys, time
from pathlib import Path

HERE = Path(__file__).resolve().parent
MAC = Path.home() / '.cache/solana/v1.44/platform-tools'


def sha(p):
    return hashlib.sha256(Path(p).read_bytes()).hexdigest()


def main():
    p = argparse.ArgumentParser(description=__doc__)
    p.add_argument('--source', type=Path, required=True)
    p.add_argument('--output', type=Path, required=True)
    p.add_argument('--toolchain', type=Path, required=True, help='lane sysroot (bin/rustc + Linux sbpf target libs)')
    p.add_argument('--cargo-home', type=Path, required=True)
    p.add_argument('--target-dir', type=Path, required=True)
    p.add_argument('--ordered', type=Path)
    p.add_argument('--jobs', default='6')
    p.add_argument('--lock', type=Path)
    a = p.parse_args()
    source, out, tc = a.source.resolve(), a.output.resolve(), a.toolchain.resolve()
    target = a.target_dir.resolve()
    out.mkdir(parents=True, exist_ok=False)
    rustc = tc / 'bin/rustc'
    sysroot = subprocess.check_output([str(rustc), '--print', 'sysroot'], text=True).strip()
    assert Path(sysroot).resolve() == tc, sysroot
    real = tc / 'lib/rustlib/aarch64-apple-darwin/bin/rust-lld'
    ordered = ''
    if a.ordered:
        shutil.copyfile(a.ordered, out / 'ordered.ld')
        ordered = str(out / 'ordered.ld')
    kit = out / 'link'
    wrapper = out / 'link-wrapper.sh'
    wrapper.write_text((HERE / 'link-wrapper.sh.in').read_text().replace('@REAL@', str(real))
                       .replace('@ORDERED@', ordered).replace('@KIT@', str(kit)))
    wrapper.chmod(0o755)
    rel = target / 'sbpf-solana-solana/release'
    for pattern in ['.fingerprint/pump-amm-recovered-*', 'deps/libpump_amm_recovered*', 'deps/pump_amm_recovered*',
                    'libpump_amm_recovered*', 'pump_amm_recovered*']:
        for f in sorted(rel.glob(pattern)):
            shutil.rmtree(f) if f.is_dir() else f.unlink()
    env = {k: v for k, v in os.environ.items() if k not in ('RUSTFLAGS', 'CARGO_ENCODED_RUSTFLAGS', 'RUSTUP_TOOLCHAIN')}
    over = {'CARGO_HOME': str(a.cargo_home.resolve()), 'CARGO_TARGET_DIR': str(target), 'RUSTC': str(rustc),
            'RUSTDOC': str(tc / 'bin/rustdoc'), 'CC': str(MAC / 'llvm/bin/clang'), 'AR': str(MAC / 'llvm/bin/llvm-ar'),
            'CARGO_TARGET_SBPF_SOLANA_SOLANA_RUSTFLAGS': ' -Zremap-cwd-prefix=', 'CARGO_BUILD_JOBS': a.jobs,
            'CARGO_NET_OFFLINE': 'true'}
    env.update(over)
    cmd = [str(MAC / 'rust/bin/cargo'), 'rustc', '--release', '--target', 'sbpf-solana-solana',
           '--manifest-path', str(source / 'Cargo.toml'), '-p', 'pump-amm-recovered', '--lib', '--locked', '--offline', '--',
           '-Clinker=' + str(wrapper), '-Clink-arg=-Map=' + str(kit / 'link.map')]
    locked = ([sys.executable, str(a.lock), '--slots', '6', '--name', 'sbf', '--'] if a.lock else []) + cmd
    inputs = lambda: {str(f.relative_to(source)): sha(f) for f in sorted(source.rglob('*')) if f.is_file()}
    before = inputs()
    record = {'scope': __doc__, 'driver_sha256': sha(__file__), 'command': cmd, 'environment': over,
              'sysroot': sysroot, 'rustc_sha256': sha(rustc), 'target_libs': {f.name: sha(f) for f in sorted((tc / 'lib/rustlib/sbpf-solana-solana/lib').iterdir())},
              'source_sha256': before}
    start = time.monotonic()
    with (out / 'build.log').open('w') as log:
        r = subprocess.run(locked, cwd=source, env=env, stdout=log, stderr=subprocess.STDOUT)
    record.update(returncode=r.returncode, seconds=time.monotonic() - start, source_unchanged=inputs() == before)
    (out / 'build-attempt.json').write_text(json.dumps(record, indent=2) + '\n')
    assert r.returncode == 0 and record['source_unchanged']
    art = out / 'artifacts'
    art.mkdir()
    shutil.copy2(rel / 'pump_amm_recovered.so', art / 'unstripped.so')
    strip = Path.home() / '.cache/solana/v1.52/platform-tools/llvm/bin/llvm-objcopy'
    subprocess.run([str(strip), '--strip-all', str(art / 'unstripped.so'), str(art / 'candidate.so')], check=True)
    record.update(unstripped_sha256=sha(art / 'unstripped.so'), candidate_sha256=sha(art / 'candidate.so'))
    (out / 'build-attempt.json').write_text(json.dumps(record, indent=2) + '\n')
    print(json.dumps({k: record[k] for k in ('returncode', 'seconds', 'unstripped_sha256', 'candidate_sha256')}, indent=2))


if __name__ == '__main__':
    main()
