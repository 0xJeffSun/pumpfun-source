"""Verify retained source, build, comparison and local runtime evidence; no build or VM execution."""
import base64
import difflib
import gzip
import hashlib
import importlib.util
import io
import json
from pathlib import Path
import re
import sys
import tarfile

sys.dont_write_bytecode = True
PACKET = Path(__file__).resolve().parent
ROOT = PACKET.parents[1]
ORIGINAL = '7a19affaa2c6187e04a5fe0ea298cee81fa5eb8c24cfcc30d85f615e89f7b02d'
UNITS = re.compile(r'^Program [1-9A-HJ-NP-Za-km-z]+ consumed [0-9]+ of [0-9]+ compute units$')


def require(condition, message):
    if not condition:
        raise ValueError(message)


def sha(data):
    return hashlib.sha256(data).hexdigest()


def read(path):
    raw = path.read_bytes()
    return gzip.decompress(raw) if raw[:2] == b'\x1f\x8b' else raw


def record(path):
    return json.loads(read(path))


def module(path):
    spec = importlib.util.spec_from_file_location(path.stem, path)
    value = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(value)
    return value


def logical(pins, expected):
    result = {}
    for key, value in pins.items():
        matches = sorted((name for name in expected if key == name or key.endswith('/' + name)), key=len)
        require(matches, 'unrecognized compiled input: ' + key)
        name = matches[-1]
        require(name not in result, 'compiled input alias: ' + name)
        result[name] = value
    require(result == expected, 'compiled source pins differ')


def check_toolchain(result, packet=PACKET, repository_builder=False):
    spec_bytes = (packet / 'tools/pump_linux_v144_sbpf_libraries.json').read_bytes()
    require(sha(spec_bytes) == '7e2461b5ec54416d6b64508af1e2677f63afd83d35e9a3eeae6ca877ae879f1e', 'admitted target profile differs')
    spec = json.loads(spec_bytes)
    expected = {name: spec['native_tools'][path] for name, path in [('rustc', 'rust/bin/rustc'), ('cargo', 'rust/bin/cargo')]}
    expected['objcopy'] = '8f79cc9a0eab0bd1b19a2ad789e5cb5e6f22d16c2f147d58ca30b9b51d2231e1'
    require(result['tool_sha256'] == expected, 'native tool pins differ')
    require(result['source_wrapper_sha256'] == 'd959fe0074fafe7f310a8f40051ce87f795b1e81b104a38dfe57086efa6bae1b', 'physical source wrapper differs')
    profile = result['target_library_profile']
    require(profile['name'] == spec['name'] == 'linux-v1.44-sbpf' and profile['status'] == 'verified' and profile['native_host_files_unchanged'], 'target profile was not verified')
    require(profile['profile_spec_sha256'] == sha(spec_bytes) and profile['cache_context']['target_libraries'] == spec['target_libraries'] and len(spec['target_libraries']) == 25, 'target library pins differ')
    require(profile['cache_context']['native_sdk_manifest_sha256'] == '9688cfa0061dd0ed27384698603848f847a70869a6f2ca1b4b4ec0d77cc043da' and profile['cache_context']['prepared_sdk_manifest_sha256'] == 'a06465edb97a6dbd9b7c5368056d0f91f913132ff7c28383d85071055a92e7bc', 'SDK manifests differ')
    require(result['command'][result['command'].index('--target') + 1] == 'sbpf-solana-solana' and '--locked' in result['command'] and '--offline' in result['command'], 'build target or lock mode differs')
    require(result['environment']['CARGO_TARGET_SBPF_SOLANA_SOLANA_RUSTFLAGS'] == '-Zremap-cwd-prefix=', 'target flags differ')
    if repository_builder:
        libraries = result['target_libraries_sha256']
        require(result['builder_sha256'] == 'a0d6f5a995b1600fa716499188b0addf13005c1622fc0fb85c8450a394aa536e' and result['target_libraries_unchanged'] and {name: value['sha256'] for name, value in libraries.items()} == spec['target_libraries'], 'repository builder or libraries differ')


def check_focused(report):
    from solders.transaction import Transaction
    expected = {'combined_buyback_overflow': 371, 'combined_buyback_nearby': 375,
                'first_cost_overflow': 285, 'cost_sum_overflow': 375,
                'finite_cost': None, 'non_crossing': None}
    require(len(report['cases']) == 6, 'six fresh triples required')
    require({r['case']['label'] for r in report['cases']} == set(expected), 'focused cases changed')
    for row in report['cases']:
        runs, observations = row['runs'], row['observations']
        require(set(runs) == set(observations) == {'original', 'parent', 'proposal'}, 'triple missing')
        require(len({v['transaction_base64'] for v in runs.values()}) == 1, 'different signed transaction inputs')
        for name, run in runs.items():
            raw = base64.b64decode(run['transaction_base64'], validate=True)
            tx = Transaction.from_bytes(raw)
            require(bytes(tx) == raw and all(tx.verify_with_results()), 'invalid signed transaction')
            obs = observations[name]
            require(obs['transaction_base64'] == run['transaction_base64'] and obs['signatures_valid'], 'transaction observation binding')
            require(obs['metadata']['logs'] == run['logs'], 'metadata/log binding')
            require(obs['loaded_programs'][-1]['elf_sha256'] == report['binary_sha256'][name], 'actual VM load binding')
        for key in ('before', 'after'):
            require(observations['original'][key] == observations['parent'][key] == observations['proposal'][key], key + ' account state differs')
        for key in ('error', 'accounts', 'inner_instructions', 'event_payloads', 'return_data'):
            require(runs['original'][key] == runs['parent'][key] == runs['proposal'][key], key + ' differs')
        logs = lambda run: [line for line in run['logs'] if not UNITS.fullmatch(line)]
        require(logs(runs['original']) == logs(runs['proposal']), 'focused diagnostic differs beyond runtime compute usage')
        line = expected[row['case']['label']]
        if line is None:
            require(runs['original']['error'] is None, 'successful control failed')
        else:
            marker = 'programs/pump/src/trade_v3.rs:' + str(line) + '.'
            require(any(marker in text for text in runs['original']['logs']), 'original Source site absent')
            require(runs['original']['error'] is not None, 'overflow control succeeded')
            if line in (371, 375):
                require(any('programs/pump/src/trade_v3.rs:390.' in text for text in runs['parent']['logs']), 'parent mismatch not witnessed')


def verify(packet=PACKET):
    seal = record(packet / 'MANIFEST.json')
    files = {p.relative_to(packet).as_posix(): p for p in packet.rglob('*') if p.is_file()}
    require(set(files) == set(seal) | {'MANIFEST.json'}, 'packet file inventory differs')
    require(all(not files[name].is_symlink() and sha(files[name].read_bytes()) == digest for name, digest in seal.items()), 'packet file hash differs')
    require(sha((ROOT / 'evidence/original/pump/deployed.so').read_bytes()) == ORIGINAL, 'original binary differs')
    primary = record(packet / 'sources/primary-sha256.json')
    with tarfile.open(fileobj=io.BytesIO(read(packet / 'sources/primary.tar.gz'))) as archive:
        members = archive.getmembers()
        require(len(members) == 65 and all(m.isfile() for m in members), '65 regular Rust build inputs required')
        source = {m.name: archive.extractfile(m).read() for m in members}
    require({name: sha(blob) for name, blob in source.items()} == primary, 'primary archive differs')
    old = read(packet / 'sources/parent-trade_v3.rs.gz')
    patch = ''.join(difflib.unified_diff(old.decode().splitlines(True), source['src/trade_v3.rs'].decode().splitlines(True), fromfile='a/src/trade_v3.rs', tofile='b/src/trade_v3.rs'))
    require(patch == (packet / 'source.patch').read_text(), 'source patch differs from compiled Rust')
    staged = {'programs/pump/' + name: blob for name, blob in source.items()}
    cargo = source['Cargo.toml'].decode()
    a, b = cargo.index('[profile.release]'), cargo.index('[workspace]')
    staged['programs/pump/Cargo.toml'] = (cargo[:a].rstrip() + '\n').encode()
    staged['Cargo.toml'] = ('[workspace]\nmembers = ["programs/pump"]\nresolver = "2"\n\n' + cargo[a:b].strip() + '\n').encode()
    staged['Cargo.lock'] = staged.pop('programs/pump/Cargo.lock')
    staged_pins = {name: sha(blob) for name, blob in staged.items()}
    artifacts = {}
    for label in ('parent', 'proposal', 'repeat'):
        result = record(packet / f'builds/{label}-result.json.gz')
        check_toolchain(result, packet)
        launch = record(packet / f'builds/{label}-launch.json.gz')
        require(all(result[k] == v for k, v in launch.items()), 'launch/result disagreement')
        require(result['exit_code'] == 0 and result['source_unchanged'] and result['root_invocations'] == 1, 'fresh successful root compilation required')
        log = read(packet / f'builds/{label}-build.log.gz')
        require(sha(log) == result['log_sha256'] and log.count(b'--crate-name pump_recovered ') == 1, 'root compiler log differs')
        require(result['original_binary_build_input'] is False, 'original used as build input')
        if label == 'parent':
            parent_primary = dict(primary, **{'src/trade_v3.rs': sha(old)})
            logical(result['primary_source_sha256'], parent_primary)
        else:
            logical(result['primary_source_sha256'], primary)
            logical(result['source_sha256'], staged_pins)
        artifacts[label] = {}
        for name, field in [('candidate.so', 'candidate_sha256'), ('unstripped.so', 'unstripped_sha256')]:
            blob = read(packet / f'artifacts/{label}-{name}.gz')
            require(sha(blob) == result[field], 'compiled ELF digest differs')
            artifacts[label][name] = sha(blob)
    require(artifacts['proposal'] == artifacts['repeat'], 'fresh repeat differs')
    for label in ('cli', 'packet-rebuild'):
        result = record(packet / f'builds/{label}-build-comparison.json.gz')
        check_toolchain(result, packet, repository_builder=True)
        require(result['returncode'] == 0 and result['source_unchanged'] and result['workspace_layout'], 'repository builder failed')
        require(result['comparison']['candidate_sha256'] == artifacts['proposal']['candidate.so'] and result['unstripped_sha256'] == artifacts['proposal']['unstripped.so'], 'repository builder outputs differ')
        logical(result['source_sha256'], staged_pins)
        logical(result['primary_source_sha256'], primary)
        logical(result['source_after_sha256'], staged_pins)
        log = read(packet / f'builds/{label}-build.log.gz')
        require(sha(log) == result['build_log_sha256'] and log.count(b'Compiling pump-recovered v0.1.0 ') == 1, 'repository builder root compilation status differs')
    analysis = module(packet / 'tools/analyze.py').analyze(ROOT / 'evidence/original/pump/deployed.so', packet / 'artifacts/parent-unstripped.so.gz', packet / 'artifacts/proposal-unstripped.so.gz', packet / 'sources/parent-inventory.json.gz', packet / 'tools')
    require(json.loads(json.dumps(analysis)) == record(packet / 'comparison.json.gz'), 'independent binary comparison differs')
    focused = record(packet / 'runtime/focused.json.gz')
    require(focused['binary_sha256'] == dict(original=ORIGINAL, parent=artifacts['parent']['candidate.so'], proposal=artifacts['proposal']['candidate.so']), 'focused binary bindings differ')
    require(focused['inputs_sha256']['research/pump-v3-buy-cost-overflow/tools/focused_costs.py'] == sha((packet / 'tools/focused_costs.py').read_bytes()), 'focused producer binding differs')
    check_focused(focused)
    full = record(packet / 'runtime/full44.json.gz')
    expected = record(packet / 'runtime/expected-cases.json')
    require(full['candidate_sha256'] == artifacts['proposal']['candidate.so'] and full['original_sha256'] == ORIGINAL, 'full corpus binary binding differs')
    require(full['case_count'] == sum(expected.values()) == 10468 and set(full['suites']) == set(expected) and len(expected) == 44, '44-suite corpus incomplete')
    logical(full['compiled_source_sha256'], staged_pins)
    binding_bytes = read(packet / 'builds/runtime-build-comparison.json.gz')
    binding = json.loads(binding_bytes)
    require(binding['returncode'] == 0 and binding['source_unchanged'] and binding['comparison']['candidate_sha256'] == artifacts['proposal']['candidate.so'], 'runtime build view differs')
    logical(binding['source_sha256'], staged_pins)
    logical(binding['source_after_sha256'], staged_pins)
    require([value for name, value in full['bound_files_sha256'].items() if name.endswith('/proposal-binding/build-comparison.json')] == [sha(binding_bytes)], 'full corpus/build view binding differs')
    require(not full['mismatches'] and full['loader_profile'] == 'captured-upgradeable', 'full corpus mismatch/loader profile')
    semantic = ('error', 'accounts', 'account', 'before', 'after', 'before_accounts', 'after_accounts', 'data_hex', 'lamports', 'payer_lamports', 'authority_lamports', 'user_lamports', 'creator', 'events', 'event_payloads', 'inner', 'inner_instructions', 'return', 'returns', 'return_data')
    for name, suite in full['suites'].items():
        cases = suite.get('cases')
        cases = suite['results'] if not isinstance(cases, list) else cases
        require(len(cases) == suite['case_count'] == expected[name], 'suite incomplete: ' + name)
        for case in cases:
            require(all(not case.get(k) for k in ('different_fields', 'differences', 'diff', 'mismatches', 'mismatched_fields')), 'saved mismatch in ' + name)
            require(case.get('match', case.get('matches', True)) is True, 'failed case in ' + name)
            for key in semantic:
                if key in case['original'] or key in case['candidate']:
                    require(case['original'].get(key) == case['candidate'].get(key), 'semantic mismatch in ' + name + '/' + key)
        loaded = record(packet / 'runtime/loaders' / (name + '.loader.json.gz'))
        require({v['elf_sha256'] for v in loaded['loads']} == {ORIGINAL, artifacts['proposal']['candidate.so']}, 'full loader binary binding')
        require(all(v['elf_prefix_unchanged'] and v['zero_allocation_tail'] and v['program_bytes'] == 36 and v['programdata_bytes'] == 10485760 for v in loaded['loads']), 'captured loader state differs')
    audit = module(packet / 'tools/pump_diagnostic_audit.py').audit(full['suites'])
    require(audit == full['diagnostics'] and audit['log_bearing_cases'] == 10464 and not audit['mismatches'], 'bounded diagnostic audit differs')
    ext = record(packet / 'runtime/extensions.json.gz')
    require(ext['candidate_sha256'] == artifacts['proposal']['candidate.so'] and ext['original_sha256'] == ORIGINAL and ext['case_count'] == len(ext['cases']) == 126 and not ext['mismatches'], 'Token-2022 extension comparison differs')
    require(all(c['match'] and all(c['original'][key] == c['candidate'][key] for key in ('error', 'accounts', 'inner_instructions', 'event_payloads', 'return_data')) for c in ext['cases']), 'extension case failed')
    return dict(verified=True, partial_recovery=True, whole_helper_equal=False, normalized=1018, raw=168, focused_triples=6, corpus_pairs=10468, extension_pairs=126)


if __name__ == '__main__':
    print(json.dumps(verify(), sort_keys=True))
