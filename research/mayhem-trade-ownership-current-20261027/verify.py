"""Verify saved partial source/ownership evidence. Never compiles or executes a VM."""
from pathlib import Path, PurePosixPath
import argparse
import difflib
import gzip
import hashlib
import importlib.util
import io
import json
import sys
import tarfile

if not __debug__:
    raise RuntimeError('verification requires assertions')
sys.dont_write_bytecode = True
P = Path(__file__).resolve().parent
ROOT = P.parents[1]
METADATA_SHA256 = 'e96088ccc1adf991344f88277b01ae585886e64da591f9db63189d62227178ee'
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


def exact_manifest():
    files = list(P.rglob('*'))
    assert not any(path.is_symlink() for path in files)
    assert all(path.is_file() or path.is_dir() for path in files)
    actual = {str(path.relative_to(P)): sha(path.read_bytes())
              for path in files if path.is_file() and path != P/'manifest.json'}
    assert actual == load(P/'manifest.json'), 'Exact packet file manifest differs'


def archive(path):
    result = {}
    with tarfile.open(fileobj=io.BytesIO(path.read_bytes()), mode='r:gz') as tar:
        for member in tar:
            name = PurePosixPath(member.name)
            assert member.isfile() and not name.is_absolute() and '..' not in name.parts
            assert member.name and str(name) == member.name and '\\' not in member.name
            assert member.name not in result and member.mode == 0o644
            result[member.name] = tar.extractfile(member).read()
    return result


def source_check(metadata, root):
    base = archive(P/'source/base.tar.gz')
    assert len(base) == 67
    maps = {}
    allowed = {
        'baseline': [],
        'q18': ['src/instructions/buy_v2.rs', 'src/instructions/pump_interface.rs', 'src/instructions/pump_interface_v2.rs'],
        'q22': ['src/instructions/pump_interface.rs'],
        'q28': ['src/instructions/pump_interface.rs'],
    }
    for role, item in metadata['roles'].items():
        assert role in allowed and item['changed'] == allowed[role]
        tree = dict(base)
        if role != 'baseline':
            overlay = archive(P/f'source/{role}-overlay.tar.gz')
            assert sorted(overlay) == allowed[role]
            tree.update(overlay)
            patch = ''.join(''.join(difflib.unified_diff(base[n].decode().splitlines(True), tree[n].decode().splitlines(True),
                                                       fromfile='a/'+n, tofile='b/'+n)) for n in allowed[role])
            assert patch.encode() == (P/f'source/{role}.patch').read_bytes()
        mapping = {n: sha(data) for n, data in tree.items()}
        assert len(mapping) == 67 and mapping == load(P/f'source/{role}-inputs.json')
        assert sha((P/f'source/{role}-inputs.json').read_bytes()) == item['inputs_sha256']
        maps[role] = mapping
    parent = root/metadata['parent']['path']
    assert metadata['parent']['path'] == 'research/mayhem-quotes-current-recovery-20261027'
    assert sha((parent/'manifest.json').read_bytes()) == metadata['parent']['manifest_sha256']
    assert maps['baseline'] == load(parent/'source-inputs.json')
    return maps


def build_check(metadata, maps):
    reference = load(P/'builds/baseline/launch.json')
    expected_args = ['--remap-path-prefix=src/=programs/mayhem-program/src/',
                     '--remap-path-prefix=src/account_wrapper.rs=src/account_wrapper.rs']
    for role, item in metadata['roles'].items():
        launch, result = load(P/f'builds/{role}/launch.json'), load(P/f'builds/{role}/result.json')
        assert launch['source_inputs'] == maps[role]
        assert launch['controller_sha256'] == sha((P/'controllers/fast.py').read_bytes())
        assert launch['checked_tools'] == reference['checked_tools']
        assert launch['target_inputs'] == reference['target_inputs']
        command = launch['command']
        assert all(flag in command for flag in ['rustc', '--release', '--locked', '--offline', '--verbose'])
        assert command[command.index('--target')+1] == 'sbpf-solana-solana'
        assert command[command.index('--')+1:] == expected_args
        assert result['returncode'] == 0 and result['root_rustc_invocations'] == 1
        assert all(result[k] for k in ['source_unchanged', 'tools_unchanged', 'target_libraries_unchanged'])
        for name in ['stdout', 'stderr']:
            assert sha(raw(P/f'builds/{role}/{name}.gz')) == result[name+'_sha256']
        assert raw(P/f'builds/{role}/stderr.gz').count(b'--crate-name mayhem_recovered ') == 1
        for name in ['candidate', 'symbols']:
            data = raw(P/f'artifacts/{role}/{name}.so.gz')
            assert sha(data) == item[name+'_sha256'] == result[name+'_sha256']
        assert len(raw(P/f'artifacts/{role}/candidate.so.gz')) == result['candidate_bytes']


def verify(root=ROOT, signatures=False):
    root = Path(root).resolve()
    exact_manifest()
    assert sha((P/'metadata.json').read_bytes()) == METADATA_SHA256
    metadata = load(P/'metadata.json')
    assert set(metadata['roles']) == {'baseline', 'q18', 'q22', 'q28'}
    assert sha((root/'evidence/original/mayhem/deployed.so').read_bytes()) == metadata['original_sha256']
    maps = source_check(metadata, root)
    build_check(metadata, maps)
    analysis = module('trade_packet_analysis', P/'analysis.py').compare(root)
    assert analysis == load(P/'analysis.json'), 'Recomputed static evidence differs'
    for role in metadata['roles']:
        proof = analysis['roles'][role]['preservation']
        assert (proof['matches'], proof['raw_matches'], proof['positive_direct_edges_after'], proof['positive_Source_records_after']) == (432, 89, 4314, 456)
        assert not any(proof[k] for k in ['body_losses','raw_losses','positive_direct_edge_losses','positive_Source_record_losses','observed_Source_profile_losses'])
    for identifier in ['O0081','O0082','O0083','O0084']:
        facts = analysis['roles']['q18']['handlers'][identifier]
        assert not facts['normalized_equal'] and facts['callee_shape_multiset_equal']
        assert facts['Source_coordinates_equal'] and facts['CPI_origins_equal']
    for identifier in ['O0083', 'O0084']:
        facts = analysis['roles']['q18']['handlers'][identifier]
        assert facts['post_conversion_bytes_equal'] and facts['retained_CPI_tag_payload_prefix_equal']
    for role in ['q22','q28']:
        facts = analysis['roles'][role]['handlers']['O0082']
        assert not facts['normalized_equal'] and facts['callee_shape_multiset_equal']
        assert facts['Source_coordinates_equal'] and facts['CPI_origins_equal']
    assert [analysis['late_bump'][role]['distance_to_allocator'] for role in ['original','candidate']] == [176,176]
    clock = analysis['clock_block']
    assert (clock['original_instructions'], clock['candidate_instructions']) == (46,46)
    assert clock['opcode_sequence_equal']
    stack = [d for d in clock['differences'] if set(d['fields']) == {'offset'}]
    assert len(stack) == 4 and all(d['fields']['offset'][1]-d['fields']['offset'][0] == -8 for d in stack)
    assert all(set(d['fields']) in [{'offset'}, {'imm'}] for d in clock['differences'])
    runtime = module('trade_packet_runtime', P/'runtime_check.py').verify(root, metadata, signatures)
    return dict(normalized_windows=432, raw_windows_unqualified=89, new_full_windows=0,
                q18_candidate_sha256=metadata['roles']['q18']['candidate_sha256'],
                late_bump=analysis['late_bump'], runtime=runtime,
                scope='Partial reconstruction evidence only; not qualified100/141 raw counts or whole-ELF identity.')


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--root', type=Path, default=ROOT)
    parser.add_argument('--signatures', action='store_true')
    args = parser.parse_args()
    print(json.dumps(verify(args.root, args.signatures), indent=2))


if __name__ == '__main__':
    main()
