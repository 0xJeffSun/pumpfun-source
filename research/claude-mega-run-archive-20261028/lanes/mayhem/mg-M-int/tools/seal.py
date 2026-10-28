import hashlib, sys
from pathlib import Path
p = Path(sys.argv[1]).resolve()
h = lambda b: hashlib.sha256(b).hexdigest()
files = sorted(x for x in p.rglob('*') if x.is_file() and x != p / 'SHA256SUMS.txt')
(p / 'SHA256SUMS.txt').write_text(''.join(h(x.read_bytes()) + '  ' + x.relative_to(p).as_posix() + '\n' for x in files))
print(len(files), 'files sealed')
