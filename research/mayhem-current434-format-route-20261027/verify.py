"""Recompute the bounded formatting route from exact saved ELF inputs."""
from pathlib import Path
import gzip
import hashlib
import importlib.util
import json

if not __debug__:
    raise RuntimeError('Assertions are required')

P = Path(__file__).resolve().parent
R = P.parents[1]
sha = lambda path: hashlib.sha256(path.read_bytes()).hexdigest()


def verify():
    paths = list(P.rglob('*'))
    assert not any(x.is_symlink() for x in paths)
    assert all(x.is_file() or x.is_dir() for x in paths)
    assert {x.relative_to(P).as_posix(): sha(x) for x in paths
            if x.is_file() and x != P / 'manifest.json'} == json.loads((P / 'manifest.json').read_text())
    for name, digest in json.loads((P / 'inputs.json').read_text()).items():
        assert sha(R / name) == digest, name
    spec = importlib.util.spec_from_file_location('bounded_format_route', P / 'reader.py')
    reader = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(reader)
    records = [reader.inspect(tag=tag) for tag in range(1, 26)]
    assert records == json.loads(gzip.decompress((P / 'observations.json.gz').read_bytes()))
    assert {tuple((e['caller'], e['offset'], e['callee']) for e in r['traces'][0]['events'] if e['indirect'])
            for r in records} == {(('fmt_write',672,'string_write_str'),
                                  ('fmt_write',720,'program_error_debug'),
                                  ('formatter_write_str',32,'string_write_str'))}
    return dict(tag_inputs=25, unique_indirect_sites=3, dispatch_observations_per_side=75,
                original_sha256=records[0]['original_sha256'],
                candidate_symbols_sha256=records[0]['candidate_symbols_sha256'],
                compared_counted_literals=26, generic_indirect_closure=False,
                new_function_matches=0, new_builds=0, new_runtime_executions=0,
                whole_elf_equal=False)


if __name__ == '__main__':
    print(json.dumps(verify(), indent=2))
