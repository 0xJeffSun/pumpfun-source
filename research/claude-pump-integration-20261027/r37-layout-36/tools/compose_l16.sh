#!/bin/zsh
# L16 = L15 + mg-P-z01-01 + mg-P-lib-04 (both made on L13; 3-way merge vs L13)
set -e
W=/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work; L=$W/lanes/mg-P-int; D=$L/inputs; OUT=${1:-$L/c12}
python3 -B $L/tools/compose3.py --base $W/base/L13/pump --start $W/base/L15/pump --out $OUT --part z01=$D/mg-P-z01-01/src --part lib=$D/mg-P-lib-04/src
