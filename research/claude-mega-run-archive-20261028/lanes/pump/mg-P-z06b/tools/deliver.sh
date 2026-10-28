#!/bin/bash
# deliver.sh NN RESNAME SRCDIR "summary"   (cumulative delivery vs L24)
W=/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work; L=$W/lanes/mg-P-z06b
NN=$1; R=$L/res/$2; S=$3; D=$W/deliveries/mg-P-z06b-$NN
[ -e $D ] && { echo exists; exit 1; }
mkdir -p $D
cp -c -R $S $D/src
diff -ruN $W/base/L24/pump $S > $D/patch.diff
cp $R/unstripped.so $R/candidate.so $R/build.log $R/score.json $D/; [ -f $R/README.md ] && cp $R/README.md $D/
python3 -B - "$D" "$4" "$R" "$S" <<'P'
import json,sys,hashlib
D,summ,R,S=sys.argv[1:5]; s=json.load(open(D+'/score.json'))['summary']
nb=json.load(open(R+'/nb.json'))['build']
files=sorted({l.split()[2].replace('/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/base/L24/pump/','') for l in open(D+'/patch.diff') if l.startswith('diff -ruN')})
sha=lambda p: hashlib.sha256(open(p,'rb').read()).hexdigest()
d=dict(lane='mg-P-z06b',base_round="L24",base_unstripped_sha256=sha('/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/base/L24/unstripped.so'),
 unstripped_sha256=sha(D+'/unstripped.so'),normalized=s['normalized'],raw=s['raw'],gains=s['gains'],losses=s['losses'],
 raw_gains=s['raw_gains'],raw_losses=s['raw_losses'],runtime_valid=bool(nb['runtime_valid']) and not nb['stack_warnings'],
 synthetic_layout=True,files_changed=files,summary=summ)
json.dump(d,open(D+'/delivery.json','w'),indent=1); print(json.dumps({k:v for k,v in d.items() if k!='summary'}))
P
