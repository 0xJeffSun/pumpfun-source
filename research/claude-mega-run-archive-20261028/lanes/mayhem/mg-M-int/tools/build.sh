#!/bin/zsh
# usage: build.sh LABEL ROOT TARGET_NAME   (env LANE_CLEAN_ANCHOR passes through)
WM=/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work
cd $WM
python3 $WM/sbf_lock.py --slots 6 --name sbf -- python3 -B $WM/mayhem-b/build/build_lane.py "$1" "$2" "$3" > $WM/mega/mg-M-int/logs/build-$1.log 2>&1
rc=$?
echo "rc=$rc"; tail -12 $WM/mega/mg-M-int/logs/build-$1.log | grep -E 'returncode|candidate_sha256|symbols_sha256|candidate_bytes|seconds|Error|error' ; grep -c 'Stack offset' $WM/mayhem-b/out/builds/$1/stderr 2>/dev/null
