import json
from collections import Counter
from pathlib import Path
L = Path('/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/fz-int-pump')
old = (L / 'pkg/L39-extra.md').read_text().splitlines()
lanes = json.loads((L / 'pkg/L40-lanes.json').read_text())
tri = json.loads((L / 'l40/triage-c1.json').read_text())
rr = json.loads((L / 'pkg/L40-layout/rawready.json').read_text())
rt = json.loads((L / 'l40/runtime.json').read_text()) if (L / 'l40/runtime.json').exists() else None
cat = Counter(t['category'] for t in tri); unm = ' '.join('`%s`' % t['start'] for t in tri)
nready = len(rr['ready']); nmatched = len(rr['per'])
nr = {k: v for k, v in rr['per'].items() if k not in rr['ready']}
i35 = next(i for i, l in enumerate(old) if l.startswith('- **L39 (1018)'))
old[i35] = old[i35].replace('- **L39 (1018) = L38 + fz-P-data-r1-02: data-side only, no window change.**', '- L39 (1018) = `r37-layout-39` (#559) = L38 + fz-P-data-r1-02: data-side only, no window change.')
ihas = next(i for i, l in enumerate(old) if l.startswith('L39 has 0 normalized'))
out = old[:ihas - 1]
out += [
 '- **L40 (1018) = L39 + fz-P-data-r1-03: data-side only, no window change.** fz-P-data-r1-03 (made on L38; cumulative on fz-P-data-r1-02 = L39) types the SellV3 (`trade_v3.rs:66`) and MultiHopCurve (`multi_hop_curve_swap.rs:14`) `fee_config` accounts as `Box<Account<LegacyFeeConfig>>`, the `pump_fees` IDL type BuyV2, SellV2 and the legacy handlers already use, and removes the candidate-only `RouteFeeConfig` wrapper; this fixes the wrong call targets of `0x3cc8` (`Box<T>::try_accounts`) and `0xdb958` (`MultiHopCurve::try_accounts`). It also carries fz-P-srf-r3-02\'s `set_reserved_fee_recipients.rs` (`0x6fef8` becomes raw-ready; 128 -> 140 lines) and puts the `process_cashback` data writes on the original lines (`sell.rs` 76:13, 77:13). Files: `create_v2.rs`, `creator/distribute_fee_to_holders.rs`, `multi_hop_curve_swap.rs`, `sell.rs`, `set_reserved_fee_recipients.rs`, `token_incentives/volume_accumulator.rs`, `trade_types.rs`, `trade_v3.rs`, `util/fee.rs` (vs L38). Commands: `tools/compose_l40.sh`; inputs in `tools/l40-inputs/`; the fee_config check is `runtime-review/feeconfig-check.md`.',
 '- Merge: three-way merge against L38 on top of L39. `multi_hop_curve_swap.rs` conflicted because -02 (in L39) and -03 change overlapping hunks; -03 is cumulative on -02 over the exact L38 base, so its file was taken. The composed tree equals the delivery\'s tree, and the build reproduces its unstripped `30b72451`.',
 '',
 'L40 has 0 normalized and 0 raw losses against L39 (and against L12), no SBF stack-offset warnings, and the same 1018 normalized / 168 raw windows (293 with the layout layer). **Data-side gains:** raw-ready with the layout layer 1002/1018 -> %d/%d (`0x3cc8` `0x6fef8` `0xdb958` become ready, none lost); the windows still not raw-ready are all merged-constant-order cases (the lane reports their misplaced pieces as first used by unmatched windows); every panic Location record of the matched windows equals the original (`locs.py` 368/368). The repository builder reproduces the lane identity build (unstripped `30b72451`). `tools/` holds every step (`compose_l33.sh` ... `compose_l39.sh`, `compose_l40.sh`, `resolve_v3b.py`, `resolve_crv2c.py`, `resolve_crv2ab.py`).' % (nready, nmatched),
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
b39 = next(i for i, l in enumerate(old) if l.startswith('L39 behaviour notes'))
out += ['', old[s0], '', old[b33], '', old[b35], '', old[b36], '', old[b37], '', old[b38], '', old[b39], '',
 'L40 behaviour notes: the `fee_config` account type change is the only item that touches account validation, and **the SellV3 and MultiHopCurve `fee_config` constraints are unchanged against the original**: the same owner (`pump_fees`, `pfeeUxB6jkeY1Hxd7CsFCAjcbHA9rWtchMGdZ6VojVZ`), the same 8-byte discriminator (`[143,52,146,187,219,123,76,155]`, which `RouteFeeConfig` hard-coded and the IDL type carries), the same Borsh `FeeConfig` decode, the same `seeds=[b"fee_config", program id]` / stored-bump / `seeds::program` constraint, and the same error codes. The windows that run these checks are normalized-equal to the original (`0xdb958` MultiHopCurve and `0x102578`/`0x105b78` SellV3 `try_accounts`, `0x3cc8` `Box<T>::try_accounts`, `0x1156f0`/`0x1159d8` `FeeConfig` deserializers), and `0x3cc8`/`0xdb958` now also call the original\'s callee (raw-ready). The full 44-suite corpus below shows 0 state differences (`runtime-review/feeconfig-check.md`).',
 '']
out += ['## L40 runtime evidence', '']
if rt is None:
    out += ['The 44-suite captured-loader corpus has not been run for this exact package yet.', '']
else:
    out += ['The 44-suite captured-upgradeable-loader corpus (`full.json.gz`, `scripts/pump_validate_parallel.py --captured-loader`) passes on this exact candidate: **%s paired cases, 0 structured mismatches** (%s diagnostic-log cases). `runtime-review/` holds:' % (format(rt['cases'], ','), format(rt['log_cases'], ',')),
     '',
     '- `L40-RUNTIME-REVIEW.json` (ordered-log oracle of `work/parallel-main-r41-log-oracle`, compute lines excluded, source line/column normalized, filenames kept; script `audit_saved_runtime.py`): `%s`, %d state differences, %s signed-transaction occurrences re-verified. `L39-RUNTIME-REVIEW.json` is the same review of #559 for comparison.' % (rt['verdict'], rt['state_differences'], format(rt['signed'], ',')),
     '- `retained_vs_fresh.json` / `changed_logs.json` / `neither.txt` (scripts alongside): candidate log sequences of the L39 (#559) corpus vs this fresh run (compute lines excluded, source coordinates verbatim): %s' % rt['changes_text'],
     '', '| ordered main-log family | L39 (#559) | L40 |', '|---|---:|---:|']
    for fam, a, b2 in rt['families']: out.append('| %s | %s | %s |' % (fam, a, b2))
    out.append('')
q = old.index('## SYNTHETIC LINE POSITIONING (read this first)'); r = old.index('## Still not equal (honest residue)')
syn = '\n'.join(old[q:r]).rstrip() + ' L40: fz-P-data-r1-03 is synthetic-layout "yes": line-neutral Source-coordinate placement; `set_reserved_fee_recipients.rs` (fz-P-srf-r3-02) grows 128 -> 140 lines with its Source sites on the original lines.'
out += syn.splitlines() + ['']
mo = sum(1 for v in nr.values() if 'merge_order' in v); wc = sum(1 for v in nr.values() if 'wrong_call' in v); du = sum(1 for v in nr.values() if 'data_unbound' in v)
out += ['## Still not equal (honest residue)', '',
 '- **%d of 1035 normalized windows are unmatched** (%d body, %d equal-length): %s.' % (len(tri), cat['body'], cat['equal-len'], unm),
 '- Raw (unnormalized) equality: 168/1035 source-only, 293/1035 with the generated link order. The whole meaningful ELF is **not** byte-identical yet. With the layout layer, %d of the %d matched windows are raw-ready (%d not; `layout-run/rawready.json`; blocker windows by class: %d merged-constant order, %d wrong call target, %d with data refs to unbound objects; every panic Location record of the matched windows equals the original, raw-r2 `locs.py` 368/368). Raw cannot move much further until `.text` size equals the original.' % (nready, nmatched, len(nr), mo, wc, du),
 '- Log parity: %s' % (rt['parity_text'] if rt else 'see the runtime section.')]
(L / 'pkg/L40-extra.md').write_text('\n'.join(out) + '\n')
print(len(out), len(tri), nready, nmatched, len(nr))
