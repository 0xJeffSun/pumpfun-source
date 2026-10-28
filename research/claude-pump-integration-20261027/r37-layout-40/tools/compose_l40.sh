#!/bin/zsh
# L40 = L39 (l39/c1 = L38 + fz-P-data-r1-02) + fz-P-data-r1-03 (data-side, no window change; cumulative on -02, made on L38):
#       SellV3/MultiHopCurve fee_config as Box<Account<LegacyFeeConfig>> (pump_fees IDL type; RouteFeeConfig removed; wrong_call 0x3cc8 0xdb958 fixed),
#       fz-P-srf-r3-02 set_reserved_fee_recipients.rs, process_cashback panic Locations 76:13/77:13.
# compose3 leaves multi_hop_curve_swap.rs conflicting (-02 and -03 hunks overlap); -03 is cumulative on -02 over the exact L38 base, so take -03's file.
set -e
W=/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work; L=$W/lanes/fz-int-pump; I=$L/l40/inputs; B=$W/base; C=$L/itools/compose3.py
[ -d $I/fz-P-data-r1-03 ] || cp -c -R $W/deliveries/fz-P-data-r1-03 $I/
python3 -B $C --base $B/L38/pump --start $L/l39/c1 --out $L/l40/c1 --part data3=$I/fz-P-data-r1-03/src || true
cp $I/fz-P-data-r1-03/src/src/multi_hop_curve_swap.rs $L/l40/c1/src/multi_hop_curve_swap.rs
diff -rq $L/l40/c1/src $I/fz-P-data-r1-03/src/src   # empty: L40 tree == the delivery tree
cd $L && python3 -B rtools/twopass.py l40/c1 l40/tp40a --baseline $L/l39/tp39a/p1/score.json   # 1018/168, layout 1018/293, raw-ready 1005/1018, 0 gains/losses, unstripped 30b72451
