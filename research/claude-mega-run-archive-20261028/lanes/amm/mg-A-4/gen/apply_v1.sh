#!/bin/bash
# apply_v1.sh MHFILE : install a v1-style multi_hop_swap.rs + trade_v2 validate_multi_hop_pool helper into lane src, build+measure (u750 frontier)
L=/Users/shawwalters/amm100-run/lanes/mg-A-4
python3 -B - <<'PY'
p='/Users/shawwalters/amm100-run/lanes/mg-A-4/src/programs/pump-amm/src/instructions/swap/trade_v2.rs'
s=open(p).read().split('\n')
if 'validate_multi_hop_pool' not in '\n'.join(s):
    assert all(s[i].strip()=='' for i in range(116,126))
    s[116:126]=open('/Users/shawwalters/amm100-run/lanes/mg-A-4/gen/tv2_helper.rs').read().rstrip('\n').split('\n')
    open(p,'w').write('\n'.join(s))
PY
cp "$1" $L/src/programs/pump-amm/src/instructions/swap/multi_hop_swap.rs
cd $L && MEASURE_FRONTIER=/Users/shawwalters/amm100-run/shared/frontier/matched-union-750n.json /Users/shawwalters/amm100-run/shared/tools/nbuild.sh $L > $L/out/m.txt 2>&1
grep -E '^error' -A7 $L/out/build.log | grep -E '^error|-->' | head -8
echo "stack: $(grep -c -i 'stack offset' $L/out/build.log)"
tail -1 $L/out/m.txt | cut -c1-260
cd $L/tools; for w in 0x3dbc0:multi_hop_swap7execute17 0x40a08:amm_hop 0x45940:curve_run; do python3 -B hunks.py ../out/cand.so ${w%%:*} ${w##*:} 2>/dev/null | head -1; done
