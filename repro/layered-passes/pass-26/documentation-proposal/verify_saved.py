"""Check unapplied documentation proposals only; no repository writes or execution."""
from pathlib import Path
import hashlib
import json

P = Path(__file__).resolve().parent
H = lambda b: hashlib.sha256(b).hexdigest()
m = json.loads((P / 'manifest.json').read_bytes())
assert (P / 'manifest.sha256').read_text() == H((P / 'manifest.json').read_bytes()) + '  manifest.json\n'
assert set(m['files']) == {str(p.relative_to(P)) for p in P.rglob('*') if p.is_file() and p not in [P / 'manifest.json', P / 'manifest.sha256']}
for n, r in m['files'].items():
    b = (P / n).read_bytes()
    assert H(b) == r['sha256'] and len(b) == r['bytes']
v = json.loads((P / 'proposal.json').read_bytes())
assert v['status'] == 'UNAPPLIED_REQUIRES_ACCEPTED_AMM_PUBLIC_SELECTION_AND_FINAL_INDEX'
assert v['active_changes_performed'] is False and v['all_execution_exclusions_retained'] is True
assert [r['path'] for r in v['paths']] == ['README.md', 'docs/COMPLETION.md', 'docs/BUILD_IDENTITY_AUDIT.md']
for r in v['paths']:
    before, after = (P / 'before' / r['path']).read_bytes(), (P / 'proposed' / r['path']).read_bytes()
    assert H(before) == r['before_sha256'] and H(after) == r['after_sha256']
    assert len(before) == r['before_bytes'] and len(after) == r['after_bytes'] and r['applied'] is False
    if r['path'].startswith('docs/'):
        assert after.endswith(before) and b'## Historical checkpoint notes' in after
    assert b'0/4 core programs' in after and b'140/150' in after
    assert b'09bee0dfd751dc6a' in after and b'ca5d4f54b14e2f67' in after
print(json.dumps({'result': 'PASS_UNAPPLIED_DOCUMENTATION', 'paths': len(v['paths']),
                  'historical_document_bodies_retained': True, 'current_selection_applied': False}))
