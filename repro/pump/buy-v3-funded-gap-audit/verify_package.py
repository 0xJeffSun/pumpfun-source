"""Read-only verification of the sealed historical receipt package; no VM or network."""
import argparse, gzip, hashlib, json, subprocess, sys
from pathlib import Path
P=Path(__file__).resolve().parent
sha=lambda b:hashlib.sha256(b).hexdigest()
a=argparse.ArgumentParser()
a.add_argument('--repo-root',type=Path)
args=a.parse_args()
mbytes=(P/'manifest.json').read_bytes()
assert sha(mbytes)==(P/'manifest.sha256').read_text().split()[0], 'manifest seal mismatch'
m=json.loads(mbytes)
actual={str(x.relative_to(P)) for x in P.rglob('*') if x.is_file() and x.name not in {'manifest.json','manifest.sha256'} and '__pycache__' not in x.parts}
assert actual==set(m['files']), 'unexpected or missing payload files'
for name,entry in m['files'].items():
    b=(P/name).read_bytes()
    assert len(b)==entry['bytes'] and sha(b)==entry['sha256'], name
j=json.loads((P/'packaging.json').read_text())
original=(P/'original/verify_receipts.py').read_bytes()
assert sha(original)==j['original_verifier_sha256']
adapted=original
for replacement in j['adaptation']['only_replacements']:
    old=replacement['old'].encode();new=replacement['new'].encode()
    assert adapted.count(old)==1
    adapted=adapted.replace(old,new)
assert adapted==(P/'verify_receipts.py').read_bytes(), 'unexpected verifier edits'
encoding=j['receipt_encoding'];uncompressed=gzip.decompress((P/encoding['path']).read_bytes())
assert len(uncompressed)==encoding['uncompressed_bytes'] and sha(uncompressed)==encoding['uncompressed_sha256']
external=0
if args.repo_root:
    for name,entry in json.loads((P/'external-inputs.json').read_text()).items():
        b=(args.repo_root/name).read_bytes()
        assert len(b)==entry['bytes'] and sha(b)==entry['sha256'], name
        external+=1
r=subprocess.run([sys.executable,'-B',str(P/'verify_receipts.py')],check=True,capture_output=True,text=True)
receipt=json.loads(r.stdout)
assert receipt['verified'] is True
print(json.dumps({'package_verified':True,'payload_files':len(m['files']),'external_files_verified':external,'receipt_verification':receipt,'latest_main_rerun':False},indent=2))
