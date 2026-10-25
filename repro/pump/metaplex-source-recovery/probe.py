"""Normally signed offline conversion probes against immutable captured inputs."""
from pathlib import Path
import base64, hashlib, json, struct
from solders.account import Account
from solders.compute_budget import set_compute_unit_limit
from solders.instruction import AccountMeta, Instruction
from solders.keypair import Keypair
from solders.litesvm import LiteSVM
from solders.pubkey import Pubkey
from solders.transaction import Transaction
from solders.transaction_metadata import FailedTransactionMetadata

ROOT = Path.cwd()
OUT = ROOT / 'work/metaplex-conversion-recovery'
PROGRAM = Pubkey.from_string('metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s')
TOKEN = Pubkey.from_string('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA')
PAYER = Keypair.from_seed(bytes([151]) * 32)
EDITION, AUTH_MINT, PRINT_MINT = [Pubkey(bytes([n]) * 32) for n in (152, 153, 154)]
sha = lambda b: hashlib.sha256(b).hexdigest()


def mint(supply=0, initialized=True):
    return bytes(36) + struct.pack('<QBB', supply, 0, initialized) + bytes(36)


def run(binary, case):
    vm = LiteSVM().with_sigverify(True).with_blockhash_check(True).with_transaction_history(0)
    vm.add_program_from_file(PROGRAM, binary)
    vm.airdrop(PAYER.pubkey(), 10**10)
    option = case.get('max_supply', 123)
    opt = b'\0' if option is None else b'\1' + struct.pack('<Q', option)
    edition = bytes([case.get('key', 2)]) + struct.pack('<Q', case.get('supply', 3)) + opt
    edition += bytes(PRINT_MINT if not case.get('printing_key_wrong') else Pubkey.default())
    edition += bytes(AUTH_MINT if not case.get('auth_key_wrong') else Pubkey.default())
    edition = edition.ljust(case.get('length', 282), bytes([case.get('padding', 97)]))[:case.get('length', 282)]
    vm.set_account(EDITION, Account(10**8, edition, Pubkey.default() if case.get('owner_wrong') else PROGRAM))
    vm.set_account(AUTH_MINT, Account(10**8, mint(case.get('auth_supply', 0), not case.get('auth_uninitialized')), TOKEN))
    vm.set_account(PRINT_MINT, Account(10**8, mint(case.get('printing_supply', 0), not case.get('printing_uninitialized')), TOKEN))
    keys = [EDITION, AUTH_MINT, PRINT_MINT]
    metas = [AccountMeta(k, False, case.get('writable', True) if n == 0 else case.get('mints_writable', True)) for n, k in enumerate(keys)]
    metas = metas[:case.get('accounts', 3)]
    before = {str(k): {'data_hex': vm.get_account(k).data.hex(), 'lamports': vm.get_account(k).lamports, 'owner': str(vm.get_account(k).owner)} for k in keys}
    tx = Transaction.new_signed_with_payer([set_compute_unit_limit(1400000), Instruction(PROGRAM, bytes([12]) + bytes(case.get('trailing', 0)), metas)], PAYER.pubkey(), [PAYER], vm.latest_blockhash())
    assert all(tx.verify_with_results())
    result = vm.send_transaction(tx)
    failed = isinstance(result, FailedTransactionMetadata)
    meta = result.meta() if failed else result
    after = {str(k): {'data_hex': vm.get_account(k).data.hex(), 'lamports': vm.get_account(k).lamports, 'owner': str(vm.get_account(k).owner)} for k in keys}
    if failed:
        assert before == after, 'failed transaction changed watched account state'
    return {'error': str(result.err()) if failed else None, 'before': before, 'after': after, 'logs': meta.logs(), 'inner_instructions': json.loads(meta.to_json())['inner_instructions'], 'signature_verified': True, 'runtime_sigverify': True, 'runtime_blockhash_check': True, 'transaction_base64': base64.b64encode(bytes(tx)).decode(), 'signature': str(tx.signatures[0])}


cases = [{'name': 'baseline'}, {'name': 'readonly', 'writable': False}, {'name': 'readonly_mints', 'mints_writable': False}, {'name': 'none_max_supply', 'max_supply': None}, {'name': 'zero_max_supply', 'max_supply': 0}, {'name': 'max_u64', 'max_supply': 2**64-1}, {'name': 'zero_padding', 'padding': 0}, {'name': 'trailing', 'trailing': 8}]
for key in ('owner_wrong', 'printing_key_wrong', 'auth_key_wrong', 'printing_uninitialized', 'auth_uninitialized'):
    cases += [{'name': key, key: True}, {'name': 'readonly_' + key, key: True, 'writable': False}]
for key in ('printing_supply', 'auth_supply'):
    cases += [{'name': key, key: 1}, {'name': 'readonly_' + key, key: 1, 'writable': False}]
cases += [{'name': 'length_' + str(n), 'length': n} for n in (0, 1, 10, 17, 18, 73, 74, 81, 82, 83, 281)]
cases += [{'name': 'accounts_' + str(n), 'accounts': n} for n in range(3)]
cases += [{'name': 'key_' + str(n), 'key': n} for n in (0, 1, 6)]
paths = {'original': ROOT / 'evidence/dependencies/token_metadata/deployed.so', 'candidate4': ROOT / 'repro/pump/metaplex-candidate-build-4/token_metadata.so'}
rows = []
for case in cases:
    row = {'case': case, **{name: run(path, case) for name, path in paths.items()}}
    row['different_fields'] = [k for k in ('error', 'after', 'inner_instructions') if row['original'][k] != row['candidate4'][k]]
    rows.append(row)
report = {'scope': 'Normally signed offline synthetic conversion fixtures against captured original and already-built candidate4. No live calls, rebuilt source or complete identity claim.', 'binary_sha256': {n: sha(p.read_bytes()) for n, p in paths.items()}, 'script_sha256': sha(Path(__file__).read_bytes()), 'case_count': len(rows), 'differences': [r['case']['name'] for r in rows if r['different_fields']], 'cases': rows}
(OUT / 'conversion-comparison.json').write_text(json.dumps(report, separators=(',', ':')) + '\n')
print(json.dumps({'cases': len(rows), 'differences': [{'name': r['case']['name'], 'fields': r['different_fields'], 'original_error': r['original']['error'], 'candidate4_error': r['candidate4']['error']} for r in rows if r['different_fields']]}))
