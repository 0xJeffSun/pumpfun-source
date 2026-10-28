#!/bin/zsh
# L39 = L38 (l38/c1) + fz-P-data-r1-02 (data-side, no window change; cumulative on -01, made on L38): panic Location records of
#       0x18678 0x7bfd8 0x34558 0x567d8 on the original line:col, log-parity source placement (v3 sell fee path, hop body), dead helpers removed.
set -e
W=/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work; L=$W/lanes/fz-int-pump; I=$L/l39/inputs; B=$W/base; C=$L/itools/compose3.py
[ -d $I/fz-P-data-r1-02 ] || cp -c -R $W/deliveries/fz-P-data-r1-02 $I/
python3 -B $C --base $B/L38/pump --start $L/l38/c1 --out $L/l39/c1 --part data=$I/fz-P-data-r1-02/src
cd $L && python3 -B rtools/twopass.py l39/c1 l39/tp39a --baseline $L/l38/tp38a/p1/score.json
