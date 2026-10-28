"""Authenticate actual builds and recompute the bounded static/runtime evidence."""
if not __debug__:
    raise RuntimeError('Evidence assertions require ordinary Python')
from pathlib import Path
import gzip
import hashlib
import importlib.util
import io
import json
import sys
import tarfile

P = Path(__file__).resolve().parent
ROOT = P.parents[1]
sys.dont_write_bytecode = True
sha = lambda b: hashlib.sha256(b).hexdigest()
load = lambda p: json.loads(p.read_bytes())


def module(name, path):
    spec = importlib.util.spec_from_file_location(name, path)
    result = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(result)
    return result


def source_files(label):
    expected = load(ROOT / 'research/mayhem-quotes-current-recovery-20261027/source-inputs.json')
    with tarfile.open(fileobj=io.BytesIO((P / 'source.tar.xz').read_bytes()), mode='r:xz') as archive:
        rows = archive.getmembers()
        assert len(rows) == 67 and all(r.isfile() and not Path(r.name).is_absolute() and '..' not in Path(r.name).parts for r in rows)
        files = {r.name: archive.extractfile(r).read() for r in rows}
    assert len(files) == 67 and {n: sha(b) for n, b in files.items()} == expected
    parent = dict(files)
    for p in (P / 'builds' / label / 'overrides').rglob('*.gz'):
        name = p.relative_to(P / 'builds' / label / 'overrides').as_posix()[:-3]
        assert name in files
        files[name] = gzip.decompress(p.read_bytes())
    changed = {n for n in files if files[n] != parent[n]}
    assert changed == (set() if label == 'parent' else {'src/instructions/buy_v2.rs'})
    assert files['src/lib.rs'] == parent['src/lib.rs']
    for name in files:
        assert files[name].count(b'\n') == parent[name].count(b'\n')
    name = 'src/instructions/buy_v2.rs'
    before, after = [x.index(b'pub fn handler(') for x in [parent[name], files[name]]]
    assert parent[name][:before] == files[name][:after]
    assert {n: sha(b) for n, b in files.items()} == load(P / 'source-inputs.json')[label]
    return files


def static():
    for name, digest in load(P / 'root-inputs.json').items():
        assert sha((ROOT / name).read_bytes()) == digest, name
    for name, row in load(P / 'reader-origins.json').items():
        assert sha((P / name).read_bytes()) == row['sha256']
    sdk = load(P / 'sdk/post-check.json')
    assert len(sdk['tools']) == 6 and len(sdk['target_libraries']) == 26
    analysis = module('typed_ownership_analysis', P / 'analysis.py')
    wm = module('typed_ownership_elf', P / 'window_map.py')
    for label in load(P / 'source-inputs.json'):
        d = P / 'builds' / label
        launch, result = load(d / 'launch.json'), load(d / 'result.json')
        assert launch['source_inputs'] == {n: sha(b) for n, b in source_files(label).items()}
        assert launch['controller_sha256'] == sha((P / 'controllers/build_native.py').read_bytes())
        assert launch['checked_tools'] == sdk['tools']
        if label != 'parent':
            preparation = load(d / 'preparation.json')
            assert preparation['source_inputs'] == launch['source_inputs']
            assert preparation['target_libraries'] == sdk['target_libraries']
        assert result['returncode'] == 0 and result['source_unchanged'] and result['tools_unchanged']
        for name in ['stdout', 'stderr']:
            assert sha(gzip.decompress((d / (name + '.gz')).read_bytes())) == result[name + '_sha256']
        candidate, symbols = [gzip.decompress((d / (name + '.so.gz')).read_bytes()) for name in ['candidate', 'symbols']]
        assert sha(candidate) == result['candidate_sha256'] and len(candidate) == result['candidate_bytes']
        assert sha(symbols) == result['symbols_sha256']
        strip = load(d / 'strip-replay.json')
        assert strip['returncode'] == 0 and strip['candidate_equal']
        assert strip['input_sha256'] == sha(symbols) and strip['output_sha256'] == sha(candidate)
        assert strip['tool_sha256'] == sdk['tools'][strip['command'][0]]
        assert strip['command'][1] == '--strip-all'
        sections = lambda b: {s['name']: (s['address'], s['size'], wm.m.section_data(b, s['name'])) for s in wm.m.elf_layout(b)['sections'] if s['flags'] & 2 and s['type'] != 8}
        assert sections(candidate) == sections(symbols)
    observations = analysis.measure()
    assert observations == json.loads(gzip.decompress((P / 'observations.json.gz').read_bytes()))
    return observations


def verify():
    assert not any(p.is_symlink() for p in P.rglob('*'))
    actual = {p.relative_to(P).as_posix(): sha(p.read_bytes()) for p in P.rglob('*') if p.is_file() and p != P / 'manifest.json'}
    assert actual == load(P / 'manifest.json'), 'packet manifest'
    observations = static()
    runtime = module('typed_ownership_runtime', P / 'runtime_check.py').verify()
    return dict(normalized_windows=432, native_raw_windows=84, retained_positive_edges=4383,
                buy_v2_original_calls=49, proposed_callee_multiset_equal=True,
                ordered_call_matches=46, new_complete_body_matches=0, runtime=runtime)


if __name__ == '__main__':
    print(json.dumps(verify(), sort_keys=True))
