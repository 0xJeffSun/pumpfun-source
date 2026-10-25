"""Verify complete saved metadata only. No decoder, compiler, VM or network."""
from pathlib import Path
import gzip
import hashlib
import json

P = Path(__file__).resolve().parent
H = lambda b: hashlib.sha256(b).hexdigest()
J = lambda n: json.loads((P / n).read_bytes())
m = J('manifest.json')
assert (P / 'manifest.sha256').read_text() == H((P / 'manifest.json').read_bytes()) + '  manifest.json\n'
assert set(m['files']) == {
    str(p.relative_to(P)) for p in P.rglob('*')
    if p.is_file() and p not in [P / 'manifest.json', P / 'manifest.sha256']
}
for n, r in m['files'].items():
    p = P / n
    assert not p.is_symlink() and p.is_relative_to(P)
    b = p.read_bytes()
    assert H(b) == r['sha256'] and len(b) == r['bytes'], n
refs = J('input-references.json')
assert refs['known_public_package_seal'] == 'f5d514664d47a04cc22282fdd19ca9e01d835c8a335aa9acc3f637fc61650acc'
public_raw = (P / 'retained/public-manifest.json').read_bytes()
assert H(public_raw) == refs['known_public_package_seal']
public = json.loads(public_raw)
for r in refs['copies']:
    b = (P / r['copy']).read_bytes()
    assert H(b) == r['sha256'] == public[r['public_path'].split('compiler-v154-main/', 1)[1]]
    assert len(b) == r['bytes']
v = json.loads(gzip.decompress((P / 'retained/complete-inventory.json.gz').read_bytes()))
o, c = v['original_rows'], v['candidate_rows']
assert v['candidate_sha256'] == refs['selected_candidate'] == 'ca5d4f54b14e2f67c4eca56fcac29b54801906cecf23c463801916fd9d6b6621'
assert v['original_sha256'] == refs['original'] == 'a87fa9f866272514e6acb852b668c4a08aeb173d56c883039991d114d1199bdb'
actions = J('all441-actions.json')
assert len(actions) == len(o) == 441
for r, a in zip(o, actions, strict=True):
    for k in ['id', 'start', 'end', 'raw_sha256', 'category', 'prior_status', 'scope', 'fresh_normalized_matches']:
        assert a[k] == r[k]
    assert a['body_admitted'] == (r['body_analysis'] is not None)
    expected = ('exclude stopped initializer' if r['category'] == 'explicitly stopped' else
                'retain opaque; separate bounded evidence required' if r['body_analysis'] is None else
                'review existing admitted handler contracts' if not r['fresh_normalized_matches'] else
                'bounded pattern only; retain call/data/ownership and byte identity obligations')
    assert a['next_action'] == expected and a['owner'] == 'root/mayhem'
    if r['category'] == 'explicitly stopped':
        assert r['body_analysis'] is None and r['fresh_normalized_matches'] == []
    if r['body_analysis'] is not None:
        assert r['body_analysis']['raw_sha256'] == r['raw_sha256']
        assert (r['body_analysis']['start'], r['body_analysis']['end']) == (r['start'], r['end'])
counts = {
    'original_windows': len(o), 'admitted': sum(r['body_analysis'] is not None for r in o),
    'opaque': sum(r['body_analysis'] is None for r in o),
    'normalized_original_matches': sum(bool(r['fresh_normalized_matches']) for r in o),
    'admitted_unmatched': sum(r['body_analysis'] is not None and not r['fresh_normalized_matches'] for r in o),
    'stopped_original_windows': sum(r['category'] == 'explicitly stopped' for r in o),
    'candidate_grouped_windows': len(c), 'candidate_opaque': sum(r['body_analysis'] is None for r in c),
    'candidate_match_windows': sum(bool(r['fresh_normalized_matches']) for r in c),
    'helper_summary': J('retained/helper-results.json')['builds']['v154_retarget']['summary'],
}
assert counts == J('MEASURED.json')
assert [counts[k] for k in ['admitted', 'opaque', 'normalized_original_matches', 'admitted_unmatched', 'stopped_original_windows']] == [184, 257, 177, 7, 1]
assert refs['new_original_or_candidate_decodes'] == 0
assert J('preparation-first-failure.json')['returncode'] == 1
assert J('ROOT-ACQUISITION.json')['new_decoder_build_VM_network_or_active_source_change'] is False
print(json.dumps({'result': 'PASS_SAVED_METADATA_ONLY', 'counts': counts,
                  'all_original_records_retained': True, 'new_decodes_builds_VM': 0,
                  'whole_byte_identity': False}, indent=2))
