"""Freeze the fresh focused handoff before broader integration testing."""
from pathlib import Path
from importlib.metadata import version
import hashlib
import json
import platform
import shutil
import sys
import tarfile
import solders

W = Path(__file__).resolve().parent
R = W.parents[1]
H = W / 'focused-handoff'
H.mkdir(exist_ok=False)
sha = lambda p: hashlib.sha256(p.read_bytes()).hexdigest()
build = json.loads((W / 'build/build-comparison.json').read_text())
source = build['source_sha256']
for path, digest in source.items():
    p = R / path
    assert sha(p) == digest
    dest = H / 'source' / p.relative_to(W / 'crate')
    dest.parent.mkdir(parents=True, exist_ok=True)
    shutil.copy2(p, dest)
with tarfile.open(H / 'source.tar.gz', 'w:gz') as archive:
    for p in sorted((H / 'source').rglob('*')):
        if p.is_file():
            archive.add(p, arcname='crate/' + str(p.relative_to(H / 'source')))

idl = json.loads((R / 'evidence/upstream/pump.json').read_text())
names = json.loads((R / 'work/pump-quote-control-inventory.json').read_text())['six_draft_handlers']
instructions = [i for i in idl['instructions'] if i['name'] in names]
assert len(instructions) == 6
for ix in instructions:
    assert bytes(ix['discriminator']) == hashlib.sha256(('global:' + ix['name']).encode()).digest()[:8]
review = {'scope': 'Captured interface and source review for the six independent quote-control handlers.',
          'idl_sha256': sha(R / 'evidence/upstream/pump.json'),
          'instructions': instructions,
          'types': [t for t in idl['types'] if 'QuoteControl' in t['name']],
          'layout': {'header_with_discriminator_bytes': 108, 'mint_entry_bytes': 40,
                     'initial_capacity': 50, 'maximum_mints': 256},
          'source_review': 'Account order, signer/writable declarations, seeds, argument order, event fields, Global authority and PumpError use agree with captured IDL and unchanged current main types. Fresh original/candidate receipts validate bounded behaviors.',
          'native_mint_dependency': {'path': 'work/fees-v144-cargo-home/registry/src/index.crates.io-6f17d22bba15001f/spl-token-2022-6.0.0/src/native_mint.rs',
                                     'sha256': sha(R / 'work/fees-v144-cargo-home/registry/src/index.crates.io-6f17d22bba15001f/spl-token-2022-6.0.0/src/native_mint.rs')}}
(H / 'interface-review.json').write_text(json.dumps(review, indent=2) + '\n')

copies = {p.name: p for p in W.glob('*.py')}
copies.update({name: W / name for name in ['README.md', 'source-provenance.json', 'quote-control.patch',
               'focused.json.gz', 'focused.log', 'strict-functions.json', 'verification.json', 'build-console.log']})
copies.update({'build/' + name: W / 'build' / name for name in ['build-attempt.json', 'build-comparison.json', 'build.log']})
copies.update({'candidate.so': W / 'build/artifacts/pump_recovered.so',
               'candidate-unstripped.so': W / 'build/target/sbf-solana-solana/release/pump_recovered.so',
               'historical-inventory.json': R / 'work/pump-quote-control-inventory.json'})
helpers = ['scripts/build_partial_candidate.py', 'scripts/build_source_manifest.py', 'scripts/compare.py', 'scripts/analyze.py']
fixtures = ['evidence/original/pump/deployed.so', 'evidence/upstream/pump.json',
            'research/imported-lab/analysis/pump_fun/config-snapshot.json']
for p in helpers:
    copies['harness/' + p] = R / p
for p in fixtures:
    copies['fixtures/' + p] = R / p
for target, origin in copies.items():
    dest = H / target
    dest.parent.mkdir(parents=True, exist_ok=True)
    shutil.copy2(origin, dest)
environment = {'python': sys.version, 'platform': platform.platform(), 'solders_version': version('solders'),
               'solders_extension_sha256': {str(p): sha(p) for p in Path(solders.__file__).parent.glob('*.so')},
               'harness_sha256': {str(p.relative_to(R)): sha(p) for p in [*[R / x for x in helpers], *W.glob('*.py')]},
               'fixture_sha256': {p: sha(R / p) for p in fixtures},
               'candidate_sha256': sha(H / 'candidate.so')}
(H / 'inputs.json').write_text(json.dumps(environment, indent=2) + '\n')
manifest = {str(p.relative_to(H)): sha(p) for p in sorted(H.rglob('*')) if p.is_file()}
(H / 'manifest.json').write_text(json.dumps(manifest, indent=2) + '\n')
for p, digest in manifest.items():
    assert sha(H / p) == digest
print(json.dumps({'path': str(H.relative_to(R)), 'files': len(manifest), 'manifest_sha256': sha(H / 'manifest.json')}))
