"""Verify the bounded account-data refinement; no compiler, VM or network."""
from pathlib import Path
import importlib.util, json, hashlib, sys

sys.dont_write_bytecode = True
P = Path(__file__).resolve().parent
R = P.parents[1]
sha = lambda value: hashlib.sha256(value).hexdigest()


def module(name, path):
    spec = importlib.util.spec_from_file_location(name, path)
    result = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(result)
    return result


def verify():
    assert not any(p.is_symlink() for p in P.rglob('*'))
    manifest = {f.relative_to(P).as_posix(): sha(f.read_bytes()) for f in P.rglob('*')
                if f.is_file() and f.name != 'manifest.json' and '__pycache__' not in f.parts}
    assert json.loads((P / 'manifest.json').read_bytes()) == manifest
    for name, digest in json.loads((P / 'inputs.json').read_bytes()).items():
        assert sha((R / name).read_bytes()) == digest, name
    module('extent_source_parent', R / 'research/mayhem-sell-quote-call-recovery/verify.py').verify(runtime=False)
    generated = module('account_extent_analysis', P / 'analysis.py').generate()
    for name, data in generated.items():
        assert (P / name).read_bytes() == data, name
    report = json.loads(generated['audit.json'])
    assert report['summary'] == {'references_reexamined': 59, 'new_typed_equal': 56,
                                 'new_typed_different': 0, 'still_unresolved': 3,
                                 'total_typed_equal': 153, 'total_typed_different': 0}
    assert report['candidate_sha256'] == 'fa4f81eb1d5953eb7f31b83bf783f7fc4f89b9573f1403b7c4e1efab76f763c4'
    rows = report['references']
    assert len({(r['id'], r['candidate_body'], r['offset']) for r in rows}) == 59
    assert len({r['original_target'] for r in rows if r['equal'] is True}) == 29
    assert [(r['id'], r['offset'], r['original_target']) for r in rows if r['equal'] is None] == [
        ('O0116', 512, 0xb1220), ('O0116', 5216, 0xb1340), ('O0184', 880, 0xb1220)]
    assert report['baseline']['unmatched_direct_edges'] == [
        {'id': 'O0185', 'offset': 416, 'original': 534840, 'candidate': 53864, 'equal': False}]
    result = dict(report['summary'], newly_bounded_original_objects=29,
                  compiled_artifact_changed=False, compiler_executed=False,
                  target_executed=False, new_complete_function_matches=0)
    print(json.dumps(result, indent=2))
    return result


if __name__ == '__main__':
    verify()
