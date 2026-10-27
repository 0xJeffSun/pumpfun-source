#!/usr/bin/env python3
"""Opt-in Windows replay using already provisioned, hash-checked SDK components.

No download, installation, linker, target execution or repository source mutation.
All output, including failures, goes into a new --output directory.
"""
from datetime import datetime, timezone
import argparse
import importlib.util
import json
import os
from pathlib import Path
import platform
import shutil
import subprocess

HERE = Path(__file__).resolve().parent
spec = importlib.util.spec_from_file_location('controlled_verify', HERE / 'verify.py')
v = importlib.util.module_from_spec(spec)
spec.loader.exec_module(v)


def save(path, value):
    path.write_text(json.dumps(value, indent=2) + '\n', encoding='utf-8', newline='\n')


def replay(sdk_workspace, output):
    v.require(os.name == 'nt', 'the retained compiler is Windows x86_64')
    v.package_integrity(HERE)
    metadata = v.validate_run(HERE)
    output.mkdir(parents=True, exist_ok=False)
    run = output / 'run'
    run.mkdir()
    rows = []
    state = dict(status='STARTED', host=platform.platform(), target_executions=0,
                 linker_executions=0, registry_downloads=0, network_requested_by_commands=False,
                 isolation='Native Windows compiler with explicit sysroots and minimal environment; '
                           'no OS sandbox, network-denial or exhaustive loaded-DLL attestation.')
    try:
        # Copy only listed regular components; check before and after compilation.
        for host, data in metadata.items():
            source_root = sdk_workspace / v.folder(host)
            v.pin_files(source_root, data['files'])
            for row in data['files']:
                source = source_root / row['path']
                v.require(source.is_file() and not source.is_symlink(), 'nonregular SDK component')
                destination = output / v.folder(host) / row['path']
                destination.parent.mkdir(parents=True, exist_ok=True)
                shutil.copyfile(source, destination)
            v.pin_files(output / v.folder(host), data['files'])
        source_dir = output / 'source'
        source_dir.mkdir()
        source = source_dir / 'probe.rs'
        source.write_bytes((HERE / 'source/probe.rs').read_bytes())
        exe = output / 'windows-sdk/rust/bin/rustc.exe'
        state.update(compiler_exe_sha256=v.identity(exe.read_bytes())['sha256'],
                     source_sha256=v.identity(source.read_bytes())['sha256'])
        temp = run / 'temp'
        temp.mkdir()
        system = os.environ['SystemRoot']
        env = {k: os.environ[k] for k in ('SystemRoot', 'WINDIR', 'SystemDrive', 'COMSPEC')
               if k in os.environ}
        env.update(PATH=os.pathsep.join([str(exe.parent), str(output / 'windows-sdk/llvm/bin'),
                                        system + '\\System32']), TEMP=str(temp), TMP=str(temp))
        for label, args in [('version', ['-vV']), ('target-list', ['--print', 'target-list']),
                            *((label, v.compile_args(label)) for label in v.LABELS)]:
            if label in v.LABELS:
                (run / label).mkdir()
            row = dict(label=label, arguments=args, cwd='source',
                       started_at=datetime.now(timezone.utc).isoformat())
            rows.append(row)
            save(run / 'commands.json', rows)
            try:
                process = subprocess.run([str(exe), *args], cwd=source_dir, env=env,
                                         capture_output=True, timeout=120,
                                         creationflags=subprocess.CREATE_NO_WINDOW)
                row['exit'] = process.returncode
                stdout, stderr = process.stdout, process.stderr
            except subprocess.TimeoutExpired as error:
                row.update(exit=None, timed_out=True)
                stdout, stderr = error.stdout or b'', error.stderr or b''
            for stream, raw in [('stdout', stdout), ('stderr', stderr)]:
                (run / (label + '.' + stream + '.log')).write_bytes(raw)
                row[stream] = v.identity(raw)
            row['finished_at'] = datetime.now(timezone.utc).isoformat()
            if label in v.LABELS:
                row['outputs'] = {p.name: v.identity(p.read_bytes()) for p in (run / label).iterdir()
                                  if p.is_file()}
            save(run / 'commands.json', rows)
            v.require(row['exit'] == 0, 'compiler command failed: ' + label)
        for host, data in metadata.items():
            v.pin_files(output / v.folder(host), data['files'])
        v.require(source.read_bytes() == (HERE / 'source/probe.rs').read_bytes(), 'source changed')
        state.update(status='COMPLETED', source_unchanged=True, selected_components_unchanged=True,
                     successful_compilations=4)
        save(run / 'observation.json', state)
        v.validate_run(HERE, run=run)
        for label in v.LABELS:
            for suffix in ('o', 's'):
                name = 'relay_typeid_probe.' + suffix
                v.require((run / label / name).read_bytes() == (HERE / 'run' / label / name).read_bytes(),
                          'replay differs from retained output: ' + label + '/' + name)
        state['all_eight_outputs_equal_to_retained'] = True
    except Exception as error:
        state.update(status='FAILED', error_type=type(error).__name__, error=str(error))
        raise
    finally:
        save(run / 'observation.json', state)
    return state


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--sdk-workspace', type=Path, required=True,
                        help='directory containing windows-sdk/, linux-sysroot/, darwin-sysroot/')
    parser.add_argument('--output', type=Path, required=True, help='new directory; never reused')
    args = parser.parse_args()
    print(json.dumps(replay(args.sdk_workspace.resolve(), args.output.resolve()), indent=2))
