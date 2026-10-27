"""Verify the Rust source, complete layout permutation, and bounded observations."""
from pathlib import Path
import argparse
import contextlib
import difflib
import gzip
import hashlib
import importlib.util
import io
import json
import sys
import tempfile

sys.dont_write_bytecode = True
P = Path(__file__).resolve().parent
ROOT = P.parents[1]
PARENT = ROOT / 'research/mayhem-provider-sharing'
CHANGED = ['src/instructions/buy.rs', 'src/instructions/mod.rs',
           'src/instructions/pump_interface.rs', 'src/instructions/pump_interface_v2.rs',
           'src/instructions/sell.rs', 'src/instructions/sell_v2.rs', 'src/state.rs']
sha = lambda b: hashlib.sha256(b).hexdigest()


def raw(path):
    data = path.read_bytes()
    return gzip.decompress(data) if path.suffix == '.gz' else data


def load(path):
    return json.loads(raw(path))


def module(name, path):
    spec = importlib.util.spec_from_file_location(name, path)
    result = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(result)
    return result


def source_inputs(parent):
    before = parent.archive(PARENT / 'source.tar.gz')
    after = parent.archive(P / 'source.tar.gz')
    assert len(before) == 66 and len(after) == 67
    assert {n: sha(b) for n, b in after.items()} == load(P / 'source-inputs.json')
    changed = sorted(n for n in before.keys() | after.keys() if before.get(n) != after.get(n))
    assert changed == CHANGED
    patch = ''.join(''.join(difflib.unified_diff(
        before.get(n, b'').decode().splitlines(True), after.get(n, b'').decode().splitlines(True),
        fromfile='a/' + n, tofile='b/' + n)) for n in changed)
    assert patch.encode() == raw(P / 'source.patch')
    assert after['src/state.rs'].count(b'native_mint::id()') == 1
    return after


def layout_check(translation, maps):
    before = translation.sections(maps / 'unqualified.map')
    after = translation.sections(maps / 'recovered.map')
    plan = load(P / 'config/plan.json')['ordered']
    ident = lambda r: (r.get('owner', r.get('file')).rsplit('/', 1)[-1], r['section'])
    a, b = ({ident(r): r for r in rows} for rows in [before, after])
    assert len(a) == len(b) == len(plan) == 447 and a.keys() == b.keys()
    assert len({ident(r) for r in plan}) == 447
    assert [ident(r) for r in plan] == [ident(r) for r in after]
    for row in plan:
        old = a[ident(row)]
        assert (row['address'], row['size']) == (old['address'], old['size'])
    selector = lambda r: '*' + ident(r)[0].replace('(', ':').removesuffix(')')
    default = raw(P / 'config/default.ld').decode()
    old = '  .text : { *(.text*) } :text'
    assert default.count(old) == 1
    expected = default.replace(old, '  .text : {\n' + '\n'.join(
        '    ' + selector(r) + '(' + json.dumps(r['section']) + ')' for r in plan)
        + '\n    *(.text*)\n  } :text')
    assert expected.encode() == raw(P / 'config/ordered.ld')
    assert after == translation.sections(maps / 'repeat.map')


def verify(root=ROOT):
    root = Path(root).resolve()
    files = list(P.rglob('*'))
    assert not any(p.is_symlink() for p in files)
    assert all(p.is_dir() or p.is_file() for p in files)
    assert {str(p.relative_to(P)): sha(p.read_bytes()) for p in files
            if p.is_file() and p != P / 'manifest.json'} == load(P / 'manifest.json')
    assert load(P / 'parent.json') == {'path': 'research/mayhem-provider-sharing',
                                      'manifest_sha256': sha((PARENT / 'manifest.json').read_bytes())}
    parent = module('trade_parent', PARENT / 'verify.py')
    with contextlib.redirect_stdout(io.StringIO()):
        parent.verify(root)
    sources = source_inputs(parent)
    for name in ['reader.py', 'analysis.py', 'progress.py', 'translation.py', 'build.py']:
        assert raw(P / name) == raw(PARENT / name)
    parent_launch = load(PARENT / 'builds/recovered/launch.json')
    outputs = {}
    for role in ['unqualified', 'recovered', 'repeat']:
        launch = load(P / f'builds/{role}/launch.json')
        result = load(P / f'builds/{role}/result.json')
        assert launch['controller_sha256'] == sha(raw(P / 'build.py'))
        assert launch['source_inputs'] == {n: sha(b) for n, b in sources.items()}
        assert launch['checked_tools'] == parent_launch['checked_tools']
        assert launch['target_inputs'] == parent_launch['target_inputs']
        assert result['returncode'] == 0
        assert all(result[n] for n in ['source_unchanged', 'tools_unchanged', 'target_libraries_unchanged'])
        for name in ['stdout', 'stderr']:
            assert sha(raw(P / f'builds/{role}/{name}.gz')) == result[name + '_sha256']
        log = raw(P / f'builds/{role}/stderr.gz')
        assert log.count(b'--crate-name mayhem_recovered ') == 1
        if role == 'unqualified':
            assert log.count(b'--crate-name ') == 165
        command = launch['command']
        for flag in ['--release', '--locked', '--offline', '--verbose']:
            assert flag in command
        assert command[command.index('--target') + 1] == 'sbpf-solana-solana'
        assert command[command.index('--jobs') + 1] == '2'
        args = command[command.index('--') + 1:]
        assert args[:2] == ['--remap-path-prefix=src/=programs/mayhem-program/src/',
                            '--remap-path-prefix=src/account_wrapper.rs=src/account_wrapper.rs']
        assert len(args) == (3 if role == 'unqualified' else 4)
        assert args[-1].startswith('-Clink-arg=-Map=')
        if role != 'unqualified':
            assert args[2].startswith('-Clinker=') and args[2].endswith('/linker.py')
            invocation = load(P / f'config/{role}/invocation.json')
            assert invocation['real_sha256'] == '79b0272b505cb5084ef6d160ea7e773ba0b2bd861c4c1af454a97e9c1cddc6af'
            a, b = invocation['incoming'], invocation['forwarded']
            assert len(a) == len(b)
            changed = [i for i, (x, y) in enumerate(zip(a, b)) if x != y]
            assert len(changed) == 1
            i = changed[0]
            assert (i and a[i-1] in ['-T', '--script']) or a[i].startswith('--script=')
            assert invocation['script_sha256'] == sha(raw(P / 'config/ordered.ld'))
        outputs[role] = {name: raw(P / f'artifacts/{role}/{name}.so.gz') for name in ['candidate', 'symbols']}
        for name, data in outputs[role].items():
            assert sha(data) == result[name + '_sha256']
    assert outputs['recovered'] == outputs['repeat']
    assert sha(outputs['recovered']['candidate']) == '64da456052f6c359b5841e8e91c59db64a8e8778cf944fa13a158b141039c1ad'
    translation = module('trade_translation', P / 'translation.py')
    with tempfile.TemporaryDirectory() as td:
        t = Path(td)
        for role, images in outputs.items():
            for name, data in images.items():
                (t / f'{role}-{name}').write_bytes(data)
            (t / f'{role}.map').write_bytes(raw(P / f'maps/{role}.map.gz'))
        proofs = [translation.compare(t / f'unqualified-{name}', t / f'recovered-{name}',
                                      t / 'unqualified.map', t / 'recovered.map', name + '.so')
                  for name in ['symbols', 'candidate']]
        assert proofs == load(P / 'translation.json')
        # Layout helpers read plaintext maps; keep decompression ephemeral.
        for role in outputs:
            target = t / 'maps' / f'{role}.map'
            target.parent.mkdir(exist_ok=True)
            target.write_bytes(raw(P / f'maps/{role}.map.gz'))
        layout_check(translation, t / 'maps')
        reader = module('trade_reader', P / 'reader.py')
        original = reader.Elf(root / 'evidence/original/mayhem/deployed.so')
        candidate = reader.Elf(t / 'recovered-symbols')
        baseline = raw(PARENT / 'artifacts/recovered/symbols.so.gz')
        progress = module('trade_progress', P / 'progress.py').compare(original.b, baseline, candidate.b)
        assert progress == load(P / 'progress.json')
        assert (progress['matches'], progress['raw_matches']) == (429, 100)
        assert progress['gains'] == ['O0095']
        rows = load(PARENT / 'audit.json')['rows']
        ow = {r['start']: original.window(r['start'], r['end']) for r in rows}
        cw = {s['value']: candidate.window(s['value'], s['value'] + s['size'])
              for s in candidate.symbols if s['info'] & 15 == 2 and s['size'] >= 8
              and candidate.lo <= s['value'] < candidate.hi}
        body = {'handlers': module('trade_handlers', P / 'handlers.py').inspect(original, candidate, rows),
                'validator': module('trade_validator', P / 'validator.py').inspect(original, candidate, ow, cw)}
        assert body == load(P / 'body-proof.json')
    generated = module('trade_analysis', P / 'analysis.py').generate(root)
    assert all(raw(P / name) == value for name, value in generated.items())
    runtime = module('trade_runtime', P / 'runtime_check.py').verify(root, P)
    assert runtime == load(P / 'runtime-summary.json')
    return {'candidate_sha256': sha(outputs['recovered']['candidate']),
            'normalized': 429, 'raw': 100, 'unmatched': 12, 'compiled_sections': 447,
            'typed_validator_references': 14, 'trade_Source_records': 21,
            'trade_CPI_origins': 3, 'runtime': runtime, 'whole_original_equal': False}


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--repository-root', type=Path, default=ROOT)
    args = parser.parse_args()
    print(json.dumps(verify(args.repository_root), indent=2))
