#!/bin/bash
# sweep.sh orig_start symsubstr files...: compile each probe file (parallel), score every matching fn, print top 12 + exact
L=/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-sp1
RC=/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/toolchains/hybrid144/rust/bin/rustc
st=$1; pat=$2; shift 2
for f in "$@"; do ( $RC --target sbpf-solana-solana --crate-type lib --crate-name ${CN:-pump_token_ext} --edition 2021 -C opt-level=3 -C panic=abort -C overflow-checks=on -C codegen-units=1 --emit=obj -o ${f%.rs}.o $f 2>&1 | grep -E '^error' -A5 | head -8 ) & done; wait
for f in "$@"; do python3 -B $L/tools/sc.py ${f%.rs}.o $st $pat; done | sort -rn | awk '{c[$2]++} NR<=12 || /EXACT/ {print} END {printf "sizes:"; for (k in c) printf " %s=%d", k, c[k]; print ""}'
