#!/usr/bin/env python3
"""Build main Pump exactly like the archived Round recipe, optionally with an ordered linker script.

Staging, environment, toolchain, Cargo command and registry handling mirror
scripts/pump_build_verified.py --workspace-layout (the recipe every Round
packet's reproduce.py runs). The only addition is RUSTC_WRAPPER=rustc_wrapper.py,
which forwards to scripts/pump_physical_source_wrapper.py and gives the root
cdylib link the linker.py hook. With --linker-script omitted the hook passes
the SDK default script through unchanged (baseline). Run under the lane build
lock: python3 SP/sbf_lock.py --slots 6 --name sbf -- python3 build.py ...
"""
import argparse
import hashlib
import json
import os
import platform
import shutil
import subprocess
import time
import tomllib
from pathlib import Path

HERE = Path(__file__).resolve().parent
ROOT = next(p for p in HERE.parents if (p / 'evidence/original/pump/deployed.so').is_file())
sha = lambda p: hashlib.sha256(Path(p).read_bytes()).hexdigest()


def tree(root):
    root = Path(root)
    return {str(p.relative_to(root)): sha(p) for p in sorted(root.rglob('*'))
            if p.is_file() and 'target' not in p.relative_to(root).parts}


def main():
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument('--source-directory', type=Path, default=ROOT / 'programs/pump')
    ap.add_argument('--sdk', type=Path, default=Path.home() / '.cache/solana/v1.44/platform-tools')
    ap.add_argument('--registry-home', type=Path, default=Path.home() / '.cargo')
    ap.add_argument('--output', type=Path, required=True)
    ap.add_argument('--target-dir', type=Path, help='CARGO_TARGET_DIR (default: <output>/target)')
    ap.add_argument('--linker-script', type=Path, help='ordered script; omit for the SDK default')
    a = ap.parse_args()
    crate_in, sdk, out = a.source_directory.resolve(), a.sdk.resolve(), a.output.resolve()
    out.mkdir(parents=True, exist_ok=False)
    target = (a.target_dir or out / 'target').resolve()
    script = a.linker_script.resolve() if a.linker_script else None
    if script:
        shutil.copy2(script, out / 'ordered.ld')
        script = out / 'ordered.ld'
    primary_before = tree(crate_in)

    # --- workspace staging identical to pump_build_verified.py --workspace-layout
    text = (crate_in / 'Cargo.toml').read_text()
    parsed = tomllib.loads(text)
    assert parsed.get('workspace') == {} and set(parsed.get('profile', {})) == {'release'}
    profile_start, workspace_start = text.index('[profile.release]'), text.index('[workspace]')
    assert profile_start < workspace_start and not text[workspace_start + len('[workspace]'):].strip()
    profile = text[profile_start:workspace_start].strip() + '\n'
    workspace = out / 'source'
    crate = workspace / 'programs/pump'
    for rel in primary_before:
        if not (rel.endswith('.rs') or rel in ('Cargo.toml', 'Cargo.lock')):
            continue
        dest = crate / rel
        dest.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(crate_in / rel, dest)
    (crate / 'Cargo.toml').write_text(text[:profile_start].rstrip() + '\n')
    shutil.move(crate / 'Cargo.lock', workspace / 'Cargo.lock')
    (workspace / 'Cargo.toml').write_text('[workspace]\nmembers = ["programs/pump"]\nresolver = "2"\n\n' + profile)

    host = {'arm64': 'aarch64-apple-darwin', 'x86_64': 'x86_64-apple-darwin'}[platform.machine()]
    tools = {'rustc': sdk / 'rust/bin/rustc', 'cargo': sdk / 'rust/bin/cargo',
             'objcopy': sdk / 'llvm/bin/llvm-objcopy',
             'rust-lld': sdk / f'rust/lib/rustlib/{host}/bin/rust-lld'}
    cargo_home = out / 'cargo-home'
    (cargo_home / 'registry').mkdir(parents=True)
    for name in ['src', 'cache', 'index']:
        if (a.registry_home / 'registry' / name).exists():
            (cargo_home / 'registry' / name).symlink_to(a.registry_home.resolve() / 'registry' / name, target_is_directory=True)
    physical = ROOT / 'scripts/pump_physical_source_wrapper.py'
    lib_name = tomllib.loads((crate / 'Cargo.toml').read_text()).get('lib', {}).get('name', parsed['package']['name'].replace('-', '_'))
    env = os.environ.copy()
    env.update(
        RUSTC_WRAPPER=str(HERE / 'rustc_wrapper.py'),
        LAYOUT_ROOT_CRATE=lib_name,
        LAYOUT_PHYSICAL_WRAPPER=str(physical),
        LAYOUT_REAL_LINKER=str(tools['rust-lld']),
        LAYOUT_RECORD_DIR=str(out / 'link'),
        LAYOUT_LINKER_SCRIPT=str(script) if script else '',
        PUMP_LOGICAL_REGISTRY_SRC=str(cargo_home / 'registry/src'),
        PUMP_SOURCE_WRAPPER_LOG=str(out / 'physical-source-calls.jsonl'),
        CARGO_HOME=str(cargo_home),
        CARGO_TARGET_DIR=str(target),
        CARGO_BUILD_JOBS='2',
        RUSTC=str(tools['rustc']),
        CC=str(sdk / 'llvm/bin/clang'),
        AR=str(sdk / 'llvm/bin/llvm-ar'),
        OBJDUMP=str(sdk / 'llvm/bin/llvm-objdump'),
        OBJCOPY=str(tools['objcopy']),
        CARGO_TARGET_SBF_SOLANA_SOLANA_RUSTFLAGS='-Zremap-cwd-prefix=',
    )
    command = [str(tools['cargo']), 'build', '--manifest-path', str(crate / 'Cargo.toml'), '--release',
               '--target', 'sbf-solana-solana', '--locked', '--offline', '-v']
    record = {
        'scope': __doc__,
        'command': command,
        'cwd': str(workspace),
        'environment': {k: env[k] for k in ['RUSTC_WRAPPER', 'LAYOUT_ROOT_CRATE', 'LAYOUT_PHYSICAL_WRAPPER', 'LAYOUT_REAL_LINKER',
                                             'LAYOUT_LINKER_SCRIPT', 'PUMP_LOGICAL_REGISTRY_SRC', 'CARGO_HOME',
                                             'CARGO_TARGET_DIR', 'CARGO_BUILD_JOBS', 'RUSTC', 'CC', 'AR', 'OBJDUMP',
                                             'OBJCOPY', 'CARGO_TARGET_SBF_SOLANA_SOLANA_RUSTFLAGS']},
        'tool_sha256': {k: sha(v) for k, v in tools.items()},
        'hook_sha256': {p.name: sha(p) for p in [HERE / 'rustc_wrapper.py', HERE / 'linker.py', HERE / 'layout_script.py', HERE / 'default.ld', physical]},
        'primary_source_directory': str(crate_in),
        'primary_source_sha256': primary_before,
        'staged_source_sha256': tree(workspace),
        'linker_script_sha256': sha(script) if script else None,
    }
    (out / 'build-attempt.json').write_text(json.dumps(record, indent=2) + '\n')
    start = time.monotonic()
    with (out / 'build.log').open('w') as log:
        result = subprocess.run(command, cwd=workspace, env=env, stdout=log, stderr=subprocess.STDOUT)
    record.update(returncode=result.returncode, seconds=round(time.monotonic() - start, 1),
                  source_unchanged=tree(crate_in) == primary_before and tree(workspace) == record['staged_source_sha256'])
    if result.returncode == 0:
        built = target / 'sbf-solana-solana/release' / f'{lib_name}.so'
        shutil.copy2(built, out / 'unstripped.so')
        subprocess.run([str(tools['objcopy']), '--strip-all', str(built), str(out / 'candidate.so')], check=True)
        original = (ROOT / 'evidence/original/pump/deployed.so').read_bytes()
        cand = (out / 'candidate.so').read_bytes()
        record.update(candidate_sha256=sha(out / 'candidate.so'), unstripped_sha256=sha(out / 'unstripped.so'),
                      candidate_bytes=len(cand), whole_file_equal_to_original=cand == original,
                      linker_invocation_sha256=sha(out / 'link/linker-invocation.json'))
    (out / 'build-comparison.json').write_text(json.dumps(record, indent=2) + '\n')
    print(json.dumps({k: record.get(k) for k in ['returncode', 'seconds', 'source_unchanged', 'candidate_sha256', 'unstripped_sha256']}, indent=2))
    raise SystemExit(result.returncode)


if __name__ == '__main__':
    main()
