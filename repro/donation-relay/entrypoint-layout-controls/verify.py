"""Verify ordinary Rust entrypoint, crate identity and instruction-boundary controls."""
from pathlib import Path
import gzip
import hashlib
import importlib.util
import json
import re
import shutil
import tempfile

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[2]
LABELS = ('layout-native-entrypoint', 'layout-contracts-name', 'layout-instruction-boundaries')
FRAGMENTS = ('24donate_native_v1_handler17h', '41donate_native_pubkey_config_id_v1_handler17h', '17donate_v1_handler17h', '45donate_pubkey_config_id_with_payer_v1_handler17h')


def sha(raw):
    return hashlib.sha256(raw).hexdigest()


def encoded(value):
    return (json.dumps(value, sort_keys=True, indent=2) + '\n').encode()


def module(name, path):
    spec = importlib.util.spec_from_file_location(name, path)
    result = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(result)
    return result


def sources():
    parent = module('layout_source_parent', ROOT / 'repro/donation-relay/settlement-bodies-source-proposal/verify.py')
    base = parent.sources()['recovered']
    overrides = json.loads((HERE/'overrides.json').read_bytes())
    result = {}
    for label in LABELS:
        source = dict(base)
        for name, row in overrides[label].items():
            raw = gzip.decompress((HERE/row['path']).read_bytes())
            assert sha(raw) == row['sha256']
            assert name in base
            source[name] = raw
        result[label] = source
    return result


def derive():
    parser = module('result_shape_elf', ROOT / 'repro/donation-relay/swap-receipt-coordinate-recovery/analyze.py')
    descriptors = json.loads((HERE / 'artifacts.json').read_bytes())
    rows = {}
    with tempfile.TemporaryDirectory(prefix='relay-result-shape-') as tmp:
        folder = Path(tmp)
        shutil.copyfile(ROOT / 'evidence/dependencies/donation_relay/deployed.so', folder / 'original.so')
        shutil.copyfile(ROOT / 'repro/donation-relay/swap-receipt-coordinate-recovery/original-windows.json', folder / 'original-windows.json')
        for label in LABELS:
            for kind, filename in [('candidate', 'candidate.so'), ('symbols', 'unstripped.so')]:
                row = descriptors[label][kind]
                raw = gzip.decompress((ROOT / row['path']).read_bytes())
                assert sha(raw) == row['sha256'] and len(raw) == row['bytes']
                (folder / filename).write_bytes(raw)
            data = parser.analyze(folder)
            original, candidate = data['original-function-ledger.json'], data['candidate-function-ledger.json']
            wrappers = []
            for ordinal, fragment in zip((92, 93, 94, 95), FRAGMENTS):
                found = [f for f in candidate if any(fragment in name for name in f['names'])]
                assert len(found) == 1, (label, ordinal)
                a, b = original[ordinal], found[0]
                wrappers.append(dict(ordinal=ordinal, candidate_index=b['index'], original_bytes=a['bytes'], candidate_bytes=b['bytes'], original_normalized_sha256=a['normalized_sha256'], candidate_normalized_sha256=b['normalized_sha256'], candidate_call_offsets=[c['offset'] for c in b['direct_calls']]))
            rows[label] = dict(summary=data['comparison-summary.json'], normalized_ordinals=[r['ordinal'] for r in data['match-ledger.json'] if r['normalized_candidate_indices']], raw_ordinals=[r['ordinal'] for r in data['match-ledger.json'] if r['raw_candidate_indices']], wrappers=wrappers)
    return rows


def verify():
    manifest = json.loads((HERE / 'manifest.json').read_bytes())
    assert set(manifest) == {str(p.relative_to(HERE)) for p in HERE.rglob('*') if p.is_file() and p.name != 'manifest.json' and '__pycache__' not in p.parts}
    for name, digest in manifest.items():
        path = HERE / name
        assert not path.is_symlink() and path.resolve().is_relative_to(HERE) and sha(path.read_bytes()) == digest, name
    for name, digest in json.loads((HERE / 'parents.json').read_bytes()).items():
        assert sha((ROOT / name).read_bytes()) == digest, name
    source_maps = sources()
    artifacts = json.loads((HERE / 'artifacts.json').read_bytes())
    for label in LABELS:
        folder = HERE / 'builds' / label
        launch = json.loads((folder / 'launch.json').read_bytes())
        result = json.loads((folder / 'result.json').read_bytes())
        log = (folder / 'build.log').read_bytes()
        assert len(source_maps[label]) == 60
        assert launch['inputs'] == {n: sha(raw) for n, raw in source_maps[label].items()}
        assert launch['rustc_sha256'] == '89fd4ccdd6e678a24c2cda074b498b46a352fcfce21018119c9526751afc678d'
        assert launch['fresh_target'] is False and launch['source_mtimes_refreshed_before_build'] is True
        assert result['exit_code'] == 0 and result['source_unchanged'] and result['root_invocations'] == 1
        import tomllib
        libname = tomllib.loads(source_maps[label]['Cargo.toml'].decode())['lib']['name']
        assert log.count(('--crate-name '+libname+' ').encode()) == 1 and sha(log) == result['build_log_sha256']
        assert all(flag in launch['command'] for flag in ('--locked', '--offline', 'sbpf-solana-solana', '--remap-path-prefix=src/=programs/contracts/src/'))
        for kind in ('candidate', 'symbols'):
            assert result[kind + '_sha256'] == artifacts[label][kind]['sha256']
    data = derive()
    assert data == json.loads((HERE / 'report.json').read_bytes())
    parent = json.loads((ROOT / 'repro/donation-relay/donation-close-order-controls/report.json').read_bytes())['after-close']
    for label, row in data.items():
        assert row['normalized_ordinals'] == parent['matched_ordinals']
        assert row['summary']['original_normalized_match_windows'] == 488
        assert not row['summary']['whole_file_equal']
        assert all(r['original_normalized_sha256'] != r['candidate_normalized_sha256'] for r in row['wrappers'])
    assert {label:row['summary']['original_raw_match_windows'] for label,row in data.items()} == {'layout-native-entrypoint':143,'layout-contracts-name':140,'layout-instruction-boundaries':140}
    print('PASS: three actual root builds; no normalized gains; raw matches 143/140/140; original runtime-function order remains unresolved')


if __name__ == '__main__':
    import argparse
    cli = argparse.ArgumentParser()
    cli.add_argument('--materialize', type=Path)
    cli.add_argument('--variant', choices=LABELS)
    args = cli.parse_args()
    if bool(args.materialize) != bool(args.variant):
        cli.error('--materialize and --variant are required together')
    verify()
    if args.materialize:
        args.materialize.mkdir(parents=True, exist_ok=False)
        for name, raw in sources()[args.variant].items():
            dest = args.materialize / name
            dest.parent.mkdir(parents=True, exist_ok=True)
            dest.write_bytes(raw)
