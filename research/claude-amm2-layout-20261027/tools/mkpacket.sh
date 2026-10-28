#!/bin/bash
# Assemble a layout packet directory from finished builds (same internal layout as g01).
# usage: mkpacket.sh G FR FRREL LAY DEFAULT_BUILD ORD_BUILD_A ORD_BUILD_B RUNTIME_DIR PLAN_DIR BASE_MEASURE LAY_MEASURE TARGET_CACHE
set -euo pipefail
G=$1 FR=$2 FRREL=$3 LAY=$4 D=$5 A=$6 B=$7 R=$8 PL=$9 BM=${10} LM=${11} TC=${12}
SP=/private/tmp/claude-501/-Users-shawwalters-Documents-Codex-2026-10-24-pumpfun-source/d810a7ff-a81e-46b2-bacd-4cd9cadc52cb/scratchpad
L=$SP/lanes/layout; W=$L/wt; O=$L/out; G1=$W/research/claude-amm2-layout-20261027/g01-text-data-order-647
mkdir -p $G/{layout,receipts,kits/$FR,builds/default,builds/text-data,builds/text-data-repeat,measurement,artifacts,runtime/$LAY,elfdiff,tools}
cp $G1/tools/* $G/tools/; cp $G1/verify.py $G1/test_scope.py $G/
sed -i '' "s/^FRONTIER = '.*'/FRONTIER = '$FR'/; s/^LAYOUT = '.*'/LAYOUT = '$LAY'/" $G/test_scope.py
cp $D/link/sdk-default.ld $G/layout/sdk-default.ld
cp $PL/ordered.ld $G/layout/$LAY.ld
gzip -9 -n -c $PL/order-plan.json > $G/layout/$LAY-plan.json.gz
for f in $D/link/inputs/*; do gzip -9 -n -c $f > $G/kits/$FR/$(basename $f).gz; done
cp $D/link/effective-args.txt $G/kits/$FR/
for f in build-attempt.json build.log link-wrapper.sh; do cp $D/$f $G/builds/default/; done
cp $D/link/effective-args.txt $D/link/incoming-args.txt $G/builds/default/
gzip -9 -n -c $D/link/link.map > $G/builds/default/link.map.gz
for f in build-attempt.json build.log link-wrapper.sh; do cp $A/$f $G/builds/text-data/; done
cp $A/link/effective-args.txt $A/link/incoming-args.txt $G/builds/text-data/
gzip -9 -n -c $A/link/link.map > $G/builds/text-data/link.map.gz
cp $B/build-attempt.json $B/build.log $G/builds/text-data-repeat/
gzip -9 -n -c $A/artifacts/candidate.so > $G/artifacts/$LAY-candidate.so.gz
gzip -9 -n -c $A/artifacts/unstripped.so > $G/artifacts/$LAY-unstripped.so.gz
gzip -9 -n -c $BM > $G/measurement/$FR-baseline-measure.json.gz
gzip -9 -n -c $LM > $G/measurement/$LAY-measure.json.gz
python3 $SP/shared/tools/cmpm.py $BM $LM > $G/measurement/cmpm-vs-base.txt
cp $R/summary.json $R/inputs.json $G/runtime/$LAY/
python3 -c "
import json
p=json.load(open('$R/progress.json'))
s=sorted(({k:v for k,v in x.items() if k not in ('command','seconds')} for x in p), key=lambda x:x['suite'])
open('$G/runtime/$LAY/suites.json','w').write(json.dumps(s,indent=1)+'\n')"
cd $W
python3 $G/tools/runtime_digest.py $R $G/runtime/$LAY/cases.json.gz
python3 $G/tools/relink_receipt.py --kit $D/link --script $G/layout/sdk-default.ld --target-cache $TC --label $FR-default --output $G/receipts/$FR-default.json > /dev/null
python3 $G/tools/relink_receipt.py --kit $D/link --script $G/layout/$LAY.ld --target-cache $TC --label $LAY --output $G/receipts/$LAY.json > /dev/null
python3 $O/mkclaims.py $G $FR $FRREL $LAY builds/text-data builds/text-data-repeat
find $G -name __pycache__ -prune -exec rm -rf {} \;
python3 $G/tools/manifest.py
