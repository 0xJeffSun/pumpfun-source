#!/usr/bin/env python3
"""Recompute retained probe evidence offline; compilation is a separate opt-in."""
import argparse
from datetime import datetime
import hashlib
import importlib.util
import json
from pathlib import Path, PurePosixPath
import re
import tarfile

HERE = Path(__file__).resolve().parent
PARENT = 'research/mayhem-alloc-typeid-provenance'
HOSTS = ('windows', 'linux', 'darwin')
LABELS = (*HOSTS, 'linux-repeat')
TARGET_DIR = 'rust/lib/rustlib/sbpf-solana-solana/lib/'
PREFIX = ['--crate-name', 'relay_typeid_probe', '--crate-type', 'lib', '--edition', '2021',
          '-C', 'opt-level=3', '-C', 'panic=abort', '-C', 'overflow-checks=on',
          '-Zremap-cwd-prefix=', '--target', 'sbpf-solana-solana']
RUST_REVISION = 'daa3af4a1110ec3f10ce08083bb0b7855a88416f'


def require(ok, message):
    if not ok:
        raise ValueError(message)


def read(path):
    return json.loads(path.read_bytes())


def identity(raw):
    return dict(bytes=len(raw), sha256=hashlib.sha256(raw).hexdigest())


def safe_name(name):
    p = PurePosixPath(name)
    require(bool(name) and not p.is_absolute() and '..' not in p.parts
            and p.as_posix() == name and '\\' not in name and ':' not in name,
            'invalid relative path')
    return name


def pin_files(root, rows):
    seen = set()
    for row in rows:
        name = safe_name(row['path'])
        require(name not in seen, 'duplicate input')
        seen.add(name)
        raw = (root / name).read_bytes()
        require(identity(raw) == {k: row[k] for k in ('bytes', 'sha256')}, 'input differs: ' + name)
        if 'git_blob' in row:
            blob = hashlib.sha1(b'blob ' + str(len(raw)).encode() + b'\0' + raw).hexdigest()
            require(blob == row['git_blob'], 'input Git blob differs: ' + name)


def package_integrity(package=HERE):
    rows = read(package / 'manifest.json')['files']
    actual = {p.relative_to(package).as_posix() for p in package.rglob('*')
              if p.is_file() and p.name != 'manifest.json' and '__pycache__' not in p.parts}
    require(actual == {r['path'] for r in rows}, 'package membership differs')
    pin_files(package, rows)


def load_module(name, path):
    spec = importlib.util.spec_from_file_location(name, path)
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


def folder(host):
    return 'windows-sdk' if host == 'windows' else host + '-sysroot'


def compile_args(label):
    host = 'linux' if label == 'linux-repeat' else label
    require(label in LABELS, 'unknown compilation')
    return [*PREFIX, '--sysroot', '..\\' + folder(host) + '\\rust',
            '--emit=asm,obj', 'probe.rs', '--out-dir', '..\\run\\' + label]


def component_metadata(package=HERE):
    result = {}
    for host in HOSTS:
        data = read(package / (host + '-components.json'))
        asset = data['asset']
        require(asset['digest'] == 'sha256:' + data['archive_sha256'], 'publisher digest differs')
        require(asset['browser_download_url'].startswith(
            'https://github.com/anza-xyz/platform-tools/releases/download/v1.54/'), 'release differs')
        rows = data['files']
        names = [safe_name(r['path']) for r in rows]
        require(len(names) == len(set(names)), 'duplicate component')
        targets = [n for n in names if n.startswith(TARGET_DIR)]
        require(len(targets) == 26 and all('/' not in n[len(TARGET_DIR):] for n in targets),
                'target library set differs')
        for crate in ('core', 'alloc', 'std'):
            require(len([n for n in targets if re.fullmatch(
                re.escape(TARGET_DIR) + 'lib' + crate + r'-[0-9a-f]{16}\.rlib', n)]) == 1,
                'missing/ambiguous target crate')
        require(len(rows) == (38 if host == 'windows' else 27), 'component count differs')
        version = (package / 'versions' / (host + '.md')).read_bytes()
        require(identity(version) == {k: next(r for r in rows if r['path'] == 'version.md')[k]
                                     for k in ('bytes', 'sha256')}, 'version input differs')
        require(version.decode().split()[0] == RUST_REVISION, 'release Rust revision differs')
        result[host] = data
    return result


def archive_check(path, metadata):
    """Hash the entire publisher archive, then every selected regular component."""
    with path.open('rb') as stream:
        digest = hashlib.file_digest(stream, 'sha256').hexdigest()
    require(path.stat().st_size == metadata['asset']['size']
            and digest == metadata['archive_sha256'], 'publisher archive differs')
    expected = {r['path']: r for r in metadata['files']}
    seen = set()
    with tarfile.open(path, 'r|bz2') as archive:
        for member in archive:
            name = member.name.removeprefix('./')
            if name not in expected:
                continue
            require(member.isfile() and name not in seen, 'invalid/duplicate selected release member')
            row = expected[name]
            require(member.size == row['bytes'], 'selected member size differs')
            raw = archive.extractfile(member).read()
            require(identity(raw) == {k: row[k] for k in ('bytes', 'sha256')}, 'selected member differs')
            seen.add(name)
    require(seen == set(expected), 'release component missing')
    return dict(release_membership_rechecked=True, archive_sha256=digest, selected_components=len(seen))


def validate_run(package=HERE, run=None):
    run = run or package / 'run'
    metadata = component_metadata(package)
    source = read(package / 'probe-input.json')
    pin_files(package / 'source', [{**source, 'path': 'probe.rs'}])
    rows = read(run / 'commands.json')
    require([r['label'] for r in rows] == ['version', 'target-list', *LABELS], 'command cohort differs')
    previous = None
    for row in rows:
        label = row['label']
        expected = (['-vV'] if label == 'version' else ['--print', 'target-list']
                    if label == 'target-list' else compile_args(label))
        require(row['arguments'] == expected and row['cwd'] == 'source', 'command inputs differ')
        require(type(row['exit']) is int and row['exit'] == 0, 'command did not succeed')
        start, end = [datetime.fromisoformat(row[k]) for k in ('started_at', 'finished_at')]
        require(start.tzinfo is not None and end.tzinfo is not None and start <= end
                and (previous is None or previous <= start), 'invalid command ordering')
        previous = end
        for stream in ('stdout', 'stderr'):
            raw = (run / (label + '.' + stream + '.log')).read_bytes()
            require(identity(raw) == row[stream], 'command log differs')
            if label in LABELS or stream == 'stderr':
                require(not raw, 'unexpected compiler diagnostic')
        if label in LABELS:
            expected_outputs = {'relay_typeid_probe.o', 'relay_typeid_probe.s'}
            require(set(row['outputs']) == expected_outputs, 'incomplete output record')
            actual = {p.name for p in (run / label).iterdir()}
            require(actual == expected_outputs, 'output membership differs')
            for name, output in row['outputs'].items():
                raw = (run / label / name).read_bytes()
                require(raw and identity(raw) == output, 'compiler output differs')
    for suffix in ('o', 's'):
        name = 'relay_typeid_probe.' + suffix
        require((run / 'linux' / name).read_bytes() == (run / 'linux-repeat' / name).read_bytes(),
                'complete Linux repeat differs')
    version = (run / 'version.stdout.log').read_text().splitlines()
    require(version == ['rustc 1.89.0-dev', 'binary: rustc', 'commit-hash: unknown',
                        'commit-date: unknown', 'host: x86_64-pc-windows-msvc',
                        'release: 1.89.0-dev', 'LLVM version: 20.1.7'], 'compiler self-report differs')
    targets = (run / 'target-list.stdout.log').read_text().splitlines()
    require(targets.count('sbpf-solana-solana') == 1, 'generic-v0 target absent/duplicated')
    obs = read(run / 'observation.json')
    compiler = next(r for r in metadata['windows']['files'] if r['path'] == 'rust/bin/rustc.exe')
    require(obs['status'] == 'COMPLETED' and obs['successful_compilations'] == 4,
            'incomplete compilation observation')
    require(obs['compiler_exe_sha256'] == compiler['sha256']
            and obs['source_sha256'] == source['sha256'], 'observed compiler/source differs')
    require(obs['source_unchanged'] is True and obs['selected_components_unchanged'] is True,
            'input immutability observation absent')
    require(all(type(obs[k]) is int and obs[k] == 0 for k in
                ('target_executions', 'linker_executions', 'registry_downloads'))
            and obs['network_requested_by_commands'] is False, 'execution scope differs')
    return metadata


def derive_object(raw, alloc, elf, method):
    obj = elf.Elf(raw)
    require((obj.kind, obj.machine, obj.flags) == (1, 263, 0), 'expected generic-v0 ET_REL')
    functions = method.functions(obj)
    selected = [f for f in functions if alloc.FAMILY.fullmatch(f['symbol'])]
    controls = [f for f in functions if f['symbol'] == 'io_error_type_id']
    require(len(selected) == len(controls) == 1, 'type-ID function selection is ambiguous')
    output = {}
    for key, f in (('boxed_string_error', selected[0]), ('io_error_control', controls[0])):
        body = elf.body(obj, f)
        require(not obj.object_relocations(f), 'type-ID body has object relocation')
        output[key] = dict(function=f, raw_hex=body.hex(), constants=alloc.decode_type_id(body))
    require(output['boxed_string_error']['raw_hex'] != output['io_error_control']['raw_hex'],
            'direct IO control conflated with boxed StringError')
    output['string_error_table'] = alloc.object_references(obj, selected[0])
    return dict(**identity(raw), **output)


def derive(repo, package=HERE):
    validate_run(package)
    parent = repo / PARENT
    alloc = load_module('controlled_alloc_analysis', parent / 'analyze.py')
    elf, method = alloc.helpers(repo)
    # Recompute the parent object/linked/capture relationships, not just its JSON.
    baseline = alloc.derive(repo, parent)
    capture = elf.Elf((repo / alloc.CAPTURE).read_bytes())
    result = {}
    for label in LABELS:
        raw = (package / 'run' / label / 'relay_typeid_probe.o').read_bytes()
        row = derive_object(raw, alloc, elf, method)
        for key in ('boxed_string_error', 'io_error_control'):
            body = bytes.fromhex(row[key]['raw_hex'])
            row[key]['capture_matches'] = alloc.capture_matches(capture, body, method)
        host = 'linux' if label == 'linux-repeat' else label
        selected = row['boxed_string_error']
        if host in ('linux', 'darwin'):
            prior = baseline['hosts'][host]['selected_type_id']
            require(selected['raw_hex'] == prior['raw_hex'], 'fresh body differs from shipped/linked body')
            selected['equal_to_shipped_alloc_and_two_linked_copies'] = True
        else:
            selected['equal_to_shipped_alloc_and_two_linked_copies'] = False
        matches = [h['file_offset'] for h in selected['capture_matches']]
        require(matches == ([599768, 666624] if host == 'linux' else []), 'raw capture cohort differs')
        require(not row['io_error_control']['capture_matches'], 'unexpected IO control capture match')
        result[label] = row
    require(len({result[h]['boxed_string_error']['raw_hex'] for h in HOSTS}) == 3,
            'expected three distinct host-library bodies')
    return dict(compilations=result, successful_compilations=4,
                linux_repeat_complete_object_equal=True, linux_repeat_complete_assembly_equal=True,
                changed_input='complete generic-v0 target library set; not alloc alone',
                known_raw_capture_ranges=2, newly_added_raw_capture_ranges=0,
                possible_prior_linked_to_capture_pairs=4, unique_copy_attribution=False,
                historical_compiler_or_type_proven=False, linker_or_target_executions=0)


def validate_replay(package=HERE):
    validate_run(package, run=package / 'replay')
    obs = read(package / 'replay/observation.json')
    require(obs['all_eight_outputs_equal_to_retained'] is True, 'replay equality observation missing')
    for label in LABELS:
        for suffix in ('o', 's'):
            name = 'relay_typeid_probe.' + suffix
            require((package / 'replay' / label / name).read_bytes()
                    == (package / 'run' / label / name).read_bytes(), 'fresh replay output differs')


def verify(repo, package=HERE, archives=None):
    package_integrity(package)
    pin_files(repo, read(package / 'inputs.json')['files'])
    # Verify the previous packet's manifest before loading its code.
    previous = load_module('controlled_parent_verify', repo / PARENT / 'verify.py')
    previous.verify(repo, package=repo / PARENT)
    result = derive(repo, package)
    require(result == read(package / 'findings.json'), 'regenerated findings differ')
    validate_replay(package)
    metadata = component_metadata(package)
    checks = {h: dict(release_membership_rechecked=False) for h in HOSTS}
    for host, path in (archives or {}).items():
        require(host in HOSTS, 'unknown archive host')
        checks[host] = archive_check(path, metadata[host])
    return dict(retained_original_compilations=4, retained_replay_compilations=4,
                fresh_compiler_executions=0,
                linux_repeat_object_and_assembly_equal=True, known_raw_capture_ranges=2,
                newly_added_raw_capture_ranges=0, archive_checks=checks,
                historical_compiler_or_type_proven=False)


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--repo', type=Path, default=HERE.parents[1])
    for host in HOSTS:
        parser.add_argument('--' + host + '-archive', type=Path)
    args = parser.parse_args()
    archives = {h: getattr(args, h + '_archive') for h in HOSTS if getattr(args, h + '_archive')}
    print(json.dumps(verify(args.repo, archives=archives), indent=2))
