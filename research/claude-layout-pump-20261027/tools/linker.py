#!/usr/bin/env python3
"""Linker hook for the root cdylib link (installed by rustc_wrapper.py).

Forwards rustc's linker arguments unchanged to the SDK's rust-lld, except:
  * the target's embedded default linker script (passed by rustc as a temp file)
    is replaced by LAYOUT_LINKER_SCRIPT when that variable is set; the default
    script must equal tools/default.ld byte for byte, and the replacement must be
    default.ld with only the `.text` input-section list expanded;
  * `-Map=<record>/link.map` is appended so the build records input-section
    placement.
The compiler-generated object inputs are copied into the record directory so a
link can be repeated exactly (relink.py). No object, archive or output byte is
edited; rust-lld resolves every address, call displacement and relocation.
"""
import hashlib
import json
import os
import shutil
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
real = os.environ['LAYOUT_REAL_LINKER']
record = Path(os.environ['LAYOUT_RECORD_DIR'])
record.mkdir(parents=True, exist_ok=True)
replacement = os.environ.get('LAYOUT_LINKER_SCRIPT') or None
sha = lambda b: hashlib.sha256(b).hexdigest()
default_text = (HERE / 'default.ld').read_bytes()
if replacement:
    from layout_script import check_script
    check_script(default_text.decode(), Path(replacement).read_text())

before = sys.argv[1:]
after = list(before)
substitutions = []


def take(path):
    data = Path(path).read_bytes()
    assert data == default_text, 'rustc default linker script differs from tools/default.ld'
    (record / 'default.ld').write_bytes(data)
    substitutions.append(path)
    return replacement or path


for i, arg in enumerate(before):
    if arg in ('--script', '-T'):
        after[i + 1] = take(before[i + 1])
    elif arg.startswith('--script='):
        after[i] = '--script=' + take(arg.split('=', 1)[1])
assert len(substitutions) == 1, substitutions
after.append('-Map=' + str(record / 'link.map'))

objects = {}
(record / 'inputs').mkdir(exist_ok=True)
for arg in before:
    path = arg.split('=', 1)[1] if arg.startswith('--version-script=') else arg
    p = Path(path)
    if (path.endswith('.o') or arg.startswith('--version-script=')) and p.is_file():
        dest = record / 'inputs' / p.name
        shutil.copy2(p, dest)
        objects[path] = {'copy': str(dest), 'sha256': sha(dest.read_bytes())}

(record / 'linker-invocation.json').write_text(json.dumps({
    'incoming': before,
    'forwarded': after,
    'real_linker': real,
    'real_linker_sha256': sha(Path(real).read_bytes()),
    'default_script_sha256': sha(default_text),
    'replacement_script': replacement,
    'replacement_script_sha256': sha(Path(replacement).read_bytes()) if replacement else None,
    'object_inputs': objects,
}, indent=2) + '\n')
os.execv(real, [real, *after])
