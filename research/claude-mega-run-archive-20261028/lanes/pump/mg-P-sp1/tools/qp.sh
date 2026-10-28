#!/bin/bash
# qp.sh file.rs orig_start [sym-substr...]: standalone hybrid144 rustc with pump-token-ext crate flags -> .o, compare
RC=/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/toolchains/hybrid144/rust/bin/rustc
L=/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-sp1
f=$1; shift; b=${f%.rs}
$RC --target sbpf-solana-solana --crate-type lib --crate-name ${CN:-pump_token_ext} --edition 2021 -C opt-level=3 -C panic=abort -C overflow-checks=on -C codegen-units=1 --emit=obj${EMIT:+,$EMIT} -o $b.o $f 2>&1 | grep -E "^error" -A7 | head -30
python3 -B $L/tools/cmp.py $b.o "$@"
