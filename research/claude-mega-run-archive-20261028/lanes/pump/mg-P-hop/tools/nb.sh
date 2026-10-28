#!/bin/bash
# nb.sh <variant dir> <work dir> <out name> : build + score vs L30, print compact JSON
W=/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work; L=$W/lanes/mg-P-hop
python3 -B $W/lanes/mg-P-int/tools/nbuild.py --src $1 --work $2 --out $L/out/$3 --baseline $W/base/L30/inventory.json > $L/out/$3.json 2>&1
echo "$3: $(tr -d '\n ' < $L/out/$3.json | cut -c1-400)"
