"""Verify source composition, saved builds and signed runtime receipts offline."""
from pathlib import Path
import argparse, base64, difflib, gzip, hashlib, importlib.util, json, re, subprocess, sys, tempfile

sys.dont_write_bytecode = True
P = Path(__file__).resolve().parent
R = P.parents[1]
EXPECTED = {'buy': 486, 'sell': 396,
            **{f'buy-amm-{f}': 419 for f in ('native', 'token', 'token22')},
            **{f'sell-amm-{f}': 413 for f in ('native', 'token', 'token22')},
            **{f'buy-v2-{f}': 613 for f in ('native', 'token', 'token22')},
            **{f'sell-v2-{f}': 473 for f in ('native', 'token', 'token22')}}
sha = lambda b: hashlib.sha256(b).hexdigest()
raw = lambda p: gzip.decompress(p.read_bytes()) if p.suffix == '.gz' else p.read_bytes()
load = lambda p: json.loads(raw(p))


def module(name, path):
    spec = importlib.util.spec_from_file_location(name, path)
    result = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(result)
    return result


def source_inputs():
    before = module('quote_parent', R / 'research/mayhem-source-data-recovery/verify.py').source_inputs()
    names = ['src/instructions/sell_pump_swap.rs', 'src/state.rs']
    assert load(P / 'source-delta.json') == {'overrides': names, 'removed': []}
    overrides = {f.relative_to(P / 'overrides').as_posix(): f.read_bytes() for f in (P / 'overrides').rglob('*') if f.is_file()}
    assert sorted(overrides) == names and all(before[n] != overrides[n] for n in names)
    after = dict(before, **overrides)
    assert len(after) == 65 and {n: sha(b) for n, b in after.items()} == load(P / 'source-inputs.json')
    patch = ''.join(''.join(difflib.unified_diff(before[n].decode().splitlines(True), after[n].decode().splitlines(True), fromfile='a/' + n, tofile='b/' + n)) for n in names)
    assert (P / 'source.patch').read_bytes() == patch.encode()
    assert (P / '.gitattributes').read_text() == 'source.patch -whitespace\n' + ''.join('overrides/' + n + ' -whitespace\n' for n in names)
    state = after['src/state.rs'].decode().splitlines(True)
    prior = before['src/state.rs'].decode().splitlines(True)
    assert len(state) == len(prior) and all(not x.strip() for x in prior[476:493])
    assert state[:476] == prior[:476] and state[493:] == prior[493:]
    assert after['src/instructions/sell_pump_swap.rs'].count(b'crate::state::sell_quote(') == 1
    return after


def check_receipts(name, report, candidate):
    from solders.transaction import Transaction
    assert report['case_count'] == len(report['cases']) == EXPECTED[name]
    assert report['candidate_sha256'] == sha(candidate)
    assert report['original_sha256'] == sha((R / 'evidence/original/mayhem/deployed.so').read_bytes())
    assert not report['mismatches']
    cases = ('nineteen/sell' if name == 'sell' else 'twenty/buy' if name == 'buy' else
             'twentyone/sell-v2' if name.startswith('sell-v2') else 'twentytwo/buy-v2' if name.startswith('buy-v2') else
             'twentyfour/sell-pump-swap' if name.startswith('sell-amm') else 'twentyfour/buy-pump-swap')
    assert [r['case']['name'] for r in report['cases']] == [r['name'] for r in load(R / ('repro/mayhem/' + cases + '-cases.json'))['cases']]
    assert len({r['case']['name'] for r in report['cases']}) == EXPECTED[name]
    for path, digest in report['harness_sha256'].items():
        assert sha((R / path).read_bytes()) == digest
    exact = successes = 0
    for row in report['cases']:
        a, b = row['original'], row['candidate']
        assert not row['different_fields'] and a['error'] == b['error']
        assert a['transaction_base64'] == b['transaction_base64']
        for result in (a, b):
            tx = Transaction.from_bytes(base64.b64decode(result['transaction_base64']))
            assert all(tx.verify_with_results())
            for phase in ('before', 'after'):
                for account in result[phase].values():
                    if account is not None and not account['executable']:
                        assert sha(base64.b64decode(account['data_base64'])) == account['data_sha256']
        for phase in ('before', 'after'):
            omit = 'MAyhSmzXzV1pTf7LsNkrNwkWKTo4ougAJ1PPg47MD4e'
            assert {k: v for k, v in a[phase].items() if k != omit} == {k: v for k, v in b[phase].items() if k != omit}
        for field in ('inner_instructions', 'return_data'):
            assert a['metadata'][field] == b['metadata'][field]
        events = lambda result: [s for s in result['metadata']['logs'] if s.startswith('Program data: ')]
        assert events(a) == events(b)
        logs = lambda result: [s for s in result['metadata']['logs'] if not re.fullmatch(r'Program \S+ consumed \d+ of \d+ compute units', s)]
        exact += logs(a) == logs(b)
        successes += a['error'] is None
    return {'family': name, 'cases': EXPECTED[name], 'signed_transaction_records': EXPECTED[name] * 2,
            'successful_original_cases': successes, 'exact_noncompute_logs': exact}


def verify(runtime=True):
    assert not any(f.is_symlink() for f in P.rglob('*'))
    assert load(P / 'manifest.json') == {f.relative_to(P).as_posix(): sha(f.read_bytes()) for f in P.rglob('*') if f.is_file() and f.name != 'manifest.json' and '__pycache__' not in f.parts}
    for path, digest in load(P / 'inputs.json').items():
        assert sha((R / path).read_bytes()) == digest, path
    module('verified_quote_parent', R / 'research/mayhem-source-data-recovery/verify.py').verify(runtime=False)
    sources = source_inputs()
    outputs = []
    parent_launch = load(R / 'research/mayhem-source-data-recovery/builds/recovered/launch.json')
    for label in ('recovered', 'repeat'):
        launch, result = load(P / f'builds/{label}/launch.json'), load(P / f'builds/{label}/result.json')
        assert launch['source_inputs'] == {n: sha(b) for n, b in sources.items()}
        assert result['returncode'] == 0 and all(result[n] for n in ('source_unchanged', 'tools_unchanged', 'target_libraries_unchanged'))
        assert launch['controller_sha256'] == sha((P / 'build.py').read_bytes())
        assert launch['checked_tools'] == parent_launch['checked_tools']
        assert launch['target_inputs'] == parent_launch['target_inputs'] == load(P / 'provenance/target-libraries.json')
        assert launch['command'][-1] == '--remap-path-prefix=src/account_wrapper.rs=src/account_wrapper.rs'
        assert all(x in launch['command'] for x in ('--locked', '--offline', 'sbpf-solana-solana'))
        for name in ('stdout', 'stderr'):
            assert sha(raw(P / f'builds/{label}/{name}.gz')) == result[name + '_sha256']
        log = raw(P / f'builds/{label}/stderr.gz')
        for crate in ('anchor_lang', 'curve_accounts', 'mayhem_recovered'):
            assert log.count(('--crate-name ' + crate + ' ').encode()) == 1
        output = tuple(raw(P / f'artifacts/{label}/{kind}.so.gz') for kind in ('candidate', 'symbols'))
        for kind, data in zip(('candidate', 'symbols'), output):
            assert sha(data) == result[kind + '_sha256']
        outputs.append(output)
    assert outputs[0] == outputs[1]
    candidate, symbols = outputs[0]
    assert sha(candidate) == 'fa4f81eb1d5953eb7f31b83bf783f7fc4f89b9573f1403b7c4e1efab76f763c4'
    for name, data in module('quote_analysis', P / 'analysis.py').generate().items():
        assert (P / name).read_bytes() == data
    audit = load(P / 'audit.json')
    assert audit['summary']['statuses'] == {'normalized_only': 356, 'raw_local_match': 70, 'unmatched': 15}
    assert audit['summary']['unmatched_window_bytes'] == 119400 and not audit['summary']['whole_file_equal']
    previous = load(R / 'research/mayhem-source-data-recovery/audit.json')
    for status in ('unmatched', 'raw_local_match'):
        assert {r['id'] for r in audit['rows'] if r['status'] == status} == {r['id'] for r in previous['rows'] if r['status'] == status}
    with tempfile.TemporaryDirectory() as td:
        t = Path(td); sy = t / 'symbols.so'; sy.write_bytes(symbols)
        before = t / 'parent.so'; before.write_bytes(raw(R / 'research/mayhem-source-data-recovery/artifacts/recovered/symbols.so.gz'))
        out = t / 'progress.json'
        subprocess.run([sys.executable, '-B', str(P / 'progress.py'), str(before), str(sy), str(out)], check=True, capture_output=True)
        assert load(out) == load(P / 'progress.json')
        assert module('quote_helper', P / 'helper.py').inspect(sy) == load(P / 'helper.json')
        h = load(P / 'helper.json')
        assert (h['original_bytes'], h['candidate_bytes'], h['original_direct_calls'], h['candidate_direct_calls']) == (1120, 1096, 10, 10)
        assert not h['whole_body_normalized_equal'] and h['direct_callee_multiset_equal'] and h['typed_data_multiset_equal']
        assert h['caller']['actual_calls'] == 1
        result = {'source_inputs': 65, 'changed_source_files': 2, 'matched_windows': 426, 'raw_local_matches': 70,
                  'unmatched_windows': 15, 'new_complete_matches': 0, 'compiler_executed': False, 'target_executed': False}
        if runtime:
            summaries = []
            deltas = []
            binary = t / 'candidate.so'; binary.write_bytes(candidate)
            for name in EXPECTED:
                receipt = P / f'runtime/{name}.json.gz'
                summaries.append(check_receipts(name, load(receipt), candidate))
                old_name = name.removeprefix('buy-amm-') if name.startswith('buy-amm-') else name
                old_receipt = R / f'research/mayhem-source-data-recovery/runtime/vendor-{old_name}.json.gz'
                norm = lambda result: [line for line in result['metadata']['logs'] if not re.fullmatch(r'Program \S+ consumed \d+ of \d+ compute units', line)]
                differences = lambda report: {row['case']['name'] for row in report['cases'] if norm(row['original']) != norm(row['candidate'])}
                old_bad, new_bad = differences(load(old_receipt)), differences(load(receipt))
                assert not new_bad - old_bad
                deltas.append({'family': name, 'before': sorted(old_bad), 'after': sorted(new_bad), 'repaired': sorted(old_bad - new_bad)})
                if name.startswith('sell-amm-'):
                    subprocess.run([sys.executable, '-B', str(R / 'scripts/verify_mayhem_pump_swap.py'), '--receipts', str(receipt), '--candidate', str(binary), '--output', str(t / (name + '.json'))], check=True, capture_output=True)
            assert sum(r['cases'] for r in summaries) == 6636
            assert sum(r['signed_transaction_records'] for r in summaries) == 13272
            assert all(r['exact_noncompute_logs'] == r['cases'] for r in summaries if r['family'].startswith('sell-amm-'))
            assert summaries == load(P / 'runtime-summary.json')
            assert deltas == load(P / 'diagnostic-delta.json')
            assert sum(len(r['repaired']) for r in deltas) == 8 and sum(len(r['after']) for r in deltas) == 21
            result.update(trade_comparisons=6636, signed_transaction_records=13272, sell_amm_exact_noncompute_logs=1239,
                          repaired_diagnostic_cases=8, remaining_trade_diagnostic_cases=21)
    return result


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--skip-runtime', action='store_true')
    parser.add_argument('--materialize', type=Path)
    args = parser.parse_args()
    result = verify(not args.skip_runtime)
    if args.materialize:
        target = args.materialize.absolute()
        assert not target.exists() and all(not p.is_symlink() for p in target.parents)
        target.mkdir(parents=True)
        for name, data in source_inputs().items():
            f = target / name; f.parent.mkdir(parents=True, exist_ok=True); f.write_bytes(data)
    print(json.dumps(result, indent=2))
