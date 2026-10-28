#!/bin/zsh
# Compose L13 = L12 + newest round-5 deliveries (z00-03 and z09-01 are contained in z07-03), then resolve conflicts.
set -e
W=/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work; D=$W/deliveries; L=$W/lanes/mg-P-int; OUT=${1:-$L/c2}
python3 -B $L/tools/compose3.py --base $W/base/L12/pump --out $OUT \
 --part z07=$D/r5-z07-03/src \
 --part coord=$D/r5-coord-03/src:excl=src/trade_v3.rs \
 --part libinst=$D/r5-libinst-06/src:excl=src/trade_v3.rs,Cargo.toml,Cargo.lock,src/util/transfer_fee.rs,src/v3_native_transfer_fee.rs,src/distribution.rs \
 --part z01=$D/r5-z01-02/src --part z02=$D/r5-z02-02/src --part z03=$D/r5-z03-07/src --part z04=$D/r5-z04-02/src \
 --part z05=$D/r5-z05-04/src:excl=src/create_v2.rs,src/multi_hop_curve_swap.rs \
 --part z06=$D/r5-z06-02/src \
 --part z08=$D/r5-z08-03/src:excl=Cargo.toml,Cargo.lock,native_fee/Cargo.toml,native_fee/src/lib.rs,src/v3_native_transfer_fee.rs
python3 -B $L/fix/l13_fixes.py $OUT
