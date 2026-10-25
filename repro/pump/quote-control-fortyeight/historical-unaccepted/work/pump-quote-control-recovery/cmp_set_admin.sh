#!/bin/sh
cd ~/Documents/Codex/2026-10-24/pumpfun-source
W=work/pump-quote-control-recovery; C=$W/b144/target/sbf-solana-solana/release/pump_recovered.so; T=~/.cache/solana/v1.52/platform-tools/llvm/bin/llvm-objdump
for spec in "$@"; do sym=${spec%%=*}; rest=${spec#*=}; oa=${rest%%:*}; on=${rest#*:}
 line=$($T -t $C | grep "$sym" | head -1); a=$(echo $line | awk '{print $1}'); s=$(echo "$line" | awk '{for(i=1;i<=NF;i++) if($i==".text") print $(i+1)}')
 echo "== $sym cand size $((0x$s)) orig size $on"; python3 $W/seqdiff.py $C 0x$a $oa 0x$s $on | tail -1; done
