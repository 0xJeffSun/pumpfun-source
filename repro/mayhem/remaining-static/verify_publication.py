#!/usr/bin/env python3
"""Verify the static-only Mayhem inventory and its frozen input provenance."""
from pathlib import Path
import gzip,hashlib,json
ROOT=Path(__file__).resolve().parent
REPO=next(p for p in ROOT.parents if (p/'evidence/original/mayhem/deployed.so').is_file())
def sha(b):return hashlib.sha256(b).hexdigest()
for rel,expected in json.loads((ROOT/'artifact-hashes.json').read_text()).items():assert sha((ROOT/rel).read_bytes())==expected,rel
p=json.loads((ROOT/'publication-provenance.json').read_text());x=json.loads((ROOT/'static-evidence.json').read_text());b=(REPO/'evidence/original/mayhem/deployed.so').read_bytes()
assert sha(b)==x['binary_sha256']==p['original_input_sha256']['evidence/original/mayhem/deployed.so']
for original,published in [('programs/mayhem/src/lib.rs','inputs/mayhem-lib.rs'),('repro/status.json','inputs/status.json'),('evidence/dispatch-map.json','inputs/dispatch-map.json')]:assert sha((ROOT/published).read_bytes())==p['original_input_sha256'][original],published
assert sha(gzip.decompress((ROOT/p['disassembly_excerpt']['path']).read_bytes()))==p['disassembly_excerpt']['decompressed_sha256']
for w in x['instruction_windows']:
 raw=b[w['file_offset_start']:w['file_offset_end']]
 assert raw.hex()==w['hex'] and sha(raw)==w['sha256'],w['label']
for w in x['literal_evidence']:assert b[w['offset']:w['offset']+w['length']].decode()==w['text']
for s in x['sources']:assert sha((ROOT/s['bundled_file']).read_bytes())==s['sha256']
state=json.loads((ROOT/'inputs/status.json').read_text());remaining=json.loads((ROOT/'remaining-dispatch.json').read_text());assert len(state['mayhem']['implemented_handlers'])==17 and len(remaining)==8
assert len(remaining['burn_tokens']['direct_calls'])==4
assert not (ROOT/'initialize_mayhem_state-wrapper.asm').exists()
print('PASS: all publication hashes, frozen 17-handler inputs, eight remaining instructions, exact evidence windows and source references; no SBF execution')
