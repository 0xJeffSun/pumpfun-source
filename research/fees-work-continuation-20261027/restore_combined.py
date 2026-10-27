"""Verify the base and delta, or restore their combined snapshot into a new directory."""
from pathlib import Path
import argparse, gzip, hashlib, importlib.util, json, shutil, tempfile

HERE = Path(__file__).resolve().parent
BASE = HERE.parent / 'fees-work-checkpoint-20261027'
sha = lambda data: hashlib.sha256(data).hexdigest()

def module(name, path):
    spec = importlib.util.spec_from_file_location(name, path)
    result = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(result)
    return result

def verify(output=None, prefix=''):
    anchor = json.loads((HERE / 'base.json').read_bytes())
    assert anchor['path'] == 'research/fees-work-checkpoint-20261027'
    for name, field in [('archive-manifest.json', 'archive_manifest_sha256'), ('restore.py', 'restore_sha256'), ('package-sha256.json', 'package_sha256')]:
        assert sha((BASE / name).read_bytes()) == anchor[field]
    old_raw = gzip.decompress((BASE / 'index.json.gz').read_bytes())
    assert sha(old_raw) == anchor['index_sha256']
    old = json.loads(old_raw)
    delta = json.loads(gzip.decompress((HERE / 'index.json.gz').read_bytes()))
    assert all(delta['base_checkpoint'][k] == anchor[k] for k in delta['base_checkpoint'])
    base_restore = module('fees_combined_base', BASE / 'restore.py')
    delta_restore = module('fees_combined_delta', HERE / 'restore.py')
    base_restore.check_index(old, json.loads((BASE / 'archive-manifest.json').read_bytes()))
    delta_restore.check_index(delta, json.loads((HERE / 'archive-manifest.json').read_bytes()))
    combined = dict(old['files'])
    combined.update(delta['files'])
    for name in delta['removed_since_base']:
        base_restore.safe(name)
        assert name in combined
        del combined[name]
    regular = {n: r for n, r in combined.items() if not n.startswith('superseded/')}
    assert regular.keys() == delta['current_files'].keys()
    for name, row in delta['current_files'].items():
        base_restore.safe(name)
        assert all(row[k] == combined[name][k] for k in ['blob', 'bytes', 'mode', 'mtime_ns'])
    selected = {n: r for n, r in combined.items() if n.startswith(prefix)}
    if output is not None:
        assert selected and not output.exists(), 'Use a new output directory and a nonempty selection'
    base_output = output if any(name.startswith(prefix) for name in old['files']) else None
    base_result = base_restore.verify_or_restore(base_output, prefix)
    if output is not None and base_output is None:
        output.mkdir(parents=True)
    with tempfile.TemporaryDirectory(prefix='fees-research-delta-') as tmp:
        stage = Path(tmp) / 'delta' if output is not None and any(n.startswith(prefix) for n in delta['files']) else None
        delta_result = delta_restore.verify_or_restore(stage, prefix)
        if output is not None:
            for name in delta['removed_since_base']:
                if name.startswith(prefix):
                    target = output / str(base_restore.safe(name))
                    if target.is_file(): target.unlink()
            if stage is not None:
                for name in delta['files']:
                    if not name.startswith(prefix): continue
                    target = output / str(base_restore.safe(name))
                    target.parent.mkdir(parents=True, exist_ok=True)
                    shutil.copy2(stage / name, target)
            for name, row in selected.items():
                target = output / name
                assert sha(target.read_bytes()) == row['blob']
                assert target.stat().st_size == row['bytes']
                assert target.stat().st_mode & 0o777 == row['mode'] & 0o777
    return dict(verified=True, base_files=base_result['files'], delta_files=delta_result['files'],
                current_regular_files=len(regular), preserved_historical_files=len(combined) - len(regular),
                restored_files=len(selected) if output is not None else 0,
                acceptance='Research snapshot only; individual trial evidence remains authoritative')

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--output', type=Path)
    parser.add_argument('--prefix', default='')
    args = parser.parse_args()
    print(json.dumps(verify(args.output, args.prefix), indent=2))
