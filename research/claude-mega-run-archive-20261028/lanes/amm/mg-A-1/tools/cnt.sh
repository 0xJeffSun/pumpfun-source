#!/bin/bash
# cnt.sh SO ADDR NAME -> one-line summary of normalized diff
d=$(python3 -I ~/amm100-run/lanes/mg-A-1/tools/dis.py diff "$1" "$2" "$3" 2>&1)
echo "$2 $(echo "$d"|head -1) | -$(echo "$d"|grep -c '^-[^-]') +$(echo "$d"|grep -c '^+[^+]')"
