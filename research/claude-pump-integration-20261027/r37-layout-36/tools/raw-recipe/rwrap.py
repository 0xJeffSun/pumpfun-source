#!/usr/bin/env python3
"""[mg-P-raw] RUSTC_WRAPPER chain: for the root pump cdylib only, add -C linker=plink.py (link-only hook;
codegen and every dependency invocation are unchanged), then exec the harness physical-source wrapper."""
import os, sys
compiler, args = sys.argv[1], sys.argv[2:]
name = args[args.index('--crate-name') + 1] if '--crate-name' in args else None
kinds = [args[i + 1] for i, v in enumerate(args[:-1]) if v == '--crate-type']
if name == os.environ.get('PRAW_ROOT', 'pump_recovered') and 'cdylib' in kinds:
    args = args + ['-C', 'linker=' + os.environ['PRAW_LINKER']]
phys = os.environ['PRAW_PHYS']
os.execv(phys, [phys, compiler, *args])
