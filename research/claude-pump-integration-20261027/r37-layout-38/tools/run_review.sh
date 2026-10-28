#!/bin/zsh
# L38 runtime review (same scripts as L33's runtime-review/, retargeted to r37-layout-38): run after itools/regress_wt.sh r37-layout-38
set -e
PY=/Users/shawwalters/Documents/Codex/2026-10-24/pumpfun-source/work/test-env/bin/python
cd /Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/fz-int-pump/pkg/L38-review
$PY -B audit_saved_runtime.py > ../../l38/audit38.out && mv RUNTIME-REVIEW.json L38-RUNTIME-REVIEW.json
$PY -B retained_vs_fresh.py > retained_vs_fresh.json
$PY -B changed_logs.py > changed_logs.json
$PY -B neither.py > neither.txt
echo review-done
