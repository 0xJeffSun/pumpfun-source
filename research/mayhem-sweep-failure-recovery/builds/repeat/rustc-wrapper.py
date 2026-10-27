#!/usr/bin/env python3
import os, sys, json
from pathlib import Path
p=Path(__file__).resolve().parent
compiler, *args=sys.argv[1:]
name=args[args.index('--crate-name')+1] if '--crate-name' in args else None
incoming=args.copy()
macro='/Users/barry/projects/pumpfun-source/work/mayhem-sweep/historical-native-macro-a/target/release/libanchor_attribute_program.dylib'
if name in ('curve_accounts','mayhem_recovered'):
    if name=='curve_accounts':args+=['--extern','historical_anchor_program='+macro]
    args+=['-L','dependency='+str(Path(macro).parent/'deps')]
    (p/(name+'-invocation.json')).write_text(json.dumps(dict(compiler=compiler,incoming=incoming,forwarded=args),indent=2)+'\n')
os.execv(compiler,[compiler,*args])
