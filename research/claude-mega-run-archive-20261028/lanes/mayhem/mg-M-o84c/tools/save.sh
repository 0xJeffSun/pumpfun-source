#!/bin/bash
# usage: save.sh ROOTNAME BUILDLABEL DEST(BEST|BEST-partial) "note text"
MW=/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work; L=$MW/mega/mg-M-o84c; D=$L/$3
rm -rf $D; mkdir -p $D
cp -c -R $L/roots/$1 $D/root
(cd $MW/mayhem-env && diff -ru parent-439/programs $D/root/programs | sed "s#$D/root/#b/#") > $D/source.patch
cp $L/out/$2-measure.json $D/measure.json 2>/dev/null
cp $MW/mayhem-b/out/builds/mg-M-o84c-$2/result.json $D/build-result.json
python3 -B $L/tools/wr.py $MW/mayhem-b/out/builds/mg-M-o84c-$2/symbols.so O0081 O0082 O0083 O0084 > $D/winreport.txt
python3 -B $L/tools/sc.py $MW/mayhem-b/out/builds/mg-M-o84c-$2/symbols.so > $D/score.txt
printf '%s\n' "$4" > $D/NOTES.md
echo saved $D; wc -l < $D/source.patch
