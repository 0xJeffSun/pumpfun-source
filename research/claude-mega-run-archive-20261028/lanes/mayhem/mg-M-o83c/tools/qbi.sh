#!/bin/bash
# qbi.sh NAME ROOT: IR build + score + event-join phi order
W=/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work
L=$W/mega/mg-M-o83c
N=$1; ROOT=$2
O=$W/mayhem-b/out/builds/mg-M-o83c-$N
[ -d $O ] && rm -rf $O
EMIT_IR=1 python3 $W/sbf_lock.py --slots 6 --name sbf -- python3 -B $L/tools/rbuild_ir.py mg-M-o83c-$N $ROOT > $L/logs/build-$N.log 2>&1
if [ ! -f $O/symbols.so ]; then echo "$N BUILD FAILED"; grep -E '"rendered"' $O/stderr 2>/dev/null | head -2 | cut -c1-400; exit 1; fi
cp $O/root-out/mayhem_recovered.ll $L/ir/$N.ll
python3 -B - <<PY
import sys,re; sys.path.insert(0,'$L/tools'); import ire, sc3
pre,h,post=ire.split('$L/ir/$N.ll')
ls=h.split('\n')
best=None
for i,l in enumerate(ls):
    m=re.match(r'^([^\s;][^:]*):',l)
    if m:
        j=i+1; names=[]
        while j<len(ls) and ' = phi ' in ls[j]: names.append(re.match(r'\s*%([^ ]+) = phi',ls[j]).group(1)); j+=1
        if any('sol_amount' in n for n in names): best=(m.group(1),names)
print('phis',best[0],','.join(n.replace('.sroa.0.0','') for n in best[1]))
print('score',sc3.score(sc3.lst('$O/symbols.so')))
PY
