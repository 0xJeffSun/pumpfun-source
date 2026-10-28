#!/bin/zsh
# L37 = L36 (l36/c4) + merged contributor PR #496 (research/pump-l32-admin-cto-log-order-20261028/source.patch; made on L32 + #492)
#       + fz-P-hop-r2-01 (+0x567d8 multi_hop_curve::execute, base L33; multi_hop_curve_swap.rs only)
set -e
W=/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work; L=$W/lanes/fz-int-pump; I=$L/l37/inputs; B=$W/base; C=$L/itools/compose3.py
# pr496/src = l34/inputs/pr492/src (L32 + #492) + #496 source.patch (patch -p3)
[ -d $I/pr496/src ] || { cp -c -R $L/l34/inputs/pr492/src $I/pr496/src; (cd $I/pr496/src && patch -p3 -s < ../source.patch); }
python3 -B $C --base $L/l34/inputs/pr492/src --start $L/l36/c4 --out $L/l37/c1 --part pr496=$I/pr496/src
cd $L && python3 -B rtools/twopass.py l37/c1 l37/tp37a --baseline $L/l36/tp36d/p1/score.json   # 1016/168, layout 1016/293, raw-ready 997, 0 gains/losses, unstripped 792746c2
[ -d $I/fz-P-hop-r2-01 ] || cp -c -R $W/deliveries/fz-P-hop-r2-01 $I/
python3 -B $C --base $B/L33/pump --start $L/l37/c1 --out $L/l37/c2 --part hopr2=$I/fz-P-hop-r2-01/src
cd $L && python3 -B rtools/twopass.py l37/c2 l37/tp37b --baseline $L/l36/tp36d/p1/score.json   # 1017/168, layout 1017/293, raw-ready 997, +0x567d8, 0 losses, unstripped cf5f84d8
