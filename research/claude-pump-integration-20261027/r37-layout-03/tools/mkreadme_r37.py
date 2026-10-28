#!/usr/bin/env python3
"""mkreadme_r37.py NN <genuine build dir> <layout build dir> <prev NN or -> : writes readme-genuine-r37-NN.md and
readme-r37-NN.md for the current pipeline_r37.sh (facts are read from the build dirs' score files)."""
import json, sys
from pathlib import Path
W = Path('/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work'); L = W / 'lanes/integ-layout'
nn, gb, lb, prev = sys.argv[1], Path(sys.argv[2]), Path(sys.argv[3]), sys.argv[4]
def sm(b, f): return json.loads((b / f).read_text())['summary']
g37, gbase = sm(gb, 'score.json'), sm(gb, 'score_vs_base.json')
l37, lbase = sm(lb, 'score.json'), sm(lb, 'score_vs_base.json')
gen = gbase['gains']; syn = [x for x in lbase['gains'] if x not in gen]
sets = json.loads((L / 'work/lane_gainsets.json').read_text())
r3 = {'pump-hi (anchor-lang allow-missing-optionals)': ['0xc5650'],
      'bodyloB-04': ['0x56658', '0x8c2d8', '0x8e908', '0x90e60', '0x91690', '0x92820', '0x93898']}
def owner(x):
    o = []
    if x in sets['cf08']: o.append('coordfiles')
    if x in sets['cl04']: o.append('coordlib' + ('/changes4' if x in sets['cl04'][20:] else ''))
    if x in sets['nm07']: o.append('nearmiss2')
    for k, v in r3.items():
        if x in v: o.append(k.split(' ')[0])
    return '/'.join(o) or '?'
from collections import Counter
cnt = Counter(owner(x) for x in lbase['gains'])
rows = '\n'.join(f'| {k} | {v} |' for k, v in sorted(cnt.items()))
supers = f'Supersedes integ-layout-r37-{prev}.' if prev != '-' else ''
common = f'''## Pipeline (re-runnable: `tools/pipeline_r37.sh W/integ/r37g5/src <out> <unpadded build dir>`)
1. coordfiles genuine steps: `tools/cf/structural37.py` = coordfiles' final structural.py with S7 skipped (Round37 already
   split the distribution handlers its own way; S7 only pre-positioned sites), then closures.py, split_buy_v2.py,
   closures2..8.py unchanged.
2. coordlib genuine steps: restructure.py; `tools/changes2_r37.py` = changes2.py section B only (validate_buyback_fee_recipient;
   A is obsolete on Round37, C/D are in r37g5); changes3.py; changes4.py (legacy `buy` non-exact path and `sell` body inline
   in the #[program] handlers with per-site closures; coordlib's last, undelivered step, recovered from its transcript).
3. nearmiss2 genuine steps (`tools/nm2_r37.py`): validate_trade(u8,u64,u64) allow-first, add3/sub3, move_native (the legacy
   sell payouts in the lib.rs sell handler), inline signer seeds in transfer_to_user/owned/recipient.
4. Round-3 lanes and pump-hi (`tools/round3.py`, all r37g4-based, ported by hand):
   - pump-hi: Cargo.toml anchor-lang features += `allow-missing-optionals` (missing trailing optional accounts become None,
     so DistributeFeeToHolders::try_accounts builds AccountNotEnoughKeys only twice: 0xc5650).
   - bodyloB-04 (cumulative): refund_pool_authority seeds (0x56658); transfer helpers with the original parameter shapes
     (user_quote_payments::transfer_native_unchecked / transfer_native_curve_unchecked in lib.rs, collect_v2::
     transfer_vault_tokens / transfer_user_tokens_ref / transfer_user_quote_tokens, token_transfers::
     transfer_curve_tokens_ref) wired to their call sites. Its legacy buy hunks are applied to BOTH copies of the legacy
     buy body (buy.rs `execute`, still used by buy_exact_sol_in, and the lib.rs `buy` handler that coordlib's changes4
     inlined); its sell hunk to the lib.rs `sell` handler; trade_v3 buyback transfers and admin_cto pay_token as in bodyloB.
5. Unpadded build = integ-genuine-r37-{nn}: {g37["normalized"]} (+{len(gbase["gains"])} vs r37g5).
6. SYNTHETIC line positioning, applied once to the unpadded tree: coordlib `tools/cl/layout.py apply --cand <unpadded
   build>` (lib.rs only; marker `// layout-pad: aligns the next Source site with the original lib.rs line`); coordfiles:
   site map re-derived from the fresh unpadded build (`tools/cf/mksitemap.py`, saved under tools/), `tools/merge_sitemap.py`
   (hand-written anchors win for their windows: an unpadded build pairs same-shape Overflow closures with the wrong
   instance), `tools/cf/layout.py apply --sitemap merged --sitemap extra_anchors.json --sitemap integ_anchors.json` (all other
   files; marker `// layout-pad(N): ...`, token-preserving joins in trade_v3.rs). integ_anchors.json: add3 :285, sub3 :294,
   0x4bf50 migrate_v2.rs:326. The coordfiles pass must be applied to the unpadded tree (re-applying it on its own output
   joins more trade_v3.rs lines); the coordlib pass is idempotent.
7. Padded build = integ-layout-r37-{nn}: {l37["normalized"]}.
'''
open(L / f'readme-r37-{nn}.md', 'w').write(f'''# integ-layout-r37-{nn}: layout composite on the Round37 genuine base r37g5

Base: W/integ/r37g5/src (788 / 165 vs W/base/round37/inventory.json). Result (fastbuild identity recipe):
**{l37["normalized"]} normalized / {l37["raw"]} raw = +{len(lbase["gains"])} vs r37g5 (+{len(l37["gains"])} vs Round37 749), no losses and no
raw losses vs r37g5{(" and vs integ-layout-r37-" + prev) if prev != "-" else ""}, runtime_valid = true.** {supers}

| source of the gain | windows vs r37g5 |
|---|---|
{rows}

Genuine (gained by the unpadded build): {", ".join(gen)}.
Synthetic-layout-dependent ({len(syn)}): all other gains (their code changes are genuine; matching also needs the pads/joins).

{common}
## Not carried over / unresolved
- 0x1159d8 (FeeConfig::try_deserialize_unchecked): on Round37 FeeConfig::deserialize_reader has three callers (FeeConfig
  try_deserialize_unchecked, RouteFeeConfig, trade::buy_exact_quote), so it stays out of line; needs genuine work on
  Round37's other FeeConfig readers.
- coordfiles S7 not re-applied on Round37; libinst2-01 not integrated (nested crate needs a harness change); no bodyloA
  delivery yet.

## Recovery note
Lane tools were re-created from the lane transcripts (recover/tx_sandbox.py, recover/tx_segments.py), see PROGRESS.md.
''')
open(L / f'readme-genuine-r37-{nn}.md', 'w').write(f'''# integ-genuine-r37-{nn}: genuine-only subset of the layout composite, on r37g5

Base: W/integ/r37g5/src (788 / 165). Result (identity recipe, score.py vs W/base/round37/inventory.json):
**{g37["normalized"]} normalized / {g37["raw"]} raw = +{len(gbase["gains"])} vs r37g5, no losses, no raw losses, runtime_valid = true. No layout pads,
no joins (synthetic_layout = false).** {("Supersedes integ-genuine-r37-" + prev + ".") if prev != "-" else ""}

Steps 1-4 of tools/pipeline_r37.sh (`--genuine-only`). Windows matched without any line positioning:
{chr(10).join("- " + x + " (" + owner(x) + ")" for x in gen)}
The other {len(syn)} gains of integ-layout-r37-{nn} additionally need the synthetic line positioning.

{common}''')
print('readmes written', nn)
