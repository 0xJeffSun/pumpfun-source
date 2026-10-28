import json
from collections import Counter
from pathlib import Path
L = Path('/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/fz-int-pump')
old = (L / 'pkg/L40-extra.md').read_text().splitlines()
lanes = json.loads((L / 'pkg/L41-lanes.json').read_text())
tri = json.loads((L / 'l41/triage-c1.json').read_text())
rr = json.loads((L / 'pkg/L41-layout/rawready.json').read_text())
rt = json.loads((L / 'l41/runtime.json').read_text()) if (L / 'l41/runtime.json').exists() else None
cat = Counter(t['category'] for t in tri); unm = ' '.join('`%s`' % t['start'] for t in tri)
nready = len(rr['ready']); nmatched = len(rr['per'])
nr = {k: v for k, v in rr['per'].items() if k not in rr['ready']}
i35 = next(i for i, l in enumerate(old) if l.startswith('- **L40 (1018)'))
old[i35] = old[i35].replace('- **L40 (1018) = L39 + fz-P-data-r1-03: data-side only, no window change.**', '- L40 (1018) = `r37-layout-40` (#564) = L39 + fz-P-data-r1-03: data-side only, no window change.')
ihas = next(i for i, l in enumerate(old) if l.startswith('L40 has 0 normalized'))
out = old[:ihas - 1]
out += [
 '- **L41 (1019) = L40 + merged contributor PR #555** (`research/pump-legacy-sell-boundary-20261028/source.patch`, made on L38 #527; credit: #555, which also composes the checked accumulator constructor selection identified in #539). Window: `0x152888` legacy `sell` handler. The cashback branch calls an `#[inline(always)] process_cashback(remaining_accounts, &mint.key(), user, system_program, curve, amount)` wrapper, so the borrowed mint key is evaluated before the user/system account coercions, around the original helper body (`process_cashback_inner`, `mint: &Pubkey`). The user volume accumulator is built with the checked `Account::try_from`. Files: `lib.rs` (line 1040 in place) and `sell.rs` (lines 19, 21, 88 in place; the 13-line wrapper appended at the end, 148 -> 161 lines). Commands: `tools/compose_l41.sh`; the contributor patch and README in `tools/l41-inputs/pr555/`.',
 '- Merge: clean three-way merge against L38. L40\'s own `sell.rs` edits (fz-P-data-r1-03: `process_cashback` data writes on lines 76/77) and #555\'s hunks are disjoint, so both survive unchanged: the L40 -> L41 diff equals the contributor patch hunk for hunk.',
 '',
 'L41 has 0 normalized and 0 raw losses against L40 (and against L12), no SBF stack-offset warnings, and gains 112 windows over L12. Against L40 (#564): **+1 normalized** (`0x152888`), raw unchanged (168 source-only, 293 with the layout layer); raw-ready with the layout layer 1005/1018 -> %d/%d (no window lost readiness; `0x152888` itself is not yet raw-ready, merged-constant order); every panic Location record of the matched windows still equals the original (`locs.py` 369/369). The repository builder reproduces the lane identity build (unstripped `4e140892`). `tools/` holds every step (`compose_l33.sh` ... `compose_l40.sh`, `compose_l41.sh`, `resolve_v3b.py`, `resolve_crv2c.py`, `resolve_crv2ab.py`).' % (nready, nmatched),
 '']
b = old.index('## Builds in this packet: source-only and with the generated link order')
c = old.index('## Contributions (gains over L12)')
out += '\n'.join(old[b:c]).replace('| **1018** | **168** |', '| **1019** | **168** |').replace('| 1018 | **293** |', '| 1019 | **293** |').splitlines()
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
b39 = next(i for i, l in enumerate(old) if l.startswith('L39 behaviour notes'))
b40 = next(i for i, l in enumerate(old) if l.startswith('L40 behaviour notes'))
out += ['', old[s0], '', old[b33], '', old[b35], '', old[b36], '', old[b37], '', old[b38], '', old[b39], '', old[b40], '',
 'L41 behaviour notes: #555 makes the legacy `sell` handler byte-identical (normalized) to the original. The wrapper only fixes argument evaluation order; the helper body is unchanged. The one changed call is the accumulator constructor: `Account::try_from` (checked) in place of `try_from_unchecked`, at `sell.rs:88`. On both paths before it the account already has the program owner and the discriminator: a new accumulator is created and assigned to the program with the discriminator written (`sell.rs:49-77`), and an existing one must pass `check_existing` (`require!` owner and `data.len() >= 8 && data[..8] == UserVolumeAccumulator::DISCRIMINATOR`, `InvalidCashbackAccumulator`, `sell.rs:80-86`). Both Anchor constructors check the owner, and the checked one also re-checks the discriminator, so the accepted and rejected accounts and their error codes are the same (the #555 packet reports its targeted cases, and the 44-suite corpus below runs on this exact candidate).',
 '']
out += ['## L41 runtime evidence', '']
if rt is None:
    out += ['The 44-suite captured-loader corpus has not been run for this exact package yet.', '']
else:
    out += ['The 44-suite captured-upgradeable-loader corpus (`full.json.gz`, `scripts/pump_validate_parallel.py --captured-loader`) passes on this exact candidate: **%s paired cases, 0 structured mismatches** (%s diagnostic-log cases). `runtime-review/` holds:' % (format(rt['cases'], ','), format(rt['log_cases'], ',')),
     '',
     '- `L41-RUNTIME-REVIEW.json` (ordered-log oracle of `work/parallel-main-r41-log-oracle`, compute lines excluded, source line/column normalized, filenames kept; script `audit_saved_runtime.py`): `%s`, %d state differences, %s signed-transaction occurrences re-verified. `L40-RUNTIME-REVIEW.json` is the same review of #564 for comparison.' % (rt['verdict'], rt['state_differences'], format(rt['signed'], ',')),
     '- `retained_vs_fresh.json` / `changed_logs.json` / `neither.txt` (scripts alongside): candidate log sequences of the L40 (#564) corpus vs this fresh run (compute lines excluded, source coordinates verbatim): %s' % rt['changes_text'],
     '', '| ordered main-log family | L40 (#564) | L41 |', '|---|---:|---:|']
    for fam, a, b2 in rt['families']: out.append('| %s | %s | %s |' % (fam, a, b2))
    out.append('')
q = old.index('## SYNTHETIC LINE POSITIONING (read this first)'); r = old.index('## Still not equal (honest residue)')
syn = '\n'.join(old[q:r]).rstrip() + ' L41: #555 adds no pads; its hunks edit existing lines, and the wrapper is appended after the last Source site of `sell.rs` (148 -> 161 lines).'
out += syn.splitlines() + ['']
mo = sum(1 for v in nr.values() if 'merge_order' in v); wc = sum(1 for v in nr.values() if 'wrong_call' in v); du = sum(1 for v in nr.values() if 'data_unbound' in v)
out += ['## Still not equal (honest residue)', '',
 '- **%d of 1035 normalized windows are unmatched** (%d body, %d equal-length): %s.' % (len(tri), cat['body'], cat['equal-len'], unm),
 '- Raw (unnormalized) equality: 168/1035 source-only, 293/1035 with the generated link order. The whole meaningful ELF is **not** byte-identical yet. With the layout layer, %d of the %d matched windows are raw-ready (%d not; `layout-run/rawready.json`; blocker windows by class: %d merged-constant order, %d wrong call target, %d with data refs to unbound objects; every panic Location record of the matched windows equals the original, raw-r2 `locs.py` 369/369). Raw cannot move much further until `.text` size equals the original.' % (nready, nmatched, len(nr), mo, wc, du),
 '- Log parity: %s' % (rt['parity_text'] if rt else 'see the runtime section.')]
(L / 'pkg/L41-extra.md').write_text('\n'.join(out) + '\n')
print(len(out), len(tri), nready, nmatched, len(nr))
