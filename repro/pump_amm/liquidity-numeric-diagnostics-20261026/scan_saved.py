#!/usr/bin/env python3
"""Inventory compared-value log differences in immutable AMM receipts.

This is a triage inventory, not runtime acceptance or proof of identical signed
inputs for every row. Raw signatures/effects must be checked per follow-up.
"""
import argparse
import gzip
import hashlib
import json
from pathlib import Path

ROOT=Path(__file__).resolve().parents[3]
def digest(raw):return hashlib.sha256(raw).hexdigest()
def scan():
    rows=[]
    for path in sorted((ROOT/'repro/pump_amm/owner6048-v144/runtime/runtime-01').glob('*.json.gz')):
        stored=path.read_bytes();raw=gzip.decompress(stored);data=json.loads(raw)
        if 'cases' not in data:continue
        differences=[]
        for index,row in enumerate(data['cases']):
            a,b=row.get('original',{}),row.get('candidate',{})
            if not isinstance(a,dict) or not isinstance(b,dict):continue
            compared=lambda r:[x for x in r.get('logs',[]) if x.startswith(('Program log: Left:','Program log: Right:'))]
            if compared(a)!=compared(b):
                differences.append({'row_index':index,'case':row.get('case'),'instruction':row.get('instruction'),
                    'origin':next((x for x in a.get('logs',[]) if 'AnchorError' in x),None),
                    'original_compared_labels':compared(a),'candidate_compared_labels':compared(b),
                    'embedded_signed_input_equal':a.get('transaction_base64')==b.get('transaction_base64') if 'transaction_base64' in a and 'transaction_base64' in b else None})
        rows.append({'path':str(path.relative_to(ROOT)),'stored_sha256':digest(stored),'raw_sha256':digest(raw),
                     'original_sha256':data.get('original_sha256'),'candidate_sha256':data.get('candidate_sha256'),
                     'cases':len(data['cases']),'difference_count':len(differences),'differences':differences})
    return {'scope':__doc__,'suite_count':len(rows),'difference_count':sum(row['difference_count'] for row in rows),'suites':rows}
def main():
    p=argparse.ArgumentParser();p.add_argument('--output',type=Path,required=True);p.add_argument('--check',action='store_true');a=p.parse_args();result=scan()
    if a.check:assert json.loads(a.output.read_text())==result,'saved inventory changed'
    else:
        if a.output.exists():raise ValueError('output exists')
        a.output.write_text(json.dumps(result,indent=2)+'\n')
    print(json.dumps({key:result[key] for key in ('suite_count','difference_count')}))
if __name__=='__main__':main()
