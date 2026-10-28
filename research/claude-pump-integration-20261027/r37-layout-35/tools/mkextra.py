import json
from collections import Counter
from pathlib import Path
L = Path('/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/fz-int-pump')
old = (L / 'pkg/L33-extra.md').read_text().splitlines()
lanes = json.loads((L / 'pkg/L35-lanes.json').read_text())
tri = json.loads((L / 'l35/triage-c1.json').read_text())
rr = json.loads((L / 'pkg/L35-layout/rawready.json').read_text())
rt = json.loads((L / 'l35/runtime.json').read_text()) if (L / 'l35/runtime.json').exists() else None
unm = ' '.join('`%s`' % t['start'] for t in tri)
cat = Counter(t['category'] for t in tri)
nready = len(rr['ready']); nmatched = len(rr['per'])
i10 = next(i for i, l in enumerate(old) if l.startswith('- **L33 (1010) = L32'))
old[i10] = old[i10].replace('- **L33 (1010) = L32', '- L33 (1010) = `r37-layout-33` (#490) = L32').replace('**+ the fz-P-raw-r1', '+ the fz-P-raw-r1').replace('lane** (20 windows)', 'lane (20 windows)').replace('layer** (no', 'layer (no')
i13 = next(i for i, l in enumerate(old) if l.startswith('Each delivery was three-way merged'))
out = old[:i13]
out += [
 '- **L35 (1013) = L33 + fz-P-crv2a-r2-01 + fz-P-crv2c-r2-01 + fz-P-inc-r2-01 + the merged creator log-parity patch (#492) + the fz-P-raw-r2 raw-ready layer** (no window change by itself). Windows: `0x18678` `nested_create::walk` (fz-P-crv2a-r2-01, `create_v2.rs:386-433`, made on L32), `0x138b20` v1 `create` (fz-P-crv2c-r2-01, `lib.rs`, made on L32) and `0x7bfd8` `volume_accumulator::update` (fz-P-inc-r2-01, `token_incentives/volume_accumulator.rs`, made on L33). Log parity: `research/pump-l32-creator-log-parity-20261028/source.patch` (#492; 3 `admin_cto` notices on existing lines, file stays 700 lines). Raw-ready: fz-P-raw-r2 `rawready-994.patch` (made on L33) plus the integration note it names (`create_v2.rs:62` `require_gte!(remaining.len(),3usize,..)` on crv2a\'s caller line, same windows, one fewer candidate-only `with_values` instantiation). Commands: `tools/compose_l34.sh` then `tools/compose_l35.sh`; per-input `patch.diff`/`source.patch` + README in `tools/l34-inputs/` and `tools/l35-inputs/`. The intermediate L34 (1011 = L33 + fz-P-crv2a-r2-01, `W/base/L34`) was staged as a lane base only and has no packet of its own.',
 '- Merges: crv2a, #492, raw-r2 and inc-r2 applied as clean three-way merges (inc-r2 against L33: its hunks sit in `volume_accumulator.rs` lines 22-115, line-neutral, plus 16 helper lines appended at the end of the file). crv2c left one `lib.rs` conflict at the file tail (L33 had replaced L32\'s `TradeEvent` struct with blank lines; crv2c appended 28 helper lines after it): `tools/resolve_crv2c.py` keeps L33\'s tail and appends the 28 helper lines, and places crv2c\'s 7 `// layout-pad` lines directly after `create` (git had put them after the legacy-buy prologue, which L33 matches as `0x14c038`), so every line after `create` keeps its L33 position. Nothing was dropped.',
 '',
 'L35 has 0 normalized and 0 raw losses against L33 (and against L12), no SBF stack-offset warnings, and gains 106 windows over L12. Against L33 (#490): **+3 normalized** (`0x18678`, `0x138b20`, `0x7bfd8`), raw unchanged (168 source-only, 293 with the layout layer); raw-ready with the layout layer 987/1010 -> %d/%d. The repository builder reproduces the lane identity build (unstripped `1e6188af`). The L33 merge notes above still describe how L33 was made; `tools/` holds every step (`compose_l32.sh`, `compose_l33.sh`, `resolve_v3b.py`, `compose_l34.sh`, `resolve_crv2c.py`, `compose_l35.sh`, and earlier).' % (nready, nmatched),
 '']
b = old.index('## Builds in this packet: source-only and with the generated link order')
c = old.index('## Contributions (gains over L12)')
out += '\n'.join(old[b:c]).replace('| **1010** | **168** |', '| **1013** | **168** |').replace('| 1010 | **293** |', '| 1013 | **293** |').splitlines()
out += ['## Contributions (gains over L12)', '', '| delivery | windows | synthetic layout | change |', '|---|---|---|---|']
for l in lanes:
    w = ' '.join('`%s`' % x for x in l['windows']) or '(none)'
    s = l['summary'].replace('|', '/').replace('\n', ' ')
    if len(s) > 400: s = s[:400] + ' ...'
    name = l['delivery'].split('/')[-1] if l['delivery'].startswith('claude-pump-work/deliveries') else (l['delivery'].split('/')[-1].split(' ')[0] if l['delivery'].startswith('claude-pump-work/lanes') else l['lane'])
    out.append('| %s | %s | %s | %s |' % (name, w, l['synthetic_layout'], s))
s = next(i for i, l in enumerate(old) if l.startswith('All changes keep the original'))
bn = next(i for i, l in enumerate(old) if l.startswith('L33 behaviour notes'))
out += ['', old[s], '', old[bn], '',
 'L35 behaviour notes (each toward the original): fz-P-crv2a-r2-01 changes no error, check, event or CPI; the Source coordinate of the `UnsupportedQuoteMint` error for an empty quote-route tail in `nested_create::walk` moves from `create_v2.rs:361` to the original\'s `create_v2.rs:390`. fz-P-crv2c-r2-01 makes v1 `create` byte-identical (normalized) to the deployed handler: the metadata CPI now passes `is_mutable=false, update_authority_is_signer=true` as the original does (L33 passed `false,false`; the mint-authority PDA signs the CPI either way) and the `CreateEvent` comes from a local builder; CPI order (metadata, mint_to, set_authority), signer seeds and the event fields are the original\'s. #492 adds the three `admin_cto` notices the original logs. fz-P-raw-r2 moves Source coordinates only (raw-ready placement). fz-P-inc-r2-01 re-derives `volume_accumulator::update` on the original\'s helper decomposition (the matched AMM updater form): same checks, the same panics in the same order, the same `Truncation` error on line 103, the same stores; callers unchanged.',
 '']
out += ['## L35 runtime evidence', '']
if rt is None:
    out += ['The 44-suite captured-loader corpus has not been run for this exact package yet.', '']
else:
    out += [
 'The 44-suite captured-upgradeable-loader corpus (`full.json.gz`, `scripts/pump_validate_parallel.py --captured-loader`) passes on this exact candidate: **%s paired cases, 0 structured mismatches** (%s diagnostic-log cases). `runtime-review/` holds:' % (format(rt['cases'], ','), format(rt['log_cases'], ',')),
 '',
 '- `L35-RUNTIME-REVIEW.json` (ordered-log oracle of `work/parallel-main-r41-log-oracle`, compute lines excluded, source line/column normalized, filenames kept; script `audit_saved_runtime.py`): `%s`, %d state differences, %s signed-transaction occurrences re-verified. `L33-RUNTIME-REVIEW.json` is the same review of #490 for comparison.' % (rt['verdict'], rt['state_differences'], format(rt['signed'], ',')),
 '- `retained_vs_fresh.json` / `changed_logs.json` / `neither.txt` (scripts alongside): candidate log sequences of the L33 (#490) corpus vs this fresh run (compute lines excluded, source coordinates verbatim): %s' % rt['changes_text'],
 '',
 '| ordered main-log family | L33 (#490) | L35 |',
 '|---|---:|---:|']
    for fam, a, b2 in rt['families']:
        out.append('| %s | %s | %s |' % (fam, a, b2))
    out.append('')
q = old.index('## SYNTHETIC LINE POSITIONING (read this first)')
r = old.index('## Still not equal (honest residue)')
syn = '\n'.join(old[q:r]).rstrip() + ' L35: fz-P-crv2a-r2-01, fz-P-crv2c-r2-01 and fz-P-inc-r2-01 are synthetic-layout "yes" (line-neutral; crv2a\'s pads keep the walk\'s `require!` sites on the original lines 390 and 412-433; crv2c\'s create body is 7 lines shorter, compensated by 7 `// layout-pad` lines right after it, and its helpers are appended at the end of `lib.rs`; inc-r2 re-lays `volume_accumulator.rs` lines 22-115 with `// layout-pad` blocks so its one Source site (`Truncation`, line 103) stays on the original line, and appends two helpers at the end of the file). fz-P-raw-r2 is synthetic-layout "yes" (raw-ready placement of Source coordinates: `volume_accumulator.rs` 470 -> 451 lines, `migrate_v2.rs` 753 -> 822 lines with `burn_lp_tokens` moved to the file end, `distribute_creator_fee_v2.rs` pad re-laid).'
out += syn.splitlines() + ['']
not_ready = nmatched - nready
cls = Counter(c for v in rr['per'].values() for c in v if c != 'ok')
out += ['## Still not equal (honest residue)', '',
 '- **%d of 1035 normalized windows are unmatched** (%d body, %d equal-length): %s.' % (len(tri), cat['body'], cat['equal-len'], unm),
 '- Raw (unnormalized) equality: 168/1035 source-only, 293/1035 with the generated link order. The whole meaningful ELF is **not** byte-identical yet. With the layout layer, %d of the %d matched windows are raw-ready (%d not; `layout-run/rawready.json`; blocker windows by class: %d merged-constant order, %d wrong call target, %d with data refs to unbound objects: panic Location records not yet on the original line:column, `0x18678` walk (original `create_v2.rs` 385:29, 426:64, 488:19) and `0x7bfd8` update helpers (original `volume_accumulator.rs` 53:14, 78:17, 108:14, 429:43, 431:14); every Location record of the other matched windows equals the original (raw-r2 `locs.py`: 351 equal, 8 differing, all in these two windows)). Raw cannot move much further until `.text` size equals the original.' % (nready, nmatched, not_ready, sum(1 for k, v in rr['per'].items() if k not in rr['ready'] and 'merge_order' in v), sum(1 for k, v in rr['per'].items() if k not in rr['ready'] and 'wrong_call' in v), sum(1 for k, v in rr['per'].items() if k not in rr['ready'] and 'data_unbound' in v)),
 '- Log parity: %s' % (rt['parity_text'] if rt else 'see the runtime section.')]
(L / 'pkg/L35-extra.md').write_text('\n'.join(out) + '\n')
print(len(out), sum(cat.values()), nready, nmatched, dict(cls))
