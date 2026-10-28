#!/bin/bash
# rt.sh <outname>: run multi_hop_curve_partial (56) + two-curve (20) differential suites on out/<outname>/candidate.so
L=/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-hop; F=/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/full
PY=/Users/shawwalters/Documents/Codex/2026-10-24/pumpfun-source/work/test-env/bin/python
cd $F
rm -f $L/rt/$1-mhp.json
$PY -B repro/pump/native-curve-partial-fortyeight/harness/pump_multi_hop_curve_differential.py --candidate $L/out/$1/candidate.so --output $L/rt/$1-mhp.json > $L/rt/$1-mhp.log 2>&1
echo "mhp rc=$? $(python3 -c "import json; d=json.load(open('$L/rt/$1-mhp.json')); print('passed',d.get('passed'),'/',d.get('case_count'),'mism',sum(1 for c in d['cases'] if c['mismatches']))" 2>&1)"
$PY -B $L/tools/rt2.py $L/out/$1/candidate.so $L/rt/$1-2c.json 2>&1 | tail -1 | cut -c1-600
