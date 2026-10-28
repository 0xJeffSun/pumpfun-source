#!/bin/zsh
# L18..L24: one mega delivery per step, 3-way merged against the base named in its delivery.json
# (or the lane's previously composed delivery for cumulative ones). Each step was built + scored (0 losses) and published.
set -e
W=/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work; L=$W/lanes/mg-P-int; D=$L/inputs; C=$L/tools/compose3.py; B=$W/base
python3 -B $C --base $B/L13/pump --start $B/L17/pump --out ${1:-$L/c14} --part z00=$D/mg-P-z00-01/src                                 # L18 +0x1db88
python3 -B $C --base $B/L13/pump --start $B/L18/pump --out $L/c15 --part z03=$D/mg-P-z03-01/src:base=$B/L15/pump                   # L19 +0x45fa0
python3 -B $C --base $B/L13/pump --start $B/L19/pump --out $L/c16 --part z08=$D/mg-P-z08-01/src:base=$B/L15/pump                   # L20 +0x1367c0
python3 -B $C --base $B/L13/pump --start $B/L20/pump --out $L/c17 --part z06=$D/mg-P-z06-02/src:base=$B/L14/pump                   # L21 +0x6a8a8
python3 -B $C --base $B/L13/pump --start $B/L21/pump --out $L/c18 --part z10=$D/mg-P-z10-01/src:base=$B/L17/pump                   # L22 +0x1557e8
python3 -B $C --base $B/L13/pump --start $B/L22/pump --out $L/c19 --part z05=$D/mg-P-z05-01/src:base=$B/L21/pump                   # L23 +0x62aa0
python3 -B $C --base $B/L13/pump --start $B/L23/pump --out $L/c20 --part z10=$D/mg-P-z10-02/src:base=$D/mg-P-z10-01/src            # L24 +0x17bc48
