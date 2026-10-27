"""Standard-library-only saved-evidence check. Missing inputs are errors."""
import importlib.util
import json
from pathlib import Path
import sys

sys.dont_write_bytecode = True
P = Path(__file__).resolve().parent
R = P.parents[1]
spec = importlib.util.spec_from_file_location('tagged_audit_verify', P / 'audit.py')
a = importlib.util.module_from_spec(spec)
spec.loader.exec_module(a)


def verify():
    assert not any(path.is_symlink() for path in P.rglob('*'))
    manifest = json.loads((P / 'manifest.json').read_bytes())
    files = {p.relative_to(P).as_posix(): a.digest(p.read_bytes()) for p in P.rglob('*')
             if p.is_file() and p.name != 'manifest.json' and '__pycache__' not in p.parts}
    assert files == manifest
    inputs = json.loads((P / 'inputs.json').read_bytes())
    for path, value in inputs['files'].items():
        assert a.digest((R / path).read_bytes()) == value, path
    report = a.generate()
    assert report == json.loads((P / 'expected.json').read_bytes())
    assert report['summary']['typed_equal'] == report['summary']['references'] == 3
    assert report['kind_names'] == [dict(index=37, bytes=13, payload='UnexpectedEof')] * 2
    assert {r['candidate']['payload_hex'] for r in report['references']
            if r['kind'] == 'tag_zero_static_io_message'} == {b'failed to fill whole buffer'.hex()}
    assert report['references'][1]['candidate']['control_hex'] == 'ff' * 8
    assert all(report['references'][1]['candidate'][field] == 0
               for field in ('bucket_mask', 'growth_left', 'items'))
    print(json.dumps(report['summary'], sort_keys=True))
    return report


if __name__ == '__main__':
    verify()
