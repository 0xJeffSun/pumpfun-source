import json, sys
from pathlib import Path
W = Path('/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work')
m = {}
for b in sorted((W / 'base').glob('L1[2-9]')) + sorted((W / 'base').glob('L[2-9][0-9]')):
    s = json.loads((b / 'inventory.json').read_text())['summary']['candidate_sha256']; m[s] = b
for d in sys.argv[1:]:
    j = json.loads((W / 'deliveries' / d / 'delivery.json').read_text()); b = m.get(j.get('base_unstripped_sha256'))
    print(d, j.get('base_round') or j.get('base'), b.name if b else 'UNKNOWN', j.get('normalized'), len(j.get('gains', [])))
