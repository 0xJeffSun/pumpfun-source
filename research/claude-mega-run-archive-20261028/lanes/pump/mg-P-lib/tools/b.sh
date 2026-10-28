#!/bin/bash
# b.sh <name> <srcdir> [workdir]  -> builds into res/<name>, scores vs BASELINE (default r5-libinst-06)
W=/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work; L=$W/lanes/mg-P-lib
n=$1; s=$2; w=${3:-$L/work_$n}
BL=${BASELINE:-$W/deliveries/r5-libinst-06/score.json}
mkdir -p $L/res
[ -d $w ] || cp -c -R $L/work $w 2>/dev/null || mkdir -p $w
python3 -B $W/harness/fastbuild.py --src $s --work $w --out $L/res/$n > $L/res/$n.log 2>&1
ok=$(grep -c '"ok": true' $L/res/$n.log); sw=$(grep -c "exceeded max offset" $L/res/$n.log)
echo "ok=$ok stackwarn=$sw $(grep -o '"runtime_valid": [a-z]*' $L/res/$n.log | tail -1)"
[ "$ok" = "0" ] && { grep -E "^error|error\[" $L/res/$n.log | head -5; exit 1; }
python3 -B $W/harness/score.py $L/res/$n/unstripped.so --baseline $BL --json $L/res/$n.score.json --quiet | python3 -B -c "
import json,sys; s=json.loads(sys.stdin.read()); print('N',s['normalized'],'raw',s['raw'],'gains',s['gains'],'losses',s['losses'],'rg',s['raw_gains'],'rl',s['raw_losses'])"
