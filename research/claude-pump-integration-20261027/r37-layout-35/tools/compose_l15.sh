#!/bin/zsh
# L15 = L14 + mega-run window deliveries made on L13 (3-way merge with base L13).
set -e
W=/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work; L=$W/lanes/mg-P-int; D=$L/inputs; OUT=${1:-$L/c9}
python3 -B $L/tools/compose3.py --base $W/base/L13/pump --start $W/base/L14/pump --out $OUT \
 --part lib=$D/mg-P-lib-03/src --part z02=$D/mg-P-z02-02/src --part z07=$D/mg-P-z07-02/src --part z06=$D/mg-P-z06-01/src
python3 -B $L/fix/l15_fixes.py $OUT
