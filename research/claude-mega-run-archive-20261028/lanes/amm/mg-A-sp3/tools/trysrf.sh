#!/bin/bash
# trysrf.sh VARIANT.rs [keep] : install srf variant, build+measure (u754 frontier), report; restore unless keep
L=/Users/shawwalters/amm100-run/lanes/mg-A-sp3; F=$L/src/programs/pump-amm/src/instructions/admin/set_reserved_fee_recipients.rs
V=$1; N=$(basename $V .rs)
cp "$F" "$F.bak"; cp "$V" "$F"
out=$(MEASURE_FRONTIER=$HOME/amm100-run/shared/frontier/matched-union-754n.json $HOME/amm100-run/shared/tools/nbuild.sh $L 2>&1 | tail -3)
j=$(echo "$out" | python3 -I -c 'import json,sys
t=sys.stdin.read()
try:
 j=json.loads(t.strip().splitlines()[-1]);print(j["normalized"],j["raw"],"G",j["gains"],"L",j["losses"])
except Exception: print("ERR",t[-300:].replace("\n"," "))')
s=$($L/tools/cnt.sh $L/out/cand.so 0x19138 set_reserved_fee_recipients7handler | sed 's/(_ZN[^)]*)//; s/0x19138 orig 9176 bytes, //')
w=$($L/tools/cnt.sh $L/out/cand.so 0x2288 with_account_name17h02bed | sed 's/(_ZN[^)]*)//; s/orig 232 bytes, //')
echo "$N: $j | srf $s | $w"
cp $L/out/cand.so $L/out/v_$N.so
[ "$2" = keep ] || mv "$F.bak" "$F"; rm -f "$F.bak"
