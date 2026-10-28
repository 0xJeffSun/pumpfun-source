#!/usr/bin/env python3
"""Compile probe.rs for a (rustc, sysroot, target) and print the StringError (Error::type_id) and
fmt::Error/NoPayload (Any::type_id) TypeId constants found in the emitted asm.
usage: probe_typeids.py <label> <rustc> <target> [sysroot]"""
import re, subprocess, sys, os
L = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
label, rustc, target = sys.argv[1:4]
sysroot = sys.argv[4] if len(sys.argv) > 4 else None
out = f'{L}/probe/{label}-{target}.s'
cmd = [rustc, '--edition', '2021', '--crate-type', 'lib', '--target', target, '-C', 'opt-level=3', '-C', 'panic=abort',
       '--emit=asm', '-o', out, f'{L}/probe/probe.rs']
if sysroot: cmd += ['--sysroot', sysroot]
r = subprocess.run(cmd, capture_output=True, text=True)
if r.returncode: print(label, target, 'FAILED', r.stderr[-800:]); sys.exit(1)
asm = open(out).read()
res = {}
for m in re.finditer(r'^(_ZN[^:\s]*type_id[^:\s]*):\n((?:\t.*\n)+?)\.Lfunc_end', asm, re.M):
    name, body = m.group(1), m.group(2)
    vals = [int(x) & (2**64 - 1) for x in re.findall(r'lddw r2, (-?\d+)', body)]
    kind = 'Error' if 'error5Error' in name else 'Any'
    if len(vals) == 2: res[kind] = f'hi={vals[0]:016x} lo={vals[1]:016x}'
print(f'{label:6} {target:22} StringError[{res.get("Error")}]  fmt::Error-Any[{res.get("Any")}]')
