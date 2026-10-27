"""Verify saved source-sharing builds and bounded evidence; no build or VM execution."""
from pathlib import Path, PurePosixPath
import argparse
import difflib
import gzip
import hashlib
import importlib.util
import io
import json
import re
import tarfile
import tempfile
import sys

sys.dont_write_bytecode = True
P = Path(__file__).resolve().parent
ROOT = P.parents[1]
PARENT = 'research/mayhem-initializer-source-origins'
sha = lambda b: hashlib.sha256(b).hexdigest()
raw = lambda p: gzip.decompress(p.read_bytes()) if p.suffix == '.gz' else p.read_bytes()
load = lambda p: json.loads(raw(p))


def module(name, path):
    s = importlib.util.spec_from_file_location(name, path)
    m = importlib.util.module_from_spec(s)
    s.loader.exec_module(m)
    return m


def archive(path):
    result = {}
    with tarfile.open(fileobj=io.BytesIO(path.read_bytes()), mode='r:gz') as t:
        for member in t.getmembers():
            n = PurePosixPath(member.name)
            assert member.isfile() and not n.is_absolute() and '..' not in n.parts
            assert str(n) == member.name and member.name not in result
            result[member.name] = t.extractfile(member).read()
    return result


def sources(root):
    before = archive(root / PARENT / 'source.tar.gz')
    after = archive(P / 'source.tar.gz')
    assert before.keys() == after.keys() and len(after) == 66
    assert {n: sha(b) for n, b in after.items()} == load(P / 'source-inputs.json')
    changed = sorted(n for n in before if before[n] != after[n])
    assert changed == ['Cargo.lock', 'Cargo.toml', 'curve-accounts/Cargo.toml',
                       'curve-accounts/src/lib.rs', 'src/instructions/buy_pump_swap.rs',
                       'src/instructions/sell_pump_swap.rs']
    patch = ''.join(''.join(difflib.unified_diff(before[n].decode().splitlines(True),
                                               after[n].decode().splitlines(True),
                                               fromfile='a/' + n, tofile='b/' + n)) for n in changed)
    assert patch.encode() == raw(P / 'source.patch')
    assert after['src/state.rs'] == before['src/state.rs']
    assert b'[profile.release.package.solana-stake-interface]\ncodegen-units = 2' in after['Cargo.toml']
    assert b'pub use anchor_spl::token_interface;' in after['curve-accounts/src/lib.rs']
    return after


def manifest(directory):
    actual = {str(p.relative_to(directory)): sha(p.read_bytes()) for p in directory.rglob('*')
              if p.is_file() and p != directory / 'manifest.json'}
    assert not any(p.is_symlink() for p in directory.rglob('*'))
    assert actual == load(directory / 'manifest.json')


def runtime(root, candidate):
    unqualified = raw(root / PARENT / 'artifacts/unqualified/candidate.so.gz')
    init = module('provider_init_runtime', P / 'runtime_check.py').verify(root, candidate, unqualified)
    assert init == load(P / 'initializer-runtime-summary.json')
    admit = module('provider_trade_runtime', root / 'research/mayhem-accounting-extend-recovery/verify.py')
    summaries = []
    trim = lambda a: [x for x in a['metadata']['logs'] if not re.fullmatch(r'Program \S+ consumed \d+ of \d+ compute units', x)]
    names = sorted(f'{action}-amm-{family}' for action in ('buy', 'sell') for family in ('native', 'token', 'token22'))
    assert sorted(p.name.removesuffix('.json.gz') for p in (P / 'runtime/amm').glob('*.json.gz')) == names
    commands = load(P / 'runtime/amm/commands.json')
    assert sorted(commands) == names
    for name in names:
        report = load(P / f'runtime/amm/{name}.json.gz')
        prior = load(root / f'research/mayhem-qualified-linker-layout/runtime/{name}.json.gz')
        summaries.append(admit.check_trade_receipts(name, report, candidate, root))
        assert len(report['cases']) == len(prior['cases'])
        assert commands[name]['returncode'] == 0 and commands[name]['report_sha256'] == sha(raw(P / f'runtime/amm/{name}.json.gz'))
        for a, b in zip(prior['cases'], report['cases']):
            assert a['case'] == b['case']
            assert a['original']['transaction_base64'] == b['original']['transaction_base64']
            assert trim(a['original']) == trim(b['original']) and trim(a['candidate']) == trim(b['candidate'])
    amm = dict(families=summaries, total_cases=sum(s['cases'] for s in summaries),
               total_signed_records=sum(s['signed_transaction_records'] for s in summaries),
               checked_fields_and_noncompute_diagnostics_equal_to_parent=True)
    assert amm == load(P / 'amm-runtime-summary.json')
    assert (amm['total_cases'], amm['total_signed_records']) == (2496, 4992)
    return dict(initializer=init, amm=amm)


def verify(root=ROOT, check_runtime=True):
    root = Path(root).resolve()
    manifest(P)
    for n, digest in load(P / 'external-inputs.json').items():
        assert sha((root / n).read_bytes()) == digest, n
    module('provider_parent', root / PARENT / 'verify.py').verify(root, runtime=False)
    inputs = sources(root)
    for n in ('reader.py', 'analysis.py', 'progress.py', 'build.py', 'runtime_check.py', 'runtime/replay.py'):
        assert raw(P / n) == raw(root / PARENT / n), n
    outputs = {}
    parent_launch = load(root / PARENT / 'builds/recovered/launch.json')
    for role in ('unqualified', 'recovered', 'repeat'):
        launch, result = load(P / f'builds/{role}/launch.json'), load(P / f'builds/{role}/result.json')
        assert launch['source_inputs'] == {n: sha(b) for n, b in inputs.items()}
        assert launch['checked_tools'] == parent_launch['checked_tools']
        assert launch['target_inputs'] == parent_launch['target_inputs']
        assert result['returncode'] == 0
        assert all(result[k] for k in ('source_unchanged', 'tools_unchanged', 'target_libraries_unchanged'))
        for n in ('stdout', 'stderr'):
            assert sha(raw(P / f'builds/{role}/{n}.gz')) == result[n + '_sha256']
        log = raw(P / f'builds/{role}/stderr.gz')
        assert log.count(b'--crate-name mayhem_recovered ') == 1
        if role != 'unqualified':
            assert launch['controller_sha256'] == sha(raw(P / 'build.py'))
            args = launch['command'][launch['command'].index('--') + 1:]
            assert len(args) == 4 and args[:2] == [
                '--remap-path-prefix=src/=programs/mayhem-program/src/',
                '--remap-path-prefix=src/account_wrapper.rs=src/account_wrapper.rs']
            assert args[2].startswith('-Clinker=') and args[2].endswith('/linker.py')
            assert args[3].startswith('-Clink-arg=-Map=')
            invocation = load(P / f'config/{role}/invocation.json')
            assert invocation['real_sha256'] == '79b0272b505cb5084ef6d160ea7e773ba0b2bd861c4c1af454a97e9c1cddc6af'
            before, after = invocation['incoming'], invocation['forwarded']
            diffs = [i for i, (a, b) in enumerate(zip(before, after)) if a != b]
            assert len(before) == len(after) and len(diffs) == 1
            i = diffs[0]
            assert (i and before[i-1] in ('-T', '--script')) or before[i].startswith('--script=')
            assert invocation['script_sha256'] == sha(raw(P / 'config/ordered.ld'))
        outputs[role] = {n: raw(P / f'artifacts/{role}/{n}.so.gz') for n in ('candidate', 'symbols')}
        for n, data in outputs[role].items():
            assert sha(data) == result[n + '_sha256']
    assert outputs['recovered'] == outputs['repeat']
    assert sha(outputs['recovered']['candidate']) == '04257040d6e05fe3e105ef1bae8bf1563f177b8f5ddbd02b774dd126931a8eac'
    assert sha(outputs['recovered']['symbols']) == 'b537ac29531fc1d4cf6146212afa7b409663ec92ad8d4b363622b8f4a4b87ecb'
    with tempfile.TemporaryDirectory() as td:
        t = Path(td)
        for role, values in outputs.items():
            for n, data in values.items():
                (t / (role + '-' + n)).write_bytes(data)
        for role in outputs:
            (t / (role + '.map')).write_bytes(raw(P / f'maps/{role}.map.gz'))
        translate = module('provider_translation', P / 'translation.py')
        proofs = [translate.compare(t / ('unqualified-' + n), t / ('recovered-' + n),
                                    t / 'unqualified.map', t / 'recovered.map', n) for n in ('symbols', 'candidate')]
        assert proofs == load(P / 'translation.json')
        config = module('provider_config', P / 'config.py').check(
            raw(P / 'config/default.ld').decode(), raw(P / 'config/ordered.ld').decode(), load(P / 'config/plan.json'),
            translate.sections(t / 'unqualified.map'), translate.sections(t / 'recovered.map'))
        assert config['qualified_selectors'] == 449
        assert translate.sections(t / 'recovered.map') == translate.sections(t / 'repeat.map')
        reader = module('provider_reader', P / 'reader.py')
        original = reader.Elf(root / 'evidence/original/mayhem/deployed.so')
        baseline = raw(root / PARENT / 'artifacts/recovered/symbols.so.gz')
        (t / 'baseline').write_bytes(baseline)
        progress = module('provider_progress', P / 'progress.py').compare(original.b, baseline, outputs['recovered']['symbols'])
        assert progress == load(P / 'progress.json')
        assert (progress['matches'], progress['raw_matches']) == (428, 100)
        rows = load(root / PARENT / 'audit.json')['rows']
        provider = module('provider_relationships', P / 'providers.py').inspect(
            original, reader.Elf(t / 'baseline'), reader.Elf(t / 'recovered-symbols'), rows)
        assert provider == load(P / 'provider-proof.json')
        initializer = module('provider_initializer_origins', root / PARENT / 'proof.py')
        image = reader.Elf(t / 'recovered-symbols')
        a = initializer.records(original, original.window(534840, 535800))
        b = initializer.records(image, initializer.initializer(image))
        assert {k: v['value'] for k, v in a.items()} == {k: v['value'] for k, v in b.items()}
    analysis = module('provider_analysis', P / 'analysis.py').generate(root)
    for n, data in analysis.items():
        assert raw(P / n) == data, n
    audit = load(P / 'audit.json')
    assert audit['summary']['statuses'] == dict(normalized_only=328, raw_local_match=100, unmatched=13)
    assert audit['summary']['whole_file_equal'] is False
    result = dict(normalized_matches=428, raw_matches=100, unmatched=13, candidate_sections=449,
                  constructor_providers_before=2, constructor_providers_after=1,
                  account_meta_grow_one_providers_before=3, account_meta_grow_one_providers_after=2,
                  missing_reserve_to_328_child=True, whole_elf_equal=False)
    if check_runtime:
        result['runtime'] = runtime(root, outputs['recovered']['candidate'])
    return result


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--repository-root', type=Path, default=ROOT)
    parser.add_argument('--skip-runtime', action='store_true')
    args = parser.parse_args()
    print(json.dumps(verify(args.repository_root, not args.skip_runtime), indent=2))
