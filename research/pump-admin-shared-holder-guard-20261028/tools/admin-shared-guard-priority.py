"""Authentic holder-vault key/ATA inputs, preserving all account validation."""
from pathlib import Path
import argparse, base64, hashlib, inspect, json, sys
sys.path.insert(0, '/workspace/pumpfun-source-latest/scripts')
import pump_admin_cto_differential as f
from solders.transaction import Transaction

# The stock fixture fixes holdervault to the expected PDA. Expose only that
# input before its existing ATA derivation and account-meta construction.
source = inspect.getsource(f.run)
needle = ' for key in [vault,holdervault,ammvault,'
assert source.count(needle) == 1
source = source.replace(needle, " holdervault=Pubkey.from_string(c.get('holder_vault',str(holdervault)))\n" + needle)
ns = dict(f.__dict__)
exec(compile(source, __file__ + ':fixture-key-input', 'exec'), ns)
run = ns['run']

p = argparse.ArgumentParser()
p.add_argument('--candidate', type=Path, required=True)
p.add_argument('--output', type=Path, required=True)
a = p.parse_args()
rows = []
for name in [None, 'coin_creator_vault_ata', 'creator_vault_quote_token_account']:
    c = {'name': 'holder-key-before-' + (name or 'control'), 'holder': True, 'new_none': True,
         'holder_vault': str(f.OTHER.pubkey()),
         'quote': str(f.Pubkey.from_bytes(bytes([88]) * 32)),
         'accounts': {} if name is None else {name: {'tokens': 1, 'patches': [[108, '02']]}}}
    rs = {k: run(c, b) for k, b in [('original', None), ('candidate', a.candidate)]}
    for r in rs.values():
        Transaction.from_bytes(base64.b64decode(r['transaction_base64'])).verify()
        assert r['signatures_verified'] and not r['pool_authority_top_level_signer']
    diffs = [k for k in ['error', 'before', 'after', 'events', 'inner', 'return']
             if rs['original'][k] != rs['candidate'][k]]
    rows.append({'case': c, 'different_structured_fields': diffs, **rs})
sha = lambda p: hashlib.sha256(p.read_bytes()).hexdigest()
report = {'scope': 'Three isolated signed cases. The stock holder-vault key is an input; its matching ATA remains derived normally. No account validation bypass.',
          'original_sha256': sha(f.ROOT / 'evidence/original/pump/deployed.so'),
          'candidate_sha256': sha(a.candidate), 'producer_sha256': sha(Path(__file__)),
          'fixture_harness_sha256': sha(Path(f.__file__)),
          'fixture_input_adapter_source': source, 'fixture_input_adapter_sha256': hashlib.sha256(source.encode()).hexdigest(),
          'signature_verifications': len(rows)*2, 'cases': rows}
a.output.write_text(json.dumps(report, indent=2) + '\n')
for r in rows:
    print(r['case']['name'], r['different_structured_fields'])
    for k in ['original', 'candidate']:
        print(k, r[k]['error'], [s for s in r[k]['logs'] if 'AnchorError' in s])
