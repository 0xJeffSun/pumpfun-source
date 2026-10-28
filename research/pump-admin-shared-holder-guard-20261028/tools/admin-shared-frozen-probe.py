"""Two original-backed shared-vault errors; no source or account-validation change."""
from pathlib import Path
import argparse, base64, hashlib, json, sys
sys.path.insert(0, '/workspace/pumpfun-source-latest/scripts')
import pump_admin_cto_differential as f
from solders.transaction import Transaction

p = argparse.ArgumentParser()
p.add_argument('--candidate', type=Path, required=True)
p.add_argument('--output', type=Path, required=True)
a = p.parse_args()
rows = []
for name in ['coin_creator_vault_ata', 'creator_vault_quote_token_account']:
    c = {'name': 'shared-holder-frozen-' + name, 'holder': True, 'new_none': True,
         'quote': str(f.Pubkey.from_bytes(bytes([88]) * 32)),
         'accounts': {name: {'tokens': 1, 'patches': [[108, '02']]}}}
    rs = {k: f.run(c, b) for k, b in [('original', None), ('candidate', a.candidate)]}
    for r in rs.values():
        Transaction.from_bytes(base64.b64decode(r['transaction_base64'])).verify()
        assert r['signatures_verified'] and not r['pool_authority_top_level_signer']
    diffs = [k for k in ['error', 'before', 'after', 'events', 'inner', 'return']
             if rs['original'][k] != rs['candidate'][k]]
    messages = {k: [s for s in r['logs'] if s.startswith(('Program log: ', 'Program data: '))]
                for k, r in rs.items()}
    rows.append({'case': c, 'different_structured_fields': diffs,
                 'ordered_program_messages_match': messages['original'] == messages['candidate'], **rs})
sha = lambda p: hashlib.sha256(p.read_bytes()).hexdigest()
report = {'scope': 'Two isolated, signed, original-backed shared-holder frozen-vault cases; no source change.',
          'original_sha256': sha(f.ROOT / 'evidence/original/pump/deployed.so'),
          'candidate_sha256': sha(a.candidate), 'producer_sha256': sha(Path(__file__)),
          'fixture_harness_sha256': sha(Path(f.__file__)), 'signature_verifications': len(rows)*2,
          'cases': rows}
a.output.write_text(json.dumps(report, indent=2) + '\n')
for r in rows:
    print(r['case']['name'], r['different_structured_fields'])
    for k in ['original', 'candidate']:
        print(k, r[k]['error'], [s for s in r[k]['logs'] if 'AnchorError' in s])
