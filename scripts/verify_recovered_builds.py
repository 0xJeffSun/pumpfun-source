#!/usr/bin/env python3
"""Check saved partial-build provenance against current sources, artifacts and captures."""
import argparse,gzip,hashlib,json,pathlib
from compare import compare
ROOT=pathlib.Path(__file__).resolve().parents[1]
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
parser=argparse.ArgumentParser();parser.add_argument('--program',choices=['pump','pump_amm','pump_fees','mayhem']);args=parser.parse_args()
for name,status in json.loads((ROOT/'repro/status.json').read_text()).items():
 if args.program and name!=args.program:continue
 if not status.get('candidate_artifact'):continue
 manifest=ROOT/status['comparison_report'];report=json.loads(manifest.read_text())
 for source,digest in report['source_sha256'].items():assert sha(ROOT/source)==digest,source
 candidate=ROOT/status['candidate_artifact'];original=ROOT/'evidence/original'/name/'deployed.so'
 assert compare(original.read_bytes(),candidate.read_bytes())==report['comparison'],name
 log_path=ROOT/status['build_log'];log=log_path.read_bytes()
 if log_path.suffix=='.gz':log=gzip.decompress(log)
 assert hashlib.sha256(log).hexdigest()==report['build_log_sha256'],name
 total=0
 for receipt_name in status.get('validation_reports',[status.get('validation_report')]):
  receipt=ROOT/receipt_name;data=receipt.read_bytes()
  r=json.loads(gzip.decompress(data) if receipt.suffix=='.gz' else data)
  assert r['candidate_sha256']==sha(candidate),name
  assert r['original_sha256']==sha(original),name
  assert not r.get('mismatches',r.get('failures',[])),name
  total+=r['case_count']
 assert total==status['validated_cases'],name
 for receipt_name in status.get('signed_sequence_reports',[]):
  receipt=ROOT/receipt_name;data=receipt.read_bytes()
  r=json.loads(gzip.decompress(data) if receipt.suffix=='.gz' else data)
  assert r['candidate_sha256']==sha(candidate),name
  assert r['original_sha256']==sha(original),name
  assert not r['mismatches'] and not r.get('unexpected_errors',[]) and not r.get('unexpected_original_errors',[]),name
  if 'steps' in r:
   assert all(step['match'] and step['original']['signature_verification'] and step['candidate']['signature_verification'] for step in r['steps']),name
  if 'signed_transactions' in r:
   assert r['signed_transactions']==len(r['original'])+len(r['candidate'])==2*r['cases'],name
 print(name,': partial build provenance consistent;',total,'saved differential cases; full byte equality',report['comparison']['full_byte_equality'])
