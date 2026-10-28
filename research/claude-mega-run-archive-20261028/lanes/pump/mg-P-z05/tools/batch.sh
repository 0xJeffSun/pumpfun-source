#!/bin/bash
# batch.sh <win> <symregex> <variant...> : build variants (v/<name>) in parallel (work, work2..work6), print ok/score + ratio
L=/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-z05
w=$1; s=$2; shift 2
i=0
for v in "$@"; do
  i=$((i+1)); wd=$L/work$i; [ $i = 1 ] && wd=$L/work
  $L/tools/nb.sh $L/v/$v $wd $v > /dev/null &
done
wait
for v in "$@"; do
  r=$(python3 -c "import json;d=json.load(open('$L/out/$v.json'));b=d['build'];s=d.get('score',{});print(b['ok'],b['runtime_valid'],s.get('normalized'),'L=',s.get('losses'),'G=',s.get('gains'),'RL=',s.get('raw_losses'),d.get('errors','')[:2] if not b['ok'] else '')")
  echo "$v $r"
  [[ $r == True* ]] && $L/tools/rat.sh $w "$s" $v
done
