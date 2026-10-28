#!/bin/bash
# remarks.sh OUT.txt [extra rustc args] : rebuild crate with inline remarks (diagnostic only) -> OUT.txt
L=/Users/shawwalters/amm100-run/lanes/mg-A-1; R=$HOME/amm100-run; PT=$HOME/.cache/solana/v1.44/platform-tools
OUT=$1; shift
cd $L/src && python3 -I $R/shared/tools/slot.py 6 -- env CARGO_HOME=$R/cargo-home CARGO_TARGET_DIR=$L/target-ir RUSTC=$PT/rust/bin/rustc CC=$PT/llvm/bin/clang AR=$PT/llvm/bin/llvm-ar CARGO_TARGET_SBPF_SOLANA_SOLANA_RUSTFLAGS=' -Zremap-cwd-prefix=' $PT/rust/bin/cargo rustc -p pump-amm-recovered --release --target sbpf-solana-solana --locked --offline -j3 --lib -- -C remark=inline "$@" > $OUT 2>&1 || { grep -E '^error' -A6 $OUT | head -20; exit 1; }
echo "remarks: $(grep -c 'optimization' $OUT) lines -> $OUT"
