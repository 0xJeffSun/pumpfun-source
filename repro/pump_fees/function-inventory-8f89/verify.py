#!/usr/bin/env python3
"""Portable stdlib-only check. No network, compiler or program/runtime execution."""
from pathlib import Path
import hashlib
import json
import sys
import tarfile

sys.dont_write_bytecode = True
W = Path(__file__).resolve().parent
sha = lambda b: hashlib.sha256(b).hexdigest()
read = lambda p: json.loads(p.read_text())

manifest = read(W/'manifest-sha256.json')
actual = {str(p.relative_to(W)) for p in W.rglob('*') if p.is_file() and p != W/'manifest-sha256.json'}
assert actual == set(manifest), ('file inventory', sorted(actual ^ set(manifest)))
for name, digest in manifest.items():
    assert sha((W/name).read_bytes()) == digest, ('manifest', name)
inputs = read(W/'inputs.json')
for name, row in inputs.items():
    b = (W/name).read_bytes()
    assert sha(b) == row['sha256'] and len(b) == row['bytes'], ('input', name)

public = read(W/'inputs/current/manifest-sha256.json')
prior = read(W/'inputs/prior/manifest-sha256.json')
for name in inputs:
    if name.startswith('inputs/current/') and not name.endswith('/manifest-sha256.json'):
        leaf = name.removeprefix('inputs/current/')
        assert public[leaf] == inputs[name]['sha256'], ('current published binding', leaf)
    if name.startswith('inputs/prior/') and not name.endswith('/manifest-sha256.json'):
        leaf = name.removeprefix('inputs/prior/')
        # The old seal covers inputs.json; the ELF digests live in that map.
        if leaf not in ['candidate.so', 'symbols.so']:
            assert prior[leaf] == inputs[name]['sha256'], ('prior published binding', leaf)
for name in ['elf_reader.py', 'dependency_reader.py']:
    assert (W/name).read_bytes() == (W/'inputs/prior'/name).read_bytes()
prior_inputs = read(W/'inputs/prior/inputs.json')
assert sha((W/'inputs/original.so').read_bytes()) == prior_inputs['original.so']['sha256']
for name in ['candidate.so', 'symbols.so']:
    assert sha((W/'inputs/prior'/name).read_bytes()) == prior_inputs[name]['sha256']

source_map = read(W/'inputs/current/source-sha256.json')
assert len(source_map) == 26
with tarfile.open(W/'inputs/current/source-snapshot.tar.gz') as archive:
    members = archive.getmembers()
    assert all(m.isfile() for m in members)
    assert len(members) == len(source_map) and {m.name for m in members} == set(source_map)
    for member in members:
        assert sha(archive.extractfile(member).read()) == source_map[member.name], ('source snapshot', member.name)

from analyze import run
computed = run()
for filename, result in computed.items():
    assert result == read(W/filename), ('recomputed', filename)
catalog = computed['catalog.json']
assert len(catalog['original_rows']) == 585 and len(catalog['candidate_rows']) == 548
assert all(r['historical_function_name'] is None for r in catalog['original_rows'])
assert computed['comparison.json']['prior_method_reproduction']['prior_all_pair_and_immediate_call_results_reproduced']
print(json.dumps(dict(status='PASS', sealed_files=len(manifest), whole_input_files=len(inputs),
                      source_snapshot_files=len(source_map), summary=catalog['summary'],
                      all_prior_and_current_rows_recomputed=True, builds=0, runtime_cases=0), indent=2))
