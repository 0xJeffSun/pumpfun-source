#!/bin/bash
# ib.sh TAG [SRC]: IR build of SRC (default lane src) -> out/TAG/{unstripped.so,score.json}, ir/TAG.ll; prints score summary
L=/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-v3a
W=/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work
TAG=$1; SRC=${2:-$L/src}; WORK=${WORK:-$L/work}
python3 -B $L/tools/irbuild.py --src $SRC --work $WORK --out $L/out/$TAG > $L/out/$TAG.json 2>&1 || { tail -5 $L/out/$TAG.json; grep -E '^error' -A5 $L/out/$TAG/build.log | head -30; exit 1; }
LL=$(ls -t $WORK/target-identity/sbpf-solana-solana/release/deps/pump_recovered*.ll | head -1)
mv $LL $L/ir/$TAG.ll
python3 -B $W/harness/score.py $L/out/$TAG/unstripped.so --baseline $W/base/L27/inventory.json --json $L/out/$TAG/score.json --quiet | python3 -c "import json,sys; d=json.load(sys.stdin); print({k:d.get(k) for k in ('normalized','raw','gains','losses','raw_gains','raw_losses')})"
python3 -c "import json; d=json.load(open('$L/out/$TAG.json')); print('runtime_valid',d.get('runtime_valid'),'secs',d.get('seconds'),'sha',d.get('unstripped_sha256','')[:8], d.get('stack_warnings'))"
