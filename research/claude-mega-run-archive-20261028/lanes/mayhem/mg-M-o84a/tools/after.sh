#!/bin/bash
# usage: after.sh PREVNAME NAME : wait for out/PREVNAME.res scoring to finish, then mvb.sh NAME
L=/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work/r436/o0084-brute-r1
while ! grep -q "REAL\|FAILED\|Traceback" $L/out/$1.res 2>/dev/null; do sleep 15; done
$L/tools/mvb.sh $2
