#!/usr/bin/env python3
"""Read saved JSON only; strengthen logs for eleven unchanged baseline inputs."""
import argparse
import gzip
import hashlib
import json
from pathlib import Path
from assertions import semantic_logs

INDICES = {312:'pool-bump-0',313:'pool-index-0',8:'flags-4',299:'existing-valid',300:'existing-disabled',307:'sharing-wrong_admin',
           308:'sharing-revoked',317:'pool-quote_mint-0',318:'pool-quote_mint-1',
           319:'pool-coin_creator-0',320:'pool-coin_creator-1'}

def check(path):
    raw=path.read_bytes()
    document=json.loads(gzip.decompress(raw) if path.suffix=='.gz' else raw)
    suite=document['suites']['donation_create'] if 'suites' in document else document
    assert len(suite['cases'])==356
    assert suite['original_sha256']=='4f2955d0f6b40cc9ff7daa18ccad7d19119ba1249759f4e7e3bb691beee6b35e'
    rows=[]
    for index,name in INDICES.items():
        row=suite['cases'][index]; assert row['case']['name']==name
        left,right=row['original']['logs'],row['candidate']['logs']
        rows.append(dict(index=index,name=name,original_raw=left,candidate_raw=right,
            original_semantic=semantic_logs(left),candidate_semantic=semantic_logs(right),
            match=semantic_logs(left)==semantic_logs(right)))
    return dict(scope='Saved-log comparison only; no transactions executed',input_sha256=hashlib.sha256(raw).hexdigest(),
        original_sha256=suite['original_sha256'],candidate_sha256=suite['candidate_sha256'],
        rows=rows,mismatches=[r['name'] for r in rows if not r['match']])

def main():
    p=argparse.ArgumentParser(description=__doc__);p.add_argument('--report',type=Path,required=True);p.add_argument('--output',type=Path,required=True);a=p.parse_args()
    result=check(a.report);a.output.write_text(json.dumps(result,indent=2)+'\n')
    print(json.dumps({'rows':len(result['rows']),'mismatches':result['mismatches']}))
    if result['mismatches']:raise SystemExit(1)

if __name__=='__main__':main()
