#!/usr/bin/env python3
"""Recompute every byte range from a frozen comparison's declared artifact paths."""
from pathlib import Path
import argparse,gzip,hashlib,json
from compare_all import one
p=argparse.ArgumentParser();p.add_argument('snapshot',type=Path);p.add_argument('--repo',type=Path,required=True);a=p.parse_args();s=json.loads((a.snapshot/'summary.json').read_text());raw=(a.snapshot/'all-byte-ranges.json.gz').read_bytes();assert hashlib.sha256(raw).hexdigest()==s['ranges_sha256'];full=json.loads(gzip.decompress(raw));count=0
for key,rows in full.items():
 for row,summary in zip(rows,s[key],strict=True):
  actual=one(a.repo.resolve(),row['name'],row['original_path'],row['candidate_path'],row['kind']);assert actual==row,row['name']
  expected={k:v for k,v in actual.items()if k!='common_extent_mismatch_ranges'};expected['common_extent_mismatch_range_count']=len(actual['common_extent_mismatch_ranges']);assert expected==summary;count+=1
assert s['whole_core_equal']==sum(r['whole_file_equal']for r in full['programs'][:4])
assert s['dependency_capture_equal']==sum(r['whole_file_equal']for r in full['programs'][4:])
print(json.dumps({'verified_artifact_comparisons':count,'whole_core_equal':s['whole_core_equal'],'dependency_capture_equal':s['dependency_capture_equal'],'bytes_modified':0}))
