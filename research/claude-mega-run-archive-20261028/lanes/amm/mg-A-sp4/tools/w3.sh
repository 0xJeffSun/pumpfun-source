#!/bin/bash
# w3.sh SO : diff summary (plain + all-masked) for the 3 lane windows (first existing symbol alternative is used)
T=$(dirname $0); SO=$1
names=$(python3 -I -c "
import types,sys
from pathlib import Path
T=Path.home()/'amm100-run/shared/tools'
m=types.ModuleType('e');p=T/'elf_reader_src.py';m.__file__=str(p);exec(compile(p.read_bytes(),str(p),'exec'),m.__dict__)
e=m.Elf(Path('$SO'));ns=[f['name'] for f in e.funcs]
alts={'0x26da8':['transfer_creator_fees_to_pump6legacy','29transfer_creator_fees_to_pump17h','18pump_amm_recovered29transfer_creator_fees_to_pump17h'],
'0x28dd0':['transfer_creator_fees_to_pump2v2','32transfer_creator_fees_to_pump_v217h','18pump_amm_recovered32transfer_creator_fees_to_pump_v2'],
'0x2e720':['14extend_account7execute','14extend_account7execute','6extend7execute','18pump_amm_recovered14extend_account17h']}
for w,al in alts.items():
  for a in al:
    if any(a in n and '__global' not in n for n in ns): print(w,a);break
  else: print(w,'NONE')
")
echo "$names" | while read w n; do
 a=$(python3 -I $T/nd.py $SO $w $n | sed -E 's/.*diff ([0-9]+) mset ([0-9]+).*/\1\/\2/')
 b=$(MS=1 MR=1 MJ=1 python3 -I $T/nd.py $SO $w $n | cut -c1-120)
 echo "$w plain $a | allmasked: $b"
done
