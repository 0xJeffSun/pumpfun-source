#!/usr/bin/env python3
import sys,subprocess,os,json
from pathlib import Path
args=sys.argv[1:];original=list(args)
if '--crate-name'in args and args[args.index('--crate-name')+1]=='fees_error_renderer':
 args+=['-Zinline-mir=yes','-Zinline-mir-hint-threshold=1000','-Zinline-mir-threshold=500'];Path(os.environ['FEES_RENDERER_LOG']).write_text(json.dumps(dict(original=original,effective=args),indent=2)+'\n')
sys.exit(subprocess.run(args).returncode)
