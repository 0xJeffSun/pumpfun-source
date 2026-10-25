"""Create a fresh, self-contained focused harness; historical files stay unchanged."""
from pathlib import Path
import hashlib

W = Path(__file__).resolve().parent
R = W.parents[1]
old = R / 'scripts/pump_quote_control_differential.py'
assert hashlib.sha256(old.read_bytes()).hexdigest() == 'aed23f6af2dc2811701e470adf74e446e42c8482ad4e49954077bcd24395d3df'
s = old.read_text().replace('import argparse, base64, gzip, hashlib, json, pathlib, struct', 'import argparse, base64, gzip, hashlib, json, pathlib, struct, platform, sys\nfrom importlib.metadata import version\nfrom solders.clock import Clock\nfrom solders.transaction import VersionedTransaction')
s = s.replace('ROOT = pathlib.Path(__file__).resolve().parents[1]', 'ROOT = pathlib.Path(__file__).resolve().parents[2]')
start, end = s.index('def execute('), s.index('\ndef qc_account(')
s = s[:start] + '''def snapshot(vm, keys):
    result = {}
    for key in sorted(keys, key=str):
        a = vm.get_account(key)
        result[str(key)] = None if a is None else {
            'owner': str(a.owner), 'lamports': a.lamports,
            'data_base64': base64.b64encode(bytes(a.data)).decode(),
            'executable': a.executable, 'rent_epoch': a.rent_epoch}
    return result


def execute(binary, name, args=b'', state=None, roles=None, overrides=None, signers=None, drop=None, raw=None):
    assert signers is None, 'Only the explicitly declared test-owned signer set is supported'
    vm = LiteSVM().with_sigverify(True).with_blockhash_check(True).with_transaction_history(0)
    vm.set_clock(Clock(100, 1234567890, 0, 0, 1234567890))
    vm.add_program_from_file(PROGRAM, binary)
    for kp in KEYS.values():
        vm.airdrop(kp.pubkey(), 10**12)
    vm.set_account(GLOBAL, Account(10**10, bytes(GLOBAL_DATA), PROGRAM))
    for key, acct in (state or {}).items():
        vm.set_account(key, acct)
    role = KEYS[roles or ('payer' if name == 'initialize_quote_control' else 'authority')]
    defaults = {'global': (GLOBAL, None), 'quote_control': (QUOTE_CONTROL, None), 'system_program': (SYSTEM, None),
                'event_authority': (EVENT, None), 'program': (PROGRAM, None), 'authority': (role.pubkey(), role), 'user': (role.pubkey(), role)}
    metas, tx_signers = [], {PAYER.pubkey(): PAYER}
    for spec in IX[name]['accounts']:
        acct = spec['name']
        if drop and acct in drop:
            continue
        key, kp = defaults[acct]
        writable, signer = bool(spec.get('writable')), bool(spec.get('signer'))
        if overrides and acct in overrides:
            o = overrides[acct]
            key = o.get('key', key); writable = o.get('writable', writable); signer = o.get('signer', signer)
        metas.append(AccountMeta(key, signer, writable))
        if signer and kp is not None and kp.pubkey() == key:
            tx_signers[kp.pubkey()] = kp
    data = raw if raw is not None else bytes(IX[name]['discriminator']) + args
    ix = Instruction(PROGRAM, data, metas)
    blockhash = vm.latest_blockhash()
    tx = Transaction.new_signed_with_payer([ix], PAYER.pubkey(), list(tx_signers.values()), blockhash)
    signed_bytes = bytes(tx)
    verification = tx.verify_with_results()
    decoded = VersionedTransaction.from_bytes(signed_bytes)
    assert verification and all(verification) and all(decoded.verify_with_results())
    assert bytes(decoded) == signed_bytes and tx.message.recent_blockhash == blockhash
    tracked = {GLOBAL, QUOTE_CONTROL, *[kp.pubkey() for kp in KEYS.values()], *(state or {}).keys()}
    tracked.update(m.pubkey for m in metas if m.pubkey not in {PROGRAM, SYSTEM})
    before = snapshot(vm, tracked)
    r = vm.send_transaction(tx)
    failed = isinstance(r, FailedTransactionMetadata)
    meta = r.meta() if failed else r
    after = snapshot(vm, tracked)
    rollback = None
    if failed:
        payer = str(PAYER.pubkey())
        unchanged = all(before[k] == after[k] for k in before if k != payer)
        pbefore, pafter = dict(before[payer]), dict(after[payer])
        fee = pbefore.pop('lamports') - pafter.pop('lamports')
        rollback = {'nonpayer_accounts_unchanged': unchanged,
                    'payer_except_fee_unchanged': pbefore == pafter,
                    'charged_fee': fee, 'expected_signature_fee': len(tx.signatures) * 5000}
    return {'error': str(r.err()) if failed else None,
            'before_accounts': before, 'after_accounts': after, 'rollback': rollback,
            'logs': list(meta.logs()),
            'event_payloads': [l[14:] for l in meta.logs() if l.startswith('Program data: ')],
            'inner_instructions': json.loads(meta.to_json())['inner_instructions'],
            'return_data': json.loads(meta.to_json())['return_data'],
            'compute_units': meta.compute_units_consumed(),
            'transaction_base64': base64.b64encode(signed_bytes).decode(),
            'transaction_sha256': hashlib.sha256(signed_bytes).hexdigest(),
            'signature_verification': verification, 'blockhash': str(blockhash),
            'sigverify_enabled': True, 'blockhash_check_enabled': True}

''' + s[end:]
s = s.replace('def cases():', 'def historical_cases():', 1)
start = s.index('\ndef main():')
s = s[:start] + '''
def cases():
    yield from historical_cases()
    # These two use a different fee payer so message privilege union cannot mask
    # the missing signer or readonly user condition in the historical fixtures.
    for key in ['signer', 'writable']:
        yield f'fresh/init_user_{key}_false', 'initialize_quote_control', {
            'roles': 'authority', 'overrides': {'user': {key: False}}}
    # Captured layout: 108-byte header and 40-byte mint entries, with initial
    # capacity 50 and maximum listed length 256. Test both sides of each boundary.
    for n in [49, 50, 51, 255, 256]:
        mints = [(Pubkey(hashlib.sha256(f'quote-control-mint-{i}'.encode()).digest()), i) for i in range(n)]
        for role in ['authority', 'admin']:
            yield f'fresh/add_capacity/{n}/{role}', 'add_quote_control_mint', {
                'args': bytes(MINT_C) + u64(123), 'roles': role,
                'state': qc_account(admin=ADMIN.pubkey(), reserves_admin=RESERVES_ADMIN.pubkey(), mints=mints,
                                    reserved=bytes([17]) * 32, length=108 + max(50, n) * 40)}
    native_2022 = Pubkey.from_string('9pan9bMn5HatX4EJdBwg9VgCa7Uz5HL8N1m5D3NdXejP')
    for role in ['authority', 'admin']:
        yield f'fresh/add_token2022_native/{role}', 'add_quote_control_mint', {
            'args': bytes(native_2022) + u64(1), 'roles': role,
            'state': qc_account(admin=ADMIN.pubkey())}
        # Minimal rent top-up and realloc use the normal signed authority payer.
        yield f'fresh/add_rent_topup/{role}', 'add_quote_control_mint', {
            'args': bytes(MINT_B) + u64(99), 'roles': role,
            'state': qc_account(admin=ADMIN.pubkey(), mints=[(MINT_A, 12)], lamports=2000000)}


def main():
    p = argparse.ArgumentParser()
    p.add_argument('--candidate', type=pathlib.Path, required=True)
    p.add_argument('--output', type=pathlib.Path, required=True)
    a = p.parse_args()
    original = ROOT / 'evidence/original/pump/deployed.so'
    digest = lambda f: hashlib.sha256(f.read_bytes()).hexdigest()
    bound = {str(f.relative_to(ROOT)): digest(f) for f in [
        original, a.candidate.resolve(), pathlib.Path(__file__).resolve(),
        ROOT / 'evidence/upstream/pump.json',
        ROOT / 'research/imported-lab/analysis/pump_fun/config-snapshot.json',
        ROOT / 'work/pump-quote-control-main42/build/build-comparison.json',
        ROOT / 'work/pump-quote-control-main42/source-provenance.json']}
    results, mismatches = [], 0
    compare_keys = ['error', 'before_accounts', 'after_accounts', 'rollback', 'event_payloads',
                    'inner_instructions', 'return_data', 'transaction_base64',
                    'signature_verification', 'blockhash', 'sigverify_enabled', 'blockhash_check_enabled']
    for label, name, kw in cases():
        o = execute(original, name, **kw)
        c = execute(a.candidate, name, **kw)
        differences = [k for k in compare_keys if o[k] != c[k]]
        row = {'case': label, 'instruction': name, 'original': o, 'candidate': c,
               'matches': not differences, 'different_fields': differences}
        mismatches += bool(differences)
        if differences:
            print('MISMATCH', label, differences, flush=True)
        results.append(row)
    assert all(digest(ROOT / f) == value for f, value in bound.items()), 'Inputs changed during run'
    report = {'scope': 'Fresh isolated main42 plus six quote-control handlers; offline LiteSVM only. Historical results are not reused.',
              'cases': len(results), 'mismatches': mismatches, 'compare_keys': compare_keys,
              'bound_inputs_sha256': bound, 'python': sys.version, 'platform': platform.platform(),
              'solders_version': version('solders'),
              'fixture_policy': 'Ordinary test-owned synthetic keys, explicit signature and blockhash checks; complete signed transaction bytes saved. No live broadcast.',
              'results': results}
    a.output.parent.mkdir(parents=True, exist_ok=True)
    with gzip.open(a.output, 'wt') as f:
        json.dump(report, f)
    print(f'{len(results)} cases, {mismatches} mismatches', flush=True)
    return 1 if mismatches else 0


if __name__ == '__main__':
    raise SystemExit(main())
'''
(W / 'focused.py').write_text(s)
print('Created fresh focused.py with explicit signature/blockhash checks and transaction/state receipts')
