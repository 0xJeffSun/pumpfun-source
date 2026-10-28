#!/bin/bash
# usage: deliver.sh <variant> <NN> <summary> <readme-file>   (base = L13)
set -e
W=/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work; L=$W/lanes/mg-P-z00
v=$1; NN=$2; summary=$3; readme=$4
D=$W/deliveries/mg-P-z00-$NN
[ -e $D ] && { echo "exists $D"; exit 1; }
mkdir -p $D; cp -c -R $L/var/$v $D/src
diff -ruN $W/base/L15/pump $D/src > $D/patch.diff || true
cp $L/var/$v.build/unstripped.so $L/var/$v.build/candidate.so $D/
cp $L/var/$v.build/build.log $D/build.log 2>/dev/null || cp $L/var/$v.log $D/build.log
python3 -B $W/harness/score.py $D/unstripped.so --baseline $W/base/L15/inventory.json --json $D/score.json --quiet >/dev/null
cp $readme $D/README.md
python3 -B - "$D" "$summary" "$L/var/$v.log" <<'P'
import json,sys,hashlib,re
D,summary,vlog=sys.argv[1:]
s=json.load(open(D+'/score.json')); s=s.get('summary',s)
W='/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work'
base=json.load(open(W+'/base/L15/inventory.json'))['summary']['candidate_sha256']
t=open(vlog).read(); b=json.loads(t[t.index('{'):])['build']
files=sorted(set(re.findall(r'^\+\+\+ \S+/src/src/(\S+)',open(D+'/patch.diff').read(),re.M)))
d=dict(lane='mg-P-z00',base_round="L15",base_unstripped_sha256=base,unstripped_sha256=hashlib.sha256(open(D+'/unstripped.so','rb').read()).hexdigest(),
 normalized=s['normalized'],raw=s['raw'],gains=s['gains'],losses=s['losses'],raw_gains=s['raw_gains'],raw_losses=s['raw_losses'],
 runtime_valid=bool(b['runtime_valid']) and b['stack_warnings']==[],synthetic_layout=True,files_changed=files,summary=summary)
assert d['losses']==[] and d['raw_losses']==[] and d['gains'] and d['runtime_valid'], d
json.dump(d,open(D+'/delivery.json','w'),indent=1)
print(json.dumps({k:d[k] for k in ('normalized','raw','gains','losses','raw_losses','runtime_valid','files_changed')}))
P
