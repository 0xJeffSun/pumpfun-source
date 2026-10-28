# Compare Codex-recorded runtime input hashes with the lane snapshot repo-ro.
import json, hashlib, gzip, sys
from pathlib import Path
W = Path('/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work/mega/mg-M-int'); R = W / 'repo-ro'; K = W / 'codex438'
CR = '/Users/shawwalters/.codex/worktrees/pr-queue-review/pumpfun-source/'
sha = lambda p: hashlib.sha256(Path(p).read_bytes()).hexdigest()
rec = {}
for f in ['runtime/trades/commands.json', 'runtime/trades/launch.json', 'controllers/initializer-launch.json']:
    d = json.loads((K / f).read_bytes())
    rec.update(d.get('input_hashes', {}))
    for r in d.get('runs', []): rec.update(r.get('input_hashes', {}))
ok = bad = skip = 0
for p, h in sorted(rec.items()):
    rel = p.split(CR, 1)[1] if p.startswith(CR) else p.split('/pumpfun-source/', 1)[1] if '/pumpfun-source/' in p else None
    if rel is None or rel.startswith('work/'): skip += 1; print('skip', p[-80:], h[:12]); continue
    q = R / rel
    if not q.is_file(): bad += 1; print('MISSING', rel); continue
    if sha(q) != h: bad += 1; print('DIFF', rel, sha(q)[:12], 'want', h[:12])
    else: ok += 1
print('ok', ok, 'bad', bad, 'skip', skip)
