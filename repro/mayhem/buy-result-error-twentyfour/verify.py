"""Verify sealed publication and saved receipts; execute no target or build."""
from pathlib import Path
import hashlib,json,gzip
P=Path(__file__).resolve().parent
H=lambda b:hashlib.sha256(b).hexdigest()
m=json.loads((P/'manifest.json').read_text())
expected=set(m['files']);actual={str(f.relative_to(P)) for f in P.rglob('*') if f.is_file() and f.name not in ['manifest.json','manifest.sha256'] and '__pycache__' not in f.parts}
assert actual==expected,{'extra':sorted(actual-expected),'missing':sorted(expected-actual)}
for rel,record in m['files'].items():
 b=(P/rel).read_bytes();assert len(b)==record['bytes'] and H(b)==record['sha256'],rel
assert (P/'manifest.sha256').read_text().split()[0]==H((P/'manifest.json').read_bytes())
assert H((P/'build01/artifacts/mayhem_recovered.so').read_bytes())=='dda5554a2faf8aa40fc86547e91c4b32c6ac44b878073dcb8bd9f7ac60b47cd4'
assert H((P/'build01/target/sbf-solana-solana/release/mayhem_recovered.so').read_bytes())=='f356e4a5c28ba6b5fb2312c6799470a0ffc9e8bec39984650de33797042ba1d2'
count=0;flat=0
for row in json.loads((P/'summary.json').read_text())['rows']:
 name=row['name']
 if name=='burn':continue
 j=json.loads(gzip.decompress((P/'replay'/(name+'.json.gz')).read_bytes()));assert not j['mismatches'];count+=j['case_count'];flat+=1
assert count==9589 and flat==20
burn=json.loads((P/'replay/burn/comparison.json').read_text());assert burn['case_count']==3 and burn['signed_transactions']==12 and burn['mismatches']==[0,1,2]
for r in burn['cases']:assert r['different_fields']==['second.logs_without_compute_numbers']
assert count+2*burn['case_count']==9595
assert all(r['returncode']==0 for r in json.loads((P/'verification/results.json').read_text()))
ledger=json.loads(gzip.decompress((P/'static/complete-inventory.json.gz').read_bytes()))
assert len(ledger['original_rows'])==441 and len(ledger['candidate_rows'])==410
print(json.dumps({'sealed_files':len(expected),'flat_comparisons':count,'sequential_burn_comparisons':6,'functional_comparisons':9595,'known_burn_source_location_rows':3,'target_executions':0}))
