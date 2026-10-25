#!/usr/bin/env python3
"""Replay frozen static-only checks with transparent input-path substitutions."""
from pathlib import Path
import sys
sys.dont_write_bytecode=True
P=Path(__file__).resolve().parent
W=P/'inputs/repro/pump_amm/update-event-borrow-v144'
sys.path.insert(0,str(P));sys.argv=['static-check','--verify']
for name in ['static_compare.py','verify_update_data.py','verify_serializers.py']:
 source=(W/name).read_text()
 source=source.replace("W=Path(__file__).resolve().parent", "W="+repr(str(W))+";W=Path(W)")
 source=source.replace("W/'scratch/inputs/evidence/original/pump_amm/deployed.so'", "Path("+repr(str(P/'inputs/evidence/original/pump_amm/deployed.so'))+")")
 source=source.replace("W/'scratch/inputs/evidence/upstream/pump_amm.json'", "Path("+repr(str(P/'inputs/evidence/upstream/pump_amm.json'))+")")
 exec(compile(source,name,'exec'),{'__name__':'__main__','__file__':str(W/name)})
