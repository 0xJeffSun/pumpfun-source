#!/bin/bash
# run.sh file.rs -> prints asm of each no_mangle fn (compact)
RC=/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/toolchains/hybrid144/rust/bin/rustc
cd /Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-lib/probe
f=$1; b=${f%.rs}
$RC --target sbpf-solana-solana --crate-type lib --edition 2021 -C opt-level=3 -C panic=abort -C overflow-checks=on -C codegen-units=1 --emit=asm,llvm-ir -o $b.s $f 2>&1 | grep -E "^error" -A5 | head -20
awk '/^[a-z_0-9]+:$/{fn=$0} /^\t[a-z]/{if(fn!="") {gsub(/\t/," "); line[fn]=line[fn] ";" $0}} END{for (f in line) print f, line[f]}' $b.s | sort
