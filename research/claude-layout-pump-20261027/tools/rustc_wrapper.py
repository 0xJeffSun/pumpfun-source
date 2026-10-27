#!/usr/bin/env python3
"""RUSTC_WRAPPER used by build.py.

Every rustc invocation is forwarded unchanged through the repository's
scripts/pump_physical_source_wrapper.py (the archived Round recipe's wrapper).
Only the root crate's cdylib invocation (LAYOUT_ROOT_CRATE) additionally receives
`-C linker=<this directory>/linker.py`. Cargo never sees that argument, so
`-C metadata`, symbol hashes, fingerprints and every compiled object are the
same as in the archived recipe. The linker hook only changes which linker
script rust-lld receives (see linker.py).
"""
import os
import sys
from pathlib import Path

physical = os.environ['LAYOUT_PHYSICAL_WRAPPER']
rustc, args = sys.argv[1], sys.argv[2:]
crate_types = [args[i + 1] for i, a in enumerate(args[:-1]) if a == '--crate-type']
crate_name = next((args[i + 1] for i, a in enumerate(args[:-1]) if a == '--crate-name'), None)
if 'cdylib' in crate_types and crate_name == os.environ['LAYOUT_ROOT_CRATE']:
    args = args + ['-C', 'linker=' + str(Path(__file__).resolve().parent / 'linker.py')]
os.execv(sys.executable, [sys.executable, physical, rustc, *args])
