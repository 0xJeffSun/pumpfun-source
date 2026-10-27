#!/usr/bin/env python3
"""Strict offline Linux v1.44 SBPF build of a frozen AMM workspace with a linker wrapper.

This is the frontier recipe (repro/pump_amm/native-fee-cpi-recovery-20261027/
results/build-driver.py: same image, SDK, Cargo home/target container paths,
environment, release profile, `--locked --offline`) with one addition: the root
crate is compiled through `cargo rustc -- -Clinker=<wrapper> -Clink-arg=-Map=...`.
The wrapper forwards every linker argument unchanged except the SDK linker
script, which is replaced by `--ordered` when given. Without `--ordered` the SDK
script is used and the build is the default-layout control.

The Cargo home and target cache are lane-local copies mounted at the same
container paths the frontier build used, so Cargo fingerprints stay fresh and
no dependency artifact is rebuilt (asserted below). The SDK is mounted read-only.
"""
import argparse, hashlib, json, os, shutil, subprocess, sys, time
from pathlib import Path

IMAGE = 'docker.io/solanafoundation/solana-verifiable-build@sha256:6c73adc767ee7ff212f2532d4695472b12f3d4ac20aea3db22b89d8c614dac50'
EXPECTED = {'rust/bin/rustc': 'c8807b7ebede8578ac5a257ea333780f9d89bd356064fd8184af7e996cb71a97',
            'rust/bin/cargo': 'd28444578306fe5a4f40524331411340123004e9e6556322fcabdbe351fe265d'}
REPO_WORK = '/Users/shawwalters/Documents/Codex/2026-10-24/pumpfun-source/work'
# Container paths used by the frontier build (kept identical for fresh fingerprints).
CARGO_HOME_C = REPO_WORK + '/amm-pubkey-provenance-final-20261027/cargo-home'
TARGET_C = REPO_WORK + '/amm-workspace-current-20261027/target'
SDK_DEFAULT = REPO_WORK + '/amm-linux-v144-20261027/sdk'
HERE = Path(__file__).resolve().parent


def sha(p):
    return hashlib.sha256(Path(p).read_bytes()).hexdigest()


def main():
    p = argparse.ArgumentParser(description=__doc__)
    p.add_argument('--source', type=Path, required=True, help='workspace root (Cargo.toml with [workspace])')
    p.add_argument('--output', type=Path, required=True)
    p.add_argument('--cargo-home', type=Path, required=True, help='lane copy of the frontier Cargo home')
    p.add_argument('--target-cache', type=Path, required=True, help='lane copy of the frontier target cache')
    p.add_argument('--sdk', type=Path, default=Path(SDK_DEFAULT))
    p.add_argument('--ordered', type=Path, help='linker script replacing the SDK script')
    p.add_argument('--lock', type=Path, help='sbf_lock.py (shared slot lock)')
    p.add_argument('--name', default='claude-layout-amm-build')
    p.add_argument('--allow-new-deps', action='store_true',
                   help='dependency-lock experiments: new dependency artifacts may be added; existing ones must stay unchanged')
    a = p.parse_args()
    source, out, sdk = a.source.resolve(), a.output.resolve(), a.sdk.resolve()
    cache, target = a.cargo_home.resolve(), a.target_cache.resolve()
    out.mkdir(parents=True, exist_ok=False)
    for path, digest in EXPECTED.items():
        assert sha(sdk / path) == digest, path
    image = json.loads(subprocess.check_output(['podman', 'image', 'inspect', IMAGE], text=True))[0]
    assert image['Architecture'] == 'amd64' and image['Os'] == 'linux'
    real = sdk / 'rust/lib/rustlib/x86_64-unknown-linux-gnu/bin/rust-lld'
    ordered = ''
    if a.ordered:
        shutil.copyfile(a.ordered, out / 'ordered.ld')
        ordered = str(out / 'ordered.ld')
    kit = out / 'link'
    wrapper = out / 'link-wrapper.sh'
    text = (HERE / 'link-wrapper.sh.in').read_text()
    text = text.replace('@REAL@', str(real)).replace('@ORDERED@', ordered).replace('@KIT@', str(kit))
    wrapper.write_text(text)
    wrapper.chmod(0o755)
    inputs = lambda: {str(f.relative_to(source)): sha(f) for f in sorted(source.rglob('*')) if f.is_file()}
    dep = lambda: {str(f.relative_to(target)): sha(f) for f in sorted(target.rglob('*'))
                   if f.is_file() and f.suffix in ('.rlib', '.rmeta', '.so')
                   and not f.name.startswith(('libpump_amm_recovered', 'pump_amm_recovered'))}
    env = {'CARGO_HOME': CARGO_HOME_C, 'CARGO_TARGET_DIR': TARGET_C, 'RUSTC': str(sdk / 'rust/bin/rustc'),
           'RUSTDOC': str(sdk / 'rust/bin/rustdoc'), 'CC': str(sdk / 'llvm/bin/clang'), 'AR': str(sdk / 'llvm/bin/llvm-ar'),
           'LD_LIBRARY_PATH': str(sdk / 'rust/lib') + ':' + str(sdk / 'llvm/lib'),
           'CARGO_TARGET_SBPF_SOLANA_SOLANA_RUSTFLAGS': ' -Zremap-cwd-prefix=', 'CARGO_BUILD_JOBS': '2'}
    prefix = ['podman', 'run', '--rm', '--pull=never', '--platform=linux/amd64', '--cpus=2', '--memory=3g',
              '--network=none', '--name', a.name + '-' + hashlib.sha256(str(out).encode()).hexdigest()[:8],
              '--entrypoint=/usr/bin/env']
    mounts = [(source, str(source), 'ro'), (cache, CARGO_HOME_C, 'rw'), (sdk, str(sdk), 'ro'),
              (out, str(out), 'rw'), (target, TARGET_C, 'rw')]
    for host, cpath, mode in mounts:
        prefix += ['-v', f'{host}:{cpath}:{mode}']
    prefix += ['-w', str(source)]
    for k, v in env.items():
        prefix += ['-e', k + '=' + v]
    prefix += [IMAGE, '-u', 'RUSTFLAGS', '-u', 'CARGO_ENCODED_RUSTFLAGS']
    command = prefix + [str(sdk / 'rust/bin/cargo'), 'rustc', '--release', '--target', 'sbpf-solana-solana',
                        '--manifest-path', str(source / 'Cargo.toml'), '-p', 'pump-amm-recovered', '--lib',
                        '--locked', '--offline', '--',
                        '-Clinker=' + str(wrapper), '-Clink-arg=-Map=' + str(kit / 'link.map')]
    locked = command
    if a.lock:
        locked = [sys.executable, str(a.lock), '--slots', '6', '--name', 'sbf', '--',
                  sys.executable, str(a.lock), '--slots', '2', '--name', 'podman', '--'] + command
    # Equivalent of `cargo clean -p pump-amm-recovered` for the target triple:
    # remove only root-crate outputs so the root crate is always recompiled.
    removed = []
    rel = target / 'sbpf-solana-solana/release'
    for pattern in ['.fingerprint/pump-amm-recovered-*', 'deps/libpump_amm_recovered*', 'deps/pump_amm_recovered*',
                    'libpump_amm_recovered*', 'pump_amm_recovered*']:
        for f in sorted(rel.glob(pattern)):
            removed.append(str(f.relative_to(target)))
            shutil.rmtree(f) if f.is_dir() else f.unlink()
    before_src, before_dep = inputs(), dep()
    record = {'removed_root_outputs': removed,'scope': __doc__, 'driver_sha256': sha(__file__), 'wrapper_template_sha256': sha(HERE / 'link-wrapper.sh.in'),
              'wrapper_sha256': sha(wrapper), 'ordered_sha256': sha(ordered) if ordered else None,
              'command': command, 'mounts': [[str(h), c, m] for h, c, m in mounts], 'environment': env,
              'container_image': {k: image[k] for k in ('Id', 'Architecture', 'Os', 'RepoDigests')},
              'tool_sha256': {str(sdk / k): sha(sdk / k) for k in EXPECTED}, 'source_sha256': before_src,
              'dependency_artifacts_before': len(before_dep)}
    (out / 'build-attempt.json').write_text(json.dumps(record, indent=2) + '\n')
    start = time.monotonic()
    with (out / 'build.log').open('w') as log:
        result = subprocess.run(locked, stdout=log, stderr=subprocess.STDOUT)
    after_dep = dep()
    record.update(returncode=result.returncode, seconds=time.monotonic() - start,
                  source_unchanged=inputs() == before_src, dependency_artifacts_unchanged=after_dep == before_dep,
                  existing_dependency_artifacts_unchanged=all(after_dep.get(k) == v for k, v in before_dep.items()),
                  new_dependency_artifacts=sorted(set(after_dep) - set(before_dep)),
                  build_log_sha256=sha(out / 'build.log'))
    (out / 'build-attempt.json').write_text(json.dumps(record, indent=2) + '\n')
    assert result.returncode == 0, 'build failed'
    assert record['source_unchanged'] and record['existing_dependency_artifacts_unchanged']
    assert record['dependency_artifacts_unchanged'] or a.allow_new_deps
    assert 'Compiling pump-amm-recovered' in (out / 'build.log').read_text(), 'root crate did not rebuild'
    unstripped = target / 'sbpf-solana-solana/release/pump_amm_recovered.so'
    art = out / 'artifacts'
    art.mkdir()
    shutil.copy2(unstripped, art / 'unstripped.so')
    strip = Path.home() / '.cache/solana/v1.52/platform-tools/llvm/bin/llvm-objcopy'
    strip_cmd = [str(strip), '--strip-all', str(art / 'unstripped.so'), str(art / 'candidate.so')]
    subprocess.run(strip_cmd, check=True)
    record.update(unstripped_sha256=sha(art / 'unstripped.so'), candidate_sha256=sha(art / 'candidate.so'),
                  strip_command=strip_cmd, strip_tool_sha256=sha(strip),
                  sdk_default_script_sha256=sha(kit / 'sdk-default.ld'),
                  link_inputs={f.name: sha(f) for f in sorted((kit / 'inputs').iterdir())})
    (out / 'build-attempt.json').write_text(json.dumps(record, indent=2) + '\n')
    print(json.dumps({k: record[k] for k in ('returncode', 'seconds', 'unstripped_sha256', 'candidate_sha256')}, indent=2))


if __name__ == '__main__':
    main()
