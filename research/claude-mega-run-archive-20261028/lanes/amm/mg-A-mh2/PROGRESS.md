# mg-A-mh2 progress (AMM multi-hop big windows: 0x3dbc0 execute 9536B, 0x40a08 amm_hop 15512B, 0x45940 curve 16912B)
Work dir L=/Users/shawwalters/amm100-run/lanes/mg-A-mh2 ; src/ = union-752 + v1x (mg-A-4 best-v1x: lib.rs line-26 re-export of
multi_hop_swap::execute, trade_v2 validate_multi_hop_pool helper at 117-126, multi_hop_swap.rs enum rewrite).
Build+measure: gen/b.sh TAG (nbuild vs matched-union-752n.json + ratios). Tools in tools/ (copied from mg-A-4, retargeted).
## Status
- 03:0x baseline v1x on u752: 752/785 native, 150 raw, 0 gains, 0 losses. ratios: execute .5704, amm_hop .1176, curve .1769.
- 03:00 IR loop: gen/exp.sh TAG (diag --emit=llvm-ir -> ir/TAG.ll, llc -> ir/TAG.o; llc reproduces nbuild bytes exactly), tools/ocmp.py (.o/.so vs orig ratio),
  tools/slotmap.py (stack-offset-masked ratio + orig->cand slot map), tools/frame_objs.sh LL FN (MIR frame objects w/ names after PEI).
- FINDING execute frame: layout = FI (IR alloca) order top-down; own allocas are in REVERSE MIR-local order, LLVM-inlined callee allocas go first.
  Masked (stack offsets ignored) execute ratio = 0.777 vs 0.570 raw => frame layout is the main gap. Orig alloca region is 0x78 B deeper
  (orig hop_count at -0x290, cand -0x218). Orig keeps next-mint key temps (base/quote key copies + a copy of `mint`) as execute's OWN locals
  deep in the frame (between loop-1 key temp and loop-2 mint), cand has them as LLVM-inlined next_mint allocas at the top. Orig loop-2 `mint`
  has its own 32 B slot right after `flags` (cand merges it into base_mint.i). Orig `buy` memcmp happens after next-mint compares.
- 03:2x loop-1 variants (gen/v1gen.py HELPER-LOOP; best h6-l11 = helper `next_mint(mint: Pubkey, base_mint: Pubkey, quote_mint: Pubkey)`
  at 243-253 + loop `mint = match next_mint(mint, hop[0].key(), hop[1].key()) { Ok(next) => next, Err(e) => return Err(e) };`)
  execute .5704 -> .6034 (masked .8286). Frame still 0x78 short (orig keeps buy-key temp, Result temps, mint copy, base, quote all unmerged).
- 03:4x reg+stack-masked execute ratio = 0.94: structure nearly right; remaining structural diffs = (1) loop-1 Result piece moves,
  (2) orig INLINES exchange_malloc for Box::new(hop) and has NO Ok-path BTreeSet drop (IR test: deleting the Ok-path drop call -> .6207/.8523),
  (3) small tail diffs. Cause of (2): inliner coldness. tools/remarks.py (rustc -C remark=inline), tools/prebfi.py (inline-time BFI via
  -C llvm-args=-print-bfi + -print-before=inline). cand inline-time freqs: try_accounts .0171, exchange_malloc .0155 (<.02 cold),
  from_iter .019 (cold, must stay cold: orig 0xfb08 is out of line), clone .0095. AMM/curve branch is `icmp eq i8 b,0` -> ZH 37.5% AMM.
  Orig pattern (exchange_malloc IN, Ok-drop IN, Err-drop out, from_iter/closure/clone out) reproduced in a DIAGNOSTIC build by
  removing one require (x1.6 freq) except from_iter+closure then inline too => need AMM arm x>=1.3 without warming curve arm.
- 03:5x loop-2 variants (gen/l2gen.py on gen/mh_h6l11.rs): b = `let mut reallocs = BTreeSet::new();` at AMM-arm start -> .6175/.8463 (best,
  saved gen/mh_best_b.rs). a (arms swapped), c (loop/break): no change. e/f (curve run detected by `end` loop + `if end > i`): much worse.
- 03:5x BEST PARTIAL best-l20/ (multi_hop_swap.rs + lib.rs + trade_v2.rs; full nbuild 752/150, 0 losses): execute .5704 -> .6357
  (stack-masked .8625, reg+stack-masked .9685). Changes vs v1x:
  (1) `enum HopKind { Amm, Curve }` (derive Clone,Copy,PartialEq,Eq) and `fn hop_kind(..) -> Result<HopKind>` (was is_curve_hop -> bool;
      0x3d8d0 still matched): loop 2 `match hop_kind(hop)? { HopKind::Curve => .., HopKind::Amm => .. }` and inner
      `while end < hop_count && hop_kind(..)? == HopKind::Curve`. KEY: a 2-variant enum match is a `switch` at inline time (no
      zero-heuristic), so the AMM arm is warm -> exchange_malloc + Ok-path BTreeSet drop get inlined (drop folds away), from_iter/
      clone/L307 closure stay cold = exactly the orig inline pattern (rustc -C remark=inline).
  (2) AMM arm: `let mut reallocs = BTreeSet::new();` at arm start, try_accounts(.., &mut reallocs).
  (3) loop 1: helper `fn next_mint(mint: Pubkey, base_mint: Pubkey, quote_mint: Pubkey) -> Result<Pubkey>` (err line 251 kept),
      body `let quote_mint = hop[1].key(); let next = next_mint(mint, hop[0].key(), hop[1].key())?; let buy = mint == quote_mint;
      match direction {..}; mint = next; output_mints.push(mint);` (buy memcmp now after next-mint compares, like orig).
- NEXT: frame. IR test X4 (strip lifetime markers of loop-2 `mint` (IR %mint2) and `output_mint`) -> hop_count @0x290 = orig, raw .8126.
  In cand quote/base arg temps merge into output_mint/mint2 slots; orig keeps them separate. Need a source form where those two
  locals carry no lifetime markers (MIR CopyProp/GVN storage removal or LLVM stack-move) - not found yet (tried: early uninit decls,
  output_mint by ref / re-read Vec).
