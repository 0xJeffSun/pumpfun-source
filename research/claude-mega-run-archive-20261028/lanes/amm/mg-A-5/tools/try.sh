#!/bin/bash
# try.sh CASHBACK_TEMPLATE  -> builds, prints measure gains/losses count + cashback size + diff lines
L=~/amm100-run/lanes/sell-r1; cd $L
python3 -I gen/mksell.py gen/sell.tmpl $1 && python3 -I tools/align.py gen/sell.tmpl gen/sell.rs || exit 1
cp gen/sell.rs src/programs/pump-amm/src/instructions/swap/sell.rs
~/amm100-run/shared/tools/nbuild.sh . > out/try.json 2>&1 || ~/amm100-run/shared/tools/nbuild.sh . > out/try.json 2>&1
python3 -I -c "
import json;s=open('out/try.json').read()
try:
  i=s.index('{\"sha256');d=json.loads(s[i:s.index('}',i)+1]);print('N',d['normalized'],'loss',d['losses'],'gain#',len(d['gains']))
except Exception as e: print(s[-1500:])"
python3 -I tools/rdiff.py out/cand.so 0x4c750 swap4sell8cashback 0 5000 > work/cbdiff.txt; head -1 work/cbdiff.txt; echo "diff -$(grep -c '^-' work/cbdiff.txt) +$(grep -c '^+' work/cbdiff.txt)"
