#!/usr/bin/env python3
"""Lane wrapper: delegate to the harness wrapper; for the pump-recovered crate add IR emission / save-temps
(IRWRAP_EXTRA env, space separated; default '--emit=llvm-ir -Csave-temps'). Codegen of the .so is unchanged."""
import os,sys
args=sys.argv[1:]
if '--crate-name' in args and args[args.index('--crate-name')+1]=='pump_recovered':
    args=args+os.environ.get('IRWRAP_EXTRA','--emit=llvm-ir -Csave-temps').split()
os.execv(sys.executable,[sys.executable,'/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/harness/pump_physical_source_wrapper.py',*args])
