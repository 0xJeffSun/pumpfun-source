#!/usr/bin/env python3
"""Write the lanes JSON + contribution rows for an L1x package from delivery.json files.
  mkmeta.py <name> <out-prefix> [mega deliveries in composition order ...]"""
import json, sys
from pathlib import Path
W = Path('/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work'); ME = W / 'lanes/mg-P-int'
name, out = sys.argv[1], Path(sys.argv[2])
R5 = ['r5-coord-03', 'r5-libinst-06', 'r5-z00-03', 'r5-z01-02', 'r5-z02-02', 'r5-z03-07', 'r5-z04-02', 'r5-z05-04', 'r5-z06-02', 'r5-z07-03', 'r5-z08-03', 'r5-z09-01']
MG = sys.argv[3:] or ['mg-P-lib-03', 'mg-P-z02-02', 'mg-P-z07-02', 'mg-P-z06-01']
syn_note = {'r5-coord-03': 'yes for 0x178e0 only (placement-only, see below)', 'r5-z07-03': 'yes (carries r5-z00-03\'s pad positioning)',
            'r5-libinst-06': 'yes for 0x1a918/0x58bf0 (helper fns placed in layout-pad blocks)'}
final = json.loads((W / f'base/{name}/inventory.json').read_text())['summary']
got = set(final['gains'])
rows, lanes = [], []
seen = set()
for d in R5 + MG:
    j = json.loads((W / 'deliveries' / d / 'delivery.json').read_text())
    g = [x for x in j['gains'] if x in got and x not in seen]; seen |= set(g)
    dropped = [x for x in j['gains'] if x not in got]
    syn = syn_note.get(d, 'yes' if j.get('synthetic_layout') else 'no')
    files = [f for f in j.get('files_changed', []) if not f.startswith('/') and not f.startswith('Users/') and f != '-ruN']
    lanes.append({'lane': j['lane'] if 'lane' in j else d.rsplit('-', 1)[0], 'delivery': f'claude-pump-work/deliveries/{d}', 'session': 'Main-Pump round-5 lanes (Claude)' if d.startswith('r5-') else 'Mega workflow for contract completion (Claude)',
                  'windows': g, 'windows_counted_earlier_in_list': [x for x in j['gains'] if x in got and x not in g], 'dropped_in_composition': dropped,
                  'synthetic_layout': syn, 'files': files, 'summary': j.get('summary', '')})
    rows.append(f"| {d} | {' '.join('`'+x+'`' for x in g) or '(all counted above)'} | {syn} | {j.get('summary','').replace('|','/')[:400]} |")
port = ['0x43ea0', '0x502f0', '0x68bd8']
lanes.append({'lane': 'mg-P-int (Round46 port)', 'delivery': 'claude-pump-work/lanes/mg-P-int/fix/port46.py', 'session': 'Mega workflow for contract completion (Claude)', 'windows': [x for x in port if x in got],
              'synthetic_layout': 'no', 'files': ['src/migrate.rs', 'src/migrate_v2.rs', 'src/quote_control/state.rs'],
              'summary': 'Codex Round46/47-only windows ported from repro/pump/main-contract-round46-20261027/primary, line-neutral'})
rows.append("| Codex Round46 port (integrator) | `0x43ea0` `0x502f0` `0x68bd8` | no | migrate::create_pool and migrate_v2::create_pool as private helpers calling the generated pump_amm client with the signer seeds passed to a closure (Round46 form; migrate_v2 previously hand-built the identical create_pool instruction: same 18 account metas and Borsh data), QuoteControl::validate_new_mint membership test written inline as `position(..).is_some()` (= the existing contains() body) |")
(out.parent / (out.name + '-lanes.json')).write_text(json.dumps(lanes, indent=1) + '\n')
print(len(seen | set(port) & got), 'windows attributed of', len(got))
(out.parent / (out.name + '-rows.md')).write_text('\n'.join(rows) + '\n')
