#!/usr/bin/env python3
from pathlib import Path
import hashlib,json,os,sys
P=Path(__file__).resolve().parent;real=Path('/home/shawwalters.guest/amm436-linux/sdk/rust/lib/rustlib/x86_64-unknown-linux-gnu/bin/rust-lld');before=sys.argv[1:];after=before.copy();changes=0
for i,arg in enumerate(before):
 if arg in ('--script','-T'):
  p=Path(before[i+1]);assert p.read_bytes()==(P/'default.ld').read_bytes();after[i+1]=str(P/'ordered.ld');changes+=1
 elif arg.startswith('--script='):
  p=Path(arg.split('=',1)[1]);assert p.read_bytes()==(P/'default.ld').read_bytes();after[i]='--script='+str(P/'ordered.ld');changes+=1
assert changes==1
(P/'invocation.json').write_text(json.dumps(dict(incoming=before,forwarded=after,real=str(real),real_sha256=hashlib.sha256(real.read_bytes()).hexdigest(),script_sha256=hashlib.sha256((P/'ordered.ld').read_bytes()).hexdigest()),indent=2)+'\n')
os.execv(real,[str(real),*after])
