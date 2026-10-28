#!/bin/bash
# qp.sh file.rs [sym]: standalone hybrid144 rustc (crate profile flags) -> .o, compare sym with 0x17bc48
RC=/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/toolchains/hybrid144/rust/bin/rustc
L=/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-z10
f=$1; b=${f%.rs}; sym=${2:-quote_extensions_supported}
$RC --target sbpf-solana-solana --crate-type lib --crate-name pump_token_ext --edition 2021 -C opt-level=3 -C panic=abort -C overflow-checks=on -C codegen-units=1 --emit=obj${EMIT:+,$EMIT} -o $b.o $f 2>&1 | grep -E "^error" -A5 | head -20
python3 -B $L/tools/sacmp.py $b.o ${ORIG:-0x17bc48} $sym
