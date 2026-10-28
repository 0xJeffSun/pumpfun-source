#!/bin/bash
# nb.sh TAG : build+measure lane, save json to out/TAG.json, print summary
L=/Users/shawwalters/amm100-run/lanes/mg-A-5
MEASURE_FRONTIER=/Users/shawwalters/amm100-run/shared/frontier/matched-union-752n.json /Users/shawwalters/amm100-run/shared/tools/nbuild.sh $L > $L/out/$1.json 2>&1
grep -q 'Stack offset' $L/out/build.log && echo "STACK WARNING: $(grep -c 'Stack offset' $L/out/build.log)"
python3 -I -c "
import json,sys;s=open(sys.argv[1]).read()
try:
  i=s.index('{\"sha256');d=json.loads(s[i:s.index('}',i)+1]);print('N',d['normalized'],'raw',d['raw'],'gains',d['gains'],'losses',d['losses'])
except Exception as e: print(s[-1500:])" $L/out/$1.json
