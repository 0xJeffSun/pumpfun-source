# mg-P-lib PROGRESS  (all 5 easy windows DELIVERED + INTEGRATED; 4 hard windows remain)

Lane src = W/lanes/mg-P-lib/src = mg-P-lib-04 tree (967 on L13). Current coordinator base at last check: L19 (977/1035).
My 5 wins are all composed into the bases: 0x806c8 0x60ee0 0x93050 0x940c0 (L15), 0x63cf0 (L16). Nothing of mine is still pending.

## Deliveries (all 0 losses, 0 raw losses, runtime_valid, no stack warnings)
- mg-P-lib-01 (r5-libinst-06 base, 917): +0x806c8 trade_v3 net_quote_for_budget (require_gt! 317/326).
- mg-P-lib-02 (composite on 01, 932): +0x60ee0 root_seed, +0x93050/+0x940c0 multi-hop payout wrappers (+ r5-z05-04 & z08 ports).
- mg-P-lib-03 (L13 port, 966): the 4 own windows on L13.
- mg-P-lib-04 (L13, 967): +0x63cf0 parse_pool.
Mechanisms (see shared INSIGHTS-R5 [mg-P-lib] lines): root_seed = by-value Pubkey helper; payout wrappers = amount==0 +
transfer_checked with token_program_for programs; parse_pool = `try_into().map_err(|_|error!())?` (SROA splits Result<[u8;16],Error>
into 7/8/1 byte loads) + get(..211).ok_or_else + starts_with(disc) + read_pubkey calls inside the struct literal.

## Remaining 4 windows (all unmatched in L19; the LLVM block-placement / inline-threshold class)
- 0x80df8 v3_buy_costs: BEST 0.66 (partials/0x80df8-c80-0.66). Structure correct; SOLE blocker = the gross.checked_sub(net)
  ok_or_else(||error!(Overflow)) closure is INLINED (Cost 260 / Threshold 325) but the original keeps it OUTLINED (0x81640) =>
  need its callsite BFI-cold (<2%). X1/X4/X5/X7 source forms did not change the inline decision. NEXT: find a v3-buy restructure
  where the gross-up (and thus the subtract error edge) sits on a <2% branch; or confirm via z10 irbuild -print-bfi which block holds it.
- 0x17c850 TLV parser (pump-token-ext): 0.55 (partials/0x17c850-tlv-0.5466.rs, tlvh.rs h3 variant 0.4512 with helper). 486 syntactic
  combos (probe/tlvx.rs) + 6 helper forms all give the same code; only block ORDER differs (orig `jcc +1; ja err` pairs). Probe-faithful.
- 0x9b148 / 0x9b430 BondingCurve size dispatch: 0.56 (partials/0x9b430-bc2-0.5638.rs, un_f1/f2/f5/f7/f8 all 0.5638). Same jcc+1;ja
  block-order residual; 8 dispatch forms (if-chain/else-if/match/range/reverse) identical. Not solved.

## Tooling (reusable; see INSIGHTS-R5)
probe/{run.sh,cmp.py,pdis.sh,irs.py,tlvgen.py} = standalone rustc probe loop, no build slot, faithful to the identity build.
llc on the full crate post-opt IR = byte-exact to nbuild (good for IR edits, but cannot test inline decisions).
tools/{nb.sh (L13+ nbuild+score), rb.sh (inline remarks), irnb.py (z10 irbuild+nested crate), dis.py, near.py, cg.py, deliver.py}.
