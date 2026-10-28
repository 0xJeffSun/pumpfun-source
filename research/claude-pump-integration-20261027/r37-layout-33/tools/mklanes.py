import json
from pathlib import Path
L = Path('/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/fz-int-pump')
lanes = json.loads((L / 'pkg/L32-lanes.json').read_text())
order = ['fz-P-mig1-r1-01', 'fz-P-mig2-r1-02', 'fz-P-buyv2a-r1-01', 'fz-P-buyv2c-r1-03', 'fz-P-cfee1-r1-02', 'fz-P-cfee2-r1-01',
         'fz-P-hop-r1-02', 'fz-P-v3b-r1-02', 'fz-P-misc-r1-04', 'fz-P-inc-r1-01', 'fz-P-legacy-r1-01', 'fz-P-sweep-r1-01']
for d in order:
    j = json.loads((L / 'l33/inputs' / d / 'delivery.json').read_text())
    syn = 'yes' if j.get('synthetic_layout') else 'no'
    if d == 'fz-P-hop-r1-02': syn = 'no (composite on fz-P-v3a-r1-02, whose trade_v3.rs edits are synthetic-layout: yes)'
    lanes.append({'lane': j['lane'], 'delivery': 'claude-pump-work/deliveries/' + d, 'session': 'fz final run window lanes (Claude)',
                  'windows': j['gains'], 'windows_counted_earlier_in_list': [], 'dropped_in_composition': [],
                  'synthetic_layout': syn, 'files': j['files_changed'], 'summary': j['summary'][:700]})
lanes.append({'lane': 'fz-P-raw-r1', 'delivery': 'claude-pump-work/lanes/fz-P-raw-r1/rawready-973.patch (srcB, made on L32)',
              'session': 'fz final run window lanes (Claude)', 'windows': [],
              'synthetic_layout': 'yes (raw-ready layout: Source-coordinate helpers/pads, event structs at original lines, set_creator file split, migrate.rs pad block)',
              'files': ['src/admin_set_idl_authority.rs', 'src/creator/admin_cto.rs', 'src/creator/distribute_creator_fees.rs', 'src/creator/set_creator.rs (moved from src/set_creator.rs)',
                        'src/creator/set_metaplex_creator.rs', 'src/curve_quote_payments.rs', 'src/extend_account.rs', 'src/lib.rs', 'src/migrate.rs'],
              'summary': 'raw-ready layer, no normalized or raw window change by itself: raw-ready (with the layout layer) 968 -> 986 of 1008 matched windows when composed (987 of 1010 on the final L33)'})
(L / 'pkg/L33-lanes.json').write_text(json.dumps(lanes, indent=1))
print(len(lanes))
