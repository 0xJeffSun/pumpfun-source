#!/bin/bash
# rat.sh <win> <symregex> <outname...> : ratio of symbol vs original window for each out
W=/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work; L=$W/lanes/mg-P-hop
w=$1; s=$2; shift 2
for o in "$@"; do echo "$o: $(python3 -B $W/harness/win.py show $w --cand $L/out/$o/unstripped.so --sym "$s" 2>&1 | sed -n '2p')"; done
