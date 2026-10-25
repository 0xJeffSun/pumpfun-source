"""Normally signed, offline probes of the captured master-edition mutability guard."""
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

ROOT = Path(__file__).resolve().parents[2]
OUT = Path(__file__).resolve().parent
PROGRAM = Pubkey.from_string('metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s')
TOKEN = Pubkey.from_string('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA')
PAYER = Keypair.from_seed(bytes([155]) * 32)
MINT = Pubkey(bytes([156]) * 32)
METADATA = Pubkey.find_program_address([b'metadata', bytes(PROGRAM), bytes(MINT)], PROGRAM)[0]
EDITION = Pubkey.find_program_address([b'metadata', bytes(PROGRAM), bytes(MINT), b'edition'], PROGRAM)[0]
sha = lambda b: hashlib.sha256(b).hexdigest()


def run(binary, case):
    vm = LiteSVM().with_sigverify(True).with_blockhash_check(True).with_transaction_history(0)
    vm.add_program_from_file(PROGRAM, binary)
    vm.add_program_from_file(TOKEN, ROOT / 'evidence/dependencies/spl_token/deployed.so')
    vm.airdrop(PAYER.pubkey(), 10**10)
    mint = struct.pack('<I', 1) + bytes(PAYER.pubkey()) + struct.pack('<QBBI', case.get('supply', 1), case.get('decimals', 0), 1, 1) + bytes(PAYER.pubkey())
    def string(s):
        b = s.encode(); return struct.pack('<I', len(b)) + b
    metadata = bytes([4]) + bytes(PAYER.pubkey()) + bytes(MINT)
    metadata += string('Offline reconstruction fixture') + string('TEST') + string('') + struct.pack('<H', 0) + bytes([0])
    metadata += bytes([0, case.get('mutable', 1), 0, 0, 0, 0, 0, 0])
    vm.set_account(MINT, Account(10**8, mint, TOKEN))
    vm.set_account(METADATA, Account(10**8, metadata.ljust(679, b'\0'), PROGRAM))
    if case.get('preallocate'):
        vm.set_account(EDITION, Account(10**8, bytes(282), PROGRAM))
    watch = [MINT, METADATA, EDITION]
    def state():
        out = {}
        for k in watch:
            a = vm.get_account(k)
            out[str(k)] = None if a is None else {'data_hex': a.data.hex(), 'lamports': a.lamports, 'owner': str(a.owner)}
        return out
    before = state()
    metas = [AccountMeta(EDITION, False, case.get('edition_writable', True)), AccountMeta(MINT, False, True),
             AccountMeta(PAYER.pubkey(), True, True), AccountMeta(PAYER.pubkey(), True, True),
             AccountMeta(PAYER.pubkey(), True, True), AccountMeta(METADATA, False, case.get('metadata_writable', True)),
             AccountMeta(TOKEN, False, False), AccountMeta(Pubkey.default(), False, False)]
    tx = Transaction.new_signed_with_payer([set_compute_unit_limit(1400000), Instruction(PROGRAM, b'\x11\x01' + struct.pack('<Q', 123), metas)], PAYER.pubkey(), [PAYER], vm.latest_blockhash())
    assert all(tx.verify_with_results())
    result = vm.send_transaction(tx); failed = isinstance(result, FailedTransactionMetadata)
    meta = result.meta() if failed else result; after = state()
    if failed:
        assert before == after, 'failed transaction changed watched account state'
    return {'error': str(result.err()) if failed else None, 'before': before, 'after': after, 'logs': meta.logs(),
            'inner_instructions': json.loads(meta.to_json())['inner_instructions'], 'signature_verified': True,
            'runtime_sigverify': True, 'runtime_blockhash_check': True, 'transaction_base64': base64.b64encode(bytes(tx)).decode(),
            'signature': str(tx.signatures[0])}


if __name__ == '__main__':
    cases = []
    for allocated in (False, True):
        for field in ({}, {'metadata_writable': False}, {'edition_writable': False}, {'mutable': 0},
                      {'metadata_writable': False, 'mutable': 0}, {'metadata_writable': False, 'supply': 2},
                      {'metadata_writable': False, 'decimals': 1}):
            cases.append({'preallocate': allocated, **field})
    paths = {'original': ROOT / 'evidence/dependencies/token_metadata/deployed.so',
             'candidate4': ROOT / 'repro/pump/metaplex-candidate-build-4/token_metadata.so'}
    rows = []
    for case in cases:
        row = {'case': case, **{name: run(path, case) for name, path in paths.items()}}
        row['different_fields'] = [k for k in ('error', 'after', 'inner_instructions') if row['original'][k] != row['candidate4'][k]]
        rows.append(row)
    report = {'scope': 'Normally signed offline test-owned metadata and mint state, actual System and SPL Token CPIs; no live writes.',
              'binary_sha256': {n: sha(p.read_bytes()) for n, p in paths.items()}, 'script_sha256': sha(Path(__file__).read_bytes()),
              'case_count': len(rows), 'cases': rows}
    (OUT / 'master-edition-comparison.json').write_text(json.dumps(report, separators=(',', ':')) + '\n')
    print(json.dumps([{'case': r['case'], 'original_error': r['original']['error'], 'candidate4_error': r['candidate4']['error'],
                       'different_fields': r['different_fields']} for r in rows], indent=2))
