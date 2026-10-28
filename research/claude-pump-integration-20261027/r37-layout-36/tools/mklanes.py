import json
from pathlib import Path
L = Path('/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/fz-int-pump')
lanes = json.loads((L / 'pkg/L35-lanes.json').read_text())
for d in ('fz-P-mig12-r3-01', 'fz-P-crv2ab-r3-01', 'fz-P-cfee2-r2-01'):
    j = json.loads((L / 'l36/inputs' / d / 'delivery.json').read_text())
    lanes.append({'lane': j['lane'], 'delivery': 'claude-pump-work/deliveries/' + d, 'session': 'fz3 resume round window lanes (Claude)',
                  'windows': j['gains'], 'windows_counted_earlier_in_list': [], 'dropped_in_composition': [],
                  'synthetic_layout': 'yes' if j.get('synthetic_layout') else 'no', 'files': j['files_changed'], 'summary': j['summary'][:700]})
lanes[-2]['summary'] += '; L36 merge: one create_v2.rs conflict (lines 100-101) resolved by tools/resolve_crv2ab.py: fz-P-raw-r2 usize-literal require line + this delivery\'s initialize_metadata(&ctx,..) call line (line-neutral)'
lanes.append({'lane': 'fz-P-legacy-r2', 'delivery': 'claude-pump-work/lanes/fz-P-legacy-r2/BEST-152888-h2 (BEST-152888-h2.patch, made on L33)', 'session': 'fz3 resume round window lanes (Claude); composed on the coordinator\'s request as a behaviour correction',
              'windows': [], 'windows_counted_earlier_in_list': [], 'dropped_in_composition': [],
              'synthetic_layout': 'yes (buy.rs 56 -> 300 lines: the r1 buy_exact_sol_in port with layout-pad blocks; sell.rs and lib.rs line-neutral)',
              'files': ['src/buy.rs', 'src/lib.rs', 'src/sell.rs'],
              'summary': 'behaviour correction toward the original, no window gain (legacy sell 0x152888 similarity .27 -> .93, legacy buy_exact_sol_in 0x14f4e0 unchanged .75): the legacy sell handler (lib.rs) now does the whitelist token-account reload/reload/sync_virtual_quote_reserves after the token transfer and updates the curve reserves in place, as the original does (L35 lacked both); one buyback_fee_recipient call with the index chosen by the cashback flag, process_cashback (sell.rs) as in the matched sell paths; buy.rs carries fz-P-legacy-r1\'s buy_exact_sol_in port'})
(L / 'pkg/L36-lanes.json').write_text(json.dumps(lanes, indent=1))
print(len(lanes))
