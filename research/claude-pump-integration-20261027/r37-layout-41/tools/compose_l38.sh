#!/bin/zsh
# L38 = L37 (l37/c2) + fz-P-srf-r3-01 (+0x6fef8 set_reserved_fee_recipients, base L36; lib.rs + set_reserved_fee_recipients.rs; clean merge)
set -e
W=/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work; L=$W/lanes/fz-int-pump; I=$L/l38/inputs; B=$W/base; C=$L/itools/compose3.py
[ -d $I/fz-P-srf-r3-01 ] || cp -c -R $W/deliveries/fz-P-srf-r3-01 $I/
python3 -B $C --base $B/L36/pump --start $L/l37/c2 --out $L/l38/c1 --part srf=$I/fz-P-srf-r3-01/src
cd $L && python3 -B rtools/twopass.py l38/c1 l38/tp38a --baseline $L/l37/tp37b/p1/score.json   # 1018/168, layout 1018/293, raw-ready 997, +0x6fef8, 0 losses, unstripped 6cf9da7f
