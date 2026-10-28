#!/usr/bin/env python3
"""IR wrapper: for pump_recovered add IRWRAP_EXTRA (default --emit=llvm-ir,link); delegate to the harness wrapper."""
import os,sys
args=sys.argv[1:]
if '--crate-name' in args and args[args.index('--crate-name')+1]=='pump_recovered':
    args=args+os.environ.get('IRWRAP_EXTRA','--emit=llvm-ir,link').split()
os.execv(sys.executable,[sys.executable,'/Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/harness/pump_physical_source_wrapper.py',*args])
