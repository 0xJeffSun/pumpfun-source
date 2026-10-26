"""Validate the finite unexecuted request only. Never opens an original executable."""
from pathlib import Path
import json,hashlib,gzip,struct
P=Path(__file__).resolve().parent;J=lambda p:json.loads(p.read_text());H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
for n,row in J(P/'manifest.json').items():assert H(P/n)==row['sha256']and(P/n).stat().st_size==row['bytes']
r=J(P/'REQUEST.json');assert r['status']=='UNEXECUTED_REQUIRES_ROOT_SCOPE_REVIEW'and r['total_new_bytes_maximum']==182
assert r['original_sha256']=='7a19affaa2c6187e04a5fe0ea298cee81fa5eb8c24cfcc30d85f615e89f7b02d'
assert[(v['error'],v['literal_start'],v['literal_bytes'],v['literal_end_exclusive'])for v in r['ranges']]==[(6050,1806577,91,1806668),(6093,1808676,91,1808767)]
for row in J(P/'untrusted-source-hypotheses.json').values():assert row['original_bytes_verified']is False and len(row['source_hypothesis_only'].encode())==91
print('PASS: exact2range182byte UNEXECUTED request; source messages remain untrusted; no original read/body/VM')

m=J(P/'admitted-a0-manifest.json');assert H(P/'admitted-a0-manifest.json')=='a0e040a58303ad9eb7b1a81e0d37348213a47a886b86aa12be8050315fc384e5'
b=gzip.decompress((P/'admitted-a0-ledger.json.gz').read_bytes());assert hashlib.sha256(b).hexdigest()==m['bounded-ledger.json']['sha256'];ledger=json.loads(b);saved=J(P/'admitted-descriptor-records.json')
for row,want in zip(saved['records'],r['ranges']):
 assert row['record']in ledger['1433224']['data_references'];data=bytes.fromhex(row['record']['bounded_hex']);ptr,n=struct.unpack_from('<QQ',data,row['offset']);assert row['descriptor']==want['display_descriptor']and ptr>>32==want['literal_start']and n==want['literal_bytes']
print('PASS: both descriptors derived solely from hash-bound admitted a0 records')
