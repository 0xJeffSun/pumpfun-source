#!/bin/bash
# ir.sh LANEDIR OUT.ll : emit LLVM IR for pump-amm crate (shared slot lock, same env as nbuild.sh, own target dir)
L=$(cd "$1" && pwd); R=$HOME/amm100-run; PT=$HOME/.cache/solana/v1.44/platform-tools; OUT=$2
cd "$L/src"
python3 -I $R/shared/tools/slot.py 6 -- env CARGO_HOME=$R/cargo-home CARGO_TARGET_DIR=$L/target-ir RUSTC=$PT/rust/bin/rustc CC=$PT/llvm/bin/clang AR=$PT/llvm/bin/llvm-ar CARGO_TARGET_SBPF_SOLANA_SOLANA_RUSTFLAGS=' -Zremap-cwd-prefix=' $PT/rust/bin/cargo rustc -p pump-amm-recovered --lib --release --target sbpf-solana-solana --locked --offline -j3 -- --emit=llvm-ir > "$L/out/ir.log" 2>&1 || { grep -E '^error' -A6 "$L/out/ir.log" | head -30; echo IR_FAILED; exit 1; }
f=$L/target-ir/sbpf-solana-solana/release/deps/pump_amm_recovered.ll; cp "$f" "$OUT"; echo "IR -> $OUT ($(wc -c < $OUT) bytes)"
