"""Write manifest.json: SHA-256 of every file in this packet except manifest.json itself."""
from pathlib import Path
import hashlib, json

p = Path(__file__).resolve().parents[1]
files = sorted(f for f in p.rglob('*') if f.is_file() and f.name != 'manifest.json' and '__pycache__' not in f.parts)
manifest = {str(f.relative_to(p)): hashlib.sha256(f.read_bytes()).hexdigest() for f in files}
(p / 'manifest.json').write_text(json.dumps(manifest, indent=2) + '\n')
print(len(manifest), 'files')
