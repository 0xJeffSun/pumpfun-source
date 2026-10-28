import json
from pathlib import Path
L = Path('/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/fz-int-pump')
lanes = json.loads((L / 'pkg/L36-lanes.json').read_text())
lanes.append({'lane': 'log parity (admin_cto collection order)', 'delivery': 'research/pump-l32-admin-cto-log-order-20261028 (PR #496, source.patch)',
              'session': 'contributor packet, composed by fz-int-pump-L34', 'windows': [], 'synthetic_layout': 'no (three replacements on existing lines, file stays 700 lines)',
              'files': ['src/creator/admin_cto.rs'],
              'summary': "admin_cto creator collection in the original's branch structure: the AMM creator-vault frozen state is cached, the destination quote ATA is created idempotently before the Pump-side collection (so 'No creator fee to collect' follows the ATA CPI as in the original), and the cached frozen state is reused before AMM collection without a duplicate native-quote ATA CPI; fixes the six message-order log differences (cases 270-275); no window change"})
for d in ('fz-P-hop-r2-01',):
    j = json.loads((L / 'l37/inputs' / d / 'delivery.json').read_text())
    lanes.append({'lane': j['lane'], 'delivery': 'claude-pump-work/deliveries/' + d, 'session': 'fz3 resume round window lanes (Claude)',
                  'windows': j['gains'], 'windows_counted_earlier_in_list': [], 'dropped_in_composition': [],
                  'synthetic_layout': 'yes' if j.get('synthetic_layout') else 'no', 'files': j['files_changed'], 'summary': j['summary'][:700]})
(L / 'pkg/L37-lanes.json').write_text(json.dumps(lanes, indent=1))
print(len(lanes))
