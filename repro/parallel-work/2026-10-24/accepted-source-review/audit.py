#!/usr/bin/env python3
"""Independent read-only saved evidence checks; no compilation or program execution."""
from pathlib import Path
import base64
import difflib
import gzip
import hashlib
import json
import re
import subprocess
import tarfile
from solders.transaction import VersionedTransaction

W = Path(__file__).resolve().parent
R = next(p for p in W.parents if (p / 'evidence/original/pump/deployed.so').is_file())
P = R / 'work/pump-tokenkeg-two-curve-recovery/handoff'
F = R / 'work/fees-initializer-inline-recovery/handoff'
BASE = '80990317bd9c0363e071646b892490886d7bf946'
sha = lambda b: hashlib.sha256(b).hexdigest()


def read(path):
    raw = path.read_bytes()
    return json.loads(gzip.decompress(raw) if raw[:2] == b'\x1f\x8b' else raw)


def git(name):
    return subprocess.check_output(['git', '-C', str(R), 'show', BASE + ':' + name])


def archive(path):
    out = {}
    with tarfile.open(path) as tar:
        for member in tar:
            name = Path(member.name)
            assert member.isfile() and not name.is_absolute() and '..' not in name.parts
            assert not name.name.endswith('-keypair.json') and member.name not in out
            out[member.name] = tar.extractfile(member).read()
    return out


def seal(path, expected):
    assert sha((path / 'manifest-sha256.json').read_bytes()) == expected
    manifest = read(path / 'manifest-sha256.json')
    paths = list(path.rglob('*'))
    assert not any(p.is_symlink() for p in paths)
    actual = {str(p.relative_to(path)) for p in paths if p.is_file()
              and str(p.relative_to(path)) != 'manifest-sha256.json'}
    assert actual == set(manifest), (actual - set(manifest), set(manifest) - actual)
    for name, row in manifest.items():
        raw = (path / name).read_bytes()
        assert sha(raw) == (row['sha256'] if isinstance(row, dict) else row), name
        if isinstance(row, dict):
            assert len(raw) == row['bytes']
    return len(actual)


def source_and_build(path, name, count, changed, candidate_name):
    source = archive(path / 'source-snapshot.tar.gz')
    hashes = read(path / name)
    baseline = read(path / 'baseline-source-sha256.json')
    assert len(source) == len(hashes) == len(baseline) == count
    assert {n: sha(b) for n, b in source.items()} == hashes
    assert {n: sha(git(n)) for n in baseline} == baseline
    assert set(hashes) == set(baseline)
    assert [n for n in hashes if hashes[n] != baseline[n]] == [changed]
    attempt = read(path / 'build-attempt.json')
    build = read(path / 'build-comparison.json')
    prefix = str(path.parent.relative_to(R)) + '/source/'
    assert all(n.startswith(prefix) for n in build['source_sha256'])
    assert {n[len(prefix):]: h for n, h in build['source_sha256'].items()} == hashes
    assert build['source_sha256'] == attempt['source_sha256'] == attempt['source_after_sha256']
    assert attempt['source_unchanged'] and attempt['returncode'] == 0
    assert sha(gzip.decompress((path / 'build.log.gz').read_bytes())) == build['build_log_sha256'] == attempt['build_log_sha256']
    assert attempt['selected_toolchain'] == build['selected_toolchain'] == 'v1.44'
    assert attempt['command'] == build['command']
    expected = ['cargo', 'build-sbf', '--manifest-path', '<repo>/' + prefix + ('programs/pump/Cargo.toml' if count == 36 else 'programs/pump-fees/Cargo.toml'),
                '--tools-version', 'v1.44', '--offline', '--sbf-sdk', '<output>/sdk', '--sbf-out-dir', '<output>/artifacts', '--', '--locked', '--offline']
    assert build['command'] == expected
    elf = (path / candidate_name).read_bytes()
    assert sha(elf) == build['comparison']['candidate_sha256']
    assert not build['comparison']['full_byte_equality']
    return source, {'source_inputs': count, 'only_source_delta': changed, 'baseline_git_revision': BASE,
                    'candidate_sha256': sha(elf), 'candidate_bytes': len(elf), 'build_returncode': 0,
                    'source_before_after_equal': True, 'frozen_command_verified': True, 'full_byte_equality': False}


def values(obj):
    if isinstance(obj, dict):
        for item in obj.values():
            yield from values(item)
    elif isinstance(obj, list):
        for item in obj:
            yield from values(item)
    else:
        yield obj


def clean(obj):
    if isinstance(obj, dict):
        for name, item in obj.items():
            if name in ['mismatches', 'unexpected_errors', 'unexpected_original_errors', 'failures']:
                assert not item, name
            if name == 'match':
                assert item is True
            clean(item)
    elif isinstance(obj, list):
        for item in obj:
            clean(item)


def count(data):
    if 'case_count' in data:
        return data['case_count']
    return data['cases'] if isinstance(data['cases'], int) else len(data['cases'])


def main():
    pump_seal = sha((P / 'manifest-sha256.json').read_bytes())
    assert pump_seal.startswith('64fa5430')
    payloads = {'pump': seal(P, pump_seal), 'fees': seal(F, 'e1826ed7fa4018274c46d2df281ac294411269ae788369669cbacaa38dd188b8')}
    ps, pump = source_and_build(P, 'candidate-source-sha256.json', 36, 'programs/pump/src/multi_hop_curve.rs', 'candidate.so')
    fs, fees = source_and_build(F, 'source-sha256.json', 22, 'programs/pump-fees/src/contexts.rs', 'pump_fees_candidate.so')
    old = git('programs/pump-fees/src/contexts.rs')
    before = b"pub pump_global: Box<Account<'info, crate::pump_global::Global>>,"
    after = b"pub pump_global: Account<'info, crate::pump_global::Global>,"
    assert old.count(before) == 1 and fs['programs/pump-fees/src/contexts.rs'] == old.replace(before, after)
    for package, path, new in [(P, 'programs/pump/src/multi_hop_curve.rs', ps['programs/pump/src/multi_hop_curve.rs']),
                               (F, 'programs/pump-fees/src/contexts.rs', fs['programs/pump-fees/src/contexts.rs'])]:
        patch = ''.join(difflib.unified_diff(git(path).decode().splitlines(True), new.decode().splitlines(True), fromfile='a/' + path, tofile='b/' + path))
        assert patch == (package / ('source-proposal-02.patch' if package == P else 'source-change.patch')).read_text()
    old = git('programs/pump/src/multi_hop_curve.rs').decode()
    new = ps['programs/pump/src/multi_hop_curve.rs'].decode().split('// Original 0x57590..0x57930')[0]
    new = new.replace(' if hop_fees.len()==2{return execute_two(ctx,amount_in,&hop_fees)}\n', '')
    assert '\n'.join(old.splitlines()[3:]).rstrip() == '\n'.join(new.splitlines()[3:]).rstrip()
    pump['existing_single_curve_body_unchanged'] = True
    fees['exactly_one_field_type_replacement'] = True

    prior = R / 'repro/pump/bonding-curve-serializer-fortyeight'
    receipts = []
    for kind in ['differential', 'surfpool']:
        names = {str(p.relative_to(P / kind)) for p in (P / kind).rglob('*.json.gz')}
        oldnames = {str(p.relative_to(prior / kind)) for p in (prior / kind).rglob('*.json.gz')}
        assert names == oldnames
        for name in sorted(names):
            data = read(P / kind / name)
            olddata = read(prior / kind / name)
            assert count(data) == count(olddata), (kind, name)
            clean(data)
            assert pump['candidate_sha256'] in values(data)
            assert '7a19affaa2c6187e04a5fe0ea298cee81fa5eb8c24cfcc30d85f615e89f7b02d' in values(data)
            receipts.append({'kind': kind, 'name': name, 'count': count(data), 'candidate_hash_in_receipt': True,
                             'original_hash_in_receipt': True, 'same_prior_case_count': True})
    assert len([r for r in receipts if r['kind'] == 'differential']) == 37
    assert sum(r['count'] for r in receipts if r['kind'] == 'differential') == 9217
    assert len([r for r in receipts if r['kind'] == 'surfpool']) == 28
    assert sum(r['count'] for r in receipts if r['kind'] == 'surfpool') == 1024
    pump['prior_receipts'] = receipts
    focused = read(P / 'focused-01.json.gz')
    original_only = read(P / 'prebuild-handoff/original-only-01.json.gz')
    assert len(focused['cases']) == len(original_only['cases']) == 20
    unchanged_original_transactions = 0
    for oldrow, newrow in zip(original_only['cases'], focused['cases']):
        assert oldrow['case'] == newrow['case'] and oldrow['parameters'] == newrow['parameters']
        assert oldrow['original']['transaction_base64'] == newrow['original']['transaction_base64']
        unchanged_original_transactions += 1
    pump['new_fixed_cases'] = 20
    pump['original_acceptance_transactions_preserved'] = unchanged_original_transactions
    assert (P / 'prebuild-handoff/verify_original_receipt.py').read_bytes() == (P.parent / 'verify_original_receipt.py').read_bytes()
    assert (P / 'prebuild-handoff/original-only-01.json.gz').read_bytes() == (P.parent / 'original-only-01.json.gz').read_bytes()
    assert read(W / 'pump-arithmetic-verifier.stdout')['status'] == 'PASS'

    historical = []
    history = read(F / 'initializer-history.json.gz')
    for row in history['cases']:
        rel = f"repro/pump_fees/initializer-history/transactions/admin-success-{row['index']}.json"
        captured = (F / 'runtime' / rel).read_bytes()
        assert captured == git(rel)
        raw = base64.b64decode(json.loads(captured)['response']['result']['transaction'][0])
        tx = VersionedTransaction.from_bytes(raw)
        assert bytes(tx) == raw and tx.verify_with_results() == [True]
        for side in ['original', 'candidate']:
            value = row[side]
            assert value['raw_transaction_sha256'] == sha(raw)
            assert value['signature'] == str(tx.signatures[0])
            assert value['signed_message_and_signature_unchanged'] and value['sigverify_runtime_enabled']
        historical.append({'capture': rel, 'capture_sha256': sha(captured), 'raw_transaction_sha256': sha(raw), 'unchanged_from_published_capture': True})
    assert len(historical) == 2
    assert history['freshness_control']['blockhash_freshness_check'] and 'BlockhashNotFound' in history['freshness_control']['error']
    fees['historical_transactions'] = historical
    fees['freshness_on_rejection_control'] = True
    for row in read(F / 'receipt-build-bindings.json'):
        data = read(F / row['saved_report'])
        clean(data)
        assert data['candidate_sha256'] == fees['candidate_sha256']
        if row['name'] != 'donation-sequence':
            assert count(data) == row['case_count'] == row['expected_cases']
        else:
            assert len(data['steps']) == 10
    fees['existing_comparison_receipts'] = 17441
    fees['separate_donation_steps'] = 10
    results = {'status': 'PASS', 'substantive_findings': [], 'package_payload_files': payloads,
               'pump_manifest_sha256': pump_seal, 'fees_manifest_sha256': sha((F / 'manifest-sha256.json').read_bytes()),
               'pump': pump, 'fees': fees, 'scope': 'Independent saved evidence review. No compiler, Solana VM, RPC, or runtime probe executed.'}
    print(json.dumps(results, indent=2))


if __name__ == '__main__':
    main()
