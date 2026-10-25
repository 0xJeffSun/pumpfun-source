"""Self-contained verification of preserved static evidence; no program execution."""
from pathlib import Path
import hashlib
import json
import sys
import tarfile

sys.dont_write_bytecode = True
P = Path(__file__).resolve().parent
W = P/'sealed'
sha = lambda b: hashlib.sha256(b).hexdigest()
load = lambda p: json.loads(p.read_text())
metadata = load(P/'publication.json')
manifest = load(P/'manifest-sha256.json')
assert set(manifest) == {str(p.relative_to(P)) for p in P.rglob('*') if p.is_file() and p != P/'manifest-sha256.json' and '__pycache__' not in p.parts}
for path,digest in manifest.items():
    assert sha((P/path).read_bytes()) == digest, path
assert sha((W/'manifest-sha256.json').read_bytes()) == metadata['sealed_manifest_sha256'] == '0ce158df076d1a73b6b6d36061d99225c2f73abf7a5729f6aea6ff4ffe57c536'
sealed = load(W/'manifest-sha256.json')
assert len(sealed) == metadata['sealed_files'] == 28
assert set(sealed) == {str(p.relative_to(W)) for p in W.rglob('*') if p.is_file() and p != W/'manifest-sha256.json' and '__pycache__' not in p.parts}
for path,digest in sealed.items():
    assert sha((W/path).read_bytes()) == digest

def archive_bytes(path):
    with tarfile.open(path,'r:gz') as archive:
        members = archive.getmembers()
        assert all(m.isfile() for m in members)
        assert len({m.name for m in members}) == len(members)
        return {m.name:archive.extractfile(m).read() for m in members}

assert sha((P/'sealed-review.tar.gz').read_bytes()) == metadata['archive_sha256']
archived = archive_bytes(P/'sealed-review.tar.gz')
assert set(archived) == set(sealed) | {'manifest-sha256.json'}
for path,body in archived.items():
    assert body == (W/path).read_bytes()
inputs = load(W/'inputs.json')
assert len(inputs) == 16
for row in inputs:
    assert sha((W/row['copy']).read_bytes()) == row['sha256']

assert sha((P/'dependencies/update-admin-closure.tar.gz').read_bytes()) == metadata['closure_archive_sha256']
closure = archive_bytes(P/'dependencies/update-admin-closure.tar.gz')
assert sha(closure['manifest-sha256.json']) == metadata['closure_manifest_sha256'] == '7a26472979b224873680a7ab5612a916e7bbe56d2262f42abcb0de32ca23b64f'
closure_manifest = json.loads(closure['manifest-sha256.json'])
assert len(closure_manifest) == 44
assert set(closure) == set(closure_manifest) | {'manifest-sha256.json'}
for path,digest in closure_manifest.items():
    assert sha(closure[path]) == digest
assert closure['manifest-sha256.json'] == (W/'inputs/work/fees-update-admin-closure/manifest-sha256.json').read_bytes()
sources = load(W/'inputs/repro/pump_fees/readme-provenance-v144/source-sha256.json')
assert len(sources) == 22
for path,digest in sources.items():
    assert sha(closure['inputs/current-source/'+path]) == digest
assert closure['inputs/current-source/programs/pump-fees/src/types.rs'] == (W/'inputs/programs/pump-fees/src/types.rs').read_bytes()

# Permit only the documented path/output adaptations of the preserved scripts.
reader = (W/'inputs/work/fees-update-admin-closure/inputs/elf_reader.py').read_text()
before = "REPO=next(p for p in Path(__file__).resolve().parents if (p/'evidence/original/pump_fees/deployed.so').is_file())"
assert reader.count(before) == 1
assert (P/'portable/elf_reader.py').read_text() == reader.replace(before,'REPO=Path(__file__).resolve().parent')
analysis = (W/'analyze.py').read_text()
analysis = analysis.replace('W = Path(__file__).resolve().parent',"W = Path(__file__).resolve().parent.parent / 'sealed'")
analysis = analysis.replace('sys.path.insert(0, str(I))','sys.path.insert(0, str(Path(__file__).resolve().parent))')
analysis = analysis.replace("    (W/'analysis.json').write_text(json.dumps(make_report(),indent=2)+'\\n')","    print(json.dumps(make_report(),indent=2))")
assert (P/'portable/analyze.py').read_text() == analysis
sys.path.insert(0,str(P/'portable'))
from analyze import make_report
report = make_report()
assert report == load(W/'analysis.json')
for name,body in report['bodies'].items():
    decoded = []
    for line in (W/(name+'.asm')).read_text().splitlines():
        parts = line.split('\t')
        if len(parts) < 3 or not parts[0].strip().endswith(':'):
            continue
        decoded.append((int(parts[0].strip()[:-1])*8,bytes.fromhex(parts[1]).hex()))
    assert decoded == [(i['pc'],i['raw_hex']) for i in body['instructions']], name
print(json.dumps(dict(publication_files=len(manifest), sealed_files=len(sealed),
                      sealed_manifest_sha256=metadata['sealed_manifest_sha256'],
                      input_records=len(inputs), frozen_source_inputs=len(sources),
                      closure_archive_files=len(closure_manifest), assembly_ranges=6,
                      matched_direct_callees=4, direct_decoder_callers_per_elf=2,
                      threshold_pairs=3, new_runtime_cases=0, program_source_changes=0,
                      behavioral_correction_proven=False, full_equivalence_proven=False),indent=2))
