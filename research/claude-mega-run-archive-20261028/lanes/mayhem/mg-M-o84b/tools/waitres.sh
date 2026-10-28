#!/bin/bash
# waitres.sh NAME [secs]: wait up to secs for out/NAME.res scoring to finish
L=/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work/mega/mg-M-o84b
n=0; while ! grep -q "REAL\|FAILED\|Traceback" $L/out/$1.res 2>/dev/null; do sleep 10; n=$((n+10)); [ $n -ge ${2:-580} ] && { echo TIMEOUT; exit 0; }; done; cat $L/out/$1.res
