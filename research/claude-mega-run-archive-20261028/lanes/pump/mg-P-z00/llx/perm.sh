#!/bin/bash
# perm.sh <ll> <fn> <orig_start> <order...>
ll=$1; fn=$2; st=$3; shift 3
for ord in "$@"; do python3 -B ../tools/tx_ord.py $ll pp.ll $fn "$ord" >/dev/null && ../tools/llcw.sh pp.ll pp.o && echo "$(python3 -B ../tools/odiff.py pp.o $st $fn | grep -c '^[-+][^-+]') $ord"; done
