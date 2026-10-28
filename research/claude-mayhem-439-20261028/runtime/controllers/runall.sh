#!/bin/zsh
# usage: runall.sh RUNTIME_DIR CTL_DIR  -- runs the 4 retargeted Codex controllers with the repo test-env python
PY=/Users/shawwalters/Documents/Codex/2026-10-24/pumpfun-source/work/test-env/bin/python
D=$1; C=$2; mkdir -p $D/logs; cd $D
for n in run_trades run_sweeps run_initializer run_target_rates; do
  s=$(date +%s); PYTHONDONTWRITEBYTECODE=1 $PY -B $C/$n.py > $D/logs/$n.log 2>&1; rc=$?
  echo "$n rc=$rc secs=$(( $(date +%s) - s )) last=$(tail -1 $D/logs/$n.log | cut -c1-120)" >> $D/logs/summary.txt
done
echo DONE >> $D/logs/summary.txt
