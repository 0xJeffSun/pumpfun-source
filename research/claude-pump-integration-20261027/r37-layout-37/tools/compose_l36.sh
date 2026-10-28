#!/bin/zsh
# L36 = L35 (l35/c1) + fz-P-mig12-r3-01 (+0x3fb70 migrate v1, base L33) + fz-P-crv2ab-r3-01 (+0x1ac28 initialize_metadata, base L34 = l34/c1)
#       + fz-P-legacy-r2 BEST-152888-h2 (legacy sell 0x152888 .27 -> .93 + behaviour correction toward the original, net 0 windows; base L33; coordinator relay 08:3x)
set -e
W=/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work; L=$W/lanes/fz-int-pump; I=$L/l36/inputs; B=$W/base; C=$L/itools/compose3.py
python3 -B $C --base $B/L33/pump --start $L/l35/c1 --out $L/l36/c2 --part mig12=$I/fz-P-mig12-r3-01/src --part crv2ab=$I/fz-P-crv2ab-r3-01/src:base=$B/L34/pump || true
# one create_v2.rs conflict (line 100-101: raw-r2 usize literals vs crv2ab's initialize_metadata(&ctx,..) call) -> line-neutral pick
python3 -B $L/l36/scripts/resolve_crv2ab.py $L/l36/c2.conflicts/crv2ab/src/create_v2.rs $L/l36/c2/src/create_v2.rs
python3 -B $C --base $B/L33/pump --start $L/l36/c2 --out $L/l36/c3 --part legacy=$I/fz-P-legacy-r2-h2/src
cd $L && python3 -B rtools/twopass.py l36/c3 l36/tp36c --baseline $L/l35/tp35a/p1/score.json   # 1015/168, layout 1015/293, raw-ready 997, 0 losses, unstripped 93ed159a
# 08:4x: + fz-P-cfee2-r2-01 (+0x34558 distribute_fee_to_holders, base L33; WIN 08:36) -> c4 (clean merge, line-neutral)
python3 -B $C --base $B/L33/pump --start $L/l36/c3 --out $L/l36/c4 --part cfee2=$I/fz-P-cfee2-r2-01/src
cd $L && python3 -B rtools/twopass.py l36/c4 l36/tp36d --baseline $L/l35/tp35a/p1/score.json   # 1016/168, layout 1016/293, raw-ready 997, 0 losses, unstripped a05ceaca
