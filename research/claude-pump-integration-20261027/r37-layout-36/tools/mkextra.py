import json
from collections import Counter
from pathlib import Path
L = Path('/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/fz-int-pump')
old = (L / 'pkg/L35-extra.md').read_text().splitlines()
lanes = json.loads((L / 'pkg/L36-lanes.json').read_text())
tri = json.loads((L / 'l36/triage-c4.json').read_text())
rr = json.loads((L / 'pkg/L36-layout/rawready.json').read_text())
rt = json.loads((L / 'l36/runtime.json').read_text()) if (L / 'l36/runtime.json').exists() else None
cat = Counter(t['category'] for t in tri); unm = ' '.join('`%s`' % t['start'] for t in tri)
nready = len(rr['ready']); nmatched = len(rr['per'])
nr = {k: v for k, v in rr['per'].items() if k not in rr['ready']}
i35 = next(i for i, l in enumerate(old) if l.startswith('- **L35 (1013)'))
old[i35] = old[i35].replace('- **L35 (1013) = L33', '- L35 (1013) = `r37-layout-35` (#512) = L33').replace('raw-ready layer** (no', 'raw-ready layer (no')
ihas = next(i for i, l in enumerate(old) if l.startswith('L35 has 0 normalized'))
out = old[:ihas - 1]
out += [
 '- **L36 (1016) = L35 + fz-P-mig12-r3-01 + fz-P-crv2ab-r3-01 + fz-P-cfee2-r2-01 + the fz-P-legacy-r2 legacy-sell behaviour correction** (no window change by itself). Windows: `0x3fb70` v1 `migrate::execute` (fz-P-mig12-r3-01, `migrate.rs`, made on L33: fee payment through a private `pay_migration_fee` helper appended after the last item, already-migrated test bound first; no Source site moves) and `0x1ac28` `initialize_metadata` (fz-P-crv2ab-r3-01, `create_v2.rs:582-598`, made on L34 = L33 + fz-P-crv2a-r2-01) and `0x34558` `distribute_fee_to_holders` (fz-P-cfee2-r2-01, `creator/distribute_fee_to_holders.rs`, made on L33, line-neutral). Behaviour correction (coordinator request, net 0 windows): fz-P-legacy-r2 `BEST-152888-h2` (made on L33; legacy sell `0x152888` similarity .27 -> .93, not yet equal). Commands: `tools/compose_l36.sh`; inputs in `tools/l36-inputs/`.',
 '- Merges: mig12, legacy-r2 and cfee2 applied as clean three-way merges against L33. crv2ab (merged against L34) left one `create_v2.rs` conflict at lines 100-101 (L35 carries fz-P-raw-r2\'s usize-literal `require_gte!` line, crv2ab changes the next line\'s call to `initialize_metadata(&ctx, ..)`): `tools/resolve_crv2ab.py` takes raw-r2\'s line 100 and crv2ab\'s line 101, so the file stays 622 lines and the hunks equal crv2ab\'s own. Nothing was dropped.',
 '',
 'L36 has 0 normalized and 0 raw losses against L35 (and against L12), no SBF stack-offset warnings, and gains 109 windows over L12. Against L35 (#512): **+3 normalized** (`0x3fb70`, `0x1ac28`, `0x34558`), raw unchanged (168 source-only, 293 with the layout layer); raw-ready with the layout layer 994/1013 -> %d/%d. The repository builder reproduces the lane identity build (unstripped `a05ceaca`). `tools/` holds every step (`compose_l33.sh` ... `compose_l35.sh`, `compose_l36.sh`, `resolve_v3b.py`, `resolve_crv2c.py`, `resolve_crv2ab.py`).' % (nready, nmatched),
 '']
b = old.index('## Builds in this packet: source-only and with the generated link order')
c = old.index('## Contributions (gains over L12)')
out += '\n'.join(old[b:c]).replace('| **1013** | **168** |', '| **1016** | **168** |').replace('| 1013 | **293** |', '| 1016 | **293** |').splitlines()
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
out += ['', old[s0], '', old[b33], '', old[b35], '',
 'L36 behaviour notes: fz-P-mig12-r3-01, fz-P-crv2ab-r3-01 and fz-P-cfee2-r2-01 make their windows byte-identical (normalized) to the original with the same calls, checks and errors in the same order. **fz-P-legacy-r2 is a behaviour correction toward the original without a window gain**: in the legacy sell handler (`lib.rs`), after the curve-to-user token transfer the whitelist quote token accounts are reloaded and `sync_virtual_quote_reserves` runs, and the curve reserves are updated in place, as the original legacy sell does (L35 lacked both; reported by the lane from the original window\'s control flow, the same shape as the matched legacy buy `0x14c038`). It also routes the cashback branch through `process_cashback` (`sell.rs`) and makes one `buyback_fee_recipient` call with the index chosen by the cashback flag. The runtime corpus below runs on this exact candidate.',
 '']
out += ['## L36 runtime evidence', '']
if rt is None:
    out += ['The 44-suite captured-loader corpus has not been run for this exact package yet.', '']
else:
    out += ['The 44-suite captured-upgradeable-loader corpus (`full.json.gz`, `scripts/pump_validate_parallel.py --captured-loader`) passes on this exact candidate: **%s paired cases, 0 structured mismatches** (%s diagnostic-log cases). `runtime-review/` holds:' % (format(rt['cases'], ','), format(rt['log_cases'], ',')),
     '',
     '- `L36-RUNTIME-REVIEW.json` (ordered-log oracle of `work/parallel-main-r41-log-oracle`, compute lines excluded, source line/column normalized, filenames kept; script `audit_saved_runtime.py`): `%s`, %d state differences, %s signed-transaction occurrences re-verified. `L35-RUNTIME-REVIEW.json` is the same review of #512 for comparison.' % (rt['verdict'], rt['state_differences'], format(rt['signed'], ',')),
     '- `retained_vs_fresh.json` / `changed_logs.json` / `neither.txt` (scripts alongside): candidate log sequences of the L35 (#512) corpus vs this fresh run (compute lines excluded, source coordinates verbatim): %s' % rt['changes_text'],
     '', '| ordered main-log family | L35 (#512) | L36 |', '|---|---:|---:|']
    for fam, a, b2 in rt['families']: out.append('| %s | %s | %s |' % (fam, a, b2))
    out.append('')
q = old.index('## SYNTHETIC LINE POSITIONING (read this first)'); r = old.index('## Still not equal (honest residue)')
syn = '\n'.join(old[q:r]).rstrip() + ' L36: fz-P-mig12-r3-01 adds no pads (its helper is appended after the last item of `migrate.rs`); fz-P-crv2ab-r3-01 is line-neutral inside `create_v2.rs` 582-598; fz-P-cfee2-r2-01 is line-neutral (`distribute_fee_to_holders.rs` stays 166 lines); fz-P-legacy-r2 grows `buy.rs` from 56 to 300 lines (`// layout-pad` blocks that hold the ported buy_exact_sol_in Source sites on the original lines) and keeps `sell.rs` and `lib.rs` line-neutral.'
out += syn.splitlines() + ['']
mo = sum(1 for v in nr.values() if 'merge_order' in v); wc = sum(1 for v in nr.values() if 'wrong_call' in v); du = sum(1 for v in nr.values() if 'data_unbound' in v)
out += ['## Still not equal (honest residue)', '',
 '- **%d of 1035 normalized windows are unmatched** (%d body, %d equal-length): %s.' % (len(tri), cat['body'], cat['equal-len'], unm),
 '- Raw (unnormalized) equality: 168/1035 source-only, 293/1035 with the generated link order. The whole meaningful ELF is **not** byte-identical yet. With the layout layer, %d of the %d matched windows are raw-ready (%d not; `layout-run/rawready.json`; blocker windows by class: %d merged-constant order, %d wrong call target, %d with data refs to unbound objects: panic Location records not yet on the original line:column, `0x18678` walk (original `create_v2.rs` 385:29, 426:64, 488:19), `0x7bfd8` update helpers (original `volume_accumulator.rs` 53:14, 78:17, 108:14, 429:43, 431:14) and `0x34558` holder distribution (original `creator/distribute_fee_to_holders.rs` 114:22, 121:44); every Location record of the other matched windows equals the original (raw-r2 `locs.py`: 354 equal, 10 differing, all in these three windows)). Raw cannot move much further until `.text` size equals the original.' % (nready, nmatched, len(nr), mo, wc, du),
 '- Log parity: %s' % (rt['parity_text'] if rt else 'see the runtime section.')]
(L / 'pkg/L36-extra.md').write_text('\n'.join(out) + '\n')
print(len(out), len(tri), nready, nmatched, len(nr))
