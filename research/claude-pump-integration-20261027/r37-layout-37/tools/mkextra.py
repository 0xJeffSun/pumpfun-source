import json
from collections import Counter
from pathlib import Path
L = Path('/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/fz-int-pump')
old = (L / 'pkg/L36-extra.md').read_text().splitlines()
lanes = json.loads((L / 'pkg/L37-lanes.json').read_text())
tri = json.loads((L / 'l37/triage-c2.json').read_text())
rr = json.loads((L / 'pkg/L37-layout/rawready.json').read_text())
rt = json.loads((L / 'l37/runtime.json').read_text()) if (L / 'l37/runtime.json').exists() else None
cat = Counter(t['category'] for t in tri); unm = ' '.join('`%s`' % t['start'] for t in tri)
nready = len(rr['ready']); nmatched = len(rr['per'])
nr = {k: v for k, v in rr['per'].items() if k not in rr['ready']}
i35 = next(i for i, l in enumerate(old) if l.startswith('- **L36 (1016)'))
old[i35] = old[i35].replace('- **L36 (1016) = L35', '- L36 (1016) = `r37-layout-36` (#519) = L35').replace('behaviour correction** (no', 'behaviour correction (no')
ihas = next(i for i, l in enumerate(old) if l.startswith('L36 has 0 normalized'))
out = old[:ihas - 1]
out += [
 '- **L37 (1017) = L36 + fz-P-hop-r2-01 + the merged admin_cto collection-order patch (#496)** (no window change by itself). Window: `0x567d8` `multi_hop_curve::execute` (fz-P-hop-r2-01, `multi_hop_curve_swap.rs`, made on L33: hop body in its own `#[inline(never)] fn swap_hop`, handler loop over `0..count` with `[start..start.saturating_add(5)]` slices; no `// layout-pad` lines added, the file grows 876 -> 931 lines at the end because the hop body and helpers moved after the last Source site). Log/CPI-order parity: `research/pump-l32-admin-cto-log-order-20261028/source.patch` (#496, made on L32 + #492; three replacements on existing `admin_cto.rs` lines, file stays 700 lines). Commands: `tools/compose_l37.sh`; inputs in `tools/l37-inputs/`.',
 '- Merges: both applied as clean three-way merges (#496 against L32 + #492, hop-r2 against L33). Nothing was dropped.',
 '',
 'L37 has 0 normalized and 0 raw losses against L36 (and against L12), no SBF stack-offset warnings, and gains 110 windows over L12. Against L36 (#519): **+1 normalized** (`0x567d8`), raw unchanged (168 source-only, 293 with the layout layer); raw-ready with the layout layer 997/1016 -> %d/%d. The repository builder reproduces the lane identity build (unstripped `cf5f84d8`). `tools/` holds every step (`compose_l33.sh` ... `compose_l36.sh`, `compose_l37.sh`, `resolve_v3b.py`, `resolve_crv2c.py`, `resolve_crv2ab.py`).' % (nready, nmatched),
 '']
b = old.index('## Builds in this packet: source-only and with the generated link order')
c = old.index('## Contributions (gains over L12)')
out += '\n'.join(old[b:c]).replace('| **1016** | **168** |', '| **1017** | **168** |').replace('| 1016 | **293** |', '| 1017 | **293** |').splitlines()
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
out += ['', old[s0], '', old[b33], '', old[b35], '', old[b36], '',
 'L37 behaviour notes: fz-P-hop-r2-01 makes `multi_hop_curve::execute` byte-identical (normalized) to the original with the same errors, codes, lines, checks and CPI order. **#496 corrects CPI order toward the original** in `admin_cto`\'s creator collection: for a native quote mint with a nonempty AMM creator vault the destination quote ATA is now created (idempotent CPI) before the Pump-side collection, the AMM vault frozen state is read once and reused, and no duplicate native-quote ATA CPI runs before AMM collection, as in the original (its packet attributes the six remaining message-order log differences, admin_cto cases 270-275, to this branch).',
 '']
out += ['## L37 runtime evidence', '']
if rt is None:
    out += ['The 44-suite captured-loader corpus has not been run for this exact package yet.', '']
else:
    out += ['The 44-suite captured-upgradeable-loader corpus (`full.json.gz`, `scripts/pump_validate_parallel.py --captured-loader`) passes on this exact candidate: **%s paired cases, 0 structured mismatches** (%s diagnostic-log cases). `runtime-review/` holds:' % (format(rt['cases'], ','), format(rt['log_cases'], ',')),
     '',
     '- `L37-RUNTIME-REVIEW.json` (ordered-log oracle of `work/parallel-main-r41-log-oracle`, compute lines excluded, source line/column normalized, filenames kept; script `audit_saved_runtime.py`): `%s`, %d state differences, %s signed-transaction occurrences re-verified. `L36-RUNTIME-REVIEW.json` is the same review of #519 for comparison.' % (rt['verdict'], rt['state_differences'], format(rt['signed'], ',')),
     '- `retained_vs_fresh.json` / `changed_logs.json` / `neither.txt` (scripts alongside): candidate log sequences of the L36 (#519) corpus vs this fresh run (compute lines excluded, source coordinates verbatim): %s' % rt['changes_text'],
     '', '| ordered main-log family | L36 (#519) | L37 |', '|---|---:|---:|']
    for fam, a, b2 in rt['families']: out.append('| %s | %s | %s |' % (fam, a, b2))
    out.append('')
q = old.index('## SYNTHETIC LINE POSITIONING (read this first)'); r = old.index('## Still not equal (honest residue)')
syn = '\n'.join(old[q:r]).rstrip() + ' L37: fz-P-hop-r2-01 adds no pads (lines 192-288 re-laid line-neutrally; the moved hop body and helpers follow the last Source site, `multi_hop_curve_swap.rs` 876 -> 931 lines); #496 edits existing lines only.'
out += syn.splitlines() + ['']
mo = sum(1 for v in nr.values() if 'merge_order' in v); wc = sum(1 for v in nr.values() if 'wrong_call' in v); du = sum(1 for v in nr.values() if 'data_unbound' in v)
out += ['## Still not equal (honest residue)', '',
 '- **%d of 1035 normalized windows are unmatched** (%d body, %d equal-length): %s.' % (len(tri), cat['body'], cat['equal-len'], unm),
 '- Raw (unnormalized) equality: 168/1035 source-only, 293/1035 with the generated link order. The whole meaningful ELF is **not** byte-identical yet. With the layout layer, %d of the %d matched windows are raw-ready (%d not; `layout-run/rawready.json`; blocker windows by class: %d merged-constant order, %d wrong call target, %d with data refs to unbound objects: panic Location records not yet on the original line:column, `0x18678` walk (original `create_v2.rs` 385:29, 426:64, 488:19), `0x7bfd8` update helpers (original `volume_accumulator.rs` 53:14, 78:17, 108:14, 429:43, 431:14) `0x34558` holder distribution (original `creator/distribute_fee_to_holders.rs` 114:22, 121:44) and `0x567d8` multi-hop execute (original `multi_hop_curve_swap.rs` 232:32); every Location record of the other matched windows equals the original (raw-r2 `locs.py`: 355 equal, 11 differing, all in these four windows)). Raw cannot move much further until `.text` size equals the original.' % (nready, nmatched, len(nr), mo, wc, du),
 '- Log parity: %s' % (rt['parity_text'] if rt else 'see the runtime section.')]
(L / 'pkg/L37-extra.md').write_text('\n'.join(out) + '\n')
print(len(out), len(tri), nready, nmatched, len(nr))
