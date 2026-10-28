#!/bin/zsh
# L33 = L32 + the newest fz-run Pump delivery of every lane (3-way merge, merge base = base named in delivery.json)
# + the fz-P-raw-r1 raw-ready layer (srcB = rawready-973.patch, made on L32; no window change by itself).
# Inputs snapshotted in l33/inputs/ (src = delivery crate). fz-P-v3b-r1-01 not taken (its 0x857a8 is in fz-P-hop-r1-02 via fz-P-v3a-r1-02).
set -e
W=/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work; L=$W/lanes/fz-int-pump; I=$L/l33/inputs; B=$W/base; C=$L/itools/compose3.py
python3 -B $C --base $B/L32/pump --out $L/l33/c1 \
 --part mig1=$I/fz-P-mig1-r1-01/src:base=$B/L31/pump \
 --part mig2=$I/fz-P-mig2-r1-02/src:base=$B/L31/pump \
 --part buyv2c=$I/fz-P-buyv2c-r1-03/src:base=$B/L31/pump \
 --part buyv2a=$I/fz-P-buyv2a-r1-01/src:base=$B/L31/pump \
 --part cfee1=$I/fz-P-cfee1-r1-02/src:base=$B/L31/pump \
 --part cfee2=$I/fz-P-cfee2-r1-01/src:base=$B/L31/pump \
 --part hop=$I/fz-P-hop-r1-02/src \
 --part misc=$I/fz-P-misc-r1-04/src \
 --part inc=$I/fz-P-inc-r1-01/src \
 --part legacy=$I/fz-P-legacy-r1-01/src
python3 -B $C --base $B/L32/pump --start $L/l33/c1 --out $L/l33/c2 --part raw=$I/fz-P-raw-r1-973/srcB
cd $L && python3 -B rtools/twopass.py l33/c2 l33/tp33b --baseline $B/L32/inventory.json
# 06:5x: two more WINs arrived (06:35 fz-P-v3b-r1-02 +0x857a8 +0x859b0, 06:38 fz-P-sweep-r1-01 +0x75308)
python3 -B $C --base $B/L32/pump --start $L/l33/c2 --out $L/l33/c3 --part sweep=$I/fz-P-sweep-r1-01/src:base=$B/L31/pump --part v3b=$I/fz-P-v3b-r1-02/src
# trade_v3.rs conflicts (9 hunks) between hop-02 (v3a-02 API: net_quote_for_budget -> (u64,TradeFees)) and v3b-02 (v3_emit_buy(ctx,..,&(fees tuple))):
# take v3b for v3_emit_buy + buy_exact_quote(mut ctx) + its v3_emit_buy call; keep hop/v3a for estimate_post_complete, fit_post_complete, net_quote_for_budget call.
rm -rf $L/l33/c3r; cp -c -R $L/l33/c3 $L/l33/c3r
python3 -B $L/l33/scripts/resolve_v3b.py $L/l33/c3.conflicts/v3b/src/trade_v3.rs $L/l33/c3r/src/trade_v3.rs ttoootoot
cd $L && python3 -B rtools/twopass.py l33/c3r l33/tp33c --baseline $B/L32/inventory.json   # 1010/168, layout 1010/293, 0 losses
