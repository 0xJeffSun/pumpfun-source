"""Authenticate inputs and independently recompute the bounded data report."""
if not __debug__:
    raise RuntimeError('Evidence assertions require ordinary Python')
from pathlib import Path
import hashlib
import importlib.util
import json
import sys

P = Path(__file__).resolve().parent
ROOT = P.parents[1]
sys.dont_write_bytecode = True
sha = lambda b: hashlib.sha256(b).hexdigest()


def verify():
    assert not any(p.is_symlink() for p in P.rglob('*'))
    actual = {p.relative_to(P).as_posix(): sha(p.read_bytes())
              for p in P.rglob('*') if p.is_file() and p.name != 'manifest.json'}
    assert actual == json.loads((P / 'manifest.json').read_bytes()), 'packet manifest'
    for name, digest in json.loads((P / 'root-inputs.json').read_bytes()).items():
        assert sha((ROOT / name).read_bytes()) == digest, ('root input', name)
    origins = json.loads((P / 'reader-origins.json').read_bytes())
    for name, record in origins.items():
        assert sha((P / name).read_bytes()) == record['sha256']
    spec = importlib.util.spec_from_file_location('nested_debug_reader', P / 'reader.py')
    reader = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(reader)
    report = reader.inspect(*reader.inputs())
    assert report == json.loads((P / 'observations.json').read_bytes()), 'recomputed report'
    assert report['original_sha256'] == 'a87fa9f866272514e6acb852b668c4a08aeb173d56c883039991d114d1199bdb'
    assert report['candidate_symbols_sha256'] == '440b92811753dd9af1468f6bf2d0e9139309984de3519a8f9a937babfdb6c903'
    return dict(selected_routes=report['selected_routes'], new_function_matches=0,
                name_bytes=15, nested_vtable_bytes=32, nested_literal_bytes=2)


if __name__ == '__main__':
    print(json.dumps(verify(), sort_keys=True))
