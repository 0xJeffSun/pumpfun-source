"""Offline source/build, block-graph and signed sweep-receipt verification."""
from pathlib import Path
import base64, difflib, gzip, hashlib, importlib.util, json, re, subprocess, sys, tempfile

sys.dont_write_bytecode = True
P = Path(__file__).resolve().parent
R = P.parents[1]
sha = lambda value: hashlib.sha256(value).hexdigest()
raw = lambda p: gzip.decompress(p.read_bytes()) if p.suffix == '.gz' else p.read_bytes()
load = lambda p: json.loads(raw(p))


def module(name, path):
    spec = importlib.util.spec_from_file_location(name, path)
    result = importlib.util.module_from_spec(spec); spec.loader.exec_module(result)
    return result


def sources():
    parent = module('sweep_parent_sources', R / 'research/mayhem-source-data-recovery/verify.py')
    before = parent.source_inputs(); after = dict(before)
    names = ['src/instructions/fee_recipients.rs', 'src/lib.rs']
    changed = {f.relative_to(P / 'overrides').as_posix(): f.read_bytes() for f in (P / 'overrides').rglob('*') if f.is_file()}
    assert sorted(changed) == names
    text = before[names[0]].decode()
    expected = text.replace('if native {self.field_10}else{self.field_34}',
                            'if core::intrinsics::unlikely(native) {self.field_10}else{self.field_34}')
    assert expected != text and changed[names[0]] == expected.encode()
    lines = before[names[1]].decode().splitlines(True)
    lines[2] = '#![feature(core_intrinsics)]\n'
    assert changed[names[1]] == ''.join(lines).encode()
    after.update(changed)
    assert len(after) == 65 and {n: sha(b) for n, b in after.items()} == load(P / 'source-inputs.json')
    patch = ''.join(''.join(difflib.unified_diff(before[n].decode().splitlines(True), after[n].decode().splitlines(True), fromfile='a/' + n, tofile='b/' + n)) for n in names)
    assert patch.encode() == (P / 'source.patch').read_bytes()
    return after


def runtime(candidate, report=None):
    from solders.transaction import Transaction
    report = load(P / 'runtime/150-cases.json.gz') if report is None else report
    assert report['count'] == len(report['cases']) == 150
    assert len({json.dumps(row['case'], sort_keys=True) for row in report['cases']}) == 150
    assert report['harness_sha256'] == sha((P / 'runtime/runner.py.txt').read_bytes())
    assert report['binary_sha256'] == {'original': sha((R / 'evidence/original/mayhem/deployed.so').read_bytes()),
                                       'baseline': sha(raw(R / 'research/mayhem-parallel-recovery/artifacts/recovered/candidate.so.gz')),
                                       'candidate': sha(candidate)}
    assert set(report['receipts']) == {'original', 'baseline', 'candidate'}
    assert all(len(records) == 150 for records in report['receipts'].values())
    originals = (R / 'evidence/original/mayhem/deployed.so').read_bytes()
    baseline = raw(R / 'research/mayhem-parallel-recovery/artifacts/recovered/candidate.so.gz')
    programs = {'original': originals, 'baseline': baseline, 'candidate': candidate}
    expected = {label: {'MAyhSmzXzV1pTf7LsNkrNwkWKTo4ougAJ1PPg47MD4e': (sha(binary), len(binary))}
                for label, binary in programs.items()}
    for name, address in [('spl_token', 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'),
                          ('spl_token_2022', 'TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb'),
                          ('associated_token', 'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL')]:
        binary = (R / f'evidence/dependencies/{name}/deployed.so').read_bytes()
        for values in expected.values(): values[address] = (sha(binary), len(binary))
    old_bad = []; exact = 0
    for i, row in enumerate(report['cases']):
        for label in ('baseline', 'candidate'):
            same = all(row['results']['original'][key] == row['results'][label][key]
                       for key in ('error', 'accounts', 'events', 'inner', 'return_data'))
            assert row['equal'][label] == same
            if label == 'candidate': assert same
            elif not same: old_bad.append(i)
        norm = lambda r: [s for s in r['logs'] if not re.fullmatch(r'Program \S+ consumed \d+ of \d+ compute units', s)]
        exact += norm(row['results']['original']) == norm(row['results']['candidate'])
        for label in report['receipts']:
            receipt = report['receipts'][label][i]
            tx = Transaction.from_bytes(bytes.fromhex(receipt['transaction_hex']))
            assert all(tx.verify_with_results()) and tx.verify_with_results() == receipt['signature_verification']
            assert 'MAyhSmzXzV1pTf7LsNkrNwkWKTo4ougAJ1PPg47MD4e' in receipt['preaccounts']
            for address, identity in expected[label].items():
                if address in receipt['preaccounts']:
                    account = receipt['preaccounts'][address]
                    assert account['executable'] and (account['data_sha256'], account['data_bytes']) == identity
        assert len({report['receipts'][label][i]['transaction_hex'] for label in report['receipts']}) == 1
    assert report['mismatches'] == {'baseline': old_bad, 'candidate': []} and len(old_bad) == 34
    return {'fresh_sweep_cases': 150, 'signed_transaction_records': 450, 'exact_noncompute_logs': exact}


def verify():
    assert not any(p.is_symlink() for p in P.rglob('*'))
    assert load(P / 'manifest.json') == {f.relative_to(P).as_posix(): sha(f.read_bytes()) for f in P.rglob('*') if f.is_file() and f.name != 'manifest.json' and '__pycache__' not in f.parts}
    for name, digest in load(P / 'inputs.json').items(): assert sha((R / name).read_bytes()) == digest
    module('sweep_parent', R / 'research/mayhem-source-data-recovery/verify.py').verify(runtime=False)
    source_map = sources(); outputs = []
    parent_launch = load(R / 'research/mayhem-source-data-recovery/builds/recovered/launch.json')
    for label in ('control', 'repeat'):
        launch, result = load(P / f'builds/{label}/launch.json'), load(P / f'builds/{label}/result.json')
        assert launch['source_inputs'] == {n: sha(b) for n, b in source_map.items()}
        assert result['returncode'] == 0 and all(result[k] for k in ('source_unchanged', 'tools_unchanged', 'target_libraries_unchanged'))
        assert launch['controller_sha256'] == sha((P / 'build.py').read_bytes())
        assert launch['checked_tools'] == parent_launch['checked_tools']
        assert launch['target_inputs'] == parent_launch['target_inputs']
        assert all(flag in launch['command'] for flag in ('--locked', '--offline', 'sbpf-solana-solana'))
        assert launch['command'][-1] == '--remap-path-prefix=src/account_wrapper.rs=src/account_wrapper.rs'
        for name in ('stdout', 'stderr'): assert sha(raw(P / f'builds/{label}/{name}.gz')) == result[name + '_sha256']
        output = tuple(raw(P / f'builds/{label}/{name}.gz') for name in ('candidate.so', 'symbols.so'))
        assert [sha(b) for b in output] == [result['candidate_sha256'], result['symbols_sha256']]
        outputs.append(output)
    assert outputs[0] == outputs[1]
    candidate, symbols = outputs[0]
    assert sha(candidate) == '65204f85886bbfc7b20d3aff460754a6624692af29897de7eef4fc126811f386'
    for name, data in module('sweep_graph', P / 'analysis.py').generate().items(): assert (P / name).read_bytes() == data
    proof = load(P / 'analysis.json')
    assert proof['named_functions'] == 565 and proof['unchanged_named_function_shapes'] == 564
    assert not proof['whole_helper_normalized_equal'] and proof['same_offset_instruction_differences'] == 19
    assert len(proof['basic_blocks']) == 22 and sum(x['bytes'] for x in proof['basic_blocks']) == 912
    assert len(proof['mapped_data']) == 11 and len(proof['terminal_chains'][0]) == 4
    assert 'fn abort() -> !;' in (P / 'abort-abi.rs').read_text()
    with tempfile.TemporaryDirectory() as directory:
        t = Path(directory); (t / 'control.so').write_bytes(symbols)
        (t / 'parent.so').write_bytes(raw(R / 'research/mayhem-source-data-recovery/artifacts/recovered/symbols.so.gz'))
        subprocess.run([sys.executable, '-B', str(P / 'progress.py'), str(t / 'parent.so'), str(t / 'control.so'), str(t / 'progress.json')], check=True, capture_output=True)
        assert load(t / 'progress.json') == load(P / 'progress.json')
    analysis = module('sweep_inventory', R / 'research/mayhem-source-data-recovery/analysis.py')
    analysis.INPUTS[3:5] = ['research/mayhem-sweep-branch-layout/builds/control/candidate.so.gz', 'research/mayhem-sweep-branch-layout/builds/control/symbols.so.gz']
    audit = json.loads(analysis.generate()['audit.json']); parent = load(R / 'research/mayhem-source-data-recovery/audit.json')
    lost = sorted({r['id'] for r in parent['rows'] if r['status'] == 'raw_local_match'} - {r['id'] for r in audit['rows'] if r['status'] == 'raw_local_match'})
    inventory = {'summary': audit['summary'], 'statuses': {r['id']: r['status'] for r in audit['rows']}, 'raw_losses': lost}
    assert inventory == load(P / 'inventory.json') and not lost
    assert audit['summary']['statuses'] == {'normalized_only': 356, 'raw_local_match': 70, 'unmatched': 15}
    result = dict(matching_blocks=22, mapped_data_references=11, full_helper_equal=False,
                  matched_windows=426, new_complete_matches=0, compiler_executed=False, target_executed=False)
    result.update(runtime(candidate))
    print(json.dumps(result, indent=2)); return result


if __name__ == '__main__': verify()
