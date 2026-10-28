#!/bin/bash
# save.sh NN "desc"  (uses out/<last measure json file> given as $3)
L=~/amm100-run/lanes/sell-r1; W=~/amm100-run/shared/wins
cd $L/src && diff -ruN ~/amm100-run/rounds/r1/base-src/programs/pump-amm/src programs/pump-amm/src > $W/sell-r1-$1.patch
python3 -I -c "
import json,sys;s=open('$3').read();i=s.index('{\"sha256');d=json.loads(s[i:s.index('}',i)+1]);d['desc']=sys.argv[1]
open('$W/sell-r1-$1.json','w').write(json.dumps(d));print(d['normalized'],d['gains'],d['losses'])" "$2"
