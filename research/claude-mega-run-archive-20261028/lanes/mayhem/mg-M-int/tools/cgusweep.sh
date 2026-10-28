#!/bin/zsh
# usage: cgusweep.sh N...  -> parent-438 tree + [profile.release.package.anchor-lang] codegen-units=N, WM wrapper build, dynsym + measure
WM=/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work; W=$WM/mega/mg-M-int
for N in "$@"; do
  R=$W/roots/cgu$N
  if [ ! -d $R ]; then mkdir -p $R && cp -R $WM/mayhem-env/parent-438/programs $R/ && chmod -R u+w $R && printf "\n[profile.release.package.anchor-lang]\ncodegen-units = $N\n" >> $R/programs/mayhem/Cargo.toml; fi
  L=mgMint-cgu$N-a; rm -rf $WM/mayhem-b/out/builds/$L
  LANE_CLEAN_ANCHOR=1 $W/tools/build.sh $L $R mg-M-int-cgu16 > /dev/null 2>&1
  B=$WM/mayhem-b/out/builds/$L
  [ -f $B/candidate.so ] || { echo "N=$N BUILD FAILED"; continue; }
  python3 -B $WM/mayhem-b/build/measure.py $B/symbols.so $WM/mayhem-b/out/builds/o0077-ir-r1-v1/symbols.so --json $W/measure/cgu$N-vs-p438.json > /dev/null
  python3 -B - $B/candidate.so $W/measure/cgu$N-vs-p438.json $N <<'PY'
import json, sys, subprocess
d = json.load(open(sys.argv[2]))
out = subprocess.run([sys.executable, '-B', '/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work/mega/mg-M-int/tools/dynsym.py', sys.argv[1]], capture_output=True, text=True).stdout
import ast; names = [x[1] for x in ast.literal_eval(out.split(' ', 1)[1])]
print('N=%s dynsym7/8=%s/%s matched=%d raw=%d body_losses=%s edge_losses=%d no_losses=%s' % (sys.argv[3], names[7], names[8], d['counts']['matched_after'], d['counts']['raw_after'], d['body_losses'], len(d['edge_losses']), d['no_losses']))
PY
done
