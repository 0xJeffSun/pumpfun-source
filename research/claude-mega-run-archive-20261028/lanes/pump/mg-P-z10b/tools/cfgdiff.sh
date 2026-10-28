#!/bin/zsh
# cfgdiff.sh <cand.so> <orig_start> <symregex> : register-normalized block-skeleton diff (orig vs cand)
T=/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-z10b/tools
O=/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/base/original.so
norm() { sed -E 's/^B[0-9]+\[[0-9]+\]: //; s/r[0-9]+/r/g; s/->B[0-9]+/->B/g' }
diff <(python3 -B $T/cfgsum.py $O $2 | norm | tr ';' '\n' | sed 's/^ *//') <(python3 -B $T/cfgsum.py $1 $3 | norm | tr ';' '\n' | sed 's/^ *//')
