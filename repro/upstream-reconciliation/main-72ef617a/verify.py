from pathlib import Path
import hashlib,json
P=Path(__file__).resolve().parent;R=P.parents[2];J=lambda p:json.loads(p.read_text());H=lambda b:hashlib.sha256(b).hexdigest();m=J(P/'manifest.json')
assert set(m)=={str(f.relative_to(P))for f in P.rglob('*')if f.is_file()and f not in(P/'manifest.json',P/'manifest.sha256')}
for n,h in m.items():assert H((P/n).read_bytes())==h,n
j=J(P/'inventory.json');raw=(P/'commit.raw').read_bytes();assert hashlib.sha1(b'commit '+str(len(raw)).encode()+b'\0'+raw).hexdigest()==j['incoming_commit']
for n,row in j['files'].items():
 b=(P/'incoming'/n).read_bytes();assert H(b)==row['sha256']and len(b)==row['bytes']and hashlib.sha1(b'blob '+str(len(b)).encode()+b'\0'+b).hexdigest()==row['git_blob']
 if not row['selected_baseline_exists']:assert not(R/n).exists()
print('PASS: exact incoming11blobs/commit preserved passively; inactive additions absent; current source/status checked separately')
