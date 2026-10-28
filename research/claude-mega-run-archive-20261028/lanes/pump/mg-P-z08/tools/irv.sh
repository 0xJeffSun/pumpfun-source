#!/bin/bash
# irv.sh <ir.ll> <orig_start> <mangled-fn-substring>... : extract each fn, llc, compare (one line each)
W=/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work; L=$W/lanes/mg-P-z08
IR=$1; ST=$2; shift 2
for F in "$@"; do
  T=$(echo "$F" | tr -c 'a-zA-Z0-9_\n' '_')
  python3 -B $W/lanes/mg-P-z06/tools/xfn.py $IR "$F" $L/llx/$T.ll 2>/dev/null
  echo "$F: $($L/tools/llt.sh $L/llx/$T.ll $T $ST "$F" | cut -d: -f2-)"
done
