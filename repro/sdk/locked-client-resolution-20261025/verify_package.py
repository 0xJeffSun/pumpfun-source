"""Check exact publication membership and hashes, then passive evidence checks."""
from pathlib import Path
import hashlib,json
P=Path(__file__).resolve().parent
assert __debug__, "Use Python without -O"
raw=(P/'manifest.json').read_bytes()
assert hashlib.sha256(raw).hexdigest()==(P/'manifest.sha256').read_text().strip()
m=json.loads(raw)
actual={str(x.relative_to(P)) for x in P.rglob('*') if x.is_file()}
assert not any(x.is_symlink() for x in P.rglob('*'))
assert actual==set(m)|{'manifest.json','manifest.sha256'}
for n,r in m.items():
 b=(P/n).read_bytes()
 assert len(b)==r['bytes'] and hashlib.sha256(b).hexdigest()==r['sha256'],n
import verify
verify.main()
print('PASS exact publication membership and SHA256 seal')
