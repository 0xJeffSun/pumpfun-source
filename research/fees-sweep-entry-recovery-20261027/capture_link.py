#!/usr/bin/env python3
from pathlib import Path
import os,sys,shutil,json,hashlib,subprocess
W=Path('/workspace/fees-recovery');D=W/'link-capture';D.mkdir(exist_ok=True);args=sys.argv[1:];inputs={}
for arg in args:
 p=Path(arg)
 if p.is_file() and p.suffix in ['.o','.rlib']:
  inputs[arg]=hashlib.sha256(p.read_bytes()).hexdigest()
  if p.suffix=='.o':shutil.copyfile(p,D/p.name)
(D/'link.json').write_text(json.dumps(dict(args=args,inputs=inputs),indent=2)+'\n')
r=subprocess.run(['/workspace/toolchains/v1.44/rust/lib/rustlib/x86_64-unknown-linux-gnu/bin/rust-lld',*args]);sys.exit(r.returncode)
