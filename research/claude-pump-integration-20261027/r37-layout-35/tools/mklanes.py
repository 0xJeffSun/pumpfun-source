import json, sys
from pathlib import Path
L = Path('/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/fz-int-pump')
lanes = json.loads((L / 'pkg/L34-lanes.json').read_text())
for d in sys.argv[1:] or ['fz-P-inc-r2-01']:
    j = json.loads((L / 'l35/inputs' / d / 'delivery.json').read_text())
    lanes.append({'lane': j['lane'], 'delivery': 'claude-pump-work/deliveries/' + d, 'session': 'fz3 resume round window lanes (Claude)',
                  'windows': j['gains'], 'windows_counted_earlier_in_list': [], 'dropped_in_composition': [],
                  'synthetic_layout': 'yes' if j.get('synthetic_layout') else 'no', 'files': j['files_changed'], 'summary': j['summary'][:700]})
(L / 'pkg/L35-lanes.json').write_text(json.dumps(lanes, indent=1))
print(len(lanes))
