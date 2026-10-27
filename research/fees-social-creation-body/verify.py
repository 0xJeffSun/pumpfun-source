"""Recompute the creation-body gain without changing the inherited matcher."""
from pathlib import Path
import gzip
import hashlib
import importlib.util
import json

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[1]


def module(name, path):
    spec = importlib.util.spec_from_file_location(name, path)
    result = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(result)
    return result


def sha(data):
    return hashlib.sha256(data).hexdigest()


def read_json(path):
    data = path.read_bytes()
    return json.loads(gzip.decompress(data) if path.suffix == '.gz' else data)


def compare(original, candidate, symbols, parent_symbols):
    wm = module('creation_window_map', ROOT / 'research/fees-event-context-ownership/window_map.py')
    assert wm.m.section_data(candidate, '.text') == wm.m.section_data(symbols, '.text')
    ow, cw, pw = wm.windows(original), wm.windows(symbols), wm.windows(parent_symbols)
    ci, oi = ({r['address']: r for r in rows} for rows in (cw, ow))
    current = wm.compare(ow, cw)
    parent = wm.compare(ow, pw)
    covered = lambda result: {p['original']['address'] for p in result['unique_pairs']} | {
        f['address'] for group in result['ambiguous'] for f in group['original']}
    gain = sorted(covered(current) - covered(parent))
    loss = sorted(covered(parent) - covered(current))
    assert gain == [190104] and loss == []
    raw_covered = lambda windows: {f['address'] for f in ow if f['raw_sha256'] in {c['raw_sha256'] for c in windows}}
    raw_lost = sorted(raw_covered(pw) - raw_covered(cw))
    assert raw_lost == []
    assert len(current['unique_pairs']) == 396 and len(current['unmatched_original']) == 42
    pair = next(p for p in current['unique_pairs'] if p['original']['address'] == 190104)
    assert pair['original']['bytes'] == pair['candidate']['bytes'] == 3296
    left, right = pair['original'], pair['candidate']

    def calls(image, function):
        relocations = dict(wm.m.relocations(image))
        return {i['offset']: i['call_target'] for i in wm.m.instructions(image, function['address'], function['bytes'])
                if 'call_target' in i and relocations.get(function['address'] + i['offset'], 0) & 0xffffffff != 10}

    a, b = calls(original, left), calls(symbols, right)
    assert a.keys() == b.keys() and len(a) == 18
    callees = [dict(offset=k, original_target=t, candidate_target=b[k],
                    normalized_equal=oi[t]['signature'] == ci[b[k]]['signature']) for k, t in a.items()]
    assert all(c['normalized_equal'] for c in callees)

    def data(image, function):
        instructions = {i['offset']: i for i in wm.m.instructions(image, function['address'], function['bytes'])}
        strings = [wm.m.at_address(image, instructions[offset]['lddw_value'], size).decode()
                   for offset, size in ((56, 29), (104, 40), (1256, 72))]
        assert instructions[1296]['immediate'] == 67 and instructions[1304]['immediate'] == 72
        return strings

    strings = data(original, left)
    assert strings == data(symbols, right) == [
        'social_fee_pda already exists', 'CreateSocialFeePda is currently disabled',
        'programs/pump-fees/src/instructions/fee_sharing/create_social_fee_pda.rs']
    assert original != candidate
    return dict(gained=gain, lost=loss, raw_lost=raw_lost, raw_local_windows=len(raw_covered(cw)), unique_pairs=len(current['unique_pairs']),
                unmatched=len(current['unmatched_original']), target=pair, callees=callees,
                strings=strings, whole_capture_equal=False,
                raw_local_equal=left['raw_sha256'] == right['raw_sha256'])


def main():
    evidence = read_json(HERE / 'evidence.json')
    assert set(evidence['files']) == {str(p.relative_to(HERE)) for p in HERE.rglob('*')
                                    if p.is_file() and p.name != 'evidence.json' and '__pycache__' not in p.parts}
    for name, digest in evidence['files'].items():
        assert sha((HERE / name).read_bytes()) == digest, name
    for name, digest in evidence['harnesses'].items():
        assert sha((ROOT / name).read_bytes()) == digest, name
    parent_path = ROOT / 'research/fees-unchecked-prefix-recovery'
    parent = read_json(parent_path / 'experiment.json')['variants']['origins']
    for name, digest in parent['input_sha256'].items():
        source = HERE / evidence['overrides'][name] if name in evidence['overrides'] else ROOT / parent['source_paths'][name]
        expected = evidence['inputs'][name]
        assert sha(source.read_bytes()) == expected, name
        assert (expected != digest) == (name in evidence['overrides']), name
    assert len(evidence['inputs']) == 36 and len(evidence['overrides']) == 2
    for label in ('baseline', 'proposal'):
        result = read_json(HERE / f'builds/{label}-result.json')
        launch = read_json(HERE / f'builds/{label}-launch.json')
        log = gzip.decompress((HERE / f'builds/{label}.log.gz').read_bytes())
        assert result['exit_code'] == 0 and result['compiled_root'] and result['source_unchanged']
        assert sha(log) == result['log_sha256'] and log.count(b'--crate-name pump_fees_candidate ') == 1
        assert launch['inputs'] == (parent['input_sha256'] if label == 'baseline' else evidence['inputs'])
        assert launch['rustc_sha256'] == 'c8807b7ebede8578ac5a257ea333780f9d89bd356064fd8184af7e996cb71a97'
    baseline = read_json(HERE / 'builds/baseline-result.json')
    assert baseline['candidate_sha256'] == parent['files']['candidate']['sha256']
    assert baseline['symbols_sha256'] == parent['files']['symbols']['sha256']
    candidate = gzip.decompress((HERE / 'candidate.so.gz').read_bytes())
    symbols = gzip.decompress((HERE / 'symbols.so.gz').read_bytes())
    result = read_json(HERE / 'builds/proposal-result.json')
    assert sha(candidate) == result['candidate_sha256'] and sha(symbols) == result['symbols_sha256']
    original = (ROOT / 'evidence/original/pump_fees/deployed.so').read_bytes()
    assert sha(original) == evidence['original_sha256']
    parent_symbols = gzip.decompress((parent_path / parent['files']['symbols']['path']).read_bytes())
    comparison = compare(original, candidate, symbols, parent_symbols)
    assert comparison == read_json(HERE / 'comparison.json')
    for name in ('branches', 'full'):
        receipt = read_json(HERE / f'{name}.json.gz')
        assert receipt['candidate_sha256'] == sha(candidate) and receipt['original_sha256'] == sha(original)
        assert receipt['mismatches'] == []
        if name == 'branches':
            cases = module('creation_branch_cases', HERE / 'branch_cases.py').cases()
            assert len(receipt['cases']) == 157 and json.loads(json.dumps(cases)) == [r['case'] for r in receipt['cases']]
            assert all(r['match'] and r['original'] == r['candidate'] for r in receipt['cases'])
        else:
            assert receipt['case_count'] == 17331 and len(receipt['suites']) == 18
            assert sum(s['case_count'] for s in receipt['suites'].values()) == 17331
            assert all(s['candidate_sha256'] == sha(candidate) and s['original_sha256'] == sha(original)
                       and not s.get('mismatches', s.get('failures', [])) for s in receipt['suites'].values())
    negative = read_json(HERE / 'parent-branches.json.gz')
    assert negative['candidate_sha256'] == baseline['candidate_sha256'] and negative['original_sha256'] == sha(original)
    assert negative['mismatches'] == [i for i, r in enumerate(negative['cases']) if r['original'] != r['candidate']]
    assert len(negative['mismatches']) == 117
    assert sum(r['original']['error'] != r['candidate']['error'] for r in negative['cases']) == 12
    print('PASS: recovered 3296-byte body, 18 matching direct callees, no lost windows; 157 strict + 17331 suite cases')


if __name__ == '__main__':
    main()
