#!/bin/zsh
# usage: bank.sh NAME LANE_MAYHEM LANE_BASE_MAYHEM PARENT_ROOT PARENT_SYMS PARENT_CAND
# port lane delta onto parent, build (shared rbuild), measure vs parent, clean build (crecipe, cache2, fresh copy), runtime.
WM=/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work; W=$WM/mega/mg-M-int
NAME=$1; LANE=$2; LBASE=$3; PROOT=$4; PSYMS=$5; PCAND=$6
python3 -B $W/tools/port.py $LANE $LBASE $PROOT/programs/mayhem $W/roots/$NAME > $W/logs/port-$NAME.txt || { echo PORT-FAIL; cat $W/logs/port-$NAME.txt; exit 1; }
echo "port: $(tr '\n' ';' < $W/logs/port-$NAME.txt)"
cd $WM && python3 $WM/sbf_lock.py --slots 6 --name sbf -- python3 -B $WM/mayhem-env/tools/rbuild.py mgMint-$NAME-a $W/roots/$NAME > $W/logs/rb-$NAME-a.log 2>&1 || { echo BUILD-FAIL; tail -5 $W/logs/rb-$NAME-a.log; exit 1; }
A=$WM/mayhem-b/out/builds/mgMint-$NAME-a
python3 -B $WM/mayhem-b/build/measure.py $A/symbols.so $PSYMS --json $W/measure/$NAME-a-vs-parent.json > /dev/null
python3 -B -c "
import json; d=json.load(open('$W/measure/$NAME-a-vs-parent.json')); r=json.load(open('$A/result.json'))
print('build-a', r['candidate_sha256'][:12], 'stack', r['stack_offset_warnings'], d['counts'], 'gains', d['gains'], 'raw+', d['raw_gains'], 'no_losses', d['no_losses'], 'unmatched', d['unmatched_ids'])
print('losses', {k:v for k,v in d.items() if k.endswith('losses') and v and k!='no_losses'})"
python3 -B $W/tools/winreport.py $A/symbols.so O0077 O0083 O0084 | cut -c1-120
mkdir -p $W/roots/$NAME-clean && cp -R $W/roots/$NAME/programs $W/roots/$NAME-clean/
CRECIPE_CACHE=$W/cache2 $W/tools/crbuild.sh mgMint-$NAME-clean $W/roots/$NAME-clean | grep -E 'rc=|candidate_sha256|stack'
C=$W/builds/mgMint-$NAME-clean
cmp -s $A/candidate.so $C/candidate.so && cmp -s $A/symbols.so $C/symbols.so && echo CLEAN-IDENTICAL || echo CLEAN-DIFFERS
python3 -B $W/tools/mkruntime.py $W/runtime-$NAME $C/candidate.so $PCAND $W/runtime-ctl-$NAME && $W/tools/runall.sh $W/runtime-$NAME $W/runtime-ctl-$NAME && cat $W/runtime-$NAME/logs/summary.txt | cut -c1-120
python3 -B $W/tools/rtsum.py $W/runtime-$NAME $W/runtime-$NAME/summary.json
