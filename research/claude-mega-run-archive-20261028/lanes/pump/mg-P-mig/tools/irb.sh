#!/bin/bash
# irb.sh <variant_dir> <tag> : IR build (work-ir), copies module to llx/<tag>.ll and execute body to llx/<tag>_exec.ll
W=/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work; L=$W/lanes/mg-P-mig
python3 -B $L/tools/irbuild.py --src $1 --work $L/work-ir --out $L/out/$2ir > $L/out/$2ir.log 2>&1 || { tail -5 $L/out/$2ir.log; exit 1; }
cp $L/work-ir/target-identity/sbpf-solana-solana/release/deps/pump_recovered.ll $L/llx/$2.ll
python3 - "$L/llx/$2.ll" "$L/llx/$2_exec.ll" "${3:-migrate_v27execute17h}" <<'PY'
import re,sys
t=open(sys.argv[1]).read()
m=[mm.start() for mm in re.finditer(r'^define [^\n]*'+re.escape(sys.argv[3]), t, re.M)]
s=m[0]; e=t.index('\n}\n',s)+3
open(sys.argv[2],'w').write(t[s:e]); print(len(t[s:e].splitlines()),'lines')
PY
