#!/bin/bash
# rb.sh <name> <srcdir> <callee-substr> : irnb build with inline remarks; score vs L13 (or BASELINE); print inline decisions for callee
W=/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work; L=$W/lanes/mg-P-lib
n=$1; s=$2; cs=$3; w=$L/work_$n; R=$L/remarks/$n
rm -rf $R; mkdir -p $R; [ -d $w ] || cp -c -R $L/work_irc80 $w
IRWRAP_EXTRA="-Zremark-dir=$R -Cremark=inline" python3 -B $L/tools/irnb.py --src $s --work $w --out $L/res/$n > $L/res/$n.json 2>&1
cp $L/res/$n/build.log $L/res/$n.log 2>/dev/null
tail -1 $L/res/$n.json
python3 -B $W/harness/score.py $L/res/$n/unstripped.so --baseline ${BASELINE:-$W/base/L13/inventory.json} --json $L/res/$n.score.json --quiet | python3 -B -c "
import json,sys; s=json.loads(sys.stdin.read()); print('N',s['normalized'],'gains',s['gains'],'losses',s['losses'],'rl',s['raw_losses'])"
f=$(ls -S $R/*.yaml | head -1)
python3 -B - "$f" "$cs" <<'PY'
import sys,re
s=open(sys.argv[1]).read(); cs=sys.argv[2]
for d in s.split('\n--- '):
    if cs in d:
        name=re.search(r'Name:\s+(\S+)',d); fn=re.search(r'Function:\s+(\S+)',d)
        kv=dict((k,v) for k,v in re.findall(r"- (Callee|Cost|Threshold):\s+'?([^'\n]*)",d) if k in('Cost','Threshold'))
        cal=re.findall(r"- Callee:\s+'?([^'\n]*)",d)
        if cal and cs in cal[0]: print(name.group(1), fn.group(1)[:70], kv)
PY
