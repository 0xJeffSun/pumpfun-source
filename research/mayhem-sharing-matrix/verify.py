#!/usr/bin/env python3
"""Recompute the saved compiler-control matrix offline, without executing SBF."""
from collections import Counter
import argparse
import gzip
import hashlib
import importlib.util
import json
from pathlib import Path
import re
import tempfile

HERE = Path(__file__).resolve().parent
REPO = HERE.parents[1]


def module(name, path):
    spec = importlib.util.spec_from_file_location(name, path)
    value = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(value)
    return value


previous = module('allocator_evidence', REPO / 'research/mayhem-allocator-sharing/verify.py')
controls = module('matrix_controls', HERE / 'controls.py')
require, raw, read, digest, identity = previous.require, previous.raw, previous.read, previous.digest, previous.identity
LABELS = (*controls.VARIANTS, 'portable-repeat')


def actual_invocations(log, label):
    if label == 'portable-repeat':
        label = 'alloc-provider'
    calls = re.findall(r'^\s+Running .*rustc\.exe --crate-name (\w+) ([^\r\n]+)', log, re.M)
    require(len(calls) == 163 and sum('--target sbpf-solana-solana' in c for _, c in calls) == 85,
            'compilation cohort differs')
    for name in ('mayhem_recovered', 'curve_accounts', 'anchor_lang', 'solana_instructions_sysvar'):
        rows = [c for n, c in calls if n == name]
        require(len(rows) == 1 and '-C opt-level=3 ' in rows[0], 'required optimized crate differs')
    expected = {}
    if label.startswith(('alloc-', 'both-')):
        expected['solana_instructions_sysvar'] = 'yes' if label.endswith('-yes') else 'no'
    if label.startswith(('error-', 'both-')):
        expected['curve_accounts'] = 'yes' if label.endswith('-yes') else 'no'
    flags = {}
    metadata = {}
    for name, call in calls:
        found = re.findall(r'-Zshare-generics=(\w+)', call)
        require(len(found) <= 1, 'duplicate sharing flags')
        if found:
            flags[name] = found[0]
        if '--target sbpf-solana-solana' in call:
            tokens = re.findall(r'-C metadata=([0-9a-f]+)\b', call)
            require(len(tokens) == 1, 'metadata cohort differs')
            metadata.setdefault(name, []).append(tokens[0])
    require(flags == expected, 'sharing flag delivery differs')
    require('Finished ' in log, 'unfinished compilation')
    return dict(rustc=163, host=78, target=85, flags=flags,
                metadata={n: sorted(values) for n, values in metadata.items()})


def fixed_command(launch):
    command = list(launch['command'])
    require(command.count('--out-dir') == 1, 'ambiguous direct output')
    command[command.index('--out-dir') + 1] = '<output>'
    return command


def direct_pair(replay, toggle, label):
    left, right = fixed_command(replay), fixed_command(toggle)
    if label == 'baseline':
        require(right == left + ['-Zshare-generics=no'], 'direct control changed other arguments')
    else:
        require(left.count('-Zshare-generics=no') == 1, 'direct replay lacks flag')
        left.remove('-Zshare-generics=no')
        require(left == right, 'direct control changed other arguments')
    for key in ('cwd', 'environment', 'checked_executables', 'source_inputs'):
        require(replay[key] == toggle[key], 'direct control changed ' + key)


def verify(write=False):
    if not write:
        pins = read(HERE / 'manifest.json')['files']
        members = {p.relative_to(HERE).as_posix() for p in HERE.rglob('*')
                   if p.is_file() and p.name != 'manifest.json' and '__pycache__' not in p.parts}
        require(members == {r['path'] for r in pins}, 'packet membership differs')
        previous.pin_files(HERE, pins)
    previous.pin_files(REPO, read(HERE / 'inputs.json')['files'])
    sources = {r['path']: raw(HERE / 'sources' / (r['path'] + '.gz'))
               for r in read(HERE / 'source-inputs.json')['source_files']}
    require(len(sources) == 65 and {n: digest(b) for n, b in sources.items()} ==
            read(REPO / 'research/mayhem-source-data-recovery/source-inputs.json'), 'source cohort differs')
    for row in read(HERE / 'source-inputs.json')['source_files']:
        require(identity(sources[row['path']]) == {k: row[k] for k in ('bytes', 'sha256')}, 'source size differs')
    target = read(HERE / 'target-components.json')
    published_target = read(REPO / 'research/mayhem-source-data-recovery/provenance/target-libraries.json')
    require(target['archive_sha256'] == published_target['archive_sha256'], 'target archive differs')
    require({r['path'].removeprefix('rust/'): r['sha256'] for r in target['files'] if r['path'].startswith('rust/')}
            == published_target['files'], 'target libraries differ')
    compiler = read(HERE / 'compiler-source/inputs.json')
    require(compiler['declared_rust_revision'] in (HERE / 'compiler-source/version.md').read_text(), 'SDK source declaration differs')
    for row in compiler['files']:
        require(identity(raw(HERE / 'compiler-source' / (row['path'] + '.gz'))) ==
                {k: row[k] for k in ('bytes', 'sha256')}, 'compiler source differs')
    config = raw(HERE / 'compiler-source/compiler/rustc_session/src/config.rs.gz').decode()
    require('OptLevel::More | OptLevel::Aggressive => false,' in config
            and 'Some(setting) => setting,' in config, 'declared compiler default differs')
    options = raw(HERE / 'compiler-source/compiler/rustc_session/src/options.rs.gz').decode()
    require('share_generics: Option<bool> = (None, parse_opt_bool, [TRACKED]' in options, 'option tracking differs')
    layer = module('matrix_layer', REPO / previous.LAYER)
    original = layer.Elf(REPO / 'evidence/original/mayhem/deployed.so')
    original_windows = {r['id']: original.window(r['start'], r['end']) for r in read(REPO / previous.INVENTORY)['original_rows']}
    report = dict(builds={}, comparisons={}, direct={}, limits=dict(target_executions=0,
                  historical_flags_proven=False, raw_published_elf_equal=False, compiler_source_is_sdk_declared=True))
    payloads = {'published': raw(REPO / 'research/mayhem-source-data-recovery/artifacts/recovered/symbols.so.gz')}
    common_tools = None
    for label in LABELS:
        folder = HERE / 'builds' / label
        launch, result = read(folder / 'launch.json.gz'), read(folder / 'result.json.gz')
        require(result['status'] == 'SUCCEEDED' and result['returncode'] == 0 and result['source_unchanged']
                and result['root_invocations'] == 1 and result['target_executions'] == 0, 'build incomplete')
        require(launch['target_directory_initially_absent'] and launch['vendor_packages'] == 215, 'build inputs differ')
        require(launch['source_inputs'] == {n: digest(b) for n, b in controls.control_source(sources, label).items()}, 'control source differs')
        require('--locked' in launch['command'] and '--offline' in launch['command'], 'build not locked/offline')
        require('--remap-path-prefix=src/account_wrapper.rs=src/account_wrapper.rs' in launch['command'], 'root remap differs')
        tools = {n.replace('\\', '/').split('/')[-1]: h for n, h in launch['checked_executables'].items()}
        require(len(tools) == len(launch['checked_executables']), 'ambiguous tool names')
        if common_tools is None:
            common_tools = tools
        require(tools == common_tools, 'tools changed between controls')
        for name, pin in {**result['logs'], **result['outputs']}.items():
            require(identity(raw(folder / (name + '.gz'))) == pin, 'build output/log differs')
        report['builds'][label] = actual_invocations(raw(folder / 'stderr.log.gz').decode(), label)
        payloads[label] = raw(folder / 'symbols.so.gz')
    for label, row in report['builds'].items():
        row['metadata_changed_from_baseline'] = sorted(n for n, value in row['metadata'].items()
            if value != report['builds']['baseline']['metadata'][n])
    require(payloads['portable-repeat'] == payloads['alloc-provider'], 'portable raw repetition differs')
    require(raw(HERE / 'builds/portable-repeat/candidate-v154-strip.so.gz') ==
            raw(HERE / 'builds/alloc-provider/candidate-v154-strip.so.gz'), 'portable stripped repetition differs')
    with tempfile.TemporaryDirectory() as temporary:
        counts = {}
        for label, data in payloads.items():
            path = Path(temporary) / (label + '.so'); path.write_bytes(data)
            elf = layer.Elf(path); windows = previous.functions(elf)
            count = Counter(previous.shape(w) for w in windows.values()); counts[label] = count
            hashes = {w['raw_sha256'] for w in windows.values()}
            row = dict(**identity(data), text_bytes=elf.hi - elf.lo, functions=len(windows),
                normalized_ids=sorted(k for k, w in original_windows.items() if previous.shape(w) in count),
                raw_ids=sorted(k for k, w in original_windows.items() if w['raw_sha256'] in hashes))
            if label != 'published':
                require(data != payloads['published'], 'unexpected whole ELF equality')
                for title, delta in [('missing_shapes', counts['published'] - count), ('extra_shapes', count - counts['published'])]:
                    row[title] = [dict(bytes=k[0], normalized_sha256=k[1], pattern=json.loads(k[2]), count=n)
                                  for k, n in sorted(delta.items())]
                row['raw_added'] = sorted(set(row['raw_ids']) - set(report['comparisons']['published']['raw_ids']))
                row['raw_lost'] = sorted(set(report['comparisons']['published']['raw_ids']) - set(row['raw_ids']))
                row['normalized_added'] = sorted(set(row['normalized_ids']) - set(report['comparisons']['published']['normalized_ids']))
                row['normalized_lost'] = sorted(set(report['comparisons']['published']['normalized_ids']) - set(row['normalized_ids']))
                require(not row['normalized_added'], 'new window claim requires review')
            report['comparisons'][label] = row
        require(counts['alloc-provider'] == counts['published'], 'allocator-profile multiset differs')
        require(counts['both-providers'] != counts['alloc-provider'], 'combined controls unexpectedly additive')
        require(len(report['comparisons']['error-provider-yes']['normalized_lost']) == 5
                and len(report['comparisons']['both-providers-yes']['normalized_lost']) == 8, 'negative controls differ')
    for label in ('baseline', 'alloc-provider'):
        parent = HERE / 'direct' / label
        replay, toggle = read(parent / 'replay/launch.json.gz'), read(parent / 'toggle/launch.json.gz')
        direct_pair(replay, toggle, label)
        build_launch = read(HERE / 'builds' / label / 'launch.json.gz')
        require(replay['source_inputs'] == build_launch['source_inputs']
                and replay['checked_executables'] == build_launch['checked_executables'], 'direct build inputs differ')
        metadata = [a.removeprefix('metadata=') for a in replay['command'] if a.startswith('metadata=')]
        require(metadata == report['builds'][label]['metadata']['solana_instructions_sysvar'], 'direct metadata not fixed to Cargo')
        members = {}
        for mode in ('replay', 'toggle'):
            folder = parent / mode; result = read(folder / 'result.json.gz')
            require(result['returncode'] == 0 and result['source_unchanged'] and result['dependencies_unchanged']
                    and result['tools_unchanged'] and result['target_executions'] == 0, 'direct replay incomplete')
            for name, pin in result['outputs'].items():
                require(identity(raw(folder / 'emit' / (name + '.gz'))) == pin, 'direct output differs')
            names = [n for n in result['outputs'] if n.endswith('.rlib')]
            require(len(names) == 1, 'ambiguous direct archive')
            archive = raw(folder / 'emit' / (names[0] + '.gz'))
            if mode == 'replay':
                require(all(result['equals_cargo'].values()) and archive == raw(HERE / 'builds' / label / (names[0] + '.gz')), 'direct baseline does not reproduce Cargo')
            dependency_hashes = read(parent / 'dependency-inputs.json.gz')
            if mode == 'replay':
                require(all(dependency_hashes['sbpf-solana-solana/release/deps/' + n] == pin['sha256']
                            for n, pin in result['outputs'].items()), 'direct input archive/metadata differs')
            members[mode] = previous.archive_members(archive)
        code = {n: digest(b) for n, b in members['replay'].items() if n.endswith('.o')}
        require(len(code) == 1 and code == {n: digest(b) for n, b in members['toggle'].items() if n.endswith('.o')}, 'direct machine code changed')
        require(members['replay']['lib.rmeta'] != members['toggle']['lib.rmeta'], 'direct metadata unexpectedly equal')
        report['direct'][label] = dict(code_members=code, code_equal=True, rmeta_equal=False,
                                     replay_matches_cargo=True, arguments_differ_only_by_flag_and_output=True)
    failed = read(HERE / 'failed-direct/baseline/replay/result.json.gz')
    require(failed['returncode'] == 0 and not any(failed['equals_cargo'].values()), 'failed baseline evidence differs')
    report['failed_replay'] = dict(reason='Wrong working directory; completed compilation failed exact Cargo baseline gate.',
                                   accepted_as_control=False)
    report['total_rustc_invocations'] = 8 * 163 + 4 + 1
    if write:
        (HERE / 'findings.json').write_text(json.dumps(report, indent=2) + '\n', encoding='utf8', newline='\n')
        pins = [dict(path=p.relative_to(HERE).as_posix(), **identity(p.read_bytes())) for p in sorted(HERE.rglob('*'))
                if p.is_file() and p.name != 'manifest.json' and '__pycache__' not in p.parts]
        (HERE / 'manifest.json').write_text(json.dumps(dict(files=pins), indent=2) + '\n', encoding='utf8', newline='\n')
    else:
        require(report == read(HERE / 'findings.json'), 'recomputed findings differ')
    return report


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--write', action='store_true', help='Regenerate reviewed findings and packet pins')
    report = verify(parser.parse_args().write)
    print(json.dumps(dict(verified=True, builds=len(report['builds']), direct_controls=len(report['direct']),
                         rustc_invocations=report['total_rustc_invocations'], target_executions=0)))
