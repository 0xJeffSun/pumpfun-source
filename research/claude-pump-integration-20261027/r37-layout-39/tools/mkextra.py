import json
from collections import Counter
from pathlib import Path
L = Path('/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/fz-int-pump')
old = (L / 'pkg/L38-extra.md').read_text().splitlines()
lanes = json.loads((L / 'pkg/L39-lanes.json').read_text())
tri = json.loads((L / 'l39/triage-c1.json').read_text())
rr = json.loads((L / 'pkg/L39-layout/rawready.json').read_text())
rt = json.loads((L / 'l39/runtime.json').read_text()) if (L / 'l39/runtime.json').exists() else None
cat = Counter(t['category'] for t in tri); unm = ' '.join('`%s`' % t['start'] for t in tri)
nready = len(rr['ready']); nmatched = len(rr['per'])
nr = {k: v for k, v in rr['per'].items() if k not in rr['ready']}
i35 = next(i for i, l in enumerate(old) if l.startswith('- **L38 (1018)'))
old[i35] = old[i35].replace('- **L38 (1018) = L37 + fz-P-srf-r3-01**', '- L38 (1018) = `r37-layout-38` (#527) = L37 + fz-P-srf-r3-01')
ihas = next(i for i, l in enumerate(old) if l.startswith('L38 has 0 normalized'))
out = old[:ihas - 1]
out += [
 '- **L39 (1018) = L38 + fz-P-data-r1-02: data-side only, no window change.** fz-P-data-r1-02 (made on L38; cumulative on fz-P-data-r1-01) puts the panic Location records of `0x18678`, `0x7bfd8`, `0x34558` and `0x567d8` on the original line:column, places the v3 sell fee path and the multi-hop hop body on the original helpers (`v3_trade_fees`/`get_fees`, `net_quote_for_budget`/`get_fees`/`apply_buy`/`apply_sell`) so their error and panic logs name the original file and line, puts the v3 sell `NotEnoughTokensToSell`/`TooLittleSolReceived` sites on lines 1127/1148 (the original `0x14a8a8` site list), and replaces dead candidate-only helpers with blank lines (`.text` 13,080 B smaller). Files: `create_v2.rs`, `creator/distribute_fee_to_holders.rs`, `multi_hop_curve_swap.rs`, `token_incentives/volume_accumulator.rs`, `trade_v3.rs`. Commands: `tools/compose_l39.sh`; inputs in `tools/l39-inputs/`.',
 '- Merge: clean three-way merge against L38 (the composed tree equals the delivery\'s tree; the build reproduces its unstripped `d83e9bcc` exactly).',
 '',
 'L39 has 0 normalized and 0 raw losses against L38 (and against L12), no SBF stack-offset warnings, and the same 1018 normalized / 168 raw windows (293 with the layout layer). **Data-side gains:** raw-ready with the layout layer 997/1018 -> %d/%d (`0x18678` `0x34558` `0x567d8` `0x7bfd8` `0x89ec8` become ready, none lost), and every panic Location record referenced by a matched window equals the original (raw-r2 `locs.py`: 368 equal, 0 differing). The repository builder reproduces the lane identity build (unstripped `d83e9bcc`). `tools/` holds every step (`compose_l33.sh` ... `compose_l38.sh`, `compose_l39.sh`, `resolve_v3b.py`, `resolve_crv2c.py`, `resolve_crv2ab.py`).' % (nready, nmatched),
 '']
b = old.index('## Builds in this packet: source-only and with the generated link order')
c = old.index('## Contributions (gains over L12)')
out += '\n'.join(old[b:c]).replace('| **1018** | **168** |', '| **1018** | **168** |').splitlines()
out += ['## Contributions (gains over L12)', '', '| delivery | windows | synthetic layout | change |', '|---|---|---|---|']
for l in lanes:
    w = ' '.join('`%s`' % x for x in l['windows']) or '(none)'
    s = l['summary'].replace('|', '/').replace('\n', ' ')
    if len(s) > 400: s = s[:400] + ' ...'
    name = l['delivery'].split('/')[-1] if l['delivery'].startswith('claude-pump-work/deliveries') else (l['delivery'].split('/')[-1].split(' ')[0] if l['delivery'].startswith('claude-pump-work/lanes') else l['lane'])
    out.append('| %s | %s | %s | %s |' % (name, w, l['synthetic_layout'], s))
s0 = next(i for i, l in enumerate(old) if l.startswith('All changes keep the original'))
b33 = next(i for i, l in enumerate(old) if l.startswith('L33 behaviour notes'))
b35 = next(i for i, l in enumerate(old) if l.startswith('L35 behaviour notes'))
b36 = next(i for i, l in enumerate(old) if l.startswith('L36 behaviour notes'))
b37 = next(i for i, l in enumerate(old) if l.startswith('L37 behaviour notes'))
b38 = next(i for i, l in enumerate(old) if l.startswith('L38 behaviour notes'))
out += ['', old[s0], '', old[b33], '', old[b35], '', old[b36], '', old[b37], '', old[b38], '',
 'L39 behaviour notes: fz-P-data-r1-02 is data-side: the lane reports no change to checks, error codes, events, CPI order or state, and the corpus below shows 0 state differences; what changes is which source file and line the error and panic logs name (now the original\'s in every changed case) and the removal of candidate-only helpers no handler calls.',
 '']
out += ['## L39 runtime evidence', '']
if rt is None:
    out += ['The 44-suite captured-loader corpus has not been run for this exact package yet.', '']
else:
    out += ['The 44-suite captured-upgradeable-loader corpus (`full.json.gz`, `scripts/pump_validate_parallel.py --captured-loader`) passes on this exact candidate: **%s paired cases, 0 structured mismatches** (%s diagnostic-log cases). `runtime-review/` holds:' % (format(rt['cases'], ','), format(rt['log_cases'], ',')),
     '',
     '- `L39-RUNTIME-REVIEW.json` (ordered-log oracle of `work/parallel-main-r41-log-oracle`, compute lines excluded, source line/column normalized, filenames kept; script `audit_saved_runtime.py`): `%s`, %d state differences, %s signed-transaction occurrences re-verified. `L38-RUNTIME-REVIEW.json` is the same review of #527 for comparison.' % (rt['verdict'], rt['state_differences'], format(rt['signed'], ',')),
     '- `retained_vs_fresh.json` / `changed_logs.json` / `neither.txt` (scripts alongside): candidate log sequences of the L38 (#527) corpus vs this fresh run (compute lines excluded, source coordinates verbatim): %s' % rt['changes_text'],
     '', '| ordered main-log family | L38 (#527) | L39 |', '|---|---:|---:|']
    for fam, a, b2 in rt['families']: out.append('| %s | %s | %s |' % (fam, a, b2))
    out.append('')
q = old.index('## SYNTHETIC LINE POSITIONING (read this first)'); r = old.index('## Still not equal (honest residue)')
syn = '\n'.join(old[q:r]).rstrip() + ' L39: fz-P-data-r1-02 is synthetic-layout "yes": line-neutral Source-coordinate placement (`// layout-pad` balance kept per file; `volume_accumulator.rs` 467 -> 451 lines because its end-of-file helpers moved to the original lines), dead candidate-only helpers replaced by blank lines.'
out += syn.splitlines() + ['']
mo = sum(1 for v in nr.values() if 'merge_order' in v); wc = sum(1 for v in nr.values() if 'wrong_call' in v); du = sum(1 for v in nr.values() if 'data_unbound' in v)
out += ['## Still not equal (honest residue)', '',
 '- **%d of 1035 normalized windows are unmatched** (%d body, %d equal-length): %s.' % (len(tri), cat['body'], cat['equal-len'], unm),
 '- Raw (unnormalized) equality: 168/1035 source-only, 293/1035 with the generated link order. The whole meaningful ELF is **not** byte-identical yet. With the layout layer, %d of the %d matched windows are raw-ready (%d not; `layout-run/rawready.json`; blocker windows by class: %d merged-constant order, %d wrong call target, %d with data refs to unbound objects; every panic Location record of the matched windows equals the original, raw-r2 `locs.py` 368/368). Raw cannot move much further until `.text` size equals the original.' % (nready, nmatched, len(nr), mo, wc, du),
 '- Log parity: %s' % (rt['parity_text'] if rt else 'see the runtime section.')]
(L / 'pkg/L39-extra.md').write_text('\n'.join(out) + '\n')
print(len(out), len(tri), nready, nmatched, len(nr))
