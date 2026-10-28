#!/bin/zsh
# L17 = L16 + mg-P-z07-03 (merge base = its previous delivery mg-P-z07-02, already in L16)
set -e
W=/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work; L=$W/lanes/mg-P-int; D=$L/inputs; OUT=${1:-$L/c13}
python3 -B $L/tools/compose3.py --base $W/base/L13/pump --start $W/base/L16/pump --out $OUT --part z07=$D/mg-P-z07-03/src:base=$D/mg-P-z07-02/src
