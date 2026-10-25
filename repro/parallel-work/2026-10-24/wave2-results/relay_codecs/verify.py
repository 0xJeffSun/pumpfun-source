#!/usr/bin/env python3
"""Portable integrity + static operand verification; no build/emulation/runtime."""
import hashlib, json, sys
from pathlib import Path
sys.dont_write_bytecode = True
ROOT = Path(__file__).resolve().parent
sys.path.insert(0,str(ROOT))
from analyze import derive
manifest=json.loads((ROOT/'manifest.json').read_text())
for name,item in manifest['files'].items():
    path=ROOT/name
    assert path.is_file() and not path.is_symlink(),name
    raw=path.read_bytes()
    assert len(raw)==item['bytes'],name
    assert hashlib.sha256(raw).hexdigest()==item['sha256'],name
actual={str(p.relative_to(ROOT)) for p in ROOT.rglob('*') if p.is_file()}
assert actual==set(manifest['files'])|{'manifest.json'},actual-set(manifest['files'])
e=derive()
assert e==json.loads((ROOT/'static-evidence.json').read_text())
source=(ROOT/'wire.rs').read_text()
for a in e['accounts']:
    assert '['+','.join(map(str,a['discriminator']))+']' in source
    assert '&b['+str(a['minimum_bytes'])+'..]' in source
assert 'pub fn mint_whitelist' not in source
print(json.dumps({'status':'PASS','verification':'hash integrity, full-window byte decoding, static operand assertions, IDL discriminator consistency, source literal checks','rust_compiled_or_executed':False,'sbf_executed_or_emulated':False,'semantic_equivalence_proved':False},sort_keys=True))
