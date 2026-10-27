#!/usr/bin/env python3
"""Explicit offline root-only controls using a previously built native cache."""
import argparse
from datetime import datetime, timezone
import gzip
import hashlib
import importlib.util
import json
import os
from pathlib import Path
import re
import shutil
import subprocess
import time

HERE = Path(__file__).resolve().parent
PARENT = HERE.parent / 'mayhem-native-windows-baseline'
ORDER = ('metadata', 'paths', 'both', 'baseline-repeat')


def raw(path):
    data = path.read_bytes()
    return gzip.decompress(data) if path.suffix == '.gz' else data


def read(path):
    return json.loads(raw(path))


def sha(path):
    with path.open('rb') as stream:
        return hashlib.file_digest(stream, 'sha256').hexdigest()


def save(path, value):
    path.write_text(json.dumps(value, indent=2) + '\n', encoding='utf8', newline='\n')


def require(ok, message):
    if not ok:
        raise ValueError(message)


def flags(label, sources):
    metadata = ['-C', 'metadata=e3c44ab51b8399da']
    paths = ['--remap-path-prefix=' + name + '=programs/mayhem-program/' + name
             for name in sorted(sources) if name.endswith('.rs')]
    return {'metadata': metadata, 'paths': paths, 'both': metadata + paths,
            'baseline-repeat': []}[label]


def dependencies(target):
    return {p.relative_to(target).as_posix(): sha(p)
            for base in ('release/deps', 'sbpf-solana-solana/release/deps')
            for p in (target / base).iterdir()
            if p.suffix in {'.rlib', '.dll'} and 'mayhem_recovered' not in p.name}


def run(args):
    require(os.name == 'nt', 'Windows host required')
    output = args.output.resolve()
    output.mkdir(parents=True, exist_ok=False)
    launch0 = read(args.baseline_launch)
    recorded = read(PARENT / 'builds/build-01/launch.json.gz')
    require(launch0 == recorded, 'use the authenticated original native launch')
    spec = importlib.util.spec_from_file_location('parent_build', PARENT / 'build.py')
    b = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(b)
    env = {k: os.environ[k] for k in ('SystemRoot', 'WINDIR', 'SystemDrive', 'COMSPEC',
                                     'PROCESSOR_ARCHITECTURE') if k in os.environ}
    env.update(launch0['environment_overrides'])
    target = Path(env['CARGO_TARGET_DIR'])
    source = Path(launch0['command'][launch0['command'].index('--manifest-path') + 1]).parent
    expected = launch0['source_inputs']
    require(expected == {r['path']: r['sha256'] for r in read(PARENT / 'source-inputs.json')['source_files']},
            'source cohort differs')
    sdk = Path(env['RUSTC']).parent.parent.parent
    sysroot = Path(env['CARGO_TARGET_SBPF_SOLANA_SOLANA_RUSTFLAGS'].split('--sysroot=', 1)[1])
    def check_inputs():
        require({p.relative_to(source).as_posix(): sha(p) for p in source.rglob('*') if p.is_file()}
                == expected, 'source files differ')
        require(dependencies(target) == read(HERE / 'dependency-inputs.json'), 'cached dependencies differ')
        require(all(sha(Path(n)) == h for n, h in launch0['checked_executables'].items()), 'executable differs')
    check_inputs()
    b.pin(sdk, read(PARENT / 'sdk-components.json.gz')['files'])
    b.pin(sysroot.parent, read(PARENT / 'target-components.json')['files'])
    expected_outputs = read(HERE / 'expected-artifacts.json')
    for label in ORDER:
        check_inputs()
        out = output / label
        out.mkdir()
        extra = flags(label, expected)
        launch = dict(launch0, command=launch0['command'] + extra, variant=label,
                      changed_root_arguments=extra, started_at=datetime.now(timezone.utc).isoformat(),
                      scope='Cached-dependency root compilation only; unchanged 15-file source and target libraries.')
        save(out / 'launch.json', launch)
        result = dict(status='STARTED', target_executions=0)
        start = time.monotonic()
        try:
            with (out / 'stdout.log').open('wb') as stdout, (out / 'stderr.log').open('wb') as stderr:
                process = subprocess.run(launch['command'], cwd=launch['cwd'], env=env, stdout=stdout,
                                         stderr=stderr, timeout=180, creationflags=subprocess.CREATE_NO_WINDOW)
            result['returncode'] = process.returncode
            require(process.returncode == 0, 'compilation failed')
            check_inputs()
            result.update(source_unchanged=True, dependency_artifacts_unchanged=True, executables_unchanged=True)
            invocations = re.findall(r'^\s+Running .*rustc\.exe --crate-name (\w+) ',
                                     (out / 'stderr.log').read_text(), re.MULTILINE)
            require(invocations == ['mayhem_recovered'], 'expected exactly one root compiler invocation')
            result['root_invocations'] = len(invocations)
            shutil.copyfile(target / 'sbpf-solana-solana/release/mayhem_recovered.so', out / 'symbols.so')
            result['symbols'] = dict(bytes=(out / 'symbols.so').stat().st_size, sha256=sha(out / 'symbols.so'))
            result['equal_to_exploratory'] = result['symbols'] == expected_outputs[label]
            require(result['equal_to_exploratory'], 'repeated root artifact differs')
            result['status'] = 'SUCCEEDED'
        except Exception as error:
            result.update(status='FAILED', error_type=type(error).__name__, error=str(error))
            raise
        finally:
            result.update(elapsed_seconds=time.monotonic() - start, finished_at=datetime.now(timezone.utc).isoformat(),
                          logs={p.name: dict(bytes=p.stat().st_size, sha256=sha(p)) for p in out.glob('*.log')})
            save(out / 'result.json', result)
        print(label, result['symbols']['sha256'], flush=True)
    check_inputs()
    b.pin(sdk, read(PARENT / 'sdk-components.json.gz')['files'])
    b.pin(sysroot.parent, read(PARENT / 'target-components.json')['files'])
    save(output / 'series.json', dict(status='SUCCEEDED', root_compilations=4, target_executions=0,
        sdk_files=len(read(PARENT / 'sdk-components.json.gz')['files']),
        target_components=len(read(PARENT / 'target-components.json')['files']),
        dependency_artifacts=len(dependencies(target)), checked_before_and_after=True,
        finished_at=datetime.now(timezone.utc).isoformat()))


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--baseline-launch', type=Path, required=True)
    parser.add_argument('--output', type=Path, required=True)
    run(parser.parse_args())
