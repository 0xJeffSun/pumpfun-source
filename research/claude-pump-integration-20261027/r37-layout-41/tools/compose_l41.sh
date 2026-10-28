#!/bin/zsh
# L41 = L40 (l40/c1) + merged contributor PR #555 (research/pump-legacy-sell-boundary-20261028/source.patch, made on L38 #527;
#       includes #539's checked accumulator constructor): +0x152888 legacy sell. lib.rs:1040 + sell.rs (3 in-place hunks + 13 appended lines).
# Both files merge cleanly against L38: L40's sell.rs edits (fz-P-data-r1-03, process_cashback data writes at 76:13/77:13) and #555's hunks are disjoint.
set -e
W=/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work; L=$W/lanes/fz-int-pump; I=$L/l41/inputs; B=$W/base; C=$L/itools/compose3.py
[ -f $I/pr555/source.patch ] || git -C /Users/shawwalters/Documents/Codex/2026-10-24/pumpfun-source show origin/main:research/pump-legacy-sell-boundary-20261028/source.patch > $I/pr555/source.patch
[ -d $I/pr555/src ] || { cp -c -R $B/L38/pump $I/pr555/src; (cd $I/pr555/src && patch -p3 -s < ../source.patch); }
python3 -B $C --base $B/L38/pump --start $L/l40/c1 --out $L/l41/c1 --part pr555=$I/pr555/src
cd $L && python3 -B rtools/twopass.py l41/c1 l41/tp41a --baseline $L/l40/tp40a/p1/score.json   # 1019/168, +0x152888, 0 losses, layout 1019/293, raw-ready 1005/1019 (none lost), locs 369/369, unstripped 4e140892
