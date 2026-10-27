"""Verify the frozen partial initializer evidence without compiling or running a VM."""
from pathlib import Path
import argparse
import difflib
import gzip
import hashlib
import importlib.util
import io
import json
import sys
import tarfile
import tempfile

if not __debug__:
    raise RuntimeError("verification requires assertions")
sys.dont_write_bytecode = True
P = Path(__file__).resolve().parent
ROOT = P.parents[1]
sha = lambda b: hashlib.sha256(b).hexdigest()


def raw(path):
    data = path.read_bytes()
    return gzip.decompress(data) if path.suffix == '.gz' else data


def load(path):
    return json.loads(raw(path))


def module(name, path):
    spec = importlib.util.spec_from_file_location(name, path)
    value = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(value)
    return value


def archive(path):
    output = {}
    with tarfile.open(path, 'r:gz') as tar:
        for member in tar:
            name = Path(member.name)
            assert member.isfile() and not name.is_absolute() and '..' not in name.parts
            assert member.name not in output
            output[member.name] = tar.extractfile(member).read()
    return output


def source_check(parent):
    sources = archive(P/'source.tar.gz')
    assert len(sources) == 67
    inputs = {n: sha(b) for n, b in sources.items()}
    assert inputs == load(P/'source-inputs.json')
    before = archive(parent/'source.tar.gz')
    assert sorted(n for n in sources.keys() | before.keys() if sources.get(n) != before.get(n)) == ['src/state.rs']
    patch = ''.join(difflib.unified_diff(before['src/state.rs'].decode().splitlines(True),
                                      sources['src/state.rs'].decode().splitlines(True),
                                      fromfile='a/src/state.rs', tofile='b/src/state.rs'))
    assert patch.encode() == raw(P/'source.patch')
    prior_inputs = dict(inputs, **{'src/state.rs': sha(raw(P/'prior-state.rs'))})
    return inputs, prior_inputs


def verify(root=ROOT, signatures=False):
    root = Path(root).resolve()
    files = list(P.rglob('*'))
    assert not any(p.is_symlink() for p in files)
    assert all(p.is_file() or p.is_dir() for p in files)
    assert {str(p.relative_to(P)): sha(p.read_bytes()) for p in files if p.is_file() and p != P/'manifest.json'} == load(P/'manifest.json')
    parent_record = load(P/'parent.json')
    assert parent_record['path'] == 'research/mayhem-trade-origins-validator'
    parent = root/parent_record['path']
    assert sha(raw(parent/'manifest.json')) == parent_record['manifest_sha256']
    parent_manifest = load(parent/'manifest.json')
    for name in ['source.tar.gz','artifacts/unqualified/symbols.so.gz','reader.py','progress.py','inputs/parent-audit.json.gz']:
        assert sha((parent/name).read_bytes()) == parent_manifest[name]
    assert raw(P/'reader.py') == raw(parent/'reader.py')
    assert raw(P/'progress.py') == raw(parent/'progress.py')
    assert raw(P/'inputs/parent-audit.json.gz') == raw(parent/'inputs/parent-audit.json.gz')
    inputs, prior_inputs = source_check(parent)
    toolchain = load(parent/'builds/unqualified/launch.json')
    for role in ['prior','diagnostic','ordinary','repeat']:
        launch, result = load(P/f'builds/{role}/launch.json'), load(P/f'builds/{role}/result.json')
        controller = 'fast.py' if role in ['prior','diagnostic'] else 'ordinary.py'
        assert launch['controller_sha256'] == sha(raw(P/'controllers'/controller))
        assert launch['source_inputs'] == (prior_inputs if role == 'prior' else inputs)
        assert launch['checked_tools'] == toolchain['checked_tools']
        assert launch['target_inputs'] == toolchain['target_inputs']
        assert result['returncode'] == 0
        assert all(result[k] for k in ['source_unchanged','tools_unchanged','target_libraries_unchanged'])
        for name in ['stdout','stderr']:
            assert sha(raw(P/f'builds/{role}/{name}.gz')) == result[name+'_sha256']
        assert raw(P/f'builds/{role}/stderr.gz').count(b'--crate-name mayhem_recovered ') == 1
        cmd = launch['command']
        assert all(flag in cmd for flag in ['--release','--locked','--offline','--verbose'])
        assert cmd[cmd.index('--target')+1] == 'sbpf-solana-solana'
        args = cmd[cmd.index('--')+1:]
        assert args == ['--remap-path-prefix=src/=programs/mayhem-program/src/',
                        '--remap-path-prefix=src/account_wrapper.rs=src/account_wrapper.rs'] + (['--emit=link,llvm-ir'] if role in ['prior','diagnostic'] else [])
        for name in ['candidate','symbols']:
            path = P/f'artifacts/{role}/{name}.so.gz'
            if role == 'diagnostic' and name == 'candidate':
                path = P/'artifacts/ordinary/candidate.so.gz'
            assert sha(raw(path)) == result[name+'_sha256']
    for name in ['candidate','symbols']:
        assert raw(P/f'artifacts/ordinary/{name}.so.gz') == raw(P/f'artifacts/repeat/{name}.so.gz')
    assert sha(raw(P/'artifacts/ordinary/candidate.so.gz')) == '0012957150ef8d4ecc28b3945ed159f544e9f29ef8c64977e2c9c1889c17c13a'
    assert sha(raw(root/'evidence/original/mayhem/deployed.so')) == 'a87fa9f866272514e6acb852b668c4a08aeb173d56c883039991d114d1199bdb'
    analysis = module('snapshot_analysis', P/'analysis.py')
    with tempfile.TemporaryDirectory() as td:
        temp = Path(td)
        for role in ['prior','ordinary','diagnostic']:
            (temp/role).write_bytes(raw(P/f'artifacts/{role}/symbols.so.gz'))
        body = analysis.inspect(root, P, temp/'prior', temp/'ordinary')
        assert body == load(P/'body-proof.json')
        other = analysis.inspect(root, P, temp/'prior', temp/'diagnostic')
        assert other == body
        progress = module('snapshot_progress', P/'progress.py').compare(
            (root/'evidence/original/mayhem/deployed.so').read_bytes(),
            raw(parent/'artifacts/unqualified/symbols.so.gz'), raw(P/'artifacts/ordinary/symbols.so.gz'))
        assert progress == load(P/'progress.json')
        assert progress['matches'] == 429 and progress['raw_matches'] == 89 and not progress['gains']
    diagnostic = load(P/'diagnostics/llc-command.json')
    assert sha(raw(P/'diagnostics/prior-input.ll.gz')) == diagnostic['input_sha256']
    assert sha(raw(P/'diagnostics/prior-unmodified.o.gz')) == diagnostic['output_sha256']
    assert b'%snapshot = alloca [80 x i8], align 8' in raw(P/'diagnostics/initializer.ll')
    runtime = module('snapshot_runtime', P/'runtime_check.py').verify(root, P, signatures)
    assert {k:v for k,v in runtime.items() if k != 'signature_recheck_performed'} == {
        k:v for k,v in load(P/'runtime-proof.json').items() if k != 'signature_recheck_performed'}
    return {'candidate_sha256': '0012957150ef8d4ecc28b3945ed159f544e9f29ef8c64977e2c9c1889c17c13a',
            'normalized': 429, 'raw_unqualified': 89, 'prior_slots': 101, 'snapshot_slots': 104,
            'total_eight_byte_slots': 120, 'complete_initializer_match': False,
            'ordinary_repeat_identical': True, 'runtime': runtime}


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--repository-root', type=Path, default=ROOT)
    parser.add_argument('--signatures', action='store_true', help='Requires solders; rechecks all retained signatures')
    args = parser.parse_args()
    print(json.dumps(verify(args.repository_root, args.signatures), indent=2))
