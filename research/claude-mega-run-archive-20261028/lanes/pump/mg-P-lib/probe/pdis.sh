#!/bin/bash
# pdis.sh <probe.o> <substring>  compact disasm of one probe function (whole .text.<sym> section)
OBJ=/Users/shawwalters/.cache/solana/v1.52/platform-tools/llvm/bin/llvm-objdump
sym=$($OBJ -t $1 | awk -v s="$2" '$NF ~ s && $0 ~ / F / {print $NF; exit}')
$OBJ -d --no-show-raw-insn -j .text.$sym $1 | grep -E "^\s+[0-9a-f]+:" | sed -E 's/^ +//; s/\t/ /g; s/ +/ /g; s/<[^>]*>//'
