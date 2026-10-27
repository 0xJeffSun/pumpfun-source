#!/usr/bin/env python3
import os, sys, json
from pathlib import Path
p=Path(__file__).resolve().parent
args=sys.argv[1:]; incoming=args.copy(); changes=0
for i,arg in enumerate(incoming):
    if arg in ('--script','-T'):
        (p/'default.ld').write_bytes(Path(incoming[i+1]).read_bytes())
        args[i+1]=str(p/'ordered.ld'); changes+=1
    elif arg.startswith('--script='):
        (p/'default.ld').write_bytes(Path(arg.split('=',1)[1]).read_bytes())
        args[i]='--script='+str(p/'ordered.ld'); changes+=1
assert changes==1
(p/'linker-invocation.json').write_text(json.dumps(dict(incoming=incoming,forwarded=args),indent=2)+'\n')
real='/Users/barry/projects/pumpfun-source/work/mayhem-recovery/verified-sdk/rust/lib/rustlib/aarch64-apple-darwin/bin/rust-lld'
os.execv(real,[real,*args])
