#!/usr/bin/env python3
"""Verify saved initializer provenance, unchanged signed inputs and comparison receipts."""
from pathlib import Path
import base64,gzip,hashlib,json,re,sys
from solders.transaction import VersionedTransaction
ROOT=Path(__file__).resolve().parent;REPO=next(p for p in ROOT.parents if (p/'evidence/original').exists());sha=lambda b:hashlib.sha256(b).hexdigest()
sys.path.insert(0,str(REPO/'scripts'));from compare import compare
manifest=json.loads((ROOT/'bundle-sha256.json').read_text())
for name,h in manifest.items():assert sha((ROOT/name).read_bytes())==h,name
original=(REPO/'evidence/original/pump_fees/deployed.so').read_bytes();candidate=(ROOT/'scratch-build/pump_fees_candidate.so').read_bytes();build=json.loads((ROOT/'scratch-build/build-comparison.json').read_text());attempt=json.loads((ROOT/'scratch-build/build-attempt.json').read_text())
for name,h in build['source_sha256'].items():
 relative=Path(name).relative_to('work/fees-initializer-static/crate');assert sha((ROOT/'scratch-crate'/relative).read_bytes())==h,name
assert compare(original,candidate)==build['comparison'];assert attempt['source_unchanged'] and attempt['returncode']==0
assert sha(gzip.decompress((ROOT/'scratch-build/build.log.gz').read_bytes()))==build['build_log_sha256']==attempt['build_log_sha256']
static=json.loads((ROOT/'static-evidence.json').read_text());assert sha(original)==static['binary']['sha256'];assert sha((REPO/static['idl']['path']).read_bytes())==static['idl']['sha256']
for row in static['windows']:
 raw=original[row['start']:row['end']];assert raw.hex()==row['bytes_hex'] and sha(raw)==row['sha256'],row['name']
for name,row in static['functions'].items():assert sha(original[row['start']:row['end_inferred']])==row['sha256'],name
for path in ROOT.glob('*.asm'):
 for line in path.read_text().splitlines():
  m=re.match(r'\s*([0-9a-f]+):\s*((?:[0-9a-f]{2} )+)',line)
  if m:
   at=int(m[1],16);data=bytes.fromhex(m[2]);assert original[at:at+len(data)]==data,(path.name,at)
history=json.loads((ROOT/'historical-init-evidence.json').read_text());tx_hashes={}
for row in history['transactions']:
 path=ROOT/row['rpc_capture_file'];assert sha(path.read_bytes())==row['rpc_capture_sha256'];rpc=json.loads(path.read_text())['response']['result'];raw=base64.b64decode(rpc['transaction'][0]);tx=VersionedTransaction.from_bytes(raw)
 assert tx.verify_with_results()==[True] and bytes(tx)==raw and sha(raw)==row['raw_transaction_sha256']
 assert str(tx.signatures[0])==row['signature'] and str(tx.message.account_keys[0])==row['required_signer'];tx_hashes[row['signature']]=sha(raw)
reports={name:json.loads(gzip.decompress((ROOT/'scratch-build'/name).read_bytes())) for name in ['historical-replay-comparison.json.gz','negative-differential.json.gz']}
for name,r in reports.items():
 assert r['original_sha256']==sha(original) and r['candidate_sha256']==sha(candidate) and not r['mismatches']
 assert all(row['match'] for row in r['cases']) and r['case_count']==len(r['cases'])
 for row in r['cases']:
  for side in ['original','candidate']:
   result=row[side];assert result['signature_verification'] and (result.get('sigverify_runtime_enabled') or result.get('runtime_sigverify_enabled'))
   if name.startswith('historical'):
    assert result['signed_message_and_signature_unchanged'] and result['raw_transaction_sha256']==tx_hashes[result['signature']]
    assert result['error'] is None and result['state_matches_static_prediction'] and result['balances_match_recorded_history'] and result['events_match_recorded_history']
   else:assert result['fixed_admin_never_claimed_signer'] and result['error'] is not None
history_report=reports['historical-replay-comparison.json.gz'];assert history_report['case_count']==2 and history_report['signed_transactions']==4
control=history_report['freshness_control'];assert control['signature_verification'] and control['sigverify_runtime_enabled'] and control['blockhash_freshness_check'] and 'BlockhashNotFound' in control['error']
assert reports['negative-differential.json.gz']['case_count']==28
print(json.dumps({'bundle_files_verified':len(manifest),'source_files_verified':len(build['source_sha256']),'genuine_signed_historical_cases':2,'ordinary_signer_rejection_cases':28,'mismatches':[],'full_byte_equality':build['comparison']['full_byte_equality']},indent=2))
