"""Verify saved source, build, binary and signed replay evidence without execution."""
import argparse
import base64
import difflib
import gzip
import hashlib
import json
from pathlib import Path
import re
import struct
import sys
import tempfile

sys.dont_write_bytecode = True
from source import archived, recover
from static import inspect, inherited, module

P = Path(__file__).resolve().parent
ROOT = P.parents[1]
PARENT = ROOT / 'research/mayhem-trade-origins-validator'
PROGRAM = 'MAyhSmzXzV1pTf7LsNkrNwkWKTo4ougAJ1PPg47MD4e'
sha = lambda data: hashlib.sha256(data).hexdigest()
raw = lambda path: gzip.decompress(path.read_bytes()) if path.suffix == '.gz' else path.read_bytes()
load = lambda path: json.loads(raw(path))


def logs(result):
    return [line for line in result['metadata']['logs']
            if not re.fullmatch(r'Program \S+ consumed \d+ of \d+ compute units', line)]


def attest(result, expected):
    from solders.transaction import Transaction
    tx = Transaction.from_bytes(base64.b64decode(result['transaction_base64']))
    assert all(tx.verify_with_results())
    for phase in ('before', 'after'):
        account = result[phase][PROGRAM]
        assert account['executable'] and account['data_sha256'] == expected


def focused(report, control, candidate, original):
    from solders.transaction import Transaction
    assert report['binaries'] == dict(control=sha(control), candidate=sha(candidate))
    expected = [('buy-v2', f) for f in ('native', 'token', 'token22')]
    assert [(r['instruction'], r['family']) for r in report['cases']] == expected
    for row in report['cases']:
        instruction, family = row['instruction'], row['family']
        case = dict(name='quote_extreme_1_0_1', tokens=1, curve_u64=[[8, 1], [16, 0]])
        if instruction != 'buy':
            case.update(token_quote=family != 'native', quote_token22=family == 'token22')
        assert row['case'] == case
        a, b, c = (row['results'][n] for n in ('original', 'control', 'candidate'))
        assert a['error'] == b['error'] == c['error']
        assert 'ProgramFailedToComplete' in a['error']
        assert a['transaction_base64'] == b['transaction_base64'] == c['transaction_base64']
        assert logs(a) == logs(c) and logs(a) != logs(b)
        assert any('called `Option::unwrap()`' in line for line in logs(b))
        location = '398:90' if instruction == 'sell-v2' else '378:89'
        assert logs(a)[-1].endswith('programs/mayhem-program/src/state.rs at ' + location)
        for r, binary in ((a, original), (b, control), (c, candidate)):
            assert r['case'] == case
            attest(r, sha(binary))
            tx = Transaction.from_bytes(base64.b64decode(r['transaction_base64']))
            ix = tx.message.instructions[1]
            keys = tx.message.account_keys
            assert str(keys[ix.program_id_index]) == PROGRAM
            discriminator = hashlib.sha256(('global:' + instruction.replace('-', '_')).encode()).digest()[:8]
            assert bytes(ix.data) == discriminator + bytes(16) + struct.pack('<HH', 2400, 9000)
            curve_index, vault_index = (9, 4) if instruction == 'buy' else (13, 6)
            curve = r['before'][str(keys[ix.accounts[curve_index]])]
            vault = r['before'][str(keys[ix.accounts[vault_index]])]
            curve_data, vault_data = (base64.b64decode(x['data_base64']) for x in (curve, vault))
            assert sha(curve_data) == curve['data_sha256'] and sha(vault_data) == vault['data_sha256']
            assert curve['owner'] == '6EF8rrecthR5Dkzon8Nwu78hRvfCKubJ14M5uBEwF6P'
            assert struct.unpack_from('<QQ', curve_data, 8) == (1, 0)
            assert struct.unpack_from('<Q', vault_data, 64) == (1,)
            if instruction != 'buy':
                quote, token = (str(keys[ix.accounts[i]]) for i in (4, 11))
                assert (quote == 'So11111111111111111111111111111111111111112') == (family == 'native')
                assert (token == 'TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb') == (family == 'token22')
            for phase in ('before', 'after'):
                assert {k: v for k, v in r[phase].items() if k != PROGRAM} == {
                    k: v for k, v in a[phase].items() if k != PROGRAM}
            for field in ('inner_instructions', 'return_data'):
                assert r['metadata'][field] == a['metadata'][field]
    return dict(cases=3, signed_transaction_records=9, repaired_diagnostics=3)


def verify(runtime=True, manifest=True):
    assert not any(p.is_symlink() for p in P.rglob('*'))
    if manifest:
        assert load(P / 'manifest.json') == {
            p.relative_to(P).as_posix(): sha(p.read_bytes()) for p in P.rglob('*')
            if p.is_file() and p.name != 'manifest.json' and '__pycache__' not in p.parts}
    for name, digest in load(P / 'external-inputs.json').items():
        assert sha((ROOT / name).read_bytes()) == digest, name
    before = archived(PARENT / 'source.tar.gz')
    after = archived(P / 'source.tar.gz')
    assert after == recover(before)
    assert {n: sha(b) for n, b in after.items()} == load(P / 'source-inputs.json')
    changed = sorted(n for n in before if before[n] != after[n])
    assert changed == ['src/instructions/buy_v2.rs']
    assert {p.relative_to(P / 'overrides').as_posix(): p.read_bytes()
            for p in (P / 'overrides').rglob('*') if p.is_file()} == {n: after[n] for n in changed}
    patch = ''.join(''.join(difflib.unified_diff(before[n].decode().splitlines(True),
                    after[n].decode().splitlines(True), fromfile='a/' + n, tofile='b/' + n)) for n in changed)
    assert (P / 'source.patch').read_bytes() == patch.encode()
    prior = load(PARENT / 'builds/recovered/launch.json')
    expected_tools = {Path(n).name: h for n, h in prior['checked_tools'].items()}
    prefix = 'lib/rustlib/sbpf-solana-solana/'
    target = {n.removeprefix(prefix): h for n, h in prior['target_inputs']['files'].items()}
    outputs = {}
    for label in ('control', 'recovered', 'repeat'):
        launch = load(P / f'builds/{label}/launch.json')
        result = load(P / f'builds/{label}/result.json')
        source = before if label == 'control' else after
        assert launch['source_inputs'] == {n: sha(b) for n, b in source.items()}
        assert launch['controller_sha256'] == sha((P / 'build.py').read_bytes())
        assert launch['target_libraries'] == target and len(target) == 26
        for name in ('rustc', 'rustdoc', 'cargo', 'clang', 'llvm-ar'):
            assert [h for n, h in launch['checked_tools'].items() if Path(n).name == name] == [expected_tools[name]]
        assert expected_tools['llvm-objcopy'] in launch['checked_tools'].values()
        assert all(arg in launch['command'] for arg in ('--locked', '--offline', 'sbpf-solana-solana'))
        assert launch['environment_overrides']['CARGO_NET_OFFLINE'] == 'true'
        assert result['returncode'] == 0 and all(result[k] for k in (
            'source_unchanged', 'tools_unchanged', 'target_libraries_unchanged'))
        assert result['build_log_sha256'] == sha(raw(P / f'builds/{label}/build.log.gz'))
        assert raw(P / f'builds/{label}/build.log.gz').count(b'--crate-name mayhem_recovered ') == 1
        assert (P / f'builds/{label}/ordered.ld').read_bytes() == (PARENT / 'config/ordered.ld').read_bytes()
        outputs[label] = tuple(raw(P / f'artifacts/{label}/{name}.so.gz') for name in ('candidate', 'symbols'))
        for name, data in zip(('candidate', 'symbols'), outputs[label]):
            assert result[name + '_sha256'] == sha(data)
        assert result['candidate_bytes'] == len(outputs[label][0])
    assert outputs['recovered'] == outputs['repeat']
    for name, data in zip(('candidate', 'symbols'), outputs['control']):
        assert data == raw(PARENT / f'artifacts/recovered/{name}.so.gz')
    original = (ROOT / 'evidence/original/mayhem/deployed.so').read_bytes()
    control, candidate = outputs['control'][0], outputs['recovered'][0]
    assert candidate != original and candidate != control
    progress = module('sizing_progress', PARENT / 'progress.py').compare(
        original, outputs['control'][1], outputs['recovered'][1])
    assert progress == load(P / 'progress.json')
    assert (progress['matches'], progress['raw_matches']) == (429, 100)
    with tempfile.TemporaryDirectory() as directory:
        path = Path(directory) / 'symbols.so'
        path.write_bytes(outputs['recovered'][1])
        assert inspect(path) == load(P / 'static.json')
        assert inherited(path) == load(P / 'inherited.json')
    summary = dict(changed_sources=1, normalized_matches=429, raw_local_matches=100,
                   new_complete_matches=0, whole_original_equal=False,
                   compiler_executed=False, target_executed=False)
    if runtime:
        parent = module('sizing_trade_verifier', ROOT / 'research/mayhem-accounting-extend-recovery/verify.py')
        rows = []
        for name in parent.EXPECTED:
            report = load(P / f'runtime/{name}.json.gz')
            rows.append(parent.check_trade_receipts(name, report, candidate, ROOT))
            for row in report['cases']:
                attest(row['original'], sha(original))
                attest(row['candidate'], sha(candidate))
                assert logs(row['original']) == logs(row['candidate'])
        assert rows == load(P / 'runtime-summary.json')
        assert sum(r['cases'] for r in rows) == sum(r['exact_noncompute_logs'] for r in rows) == 6636
        summary.update(trade_comparisons=6636, exact_noncompute_logs=6636,
                       signed_trade_records=13272,
                       focused=focused(load(P / 'runtime/focused.json.gz'), control, candidate, original))
    return summary


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--skip-runtime', action='store_true')
    parser.add_argument('--materialize', type=Path)
    args = parser.parse_args()
    print(json.dumps(verify(not args.skip_runtime), indent=2))
    if args.materialize:
        args.materialize.mkdir(parents=True, exist_ok=False)
        for name, data in archived(P / 'source.tar.gz').items():
            path = args.materialize / name
            path.parent.mkdir(parents=True, exist_ok=True)
            path.write_bytes(data)
