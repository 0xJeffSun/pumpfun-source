#!/bin/zsh
# L35 = L34 (l34/c4) + fz-P-inc-r2-01 (+0x7bfd8 volume_accumulator::update, made on L33; volume_accumulator.rs only).
# compose3 three-way merge against L33 (the delivery's base): clean (hunks in lines 22-115, line-neutral; 16 helper lines appended at EOF).
set -e
W=/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work; L=$W/lanes/fz-int-pump; I=$L/l35/inputs; B=$W/base; C=$L/itools/compose3.py
[ -d $I/fz-P-inc-r2-01 ] || cp -c -R $W/deliveries/fz-P-inc-r2-01 $I/
python3 -B $C --base $B/L33/pump --start $L/l34/c4 --out $L/l35/c1 --part incr2=$I/fz-P-inc-r2-01/src
cd $L && python3 -B rtools/twopass.py l35/c1 l35/tp35a --baseline $L/l34/tp34v/p1/score.json   # 1013/168, layout 1013/293, raw-ready 994, 0 losses, unstripped 1e6188af
