#!/bin/bash
# emitraw.sh LANE OUT.ll : DIAGNOSTIC ONLY - unoptimized (no-prepopulate-passes) crate IR, separate target dir
D=$1; R=$HOME/amm100-run; PT=$HOME/.cache/solana/v1.44/platform-tools
[ -d $D/target-raw ] || cp -c -R $D/target $D/target-raw
cd $D/src && python3 -I $R/shared/tools/slot.py 6 -- env CARGO_HOME=$R/cargo-home CARGO_TARGET_DIR=$D/target-raw RUSTC=$PT/rust/bin/rustc CC=$PT/llvm/bin/clang AR=$PT/llvm/bin/llvm-ar CARGO_TARGET_SBPF_SOLANA_SOLANA_RUSTFLAGS=' -Zremap-cwd-prefix=' $PT/rust/bin/cargo rustc -p pump-amm-recovered --release --target sbpf-solana-solana --locked --offline -j3 --lib -- --emit=llvm-ir -C no-prepopulate-passes > $D/ir-raw.log 2>&1 || { grep -E '^error' -A6 $D/ir-raw.log | head -20; exit 1; }
cp $D/target-raw/sbpf-solana-solana/release/deps/pump_amm_recovered.ll $2
