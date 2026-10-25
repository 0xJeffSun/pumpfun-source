#!/usr/bin/env python3
"""Standalone read-only static package verifier. Python stdlib only."""
from pathlib import Path
import hashlib,json,sys
sys.dont_write_bytecode=True
P=Path(__file__).resolve().parent
sys.path.insert(0,str(P))
from analyze import analyze
h=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
m=json.loads((P/'manifest.json').read_text())
actual={str(p.relative_to(P)) for p in P.rglob('*') if p.is_file()}
assert actual==set(m)|{'manifest.json'}, ('file allowlist mismatch',actual^ (set(m)|{'manifest.json'}))
for n,v in m.items():
 p=P/n
 assert not p.is_symlink() and p.stat().st_size==v['bytes'] and h(p)==v['sha256'],n
for n,v in json.loads((P/'origins.json').read_text()).items():assert h(P/'inputs'/n)==v['sha256'],n
for prefix in ['prior','legacy']:
 seal=(P/'inputs'/f'{prefix}-MANIFEST.sha256').read_text().split()[0]
 assert h(P/'inputs'/f'{prefix}-manifest-sha256.json')==seal
prior=json.loads((P/'inputs/prior-manifest-sha256.json').read_text())
for local,old in {'candidate.so':'candidate.so','symbols.so':'symbols.so','full-function-inventory.json':'full-function-inventory.json','sharing_update.rs':'source/programs/pump-fees/src/sharing_update.rs','prior-README.md':'README.md'}.items():
 assert h(P/'inputs'/local)==prior[old]['sha256'],local
legacy=json.loads((P/'inputs/legacy-manifest-sha256.json').read_text())
assert h(P/'inputs/original.so')==legacy['inputs/original.so']['sha256']
assert h(P/'inputs/legacy-REPORT.md')==legacy['REPORT.md']['sha256']
ledger=json.loads((P/'inputs/full-function-inventory.json').read_text())
assert len(ledger['original_rows'])==585 and len(ledger['candidate_rows'])==547
assert analyze()==json.loads((P/'impacted-proof.json').read_text())
print('PASS: exact public file set, input hashes, full retained ledger, complete impacted windows, actual edges and regenerated static proof; no build/runtime/whole-original equality claim.')
