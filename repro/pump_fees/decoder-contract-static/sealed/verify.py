"""Verify saved static evidence without builds or program execution."""
from pathlib import Path
import hashlib
import json
import sys

W = Path(__file__).resolve().parent
R = next(p for p in W.parents if (p/'evidence/original/pump_fees/deployed.so').is_file())
sha = lambda b: hashlib.sha256(b).hexdigest()
load = lambda p: json.loads(p.read_text())
manifest = load(W/'manifest-sha256.json')
assert set(manifest) == {str(p.relative_to(W)) for p in W.rglob('*') if p.is_file() and p != W/'manifest-sha256.json' and '__pycache__' not in p.parts}
for path, digest in manifest.items():
    assert sha((W/path).read_bytes()) == digest, path
inputs = load(W/'inputs.json')
for row in inputs:
    assert sha((W/row['copy']).read_bytes()) == row['sha256']
    p = Path(row['path'])
    if not p.is_absolute():
        assert sha((R/p).read_bytes()) == row['sha256'], row['path']
sources = load(W/'inputs/repro/pump_fees/readme-provenance-v144/source-sha256.json')
for p,digest in sources.items():
    assert sha((R/p).read_bytes()) == digest, p
assert len(sources) == 22
assert sha((R/'work/fees-update-admin-closure/manifest-sha256.json').read_bytes()) == '7a26472979b224873680a7ab5612a916e7bbe56d2262f42abcb0de32ca23b64f'
for p,digest in load(R/'work/fees-update-admin-closure/manifest-sha256.json').items():
    assert sha((R/'work/fees-update-admin-closure'/p).read_bytes()) == digest
sys.path.insert(0,str(W))
from analyze import make_report
report = make_report()
assert report == load(W/'analysis.json')
for name, body in report['bodies'].items():
    lines = (W/(name+'.asm')).read_text().splitlines()
    decoded = []
    for line in lines:
        parts = line.split('\t')
        if len(parts) < 3 or not parts[0].strip().endswith(':'):
            continue
        decoded.append((int(parts[0].strip()[:-1])*8, bytes.fromhex(parts[1]).hex()))
    assert decoded == [(i['pc'],i['raw_hex']) for i in body['instructions']], name
print(json.dumps(dict(files=len(manifest), input_records=len(inputs), current_source_inputs=len(sources),
                      exact_assembly_ranges=len(report['bodies']), matched_direct_callees=4,
                      original_direct_decoder_callers=2, candidate_direct_decoder_callers=2,
                      allocation_threshold_pairs=3, program_changes=0, new_runtime_cases=0,
                      actionable_behavioral_correction_proven=False, full_semantic_equivalence_proven=False),indent=2))
