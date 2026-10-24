#!/usr/bin/env python3
"""Check saved partial-build provenance against current sources, artifacts and captures."""
import gzip,hashlib,json,pathlib
from compare import compare
ROOT=pathlib.Path(__file__).resolve().parents[1]
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
for name,status in json.loads((ROOT/'repro/status.json').read_text()).items():
 if not status.get('candidate_artifact'):continue
 manifest=ROOT/status['comparison_report'];report=json.loads(manifest.read_text())
 for source,digest in report['source_sha256'].items():assert sha(ROOT/source)==digest,source
 candidate=ROOT/status['candidate_artifact'];original=ROOT/'evidence/original'/name/'deployed.so'
 assert compare(original.read_bytes(),candidate.read_bytes())==report['comparison'],name
 log_path=ROOT/status['build_log'];log=log_path.read_bytes()
 if log_path.suffix=='.gz':log=gzip.decompress(log)
 assert hashlib.sha256(log).hexdigest()==report['build_log_sha256'],name
 receipt=ROOT/status['validation_report'];data=receipt.read_bytes()
 r=json.loads(gzip.decompress(data) if receipt.suffix=='.gz' else data)
 assert r['candidate_sha256']==sha(candidate),name
 assert r['original_sha256']==sha(original),name
 assert not r.get('mismatches',r.get('failures',[])),name
 assert r['case_count']==status['validated_cases'],name
 print(name,': partial build provenance consistent;',r['case_count'],'saved differential cases; full byte equality',report['comparison']['full_byte_equality'])
