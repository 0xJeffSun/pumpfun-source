#!/usr/bin/env python3
"""Explicit offline Windows build from retained source and supplied SDK/vendor inputs."""
import argparse
from datetime import datetime, timezone
import gzip
import hashlib
import json
import os
from pathlib import Path, PurePosixPath
import shutil
import subprocess
import time

HERE = Path(__file__).resolve().parent
import importlib.util
_spec = importlib.util.spec_from_file_location('sharing_controls', HERE / 'controls.py')
_controls = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(_controls)


def require(ok, message):
    if not ok:
        raise ValueError(message)


def raw(path):
    data = path.read_bytes()
    return gzip.decompress(data) if path.suffix == '.gz' else data


def read(path):
    return json.loads(raw(path))


def sha(path):
    with path.open('rb') as stream:
        return hashlib.file_digest(stream, 'sha256').hexdigest()


def save(path, value):
    path.write_text(json.dumps(value, indent=2) + '\n', encoding='utf-8', newline='\n')


def safe(name):
    p = PurePosixPath(name)
    require(bool(name) and not p.is_absolute() and '..' not in p.parts and ':' not in name
            and '\\' not in name and p.as_posix() == name, 'invalid component path')
    return name


def pin(root, rows):
    seen = set()
    for row in rows:
        name = safe(row['path'])
        require(name not in seen, 'duplicate component')
        seen.add(name)
        path = root / name
        require(path.is_file() and not path.is_symlink(), 'nonregular component: ' + name)
        require(path.stat().st_size == row['bytes'] and sha(path) == row['sha256'],
                'component differs: ' + name)


def vendor_check(root, package=HERE):
    records = read(package / 'vendor-inputs.json')['packages']
    for record in records:
        directory = root / safe(record['directory'])
        checksum = directory / '.cargo-checksum.json'
        require(sha(checksum) == record['checksum_file_sha256'], 'vendor checksum map differs')
        data = read(checksum)
        require(data['package'] == record['package_sha256']
                and len(data['files']) == record['file_count'], 'vendor package record differs')
        actual = {p.relative_to(directory).as_posix() for p in directory.rglob('*')
                  if p.is_file() and p.name != '.cargo-checksum.json'}
        require(actual == set(data['files']), 'vendor file set differs')
        for name, digest in data['files'].items():
            path = directory / safe(name)
            require(not path.is_symlink() and sha(path) == digest, 'vendor source differs')
    return len(records)


def build(args):
    require(os.name == 'nt', 'Windows compiler and host linker required')
    sdk, target, vendor, vc, kit = [getattr(args, n).resolve() for n in
                                   ('sdk', 'target_sysroot', 'vendor', 'msvc', 'windows_sdk')]
    output = args.output.resolve()
    output.mkdir(parents=True, exist_ok=False)
    result = dict(status='STARTED', target_executions=0)
    start = time.monotonic()
    try:
        sdk_rows = read(HERE / 'sdk-components.json.gz')['files']
        target_rows = read(HERE / 'target-components.json')['files']
        pin(sdk, sdk_rows)
        pin(target.parent, target_rows)
        vendor_count = vendor_check(vendor)
        source = output / 'source/programs/mayhem'
        inputs = read(HERE / 'source-inputs.json')['source_files']
        source_payloads = {}
        for row in inputs:
            name = safe(row['path'])
            data = raw(HERE / 'sources' / (name + '.gz'))
            require(len(data) == row['bytes'] and hashlib.sha256(data).hexdigest() == row['sha256'],
                    'retained source differs')
            source_payloads[name] = data
        source_payloads = _controls.control_source(source_payloads, args.variant)
        for name, data in source_payloads.items():
            path = source / name
            path.parent.mkdir(parents=True, exist_ok=True)
            path.write_bytes(data)
        before = {n: hashlib.sha256(b).hexdigest() for n, b in source_payloads.items()}
        cargo_home = output / 'cargo-home'
        cargo_home.mkdir()
        (cargo_home / 'config.toml').write_text(
            '[source.crates-io]\nreplace-with = "locked-vendor"\n[source.locked-vendor]\ndirectory = '
            + json.dumps(str(vendor)) + '\n[net]\noffline = true\n', encoding='utf-8', newline='\n')
        temp = output / 'temp'
        temp.mkdir()
        system = Path(os.environ['SystemRoot'])
        env = {k: os.environ[k] for k in ('SystemRoot', 'WINDIR', 'SystemDrive', 'COMSPEC',
                                         'PROCESSOR_ARCHITECTURE') if k in os.environ}
        extra = dict(
            PATH=os.pathsep.join(map(str, [sdk / 'rust/bin', sdk / 'llvm/bin',
                vc / 'bin/Hostx64/x64', kit / 'bin' / args.kit_version / 'x64', system / 'System32'])),
            LIB=os.pathsep.join(map(str, [vc / 'lib/x64', kit / 'Lib' / args.kit_version / 'ucrt/x64',
                                         kit / 'Lib' / args.kit_version / 'um/x64'])),
            INCLUDE=os.pathsep.join(map(str, [vc / 'include', *[
                kit / 'Include' / args.kit_version / n for n in ('ucrt', 'shared', 'um', 'winrt')]])),
            RUSTC=str(sdk / 'rust/bin/rustc.exe'), RUSTDOC=str(sdk / 'rust/bin/rustdoc.exe'),
            CARGO_HOME=str(cargo_home), CARGO_TARGET_DIR=str(output / 'target'), CARGO_NET_OFFLINE='true',
            CARGO_TARGET_SBPF_SOLANA_SOLANA_RUSTFLAGS='-Zremap-cwd-prefix= --sysroot=' + str(target),
            CC_sbpf_solana_solana=str(sdk / 'llvm/bin/clang.exe'),
            AR_sbpf_solana_solana=str(sdk / 'llvm/bin/llvm-ar.exe'),
            CARGO_TARGET_X86_64_PC_WINDOWS_MSVC_LINKER=str(vc / 'bin/Hostx64/x64/link.exe'),
            TEMP=str(temp), TMP=str(temp))
        env.update(extra)
        tools = [sdk / 'rust/bin/rustc.exe', sdk / 'rust/bin/cargo.exe',
                 sdk / 'rust/bin/rustc_driver-4c05705140f85a08.dll', sdk / 'llvm/bin/llvm-ar.exe',
                 sdk / 'llvm/bin/clang.exe', sdk / 'llvm/bin/llvm-objcopy.exe',
                 sdk / 'rust/lib/rustlib/x86_64-pc-windows-msvc/bin/rust-lld.exe',
                 vc / 'bin/Hostx64/x64/link.exe', vc / 'bin/Hostx64/x64/cl.exe']
        checked = {str(p): sha(p) for p in tools}
        original = read(HERE / 'builds/baseline/launch.json.gz')['checked_executables']
        # Locators may differ; executable names are unique in this checked cohort.
        expected = {n.replace('\\', '/').split('/')[-1]: h for n, h in original.items()}
        require(len(expected) == len(original), 'ambiguous executable identity')
        require({p.name: checked[str(p)] for p in tools} == expected, 'host/tool identity differs')
        command = [str(sdk / 'rust/bin/cargo.exe'), 'rustc', '--manifest-path', str(source / 'Cargo.toml'),
                   '--release', '--target', 'sbpf-solana-solana', '--locked', '--offline', '--verbose',
                   '--', '--remap-path-prefix=src/=programs/mayhem-program/src/',
                   '--remap-path-prefix=src/account_wrapper.rs=src/account_wrapper.rs']
        launch = dict(command=command, cwd=str(source.parent.parent), environment_overrides=extra,
                      source_inputs=before, checked_executables=checked, vendor_packages=vendor_count,
                      started_at=datetime.now(timezone.utc).isoformat(), target_directory_initially_absent=True,
                      scope='Fresh dependency and root build; native Windows compiler, Linux target libraries.')
        save(output / 'launch.json', launch)
        with (output / 'stdout.log').open('wb') as stdout, (output / 'stderr.log').open('wb') as stderr:
            process = subprocess.Popen(command, cwd=source.parent.parent, env=env, stdout=stdout,
                                       stderr=stderr, creationflags=subprocess.CREATE_NO_WINDOW)
            save(output / 'process.json', dict(pid=process.pid))
            code = process.wait()
        result.update(returncode=code, source_unchanged=before == {r['path']: sha(source / r['path']) for r in inputs},
                      root_invocations=(output / 'stderr.log').read_text(errors='replace').count('--crate-name mayhem_recovered '))
        require(code == 0 and result['source_unchanged'] and result['root_invocations'] == 1, 'build failed/incomplete')
        shutil.copyfile(output / 'target/sbpf-solana-solana/release/mayhem_recovered.so', output / 'symbols.so')
        strip = [str(sdk / 'llvm/bin/llvm-objcopy.exe'), '--strip-all',
                 str(output / 'symbols.so'), str(output / 'candidate-v154-strip.so')]
        stripped = subprocess.run(strip, env=env, capture_output=True, timeout=120,
                                  creationflags=subprocess.CREATE_NO_WINDOW)
        (output / 'strip.stdout.log').write_bytes(stripped.stdout)
        (output / 'strip.stderr.log').write_bytes(stripped.stderr)
        result['strip'] = dict(command=strip, returncode=stripped.returncode)
        require(stripped.returncode == 0, 'strip failed')
        pin(sdk, sdk_rows)
        pin(target.parent, target_rows)
        vendor_check(vendor)
        require(all(sha(Path(n)) == h for n, h in checked.items()), 'executable changed')
        result['outputs'] = {p.name: dict(bytes=p.stat().st_size, sha256=sha(p)) for p in output.glob('*.so')}
        result['status'] = 'SUCCEEDED'
        result['comparison'] = 'Deferred until compilation is complete.'
    except Exception as error:
        result.update(status='FAILED', error_type=type(error).__name__, error=str(error))
        raise
    finally:
        result.update(elapsed_seconds=time.monotonic() - start, finished_at=datetime.now(timezone.utc).isoformat())
        result['logs'] = {p.name: dict(bytes=p.stat().st_size, sha256=sha(p)) for p in output.glob('*.log')}
        save(output / 'result.json', result)
    return result


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    for name in ('sdk', 'target-sysroot', 'vendor', 'msvc', 'windows-sdk', 'output'):
        parser.add_argument('--' + name, type=Path, required=True)
    parser.add_argument('--variant', choices=_controls.VARIANTS, default='baseline')
    parser.add_argument('--kit-version', default='10.0.26100.0')
    print(json.dumps(build(parser.parse_args()), indent=2))
