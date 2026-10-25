"""Reproduce the published AMM33 zero-fee cashback event mismatch offline."""
from pathlib import Path
import base64, gzip, hashlib, json, sys
ROOT = next(p for p in Path(__file__).resolve().parents if (p/'evidence/original/pump_amm/deployed.so').is_file())
sys.path.insert(0, str(ROOT/'scripts'))
import pump_amm_legacy_sell_differential as d
from solders.transaction import VersionedTransaction

def fixture(h, metas):
    h.vm.with_sigverify(True).with_blockhash_check(True)
    d.mutate(d.pool, 244, b'\1')(h, metas)
    del metas[21]  # Rounded creator payout is zero, so no pool-v2 slot is consumed.

paths = {'original': ROOT/'evidence/original/pump_amm/deployed.so',
         'candidate': ROOT/'repro/pump_amm/legacy-sell-thirty-three/pump_amm_recovered.so'}
rows = {side: d.legacy(amount=1, overrides=fixture, candidate=path) for side,path in paths.items()}
for row in rows.values():
    assert row['error'] is None
    assert all(VersionedTransaction.from_bytes(base64.b64decode(row['transaction_base64'])).verify_with_results())
assert rows['original']['before'] == rows['candidate']['before']
assert rows['original']['after'] == rows['candidate']['after']
diff = [k for k in rows['original'] if k != 'logs' and rows['original'][k] != rows['candidate'][k]]
assert diff == ['events', 'inner'], diff
report = {'scope': 'Normally signed offline synthetic boundary probe; current AMM33 has a known event mismatch.',
          'runtime_sigverify': True, 'runtime_blockhash_check': True, 'signed_transactions': 2,
          'binary_sha256': {k: hashlib.sha256(v.read_bytes()).hexdigest() for k,v in paths.items()},
          'script_sha256': hashlib.sha256(Path(__file__).read_bytes()).hexdigest(),
          'case': {'amount': 1, 'cashback': True, 'omit_pool_v2': True}, 'diff': diff, **rows}
(Path(__file__).parent/'receipt.json.gz').write_bytes(gzip.compress(json.dumps(report, separators=(',',':')).encode(), mtime=0))
print(json.dumps({'expected_mismatch': diff, 'state_equal': True, 'signed_transactions_verified': 2}))
