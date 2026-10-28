import json
from pathlib import Path
L = Path('/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/fz-int-pump')
old = (L / 'pkg/L32-extra.md').read_text().splitlines()
lanes = json.loads((L / 'pkg/L33-lanes.json').read_text())
tri = json.loads((L / 'l33/triage-c3r.json').read_text())
rr = json.loads((L / 'pkg/L33-layout/rawready.json').read_text()) if False else None
unm = ' '.join('`%s`' % t['start'] for t in tri)
lineage = old[0:old.index('Each delivery was three-way merged (`git merge-file`) against the base named in its `delivery.json`, or against the same lane\'s previously composed delivery when it was cumulative, then built and scored; every step had 0 normalized and 0 raw losses and no SBF stack-offset warnings. L32 gains 83 windows over L12 and loses none; against L31 (#449) it gains and loses no normalized or raw window (990/166 source-only, 990/204 with the layout layer, same window sets). `tools/` holds the merge tool, the round-5 conflict resolutions (L13), the Round46 port (L14) and the per-step commands (`compose_l18_plus.sh`).')]
lineage = [l.replace('- **L32 (990) = L31', '- L32 (990) = `r37-layout-32` (#465) = L31') for l in lineage]
out = lineage + [
 '- **L33 (1010) = L32 + the newest delivery of every fz final-run Pump window lane** (20 windows) **+ the fz-P-raw-r1 raw-ready layer** (no window change by itself): fz-P-mig1-r1-01, fz-P-mig2-r1-02, fz-P-buyv2a-r1-01, fz-P-buyv2c-r1-03, fz-P-cfee1-r1-02, fz-P-cfee2-r1-01, fz-P-hop-r1-02 (a composite on fz-P-v3a-r1-02), fz-P-v3b-r1-02, fz-P-misc-r1-04, fz-P-inc-r1-01, fz-P-legacy-r1-01, fz-P-sweep-r1-01, fz-P-raw-r1 `rawready-973.patch`. Commands: `tools/compose_l33.sh`; per-delivery `patch.diff` + `delivery.json` + README in `tools/l33-inputs/`. Superseded and not taken: fz-P-v3b-r1-01, fz-P-v3a-r1-01/-02 (inside fz-P-hop-r1-02), fz-P-hop-r1-01, fz-P-buyv2c-r1-01/-02, fz-P-cfee1-r1-01, fz-P-mig2-r1-01, fz-P-misc-r1-01/-02/-03 (all cumulative into the taken deliveries).',
 '- The only merge conflict was `trade_v3.rs` between fz-P-hop-r1-02 (carries fz-P-v3a-r1-02: `net_quote_for_budget` returns `(u64, TradeFees)`, `estimate_post_complete` = 0x83088, `fit_post_complete` = 0x837a8) and fz-P-v3b-r1-02 (`v3_emit_buy(ctx: &mut Context<SellV3>, .., fees: &(u64,u64,u64,u64), ..)` = 0x859b0). Resolution (`tools/resolve_v3b.py`, hunk picks `ttoootoot`): v3b\'s `v3_emit_buy`, `buy_exact_quote(mut ctx, ..)` and its `v3_emit_buy` call; v3a\'s `estimate_post_complete`, `fit_post_complete` and `net_quote_for_budget` destructuring. The file keeps 1295 lines (line-neutral), and all 20 windows survive (none dropped).',
 '',
 'Each delivery was three-way merged (`git merge-file`) against the base named in its `delivery.json` (L31 or L32; L32 differs from L31 only in `sweep_fees.rs` and `claim_token_incentives.rs`). L33 has 0 normalized and 0 raw losses against L32 and against L12, no SBF stack-offset warnings, and gains 103 windows over L12. Against L32 (#465): **+20 normalized** (`0x14910` `0x173d8` `0x298b0` `0x2bf18` `0x2fa60` `0x3e550` `0x49888` `0x52660` `0x57e40` `0x75308` `0x7c720` `0x83088` `0x837a8` `0x857a8` `0x859b0` `0x9b148` `0x9b430` `0xcd3d8` `0x14c038` `0x17c850`) and **+2 raw source-only** (`0xd240`, `0x17c850`; 166 -> 168). With the layout layer: 204 -> 293 raw. `tools/` also holds the earlier steps (merge tool, round-5 resolutions, Round46 port, `compose_l18_plus.sh`, `compose_l32.sh`).',
 '']
b = old.index('## Builds in this packet: source-only and with the generated link order')
c = old.index('## Contributions (gains over L12)')
builds = '\n'.join(old[b:c]).replace('| **990** | **166** |', '| **1010** | **168** |').replace('| 990 | **204** |', '| 1010 | **293** |').replace('It adds 38 raw-equal windows', 'It adds 125 raw-equal windows')
out += builds.splitlines()
out += ['## Contributions (gains over L12)', '', '| delivery | windows | synthetic layout | change |', '|---|---|---|---|']
for l in lanes:
    w = ' '.join('`%s`' % x for x in l['windows']) or '(none)'
    s = l['summary'].replace('|', '/').replace('\n', ' ')
    if len(s) > 400: s = s[:400] + ' ...'
    out.append('| %s | %s | %s | %s |' % (l['delivery'].split('/')[-1] if l['delivery'].startswith('claude-pump-work') else l['lane'], w, l['synthetic_layout'], s))
p = old.index('## L32 log-parity corrections: runtime evidence')
out += [''] + [x for x in old[c + 4 + 33 - 4:p] if False]  # (table rows regenerated above)
s = old.index('All changes keep the original\'s observable behaviour except where noted toward the original: `SetMayhemVirtualParams.token_program` is `Program<Token2022>` (the original\'s try_accounts calls `Program::try_accounts`; r5-z08-03), and `InterfaceAccount<TokenAccount>::reload` + `sync_virtual_quote_reserves` after the curve token transfer for the whitelist PDA (r5-libinst / r5-z09). migrate_v2 creates the pool through the generated `pump_amm::cpi::create_pool` client (identical account metas and Borsh data to the hand-built instruction it replaced).')
out += [old[s], '',
 'L33 behaviour notes (changes toward the original, reported by the delivering lanes, each in a byte-matched window): fz-P-mig2-r1-02 `migrate_v2::execute` sizes the boost-funding quote account as 165 for SPL Token, else `required_quote_account_len(mint)` or `UnsupportedQuoteMint` (original site migrate_v2.rs:747; L32 returned `InvalidAccountData`), tests "quote account created" as owned-by-system-program before creation, and decides harvesting with `get_transfer_fee(quote_mint).is_some()`; fz-P-v3b-r1-02 fills the v3 buy `TradeEvent` volume fields from `user_volume_accumulator` like the original (L32 emitted zeros) and emits `CompleteEvent` mint-first; fz-P-hop-r1-02 routes the multi-hop crossing branch through the original `complete_fill` helper (0x57e40) using `estimate_post_complete`; fz-P-raw-r1 moves `set_creator.rs` to `creator/set_creator.rs` + `creator/set_metaplex_creator.rs` (file split, as the original\'s panic paths show). All other deliveries state identical checks, error codes, events and CPI order.',
 '',
 '## L33 runtime evidence',
 '',
 'The 44-suite captured-upgradeable-loader corpus (`full.json.gz`, `scripts/pump_validate_parallel.py --captured-loader`) passes on this exact candidate: **10,468 paired cases, 0 structured mismatches** (10,464 diagnostic-log cases). `runtime-review/` holds:',
 '',
 '- `L33-RUNTIME-REVIEW.json` (ordered-log oracle of `work/parallel-main-r41-log-oracle`, compute lines excluded, source line/column normalized, filenames kept; script `audit_saved_runtime.py`): `state_equal_with_unresolved_log_differences`, 0 state differences, 18,284 signed-transaction occurrences re-verified. `L32-RUNTIME-REVIEW.json` is the same review of #465 for comparison.',
 '- `retained_vs_fresh.json` / `changed_logs.json` / `neither.txt` (scripts alongside): candidate log sequences of the retained L32 corpus vs this fresh run (compute lines excluded, source coordinates verbatim): 10,168 unchanged, 300 changed, and **every one of the 300 changes is a Source coordinate (file:line[:col]) of the same error or panic message**; 274 of them now equal the original\'s log sequence exactly, the other 26 (`incentive_schedule` panics in `volume_accumulator.rs`) still differ from the original in the coordinate only.',
 '',
 '| ordered main-log family | L32 (#465) | L33 |',
 '|---|---:|---:|',
 '| missing frozen creator-quote notice | 9 | 9 |',
 '| message-order differences | 6 | 6 |',
 '| missing non-system creator notice | 5 | 5 |',
 '| missing canonical-pool notice | 3 | 3 |',
 '| **all non-filename differences** | **23** | **23** |',
 '| filename-only differences | 52 | **27** |',
 '',
]
q = old.index('## SYNTHETIC LINE POSITIONING (read this first)')
r = old.index('## Still not equal (honest residue)')
syn = '\n'.join(old[q:r]).rstrip() + ' L33 deliveries marked "yes" keep that convention; files that grew to reach original Source lines: `migrate_v2.rs` 413 -> 753 lines (fz-P-mig2-r1-02: helpers appended after the end-of-file pad so their sites sit at 658/747), `creator/distribute_creator_fee_v2.rs` 350 -> 381 (fz-P-cfee2-r1-01), and the fz-P-raw-r1 raw-ready layer (pad blocks in `migrate.rs`, `extend_account.rs`, `distribute_creator_fees.rs`, `admin_set_idl_authority.rs`; event structs and `Location`-line helpers placed on original lines; `set_creator.rs` split into `creator/set_creator.rs` and `creator/set_metaplex_creator.rs`). Growing a file only moves lines after the edited item within that file, and every Source site is measured by the scorer.'
out += syn.splitlines() + ['']
out += ['## Still not equal (honest residue)', '',
 '- **25 of 1035 normalized windows are unmatched** (21 body, 4 equal-length): ' + unm + '.',
 '- Raw (unnormalized) equality: 168/1035 source-only, 293/1035 with the generated link order. The whole meaningful ELF is **not** byte-identical yet. With the layout layer, 987 of the 1010 matched windows are raw-ready (23 not: 14 merged-constant order, 3 wrong call target, 1 wrong data, 7 data refs to still-unmatched objects with overlap in the counts as classified by `layout-run/rawready.json`; raw cannot move further until `.text` size equals the original).',
 '- Log parity: 23 non-filename ordered main-log differences (missing notices and message order) and 27 filename-only differences remain, unchanged in kind from L32.']
(L / 'pkg/L33-extra.md').write_text('\n'.join(out) + '\n')
print(len(out))
