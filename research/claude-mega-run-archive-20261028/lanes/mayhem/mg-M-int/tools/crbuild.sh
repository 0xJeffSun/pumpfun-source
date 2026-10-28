#!/bin/zsh
# usage: crbuild.sh LABEL ROOT [PACKET_BUILD_DIR]  -- Codex-recipe replica build under the shared slot lock
WM=/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work
W=$WM/mega/mg-M-int
python3 $WM/sbf_lock.py --slots 6 --name sbf -- python3 -B $W/tools/crecipe.py "$@" > $W/logs/crbuild-$1.log 2>&1
echo "rc=$?"; grep -E 'acquired|returncode|unchanged|stack_offset|candidate_sha256|symbols_sha256|candidate_bytes|Error' $W/logs/crbuild-$1.log | cut -c1-160
