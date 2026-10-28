#!/bin/bash
# deliver13.sh <tag> <srcdir> <NN> <summary> <readme-file>  (L13-based delivery)
W=/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work; L=$W/lanes/mg-P-z01
T=$1; S=$2; NN=$3; SUM=$4; RD=$5
D=$W/deliveries/mg-P-z01-$NN
[ -e $D ] && { echo "exists $D"; exit 1; }
mkdir -p $D
cp -c -R $S $D/src; rm -rf $D/src/target
cp $L/so/$T.so $D/unstripped.so
cp $L/out/$T/candidate.so $D/candidate.so
cat $L/so/$T.log $L/out/$T/build.log > $D/build.log
cp $L/so/$T.json $D/score.json
(cd $W && diff -ruN base/L13/pump $D/src > $D/patch.diff)
python3 -B - "$D" "$SUM" <<'PY'
import json,sys,hashlib,re
D,SUM=sys.argv[1:3]
sc=json.load(open(D+'/score.json'))['summary']
log=open(D+'/build.log').read()
rv='"runtime_valid": true' in log
files=sorted(set(re.findall(r'^\+\+\+ \S+?/src/(src/\S+)',open(D+'/patch.diff').read(),re.M)))
h=lambda p: hashlib.sha256(open(p,'rb').read()).hexdigest()
d=dict(lane='mg-P-z01',base_round='L13',started_from='r5-z01-02',base_unstripped_sha256='b76a3cd75ce6e18e75ae6d798f82e08d7c0f458443a32e18c0fae5a9a37006fe',
 unstripped_sha256=h(D+'/unstripped.so'),candidate_sha256=h(D+'/candidate.so'),normalized=sc['normalized'],raw=sc['raw'],
 gains=sc['gains'],losses=sc['losses'],raw_gains=sc['raw_gains'],raw_losses=sc['raw_losses'],runtime_valid=rv,
 stack_warnings=[] if 'Stack offset' not in log else ['STACK'],synthetic_layout=True,files_changed=files,summary=SUM)
assert d['unstripped_sha256']==sc['candidate_sha256'], 'sha mismatch'
assert d['gains'] and not d['losses'] and not d['raw_losses'] and rv and 'Stack offset' not in log
json.dump(d,open(D+'/delivery.json','w'),indent=1)
print(json.dumps({k:d[k] for k in ('normalized','raw','gains','losses','files_changed')}))
PY
cp $RD $D/README.md
