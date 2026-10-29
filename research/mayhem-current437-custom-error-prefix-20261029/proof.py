"""Verify the counted Custom ProgramError formatting prefix only."""
from pathlib import Path
import gzip, hashlib, importlib.util, json, struct
if not __debug__: raise RuntimeError('Assertions required')
P = Path(__file__).resolve().parent
PRIOR = 'research/mayhem-current437-bounded-error-strings-20261029'
HELPER = 'research/mayhem-current437-rust-panic-messages-20261029'
sha = lambda b: hashlib.sha256(b).hexdigest()

def module(root, path):
    spec = importlib.util.spec_from_file_location('prior_packet', root / path / 'proof.py')
    m = importlib.util.module_from_spec(spec); spec.loader.exec_module(m)
    return m

def inspect(root, original, candidate):
    prior = module(root, PRIOR)
    helper = module(root, HELPER)
    _, a, b = helper.images(root, original, candidate)
    expected = b'Custom program error: '
    assert len(expected) == 22
    rows = []
    for image, desc, pointer in ((a, 731784, 720306), (b, 712224, 700746)):
        descriptor = helper.descriptor(image, desc, pointer, len(expected))
        payload = helper.rodata_bytes(image, pointer, len(expected))
        assert payload == expected
        rows.append(dict(descriptor=desc, pointer=pointer, length=len(expected), descriptor_hex=descriptor.hex(), bytes_hex=payload.hex()))
    # The previously closed Display owner loads this descriptor for the Custom arm.
    before = prior.prior(root).prior(root)
    bundle = before.images(root, original, candidate)
    base = before.inspect(root / prior.prior(root).PRIOR, original, candidate, root)
    pairs = {tuple(p) for p in base['active_pairs']}
    assert (664640, 598320) in pairs
    for side, owner, target in (('original',664640,731784), ('candidate',598320,712224)):
        window = bundle[side+'_windows'][owner]
        refs = [r for r in window['data_references'] if r['target'] == target]
        assert len(refs) == 1 and refs[0]['offset'] == 664
    return dict(original=rows[0], candidate=rows[1], owner_pair=[664640,598320], descriptor_reference_offset=664, intervals=[[720306,720328]])

def delta(root, report):
    old = module(root, PRIOR)
    base = json.loads((root/PRIOR/'coverage-delta.json').read_bytes())
    helper = module(root, HELPER)
    sections = []
    for s in base['sections']:
        raw = helper.union(s['raw_intervals'] + (report['intervals'] if s['section']=='.rodata' else []))
        mapped = s['mapped_intervals']; covered = helper.union(raw + mapped)
        n = helper.measure(covered)
        sections.append(dict(section=s['section'], total_bytes=s['total_bytes'], raw_intervals=raw, mapped_intervals=mapped, covered_intervals=covered, raw_equal_bytes=helper.measure(raw), pointer_only_bytes=n-helper.measure(raw), covered_bytes=n, new_bytes=n-s['covered_bytes']))
    assert [s['new_bytes'] for s in sections] == [22,0]
    return dict(scope='Only the 22-byte counted descriptor payload; no descriptor, padding or adjacent allocation credit.', prior_delta_sha256=sha((root/PRIOR/'coverage-delta.json').read_bytes()), baseline_payload_bytes=20747, sections=sections, new_payload_bytes=22, payload_covered_bytes=20769, payload_total_bytes=26180)

def images(root):
    return module(root, PRIOR).prior(root).images(root)

def check(packet, root):
    paths = list(packet.rglob('*'))
    assert all(not p.is_symlink() and (p.is_file() or p.is_dir()) for p in paths)
    assert {str(p.relative_to(packet)):sha(p.read_bytes()) for p in paths if p.is_file() and p.name != 'manifest.json'} == json.loads((packet/'manifest.json').read_bytes())
    pins = json.loads((packet/'inputs.json').read_bytes())
    for path, digest in pins.items():
        q = Path(path); assert not q.is_absolute() and '..' not in q.parts
        assert sha((root/q).read_bytes()) == digest
    for p in (root/PRIOR).rglob('*'):
        if p.is_file(): assert str(p.relative_to(root)) in pins
    module(root, PRIOR).check(root/PRIOR, root)
    report = inspect(root, *images(root))
    assert report == json.loads(gzip.decompress((packet/'observations.json.gz').read_bytes()))
    assert delta(root, report) == json.loads((packet/'coverage-delta.json').read_bytes())
    return dict(new_bytes=22, interval=[720306,720328], payload_covered=20769, payload_total=26180)

def seal(root):
    report = inspect(root, *images(root))
    (P/'observations.json.gz').write_bytes(gzip.compress(json.dumps(report,separators=(',',':')).encode(),mtime=0))
    (P/'coverage-delta.json').write_text(json.dumps(delta(root,report),indent=2)+'\n')
    (P/'manifest.json').write_text(json.dumps({str(p.relative_to(P)):sha(p.read_bytes()) for p in sorted(P.rglob('*')) if p.is_file() and p.name != 'manifest.json'},indent=2)+'\n')
