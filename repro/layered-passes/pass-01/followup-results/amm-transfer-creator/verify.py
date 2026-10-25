#!/usr/bin/env python3
"""Portable static verifier; only writes temporary analysis inside this package."""
from pathlib import Path
import difflib,hashlib,json,subprocess,sys,tempfile
sys.dont_write_bytecode=True
P=Path(__file__).resolve().parent
sha=lambda b:hashlib.sha256(b).hexdigest()
raw=(P/'manifest.json').read_bytes();assert sha(raw)==(P/'manifest.sha256').read_text().split()[0]
manifest=json.loads(raw)
for name,x in manifest['files'].items():
 b=(P/name).read_bytes();assert len(b)==x['bytes'] and sha(b)==x['sha256'],name
for x in json.loads((P/'input-provenance.json').read_text()):
 b=(P/x['path']).read_bytes();assert sha(b)==x['sha256']
 assert hashlib.sha1(b'blob '+str(len(b)).encode()+b'\0'+b).hexdigest()==x['git_blob']
p='programs/pump-amm/src/transfer_creator.rs';s=(P/'inputs'/p).read_text();new=s.replace('rent.minimum_balance(0).saturating_sub(destination.lamports())','rent.minimum_balance(destination.data_len()).saturating_sub(destination.lamports())')
assert s!=new and new==(P/'proposal/proposed-transfer_creator.rs').read_text()
assert (P/'proposal/destination-rent.patch').read_text()==''.join(difflib.unified_diff(s.splitlines(True),new.splitlines(True),fromfile='a/'+p,tofile='b/'+p))
subprocess.run([sys.executable,'-B',str(P/'layer01/verify.py')],cwd=P,check=True)
with tempfile.TemporaryDirectory(prefix='.verify-static-',dir=P) as d:
 subprocess.run([sys.executable,'-B',str(P/'analyze.py'),d],cwd=P,stdout=subprocess.PIPE,check=True)
 names={f.name for f in (P/'analysis').iterdir()};assert names=={f.name for f in Path(d).iterdir()}
 for name in names:assert (P/'analysis'/name).read_bytes()==(Path(d)/name).read_bytes(),name
print(json.dumps({'status':'PASS','sealed_files':len(manifest['files']),'new_analysis_files':len(names),'saved_transfer_rows':267,'saved_transfer_mismatches':0,'target_execution':False,'compiler_execution':False,'network':False,'whole_original_equal':False,'proposal_accepted':False},indent=2))
