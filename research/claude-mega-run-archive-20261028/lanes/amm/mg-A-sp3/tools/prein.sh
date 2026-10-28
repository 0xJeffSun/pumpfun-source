#!/bin/bash
# prein.sh OUT.ll FUNC_MANGLED [PASS] [module] : dump IR of FUNC right before PASS (default inline); 'module' = whole-module scope
L=/Users/shawwalters/amm100-run/lanes/mg-A-sp3; R=$HOME/amm100-run; PT=$HOME/.cache/solana/v1.44/platform-tools
OUT=$(cd $(dirname $1) && pwd)/$(basename $1); FN=$2; PASS=${3:-inline}; MS=""
[ "$4" = module ] && MS="-C llvm-args=-print-module-scope"
cd $L/src && python3 -I $R/shared/tools/slot.py 6 -- env CARGO_HOME=$R/cargo-home CARGO_TARGET_DIR=$L/target-ir RUSTC=$PT/rust/bin/rustc CC=$PT/llvm/bin/clang AR=$PT/llvm/bin/llvm-ar CARGO_TARGET_SBPF_SOLANA_SOLANA_RUSTFLAGS=' -Zremap-cwd-prefix=' $PT/rust/bin/cargo rustc -p pump-amm-recovered --release --target sbpf-solana-solana --locked --offline -j3 --lib -- -C llvm-args=-print-${MODE:-before}=$PASS -C llvm-args=-filter-print-funcs=$FN $MS > $L/ir/prein.log 2>&1 || { grep -E '^error' -A6 $L/ir/prein.log | head -20; exit 1; }
python3 -I - "$L/ir/prein.log" "$OUT" <<'PY'
import sys
t=open(sys.argv[1],errors='replace').read()
i=t.find('; *** IR Dump Before')
if i<0: print('no dump'); sys.exit(1)
j=t.find('; *** IR Dump',i+10)
blk=t[i:j if j>0 else len(t)]
# strip cargo trailer lines after the module
k=blk.find('\n    Finished'); blk=blk if k<0 else blk[:k]
open(sys.argv[2],'w').write(blk); print('dump',len(blk),'bytes; dumps total',t.count('; *** IR Dump'))
PY
