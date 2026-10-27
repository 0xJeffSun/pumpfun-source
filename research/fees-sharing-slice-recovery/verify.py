"""Authenticate the reconstructed Rust source and the 577-window Fees frontier."""
from pathlib import Path
import difflib
import gzip
import hashlib
import importlib.util
import json
import struct
from functools import lru_cache

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[1]


def sha(data):
    return hashlib.sha256(data).hexdigest()


def read(path):
    return path.read_bytes() if path.exists() else gzip.decompress(path.with_name(path.name + '.gz').read_bytes())


def load(path):
    return json.loads(read(path))


def module(name, path):
    spec = importlib.util.spec_from_file_location(name, path)
    value = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(value)
    return value


def location(w, image, target):
    assert dict(w.m.relocations(image)).get(target, 0) & 0xffffffff == 8
    low, ptr, n, line, column = struct.unpack('<IIQII', w.m.at_address(image, target, 24))
    assert low == 0 and 0 < n <= 300 and 0 < line <= 100000 and 0 < column <= 300
    name = w.m.at_address(image, ptr, n)
    assert name.endswith(b'.rs') and all(32 <= c < 127 for c in name)
    return name.decode(), line, column


def verify():
    manifest = load(HERE / 'manifest.json')
    files = list(HERE.rglob('*'))
    assert not any(p.is_symlink() for p in files)
    assert {str(p.relative_to(HERE)) for p in files if p.is_file() and p != HERE / 'manifest.json'} == set(manifest)
    assert {str(p.relative_to(HERE)) for p in files if p.is_dir()} == {str(p) for n in manifest for p in Path(n).parents if str(p) != '.'}
    for name, digest in manifest.items():
        assert sha((HERE / name).read_bytes()) == digest, name
    for name, digest in load(HERE / 'external-inputs.json').items():
        assert sha((ROOT / name).read_bytes()) == digest, name
    meta = load(HERE / 'parent.json')
    parent = ROOT / meta['path']
    assert sha((parent / 'manifest.json').read_bytes()) == meta['manifest_sha256']
    for name, digest in load(parent / 'manifest.json').items():
        assert sha((parent / name).read_bytes()) == digest, name

    sources = {str(p.relative_to(HERE / 'sources')).removesuffix('.gz'): sha(gzip.decompress(p.read_bytes()))
               for p in (HERE / 'sources').rglob('*') if p.is_file()}
    previous = {str(p.relative_to(parent / 'sources')).removesuffix('.gz'): sha(gzip.decompress(p.read_bytes()))
                for p in (parent / 'sources').rglob('*') if p.is_file()}
    assert len(sources) == 46 and set(previous) <= set(sources)
    assert set(sources) - set(previous) == {
        'programs/pump-fees/src/instructions/admin/extend_fee_config.rs',
        'programs/pump-fees/src/instructions/withdraw.rs',
    }
    assert {p for p in previous if sources[p] != previous[p]} == {
        'programs/pump-fees/src/common/mod.rs',
        'programs/pump-fees/src/donation.rs',
        'programs/pump-fees/src/instructions/admin/mod.rs',
        'programs/pump-fees/src/instructions/buyback/mod.rs',
        'programs/pump-fees/src/instructions/fee_sharing/create_donation_fee_pda.rs',
        'programs/pump-fees/src/instructions/fee_sharing/create_fee_sharing_config.rs',
        'programs/pump-fees/src/instructions/fee_sharing/mod.rs',
        'programs/pump-fees/src/instructions/fee_sharing/update_fee_shares.rs',
        'programs/pump-fees/src/instructions/fee_sharing/update_fee_shares_v2.rs',
        'programs/pump-fees/src/instructions/mod.rs',
        'programs/pump-fees/src/lib.rs',
        'programs/pump-fees/src/sharing_update.rs',
        'programs/pump-fees/src/social.rs',
    }
    assert load(HERE / 'composition.json')['final_inputs'] == sources
    patch = []
    for name in sorted(sources):
        old_path = parent / ('sources/' + name)
        old = read(old_path).decode() if name in previous else ''
        new = read(HERE / ('sources/' + name)).decode()
        if old != new:
            patch.extend(difflib.unified_diff(old.splitlines(True), new.splitlines(True),
                         fromfile=('a/' + name if name in previous else '/dev/null'), tofile='b/' + name))
    assert read(HERE / 'source.patch') == ''.join(patch).encode()
    legacy = read(HERE / 'sources/programs/pump-fees/src/instructions/fee_sharing/update_fee_shares.rs').decode()
    assert 'pub(crate) fn prepare_legacy_payout' in legacy and 'remaining: &&[AccountInfo' in legacy
    assert 'remaining.get(i).ok_or_else(|| error!(FeeError::NotEnoughRemainingAccounts))?' in legacy
    v2 = read(HERE / 'sources/programs/pump-fees/src/instructions/fee_sharing/update_fee_shares_v2.rs').decode()
    assert v2.splitlines()[235] == '         let j = n + i;'

    w = module('legacy_slice_windows', ROOT / 'research/fees-composed-frontier188/window_map.py')
    # Inputs are immutable bytes; cache repeated layout and relocation decoding.
    # The complete cached report was compared with the uncached parser output.
    w.m.elf_layout = lru_cache(maxsize=8)(w.m.elf_layout)
    w.m.relocations = lru_cache(maxsize=8)(w.m.relocations)
    original = (ROOT / 'evidence/original/pump_fees/deployed.so').read_bytes()
    candidate = read(HERE / 'artifacts/candidate-symbols.so')
    stripped = read(HERE / 'artifacts/candidate-candidate.so')
    baseline = read(parent / 'artifacts/candidate-symbols.so')
    assert stripped != original and stripped != original[:w.m.elf_layout(original)['elf_extent']]
    allocated = lambda image: {s['name']: s for s in w.m.elf_layout(image)['sections'] if s['flags'] & 2}
    stripped_sections, symbol_sections = allocated(stripped), allocated(candidate)
    assert stripped_sections.keys() == symbol_sections.keys()
    for name, section in stripped_sections.items():
        other = symbol_sections[name]
        assert all(section[k] == other[k] for k in ['address', 'type', 'size', 'flags'])
        if section['type'] != 8:
            assert w.m.section_data(stripped, name) == w.m.section_data(candidate, name)
    for label in ['candidate', 'repeat']:
        launch, result = load(HERE / f'builds/{label}-launch.json'), load(HERE / f'builds/{label}-result.json')
        assert launch['inputs'] == sources and result['source_unchanged'] and result['exit_code'] == 0
        assert '--offline' in launch['command'] and '--locked' in launch['command'] and 'sbpf-solana-solana' in launch['command']
        assert sum(x.startswith('--remap-path-prefix=') for x in launch['command']) == 3
        assert result['symbols_sha256'] == sha(candidate) and result['candidate_sha256'] == sha(stripped)
        log = read(HERE / f'builds/{label}-build.log')
        assert sha(log) == result['log_sha256'] and b'Compiling pump-fun-fees-candidate' in log
        assert b'rustc --crate-name pump_fees_candidate' in log

    ow = w.windows(original)
    oi = {x['address']: x for x in ow}
    rel = dict(w.m.relocations(original))
    reports = {}
    for label, image, total, unique, locations_expected, equal_expected in [
        ('baseline', baseline, 574, 427, 171, 3792),
        ('candidate', candidate, 577, 430, 181, 3870),
    ]:
        cw = w.windows(image)
        ci = {x['address']: x for x in cw}
        result = w.compare(ow, cw)
        assert len(result['unique_pairs']) == unique
        sigs, raw = {x['signature'] for x in cw}, {x['raw_sha256'] for x in cw}
        covered = {x['address'] for x in ow if x['signature'] in sigs}
        raw_covered = {x['address'] for x in ow if x['raw_sha256'] in raw}
        assert len(covered) == total and len(raw_covered) == 143
        edges, locations = {}, 0
        for pair in result['unique_pairs']:
            a, b = pair['original'], pair['candidate']
            for x, y in zip(w.m.instructions(original, a['address'], a['bytes']), w.m.instructions(image, b['address'], b['bytes'])):
                kind = rel.get(a['address'] + x['offset'], 0) & 0xffffffff
                if kind == 8:
                    try:
                        left = location(w, original, x['lddw_value'])
                    except (AssertionError, ValueError, StopIteration, struct.error):
                        continue
                    assert left == location(w, image, y['lddw_value'])
                    locations += 1
                if 'call_target' in x and kind != 10:
                    edges[a['address'], x['offset']] = oi[x['call_target']]['signature'] == ci[y['call_target']]['signature']
        assert locations == locations_expected and sum(edges.values()) == equal_expected
        reports[label] = covered, raw_covered, edges, result
    a, b = reports['baseline'], reports['candidate']
    assert b[0] - a[0] == {199072, 211408, 219376} and not a[0] - b[0] and a[1] == b[1]
    assert all(not equal or b[2].get(key, False) for key, equal in a[2].items())
    pair = next(p for p in b[3]['unique_pairs'] if p['original']['address'] == 199072)
    assert pair['original']['bytes'] == pair['candidate']['bytes'] == 5008
    assert pair['original']['signature'] == pair['candidate']['signature'] == '7a92ac8c415c67fffe7d6c8b9722cde7ba66d3c4f0cb973411d22e51d699242d'
    assert pair['original']['raw_sha256'] != pair['candidate']['raw_sha256']
    quote = next(p for p in b[3]['unique_pairs'] if p['original']['address'] == 219376)
    assert quote['original']['bytes'] == quote['candidate']['bytes'] == 6544
    assert quote['original']['signature'] == quote['candidate']['signature'] == '22e05cce7c133ad2997144d0da71839e7b0140300cedad07ba5bcc74503727b3'
    assert quote['original']['raw_sha256'] != quote['candidate']['raw_sha256']
    caller = next(p for p in b[3]['unique_pairs'] if p['original']['address'] == 211408)
    assert caller['original']['bytes'] == caller['candidate']['bytes'] == 7968
    assert caller['original']['signature'] == caller['candidate']['signature'] == '3c167f0d69ba43641e639c5462b633005e622949493522cae01092bad74453c2'
    assert caller['original']['raw_sha256'] != caller['candidate']['raw_sha256']

    run = load(HERE / 'runtime.json')
    execution = load(HERE / 'runtime-execution.json')
    assert execution['jobs'] == 4 and execution['candidate_sha256'] == sha(stripped)
    assert execution['canonical_runner_sha256'] == sha((ROOT / 'scripts/fees_validate_all.py').read_bytes())
    assert execution['suites'].keys() == run['suites'].keys()
    for row in execution['suites'].values():
        assert row['exit_code'] == 0
        script = Path(row['command'][2])
        relative = script.relative_to(Path(row['command'][2]).parents[1])
        assert sha((ROOT / relative).read_bytes()) == row['script_sha256']
    parallel_control = load(HERE / 'parallel-control.json')
    assert parallel_control == load(HERE / 'sequential-control.json')
    equivalence = load(HERE / 'parallel-equivalence.json')
    assert equivalence['equal_complete_report'] is True
    assert equivalence['candidate_sha256'] == parallel_control['candidate_sha256']
    assert equivalence['case_count'] == parallel_control['case_count'] == 17331
    run_result = load(HERE / 'runtime-result.json')
    assert run_result['exit_code'] == 0 and run_result['candidate_sha256'] == sha(stripped)
    assert run_result['log_sha256'] == sha(read(HERE / 'runtime.log'))
    assert run['case_count'] == 17331 and len(run['suites']) == 18 and not run['mismatches']
    assert run['candidate_sha256'] == sha(stripped) and run['original_sha256'] == sha(original)
    assert sum(s['case_count'] for s in run['suites'].values()) == 17331
    previous_run = load(parent / 'runtime.json')
    assert run['suites'].keys() == previous_run['suites'].keys()
    compared = 0
    for name, suite in run['suites'].items():
        assert suite['candidate_sha256'] == sha(stripped) and suite['original_sha256'] == sha(original)
        assert len(suite['cases']) == suite['case_count']
        assert not suite.get('mismatches', suite.get('failures', []))
        identity = lambda case: json.dumps(case.get('case', case.get('name')), sort_keys=True)
        identities = [identity(case) for case in suite['cases']]
        # Preserve the sealed parent's complete ordering and multiplicities.
        # Its configuration suite intentionally contains one repeated input.
        assert identities == [identity(case) for case in previous_run['suites'][name]['cases']]
        for case in suite['cases']:
            if name != 'queries':
                assert case.get('match') is True
            left, right = case.get('original'), case.get('candidate')
            assert isinstance(left, dict) and isinstance(right, dict) and left.keys() == right.keys()
            assert all(left[k] == right[k] for k in left if k != 'logs')
            if isinstance(left, dict) and isinstance(right, dict) and 'logs' in left and 'logs' in right:
                app = lambda value: [line for line in value['logs'] if line.startswith(('Program log:', 'Program data:'))]
                assert app(left) == app(right)
                compared += 1
    assert compared == 6413
    assert load(HERE / 'claims.json') == {
        'normalized_functions': 577, 'total_original_functions': 585,
        'gained_original_addresses': [199072, 211408, 219376], 'raw_local_matches': 143,
        'unique_pairs': 430, 'equal_locations': 181, 'equal_direct_callee_observations': 3870,
        'whole_meaningful_elf_equal': False, 'whole_capture_equal': False,
        'candidate_sha256': sha(stripped), 'symbols_sha256': sha(candidate),
        'runtime_cases': 17331, 'runtime_suites': 18,
    }
    print('PASS: Fees577; legacy199072/5008 and quote219376/6544 and V2caller211408/7968 normalized matches;143raw;181Locations;3870edges;17331cases;wholeELFunequal')


if __name__ == '__main__':
    verify()
