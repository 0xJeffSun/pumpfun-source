#!/usr/bin/env python3
"""Verify the current-source provider composition and its bounded receipts."""
import argparse
import gzip
import hashlib
import json
from pathlib import Path
import tarfile
import analysis

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[1]
sha = lambda data: hashlib.sha256(data).hexdigest()


def require(condition, message):
    if not condition:
        raise ValueError(message)


def bindings():
    manifest = json.loads((HERE / 'manifest.json').read_bytes())
    for name, digest in manifest['inputs'].items():
        require(sha((ROOT / name).read_bytes()) == digest, 'external input differs: ' + name)
    for name, digest in manifest['files'].items():
        require(sha((HERE / name).read_bytes()) == digest, 'packet file differs: ' + name)
    return manifest


def verify_static():
    bindings()
    expected = json.loads((ROOT / 'research/mayhem-amm-handler-shape-controls-20261027/base-source-inputs.json').read_bytes())
    with tarfile.open(HERE / 'source.tar.gz', 'r:gz') as archive:
        require(all(m.isfile() and not Path(m.name).is_absolute() and '..' not in Path(m.name).parts for m in archive), 'invalid source archive')
        source = {m.name: sha(archive.extractfile(m).read()) for m in archive}
    require(set(source) == set(expected) and len(source) == 67, 'source path cohort differs')
    changed = sorted(n for n in source if source[n] != expected[n])
    require(changed == ['curve-accounts/idls/pump.json', 'curve-accounts/src/interface_definition.rs'], 'unexpected source delta')
    macro_hash = {label: sha(gzip.decompress((HERE / 'host' / label / 'macro.so.gz').read_bytes())) for label in ['enabled', 'gated']}
    for label in ['enabled-a', 'enabled-b', 'enabled-c', 'gated']:
        folder = HERE / 'builds' / label
        records = json.loads((folder / 'builds.json').read_bytes())
        require(len(records) == 2, 'missing curve/root compiler records')
        curve_hash = sha(gzip.decompress((folder / 'curve_accounts.rlib.gz').read_bytes()))
        for index, record in enumerate(records):
            require(record['returncode'] == 0 and record['source_unchanged'] and record['bound_inputs_unchanged'], 'compiler/input checks failed')
            require(record['source_inputs'] == source, 'compiler source differs')
            prefix = 'historical_anchor_program=' if index == 0 else 'curve_accounts='
            operands = [arg.split('=', 1)[1] for arg in record['command'] if arg.startswith(prefix)]
            require(len(operands) == 1, 'missing explicit curve or macro input')
            expected_hash = macro_hash['gated' if label == 'gated' else 'enabled'] if index == 0 else curve_hash
            require(record['bound_files'][operands[0]] == expected_hash, 'compiler macro/archive input binding differs')
        result = json.loads((folder / 'result.json').read_bytes())
        for kind in ['symbols', 'candidate']:
            require(sha(gzip.decompress((folder / (kind + '.so.gz')).read_bytes())) == result[kind + '_sha256'], 'ELF result binding differs')
    for kind in ['symbols', 'candidate']:
        data = gzip.decompress((HERE / 'builds/enabled-a' / (kind + '.so.gz')).read_bytes())
        require(all(gzip.decompress((HERE / 'builds' / label / (kind + '.so.gz')).read_bytes()) == data for label in ['enabled-b', 'enabled-c']), 'complete enabled repeat differs')
    # Authenticate the one upstream gate independently of packet hash bindings.
    gated = (HERE / 'host/gated/utils.rs').read_bytes()
    require(hashlib.sha1(b'blob '+str(len(gated)).encode()+b'\0'+gated).hexdigest() == '4fb84b0879c07819886ba419fee5b6434436555d', 'upstream gate differs')
    enabled_host = json.loads((HERE / 'host/enabled/host-launch.json').read_bytes())
    host_results = json.loads((HERE / 'host/enabled/host-results.json').read_bytes())
    gated_host = json.loads((HERE / 'host/gated/gated-host.json').read_bytes())
    utility = 'lang/attribute/program/src/declare_program/mods/utils.rs'
    require(all(r['returncode'] == 0 and r['source_unchanged'] for r in host_results.values()), 'enabled host build failed')
    require(gated_host['returncode'] == 0 and gated_host['source_unchanged'], 'gated host build failed')
    host_delta = sorted(n for n in enabled_host['source_inputs'] if enabled_host['source_inputs'][n] != gated_host['source_inputs'][n])
    require(host_delta == [utility], 'host gate changed another source input')
    for role, record in [('enabled', enabled_host), ('gated', gated_host)]:
        require(record['source_inputs'][utility] == sha((HERE / 'host' / role / 'utils.rs').read_bytes()), 'host source gate binding differs')
    data = analysis.derive()
    require(data == json.loads((HERE / 'analysis.json').read_bytes()), 'recomputed analysis differs')
    require(data['gained_raw_windows'] == ['O0207'] and not data['lost_raw_windows'], 'raw match preservation differs')
    require(data['gained_direct_closed_windows'] == ['O0207','O0208','O0210','O0214','O0215','O0217','O0219','O0222'] and not data['lost_direct_closed_windows'], 'direct-call recovery differs')
    require(not data['new_normalized_windows'], 'unexpected new normalized window')
    require(data['cohorts']['baseline']['classifications'] == data['cohorts']['gated']['classifications'], 'gated body inventory differs')
    require(all(c['counts'] == {'normalized-only': 347, 'raw-equal': 85, 'unmatched': 9} for name, c in data['cohorts'].items() if name.startswith('enabled')), 'enabled inventory differs')
    return data


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--skip-runtime', action='store_true')
    parser.add_argument('--signatures', action='store_true')
    args = parser.parse_args()
    data = verify_static()
    summary = {'normalized_windows': 432, 'raw_windows': 85, 'direct_closed_windows': len(data['cohorts']['enabled-a']['direct_closed_windows']), 'whole_original_elf_identity': False}
    if not args.skip_runtime:
        import runtime_verify
        candidate_hash = sha(gzip.decompress((HERE / 'builds/enabled-a/candidate.so.gz').read_bytes()))
        summary['runtime'] = runtime_verify.verify(candidate_hash, args.signatures)
    print(json.dumps(summary, indent=2))


if __name__ == '__main__':
    main()
