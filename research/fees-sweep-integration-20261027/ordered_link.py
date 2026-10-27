#!/usr/bin/env python3
from pathlib import Path
import sys,subprocess,json,hashlib
W=Path('/workspace/fees-recovery');args=sys.argv[1:];replaced=0;previous=[]
for i,arg in enumerate(args):
 if i and args[i-1]in ['-T','--script']:
  p=Path(arg);previous.append(dict(path=arg,sha256=hashlib.sha256(p.read_bytes()).hexdigest()));args[i]=str(W/'rebound.ld');replaced+=1
 elif arg.startswith('--script='):
  p=Path(arg.split('=',1)[1]);previous.append(dict(path=str(p),sha256=hashlib.sha256(p.read_bytes()).hexdigest()));args[i]='--script='+str(W/'rebound.ld');replaced+=1
if replaced!=1:raise ValueError(('script count',replaced))
(W/'ordered-link.json').write_text(json.dumps(dict(args=args,previous_scripts=previous,ordered_script_sha256=hashlib.sha256((W/'rebound.ld').read_bytes()).hexdigest()),indent=2)+'\n')
sys.exit(subprocess.run(['/workspace/toolchains/v1.44/rust/lib/rustlib/x86_64-unknown-linux-gnu/bin/rust-lld',*args]).returncode)
