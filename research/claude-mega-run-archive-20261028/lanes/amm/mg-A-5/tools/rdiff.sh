#!/bin/bash
# residual diff: ignores lddw imms, call targets, jump labels
python3 -I ~/amm100-run/shared/tools/dis.py diff "$1" "$2" "$3" | sed -E 's/<[^>]*>//; s/lddw (r[0-9]+), 0x[0-9a-f]+/lddw \1, X/; s/call .*/call X/' > /tmp/sell-r1-rd.$$ 
python3 -I - "$1" "$2" "$3" <<'PY'
import sys,difflib,subprocess,re
out=subprocess.run(['python3','-I','/Users/shawwalters/amm100-run/shared/tools/dis.py','diff',*sys.argv[1:4]],capture_output=True,text=True).stdout
PY
